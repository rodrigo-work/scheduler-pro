import { NavItem } from '@/types'

export const SETTINGS = {
  TITLE: 'Manage Events',
  DESCRIPTION: 'Basic dashboard with Next.js and Shadcn'
}

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Home',
    url: '/dashboard/home',
    icon: 'home',
    isActive: true,
    shortcut: ['h', 'h'],
    items: []
  },
  {
    title: 'Events',
    url: '#',
    icon: 'events',
    isActive: true,
    items: [
      {
        title: 'New Event',
        url: '/dashboard/events/new'
      },
      {
        title: 'Listing Events',
        url: '/dashboard/events'
      }
    ]
  }
]
