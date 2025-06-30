'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/avatar'
import { Button } from '@repo/ui/components/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@repo/ui/components/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@repo/ui/components/dialog'
import { Check, Plus } from 'lucide-react'
import * as React from 'react'

const users2 = [
  {
    name: 'Olivia Martin',
    email: 'm@example.com',
    avatar: '/avatars/01.png'
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    avatar: '/avatars/03.png'
  },
  {
    name: 'Emma Wilson',
    email: 'emma@example.com',
    avatar: '/avatars/05.png'
  },
  {
    name: 'Jackson Lee',
    email: 'lee@example.com',
    avatar: '/avatars/02.png'
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    avatar: '/avatars/04.png'
  }
] as const

type User = (typeof users2)[number]

// type User = {
//   id: string
//   email: string
// }

// interface CardsChatProps {
//   users: User[]
// }

export function CardsChat() {
  const [open, setOpen] = React.useState(false)
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([])

  const data = users2

  return (
    <>
      <Button
        variant="outline"
        className="ml-auto"
        onClick={() => setOpen(true)}
      >
        <Plus /> Guests
        <span className="sr-only">New guest</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-0 outline-none">
          <DialogHeader className="px-4 pb-4 pt-5">
            <DialogTitle>Guests</DialogTitle>
            <DialogDescription>
              Invite a guest to this thread. This will create a new group
              message.{JSON.stringify(selectedUsers)}
            </DialogDescription>
          </DialogHeader>
          <Command className="overflow-hidden rounded-t-none border-t bg-transparent">
            <CommandInput placeholder="Search guest..." />
            <CommandList>
              <CommandEmpty>No guest found.</CommandEmpty>
              <CommandGroup className="p-2">
                {data.map((user, index) => (
                  <CommandItem
                    key={user.email}
                    className="flex items-center px-2"
                    onSelect={() => {
                      if (selectedUsers.includes(user)) {
                        return setSelectedUsers(
                          selectedUsers.filter(
                            (selectedUser) => selectedUser !== user
                          )
                        )
                      }

                      return setSelectedUsers(
                        [...data].filter((u) =>
                          [...selectedUsers, user].includes(u)
                        )
                      )
                    }}
                  >
                    <Avatar>
                      {/* <AvatarImage src={user.avatar} alt="Image" /> */}
                      <AvatarFallback>
                        {user.email[0].toUpperCase()}
                        {user.email[1].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      {/* <p className="text-sm font-medium leading-none">
                        {user.id}
                      </p> */}
                      <p className="text-muted-foreground text-sm">
                        {user.email}
                      </p>
                    </div>
                    {selectedUsers.includes(user) ? (
                      <Check className="text-primary ml-auto flex h-5 w-5" />
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
            {selectedUsers.length > 0 ? (
              <div className="flex -space-x-2 overflow-hidden">
                {selectedUsers.map((user) => (
                  <Avatar
                    key={user.email}
                    className="border-background inline-block border-2"
                  >
                    <AvatarImage src={user.email} />
                    <AvatarFallback>
                      {user.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Select guests to add to this thread.
              </p>
            )}
            <Button
              disabled={selectedUsers.length < 2}
              onClick={() => {
                setOpen(false)
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
