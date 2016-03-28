//** This file contains functions that will communicate with the server to 
//   perform CRUD operations. **

var app = angular.module('mongoCrudServiceModule', ['ngStorage']);

app.service('mongoCrudService',function($http, $q, $localStorage)
{
    /////////////////////////////////////////////////////////////////////
    // ********* RETRIEVE DATA ASSOCIATED WITH LOGGED IN USER ******** //
    /////////////////////////////////////////////////////////////////////
        var retrieveData = function()
        {
            var deferred = $q.defer();
            var data = {
                companyName: $localStorage.companyName
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
        var entry = {companyName: $localStorage.companyName};
        for (var i in data)
        {
            entry[i] = data[i];
        }
        $http.post('/create', entry).success(function(response)
        {

        })
                .error(function(err)
        {

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

        })
                .error(function(err)
        {

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

        })
                .error(function(err)
        {

        });
    };

    //////////////////////////////////////////////////////
    // ***** REMOVE LOCAL OLD COPY OF PROFILE PIC ***** //
    //////////////////////////////////////////////////////
    var removeOldProfilePic = function(oldImage, callback)
    {
        var data = {oldImage: oldImage};
        $http.post('/removeOldProfilePic',data).success(function(res)
        {
            callback(res);
        })
                .error(function(err)
        {
            callback(err);
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


    //////////////////////////////////////////////////////////////
    // ********** STORE PROFILE PICTURE ON SERVER ************* //
    //////////////////////////////////////////////////////////////
    var storeProfilePic = function(userObject, callback)
    {
        var data = {id: userObject.id, imageUrl: userObject.imageUrl};
        $http.post('/storeProfilePic', data).success(function(response)
        {
            callback(response);
        })
                .error(function(err)
        {
            callback(err);
        });
    };


    //////////////////////////////////////
    // ********* UPDATE DATA ********* //
    ////////////////////////////////////
    var updateData = function(id, data)
    {
        var entry = {id: id, data: data};

        $http.post('/update', entry).success(function(response)
        {

        })
                .error(function(err)
        {

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

        })
                .error(function(err)
        {

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

        })
                .error(function(err)
        {

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

        })
                .error(function(err)
        {

        });
    };
    

    //////////////////////////////////////////////////////////
    // ***************** UPDATE PASSWORD ****************** //
    //////////////////////////////////////////////////////////
    var updatePassword = function(id, oldPassword, newPassword)
    {
        var data = {id: id, oldPassword: oldPassword, newPassword: newPassword};
        $http.post('/updatePassword', data).success(function(response)
        {

        })
                .error(function(err)
        {

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
            userData.userParameters.content = 'You have been invited to join PMS by ' + $localStorage.currentUser.users.name + '. Your temporary password is ' + userParameters.password;
        $http.post('/inviteUser', userData).success(function(response)
        {

        })
                .error(function(err)
        {

        });
    };
    
    
    return { retrieveData: retrieveData,
             retrieveDataViaId: retrieveDataViaId,
             createNewEntry: createNewEntry,
             deleteData: deleteData,
             deleteFile: deleteFile,
             removeOldProfilePic: removeOldProfilePic,
             downloadFile: downloadFile,
             storeProfilePic: storeProfilePic,
             updateData: updateData,
             updateUser: updateUser,
             updateChatFlag: updateChatFlag,
             updateUserNotifications: updateUserNotifications,
             updatePassword: updatePassword,
             retrieveChat: retrieveChat,
             inviteUser: inviteUser
            };
});