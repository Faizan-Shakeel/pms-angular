
var app = angular.module('newProjectGlobalModule', ['ui.bootstrap']);

app.controller('ModalDemoController', ['$scope', '$rootScope', '$uibModal', 'NewProjectService','NewTaskService', '$log', function ($scope, $rootScope, $uibModal, NewProjectService ,NewTaskService, $log) {

    var vm = this;

    /*////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////// Add New Project Modal /////////////////////////////////////////////////////////
    */////////////////////////////////////////////////////////////////////////////////////////////////

    vm.newProjectModal = function () {

        var projectModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_project_modal.html',
            controller: 'ModalInstanceController',
            controllerAs: 'ModalVM',
            windowClass: 'modal-width',
            backdrop: 'static'
//            resolve: {
//                projectName: function () {
//                    return vm.projectname;
//                }
//            }
        });

        projectModalInstance.result.then(function () {

        }, function () {
//            $log.info('Modal dismissed at: ' + new Date());
        });
    };


    /*////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////// Add New Project Modal ///////[E N D]/////////////////////////////////////////////
    */////////////////////////////////////////////////////////////////////////////////////////////////


    /*////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////// Edit Project Modal /////////////////////////////////////////////////////////////
    */////////////////////////////////////////////////////////////////////////////////////////////////

    vm.editProject = function (projectToEdit) {

        var editProjectModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_project_modal.html',
            controller: 'ProjectEditModalInstanceController',
            controllerAs: 'ModalVM',
            windowClass: 'modal-width',
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
     /*////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Edit Project Modal ////////////////////[E N D]//////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////


     /*////////////////////////////////////////////////////////////////////////////////////////////////
     //////////////// Add New Task Global /////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

    vm.newTaskModal = function()
    {
        var newTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_task_modal.html',
            controller: 'AddNewTaskModalController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modal-width',
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

    /*////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////// Add New Task Global ///////[E N D]/////////////////////////////////////////////////
    */////////////////////////////////////////////////////////////////////////////////////////////////

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Edit Task Global /////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

    vm.editTask = function (taskToEdit) {

        var editTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_task_modal.html',
            controller: 'TaskEditModalInstanceController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modal-width',
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

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Edit Task Global ////////////////////[E N D]//////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

}]);

app.controller('ProjectEditModalInstanceController', ['$scope', '$uibModal', '$uibModalInstance', 'dataForThisModalInstance', 'NewProjectService', 'NewTaskService', function ($scope, $uibModal, $uibModalInstance, dataForThisModalInstance, NewProjectService, NewTaskService) {

    var vm = this;
    var updatedTasksArray = [];
    var tasksToDelete = [];
    var floatingTasks = [];
    var taskCreatedFlag = false;
    var taskUpdateFlag = false;
    var taskDeletedFlag = false;
    vm.projectNameInputState = true;
    vm.modalHeading = 'Update Project';
    vm.modalType = 'Update';
    vm.projectName = dataForThisModalInstance.projectToEdit.name;
    vm.taskPanels = JSON.parse(JSON.stringify(dataForThisModalInstance.projectToEdit.taskPanels));

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Add New Task Modal /////////////////////////////////////////////////////////
     *////////////////// Update Project ///////////////////////////////////////////////////////////////////

    vm.addNewTask = function()
    {
        var addNewTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_task_modal.html',
            controller: 'AddNewTaskModalController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modal-width',
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

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Add New Task Modal /////////////////////////[E N D]////////////////////////////////
     *////////////////// Update Project ///////////////////////////////////////////////////////////////////

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Edit Task Modal /////////////////////////////////////////////////////////////
     *////////////////// Update Project ///////////////////////////////////////////////////////////////

    vm.editTask = function (taskToEdit) {

//        console.log("taskToEdit : " + JSON.stringify(taskToEdit));

        var editTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_task_modal.html',
            controller: 'TaskEditModalInstanceController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modal-width',
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
                console.log("vm.taskPanels[i].name : " + vm.taskPanels[i].name);
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

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Edit Task Modal ////////////////////[E N D]//////////////////////////////////
     *////////////////// Update Project /////////////////////////////////////////////////////////////////

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

        if(taskUpdateFlag)
        {
            NewProjectService.updateTasksInProject(dataForThisModalInstance.projectToEdit.name, JSON.parse(JSON.stringify(vm.taskPanels)));
            NewTaskService.updateTasks(JSON.parse(JSON.stringify(vm.taskPanels)), false);

            taskUpdateFlag = false;

        }

        $uibModalInstance.close();
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    vm.deleteTask = function(taskToDelete)
    {
        tasksToDelete.push(taskToDelete);
        NewTaskService.deleteTaskModal(taskToDelete, vm.taskPanels);
        taskDeletedFlag = true;
        vm.updateFlag = true;
    };

    vm.existingTasksModalInProjectModal = function()
    {
        var addExistingTasksModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/existing_tasks_modal.html',
            controller: 'AddExistingTasksModalController',
            controllerAs: 'AddExistingTasksModalVM',
            windowClass: 'modal-width',
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

        addExistingTasksModalInstance.result.then(function (selected_existing_tasks) {

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

}]);

app.controller('ModalInstanceController', ['$scope', '$uibModal', '$uibModalInstance', 'NewProjectService', 'NewTaskService', 'NewDocumentService', '$log', function ($scope, $uibModal, $uibModalInstance, NewProjectService, NewTaskService, NewDocumentService, $log) {

    var vm = this;
    var floatingTasks = [];
    var taskUpdateFlag = false;
    vm.updateFlag = true;
    vm.projectNameInputState = false;
    vm.taskPanels = [];

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

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// New Project Create Button Click //////////////////////////////////////////////
     *////////////////////////////////////////////////////////////////////////////////////////////////

    vm.createOrUpdateProject = function(projectName) {

        if(NewProjectService.checkProjectExistence(projectName))
        {
            alert('Project Already Exists');
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

        $uibModalInstance.close();

    };

    /*///////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////// New Project Create Button Click /////[E N D]////////////////////////////////////////////
    *////////////////////////////////////////////////////////////////////////////////////////////////////////


    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Add Existing Tasks Modal /////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

    vm.existingTasksModalInProjectModal = function()
    {
        var addExistingTasksModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/existing_tasks_modal.html',
            controller: 'AddExistingTasksModalController',
            controllerAs: 'AddExistingTasksModalVM',
            windowClass: 'modal-width',
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

        addExistingTasksModalInstance.result.then(function (selected_existing_tasks) {

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

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Add Existing Tasks Modal /////////////////////[E N D]//////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////


    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Add New Task Modal /////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////


    vm.addNewTask = function()
    {
        var addNewTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_task_modal.html',
            controller: 'AddNewTaskModalController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modal-width',
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

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Add New Task Modal /////////////////////////[E N D]////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Edit Task Modal /////////////////////////////////////////////////////////////
     *//////////////////////////////////////////////////////////////////////////////////////////////////

    vm.editTask = function (taskToEdit) {

//        console.log("taskToEdit : " + JSON.stringify(taskToEdit));

        var editTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_task_modal.html',
            controller: 'TaskEditModalInstanceController',
            controllerAs: 'TaskModalVM',
            windowClass: 'modal-width',
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

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////// Edit Task Modal ////////////////////[E N D]//////////////////////////////////
     *//////////////////////////////////////////////////////////////////////////////////////////////


    /*////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////// Delete Task [ Create Project Modal ] //////////////////////////////////////////
    */////////////////////////////////////////////////////////////////////////////////////////////////

    vm.deleteTask = function(taskToDelete)
    {
        console.log("Delete");

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

     /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Delete Task [ Create Project Modal ] ////////////////[E N D]///////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////



////////////////// Add New Document Modal //////////////////

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Add New Document Modal /////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

    vm.addNewDocument = function()
    {
        var addNewDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_document_modal.html',
            controller: 'AddNewDocumentModalController',
            controllerAs: 'AddNewDocumentModalVM',
            windowClass: 'modal-width',
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

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Add New Document Modal //////////////////////[E N D]///////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

    vm.deleteDocument = function(documentName)
    {
        var documentToDeleteArray = [];
        angular.forEach(vm.documentPanels, function(value,index){

            if(value.name == documentName)
            {
                documentToDeleteArray.push(vm.documentPanels[index]);
                NewDocumentService.deleteDocument(documentToDeleteArray);
                removeByAttr(vm.documentPanels, 'name', documentName);
            }
        });

    };

}]);

function getMergedArrays(arr1, arr2)
{
    var arr3 = [];

    for(var a1 of arr1){
        var shared = false;
        for (var a2 of arr2)
            if (a2.name == a1.name) {
                shared = true;
                break;
            }
        if(!shared) arr3.push(a1)
    }

    return arr3.concat(arr2);
}

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

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Existing Task Create Button Click /////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

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

    /*/////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Existing Task Create Button Click ///////////////////[E N D]///////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

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

    vm.taskNameInputState = false;

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
    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// New Task Create Button Click /////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

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
                        alert("Task Already Exists of Project : " + taskAlreadyExistsInProject.inProject);
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
                        alert("Multiple Tasks With Same Names Can Not Be Associated Within The Same Project");
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
                alert('Task Already Exists');
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

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// New Task Create Button Click /////////////////////[E N D]////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

app.controller('TaskEditModalInstanceController', ['$scope', '$uibModalInstance', 'dataForThisModalInstance', 'NewProjectService', 'NewTaskService', function ($scope, $uibModalInstance, dataForThisModalInstance, NewProjectService, NewTaskService) {

    var vm = this;

    vm.taskUpdateFlag = false;
//    var taskProject = NewProjectService.getTaskProject(dataForThisModalInstance.taskToEdit.projectName);

    vm.taskNameInputState = true;
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

//    console.log("task'sProjects : " + JSON.stringify(NewProjectService.getTaskProject(dataForThisModalInstance.taskToEdit.projectName)));

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Update Task Button Click /////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

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

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Update Task Button Click /////////////////////[E N D]////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

app.controller('AddNewDocumentModalController', ['$scope', '$uibModalInstance', 'dataForThisModalInstance', 'NewDocumentService', function ($scope, $uibModalInstance, dataForThisModalInstance, NewDocumentService) {

    var vm = this;

    vm.modalType = 'Create';
    vm.modalHeading = 'Create New Document';

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// New Document Create Button Click /////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

    vm.addNewDocumentInProject = function(documentName) {

        if(NewDocumentService.checkDocumentExistence(documentName, dataForThisModalInstance.documentsArray))
        {
            alert('Document Already Exists');
            return;
        }

        var new_document_params = {
            'id': NewDocumentService.newDocumentID(),
            'name': documentName,
            'status': 'Document Status'
        };

        $uibModalInstance.close(new_document_params);

    };

    /*/////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// New Document Create Button Click //////////////////[E N D]/////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

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
