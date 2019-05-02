# whitney-mccoy-openlaw

To start from the terminal and run on http://localhost:3000:  
1. "cd client" 
2. "npm run start" 

Todo: 
- on LandingPage - paginate so 50 tokens can be viewed easily. 

- Header on LandingPage can be occasionally be slow to load.

- on TransferToken component - 'success message' takes too long to load ( > 2min after the transaction has cleared on MetaMask). Same issue for "MintToken" and "AllowSpender" components on the Artist-Dashboard.

- on "Artist-Dashboard" page - currently, I do not show display a link to the that page in the Menu, because only the Artist needs access. Is there is a better way to handle?  It is secure on the backend in Solidity. 

- deploy a fresh smart contract with McCoy Ethereum address as owner 

- when finished deploy as static site on github pages with mccoyspace.com/some-subdomain-name


