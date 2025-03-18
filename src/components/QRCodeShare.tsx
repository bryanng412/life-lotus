import logo from '@/assets/logo.webp'
import { Button } from '@/components/ui/button'
import { useBoundStore } from '@/lib/store/boundStore'
import { buildShareableUrl } from '@/lib/store/storage'
import { cn } from '@/lib/utils'
import { useCopyToClipboard } from '@uidotdev/usehooks'
import { Check, Copy } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'
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
      <QRCodeSVG
        className="m-auto"
        value={shareUrl}
        title={'Title for my QR Code'}
        size={256}
        imageSettings={{
          src: logo,
          height: 60,
          width: 74,
          opacity: 1,
          excavate: false,
        }}
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
