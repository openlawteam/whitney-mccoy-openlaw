import React, { Component } from 'react'
import { Container }from 'semantic-ui-react';
import TransferTokenForm from '../components/TransferToken';
class TransferDonorPage extends Component {
	render() {
		return(
		<Container>
			<h2>Transfer Donor Page</h2>
			<TransferTokenForm/>

		</Container>
		)
	}
}

export default TransferDonorPage;