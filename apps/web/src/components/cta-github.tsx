import { Button } from '@repo/ui/components/button'
import { IconBrandGithub } from '@tabler/icons-react'
import Link from 'next/link'

export default function CtaGithub() {
  return (
    <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
      <Link
        href="https://github.com/rodrigo-work/app.rodrigo.work"
        rel="noopener noreferrer"
        target="_blank"
        className="dark:text-foreground"
      >
        <IconBrandGithub />
      </Link>
    </Button>
  )
}
