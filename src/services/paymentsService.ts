import { AxiosError } from "axios"
import { apiClient } from "@/lib/api-client"
import type { PaymentsPageData, PaymentsPageResponse, PaymentsQueryParams } from "@/types/paymentRecord"

const PAYMENTS_ENDPOINT = "/api/v1/payments"
const DEFAULT_SORT_FIELD = "createdAt"

export async function fetchPayments(params: PaymentsQueryParams): Promise<PaymentsPageData> {
  try {
    const { data } = await apiClient.get<PaymentsPageResponse>(PAYMENTS_ENDPOINT, {
      params: {
        page: params.page,
        size: params.size,
        // Spring's Pageable resolver expects "<field>,<direction>" (e.g. "createdAt,desc"),
        // not a bare direction.
        sort: params.sort ? `${DEFAULT_SORT_FIELD},${params.sort.toLowerCase()}` : undefined,
      },
    })

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch payments")
    }

    return data.data
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message ?? error.message
      throw new Error(message)
    }
    throw error
  }
}
