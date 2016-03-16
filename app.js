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
    'ui.mask',
//    'ngLodash',
    'ngMessages',
    'btorfs.multiselect',
    'mongoCrudServiceModule',
    'loginServiceModule',
    'loginModule',
    'registrationServiceModule',
    'registrationModule',
    'irontec.simpleChat',
    'btford.socket-io',
    'chatSocketServiceModule',
    'chatServiceModule',
	'ngAnimate',
    'ng-sortable',
    'ngPasswordStrength',
    'userProfileModule',
    'angularMoment',
    'angular-simple-chat'
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
                .when('/passwordrecovery', {
                    templateUrl: 'views/password_recovery.html',
                    controller: 'loginCtrl',
                    controllerAs: 'asLoginCtrl'
        })
                .when('/mainview', {
                    templateUrl: 'views/mainview.html',
                    controller: 'Main_View_Controller',
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