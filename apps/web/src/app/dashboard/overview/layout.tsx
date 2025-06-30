import PageContainer from '@/components/layout/page-container'

export default function OverViewLayout({
  sales,
  bar_stats,
  children
}: {
  sales: React.ReactNode
  bar_stats: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>

        {children}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">{bar_stats}</div>
          <div className="col-span-4 md:col-span-3">
            {/* sales arallel routes */}
            {sales}
          </div>
          {/* <div className="col-span-4">{area_stats}</div> */}
          {/* <div className="col-span-4 md:col-span-3">{pie_stats}</div> */}
        </div>
      </div>
    </PageContainer>
  )
}
