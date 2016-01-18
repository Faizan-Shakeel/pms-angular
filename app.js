"use strict";

var app = angular.module('pmsAngular', [

    'ngRoute',
    'mainViewModule',
    'slimScrollModule',
    'modalsModule',
    'projectServiceModule',
    'taskServiceModule',
    'documentServiceModule',
    'ui.utils.masks',
    'ngMessages',
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