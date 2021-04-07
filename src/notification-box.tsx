import { IconButton } from '@fluido/react-components'
import { motion } from 'framer-motion'
import { useLayoutEffect, useMemo } from 'react'
import { IconType } from 'react-icons'
import { MdCheck, MdClose, MdError, MdInfo, MdWarning } from 'react-icons/md'
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
  content?: string | React.ReactNode | React.FC
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

const icons = {
  success: MdCheck,
  warning: MdWarning,
  error: MdError,
  info: MdInfo,
}

const StyledNotificationBox = styled(motion.div)<StyledNotificationBoxProps>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 3rem;
  will-change: transform;
  --bg: ${({ variant }) =>
    (variant === 'success' && 'var(--success)') ||
    (variant === 'info' && 'var(--info)') ||
    (variant === 'warning' && 'var(--warning)') ||
    (variant === 'error' && 'var(--error)') ||
    'var(--on-surface-high-emphasis)'};
  --color: ${({ variant }) =>
    (variant === 'success' && 'var(--on-success)') ||
    (variant === 'info' && 'var(--on-info)') ||
    (variant === 'warning' && 'var(--on-warning)') ||
    (variant === 'error' && 'var(--on-error)') ||
    'var(--surface)'};
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
`

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  padding-right: 0.25rem;
`

const Title = styled.span`
  display: flex;
  align-items: center;
  margin-right: auto;
  &:first-child {
    padding-left: 1rem;
  }
`

const Header = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  height: 3rem;
  background-color: var(--bg);
  color: var(--color);
`

const Container = styled(motion.div)`
  padding: 0.5rem;
  background-color: var(--surface);
  color: var(--on-surface-high-emphasis);
  border: 1px solid var(--on-surface-divider);
  border-top: none;
`

const NotificationBox: React.FC<NotificationBoxProps> = ({
  id,
  message,
  content,
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

  const Icon: IconType = icons[variant]

  const Content = content
  const dataContent =
    (typeof Content === 'string' && <p>{Content}</p>) ||
    (typeof Content === 'function' && <Content />) ||
    Content

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
      <Header>
        {variant !== 'default' && (
          <IconContainer>
            <Icon size='24' />
          </IconContainer>
        )}
        <Title className='type-subtitle'>{message}</Title>
        <ActionsContainer>
          <IconButton onClick={onClose}>
            <MdClose size='24' />
          </IconButton>
        </ActionsContainer>
      </Header>
      {content && <Container>{dataContent}</Container>}
    </StyledNotificationBox>
  )
}

export default NotificationBox
