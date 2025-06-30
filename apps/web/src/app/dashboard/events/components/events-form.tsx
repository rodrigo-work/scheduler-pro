'use client'

import { showSubmittedData } from '@/lib/show-submitted-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@repo/ui/components/button'
import { Card, CardContent, CardFooter } from '@repo/ui/components/card'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@repo/ui/components/select'
import { Separator } from '@repo/ui/components/separator'
import { Textarea } from '@repo/ui/components/textarea'
import { IconSend } from '@tabler/icons-react'
import { Loader2Icon, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod/v4'
import { delay } from '../actions'
import { Event } from '../data/schema'

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'Event name must be at least 3 characters.'
  }),
  description: z.string().optional(),
  location: z.string(),
  startTime: z.any(),
  endTime: z.any(),
  timezone: z.string(),

  aguest: z.any()

  // aGuest: z
  //   .array(z.string().email('E-mail inválido'))
  //   .nonempty('Adicione pelo menos um e-mail')
  // aguest: z.array(
  //   z.string().min(3, {
  //     message: 'Event name must be at least 3 characters.'
  //   })
  // )
  // aguest: z.tuple([z.string()], z.email())
  // => [string, ...string[]]

  // mGuests: z
  //   .array(
  //     z.object({
  //       email: z.string().email('Invalid email')
  //     })
  //   )
  //   .min(1, 'At least one guest is required')

  // guest: z
  //   .array(z.string().email({ message: 'Invalid email address' }))
  //   .optional()
  // mGuests: z.array(z.string())

  // guest: z.array(
  //   z
  //     .string()
  //     .min(2, { message: 'Email is required.' })
  //     .email({ message: 'Invalid email address' })
  // )
})

export default function EventForm({
  initialData
}: {
  initialData: Event | null
}) {
  const [loading, setLoading] = useState(false)

  // const [inputValue, setInputValue] = useState('')
  // const [inputGuestEmail, setInputGuestEmail] = useState('')

  const handleConfirm = async () => {
    // setLoading(true)
    // const updateUserWithId = await deleteEvent({ id: row.original?.id })
    // showSubmittedData(updateUserWithId)
    // setLoading(false)
    // setOpen(false)
  }

  const defaultValues = {
    name: initialData?.name || '',
    description: initialData?.description || 'description',
    location: initialData?.location || 'WhatsApp',
    startTime: initialData?.startTime || '2025-11-09T11:52:32.166Z',
    endTime: initialData?.endTime || '2025-11-09T11:52:32.166Z',
    timezone: 'America/Sao_Paulo',
    // mGuests: initialData?.guests?.guest || [
    //   'bob@email.com',
    //   'joe@emil.com',
    //   'ana@email.com'
    // ],

    // guest: initialData?.guests

    aguest: Array.isArray(initialData?.guests)
      ? initialData?.guests.map((g) => g.guest.email)
      : []
    // ? initialData.guests.guest
    // : typeof initialData?.guests?.guest?.email === 'string'
    //   ? [initialData.guests.guest.email]
    //   : ''
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    await delay(2000)
    // const updateUserWithId = await updateUser(values)
    showSubmittedData(values)
    // Form submission logic would be implemented here
    setLoading(false)
  }
  // const [inputGuestEmail, setInputGuestEmail] = useState('')

  // const { control, handleSubmit, watch, setError, clearErrors } = form
  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: 'guest'
  // })
  // const addGuestEmail = () => {
  //   const email = inputGuestEmail.trim()
  //   if (!email) return
  //   if (!/^\S+@\S+\.\S+$/.test(email)) {
  //     setError('guest', { type: 'manual', message: 'Invalid email format' })
  //     return
  //   }
  //   if (watch('guest')?.includes(email)) {
  //     setError('guest', { type: 'manual', message: 'Email already added' })
  //     return
  //   }
  //   clearErrors('guest')
  //   append(email)
  //   setInputGuestEmail('')
  // }

  // const onGuestKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
  //     e.preventDefault()
  //     addGuestEmail()
  //   }
  // }

  // const guestEmails = watch('guest') || []

  // const { fields, append, remove } = useFieldArray({
  //   control: form.control,
  //   name: 'mGuests'
  // })

  return (
    <>
      <div className="flex h-full w-full flex-col justify-between space-y-4">
        <Card className="mx-auto h-full w-full">
          <div className="flex-1">
            <CardContent>
              {/* {JSON.stringify(initialData)} */}
              <Form {...form}>
                <form
                  id="events-form"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter event name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter event description"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-row gap-4">
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select location to event" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="m@example.com">
                                  m@example.com
                                </SelectItem>
                                <SelectItem value="m@google.com">
                                  m@google.com
                                </SelectItem>
                                <SelectItem value="m@support.com">
                                  m@support.com
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="timezone"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Timezone</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter start event"
                                readOnly
                                disabled
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Start event</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter start event"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>End event</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter end event" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="aguest"
                    render={({ field }) => {
                      const aGuest = field.value
                      const [inputValue, setInputValue] = useState('')

                      const addTag = () => {
                        const newTag = inputValue
                        if (newTag && !aGuest.includes(newTag)) {
                          field.onChange([newTag, ...aGuest])
                        }
                        setInputValue('')
                      }

                      // Schema de e-mail
                      // const emailSchema = z.string().email('E-mail inválido')

                      // const addTag = () => {
                      //   const newTag = inputValue.trim()

                      //   if (!newTag) return

                      //   // Apenas adiciona se não estiver na lista
                      //   if (!aGuest.includes(newTag)) {
                      //     field.onChange('aGuest', [newTag, ...aGuest], {
                      //       shouldValidate: true // <- força validação pelo schema
                      //     })
                      //   }

                      //   setInputValue('')
                      // }

                      const removeTag = (index: number) => {
                        const newTags = [...aGuest]
                        newTags.splice(index, 1)
                        field.onChange(newTags)
                      }

                      return (
                        <>
                          <FormItem>
                            <FormLabel>Guests (multiple emails)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  // type="email"
                                  placeholder="Type guest email and press Enter"
                                  className="pr-10"
                                  // defaultValue={inputValue}
                                  onChange={(e) =>
                                    setInputValue(e.target.value)
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ',') {
                                      e.preventDefault()
                                      addTag()
                                    }
                                    // if (e.key === 'Backspace' && !inputValue) {
                                    //   removeTag(aGuest.length - 1)
                                    // }
                                  }}
                                  // {...field}
                                />
                                <Button
                                  type="button"
                                  variant="secondary"
                                  size="icon"
                                  className="text-muted-foreground absolute right-3 top-1/2 size-4 h-4 w-4 -translate-y-1/2 transform"
                                  onClick={addTag}
                                >
                                  <Plus />
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                            {/* {JSON.stringify(aGuest)} */}
                            <div className="mt-2 flex flex-wrap gap-2">
                              {aGuest &&
                                aGuest
                                  // .slice(0, 10)
                                  .map((tag, index: number) => (
                                    <span
                                      key={index}
                                      className="bg-muted flex items-center gap-1 rounded px-2 py-1 text-sm"
                                    >
                                      {/* {JSON.stringify(tag)} */}
                                      {typeof tag === 'string'
                                        ? tag
                                        : tag.guest.email}

                                      {index >= 0 && (
                                        <Button
                                          type="button"
                                          variant="secondary"
                                          size="icon"
                                          className="text-muted-foreground size-4"
                                          onClick={() => removeTag(index)}
                                        >
                                          <X />
                                        </Button>
                                      )}
                                    </span>
                                  ))}
                              {aGuest && aGuest.length > 10 && (
                                <span className="text-muted-foreground-- text-sm-- bg-muted flex items-center gap-1 rounded px-2 py-1 text-sm">
                                  ... e mais {aGuest.length - 10} convidados.
                                </span>
                              )}
                            </div>
                          </FormItem>
                        </>
                      )
                    }}
                  />
                  {/* <FormField
                    control={control}
                    name="guest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guests (multiple emails)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              // type="email"
                              placeholder="Type guest email and press Enter"
                              value={inputGuestEmail}
                              onChange={(e) =>
                                setInputGuestEmail(e.target.value)
                              }
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
                              {JSON.stringify(email)}
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
                  /> */}
                  {/* <FormField
                    // control={form.control}
                    // name="mGuests"
                    //  key={field.id}
            // control={form.control}
            // name={`mGuests.${index}.email`}
                    // render={({ field }) => {
                      // const aGuest = field.value
                      // const [inputValue, setInputValue] = useState('')

                      // const addTag = () => {
                      //   const newTag = inputValue
                      //   if (newTag && !aGuest.includes(newTag)) {
                      //     field.onChange([newTag, ...aGuest])
                      //   }
                      //   setInputValue('')
                      // }

                      // const removeTag = (index: number) => {
                      //   const newTags = [...aGuest]
                      //   newTags.splice(index, 1)
                      //   field.onChange(newTags)
                      // }

                      return (
                        <FormItem>
                          <FormLabel>Guests (multiple emails)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Type guest email and press Enter"
                                // type="email"
                                className="pr-10"
                                // defaultValue={inputValue}
                                // onChange={(e) => setInputValue(e.target.value)}
                                // onKeyDown={(e) => {
                                //   if (e.key === 'Enter' || e.key === ',') {
                                //     e.preventDefault()
                                //     addTag()
                                //   }
                                //   if (e.key === 'Backspace' && !inputValue) {
                                //     removeTag(aGuest.length - 1)
                                //   }
                                // }}
                                // {...field}
                              />
                              <Button
                                type="button"
                                variant="secondary"
                                size="icon"
                                className="text-muted-foreground absolute right-3 top-1/2 size-4 h-4 w-4 -translate-y-1/2 transform"
                                // onClick={addTag}
                              >
                                <Plus />
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                          {/* <div className="mt-2 flex flex-wrap gap-2">
                            {aGuest &&
                              aGuest.slice(0, 10).map((tag, index: number) => (
                                <span
                                  key={index}
                                  className="bg-muted flex items-center gap-1 rounded px-2 py-1 text-sm"
                                >
                                   {JSON.stringify(tag)}
                                  {typeof tag === 'string'
                                    ? tag
                                    : tag.guest.email}

                                  {index >= 0 && (
                                    <Button
                                      type="button"
                                      variant="secondary"
                                      size="icon"
                                      className="text-muted-foreground size-4"
                                      onClick={() => removeTag(index)}
                                    >
                                      <X />
                                    </Button>
                                  )}
                                </span>
                              ))}
                            {aGuest && aGuest.length > 10 && (
                              <span className="text-muted-foreground-- text-sm-- bg-muted flex items-center gap-1 rounded px-2 py-1 text-sm">
                                ... e mais {aGuest.length - 10} convidados.
                              </span>
                            )}
                          </div>
                        </FormItem>
                      )
                    }}
                  /> */}
                </form>
              </Form>
            </CardContent>
          </div>
          <Separator />
          <CardFooter>
            <div className="h-screen-- flex w-full flex-row gap-4 p-4">
              <div className="justify-end-- flex flex-1">
                <Button type="submit" form="events-form" disabled={loading}>
                  {loading && <Loader2Icon className="animate-spin" />}
                  Invite <IconSend />
                  {initialData?.id ? 'sim' : 'nao'}
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
