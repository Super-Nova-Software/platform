import { onLoginUser } from '@/actions/auth'
import InfoBar from '@/components/infobar'
import { InternalNavbar } from '@/components/internal-navbar'
import { INTERNAL_NAVBAR } from '@/constants/menu'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const OwnerLayout = async ({ children }: Props) => {
  const authenticated = await onLoginUser()
  if (!authenticated) return null

  return (
    <> 
<InfoBar />
<div className="flex space-x-6 overflow-auto">
{INTERNAL_NAVBAR.map((field) => (
        <InternalNavbar key={field.id} tabs={field} />
      ))}
</div>
<div className="overflow-y-auto w-full chat-window flex-1 h-0 flex flex-col gap-10">
    {children}
</div>
    </>
  )
}

export default OwnerLayout
