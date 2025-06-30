'use client'

import { navItems } from '@/constants/data'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@repo/ui/components/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@repo/ui/components/sidebar'
// import { UserAvatarProfile } from '@repo/ui/external/user-avatar-profile'
import { useMediaQuery } from '@repo/ui/hooks/use-media-query'
// import { useUser } from "@clerk/nextjs";
import { IconChevronRight } from '@tabler/icons-react'
// import { SignOutButton } from "@clerk/nextjs";
import { Icons } from '@/components/icons'
// import { OrgSwitcher } from '@repo/ui/external/org-switcher'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import * as React from 'react'

// export const company = {
//   name: 'Acme Inc',
//   logo: IconPhotoUp,
//   plan: 'Enterprise',
// }

const tenants = [
  { id: '1', name: 'Acme Inc' },
  { id: '2', name: 'Beta Corp' },
  { id: '3', name: 'Gamma Ltd' }
]

export default function AppSidebar() {
  const pathname = usePathname()
  const { isOpen } = useMediaQuery()
  // const { user } = useUser();
  const user = null
  const router = useRouter()
  // const handleSwitchTenant = (_tenantId: string) => {
  // Tenant switching functionality would be implemented here
  // }

  const activeTenant = tenants[0]

  React.useEffect(() => {
    // Side effects based on sidebar state changes
  }, [isOpen])

  return (
    <Sidebar collapsible="icon">
      {/* <SidebarHeader>
        <OrgSwitcher
          tenants={tenants}
          defaultTenant={activeTenant}
          // onTenantSwitch={handleSwitchTenant}
        />
      </SidebarHeader> */}
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => {
              const Icon = item.icon ? Icons[item.icon] : Icons.logo
              return item?.items && item?.items?.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={pathname === item.url}
                      >
                        {item.icon && <Icon />}
                        <span>{item.title}</span>
                        <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === subItem.url}
                            >
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <Icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter></SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  )
}
