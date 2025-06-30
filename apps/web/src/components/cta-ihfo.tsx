import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/avatar'
import { Button } from '@repo/ui/components/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@repo/ui/components/hover-card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@repo/ui/components/tooltip'
import {
  IconApi,
  IconBrandGithub,
  IconServer,
  IconWorld
} from '@tabler/icons-react'
import Link from 'next/link'

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

export async function Cta2434Info() {
  // Fetch manual data
  // useEffect(() => {
  //   const fetchData = async () => {
  // setLoading(true)
  // const { pageIndex, pageSize } = table.getState().pagination
  // const res = await fetch(
  //   `http://localhost:3001/users?_page=${pageIndex + 1}&_limit=${pageSize}`
  // )
  // const json = await res.json()
  // const total = Number(res.headers.get('X-Total-Count'))
  // setData(json)
  // setPageCount(Math.ceil(total / pageSize))
  // setLoading(false)
  //   }

  //   fetchData()
  // }, [table.getState().pagination])

  // const { data: users } = await getUsers()
  return (
    <>
      <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
        <a
          href="#"
          rel="noopener noreferrer"
          className="dark:text-foreground duration-600 blinking-- text-red-500 transition-colors hover:text-red-600 dark:hover:text-red-400"
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

function CustomTooltip(children) {
  return (
    <>
      <p>{children}</p>
    </>
  )
}

async function ApiHealhz() {
  const result = await fetch(`http://localhost:3001/docs`)

  if (!result.ok) {
    throw new Error('Something went wrong!')
  }

  const api = result

  // if (users.length === 0) {
  //   notFound()
  // }

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            asChild
            size="sm"
            className="blinking hidden sm:flex"
          >
            <Link
              href="https://github.com/rodrigo-work/scheduler-pro2"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              {/* <IconApi className="dark:text-foreground duration-400 blinking-- dark:hover:text-red-400- text-red-500 transition-colors hover:text-red-600" /> */}
              <IconApi className="text-red-500" />
              <IconWorld className="text-red-500" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
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

async function ApiHealhzs() {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <Link
              href="https://github.com/rodrigo-work/scheduler-pro2"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              <IconBrandGithub />
            </Link>
          </Button>
          {/* <Button variant="outline">Hover</Button> */}
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
      <code>
        {process.env.NODE_ENV !== 'production' && <address>dev</address>}
      </code>
    </>
  )
}

export function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@info</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@info</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="text-muted-foreground text-xs">
              Joined December 2021
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export async function CtaInfo() {
  return (
    <>
      <HoverCardDemo />
      {process.env.NODE_ENV !== 'production' ? 'dev' : 'prod'}
      <ApiHealhz />
    </>
  )
}
