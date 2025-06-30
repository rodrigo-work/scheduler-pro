'use client'

// import { FileUploader } from '@/components/file-uploader'
import { Product } from '@/constants/mock-api'
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
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'Event name must be at least 3 characters.'
  }),
  description: z.string().optional(),
  location: z.string(),
  startTime: z.any(),
  endTime: z.any(),
  date: z.any().optional()
})

export default function ProductForm({
  initialData,
  pageTitle
}: {
  initialData: Product | null
  pageTitle: string
}) {
  const defaultValues = {
    name: initialData?.title || '',
    description: initialData?.description || '',
    location: initialData?.location || '',
    startTime: initialData?.startTime || '',
    endTime: initialData?.endTime || ''
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    showSubmittedData(values)
    // Form submission logic would be implemented here
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
                            {/* <FormDescription>
                              You can manage email addresses in your{' '}
                              <Link href="/examples/forms">email settings</Link>
                              .
                            </FormDescription> */}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guests</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter guests event" {...field} />
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
            <div className="h-screen-- flex w-full flex-row gap-4 p-4">
              <div className="flex flex-1 justify-end">
                <Button type="submit" form="events-form">
                  Invite <IconSend />
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
