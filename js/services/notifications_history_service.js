"use strict";
/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('notificationsAndHistoryModule', []);

app.service('NotificationsAndHistoryService', [function () {

    var history = [];
    var globalNotifications = [];
    var accordionStatusAndVisibility;
    var globalNotificationsCount = {count: 0};

    var setAccordionStatus = function(accStatusParams)
    {
        accordionStatusAndVisibility = accStatusParams;
    };

    var getAccordionStatus = function()
    {
        return accordionStatusAndVisibility;
    };

    var makeHistory = function(historyParams)
    {
        history.unshift(historyParams);
    };

    var getHistory = function()
    {
        return history;
    };

    var addNotifications = function(elementParams, action, actionBy, elementType, action2, elementType2, element2)
    {
        "use strict";

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
    };

    var getNotifications = function()
    {
        "use strict";

        return globalNotifications;
    };

    var setNotificationsCount = function(accStatus, accVisibility)
    {
        if(!accStatus || accVisibility)
        {
            globalNotificationsCount.count++;
        }
    };

    var getNotificationsCount = function()
    {
        return globalNotificationsCount;
    };

    var clearNotifications = function()
    {
        if(!accordionStatusAndVisibility.isSecondOpen || !accordionStatusAndVisibility.accVisibility)
        {
            globalNotificationsCount.count = 0;
        }
    };

    return{
        addNotifications: addNotifications,
        getNotifications: getNotifications,
        setNotificationsCount: setNotificationsCount,
        getNotificationsCount: getNotificationsCount,
        setAccordionStatus: setAccordionStatus,
        getAccordionStatus: getAccordionStatus,
        clearNotifications: clearNotifications,
        makeHistory: makeHistory,
        getHistory: getHistory,
        globalNotificationsCount: globalNotificationsCount
    }

}]);