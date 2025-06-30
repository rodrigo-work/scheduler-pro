import { delay } from '@/lib/utils'
import { RecentSales } from './recent-sales'

export default async function Sales() {
  await delay(1000)
  return <RecentSales />
}
