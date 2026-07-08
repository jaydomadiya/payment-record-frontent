import type { PaymentSettings } from "@/types/paymentSettings"

export const initialPaymentSettings: PaymentSettings = {
  upiId: "merchant@ybl",
  qrCodeUrl:
    "https://firebasestorage.googleapis.com/v0/b/demo-app.appspot.com/o/qr%2Fmerchant-qr.png?alt=media",
  merchantName: "Jay Enterprise",
  instructions:
    "• Scan the QR Code.\n• Complete the payment.\n• Upload payment screenshot.\n• Wait for admin verification.",
  paymentsEnabled: true,
}
