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
    return { retrieveData: retrieveData};
});