var app = angular.module('chatServiceModule',[]);

app.service('chatService',['$localStorage', function($localStorage)
{   
    var msgArray = [];
    // * The "selectChat" function requires three paramaters, the
    //   selectedUserObject which contains the email Id of the person the
    //   logged-in user is communicating with, the senderEmail which contains
    //   the email Id of the logged-in user, and the userMessagesObject which
    //   contains the complete chat history. The function uses selectedUserObject
    //   and senderEmail to retrieve the respective chat from userMessagesObject. *
    var selectChat = function(selectedUserObject, userMessagesObject, senderEmail)
    {
        msgArray.length = 0;
        for (var i=0; i<userMessagesObject.length; i++)
        {            
            if ((selectedUserObject.email == userMessagesObject[i].userEmail && senderEmail == userMessagesObject[i].receiverEmail ) || (selectedUserObject.email == userMessagesObject[i].receiverEmail && senderEmail == userMessagesObject[i].userEmail))
            {
                msgArray.push(userMessagesObject[i]);
            }
        }
        return msgArray;
    };

    // * The "checkMsgStatus" function goes through the complete users' list
    //   and checks whether a particular user has send a message to logged-in
    //   user or not by finding the user's emailID (i.e. the message sender)  
    //   in logged-in user's unreadMessageFlag array. *
    var checkMsgStatus = function(users)
    {
        for (var i=0; i<users.length; i++)
        {
            for (var j=0; j<$localStorage.currentUser.users.unreadMessageFlag.length; j++)
            {
                if($localStorage.currentUser.users.unreadMessageFlag[j] == users[i].email)
                {
                    users[i].name = users[i].name + '(1)';
                }              
            }
        }
        return users;
    }
        return ({selectChat: selectChat,
                 checkMsgStatus: checkMsgStatus});
}]);