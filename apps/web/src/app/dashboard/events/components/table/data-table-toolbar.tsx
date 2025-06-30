'use client'

import { ConfirmDialog } from '@/components/confirm-dialog'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@repo/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@repo/ui/components/dropdown-menu'
import { Input } from '@repo/ui/components/input'
import { DataTableFacetedFilter } from '@repo/ui/components/table/data-table-faceted-filter'
import { DataTableViewOptions } from '@repo/ui/components/table/data-table-view-options'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { Table } from '@tanstack/react-table'
import { X } from 'lucide-react'
import { useState } from 'react'
import { deleteEvent } from '../../actions'
import { locations } from '../../data/data'
import { Event } from '../../data/schema'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  actionBar?: boolean
}

export function DataTableToolbar<TData extends Event>({
  table,
  actionBar = false
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const handleConfirm = async () => {
    setLoading(true)
    let result
    for (const g of selectedUsers) {
      result = await deleteEvent({ id: g } as Event)
      showSubmittedData(result)
    }
    setLoading(false)
    setOpen(false)
  }

  return (
    <>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={`Delete this event(s)?`}
        desc={
          <>
            You are about to delete a event with the ID{' '}
            <strong>
              {selectedUsers.map((g) => (
                <span key={g}>{g}</span>
              ))}
            </strong>
            . <br />
            This action cannot be undone.
          </>
        }
        confirmText="Delete"
        cancelBtnText="Cancel"
        destructive
        isLoading={loading}
        handleConfirm={handleConfirm}
      />

      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-2">
          <Input
            placeholder="Filter events..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
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
          {actionBar && table.getFilteredSelectedRowModel().rows.length > 0 && (
            <>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="destructive" size="sm">
                    Actions
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    disabled={
                      table.getFilteredSelectedRowModel().rows.length !== 1
                    }
                    onClick={() =>
                      alert(
                        table
                          .getFilteredSelectedRowModel()
                          .rows.map((row) => row.original.id)
                      )
                    }
                  >
                    <IconEdit className="mr-2 h-4 w-4" /> Update
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => {
                      setSelectedUsers(
                        table
                          .getFilteredSelectedRowModel()
                          .rows.map((row) => row.original.id)
                      )
                      setOpen(true)
                    }}
                  >
                    <IconTrash className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          <DataTableViewOptions table={table} />
        </div>
      </div>
    </>
  )
}
