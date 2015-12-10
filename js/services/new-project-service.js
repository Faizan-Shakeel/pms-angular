/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('newProjectModule', []);

app.service('NewProjectService', function(){

    var panels = [];

    var setValue = function(value){
        panels.push(value);
    };

    var getValue = function(){
        return panels;
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
        setValue: setValue,
        getValue: getValue,
        getSelectedProjectTasksArray: getSelectedProjectTasksArray,
        panels: panels
    };

});
