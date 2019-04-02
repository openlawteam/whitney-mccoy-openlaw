import React, { Component } from 'react'
import { Container, Form, Button, Checkbox }from 'semantic-ui-react';
import { APIClient, Openlaw } from 'openlaw';
import OpenLawForm from 'openlaw-elements';
import 'openlaw-elements/dist/openlaw-elements.min.css';
//require('./dotenv').config; 
//var OPENLAW_EMAIL = process.env["OPENLAW_EMAIL"];
//var OPENLAW_PASSWORD = process.env["OPENLAW_PASSWORD"];

    const URL = "https://develop.dev.openlaw.io"; 
    const TEMPLATE_NAME = "Whitney Test"; 
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
   state = {
    myTemplate:null
  };

  componentDidMount = async() => {

    try{
      // apiClient Login 
      apiClient
      .login(openLawConfig.userName,openLawConfig.password)
      .catch((error) => {
        if (/500/.test(error)) {
          console.warn('OpenLaw APIClient: Please authenticate to the APIClient to use the Address input.');
          return;
        }
        console.error('OpenLaw APIClient:', error);
      });


      const myTemplate = await apiClient.getTemplate(openLawConfig.templateName);
      this.setState({myTemplate});    
      console.log(myTemplate.content);
   // //pull properties off of JSON and make into variables
   //  const myTitle = myTemplate.title;

    } catch(error){
      console.log('errors..', error);
    }
    
  }

  render() {
    return(
    <Container>
      <h2>powered by openlaw</h2>

      <Form>
        <Form.Field>
          <label>First Name</label>
          <input placeholder='First Name' />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder='Last Name' />
        </Form.Field>
          <Form.Field>
          <label>Email</label>
          <input placeholder='Email' required/>
        </Form.Field>
        <Form.Field>
          <label>My Ethereum Address</label>
          <input placeholder='My Ethereum Address' />
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>


    </Container>
    )
  }//render 
} //component 

export default ApplyForToken;