pragma solidity ^0.4.10;


contract mortal{

    address owner;

    function mortal(){
        owner = msg.sender;
    }

    function kill() {
        if(msg.sender == owner){
            //suicide(owner);
            selfdestruct(owner);
        }
    }
}

contract Project is mortal {

    uint public id;
    string public category;
    string public title;
    string public description;
    string public project_start;
    string public project_end;
    string public funding_start;
    string public funding_end;
    uint public funding_goal;

    function Project(uint _id, string _category, string _title, string _desc, string _project_start, string _project_end,
    string _funding_start, string _funding_end, uint _funding_goal){

        id = _id;
        category = _category;
        title = _title;
        description = _desc;
        project_start = _project_start;
        project_end = _project_end;
        funding_start = _funding_start;
        funding_end = _funding_end;
        funding_goal = _funding_goal;

    }
    event logReceivedMoney(address sender,uint amount);

    function depositFund() payable {
        logReceivedMoney(msg.sender,msg.value);

    }

    function isGoalReached() returns (bool){
        return this.balance >= funding_goal;

    }

    function updateFundingStart(string _funding_start){
        funding_start = _funding_start;

    }

    function updateFundingEnd(string _funding_end){
        funding_end = _funding_end;

    }

    function updateFundingGoal(uint _funding_goal){
        funding_goal = _funding_goal;

    }

    function getBalance() constant returns(uint) {
        return this.balance;
    }

    function refund(address receiver, uint amount) returns (bool){

        if(msg.sender == owner && this.balance >= amount) {
            receiver.transfer(amount);
            return true;
        }else{
            return false;
        }

    }

}