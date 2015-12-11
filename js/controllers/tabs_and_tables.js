
var app = angular.module('tabsAndTablesModule', ['ui.bootstrap']);

app.controller('TabsController', function($scope, $http, $filter, NewProjectService, NewTaskService)
{
    var vm = this;

    vm.panels = NewProjectService.panels;
    vm.taskPanels = NewTaskService.taskPanels;

//    console.log("vm.taskPanels [GLOBAL] : " + vm.taskPanels);
//    console.log("NewTaskService.taskPanels : " + NewTaskService.taskPanels);

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
//        vm.panels = removeByAttr(vm.panels, 'name', projectName);
        removeByAttr(vm.panels, 'name', projectName);

    };

    vm.deleteTask = function(taskName)
    {
        removeByAttr(NewTaskService.taskPanels, 'name', taskName);

        angular.forEach(vm.panels, function(valueProject,indexProject){

            angular.forEach(valueProject.taskPanels, function(valueTask,indexTask){

                if(valueTask.name == taskName)
                {
                    removeByAttr(valueProject.taskPanels, 'name', taskName);
                }
            });
        });

//        console.log("vm.taskPanels [GLOBAL] : " + vm.taskPanels);
//        console.log("NewTaskService.taskPanels : " + NewTaskService.taskPanels);

    };

    var removeByAttr = function(arr, attr, value){
        var i = arr.length;
        while(i--){
            if( arr[i]
                && arr[i].hasOwnProperty(attr)
                && (arguments.length > 2 && arr[i][attr] === value ) ){

                arr.splice(i,1);

            }
        }
        return arr;
    };

});

