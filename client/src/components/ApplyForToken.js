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
     apiClient
    .login(openLawConfig.userName,openLawConfig.password)
    .catch((error) => {
      if (/500/.test(error)) {
        console.warn('OpenLaw APIClient: Please authenticate to the APIClient to use the Address input.');
        return;
      }
      console.error('OpenLaw APIClient:', error);
    });

class ApplyForToken extends Component {

    static defaultProps = {
    stateLifter: () => {},
  };

  // trick eslint
  static propTypes = {
    stateLifter: () => {},
  };

   state = {
    myTemplate:null, 
    parameters:{},
    executionResult:{},
    variables:[],
    donorName:'',
    donorEmail:'',
    donorEthAddress:null
  };

  componentDidMount = async() => {

    try{
      this.update();

   //    const myCompiledTemplate = await Openlaw.compileTemplate(myContent);
   //    this.setState({myCompiledTemplate});
   //    console.log("my compiled template..." + myCompiledTemplate);

   //    const parameters = this.state.parameters;
   //    console.log("parameters.." + parameters);
   //    this.setState({parameters});
   //    const executionResult = await Openlaw.execute(this.state.myCompiledTemplate, {}, this.state.parameters);
   //    console.log("ex result.." + executionResult);
   //    // this.setState({executionResult});
   //    // const variables = await Openlaw.getExecutedVariables(this.state.executionResult,{});
   //    // this.setState({variables});
   //    // console.log("execute.." + this.state.variables, this.state.executionResult);
   // // //pull properties off of JSON and make into variables
   // //  const myTitle = myTemplate.title;

    } catch(error){
      console.log('errors..', error);
    }
    
  }
  update = async (key, value) => {
      console.log('updates..');
      const myTemplate = await apiClient.getTemplate(openLawConfig.templateName);
      this.setState({myTemplate});   
      const myContent = myTemplate.content; 
      console.log(myTemplate.content);

          const updatedDraftParameters = key
      ? ({
        ...this.state.parameters,
        [key]: value,
      }) : (
        this.state.parameters
      );

    this.setState(({parameters}) => {
      const concatParameters = {...parameters, ...updatedDraftParameters};
      // https://docs.openlaw.io/openlaw-object/#compiletemplate
      const {compiledTemplate} = Openlaw.compileTemplate(myContent);
      // https://docs.openlaw.io/openlaw-object/#execute

      const {executionResult, errorMessage} = Openlaw.execute(compiledTemplate, {}, concatParameters);

      if (errorMessage) {
        // eslint-disable-next-line no-undef
        console.error('Openlaw Execution Error:', errorMessage);
        return;
      }

      const state = {
        executionResult,
        parameters: concatParameters,
        // https://docs.openlaw.io/openlaw-object/#getexecutedvariables
        variables: Openlaw.getExecutedVariables(executionResult, {}),
      };

      // send props up
      this.props.stateLifter(state);

      return state;
    });
     // const myCompiledTemplate = await Openlaw.compileTemplate(myContent);
  }

  render() {
    return(
    <Container>
      <h2>powered by openlaw</h2>
      {Object.keys(this.state.executionResult).length && (
        <OpenLawForm
          apiClient={apiClient}
          executionResult={this.state.executionResult}
          parameters={this.state.parameters}
          onChangeFunction={this.update}
          openLaw={Openlaw}
          variables={this.state.variables}
        /> 
    )}
    </Container>
    )
  }//render 
} //component 

export default ApplyForToken;