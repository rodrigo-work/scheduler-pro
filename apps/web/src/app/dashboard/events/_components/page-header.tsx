'use client'

import { PageHeading } from '@/components/layout/page-heading'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@repo/ui/components/button'
import { IconPlus } from '@tabler/icons-react'
import Link from 'next/link'
import { CardsChat } from '../components/chat'

interface PageHeaderProps {
  title?: string
  description?: string
  children?: React.ReactNode
}

export function PageHeader({ children, title, description }: PageHeaderProps) {
  return (
    <>
      <div className="flex items-start justify-between">
        <PageHeading title={title ?? ''} description={description ?? ''} />
        <div className="flex gap-2">
          <CardsChat />
          <Link
            href="/dashboard/events/new"
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <IconPlus className="mr-2 h-4 w-4" /> Add New
          </Link>
          {children}
        </div>
      </div>
    </>
  )
}
