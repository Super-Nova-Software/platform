import CalIcon from '@/icons/cal-icon'
import ChatIcon from '@/icons/chat-icon'
import DashboardIcon from '@/icons/dashboard-icon'
import EmailIcon from '@/icons/email-icon'
import HelpDeskIcon from '@/icons/help-desk-icon'
import IntegrationsIcon from '@/icons/integrations-icon'
import SettingsIcon from '@/icons/settings-icon'
import StarIcon from '@/icons/star-icon'
import TimerIcon from '@/icons/timer-icon'

type SIDE_BAR_MENU_PROPS = {
  label: string
  icon: JSX.Element
  path: string
}

export const SIDE_BAR_MENU: SIDE_BAR_MENU_PROPS[] = [
  {
    label: 'Dashboard',
    icon: <DashboardIcon />,
    path: 'dashboard',
  },
  {
    label: 'Conversations',
    icon: <ChatIcon />,
    path: 'conversation',
  },
  {
    label: 'Integrations',
    icon: <IntegrationsIcon />,
    path: 'integration',
  },
  {
    label: 'Settings',
    icon: <SettingsIcon />,
    path: 'settings',
  },
  {
    label: 'Appointments',
    icon: <CalIcon />,
    path: 'appointment',
  },
  {
    label: 'Email Marketing',
    icon: <EmailIcon />,
    path: 'email-marketing',
  },
]

type TABS_MENU_PROPS = {
  label: string
  icon?: JSX.Element
}


type INTERNAL_NAVBAR_PROPS = {
  id: number
  name: string
  link: string
  emoji?: string
}
export const INTERNAL_NAVBAR: INTERNAL_NAVBAR_PROPS[] = [
  {
    id: 1,
    name: 'Overview',
    link: 'test',
    emoji: '⚖',
  },
  {
    id: 2,
    name: 'Conversation',
    link: 'conversation',
    emoji: '✉',
  },
  {
    id: 3,
    name: 'Schedule',
    link: 'schedule',
    emoji: '🗓',
  },
  {
    id: 4,
    name: 'Documents',
    link: 'document',
    emoji: '📁',
  },
  {
    id: 5,
    name: 'setting',
    link: 'setting',
    emoji: '⚙',
  },
]

export const TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'unread',
    icon: <EmailIcon />,
  },
  {
    label: 'all',
    icon: <EmailIcon />,
  },
  {
    label: 'expired',
    icon: <TimerIcon />,
  },
  {
    label: 'starred',
    icon: <StarIcon />,
  },
]

export const HELP_DESK_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'help desk',
  },
  {
    label: 'questions',
  },
]

export const APPOINTMENT_TABLE_HEADER = [
  'Name',
  'RequestedTime',
  'Added Time',
  'Domain',
]

export const EMAIL_MARKETING_HEADER = ['Id', 'Email', 'Answers', 'Domain']

export const BOT_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'chat',
    icon: <ChatIcon />,
  },
  {
    label: 'helpdesk',
    icon: <HelpDeskIcon />,
  },
]
