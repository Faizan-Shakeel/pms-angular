"use strict";
/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('taskServiceModule', ['ngStorage']);

app.service('TaskService', ['mongoCrudService', function(mongoCrudService, $localStorage){

    var taskPanels = [];
    var tasksIdArray = [];

    var createTaskPanel = function(newTasksArray)
    {
        "use strict";

        angular.forEach(newTasksArray, function(value, index){
            newTasksArray[index] = {tasks: newTasksArray[index]};
            taskPanels.push(newTasksArray[index].tasks);
            console.log(newTasksArray[index]);
            mongoCrudService.createNewEntry(newTasksArray[index]);
//            console.log(taskPanels);
//            if (newTasksArray[index].tasks.projectId)
//            {
//                mongoCrudService.updateData(newTasksArray[index].tasks.projectId, {'project.tasks': taskPanels});
//            }
        });
    };

    var checkTaskExistence = function(taskName, tasksArray)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

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

        var taskID = tasksIdArray.length + 't';       
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
        removeEntity(modalTasksArray, 'id', 'project', selectedTaskToDelete.id, selectedTaskToDelete.project);
    };

    var deleteTaskGlobal = function(tasksToDelete, deleteFrom)
    {
        "use strict";

        for(var task of tasksToDelete)
        {
            removeEntity(deleteFrom, 'id', 'project', task.id, task.project);
        }
    };

    var deleteDocumentsFromTask = function(documentsToDelete, modalTasks)
    {
        var deleteFromTaskID;

        for(var doc of documentsToDelete)
        {
            if(doc.task)
            {
                for(var mTask of modalTasks)
                {
                    if(mTask.name == doc.task)
                    {
                        deleteFromTaskID = mTask.id;
                        break;
                    }
                }
            }

            if(deleteFromTaskID != null)
            {
                for(var task of taskPanels)
                {
                    if(task.id == deleteFromTaskID)
                    {
                        removeEntity(task.documents, 'id', 'project', doc.id, doc.project);
                    }
                }
            }
        }
    };

    var deleteFloatingTasks = function(floatingTasks, deleteByProperty)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        for(var floatTask of floatingTasks)
        {
            for(var task of taskPanels)
            {
                if(!(task.project) && (task.id == floatTask.id))
                {
                    removeEntity(taskPanels, 'id', 'project', task.id, task.project);
                }
            }
        }
    };

    var deleteTask = function(tasksArray)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));
        angular.forEach(tasksArray, function(valueFromSpecificProject,indexGlobalList){
            angular.forEach(taskPanels, function(valueFromGlobalList,indexSpecificProject){
                if(valueFromGlobalList.id == valueFromSpecificProject.id)
                {
                    taskPanels = removeEntity(taskPanels, 'id', 'project', valueFromGlobalList.id, valueFromGlobalList.project);
                }
            });
        });
    };

    var hasDuplicates = function(array)
    {
        "use strict";

        return (new Set(array)).size !== array.length;
    };

    var removeProjectTasksFromExistingTasks = function(projectTasks, projectName)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        var filteredArray = [];
        var taskNotFound;

        for(var task of taskPanels)
        {
            taskNotFound = true;

            if(projectTasks.length)
            {
                for(var projectTask of projectTasks)
                {
                    if((projectTask.name == task.name) || (task.project == projectName))
                    {
                        taskNotFound = false;
                        break;
                    }
                }
            }

            else if(task.project == projectName)
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
        //                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

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

    var removeEntity = function(arr, attr, attr2, value, value2)
    {
        "use strict";

        var i = arr.length;
        while(i--){
            if( arr[i]
                && arr[i].hasOwnProperty(attr)
                && (arguments.length > 2 && arr[i][attr] === value && arr[i][attr2] === value2) ){

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
        deleteDocumentsFromTask: deleteDocumentsFromTask,
        deleteFloatingTasks: deleteFloatingTasks,
        hasDuplicates: hasDuplicates,
        removeProjectTasksFromExistingTasks: removeProjectTasksFromExistingTasks,
        updateTasks: updateTasks
    };

}]);
