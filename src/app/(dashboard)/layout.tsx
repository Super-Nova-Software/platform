import { onLoginUser } from '@/actions/auth'
import SideBar from '@/components/sidebar'
import { ChatProvider } from '@/context/user-chat-context'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const OwnerLayout = async ({ children }: Props) => {
  const authenticated = await onLoginUser()
  if (!authenticated) return null

  return (
    <ChatProvider>
      <div className="flex h-screen w-full">
        <SideBar Cases={authenticated.Case} />
        <div className="w-full h-screen flex flex-col p-5 md:px-4">
          {children}
        </div>
      </div>
    </ChatProvider>
  )
}

export default OwnerLayout
