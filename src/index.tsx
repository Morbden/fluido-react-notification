import { useMediaQuery } from '@fluido/react-effects'
import deepmerge from 'deepmerge'
import { createContext, useContext, useState } from 'react'
import { uid } from 'uid'
import { NotificationBox, NotificationContainer } from './styled'
import Portal from 'react-portal'

export interface NotificationProps {}

export interface NotificationOptionsProps {
  /** @default 'bottom-left' */
  anchorPosition?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'center-left'
    | 'center-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
  /** @default false */
  dense?: boolean
  /** @default false */
  fullWidth?: boolean
}

interface NotificationContextProps {
  notifications: {
    [key: string]: NotificationProps
  }
  defaultOptions: NotificationOptionsProps
}

const NotificationContext = createContext<NotificationContextProps>(null)

const validateOptions = (options: NotificationOptionsProps = {}) => {
  const opt: NotificationOptionsProps = deepmerge(
    {
      anchorPosition: 'bottom-left',
      dens: false,
      fullWidth: false,
    },
    options,
  )
  return opt
}

export const useNotification = () => {
  const enqueueNotification = (
    message: string,
    options?: NotificationOptionsProps,
  ) => {}
  const closeNotification = (key: string) => {}

  return { enqueueNotification, closeNotification }
}

export const NotificationProvider: React.FC<NotificationOptionsProps> = ({
  children,
  ...options
}) => {
  const defaultOptions = validateOptions(options)
  const [notifications, setNotifications] = useState({})
  const { anchorPosition, dense, fullWidth } = defaultOptions
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        defaultOptions,
      }}>
      {children}
      {/* <Portal> */}
      <NotificationContainer
        anchorPosition={anchorPosition}
        dense={dense}
        fullWidth={fullWidth}>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <NotificationBox key={i}>
              <div>{i}</div>
            </NotificationBox>
          ))}
      </NotificationContainer>
      {/* </Portal> */}
    </NotificationContext.Provider>
  )
}
