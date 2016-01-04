var app = angular.module('loginServiceModule',[]);

app.service('loginService',['$http', '$location', '$rootScope', '$q', function($http, $location, $rootScope, $q)
{
   var login = function(user, callback)
   {
       $http.post('/login', user).success(function(response)
       {
           if (response != '0')
           {
                console.log(response.user.companyName);
                $rootScope.currentUser = response.user;
                $rootScope.companyName = response.user.companyName;
                callback(response.user);
           }
           else
           {
               alert('wrong credentials');
           }
       });
   };
   
   var logout = function(callback)
   {
       $http.post('/logout').success(function()
       {
           $rootScope.currentUser = null;
           callback();
       });
   };
   
   var checkLoggedIn = function()
   {
      var deferred = $q.defer();
      
      $http.get('/loggedin').success(function(user)
      {
          
          $rootScope.errorMessage = null;
              deferred.resolve(user);
              console.log(deferred.promise.$$state);
              if (deferred.promise.$$state.value !== '0')
              {
                  $location.url('/mainview');
              }
              else
              {
                  $location.url('/login');
              }
      });
   };
   
   return {
       login: login,
       logout: logout,
       checkLoggedIn: checkLoggedIn
   };
}]);