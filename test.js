
//importweb3API
var Web3 = require('web3');
//instanciate
var web3 = new Web3();
//linkwithlocalethereumnode
web3.setProvider(new web3.providers.HttpProvider());


// const fs = require("fs");
// var utf8 = require('utf8');
//
// let source = fs.readFileSync('Project.sol', 'utf8');
//
// var compiledContract = web3.eth.compile.solidity(source);
// let abi =compiledContract.info.abiDefinition;
// let bytecode = compiledContract.code;

let contractAddress = "0x505500e74c9f1f32d612f50f98eaa6dd65775f41";





function transfer() {
    var balance1=web3.eth.getBalance(web3.eth.accounts[1]);
    var balance2=web3.eth.getBalance(web3.eth.accounts[2]);
    var balance3=web3.eth.getBalance(web3.eth.accounts[3]);
    //console.log(balance1);//instanceofBigNumber
   // console.log(balance1.toString());//'1000000000000'
    console.log(balance1.toNumber());

    //console.log(balance2);//instanceofBigNumber
    //console.log(balance2.toString());//'1000000000000'
    console.log(balance2.toNumber());
    console.log(balance3.toNumber());
}

transfer();





