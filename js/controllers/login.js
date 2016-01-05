var app = angular.module('loginModule',[]);

app.controller('loginCtrl', ['loginService','$location','$rootScope', function(loginService, $location, $rootScope)
{
    var vm = this;    
    vm.login = function(user)
    {
        loginService.login(user,function(user)
        {
           if ($rootScope.currentUser)
           {
                $location.url('/mainview');
           }
        });               
    };
}]);