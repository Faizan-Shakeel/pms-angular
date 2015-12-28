/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('newTaskServiceModule', []);

app.service('NewTaskService', function(){

    var taskPanels = [];
    var tasksIdArray = [];

    var setValue = function(newTasksArray){

        angular.forEach(newTasksArray, function(value, index){
            taskPanels.push(newTasksArray[index]);
        });

    };

    var checkIfTaskIsAlreadyInSelectedProject = function(taskName, selectedProjects)
    {
        var taskAlreadyExists = false;


    };

    var checkTaskExistenceGlobal = function(taskName, tasksArrayGlobal)
    {
        var taskAlreadyExists = false;

        for(var task of tasksArrayGlobal)
        {
            if(task.name == taskName)
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

    var checkTaskExistence = function(taskName, tasksArray)
    {
        var taskAlreadyExists = false;

        for(var task of tasksArray)
        {
            if(task.name == taskName)
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

    var deleteTaskModal = function(selectedTaskToDelete, modalTasksArray)
    {
        removeEntity(modalTasksArray, 'id', selectedTaskToDelete.id);
    };

    var deleteTaskGlobal = function(tasksToDelete, deleteFrom)
    {
        for(var task of tasksToDelete)
        {
            removeEntity(deleteFrom, 'id', task.id);
        }
    };

    var deleteFloatingTasks = function(floatingTasks)
    {
        for(var floatTask of floatingTasks)
        {
            for(var task of taskPanels)
            {
                if(!(task.projectName) && (task.id == floatTask.id))
                {
                    removeEntity(taskPanels, 'projectName', task.projectName);
                }
            }
        }
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

    function hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
    }

    var removeProjectTasksFromExistingTasks = function(projectTasks, projectName)
    {
        var filteredArray = [];
        var taskNotFound;

        for(var task of taskPanels)
        {
            taskNotFound = true;

            if(projectTasks.length)
            {
                for(var projectTask of projectTasks)
                {
                    if((projectTask.name == task.name) || (task.projectName == projectName))
                    {
                        taskNotFound = false;
                        break;
                    }
                }
            }

            else if(task.projectName == projectName)
            {
                taskNotFound = false;
            }

            if(taskNotFound)
            {
                filteredArray.push(task);
            }

        }

        console.log("filteredArray : " + JSON.stringify(filteredArray));
        return filteredArray;
    };

    return{
        newTaskID: newTaskID,
        checkTaskExistence: checkTaskExistence,
        checkTaskExistenceGlobal: checkTaskExistenceGlobal,
        setValue: setValue,
        getValue: getValue,
        deleteTask: deleteTask,
        deleteTaskModal: deleteTaskModal,
        deleteTaskGlobal: deleteTaskGlobal,
        deleteFloatingTasks: deleteFloatingTasks,
        hasDuplicates: hasDuplicates,
        removeProjectTasksFromExistingTasks: removeProjectTasksFromExistingTasks,
        taskPanels: taskPanels
    };

});
