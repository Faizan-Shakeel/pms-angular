var app = angular.module('loginModule',[]);

app.controller('loginCtrl', ['loginService', 'mongoCrudService','$location','$rootScope', '$localStorage', function(loginService, mongoCrudService, $location, $rootScope, $localStorage)
{
    var vm = this;
    var keepLoggedInFlag;  
    
    // if ($localStorage.currentUser)
    // {
    //     if ($localStorage.currentUser.users.keepLoggedInFlag == 'true')
    //     {
    //         $location.url('/mainview');            
    //     }
    // }

    vm.login = function(user)
    {   
        if (!user.keepLoggedIn)
        {
            keepLoggedInFlag = 'false';    
        }
        else
        {
            keepLoggedInFlag = user.keepLoggedIn;
        }

        loginService.login(user,function(user)
        {  
           mongoCrudService.updateData(user.users.id, {'users.keepLoggedInFlag': keepLoggedInFlag});            
           if ($localStorage.currentUser)
           {
                $location.url('/mainview');
           }
        });               
    };

    vm.logout = function()
    {
        loginService.logout($localStorage.currentUser.users, function(response)
        {
            console.log(response);  
            $location.url('/login');
        });
    };

    vm.passwordRecovery = function(userEmail)
    {
        loginService.passwordRecovery(userEmail, function(response)
        {
            console.log(response);
            $location.url('/login');
        });
    };
}]);