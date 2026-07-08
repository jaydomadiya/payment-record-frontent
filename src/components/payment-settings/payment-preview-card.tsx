import { useState } from "react"
import { toast } from "sonner"
import { Check, Copy, Download, Share2, ShieldAlert } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { QrImage } from "@/components/payment-settings/qr-image"
import type { PaymentSettings } from "@/types/paymentSettings"

export function PaymentPreviewCard({
  settings,
  className,
}: {
  settings: PaymentSettings
  className?: string
}) {
  const [copied, setCopied] = useState(false)
  const { merchantName, upiId, qrCodeUrl, instructions, paymentsEnabled } = settings

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(upiId)
      setCopied(true)
      toast.success("UPI ID copied")
      setTimeout(() => setCopied(false), 1500)
    } catch {
      toast.error("Couldn't copy UPI ID")
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">{merchantName || "Merchant"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {paymentsEnabled ? (
          <>
            <QrImage url={qrCodeUrl} className="mx-auto max-w-64" />

            <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2.5">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">UPI ID</p>
                <p className="truncate font-mono text-sm font-medium">{upiId || "—"}</p>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleCopy}
                    aria-label="Copy UPI ID"
                  >
                    {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy UPI ID</TooltipContent>
              </Tooltip>
            </div>

            <Separator />

            <div>
              <p className="mb-1.5 text-sm font-medium">Payment Instructions</p>
              <p className="text-sm whitespace-pre-line text-muted-foreground">
                {instructions || "—"}
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => toast.success("Download started (demo)")}
              >
                <Download />
                Download QR
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => toast.success("Share sheet opened (demo)")}
              >
                <Share2 />
                Share
              </Button>
            </div>
          </>
        ) : (
          <Alert variant="destructive">
            <ShieldAlert />
            <AlertTitle>Payments unavailable</AlertTitle>
            <AlertDescription>Payments are temporarily unavailable.</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
