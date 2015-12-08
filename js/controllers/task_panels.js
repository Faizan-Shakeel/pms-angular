
var app = angular.module('taskPanelsModule', ['ui.bootstrap']);

app.controller('TaskPanelsController', function($scope, NewTaskService)
{
    var vm = this;

    vm.taskPanels = NewTaskService.taskPanels;

    vm.deleteTask = function(taskName)
    {
        var deleteThisTask = {
            'name': taskName,
            'status': 'Status New'
        };

        vm.taskPanels = removeByAttr(vm.taskPanels, 'name', taskName);

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
