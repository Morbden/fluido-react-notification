import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { createContext, useContext, useState } from 'react'
import { Portal } from 'react-portal'
import { uid } from 'uid'
import NotificationBox, { NotificationProps } from './notification-box'
import { NotificationContainer } from './styled'
import { validateOptions, validateProviderOptions } from './utils'

export interface NotificationProviderOptionsProps {
  /** @default 'bottom-left' */
  anchorPosition?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
  /** @default false */
  dense?: boolean
  /** @default false */
  fullWidth?: boolean
  /** @default false */
  disablePortal?: boolean
  /** @default 'slide' */
  animation?: 'slide' | 'fade' | 'grow' | 'collapse'
  /**
   * Animation time duration in milliseconds
   * @default 300 */
  animationDuration?: number
  /**
   * Notification duration in milliseconds
   * @default 3000 */
  duration?: number
  /** @default 3 */
  max?: number
}

export interface NotificationOptionsProps {}

type NotificationPropsMap = { [key: string]: NotificationProps }

export interface NotificationContextProps {
  notifications: {
    map: NotificationPropsMap
    set: React.Dispatch<React.SetStateAction<NotificationPropsMap>>
  }
  defaultOptions: NotificationProviderOptionsProps
  counter: {
    value: number
    set: React.Dispatch<React.SetStateAction<number>>
  }
}

const NotificationContext = createContext<NotificationContextProps>(null)

export const useNotification = () => {
  const { notifications, defaultOptions, counter } = useContext(
    NotificationContext,
  )

  const closeNotification = (key: string) => {
    notifications.set((l) => {
      delete l[key]
      return { ...l }
    })
  }

  const enqueueNotification = (
    message: string,
    options?: NotificationOptionsProps,
  ) => {
    counter.set((c) => {
      const nc = c + 1
      return nc >= Number.MAX_SAFE_INTEGER ? 0 : nc
    })

    notifications.set((m) => {
      const newKey = counter.value.toString().padStart(8, '0')

      const newMap: NotificationPropsMap = {
        ...m,
        [newKey]: {
          message,
          ...validateOptions(defaultOptions, options),
        },
      }
      const entries = Object.entries(newMap)

      if (entries.length > defaultOptions.max) {
        const toRemove = entries.filter((entry) => entry[0] !== newKey)
        const toRemoveFree = toRemove.filter((entry) => !entry[1].persistent)

        if (toRemoveFree.length) {
          const entry = toRemoveFree.shift()
          closeNotification(entry[0])
        } else {
          const entry = toRemove.shift()
          closeNotification(entry[0])
        }
      }

      return newMap
    })
  }

  return { enqueueNotification, closeNotification }
}

export const NotificationProvider: React.FC<NotificationProviderOptionsProps> = ({
  children,
  ...options
}) => {
  const defaultOptions = validateProviderOptions(options)
  const [notifications, setNotifications] = useState<NotificationPropsMap>({})
  const [counter, setCounter] = useState<number>(0)
  const { anchorPosition, dense, fullWidth, disablePortal } = defaultOptions

  const data = Object.entries(notifications).map(([key, value]) => ({
    key,
    value,
  }))

  const notificationContent = (
    <NotificationContainer
      anchorPosition={anchorPosition}
      dense={dense}
      fullWidth={fullWidth}>
      <AnimateSharedLayout>
        <AnimatePresence presenceAffectsLayout={false}>
          {data.map(({ key, value }) => (
            <motion.li key={key}>
              <NotificationBox
                id={key}
                onClose={() => {
                  setNotifications((l) => {
                    delete l[key]
                    return { ...l }
                  })
                }}
                anchorPosition={anchorPosition}
                {...value}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </AnimateSharedLayout>
    </NotificationContainer>
  )

  return (
    <NotificationContext.Provider
      value={{
        notifications: {
          map: notifications,
          set: setNotifications,
        },
        defaultOptions,
        counter: {
          value: counter,
          set: setCounter,
        },
      }}>
      {children}
      {disablePortal ? (
        notificationContent
      ) : (
        <Portal>{notificationContent}</Portal>
      )}
    </NotificationContext.Provider>
  )
}
