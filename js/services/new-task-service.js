/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('newTaskModule', []);

app.service('NewTaskService', function(){

    var taskPanels = [];

    var setValue = function(value){
//        test_value_update = value;
        taskPanels.push(value);
    };

    var getValue = function(){
        return taskPanels;
    };

//    return {setValue:setValue};

    return{
        setValue: setValue,
        getValue: getValue,
        taskPanels: taskPanels
//        test_value_update: test_value_update
    };

//    {
//        setValue: setValue;
//    }

});
