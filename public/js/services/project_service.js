"use strict";

var app = angular.module('projectServiceModule', ['ngStorage']);

app.service('ProjectService', ['NotificationsAndHistoryService', 'mongoCrudService', '$localStorage', function(NotificationsAndHistoryService, mongoCrudService, $localStorage)
{

    var projectPanels = [];
    var projectsIdArray = [];
    var action;
    var actionBy;
    var elementType;
    var accordionInfo;
    var historyObject;

    var createProjectPanel = function(project_params)
    {
        "use strict";

        var projectValues = {project: project_params};
        projectPanels.push(project_params);
        mongoCrudService.createNewEntry(projectValues);

        action = 'created';
        actionBy = 'User';
        elementType = 'Project';

        NotificationsAndHistoryService.addNotifications(project_params, action, actionBy, elementType);

        accordionInfo = NotificationsAndHistoryService.getAccordionStatus();
        NotificationsAndHistoryService.setNotificationsCount(accordionInfo.isSecondOpen, accordionInfo.accVisibility);

        historyObject = {elementType: elementType, element: project_params};
        NotificationsAndHistoryService.makeHistory(historyObject);

    };

    var updatedProjectParams = function(updated_project)
    {
        for(var projectToUpdate of projectPanels)
        {
            if(projectToUpdate.id == updated_project.id)
            {
                projectToUpdate.budget = updated_project.budget;
                projectToUpdate.targetEndDate = updated_project.targetEndDate;
                projectToUpdate.description = updated_project.description;
                projectToUpdate.status = updated_project.status;
                projectToUpdate.pendingStatusClass = updated_project.pendingStatusClass;
                projectToUpdate.approvedStatusClass = updated_project.approvedStatusClass;
                projectToUpdate.inProgressStatusClass = updated_project.inProgressStatusClass;
                projectToUpdate.completedStatusClass = updated_project.completedStatusClass;
                projectToUpdate.closedStatusClass = updated_project.closedStatusClass;
                projectToUpdate.modifiedDate = updated_project.modifiedDate;
                projectToUpdate.lastModifiedBy = updated_project.lastModifiedBy;
                projectToUpdate.numberOfTasks = updated_project.numberOfTasks;
                projectToUpdate.numberOfDocuments = updated_project.numberOfDocuments;
                projectToUpdate.numberOfUsers = updated_project.numberOfUsers;
                mongoCrudService.updateData(projectToUpdate.id , {'project': projectToUpdate});
                break;
            }
        }
        console.log(projectToUpdate.id);
    };

    var newProjectID = function()
    {
        "use strict";
        if ($localStorage.projectsIdArray)
        {
            projectsIdArray = $localStorage.projectsIdArray.slice();
        }
        var projectID = projectPanels.length + 'p';
        projectsIdArray.push(projectID);
        $localStorage.projectsIdArray = projectsIdArray.slice();
        return projectID;
    };

    var getProjectPanels = function()
    {
        "use strict";

        return projectPanels;
    };

    var getProjectByName = function(projectName)
    {
        for(var projectGlobal of projectPanels)
        {
            if(projectGlobal.name == projectName)
            {
                return projectGlobal;
            }
        }
    };

    var getProjectId = function(projectName)
    {
        for(var project of projectPanels)
        {
            if(project.name == projectName)
            {
                return project.id;
            }
        }
    };

    var checkTaskInProject = function(projName, taskObject)
    {
        "use strict";
        for(var projectPanel of projectPanels)
        {
            if (projectPanel.name == projName)
            {

                for(var taskPanel of projectPanel.tasks)
                {
                    if(taskPanel.name == taskObject.name)
                    {
                        return{
                            status: true,
                            inProject: projectPanel.name
                        };
                    }
                }

            }
        }
        return {status: false};
    };

    var checkDocumentInProject = function(projName, documentObject)
    {
        "use strict";

        for(var project of projectPanels)
        {
            if (project.name == projName)
            {
                for(var document of project.documents)
                {
                    if(document.name == documentObject.name)
                    {

                        return{
                            status: true,
                            docName: documentObject.name,
                            inProject: project.name
                        };
                    }
                }
            }
        }
        return {status: false};
    };

//    var addProjectToUser = function(usersArray, projectName)
//    {
//        for(var userModal of usersArray)
//        {
//            for(var projectGlobal of projectPanels)
//            {
//                if(projectGlobal.name == projectName)
//                {
//                    projectGlobal.users.push(userModal);
//                }
//            }
//        }
//    };

    var addTaskToProject = function(projName, taskObject)
    {
        "use strict";

        var taskExistence = false;

        for(var projectPanel of projectPanels)
        {
            if (projectPanel.name == projName)
            {
                projectPanel.tasks.push(taskObject);
//                 * Calling this function to update this entry in 
//                   project's tasks array in database
                mongoCrudService.updateData(projectPanel.id, {'project.tasks': projectPanel.tasks});
                break;
            }
        }
    };


    var addDocumentToProject = function(projName, documentObject)
    {
        "use strict";

        for(var projectPanel of projectPanels)
        {
            if (projectPanel.name == projName)
            {
                projectPanel.documents.push(documentObject);
//              * Calling this function to update this entry in 
//               project's tasks array in database
                mongoCrudService.updateData(projectPanel.id, {'project.documents': projectPanel.documents[0]});
            }
        }
    };

    var addUserToProject = function(projectName, userObject)
    {
        "use strict";
        for(var projectGlobal of projectPanels)
        {
            var userAlreadyExistsInProject = false;

            if (projectGlobal.name == projectName)
            {
                for(var userProject of projectGlobal.users)
                {
                    if(userProject.email == userObject.email)
                    {
                        userAlreadyExistsInProject = true;
                    }
                }

                if(!userAlreadyExistsInProject)
                {
                    projectGlobal.users.push(userObject);
                }

            }
        }
    };

    var addProjectToTask = function(tasksArray, projectName)
    {
        "use strict";

        angular.forEach(tasksArray, function(value, index)
        {
            tasksArray[index].project = projectName;            
        });
    };

    var addProjectToDocument = function(documentsArray, projectName)
    {
        "use strict";

        angular.forEach(documentsArray, function(value, index)
        {
            documentsArray[index].project = projectName;
        });
    };

    var deleteTasksFromProject = function(tasksToDelete, fromProject)
    {
        "use strict";

        for(var project of projectPanels)
        {
            if(project.name == fromProject)
            {
                for(var task of tasksToDelete)
                {
                    removeEntity(project.tasks, 'id', task.id);
                    mongoCrudService.deleteData(task.id);
                    mongoCrudService.updateData(project.id, project.tasks);
                }
//                break;

            }
        }
    };

    var deleteDocumentsFromProject = function(documentsToDelete, fromProject)
    {
        "use strict";

        for(var project of projectPanels)
        {
            if(project.name == fromProject)
            {

                for(var document of documentsToDelete)
                {
                    removeEntity(project.documents, 'id', document.id);
                    mongoCrudService.deleteData(document.id);
                    mongoCrudService.updateData(project.id, project.documents);
                }
//                break;
            }
        }
    };

    var delDocFromProject = function(docToDelete)
    {
        "use strict";

        for(var project of projectPanels)
        {
            for(var doc of project.documents)
            {
                if(doc.id == docToDelete.id)
                {
                    removeEntity(project.documents, 'id', docToDelete.id);
                    break;
                }
            }
        }
    };

    var checkProjectExistence = function(projectName)
    {
        "use strict";

        var projectAlreadyExists = false;

        for(var projectPanel of projectPanels)
        {
            if(projectPanel.name == projectName)
            {
                projectAlreadyExists = true;
                break;
            }
        }

        return projectAlreadyExists;

    };

    var getTaskProject = function(projectName)
    {
        "use strict";
        for(var project of projectPanels)
        {
            if(project.name == projectName)
            {
                return [project];
            }
        }
    };

    var updateTasksInProject = function(projectName, updatedTasks)
    {
        "use strict";
        for(var i=0; i<projectPanels.length; i++)
        {
            if(projectPanels[i].name == projectName)
            {
                for (var j = 0; j < updatedTasks.length; j++)
                {

                    for (var k = 0; k < projectPanels[i].tasks.length; k++)
                    {
                        if(projectPanels[i].tasks[k].id == updatedTasks[j].id)
                        {
                            projectPanels[i].tasks[k] = updatedTasks[j];
                        }
                    }
                }
            }
        }
    };

    var updateDocumentsInProject = function(projectName, updatedDocuments)
    {
        "use strict";

        for(var i=0; i<projectPanels.length; i++)
        {
            if(projectPanels[i].name == projectName)
            {
                for (var j = 0; j < updatedDocuments.length; j++)
                {

                    for (var k = 0; k < projectPanels[i].documents.length; k++)
                    {
                        if(projectPanels[i].documents[k].id == updatedDocuments[j].id)
                        {
                            projectPanels[i].documents[k] = updatedDocuments[j];
                        }
                    }
                }
            }
        }
    };

    var checkDocumentExistenceInTaskProject = function(docName, taskProject)
    {
        for(var project of projectPanels)
        {
            if(project.name == taskProject)
            {
                for(var doc of project.documents)
                {
                    if(doc.name == docName)
                    {
                        return true;
                    }
                }
            }
        }

        return false;

    };

    var deleteTaskAndDocumentsFromProject = function(taskToDelete, selectedTaskDocumentsArray)
    {
        var deletedTaskProject;

        for(var project of projectPanels)
        {
            for(var task of project.tasks)
            {
                if(task.id == taskToDelete.id)
                {
                    deletedTaskProject = project;
                    removeEntity(project.tasks, 'id', taskToDelete.id);
                    break;
                }
            }
        }

        if(deletedTaskProject)
        {
            for(var taskToDeleteDoc of selectedTaskDocumentsArray)
            {
                for(var document of deletedTaskProject.documents)
                {
                    if(document.id == taskToDeleteDoc.id)
                    {  
                        removeEntity(deletedTaskProject.documents, 'id', taskToDeleteDoc.id);
                    }
                }
            }
        }
    };

    var deleteUsersFromProjects = function(usersToDelete, projectName)
    {
        if(projectName)
        {
            var deleteFromProject;

            for(var projectGlobal of projectPanels)
            {
                if(projectGlobal.name == projectName)
                {
                    deleteFromProject = projectGlobal;
                }
            }

            for(var user of usersToDelete)
            {
                for(var userProject of deleteFromProject.users)
                {
                    if(userProject.email == user.email)
                    {
                        removeEntity(deleteFromProject.users, 'email', user.email);
                        mongoCrudService.updateData(deleteFromProject.id, {'project.users':deleteFromProject.users});                        
                    }
                }
            }

        }
        else
        {
            for(var projectGlobal of projectPanels)
            {
                for(var userProject of projectGlobal.users)
                {
                    if(userProject.email == usersToDelete.email)
                    {   
                        removeEntity(projectGlobal.users, 'email', usersToDelete.email);
                        mongoCrudService.updateData(projectGlobal.id, {'project.users': projectGlobal.users});
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

    var deleteUsersFromTaskInProject = function(usersToDelete, taskId, projectName)
    {
        var projectGlobal;
        var taskProject;

        for(var project of projectPanels)
        {
            if(project.name == projectName)
            {
                projectGlobal = project;
                break;
            }
        }

        for(var task of projectGlobal.tasks)
        {
            if(task.id == taskId)
            {
                taskProject = task;
                break;
            }
        }

        for(var user of usersToDelete)
        {
            for(var userTask of taskProject.users)
            {
                if(user.email == userTask.email)
                {
                    removeEntity(taskProject.users, 'email', userTask.email);
                }
            }
        }
    };


    return{
        newProjectID: newProjectID,
        createProjectPanel: createProjectPanel,
        updatedProjectParams: updatedProjectParams,
        getProjectPanels: getProjectPanels,
        getProjectByName: getProjectByName,
        getProjectId: getProjectId,
        addProjectToTask: addProjectToTask,
        addProjectToDocument: addProjectToDocument,

        checkTaskInProject: checkTaskInProject,
        checkDocumentInProject: checkDocumentInProject,
        addTaskToProject: addTaskToProject,
        addDocumentToProject: addDocumentToProject,
        addUserToProject: addUserToProject,
        deleteTasksFromProject: deleteTasksFromProject,
        deleteUsersFromTaskInProject: deleteUsersFromTaskInProject,
        deleteDocumentsFromProject: deleteDocumentsFromProject,
        deleteUsersFromProjects: deleteUsersFromProjects,
        delDocFromProject: delDocFromProject,
        deleteTaskAndDocumentsFromProject: deleteTaskAndDocumentsFromProject,
        checkProjectExistence: checkProjectExistence,
        getTaskProject: getTaskProject,
        updateTasksInProject: updateTasksInProject,
        updateDocumentsInProject: updateDocumentsInProject,
        checkDocumentExistenceInTaskProject: checkDocumentExistenceInTaskProject
    };
}]);