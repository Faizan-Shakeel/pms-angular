"use strict";

var app = angular.module('modalsModule', ['ui.bootstrap']);

app.controller('ModalsController', ['$scope', '$rootScope', '$uibModal', 'ProjectService','TaskService', '$log', function ($scope, $rootScope, $uibModal, ProjectService ,TaskService, $log) {

    var vm = this;

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////// Modal For Creating Project /////////////////////////////////////////////////////////////////////
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
//            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    /*////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////
    ////////////////// Modal For Creating Project ////////////////////////////////////////////// [E N D] //////////////
    */////////////////////////////////////////////////////////////////////////////////////////// [E N D] //////////////

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////// Modal For Editing Project ///////////////////////////////////////////////////////////////////////
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
     ///////////////// Modal For Editing Project /////////////////////////////////////////////// [E N D] //////////////
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

}]);

app.controller('CreateProjectModalInstanceController', ['$scope', '$uibModal', '$uibModalInstance', 'ProjectService', 'TaskService', 'DocumentService', '$log', function ($scope, $uibModal, $uibModalInstance, ProjectService, TaskService, DocumentService, $log) {

    var vm = this;
    var floatingTasks = [];
    var floatingDocuments = [];
    var tasksArray = [];
    var documentsArray = [];
    var taskCreatedFlag = false;
    var documentCreatedFlag = false;
    var taskDeletedFlag = false;
    var documentDeletedFlag = false;
    var documentAlreadyExists = false;
    var projectsArray = JSON.parse(JSON.stringify(ProjectService.getProjectPanels()));
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


    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Create New Project ////////////////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.createOrUpdateProject = function(project_params)
    {
        var projectName = project_params.projectName;

        console.log("project_params : " + JSON.stringify(project_params));

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
            'id': ProjectService.newProjectID(),
            'name': projectName,
            'status': 'Status New',
            'tasks': tasksArray,
            'documents': documentsArray
        };

        ProjectService.createProjectPanel(new_project_params);

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
            }

        }, function () {
//            $log.info('Modal dismissed at: ' + new Date());
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
//            $log.info('Modal dismissed at: ' + new Date());
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
                    };
                }
            }
        });

        addNewTaskModalInstance.result.then(function (updTaskParams_floatingDocs) {

//            console.log("new_task_params.documents OUTSIDE : " + JSON.stringify(new_task_params.documents));

            var new_task_params = updTaskParams_floatingDocs.new_task_params;
            var floatingDocsFromTaskModal = updTaskParams_floatingDocs.floatingDocuments;

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
                    };
                }
            }
        });

        editTaskModalInstance.result.then(function (updatedTask_deletedDocs_floatingTasks)
        {
            var updated_task = updatedTask_deletedDocs_floatingTasks.updated_task;
            var docsDeletedFromTaskUpdateModal = updatedTask_deletedDocs_floatingTasks.documentsToDelete;
            var floatingDocsFromTaskUpdateModal = updatedTask_deletedDocs_floatingTasks.floatingDocuments;

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

            for(var doc of updated_task.documents)
            {
                if(!DocumentService.checkDocumentExistence(doc.name, vm.documentPanels))
                {
                    documentsArray.push(doc);
                    vm.documentPanels.push(doc);
                    documentCreatedFlag = true;
                }
            }

//            console.log("docsDeletedFromTaskUpdateModal : " + JSON.stringify(docsDeletedFromTaskUpdateModal));

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

}]);

app.controller('EditProjectModalInstanceController', ['$scope', '$uibModal', '$uibModalInstance', 'dataForThisModalInstance', 'ProjectService', 'TaskService', 'DocumentService', function ($scope, $uibModal, $uibModalInstance, dataForThisModalInstance, ProjectService, TaskService, DocumentService) {

    var vm = this;
    var newTasksArray = [];
    var updatedTasksArray = [];
    var newDocumentsArray = [];
    var updatedDocumentsArray = [];
    var tasksToDelete = [];
    var documentsToDelete = [];
    var floatingTasks = [];
    var floatingDocuments = [];
    var taskCreatedFlag = false;
    var documentCreatedFlag = false;
    var documentAlreadyExists = false;
    var taskUpdateFlag = false;
    var documentUpdateFlag = false;
    var taskDeletedFlag = false;
    var documentDeletedFlag = false;
    vm.projectNameEditable = true;
    vm.modalHeading = 'Update Project';
    vm.modalType = 'Update';
    vm.projectName = dataForThisModalInstance.projectToEdit.name;
    vm.taskPanels = JSON.parse(JSON.stringify(dataForThisModalInstance.projectToEdit.tasks));
    vm.documentPanels = JSON.parse(JSON.stringify(dataForThisModalInstance.projectToEdit.documents));

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////////// Update Project ////////////////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.createOrUpdateProject = function()
    {
//        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

        if(taskDeletedFlag)
        {
            ProjectService.deleteTasksFromProject(tasksToDelete, dataForThisModalInstance.projectToEdit.name);
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
            ProjectService.deleteDocumentsFromProject(documentsToDelete, dataForThisModalInstance.projectToEdit.name);
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
            ProjectService.addProjectToTask(newTasksArray, dataForThisModalInstance.projectToEdit.name);

            TaskService.createTaskPanel(newTasksArray);


            for(var newTask of newTasksArray)
            {
                ProjectService.addTaskToProject(dataForThisModalInstance.projectToEdit.name, newTask);
            }

            taskCreatedFlag = false;
        }

        if(documentCreatedFlag)
        {
            ProjectService.addProjectToDocument(newDocumentsArray, dataForThisModalInstance.projectToEdit.name);

            DocumentService.createDocumentPanel(newDocumentsArray);

            for(var newDocument of newDocumentsArray)
            {
                ProjectService.addDocumentToProject(dataForThisModalInstance.projectToEdit.name, newDocument);

                if(newDocument.task)
                {
                    for(var newTask of vm.taskPanels)
                    {
                        if(newTask.name == newDocument.task)
                        {
                            ProjectService.addProjectToDocument(newTask.documents, dataForThisModalInstance.projectToEdit.name);
                            break;
                        }
                    }
                }
            }

            documentCreatedFlag = false;
        }

        if(taskUpdateFlag)
        {
            ProjectService.updateTasksInProject(dataForThisModalInstance.projectToEdit.name, JSON.parse(JSON.stringify(vm.taskPanels)));
            TaskService.updateTasks(JSON.parse(JSON.stringify(vm.taskPanels)), false);

            taskUpdateFlag = false;
        }

        if(documentUpdateFlag)
        {
            ProjectService.updateDocumentsInProject(dataForThisModalInstance.projectToEdit.name, JSON.parse(JSON.stringify(vm.documentPanels)));
            TaskService.updateDocumentsInTask(JSON.parse(JSON.stringify(vm.documentPanels)));
            DocumentService.updateDocuments(JSON.parse(JSON.stringify(vm.documentPanels)), false);

            documentUpdateFlag = false;
        }

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
                    };
                }
            }
        });

        addNewTaskModalInstance.result.then(function (result) {

            //        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

            var new_task_params = result.new_task_params;
            var floatingDocsFromTaskModal = result.floatingDocuments;

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
                    };
                }
            }
        });

        editTaskModalInstance.result.then(function (changes)
        {
            //        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

            var updated_task = changes.updated_task;
            var docsDeletedFromTaskUpdateModal = changes.documentsToDelete;
            var floatingDocsFromTaskModal = changes.floatingDocuments;
            var modifiedDocuments = changes.modifiedDocuments;

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

//            console.log("floatingDocsFromTaskModal : " + JSON.stringify(floatingDocsFromTaskModal));

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
//                        break;
                    }
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

}]);


app.controller('ExistingTasksModalInstanceController', ['$scope', '$uibModalInstance', 'dataForThisModalInstance', 'TaskService', function ($scope, $uibModalInstance, dataForThisModalInstance, TaskService) {

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
        vm.existingTasksOptions = TaskService.removeProjectTasksFromExistingTasks(dataForThisModalInstance.tasksInModal, dataForThisModalInstance.projectName);
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

    vm.modalHeading = 'Import Documents of Project';

    if(dataForThisModalInstance.documentsArray.length==0)
    {
        vm.existingDocumentsOptions = [
            {
                'id': 0,
                'name': 'No Documents Are Available'
            }];

        noDocuments = true;
    }
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
            console.log("trigFrom 0: " + trigFrom);
            console.log("inside 0: " + inside);

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
            console.log("trigFrom 1: " + trigFrom);
            console.log("inside 1: " + inside);

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
            console.log("trigFrom 2: " + trigFrom);
            console.log("inside 2: " + inside);

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
            console.log("trigFrom 3: " + trigFrom);
            console.log("inside 3: " + inside);

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

app.controller('CreateTaskModalController', ['$scope', '$uibModal', '$uibModalInstance', 'dataForThisModalInstance', 'ProjectService', 'TaskService', 'DocumentService', function ($scope, $uibModal, $uibModalInstance, dataForThisModalInstance, ProjectService, TaskService, DocumentService) {

    var vm = this;
    var documentsArray = [];
    var floatingDocuments = [];
    var documentsToDelete = [];
    var documentCreatedFlag = false;
    var documentDeletedFlag = false;
    var documentUpdateFlag = false;

    vm.documentPanels = [];

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

    /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Create New Task ///////////////////////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    vm.createOrUpdateTask = function(task_params) {

        var taskName = task_params.taskName;
        var taskDescription = task_params.taskDescription;

//        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

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
                    var updatedIdDocs = [];
                    var docIdUpdatedFlag = false;

                    newTaskObject.id = TaskService.newTaskID();
                    newTaskObject.name = new_task_params.name;
                    newTaskObject.status = "Waiting For Approval";
                    newTaskObject.project = project.name;
                    newTaskObject.description = new_task_params.description;
                    newTaskObject.documents = documentsArray;

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
                newTaskObject.name = new_task_params.name;
                newTaskObject.status = "Waiting For Approval";
                newTaskObject.project = '';
                newTaskObject.description = new_task_params.description;
                newTaskObject.documents = documentsArray;
                newTasksArray.push(newTaskObject);
                TaskService.createTaskPanel(newTasksArray);
                DocumentService.createDocumentPanel(documentsArray);

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
                'status': 'Task Status',
                'project': '',
                'description': taskDescription,
                'documents': documentsArray
            };

            $uibModalInstance.close({new_task_params: new_task_params, floatingDocuments: floatingDocuments});
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

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

app.controller('EditTaskModalInstanceController', ['$scope', '$uibModal', '$uibModalInstance', 'dataForThisModalInstance', 'ProjectService', 'TaskService', 'DocumentService', function ($scope, $uibModal, $uibModalInstance, dataForThisModalInstance, ProjectService, TaskService, DocumentService) {

    var vm = this;
    var updatedDocumentsArray = [];
    var modifiedDocuments = [];
    var documentDeletedFlag = false;
    var documentCreatedFlag = false;
    var documentUpdateFlag = false;
    var documentsToDelete = [];
    var floatingDocuments = [];
    var taskProject = dataForThisModalInstance.taskToEdit.project;

    vm.taskUpdateFlag = false;
    vm.taskNameEditable = true;
    vm.taskName = dataForThisModalInstance.taskToEdit.name;

    vm.taskDescription = dataForThisModalInstance.taskToEdit.description;
    vm.documentPanels = dataForThisModalInstance.taskToEdit.documents;

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

    vm.createOrUpdateTask = function(task_params) {

        //        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService));

        var taskName = task_params.taskName;
        var taskDescription = task_params.taskDescription;

        var updated_task = {};
        dataForThisModalInstance.taskToEdit.description = vm.taskDescription;

        if(dataForThisModalInstance.isGlobal)
        {
            console.log("dataForThisModalInstance.isGlobal Should Not Be Called : " + dataForThisModalInstance.isGlobal);

            if(documentDeletedFlag)
            {
                console.log("documentDeletedFlag");

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
                console.log("documentCreatedFlag");

                DocumentService.addTaskToDocument(updatedDocumentsArray, dataForThisModalInstance.taskToEdit.name);

                DocumentService.createDocumentPanel(updatedDocumentsArray);

                for(var newDocument of updatedDocumentsArray)
                {
                    console.log("addDocumentToTask");

                    TaskService.addDocumentToTask(dataForThisModalInstance.taskToEdit.id, newDocument);

                    if(dataForThisModalInstance.taskToEdit.project)
                    {
                        ProjectService.addDocumentToProject(dataForThisModalInstance.taskToEdit.project, newDocument);
                        ProjectService.addProjectToDocument([newDocument], dataForThisModalInstance.taskToEdit.project);
                    }
                }

                documentCreatedFlag = false;
            }

            if(documentUpdateFlag)
            {
                console.log("documentUpdateFlag");

                if(dataForThisModalInstance.taskToEdit.project)
                {
                    ProjectService.updateDocumentsInProject(dataForThisModalInstance.taskToEdit.project, JSON.parse(JSON.stringify(modifiedDocuments)));
                }

                DocumentService.updateDocuments(JSON.parse(JSON.stringify(modifiedDocuments)), false);

                documentUpdateFlag = false;
            }

            updated_task = TaskService.updateTasks([dataForThisModalInstance.taskToEdit], true);

            if(updated_task.project)
            {
                ProjectService.updateTasksInProject(updated_task.project, [updated_task]);
            }
        }
        else if(dataForThisModalInstance.triggeredFrom == "Create Project")
        {
            console.log("Create Project");
//            if(documentDeletedFlag)
//            {
//            }
//
//            if(documentCreatedFlag)
//            {
//            }
//
//            if(documentUpdateFlag)
//            {
//            }

            updated_task = dataForThisModalInstance.taskToEdit;

        }
        else if(dataForThisModalInstance.triggeredFrom == "Update Project")
        {
            console.log("Update Project");

//            if(documentDeletedFlag)
//            {
//            }
//
//            if(documentCreatedFlag)
//            {
//            }
//
//            if(documentUpdateFlag)
//            {
//            }

            updated_task = dataForThisModalInstance.taskToEdit;

        }
        else
        {
            console.log("NEXT");
//            console.log("triggeredFrom : " + dataForThisModalInstance.triggeredFrom);
//            console.log("inside : " + dataForThisModalInstance.inside);

            updated_task = dataForThisModalInstance.taskToEdit;
        }

//        documentsToDelete.push("test");
//
//        console.log("documentsToDelete : " + documentsToDelete);
//
//        var testingSecondParameter = "Test";

        $uibModalInstance.close({updated_task: updated_task, documentsToDelete: documentsToDelete, floatingDocuments: floatingDocuments, modifiedDocuments: modifiedDocuments});
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
     /////////////////// Modal For Editing Document [ Update Task ] ////////////////////////////////////////////////
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
     /////////////////// Modal For Editing Document [ Update Task ] //////////////////////////////// [E N D] ///////
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

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

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
