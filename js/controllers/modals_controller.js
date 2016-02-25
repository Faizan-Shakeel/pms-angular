"use strict";

var app = angular.module('modalsModule', ['ui.bootstrap']);

app.controller('ModalsController', ['$scope', '$rootScope', '$uibModal', 'ProjectService','TaskService', function ($scope, $rootScope, $uibModal, ProjectService ,TaskService) {

    var vm = this;

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Project Info /////// [ Global ] //////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.infoProjectModal = function (projectInfo) {

//        console.log("projectInfo Global : " + JSON.stringify(projectInfo));

        var editProjectModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/project_info.html',
            controller: 'InfoProjectModalInstanceController',
            controllerAs: 'ModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        projectInfo: JSON.parse(JSON.stringify(projectInfo))
                    };
                }
            }
        });

        editProjectModalInstance.result.then(function ()
        {

        }, function () {

        });
    };
    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For Project Info /////// [ Global ] /////////////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Task Info ////////// [ Global ] //////////////////////////////////////////////////////
     *//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.infoTaskModal = function (taskInfo) {

        var editTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/task_info.html',
            controller: 'InfoTaskModalInstanceController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        taskInfo: JSON.parse(JSON.stringify(taskInfo))
                    };
                }
            }
        });

        editTaskModalInstance.result.then(function ()
        {

        }, function () {

        });
    };
    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For Task Info /////// [ Global ] ////////////////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Document Info ///////// [ Global ] ///////////////////////////////////////////////////
     *//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.infoDocumentModal = function (documentInfo) {

        var editDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/document_info.html',
            controller: 'InfoDocumentModalInstanceController',
            controllerAs: 'DocumentModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        documentInfo: JSON.parse(JSON.stringify(documentInfo))
                    };
                }
            }
        });

        editDocumentModalInstance.result.then(function ()
        {

        }, function () {

        });
    };

    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For Document Info /////// [ Global ] ////////////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For User Info ///////// [ Global ] ///////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.infoUserModal = function (userInfo) {

        var editUserModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/user_info.html',
            controller: 'InfoUserModalInstanceController',
            controllerAs: 'UserModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        userInfo: JSON.parse(JSON.stringify(userInfo))
                    };
                }
            }
        });

        editUserModalInstance.result.then(function ()
        {

        }, function () {

        });
    };

    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For User Info /////// [ Global ] ////////////////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////// Modal For Creating Project /////// [ Global ] //////////////////////////////////////////////////
    *//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.newProjectModal = function () {

        var newProjectModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/project_modal.html',
            controller: 'CreateProjectModalInstanceController',
            controllerAs: 'ModalVM',
            windowClass: 'modals-style',
            backdrop: 'static'
//            resolve: {
//                projectName: function () {
//                    return vm.projectname;
//                }
//            }
        });

        newProjectModalInstance.result.then(function () {

        }, function () {
        });
    };

    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
    ////////////////// Modal For Creating Project ////// [ Global ] //////////////////////////// [E N D] //////////////
    */////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////// Modal For Editing Project ///// [ Global ] //////////////////////////////////////////////////////
    *//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.editProjectModal = function (projectToEdit) {

        var editProjectModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/project_modal.html',
            controller: 'EditProjectModalInstanceController',
            controllerAs: 'ModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        projectToEdit: JSON.parse(JSON.stringify(projectToEdit))
                    };
                }
            }
        });

        editProjectModalInstance.result.then(function ()
        {

        }, function () {

        });
    };
     /*///////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For Editing Project /// [ Global ] //////////////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////


     /*////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     //////////////// Modal For Creating Task [ Global ] //////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.newTaskModal = function()
    {
        var newTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/task_modal.html',
            controller: 'CreateTaskModalController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        isGlobal: true,
                        triggeredFrom: 'Create Task Global',
                        projectsArray: JSON.parse(JSON.stringify(ProjectService.getProjectPanels()))
                    };
                }
            }
        });

        newTaskModalInstance.result.then(function ()
        {

        }, function () {

        });
    };

    /*/////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////////////
     //////////////// Modal For Creating Task [ Global ] //////////////////////////////////////// [E N D] /////////////
     */////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Editing Task  [ Global ] /////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.editTaskModal = function (taskToEdit) {

        var editTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/task_modal.html',
            controller: 'EditTaskModalInstanceController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        isGlobal: true,
                        triggeredFrom: 'Update Task Global',
                        taskToEdit: JSON.parse(JSON.stringify(taskToEdit))
                    };
                }
            }
        });

        editTaskModalInstance.result.then(function ()
        {

        }, function () {

        });
    };

    /*///////////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////////
     ///////////////// Modal For Editing Task  [ Global ] ///////////////////////////////////////// [E N D] ///////////
     *///////////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     //////////////// Modal For Creating Document [ Global ] //////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.newDocumentModal = function()
    {
        var newDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/document_modal.html',
            controller: 'CreateDocumentModalInstanceController',
            controllerAs: 'DocumentModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        isGlobal: true,
                        projectsArray: JSON.parse(JSON.stringify(ProjectService.getProjectPanels()))
                    };
                }
            }
        });

        newDocumentModalInstance.result.then(function ()
        {

        }, function () {

        });
    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////////
     //////////////// Modal For Creating Document  [ Global ] /////////////////////////////////////// [E N D] /////////
     */////////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Editing Document  [ Global ] /////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.editDocumentModal = function (documentToEdit) {

        var editDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/document_modal.html',
            controller: 'EditDocumentModalInstanceController',
            controllerAs: 'DocumentModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        isGlobal: true,
                        documentToEdit: JSON.parse(JSON.stringify(documentToEdit))
                    };
                }
            }
        });

        editDocumentModalInstance.result.then(function (updated_document)
        {

            if(updated_document.project)
            {
                ProjectService.updateDocumentsInProject(updated_document.project, JSON.parse(JSON.stringify([updated_document])));
            }

            TaskService.updateDocumentsInTask(JSON.parse(JSON.stringify([updated_document])));
//            DocumentService.updateDocuments(JSON.parse(JSON.stringify(vm.documentPanels)), false);

        }, function () {

        });
    };

    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For Editing Document  [ Global ] ////////////////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     //////////////// Modal For Creating User [ Global ] //////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.newUserModal = function()
    {
        var newUserModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/user_modal.html',
            controller: 'CreateUserModalInstanceController',
            controllerAs: 'UserModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        isGlobal: true,
                        projectsArray: JSON.parse(JSON.stringify(ProjectService.getProjectPanels()))
                    };
                }
            }
        });

        newUserModalInstance.result.then(function ()
        {

        }, function () {

        });
    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////////
     //////////////// Modal For Creating User  [ Global ] /////////////////////////////////////// [E N D] /////////
     */////////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////////

}]);

app.controller('CreateProjectModalInstanceController', ['$scope', '$uibModal', '$uibModalInstance', 'ProjectService', 'TaskService', 'DocumentService', 'UserService', function ($scope, $uibModal, $uibModalInstance, ProjectService, TaskService, DocumentService, UserService) {

    var vm = this;
    var floatingTasks = [];
    var floatingDocuments = [];
    var tasksArray = [];
    var documentsArray = [];
    var usersArray = [];
    var usersExtractedIds = [];
    var tasksToBeAddedInUser = [];
    var taskCreatedFlag = false;
    var documentCreatedFlag = false;
    var userCreatedFlag = false;
    var userDeletedFlag = false;
    var taskDeletedFlag = false;
    var documentDeletedFlag = false;
    var documentAlreadyExists = false;
    var projectsArray = JSON.parse(JSON.stringify(ProjectService.getProjectPanels()));
    vm.updateFlag = true;
    vm.projectNameEditable = false;
    vm.taskPanels = [];
    vm.documentPanels = [];
    vm.userPanels = [];
    vm.statusVisibility = false;

// Datepicker

    vm.projectDate = '';

    vm.status = {
        opened: false
    };

    vm.openDatePicker = function($event) {
        vm.status.opened = true;
    };

    vm.format = 'dd.MM.yyyy';
    vm.modalHeading = 'Create New Project';
    vm.modalType = 'Create';

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Create New Project ////////////////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.createOrUpdateProject = function(project_params)
    {
        var projectId = ProjectService.newProjectID();
        var projectName = project_params.projectName;
        var projectBudget = project_params.projectBudget;
        var projectTargetEndDate;

        if(project_params.projectTargetEndDate != undefined)
        {
            projectTargetEndDate = new Date(project_params.projectTargetEndDate);
        }

        var projectDescription = project_params.projectDescription;

//        console.log("projectTargetEndDate : " + JSON.stringify(project_params.projectTargetEndDate));

        if(ProjectService.checkProjectExistence(projectName))
        {
            alert("Project '" + projectName + "' Already Exists");
            return;
        }

        if(taskCreatedFlag)
        {
            ProjectService.addProjectToTask(tasksArray, projectName);
            TaskService.createTaskPanel(tasksArray);

            for(var newTask of tasksArray)
            {
                ProjectService.addTaskToProject(projectName, newTask);

                if(newTask.documents)
                {
                    ProjectService.addProjectToDocument(newTask.documents, projectName);
                }
            }

            taskCreatedFlag = false;
        }

        if(documentCreatedFlag)
        {
            ProjectService.addProjectToDocument(documentsArray, projectName);

            DocumentService.createDocumentPanel(documentsArray);

            for(var newDocument of documentsArray)
            {
                ProjectService.addDocumentToProject(projectName, newDocument);
            }

            documentCreatedFlag = false;
        }

        if(userCreatedFlag)
        {
            UserService.addProjectToUser(usersArray, projectId, projectName);

            if(tasksToBeAddedInUser.length)
            {
                for(var userToAddToTask of tasksToBeAddedInUser)
                {
                    UserService.addTaskToUser(userToAddToTask.usersArray, userToAddToTask.id, userToAddToTask.taskName);
                }
            }
            userCreatedFlag = false;
        }

        if(taskDeletedFlag)
        {
            if(floatingTasks.length)
            {
                TaskService.deleteFloatingTasks(floatingTasks);
            }

            taskDeletedFlag = false;
        }

        if(documentDeletedFlag)
        {
            if(floatingDocuments.length)
            {
                DocumentService.deleteFloatingDocuments(floatingDocuments);
            }

            documentDeletedFlag = false;
        }

        var new_project_params = {
            'id': projectId,
            'name': projectName,
            'budget': projectBudget,
            'targetEndDate': projectTargetEndDate,
            'description': projectDescription,
            'status': 'Pending Approval',
            'createDate': new Date(),
            'modifiedDate': '',
            'endDate': '',
            'createdBy': '',
            'lastModifiedBy': '',
            'numberOfTasks': '',
            'numberOfDocuments': '',
            'numberOfUsers': '',
            'tasks': tasksArray,
            'documents': documentsArray,
            'users': []
        };

        for(var user of usersArray)
        {
            new_project_params.users.push({id: user.id, name: user.name, email: user.email});
        }

//        console.log("new_project_params : " + JSON.stringify(new_project_params));

        ProjectService.createProjectPanel(new_project_params);

//        console.log("Test User Object : " + JSON.stringify(UserService.getUserByEmail(usersArray[0].email)));

        $uibModalInstance.close();
    };

    /*///////////////////////////////////////////////////////////////////////////////////// [E N D] ///////////////////
     ////////////////// Create New Project //////////////////////////////////////////////// [E N D] ///////////////////
     *///////////////////////////////////////////////////////////////////////////////////// [E N D] ///////////////////

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Modal For Adding From Existing Tasks [ Create Project ] ///////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.existingTasksModalInProjectModal = function()
    {
        var existingTasksModalInProjectModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/existing_tasks_modal.html',
            controller: 'ExistingTasksModalInstanceController',
            controllerAs: 'AddExistingTasksModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        tasksArray: JSON.parse(JSON.stringify(TaskService.getTaskPanels())),
                        tasksInModal: JSON.parse(JSON.stringify(vm.taskPanels))
                    };
                }
            }
        });

        existingTasksModalInProjectModalInstance.result.then(function (selected_existing_tasks) {

            //        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

            var new_tasks_obj = {};
            var new_doc_obj = {};
            var userNotFound;
            var globalTasks = TaskService.getTaskPanels();

            for(var task of selected_existing_tasks)
            {
                for(var taskPanel of globalTasks)
                {
                    if(task.id == taskPanel.id)
                    {
                        if(vm.documentPanels.length)
                        {
                            documentAlreadyExists = DocumentService.chkTaskDocsInPrjDocsWithoutPrjName(task.documents, vm.documentPanels);

                            if(documentAlreadyExists)
                            {
                                alert("Document With Same Name Already Exists In This Project");
                                return
                            }

                            for(var doc of task.documents)
                            {
                                if(task.project)
                                {
                                    new_doc_obj = doc;
                                    new_doc_obj.id = DocumentService.newDocumentID();
                                    vm.documentPanels.push(doc);
                                    documentsArray.push(doc);
                                    documentCreatedFlag = true;
                                }
                                else
                                {
                                    vm.documentPanels.push(doc);
                                    documentsArray.push(doc);
                                    documentCreatedFlag = true;
                                }
                            }

                            if(taskPanel.project)
                            {
                                new_tasks_obj = task;
                                new_tasks_obj.id = TaskService.newTaskID();
                                tasksArray.push(new_tasks_obj);
                                vm.taskPanels.push(new_tasks_obj);
                                new_tasks_obj = {};
                                taskCreatedFlag = true;
                                vm.updateFlag = true;
                            }
                            else
                            {
                                for(var doc of task.documents)
                                {
                                    floatingDocuments.push(doc);
                                }

                                floatingTasks.push(task);
                                tasksArray.push(task);
                                vm.taskPanels.push(task);
                                taskCreatedFlag = true;
                                taskDeletedFlag = true;
                                documentDeletedFlag = true;
                                vm.updateFlag = true;
                            }
                        }
                        else
                        {
                            for(var doc of task.documents)
                            {
                                if(task.project)
                                {
                                    new_doc_obj = doc;
                                    new_doc_obj.id = DocumentService.newDocumentID();
                                    vm.documentPanels.push(doc);
                                    documentsArray.push(doc);
                                    documentCreatedFlag = true;
                                }
                                else
                                {
                                    vm.documentPanels.push(doc);
                                    documentsArray.push(doc);
                                    documentCreatedFlag = true;
                                }
                            }

                            if(taskPanel.project)
                            {
                                new_tasks_obj = task;
                                new_tasks_obj.id = TaskService.newTaskID();
                                tasksArray.push(new_tasks_obj);
                                vm.taskPanels.push(new_tasks_obj);
                                new_tasks_obj = {};
                                taskCreatedFlag = true;
                                vm.updateFlag = true;
                            }
                            else
                            {
                                floatingTasks.push(task);

                                for(var doc of task.documents)
                                {
                                    floatingDocuments.push(doc);
                                }

                                tasksArray.push(task);
                                vm.taskPanels.push(task);
                                taskCreatedFlag = true;
                                taskDeletedFlag = true;
                                documentDeletedFlag = true;
                                vm.updateFlag = true;
                            }
                        }
                    }
                }

                if(task.users.length)
                {
                    for(var userImportedTask of task.users)
                    {
                        userNotFound = true;

                        for(var userProject of vm.userPanels)
                        {
                            if(userImportedTask.email == userProject.email)
                            {
                                userNotFound = false;
                            }
                        }

                        if(userNotFound)
                        {
                            vm.userPanels.push(userImportedTask);
                            usersArray.push(userImportedTask);

                            userCreatedFlag = true;
                        }
                    }
                }

            }

        }, function () {
        });

    };

    /*//////////////////////////////////////////////////////////////////////////////////////// [E N D] ////////////////
     ////////////////// Modal For Adding From Existing Tasks [ Create Project ] ////////////// [E N D] ////////////////
     *//////////////////////////////////////////////////////////////////////////////////////// [E N D] ////////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Modal For Adding From Existing Documents [ Create Project ] ///////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.existingDocumentsModalInProjectModal = function()
    {
        var existingDocumentsModalInProjectModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/existing_documents_modal.html',
            controller: 'ExistingDocumentsModalInstanceController',
            controllerAs: 'AddExistingDocumentsModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        triggeredFrom: "Create Project",
                        documentsArray: JSON.parse(JSON.stringify(DocumentService.getDocumentPanels())),
                        documentsInModal: JSON.parse(JSON.stringify(vm.documentPanels))
                    };
                }
            }
        });

        existingDocumentsModalInProjectModalInstance.result.then(function (selected_existing_documents) {

            //        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

            var new_documents_obj = {};

            for(var document of selected_existing_documents)
            {
                for(var documentPanel of DocumentService.getDocumentPanels())
                {
                    if(document.id == documentPanel.id)
                    {
                        if(documentPanel.project)
                        {
                            new_documents_obj = document;
                            new_documents_obj.id = DocumentService.newDocumentID();
                            documentsArray.push(new_documents_obj);
                            vm.documentPanels.push(new_documents_obj);
                            new_documents_obj = {};
                            documentCreatedFlag = true;
                        }
                        else
                        {
                            floatingDocuments.push(document);
                            documentsArray.push(document);
                            vm.documentPanels.push(document);
                            documentCreatedFlag = true;
                            documentDeletedFlag = true;
                        }
                    }
                }
            }

        }, function () {
        });

    };

    /*/////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////////////
     ////////////////// Modal For Adding From Existing Documents [ Create Project ] ///////////// [E N D] /////////////
     */////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////////////


    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Modal For Creating Task [ Create Project ] ////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    vm.addNewTaskModal = function()
    {
        var addNewTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/task_modal.html',
            controller: 'CreateTaskModalController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        isGlobal: false,
                        triggeredFrom: 'Create Project',
                        projectsArray: projectsArray,
                        tasksArray: JSON.parse(JSON.stringify(vm.taskPanels)),
                        docsInProjectModal: JSON.parse(JSON.stringify(vm.documentPanels))
//                        usersInProjectModal: JSON.parse(JSON.stringify(vm.userPanels))
                    };
                }
            }
        });

        addNewTaskModalInstance.result.then(function (result) {

//            console.log("new_task_params : " + JSON.stringify(result));

            var new_task_params = result.new_task_params;
            var floatingDocsFromTaskModal = result.floatingDocuments;
            var usersCreatedInTask = result.tasksToBeAddedInUser.usersArray;
            tasksToBeAddedInUser.push(result.tasksToBeAddedInUser);

            if(vm.documentPanels.length)
            {
                documentAlreadyExists = DocumentService.chkTaskDocsInPrjDocsWithoutPrjName(new_task_params.documents, vm.documentPanels);

                if(documentAlreadyExists)
                {
                    alert("Document With Same Name Already Exists In This Project");
                    return
                }

                for(var doc of new_task_params.documents)
                {
                    vm.documentPanels.push(doc);
                    documentsArray.push(doc);
                }

                documentCreatedFlag = true;

            }
            else
            {
                for(var doc of new_task_params.documents)
                {
                    vm.documentPanels.push(doc);
                    documentsArray.push(doc);
                }

                documentCreatedFlag = true;

            }

            for(var floatDocFromTask of floatingDocsFromTaskModal)
            {
                floatingDocuments.push(floatDocFromTask);
                documentDeletedFlag = true;
            }

            if(usersCreatedInTask.length)
            {
                for(var userFromTsk of usersCreatedInTask)
                {
                    new_task_params.users.push(userFromTsk);
                }
            }

            var newUsers = UserService.checkUsersExistence(new_task_params.users, vm.userPanels);

            if(newUsers.length)
            {
                for(var user of newUsers)
                {
                    vm.userPanels.push(user);
                    usersArray.push(user);
                    userCreatedFlag = true;
                }
            }

            tasksArray.push(new_task_params);
            vm.taskPanels.push(new_task_params);
            taskCreatedFlag = true;

        }, function () {
        });

    };

    /*///////////////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////
     ////////////////// Modal For Creating Task [ Create Project ] //////////////////////////////////// [E N D] ///////
     *///////////////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Editing Task [ Create Project ] //////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.editTaskModal = function (taskToEdit) {

        var editTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/task_modal.html',
            controller: 'EditTaskModalInstanceController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        isGlobal: false,
                        triggeredFrom: 'Create Project',
                        taskToEdit: JSON.parse(JSON.stringify(taskToEdit)),
                        docsInProjectModal: JSON.parse(JSON.stringify(vm.documentPanels))
//                        usersInProjectModal: JSON.parse(JSON.stringify(vm.userPanels))
                    };
                }
            }
        });

        editTaskModalInstance.result.then(function (result)
        {
//            console.log("result : " + JSON.stringify(result));

            var updated_task = result.updated_task;
            var docsDeletedFromTaskUpdateModal = result.documentsToDelete;
            var floatingDocsFromTaskUpdateModal = result.floatingDocuments;
            var usersCreatedInTask = result.tasksToBeAddedInUser.usersArray;
            tasksToBeAddedInUser.push(result.tasksToBeAddedInUser);

            for(var i=0; i<vm.taskPanels.length; i++)
            {
                if(vm.taskPanels[i].id == updated_task.id)
                {
                    vm.taskPanels[i] = updated_task;
                    vm.updateFlag = true;
                    break;
                }
            }

            for(var i=0; i<tasksArray.length; i++)
            {
                if(tasksArray[i].id == updated_task.id)
                {
                    tasksArray[i] = updated_task;
                    break;
                }
            }

            for(var doc of updated_task.documents)
            {
                if(!DocumentService.checkDocumentExistence(doc.name, vm.documentPanels))
                {
                    documentsArray.push(doc);
                    vm.documentPanels.push(doc);
                    documentCreatedFlag = true;
                }
            }

            if(docsDeletedFromTaskUpdateModal.length)
            {
                for(var doc of docsDeletedFromTaskUpdateModal)
                {
                    for(var docModal of vm.documentPanels)
                    {
                        if(doc.id == docModal.id)
                        {
                            DocumentService.deleteDocumentModal(docModal, vm.documentPanels);
                            DocumentService.deleteDocumentModal(docModal, documentsArray);

                        }
                    }
                }
            }

            for(var floatDocFromTask of floatingDocsFromTaskUpdateModal)
            {
                floatingDocuments.push(floatDocFromTask);
                documentDeletedFlag = true;
            }

            if(usersCreatedInTask.length)
            {
                for(var userUpdTsk of usersCreatedInTask)
                {
                    updated_task.users.push(userUpdTsk);
                }
            }

            var newUsers = UserService.checkUsersExistence(updated_task.users, vm.userPanels);

            if(newUsers.length)
            {
                for(var user of newUsers)
                {
                    vm.userPanels.push(user);
                    usersArray.push(user);
                    userCreatedFlag = true;
                }
            }

        }, function () {

        });
    };

    /*//////////////////////////////////////////////////////////////////////////////////////////////// [E N D] ////////
     ///////////////// Modal For Editing Task [ Create Project ] ///////////////////////////////////// [E N D] ////////
     *//////////////////////////////////////////////////////////////////////////////////////////////// [E N D] ////////


    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Editing Document [ Create Project ] //////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.editDocumentModal = function (documentToEdit) {

        var editDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/document_modal.html',
            controller: 'EditDocumentModalInstanceController',
            controllerAs: 'DocumentModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        isGlobal: false,
                        documentToEdit: JSON.parse(JSON.stringify(documentToEdit))
                    };
                }
            }
        });

        editDocumentModalInstance.result.then(function (updated_document)
        {
            //        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

            for(var i=0; i<vm.documentPanels.length; i++)
            {
                if(vm.documentPanels[i].id == updated_document.id)
                {
                    vm.documentPanels[i] = updated_document;
                    vm.updateFlag = true;
                    break;
                }
            }

            for(var i=0; i<documentsArray.length; i++)
            {
                if(documentsArray[i].id == updated_document.id)
                {
                    documentsArray[i] = updated_document;
                    break;
                }
            }
        }, function () {

        });
    };

    /*//////////////////////////////////////////////////////////////////////////////////////////////// [E N D] ////////
     ///////////////// Modal For Editing Document [ Create Project ] ///////////////////////////////// [E N D] ////////
     *//////////////////////////////////////////////////////////////////////////////////////////////// [E N D] ////////


    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Delete Task [ Create Project ] ////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.deleteTask = function(taskToDelete)
    {
        var modalDocuments = JSON.parse(JSON.stringify(vm.documentPanels));

        for(var doc of modalDocuments)
        {
            if(doc.task == taskToDelete.name)
            {
                DocumentService.deleteDocumentModal(doc, vm.documentPanels);
                DocumentService.deleteDocumentModal(doc, documentsArray);

                documentDeletedFlag = true;
            }
        }

        TaskService.deleteTaskModal(taskToDelete, vm.taskPanels);
        TaskService.deleteTaskModal(taskToDelete, tasksArray);

        taskDeletedFlag = true;
    };

    /*///////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////////////
     ////////////////// Delete Task [ Create Project ] //////////////////////////////////////// [E N D] ///////////////
     *///////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////////////


    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Delete Document [ Create Project ] ////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.deleteDocument = function(documentToDelete)
    {
        //        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

        DocumentService.deleteDocumentModal(documentToDelete, vm.documentPanels);
        DocumentService.deleteDocumentModal(documentToDelete, documentsArray);
        DocumentService.deleteDocumentsFromModalTask(documentToDelete, tasksArray);

        documentDeletedFlag = true;
    };

    /*//////////////////////////////////////////////////////////////////////////////////////// [E N D] ////////////////
     ////////////////// Delete Document [ Create Project ] /////////////////////////////////// [E N D] ////////////////
     *//////////////////////////////////////////////////////////////////////////////////////// [E N D] ////////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Delete User [ Create Project ] ////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.deleteUser = function(userToDelete)
    {
        UserService.deleteUserModal(userToDelete, vm.userPanels);
        UserService.deleteUserModal(userToDelete, usersArray);

        userDeletedFlag = true;
    };

    /*//////////////////////////////////////////////////////////////////////////////////////// [E N D] ////////////////
     ////////////////// Delete User [ Create Project ] /////////////////////////////////////// [E N D] ////////////////
     *//////////////////////////////////////////////////////////////////////////////////////// [E N D] ////////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Add New Document Modal [ Create Project ] /////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.addNewDocumentModal = function()
    {
        var addNewDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/document_modal.html',
            controller: 'CreateDocumentModalInstanceController',
            controllerAs: 'DocumentModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        documentsArray: documentsArray
                    };
                }
            }
        });

        addNewDocumentModalInstance.result.then(function (new_document_params) {

            //        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

            documentsArray.push(new_document_params);
            vm.documentPanels.push(new_document_params);
            documentCreatedFlag = true;

        }, function () {
        });

    };

    /*///////////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////////
     ////////////////// Add New Document Modal  [ Create Project ] //////////////////////////////// [E N D] ///////////
     *///////////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     //////////////// Assign Project To Users [ Create Project ] //////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.addExistingUsersModal = function()
    {
        var addExistingUsersModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/existing_users_modal.html',
            controller: 'ExistingUsersModalInstanceController',
            controllerAs: 'AddExistingUsersModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        triggeredFrom: "Create Project",
                        usersArray: JSON.parse(JSON.stringify(UserService.getUserPanels())),
                        usersInModal: JSON.parse(JSON.stringify(vm.userPanels))
                    };
                }
            }
        });

        addExistingUsersModalInstance.result.then(function (selected_existing_users) {

            //        console.log("Global Docs AFTER : " + JSON.stringify(UserService));

            for(var user of selected_existing_users)
            {
                usersArray.push(user);
                vm.userPanels.push(user);
                userCreatedFlag = true;
            }

        }, function () {
        });

    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////////
     //////////////// Assign Project To Users [ Create Project ] /////////////////////////////////////// [E N D] //////
     */////////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Task Info /////// [ Create Project ] /////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.infoTaskModal = function (taskInfo) {

        var editTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/task_info.html',
            controller: 'InfoTaskModalInstanceController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        taskInfo: JSON.parse(JSON.stringify(taskInfo))
                    };
                }
            }
        });

        editTaskModalInstance.result.then(function ()
        {

        }, function () {

        });
    };
    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For Task Info ////// [ Create Project ] /////////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Document Info /////// [ Create Project ] /////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.infoDocumentModal = function (documentInfo) {

        var editDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/document_info.html',
            controller: 'InfoDocumentModalInstanceController',
            controllerAs: 'DocumentModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        documentInfo: JSON.parse(JSON.stringify(documentInfo))
                    };
                }
            }
        });

        editDocumentModalInstance.result.then(function ()
        {

        }, function () {

        });
    };

    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For Document Info /////// [ Create Project ] ////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For User Info ///////// [ Create Project ] /////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.infoUserModal = function (userInfo) {

        var editUserModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/user_info.html',
            controller: 'InfoUserModalInstanceController',
            controllerAs: 'UserModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        userInfo: JSON.parse(JSON.stringify(userInfo))
                    };
                }
            }
        });

        editUserModalInstance.result.then(function ()
        {

        }, function () {

        });
    };

    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For User Info /////// [ Create Project ] //////////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

}]);

app.controller('InfoProjectModalInstanceController', ['$scope', '$uibModal', '$uibModalInstance', 'dataForThisModalInstance', 'ProjectService', 'TaskService', 'DocumentService', 'UserService', function ($scope, $uibModal, $uibModalInstance, dataForThisModalInstance, ProjectService, TaskService, DocumentService, UserService) {

    var vm = this;
    var projectInfo = dataForThisModalInstance.projectInfo;

    vm.projectName = projectInfo.name;
    vm.projectBudget = projectInfo.budget;
    vm.projectDescription = projectInfo.description;
    vm.taskPanels = projectInfo.tasks;
    vm.documentPanels = projectInfo.documents;
    vm.userPanels = JSON.parse(JSON.stringify(projectInfo.users));

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Task Info /////// [ Project Info ] ///////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.infoTaskModal = function (taskInfo) {

        var editTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/task_info.html',
            controller: 'InfoTaskModalInstanceController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        taskInfo: taskInfo
                    };
                }
            }
        });

        editTaskModalInstance.result.then(function ()
        {

        }, function () {

        });
    };
    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For Task Info ////// [ Project Info ] ///////////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Document Info /////// [ Project Info ] ///////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.infoDocumentModal = function (documentInfo) {

        var editDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/document_info.html',
            controller: 'InfoDocumentModalInstanceController',
            controllerAs: 'DocumentModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        documentInfo: JSON.parse(JSON.stringify(documentInfo))
                    };
                }
            }
        });

        editDocumentModalInstance.result.then(function ()
        {

        }, function () {

        });
    };

    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For Document Info /////// [ Project Info ] //////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For User Info ///////// [ Project Info ] /////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.infoUserModal = function (userInfo) {

        userInfo = UserService.getUserByEmail(userInfo.email);

        var editUserModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/user_info.html',
            controller: 'InfoUserModalInstanceController',
            controllerAs: 'UserModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        userInfo: JSON.parse(JSON.stringify(userInfo))
                    };
                }
            }
        });

        editUserModalInstance.result.then(function ()
        {

        }, function () {

        });
    };

    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For User Info /////// [ Project Info ] //////////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

}]);

app.controller('InfoTaskModalInstanceController', ['$scope', '$uibModal', '$uibModalInstance', 'dataForThisModalInstance', 'UserService', function ($scope, $uibModal, $uibModalInstance, dataForThisModalInstance, UserService) {

    var vm = this;
    var taskInfo = dataForThisModalInstance.taskInfo;

    vm.taskNameEditable = true;
    vm.taskName = taskInfo.name;
    vm.taskProject = taskInfo.project;

    if(taskInfo.targetEndDate != undefined)
    {
        vm.taskTargetEndDate = new Date(taskInfo.targetEndDate);
    }

    vm.taskDescription = taskInfo.description;
    vm.documentPanels = JSON.parse(JSON.stringify(taskInfo.documents));
    vm.userPanels = JSON.parse(JSON.stringify(taskInfo.users));

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Document Info //////// [ Task Info ] /////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.infoDocumentModal = function (documentInfo) {

        var editDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/document_info.html',
            controller: 'InfoDocumentModalInstanceController',
            controllerAs: 'DocumentModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        documentInfo: JSON.parse(JSON.stringify(documentInfo))
                    };
                }
            }
        });

        editDocumentModalInstance.result.then(function ()
        {

        }, function () {

        });
    };

    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For Document Info ////// [ Task Info ] //////////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For User Info ///////// [ Task Info ] ////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.infoUserModal = function (userInfo) {

        userInfo = UserService.getUserByEmail(userInfo.email);

        var editUserModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/user_info.html',
            controller: 'InfoUserModalInstanceController',
            controllerAs: 'UserModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        userInfo: JSON.parse(JSON.stringify(userInfo))
                    };
                }
            }
        });

        editUserModalInstance.result.then(function ()
        {

        }, function () {

        });
    };

    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For User Info /////// [ Task Info ] /////////////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

}]);

app.controller('InfoDocumentModalInstanceController', ['$scope', '$uibModal', '$uibModalInstance', 'dataForThisModalInstance', 'ProjectService', 'DocumentService', 'TaskService', function ($scope, $uibModal, $uibModalInstance, dataForThisModalInstance, ProjectService, DocumentService, TaskService) {

    var vm = this;
    var documentInfo = dataForThisModalInstance.documentInfo;

    vm.documentName = documentInfo.name;
    vm.documentProject = documentInfo.project;
    vm.documentTask = documentInfo.task;
    vm.documentDescription = documentInfo.description;

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

app.controller('InfoUserModalInstanceController', ['$scope', '$uibModal', '$uibModalInstance', 'dataForThisModalInstance', 'ProjectService', 'UserService', 'TaskService', function ($scope, $uibModal, $uibModalInstance, dataForThisModalInstance, ProjectService, UserService, TaskService) {

    var vm = this;
    var userInfo = dataForThisModalInstance.userInfo;

    vm.userName = userInfo.name;
    vm.userEmail = userInfo.email;
    vm.userDesignation = userInfo.designation;

    vm.projectPanels = userInfo.projects;
    vm.taskPanels = userInfo.tasks;
    vm.documentPanels = userInfo.documents;

//    console.log("userInfo : " + JSON.stringify(userInfo));

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Project Info /////// [ User Info ] ///////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.infoProjectModal = function (projectInfo) {

        projectInfo = ProjectService.getProjectByName(projectInfo.name);

//        console.log("projectInfo : " + JSON.stringify(projectInfo));

        var editProjectModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/project_info.html',
            controller: 'InfoProjectModalInstanceController',
            controllerAs: 'ModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        projectInfo: JSON.parse(JSON.stringify(projectInfo))
                    };
                }
            }
        });

        editProjectModalInstance.result.then(function ()
        {

        }, function () {

        });
    };
    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For Project Info /////// [ User Info ] //////////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Task Info ////////// [ User Info ] ///////////////////////////////////////////////////
     *//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.infoTaskModal = function (taskInfo) {

        taskInfo = TaskService.getTaskById(taskInfo.id);

//        console.log("taskInfo : " + JSON.stringify(taskInfo));

        var editTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/task_info.html',
            controller: 'InfoTaskModalInstanceController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        taskInfo: JSON.parse(JSON.stringify(taskInfo))
                    };
                }
            }
        });

        editTaskModalInstance.result.then(function ()
        {

        }, function () {

        });
    };
    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For Task Info /////// [ User Info ] /////////////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Document Info ///////// [ User Info ] ////////////////////////////////////////////////
     *//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.infoDocumentModal = function (documentInfo) {

        var editDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/document_info.html',
            controller: 'InfoDocumentModalInstanceController',
            controllerAs: 'DocumentModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        documentInfo: JSON.parse(JSON.stringify(documentInfo))
                    };
                }
            }
        });

        editDocumentModalInstance.result.then(function ()
        {

        }, function () {

        });
    };

    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For Document Info /////// [ User Info ] /////////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

app.controller('EditProjectModalInstanceController', ['$scope', '$uibModal', '$uibModalInstance', 'dataForThisModalInstance', 'ProjectService', 'TaskService', 'DocumentService', 'UserService', function ($scope, $uibModal, $uibModalInstance, dataForThisModalInstance, ProjectService, TaskService, DocumentService, UserService) {

    var vm = this;
    var newTasksArray = [];
    var updatedTasksArray = [];
    var newDocumentsArray = [];
    var newUsersArray = [];
    var updatedDocumentsArray = [];
    var tasksToBeAddedInUser = [];
    var tasksToDelete = [];
    var documentsToDelete = [];
    var usersToDelete = [];
    var floatingTasks = [];
    var floatingDocuments = [];
    var taskCreatedFlag = false;
    var documentCreatedFlag = false;
    var userCreatedFlag = false;
    var documentAlreadyExists = false;
    var taskUpdateFlag = false;
    var documentUpdateFlag = false;
    var taskDeletedFlag = false;
    var documentDeletedFlag = false;
    var userDeletedFlag = false;
    var projectToEdit = dataForThisModalInstance.projectToEdit;

    vm.projectNameEditable = true;
    vm.modalHeading = 'Update Project';
    vm.modalType = 'Update';
    vm.projectName = projectToEdit.name;
    vm.projectBudget = projectToEdit.budget;

    if(projectToEdit.targetEndDate != undefined)
    {
        vm.projectTargetEndDate = new Date(projectToEdit.targetEndDate);
    }

    vm.projectDescription = projectToEdit.description;
    vm.taskPanels = JSON.parse(JSON.stringify(projectToEdit.tasks));
    vm.documentPanels = JSON.parse(JSON.stringify(projectToEdit.documents));

    var projectUsers = UserService.getProjectUsers(projectToEdit.users);

    vm.userPanels = JSON.parse(JSON.stringify(projectUsers));

    vm.statuses = [
        {'status': 'Pending Approval'},
        {'status': 'Approved'},
        {'status': 'In Progress'},
        {'status': 'Completed'},
        {'status': 'Closed'}
    ];
    vm.selectedStatus = projectToEdit.status;
    vm.statusVisibility = true;
    vm.format = 'dd.MM.yyyy';
    vm.status = {
        opened: false
    };
    vm.openDatePicker = function($event) {
        vm.status.opened = true;
    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////////// Update Project ////////////////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.createOrUpdateProject = function()
    {
//        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

        if(taskDeletedFlag)
        {
            ProjectService.deleteTasksFromProject(tasksToDelete, projectToEdit.name);
            TaskService.deleteTaskGlobal(tasksToDelete, TaskService.getTaskPanels());
            TaskService.deleteTaskGlobal(tasksToDelete, newTasksArray);

            if(floatingTasks.length)
            {
                TaskService.deleteFloatingTasks(floatingTasks);
            }

            taskDeletedFlag = false;
        }

        if(documentDeletedFlag)
        {
            ProjectService.deleteDocumentsFromProject(documentsToDelete, projectToEdit.name);
            TaskService.deleteDocumentsFromTask(documentsToDelete, JSON.parse(JSON.stringify(vm.taskPanels)));
            DocumentService.deleteDocumentGlobal(documentsToDelete, DocumentService.getDocumentPanels());
            DocumentService.deleteDocumentGlobal(documentsToDelete, newDocumentsArray);

            if(floatingDocuments.length)
            {
                DocumentService.deleteFloatingDocuments(floatingDocuments);
            }

            documentDeletedFlag = false;
        }

        if(taskCreatedFlag)
        {
            ProjectService.addProjectToTask(newTasksArray, projectToEdit.name);

            TaskService.createTaskPanel(newTasksArray);


            for(var newTask of newTasksArray)
            {
                ProjectService.addTaskToProject(projectToEdit.name, newTask);
            }

            taskCreatedFlag = false;
        }

        if(documentCreatedFlag)
        {
            ProjectService.addProjectToDocument(newDocumentsArray, projectToEdit.name);

            DocumentService.createDocumentPanel(newDocumentsArray);

            for(var newDocument of newDocumentsArray)
            {
                ProjectService.addDocumentToProject(projectToEdit.name, newDocument);

                if(newDocument.task)
                {
                    for(var newTask of vm.taskPanels)
                    {
                        if(newTask.name == newDocument.task)
                        {
                            ProjectService.addProjectToDocument(newTask.documents, projectToEdit.name);
                            break;
                        }
                    }
                }
            }

            documentCreatedFlag = false;
        }

        if(userCreatedFlag)
        {
            var projectId = ProjectService.getProjectId(projectToEdit.name);
            UserService.addProjectToUser(newUsersArray, projectId, projectToEdit.name);
            var projectToUpdate = ProjectService.getProjectByName(projectToEdit.name);

            for(var user of newUsersArray)
            {
                projectToUpdate.users.push({id: user.id, name: user.name, email: user.email});
            }

            if(tasksToBeAddedInUser.length)
            {
                for(var userToAddToTask of tasksToBeAddedInUser)
                {
                    UserService.addTaskToUser(userToAddToTask.usersArray, userToAddToTask.id, userToAddToTask.taskName);
                }
            }

            userCreatedFlag = false;
        }

        if(userDeletedFlag)
        {
            ProjectService.deleteUsersFromProjects(usersToDelete, projectToEdit.name);
            UserService.deleteProjectFromUser(usersToDelete, projectToEdit.name);
        }

        if(taskUpdateFlag)
        {
            ProjectService.updateTasksInProject(projectToEdit.name, JSON.parse(JSON.stringify(vm.taskPanels)));
            TaskService.updateTasks(JSON.parse(JSON.stringify(vm.taskPanels)), false);

            taskUpdateFlag = false;
        }

        if(documentUpdateFlag)
        {
            ProjectService.updateDocumentsInProject(projectToEdit.name, JSON.parse(JSON.stringify(vm.documentPanels)));
            TaskService.updateDocumentsInTask(JSON.parse(JSON.stringify(vm.documentPanels)));
            DocumentService.updateDocuments(JSON.parse(JSON.stringify(vm.documentPanels)), false);

            documentUpdateFlag = false;
        }


        projectToEdit.budget = vm.projectBudget;
        projectToEdit.targetEndDate = vm.projectTargetEndDate;
        projectToEdit.description = vm.projectDescription;
        projectToEdit.status = vm.selectedStatus;
        projectToEdit.numberOfTasks = vm.taskPanels.length;
        projectToEdit.numberOfDocuments = vm.documentPanels.length;
        projectToEdit.numberOfUsers = vm.userPanels.length;

        var updated_project_params = {
            'id': projectToEdit.id,
            'name': projectToEdit.name,
            'budget': projectToEdit.budget,
            'targetEndDate': projectToEdit.targetEndDate,
            'description': projectToEdit.description,
            'status': projectToEdit.status,
            'createDate': projectToEdit.createDate,
            'modifiedDate': new Date(),
            'endDate': projectToEdit.endDate,
            'createdBy': projectToEdit.createdBy,
            'lastModifiedBy': projectToEdit.lastModifiedBy,
            'numberOfTasks': projectToEdit.numberOfTasks,
            'numberOfDocuments': projectToEdit.numberOfDocuments,
            'numberOfUsers': projectToEdit.numberOfUsers
        };

        ProjectService.updatedProjectParams(updated_project_params);

        $uibModalInstance.close();
    };

    /*///////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////////////
     /////////////////////// Update Project /////////////////////////////////////////////////// [E N D] ///////////////
     *///////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Modal For Creating Task  [ Update Project ] ///////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.addNewTaskModal = function()
    {
        var addNewTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/task_modal.html',
            controller: 'CreateTaskModalController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        isGlobal: false,
                        triggeredFrom: 'Update Project',
                        projectsArray: JSON.parse(JSON.stringify(ProjectService.getProjectPanels())),
                        tasksArray: JSON.parse(JSON.stringify(vm.taskPanels)),
                        docsInProjectModal: JSON.parse(JSON.stringify(vm.documentPanels))
//                        usersInProjectModal: JSON.parse(JSON.stringify(vm.userPanels))
                    };
                }
            }
        });

        addNewTaskModalInstance.result.then(function (result) {

//            console.log("result : " + JSON.stringify(result));

            var new_task_params = result.new_task_params;
            var floatingDocsFromTaskModal = result.floatingDocuments;

            var usersCreatedInTask = result.tasksToBeAddedInUser.usersArray;
            tasksToBeAddedInUser.push(result.tasksToBeAddedInUser);

            if(vm.documentPanels.length)
            {
                documentAlreadyExists = DocumentService.chkTaskDocsInPrjDocsWithoutPrjName(new_task_params.documents, vm.documentPanels);

                if(documentAlreadyExists)
                {
                    alert("Document With Same Name Already Exists In This Project");
                    return
                }

                for(var doc of new_task_params.documents)
                {
                    vm.documentPanels.push(doc);
                    newDocumentsArray.push(doc);
                    documentCreatedFlag = true;
                }
            }
            else
            {
                for(var doc of new_task_params.documents)
                {
                    vm.documentPanels.push(doc);
                    newDocumentsArray.push(doc);
                    documentCreatedFlag = true;
                }
            }

            for(var floatDocFromTask of floatingDocsFromTaskModal)
            {
                floatingDocuments.push(floatDocFromTask);
                documentDeletedFlag = true;
            }

            if(usersCreatedInTask.length)
            {
                for(var userFromTsk of usersCreatedInTask)
                {
                    new_task_params.users.push(userFromTsk);
                }
            }

            var newUsers = UserService.checkUsersExistence(new_task_params.users, vm.userPanels);

            if(newUsers.length)
            {
                for(var user of newUsers)
                {
                    vm.userPanels.push(user);
                    newUsersArray.push(user);
                    userCreatedFlag = true;
                }
            }

//            if(new_task_params.users.length)
//            {
//                for(var user of new_task_params.users)
//                {
//                    if(vm.userPanels.length)
//                    {
//                        for(var userModal of vm.userPanels)
//                        {
//                            if(userModal.email != user.email)
//                            {
//                                vm.userPanels.push(user);
//                                newUsersArray.push(user);
//
//                                userCreatedFlag = true;
//                            }
//                        }
//                    }
//                    else
//                    {
//                        vm.userPanels.push(user);
//                        newUsersArray.push(user);
//                        userCreatedFlag = true;
//                    }
//                }
//            }

            newTasksArray.push(new_task_params);
            vm.taskPanels.push(new_task_params);
            taskCreatedFlag = true;
            vm.updateFlag = true;

        }, function () {
        });

    };

    /*/////////////////////////////////////////////////////////////////////////////////////// [E N D] /////////////////
     ////////////////// Modal For Creating Task  [ Update Project ] ///////////////////////// [E N D] /////////////////
     */////////////////////////////////////////////////////////////////////////////////////// [E N D] /////////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Modal For Creating Document [ Update Project ] ////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.addNewDocumentModal = function()
    {
        var addNewDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/document_modal.html',
            controller: 'CreateDocumentModalInstanceController',
            controllerAs: 'DocumentModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        isGlobal: false,
                        projectsArray: JSON.parse(JSON.stringify(ProjectService.getProjectPanels())),
                        documentsArray: JSON.parse(JSON.stringify(vm.documentPanels))
                    };
                }
            }
        });

        addNewDocumentModalInstance.result.then(function (new_document_params) {

            //        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

            newDocumentsArray.push(new_document_params);
            vm.documentPanels.push(new_document_params);
            documentCreatedFlag = true;
            vm.updateFlag = true;

        }, function () {
        });
    };

    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ////////////////// Modal For Creating Document [ Update Project ] ///////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     //////////////// Assign Project To Users [ Update Project ] //////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.addExistingUsersModal = function()
    {
        var addExistingUsersModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/existing_users_modal.html',
            controller: 'ExistingUsersModalInstanceController',
            controllerAs: 'AddExistingUsersModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        triggeredFrom: "Create Project",
                        usersArray: JSON.parse(JSON.stringify(UserService.getUserPanels())),
                        usersInModal: JSON.parse(JSON.stringify(vm.userPanels))
                    };
                }
            }
        });

        addExistingUsersModalInstance.result.then(function (selected_existing_users) {

            //        console.log("Global Docs AFTER : " + JSON.stringify(UserService));

            var new_users_obj = {};

            for(var user of selected_existing_users)
            {
                newUsersArray.push(user);
                vm.userPanels.push(user);
                userCreatedFlag = true;
                vm.updateFlag = true;

            }

        }, function () {
        });

    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////////
     //////////////// Assign Project To Users [ Update Project ] //////////////////////////////////// [E N D] /////////
     */////////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     /////////////////// Modal For Editing Task [ Update Project ] ////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.editTaskModal = function (taskToEdit) {

        var editTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/task_modal.html',
            controller: 'EditTaskModalInstanceController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        isGlobal: false,
                        triggeredFrom: 'Update Project',
                        taskToEdit: JSON.parse(JSON.stringify(taskToEdit)),
                        docsInProjectModal: JSON.parse(JSON.stringify(vm.documentPanels))
//                        usersInProjectModal: JSON.parse(JSON.stringify(vm.userPanels))
                    };
                }
            }
        });

        editTaskModalInstance.result.then(function (changes)
        {
//            console.log("changes : " + JSON.stringify(changes));

            var updated_task = changes.updated_task;
            var docsDeletedFromTaskUpdateModal = changes.documentsToDelete;
            var floatingDocsFromTaskModal = changes.floatingDocuments;
            var modifiedDocuments = changes.modifiedDocuments;

            var usersCreatedInTask = changes.tasksToBeAddedInUser.usersArray;
            tasksToBeAddedInUser.push(changes.tasksToBeAddedInUser);

            for(var i=0; i<vm.taskPanels.length; i++)
            {
                if(vm.taskPanels[i].id == updated_task.id)
                {
                    vm.taskPanels[i] = updated_task;

                    taskUpdateFlag = true;
                    vm.updateFlag = true;
                    break;
                }
            }

            for(var doc of updated_task.documents)
            {
                if(!DocumentService.checkDocumentExistence(doc.name, vm.documentPanels))
                {
                    newDocumentsArray.push(doc);
                    vm.documentPanels.push(doc);
                    documentCreatedFlag = true;
                }
            }

            if(docsDeletedFromTaskUpdateModal.length)
            {
                for(var docDelFromTaskModal of docsDeletedFromTaskUpdateModal)
                {
                    for(var docPrjModal of vm.documentPanels)
                    {
                        if(docDelFromTaskModal.id == docPrjModal.id)
                        {
                            DocumentService.deleteDocumentModal(docPrjModal, vm.documentPanels);
                            documentsToDelete.push(docPrjModal);
                            documentDeletedFlag = true;
                            vm.updateFlag = true;
                        }
                    }
                }
            }

            for(var floatDocFromTask of floatingDocsFromTaskModal)
            {
                floatingDocuments.push(floatDocFromTask);
                documentDeletedFlag = true;
            }

            for(var i=0; i<vm.documentPanels.length; i++)
            {
                for(var j=0; j<modifiedDocuments.length; j++)
                {
                    if(vm.documentPanels[i].id == modifiedDocuments[j].id)
                    {
                        vm.documentPanels[i] = modifiedDocuments[j];
                        documentUpdateFlag = true;
                        vm.updateFlag = true;
                    }
                }
            }

            if(usersCreatedInTask.length)
            {
                for(var userFromTsk of usersCreatedInTask)
                {
                    updated_task.users.push(userFromTsk);
                }
            }

            var newUsers = UserService.checkUsersExistence(updated_task.users, vm.userPanels);

            if(newUsers.length)
            {
                for(var user of newUsers)
                {
                    vm.userPanels.push(user);
                    newUsersArray.push(user);
                    userCreatedFlag = true;
                }
            }

        }, function () {
        });
    };

    /*///////////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////////
     /////////////////// Modal For Editing Task [ Update Project ] //////////////////////////////// [E N D] ///////////
     *///////////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////////


    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     /////////////////// Modal For Editing Document [ Update Project ] ////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.editDocumentModal = function (documentToEdit) {

        var editDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/document_modal.html',
            controller: 'EditDocumentModalInstanceController',
            controllerAs: 'DocumentModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        isGlobal: false,
                        documentToEdit: JSON.parse(JSON.stringify(documentToEdit))
                    };
                }
            }
        });

        editDocumentModalInstance.result.then(function (updated_document)
        {
            //        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

            for(var i=0; i<vm.documentPanels.length; i++)
            {
                if(vm.documentPanels[i].id == updated_document.id)
                {
                    vm.documentPanels[i] = updated_document;
                    documentUpdateFlag = true;
                    vm.updateFlag = true;
                    break;
                }
            }
        }, function () {
        });
    };

    /*///////////////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////
     /////////////////// Modal For Editing Document [ Update Project ] //////////////////////////////// [E N D] ///////
     *///////////////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////


    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////// Modal For Importing Existing Tasks [ Update Project ] //////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.existingTasksModalInProjectModal = function()
    {
        var existingTasksModalInProjectModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/existing_tasks_modal.html',
            controller: 'ExistingTasksModalInstanceController',
            controllerAs: 'AddExistingTasksModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        projectName: vm.projectName,
                        tasksArray: JSON.parse(JSON.stringify(TaskService.getTaskPanels())),
                        tasksInModal: JSON.parse(JSON.stringify(vm.taskPanels))
                    };
                }
            }
        });

        existingTasksModalInProjectModalInstance.result.then(function (selected_existing_tasks) {

            //        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

            var new_tasks_obj = {};
            var new_doc_obj = {};
            var userNotFound;

            for(var task of selected_existing_tasks)
            {
                for(var taskPanel of TaskService.getTaskPanels())
                {
                    if(task.id == taskPanel.id)
                    {
                        if(vm.documentPanels.length)
                        {
                            documentAlreadyExists = DocumentService.chkTaskDocsInPrjDocsWithoutPrjName(task.documents, vm.documentPanels);

                            if(documentAlreadyExists.status)
                            {
                                alert("Task '" + task.name + "' Can Not Be Imported Because Document '" + documentAlreadyExists.existingDocument + "' Already Exists In This Project");
                                return
                            }

                            for(var doc of task.documents)
                            {
                                if(task.project)
                                {
                                    new_doc_obj = doc;
                                    new_doc_obj.id = DocumentService.newDocumentID();
                                    vm.documentPanels.push(doc);
                                    newDocumentsArray.push(doc);
                                    documentCreatedFlag = true;
                                }
                                else
                                {
                                    vm.documentPanels.push(doc);
                                    newDocumentsArray.push(doc);
                                    documentCreatedFlag = true;
                                }
                            }

                            if(taskPanel.project)
                            {
                                new_tasks_obj = task;
                                new_tasks_obj.id = TaskService.newTaskID();
                                newTasksArray.push(new_tasks_obj);
                                vm.taskPanels.push(new_tasks_obj);
                                new_tasks_obj = {};
                                taskCreatedFlag = true;
                                vm.updateFlag = true;
                            }
                            else
                            {
                                for(var doc of task.documents)
                                {
                                    floatingDocuments.push(doc);
                                }

                                floatingTasks.push(task);
                                newTasksArray.push(task);
                                vm.taskPanels.push(task);
                                taskCreatedFlag = true;
                                taskDeletedFlag = true;
                                documentDeletedFlag = true;
                                vm.updateFlag = true;
                            }
                        }
                        else
                        {
                            for(var doc of task.documents)
                            {
                                if(task.project)
                                {
                                    new_doc_obj = doc;
                                    new_doc_obj.id = DocumentService.newDocumentID();
                                    vm.documentPanels.push(doc);
                                    newDocumentsArray.push(doc);
                                    documentCreatedFlag = true;
                                }
                                else
                                {
                                    vm.documentPanels.push(doc);
                                    newDocumentsArray.push(doc);
                                    documentCreatedFlag = true;
                                }
                            }

                            if(taskPanel.project)
                            {
                                new_tasks_obj = task;
                                new_tasks_obj.id = TaskService.newTaskID();
                                newTasksArray.push(new_tasks_obj);
                                vm.taskPanels.push(new_tasks_obj);
                                new_tasks_obj = {};
                                taskCreatedFlag = true;
                                vm.updateFlag = true;
                            }
                            else
                            {
                                floatingTasks.push(task);

                                for(var doc of task.documents)
                                {
                                    floatingDocuments.push(doc);
                                }

                                newTasksArray.push(task);
                                vm.taskPanels.push(task);
                                taskCreatedFlag = true;
                                taskDeletedFlag = true;
                                documentDeletedFlag = true;
                                vm.updateFlag = true;
                            }
                        }
                    }
                }

                if(task.users.length)
                {
                    for(var userImportedTask of task.users)
                    {
                        userNotFound = true;

                        for(var userProject of vm.userPanels)
                        {
                            if(userImportedTask.email == userProject.email)
                            {
                                userNotFound = false;
                            }
                        }

                        if(userNotFound)
                        {
                            vm.userPanels.push(userImportedTask);
                            newUsersArray.push(userImportedTask);

                            userCreatedFlag = true;
                        }
                    }
                }

            }

        }, function () {
        });

    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////
     ///////////// Modal For Importing Existing Tasks [ Update Project ] //////////////////////////////// [E N D] /////
     */////////////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     /////////////////// Cancel Project Update ////////////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    /*/////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////////////
     /////////////////// Cancel Project Update ////////////////////////////////////////////////// [E N D] /////////////
     */////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     /////////////////// Delete Task [ Update Project ] ///////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.deleteTask = function(taskToDelete)
    {
//        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

        var modalDocuments = JSON.parse(JSON.stringify(vm.documentPanels));

        for(var doc of modalDocuments)
        {
            if(doc.task == taskToDelete.name)
            {
                DocumentService.deleteDocumentModal(doc, vm.documentPanels);
                DocumentService.deleteDocumentModal(doc, newDocumentsArray);
                documentsToDelete.push(doc);
                documentDeletedFlag = true;
            }
        }

        tasksToDelete.push(taskToDelete);
        TaskService.deleteTaskModal(taskToDelete, vm.taskPanels);
        taskDeletedFlag = true;
        vm.updateFlag = true;
    };

    /*//////////////////////////////////////////////////////////////////////////////////////////////// [E N D] ////////
     /////////////////// Delete Task [ Update Project ] ////////////////////////////////////////////// [E N D] ////////
     *//////////////////////////////////////////////////////////////////////////////////////////////// [E N D] ////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     /////////////////// Delete Document [ Update Project ] ///////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.deleteDocument = function(documentToDelete)
    {
        //        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

        documentsToDelete.push(documentToDelete);
        DocumentService.deleteDocumentModal(documentToDelete, vm.documentPanels);

        var documentDeletedFromTask = DocumentService.deleteDocumentsFromModalTask(documentToDelete, vm.taskPanels);

        if(documentDeletedFromTask)
        {
            taskUpdateFlag = true;
        }

        documentDeletedFlag = true;
        vm.updateFlag = true;
    };

    /*//////////////////////////////////////////////////////////////////////////////////////////////////// [E N D] ////
     /////////////////// Delete Document [ Update Project ] ////////////////////////////////////////////// [E N D] ////
     *//////////////////////////////////////////////////////////////////////////////////////////////////// [E N D] ////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Delete User [ Update Project ] ////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.deleteUser = function(userToDelete)
    {
        //        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

        usersToDelete.push(userToDelete);

        UserService.deleteUserModal(userToDelete, vm.userPanels);
//        UserService.deleteDocumentsFromModalTask(documentToDelete, tasksArray);

        userDeletedFlag = true;
        vm.updateFlag = true;

    };

    /*//////////////////////////////////////////////////////////////////////////////////////// [E N D] ////////////////
     ////////////////// Delete User [ Update Project ] /////////////////////////////////////// [E N D] ////////////////
     *//////////////////////////////////////////////////////////////////////////////////////// [E N D] ////////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////// Add From Existing Documents [ Update Project ] /////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.existingDocumentsModalInProjectModal = function()
    {
        var existingDocumentsModalInProjectModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/existing_documents_modal.html',
            controller: 'ExistingDocumentsModalInstanceController',
            controllerAs: 'AddExistingDocumentsModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        triggeredFrom: "Update Project",
                        projectName: vm.projectName,
                        documentsArray: JSON.parse(JSON.stringify(DocumentService.getDocumentPanels())),
                        documentsInModal: JSON.parse(JSON.stringify(vm.documentPanels))
                    };
                }
            }
        });

        existingDocumentsModalInProjectModalInstance.result.then(function (selected_existing_documents) {

            //        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

            var new_documents_obj = {};

            for(var selectedDoc of selected_existing_documents)
            {
                for(var globalDoc of DocumentService.getDocumentPanels())
                {
                    if(selectedDoc.id == globalDoc.id)
                    {
                        if(globalDoc.project)
                        {
                            new_documents_obj = selectedDoc;
                            new_documents_obj.id = DocumentService.newDocumentID();
                            newDocumentsArray.push(new_documents_obj);
                            vm.documentPanels.push(new_documents_obj);
                            new_documents_obj = {};
                            documentCreatedFlag = true;
                            vm.updateFlag = true;
                        }
                        else
                        {
                            floatingDocuments.push(selectedDoc);
                            newDocumentsArray.push(selectedDoc);
                            vm.documentPanels.push(selectedDoc);
                            documentCreatedFlag = true;
                            documentDeletedFlag = true;
                            vm.updateFlag = true;
                        }
                    }
                }
            }

        }, function () {
        });

    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////
     ///////////// Add From Existing Documents [ Update Project ] /////////////////////////////////////// [E N D] /////
     */////////////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Task Info /////// [ Project Info ] ///////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.infoTaskModal = function (taskInfo) {

        var editTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/task_info.html',
            controller: 'InfoTaskModalInstanceController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        taskInfo: JSON.parse(JSON.stringify(taskInfo))
                    };
                }
            }
        });

        editTaskModalInstance.result.then(function ()
        {

        }, function () {

        });
    };
    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For Task Info ////// [ Project Info ] ///////////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Document Info /////// [ Project Info ] ///////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.infoDocumentModal = function (documentInfo) {

        var editDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/document_info.html',
            controller: 'InfoDocumentModalInstanceController',
            controllerAs: 'DocumentModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        documentInfo: JSON.parse(JSON.stringify(documentInfo))
                    };
                }
            }
        });

        editDocumentModalInstance.result.then(function ()
        {

        }, function () {

        });
    };

    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For Document Info /////// [ Project Info ] //////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For User Info ///////// [ Project Info ] /////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.infoUserModal = function (userInfo) {

        var editUserModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/user_info.html',
            controller: 'InfoUserModalInstanceController',
            controllerAs: 'UserModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        userInfo: JSON.parse(JSON.stringify(userInfo))
                    };
                }
            }
        });

        editUserModalInstance.result.then(function ()
        {

        }, function () {

        });
    };

    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For User Info /////// [ Project Info ] //////////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

}]);

app.controller('ExistingTasksModalInstanceController', ['$scope', '$uibModalInstance', 'dataForThisModalInstance', 'TaskService', function ($scope, $uibModalInstance, dataForThisModalInstance, TaskService) {

    var vm = this;
    var noTasks = false;

    vm.modalHeading = 'Import Tasks';

    vm.existingTasksOptions = TaskService.removeProjectTasksFromExistingTasks(dataForThisModalInstance.tasksInModal, dataForThisModalInstance.projectName);

    if(vm.existingTasksOptions.length == 0)
    {
        vm.existingTasksOptions = [
            {
                'id': 0,
                'name': 'No Tasks Are Available'
            }];

        noTasks = true;
    }

    if(vm.existingTasksOptions.length > 10)
    {
        vm.multiSearchSwitch = true;
    }
    else
    {
        vm.multiSearchSwitch = false;
    }

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Create Existing Task //////////////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.addExistingTasksInProject = function() {

        //        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

        if((vm.selectedExistingTasks) && (!noTasks))
        {
            if(vm.selectedExistingTasks.length > 1)
            {
                var taskNamesArray = [];

                for(var task of vm.selectedExistingTasks)
                {
                    taskNamesArray.push(task.name);
                }

                if(TaskService.hasDuplicates(taskNamesArray))
                {
                    alert("A Project Can Not Have Tasks With Same Names");
                    return;
                }
            }

            for(var task of vm.selectedExistingTasks)
            {
                for(var taskModal of dataForThisModalInstance.tasksInModal)
                {
                    if(task.name == taskModal.name)
                    {
                        alert("Task '" + task.name + "' Already Exists In This Project");
                        return;
                    }
                }
            }

            $uibModalInstance.close(vm.selectedExistingTasks);
        }

    };

    /*////////////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////
     ////////////////// Create Existing Task /////////////////////////////////////////////////////////// [E N D] //////
     *////////////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

app.controller('ExistingDocumentsModalInstanceController', ['$scope', '$uibModalInstance', 'dataForThisModalInstance', 'ProjectService', 'DocumentService', function ($scope, $uibModalInstance, dataForThisModalInstance, ProjectService, DocumentService) {

    var vm = this;
    var noDocuments = false;
    var trigFrom = dataForThisModalInstance.triggeredFrom;
    var inside = dataForThisModalInstance.inside;

    vm.modalHeading = 'Import Documents';

    if(inside == "Create Task Global")
    {
        vm.existingDocumentsOptions = DocumentService.removeTaskDocsFromExistingDocs(dataForThisModalInstance.documentsInModal);
    }
    else if(inside == "Update Task Global")
    {
        vm.existingDocumentsOptions = DocumentService.removeTaskDocsFromExistingDocs(dataForThisModalInstance.documentsInModal, dataForThisModalInstance.taskName);
    }
    else if(trigFrom == "Create Project")
    {
        vm.existingDocumentsOptions = DocumentService.removePrjDocsFromExistingDocs(dataForThisModalInstance.documentsInModal);
    }
    else if(trigFrom == "Update Project")
    {
        vm.existingDocumentsOptions = DocumentService.removePrjDocsFromExistingDocs(dataForThisModalInstance.documentsInModal, dataForThisModalInstance.projectName);
    }
    else if(inside == "Create Project" || inside == "Update Project")
    {
        vm.existingDocumentsOptions = DocumentService.removePrjDocsFromExistingDocs(dataForThisModalInstance.docsInProjectModal, dataForThisModalInstance.projectName);
    }

    if(vm.existingDocumentsOptions.length == 0)
    {
        vm.existingDocumentsOptions = [
            {
                'id': 0,
                'name': 'No Documents Are Available'
            }];

        noDocuments = true;
    }

    if(vm.existingDocumentsOptions.length > 10)
    {
        vm.multiSearchSwitch = true;
    }
    else
    {
        vm.multiSearchSwitch = false;
    }

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Create Existing Document //////////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.addExistingDocumentsInProject = function() {

        //        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));
        if(inside == "Create Task Global" || inside == "Update Task Global")
        {
//            console.log("trigFrom 0: " + trigFrom);
//            console.log("inside 0: " + inside);

            if((vm.selectedExistingDocuments) && (!noDocuments))
            {
                if(vm.selectedExistingDocuments.length > 1)
                {
                    var documentNamesArray = [];

                    for(var document of vm.selectedExistingDocuments)
                    {
                        documentNamesArray.push(document.name);
                    }

                    if(DocumentService.hasDuplicates(documentNamesArray))
                    {
                        alert("A Project Can Not Have Documents With Same Names");
                        return;
                    }
                }

                for(var document of vm.selectedExistingDocuments)
                {
                    for(var documentModal of dataForThisModalInstance.documentsInModal)
                    {
                        if(document.name == documentModal.name)
                        {
                            alert("Document '" + document.name + "' Already Exists In This Project");
                            return;
                        }
                    }
                }

                $uibModalInstance.close(vm.selectedExistingDocuments);
            }
        }
        if(trigFrom == "Create Project" || trigFrom == "Update Project")
        {
//            console.log("trigFrom 1: " + trigFrom);
//            console.log("inside 1: " + inside);

            if((vm.selectedExistingDocuments) && (!noDocuments))
            {
                if(vm.selectedExistingDocuments.length > 1)
                {
                    var documentNamesArray = [];

                    for(var document of vm.selectedExistingDocuments)
                    {
                        documentNamesArray.push(document.name);
                    }

                    if(DocumentService.hasDuplicates(documentNamesArray))
                    {
                        alert("A Project Can Not Have Documents With Same Names");
                        return;
                    }
                }

                for(var document of vm.selectedExistingDocuments)
                {
                    for(var documentModal of dataForThisModalInstance.documentsInModal)
                    {
                        if(document.name == documentModal.name)
                        {
                            alert("Document '" + document.name + "' Already Exists In This Project");
                            return;
                        }
                    }
                }

                $uibModalInstance.close(vm.selectedExistingDocuments);
            }
        }
        else if((trigFrom == "Create Task" || trigFrom == "Update Task") && (inside == "Create Project"))
        {
//            console.log("trigFrom 2: " + trigFrom);
//            console.log("inside 2: " + inside);

            if((vm.selectedExistingDocuments) && (!noDocuments))
            {
                if(vm.selectedExistingDocuments.length > 1)
                {
                    var documentNamesArray = [];

                    for(var document of vm.selectedExistingDocuments)
                    {
                        documentNamesArray.push(document.name);
                    }

                    if(DocumentService.hasDuplicates(documentNamesArray))
                    {
                        alert("A Project Can Not Have Documents With Same Names");
                        return;
                    }
                }

                for(var document of vm.selectedExistingDocuments)
                {
                    for(var documentModal of dataForThisModalInstance.documentsInModal)
                    {
                        if(document.name == documentModal.name)
                        {
                            alert("Document '" + document.name + "' Already Exists In This Project");
                            return;
                        }
                    }
                }

                for(var selectedExtDoc of vm.selectedExistingDocuments)
                {
                    for(var docInPrjModal of dataForThisModalInstance.docsInProjectModal)
                    {
                        if(selectedExtDoc.name == docInPrjModal.name)
                        {
                            alert("Document '" + selectedExtDoc.name + "' Already Exists In This Project");
                            return;
                        }
                    }
                }

                $uibModalInstance.close(vm.selectedExistingDocuments);
            }
        }
        else if((trigFrom == "Create Task" || trigFrom == "Update Task") && (inside == "Update Project"))
        {
//            console.log("trigFrom 3: " + trigFrom);
//            console.log("inside 3: " + inside);

            if((vm.selectedExistingDocuments) && (!noDocuments))
            {
                if(vm.selectedExistingDocuments.length > 1)
                {
                    var documentNamesArray = [];

                    for(var document of vm.selectedExistingDocuments)
                    {
                        documentNamesArray.push(document.name);
                    }

                    if(DocumentService.hasDuplicates(documentNamesArray))
                    {
                        alert("A Project Can Not Have Documents With Same Names");
                        return;
                    }
                }

                for(var document of vm.selectedExistingDocuments)
                {
                    for(var documentModal of dataForThisModalInstance.documentsInModal)
                    {
                        if(document.name == documentModal.name)
                        {
                            alert("Document '" + document.name + "' Already Exists In This Project");
                            return;
                        }
                    }
                }

                for(var selectedExtDoc of vm.selectedExistingDocuments)
                {
                    for(var docInPrjModal of dataForThisModalInstance.docsInProjectModal)
                    {
                        if(selectedExtDoc.name == docInPrjModal.name)
                        {
                            alert("Document '" + selectedExtDoc.name + "' Already Exists In This Project");
                            return;
                        }
                    }
                }

                $uibModalInstance.close(vm.selectedExistingDocuments);
            }
        }

    };

    /*///////////////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////
     ////////////////// Create Existing Document ////////////////////////////////////////////////////// [E N D] ///////
     *///////////////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

app.controller('CreateTaskModalController', ['$scope', '$uibModal', '$uibModalInstance', 'dataForThisModalInstance', 'ProjectService', 'TaskService', 'DocumentService', 'UserService', function ($scope, $uibModal, $uibModalInstance, dataForThisModalInstance, ProjectService, TaskService, DocumentService, UserService) {

    var vm = this;
    var documentsArray = [];
    var usersArray = [];
    var modifiedDocuments = [];
    var floatingDocuments = [];
    var documentsToDelete = [];
    var documentCreatedFlag = false;
    var userCreatedFlag = false;
    var documentDeletedFlag = false;
    var documentUpdateFlag = false;

    vm.documentPanels = [];
    vm.userPanels = [];

    vm.taskUpdateFlag = true;

    if(dataForThisModalInstance.projectsArray.length > 10)
    {
        vm.multiSearchSwitch = true;
    }
    else
    {
        vm.multiSearchSwitch = false;
    }

    var new_task_params = '';

    vm.taskNameEditable = false;

    if(dataForThisModalInstance.isGlobal)
    {
        vm.taskProject = dataForThisModalInstance.projectsArray;
        vm.projectsListVisibility = true;
    }
    else
    {
        vm.projectsListVisibility = false;
    }

    vm.modalType = 'Create';
    vm.modalHeading = 'Create New Task';

// Datepicker

    vm.projectDate = '';

    vm.status = {
        opened: false
    };

    vm.openDatePicker = function($event) {
        vm.status.opened = true;
    };

    vm.format = 'dd.MM.yyyy';

    vm.statusVisibility = false;

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Create New Task ///////////////////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.createOrUpdateTask = function(task_params) {

        var taskName = task_params.taskName;

//        console.log("task_params : " + JSON.stringify(task_params));

        var taskTargetEndDate;

        if(task_params.taskTargetEndDate != undefined)
        {
            taskTargetEndDate = new Date(task_params.taskTargetEndDate);
        }

        var taskStatus = 'Pending Approval';
        var taskDescription = task_params.taskDescription;

        if(dataForThisModalInstance.isGlobal)
        {
            new_task_params = {
                'name': taskName,
                'targetEndDate': taskTargetEndDate,
                'status': taskStatus,
                'projectsArray': vm.selectedProjects,
                'description': taskDescription
            };

            var newTaskObject = {};
            var newTasksArray = [];
            var taskAlreadyExistsInProject = false;
            var documentAlreadyExistsInProject = false;

            if(new_task_params.projectsArray == undefined)
            {
                new_task_params.projectsArray = [];
            }

            if(new_task_params.projectsArray.length)
            {
                if(floatingDocuments.length)
                {
                    DocumentService.deleteFloatingDocuments(floatingDocuments);
                }

                var count = 0;

                for(var project of new_task_params.projectsArray)
                {
                    var userObject;
                    var updatedIdDocs = [];
                    var docIdUpdatedFlag = false;

                    newTaskObject.id = TaskService.newTaskID();

                    if(userCreatedFlag)
                    {
                        var projectId = ProjectService.getProjectId(project.name);
                        UserService.addProjectToUser(usersArray, projectId, project.name);
                        UserService.addTaskToUser(usersArray, newTaskObject.id, taskName);
                    }

                    newTaskObject.name = new_task_params.name;
                    newTaskObject.targetEndDate = new_task_params.targetEndDate;
                    newTaskObject.status = "Pending Approval";
                    newTaskObject.project = project.name;
                    newTaskObject.description = new_task_params.description;
                    newTaskObject.documents = documentsArray;
                    newTaskObject.users = [];
                    for(var user of usersArray)
                    {
                        newTaskObject.users.push({id: user.id, name: user.name, email: user.email});
                        userObject = {id: user.id, name: user.name, email: user.email};
                        ProjectService.addUserToProject(project.name, userObject);
                    }

                    taskAlreadyExistsInProject = ProjectService.checkTaskInProject(newTaskObject.project, newTaskObject);

                    if(documentsArray.length)
                    {
                        for(var i=0; i < documentsArray.length; i++)
                        {
                            documentAlreadyExistsInProject = ProjectService.checkDocumentInProject(project.name, documentsArray[i]);

                            if(documentAlreadyExistsInProject.status)
                            {
                                alert("Document '" + documentAlreadyExistsInProject.docName + "' Already Exists in Project '" + documentAlreadyExistsInProject.inProject + "'");
                                return;
                            }

                            if(count > 0)
                            {
                                var docWithNewId = {};
                                var bufferDoc = JSON.parse(JSON.stringify(documentsArray[i]));
                                docWithNewId.id = DocumentService.newDocumentID();
                                docWithNewId.name = bufferDoc.name;
                                docWithNewId.status = bufferDoc.status;
                                docWithNewId.project = bufferDoc.project;

                                updatedIdDocs.push(docWithNewId);

                                docIdUpdatedFlag = true;

                                ProjectService.addDocumentToProject(project.name, docWithNewId);
                            }
                            else
                            {
                                ProjectService.addDocumentToProject(project.name, documentsArray[i]);
                            }
                        }

                        if(docIdUpdatedFlag)
                        {
                            ProjectService.addProjectToDocument(updatedIdDocs, project.name);
                            DocumentService.addTaskToDocument(updatedIdDocs, taskName);
                            DocumentService.createDocumentPanel(updatedIdDocs);
                            newTaskObject.documents = updatedIdDocs;
                        }
                        else
                        {
                            ProjectService.addProjectToDocument(documentsArray, project.name);
                            DocumentService.addTaskToDocument(documentsArray, taskName);
                            DocumentService.createDocumentPanel(documentsArray);
                        }
                    }

                    if(taskAlreadyExistsInProject.status)
                    {
                        alert("Task '" + newTaskObject.name + "' Already Exists in Project '" + taskAlreadyExistsInProject.inProject + "'");
                        return;
                    }
                    else
                    {
                        ProjectService.addTaskToProject(newTaskObject.project, newTaskObject);
                        newTasksArray.push(newTaskObject);
                    }

                    newTaskObject = {};
                    count++;
                }

                TaskService.createTaskPanel(newTasksArray);

                $uibModalInstance.close();

            }
            else
            {
                if(floatingDocuments.length)
                {
                    DocumentService.deleteFloatingDocuments(floatingDocuments);
                }

                DocumentService.addTaskToDocument(documentsArray, taskName);

                for(var taskPanel of TaskService.getTaskPanels())
                {
                    if(!(taskPanel.project) && (taskPanel.name == new_task_params.name))
                    {
                        alert("Tasks With Same Name Can Exist Only When They Are Associated With Different Projects");
                        return;
                    }
                }

                newTaskObject.id = TaskService.newTaskID();

                if(userCreatedFlag)
                {
                    UserService.addTaskToUser(usersArray, newTaskObject.id, taskName);
                    userCreatedFlag = false;
                }

                newTaskObject.name = new_task_params.name;
                newTaskObject.targetEndDate = new_task_params.targetEndDate;
                newTaskObject.status = new_task_params.status;
                newTaskObject.project = '';
                newTaskObject.description = new_task_params.description;
                newTaskObject.documents = documentsArray;
                newTaskObject.users = [];
                for(var user of usersArray)
                {
                    newTaskObject.users.push({id: user.id, name: user.name, email: user.email});
                }
                newTasksArray.push(newTaskObject);

                TaskService.createTaskPanel(newTasksArray);
                DocumentService.createDocumentPanel(documentsArray);

//                console.log("newTaskObject : " + JSON.stringify(newTaskObject));

                newTaskObject = {};

                $uibModalInstance.close();
            }
        }
        else
        {
            if(TaskService.checkTaskExistence(taskName, dataForThisModalInstance.tasksArray))
            {
                alert("Task '" + taskName + "' Already Exists In This Project");
                return;
            }

            DocumentService.addTaskToDocument(documentsArray, taskName);

            new_task_params = {
                'id': TaskService.newTaskID(),
                'name': taskName,
                'targetEndDate': taskTargetEndDate,
                'status': taskStatus,
                'project': '',
                'description': taskDescription,
                'documents': documentsArray,
                'users': []
            };

//            if(userCreatedFlag)
//            {
//                for(var user of usersArray)
//                {
//                    new_task_params.users.push({id: user.id, name: user.name, email: user.email});
//                }
//
//                UserService.addTaskToUser(usersArray, new_task_params.id, taskName);
//
//                userCreatedFlag = false;
//            }

            $uibModalInstance.close({new_task_params: new_task_params, floatingDocuments: floatingDocuments, tasksToBeAddedInUser: {usersArray: usersArray, taskId: new_task_params.id, taskName: taskName}});
        }
    };

    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ////////////////// Create New Task //////////////////////////////////////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Add New Document Modal [ Create Task ] ////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.addNewDocumentModal = function()
    {
        var addNewDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/document_modal.html',
            controller: 'CreateDocumentModalInstanceController',
            controllerAs: 'DocumentModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        triggeredFrom: 'Create Task',
                        inside: dataForThisModalInstance.triggeredFrom,
                        documentsArray: documentsArray
                    };
                }
            }
        });

        addNewDocumentModalInstance.result.then(function (new_document_params) {

            //        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

            documentsArray.push(new_document_params);
            vm.documentPanels.push(new_document_params);

        }, function () {
        });

    };

    /*//////////////////////////////////////////////////////////////////////////////////////////// [E N D] ////////////
     ////////////////// Add New Document Modal  [ Create Task ] ////////////////////////////////// [E N D] ////////////
     *//////////////////////////////////////////////////////////////////////////////////////////// [E N D] ////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////// Assign Task To Users [ Create Task ] ///////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.addExistingUsersModal = function()
    {
//        console.log("vm.userPanels : " + JSON.stringify(vm.userPanels));

        var addExistingUsersModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/existing_users_modal.html',
            controller: 'ExistingUsersModalInstanceController',
            controllerAs: 'AddExistingUsersModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        triggeredFrom: "Create Task",
                        inside: dataForThisModalInstance.triggeredFrom,
                        usersArray: JSON.parse(JSON.stringify(UserService.getUserPanels())),
                        usersInModal: JSON.parse(JSON.stringify(vm.userPanels))
//                        usersInProjectModal: dataForThisModalInstance.usersInProjectModal
                    };
                }
            }
        });

        addExistingUsersModalInstance.result.then(function (selected_existing_users) {

            //        console.log("Global Docs AFTER : " + JSON.stringify(UserService));

            var new_users_obj = {};

            for(var selectedDoc of selected_existing_users)
            {
                usersArray.push(selectedDoc);
                vm.userPanels.push(selectedDoc);

                userCreatedFlag = true;
            }
        }, function () {
        });

    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////
     ///////////// Assign Task To Users [ Create Task ] ///////////////////////////////////////////////// [E N D] /////
     */////////////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     /////////////////// Modal For Editing Document [ Create Task ] ///////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.editDocumentModal = function (documentToEdit) {

        var editDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/document_modal.html',
            controller: 'EditDocumentModalInstanceController',
            controllerAs: 'DocumentModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        isGlobal: false,
                        documentToEdit: JSON.parse(JSON.stringify(documentToEdit))
                    };
                }
            }
        });

        editDocumentModalInstance.result.then(function (updated_document)
        {
            for(var i=0; i<vm.documentPanels.length; i++)
            {
                if(vm.documentPanels[i].id == updated_document.id)
                {
                    vm.documentPanels[i] = updated_document;
                    documentUpdateFlag = true;
                    vm.taskUpdateFlag = true;
                    break;
                }
            }

            for(var j=0; j<documentsArray.length; j++)
            {
                if(documentsArray[j].id == updated_document.id)
                {
                    documentsArray[j] = updated_document;
                    documentUpdateFlag = true;
                    vm.taskUpdateFlag = true;
                    break;
                }
            }

        }, function () {
        });
    };

    /*///////////////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////
     /////////////////// Modal For Editing Document [ Create Task ] /////////////////////////////////// [E N D] ///////
     *///////////////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////// Add From Existing Documents [ Create Task ] ////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.existingDocumentsModalInProjectModal = function()
    {
        var existingDocumentsModalInProjectModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/existing_documents_modal.html',
            controller: 'ExistingDocumentsModalInstanceController',
            controllerAs: 'AddExistingDocumentsModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        triggeredFrom: "Create Task",
                        inside: dataForThisModalInstance.triggeredFrom,
                        documentsArray: JSON.parse(JSON.stringify(DocumentService.getDocumentPanels())),
                        documentsInModal: JSON.parse(JSON.stringify(vm.documentPanels)),
                        docsInProjectModal: dataForThisModalInstance.docsInProjectModal
                    };
                }
            }
        });

        existingDocumentsModalInProjectModalInstance.result.then(function (selected_existing_documents) {

            //        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

            var new_documents_obj = {};

            for(var selectedDoc of selected_existing_documents)
            {
                for(var globalDoc of DocumentService.getDocumentPanels())
                {
                    if(selectedDoc.id == globalDoc.id)
                    {
                        if(globalDoc.task)
                        {
                            new_documents_obj = selectedDoc;
                            new_documents_obj.id = DocumentService.newDocumentID();
                            documentsArray.push(new_documents_obj);
                            vm.documentPanels.push(new_documents_obj);
                            new_documents_obj = {};
                            documentCreatedFlag = true;
                        }
                        else
                        {
                            floatingDocuments.push(selectedDoc);
                            documentsArray.push(selectedDoc);
                            vm.documentPanels.push(selectedDoc);
                            documentCreatedFlag = true;
                            documentDeletedFlag = true;
                        }
                    }
                }
            }
        }, function () {
        });

    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////
     ///////////// Add From Existing Documents [ Create Task ] ////////////////////////////////////////// [E N D] /////
     */////////////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Delete Document [ Create Task ] ///////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.deleteDocument = function(documentToDelete)
    {
//        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

        DocumentService.deleteDocumentModal(documentToDelete, vm.documentPanels);
        DocumentService.deleteDocumentModal(documentToDelete, documentsArray);
    };

    /*///////////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////////
     ////////////////// Delete Document [ Create Task ] /////////////////////////////////////////// [E N D] ///////////
     *///////////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Delete User [ Create Task ] ////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.deleteUser = function(userToDelete)
    {
        UserService.deleteUserInTaskModal(userToDelete, vm.userPanels);
        UserService.deleteUserInTaskModal(userToDelete, usersArray);
    };

    /*//////////////////////////////////////////////////////////////////////////////////////// [E N D] ////////////////
     ////////////////// Delete User [ Create Task ] ////////////////////////////////////////// [E N D] ////////////////
     *//////////////////////////////////////////////////////////////////////////////////////// [E N D] ////////////////


    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Document Info /////// [ Create Task ] /////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.infoDocumentModal = function (documentInfo) {

        var editDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/document_info.html',
            controller: 'InfoDocumentModalInstanceController',
            controllerAs: 'DocumentModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        documentInfo: JSON.parse(JSON.stringify(documentInfo))
                    };
                }
            }
        });

        editDocumentModalInstance.result.then(function ()
        {

        }, function () {

        });
    };

    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For Document Info /////// [ Create Task ] ////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For User Info ///////// [ Create Task ] /////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.infoUserModal = function (userInfo) {

        var editUserModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/user_info.html',
            controller: 'InfoUserModalInstanceController',
            controllerAs: 'UserModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        userInfo: JSON.parse(JSON.stringify(userInfo))
                    };
                }
            }
        });

        editUserModalInstance.result.then(function ()
        {

        }, function () {

        });
    };

    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For User Info /////// [ Create Task ] //////////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

app.controller('EditTaskModalInstanceController', ['$scope', '$uibModal', '$uibModalInstance', 'dataForThisModalInstance', 'ProjectService', 'TaskService', 'DocumentService', 'UserService', function ($scope, $uibModal, $uibModalInstance, dataForThisModalInstance, ProjectService, TaskService, DocumentService, UserService) {

    var vm = this;
    var updatedDocumentsArray = [];
    var updatedUsersArray = [];
    var modifiedDocuments = [];
    var documentDeletedFlag = false;
    var userDeletedFlag = false;
    var documentCreatedFlag = false;
    var userCreatedFlag = false;
    var documentUpdateFlag = false;
    var userUpdateFlag = false;
    var documentsToDelete = [];
    var usersToDelete = [];
    var floatingDocuments = [];
    var taskToEdit = dataForThisModalInstance.taskToEdit;
    var taskProject = taskToEdit.project;

    vm.taskUpdateFlag = false;
    vm.taskNameEditable = true;
    vm.taskName = taskToEdit.name;

    if(taskToEdit.targetEndDate != undefined)
    {
        vm.taskTargetEndDate = new Date(taskToEdit.targetEndDate);
    }

    vm.taskStatus = taskToEdit.status;
    vm.taskDescription = taskToEdit.description;
    vm.documentPanels = taskToEdit.documents;

    var taskUsers = UserService.getTaskUsers(taskToEdit.users);

    vm.userPanels = JSON.parse(JSON.stringify(taskUsers));

    vm.modalType = 'Update';
    vm.modalHeading = 'Update Task';

    vm.statuses = [
        {'status': 'Pending Approval'},
        {'status': 'Approved'},
        {'status': 'In Progress'},
        {'status': 'Completed'},
        {'status': 'Closed'}
    ];

    vm.selectedStatus = taskToEdit.status;
    vm.statusVisibility = true;

// Datepicker

    vm.projectDate = '';

    vm.status = {
        opened: false
    };

    vm.openDatePicker = function($event) {
        vm.status.opened = true;
    };

    vm.format = 'dd.MM.yyyy';

    vm.taskUpdateDetected = function()
    {
        vm.taskUpdateFlag = true;
    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Update Task ///////////////////////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.createOrUpdateTask = function(task_params) {

//        console.log("task_params : " + JSON.stringify(task_params));

        var updated_task = {};
        var userObject;
        var userAddedToTask = false;

        taskToEdit.targetEndDate = new Date(task_params.taskTargetEndDate);
        taskToEdit.status = task_params.selectedStatus;
        taskToEdit.description = task_params.taskDescription;

        if(dataForThisModalInstance.isGlobal)
        {
            if(documentDeletedFlag)
            {
                for(var doc of documentsToDelete)
                {
                    if(doc.project)
                    {
                        ProjectService.delDocFromProject(doc);
                    }
                }

                DocumentService.deleteDocumentGlobal(documentsToDelete, DocumentService.getDocumentPanels());

                if(floatingDocuments.length)
                {
                    DocumentService.deleteFloatingDocuments(floatingDocuments);
                }

                documentDeletedFlag = false;
            }

            if(documentCreatedFlag)
            {
                DocumentService.addTaskToDocument(updatedDocumentsArray, taskToEdit.name);

                DocumentService.createDocumentPanel(updatedDocumentsArray);

                for(var newDocument of updatedDocumentsArray)
                {
                    TaskService.addDocumentToTask(taskToEdit.id, newDocument);

                    if(dataForThisModalInstance.taskToEdit.project)
                    {
                        ProjectService.addDocumentToProject(taskToEdit.project, newDocument);
                        ProjectService.addProjectToDocument([newDocument], taskToEdit.project);
                    }
                }

                documentCreatedFlag = false;
            }

            if(documentUpdateFlag)
            {
                if(taskToEdit.project)
                {
                    ProjectService.updateDocumentsInProject(taskToEdit.project, JSON.parse(JSON.stringify(modifiedDocuments)));
                }

                DocumentService.updateDocuments(JSON.parse(JSON.stringify(modifiedDocuments)), false);

                documentUpdateFlag = false;
            }

            if(userCreatedFlag)
            {
                UserService.addTaskToUser(updatedUsersArray, taskToEdit.id, taskToEdit.name);
                for(var user of updatedUsersArray)
                {
                    taskToEdit.users.push({id: user.id, name: user.name, email: user.email});
                    userAddedToTask = true;
                }
            }

            updated_task = TaskService.updateTasks([taskToEdit], true);

            if(updated_task.project)
            {
                ProjectService.updateTasksInProject(updated_task.project, [updated_task]);

                if(userAddedToTask)
                {
                    var projectId = ProjectService.getProjectId(updated_task.project);
                    UserService.addProjectToUser(updatedUsersArray, projectId, updated_task.project);

                    var projectToUpdate = ProjectService.getProjectByName(updated_task.project);

                    for(var user of updatedUsersArray)
                    {
                        userObject = {id: user.id, name: user.name, email: user.email};
                        ProjectService.addUserToProject(updated_task.project, userObject);
                    }

                }
            }

            if(userDeletedFlag)
            {
                TaskService.deleteUsersFromTasks(usersToDelete, taskToEdit.id);
                UserService.deleteTaskFromUser(usersToDelete, taskToEdit.id);
            }

        }
        else if(dataForThisModalInstance.triggeredFrom == "Create Project")
        {
//            if(userCreatedFlag)
//            {
//                UserService.addTaskToUser(updatedUsersArray, taskToEdit.id, taskToEdit.name);
//                for(var user of updatedUsersArray)
//                {
//                    taskToEdit.users.push({id: user.id, name: user.name, email: user.email});
//                    userAddedToTask = true;
//                }
//            }

            updated_task = taskToEdit;

            if(updated_task.project)
            {
                ProjectService.updateTasksInProject(updated_task.project, [updated_task]);

//                if(userAddedToTask)
//                {
//                    var projectId = ProjectService.getProjectId(updated_task.project);
//                    UserService.addProjectToUser(updatedUsersArray, projectId, updated_task.project);
//
//                    var projectToUpdate = ProjectService.getProjectByName(updated_task.project);
//
//                    for(var user of updatedUsersArray)
//                    {
//                        userObject = {id: user.id, name: user.name, email: user.email};
//                        ProjectService.addUserToProject(updated_task.project, userObject);
//                    }
//
//                }
            }

        }
        else if(dataForThisModalInstance.triggeredFrom == "Update Project")
        {

//            if(userCreatedFlag)
//            {
//                UserService.addTaskToUser(updatedUsersArray, taskToEdit.id, taskToEdit.name);
//                for(var user of updatedUsersArray)
//                {
//                    taskToEdit.users.push({id: user.id, name: user.name, email: user.email});
//                    userAddedToTask = true;
//                }
//            }

            updated_task = taskToEdit;

        }
        else
        {
            updated_task = taskToEdit;
        }

        console.log("usersToDelete : " + JSON.stringify(usersToDelete));

        $uibModalInstance.close({updated_task: updated_task, documentsToDelete: documentsToDelete, floatingDocuments: floatingDocuments, modifiedDocuments: modifiedDocuments, tasksToBeAddedInUser: {usersArray: updatedUsersArray, taskId: taskToEdit.id, taskName: taskToEdit.name}});

    };

    /*/////////////////////////////////////////////////////////////////////////////////////// [E N D] /////////////////
     ////////////////// Update Task ///////////////////////////////////////////////////////// [E N D] /////////////////
     */////////////////////////////////////////////////////////////////////////////////////// [E N D] /////////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Add New Document Modal [ Update Task ] ////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.addNewDocumentModal = function()
    {
        var addNewDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/document_modal.html',
            controller: 'CreateDocumentModalInstanceController',
            controllerAs: 'DocumentModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        isGlobal: false,
                        triggeredFrom: 'Update Task',
                        inside: dataForThisModalInstance.triggeredFrom,
                        taskName: dataForThisModalInstance.taskToEdit.name,
                        taskProject: taskProject,
                        documentsArray: JSON.parse(JSON.stringify(vm.documentPanels)),
                        docsInProjectModal: dataForThisModalInstance.docsInProjectModal                        
                    };
                }
            }
        });

        addNewDocumentModalInstance.result.then(function (new_document_params) {

            //        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

            updatedDocumentsArray.push(new_document_params);
            vm.documentPanels.push(new_document_params);

            documentCreatedFlag = true;

            vm.taskUpdateFlag = true;

        }, function () {
        });

    };

    /*//////////////////////////////////////////////////////////////////////////////////////////// [E N D] ////////////
     ////////////////// Add New Document Modal  [ Update Task ] ////////////////////////////////// [E N D] ////////////
     *//////////////////////////////////////////////////////////////////////////////////////////// [E N D] ////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////// Add From Existing Documents [ Update Task ] ////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.existingDocumentsModalInProjectModal = function()
    {
        var existingDocumentsModalInProjectModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/existing_documents_modal.html',
            controller: 'ExistingDocumentsModalInstanceController',
            controllerAs: 'AddExistingDocumentsModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        triggeredFrom: "Update Task",
                        inside: dataForThisModalInstance.triggeredFrom,
                        projectName: vm.projectName,
                        documentsArray: JSON.parse(JSON.stringify(DocumentService.getDocumentPanels())),
                        documentsInModal: JSON.parse(JSON.stringify(vm.documentPanels)),
                        taskName: dataForThisModalInstance.taskToEdit.name,
                        taskProject: taskProject,
                        docsInProjectModal: dataForThisModalInstance.docsInProjectModal
                    };
                }
            }
        });

        existingDocumentsModalInProjectModalInstance.result.then(function (selected_existing_documents) {

            //        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

            var new_documents_obj = {};

            for(var selectedDoc of selected_existing_documents)
            {
                for(var globalDoc of DocumentService.getDocumentPanels())
                {
                    if(selectedDoc.id == globalDoc.id)
                    {
                        if(globalDoc.task)
                        {
                            new_documents_obj = selectedDoc;
                            new_documents_obj.id = DocumentService.newDocumentID();
                            updatedDocumentsArray.push(new_documents_obj);
                            vm.documentPanels.push(new_documents_obj);
                            new_documents_obj = {};
                            documentCreatedFlag = true;
                            vm.taskUpdateFlag = true;
                        }
                        else
                        {
                            floatingDocuments.push(selectedDoc);
                            updatedDocumentsArray.push(selectedDoc);
                            vm.documentPanels.push(selectedDoc);
                            documentCreatedFlag = true;
                            documentDeletedFlag = true;
                            vm.taskUpdateFlag = true;
                        }
                    }
                }
            }
        }, function () {
        });

    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////
     ///////////// Add From Existing Documents [ Update Task ] ////////////////////////////////////////// [E N D] /////
     */////////////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////// Assign Users To Task [ Update Task ] ///////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.addExistingUsersModal = function()
    {
        var addExistingUsersModal = $uibModal.open({
            animation: false,
            templateUrl: 'partials/existing_users_modal.html',
            controller: 'ExistingUsersModalInstanceController',
            controllerAs: 'AddExistingUsersModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        triggeredFrom: "Update Task",
                        inside: dataForThisModalInstance.triggeredFrom,
                        projectName: vm.projectName,
                        usersArray: JSON.parse(JSON.stringify(UserService.getUserPanels())),
                        usersInModal: JSON.parse(JSON.stringify(vm.userPanels)),
                        taskName: dataForThisModalInstance.taskToEdit.name,
                        taskProject: taskProject,
                        docsInProjectModal: dataForThisModalInstance.docsInProjectModal
//                        usersInProjectModal: dataForThisModalInstance.usersInProjectModal
                    };
                }
            }
        });

        addExistingUsersModal.result.then(function (selected_existing_users) {

            //        console.log("Global Docs AFTER : " + JSON.stringify(UserService));

            var new_users_obj = {};

            for(var selectedDoc of selected_existing_users)
            {
                updatedUsersArray.push(selectedDoc);
                vm.userPanels.push(selectedDoc);
                userCreatedFlag = true;
                vm.taskUpdateFlag = true;
            }
        }, function () {
        });

    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////
     ///////////// Assign Users To Task [ Update Task ] ///////////////////////////////////////////////// [E N D] /////
     */////////////////////////////////////////////////////////////////////////////////////////////////// [E N D] /////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     /////////////////// Modal For Editing Document [ Update Task ] ///////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.editDocumentModal = function (documentToEdit) {

        var editDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/document_modal.html',
            controller: 'EditDocumentModalInstanceController',
            controllerAs: 'DocumentModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        isGlobal: false,
                        documentToEdit: JSON.parse(JSON.stringify(documentToEdit))
                    };
                }
            }
        });

        editDocumentModalInstance.result.then(function (updated_document)
        {
            var docModifiedAgainFlag = false;

            for(var x=0; x<modifiedDocuments.length; x++)
            {
                if(modifiedDocuments[x].id == updated_document.id)
                {
                    modifiedDocuments[x] = updated_document;
                    docModifiedAgainFlag = true;
                    break;
                }
            }

            if(!docModifiedAgainFlag)
            {
                modifiedDocuments.push(updated_document);
            }

            for(var i=0; i<vm.documentPanels.length; i++)
            {
                if(vm.documentPanels[i].id == updated_document.id)
                {
                    vm.documentPanels[i] = updated_document;
                    documentUpdateFlag = true;
                    vm.taskUpdateFlag = true;
                    break;
                }
            }

        }, function () {
        });
    };

    /*///////////////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////
     /////////////////// Modal For Editing Document [ Update Task ] /////////////////////////////////// [E N D] ///////
     *///////////////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Delete Document [ Update Task ] ///////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.deleteDocument = function(documentToDelete)
    {
//        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));
        documentsToDelete.push(documentToDelete);

        DocumentService.deleteDocumentModal(documentToDelete, vm.documentPanels);
        DocumentService.deleteDocumentModal(documentToDelete, updatedDocumentsArray);

        documentDeletedFlag = true;
        vm.taskUpdateFlag = true;
    };

    /*///////////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////////
     ////////////////// Delete Document [ Update Task ] /////////////////////////////////////////// [E N D] ///////////
     *///////////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Delete User [ Update Task ] ///////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.deleteUser = function(userToDelete)
    {
        usersToDelete.push(userToDelete);

        UserService.deleteUserInTaskModal(userToDelete, vm.userPanels);
        UserService.deleteUserInTaskModal(userToDelete, updatedUsersArray);

        userDeletedFlag = true;
        vm.taskUpdateFlag = true;

    };

    /*//////////////////////////////////////////////////////////////////////////////////////// [E N D] ////////////////
     ////////////////// Delete User [ Update Task ] ////////////////////////////////////////// [E N D] ////////////////
     *//////////////////////////////////////////////////////////////////////////////////////// [E N D] ////////////////

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Document Info /////// [ Update Task ] ////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.infoDocumentModal = function (documentInfo) {

        var editDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/document_info.html',
            controller: 'InfoDocumentModalInstanceController',
            controllerAs: 'DocumentModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        documentInfo: JSON.parse(JSON.stringify(documentInfo))
                    };
                }
            }
        });

        editDocumentModalInstance.result.then(function ()
        {

        }, function () {

        });
    };

    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For Document Info /////// [ Update Task ] ///////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For User Info ///////// [ Update Task ] /////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.infoUserModal = function (userInfo) {

        var editUserModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/user_info.html',
            controller: 'InfoUserModalInstanceController',
            controllerAs: 'UserModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        userInfo: JSON.parse(JSON.stringify(userInfo))
                    };
                }
            }
        });

        editUserModalInstance.result.then(function ()
        {

        }, function () {

        });
    };

    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ///////////////// Modal For User Info /////// [ Update Task ] //////////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

}]);

app.controller('EditDocumentModalInstanceController', ['$scope', '$uibModalInstance', 'dataForThisModalInstance', 'ProjectService', 'TaskService', 'DocumentService', function ($scope, $uibModalInstance, dataForThisModalInstance, ProjectService, TaskService, DocumentService) {

    var vm = this;

    vm.documentUpdateFlag = false;
    vm.documentNameEditable = true;
    vm.documentName = dataForThisModalInstance.documentToEdit.name;

    vm.documentDescription = dataForThisModalInstance.documentToEdit.description;

    vm.modalType = 'Update';
    vm.modalHeading = 'Update Document';

// Datepicker

    vm.projectDate = '';

    vm.status = {
        opened: false
    };

    vm.openDatePicker = function($event) {
        vm.status.opened = true;
    };

    vm.format = 'dd.MM.yyyy';

    vm.documentUpdateDetected = function()
    {
        vm.documentUpdateFlag = true;
    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Update Document ///////////////////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.createOrUpdateDocument = function(documentName, documentDescription) {

        //        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

        var updated_document = {};
        dataForThisModalInstance.documentToEdit.description = vm.documentDescription;

        if(dataForThisModalInstance.isGlobal)
        {
            updated_document = DocumentService.updateDocuments([dataForThisModalInstance.documentToEdit], true);

            if(updated_document.project)
            {
                ProjectService.updateDocumentsInProject(updated_document.project, [updated_document]);
            }

            TaskService.updateDocumentsInTask(JSON.parse(JSON.stringify([updated_document])));

        }
        else
        {
            updated_document = dataForThisModalInstance.documentToEdit;
        }

        $uibModalInstance.close(updated_document);
    };

    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
     ////////////////// Update Document //////////////////////////////////////////////////////// [E N D] //////////////
     *////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

app.controller('CreateDocumentModalInstanceController', ['$scope', '$uibModalInstance', 'dataForThisModalInstance', 'ProjectService', 'DocumentService', function ($scope, $uibModalInstance, dataForThisModalInstance, ProjectService, DocumentService) {

    var vm = this;
    var new_document_params = '';

    vm.documentUpdateFlag = true;
    vm.documentNameEditable = false;

    vm.modalType = 'Create';
    vm.modalHeading = 'Create New Document';

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Create New Document ///////////////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.createOrUpdateDocument = function(document_params) {

        //        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

        var documentName = document_params.documentName;
        var documentDescription = document_params.documentDescription;

        if(dataForThisModalInstance.isGlobal)
        {
            new_document_params = {
                'name': documentName,
                'status': 'Document Status',
                'description': documentDescription
            };

            var newDocumentObject = {};
            var newDocumentsArray = [];
            var documentAlreadyExistsInProject = false;

            for(var documentPanel of DocumentService.getDocumentPanels())
            {
                if(!(documentPanel.project) && (documentPanel.name == new_document_params.name))
                {
                    alert("Documents With Same Name Can Exist Only When They Are Associated With Different Projects");
                    return;
                }
            }

            newDocumentObject.id = DocumentService.newDocumentID();
            newDocumentObject.name = new_document_params.name;
            newDocumentObject.status = "Waiting For Approval";
            newDocumentObject.project = '';
            newDocumentObject.task = '';
            newDocumentObject.description = new_document_params.description;
            newDocumentsArray.push(newDocumentObject);
            DocumentService.createDocumentPanel(newDocumentsArray);
            newDocumentObject = {};

            $uibModalInstance.close();
        }
        else if(dataForThisModalInstance.triggeredFrom == 'Update Project')
        {
            if(DocumentService.checkDocumentExistence(documentName, dataForThisModalInstance.documentsArray))
            {
                alert("Document '" + documentName + "' Already Exists In This Task");
                return;
            }

            if(dataForThisModalInstance.docsInProjectModal.length)
            {
                if(ProjectService.checkDocumentExistenceInTaskProject(documentName, dataForThisModalInstance.taskProject))
                {
                    alert("Document '" + documentName + "' Already Exists In Project '" + dataForThisModalInstance.taskProject + "' Where This Task Belongs, A Project Can Not Have Documents With Same Name");
                    return;
                }
            }

            new_document_params = {
                'id': DocumentService.newDocumentID(),
                'name': documentName,
                'status': 'Document Status',
                'project': '',
                'task': dataForThisModalInstance.taskName,
                'description': documentDescription
            };

            $uibModalInstance.close(new_document_params);

        }
        else if((dataForThisModalInstance.triggeredFrom == 'Update Task') && ((dataForThisModalInstance.inside == 'Create Project') || (dataForThisModalInstance.inside == 'Update Project')))
        {
            if(DocumentService.checkDocumentExistence(documentName, dataForThisModalInstance.documentsArray))
            {
                alert("Document '" + documentName + "' Already Exists In This Task");
                return;
            }

            if(dataForThisModalInstance.taskProject)
            {
                if(ProjectService.checkDocumentExistenceInTaskProject(documentName, dataForThisModalInstance.taskProject))
                {
                    alert("Document '" + documentName + "' Already Exists In Project '" + dataForThisModalInstance.taskProject + "' Where This Task Belongs, A Project Can Not Have Documents With Same Name");
                    return;
                }
            }

            if(dataForThisModalInstance.docsInProjectModal.length)
            {
                if(DocumentService.checkDocumentExistence(documentName, dataForThisModalInstance.docsInProjectModal))
                {
                    alert("Document '" + documentName + "' Already Exists In Project Where This Task Belongs, A Project Can Not Have Documents With Same Name");
                    return;
                }
            }

            new_document_params = {
                'id': DocumentService.newDocumentID(),
                'name': documentName,
                'status': 'Document Status',
                'project': '',
                'task': dataForThisModalInstance.taskName,
                'description': documentDescription
            };

            $uibModalInstance.close(new_document_params);

        }

        else if((dataForThisModalInstance.inside == 'Create Task Global') || (dataForThisModalInstance.inside == 'Update Task Global'))
        {
            if(DocumentService.checkDocumentExistence(documentName, dataForThisModalInstance.documentsArray))
            {
                alert("Document '" + documentName + "' Already Exists In This Task");
                return;
            }

            if(dataForThisModalInstance.taskProject)
            {
                if(ProjectService.checkDocumentExistenceInTaskProject(documentName, dataForThisModalInstance.taskProject))
                {
                    alert("Document '" + documentName + "' Already Exists In Project '" + dataForThisModalInstance.taskProject + "' Where This Task Belongs, A Project Can Not Have Documents With Same Name");
                    return;
                }
            }

            new_document_params = {
                'id': DocumentService.newDocumentID(),
                'name': documentName,
                'status': 'Document Status',
                'project': '',
                'task': dataForThisModalInstance.taskName,
                'description': documentDescription
            };

            $uibModalInstance.close(new_document_params);

        }

        else
        {
            if(DocumentService.checkDocumentExistence(documentName, dataForThisModalInstance.documentsArray))
            {
                alert("Document '" + documentName + "' Already Exists In This Project");
                return;
            }

            new_document_params = {
                'id': DocumentService.newDocumentID(),
                'name': documentName,
                'status': 'Document Status',
                'project': '',
                'task': '',
                'description': documentDescription
            };

            $uibModalInstance.close(new_document_params);
        }
    };

    /*////////////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////
     ////////////////// Create New Document //////////////////////////////////////////////////////////// [E N D] //////
     *////////////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

app.controller('CreateUserModalInstanceController', ['$scope', '$uibModalInstance', 'dataForThisModalInstance', 'ProjectService', 'UserService', function ($scope, $uibModalInstance, dataForThisModalInstance, ProjectService, UserService) {

    var vm = this;
    var new_user_params = '';
    var newUsersArray = [];

    vm.userUpdateFlag = true;

    vm.modalType = 'Create';
    vm.modalHeading = 'Create New User';

    vm.createOrUpdateUser = function(user_params) {

        //        console.log("Global Docs AFTER : " + JSON.stringify(UserService));

        new_user_params = {
            'id': UserService.newUserID(),
            'name': user_params.userName,
            'email': user_params.userEmail,
            'designation': user_params.userDesignation,
            'projects': [],
            'tasks': [],
            'documents': []
        };

        for (var userPanel of UserService.getUserPanels())
        {
            if (userPanel.email == new_user_params.email)
            {
                alert("Users Can Not Have Identical Email Address");
                return;
            }
        }

        newUsersArray.push(new_user_params);
        UserService.createUserPanel(newUsersArray);
        $uibModalInstance.close();
    };

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

app.controller('ExistingUsersModalInstanceController', ['$scope', '$uibModalInstance', 'dataForThisModalInstance', 'ProjectService', 'UserService', function ($scope, $uibModalInstance, dataForThisModalInstance, ProjectService, UserService) {

    var vm = this;
    var noUsers = false;
    var userInModal = dataForThisModalInstance.usersInModal;

    vm.modalHeading = 'Add Users';

    vm.existingUsersOptions = UserService.removeUsersExistingInProjectOrTask(userInModal);

    if(vm.existingUsersOptions.length > 10)
    {
        vm.multiSearchSwitch = true;
    }
    else
    {
        vm.multiSearchSwitch = false;
    }

    if(vm.existingUsersOptions.length == 0)
    {
        vm.existingUsersOptions = [
            {
                'id': 0,
                'email': 'No Users Are Available'
            }];

        noUsers = true;
    }

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Create Existing User //////////////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.addExistingUsersInProject = function() {

        //        console.log("Global Docs AFTER : " + JSON.stringify(UserService));

        if((vm.selectedExistingUsers) && (!noUsers))
        {
            $uibModalInstance.close(vm.selectedExistingUsers);
        }

    };

    /*///////////////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////
     ////////////////// Create Existing User ////////////////////////////////////////////////////////// [E N D] ///////
     *///////////////////////////////////////////////////////////////////////////////////////////////// [E N D] ///////

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);
