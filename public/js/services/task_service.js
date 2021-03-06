"use strict";
/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('taskServiceModule', ['ngStorage']);

app.service('TaskService', ['NotificationsAndHistoryService', 'mongoCrudService','$localStorage', function(NotificationsAndHistoryService, mongoCrudService, $localStorage)
{

    var accordionInfo;
    var taskPanels = [];
    var tasksIdArray = [];
    var action;
    var actionBy;
    var elementType;
    var historyObject;

    var createTaskPanel = function(newTasksArray)
    {
        "use strict";
        var taskValues = {};
        angular.forEach(newTasksArray, function(value, index){
            //newTasksArray[index] = {tasks: newTasksArray[index]};
            taskPanels.push(newTasksArray[index]);

            taskValues = {companyName: $localStorage.companyName , tasks: newTasksArray[index]};
            mongoCrudService.updateData(newTasksArray[index].id, taskValues);

            action = 'created';
            actionBy = 'User';
            elementType = 'Task';

            NotificationsAndHistoryService.addNotifications(newTasksArray[index], action, actionBy, elementType);

            accordionInfo = NotificationsAndHistoryService.getAccordionStatus();
            NotificationsAndHistoryService.setNotificationsCount(accordionInfo.isSecondOpen, accordionInfo.accVisibility);

            historyObject = {elementType: elementType, element: newTasksArray[index]};
            NotificationsAndHistoryService.makeHistory(historyObject);

        });
    };

    var updatedTaskParams = function(updated_task)
    {
        for(var taskToUpdate of taskPanels)
        {
            if(taskToUpdate.id == updated_task.id)
            {
                taskToUpdate.targetEndDate = updated_task.targetEndDate;
                taskToUpdate.description = updated_task.description;
                taskToUpdate.status = updated_task.status;
                taskToUpdate.modifiedDate = updated_task.modifiedDate;
                taskToUpdate.lastModifiedBy = updated_task.lastModifiedBy;
                taskToUpdate.numberOfDocuments = updated_task.numberOfDocuments;
                taskToUpdate.numberOfUsers = updated_task.numberOfUsers
                mongoCrudService.updateData(taskToUpdate.id , {'tasks': taskToUpdate});
                console.log(taskToUpdate.status);
                break;
            }
        }
    };

    var checkTaskExistenceById = function(taskId)
    {
        "use strict";
//                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        var taskAlreadyExists = false;

        for(var taskPanel of taskPanels)
        {
            if(taskPanel.id == taskId)
            {
                taskAlreadyExists = true;
                break;
            }
        }

        return taskAlreadyExists;

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
        if ($localStorage.tasksIdArray)
        {
            tasksIdArray = $localStorage.tasksIdArray.slice();
        }
        var taskID = tasksIdArray.length + 't';       
        tasksIdArray.push(taskID);
        $localStorage.tasksIdArray = tasksIdArray.slice();
        return taskID;
    };

    var getTaskPanels = function()
    {
        "use strict";

        return taskPanels;
    };

    var getTaskById = function(taskId)
    {
        for(var taskGlobal of taskPanels)
        {
            if(taskGlobal.id == taskId)
            {
                return taskGlobal;
            }
        }
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
                    mongoCrudService.deleteData(valueFromGlobalList.id);
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
                        mongoCrudService.updateData(taskPanels[i].id , {'tasks.documents': taskPanels[i].documents[k]});
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
                task.documents.push(documentObject);
                mongoCrudService.updateData(task.id , {'tasks.documents':task.documents});
            }
        }
    };

    var addUserToTask = function(taskId, userObject)
    {
        "use strict";
//                        console.log("Global Docs AFTER : " + JSON.stringify(UserService.getUserPanels()));

        for(var taskGlobal of taskPanels)
        {
            var userAlreadyExistsInTask = false;

            if (taskGlobal.name == taskId)
            {
                for(var userTask of taskGlobal.users)
                {
                    if(userTask.email == userObject.email)
                    {
                        userAlreadyExistsInTask = true;
                    }
                }

                if(!userAlreadyExistsInTask)
                {   console.log(taskId);
                    taskGlobal.users.push(userObject);
                }

            }
        }
    };

    var deleteUserFromTasks = function(userToDelete)
    {
        for(var taskGlobal of taskPanels)
        {
            for(var userTask of taskGlobal.users)
            {
                if(userTask.email == userToDelete.email)
                {
                    removeEntity(taskGlobal.users, 'id', 'email', userToDelete.id, userToDelete.email);
                    mongoCrudService.updateData(taskGlobal.id, {'tasks.users': taskGlobal.users});
                }
            }
        }
    };

    var deleteUsersFromTasks = function(usersToDelete, taskId)
    {
        var deleteFromTask;

        for(var user of usersToDelete)
        {
            for(var taskGlobal of taskPanels)
            {
                if(taskGlobal.id == taskId)
                {
                    deleteFromTask = taskGlobal;
                    break;
                }
            }

            for(var userTask of deleteFromTask.users)
            {
                if(userTask.email == user.email)
                {
                    removeEntity(deleteFromTask.users, 'id', 'email', user.id, user.email);
                }
            }
        }
    };

    return{
        newTaskID: newTaskID,
        checkTaskExistenceById: checkTaskExistenceById,
        checkTaskExistence: checkTaskExistence,
        createTaskPanel: createTaskPanel,
        updatedTaskParams: updatedTaskParams,
        getTaskPanels: getTaskPanels,
        getTaskById: getTaskById,
        addDocumentToTask: addDocumentToTask,
        addUserToTask: addUserToTask,
        deleteUserFromTasks: deleteUserFromTasks,
        deleteUsersFromTasks: deleteUsersFromTasks,
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

}]);
