import React, { Component } from 'react'
import { Container, Divider }from 'semantic-ui-react';

import TokenCards from '../components/tokenCards';
class LandingPage extends Component {
	render() {
		return(
		<Container>
			<TokenCards/>
			<Divider/>

		</Container>
		)
	}
}

export default LandingPage;