import type { PropertyVariant } from '../../../types'

export interface ButtonProps extends Record<string, unknown> {
  label?: string
  loading?: boolean
  badge?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  variant?: 'solid' | 'pastel' | 'outline'
  color?:
    | 'default'
    | 'default-contrast'
    | 'muted'
    | 'muted-contrast'
    | 'light'
    | 'dark'
    | 'black'
    | 'primary'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'none'
  shadow?: 'flat' | 'hover'
  classes?: {
    wrapper?: string | string[]
  }
}

export interface ButtonEvents {
  onClick?: () => void
}

export interface ButtonSlots {
  children?: any
}

export type ButtonAttrs = ButtonProps & ButtonEvents & ButtonSlots
export type ButtonVariant<T> = PropertyVariant<T, ButtonProps>
