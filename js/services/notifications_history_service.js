"use strict";
/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('notificationsAndHistoryModule', []);

app.service('NotificationsAndHistoryService', [function () {

    var globalNotifications = [];

    var addNotifications = function(elementParams, action, actionBy, elementType, action2, elementType2, element2)
    {
        "use strict";

//        console.log("actionBy : " + actionBy);
//        console.log("action : " + action);
//        console.log("elementType : " + elementType);
//        console.log("action2 : " + action2);
//        console.log("elementParams : " + JSON.stringify(elementParams));
//        console.log("element2 : " + JSON.stringify(element2));

        var actionDate = moment().format("L");
        var actionTime = moment().format('LT');

        var notificationsParams = {
            'action': action,
            'action2': action2,
            'actionBy': actionBy,
            'elementType': elementType,
            'elementType2': elementType2,
            'element': elementParams,
            'element2': element2,
            'actionDate': actionDate,
            'actionTime': actionTime
        };

        globalNotifications.unshift(notificationsParams);
//        globalNotifications.reverse();
    };

    var getNotifications = function()
    {
        "use strict";

        return globalNotifications;
    };




    return{
        addNotifications: addNotifications,
        getNotifications: getNotifications
    }

}]);