var Casino = artifacts.require("Casino");

module.exports = async function(deployer,accounts) {
    await deployer.deploy(Casino);
    console.log("Owners account = ", accounts[0]);
 }