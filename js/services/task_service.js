"use strict";
/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('taskServiceModule', []);

app.service('TaskService', function(){

    var taskPanels = [];
    var tasksIdArray = [];

    var createTaskPanel = function(newTasksArray)
    {
        "use strict";

        angular.forEach(newTasksArray, function(value, index){
            taskPanels.push(newTasksArray[index]);
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

        var taskID = tasksIdArray.length;
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

    var delDocFromTask = function(docToDelete)
    {
        "use strict";
//                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        for(var task of taskPanels)
        {
            for(var doc of task.documents)
            {
                if(doc.id == docToDelete.id)
                {
                    removeEntity(task.documents, 'id', 'project', docToDelete.id, docToDelete.project);
                    return task;
//                    break;
                }
            }
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

    var deleteFloatingTasks = function(floatingTasks)
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

    var updateDocumentsInTask = function(updatedDocuments)
    {
        "use strict";
//                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        for(var i=0; i<taskPanels.length; i++)
        {
            for (var k = 0; k < taskPanels[i].documents.length; k++)
            {
                for (var j = 0; j < updatedDocuments.length; j++)
                {
                    if(taskPanels[i].documents[k].id == updatedDocuments[j].id)
                    {
                        taskPanels[i].documents[k] = updatedDocuments[j];
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
                && arr[i].hasOwnProperty(attr2)
                && (arguments.length > 2 && arr[i][attr] === value && arr[i][attr2] === value2) ){

                arr.splice(i,1);
            }
        }
        return arr;
    };

    var addDocumentToTask = function(taskID, documentObject)
    {
        "use strict";
//                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        for(var task of taskPanels)
        {
            if (task.id == taskID)
            {
                console.log("task : " + JSON.stringify(task));

                task.documents.push(documentObject);

                console.log("task : " + JSON.stringify(task));
            }
        }
    };

    return{
        newTaskID: newTaskID,
        checkTaskExistence: checkTaskExistence,
        createTaskPanel: createTaskPanel,
        getTaskPanels: getTaskPanels,
        addDocumentToTask: addDocumentToTask,
        deleteTask: deleteTask,
        deleteTaskModal: deleteTaskModal,
        deleteTaskGlobal: deleteTaskGlobal,
        deleteDocumentsFromTask: deleteDocumentsFromTask,
        delDocFromTask: delDocFromTask,
        deleteFloatingTasks: deleteFloatingTasks,
        hasDuplicates: hasDuplicates,
        removeProjectTasksFromExistingTasks: removeProjectTasksFromExistingTasks,
        updateTasks: updateTasks,
        updateDocumentsInTask: updateDocumentsInTask
    };

});
