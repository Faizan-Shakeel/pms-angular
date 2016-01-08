"use strict";

var app = angular.module('newProjectServiceModule', []);

app.service('NewProjectService',['mongoCrudService' ,function(mongoCrudService){

    var projectPanels = [];
    var projectsIdArray = [];

    var createProjectPanel = function(value)
    {
        "use strict";
        console.log(value.project);
        projectPanels.push(value.project);
        mongoCrudService.createNewEntry(value);
    };

    var newProjectID = function()
    {
        "use strict";

        var projectID = projectPanels.length + 'p';
        projectsIdArray.push(projectID);
        console.log(projectID);
        return projectID;
    };

    var getProjectPanels = function()
    {
        "use strict";

        return projectPanels;
    };

    var addTaskToProject = function(projName, taskObject)
    {
        "use strict";

        var taskExistence = false;

        for(var projectPanel of projectPanels)
        {
            if (projectPanel.name == projName)
            {
                for(var taskPanel of projectPanel.taskPanels)
                {
                    if(taskPanel.name == taskObject.name)
                    {
                        taskExistence = true;

                        return{
                            status: true,
                            inProject: projectPanel.name
                        };
                    }
                }

                if(!taskExistence)
                {
                    projectPanel.taskPanels.push(taskObject);
                    return{
                        status: false
                    };
                }

            }
        }
    };

    var addDocumentToProject = function(projName, documentObject)
    {
        "use strict";

        var documentExistence = false;

        for(var projectPanel of projectPanels)
        {
            if (projectPanel.name == projName)
            {
                for(var documentPanel of projectPanel.documentPanels)
                {
                    if(documentPanel.name == documentObject.name)
                    {
                        documentExistence = true;

                        return{
                            status: true,
                            inProject: projectPanel.name
                        };
                    }
                }

                if(!documentExistence)
                {
                    projectPanel.documentPanels.push(documentObject);
                    return{
                        status: false
                    };
                }

            }
        }
    };

    var addProjectToTask = function(tasksArray, projectName)
    {
        "use strict";

        angular.forEach(tasksArray, function(value, index)
        {
            tasksArray[index].projectName = projectName;
        });
    };

    var addProjectToDocument = function(documentsArray, projectName)
    {
        "use strict";

        angular.forEach(documentsArray, function(value, index)
        {
            documentsArray[index].projectName = projectName;
        });
    };

    var addDocumentsToProject = function(documentsArray, projectName)
    {
        "use strict";

        angular.forEach(documentsArray, function(value, index)
        {
            documentsArray[index].projectName = projectName;
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
                    removeEntity(project.taskPanels, 'id', task.id);
                }
                break;
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
                for(var task of documentsToDelete)
                {
                    removeEntity(project.documentPanels, 'id', task.id);
                }
                break;
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
                    for (var k = 0; k < projectPanels[i].taskPanels.length; k++)
                    {
                        if(projectPanels[i].taskPanels[k].id == updatedTasks[j].id)
                        {
                            projectPanels[i].taskPanels[k] = updatedTasks[j];
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
                    for (var k = 0; k < projectPanels[i].documentPanels.length; k++)
                    {
                        if(projectPanels[i].documentPanels[k].id == updatedDocuments[j].id)
                        {
                            projectPanels[i].documentPanels[k] = updatedDocuments[j];
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
        addTaskToProject: addTaskToProject,
        addDocumentToProject: addDocumentToProject,
        deleteTasksFromProject: deleteTasksFromProject,
        deleteDocumentsFromProject: deleteDocumentsFromProject,
        addDocumentsToProject: addDocumentsToProject,
        checkProjectExistence: checkProjectExistence,
        getTaskProject: getTaskProject,
        updateTasksInProject: updateTasksInProject,
        updateDocumentsInProject: updateDocumentsInProject
    };

}]);
