import deepmerge from 'deepmerge'
import {
  NotificationOptionsProps,
  NotificationProviderOptionsProps,
} from './index'

export const validateProviderOptions = (
  options: NotificationProviderOptionsProps = {},
) => {
  const opt: NotificationProviderOptionsProps = deepmerge(
    {
      anchorPosition: 'bottom-right',
      dens: false,
      fullWidth: false,
      animation: 'slide',
      animationDuration: 300,
      duration: 3000,
      max: 3,
    },
    options,
  )
  return opt
}

export const validateOptions = (
  defaultOptions: NotificationProviderOptionsProps = {},
  options: NotificationOptionsProps = {},
) => {
  const opt: NotificationOptionsProps = deepmerge(
    {
      animation: defaultOptions.animation,
      animationDuration: defaultOptions.animationDuration,
      duration: defaultOptions.duration,
      persistent: false,
      variant: 'default',
    },
    options,
  )
  return opt
}
