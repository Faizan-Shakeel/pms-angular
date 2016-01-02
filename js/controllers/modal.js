
var app = angular.module('modalsModule', ['ui.bootstrap']);

app.controller('ModalsController', ['$scope', '$rootScope', '$uibModal', 'NewProjectService','NewTaskService', '$log', function ($scope, $rootScope, $uibModal, NewProjectService ,NewTaskService, $log) {

    var vm = this;

    /*////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////// Modal For Creating Project ////////////////////////////////////////////////////////////////////
    */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.newProjectModal = function () {

        var newProjectModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_project_modal.html',
            controller: 'newProjectModalInstanceController',
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
//            $log.info('Modal dismissed at: ' + new Date());
        });
    };


    /*////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////// Modal For Creating Project ////////////////////////////[E N D]/////////////////////////////////
    */////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /*////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////// Modal For Editing Project //////////////////////////////////////////////////////////////////////
    */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.editProjectModal = function (projectToEdit) {

        var editProjectModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_project_modal.html',
            controller: 'ProjectEditModalInstanceController',
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
     /*////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Editing Project /////////////////////////////[E N D]//////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////


     /*////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     //////////////// Modal For Creating Task [ Global ] //////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.newTaskModal = function()
    {
        var newTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_task_modal.html',
            controller: 'AddNewTaskModalController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        isGlobal: true,
                        projectsArray: JSON.parse(JSON.stringify(NewProjectService.projectPanels))
                    };
                }
            }
        });

        newTaskModalInstance.result.then(function ()
        {

        }, function () {

        });
    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     //////////////// Modal For Creating Task [ Global ] ///////////////////////////// [E N D] ////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     //////////////// Modal For Creating Document [ Global ] /////////////////////////////////////////////////////////
     *////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.newDocumentModal = function()
    {
        var newDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_document_modal.html',
            controller: 'AddNewDocumentModalController',
            controllerAs: 'DocumentModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        isGlobal: true,
                        projectsArray: JSON.parse(JSON.stringify(NewProjectService.projectPanels))
                    };
                }
            }
        });

        newDocumentModalInstance.result.then(function ()
        {

        }, function () {

        });
    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     //////////////// Modal For Creating Document  [ Global ] ///////////////////////// [E N D] ///////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Editing Task  [ Global ] /////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.editTaskModal = function (taskToEdit) {

        var editTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_task_modal.html',
            controller: 'TaskEditModalInstanceController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        isGlobal: true,
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

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Editing Task  [ Global ] ////////////////////////////////// [E N D] //////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Editing Document  [ Global ] /////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.editDocumentModal = function (documentToEdit) {

        var editDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_document_modal.html',
            controller: 'DocumentEditModalInstanceController',
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

        editDocumentModalInstance.result.then(function ()
        {

        }, function () {

        });
    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Editing Document  [ Global ] ////////////////////////////////// [E N D] //////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]);

app.controller('ProjectEditModalInstanceController', ['$scope', '$uibModal', '$uibModalInstance', 'dataForThisModalInstance', 'NewProjectService', 'NewTaskService', 'NewDocumentService', function ($scope, $uibModal, $uibModalInstance, dataForThisModalInstance, NewProjectService, NewTaskService, NewDocumentService) {

    var vm = this;
    var updatedTasksArray = [];
    var updatedDocumentsArray = [];
    var tasksToDelete = [];
    var documentsToDelete = [];
    var floatingTasks = [];
    var floatingDocuments = [];
    var taskCreatedFlag = false;
    var documentCreatedFlag = false;
    var taskUpdateFlag = false;
    var documentUpdateFlag = false;
    var taskDeletedFlag = false;
    var documentDeletedFlag = false;
    vm.projectNameEditable = true;
    vm.modalHeading = 'Update Project';
    vm.modalType = 'Update';
    vm.projectName = dataForThisModalInstance.projectToEdit.name;
    vm.taskPanels = JSON.parse(JSON.stringify(dataForThisModalInstance.projectToEdit.taskPanels));
    vm.documentPanels = JSON.parse(JSON.stringify(dataForThisModalInstance.projectToEdit.documentPanels));

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Modal For Creating Task  [ Update Project ] ///////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.addNewTaskModal = function()
    {
        var addNewTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_task_modal.html',
            controller: 'AddNewTaskModalController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        isGlobal: false,
                        projectsArray: JSON.parse(JSON.stringify(NewProjectService.projectPanels)),
                        tasksArray: JSON.parse(JSON.stringify(vm.taskPanels))
                    };
                }
            }
        });

        addNewTaskModalInstance.result.then(function (new_task_params) {

            updatedTasksArray.push(new_task_params);
            vm.taskPanels.push(new_task_params);
            taskCreatedFlag = true;
            vm.updateFlag = true;

        }, function () {
//            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Modal For Creating Task  [ Update Project ] /////////////////////////[E N D]///////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Modal For Creating Document [ Update Project ] ////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.addNewDocumentModal = function()
    {
        var addNewDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_document_modal.html',
            controller: 'AddNewDocumentModalController',
            controllerAs: 'DocumentModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        isGlobal: false,
                        projectsArray: JSON.parse(JSON.stringify(NewProjectService.projectPanels)),
                        documentsArray: JSON.parse(JSON.stringify(vm.documentPanels))
                    };
                }
            }
        });

        addNewDocumentModalInstance.result.then(function (new_document_params) {

            updatedDocumentsArray.push(new_document_params);
            vm.documentPanels.push(new_document_params);
            documentCreatedFlag = true;
            vm.updateFlag = true;

        }, function () {
//            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Modal For Creating Document [ Update Project ] /////////////////////////[E N D]////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     /////////////////// Modal For Editing Task [ Update Project ] ////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.editTaskModal = function (taskToEdit) {

        var editTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_task_modal.html',
            controller: 'TaskEditModalInstanceController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        isGlobal: false,
                        taskToEdit: JSON.parse(JSON.stringify(taskToEdit))
                    };
                }
            }
        });

        editTaskModalInstance.result.then(function (updated_task)
        {
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
        }, function () {
        });
    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     /////////////////// Modal For Editing Task [ Update Project ] ////////////////////////////////[E N D]/////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     /////////////////// Modal For Editing Document [ Update Project ] ////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.editDocumentModal = function (documentToEdit) {

        console.log("aisundasd");

        var editDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_document_modal.html',
            controller: 'DocumentEditModalInstanceController',
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
                    vm.updateFlag = true;
                    break;
                }
            }
        }, function () {
        });
    };

    /*////////////////////////////////////////////////////////////////////////////////////////////////////
     /////////////////// Modal For Editing Document [ Update Project ] ////////////////////////////////[E N D]///////////////////
     *///////////////////////////////////////////////////////////////////////////////////


    /*//////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////////// Update Project ///////////////////////////////////////////////////////////////////////////
     *//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.createOrUpdateProject = function()
    {
        if(taskDeletedFlag)
        {
            NewProjectService.deleteTasksFromProject(tasksToDelete, dataForThisModalInstance.projectToEdit.name);
            NewTaskService.deleteTaskGlobal(tasksToDelete, NewTaskService.taskPanels);
            NewTaskService.deleteTaskGlobal(tasksToDelete, updatedTasksArray);

            if(floatingTasks.length)
            {
                NewTaskService.deleteFloatingTasks(floatingTasks);
            }

            taskDeletedFlag = false;
        }

        if(documentDeletedFlag)
        {
            NewProjectService.deleteDocumentsFromProject(documentsToDelete, dataForThisModalInstance.projectToEdit.name);
            NewDocumentService.deleteDocumentGlobal(documentsToDelete, NewDocumentService.documentPanels);
            NewDocumentService.deleteDocumentGlobal(documentsToDelete, updatedDocumentsArray);

            if(floatingDocuments.length)
            {
                NewDocumentService.deleteFloatingDocuments(floatingDocuments);
            }

            documentDeletedFlag = false;
        }

        if(taskCreatedFlag)
        {
            NewProjectService.addProjectToTask(updatedTasksArray, dataForThisModalInstance.projectToEdit.name);
            NewTaskService.setValue(updatedTasksArray);

            for(var newTask of updatedTasksArray)
            {
                NewProjectService.addTaskToProject(dataForThisModalInstance.projectToEdit.name, newTask);
            }

            taskCreatedFlag = false;
        }

        if(documentCreatedFlag)
        {
            NewProjectService.addProjectToDocument(updatedDocumentsArray, dataForThisModalInstance.projectToEdit.name);
            NewDocumentService.setValue(updatedDocumentsArray);

            for(var newDocument of updatedDocumentsArray)
            {
                NewProjectService.addDocumentToProject(dataForThisModalInstance.projectToEdit.name, newDocument);
            }

            documentCreatedFlag = false;
        }

        if(taskUpdateFlag)
        {
            NewProjectService.updateTasksInProject(dataForThisModalInstance.projectToEdit.name, JSON.parse(JSON.stringify(vm.taskPanels)));
            NewTaskService.updateTasks(JSON.parse(JSON.stringify(vm.taskPanels)), false);

            taskUpdateFlag = false;
        }

        if(documentUpdateFlag)
        {
            NewProjectService.updateDocumentsInProject(dataForThisModalInstance.projectToEdit.name, JSON.parse(JSON.stringify(vm.documentPanels)));
            NewDocumentService.updateDocuments(JSON.parse(JSON.stringify(vm.documentPanels)), false);

            documentUpdateFlag = false;
        }

        $uibModalInstance.close();
    };

    /*//////////////////////////////////////////////////////////////////////////////////////////////////////////////
     /////////////////////// Update Project ///////////////////////////////////[E N D]//////////////////////////////////
     *//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*//////////////////////////////////////////////////////////////////////////////////////////////////////////////
     /////////////////// Cancel Project Update /////////////////////////////////////////////////////////////////////
     *//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    /*//////////////////////////////////////////////////////////////////////////////////////////////////////////////
     /////////////////// Cancel Project Update ////////////////////////////[E N D]//////////////////////////////////
     *//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     /////////////////// Delete Task [ Update Project ] ///////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.deleteTask = function(taskToDelete)
    {
        tasksToDelete.push(taskToDelete);
        NewTaskService.deleteTaskModal(taskToDelete, vm.taskPanels);
        taskDeletedFlag = true;
        vm.updateFlag = true;
    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     /////////////////// Delete Task [ Update Project ] //////////////////////////////////////[E N D]//////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     /////////////////// Delete Document [ Update Project ] ///////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.deleteDocument = function(documentToDelete)
    {
        documentsToDelete.push(documentToDelete);
        NewDocumentService.deleteDocumentModal(documentToDelete, vm.documentPanels);
        documentDeletedFlag = true;
        vm.updateFlag = true;
    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     /////////////////// Delete Document [ Update Project ] //////////////////////////////////////[E N D]//////////////
     *///////////////////////////////////////////////////////////////////////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////// Add From Existing Tasks [ Update Project ] /////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.existingTasksModalInProjectModal = function()
    {
        var existingTasksModalInProjectModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/existing_tasks_modal.html',
            controller: 'AddExistingTasksModalController',
            controllerAs: 'AddExistingTasksModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        projectName: vm.projectName,
                        tasksArray: JSON.parse(JSON.stringify(NewTaskService.taskPanels)),
                        tasksInModal: JSON.parse(JSON.stringify(vm.taskPanels))
                    };
                }
            }
        });

        existingTasksModalInProjectModalInstance.result.then(function (selected_existing_tasks) {

            var new_tasks_obj = {};

            for(var task of selected_existing_tasks)
            {
                for(var taskPanel of NewTaskService.taskPanels)
                {
                    if(task.id == taskPanel.id)
                    {
                        if(taskPanel.projectName)
                        {
                            new_tasks_obj = task;
                            new_tasks_obj.id = NewTaskService.newTaskID();
                            updatedTasksArray.push(new_tasks_obj);
                            vm.taskPanels.push(new_tasks_obj);
                            new_tasks_obj = {};
                            taskCreatedFlag = true;
                            vm.updateFlag = true;
                        }
                        else
                        {
                            floatingTasks.push(task);
                            updatedTasksArray.push(task);
                            vm.taskPanels.push(task);
                            taskCreatedFlag = true;
                            taskDeletedFlag = true;
                            vm.updateFlag = true;
                        }
                    }
                }
            }

        }, function () {
//            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////// Add From Existing Tasks [ Update Project ] //////////////////////////////// [E N D] ////////////////
     *////////////////////////////////////////////////////////////////////////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////// Add From Existing Documents [ Update Project ] /////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.existingDocumentsModalInProjectModal = function()
    {
        var existingDocumentsModalInProjectModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/existing_documents_modal.html',
            controller: 'AddExistingDocumentsModalController',
            controllerAs: 'AddExistingDocumentsModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        projectName: vm.projectName,
                        documentsArray: JSON.parse(JSON.stringify(NewDocumentService.documentPanels)),
                        documentsInModal: JSON.parse(JSON.stringify(vm.documentPanels))
                    };
                }
            }
        });

        existingDocumentsModalInProjectModalInstance.result.then(function (selected_existing_documents) {

            var new_documents_obj = {};

            for(var document of selected_existing_documents)
            {
                for(var documentPanel of NewDocumentService.documentPanels)
                {
                    if(document.id == documentPanel.id)
                    {
                        if(documentPanel.projectName)
                        {
                            new_documents_obj = document;
                            new_documents_obj.id = NewDocumentService.newDocumentID();
                            updatedDocumentsArray.push(new_documents_obj);
                            vm.documentPanels.push(new_documents_obj);
                            new_documents_obj = {};
                            documentCreatedFlag = true;
                            vm.updateFlag = true;
                        }
                        else
                        {
                            floatingDocuments.push(document);
                            updatedDocumentsArray.push(document);
                            vm.documentPanels.push(document);
                            documentCreatedFlag = true;
                            documentDeletedFlag = true;
                            vm.updateFlag = true;
                        }
                    }
                }
            }

        }, function () {
//            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////// Add From Existing Documents [ Update Project ] //////////////////////////////// [E N D] ////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]);

app.controller('newProjectModalInstanceController', ['$scope', '$uibModal', '$uibModalInstance', 'NewProjectService', 'NewTaskService', 'NewDocumentService', '$log', function ($scope, $uibModal, $uibModalInstance, NewProjectService, NewTaskService, NewDocumentService, $log) {

    var vm = this;
    var floatingTasks = [];
    var floatingDocuments = [];
    var taskUpdateFlag = false;
    var documentUpdateFlag = false;
    vm.updateFlag = true;
    vm.projectNameEditable = false;
    vm.taskPanels = [];
    vm.documentPanels = [];

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

    var projectsArray = JSON.parse(JSON.stringify(NewProjectService.projectPanels));
    var tasksArray = [];
    var documentsArray = [];

    /*////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Create New Project ///////////////////////////////////////////////////////////////////////////
     *////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.createOrUpdateProject = function(projectName) {

        if(NewProjectService.checkProjectExistence(projectName))
        {
            alert("Project " + "'" + projectName + "'" + " Already Exists");
            return;
        }

        NewProjectService.addProjectToTask(tasksArray, projectName);
        NewProjectService.addDocumentsToProject(documentsArray, projectName);

        var new_project_params = {
            'id': NewProjectService.newProjectID(),
            'name': projectName,
            'status': 'Status New',
            'taskPanels': tasksArray,
            'documentPanels': documentsArray
        };

        NewProjectService.setValue(new_project_params);
        NewTaskService.setValue(tasksArray);
        NewDocumentService.setValue(documentsArray);

        if(floatingTasks.length)
        {
            NewTaskService.deleteFloatingTasks(floatingTasks);
        }

        if(floatingDocuments.length)
        {
            NewDocumentService.deleteFloatingDocuments(floatingDocuments);
        }

        $uibModalInstance.close();

    };

    /*////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////// Create New Project ///////////////////////////// [E N D] //////////////////////////////////////
    */////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    /*///////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Modal For Adding From Existing Tasks ////////////////////////////////////////////////////////
     */////////////////////////// Create Project ////////////////////////////////////////////////////////////////////

    vm.existingTasksModalInProjectModal = function()
    {
        var existingTasksModalInProjectModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/existing_tasks_modal.html',
            controller: 'AddExistingTasksModalController',
            controllerAs: 'AddExistingTasksModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        tasksArray: JSON.parse(JSON.stringify(NewTaskService.taskPanels)),
                        tasksInModal: JSON.parse(JSON.stringify(vm.taskPanels))
                    };
                }
            }
        });

        existingTasksModalInProjectModalInstance.result.then(function (selected_existing_tasks) {

            var new_tasks_obj = {};

            for(var task of selected_existing_tasks)
            {
                for(var taskPanel of NewTaskService.taskPanels)
                {
                    if(task.id == taskPanel.id)
                    {
                        if(taskPanel.projectName)
                        {
                            new_tasks_obj = task;
                            new_tasks_obj.id = NewTaskService.newTaskID();
                            tasksArray.push(new_tasks_obj);
                            vm.taskPanels.push(new_tasks_obj);
                            new_tasks_obj = {};
                        }
                        else
                        {
                            floatingTasks.push(task);
                            tasksArray.push(task);
                            vm.taskPanels.push(task);
                        }
                    }
                }
            }

        }, function () {
//            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    /*///////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Modal For Adding From Existing Tasks [ Create Project ] ////////////// [E N D] //////////////
     *///////////////////////////////////////////////////////////////////////////////////

    /*///////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Modal For Adding From Existing Documents [ Create Project ] /////////////////////////////////
     *///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.existingDocumentsModalInProjectModal = function()
    {
        var existingDocumentsModalInProjectModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/existing_documents_modal.html',
            controller: 'AddExistingDocumentsModalController',
            controllerAs: 'AddExistingDocumentsModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        documentsArray: JSON.parse(JSON.stringify(NewDocumentService.documentPanels)),
                        documentsInModal: JSON.parse(JSON.stringify(vm.documentPanels))
                    };
                }
            }
        });

        existingDocumentsModalInProjectModalInstance.result.then(function (selected_existing_documents) {

            var new_documents_obj = {};

            for(var document of selected_existing_documents)
            {
                for(var documentPanel of NewDocumentService.documentPanels)
                {
                    if(document.id == documentPanel.id)
                    {
                        if(documentPanel.projectName)
                        {
                            new_documents_obj = document;
                            new_documents_obj.id = NewDocumentService.newDocumentID();
                            documentsArray.push(new_documents_obj);
                            vm.documentPanels.push(new_documents_obj);
                            new_documents_obj = {};
                        }
                        else
                        {
                            floatingDocuments.push(document);
                            documentsArray.push(document);
                            vm.documentPanels.push(document);
                        }
                    }
                }
            }

        }, function () {
//            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    /*///////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Modal For Adding From Existing Documents [ Create Project ] ///////////// [E N D] ///////////
     *///////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /*//////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Modal For Creating Task [ Create Project ] /////////////////////////////////////////////////
     *//////////////////////////////////////////////////////////////////////////////////////////////////////////////


    vm.addNewTaskModal = function()
    {
        var addNewTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_task_modal.html',
            controller: 'AddNewTaskModalController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function () {
                    return {
                        isGlobal: false,
                        projectsArray: projectsArray,
                        tasksArray: JSON.parse(JSON.stringify(vm.taskPanels))
                    };
                }
            }
        });

        addNewTaskModalInstance.result.then(function (new_task_params) {

            tasksArray.push(new_task_params);
            vm.taskPanels.push(new_task_params);

        }, function () {
//            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    /*//////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Modal For Creating Task [ Create Project ] /////////////////////////[E N D]/////////////////
     *//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*//////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Editing Task [ Create Project ] ///////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.editTaskModal = function (taskToEdit) {

        var editTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_task_modal.html',
            controller: 'TaskEditModalInstanceController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modals-style',
            backdrop: 'static',
            resolve: {
                dataForThisModalInstance: function(){
                    return{
                        isGlobal: false,
                        taskToEdit: JSON.parse(JSON.stringify(taskToEdit))
                    };
                }
            }
        });

        editTaskModalInstance.result.then(function (updated_task)
        {
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
//                    vm.updateFlag = true;
                    break;
                }
            }


        }, function () {

        });
    };

    /*//////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Editing Task [ Create Project ] ////////////////////[E N D]////////////////////////
     *//////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /*//////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Editing Document [ Create Project ] ///////////////////////////////////////////////
     *//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.editDocumentModal = function (documentToEdit) {

        var editDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_document_modal.html',
            controller: 'DocumentEditModalInstanceController',
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

    /*//////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Modal For Editing Document [ Create Project ] ////////////////////[E N D]////////////////////
     *//////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /*//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////// Delete Task [ Create Project ] //////////////////////////////////////////////////////////////
    *///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.deleteTask = function(taskToDelete)
    {
        NewTaskService.deleteTaskModal(taskToDelete, vm.taskPanels);
        NewTaskService.deleteTaskModal(taskToDelete, tasksArray);
    };

    var removeByAttr = function(arr, attr, value){
        var i = arr.length;
        while(i--){
            if( arr[i]
                && arr[i].hasOwnProperty(attr)
                && (arguments.length > 2 && arr[i][attr] === value ) ){
                arr.splice(i,1);
            }
        }
        return arr;
    };

     /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Delete Task [ Create Project ] ////////////////[E N D]//////////////////////////////////////
     *//////////////////////////////////////////////////////////////////////////////////////////////////////////////



    /*//////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Delete Document [ Create Project ] /////////////////////////////////////////////////////////
     *//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.deleteDocument = function(documentToDelete)
    {
        console.log("deleteDocument");
        NewDocumentService.deleteDocumentModal(documentToDelete, vm.documentPanels);
        NewDocumentService.deleteDocumentModal(documentToDelete, documentsArray);
    };

//    var removeByAttr = function(arr, attr, value){
//        var i = arr.length;
//        while(i--){
//            if( arr[i]
//                && arr[i].hasOwnProperty(attr)
//                && (arguments.length > 2 && arr[i][attr] === value ) ){
//                arr.splice(i,1);
//            }
//        }
//        return arr;
//    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Delete Document [ Create Project ] ////////////////[E N D]/////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Add New Document Modal [ Create Project ] /////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.addNewDocumentModal = function()
    {
        var addNewDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_document_modal.html',
            controller: 'AddNewDocumentModalController',
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

            documentsArray.push(new_document_params);
            vm.documentPanels = documentsArray;

        }, function () {
//            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Add New Document Modal  [ Create Project ] //////////////////////[E N D]///////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]);

app.controller('AddExistingTasksModalController', ['$scope', '$uibModalInstance', 'dataForThisModalInstance', 'NewTaskService', function ($scope, $uibModalInstance, dataForThisModalInstance, NewTaskService) {

    var vm = this;
    var noTasks = false;

    vm.modalHeading = 'Import Tasks of Project';

    if(dataForThisModalInstance.tasksArray.length > 10)
    {
        vm.multiSearchSwitch = true;
    }
    else
    {
        vm.multiSearchSwitch = false;
    }

    if(dataForThisModalInstance.tasksArray.length==0)
    {
        vm.existingTasksOptions = [
            {
                'id': 0,
                'name': 'No Tasks Are Available'
            }];

        noTasks = true;
    }
    else
    {
        vm.existingTasksOptions = NewTaskService.removeProjectTasksFromExistingTasks(dataForThisModalInstance.tasksInModal, dataForThisModalInstance.projectName);
    }

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Create Existing Task //////////////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.addExistingTasksInProject = function() {

        if((vm.selectedExistingTasks) && (!noTasks))
        {
            if(vm.selectedExistingTasks.length > 1)
            {
                var taskNamesArray = [];

                for(var task of vm.selectedExistingTasks)
                {
                    taskNamesArray.push(task.name);
                }

                if(NewTaskService.hasDuplicates(taskNamesArray))
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
                        alert("Task " + "'" + task.name + "' Already Exists of This Project");
                        return;
                    }
                }
            }

            $uibModalInstance.close(vm.selectedExistingTasks);
        }

    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Create Existing Task ///////////////////[E N D]////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

app.controller('AddExistingDocumentsModalController', ['$scope', '$uibModalInstance', 'dataForThisModalInstance', 'NewDocumentService', function ($scope, $uibModalInstance, dataForThisModalInstance, NewDocumentService) {

    var vm = this;
    var noDocuments = false;

    vm.modalHeading = 'Import Documents of Project';

    if(dataForThisModalInstance.documentsArray.length > 10)
    {
        vm.multiSearchSwitch = true;
    }
    else
    {
        vm.multiSearchSwitch = false;
    }

    if(dataForThisModalInstance.documentsArray.length==0)
    {
        vm.existingDocumentsOptions = [
            {
                'id': 0,
                'name': 'No Documents Are Available'
            }];

        noDocuments = true;
    }
    else
    {
        vm.existingDocumentsOptions = NewDocumentService.removeProjectDocumentsFromExistingDocuments(dataForThisModalInstance.documentsInModal, dataForThisModalInstance.projectName);
    }

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Create Existing Document //////////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.addExistingDocumentsInProject = function() {

        if((vm.selectedExistingDocuments) && (!noDocuments))
        {
            if(vm.selectedExistingDocuments.length > 1)
            {
                var documentNamesArray = [];

                for(var document of vm.selectedExistingDocuments)
                {
                    documentNamesArray.push(document.name);
                }

                if(NewDocumentService.hasDuplicates(documentNamesArray))
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
                        alert("Document " + "'" + document.name + "' Already Exists of This Project");
                        return;
                    }
                }
            }

            $uibModalInstance.close(vm.selectedExistingDocuments);
        }

    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Create Existing Document ///////////////////[E N D]////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////`

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

app.controller('AddNewTaskModalController', ['$scope', '$uibModalInstance', 'dataForThisModalInstance', 'NewProjectService', 'NewTaskService', function ($scope, $uibModalInstance, dataForThisModalInstance, NewProjectService, NewTaskService) {

    var vm = this;

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
//    vm.projects = projectsAndArrays.projectsArray;
//    vm.selected = vm.projects[0];

// Datepicker

    vm.projectDate = '';

    vm.status = {
        opened: false
    };

    vm.openDatePicker = function($event) {
        vm.status.opened = true;
    };

    vm.format = 'dd.MM.yyyy';

//    vm.selectedProjects = [NewProjectService.projectPanels[0]];
//
    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Create New Task ///////////////////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.createOrUpdateTask = function(taskName, taskDescription) {

        if(dataForThisModalInstance.isGlobal)
        {
            new_task_params = {
                'name': taskName,
                'status': 'Task Status',
                'projectsArray': vm.selectedProjects,
                'description': taskDescription
            };

            var newTaskObject = {};
            var newTasksArray = [];
            var taskAlreadyExistsInProject = false;

            if(new_task_params.projectsArray)
            {

                for(var project of new_task_params.projectsArray)
                {
                    newTaskObject.id = NewTaskService.newTaskID();
                    newTaskObject.name = new_task_params.name;
                    newTaskObject.status = "Waiting For Approval";
                    newTaskObject.projectName = project.name;
                    newTaskObject.description = new_task_params.description;

                    taskAlreadyExistsInProject = NewProjectService.addTaskToProject(newTaskObject.projectName, newTaskObject);

                    if(taskAlreadyExistsInProject.status)
                    {
                        alert("Task " + "'" + newTaskObject.name + "'" +  " Already Exists in Project " + "'" + taskAlreadyExistsInProject.inProject + "'");
                        return;
                    }
                    else
                    {
                        newTasksArray.push(newTaskObject);
                    }

                    newTaskObject = {};
                }

                NewTaskService.setValue(newTasksArray);

                $uibModalInstance.close();

            }
            else
            {
                for(var taskPanel of NewTaskService.taskPanels)
                {

                    if(!(taskPanel.projectName) && (taskPanel.name == new_task_params.name))
                    {
                        alert("Tasks With Same Name Can Exist Only When They Are Associated With Different Projects");
                        return;
                    }
                }

                newTaskObject.id = NewTaskService.newTaskID();
                newTaskObject.name = new_task_params.name;
                newTaskObject.status = "Waiting For Approval";
                newTaskObject.projectName = '';
                newTaskObject.description = new_task_params.description;
                newTasksArray.push(newTaskObject);
                NewTaskService.setValue(newTasksArray);
                newTaskObject = {};

                $uibModalInstance.close();
            }
        }
        else
        {
            if(NewTaskService.checkTaskExistence(taskName, dataForThisModalInstance.tasksArray))
            {
                alert("Task " + "'" + taskName + "'" + " Already Exists In This Project");
                return;
            }

            new_task_params = {
                'id': NewTaskService.newTaskID(),
                'name': taskName,
                'status': 'Task Status',
                'description': taskDescription
            };

            $uibModalInstance.close(new_task_params);
        }
    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Create New Task /////////////////////[E N D]///////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

app.controller('TaskEditModalInstanceController', ['$scope', '$uibModalInstance', 'dataForThisModalInstance', 'NewProjectService', 'NewTaskService', function ($scope, $uibModalInstance, dataForThisModalInstance, NewProjectService, NewTaskService) {

    var vm = this;

    vm.taskUpdateFlag = false;
    vm.taskNameEditable = true;
    vm.taskName = dataForThisModalInstance.taskToEdit.name;

    vm.taskDescription = dataForThisModalInstance.taskToEdit.description;

    vm.modalType = 'Update';
    vm.modalHeading = 'Update Task';

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

    vm.createOrUpdateTask = function(taskName, taskDescription) {

        var updated_task = {};
        dataForThisModalInstance.taskToEdit.description = vm.taskDescription;

        if(dataForThisModalInstance.isGlobal)
        {
            updated_task = NewTaskService.updateTasks([dataForThisModalInstance.taskToEdit], true);

            if(updated_task.projectName)
            {
                NewProjectService.updateTasksInProject(updated_task.projectName, [updated_task]);
            }
        }
        else
        {
            updated_task = dataForThisModalInstance.taskToEdit;
        }

        $uibModalInstance.close(updated_task);
    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Update Task /////////////////////[E N D]///////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

app.controller('DocumentEditModalInstanceController', ['$scope', '$uibModalInstance', 'dataForThisModalInstance', 'NewProjectService', 'NewDocumentService', function ($scope, $uibModalInstance, dataForThisModalInstance, NewProjectService, NewDocumentService) {

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

        var updated_document = {};
        dataForThisModalInstance.documentToEdit.description = vm.documentDescription;

        if(dataForThisModalInstance.isGlobal)
        {
            updated_document = NewDocumentService.updateDocuments([dataForThisModalInstance.documentToEdit], true);

            if(updated_document.projectName)
            {
                NewProjectService.updateDocumentsInProject(updated_document.projectName, [updated_document]);
            }
        }
        else
        {
            updated_document = dataForThisModalInstance.documentToEdit;
        }

        $uibModalInstance.close(updated_document);
    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Update Document /////////////////////[E N D]///////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

app.controller('AddNewDocumentModalController', ['$scope', '$uibModalInstance', 'dataForThisModalInstance', 'NewProjectService', 'NewDocumentService', function ($scope, $uibModalInstance, dataForThisModalInstance, NewProjectService, NewDocumentService) {

    var vm = this;

    vm.documentUpdateFlag = true;

//    if(dataForThisModalInstance.projectsArray.length > 10)
//    {
//        vm.multiSearchSwitch = true;
//    }
//    else
//    {
//        vm.multiSearchSwitch = false;
//    }

    var new_document_params = '';

    vm.documentNameEditable = false;

//    if(dataForThisModalInstance.isGlobal)
//    {
//        vm.documentProject = dataForThisModalInstance.projectsArray;
//        vm.projectsListVisibility = true;
//    }
//    else
//    {
//        vm.projectsListVisibility = false;
//    }

    vm.modalType = 'Create';
    vm.modalHeading = 'Create New Document';

// Datepicker

//    vm.projectDate = '';
//
//    vm.status = {
//        opened: false
//    };
//
//    vm.openDatePicker = function($event) {
//        vm.status.opened = true;
//    };
//
//    vm.format = 'dd.MM.yyyy';

//    vm.selectedProjects = [NewProjectService.projectPanels[0]];
//
    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Create New Document ///////////////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.createOrUpdateDocument = function(documentName, documentDescription) {

        if(dataForThisModalInstance.isGlobal)
        {
            new_document_params = {
                'name': documentName,
                'status': 'Document Status',
//                'projectsArray': vm.selectedProjects,
                'description': documentDescription
            };

            var newDocumentObject = {};
            var newDocumentsArray = [];
            var documentAlreadyExistsInProject = false;

//            if(new_document_params.projectsArray)
//            {
//                for(var project of new_document_params.projectsArray)
//                {
//                    newDocumentObject.id = NewDocumentService.newDocumentID();
//                    newDocumentObject.name = new_document_params.name;
//                    newDocumentObject.status = "Waiting For Approval";
//                    newDocumentObject.projectName = project.name;
//                    newDocumentObject.description = new_document_params.description;
//
//                    documentAlreadyExistsInProject = NewProjectService.addDocumentToProject(newDocumentObject.projectName, newDocumentObject);
//
//                    if(documentAlreadyExistsInProject.status)
//                    {
//                        alert("Document Already Exists of Project : " + documentAlreadyExistsInProject.inProject);
//                        return;
//                    }
//                    else
//                    {
//                        newDocumentsArray.push(newDocumentObject);
//                    }
//
//                    newDocumentObject = {};
//                }
//
//                NewDocumentService.setValue(newDocumentsArray);
//
//                $uibModalInstance.close();
//
//            }
//            else
//            {
            for(var documentPanel of NewDocumentService.documentPanels)
            {
                if(!(documentPanel.projectName) && (documentPanel.name == new_document_params.name))
                {
                    alert("Documents With Same Name Can Exist Only When They Are Associated With Different Projects");
                    return;
                }
            }

            newDocumentObject.id = NewDocumentService.newDocumentID();
            newDocumentObject.name = new_document_params.name;
            newDocumentObject.status = "Waiting For Approval";
            newDocumentObject.projectName = '';
            newDocumentObject.description = new_document_params.description;
            newDocumentsArray.push(newDocumentObject);
            NewDocumentService.setValue(newDocumentsArray);
            newDocumentObject = {};

            $uibModalInstance.close();
//            }
        }
        else
        {
            if(NewDocumentService.checkDocumentExistence(documentName, dataForThisModalInstance.documentsArray))
            {
                alert("Document " + "'" + documentName + "'" + " Already Exists In This Project");
                return;
            }

            new_document_params = {
                'id': NewDocumentService.newDocumentID(),
                'name': documentName,
                'status': 'Document Status',
                'description': documentDescription
            };

            $uibModalInstance.close(new_document_params);
        }
    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Create New Document /////////////////////[E N D]///////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);



//ES6
//Only string values of the array
//function hasDuplicates(array) {
//    return (new Set(array)).size !== array.length;
//}

//ES5
//Only string values of the array
//function hasDuplicates(array) {
//    var valuesSoFar = Object.create(null);
//    for (var i = 0; i < array.length; ++i) {
//        var value = array[i];
//        if (value of valuesSoFar) {
//            return true;
//        }
//        valuesSoFar[value] = true;
//    }
//    return false;
//}

//Works for more than just string values
//function hasDuplicates(array) {
//    var valuesSoFar = [];
//    for (var i = 0; i < array.length; ++i) {
//        var value = array[i];
//        if (valuesSoFar.indexOf(value) !== -1) {
//            return true;
//        }
//        valuesSoFar.push(value);
//    }
//    return false;
//}

//function getMergedArrays(arr1, arr2)
//{
//    var arr3 = [];
//
//    for(var a1 of arr1){
//        var shared = false;
//        for (var a2 of arr2)
//            if (a2.name == a1.name) {
//                shared = true;
//                break;
//            }
//        if(!shared) arr3.push(a1)
//    }
//
//    return arr3.concat(arr2);
//}
