/**
 * Created by faizankhan on 10/30/2014.
 */

var app = angular.module('panelTableProjectsModule', []);

app.controller('PanelTableProjectsCtrl', function ($scope)
{

    $scope.panels = [
        {
            'name': 'Name XYZ',
            'status': 'Status XYZ'
        },
        {
            'name': 'Name XYZ',
            'status': 'Status XYZ'
        },
        {
            'name': 'Name XYZ',
            'status': 'Status XYZ'
        },
        {
            'name': 'Name XYZ',
            'status': 'Status XYZ'
        },
        {
            'name': 'Name XYZ',
            'status': 'Status XYZ'
        },
        {
            'name': 'Name XYZ',
            'status': 'Status XYZ'
        },
        {
            'name': 'Name XYZ',
            'status': 'Status XYZ'
        },
        {
            'name': 'Name XYZ',
            'status': 'Status XYZ'
        }



    ];


//    $scope.scrollBarConfig = {
//        autoResize: true
//    };

});

//app.directive('slimScroll',function()
//{
//    return {
//        restrict: 'A',
//        link: linker
//    };
//
//
//    var linker = function(scope, element, attr)
//    {
//        element.slimScroll({
//            height: '400px',
//            size: '5px',
//            position: 'right',
//            alwaysVisible: false,
//            distance: '2px',
//            wheelStep: 15,
//            allowPageScroll: false
//        });
//    }
//
//});
//
