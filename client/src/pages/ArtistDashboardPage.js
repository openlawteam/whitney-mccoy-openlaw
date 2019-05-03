import React, { Component } from 'react'
import { Container, Divider }from 'semantic-ui-react';
import MintToken from '../components/MintToken';
import TransferTokenForm from '../components/TransferToken';
import AllowSpender from '../components/AllowSpender';

class ArtistDashboardPage extends Component {
	render() {
		return(
		<Container>
			<h2 className="section-heading">Artist Dashboard</h2>
			
			<MintToken/>
			
			 <Divider hidden/>
			 
			<TransferTokenForm/>
			
			<Divider hidden/>
			
			<AllowSpender/>
			
			<Divider/>
	
		</Container>
		)
	}
}

export default ArtistDashboardPage;