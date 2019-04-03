import React, { Component } from "react";
import { Container, Divider} from 'semantic-ui-react';
//Components
import MenuBar from './components/MenuBar';
import Header from './components/Header';
//Pages
import TransferDonorPage from './pages/TransferDonorPage';
import LandingPage from './pages/LandingPage';
import NewDonorPage from './pages/NewDonorPage';
import ArtistDashboardPage from './pages/ArtistDashboardPage';
//Router
import { Switch, Route, withRouter } from 'react-router-dom';
//CSS
import "./App.css";

class App extends Component {
  state = {web3:null}


  render() {
      
    return (
      <div className="App">

      <Container>
        <MenuBar/>
       <Header/>
      <Divider hidden />
     
      <Switch>
        <Route exact path='/' component={LandingPage}></Route>
         <Route exact path='/Transfer-Donor' component={TransferDonorPage}></Route>
          <Route exact path='/New-Donor' component={NewDonorPage}></Route>
        <Route exact path='/Artist-Dashboard' component={ArtistDashboardPage}></Route>
      </Switch>

        </Container>
      </div>
    );
  }
}

export default withRouter(App);
