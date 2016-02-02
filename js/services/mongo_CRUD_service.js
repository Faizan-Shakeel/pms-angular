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
    
    // ********* RETRIEVE DATA ASSOCIATED WITH LOGGED IN USER ******** //
        var retrieveData = function()
        {
            var deferred = $q.defer();
            //console.log(deferred);
            var data = {
                companyName: $rootScope.companyName
            };
            $http.post('/fetch',data).success(deferred.resolve);
            return deferred.promise;
        };
        
    // ******** CREATE NEW ENRTY ********* //
    var createNewEntry = function(data)
    { 
        var entry = {companyName: $rootScope.companyName};
        for (var i in data)
        {
            entry[i] = data[i];
        }
        console.log(entry);
        $http.post('/create', entry).success(function(response)
        {
            console.log(response);
        })
                .error(function(err)
        {
            console.log(err);
        });
    };
    
    // ********** DELETE DATA ********* //
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
    
    // ******** DELETE FILE ********* //
    
    var deleteFile = function(fileName)
    {
        var fileUrl = 'uploads/' + fileName;
        var data = {fileUrl: fileUrl};
        $http.post('/deleteFile', data).success(function(response)
        {
            console.log(response);
        })
                .error(function(err)
        {
            console.log(err);
        });
    };
    
    // ********* UPDATE DATA ******** //
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
    
    // TEMPORARY FUNCTION TO STORE USER CHAT, WILL REMOVE WHEN USER MODULE IS COMPLETED
    var updateUser = function(userEmail, data)
    {
        var entry = {userEmail: userEmail, 'chatData': data};
        $http.post('/updateUser', entry).success(function(response)
        {
            console.log(response);
        })
                .error(function(err)
        {
            console.log(err); 
        });
    };
 
    
    return { retrieveData: retrieveData,
             createNewEntry: createNewEntry,
             deleteData: deleteData,
             deleteFile: deleteFile,
             updateData: updateData,
             updateUser: updateUser};
});