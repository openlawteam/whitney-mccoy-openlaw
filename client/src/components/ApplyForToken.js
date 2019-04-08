import React, { Component } from 'react'
import { Container, Grid, Form, Button }from 'semantic-ui-react';
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

    } catch(error){
      console.log('errors..', error);
    }
    
  }
  update = async (key, value) => {
      console.log('updates..');
      const myTemplate = await apiClient.getTemplate(openLawConfig.templateName);
      this.setState({myTemplate});   
      const myContent = myTemplate.content; 
      //console.log(myTemplate.content);

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

  } //update function

sendDraft=(event)=>{
  console.log('sending draft..');
  event.preventDefault()
  console.log(this.state.parameters);
}

renderPreview = async (event)=> {
  console.log('preview...');
  event.preventDefault();
  const {agreement} = Openlaw.getAgreements(this.state.executionResult)[0];
  const previewHtml = await Openlaw.renderForReview(agreement, {},{});
  //console.log(previewHtml);
  this.setState({previewHtml});
}

  render() {
    return(
    <Container>
    <Grid>
    <Grid.Row>
      <Grid.Column width ={10}>
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
      <Button
      onClick={this.sendDraft}
      >Send Draft
      </Button>
      </Grid.Column>
      <Grid.Column width ={6}>

      <h2>Preview</h2>
      <div dangerouslySetInnerHTML={{__html: this.state.previewHtml}} />
    <Button
      onClick={this.renderPreview}
    >Click to Preview</Button>

      </Grid.Column>
      </Grid.Row>
      </Grid>
    </Container>
    )
  }//render 
} //component 

export default ApplyForToken;