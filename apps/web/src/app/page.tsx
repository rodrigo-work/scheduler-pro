// import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  // log('Hey! This is the Web page.')

  // const { userId } = await auth();
  redirect('/dashboard')
  // if (!userId) {
  //   return redirect('/auth/sign-in')
  // } else {
  //   redirect('/dashboard/overview')
  // }
}
