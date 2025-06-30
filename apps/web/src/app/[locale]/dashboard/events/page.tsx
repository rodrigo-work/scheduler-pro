import PageContainer from '@/components/layout/page-container'
import { searchParamsCache, serialize } from '@/lib/searchparams'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@repo/design-system/components/ui/button'
import { Separator } from '@repo/design-system/components/ui/separator'
import { getDictionary } from '@repo/internationalization'
import { IconPlus } from '@tabler/icons-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { SearchParams } from 'nuqs/server'
import { PageHeader } from './_components/page-header'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Manage events (Server side table functionalities.)'
}

type pageProps = {
  searchParams: Promise<SearchParams>
  readonly params: Promise<{
    locale: string
  }>
}

export default async function EventsPage(props: pageProps) {
  const { locale } = await props.params
  const dictionary = await getDictionary(locale)

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
        {/* <Suspense
          key={key}
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={10} filterCount={2} />
          }
        > */}
        {/* <EventsPageListing /> */}
        {/* </Suspense> */}
      </div>
    </PageContainer>
  )
}
