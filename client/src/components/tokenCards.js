import React, { Component } from "react";
import McCoyContract from "../contracts/McCoyContract.json";
import getWeb3 from "../utils/getWeb3";
import { Card, Container } from 'semantic-ui-react'


class TokenCards extends Component {
  state = {
    instance: null, 
    web3: null, 
    accounts:''
  }

componentDidMount = async () => {
  this.updateCards();

}

updateCards = async(event)=>{
  console.log('updating cards..');
  try{
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        console.log('update cards from ..',accounts[0]);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = McCoyContract.networks[networkId];

        const instance = new web3.eth.Contract(
          McCoyContract.abi,
          deployedNetwork && deployedNetwork.address,
        );


  }catch(error){
    console.log('error updating cards', error)
  }
}

  render() {
    return(
  
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

  </Card.Group>

)
  }
}

export default TokenCards