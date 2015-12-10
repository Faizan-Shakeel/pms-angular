/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('newTaskModule', []);

app.service('NewTaskService', function(){

    var taskPanels = [];

    var setValue = function(newTaskObject){

        angular.forEach(newTaskObject, function(value, index){
            taskPanels.push(newTaskObject[index]);
        });

    };

    var getValue = function(){
        return taskPanels;
    };

    var deleteTask = function(tasksArray)
    {
        angular.forEach(tasksArray, function(valueFromGlobalList,indexGlobalList){

            angular.forEach(taskPanels, function(valueFromSpecificProject,indexSpecificProject){
                if(valueFromGlobalList.name == valueFromSpecificProject.name)
                {
                    taskPanels = removeByAttr(taskPanels, 'name', valueFromGlobalList.name);
                }
            });
        });
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

    return{
        setValue: setValue,
        getValue: getValue,
        deleteTask: deleteTask,
        taskPanels: taskPanels
    };

});
