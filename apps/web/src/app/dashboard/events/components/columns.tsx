'use client'

import { formatDate } from '@/lib/date'
import { Badge } from '@repo/ui/components/badge'
import { Button } from '@repo/ui/components/button'
import { Checkbox } from '@repo/ui/components/checkbox'
import { DataTableColumnHeader } from '@repo/ui/components/table/data-table-column-header'
import { IconClockPlay, IconClockStop, IconEdit } from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { locations } from '../data/data'
import { Event } from '../data/schema'

export const columns: ColumnDef<Event>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    id: 'id',
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: function IdCell({ row }) {
      const uuid = String(row.getValue('id')).split('-')[0]
      const router = useRouter()
      return (
        <div className="w-[80px]">
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
            onClick={() =>
              router.push(`/dashboard/events/${row.getValue('id')}`)
            }
          >
            <IconEdit className="h-4 w-4" />
            {uuid}
          </Button>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: true
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex max-w-[400px] flex-col gap-2">
          <div className="font-medium">{row.getValue('name')}</div>
          <div className="text-muted-foreground whitespace-normal">
            {row.original?.description}
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'location',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => {
      const location = locations.find(
        (location) => location.value === row.getValue('location')
      )

      if (!location) {
        return null
      }

      return (
        <div className="flex flex-row items-center gap-2">
          <div>{location.icon && <location.icon className="size-4" />}</div>
          <div className="font-medium">{location.label}</div>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex flex-1 items-center gap-2">
            <IconClockPlay className="size-4" />
            {formatDate(row.original?.startTime)}
          </div>
          <div className="flex flex-1 items-center gap-2">
            <IconClockStop className="size-4" />
            {formatDate(row.original?.endTime)}
          </div>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    id: 'guests',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Guests" />
    ),
    cell: ({ row }) => {
      const total = Array.isArray(row.original?.guests)
        ? row.original.guests.length
        : 0
      const confirmed = Array.isArray(row.original?.guests)
        ? row.original.guests.filter((g) => g.confirmed).length
        : 0

      return (
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex flex-1 items-center gap-2">
            <Badge variant="outline" onClick={() => alert('ok')}>
              confirmed {confirmed} of {total} guests
            </Badge>
          </div>
        </div>
      )
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <>{/* <DataTableRowActions row={row} /> */}</>
  }
]
