import React, { Component } from 'react'
import { Container, Divider }from 'semantic-ui-react';

//import TokenDisplayTable from '../components/tokenDisplayTable';
import CardExampleHeaderCard from '../components/tokenCards';
class LandingPage extends Component {
	render() {
		return(
		<Container>
			<CardExampleHeaderCard/>
			<Divider/>

		</Container>
		)
	}
}

export default LandingPage;