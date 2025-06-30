'use client'

import { Checkbox } from '@repo/ui/components/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { locations } from '../data/data'
import { Task } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'
import { DataTableColumnHeader } from './table/data-table-column-header'

export const columns: ColumnDef<Task>[] = [
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
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      const uuid = String(row.getValue('id')).split('-')[0]
      return <div className="w-[80px]--">{uuid}</div>
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex max-w-[500px] flex-col gap-2">
          <div className="flex-1 font-medium">
            {row.getValue('title')}
            {/* <Badge variant="destructive">
            </Badge> */}
          </div>
          <div className="text-muted-foreground flex-1 truncate text-xs">
            {row.original?.description}
          </div>
        </div>
        // <div className="flex gap-2">
        //   {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
        //   <span className="max-w-[500px] truncate font-medium">
        //     {row.getValue('title')} <br />
        //     <div className="text-muted-foreground mt-2">
        //       {row.original?.description}
        //     </div>
        //   </span>
        // </div>
      )
    }
  },
  {
    accessorKey: 'location',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = locations.find(
        (priority) => priority.value === row.getValue('location')
      )

      if (!priority) {
        return null
      }

      return (
        <div className="flex items-center gap-2">
          {priority.icon && (
            <priority.icon className="text-muted-foreground size-4" />
          )}
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    id: 'guests',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Guests" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[80px]-- text-center">
          {Array.isArray(row.original?.guests) && row.original.guests.length}
          {/* {Array.isArray(row.original?.guests) &&
            row.original.guests.map((tdf, index) => (
              <div key={index}>
                <p> {tdf.guest.email}</p>
              </div>
            ))} */}
        </div>
      )
    },
    size: 1120,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const isoStringStartTime = row.original?.startTime
      const startTime = new Date(isoStringStartTime)

      const isoStringEndTime = row.original?.endTime
      const endTime = new Date(isoStringEndTime)

      return (
        <div className="flex flex-col gap-2">
          <div className="flex-1 truncate font-medium">
            {startTime.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
            {/* <Badge variant="destructive">
            </Badge> */}
          </div>
          <div className="text-muted-foreground flex-1 text-xs">
            {startTime.toLocaleTimeString()} | {endTime.toLocaleTimeString()}
          </div>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
  },
  // {
  //   accessorKey: 'status',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue('status')
  //     )

  //     if (!status) {
  //       return null
  //     }

  //     return (
  //       <div className="flex w-[100px] items-center gap-2">
  //         {status.icon && (
  //           <status.icon className="text-muted-foreground size-4" />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   }
  // },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
]
