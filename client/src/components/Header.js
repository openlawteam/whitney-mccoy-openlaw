import React, { Component } from 'react'
// import { Grid } from 'semantic-ui-react';
// import ImageMcCoy from './ImageMcCoy';
import McCoyContract from "../contracts/McCoyContract.json";
import getWeb3 from "../utils/getWeb3";
class Header extends Component{
    state = { instance: undefined, contractAddress: null, 
    tokenName:null, tokenSymbol:null,
    web3: null, accounts: null, contract: null };

      componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = McCoyContract.networks[networkId];

      const instance = new web3.eth.Contract(
        McCoyContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({instance});
      console.log("McCoyContract instance..",this.state.instance);
      const contractAddress = await instance.options.address;
      // const name = await instance.methods.name.call();
      // console.log('name', name);
      this.setState({contractAddress});
      console.log("contractAddress...",this.state.contractAddress);
     
      instance.methods.name().call({from: accounts[0]}, (error, tokenName) => 
        {
          console.log(error, tokenName);
          this.setState({tokenName});
        });

        instance.methods.symbol().call({from: accounts[0]}, (error, tokenSymbol) => 
        {
          console.log(error, tokenSymbol);
          this.setState({tokenSymbol});
        });

        instance.methods.totalSupply().call({from: accounts[0]}, (error, result) =>
        {
         //had to add resutl.toString() - all of sudden got bigNumber errors in react
          const allTokens = result.toString(10);
          console.log(error, allTokens);
          this.setState({allTokens});
        });
        

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    return (
      <div className="token-info-container">
        <h2 className="info-field mccoy-text">Public / Private Key <span className="by-mccoys">by the McCoys</span></h2>
        <h4 className="info-field eth-addr"><span className="info-title">Contract Address:</span> <span>{this.state.contractAddress}</span></h4>
        <h4 className="info-field"><span className="info-title">Token Name:</span> {this.state.tokenName} </h4>
        <h4 className="info-field"><span className="info-title">Token Symbol:</span> {this.state.tokenSymbol}</h4>
        <h4 className="info-field"><span className="info-title">Total Supply:</span> {this.state.allTokens} tokens</h4>
      </div>
    );
  }
}

export default Header;


