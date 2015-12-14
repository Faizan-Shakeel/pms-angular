
var app = angular.module('globalTabsAndPanelsModule', ['ui.bootstrap']);

app.controller('TabsController', ['$scope', 'NewProjectService', 'NewTaskService', 'filterFilter', function ($scope, NewProjectService, NewTaskService, filterFilter)
{
    var vm = this;

//    vm.searchInputFieldText = NewProjectService.searchInputFieldText;

//    GlobalViewService.testArray = vm.testArray;

//    vm.active = {
//        'Projects': true,
//        'Tasks': false,
//        'Documents': false,
//        'Users': false
//    };

//    vm.activateTab = function(tab) {
//        console.log(tab);
//        vm.active = {}; //reset
//        vm.active[tab] = true;
//    };

    vm.searchDropdownStatus = {
        isOpen: false
    };

    vm.dropdownItems = ['Projects', 'Tasks', 'Documents', 'Users'];
    vm.selectedItem = vm.dropdownItems[0];
    vm.dropboxitemselected = function (item) {

        vm.selectedItem = item;

//        vm.active = {}; //reset
//        vm.active[item] = true;

//        if(vm.selectedItem == 'Tasks')
//        {
//            console.log(vm.tabs[1].active);
//            vm.tabs[1].active = true;
//            console.log(vm.tabs[1].active);
//        }

    };

    vm.panels = NewProjectService.panels;

//    vm.panels = filterFilter(NewProjectService.panels, NewProjectService.searchInputFieldText);

    vm.taskPanels = NewTaskService.taskPanels;

    vm.deleteProject = function(projectName)
    {
        var selectedProjectTasksArray;

        angular.forEach(vm.panels, function(value,index){

            if(value.name == projectName)
            {
                selectedProjectTasksArray = vm.panels[index].taskPanels;
            }

        });

        NewTaskService.deleteTask(selectedProjectTasksArray);
        removeEntity(vm.panels, 'name', projectName);

    };

    vm.deleteTask = function(taskID)
    {
        removeEntity(NewTaskService.taskPanels, 'id', taskID);

        angular.forEach(vm.panels, function(valueProject,indexProject){

            angular.forEach(valueProject.taskPanels, function(valueTask,indexTask){

                if(valueTask.id == taskID)
                {
                    removeEntity(valueProject.taskPanels, 'id', taskID);
                }
            });
        });

    };

    var removeEntity = function(arr, attr, value){
        var i = arr.length;
        while(i--){
            if( arr[i]
                && (arr[i][attr] === value) ){

                arr.splice(i,1);

            }
        }
        return arr;
    };

//    var removeByAttr = function(arr, attr, value, tasksProject){
//        var i = arr.length;
//        while(i--){
//            if( arr[i]
//                && arr[i].hasOwnProperty(attr)
//                && (arguments.length > 2 && arr[i][attr] === value ) ){
//
//                arr.splice(i,1);
//
//            }
//        }
//        return arr;
//    };

}]);

