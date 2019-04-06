import React, { Component } from "react";
import McCoyContract from "../contracts/McCoyContract.json";
import getWeb3 from "../utils/getWeb3";
import { Card, Table, Container } from 'semantic-ui-react'

class TokenCards extends Component {
  state = {
    instance: null, 
    web3: null, 
    accounts:'',
    tokenId:'',
    allTokens:null, 
    myTokenList:[], 
    tokenItems:null
  }

componentDidMount = async () => {
  await this.getTotalSupply();
  this.updateCards();

}

updateCards = async(event)=>{
  console.log('updating cards..');
  try{
      //connect to web3 and contract instance 
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        //console.log('update cards from ..',accounts[0]);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = McCoyContract.networks[networkId];

        const instance = new web3.eth.Contract(
          McCoyContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
        this.setState({accounts, web3, instance});

    //Loop over token index and get the token Ids to make array of tokenIds
    //a counter variable
      var i;
      //get total supply of all tokenIDs that exist 
      let tokenSupply =  this.state.allTokens;
      //array to used to collect tokenId, owner address, and metadata
       const myTokenList = [];
   
      for(i=0; i < tokenSupply; i++) {
        //get the tokenId from the index #
        let tokenId = await instance.methods.tokenByIndex(i).call({from: accounts[0]}, (error, result) =>{
         // const tokenId = result.toString(10);
         //console.log(error, result.toString(10));
          return result.toString(10);
        }); //tokenByIndex call

        //use the tokenId to get its owner's Eth address
        let ownerAddress = await instance.methods.ownerOf(tokenId).call({from:accounts[0]}, (error, result) =>{
          //console.log(error, "eth.."+ result);
          return result.toString();
        })
         //use the tokenId to get its Metadata
       let tokenMetadata = await instance.methods.tokenURI(tokenId).call({from:accounts[0]}, (error, result) =>{
          //console.log(error, "")
          return result.toString();
        })
       //push values into myTokenList array
        myTokenList.push({
          key:i,
          tokenid: tokenId.toString(10),
          tokenmetadata: tokenMetadata,
          owneraddress: ownerAddress
        });
      }//for loop
        //this.setState({myTokenList});
      console.log('the array index to tokenId..', myTokenList);
     //map array to an element
      const listItems = myTokenList.map((tokens)=>
        <Card key={tokens.key}>
          <Card.Content>
            <Card.Header>Token ID: {tokens.tokenid}</Card.Header>
            <Card.Meta>{tokens.metadata}</Card.Meta>
            <Card.Description className = "wee">{tokens.owneraddress}</Card.Description>
          </Card.Content>
        </Card>  
      )
      this.setState({listItems});
       
  } //try
  catch(error){
    console.log('error updating cards', error)
  }
}//updateCards

getTotalSupply= async(event)=>{
  try{
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        //console.log('update cards from ..',accounts[0]);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = McCoyContract.networks[networkId];

        const instance = new web3.eth.Contract(
          McCoyContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        instance.methods.totalSupply().call({from: accounts[0]}, (error, result) =>
        {
         //had to add resutl.toString() - all of sudden got bigNumber errors in react
          const allTokens = result.toString(10);
          //console.log(error, "totalSupply..."+ allTokens);
          this.setState({allTokens});

         console.log("totalSupply2.." + this.state.allTokens);
        });
  } catch(error){console.log('get token metadata error', error)}
}//getOwnerAddress

  render() {
    return(
  <Container>
  <h3> Token List </h3>

  <Card.Group itemsPerRow={2}>{this.state.listItems}</Card.Group>
  </Container>

)
  }
}

export default TokenCards