import { z } from 'zod'

export const GuestSchema = z.object({
  id: z.string(),
  email: z.string()
})

export const EventGuestSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  guestId: z.string(),
  guest: GuestSchema
})

export const EventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  location: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  timezone: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  guests: EventGuestSchema
})

export type Event = z.infer<typeof EventSchema>
