import { searchParamsCache } from '@/lib/searchparams'
import { getAllEvents } from '../actions'
import { columns } from '../components/columns'
import { EventsTable } from '../components/events-table'
import { Event } from '../data/schema'

export default async function EventsPageListing() {
  const page = searchParamsCache.get('page')
  const limit = searchParamsCache.get('limit')
  const search = searchParamsCache.get('search')

  const filters = {
    page,
    limit,
    ...(search && { search })
  }

  const data = await getAllEvents(filters)
  const total = data.total
  const events: Event[] = data.data

  return <EventsTable data={events} totalItems={total} columns={columns} />
}
