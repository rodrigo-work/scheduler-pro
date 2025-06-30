'use client'

import { showSubmittedData } from '@/lib/show-submitted-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@repo/ui/components/button'
import { Card, CardContent, CardFooter } from '@repo/ui/components/card'
import {
  Form,
  FormControl,
  FormDescription,
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
import { Loader2Icon, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod/v4'
import { delay } from '../actions'
import { locations } from '../data/data'
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
})

export default function EventForm({
  initialData
}: {
  initialData: Event | null
}) {
  const [loading, setLoading] = useState(false)
  const [inputGuestEmail, setInputGuestEmail] = useState('')

  const handleConfirm = async () => {
    // setLoading(true)
    // const updateUserWithId = await deleteEvent({ id: row.original?.id })
    // showSubmittedData(updateUserWithId)
    // setLoading(false)
    // setOpen(false)
  }

  const defaultValues = {
    name: initialData?.name || '',
    description: initialData?.description || '',
    location: initialData?.location || '',
    startTime: initialData?.startTime || '',
    endTime: initialData?.endTime || '',
    timezone: 'America/Sao_Paulo',
    aguest: Array.isArray(initialData?.guests)
      ? initialData?.guests.map((g) => g.guest.email)
      : []
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    await delay(3000)
    // const updateUserWithId = await updateUser(values)
    showSubmittedData(values)
    // Form submission logic would be implemented here
    setLoading(false)
  }

  return (
    <>
      <div className="flex h-full w-full flex-col justify-between space-y-4">
        <Card className="mx-auto h-full w-full">
          <div className="flex-1">
            <CardContent>
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
                          <Input
                            placeholder="Enter event name"
                            disabled={loading}
                            {...field}
                          />
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
                            disabled={loading}
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
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={loading}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select location to event" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {locations.map((item, index) => {
                                    return (
                                      <SelectItem
                                        key={index}
                                        value={item.value}
                                      >
                                        {item.icon && (
                                          <item.icon className="size-4" />
                                        )}
                                        {item.label}
                                      </SelectItem>
                                    )
                                  })}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )
                        }}
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
                                disabled={loading}
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
                              <Input
                                placeholder="Enter end event"
                                disabled={loading}
                                {...field}
                              />
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
                      const emailSchema = z.email()

                      const addTag = () => {
                        const newTag = inputGuestEmail

                        const result = emailSchema.safeParse(newTag)

                        if (!result.success) {
                          form.setError('aguest', {
                            type: 'server',
                            message: 'Invalid email address'
                          })
                        } else {
                          form.clearErrors('aguest')

                          if (newTag && !field.value.includes(newTag)) {
                            field.onChange([newTag, ...field.value])
                            // form.setValue('aguest', [...field.value])
                          }
                          setInputGuestEmail('')
                        }
                      }

                      const removeTag = (index: number) => {
                        const newTags = [...field.value]
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
                                  // {...field}
                                  type="email"
                                  placeholder="Type guest email and press Enter"
                                  className="pr-10"
                                  onChange={(e) => {
                                    setInputGuestEmail(e.target.value)
                                  }}
                                  onKeyDown={(e) => {
                                    if (
                                      e.key === 'Enter' ||
                                      e.key === ',' ||
                                      e.key === 'Tab'
                                    ) {
                                      e.preventDefault()
                                      addTag()
                                    }
                                  }}
                                  disabled={loading}
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
                            <FormDescription>
                              This is your public display name.
                            </FormDescription>
                            <FormMessage />
                            <div className="mt-2 flex flex-wrap gap-2">
                              {field.value &&
                                field.value.length > 0 &&
                                field.value
                                  .slice(0, 9)
                                  .map((tag: Event, index: number) => (
                                    <span
                                      key={index}
                                      className="bg-muted flex items-center gap-1 rounded px-2 py-1 text-sm"
                                    >
                                      {typeof tag === 'string'
                                        ? tag
                                        : tag.guests.guest.email}

                                      {index >= 0 && (
                                        <Button
                                          type="button"
                                          variant="secondary"
                                          size="icon"
                                          className="text-muted-foreground size-4"
                                          onClick={() => removeTag(index)}
                                          disabled={loading}
                                        >
                                          <X />
                                        </Button>
                                      )}
                                    </span>
                                  ))}
                              {field.value && field.value.length > 9 && (
                                <span className="bg-muted flex items-center gap-1 rounded px-2 py-1 text-sm">
                                  ... e mais {field.value.length - 9}
                                  convidados.
                                </span>
                              )}
                            </div>
                          </FormItem>
                        </>
                      )
                    }}
                  />
                </form>
              </Form>
            </CardContent>
          </div>
          <Separator />
          <CardFooter>
            <div className="flex w-full flex-row gap-4 p-4">
              <div className="flex flex-1 gap-4">
                <Button
                  className="w-[120px]"
                  type="submit"
                  form="events-form"
                  disabled={loading}
                >
                  {loading && <Loader2Icon className="animate-spin" />}
                  {initialData?.id ? 'Update' : 'Save'}
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
