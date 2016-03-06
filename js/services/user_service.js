"use strict";
/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('userServiceModule', []);

app.service('UserService', ['NotificationsAndHistoryService', function (NotificationsAndHistoryService)
{
    var accordionInfo;
    var userPanels = [];
    var usersIdArray = [];
    var action;
    var action2;
    var actionBy;
    var elementType;
    var elementType2;
    var element2;
    var historyObject;

    var createUserPanel = function(newUserObject)
    {
        "use strict";

        angular.forEach(newUserObject, function(value, index){
            userPanels.push(newUserObject[index]);

            action = 'created';
            actionBy = 'User';
            elementType = 'User';

            NotificationsAndHistoryService.addNotifications(newUserObject[index], action, actionBy, elementType);

            accordionInfo = NotificationsAndHistoryService.getAccordionStatus();
            NotificationsAndHistoryService.setNotificationsCount(accordionInfo.isSecondOpen, accordionInfo.accVisibility);

            historyObject = {elementType: elementType, element: newUserObject[index]};
            NotificationsAndHistoryService.makeHistory(historyObject);

        });
    };

    var checkUserExistenceByEmail = function(userEmail)
    {
        "use strict";
//                        console.log("Global Docs AFTER : " + JSON.stringify(UserService.getUserPanels()));

        var userAlreadyExists = false;

        for(var userPanel of userPanels)
        {
            if(userPanel.email == userEmail)
            {
                userAlreadyExists = true;
                break;
            }
        }
        return userAlreadyExists;
    };

    var checkUsersExistence = function(userSet1, userSet2)
    {
        "use strict";

        var userExists;
        var newUsers = [];

        for(var user of userSet1)
        {
            userExists = false;

            for(var userModal of userSet2)
            {
                if(userModal.email == user.email)
                {
                    userExists = true;
                    break;
                }
            }

            if(!userExists)
            {
                newUsers.push(user);
            }
        }

        return newUsers;

    };

    var newUserID = function()
    {
        "use strict";

        var userID = usersIdArray.length;
        usersIdArray.push(userID);

        return userID;
    };

    var getUserPanels = function(){
        "use strict";

        return userPanels;
    };

    var getUserByEmail = function(userEmail)
    {
        for(var userGlobal of userPanels)
        {
            if(userGlobal.email == userEmail)
            {
                return userGlobal;
            }
        }
    };

    var getProjectUsers = function(projectUsersIds)
    {
        var projectUsersArray = [];

        for(var userGlobal of userPanels)
        {
            for(var projectUser of projectUsersIds)
            {
                if(projectUser.id == userGlobal.id)
                {
                    projectUsersArray.push(userGlobal);
                }
            }
        }

        return projectUsersArray;

    };

    var getTaskUsers = function(taskUsersIds)
    {
        var taskUsersArray = [];

        for(var userGlobal of userPanels)
        {
            for(var taskUser of taskUsersIds)
            {
                if(taskUser.id == userGlobal.id)
                {
                    taskUsersArray.push(userGlobal);
                }
            }
        }

        return taskUsersArray;

    };

    var deleteUserModal = function(selectedUserToDelete, modalUsersArray)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(UserService.getUserPanels()));

        removeEntity(modalUsersArray, 'id', 'project', selectedUserToDelete.id, selectedUserToDelete.project);
    };

    var deleteUserInTaskModal = function(selectedUserToDelete, modalUsersArray)
    {
        "use strict";

        removeEntity(modalUsersArray, 'id', 'email', selectedUserToDelete.id, selectedUserToDelete.email);
    };

    var deleteProjectFromUser = function(usersToDelete, projectName)
    {
        var deleteFromUser;

        for(var user of usersToDelete)
        {
            for(var userGlobal of userPanels)
            {
                if(user.email == userGlobal.email)
                {
                    deleteFromUser = userGlobal;
                    break;
                }
            }

            for(var project of deleteFromUser.projects)
            {
                if(project.name == projectName)
                {
                    removeEntity(deleteFromUser.projects, 'id', 'name', project.id, project.name);

                    actionBy = 'User';
                    action = 'deleted';
                    action2 = projectName;
                    elementType = 'from user';
                    elementType2 = 'Project';
                    element2 = project;

                    NotificationsAndHistoryService.addNotifications(deleteFromUser, action, actionBy, elementType, action2, elementType2, element2);

                    accordionInfo = NotificationsAndHistoryService.getAccordionStatus();
                    NotificationsAndHistoryService.setNotificationsCount(accordionInfo.isSecondOpen, accordionInfo.accVisibility);

                }
            }
        }
    };

    var deleteTaskFromUser = function(usersToDelete, taskId)
    {
        var deleteFromUser;

        for(var user of usersToDelete)
        {
            for(var userGlobal of userPanels)
            {
                if(user.email == userGlobal.email)
                {
                    deleteFromUser = userGlobal;
                    break;
                }
            }

            for(var task of deleteFromUser.tasks)
            {
                console.log("task : " + JSON.stringify(task));

                if(task.id == taskId)
                {
                    console.log("taskId : " + JSON.stringify(task));

                    removeEntity(deleteFromUser.tasks, 'id', 'name', task.id, task.name);

                    actionBy = 'User';
                    action = 'deleted';
                    action2 = task.name;
                    elementType = 'from user';
                    elementType2 = 'Task';
                    element2 = task;

                    NotificationsAndHistoryService.addNotifications(deleteFromUser, action, actionBy, elementType, action2, elementType2, element2);

                    accordionInfo = NotificationsAndHistoryService.getAccordionStatus();
                    NotificationsAndHistoryService.setNotificationsCount(accordionInfo.isSecondOpen, accordionInfo.accVisibility);

                }
            }
        }
    };

    var updateUserRole = function(updatedUsers, projectName)
    {
        var globalUserProjects;

        for(var userUpd of updatedUsers)
        {
            for(var userGlobal of userPanels)
            {
                if(userGlobal.email == userUpd.email)
                {
                    globalUserProjects = userGlobal.projects;

                }
            }

            for(var project of globalUserProjects)
            {
                if(project.name == projectName)
                {
                    project.role = userUpd.newRole;
                }
            }
        }
    };


    var updateUserRoleInModal = function(modalUsers, updatedUsers, projectName)
    {
        var ModalUserProjects;

        for(var userUpdated of updatedUsers)
        {
            for(var userModal of modalUsers)
            {
                if(userModal.email == userUpdated.email)
                {
                    ModalUserProjects = userModal.projects;
                }
            }

            for(var project of ModalUserProjects)
            {
                if(project.name == projectName)
                {
                    project.role = userUpdated.newRole;
                }
            }
        }
    };

    var addProjectToUser = function(usersArray, projectId, projectName, userRole)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(UserService.getUserPanels()));

        console.log("lasondoiansasdasd lasondoiansasdasd lasondoiansasdasd");

        var userToUpdate;
        var projectObject = {id: projectId, name: projectName, role: userRole};

        for(var userModal of usersArray)
        {
            var projectAlreadyExistsInUser = false;

            for(var userGlobal of userPanels)
            {
                if(userModal.email == userGlobal.email)
                {
                    userToUpdate = userGlobal;
                    break;
                }
            }

            if(userToUpdate)
            {
                for(var userProject of userToUpdate.projects)
                {
                    if(userProject.name == projectName)
                    {
                        projectAlreadyExistsInUser = true;
                    }
                }

                if(!projectAlreadyExistsInUser)
                {
                    userToUpdate.projects.push(JSON.parse(JSON.stringify(projectObject)));

                    actionBy = 'User';
                    action = 'assigned ';
                    action2 = projectObject.name;
                    elementType = 'to user';
                    elementType2 = 'Project';
                    element2 = projectObject;

                    NotificationsAndHistoryService.addNotifications(userToUpdate, action, actionBy, elementType, action2, elementType2, element2);

                    accordionInfo = NotificationsAndHistoryService.getAccordionStatus();
                    NotificationsAndHistoryService.setNotificationsCount(accordionInfo.isSecondOpen, accordionInfo.accVisibility);

                }
            }
//        <a href="" ng-click="ModalVM.infoElement(notification.elementType, notification.element)">
        }

    };

    var addTaskToUser = function(usersArray, taskId, taskName)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(UserService.getUserPanels()));

        var taskIdObject = {id: taskId, name: taskName};

        for(var userGlobal of userPanels)
        {
            for(var userModal of usersArray)
            {
                if(userModal.email == userGlobal.email)
                {
                    userGlobal.tasks.push(JSON.parse(JSON.stringify(taskIdObject)));

                    actionBy = 'User';
                    action = 'assigned ';
                    action2 = taskIdObject.name;
                    elementType = 'to user';
                    elementType2 = 'Task';
                    element2 = taskIdObject;

                    NotificationsAndHistoryService.addNotifications(userGlobal, action, actionBy, elementType, action2, elementType2, element2);

                    accordionInfo = NotificationsAndHistoryService.getAccordionStatus();
                    NotificationsAndHistoryService.setNotificationsCount(accordionInfo.isSecondOpen, accordionInfo.accVisibility);

                }
            }
        }

    };


    var removeUsersExistingInProjectOrTask = function(usersInModal)
    {
        var filteredArray = [];
        var userNotFound;

        for(var userGlobal of userPanels)
        {
            userNotFound = true;

            for(var userModal of usersInModal)
            {
                if(userModal.email == userGlobal.email)
                {
                    userNotFound = false;
                    break;
                }
            }

            if(userNotFound)
            {
                filteredArray.push(userGlobal);
            }
        }

        return filteredArray;

    };

    var removeEntity = function(arr, attr, attr2, value, value2)
    {
        "use strict";

        var i = arr.length;
        while(i--){
            if( arr[i]
                && arr[i].hasOwnProperty(attr)
                && (arguments.length > 2 && arr[i][attr] === value && arr[i][attr2] === value2) ){

                arr.splice(i,1);
            }
        }
        return arr;
    };

    return{
        checkUserExistenceByEmail: checkUserExistenceByEmail,
        checkUsersExistence: checkUsersExistence,
        newUserID: newUserID,
        createUserPanel: createUserPanel,
        getUserPanels: getUserPanels,
        getUserByEmail: getUserByEmail,
        getProjectUsers: getProjectUsers,
        getTaskUsers: getTaskUsers,
        addProjectToUser: addProjectToUser,
        addTaskToUser: addTaskToUser,
        updateUserRole: updateUserRole,
        updateUserRoleInModal: updateUserRoleInModal,
        deleteUserModal: deleteUserModal,
        deleteProjectFromUser: deleteProjectFromUser,
        deleteTaskFromUser: deleteTaskFromUser,
        deleteUserInTaskModal: deleteUserInTaskModal,
        removeUsersExistingInProjectOrTask: removeUsersExistingInProjectOrTask
    };

}]);

