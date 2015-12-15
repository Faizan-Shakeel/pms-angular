
var app = angular.module('mainViewModule', ['ui.bootstrap', 'nsPopover']);

app.controller('Main_View_Controller', ['$scope', 'NewProjectService', 'NewTaskService', 'NewDocumentService', function ($scope, NewProjectService, NewTaskService, NewDocumentService)
{
    var vm = this;

    ////////////////// ACCORDION //////////////////

    vm.oneAtATime = true;

    vm.groups = [
        {
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
        },
        {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
        }
    ];

    vm.status = {
        isFirstOpen: true,
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

    ////////////////// ACCORDION [END]//////////////////


    ////////////////// CHATTING PANEL //////////////////

    var online = 'fa fa-circle-o';
    var offline = '';

    vm.users = [

        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': offline
        },
        {
            'name': 'User Name',
            'status': online
        },
        {
            'name': 'User Name',
            'status': online
        }

    ];

//    vm.scrollBarConfig = {
//        autoResize: true // If true, will listen for DOM elements being added or removed inside the scroll container
//    };

    ////////////////// CHATTING PANEL [END]//////////////////

    ////////////////// NAV BAR ////////////////////

    vm.searchDropdownStatus = {
        isOpen: false
    };

    vm.projectVisibility = true;
    vm.dropdownItems = ['Projects', 'Tasks', 'Documents', 'Users'];
    vm.selectedItem = vm.dropdownItems[0];
    vm.dropboxitemselected = function (item) {

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
                console.log(vm.taskVisibility);
                vm.projectVisibility = false;
                vm.taskVisibility = true;
                vm.documentVisibility = false;
                vm.userVisibility = false;
                console.log(vm.taskVisibility);
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

    ////////////////// NAV BAR [END] ////////////////////


    ////////////////// TABS AND PANELS //////////////////

    vm.panels = NewProjectService.panels;

    vm.taskPanels = NewTaskService.taskPanels;

    vm.documentPanels = NewDocumentService.documentPanels;

    vm.deleteProject = function(projectName)
    {
        var selectedProjectTasksArray;
        var selectedProjectDocumentsArray;

        angular.forEach(vm.panels, function(value,index){

            if(value.name == projectName)
            {
                selectedProjectTasksArray = vm.panels[index].taskPanels;
                selectedProjectDocumentsArray = vm.panels[index].documentPanels;
            }

        });

        NewTaskService.deleteTask(selectedProjectTasksArray);
        NewDocumentService.deleteDocument(selectedProjectDocumentsArray);
        removeEntity(vm.panels, 'name', projectName);

    };

    vm.deleteTask = function(taskID)
    {
        removeEntity(NewTaskService.taskPanels, 'id', taskID);
        angular.forEach(vm.panels, function(valueProject,indexProject){
            angular.forEach(valueProject.taskPanels, function(valueTask,indexTask){
                if(valueTask.id == taskID)
                {
                    removeEntity(valueProject.taskPanels, 'id', taskID);
                }
            });
        });
    };

    vm.deleteDocument = function(documentID)
    {
        removeEntity(NewDocumentService.documentPanels, 'id', documentID);
        angular.forEach(vm.panels, function(valueProject,indexProject){
            angular.forEach(valueProject.documentPanels, function(valueDocument,indexDocument){
                if(valueDocument.id == documentID)
                {
                    removeEntity(valueProject.documentPanels, 'id', documentID);
                }
            });
        });
    };

    var removeEntity = function(arr, attr, value){
        var i = arr.length;
        while(i--){
            if( arr[i]
                && (arr[i][attr] === value) ){
                arr.splice(i,1);
            }
        }
        return arr;
    };

    ////////////////// TABS AND PANELS [END]//////////////////

}]);

