import React, { Component } from "react";
import { Button, Form, Segment, Message } from 'semantic-ui-react'
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

  componentDidMount = async () => {
    
    try{
      console.log('minting component mounted..');
      const web3 = await getWeb3();
      // const web3 = new Web3(window.ethereum);
      // await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      console.log('mint accounts..',accounts[0]);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = McCoyContract.networks[networkId];

      const instance = new web3.eth.Contract(
        McCoyContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({accounts, web3,instance})

    } catch(error) {
      console.log("errors..",error);
    }
  }

  mintToken = async (event)=> {
    const accounts = this.state.accounts;
    const instance = this.state.instance;
    console.log('minting...',this.state.metaData, this.state.tokenId);
    this.setState({loading: true, errorMessage:'', successMessage:''});
    event.preventDefault();
    
    try{
     
    instance.methods.createMcCoyToken(
          this.state.metaData, this.state.tokenId).send( 
          {from: accounts[0]}, (error, txHash) =>{
              console.log(error, txHash);
          });
           this.setState({successMessage: 'ART Token Created!'});
    } //try
    catch(error) {
      this.setState({errorMessage:error.message});
    } //error
      this.setState({loading:false});
      console.log("art token done");
  }; //mintToken

  render() {

    return (
      <Segment color = 'teal'>
      <h2>Mint New Token</h2>
      <Form onSubmit = {this.mintToken}
            success={!!this.state.successMessage}
            error={!!this.state.errorMessage}>
            <Message error header='Error try refreshing page' content={this.state.errorMessage} />
            <Message success header='Complete' content={this.state.successMessage} />
        <Form.Field>
          <label>Meta Data to Include</label>
          <input placeholder='some string' 
            value = {this.state.metaData}
            onChange = {event => this.setState({metaData: event.target.value})}
            required />
        </Form.Field>
        
        <Form.Field>
          <label>Add Token ID Number</label>
          <input placeholder='Token Number'
          value = {this.state.tokenId}
          onChange = {event => this.setState({tokenId: event.target.value})}
          required />
        </Form.Field>

        <Button 
        loading={this.state.loading}
        type='submit'>Mint Token</Button>
      </Form>
      </Segment>

    )
  }
}

export default MintToken