import { useEffect, useState } from "react"
import { QrCode } from "lucide-react"
import { cn } from "@/lib/utils"

export function QrImage({
  url,
  alt = "Payment QR code",
  className,
}: {
  url: string
  alt?: string
  className?: string
}) {
  const [errored, setErrored] = useState(false)

  useEffect(() => {
    setErrored(false)
  }, [url])

  const trimmed = url.trim()
  const showPlaceholder = !trimmed || errored

  return (
    <div
      className={cn(
        "flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-muted",
        className,
      )}
    >
      {showPlaceholder ? (
        <div className="flex flex-col items-center gap-2 p-4 text-center text-muted-foreground">
          <QrCode className="size-8" />
          <span className="text-xs">{trimmed ? "Couldn't load QR image" : "No QR code set"}</span>
        </div>
      ) : (
        <img
          src={trimmed}
          alt={alt}
          className="size-full object-contain p-2"
          onError={() => setErrored(true)}
        />
      )}
    </div>
  )
}
