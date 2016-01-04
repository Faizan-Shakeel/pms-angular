
var app = angular.module('mainViewModule', ['ui.bootstrap', 'nsPopover']);

app.controller('Main_View_Controller', ['$scope', 'NewProjectService', 'NewTaskService', 'NewDocumentService','mongoCrudService', function ($scope, NewProjectService, NewTaskService, NewDocumentService, mongoCrudService)
{
    init();
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

    ////////////////// NAV BAR [END] ////////////////////


    ////////////////// TABS AND PANELS //////////////////

    vm.projectPanels = NewProjectService.projectPanels;

    vm.taskPanels = NewTaskService.taskPanels;

    vm.documentPanels = NewDocumentService.documentPanels;

    vm.deleteProject = function(projectName)
    {
        var selectedProjectTasksArray;
        var selectedProjectDocumentsArray;

        angular.forEach(vm.projectPanels, function(value,index){

            if(value.name == projectName)
            {
                selectedProjectTasksArray = vm.projectPanels[index].taskPanels;
                selectedProjectDocumentsArray = vm.projectPanels[index].documentPanels;
            }

        });

        NewTaskService.deleteTask(selectedProjectTasksArray);
        NewDocumentService.deleteDocument(selectedProjectDocumentsArray);
        removeEntity(vm.projectPanels, 'name', projectName);

    };

    vm.deleteTask = function(taskID)
    {
        removeEntity(NewTaskService.taskPanels, 'id', taskID);
        angular.forEach(vm.projectPanels, function(valueProject,indexProject){
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
        angular.forEach(vm.projectPanels, function(valueProject,indexProject){
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

// ******* INIT FUNCTION TO LOAD DATA FROM DATABASE ********* //

function init()
{
    var data = mongoCrudService.retrieveData().then(function(data)
    {
       for (var i in data)
       {
           console.log(data[i].project);
           if (data[i].project)
           {
               vm.projectPanels.push(data[i].project);
           }
           if (data[i].tasks)
           {
               vm.taskPanels.push(data[i].tasks);
           }
           if (data[i].files)
           {
               vm.documentPanels.push(data[i].files);
           }
           if (data[i].users)
           {
               //vm.users
           }
     }
    });
}

}]);

