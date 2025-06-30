// import KBar from '@/components/kbar'
import AppSidebar from '@/components/layout/app-sidebar'
import Header from '@/components/layout/header'
import {
  SidebarInset,
  SidebarProvider
} from '@repo/design-system/components/ui/sidebar'
import { getDictionary } from '@repo/internationalization'
import { cookies } from 'next/headers'

// export const metadata: Metadata = {
//   title: 'Next Shadcn Dashboard Starter',
//   description: 'Basic dashboard with Next.js and Shadcn'
// }

type DashboardLayoutProps = {
  readonly children: React.ReactNode
  readonly params: Promise<{
    locale: string
  }>
}

export default async function DashboardLayout({
  children,
  params
}: DashboardLayoutProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies()
  const defaultOpen =
    cookieStore.get('sidebar:state')?.value === 'false' || true

  return (
    // <KBar>
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <Header dictionary={dictionary} />
        {/* page main content */}
        {children}
        {/* page main content ends */}
      </SidebarInset>
    </SidebarProvider>
    // </KBar>
  )
}
