import logo from '@/assets/logo.webp'
import { Button } from '@/components/ui/button'
import { useBoundStore } from '@/lib/store/boundStore'
import { buildShareableUrl } from '@/lib/store/storage'
import { cn } from '@/lib/utils'
import { useCopyToClipboard } from '@uidotdev/usehooks'
import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { QRCode } from 'react-qrcode-logo'
import { Input } from './ui/input'

const QRCodeShare = ({ onBack }: { onBack: () => void }) => {
  const state = useBoundStore()
  const shareUrl = buildShareableUrl(state)
  const [hasCopiedText, setHasCopiedText] = useState(false)
  const [, copyToClipboard] = useCopyToClipboard()
  const copyUrl = () => {
    void copyToClipboard(shareUrl)
    setHasCopiedText(true)
  }
  const styles = getComputedStyle(document.documentElement)
  const bgColor = styles.getPropertyValue('--background')
  const fgColor = styles.getPropertyValue('--foreground')

  useEffect(() => {
    if (hasCopiedText) {
      const timeout = setTimeout(() => {
        setHasCopiedText(false)
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [hasCopiedText])

  return (
    <>
      <QRCode
        size={275}
        qrStyle="dots"
        fgColor={fgColor}
        bgColor={bgColor}
        logoImage={logo}
        logoWidth={74}
        logoHeight={60}
        logoPadding={5}
        logoOpacity={0.9}
        logoPaddingStyle="circle"
        value={shareUrl}
        style={{ margin: 'auto' }}
        quietZone={15}
      />
      <div className="relative">
        <Input className="border-foreground" value={shareUrl} readOnly />
        <button
          onClick={copyUrl}
          className={cn(
            !hasCopiedText && 'cursor-pointer',
            'bg-muted absolute top-1/2 right-[24px] flex size-fit translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md px-1.5 py-0.5'
          )}
          disabled={hasCopiedText}
        >
          <Copy
            className={cn(
              'absolute scale-100 transition-all',
              hasCopiedText && 'scale-0'
            )}
          />
          <Check
            className={cn(
              'scale-100 transition-all',
              !hasCopiedText && 'scale-0'
            )}
          />
        </button>
      </div>
      <Button onClick={onBack}>Back</Button>
    </>
  )
}

export default QRCodeShare
