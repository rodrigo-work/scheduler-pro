import { Heading } from '@/components/layout/heading'
import PageContainer from '@/components/layout/page-container'
import { Separator } from '@repo/ui/components/separator'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import UsersProvider from './context/users-context'

export const metadata: Metadata = {
  title: 'Tasks',
  description: 'A task and issue tracker build using Tanstack Table.'
}

// Simulate a database read for tasks.
async function getUsers() {
  // const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`)
  const result = await fetch(`https://localhost:3000/events.json`)

  if (!result.ok) {
    throw new Error('Something went wrong!')
  }

  const users = await result.json()

  if (users.data.length === 0) {
    notFound()
  }

  return users
}

export default async function TaskPage() {
  const { data: tasks } = await getUsers()

  return (
    <>
      <UsersProvider>
        <PageContainer scrollable={false}>
          <div className="flex flex-1 flex-col space-y-4">
            <div className="flex items-start justify-between">
              <Heading title="Home" description="Home page of the repo" />
              <UsersPrimaryButtons />
            </div>
            <Separator className="shadow-sm" />
            <DataTable data={tasks} columns={columns} />
          </div>
        </PageContainer>
        <UsersDialogs />
      </UsersProvider>
    </>
  )
}
