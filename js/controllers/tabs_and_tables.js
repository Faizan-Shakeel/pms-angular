
var app = angular.module('tabsAndTablesModule', ['ui.bootstrap']);

app.controller('TabsCtrl', function($scope, $http, $filter, NewProjectService)
{

    var vm = this;

    vm.panels = NewProjectService.panels;

//        vm.panels = [
//        {
//            'name': 'Name XYZ',
//            'status': 'Status XYZ'
//        },
//        {
//            'name': 'Name XYZ',
//            'status': 'Status XYZ'
//        }
//    ];

//    vm.$watch( function() { return NewProjectService.getValue(); }, function(new_project, old_project) {
//
//        if(new_project !== old_project)
//        {
//            vm.panels.push(new_project);
//        }
//
//
//    });


    vm.deleteProject = function(projectName)
    {
        var deleteThisProject = {
            'name': projectName,
            'status': 'Status New'
        };

        vm.panels = removeByAttr(vm.panels, 'name', projectName);

//        vm.panels = $filter('filter')(vm.panels, {name: '!ted'}, true);
//        vm.panels = $filter('filter')(vm.panels, {name: !projectName}, true);

    };

    var removeByAttr = function(arr, attr, value){
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

//    var arr = [{id:1,name:'serdar'},{id:2,name:'alfalfa'},{id:3,name:'joe'}];
//    removeByAttr(arr, 'id', 1);


});

