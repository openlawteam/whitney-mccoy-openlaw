import React, { Component } from "react";
import { Button, Form, Segment, Message,Input } from 'semantic-ui-react'
import McCoyContract from "../contracts/McCoyContract.json";
import getWeb3 from "../utils/getWeb3";
//const Web3 = require("web3");
class MintToken extends Component {

  state = {
    instance: null,
    web3:null,
    accounts: '', 
    tokenId: '',
    metaData: '',
    loading: false, 
    errorMessage:'',
    successMessage: ''
   };

  mintToken = async (event)=> {
   
    this.setState({loading: true, errorMessage:'', successMessage:''});
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
     
          await instance.methods.createMcCoyToken(
          this.state.metaData, this.state.tokenId)
            .send({from: accounts[0]
          });
          this.setState({successMessage: 'ART Token Created!'});
    } //try
    catch(error) {
      this.setState({errorMessage:error.message});
    } 
     
      this.setState({loading:false});     
  }; //mintToken

  render() {

    return (
      <Segment color = 'teal'>
      <h2 className="content-heading">Mint New Token</h2>
      <Form onSubmit = {this.mintToken}
            success={!!this.state.successMessage}
            error={!!this.state.errorMessage}
            loading = {this.state.loading}
            >
        <Message error header='Error:Address not authorized to mint' content={this.state.errorMessage} />
        <Message success header='Complete' content={this.state.successMessage} />
       
        <Form.Field>
          <label>Meta Data to Include</label>
          <Input placeholder='some string' 
            value = {this.state.metaData}
            onChange = {event => this.setState({metaData: event.target.value})}
            required />
        </Form.Field>
        
        <Form.Field>
          <label>Add Token ID Number</label>
          <Input placeholder='Token Number'
          value = {this.state.tokenId}
          onChange = {event => this.setState({tokenId: event.target.value})}
          required />
        </Form.Field>

        <Button className="ui button primary" type='submit'>Mint Token</Button>
      </Form>
      </Segment>

    )
  }
}

export default MintToken