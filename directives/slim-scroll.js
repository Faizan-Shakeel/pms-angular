/**
 * Created by faizankhan on 10/30/2014.
 */

angular.module('slimScrollModule', []).directive('slimScroll',function()
{
    var linker = function(scope, element, attr)
    {
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
        scope: {
            slimScroll: '&'
        },
        link: linker
    };

});

//app.config(function($logProvider){
//    $logProvider.debugEnabled(true);
//});


//angular.module('slimScrollModule', []).directive('slimScroll',function()
//{
//    return {
//        restrict: 'A',
////        scope: {
////            slimScroll: '&'
////        },
//        link: linker
//    };
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
//
//    }
//
//});
//
