import PageContainer from '@/components/layout/page-container'
import { searchParamsCache, serialize } from '@/lib/searchparams'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@repo/ui/components/button'
import { Separator } from '@repo/ui/components/separator'
import { DataTableSkeleton } from '@repo/ui/components/table/data-table-skeleton'
import { IconPlus } from '@tabler/icons-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'
import { PageHeader } from './_components/page-header'
import EventsPageListing from './_features/events-page-listing'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Manage events (Server side table functionalities.)'
}

type pageProps = { searchParams: Promise<SearchParams> }

export default async function EventsPage(props: pageProps) {
  const searchParams = await props.searchParams
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams)

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams })

  return (
    <PageContainer scrollable={false}>
      <div className="flex w-full flex-1 flex-col space-y-4">
        <PageHeader
          title={`Events`}
          description={`Manage events (Server side table functionalities.)`}
        >
          <Link
            href="/dashboard/events/new"
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <IconPlus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </PageHeader>
        <Separator />
        <Suspense
          key={key}
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={10} filterCount={2} />
          }
        >
          <EventsPageListing />
        </Suspense>
      </div>
    </PageContainer>
  )
}
