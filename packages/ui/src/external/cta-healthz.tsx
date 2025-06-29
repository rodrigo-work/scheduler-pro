import { Button } from '@repo/ui/components/button'
import { IconServer } from '@tabler/icons-react'

async function getUsers() {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usessrs`)

  if (!result.ok) {
    console.error('Failed to fetch users:', result.statusText)
    // throw new Error('Something went wrong!')
  }

  const users = await result.json()

  // if (users.length === 0) {
  //   notFound()
  // }

  return users
}

export default async function CtaHealthz() {
  // const { data: users } = await getUsers()
  return (
    <>
      <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
        <a
          href="#"
          rel="noopener noreferrer"
          className="dark:text-foreground duration-600 blinking text-red-500 transition-colors hover:text-red-600 dark:hover:text-red-400"
        >
          <IconServer className="text-red-500" />
        </a>
      </Button>
      <style>{`
        .blinking {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
