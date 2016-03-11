"use strict";
/**
 * Created by faizankhan on 10/27/2014.
 */

var app = angular.module('pmsAngular', [

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
    'btorfs.multiselect',
    'ngAnimate',
    'ng-sortable',
    'xeditable'
]);

//app.run(function(editableOptions) {
//    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
//});

app.run(function(editableOptions, editableThemes) {
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';
});