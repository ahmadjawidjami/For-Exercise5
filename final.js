
//importweb3API
var Web3 = require('web3');
//instanciate
var web3 = new Web3();
//linkwithlocalethereumnode
web3.setProvider(new web3.providers.HttpProvider());
const fs = require("fs");
const solc = require('solc');
var utf8 = require('utf8');

let source = fs.readFileSync('Project.sol', 'utf8');

//var compiledContract = web3.eth.compile.solidity(source);
let compiledContract = solc.compile(source, 1);

let abi = JSON.parse(compiledContract.contracts[':Project'].interface);
let bytecode = compiledContract.contracts[':Project'].bytecode;

let contractAddress = "0x027d1aec0de8e1a6453dcbc00e526a16096acf58";


deploy(web3.eth.accounts[0]);
//getTitle();
// deposit(web3.eth.accounts[3], 99999, contractAddress);
// deposit(web3.eth.accounts[1], 99999, contractAddress);
// deposit(web3.eth.accounts[2], 99999, contractAddress);
//console.log(getContractBalance(contractAddress));
// console.log(getProjectStatus(contractAddress));
//
// updateFundingStart(contractAddress, web3.eth.accounts[0], "2017-01-01");
// updateFundingEnd(contractAddress, web3.eth.accounts[0], "2017-01-01");
// updateFundingGoal(contractAddress, web3.eth.accounts[0], 20000);
//
// console.log(getProjectStatus(contractAddress));
//getEvents(contractAddress);



function updateFundingStart(contractAddress, from, date) {

    var Contract = web3.eth.contract(abi).at(contractAddress);
    Contract.updateFundingStart(date, {from: from, gas:4000000});

}

function updateFundingEnd(contractAddress, from, date) {

    var Contract = web3.eth.contract(abi).at(contractAddress);
    Contract.updateFundingEnd(date, {from: from, gas:4000000});

}

function updateFundingGoal(contractAddress, from, amount) {

    var Contract = web3.eth.contract(abi).at(contractAddress);
    Contract.updateFundingGoal(amount, {from: from, gas:4000000});

}

function getEvents(contractAddress) {
    var Contract = web3.eth.contract(abi).at(contractAddress);

// watch for an event with {some: 'args'}
    var events = Contract.allEvents({fromBlock: 0, toBlock: 'latest'});
    events.watch(function(error, result){


      //  web3.eth.sendTransaction({from: web3.eth.accounts[0], to: result.args.sender, value: 999901});
       console.log(Contract.refund(result.args.sender, result.args.amount.toNumber(), {from: web3.eth.accounts[0], gas: 4700000}));


      //  console.log(result.args.amount);
        events.stopWatching();
      // console.log(Contract.kill({from: web3.eth.accounts[0], gas: 4700000}));
        Contract.kill({from: web3.eth.accounts[0]});

        //console.log(Contract.address);
    });


// would get all past logs again.
    //events.get(function(error, logs){ ... });



}




function deploy(deployerAddress=web3.eth.accounts[0]) {
    let MyContract = web3.eth.contract(abi);
    var myContractReturned = MyContract.new(1, "first", "b", "c", "2014-01-01", "2014-01-01", "2014-01-01", "2014-01-01", 5000, {
        from: deployerAddress,
        data: bytecode,
        gas: 4700000
    }, function (err, myContract) {
        if (!err) {

            if (!myContract.address) {
                console.log("Contract hash: " + myContract.transactionHash) // The hash of the transaction, which deploys the contract

            } else {
                console.log("Contract address: "+ myContract.address) // the contract address
            }



        }else {
            console.log(err);
        }
    });

}


function getTitle() {


    var MyContract = web3.eth.contract(abi);
    var myContractInstance = MyContract.at('0x13eb30a9ea5d6222c2605275603d42a1687ee5e7');

    console.log(myContractInstance.category());

}


function deposit(from, amount, contractAddress) {


    let Contract = web3.eth.contract(abi).at(contractAddress);
   // console.log(Contract.getBalance());
    Contract.depositFund({value: amount, from: from, gas: 40000});
   // console.log(Contract.getBalance());

}

function getContractBalance(contractAddress) {

    let Contract = web3.eth.contract(abi).at(contractAddress);
    return Contract.getBalance().c[0];
}


function getProjectStatus(contractAddress) {
    let Contract = web3.eth.contract(abi).at(contractAddress);

    var status = "Funding start: " + Contract.funding_start() + "\n" +
       "Funding end: " + Contract.funding_end() + "\n" +
       "Funding goal: " +  Contract.funding_goal() + "\n" +
         "Received amount: " + getContractBalance(contractAddress) + "\n" +
       "Fuding goal reached?: " +  Contract.isGoalReached() + "\n";
    return status;
}
