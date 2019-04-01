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

class ApplyForToken extends Component {

  render() {
    return(
    <Container>
      <h2>powered by openlaw</h2>

    </Container>
    )
  }//render 
} //component 

export default ApplyForToken;