/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('newProjectServiceModule', []);

app.service('NewProjectService',['mongoCrudService', function(mongoCrudService){

    var projectPanels = [];
    var projectsIdArray = [];

    var setValue = function(value){
        projectPanels.push(value.project);
        mongoCrudService.createNewEntry(value);
    };

    var newProjectID = function()
    {
        var projectID = projectsIdArray.length;
        projectsIdArray.push(projectID);

        return projectID;
    };

    var getValue = function(){
        return projectPanels;
    };

    var addTaskToProject = function(projName, taskObject)
    {
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

    var addProjectToTask = function(tasksArray, projectName)
    {
        angular.forEach(tasksArray, function(value, index)
        {
            tasksArray[index].projectName = projectName;
        });
    };

    var addDocumentsToProject = function(documentsArray, projectName)
    {
        angular.forEach(documentsArray, function(value, index)
        {
            documentsArray[index].projectName = projectName;
        });
    };

    var deleteTasksFromProject = function(tasksToDelete, fromProject)
    {
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

//    var getSelectedProjectTasksArray = function(selectedProjectName)
//    {
//        var selectedProjectTasksArray;
//        angular.forEach(projectPanels, function(value,index){
//
//            if(value.name == selectedProjectName)
//            {
//                selectedProjectTasksArray = projectPanels[index].taskPanels;
//            }
//        });
//        return selectedProjectTasksArray;
//    };
//
//    var getSelectedProjectDocumentsArray = function(selectedProjectName)
//    {
//        var selectedProjectDocumentsArray;
//        angular.forEach(projectPanels, function(value,index){
//
//            if(value.name == selectedProjectName)
//            {
//                selectedProjectDocumentsArray = projectPanels[index].documentPanels;
//            }
//        });
//        return selectedProjectDocumentsArray;
//    };


    var checkProjectExistence = function(projectName)
    {
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

    return{
        newProjectID: newProjectID,
        setValue: setValue,
        getValue: getValue,
//        getSelectedProjectTasksArray: getSelectedProjectTasksArray,
//        getSelectedProjectDocumentsArray: getSelectedProjectDocumentsArray,
        addProjectToTask: addProjectToTask,
        addTaskToProject: addTaskToProject,
        deleteTasksFromProject: deleteTasksFromProject,
        addDocumentsToProject: addDocumentsToProject,
        checkProjectExistence: checkProjectExistence,
        projectPanels: projectPanels
    };

}]);
