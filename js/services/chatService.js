var app = angular.module('chatServiceModule',[]);

app.service('chatService', function()
{   
    var testArray = [];
    // * The "selectChat" function requires three paramaters, the
    //   selectedUserObject which contains the email Id of the person the
    //   logged-in user is communicating with, the senderEmail which contains
    //   the email Id of the logged-in user, and the userMessagesObject which
    //   contains the complete chat history. The function uses selectedUserObject
    //   and senderEmail to retrieve the respective chat from userMessagesObject. *
    var selectChat = function(selectedUserObject, userMessagesObject, senderEmail)
    {
        testArray.length = 0;
        for (var i=0; i<userMessagesObject.length; i++)
        {            
            if ((selectedUserObject.email == userMessagesObject[i].userEmail && senderEmail == userMessagesObject[i].receiverEmail ) || (selectedUserObject.email == userMessagesObject[i].receiverEmail && senderEmail == userMessagesObject[i].userEmail))
            {
                testArray.push(userMessagesObject[i]);
            }
        }
        return testArray;
    };

        return ({selectChat: selectChat});
});