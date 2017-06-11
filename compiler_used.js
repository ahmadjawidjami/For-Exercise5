var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();


//importweb3API
var Web3 = require('web3');
//instanciate
var web3 = new Web3();
//linkwithlocalethereumnode
web3.setProvider(new web3.providers.HttpProvider());



// var balance=web3.eth.getBalance("0xde4bb2bcd5fa109a399b848d2d37baca404d70e7");
// console.log(balance);//instanceofBigNumber
// console.log(balance.toString());//'1000000000000'
// console.log(balance.toNumber());

const fs = require("fs");
const solc = require('solc');
var utf8 = require('utf8');

let source = fs.readFileSync('Project.sol', 'utf8');

var compiledContract = web3.eth.compile.solidity(source);
//
//
let abi =compiledContract.info.abiDefinition;

var MyContract = web3.eth.contract(abi);

// initiate contract for an address
//MyContract.address = "0x2c33e1266e1e9340cc131b59b3174b4ef20ba9d3";
var myContractInstance = MyContract.at('0xde4bb2bcd5fa109a399b848d2d37baca404d70e7');
// myContractInstance.giveMessage.call("Java");


//
//myContractInstance.setMessage("Java Programming", {from: "0x5f34985becc9a7946613082e1ef9042617102289", gas:4000000});

//myContractInstance.transfer('0xde4bb2bcd5fa109a399b848d2d37baca404d70e7',2000, {from: "0x564fabf91a85a7a89b67e44bc08ecb89f5dde422"});

myContractInstance.depositFund({value: 1000, from: "0x564fabf91a85a7a89b67e44bc08ecb89f5dde422", gas: 40000});

console.log(myContractInstance.getBalance());

// var result = myContractInstance.getMessage();
// console.log(result);


//var myContractInstance = MyContract.at(myContractAddress);


// Or deploy a new contract:

// Deploy the contract asyncronous from Solidity file:

// const fs = require("fs");
// const solc = require('solc')
//
// let source = fs.readFileSync('Hello.sol', 'utf8');
//
//
// var compiledContract = web3.eth.compile.solidity(source);
//
//
// let abi =compiledContract.info.abiDefinition;
// let bytecode = compiledContract.code;
// let gasEstimate = web3.eth.estimateGas({data: bytecode});
// let MyContract = web3.eth.contract(abi);
//
// var myContractReturned = MyContract.new( {
//     from:"0x2e4d8fac1ff3b1e59ad5254406dae8b49627231b",
//     data:bytecode,
//     gas:gasEstimate}, function(err, myContract){
//     if(!err) {
//         // NOTE: The callback will fire twice!
//         // Once the contract has the transactionHash property set and once its deployed on an address.
//
//         // e.g. check tx hash on the first call (transaction send)
//         if(!myContract.address) {
//             console.log(myContract.transactionHash) // The hash of the transaction, which deploys the contract
//
//             // check address on the second call (contract deployed)
//         } else {
//             console.log(myContract.address) // the contract address
//         }
//
//         // Note that the returned "myContractReturned" === "myContract",
//         // so the returned "myContractReturned" object will also get the address set.
//     }
// });









// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
