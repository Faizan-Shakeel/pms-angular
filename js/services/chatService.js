var app = angular.module('chatServiceModule',[]);

app.service('chatService', function()
{
    var userMessagesObject = [];
    
    // * The "chatMessages" function stores all the chat messages along with 
    //   chatters' emails. This will later be used to retrieve the chat history
    //   and show it to respective users. *
    var chatMessages = function(message)
    {
        userMessagesObject.push({username: message.username, userEmail: message.userEmail, receiverEmail: message.receiverEmail, content: message.content});
        return userMessagesObject;
    };
    
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
        //console.log(testArray);
        return testArray;
    };

        return ({chatMessages: chatMessages,
                 selectChat: selectChat});
});