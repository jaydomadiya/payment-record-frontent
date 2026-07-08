import { useMemo, useState } from "react"
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatusBadge } from "@/components/payments/status-badge"
import { PaymentFilters } from "@/components/payments/payment-filters"
import { EmptyState } from "@/components/common/empty-state"
import { formatCurrency, formatDate } from "@/lib/formatters"
import type { Payment } from "@/types/payment"

function SortableHeader({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button variant="ghost" size="sm" className="-ml-3 h-8 gap-1.5" onClick={onClick}>
      {label}
      <ArrowUpDown className="size-3.5 text-muted-foreground" />
    </Button>
  )
}

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => <span className="font-medium">{row.original.customerName}</span>,
  },
  {
    accessorKey: "customerEmail",
    header: "Email",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.customerEmail}</span>,
  },
  {
    accessorKey: "plan",
    header: "Plan",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <SortableHeader label="Amount" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} />
    ),
    cell: ({ row }) => formatCurrency(row.original.amount),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <SortableHeader label="Payment Date" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} />
    ),
    cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.date)}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
    filterFn: (row, columnId, filterValue: string) => {
      if (!filterValue || filterValue === "All") return true
      return row.getValue(columnId) === filterValue
    },
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => <span className="font-mono text-xs text-muted-foreground">{row.original.transactionId}</span>,
  },
]

export function PaymentsTable({ payments }: { payments: Payment[] }) {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("All")
  const [sorting, setSorting] = useState<SortingState>([{ id: "date", desc: true }])

  const columnFilters = useMemo(
    () => (status !== "All" ? [{ id: "status", value: status }] : []),
    [status],
  )

  const table = useReactTable({
    data: payments,
    columns,
    state: {
      sorting,
      globalFilter: search,
      columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearch,
    globalFilterFn: (row, _columnId, filterValue: string) => {
      const query = filterValue.toLowerCase()
      const payment = row.original
      return (
        payment.customerName.toLowerCase().includes(query) ||
        payment.customerEmail.toLowerCase().includes(query) ||
        payment.transactionId.toLowerCase().includes(query)
      )
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  const rows = table.getRowModel().rows

  return (
    <div className="space-y-4">
      <PaymentFilters search={search} onSearchChange={setSearch} status={status} onStatusChange={setStatus} />

      {rows.length === 0 ? (
        <EmptyState
          title="No payments found"
          description="Try adjusting your search or filter criteria."
        />
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="whitespace-nowrap">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1} ·{" "}
              {table.getFilteredRowModel().rows.length} results
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="size-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
