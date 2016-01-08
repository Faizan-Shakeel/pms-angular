"use strict";
/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('newTaskServiceModule', []);

app.service('NewTaskService',['mongoCrudService' , function(mongoCrudService){

    var taskPanels = [];
    var tasksIdArray = [];
    
    var createTaskPanel = function(newTasksArray)
    {
        "use strict";

        angular.forEach(newTasksArray, function(value, index){
            taskPanels.push(newTasksArray[index]);
            newTasksArray[index] = {tasks: newTasksArray[index]};
            console.log(newTasksArray[index]);
            mongoCrudService.createNewEntry(newTasksArray[index]);
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
        "use strict";

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
        "use strict";

        var taskID = taskPanels.length + 't';
        tasksIdArray.push(taskID);

        return taskID;
    };

    var getTaskPanels = function()
    {
        "use strict";

        return taskPanels;
    };

    var deleteTaskModal = function(selectedTaskToDelete, modalTasksArray)
    {
        "use strict";
        

        removeEntity(modalTasksArray, 'id', selectedTaskToDelete.id);
        
    };

    var deleteTaskGlobal = function(tasksToDelete, deleteFrom)
    {
        "use strict";

        for(var task of tasksToDelete)
        {
            removeEntity(deleteFrom, 'id', task.id);
            //mongoCrudService.delete(task.id);
        }
    };

    var deleteFloatingTasks = function(floatingTasks)
    {
        "use strict";
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
        "use strict";

        angular.forEach(tasksArray, function(valueFromSpecificProject,indexGlobalList){
            angular.forEach(taskPanels, function(valueFromGlobalList,indexSpecificProject){
                if(valueFromGlobalList.id == valueFromSpecificProject.id)
                {
                    taskPanels = removeEntity(taskPanels, 'id', valueFromGlobalList.id);
                }
            });
        });
    };

    function hasDuplicates(array)
    {
        "use strict";

        return (new Set(array)).size !== array.length;
    }

    var removeProjectTasksFromExistingTasks = function(projectTasks, projectName)
    {
        "use strict";
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

        return filteredArray;

    };

    var updateTasks = function(updatedTasks, global)
    {
        "use strict";

        for(var i=0; i<updatedTasks.length; i++)
        {
            for(var j=0; j<taskPanels.length; j++)
            {
                if(taskPanels[j].id == updatedTasks[i].id)
                {
                    taskPanels[j] = updatedTasks[i];
                    if(global)
                    {
                        return taskPanels[j];
                    }
                }
            }
        }
    };

    var removeEntity = function(arr, attr, value)
    {
        "use strict";
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
        createTaskPanel: createTaskPanel,
        getTaskPanels: getTaskPanels,
        deleteTask: deleteTask,
        deleteTaskModal: deleteTaskModal,
        deleteTaskGlobal: deleteTaskGlobal,
        deleteFloatingTasks: deleteFloatingTasks,
        hasDuplicates: hasDuplicates,
        removeProjectTasksFromExistingTasks: removeProjectTasksFromExistingTasks,
        updateTasks: updateTasks
    };

}]);
