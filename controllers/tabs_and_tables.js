
//var app = angular.module('tabsAndTablesModule', ['ngAnimate', 'ngSanitize', 'mgcrea.ngStrap']);
var app = angular.module('tabsAndTablesModule', ['ui.bootstrap']);

app.controller('TabsCtrl', function($scope)
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
//        autoResize: true // If true, will listen for DOM elements being added or removed inside the scroll container
//    }


});

app.directive('slimScroll',function()
{
    console.log('Inside Directive');

    var linker = function(scope, element, attr)
    {
        console.log('Inside Linker');

        element.slimScroll({
            height: '400px',
            size: '5px',
            position: 'right',
            alwaysVisible: false,
            distance: '2px',
            wheelStep: 15,
            allowPageScroll: false
        });
    };


    return {
        restrict: 'A',
        link: linker
    };

});


//app.controller('TableProjectCtrl', ['$scope', function ($scope)
//{
//    var
//        nameList = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'],
//        familyName = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];
//
//    function createRandomItem() {
//        var
//            firstName = nameList[Math.floor(Math.random() * 4)],
//            lastName = familyName[Math.floor(Math.random() * 4)],
//            age = Math.floor(Math.random() * 100),
//            email = firstName + lastName + '@whatever.com',
//            balance = Math.random() * 3000;
//
//        return{
//            firstName: firstName,
//            lastName: lastName,
//            age: age,
//            email: email,
//            balance: balance
//        };
//    }
//
//
//    $scope.displayed = [];
//    for (var j = 0; j < 50; j++) {
//        $scope.displayed.push(createRandomItem());
//    }











//}]);



//app.directive('stRatio',function()
//{
//    return {
//        link:function(scope, element, attr){
//            var ratio=+(attr.stRatio);
//
//            element.css('width',ratio+'%');
//
//        }
//    };
//});

