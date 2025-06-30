// import { log } from '@repo/logger'
import { Button } from '@repo/ui/components/button'

export default function Page() {
  // log('Hey! This is the Web page.')

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm">Button</Button>
      </div>
    </div>
  )
}
