export interface Plan {
  id: string
  name: string
  price: number
  billingPeriod: "month" | "year"
  description: string
  features: string[]
  popular: boolean
  active: boolean
  buttonText: string
}
