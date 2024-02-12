
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'


export default async function Layout({ children }: any) {
    const session= await getServerSession(authOptions)

    if(!session?.user)redirect("/")
  return (
      <div>{children}</div>
  )
}
