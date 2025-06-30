import { Breadcrumbs } from '../breadcrumbs'
// import SearchInput from '../search-input'
import { Separator } from '@repo/design-system/components/ui/separator'
import { SidebarTrigger } from '@repo/design-system/components/ui/sidebar'
import { Dictionary } from '@repo/internationalization'
import { Cta } from '../cta'
import { LanguageSwitcher } from '../language-switcher'
import { ThemeSelector } from '../theme-selector'
import { ModeToggle } from './ThemeToggle/theme-toggle'

type HeaderProps = {
  dictionary: Dictionary
}

export default function Header({ dictionary }: HeaderProps) {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumbs lang={dictionary.app.lang} />
      </div>

      <div className="flex items-center gap-2 px-4">
        <Cta />
        <div className="hidden md:flex">{/* <SearchInput /> */}</div>
        {/* <UserNav /> */}
        <ModeToggle /> <LanguageSwitcher />
        <ThemeSelector />
      </div>
    </header>
  )
}
