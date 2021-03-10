import styled from 'styled-components'

export const StyledSnackbarManager = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  min-height: 0;
  z-index: 300;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  padding: 0 0.5rem;
  user-select: none;

  &.sm {
    width: 22rem;
    padding: 1rem;
  }
`
