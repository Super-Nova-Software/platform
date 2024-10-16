import { onGetAllAccountCase } from '@/actions/settings'
import ConversationMenu from '@/components/conversations'
import Messenger from '@/components/conversations/messenger'
import InfoBar from '@/components/infobar'
import { Separator } from '@/components/ui/separator'
import React from 'react'

type Props = {}

const ConversationPage = async (props: Props) => {
  const cases = await onGetAllAccountCase()
  return (
    <div className="w-full h-full flex">
      <ConversationMenu cases={cases?.Case} />

      <Separator orientation="vertical" />
      <div className="w-full flex flex-col">
        <Messenger />
      </div>
    </div>
  )
}

export default ConversationPage
