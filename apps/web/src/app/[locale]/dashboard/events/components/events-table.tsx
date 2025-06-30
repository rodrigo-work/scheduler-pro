'use client'

import { Button } from '@repo/design-system/components/ui/button'
import { DataTable } from '@repo/design-system/components/ui/table/data-table'
import { useDataTable } from '@repo/ui/hooks/use-data-table'
import { ColumnDef } from '@tanstack/react-table'
import { Settings } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'

interface EventTableParams<TData, TValue> {
  data: TData[]
  totalItems: number
  columns: ColumnDef<TData, TValue>[]
}

const actionBar = () => {
  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        className="ml-auto hidden h-8 lg:flex"
        onClick={() => alert('ok')}
      >
        <Settings />
        ACTIONS
      </Button>
    </>
  )
}

export function EventsTable<TData, TValue>({
  data,
  totalItems,
  columns
}: EventTableParams<TData, TValue>) {
  const [pageSize] = useQueryState('limit', parseAsInteger.withDefault(10))
  const pageCount = Math.ceil(totalItems / pageSize)

  const { table } = useDataTable({
    data, // event data
    columns, // event columns
    pageCount: pageCount,
    shallow: false, //Setting to false triggers a network request with the updated querystring.
    debounceMs: 500
  })

  return (
    <DataTable table={table}>
      {/* <DataTableToolbar table={table} actionBar={true} /> */}
    </DataTable>
  )
}
