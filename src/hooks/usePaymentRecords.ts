import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { fetchPayments } from "@/services/paymentsService"
import type { PaymentRecord, SortDirection } from "@/types/paymentRecord"

const DEFAULT_PAGE_SIZE = 10
const DEFAULT_SORT: SortDirection = "DESC"

export function usePaymentRecords(pageSize: number = DEFAULT_PAGE_SIZE, sort: SortDirection = DEFAULT_SORT) {
  const [page, setPage] = useState(0)
  const [payments, setPayments] = useState<PaymentRecord[]>([])
  const [totalElements, setTotalElements] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isFirstPage, setIsFirstPage] = useState(true)
  const [isLastPage, setIsLastPage] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadPayments = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await fetchPayments({ page, size: pageSize, sort })
      setPayments(result.content)
      setTotalElements(result.totalElements)
      setTotalPages(result.totalPages)
      setIsFirstPage(result.first)
      setIsLastPage(result.last)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch payments"
      setError(message)
      setPayments([])
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }, [page, pageSize, sort])

  useEffect(() => {
    loadPayments()
  }, [loadPayments])

  return {
    payments,
    page,
    pageSize,
    totalElements,
    totalPages,
    isFirstPage,
    isLastPage,
    isLoading,
    error,
    goToNextPage: () => setPage((current) => current + 1),
    goToPreviousPage: () => setPage((current) => Math.max(0, current - 1)),
    refresh: loadPayments,
  }
}
