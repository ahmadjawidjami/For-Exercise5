pragma solidity ^0.4.0;
contract Hello {



    string public id;
    string public category;
    string public title;
    string public description;
    string public project_start;
    string public project_end;
    string public funding_start;
    string public funding_end;
    int public funding_goal;
    string public message = "Hello World";

    function Hello(){

    }

    function getMessage() constant returns (string){

    return message;
    }

    function setMessage(string theMessage)  {
        message = theMessage;
    }

}