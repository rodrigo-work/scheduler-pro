// import { auth } from '@clerk/nextjs/server';
import { log } from '@repo/logger'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  log('Hey! This is the Web page.')
  // await new Promise((resolve) => setTimeout(resolve, 13000))

  // const { userId } = await auth();
  redirect('/dashboard/overview')
  // if (!userId) {
  //   return redirect('/auth/sign-in')
  // } else {
  //   redirect('/dashboard/overview')
  // }
}
