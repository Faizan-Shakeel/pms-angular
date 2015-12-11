
var app = angular.module('tabsAndTablesModule', ['ui.bootstrap']);

app.controller('TabsController', function($scope, $http, $filter, NewProjectService, NewTaskService)
{
    var vm = this;

    vm.panels = NewProjectService.panels;
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

});

