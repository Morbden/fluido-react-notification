import { Button } from '@fluido/react-components'
import { Meta, Story } from '@storybook/react'
import { NotificationProvider, useNotification } from './index'

import '@fluido/sass-styles/lib/typography.scss'
import '@fluido/sass-styles/lib/material.scss'
import styled from 'styled-components'

const ComponentMeta: Meta = {
  title: 'Snackbar',
}

export default ComponentMeta

const Container = styled.div`
  padding: 3rem;
`

const Activator = () => {
  const { enqueueNotification, closeNotification } = useNotification()

  return (
    <Container>
      <Button
        onClick={() =>
          enqueueNotification('asd', {
            variant: 'default',
          })
        }>
        default
      </Button>
      <Button
        onClick={() =>
          enqueueNotification('asd', {
            variant: 'success',
          })
        }>
        success
      </Button>
      <Button
        onClick={() =>
          enqueueNotification('asd', {
            variant: 'info',
          })
        }>
        info
      </Button>
      <Button
        onClick={() =>
          enqueueNotification('asd', {
            variant: 'warning',
          })
        }>
        warning
      </Button>
      <Button
        onClick={() =>
          enqueueNotification('asd', {
            variant: 'error',
          })
        }>
        error
      </Button>
    </Container>
  )
}

const Template: Story = (args) => (
  <NotificationProvider disablePortal {...args}>
    <Activator />
  </NotificationProvider>
)

export const allProps = Template.bind({})
allProps.args = {
  dense: true,
}
