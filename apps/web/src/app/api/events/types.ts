export interface GuestInfo {
  id: string
  email: string
}

export interface Guest {
  id: string
  eventId: string
  guestId: string
  guest: GuestInfo
}

export interface Event {
  id: string
  title: string
  description: string
  location: string
  startTime: Date
  endTime: Date
  timezone: string
  createdAt: string
  updatedAt: string
  guests: Guest[]
}
