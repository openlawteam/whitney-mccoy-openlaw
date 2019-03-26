pragma solidity ^0.5.2;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "openzeppelin-solidity/contracts/access/roles/MinterRole.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract McCoyContract is ERC721Full,MinterRole, Ownable {
     //implement Counters. ..getting error
    //using Counter for Counter.Counter;
   
    constructor() public
        // string memory name,
        // string memory symbol    
        ERC721Full("McCoy Donor Token", "MCC")
        { }

           function createMcCoyToken(
                string memory tokenURI, uint256 mccTokenId
            )
                public onlyOwner
                returns (bool)
            {
                
                _mint(msg.sender, mccTokenId);
                _setTokenURI(mccTokenId, tokenURI);
                return true;
            }
        
}