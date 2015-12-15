
var app = angular.module('modalNewProjectModule', ['ui.bootstrap']);

app.controller('ModalDemoController', ['$scope', '$rootScope', '$uibModal', '$log', function ($scope, $rootScope, $uibModal, $log) {

    var vm = this;

////////////////// Add New Project Modal //////////////////

    vm.open = function () {

        var modalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_project_modal.html',
            controller: 'ModalInstanceController',
            controllerAs: 'ModalVM',
            windowClass: 'modal-width',
            resolve: {
                projectName: function () {
                    return vm.projectname;
                }
            }
        });

//        modalInstance.result.then(function (selectedItem) {
//            $scope.selected = selectedItem;
//        }, function () {
//            $log.info('Modal dismissed at: ' + new Date());
//        });
    };

    vm.editProject = function (name) {

        var modalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_project_modal.html',
            controller: 'EditModalInstanceController',
            controllerAs: 'ModalVM',
            windowClass: 'modal-width',
            backdrop: false,
            resolve: {
                selectedProject: function(){
                    return name;
                }
            }
        });
    };
}]);

app.controller('EditModalInstanceController', ['$scope', '$uibModalInstance', 'selectedProject', 'NewProjectService', function ($scope, $uibModalInstance, selectedProject, NewProjectService) {

    var vm = this;

    vm.modalHeading = 'Update Project';
    vm.modalType = 'Update';

    vm.projectname = selectedProject;

    vm.taskPanels = NewProjectService.getSelectedProjectTasksArray(selectedProject);
    vm.documentPanels = NewProjectService.getSelectedProjectDocumentsArray(selectedProject);

    vm.ok = function(updatedProjectName) {

        var projectsArray = NewProjectService.panels;

        angular.forEach(projectsArray, function(value,index){

            if(value.name == selectedProject)
            {
                projectsArray[index].name = updatedProjectName;
            }
        });

        $uibModalInstance.close();

    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

app.controller('ModalInstanceController', ['$scope', '$uibModal', '$uibModalInstance', 'projectName', 'NewProjectService', 'NewTaskService', 'NewDocumentService', '$log', function ($scope, $uibModal, $uibModalInstance, projectName, NewProjectService, NewTaskService, NewDocumentService, $log) {

    var vm = this;

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

    var projectsArray = NewProjectService.panels;
    var tasksArray = [];
    var documentsArray = [];

    vm.ok = function(projectName) {

        if(NewProjectService.checkProjectExistence(projectName))
        {
            alert('Project Already Exists');
            return;
        }

        NewProjectService.addTasksToProject(tasksArray, projectName);
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

        $uibModalInstance.close();

    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

////////////////// Add New Task Modal //////////////////

    vm.addNewTask = function()
    {
        var addNewTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_task_modal.html',
            controller: 'AddNewTaskModalController',
            controllerAs: 'AddNewTaskModalVM',
            windowClass: 'modal-width',
            resolve: {
                projectsAndArrays: function () {
                    return {
                        projectsArray: projectsArray,
                        tasksArray: tasksArray
                    };
                }
            }
        });

        addNewTaskModalInstance.result.then(function (new_task_params) {

            tasksArray.push(new_task_params);
            vm.taskPanels = tasksArray;

        }, function () {
//            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    vm.deleteTask = function(taskName)
    {
        var taskToDeleteArray = [];
        angular.forEach(vm.taskPanels, function(value,index){

            if(value.name == taskName)
            {
                taskToDeleteArray.push(vm.taskPanels[index]);
                NewTaskService.deleteTask(taskToDeleteArray);
                removeByAttr(vm.taskPanels, 'name', taskName);
            }
        });

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



////////////////// Add New Document Modal //////////////////

    vm.addNewDocument = function()
    {
        var addNewDocumentModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_document_modal.html',
            controller: 'AddNewDocumentModalController',
            controllerAs: 'AddNewDocumentModalVM',
            windowClass: 'modal-width',
            resolve: {
                documentsArray: function () {
                    return {
//                        projectsArray: projectsArray,
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

app.controller('AddNewTaskModalController', ['$scope', '$uibModalInstance', 'projectsAndArrays', 'NewTaskService', function ($scope, $uibModalInstance, projectsAndArrays, NewTaskService) {

    var vm = this;

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

    vm.addNewTaskInProject = function(taskName) {

        if(NewTaskService.checkTaskExistence(taskName, projectsAndArrays.tasksArray))
        {
            alert('Task Already Exists');
            return;
        }

        var new_task_params = {
            'id': NewTaskService.newTaskID(),
            'name': taskName,
            'status': 'Task Status'
        };

        $uibModalInstance.close(new_task_params);

    };

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

app.controller('AddNewDocumentModalController', ['$scope', '$uibModalInstance', 'documentsArray', 'NewDocumentService', function ($scope, $uibModalInstance, documentsArray, NewDocumentService) {

    var vm = this;

    vm.modalType = 'Create';
    vm.modalHeading = 'Create New Document';

    vm.addNewDocumentInProject = function(documentName) {

        if(NewDocumentService.checkDocumentExistence(documentName, documentsArray.documentsArray))
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

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);
