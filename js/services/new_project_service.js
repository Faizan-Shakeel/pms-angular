/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('newProjectServiceModule', []);

app.service('NewProjectService', function(){

    var panels = [];
    var projectsIdArray = [];
    var searchInputFieldText = '';

    var setValue = function(value){
        panels.push(value);
    };

    var updateSearchInputFieldText = function(text)
    {
        searchInputFieldText = text;
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
        addTasksToProject: addTasksToProject,
        checkProjectExistence: checkProjectExistence,
        updateSearchInputFieldText: updateSearchInputFieldText,
        searchInputFieldText: searchInputFieldText,
        panels: panels
    };

});
