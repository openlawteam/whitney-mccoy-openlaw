import React, { Component } from 'react'
import { Container }from 'semantic-ui-react';

import TokenCards from '../components/tokenCards';
class LandingPage extends Component {
	render() {
		return(
		<Container>
			<TokenCards/>
		</Container>
		)
	}
}

export default LandingPage;