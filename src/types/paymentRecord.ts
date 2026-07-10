export interface PaymentRecord {
  id: string
  paymentId?: string
  orderId?: string
  transactionId?: string
  userName?: string
  mobileNumber?: string
  email?: string
  upiId?: string
  paymentMethod?: string
  amount?: number
  currency?: string
  paymentStatus?: string
  gatewayName?: string
  gatewayResponse?: string
  eventId?: string
  eventName?: string
  ticketQuantity?: number
  ticketType?: string
  createdAt?: string
  updatedAt?: string
}

export interface PaymentsPageData {
  content: PaymentRecord[]
  pageNumber: number
  pageSize: number
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export type PaymentsPageResponse = ApiResponse<PaymentsPageData>

export type SortDirection = "ASC" | "DESC"

export interface PaymentsQueryParams {
  page: number
  size: number
  sort?: SortDirection
}
