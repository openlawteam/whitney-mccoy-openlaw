import React, { Component } from 'react'
import { Container, Grid }from 'semantic-ui-react';
import ImageMcCoy from './ImageMcCoy';

class Header extends Component{
  render() {
    return (
          <Grid  columns={2} divided >
           <Grid.Row>
            <Grid.Column width={10}>
                <ImageMcCoy/>
            </Grid.Column>
          <Grid.Column width={6}>
            <p> Contract Address {this.state.contractAddress}</p>
            <p> Token Name {this.state.tokenName} </p>
            <p> Token symbol {this.state.tokenSymbol}</p>
          </Grid.Column>
          </Grid.Row>
        </Grid>

    )
  }
}

export default Header;


