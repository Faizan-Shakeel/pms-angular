var app = angular.module('loginModule',[]);

app.controller('loginCtrl', ['loginService', 'mongoCrudService','$location','$rootScope', '$localStorage', function(loginService, mongoCrudService, $location, $rootScope, $localStorage)
{
    var vm = this;
    var keepLoggedInFlag = '';  
    
    // if ($localStorage.currentUser)
    // {
    //    if ($localStorage.currentUser.users.keepLoggedInFlag == 'true')
    //     {
    //         $location.url('/mainview');            
    //     }
    //     else
    //     {
    //         console.log('here because keepLoggedInFlag is false');
    //         $location.url('/login');
    //     }
    // }

    vm.login = function(user)
    { console.log(user);
        // if (!user.keepLoggedIn)
        // {
        //     keepLoggedInFlag = 'false';    
        // }
        // else
        // {
        //     keepLoggedInFlag = user.keepLoggedIn;
        // }

        loginService.login(user);
        // loginService.login(user,function(user)
        // {  
        //     //mongoCrudService.updateData(user.users.id, {'users.keepLoggedInFlag': keepLoggedInFlag});            
        //     // if ($localStorage.currentUser)
        //     // {
        //         console.log('returning from login service');
        //         $location.url('/mainview');
        //     //}
        //     // else
        //     // {
        //     //    $location.url('/login');
        //     //}
        // });               
    };

    vm.logout = function()
    {
        mongoCrudService.updateData($localStorage.currentUser.users.id, {'users.keepLoggedInFlag': 'false'});
        loginService.logout($localStorage.currentUser.users, function(response)
        {
            $location.url('/login');
        });
    };

    vm.passwordRecovery = function(userEmail)
    {
        loginService.passwordRecovery(userEmail, function(response)
        {
            $location.url('/login');
        });
    };
}]);