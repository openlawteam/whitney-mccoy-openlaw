import React, { Component } from "react";
import { Button, Form, Segment, Message, Input } from 'semantic-ui-react'
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
    
    this.setState({loading: true, errorMessage:'', successMessage:''});
    event.preventDefault();

    try { 

        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = McCoyContract.networks[networkId];

        const instance = new web3.eth.Contract(
          McCoyContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        this.setState({accounts, web3,instance});
        
      await instance.methods.approve(this.state.spenderEthereumAddress,this.state.tokenId)
      .send({
        from: accounts[0]
      })
         this.setState({successMessage: 'Spender is authorized'});
    }//try
    catch(error) {   
      this.setState({errorMessage: error.message});
    }

    this.setState({loading:false});
  };// allowTokenSpender 

render() {
  return(
 <Segment color = 'yellow'>
 <h2>Authorize Spender Ethereum Address</h2>
  <Form onSubmit = {this.allowTokenSpender}
      success={!!this.state.successMessage}
      error = {!!this.state.errorMessage}
      loading = {this.state.loading}
  >
  <Message error header = 'Spender has not been authorized' content = {this.state.errorMessage}/>
  <Message success header = 'Spender Authorized' content={this.state.successMessage} />
    
    <Form.Field>
      <label>Token Id</label>
      <Input placeholder='Token ID'
        value = {this.state.tokenId}
        onChange = {event => this.setState({tokenId: event.target.value})}
       required/>
    </Form.Field>
    <Form.Field>
      <label>Ethereum Address of Spender</label>
      <Input placeholder='Ethereum Address of Spender' 
        value = {this.state.spenderEthereumAddress}
        onChange = {event => this.setState({spenderEthereumAddress: event.target.value})}
        required />
    </Form.Field>

    <Button type ='submit'>Allow Spender</Button>
  </Form>
  </Segment>

  )
}

}
export default AllowSpender