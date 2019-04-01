import React, { Component } from 'react'
import { Container }from 'semantic-ui-react';
import { APIClient, Openlaw } from 'openlaw';
import OpenLawForm from 'openlaw-elements';
import 'openlaw-elements/dist/openlaw-elements.min.css';
//require('./dotenv').config; 
//var OPENLAW_EMAIL = process.env["OPENLAW_EMAIL"];
//var OPENLAW_PASSWORD = process.env["OPENLAW_PASSWORD"];

    const URL = "https://app-rc.openlaw.io/"; 
    const TEMPLATE_NAME = "Whitney-McCoy Donor Certificate"; 
    const OPENLAW_USER = 'michael.chan@consensys.net'; 
    const OPENLAW_PASSWORD = 'ShuPei2013!'; 
    
    const openLawConfig = {
      server:URL, 
      templateName:TEMPLATE_NAME,
      userName:OPENLAW_USER,
      password:OPENLAW_PASSWORD
    }
 const apiClient = new APIClient(URL);

class ApplyForToken extends Component {
   //state = {apiClient:null};


  componentDidMount = async() => {

    
    console.log('apply for token..', openLawConfig.userName, openLawConfig.password);
    try{
      //apiClient.login(openLawConfig.userName,openLawConfig.password).then(console.log);
      console.log(apiClient);
    }
    catch(error){
      console.log('errors..', error);
    }
    
  }

  render() {
    return(
    <Container>
      <h2>powered by openlaw</h2>

    </Container>
    )
  }//render 
} //component 

export default ApplyForToken;