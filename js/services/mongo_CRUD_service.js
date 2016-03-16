//** This file contains functions that will communicate with the server to 
//   perform CRUD operations. **

var app = angular.module('mongoCrudServiceModule', ['ngStorage']);

app.service('mongoCrudService',function($http,$q,$rootScope,$localStorage)
{
    if ($rootScope.companyName)
    {
        $localStorage.companyName = $rootScope.companyName;
    }
    else if (!$rootScope.companyName)
    {
        $rootScope.companyName = $localStorage.companyName;
    }
    
    /////////////////////////////////////////////////////////////////////
    // ********* RETRIEVE DATA ASSOCIATED WITH LOGGED IN USER ******** //
    /////////////////////////////////////////////////////////////////////
        var retrieveData = function()
        {
            var deferred = $q.defer();
            var data = {
                companyName: $rootScope.companyName
            };
            $http.post('/fetch',data).success(deferred.resolve);
            return deferred.promise;
        };

    ////////////////////////////////////////////////////
    // *********** RETRIEVE DATA VIA ID ************* //
    ////////////////////////////////////////////////////
    var retrieveDataViaId = function(id)
    {
        var query = {id: id}
        var deferred = $q.defer();
        $http.post('/retrieveDataViaId', query).success(deferred.resolve);
        return deferred.promise;
    }    
        
    /////////////////////////////////////////   
    // ******** CREATE NEW ENRTY ********* //
    /////////////////////////////////////////
    var createNewEntry = function(data)
    { 
        var entry = {companyName: $rootScope.companyName};
        for (var i in data)
        {
            entry[i] = data[i];
        }
        $http.post('/create', entry).success(function(response)
        {
            console.log(response);
        })
                .error(function(err)
        {
            console.log(err);
        });
    };
    

    //////////////////////////////////////
    // ********** DELETE DATA ********* //
    /////////////////////////////////////
    var deleteData = function(id)
    {
        var data = {id: id};
        $http.post('/delete', data).success(function(response)
        {
            console.log(response);
        })
                .error(function(err)
        {
            console.log(err); 
        });
    };
    

    ////////////////////////////////////
    // ******** DELETE FILE ********* //
    ////////////////////////////////////
    var deleteFile = function(fileName)
    {
        var data = {fileName: fileName};
        $http.post('/deleteFile', data).success(function(response)
        {
            console.log(response);
        })
                .error(function(err)
        {
            console.log(err);
        });
    };


    ///////////////////////////////////////////
    // ************ DOWNLOAD FILE ********** //
    ///////////////////////////////////////////
    var downloadFile = function(fileMeta, callback)
    {
        var data = {fileName: fileMeta.url};
        $http.post('/downloadFile', data, {responseType: 'arraybuffer'}).success(function(streamData)
            {
                var file = new Blob([streamData], {type: fileMeta.fileType});
                var fileUrl = URL.createObjectURL(file);
                callback(fileUrl);
            });
    };
    
    /////////////////////////////////////
    // ********* UPDATE DATA ******** //
    ////////////////////////////////////
    var updateData = function(id, data)
    {
        var entry = {id: id, data: data};
        $http.post('/update', entry).success(function(response)
        {
            console.log(response);
        })
                .error(function(err)
        {
            console.log(err); 
        });
    };
    

    ////////////////////////////////////////////////////
    // *********** CHAT STORAGE FUNCTION *********** //
    ///////////////////////////////////////////////////
    var updateUser = function(userEmail, data)
    {
        var entry = {'userEmail': userEmail, 'chatData': data};
        $http.post('/updateUser', entry).success(function(response)
        {
            console.log(response);
        })
                .error(function(err)
        {
            console.log(err); 
        });
    };
 

    ////////////////////////////////////////////////////////
    // *********** UPDATE CHAT MESSAGE FLAG  *********** //
    ///////////////////////////////////////////////////////
    //** The purpose of this function is to check whether 
    //   there was any message while the user was offline.
    var updateChatFlag = function(userObject)
    {
        var data = {userObject: userObject};
        $http.post('/updateChatFlag', data).success(function(response)
        {
            console.log(response);
        })
                .error(function(err)
        {
            console.log(err);
        });
    };
 

    /////////////////////////////////////////////////////////
    // *********** UPDATE USER NOTIFICATIONS ************* //
    /////////////////////////////////////////////////////////
    var updateUserNotifications = function(id, notificationData)
    {
        var data = {id: id, notificationData: notificationData};
        $http.post('/updateUserNotifications', data).success(function(response)
        {
            console.log(response);
        })
                .error(function(err)
        {
            console.log(err);
        });
    };
    

    //////////////////////////////////////////////////////////
    // ************** UPDATE USER PASSWORD **************** //
    //////////////////////////////////////////////////////////
    var updatePassword = function(id, oldPassword, newPassword)
    {
        var data = {id: id, oldPassword: oldPassword, newPassword: newPassword};
        $http.post('/updatePassword', data).success(function(response)
        {
            console.log(response);
        })
                .error(function(err)
        {
            console.log(err);
        });
    };   


    //////////////////////////////////////////////////
    // ******  FUNCTION TO RETRIEVE CHAT DATA ***** //
    //////////////////////////////////////////////////
    var retrieveChat = function(userEmail) 
    {
        var deferred = $q.defer();
        var data = {userEmail: userEmail};
        $http.post('/retrieveChat', data).success(deferred.resolve);
        return deferred.promise;
    };

    //////////////////////////////////////////////////
    // ****** INVITE USER VIA EMAIL *************** //
    //////////////////////////////////////////////////
    var inviteUser = function(userParameters)
    {
        var userData = {userParameters: userParameters};
            //userData.userParameters.senderEmail = 'sender email address';
            //userData.userParameters.senderPassword = 'sender email password';
            userData.userParameters.service = 'gmail';
            userData.userParameters.subject = 'Invitation to Join PMS';
            userData.userParameters.content = 'You have been invited to join PMS by ' + $rootScope.currentUser.users.name + '. Your temporary password is ' + userParameters.password;
        console.log(userData);
        $http.post('/inviteUser', userData).success(function(response)
        {
            console.log(response);
        })
                .error(function(err)
        {
            console.log(err);
        });
    };
    
    
    return { retrieveData: retrieveData,
             retrieveDataViaId: retrieveDataViaId,
             createNewEntry: createNewEntry,
             deleteData: deleteData,
             deleteFile: deleteFile,
             downloadFile: downloadFile,
             updateData: updateData,
             updateUser: updateUser,
             updateChatFlag: updateChatFlag,
             updateUserNotifications: updateUserNotifications,
             updatePassword: updatePassword,
             retrieveChat: retrieveChat,
             inviteUser: inviteUser
            };
});