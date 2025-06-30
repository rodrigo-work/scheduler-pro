// import FormCardSkeleton from '@/components/form-card-skeleton'
import PageContainer from '@/components/layout/page-container'
import { PageHeading } from '@/components/layout/page-heading'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@repo/ui/components/button'
import { Separator } from '@repo/ui/components/separator'
import { IconPlus } from '@tabler/icons-react'
import Link from 'next/link'
import EventsViewPage from '../components/events-view-page'
// import ProductViewPage from '@/features/products/components/product-view-page'

export const metadata = {
  title: 'Dashboard : Product View'
}

type PageProps = { params: Promise<{ eventId: string }> }

export default async function Page(props: PageProps) {
  const params = await props.params

  const product = null
  let pageTitle = 'Create New Event'

  if (params.eventId !== 'new') {
    // const data = await fakeProducts.getProductById(Number(productId))
    // product = data.product as Product
    // if (!product) {
    //   notFound()
    // }
    pageTitle = `Edit Event`
  }

  return (
    <PageContainer scrollable={false}>
      <div className="flex w-full flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <PageHeading
            title={pageTitle}
            description="Manage events (Server side table functionalities.)"
          />
          <Link
            href="/dashboard/events"
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <IconPlus className="mr-2 h-4 w-4" /> Voltar
          </Link>
        </div>
        <Separator />
        {/* <Suspense fallback={<FormCardSkeleton />}>
          <ProductViewPage productId={params.productId} />
        </Suspense> */}
        <EventsViewPage eventId={params.eventId} />
      </div>
    </PageContainer>
  )
}
