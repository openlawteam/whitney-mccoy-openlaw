import React, { Component } from "react";
import { Button, Form, Segment, Message } from 'semantic-ui-react'
import McCoyContract from "../contracts/McCoyContract.json";
import getWeb3 from "../utils/getWeb3";

class TransferTokenForm extends Component {

    state = {
    instance: null,
    web3:null,
    accounts: '', 
    tokenId: '',
    currentEthereumAddress: '',
    newEthereumAddress:'',
    loading: false, 
    errorMessage:'',
    successMessage: ''
   };

   transferToken = async(event)=>{
    console.log("transferToken...");
    event.preventDefault();
      try{
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        console.log('transfer from accounts..',accounts[0]);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = McCoyContract.networks[networkId];

        const instance = new web3.eth.Contract(
          McCoyContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        this.setState({accounts, web3,instance})
        instance.methods.safeTransferFrom(this.state.currentEthereumAddress, this.state.newEthereumAddress, this.state.tokenId).send({from: accounts[0]}, (error, transactionHash) => 
        {
          console.log(error, transactionHash);
          
        });

      } catch(error) {
        console.log("errors..",error);
      }
   }

   render() {
    return(
        <Segment color = 'orange'>
        <h2>Transfer Token </h2>
          <Form onSubmit = {this.transferToken}>
            <Form.Field>
              <label>My Ethereum Address</label>
              <input placeholder='Current Ethereum Address' 
                value = {this.state.currentEthereumAddress}
                onChange = {event => this.setState({currentEthereumAddress: event.target.value})}
              />
            </Form.Field>
            <Form.Field>
              <label>New Donor Ethereum Address</label>
              <input placeholder='New Donor Ethereum Address' 
                value = {this.state.newEthereumAddress}
                onChange = {event => this.setState({newEthereumAddress: event.target.value})}
              />
            </Form.Field>
            <Form.Field>
            <label>Token Id Number</label>
              <input placeholder = 'Token Id #'
              value = {this.state.tokenId}
              onChange = {event => this.setState({tokenId: event.target.value})}  
              />
            </Form.Field>
            <Button type='submit'>Transfer Token</Button>
          </Form>
        </Segment>
      )
   }
}

export default TransferTokenForm