/**
 * Created by faizankhan on 11/30/13.
 */

var app = angular.module('chattingPanelModule', ['ui.bootstrap']);

app.controller('ChattingPanelCtrl', function ($scope) {

    var online = 'fa fa-circle-o';
    var offline = '';


    $scope.users = [

        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': online
        }

    ];







    $scope.scrollBarConfig = {
        autoResize: true // If true, will listen for DOM elements being added or removed inside the scroll container
    };
});