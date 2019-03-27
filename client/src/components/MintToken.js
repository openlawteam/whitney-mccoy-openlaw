import React from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'

const MintToken = () => (
  <Segment color = 'teal'>
  <Form>
    <Form.Field>
      <label>Meta Data to Include</label>
      <input placeholder='some string' />
    </Form.Field>
    <Form.Field>
      <label>Add Token ID Number</label>
      <input placeholder='Token Number' />
    </Form.Field>

    <Button type='submit'>Mint Token</Button>
  </Form>
  </Segment>
)

export default MintToken