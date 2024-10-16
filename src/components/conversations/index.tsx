'use client'
import { useConversation } from '@/hooks/conversation/use-conversation'
import React from 'react'
import TabsMenu from '../tabs/intex'
import { TABS_MENU } from '@/constants/menu'
import { TabsContent } from '../ui/tabs'
import ConversationSearch from './search'
import { Loader } from '../loader'
import ChatCard from './chat-card'
import { CardDescription } from '../ui/card'
import { Separator } from '../ui/separator'

type Props = {
  cases?:
    | {
        name: string
        id: string
        description: string | null
        icon: string | null
      }[]
    | undefined
}

const ConversationMenu = ({ cases }: Props) => {
  const { register, chatRooms, loading, onGetActiveChatMessages } =
    useConversation()

  return (
    <div className="py-3 px-0">
      <TabsMenu triggers={TABS_MENU}>
        <TabsContent value="unread">
          <ConversationSearch
            cases={cases}
            register={register}
          />
          <div className="flex flex-col">
            <Loader loading={loading}>
            {chatRooms.length ? (
              chatRooms.map((room) => (
                room.chatRoom && room.chatRoom.length > 0 ? (
                  <ChatCard
                    seen={room.chatRoom[0]?.message[0]?.seen}
                    id={room.chatRoom[0]?.id}
                    onChat={() => onGetActiveChatMessages(room.chatRoom[0]?.id)}
                    createdAt={room.chatRoom[0]?.message[0]?.createdAt}
                    key={room.chatRoom[0]?.id}
                    title={room.email ?? 'Unknown'}
                    description={room.chatRoom[0]?.message[0]?.message}
                  />
                ) : null
              ))
            ) : (
              <CardDescription>No chats for your case</CardDescription>
            )}
            </Loader>
          </div>
        </TabsContent>
        <TabsContent value="all">
          <Separator
            orientation="horizontal"
            className="mt-5"
          />
          all
        </TabsContent>
        <TabsContent value="expired">
          <Separator
            orientation="horizontal"
            className="mt-5"
          />
          expired
        </TabsContent>
        <TabsContent value="starred">
          <Separator
            orientation="horizontal"
            className="mt-5"
          />
          starred
        </TabsContent>
      </TabsMenu>
    </div>
  )
}

export default ConversationMenu
