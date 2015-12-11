/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('newProjectModule', []);

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

    return{
        newProjectID: newProjectID,
        setValue: setValue,
        getValue: getValue,
        getSelectedProjectTasksArray: getSelectedProjectTasksArray,
        addTasksToProject: addTasksToProject,
        panels: panels
    };

});
