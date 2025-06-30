'use client'

import { ConfirmDialog } from '@/components/confirm-dialog'
import { Button } from '@repo/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@repo/ui/components/dropdown-menu'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { Row } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Event } from '../../data/schema'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData extends Event>({
  row
}: DataTableRowActionsProps<TData>) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)

    // const updateUserWithId = await deleteEvent({ id: row.original?.id })
    // showSubmittedData(updateUserWithId)

    setLoading(false)
    setOpen(false)
  }
  return (
    <>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={`Delete this event: ${row.original.name}?`}
        desc={
          <>
            You are about to delete a event with the ID{' '}
            <strong>{row.original.id}</strong>. <br />
            This action cannot be undone.
          </>
        }
        confirmText="Delete"
        cancelBtnText="Cancel"
        destructive
        isLoading={loading}
        handleConfirm={handleConfirm}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="data-[state=open]:bg-muted size-8"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/events/${row.original.id}`)}
          >
            <IconEdit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={() => setOpen(true)}>
            <IconTrash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
