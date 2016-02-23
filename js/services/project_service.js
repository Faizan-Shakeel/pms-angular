"use strict";
/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('projectServiceModule', []);

app.service('ProjectService', function(){

    var projectPanels = [];
    var projectsIdArray = [];

    var createProjectPanel = function(project_params)
    {
        "use strict";

        projectPanels.push(project_params);
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
                projectToUpdate.modifiedDate = updated_project.modifiedDate;
                projectToUpdate.lastModifiedBy = updated_project.lastModifiedBy;
                projectToUpdate.numberOfTasks = updated_project.numberOfTasks;
                projectToUpdate.numberOfDocuments = updated_project.numberOfDocuments;
                projectToUpdate.numberOfUsers = updated_project.numberOfUsers;

                break;
            }
        }
    };

    var newProjectID = function()
    {
        "use strict";

        var projectID = projectsIdArray.length;
        projectsIdArray.push(projectID);

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

    var checkTaskInProject = function(projName, taskObject)
    {
        "use strict";
//                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

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
//                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

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
//                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        var taskExistence = false;

        for(var projectPanel of projectPanels)
        {
            if (projectPanel.name == projName)
            {
                projectPanel.tasks.push(taskObject);
                break;
            }
        }
    };

    var addDocumentToProject = function(projName, documentObject)
    {
        "use strict";
//                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        for(var projectPanel of projectPanels)
        {
            if (projectPanel.name == projName)
            {
                projectPanel.documents.push(documentObject);
            }
        }
    };

    var addUserToProject = function(projectName, userObject)
    {
        "use strict";
//                        console.log("Global Docs AFTER : " + JSON.stringify(UserService.getUserPanels()));

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
//                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        angular.forEach(tasksArray, function(value, index)
        {
            tasksArray[index].project = projectName;
        });
    };

    var addProjectToDocument = function(documentsArray, projectName)
    {
        "use strict";
//                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        angular.forEach(documentsArray, function(value, index)
        {
            documentsArray[index].project = projectName;
        });
    };

    var deleteTasksFromProject = function(tasksToDelete, fromProject)
    {
        "use strict";
//                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        for(var project of projectPanels)
        {
            if(project.name == fromProject)
            {
                for(var task of tasksToDelete)
                {
                    removeEntity(project.tasks, 'id', task.id);
                }
//                break;
            }
        }
    };

    var deleteDocumentsFromProject = function(documentsToDelete, fromProject)
    {
        "use strict";
//                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        for(var project of projectPanels)
        {
            if(project.name == fromProject)
            {
                for(var document of documentsToDelete)
                {
                    removeEntity(project.documents, 'id', document.id);
                }
//                break;
            }
        }
    };

    var delDocFromProject = function(docToDelete)
    {
        "use strict";
//                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

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
//                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        var projectAlreadyExists = false;

        for(var projectPanel of projectPanels)
        {
            if(projectPanel.name == projectName)
            {
                projectAlreadyExists = true;
                break;
            }
            else
            {
                projectAlreadyExists = false;
            }
        }

        return projectAlreadyExists;

    };

    var getTaskProject = function(projectName)
    {
        "use strict";
//                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

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
//                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

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
//                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

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
        newProjectID: newProjectID,
        createProjectPanel: createProjectPanel,
        updatedProjectParams: updatedProjectParams,
        getProjectPanels: getProjectPanels,
        getProjectByName: getProjectByName,
        addProjectToTask: addProjectToTask,
        addProjectToDocument: addProjectToDocument,
        checkTaskInProject: checkTaskInProject,
        checkDocumentInProject: checkDocumentInProject,
//        addProjectToUser: addProjectToUser,
        addTaskToProject: addTaskToProject,
        addDocumentToProject: addDocumentToProject,
        addUserToProject: addUserToProject,
        deleteTasksFromProject: deleteTasksFromProject,
        deleteDocumentsFromProject: deleteDocumentsFromProject,
        delDocFromProject: delDocFromProject,
        deleteTaskAndDocumentsFromProject: deleteTaskAndDocumentsFromProject,
        checkProjectExistence: checkProjectExistence,
        getTaskProject: getTaskProject,
        updateTasksInProject: updateTasksInProject,
        updateDocumentsInProject: updateDocumentsInProject,
        checkDocumentExistenceInTaskProject: checkDocumentExistenceInTaskProject
    };

});
