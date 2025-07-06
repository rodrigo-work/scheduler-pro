export interface CreateEventDTO {
  name: string
  description?: string
  location?: string
  startTime: Date
  endTime: Date
  timezone: string
  guests: string[] // e-mails
}
