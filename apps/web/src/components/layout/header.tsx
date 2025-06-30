import { Breadcrumbs } from '../breadcrumbs'
// import SearchInput from '../search-input'
import { Separator } from '@repo/ui/components/separator'
import { SidebarTrigger } from '@repo/ui/components/sidebar'
import { CtaInfo } from '../cta-ihfo'
import { ThemeSelector } from '../theme-selector'
import { ModeToggle } from './ThemeToggle/theme-toggle'

export default function Header() {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-2 px-4">
        <CtaInfo />
        <div className="hidden md:flex">{/* <SearchInput /> */}</div>
        {/* <UserNav /> */}
        <ModeToggle />
        <ThemeSelector />
      </div>
    </header>
  )
}
