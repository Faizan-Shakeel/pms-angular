"use strict";

var app = angular.module('mainViewModule', ['ui.bootstrap', 'nsPopover']);

app.controller('Main_View_Controller', ['$scope', 'ProjectService', 'TaskService', 'DocumentService', 'UserService', 'NotificationsAndHistoryService', function ($scope, ProjectService, TaskService, DocumentService, UserService, NotificationsAndHistoryService)
{
    var vm = this;
    /*/////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// ACCORDION /////////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

    vm.notificationsCount = {count: 0};
    vm.globalNotifications = NotificationsAndHistoryService.getNotifications();
    vm.globalHistory = NotificationsAndHistoryService.getHistory();
    vm.notificationsCount = NotificationsAndHistoryService.globalNotificationsCount;
    vm.onlineUsersCount = 0;

    vm.accordionVisibility = false;

    vm.oneAtATime = true;

//    vm.groups = [
//        {
//            title: 'Dynamic Group Header - 1',
//            content: 'Dynamic Group Body - 1'
//        },
//        {
//            title: 'Dynamic Group Header - 2',
//            content: 'Dynamic Group Body - 2'
//        }
//    ];

    vm.accordionStatus = {
        isFirstOpen: true,
        isSecondOpen: false,
        isThirdOpen: false,
        isFirstDisabled: false
    };

    vm.scrollBarConfig = {
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
    };

    vm.switchAccordionVisibility = function()
    {
        vm.accordionVisibility = !vm.accordionVisibility;

//        console.log("vm.accordionVisibility  : " + vm.accordionVisibility);

        NotificationsAndHistoryService.clearNotifications();

//        if(vm.accordionStatus.isSecondOpen && !vm.accordionVisibility)
//        {
//            vm.globalNotificationsCount = 0;
//        }

        if(vm.chatPanelVisibility)
        {
            if(vm.accordionVisibility)
            {
                vm.globalTabsBootstrapClass = 'col-lg-12 col-md-12 col-sm-12';
            }
            else
            {
                vm.globalTabsBootstrapClass = 'col-lg-10 col-md-10 col-sm-10';
            }
        }
        else
        {
            if(vm.accordionVisibility)
            {
                vm.globalTabsBootstrapClass = 'col-lg-10 col-md-10 col-sm-10';
            }
            else
            {
                vm.globalTabsBootstrapClass = 'col-lg-8 col-md-8 col-sm-8';
            }
        }
    };

    var accInfoObject = {isSecondOpen: vm.accordionStatus.isSecondOpen, accVisibility: vm.accordionVisibility};
    NotificationsAndHistoryService.setAccordionStatus(accInfoObject);

    vm.updateAccordionInfo = function()
    {
        console.log("C A L L E D");

//        console.log("vm.notificationsCount : " + vm.notificationsCount);

        NotificationsAndHistoryService.setAccordionStatus(accInfoObject);

        NotificationsAndHistoryService.clearNotifications();

    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// ACCORDION [E N D] /////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////


    /*//////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// CHATTING PANEL /////////////////////////////////////////////////////////////////
     *//////////////////////////////////////////////////////////////////////////////////////////////////

    vm.chatPanelVisibility = false;

    var online = 'fa fa-circle-o';
    var offline = '';
    var usersArray = [];
    var usersObject = {};

    for(var i=0; i<20; i++)
    {
        usersObject.name = 'User Name';
        usersObject.status = '';
        usersArray.push(usersObject);
        usersObject = {};
    }

    vm.users = usersArray;

    vm.selectedUser = function(selectedUser)
    {
        vm.visible = !vm.visible;
    };

//    vm.scrollBarConfig = {
//        autoResize: true // If true, will listen for DOM elements being added or removed inside the scroll container
//    };

    vm.switchChatPanelVisibility = function()
    {
        vm.chatPanelVisibility = !vm.chatPanelVisibility;

        if(vm.accordionVisibility)
        {
            if(vm.chatPanelVisibility)
            {
                vm.globalTabsBootstrapClass = 'col-lg-12 col-md-12 col-sm-12';
            }
            else
            {
                vm.globalTabsBootstrapClass = 'col-lg-10 col-md-10 col-sm-10';
            }
        }
        else
        {
            if(vm.chatPanelVisibility)
            {
                vm.globalTabsBootstrapClass = 'col-lg-10 col-md-10 col-sm-10';
            }
            else
            {
                vm.globalTabsBootstrapClass = 'col-lg-8 col-md-8 col-sm-8';
            }
        }
    };

    vm.messages = [];
    vm.username = 'Online User';
    vm.visible = false;
    vm.title = 'Chatting With';
    vm.submitButtonText = 'Send';

    vm.sendMessage = function(message, username) {
        if(message && message !== '' && username) {
            vm.messages.push({
                'username': username,
                'content': message
            });
        }
    };
//    vm.expandOnNew = true;

    /*//////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// CHATTING PANEL [E N D] /////////////////////////////////////////////////////////
     *//////////////////////////////////////////////////////////////////////////////////////////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// NAV BAR ///////////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

    vm.searchDropdownStatus = {
        isOpen: false
    };

    vm.projectVisibility = true;
    vm.dropdownItems = ['Projects', 'Tasks', 'Documents', 'Users'];

    vm.selectedItem = vm.dropdownItems[0];
    vm.globalSearchDropDown = function (item) {

        vm.selectedItem = item;

        vm.active = {}; //reset
        vm.active[item] = true;

        switch(item) {
            case 'Projects':
                vm.projectVisibility = true;
                vm.taskVisibility = false;
                vm.documentVisibility = false;
                vm.userVisibility = false;
                break;
            case 'Tasks':
                vm.projectVisibility = false;
                vm.taskVisibility = true;
                vm.documentVisibility = false;
                vm.userVisibility = false;
                break;
            case 'Documents':
                vm.projectVisibility = false;
                vm.taskVisibility = false;
                vm.documentVisibility = true;
                vm.userVisibility = false;
                break;
            case 'Users':
                vm.projectVisibility = false;
                vm.taskVisibility = false;
                vm.documentVisibility = false;
                vm.userVisibility = true;
                break;
        }
//        vm.searchProjectsVisibility = true;

    };

    vm.displayPopover = false;

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// NAV BAR [E N D] //////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// TABS AND PANELS ///////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

    vm.globalTabsBootstrapClass = 'col-lg-8 col-md-8 col-sm-8';
    vm.projectPanels = ProjectService.getProjectPanels();
    vm.taskPanels = TaskService.getTaskPanels();
    vm.documentPanels = DocumentService.getDocumentPanels();
    vm.userPanels = UserService.getUserPanels();

    vm.deleteProject = function(projectToDelete)
    {
        var action = 'deleted';
        var actionBy = 'User';
        var elementType = 'Project';

        NotificationsAndHistoryService.addNotifications(projectToDelete, action, actionBy, elementType);

        NotificationsAndHistoryService.setNotificationsCount(vm.accordionStatus.isSecondOpen, vm.accordionVisibility);

        var selectedProjectTasksArray;
        var selectedProjectDocumentsArray;
        var selectedProjectUsersArray;

        angular.forEach(vm.projectPanels, function(value,index){

            if(value.name == projectToDelete.name)
            {
                selectedProjectTasksArray = vm.projectPanels[index].tasks;
                selectedProjectDocumentsArray = vm.projectPanels[index].documents;
                selectedProjectUsersArray = vm.projectPanels[index].users;
            }
        });

        for(var task of selectedProjectTasksArray)
        {
            UserService.deleteTaskFromUser(task.users, task.id);
        }

        TaskService.deleteTask(selectedProjectTasksArray);
        DocumentService.deleteDocument(selectedProjectDocumentsArray);
        UserService.deleteProjectFromUser(selectedProjectUsersArray, projectToDelete.name);

        removeEntity(vm.projectPanels, 'id', projectToDelete.id);

    };

    vm.deleteTask = function(taskToDelete)
    {
        var action = 'deleted';
        var actionBy = 'User';
        var elementType = 'Task';

        NotificationsAndHistoryService.addNotifications(taskToDelete, action, actionBy, elementType);

        if(!vm.accordionStatus.isSecondOpen || vm.accordionVisibility)
        {
            vm.globalNotificationsCount++;
        }

        var deletedTaskProject;
        var selectedTaskDocumentsArray;
        var selectedTaskUsersArray;

        angular.forEach(vm.taskPanels, function(value,index){
            if(value.id == taskToDelete.id)
            {
                selectedTaskDocumentsArray = vm.taskPanels[index].documents;
                selectedTaskUsersArray = vm.taskPanels[index].users;
            }
        });

        DocumentService.deleteDocument(selectedTaskDocumentsArray);
        removeEntity(TaskService.getTaskPanels(), 'id', taskToDelete.id);
        ProjectService.deleteTaskAndDocumentsFromProject(taskToDelete, selectedTaskDocumentsArray);
        UserService.deleteTaskFromUser(selectedTaskUsersArray, taskToDelete.id);

    };

    vm.deleteDocument = function(documentToDelete)
    {
        var action = 'deleted';
        var actionBy = 'User';
        var elementType = 'Document';

        NotificationsAndHistoryService.addNotifications(documentToDelete, action, actionBy, elementType);

        if(!vm.accordionStatus.isSecondOpen || vm.accordionVisibility)
        {
            vm.globalNotificationsCount++;
        }

        removeEntity(DocumentService.getDocumentPanels(), 'id', documentToDelete.id);

        if(documentToDelete.task)
        {
            var updatedTask = TaskService.delDocFromTask(documentToDelete);
        }

        if(documentToDelete.project)
        {
            ProjectService.delDocFromProject(documentToDelete);

            if(updatedTask)
            {
                ProjectService.updateTasksInProject(documentToDelete.project, JSON.parse(JSON.stringify([updatedTask])));
            }
        }
    };

    vm.deleteUser = function(userToDelete)
    {
        var action = 'deleted';
        var actionBy = 'User';
        var elementType = 'User';

        NotificationsAndHistoryService.addNotifications(userToDelete, action, actionBy, elementType);

        if(!vm.accordionStatus.isSecondOpen || vm.accordionVisibility)
        {
            vm.globalNotificationsCount++;
        }

        removeEntity(UserService.getUserPanels(), 'id', userToDelete.id);

        TaskService.deleteUserFromTasks(userToDelete);

        ProjectService.deleteUsersFromProjects(userToDelete);

    };

    var removeEntity = function(arr, attr, value){
        var i = arr.length;
        while(i--){
            if( arr[i]
                && arr[i].hasOwnProperty(attr)
                && (arr[i][attr] === value) ){

                arr.splice(i,1);

            }
        }
        return arr;
    };

    /*///////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// TABS AND PANELS [E N D] /////////////////////////////////////////////////////////
     *//////////////////////////////////////////////////////////////////////////////////////////////////

}]);

