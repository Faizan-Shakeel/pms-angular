/**
 * Created by faizankhan on 11/30/13.
 */

var app = angular.module('accordionModule', ['ui.bootstrap']);

//app.controller('AccordionCtrl', function ($scope) {
//    $scope.oneAtATime = true;
//
//    $scope.status = {
//        isFirstOpen: true,
//        isFirstDisabled: false
//    };
//
//
//});


app.controller('AccordionCtrl', function ($scope) {

    $scope.oneAtATime = true;

    $scope.groups = [
        {
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
        },
        {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
        }
    ];

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };

    $scope.scrollBarConfig = {
        autoResize: true // If true, will listen for DOM elements being added or removed inside the scroll container
//        direction: 'vertical', // The direction of the scrollbar
//        scrollbar: {
//            width: 4, // Width (thickness. Is actually height on horizontal scrollbars) of the scrollbar
//            hoverWidth: 14, // Width on scrollbar hover
//            color: 'rgba(0,0,0, .6)', // Background color of the scrollbar
//            show: false // If true, scrollbar will always be visible
//        },
//        scrollbarContainer: {
//            width: 10, // Width of the container surrounding the scrollbar. Becomes visible on hover
//            color: 'rgba(0,0,0, .1)' // Background color of the scrollbar container
//        },
//        scrollTo: null // Scroll to the 'start' or 'end' on initialization and content changes. Pixel values may also be given.
    }

});
