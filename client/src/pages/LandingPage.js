import React, { Component } from 'react'
import { Container, Divider }from 'semantic-ui-react';

import TokenDisplayTable from '../components/tokenDisplayTable';

class LandingPage extends Component {
	render() {
		return(
		<Container>
			
			<TokenDisplayTable/>
			<Divider/>

		</Container>
		)
	}
}

export default LandingPage;