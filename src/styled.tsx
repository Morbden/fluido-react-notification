import styled from 'styled-components'

interface NotificationContainer {
  /** @default 'bottom-left' */
  anchorPosition:
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

const variantsPosition = {
  'top-left': {
    top: 0,
    left: 0,
  },
  'top-center': {
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  'top-right': {
    top: 0,
    right: 0,
  },
  'bottom-right': {
    right: 0,
    bottom: 0,
  },
  'bottom-center': {
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  'bottom-left': {
    left: 0,
    bottom: 0,
  },
}

export const NotificationContainer = styled.ul<NotificationContainer>`
  --transition-time: 250ms ease-in-out;
  position: fixed;
  z-index: 300;
  min-height: 0;
  max-height: 100vh;
  max-width: 100vw;
  user-select: none;
  display: flex;
  align-items: stretch;
  margin: 0;
  list-style: none;
  flex-direction: ${({ anchorPosition }) =>
    anchorPosition.includes('bottom') ? 'column' : 'column-reverse'};
  padding: ${({ dense }) => (dense ? '.5rem' : '1rem')};
  transition: width var(--transition-time), top var(--transition-time),
    right var(--transition-time), bottom var(--transition-time),
    left var(--transition-time), padding var(--transition-time);

  width: ${({ fullWidth }) => (fullWidth ? '100%' : '22rem')};

  ${({ anchorPosition, fullWidth }) => {
    switch (anchorPosition) {
      case 'top-left':
      case 'bottom-left':
        return variantsPosition[anchorPosition]
      case 'top-center':
      case 'top-right':
        return fullWidth
          ? variantsPosition['top-left']
          : variantsPosition[anchorPosition]
      case 'bottom-right':
      case 'bottom-center':
        return fullWidth
          ? variantsPosition['bottom-left']
          : variantsPosition[anchorPosition]
      default:
        return variantsPosition['bottom-left']
    }
  }}

  &:empty {
    display: none;
  }

  & > * {
    ${({ dense, anchorPosition }) =>
      anchorPosition.includes('bottom')
        ? { paddingTop: dense ? '.5rem' : '1rem' }
        : { paddingBottom: dense ? '.5rem' : '1rem' }}
    transition: padding-top var(--transition-time), padding-bottom var(--transition-time);
  }
`
