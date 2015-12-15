/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('newProjectServiceModule', []);

app.service('NewProjectService', function(){

    var panels = [];
    var projectsIdArray = [];

    var setValue = function(value){
        panels.push(value);
    };

    var newProjectID = function()
    {
        var projectID = projectsIdArray.length;
        projectsIdArray.push(projectID);

        return projectID;
    };

    var getValue = function(){
        return panels;
    };

    var addTasksToProject = function(tasksArray, projectName)
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

    var getSelectedProjectTasksArray = function(selectedProjectName)
    {
        var selectedProjectTasksArray;
        angular.forEach(panels, function(value,index){

            if(value.name == selectedProjectName)
            {
                selectedProjectTasksArray = panels[index].taskPanels;
            }
        });
        return selectedProjectTasksArray;
    };

    var getSelectedProjectDocumentsArray = function(selectedProjectName)
    {
        var selectedProjectDocumentsArray;
        angular.forEach(panels, function(value,index){

            if(value.name == selectedProjectName)
            {
                selectedProjectDocumentsArray = panels[index].documentPanels;
            }
        });
        return selectedProjectDocumentsArray;
    };


    var checkProjectExistence = function(projectName)
    {
        var projectAlreadyExists = false;

        for(var i in panels)
        {
            if(panels[i].name == projectName)
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
        getSelectedProjectTasksArray: getSelectedProjectTasksArray,
        getSelectedProjectDocumentsArray: getSelectedProjectDocumentsArray,
        addTasksToProject: addTasksToProject,
        addDocumentsToProject: addDocumentsToProject,
        checkProjectExistence: checkProjectExistence,
        panels: panels
    };

});
