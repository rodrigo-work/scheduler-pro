// import { Product } from '@/constants/data'
// import { fakeProducts } from '@/constants/mock-api'
import { searchParamsCache } from '@/lib/searchparams'
import { notFound } from 'next/navigation'
import { columns } from './columns'
import { DataTable } from './table/data-table'
// import { ProductTable } from './product-tables'
// import { columns } from './product-tables/columns'

type EventsListingPageProps = {}

// Simulate a database read for tasks.
async function getUsers() {
  // const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`)
  const result = await fetch(`https://localhost:3000/events.json`)

  if (!result.ok) {
    throw new Error('Something went wrong!')
  }

  const users = await result.json()

  if (users.data.length === 0) {
    notFound()
  }

  return users
}

export default async function EventsListingPage({}: EventsListingPageProps) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page')
  const search = searchParamsCache.get('name')
  const pageLimit = searchParamsCache.get('perPage')
  const categories = searchParamsCache.get('category')

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  }

  const { data: tasks } = await getUsers()
  // const data = await fakeProducts.getProducts(filters)
  // const totalProducts = data.total_products
  // const products: Product[] = data.products

  return (
    <>
      {/* <code>{JSON.stringify(tasks)}</code> */}

      <DataTable data={tasks} columns={columns} />
    </>
    // <ProductTable
    //   data={products}
    //   totalItems={totalProducts}
    //   columns={columns}
    // />
  )
}
