/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('newTaskModule', []);

app.service('NewTaskService', function(){

    var taskPanels = [];
    var tasksIdArray = [];

    var setValue = function(newTaskObject){

        angular.forEach(newTaskObject, function(value, index){
            taskPanels.push(newTaskObject[index]);
        });

    };

    var checkTaskExistence = function(taskName, tasksArray)
    {
        var taskAlreadyExists = false;

        for(var i in tasksArray)
        {
            if(tasksArray[i].name == taskName)
            {
                taskAlreadyExists = true;
                break;
            }
            else
            {
                taskAlreadyExists = false;
            }
        }

        return taskAlreadyExists;

    };

    var newTaskID = function()
    {
        var taskID = tasksIdArray.length;
        tasksIdArray.push(taskID);

        return taskID;
    };

    var getValue = function(){
        return taskPanels;
    };

    var deleteTask = function(tasksArray)
    {
        angular.forEach(tasksArray, function(valueFromGlobalList,indexGlobalList){
            angular.forEach(taskPanels, function(valueFromSpecificProject,indexSpecificProject){
                if(valueFromGlobalList.id == valueFromSpecificProject.id)
                {
                    taskPanels = removeEntity(taskPanels, 'id', valueFromGlobalList.id);
                }
            });
        });
    };

    var removeEntity = function(arr, attr, value){
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
        newTaskID: newTaskID,
        checkTaskExistence: checkTaskExistence,
        setValue: setValue,
        getValue: getValue,
        deleteTask: deleteTask,
        taskPanels: taskPanels
    };

});
