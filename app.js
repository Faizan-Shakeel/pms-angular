"use strict";

var app = angular.module('pmsAngular', [

    'ngRoute',
    'mainViewModule',
    'slimScrollModule',
    'modalsModule',
    'projectServiceModule',
    'taskServiceModule',
    'documentServiceModule',
    'userServiceModule',
    'notificationsAndHistoryModule',
    'ui.utils.masks',
    'ngMessages',
<<<<<<< HEAD
    'btorfs.multiselect',
    'mongoCrudServiceModule',
    'loginServiceModule',
    'loginModule',
    'registrationServiceModule',
    'registrationModule',
//    'luegg.directives',
    'irontec.simpleChat',
    'btford.socket-io',
    'chatSocketServiceModule',
    'chatServiceModule'
=======
    'btorfs.multiselect'
//    'luegg.directives',
//    'irontec.simpleChat'

>>>>>>> 49dbea2dec5b2f6b6ee8a4f2c13584307b6b9d52
]);

 app.config(['$routeProvider','$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider
                .when('/', {
                    templateUrl: 'views/login.html',
                    controller: 'loginCtrl',
                    controllerAs: 'asLoginCtrl'
        })
                .when('/login' , {
                    templateUrl: 'views/login.html',
                    controller: 'loginCtrl',
                    controllerAs: 'asLoginCtrl'
        })
                .when('/register',{
                    templateUrl: 'views/register.html',
                    controller: 'registrationCtrl',
                    controllerAs: 'asRegistrationCtrl'
        })
                .when('/mainview', {
                    templateUrl: 'views/mainview.html',
                    //controller: 'Main_View_Controller',
                    controllerAs: 'MainViewVM',
                    resolve: {
                        LoggedIn: function(loginService)
                        {
                            return loginService.checkLoggedIn();
                        }
                    }
        })
                .otherwise({redirectTo: '/'});
}]);