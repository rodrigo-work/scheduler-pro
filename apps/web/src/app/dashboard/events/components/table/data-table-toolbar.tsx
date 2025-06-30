'use client'

import { Button } from '@repo/ui/components/button'
import { Input } from '@repo/ui/components/input'
import { DataTableFacetedFilter } from '@repo/ui/components/table/data-table-faceted-filter'
import { DataTableViewOptions } from '@repo/ui/components/table/data-table-view-options'
import { Table } from '@tanstack/react-table'
import { X } from 'lucide-react'
import { locations } from '../../data/data'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Filter events..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('location') && (
          <DataTableFacetedFilter
            column={table.getColumn('location')}
            title="Location"
            options={locations}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
