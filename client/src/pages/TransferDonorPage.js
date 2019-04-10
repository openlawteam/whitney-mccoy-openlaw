import React, { Component } from 'react'
import { Container, Divider }from 'semantic-ui-react';
import TransferTokenForm from '../components/TransferToken';
class TransferDonorPage extends Component {
	render() {
		return(
		<Container>
			<h2>Transfer your Token Id to new Donor</h2>
			<TransferTokenForm/>
			<Divider/>

		</Container>
		)
	}
}

export default TransferDonorPage;