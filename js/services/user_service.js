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

        angular.forEach(newUserObject, function(value, index){
            userPanels.push(newUserObject[index]);
        });
    };

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

    var checkUserExistence = function(userName, usersArray)
    {
        "use strict";
//                        console.log("Global Docs AFTER : " + JSON.stringify(UserService.getUserPanels()));

        var userAlreadyExists = false;

        for(var doc of usersArray)
        {
            if(doc.name == userName)
            {
                userAlreadyExists = true;
                break;
            }
            else
            {
                userAlreadyExists = false;
            }
        }

        return userAlreadyExists;

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

    var addTaskToUser = function(usersArray, taskName)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(UserService.getUserPanels()));

        angular.forEach(usersArray, function(value, index)
        {
            usersArray[index].task = taskName;
        });
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

    return{
        newUserID: newUserID,
        checkUserExistence: checkUserExistence,
        chkTaskDocsInPrjDocsWithoutPrjName: chkTaskDocsInPrjDocsWithoutPrjName,
        createUserPanel: createUserPanel,
        updatedUserParams: updatedUserParams,
        getUserPanels: getUserPanels,
        deleteUser: deleteUser,
        deleteUserModal: deleteUserModal,
        deleteUserGlobal: deleteUserGlobal,
        deleteFloatingUsers: deleteFloatingUsers,
        deleteUsersFromModalTask: deleteUsersFromModalTask,
        hasDuplicates: hasDuplicates,
        addTaskToUser: addTaskToUser,
        updateUsers: updateUsers,
        removePrjDocsFromExistingDocs: removePrjDocsFromExistingDocs,
        removeTaskDocsFromExistingDocs: removeTaskDocsFromExistingDocs
    };

});
