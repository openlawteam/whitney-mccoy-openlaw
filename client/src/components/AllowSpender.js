import React from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'

const AllowSpender = () => (
  <Segment color = 'yellow'>
  <Form>
    <Form.Field>
      <label>Ethereum Address to Approve</label>
      <input placeholder='Ethereum Address' />
    </Form.Field>
    <Form.Field>
      <label>Token ID Number</label>
      <input placeholder='Token Number' />
    </Form.Field>

    <Button type='submit'>Allow Spender</Button>
  </Form>
  </Segment>
)

export default AllowSpender