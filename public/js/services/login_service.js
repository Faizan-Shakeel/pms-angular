var app = angular.module('loginServiceModule',['ngStorage']);

app.service('loginService',['$http', '$location', '$rootScope', '$q', '$localStorage', 'mongoCrudService', function($http, $location, $rootScope, $q, $localStorage, mongoCrudService)
{
   var login = function(user)
   {
       $http.post('/login', user).success(function(response)
       {
           if (response != '0')
           {
                $localStorage.currentUser = response.user;
                $localStorage.companyName = response.user.companyName;
                if ($localStorage.currentUser.users.imageUrl != '')
                {
                  mongoCrudService.storeProfilePic($localStorage.currentUser.users, function(res)
                  {
                      //callback(response.user);
                      $location.url('/mainview');
                  });                  
                }
                else
                {
                    $location.url('/mainview');
                }
           }
           else
           {
               alert('wrong credentials');            
           }
       });
   };
   
   var logout = function(user, callback)
   {
       var data = {user: user};
       $http.post('/logout', data).success(function(response)
       {
           $localStorage.currentUser = null;
           callback(response);
       });
   };
   
   var checkLoggedIn = function()
   {
      var deferred = $q.defer();
      
      $http.get('/loggedin').success(function(user)
      {
              deferred.resolve(user);
              if (deferred.promise.$$state.value || deferred.promise.$$state.value !== '0')
              {               
                  $location.url('/mainview');
              }
              else
              {
                  $location.url('/login');
              }
      })
            .error(function(err)
      {
              console.log(err);
      });
   };

   var passwordRecovery = function(user, callback)
   {
      var newPassword = Math.floor(Math.random() * 100000000);
      var data = {userEmail: user.email, newPassword: newPassword};
      $http.post('/recoverpassword', data).success(function(response)
      {
          callback(response);
      })
   }
   
   return {
       login: login,
       logout: logout,
       checkLoggedIn: checkLoggedIn,
       passwordRecovery: passwordRecovery
   };
}]);