export interface CreateEventDTO {
  title: string
  description?: string
  location?: string
  startTime: Date
  endTime: Date
  timezone: string
  guests: string[] // e-mails
}
