'use client'

import { showSubmittedData } from '@/lib/show-submitted-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@repo/ui/components/button'
import { Calendar } from '@repo/ui/components/calendar'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@repo/ui/components/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@repo/ui/components/form'
import { Input } from '@repo/ui/components/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@repo/ui/components/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@repo/ui/components/select'
import { Textarea } from '@repo/ui/components/textarea'
import { IconMailPlus, IconPlus, IconSend } from '@tabler/icons-react'
import { ChevronDownIcon, X } from 'lucide-react'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title is required.' }),
  // .email({ message: 'Email is invalid.' }),
  guest: z
    .array(z.string().email({ message: 'Invalid email address' }))
    .optional(),
  desc: z.string().optional(),
  date: z.date().optional(),
  startTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, { message: 'Start time must be in HH:MM format.' })
    .optional(),
  endTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, { message: 'End time must be in HH:MM format.' })
    .optional()
})

const timeOptions = Array.from({ length: 20 }, (_, i) => {
  const hour = 8 + Math.floor(i / 2) // 8:00 até 17:30
  const minutes = i % 2 === 0 ? '00' : '30'
  const label = `${hour.toString().padStart(2, '0')}:${minutes}`
  return label
})

type UserInviteForm = z.infer<typeof formSchema>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UsersInviteDialog({ open, onOpenChange }: Props) {
  const [open2, setOpen2] = useState(false)
  const [inputGuestEmail, setInputGuestEmail] = useState('')

  const form = useForm<UserInviteForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      guest: [],
      desc: '',
      date: new Date(),
      startTime: '',
      endTime: ''
    }
  })

  const { control, handleSubmit, watch, setError, clearErrors } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'guest'
  })

  const onSubmit = (values: UserInviteForm) => {
    form.reset()
    showSubmittedData(values)
    onOpenChange(false)
  }

  const addGuestEmail = () => {
    const email = inputGuestEmail.trim()
    if (!email) return
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('guest', { type: 'manual', message: 'Invalid email format' })
      return
    }
    if (watch('guest')?.includes(email)) {
      setError('guest', { type: 'manual', message: 'Email already added' })
      return
    }
    clearErrors('guest')
    append(email)
    setInputGuestEmail('')
  }

  const onGuestKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
      e.preventDefault()
      addGuestEmail()
    }
  }

  const guestEmails = watch('guest') || []

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-2">
            <IconMailPlus /> Invite User
          </DialogTitle>
          <DialogDescription>
            Invite new user to join your team by sending them an email
            invitation. Assign a role to define their access level.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="user-invite-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      type="tsxt"
                      // placeholder="eg: john.doe@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Novo campo guest com array de emails */}
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="Add a personal note to your invitation (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data</FormLabel>
                  <Popover open={open2} onOpenChange={setOpen2}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          id="date"
                          className="w-full justify-between font-normal"
                        >
                          {field.value
                            ? field.value.toLocaleDateString({
                                timeZone: 'America/Sao_Paulo',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })
                            : 'Select date'}
                          <ChevronDownIcon />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          field.onChange(date)
                          setOpen2(false)
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Start Time</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ''}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>End Time</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ''}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name="guest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guests (multiple emails)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="Type guest email and press Enter"
                        value={inputGuestEmail}
                        onChange={(e) => setInputGuestEmail(e.target.value)}
                        onKeyDown={onGuestKeyDown}
                        className="pr-10" // espaço para o botão
                      />
                      <button
                        type="button"
                        onClick={addGuestEmail}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label="Add guest email"
                      >
                        <IconPlus size={20} />
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                  <div className="mb-2 flex flex-wrap gap-2">
                    {guestEmails.map((email, index) => (
                      <div
                        key={`${email}-${index}`}
                        className="inline-flex items-center rounded bg-gray-200 px-2 py-1 text-xs"
                      >
                        {email}
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="ml-1 text-gray-500 hover:text-gray-700"
                          aria-label="Remove email"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="gap-y-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="user-invite-form">
            Invite <IconSend />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
