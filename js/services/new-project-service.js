/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('newProjectModule', []);

app.service('NewProjectService', function(){

    var panels = [];

    var setValue = function(value){
//        test_value_update = value;
        panels.push(value);
    };

    var getValue = function(){
        return panels;
    };

//    return {setValue:setValue};

    return{
        setValue: setValue,
        getValue: getValue,
        panels: panels
//        test_value_update: test_value_update
    };

//    {
//        setValue: setValue;
//    }

});
