
var app = angular.module('tabsAndTablesModule', ['ui.bootstrap']);

app.controller('TabsCtrl', function($scope, $http, $filter, NewProjectService)
{

    $scope.panels = NewProjectService.panels;

//        $scope.panels = [
//        {
//            'name': 'Name XYZ',
//            'status': 'Status XYZ'
//        },
//        {
//            'name': 'Name XYZ',
//            'status': 'Status XYZ'
//        }
//    ];

//    $scope.$watch( function() { return NewProjectService.getValue(); }, function(new_project, old_project) {
//
//        if(new_project !== old_project)
//        {
//            $scope.panels.push(new_project);
//        }
//
//
//    });


    $scope.deleteProject = function(projectName)
    {
        var deleteThisProject = {
            'name': projectName,
            'status': 'Status New'
        };

        $scope.panels = removeByAttr($scope.panels, 'name', projectName);

//        $scope.panels = $filter('filter')($scope.panels, {name: '!ted'}, true);
//        $scope.panels = $filter('filter')($scope.panels, {name: !projectName}, true);

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

