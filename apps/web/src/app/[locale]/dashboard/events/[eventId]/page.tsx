// import FormCardSkeleton from '@/components/form-card-skeleton'
import FormCardSkeleton from '@/components/form-card-skeleton'
import PageContainer from '@/components/layout/page-container'
import { Separator } from '@repo/design-system/components/ui/separator'
import { getDictionary } from '@repo/internationalization'
import { Suspense } from 'react'
import { PageHeader } from '../_components/page-header'
import { getEventById } from '../actions'
import EventForm from '../components/events-form'

export const metadata = {
  title: 'Event View',
  description: 'Manage events (Server side table functionalities.)'
}

type EventsPageProps = {
  readonly params: Promise<{
    locale: string
    eventId: string
  }>
}

export default async function EventsPage({ params }: EventsPageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  const { eventId } = await params

  let event
  let pageTitle = dictionary.app.events.new.title

  if (eventId !== 'new') {
    const { data } = await getEventById({ id: eventId })
    event = data as Event
    // if (!data) {
    //   notFound()
    // }
    pageTitle = `Edit Event`
    console.log(locale, eventId)
  }

  return (
    <PageContainer scrollable={true}>
      <div className="mb-500 flex w-full flex-1 flex-col space-y-4">
        <PageHeader
          title={pageTitle}
          // description={dictionary.app.events.new.description}
        />
        <Separator />
        <Suspense fallback={<FormCardSkeleton />}>
          <EventForm dictionary={dictionary} initialData={event} />
          {/* <ProductViewPage productId={params.productId} />*/}
          {/* <EventsPageEditing eventId={params.eventId} /> */}
        </Suspense>
      </div>
    </PageContainer>
  )
}
