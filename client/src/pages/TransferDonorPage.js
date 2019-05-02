import React, { Component } from 'react'
import { Container }from 'semantic-ui-react';
import TransferTokenForm from '../components/TransferToken';
class TransferDonorPage extends Component {
	render() {
		return(
		<Container>
			{/* <h2>Transfer your Token to a new "Donor of Record"</h2> */}
			<TransferTokenForm/>

		</Container>
		)
	}
}

export default TransferDonorPage;