import React, { Component } from "react";
import { Button, Form, Segment } from 'semantic-ui-react'
import McCoyContract from "../contracts/McCoyContract.json";
import getWeb3 from "../utils/getWeb3";

class MintToken extends Component {

  state = {instance: undefined, contract: null, tokenId: '', metaData: ''};

   componentDidMount = async () => {
    //console.log("mint mounint...");
      try{
        console.log('minting component..');
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        console.log('accounts..',accounts[0]);

      } catch(error) {
        console.log("errors..",error);
      }
   }


  mintToken = async (event)=> {
    console.log('minting...',this.state.metaData, this.state.tokenId);
    event.preventDefault();
    // try{
    //   const accounts = await getWeb3.eth.getAccounts();
    //   console.log("sending from MM: " + accounts[0]);

    // } catch(error) {
    //   console.log(error);
    // }

  // instance.methods.createMcCoyToken(
  //       this.state.metaData, this.state.tokenId).send( 
  //       {from: accounts[0]}, (error, txHash) =>{
  //           console.log(error, txHash);
  //       });
  };

  render() {

    return (
      <Segment color = 'teal'>
      <Form onSubmit = {this.mintToken}>
        <Form.Field>
          <label>Meta Data to Include</label>
          <input placeholder='some string' 
            value = {this.state.metaData}
            onChange = {event => this.setState({metaData: event.target.value})}
          />
        </Form.Field>
        
        <Form.Field>
          <label>Add Token ID Number</label>
          <input placeholder='Token Number'
          value = {this.state.tokenId}
          onChange = {event => this.setState({tokenId: event.target.value})}
          />
        </Form.Field>

        <Button type='submit'>Mint Token</Button>
      </Form>
      </Segment>

    )
  }
}

export default MintToken