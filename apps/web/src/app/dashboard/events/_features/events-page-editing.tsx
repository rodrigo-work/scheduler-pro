import { redirect } from 'next/navigation'
import { getEventById } from '../actions'
import EventForm from '../components/events-form'
import { Event } from '../data/schema'

type EventsPageEditingProps = {
  eventId: any
}

export default async function EventsPageEditing({
  eventId
}: EventsPageEditingProps) {
  let event = null

  if (eventId !== 'new') {
    const data = await getEventById(eventId)
    // event = data.data as Event
    event = data.data[0] as Event

    if (!event) {
      redirect('/dashboard/events/new')
    }
  }

  return <EventForm initialData={event} />
}
