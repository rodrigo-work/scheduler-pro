import {
  IconBrandGoogle,
  IconBrandTeams,
  IconBrandWhatsapp
} from '@tabler/icons-react'

export type GuestSchema = {
  id: string
  email: string
}

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
