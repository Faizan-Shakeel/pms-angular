"use strict";

var app = angular.module('mainViewModule', ['ui.bootstrap', 'nsPopover']);

app.controller('Main_View_Controller', ['$scope', 'ProjectService', 'TaskService', 'DocumentService', 'UserService', 'NotificationsAndHistoryService', '$filter', '$timeout', 'mongoCrudService', '$localStorage', '$rootScope', 'chatSocket', 'chatService', function ($scope, ProjectService, TaskService, DocumentService, UserService, NotificationsAndHistoryService, $filter, $timeout, mongoCrudService, $localStorage, $rootScope, chatSocket, chatService)
{
    var vm = this;
    var accInfoObject;    
    init();
    var loggedInUserName = $localStorage.currentUser.users.name;        
    var userNameMaxLength = 17;
    loggedInUserName = loggedInUserName.substring(0, userNameMaxLength);
    
    if ($localStorage.currentUser.users.imageUrl != '')
    {
        vm.userImageUrl = 'images/profile_pictures/' + $localStorage.currentUser.users.imageUrl;        
    }
    else
    {
        vm.userImageUrl = 'images/profile_pictures/default-user-image.png';
    }

    /*/////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// ACCORDION /////////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

    vm.onlineUsersCount = 0;
    vm.notificationsCount = {count: 0};
    vm.loggedInUserName = loggedInUserName;
    vm.globalHistory = NotificationsAndHistoryService.getHistory();
    vm.globalNotifications = NotificationsAndHistoryService.getNotifications();
    vm.notificationsCount = NotificationsAndHistoryService.globalNotificationsCount;

    vm.accordionVisibility = false;

    vm.oneAtATime = true;

    vm.accordionStatus = {
        isFirstOpen: true,
        isSecondOpen: false,
        isThirdOpen: false,
        isFirstDisabled: false
    };

    accInfoObject = {isSecondOpen: vm.accordionStatus.isSecondOpen, accVisibility: vm.accordionVisibility};
    NotificationsAndHistoryService.setAccordionStatus(accInfoObject);

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
        accInfoObject = {isSecondOpen: vm.accordionStatus.isSecondOpen, accVisibility: vm.accordionVisibility};
        NotificationsAndHistoryService.setAccordionStatus(accInfoObject);
        NotificationsAndHistoryService.clearNotificationsAccordion();

        if(vm.chatPanelVisibility)
        {
            if(vm.accordionVisibility)
            {
                vm.globalTabsBootstrapClass = 'col-lg-12 col-md-12 col-sm-12';
            }
            else
            {
                vm.globalTabsBootstrapClass = 'col-lg-10 col-md-10 col-sm-9';
            }
        }
        else
        {
            if(vm.accordionVisibility)
            {
                vm.globalTabsBootstrapClass = 'col-lg-10 col-md-10 col-sm-9';
            }
            else
            {
                vm.globalTabsBootstrapClass = 'col-lg-8 col-md-8 col-sm-6';
            }
        }
    };

    vm.updateAccordionInfo = function()
    {
        accInfoObject = {isSecondOpen: vm.accordionStatus.isSecondOpen, accVisibility: vm.accordionVisibility};
        NotificationsAndHistoryService.setAccordionStatus(accInfoObject);
        NotificationsAndHistoryService.clearNotificationsSecondOpen();
    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// ACCORDION [E N D] /////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////
    //////// DOWNLOADING FILE ////////
    //////////////////////////////////
    var fileReader = new FileReader();
    vm.downloadFile = function(documentMeta)
    {
        var element = window.document.createElement('a');
        document.body.appendChild(element);
        mongoCrudService.downloadFile(documentMeta, function(file)
        {
            element.href = file;
            element.download = documentMeta.fileName;
            element.click();
            document.body.removeChild(element);
        });
    };



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
        vm.colleagueName = selectedUser.name;
        vm.messages.length = 0;
        selectedUserObject = selectedUser;
        
            mongoCrudService.retrieveChat($localStorage.currentUser.users.email).then(function(retrievedChatData)
            {
                //** After retrieving the chat data, select the communication between
                //   logged-in user and selected user. **
                var selectedMessages = chatService.selectChat(selectedUserObject, retrievedChatData.users.chatData, $localStorage.currentUser.users.email);
                for (var i=0; i<selectedMessages.length; i++)
                {
                   vm.messages.push(selectedMessages[i].content);
                }
                
                //** If there was any message from the selected user, the message flag must
                //   be up. Clear this flag as the logged-in user has read the messages.
                var findMsgFlag = $localStorage.currentUser.users.unreadMessageFlag.indexOf(selectedUserObject.email);
                if (findMsgFlag != -1)
                {
                    $localStorage.currentUser.users.unreadMessageFlag.splice(findMsgFlag, 1);
                    mongoCrudService.updateChatFlag($localStorage.currentUser.users);
                }                
            });
            vm.checkForMsgFlag = '';
            vm.visible = !vm.visible;
    };

    vm.closeChatWindow = function()
    {
        vm.visible = !vm.visible;  
    }
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
                vm.globalTabsBootstrapClass = 'col-lg-10 col-md-10 col-sm-9';
            }
        }
        else
        {
            if(vm.chatPanelVisibility)
            {
                vm.globalTabsBootstrapClass = 'col-lg-10 col-md-10 col-sm-9';
            }
            else
            {
                vm.globalTabsBootstrapClass = 'col-lg-8 col-md-8 col-sm-6';
            }
        }
    };

        // ********* SIMPLE CHAT APPLICATION MODULE ******* //

            var socket = io();
            vm.messages = [];
            //vm.username = $localStorage.currentUser.users.name;                
            vm.chatUserInfoObject = {userName: $localStorage.currentUser.users.name, userId: $localStorage.currentUser.users.email, avatar: vm.userImageUrl};

            vm.visible = false;
            //** When the user logges-in, send his emailID along with his company name to server 
            //   so that his socketID can be associated with his emailID. **
            chatSocket.emit('user-email', {'userEmail': $localStorage.currentUser.users.email, 'companyName':$localStorage.companyName});
            
            vm.sendMessage = function(message) 
            {
                if(message && message.text !== '') 
                {   
                    // message.userName = $localStorage.currentUser.users.name;
                    // message.userId = $localStorage.currentUser.users.email;
                    // vm.messages.push(message);
                    chatSocket.emit('message', {'username': $localStorage.currentUser.users.name, 'userEmail': $localStorage.currentUser.users.email, 'content': message, 'receiverEmail': selectedUserObject.email});
                }

                var findMsgFlag = selectedUserObject.unreadMessageFlag.indexOf($localStorage.currentUser.users.email);
                if (findMsgFlag == -1)
                {
                    selectedUserObject.unreadMessageFlag.push($localStorage.currentUser.users.email);
                    mongoCrudService.updateChatFlag(selectedUserObject);                    
                }          
            };

            vm.expandOnNew = true;
            $scope.$on('socket:broadcast', function(event, msg)
            {
                   for (var i=0; i<vm.users.length; i++)
                   {
                       if (msg.userEmail == vm.users[i].email && msg.receiverEmail == $localStorage.currentUser.users.email)
                       {
                           if (vm.visible == false)
                           {
                               //vm.users[i].name = vm.users[i].name + '(1)';
                               vm.checkForMsgFlag = vm.users[i].email;                            
                           }
                       }
                   }
                   if ($localStorage.currentUser.users.email != msg.userEmail && selectedUserObject.email == msg.userEmail)
                   {
                        vm.messages.push(msg.content);
                   }
                   msg = {};
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

    vm.dropdownItems = [{name: 'Projects', icon: 'fa fa-bar-chart-o', id: 'dropdown-icon-project'}, {name: 'Tasks', icon: 'fa fa-tasks', id: 'dropdown-icon-task'}, {name: 'Documents', icon: 'fa fa-files-o', id: 'dropdown-icon-document'}, {name: 'Users', icon: 'fa fa-users', id: 'dropdown-icon-user'}];

    vm.selectedItem = vm.dropdownItems[0].name;

    vm.globalSearchDropDown = function (item) {

        if(vm.searchProjects)
        {
            if(vm.searchProjects.name)
            {
                vm.projectPanelsFilter = vm.projectPanels;
                vm.taskPanelsFilter = vm.taskPanels;
                vm.documentPanelsFilter = vm.documentPanels;
                vm.userPanelsFilter = vm.userPanels;
                vm.inputSearchFilter(vm.searchProjects, 'redirect');
            }
        }

        vm.selectedItem = item;
        vm.active = {}; //reset
        vm.active[item] = true;

        if(item == "Projects")
        {
            vm.projectVisibility = true;
            vm.taskVisibility = false;
            vm.documentVisibility = false;
            vm.userVisibility = false;
        }
        else if(item == "Tasks")
        {
            vm.projectVisibility = false;
            vm.taskVisibility = true;
            vm.documentVisibility = false;
            vm.userVisibility = false;
        }
        else if(item == "Documents")
        {
            vm.projectVisibility = false;
            vm.taskVisibility = false;
            vm.documentVisibility = true;
            vm.userVisibility = false;
        }
        else if(item == "Users")
        {
            vm.projectVisibility = false;
            vm.taskVisibility = false;
            vm.documentVisibility = false;
            vm.userVisibility = true;
        }

    };

    vm.displayPopover = false;

    vm.inputSearchFilter = function(userInput, redirect)
    {
        if(redirect)
        {
            $timeout(function() {
                if(vm.selectedItem == "Projects")
                {
                    vm.projectPanelsFilter = $filter('filter')(vm.projectPanels, userInput);
                }
                else if(vm.selectedItem == "Tasks")
                {
                    vm.taskPanelsFilter = $filter('filter')(vm.taskPanels, userInput);
                }
                else if(vm.selectedItem == "Documents")
                {
                    vm.documentPanelsFilter = $filter('filter')(vm.documentPanels, userInput);
                }
                else if(vm.selectedItem == "Users")
                {
                    vm.userPanelsFilter = $filter('filter')(vm.userPanels, userInput);
                }
            }, 25);
        }
        else
        {
            if(vm.selectedItem == "Projects")
            {
                vm.projectPanelsFilter = $filter('filter')(vm.projectPanels, userInput);
            }
            else if(vm.selectedItem == "Tasks")
            {
                vm.taskPanelsFilter = $filter('filter')(vm.taskPanels, userInput);
            }
            else if(vm.selectedItem == "Documents")
            {
                vm.documentPanelsFilter = $filter('filter')(vm.documentPanels, userInput);
            }
            else if(vm.selectedItem == "Users")
            {
                vm.userPanelsFilter = $filter('filter')(vm.userPanels, userInput);
            }
        }
    };

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// NAV BAR [E N D] //////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// TABS AND PANELS ///////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

    vm.globalTabsBootstrapClass = 'col-lg-8 col-md-8 col-sm-6';

    vm.projectPanels = ProjectService.getProjectPanels();
    vm.taskPanels = TaskService.getTaskPanels();
    vm.documentPanels = DocumentService.getDocumentPanels();
    vm.userPanels = UserService.getUserPanels();
    vm.projectPanelsFilter = vm.projectPanels;
    vm.taskPanelsFilter = vm.taskPanels;
    vm.documentPanelsFilter = vm.documentPanels;
    vm.userPanelsFilter = vm.userPanels;

    vm.deleteProject = function(projectToDelete, modalControllerScope)
    {
        var deletionConfirmed = function()
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
            mongoCrudService.deleteData(projectToDelete.id);
            removeEntity(vm.projectPanels, 'id', projectToDelete.id);
        };

        modalControllerScope.confirmationModal(deletionConfirmed);
    };

    vm.deleteTask = function(taskToDelete, modalControllerScope)
    {
        var deletionConfirmed = function()
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
            mongoCrudService.deleteData(taskToDelete.id);

        };

        modalControllerScope.confirmationModal(deletionConfirmed);

    };

    vm.deleteDocument = function(documentToDelete, modalControllerScope)
    {
        var deletionConfirmed = function()
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
        mongoCrudService.deleteData(documentToDelete.id);
        mongoCrudService.deleteFile(documentToDelete.url);
        };
        modalControllerScope.confirmationModal(deletionConfirmed);
    };

    vm.deleteUser = function(userToDelete, modalControllerScope)
    {
        var deletionConfirmed = function()
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
            mongoCrudService.deleteData(userToDelete.id);
        };

        modalControllerScope.confirmationModal(deletionConfirmed);

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

// ******* INIT FUNCTION TO LOAD DATA FROM DATABASE ********* //

function init()
{
    mongoCrudService.retrieveData().then(function(data)
    {
        vm.projectPanels.length = 0;
        vm.taskPanels.length = 0;
        vm.documentPanels.length = 0;
        vm.userPanels.length = 0;
       
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
                   vm.userPanels.push(data[i].users);
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
    });
};

    $scope.$watch("MainViewVM.projectPanels", function( newValue, oldValue )
    {
        vm.projectPanelsFilter = vm.projectPanels
    }, true);

    $scope.$watch("MainViewVM.taskPanels", function( newValue, oldValue )
    {
        vm.taskPanelsFilter = vm.taskPanels
    }, true);

    $scope.$watch("MainViewVM.documentPanels", function( newValue, oldValue )
    {
        vm.documentPanelsFilter = vm.documentPanels
    }, true);

    $scope.$watch("MainViewVM.userPanels", function( newValue, oldValue )
    {
        vm.userPanelsFilter = vm.userPanels
    }, true);

}]);

