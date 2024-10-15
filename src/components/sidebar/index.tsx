'use client'
import useSideBar from '@/context/use-sidebar'
import { cn } from '@/lib/utils'
import React from 'react'
import MaxMenu from './maximized-menu'
import { MinMenu } from './minimized-menu'

type Props = {
  Cases:
    | {
        id: string
        name: string
        description: string |null
        icon: string |null
      }[]
    | null
    | undefined
}

const SideBar = ({ Cases }: Props) => {
  const { expand, onExpand, page, onSignOut } = useSideBar()

  return (
    <div
      className={cn(
        'bg-cream dark:bg-neutral-950 h-full w-[60px] fill-mode-forwards fixed md:relative',
        expand == undefined && '',
        expand == true
          ? 'animate-open-sidebar'
          : expand == false && 'animate-close-sidebar'
      )}
    >
      {expand ? (
        <MaxMenu
          Cases={Cases}
          current={page!}
          onExpand={onExpand}
          onSignOut={onSignOut}
        />
      ) : (
        <MinMenu
          Cases={Cases}
          onShrink={onExpand}
          current={page!}
          onSignOut={onSignOut}
        />
      )}
    </div>
  )
}

export default SideBar
