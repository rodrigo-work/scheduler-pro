import {
  IconBrandGoogle,
  IconBrandTeams,
  IconBrandWhatsapp
} from '@tabler/icons-react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleOff,
  HelpCircle,
  Timer
} from 'lucide-react'

export const locations = [
  {
    value: 'Zoom',
    label: 'Zoom'
  },
  {
    value: 'Microsoft Teams',
    label: 'Microsoft Teams',
    icon: IconBrandTeams
  },
  {
    value: 'Google Meet',
    label: 'Google Meet',
    icon: IconBrandGoogle
  },
  {
    value: 'WhatsApp',
    label: 'WhatsApp',
    icon: IconBrandWhatsapp
  }
]

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: HelpCircle
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: Circle
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: Timer
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircle
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: CircleOff
  }
]

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDown
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRight
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUp
  }
]
