"use strict";

var app = angular.module('projectServiceModule', []);

app.service('ProjectService', ['mongoCrudService', function(mongoCrudService){

    var projectPanels = [];
    var projectsIdArray = [];

    var createProjectPanel = function(value)
    {
        "use strict";
        value = {project: value};
        projectPanels.push(value.project);
        console.log(value);
        mongoCrudService.createNewEntry(value);
    };

    var newProjectID = function()
    {
        "use strict";

        var projectID = projectPanels.length + 'p';
        projectsIdArray.push(projectID);
        return projectID;
    };

    var getProjectPanels = function()
    {
        "use strict";

        return projectPanels;
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

    var addTaskToProject = function(projName, taskObject)
    {
        "use strict";
//                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        var taskExistence = false;

        for(var projectPanel of projectPanels)
        {
            if (projectPanel.name == projName)
            {
                console.log('project task array updating ');
                projectPanel.tasks.push(taskObject);
//                 * Calling this function to update this entry in 
//                   project's tasks array in database
              //console.log()
                mongoCrudService.updateData(projectPanel.id, {'project.tasks': projectPanel.tasks[0]});
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
//              * Calling this function to update this entry in 
//               project's tasks array in database
                mongoCrudService.updateData(projectPanel.id, {'project.documents': projectPanel.documents[0]});
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
                    console.log(project.tasks.projectId);
                    removeEntity(project.tasks, 'id', task.id);
                }
//                break;
                //mongoCrudService.updateData()
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
    console.log('updateTasksInProject called ');
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
        getProjectPanels: getProjectPanels,
        addProjectToTask: addProjectToTask,
        addProjectToDocument: addProjectToDocument,

        checkTaskInProject: checkTaskInProject,
        checkDocumentInProject: checkDocumentInProject,
        addTaskToProject: addTaskToProject,
        addDocumentToProject: addDocumentToProject,
        deleteTasksFromProject: deleteTasksFromProject,
        deleteDocumentsFromProject: deleteDocumentsFromProject,
        checkProjectExistence: checkProjectExistence,
        getTaskProject: getTaskProject,
        updateTasksInProject: updateTasksInProject,
        updateDocumentsInProject: updateDocumentsInProject
    };
}]);

