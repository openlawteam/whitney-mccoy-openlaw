var McCoy= artifacts.require("./McCoyContract.sol");
//./client/src/contracts
module.exports = function(deployer) {
  deployer.deploy(McCoy);
};
