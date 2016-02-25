"use strict";
/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('userServiceModule', []);

app.service('UserService', function(){

    var userPanels = [];
    var usersIdArray = [];

    var createUserPanel = function(newUserObject)
    {
        "use strict";

//        newUserObject = [{
//            'id': 0,
//            'name': 'User 1',
//            'email': 'user1@gmail.com',
//            'designation': '',
//            'projects': [],
//            'tasks': [],
//            'documents': []
//        }];

        angular.forEach(newUserObject, function(value, index){
            userPanels.push(newUserObject[index]);
        });
    };

//    createUserPanel();

    var updatedUserParams = function(updated_user)
    {
        for(var userToUpdate of userPanels)
        {
            if(userToUpdate.id == updated_user.id)
            {
                userToUpdate.description = updated_user.description;

                break;
            }
        }
    };

    var checkUsersExistence = function(userSet1, userSet2)
    {
        "use strict";
//                        console.log("Global Docs AFTER : " + JSON.stringify(UserService.getUserPanels()));

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

    var chkTaskDocsInPrjDocsWithoutPrjName = function(taskDocs, modalDocs)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(UserService.getUserPanels()));

        var userAlreadyExists = false;

        for(var tDoc of taskDocs)
        {
            for(var mDoc of modalDocs)
            {
                if(tDoc.name == mDoc.name)
                {
                    userAlreadyExists = true;
                    return {status: userAlreadyExists, existingUser: mDoc.name};
                    break;
                }
                else
                {
                    userAlreadyExists = false;
                }
            }
        }

        return userAlreadyExists;

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

    var getUserById = function(userId)
    {
        for(var userGlobal of userPanels)
        {
            if(userGlobal.id == userId)
            {
                return userGlobal;
            }
        }
    };

//    console.log("User Info : " + JSON.stringify(getUserById(0)));

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

    var deleteUser = function(usersArray)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(UserService.getUserPanels()));

        angular.forEach(usersArray, function(valueFromGlobalList,indexGlobalList){
            angular.forEach(userPanels, function(valueFromSpecificProject,indexSpecificProject){
                if(valueFromGlobalList.id == valueFromSpecificProject.id)
                {
                    userPanels = removeEntity(userPanels, 'id', 'project', valueFromGlobalList.id, valueFromGlobalList.project);
                }
            });
        });
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
        //                        console.log("Global Docs AFTER : " + JSON.stringify(UserService.getUserPanels()));

        removeEntity(modalUsersArray, 'id', 'email', selectedUserToDelete.id, selectedUserToDelete.email);
    };

    var deleteUserGlobal = function(usersToDelete, deleteFrom)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(UserService.getUserPanels()));

        for(var user of usersToDelete)
        {
            removeEntity(deleteFrom, 'id', 'project', user.id, user.project);
        }
    };

    var deleteFloatingUsers = function(floatingUsers)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(UserService.getUserPanels()));

        for(var floatUser of floatingUsers)
        {

            for(var user of userPanels)
            {
                if(!(user.project) && (user.id == floatUser.id))
                {
                    console.log("userPanels : " + JSON.stringify(userPanels));

                    removeEntity(userPanels, 'id', 'project', user.id, user.project);

                    console.log("userPanels : " + JSON.stringify(userPanels));
                }
            }
        }
    };

    var deleteUsersFromModalTask = function(docToDelete, modalTasks)
    {
        var userDeletedFlag = false;

        if(docToDelete.task)
        {
            for (var task of modalTasks)
            {
                if(task.name == docToDelete.task)
                {
                    removeEntity(task.users, 'id', 'project', docToDelete.id, docToDelete.project);
                    userDeletedFlag = true;
                }
            }
        }

        return userDeletedFlag;

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
                if(task.id == taskId)
                {
                    removeEntity(deleteFromUser.tasks, 'id', 'name', task.id, task.name);
                }
            }
        }
    };

    var addProjectToUser = function(usersArray, projectId, projectName)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(UserService.getUserPanels()));

        var userToUpdate;
        var projectNameObject = {id: projectId, name: projectName};

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
                    userToUpdate.projects.push(projectNameObject);
                }
            }

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
//                    userModal.tasks.push(taskIdObject);
                    userGlobal.tasks.push(taskIdObject);
                }
            }
        }

    };

    var updateUsers = function(updatedUsers, global)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(UserService.getUserPanels()));

        for(var i=0; i<updatedUsers.length; i++)
        {
            for(var j=0; j<userPanels.length; j++)
            {
                if(userPanels[j].id == updatedUsers[i].id)
                {
                    userPanels[j] = updatedUsers[i];
                    if(global)
                    {
                        return userPanels[j];
                    }
                }
            }
        }
    };

    var removePrjDocsFromExistingDocs = function(projectUsers, projectName)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(UserService.getUserPanels()));

        var filteredArray = [];
        var userNotFound;

        for(var user of userPanels)
        {
            userNotFound = true;

            console.log("user" + JSON.stringify(user));

            if(projectUsers.length)
            {
                console.log("TTWWOO");

                for(var projectUser of projectUsers)
                {
                    console.log("TTHHRREE");

                    if((projectUser.name == user.name) || (user.project == projectName) || (user.task))
                    {
                        userNotFound = false;
                        break;
                    }
                }
            }

            else if(user.project == projectName)
            {
                console.log("FFOOUURR");

                userNotFound = false;
            }

            else if(user.task)
            {
                userNotFound = false;
            }

            if(userNotFound)
            {
                filteredArray.push(user);
            }
        }

        return filteredArray;

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

    var removeTaskDocsFromExistingDocs = function(taskUsers, taskName)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(UserService.getUserPanels()));

        var filteredArray = [];
        var userNotFound;

        for(var user of userPanels)
        {
            userNotFound = true;

            console.log("user" + JSON.stringify(user));

            if(taskUsers.length)
            {
                console.log("TTWWOO");

                for(var taskDoc of taskUsers)
                {
                    console.log("TTHHRREE");

                    if((taskDoc.name == user.name) || (user.task == taskName) || (user.project))
                    {
                        userNotFound = false;
                        break;
                    }
                }
            }

            else if(user.task == taskName)
            {
                console.log("FFOOUURR");

                userNotFound = false;
            }

            else if(user.project)
            {
                userNotFound = false;
            }

            if(userNotFound)
            {
                filteredArray.push(user);
            }
        }

        return filteredArray;

    };

    var hasDuplicates = function(array)
    {
        "use strict";

        return (new Set(array)).size !== array.length;
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

//    var deleteUserModal = function(selectedUserToDelete, modalUsersArray)
//    {
//        "use strict";
//        //                        console.log("Global Docs AFTER : " + JSON.stringify(UserService.getUserPanels()));
//
//        removeEntity(modalUsersArray, 'id', 'project', selectedUserToDelete.id, selectedUserToDelete.project);
//    };

    return{
        newUserID: newUserID,
        checkUsersExistence: checkUsersExistence,
        chkTaskDocsInPrjDocsWithoutPrjName: chkTaskDocsInPrjDocsWithoutPrjName,
        createUserPanel: createUserPanel,
        updatedUserParams: updatedUserParams,
        getUserPanels: getUserPanels,
        getUserByEmail: getUserByEmail,
        getUserById: getUserById,
        getProjectUsers: getProjectUsers,
        getTaskUsers: getTaskUsers,
        deleteUser: deleteUser,
        deleteUserModal: deleteUserModal,
        deleteUserInTaskModal: deleteUserInTaskModal,
        deleteUserGlobal: deleteUserGlobal,
        deleteFloatingUsers: deleteFloatingUsers,
        deleteUsersFromModalTask: deleteUsersFromModalTask,
        deleteProjectFromUser: deleteProjectFromUser,
        deleteTaskFromUser: deleteTaskFromUser,
        hasDuplicates: hasDuplicates,
        addProjectToUser: addProjectToUser,
        addTaskToUser: addTaskToUser,
        updateUsers: updateUsers,
        removePrjDocsFromExistingDocs: removePrjDocsFromExistingDocs,
        removeTaskDocsFromExistingDocs: removeTaskDocsFromExistingDocs,
        removeUsersExistingInProjectOrTask: removeUsersExistingInProjectOrTask
    };

});
