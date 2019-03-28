import React from 'react'
import { Card } from 'semantic-ui-react'

const CardExampleHeaderCard = () => (
  <Card.Group itemsPerRow={3}>
    <Card>
      <Card.Content>
        <Card.Header>Token Id 1</Card.Header>
        <Card.Meta>meta data of token</Card.Meta>
         <Card.Description>0xad9b86640008f02d9f2f3f0702133cea4eecb18c</Card.Description>
        <Card.Meta>Current Donor</Card.Meta>
      </Card.Content>
    </Card>

    <Card>
      <Card.Content>
        <Card.Header content='Jake Smith' />
        <Card.Meta content='Musicians' />
        <Card.Description content='Jake is a drummer living in New York.' />
      </Card.Content>
    </Card>

    <Card>
      <Card.Content
        header='Elliot Baker'
        meta='Friend'
        description='Elliot is a music producer living in Chicago.'
      />
    </Card>

    <Card
      header='Jenny Hess'
      meta='Friend'
      description='Jenny is a student studying Media Management at the New School'
    />
  </Card.Group>
)

export default CardExampleHeaderCard