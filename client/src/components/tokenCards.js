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
  this.updateCards();

}

updateCards = async(event)=>{
  console.log('updating cards..');
  try{
      //connect to web3 and contract instance 
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        console.log('update cards from ..',accounts[0]);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = McCoyContract.networks[networkId];

        const instance = new web3.eth.Contract(
          McCoyContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
        this.setState({accounts, web3, instance});
       
        //need list of all tokenIDs that exist 
      // instance.methods.totalSupply().call({from: accounts[0]}, (error, result) =>
      //   {
      //    //had to add resutl.toString() - all of sudden got bigNumber errors in react
      //     const allTokens = result.toString(10);
      //     console.log(error, allTokens);
      //     this.setState({allTokens});
      //   });
      this.getTotalSupply();
//Loop over token index and get the token Ids to make array of tokenIds
      var i; 
      //const myTokenList = props.myTokenList;  
      const myTokenList = [];
      //TODO change to 'allTokens', instead of hard code, 
      for(i=0; i < 5; i++){
        instance.methods.tokenByIndex(i).call({from: accounts[0]}, (error, result) =>{
          const tokenByIndexList = result.toString(10);

          ///FELIPE SOLUTION
//           let ownerAddress = await functionToGetOwner();
// let propertyN = await functionToGetPropertyN();
// myTokenList.push({
// key: i,
// tokenId: result.tokenId,
// tokenMetadata: result.tokenMetadata,
// owner: ownerAddress,
// propertyN: propertyN
// });

          myTokenList.push(tokenByIndexList);
          // this.setState({myTokenList});
          // console.log('myTokenList', this.state.myTokenList);
          console.log(error, tokenByIndexList);

        });

      }
      console.log('the array index to tokenId..', myTokenList);
      
      //const tokenItems = myTokenList.map((tokens) => <li>{tokens}</li>);
     
//CALL THESE METHODS FOR ALL TOKENS IN THE ARRAY < totalSupply

        //get the tokenID at an index position. 
        instance.methods.tokenByIndex(1).call({from: accounts[0]}, (error, result) =>{
          const tokenByIndexList = result.toString(10);
          console.log(error, "token.."+tokenByIndexList);
        });

        this.getOwnerAddress();
       
        this.getTokenMetaData();
  }catch(error){
    console.log('error updating cards', error)
  }
}//updateCards

getOwnerAddress = async(event)=>{
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
      instance.methods.ownerOf(1).call({from: accounts[0]}, (error, result) =>{
          console.log(error,"owner.." + result);
        });

  } catch(error){console.log('get owner address error', error)}
}//getOwnerAddress

getTokenMetaData = async(event)=>{
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
      instance.methods.tokenURI(1).call({from: accounts[0]}, (error, result) =>{
          console.log(error,"meta.." + result);
        });

  } catch(error){console.log('get token metadata error', error)}
}//getOwnerAddress

getTotalSupply= async(event)=>{
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

        instance.methods.totalSupply().call({from: accounts[0]}, (error, result) =>
        {
         //had to add resutl.toString() - all of sudden got bigNumber errors in react
          const allTokens = result.toString(10);
          console.log(error, "totalSupply..."+ allTokens);
          this.setState({allTokens});
        });
  } catch(error){console.log('get token metadata error', error)}
}//getOwnerAddress

  render() {
    return(
  <Container>
  <h3> token list </h3>
   <Card.Group itemsPerRow={3}>
    <Card>
      <Card.Content>
        <Card.Header>Token Id 1</Card.Header>
        <Card.Meta>meta data of token</Card.Meta>
         <Card.Description>0xad9b86640008f02d9f2f3f0702133cea4eecb18c</Card.Description>
        <Card.Meta>Current Donor</Card.Meta>
      </Card.Content>
    </Card>

  </Card.Group>

  
  </Container>

)
  }
}

export default TokenCards