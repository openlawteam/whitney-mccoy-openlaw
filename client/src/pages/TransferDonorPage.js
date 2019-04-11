import React, { Component } from 'react'
import { Container, Divider }from 'semantic-ui-react';
import TransferTokenForm from '../components/TransferToken';
class TransferDonorPage extends Component {
	render() {
		return(
		<Container>
			<h2>Transfer your Token to a new "Donor of Record"</h2>
			<TransferTokenForm/>
			<Divider/>

		</Container>
		)
	}
}

export default TransferDonorPage;