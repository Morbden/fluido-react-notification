import { Button } from '@fluido/react-components'
import { Meta, Story } from '@storybook/react'
import { NotificationProvider, useNotification } from './index'

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
      <Button>CALL</Button>
      <Button>PERSISTENT</Button>
      <Button>CLOSE</Button>
    </Container>
  )
}

const Template: Story = (args) => (
  <NotificationProvider {...args}>
    <Activator />
  </NotificationProvider>
)

export const allProps = Template.bind({})
allProps.args = {
  dense: true,
}
