import React, { Component } from "react";
import McCoyContract from "./contracts/McCoyContract.json";
import IERC721 from "./contracts/IERC721.json";
import getWeb3 from "./utils/getWeb3";
import { Container,Grid, Button, Form} from 'semantic-ui-react';
import { APIClient, Openlaw } from 'openlaw';
import "./App.css";

class App extends Component {
  state = { instance: undefined, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = McCoyContract.networks[networkId];

      const instance = new web3.eth.Contract(
        McCoyContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      this.setState({instance});
      console.log("McCoyContract instance..",this.state.instance);
      console.log(instance.options.address);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>

      </div>
    );
  }
}

export default App;
