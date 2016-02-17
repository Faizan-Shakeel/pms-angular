"use strict";

var app = angular.module('mainViewModule', ['ui.bootstrap', 'nsPopover']);


app.controller('Main_View_Controller', ['$scope', 'ProjectService', 'TaskService', 'DocumentService', 'mongoCrudService', '$localStorage', '$rootScope', 'chatSocket', 'chatService', function ($scope, ProjectService, TaskService, DocumentService, mongoCrudService, $localStorage, $rootScope, chatSocket, chatService)
{
    var vm = this;
    init();

    /*/////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// ACCORDION /////////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

    vm.accordionVisibility = false;

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

    vm.switchAccordionVisibility = function()
    {
        vm.accordionVisibility = !vm.accordionVisibility;

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

    /*/////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// ACCORDION [E N D] /////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////
    //////// DOWNLOADING FILE ////////
    //////////////////////////////////

    vm.downloadFile = function(documentMeta)
    {
        console.log(documentMeta);
        var file = '';
        mongoCrudService.downloadFile(documentMeta, function(file)
        {
            window.open(file);
        })
    }

    ////////////////////////////////////
    ////// DOWNLOADING FILE [END] //////
    ////////////////////////////////////

    /*//////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// CHATTING PANEL /////////////////////////////////////////////////////////////////
     *//////////////////////////////////////////////////////////////////////////////////////////////////

    vm.chatPanelVisibility = false;
    var online = 'fa fa-circle-o';
    var offline = '';
    vm.users = [];
    vm.submitButtonText = 'send';
    var selectedUserObject = {};
    vm.title = 'Chat';
    vm.selectedUser = function(selectedUser)
    {
        //** When user clicks on a person's name in chat list, that person's
        //   data would then be passed to selectedUserObject. **
        vm.messages.length = 0;
        selectedUserObject = selectedUser;
        
            mongoCrudService.retrieveChat($localStorage.currentUser.users.email).then(function(retrievedChatData)
            {
                //** After retrieving the chat data, select the communication between
                //   logged-in user and selected user. **
                var selectedMessages = chatService.selectChat(selectedUserObject, retrievedChatData.users.chatData, $localStorage.currentUser.users.email);
                for (var i=0; i<selectedMessages.length; i++)
                {
                    vm.messages.push(selectedMessages[i]);
                }
                
                //** If there was any message from the selected user, the message flag must
                //   be up. Clear this flag as the logged-in user has read the messages.
                var findMsgFlag = $localStorage.currentUser.users.unreadMessageFlag.indexOf(selectedUserObject.email);
                if (findMsgFlag != -1)
                {
                    $localStorage.currentUser.users.unreadMessageFlag.splice(findMsgFlag, 1);
                    selectedUserObject.name = selectedUserObject.name.replace('(1)','');
                    mongoCrudService.updateChatFlag($localStorage.currentUser.users);
                }                
            });
            
            selectedUserObject.name = selectedUserObject.name.replace('(1)', '');            
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

        // ********* SIMPLE CHAT APPLICATION MODULE ******* //

            var socket = io();
            vm.messages = [];
            vm.username = $localStorage.currentUser.users.name;
            vm.visible = false;
            //** When the user logges-in, send his emailID to server so that his
            //   socketID can be associated with his emailID. **
            chatSocket.emit('user-email', {'userEmail': $localStorage.currentUser.users.email});
            
            vm.sendMessage = function(message, username) 
            {
                if(message && message !== '' && username) 
                {
                    chatSocket.emit('message', {'username': $localStorage.currentUser.users.name, 'userEmail': $localStorage.currentUser.users.email, 'content': message, 'receiverEmail': selectedUserObject.email});
                }

                var findMsgFlag = selectedUserObject.unreadMessageFlag.indexOf($localStorage.currentUser.users.email);
                if (findMsgFlag == -1)
                {
                    selectedUserObject.unreadMessageFlag.push($localStorage.currentUser.users.email);
                    mongoCrudService.updateChatFlag(selectedUserObject);
                    console.log(selectedUserObject);
                }
                
            };

            vm.expandOnNew = true;
            $scope.$on('socket:broadcast', function(event, msg)
            {
               if (msg)
               {
                   for (var i=0; i<vm.users.length; i++)
                   {
                       if (msg.userEmail == vm.users[i].email && msg.receiverEmail == $localStorage.currentUser.users.email)
                       {
                           if (vm.visible == false)
                           {
                               vm.users[i].name = vm.users[i].name + '(1)';                               
                           }
                       }
                   }
                   vm.messages.length = 0;

                   if (selectedUserObject.chatData)
                   {
                        selectedUserObject.chatData.push(msg);
                   
                        var selectedMessages = chatService.selectChat(selectedUserObject, selectedUserObject.chatData, $localStorage.currentUser.users.email);

                        for (var i=0; i<selectedMessages.length; i++)
                        {
                            vm.messages.push(selectedMessages[i]);
                        }
                   }
                   msg = {};
               }
            });


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

    vm.deleteProject = function(projectToDelete)
    {
        var selectedProjectTasksArray;
        var selectedProjectDocumentsArray;
        angular.forEach(vm.projectPanels, function(value,index){

            if(value.name == projectToDelete.name)
            {
                selectedProjectTasksArray = vm.projectPanels[index].tasks;
                selectedProjectDocumentsArray = vm.projectPanels[index].documents;
                //console.log(selectedProjectTasksArray);
            }
        });
        TaskService.deleteTask(selectedProjectTasksArray);
        DocumentService.deleteDocument(selectedProjectDocumentsArray);
        mongoCrudService.deleteData(projectToDelete.id);
        
        removeEntity(vm.projectPanels, 'id', projectToDelete.id);

    };

    vm.deleteTask = function(taskToDelete)
    {
        var deletedTaskProject;
        var selectedTaskDocumentsArray;
        
        angular.forEach(vm.taskPanels, function(value,index){

            if(value.id == taskToDelete.id)
            {
                selectedTaskDocumentsArray = vm.taskPanels[index].documents;
            }
        });
        
        mongoCrudService.deleteData(taskToDelete.id); 
        DocumentService.deleteDocument(selectedTaskDocumentsArray);
        removeEntity(TaskService.getTaskPanels(), 'id', taskToDelete.id);

//        angular.forEach(ProjectService.getProjectPanels(), function(valueProject,indexProject){
//            angular.forEach(valueProject.tasks, function(valueTask,indexTask){
//                if(valueTask.id == taskToDelete.id)
//                {
//                    removeEntity(valueProject.tasks, 'id', taskToDelete.id);
//                }
//            });
//        });

        for(var project of ProjectService.getProjectPanels())
        {
            for(var task of project.tasks)
            {
                if(task.id == taskToDelete.id)
                {
                    deletedTaskProject = project;
                    removeEntity(project.tasks, 'id', taskToDelete.id);
                    console.log(deletedTaskProject);
                    mongoCrudService.updateData(deletedTaskProject.id, {'project.tasks': deletedTaskProject.tasks});
                    break;
                }
            }
        }

        if(deletedTaskProject)
        {
            for(var taskToDeleteDoc of selectedTaskDocumentsArray)
            {
                for(var document of deletedTaskProject.documents)
                {
                    if(document.id == taskToDeleteDoc.id)
                    {
                        removeEntity(deletedTaskProject.documents, 'id', taskToDeleteDoc.id);
                        console.log(deletedTaskProject);
                    }
                }
            }
        }

    };

    vm.deleteDocument = function(documentToDelete)
    {
        removeEntity(DocumentService.getDocumentPanels(), 'id', documentToDelete.id);

        angular.forEach(vm.projectPanels, function(valueProject,indexProject){
            angular.forEach(valueProject.documents, function(valueDocument,indexDocument){
                if(valueDocument.id == documentToDelete.id)
                {
                    removeEntity(valueProject.documents, 'id', documentToDelete.id);
                    console.log(valueProject);
                    mongoCrudService.updateData(valueProject.id, {'project.documents': valueProject.documents});
                }
            });
        });
        
        angular.forEach(vm.taskPanels, function(valueTask,indexProject){
            angular.forEach(valueTask.documents, function(valueDocument,indexDocument){
                if(valueDocument.id == documentToDelete.id)
                {
                    removeEntity(valueTask.documents, 'id', documentToDelete.id);
                    console.log(valueTask);
                    mongoCrudService.updateData(valueTask.id, {'tasks.documents': valueTask.documents});
                }
            });
        });
                
        mongoCrudService.deleteData(documentToDelete.id);
        mongoCrudService.deleteFile(documentToDelete.url);
//        console.log(ProjectService.projectPanels);

//        for(var project of ProjectService.projectPanels)
//        {
//            for(var doc of project.documents)
//            {
//                if(doc.id == documentToDelete.id)
//                {
//                    removeEntity(project.documents, 'id', documentToDelete.id);
//                    break;
//                }
//            }
//        }
//
//        for(var task of TaskService.taskPanels)
//        {
//            for(var doc of task.documents)
//            {
//                if(doc.id == documentToDelete.id)
//                {
//                    removeEntity(task.documents, 'id', documentToDelete.id);
//                    break;
//                }
//            }
//        }
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

    /*///////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// TABS AND PANELS [E N D] /////////////////////////////////////////////////////////
     *//////////////////////////////////////////////////////////////////////////////////////////////////

// ******* INIT FUNCTION TO LOAD DATA FROM DATABASE ********* //

function init()
{
    mongoCrudService.retrieveData().then(function(data)
    {
       for (var i in data)
       {
           if (data[i].project)
           {
               vm.projectPanels.push(data[i].project);
           }
           if (data[i].tasks)
           {
               vm.taskPanels.push(data[i].tasks);
           }
           if (data[i].documents)
           {
               vm.documentPanels.push(data[i].documents);
           }
           if (data[i].users)
           {
               if (data[i].users.email != $localStorage.currentUser.users.email)
               {
                   vm.users.push(data[i].users);
               }
               else if (data[i].users.email == $localStorage.currentUser.users.email)
               {                   
                    $localStorage.currentUser.users = data[i].users;                       
               }
           }           
        }
        vm.users = chatService.checkMsgStatus(vm.users);
    });
}
}]);

