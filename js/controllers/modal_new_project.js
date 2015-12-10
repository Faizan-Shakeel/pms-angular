
var app = angular.module('modalNewProjectModule', ['ui.bootstrap']);

app.controller('ModalDemoController', ['$scope', '$rootScope', '$uibModal', '$log', function ($scope, $rootScope, $uibModal, $log) {

    var vm = this;

// Modal

    vm.open = function () {

        var modalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_project_modal.html',
            controller: 'ModalInstanceController',
            controllerAs: 'ModalVM',
//            scope: $scope,
//            size: size,
            windowClass: 'modal-width',
//            backdrop: false,
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
//            scope: $scope,
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

app.controller('ModalInstanceController', ['$scope', '$uibModal', '$uibModalInstance', 'projectName', 'NewProjectService', 'NewTaskService', function ($scope, $uibModal, $uibModalInstance, projectName, NewProjectService, NewTaskService) {

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

    vm.ok = function(projectName) {

        var new_project_params = {
            'name': projectName,
            'status': 'Status New',
            'taskPanels': tasksArray
        };

        NewProjectService.setValue(new_project_params);
        NewTaskService.setValue(tasksArray);

        $uibModalInstance.close();

    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

// Add New Task Modal

    vm.addNewTask = function()
    {
        var addNewTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_task_modal.html',
            controller: 'AddNewTaskModalController',
            controllerAs: 'AddNewTaskModalVM',
            windowClass: 'modal-width',
//            scope: $scope,
//            backdrop: false,
            resolve: {
                projectsList: function () {
                    return projectsArray;
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
}]);

app.controller('AddNewTaskModalController', ['$scope', '$uibModal', '$uibModalInstance', 'projectsList', 'NewTaskService', function ($scope, $uibModal, $uibModalInstance, projectsList, NewTaskService) {

    var vm = this;

    vm.modalType = 'Create';
    vm.modalHeading = 'Create New Task';
    vm.projects = projectsList;
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

        var new_task_params = {
            'name': taskName,
            'status': 'Task Status'
        };

        $uibModalInstance.close(new_task_params);

    };

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);
