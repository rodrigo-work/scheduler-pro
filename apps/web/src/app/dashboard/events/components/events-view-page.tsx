// import { fakeProducts, Product } from '@/constants/mock-api'
// import { notFound } from 'next/navigation'

import ProductForm from './events-form'

type TProductViewPageProps = {
  eventId: string
}

export default async function EventsViewPage({
  eventId
}: TProductViewPageProps) {
  const product = null
  let pageTitle = 'Create New Event'

  if (eventId !== 'new') {
    // const data = await fakeProducts.getProductById(Number(productId))
    // product = data.product as Product
    // if (!product) {
    //   notFound()
    // }
    pageTitle = `Edit Event`
  }

  return (
    <>
      <ProductForm initialData={product} pageTitle={pageTitle} />
    </>
  )
}
