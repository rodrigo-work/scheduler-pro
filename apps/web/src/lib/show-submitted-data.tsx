import { toast } from 'sonner'

export function showSubmittedData(
  data: unknown,
  title: string = 'You submitted the following values:'
) {
  toast.message(title, {
    description: (
      // w-[340px]
      // w-full
      <pre className="mt-2 w-[340px] overflow-x-auto overflow-y-scroll rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    )
  })
}
