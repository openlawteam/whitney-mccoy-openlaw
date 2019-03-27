import React from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'

const TransferTokenForm = () => (
  <Segment color = 'orange'>
  <Form>
    <Form.Field>
      <label>My Ethereum Address</label>
      <input placeholder='Current Ethereum Address' />
    </Form.Field>
    <Form.Field>
      <label>New Donor Ethereum Address</label>
      <input placeholder='New Donor Ethereum Address' />
    </Form.Field>
    <Form.Field>
    <label>Token Id Number</label>
      <input placeholder = 'Token Id #'/>
    </Form.Field>
    <Button type='submit'>Transfer Token</Button>
  </Form>
  </Segment>
)

export default TransferTokenForm