import React, { Component } from "react";
import { Button, Form, Segment, Message } from 'semantic-ui-react'
import McCoyContract from "../contracts/McCoyContract.json";
import getWeb3 from "../utils/getWeb3";


class AllowSpender extends Component {

    state = {
    instance: null,
    web3:null,
    accounts: '', 
    tokenId: '',
    spenderEthereumAddress: '',
    loading: false, 
    errorMessage:'',
    successMessage: ''
   };

allowTokenSpender = async (event) => {
    console.log('allow token spender..');
     const accounts = this.state.accounts;
    const instance = this.state.instance;
    this.setState({loading: true, errorMessage:'', successMessage:''});
    event.preventDefault();

    try { 

        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();

        console.log('testing.. allow ', accounts[0]);

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = McCoyContract.networks[networkId];

        const instance = new web3.eth.Contract(
          McCoyContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        this.setState({accounts, web3,instance});
        
      instance.methods.approve(this.state.spenderEthereumAddress,this.state.tokenId).send({from: accounts[0]}, (error, transactionHash) => 
        {
          console.log(error, transactionHash);
          
        });

    }//try
    catch(error) {
      this.setState({errorMessage: error.message});

    }

    console.log("spender approved");
};// allowTokenSpender 

render() {
  return(
 <Segment color = 'yellow'>
  <Form onSubmit = {this.allowTokenSpender}>
    <Form.Field>
      <label>Token Id</label>
      <input placeholder='Ethereum Address'
        value = {this.state.tokenId}
        onChange = {event => this.setState({tokenId: event.target.value})}
       />
    </Form.Field>
    <Form.Field>
      <label>Ethereum Address of Spender</label>
      <input placeholder='Token Number' 
        value = {this.state.spenderEthereumAddress}
          onChange = {event => this.setState({spenderEthereumAddress: event.target.value})}
      />
    </Form.Field>

    <Button type='submit'>Allow Spender</Button>
  </Form>
  </Segment>

  )
}

}
export default AllowSpender