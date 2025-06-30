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

export const labels = [
  {
    label: 'Date',
    startTime: '2025-06-24T14:00:00.000Z',
    endTime: '2025-06-24T14:30:00.000Z'
  },
  {
    label: 'Date',
    startTime: '2025-06-22T14:00:00.000Z',
    endTime: '2025-06-22T14:30:00.000Z'
  },
  {
    label: 'Date',
    startTime: '2025-06-25T14:00:00.000Z',
    endTime: '2025-06-25T14:30:00.000Z'
  },
  {
    label: 'Date',
    startTime: '2025-06-24T14:00:00.000Z',
    endTime: '2025-06-24T14:30:00.000Z'
  },
  {
    label: 'Date',
    startTime: '2025-07-24T14:00:00.000Z',
    endTime: '2025-07-24T14:30:00.000Z'
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
