import {
  IconBrandGoogleFilled,
  IconBrandWhatsappFilled,
  IconBrandWindowsFilled,
  IconProps
} from '@tabler/icons-react'

export type LocationsProps = {
  label: string
  value: string
  icon?: React.ComponentType<IconProps>
}

export const locations = [
  {
    label: 'Microsoft Teams',
    value: 'Microsoft Teams',
    icon: IconBrandWindowsFilled
  },
  {
    label: 'Google Meet',
    value: 'Google Meet',
    icon: IconBrandGoogleFilled
  },
  {
    label: 'WhatsApp',
    value: 'WhatsApp',
    icon: IconBrandWhatsappFilled
  }
]
