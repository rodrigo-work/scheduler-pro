import PageContainer from '@/components/layout/page-container'
import { PageHeading } from '@/components/layout/page-heading'
import { searchParamsCache } from '@/lib/searchparams'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@repo/ui/components/button'
import { Separator } from '@repo/ui/components/separator'
import { IconPlus } from '@tabler/icons-react'
import Link from 'next/link'
import { Metadata } from 'next/types'
import { SearchParams } from 'nuqs/server'
import EventsListingPage from './components/events-listing-page'

export const metadata: Metadata = {
  title: 'Dashboard: Events'
}

type pageProps = { searchParams: Promise<SearchParams> }

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams)

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  // const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className="flex w-full flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <PageHeading
            title="Events"
            description="Manage events (Server side table functionalities.)"
          />
          <Link
            href="/dashboard/events/new"
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <IconPlus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        {/* <CardsChat /> */}
        <Separator />
        {/* <Suspense
          // key={key}
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
          }
        > */}
        <EventsListingPage />
        {/* </Suspense> */}
      </div>
    </PageContainer>
  )
}
