var app = angular.module('loginServiceModule',['ngStorage']);

app.service('loginService',['$http', '$location', '$rootScope', '$q', '$localStorage', function($http, $location, $rootScope, $q, $localStorage)
{
   var login = function(user, callback)
   {
       $http.post('/login', user).success(function(response)
       {
           if (response != '0')
           {
                $rootScope.currentUser = response.user;
                $localStorage.currentUser = response.user;
                $rootScope.companyName = response.user.companyName;
                callback(response.user);
           }
           else
           {
               console.log(response);
               alert('wrong credentials');
               
           }
       });
   };
   
   var logout = function(callback)
   {
       $http.post('/logout').success(function()
       {
           $rootScope.currentUser = null;
           $localStorage.currentUser = null;
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
              if (deferred.promise.$$state.value !== '0')
              {
                  $rootScope.currentUser = $localStorage.currentUser;                  
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