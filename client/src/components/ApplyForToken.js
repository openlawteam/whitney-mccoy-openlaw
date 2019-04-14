import React, { Component } from 'react'
import { Container, Grid, Form, Button, Message, Modal }from 'semantic-ui-react';
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
    donorEthAddress:null,
     errorMessage:'',
    successMessage: 'free'
  };

  componentDidMount = async() => {

    try{
      this.update();

    } catch(error){
      console.log('errors..', error);
    }   
  } //componentDidMount

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

sendDraft= async (event)=>{
  console.log('sending draft..');
  event.preventDefault()
  //console.log(this.state.parameters);
  //upload params, myTemplate, and creatorId
  const uploadParams = await this.buildOpenLawParamsObj(this.state.myTemplate,'michael.chan@consensys.net');
  const draftId = await apiClient.uploadDraft(uploadParams);
  console.log('draft id..', draftId);
  this.setState({draftId});
} //sendDraft

renderPreview = async (event)=> {
  console.log('preview...');
  event.preventDefault();
  const {agreement} = Openlaw.getAgreements(this.state.executionResult)[0];
  const previewHtml = await Openlaw.renderForReview(agreement, {},{});
  //console.log(previewHtml);
  this.setState({previewHtml});
} //renderPreview

/*HELPERS*/
/*converts an email address into an object, to be used with uploadDraft
or upLoadContract methods from the APIClient.
Eventually this function will no longer be needed. */
// convertUserObject = (original) => {
//     const object = {
//       id: {
//         id: original.id
//       },
//       email: original.email,
//       identifiers: [
//         {
//          identityProviderId: "openlaw",
//          identifier: original.identifiers[0].id
//         }
//       ]
//     }
//     return object;
//   }

  /*Build Open Law Params to Submit for Upload Contract*/
  buildOpenLawParamsObj = async (myTemplate, creatorId) => {
    //console.log(this.state.parameters['Artist Signatory Email']);
    //const artistUser = await apiClient.getUserDetails(this.state.parameters['Artist Signatory Email']); 
    //const donorUser = await apiClient.getUserDetails(this.state.parameters['Donor Signatory Email']);

    const object = {
      templateId: myTemplate.id,
      title: myTemplate.title,
      text: myTemplate.content,
      creator: creatorId,
      parameters: {
        "Artist Ethereum Address": this.state.parameters['Artist Ethereum Address'],
        "Donor Name": this.state.parameters['Donor Name'],
        "Recipient Ethereum Address": this.state.parameters['Recipient Ethereum Address'],
        "Token Id": this.state.parameters['Token Id'],
        "Donor Signatory Email": this.state.parameters['Donor Signatory Email'],
        "Artist Signatory Email": this.state.parameters['Artist Signatory Email'],
        // "Artist Signatory Email": JSON.stringify(this.convertUserObject(artistUser)),
        // "Donor Signatory Email": JSON.stringify(this.convertUserObject(donorUser)),
      },
      //parameters: this.state.parameters,
      overriddenParagraphs: {},
      agreements: {},
      readonlyEmails: [],
      editEmails: [],
      draftId: this.state.draftId
    };
    return object;
  };

  render() {
    return(
    <Container>
    <Grid>
    <Grid.Row>
      <Grid.Column width ={16}>
      <h2>Powered by Openlaw</h2>
      <p>something something short about openlaw</p>
      <Form >
      {Object.keys(this.state.executionResult).length && (
        <OpenLawForm
          apiClient={apiClient}
          executionResult={this.state.executionResult}
          parameters={this.state.parameters}
          onChangeFunction={this.update}
          openLaw={Openlaw}
          //renderSections = 'Donor'
          unsectionedTitle="Ethereum Address Yes/No"
          variables={this.state.variables}
        /> 
      )}
      </Form>
        <Button
          onClick={this.sendDraft}
          >Send to Openlaw
          </Button> 
        <Modal trigger={<Button onClick={this.renderPreview}>Show Preview</Button>} closeIcon>
        <Modal.Content> <div dangerouslySetInnerHTML={{__html: this.state.previewHtml}}/>  </Modal.Content>
        </Modal>
    </Grid.Column>
      </Grid.Row>
      </Grid>
    </Container>
    )
  }//render 
} //component 

export default ApplyForToken;