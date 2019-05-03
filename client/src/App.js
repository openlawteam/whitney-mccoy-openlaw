import React, { Component } from "react";
import { Container, Grid } from 'semantic-ui-react';
//Components
import MenuBar from './components/MenuBar';
import Header from './components/Header';
import TopHeader from './components/TopHeader';
import ImageMcCoy from './components/ImageMcCoy';
//Pages
import TransferDonorPage from './pages/TransferDonorPage';
import LandingPage from './pages/LandingPage';
import ArtistDashboardPage from './pages/ArtistDashboardPage';
import NoMatch from './pages/NoMatch';
//Router
import { Switch, Route, withRouter } from 'react-router-dom';
//CSS
import "./App.css";
import "./whitney.css";

class App extends Component {
  state = {web3:null}

  render() {
      
    return (
      <div className="App whitney">
        <TopHeader />

        <Container>
          <MenuBar/>

          <Grid columns={2} divided >
            <Grid.Row> 
              <Grid.Column width={10} className="landing-img">
                <ImageMcCoy/>
              </Grid.Column>
              <Grid.Column width={6} textAlign='left'>

                  <Header/>
              
                  <div className="page-content-container">
                    <Switch>
                      <Route exact path='/' component={LandingPage}></Route>
                      <Route exact path='/Transfer-Donor' component={TransferDonorPage}></Route>
                      
                      <Route exact path='/Artist-Dashboard' component={ArtistDashboardPage}></Route>
                       <Route component={NoMatch} />
                    </Switch>
                  </div>

              </Grid.Column>
            </Grid.Row>
          </Grid>

        </Container>
      </div>
    );
  }
}

export default withRouter(App);
