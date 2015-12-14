/**
 * Created by faizankhan on 11/30/13.
 */

var app = angular.module('navigationBarModule', ['ui.bootstrap']);

app.controller('NavigationBarController', ['$scope', 'NewProjectService', function ($scope, NewProjectService) {

    var vm = this;

//    vm.searchInputFieldText = '';

    NewProjectService.searchInputFieldText = vm.searchInputFieldText;

//    vm.updateSearchInputValue = function()
//    {
//        NewProjectService.updateSearchInputFieldText(vm.searchInputFieldText);
//        NewProjectService.searchInputFieldText = vm.searchInputFieldText;
//    };

//    vm.searchDropdownStatus = {
//        isOpen: false
//    };
//
//    vm.dropdownItems = ['Projects', 'Tasks', 'Documents', 'Users'];
//    vm.selectedItem = vm.dropdownItems[0];
//    vm.dropboxitemselected = function (item) {
//
//        vm.selectedItem = item;
//
//    };
}]);


