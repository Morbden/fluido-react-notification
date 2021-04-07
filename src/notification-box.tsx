import { motion } from 'framer-motion'
import { useLayoutEffect, useMemo } from 'react'
import styled from 'styled-components'
import { animationsVariants } from './notification-box-animations'

export interface NotificationProps {
  message: string
  /** @default false */
  persistent?: boolean
  /** @default 'slide' */
  animation?: 'slide' | 'fade' | 'grow' | 'collapse'
  /** @default 3000 */
  duration?: number
  /**
   * Animation time duration in milliseconds
   * @default 300 */
  animationDuration?: number
  content?: string | React.ReactNode
  /** @default 'default'' */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
}

interface NotificationBoxProps extends NotificationProps {
  id: string
  onClose: VoidFunction
  anchorPosition?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
}

interface StyledNotificationBoxProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
}

const StyledNotificationBox = styled(motion.div)<StyledNotificationBoxProps>`
  min-height: 3rem;
  will-change: transform;
  background-color: ${({ variant }) =>
    (variant === 'success' && 'var(--success)') ||
    (variant === 'info' && 'var(--info)') ||
    (variant === 'warning' && 'var(--warning)') ||
    (variant === 'error' && 'var(--error)') ||
    'var(--on-surface-high-emphasis)'};
  color: ${({ variant }) =>
    (variant === 'success' && 'var(--on-success)') ||
    (variant === 'info' && 'var(--on-info)') ||
    (variant === 'warning' && 'var(--on-warning)') ||
    (variant === 'error' && 'var(--on-error)') ||
    'var(--surface)'};
`

const NotificationBox: React.FC<NotificationBoxProps> = ({
  id,
  message,
  variant,
  animation,
  animationDuration,
  persistent,
  duration,
  anchorPosition,
  onClose,
}) => {
  const variants = useMemo(
    () =>
      animation === 'slide'
        ? animationsVariants[
            `slide-${anchorPosition.includes('right') ? 'right' : 'left'}`
          ]
        : animationsVariants[animation],
    [animation, anchorPosition],
  )

  useLayoutEffect(() => {
    if (persistent) return
    const id = setTimeout(() => {
      if (onClose) onClose()
    }, duration)

    return () => {
      clearTimeout(id)
    }
  }, [persistent, duration])

  return (
    <StyledNotificationBox
      layoutId={id}
      variant={variant}
      variants={variants}
      transition={{
        ease: 'easeInOut',
        duration: animationDuration / 1000,
      }}
      initial='hidden'
      animate='show'
      exit='hidden'>
      {id}
    </StyledNotificationBox>
  )
}

export default NotificationBox
