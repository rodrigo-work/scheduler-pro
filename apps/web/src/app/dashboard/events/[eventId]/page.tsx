// import FormCardSkeleton from '@/components/form-card-skeleton'
import FormCardSkeleton from '@/components/form-card-skeleton'
import PageContainer from '@/components/layout/page-container'
import { Separator } from '@repo/ui/components/separator'
import { Suspense } from 'react'
import { PageHeader } from '../_components/page-header'
import EventsPageEditing from '../_features/events-page-editing'

export const metadata = {
  title: 'Event View',
  description: 'Manage events (Server side table functionalities.)'
}

type PageProps = { params: Promise<{ eventId: string }> }

export default async function EventsPage(props: PageProps) {
  const params = await props.params

  const product = null
  let pageTitle = 'Create Event'

  if (params.eventId !== 'new') {
    // const data = await fakeProducts.getProductById(Number(productId))
    // product = data.product as Product
    // if (!product) {
    //   notFound()
    // }
    pageTitle = `Edit Event`
  }

  return (
    <PageContainer scrollable={true}>
      <div className="flex w-full flex-1 flex-col space-y-4">
        <PageHeader title={pageTitle} description={metadata.description} />
        <Separator />
        <Suspense fallback={<FormCardSkeleton />}>
          {/* <ProductViewPage productId={params.productId} />*/}
          <EventsPageEditing eventId={params.eventId} />{' '}
        </Suspense>
      </div>
    </PageContainer>
  )
}
