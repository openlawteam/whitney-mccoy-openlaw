# whitney-mccoy-openlaw

To start from the terminal and run on http://localhost:3000:
1.  start from the root directoy 'whitney-mccoy-openlaw' in the 'master' branch
2. "cd client" (client folder in the root directory). 
3. "npm run start" 

# Todo for Jennifer & Kevin
In the 'fresh-token-contract' branch. This is a fresh solidity contract with no tokens minted.  Ownership is with your Eth address: 0xA57fB5A5aD51beb3854D801ea3Ad6AC2845CD082.  So, you should be the only Minter. 
 
 It may hang on a loading state when you mint (also 'allow spender' and 'transfer token'), but you should see the transaction confirmed within Metamask. After you see the confirmation in Metamask, you may have to reload the page.  This seems to be an issue I've been having with Metamask on other applications as well -- outside of this application.   

# Todo: 

- on TransferToken component - 'success message' takes too long to load ( > 2min after the transaction has cleared on MetaMask). Same issue for "MintToken" and "AllowSpender" components on the Artist-Dashboard.

- on "Artist-Dashboard" page - currently, I do not show display a link to the that page in the Menu, because only the Artist needs access. Is there is a better way to handle?  It is secure on the backend in Solidity. 

- Currently, Michael Chan's Metamask account is associated as the current owner of the smart contract. A fresh smart contract will need to be deployed with the McCoy Ethereum address as owner. 

- when finished deploy as static site on github pages with mccoyspace.com/some-subdomain-name


