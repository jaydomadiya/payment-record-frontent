import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { ExternalLink, Save } from "lucide-react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/common/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { QrImage } from "@/components/payment-settings/qr-image"
import { PaymentPreviewCard } from "@/components/payment-settings/payment-preview-card"
import { PaymentSettingsSkeleton } from "@/components/payment-settings/payment-settings-skeleton"
import { usePaymentSettingsStore } from "@/store/usePaymentSettingsStore"

const paymentSettingsSchema = z.object({
  upiId: z
    .string()
    .min(1, "UPI ID is required")
    .regex(/^[\w.\-]{2,256}@[a-zA-Z]{2,64}$/, "Enter a valid UPI ID (e.g. name@bank)"),
  qrCodeUrl: z.string().min(1, "QR Code URL is required").url("Enter a valid URL"),
  merchantName: z.string().min(1, "Merchant name is required"),
  instructions: z.string().min(1, "Instructions are required"),
  paymentsEnabled: z.boolean(),
})

type PaymentSettingsValues = z.infer<typeof paymentSettingsSchema>

export function PaymentSettingsPage() {
  const { settings, isLoading, updateSettings } = usePaymentSettingsStore()

  const form = useForm<PaymentSettingsValues>({
    resolver: zodResolver(paymentSettingsSchema),
    defaultValues: settings,
  })

  const liveValues = useWatch({ control: form.control })

  function onSubmit(values: PaymentSettingsValues) {
    updateSettings(values)
    toast.success("Payment settings updated successfully.")
  }

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Payment Settings" description="Manage how customers pay you" />
        <PaymentSettingsSkeleton />
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="Payment Settings"
        description="Manage your UPI ID and QR code — changes apply instantly across the app"
        actions={
          <Button variant="outline" size="sm" onClick={() => window.open("/pay", "_blank")}>
            <ExternalLink />
            View Customer Page
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Collection Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-5">
                <FormField
                  control={form.control}
                  name="upiId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UPI ID</FormLabel>
                      <FormControl>
                        <Input placeholder="merchant@ybl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="qrCodeUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>QR Code Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://firebasestorage.googleapis.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                      <QrImage url={field.value} className="mt-2 max-w-40" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="merchantName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Merchant Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jay Enterprise" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instructions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Instructions</FormLabel>
                      <FormControl>
                        <Textarea rows={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <FormField
                  control={form.control}
                  name="paymentsEnabled"
                  render={({ field }) => (
                    <div className="flex items-center justify-between gap-4 rounded-lg border border-border p-3">
                      <div>
                        <p className="text-sm font-medium">Enable Payments</p>
                        <p className="text-xs text-muted-foreground">
                          Turn off to hide the QR code and UPI ID from customers
                        </p>
                      </div>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </div>
                  )}
                />

                <Button type="submit" disabled={form.formState.isSubmitting}>
                  <Save />
                  Save Changes
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <p className="text-sm font-medium text-muted-foreground">Live Preview</p>
            <Badge variant="secondary">Customer view</Badge>
          </div>
          <motion.div
            key={JSON.stringify(liveValues)}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <PaymentPreviewCard
              settings={{
                upiId: liveValues.upiId ?? "",
                qrCodeUrl: liveValues.qrCodeUrl ?? "",
                merchantName: liveValues.merchantName ?? "",
                instructions: liveValues.instructions ?? "",
                paymentsEnabled: liveValues.paymentsEnabled ?? true,
              }}
              className="lg:sticky lg:top-20"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
