import PageContainer from '@/components/layout/page-container'
import { PageHeading } from '@/components/layout/page-heading'
import { searchParamsCache } from '@/lib/searchparams'
import { cn } from '@/lib/utils'
import {
  Button,
  buttonVariants
} from '@repo/design-system/components/ui/button'
import { Separator } from '@repo/design-system/components/ui/separator'
import { IconPlus } from '@tabler/icons-react'
import Link from 'next/link'
import { SearchParams } from 'nuqs/server'

export const metadata = {
  title: 'Home',
  description: 'Manage home'
}

type pageProps = { searchParams: Promise<SearchParams> }

export default async function HomePage(props: pageProps) {
  const searchParams = await props.searchParams
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams)

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  // const key = serialize({ ...searchParams })

  return (
    <PageContainer scrollable={false}>
      <div className="flex w-full flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <PageHeading
            title={metadata.title ?? ''}
            description={metadata.description ?? ''}
          />
          <div className="flex gap-2">
            {/* <CardsChat users={[]} /> */}
            <Link
              href="/dashboard/events/new"
              className={cn(buttonVariants(), 'text-xs md:text-sm')}
            >
              <IconPlus className="mr-2 h-4 w-4" /> Add New
            </Link>
          </div>
        </div>
        <Separator />

        <div className="w-64 border p-4">
          <p className="whitespace-normal break-words">
            UmTextoMuitoMuitoLongoQueDeveSerQuebradoAutomaticamenteMesmoSemEspaços.
          </p>
        </div>

        <div className="flex min-h-svh items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Hello World</h1>
            <Button size="sm">Button</Button>
          </div>
        </div>

        <p>{process.env.NODE_ENV !== 'production' ? 'dev' : 'prod'}</p>

        <code>{JSON.stringify(process.env.NODE_ENV, null, 2)}</code>
        {/* <Suspense
          key={key}
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
          }
        >
          <EventsPageListing />
        </Suspense> */}
      </div>
    </PageContainer>
  )
}
