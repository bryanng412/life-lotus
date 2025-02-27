import { act } from 'react'
import { vi } from 'vitest'
import { renderHook } from 'vitest-browser-react'
import { useWakeLock } from '../useWakeLock'

const useVisibilityObserverMockFn = vi.fn()
vi.doMock('../useVisibilityObserver', () => {
  return useVisibilityObserverMockFn
})

const consoleSpy = vi.spyOn(console, 'warn')

const releaseMockFn = vi.fn()
class RequestResponseMock {
  callback: (() => void) | null = null
  released: boolean = false

  public addEventListener(_name: string, callback: () => void) {
    this.callback = callback
  }

  public release(): Promise<boolean> {
    if (this.callback != null) {
      this.callback()
    }
    this.released = true
    return releaseMockFn() as Promise<boolean>
  }
}
const requestMockFn = vi.fn()

describe('useWakeLock', () => {
  vi.useFakeTimers()

  let wakeLockInternal: Promise<RequestResponseMock> | null = null

  beforeEach(() => {
    wakeLockInternal = null
    requestMockFn.mockClear()
    releaseMockFn.mockClear()
    useVisibilityObserverMockFn.mockClear()

    useVisibilityObserverMockFn.mockImplementation(() => {
      return true
    })
    releaseMockFn.mockImplementation(() => {
      return Promise.resolve(true)
    })

    requestMockFn.mockImplementation(() => {
      wakeLockInternal = Promise.resolve(new RequestResponseMock())
      return wakeLockInternal
    })

    vi.stubGlobal('navigator', {
      wakeLock: {
        request: requestMockFn,
      },
    })
  })

  describe('Usasge', () => {
    test('Acquires lock when requested and feature is supported', async () => {
      const { result } = renderHook(() => useWakeLock())
      expect(result.current).toMatchObject({
        isSupported: true,
        isLocked: false,
      })

      await act(async () => {
        result.current.request()
        await vi.runAllTimersAsync()
      })
      expect(requestMockFn).toHaveBeenCalledTimes(1)

      expect(result.current).toMatchObject({
        isSupported: true,
        isLocked: true,
      })
    })

    test('Ignores second request when already locked', async () => {
      const { result } = renderHook(() => useWakeLock())
      expect(result.current).toMatchObject({
        isSupported: true,
        isLocked: false,
      })

      await act(async () => {
        result.current.request()
        await vi.runAllTimersAsync()
      })
      expect(requestMockFn).toHaveBeenCalledTimes(1)

      // requesting again
      await act(async () => {
        result.current.request()
        await vi.runAllTimersAsync()
      })
      // still requested 1 time
      expect(requestMockFn).toHaveBeenCalledTimes(1)
      // produces warning
      expect(consoleSpy).toHaveBeenCalledWith(
        '[react-use-wake-lock]: Already have a lock. noop'
      )

      expect(result.current).toMatchObject({
        isSupported: true,
        isLocked: true,
      })
    })

    test('Ignores request when wakeLock is in progress', async () => {
      requestMockFn.mockImplementation(() => {
        return new Promise<RequestResponseMock>(() => {})
      })

      const { result } = renderHook(() => useWakeLock())
      expect(result.current).toMatchObject({
        isSupported: true,
        isLocked: false,
      })

      await act(async () => {
        result.current.request()
        await vi.runAllTimersAsync()
      })
      expect(requestMockFn).toHaveBeenCalledTimes(1)

      // requesting again
      await act(async () => {
        result.current.request()
        await vi.runAllTimersAsync()
      })
      // still requested 1 time
      expect(requestMockFn).toHaveBeenCalledTimes(1)
      // produces warning
      expect(consoleSpy).toHaveBeenCalledWith(
        '[react-use-wake-lock]: WakeLock request is in progress. noop'
      )
    })

    test('Ignores request when feature is not supported', async () => {
      vi.stubGlobal('navigator', {})

      const { result } = renderHook(() => useWakeLock())
      expect(result.current).toMatchObject({
        isSupported: false,
        isLocked: false,
      })

      await act(async () => {
        result.current.request()
        await vi.runAllTimersAsync()
      })

      // produces warning
      expect(consoleSpy).toHaveBeenCalledWith(
        '[react-use-wake-lock]: WakeLock is not supported by the browser'
      )

      expect(result.current).toMatchObject({
        isSupported: false,
        isLocked: false,
      })
    })

    test('Does not request lock if feature is not supported', async () => {
      vi.stubGlobal('navigator', {})

      const { result } = renderHook(() => useWakeLock())
      expect(result.current).toMatchObject({
        isSupported: false,
        isLocked: false,
      })
      expect(requestMockFn).toHaveBeenCalledTimes(0)

      await act(async () => {
        result.current.request()
        await vi.runAllTimersAsync()
      })

      expect(requestMockFn).toHaveBeenCalledTimes(0)

      expect(result.current).toMatchObject({
        isSupported: false,
        isLocked: false,
      })
    })

    test('Calls onLock when acquiring a lock', async () => {
      const onLock = vi.fn()

      const { result } = renderHook(() =>
        useWakeLock({
          onLock,
        })
      )

      act(() => {
        result.current.request()
      })

      expect(onLock).toHaveBeenCalledTimes(0)
      expect(requestMockFn).toHaveBeenCalledTimes(1)

      await act(async () => {
        await vi.runAllTimersAsync()
      })

      expect(result.current).toMatchObject({
        isSupported: true,
        isLocked: true,
      })
      expect(onLock).toHaveBeenCalledTimes(1)
    })

    test('Calls onRelease when lock is released', async () => {
      const onRelease = vi.fn()

      const { result, rerender } = renderHook(() =>
        useWakeLock({
          onRelease,
        })
      )

      act(() => {
        result.current.request()
      })

      expect(onRelease).toHaveBeenCalledTimes(0)
      expect(requestMockFn).toHaveBeenCalledTimes(1)

      await act(async () => {
        await vi.runAllTimersAsync()
      })

      expect(result.current).toMatchObject({
        isSupported: true,
        isLocked: true,
      })

      await act(async () => {
        const lock = await wakeLockInternal
        await lock?.release()
      })

      act(() => {
        rerender()
      })

      expect(result.current).toMatchObject({
        isSupported: true,
        isLocked: false,
      })
      expect(onRelease).toHaveBeenCalledTimes(1)
    })
  })

  describe('Request', () => {
    test('Calls onError when erroring during request', async () => {
      const onError = vi.fn()

      requestMockFn.mockImplementation(() => {
        return Promise.reject(new Error('Fake error during request'))
      })

      const { result } = renderHook(() =>
        useWakeLock({
          onError,
        })
      )

      expect(onError).toHaveBeenCalledTimes(0)
      expect(requestMockFn).toHaveBeenCalledTimes(0)

      act(() => {
        result.current.request()
      })

      await act(async () => {
        await vi.runAllTimersAsync()
      })

      expect(requestMockFn).toHaveBeenCalledTimes(1)

      expect(result.current).toMatchObject({
        isSupported: true,
        isLocked: false,
      })

      expect(onError).toHaveBeenCalledWith(
        new Error('Fake error during request'),
        'request'
      )
    })

    test('Calls onError for unknown types of errors', async () => {
      const onError = vi.fn()

      requestMockFn.mockImplementation(() => {
        return Promise.reject(new Error('Unknown error type on request'))
      })

      const { result } = renderHook(() =>
        useWakeLock({
          onError,
        })
      )

      expect(onError).toHaveBeenCalledTimes(0)
      expect(requestMockFn).toHaveBeenCalledTimes(0)

      act(() => {
        result.current.request()
      })

      await act(async () => {
        await vi.runAllTimersAsync()
      })

      expect(requestMockFn).toHaveBeenCalledTimes(1)

      expect(result.current).toMatchObject({
        isSupported: true,
        isLocked: false,
      })

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        new Error('Unknown error type on request'),
        'request'
      )
    })

    test('Works as expected if no onError handler provided but errored', async () => {
      requestMockFn.mockImplementation(() => {
        return Promise.reject(new Error('Fake error during request'))
      })

      const { result, rerender } = renderHook(() => useWakeLock())

      act(() => {
        result.current.request()
      })

      expect(requestMockFn).toHaveBeenCalledTimes(1)

      act(() => {
        rerender()
      })

      await act(async () => {
        await vi.runAllTimersAsync()
      })

      expect(result.current).toMatchObject({
        isSupported: true,
        isLocked: false,
      })
    })
  })

  describe('Release', () => {
    test('Calls onReleaseError when errors during release', async () => {
      const onError = vi.fn()
      releaseMockFn.mockImplementation(() => {
        return Promise.reject(new Error('Fake error during release'))
      })

      const { result } = renderHook(() =>
        useWakeLock({
          onError,
        })
      )

      act(() => {
        result.current.request()
      })

      expect(onError).toHaveBeenCalledTimes(0)
      expect(requestMockFn).toHaveBeenCalledTimes(1)

      await act(async () => {
        await vi.runAllTimersAsync()
      })

      expect(result.current).toMatchObject({
        isSupported: true,
        isLocked: true,
      })

      act(() => {
        result.current.release()
      })

      expect(result.current).toMatchObject({
        isSupported: true,
        isLocked: false,
      })

      await act(async () => {
        await vi.runAllTimersAsync()
      })

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        new Error('Fake error during release'),
        'release'
      )
    })

    test('Handles unknown type of release error', async () => {
      const onError = vi.fn()
      releaseMockFn.mockImplementation(() => {
        return Promise.reject(new Error('Unknown error type on release'))
      })

      const { result } = renderHook(() =>
        useWakeLock({
          onError,
        })
      )

      act(() => {
        result.current.request()
      })

      expect(onError).toHaveBeenCalledTimes(0)
      expect(requestMockFn).toHaveBeenCalledTimes(1)

      await act(async () => {
        await vi.runAllTimersAsync()
      })

      expect(result.current).toMatchObject({
        isSupported: true,
        isLocked: true,
      })

      act(() => {
        result.current.release()
      })

      expect(result.current).toMatchObject({
        isSupported: true,
        isLocked: false,
      })

      await act(async () => {
        await vi.runAllTimersAsync()
      })

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        new Error('Unknown error type on release'),
        'release'
      )
    })

    test('Works as expected if no onReleaseError handler provided but errored', async () => {
      releaseMockFn.mockImplementation(() => {
        return Promise.reject(new Error('Fake error during release'))
      })

      const { result } = renderHook(() => useWakeLock())

      act(() => {
        result.current.request()
      })

      expect(requestMockFn).toHaveBeenCalledTimes(1)

      await act(async () => {
        await vi.runAllTimersAsync()
      })

      expect(result.current).toMatchObject({
        isSupported: true,
        isLocked: true,
      })

      act(() => {
        result.current.release()
      })

      expect(result.current).toMatchObject({
        isSupported: true,
        isLocked: false,
      })
    })

    test('Ignores release when feature is not supported', async () => {
      vi.stubGlobal('navigator', {})

      const { result } = renderHook(() => useWakeLock())
      expect(result.current).toMatchObject({
        isSupported: false,
        isLocked: false,
      })

      await act(async () => {
        result.current.release()
        await vi.runAllTimersAsync()
      })

      // produces warning
      expect(consoleSpy).toHaveBeenCalledWith(
        '[react-use-wake-lock]: WakeLock is not supported by the browser'
      )

      expect(result.current).toMatchObject({
        isSupported: false,
        isLocked: false,
      })
    })

    test('Ignores release when no lock avaialble', async () => {
      const { result } = renderHook(() => useWakeLock())
      expect(result.current).toMatchObject({
        isSupported: true,
        isLocked: false,
      })

      await act(async () => {
        result.current.release()
        await vi.runAllTimersAsync()
      })

      // produces warning
      expect(consoleSpy).toHaveBeenCalledWith(
        '[react-use-wake-lock]: Trying to release lock without having one: noop'
      )

      expect(result.current).toMatchObject({
        isSupported: true,
        isLocked: false,
      })
    })
  })

  describe('Auto Renew', () => {
    test('Auto renews lock when visibility changes', async () => {
      const onLock = vi.fn()
      const onRelease = vi.fn()

      const { result, rerender } = renderHook(() =>
        useWakeLock({
          onLock,
          onRelease,
        })
      )

      act(() => {
        result.current.request()
      })

      expect(onLock).toHaveBeenCalledTimes(0)
      expect(onRelease).toHaveBeenCalledTimes(0)
      expect(requestMockFn).toHaveBeenCalledTimes(1)

      await act(async () => {
        await vi.runAllTimersAsync()
      })

      expect(result.current).toMatchObject({
        isSupported: true,
        isLocked: true,
      })
      expect(onLock).toHaveBeenCalledTimes(1)

      // mimic going off-screen
      await act(async () => {
        useVisibilityObserverMockFn.mockReturnValue(false)
        const lock = await wakeLockInternal
        await lock?.release()

        await vi.runAllTimersAsync()
      })

      expect(onRelease).toHaveBeenCalledTimes(1)

      // mimic going back online
      await act(async () => {
        useVisibilityObserverMockFn.mockReturnValue(true)
        rerender()
        result.current.request()

        await vi.runAllTimersAsync()
      })

      expect(onLock).toHaveBeenCalledTimes(2)
    })

    test("Doesn't auto renew when released manually", async () => {
      const onLock = vi.fn()
      const onRelease = vi.fn()

      const { result, rerender } = renderHook(() =>
        useWakeLock({
          onLock,
          onRelease,
        })
      )

      act(() => {
        result.current.request()
      })

      expect(onLock).toHaveBeenCalledTimes(0)
      expect(onRelease).toHaveBeenCalledTimes(0)
      expect(requestMockFn).toHaveBeenCalledTimes(1)

      await act(async () => {
        await vi.runAllTimersAsync()
      })

      expect(result.current).toMatchObject({
        isSupported: true,
        isLocked: true,
      })
      expect(onLock).toHaveBeenCalledTimes(1)

      // mimic going off-screen but release manually
      await act(async () => {
        useVisibilityObserverMockFn.mockReturnValue(false)
        result.current.release()

        await vi.runAllTimersAsync()
      })

      expect(onRelease).toHaveBeenCalledTimes(1)

      // mimic going back online
      await act(async () => {
        useVisibilityObserverMockFn.mockReturnValue(true)

        rerender()
        await vi.runAllTimersAsync()
      })

      expect(onLock).toHaveBeenCalledTimes(1)
    })
  })
})
