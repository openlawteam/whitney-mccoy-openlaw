import React, { Component } from 'react'
import { Container }from 'semantic-ui-react';

import TokenDisplayTable from '../components/tokenDisplayTable';

class LandingPage extends Component {
	render() {
		return(
		<Container>
			
			<TokenDisplayTable/>

		</Container>
		)
	}
}

export default LandingPage;