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
//        $http.post('/create', entry).success(function(response)
//        {
//            console.log(response);
//        })
//                .error(function(err)
//        {
//            console.log(err);
//        });
    };
    
    
    
    return { retrieveData: retrieveData,
             createNewEntry: createNewEntry};
});