'use client'

import { showSubmittedData } from '@/lib/show-submitted-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@repo/design-system/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter
} from '@repo/design-system/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@repo/design-system/components/ui/form'
import { Input } from '@repo/design-system/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@repo/design-system/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@repo/design-system/components/ui/select'
import { Separator } from '@repo/design-system/components/ui/separator'
import { Textarea } from '@repo/design-system/components/ui/textarea'
import { Dictionary } from '@repo/internationalization'
import { ChevronDownIcon, Loader2Icon, Plus, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod/v4'
import { DateTimeSelector } from '../_components/date-time-selector'
import { locations } from '../data/data'

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, {
    message: 'Event name must be at least 3 characters.'
  }),
  description: z.string().optional(),
  location: z.string(),
  startTime: z.iso.datetime({
    message: 'Start time must be a valid date and time.'
  }),
  endTime: z.any(),
  timezone: z.string(),
  aguest: z.array(z.email())
})

type EventFormProps = {
  dictionary: Dictionary
  initialData: any
}

export default function EventForm({ dictionary, initialData }: EventFormProps) {
  const defaultValues = {
    id: initialData?.id || '',
    name: initialData?.name || 'teste',
    description: initialData?.description || '',
    location: initialData?.location || '',
    startTime: initialData?.startTime || '',
    endTime: initialData?.endTime || '',
    timezone: 'America/Sao_Paulo',
    aguest: Array.isArray(initialData?.guests)
      ? initialData?.guests.map(
          (g: { guest: { email: string } }) => g.guest.email
        )
      : []
  }

  const [loading, setLoading] = useState(false)
  const [inputGuestEmail, setInputGuestEmail] = useState('')

  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 12))
  const [selectedTime, setSelectedTime] = useState<string | null>('10:00')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  })

  async function onCreate(values: z.infer<typeof formSchema>) {
    setLoading(true)

    // const create = await createEvent(values)
    showSubmittedData(values)
    // Form submission logic would be implemented here
    setLoading(false)
  }

  async function onUpdate(values: z.infer<typeof formSchema>) {
    setLoading(true)
    // const update = await updateEvent(values)
    showSubmittedData(values)
    // Form submission logic would be implemented here
    setLoading(false)
  }

  useEffect(() => {
    const value = form.getValues('startTime')
    if (value) {
      const parsed = new Date(value)
      if (!isNaN(parsed.getTime())) {
        setDate(parsed)
        setSelectedTime(parsed.toTimeString().slice(0, 5))
      }
    }
  }, [form])
  return (
    <>
      <div className="flex h-full w-full flex-col justify-between space-y-4">
        <Card className="mx-auto h-full w-full">
          <div className="flex-1">
            <CardContent>
              <Form {...form}>
                <form
                  id="events-form"
                  onSubmit={form.handleSubmit(
                    initialData?.id ? onUpdate : onCreate
                  )}
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
                        render={({ field }) => {
                          return (
                            <FormItem className="flex-1">
                              <FormLabel>Start event</FormLabel>
                              <FormControl>
                                <Popover open={open} onOpenChange={setOpen}>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-full justify-between font-normal"
                                    >
                                      {date && selectedTime
                                        ? `${date.toLocaleDateString()} at ${selectedTime}`
                                        : 'Select date & time'}
                                      <ChevronDownIcon />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="end"
                                  >
                                    <DateTimeSelector
                                      date={date}
                                      selectedTime={selectedTime}
                                      onDateChange={(newDate) =>
                                        setDate(newDate)
                                      }
                                      onTimeSelect={(time) => {
                                        setSelectedTime(time)
                                        setOpen(false)
                                      }}
                                      onChange={field.onChange}
                                      dictionary={dictionary}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )
                        }}
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
                                  .map((tag: string, index: number) => (
                                    <span
                                      key={index}
                                      className="bg-muted flex items-center gap-1 rounded px-2 py-1 text-sm"
                                    >
                                      {tag}

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
                              {field.value && field.value.length > 10 && (
                                <span className="bg-muted flex items-center gap-1 rounded px-2 py-1 text-sm">
                                  {`... em mais ${field.value.length - 10} convidados`}
                                </span>
                              )}
                            </div>
                          </FormItem>
                        </>
                      )
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input disabled={loading} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </div>
          <Separator />
          <CardFooter>
            <div className="flex w-full gap-4 p-4">
              <div className="flex flex-1 gap-4">
                <Button
                  className="w-[160px]"
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
