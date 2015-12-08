
var app = angular.module('modalNewProjectModule', ['ui.bootstrap']);

app.controller('ModalDemoController', ['$scope', '$rootScope', '$uibModal', '$log', function ($scope, $rootScope, $uibModal, $log) {

    var vm = this;

// Modal

    vm.open = function () {

        var modalInstance = $uibModal.open({
//            animation: false,
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

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

app.controller('EditModalInstanceController', ['$scope', '$uibModalInstance', 'selectedProject', 'NewProjectService', function ($scope, $uibModalInstance, selectedProject, NewProjectService) {

    var vm = this;

    vm.modalHeading = 'Update Project';
    vm.modalType = 'Update';

    vm.projectname = selectedProject;

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

// Roles Dropdown

//    vm.roleOptions = [
//        {'role' : 'Admin'},
//        {'role' : 'Project Leader'},
//        {'role' : 'User'}
//    ];

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
    var taskArray = [];

    vm.ok = function(projectName) {

        var new_project_params = {
            'name': projectName,
            'status': 'Status New'
        };

        NewProjectService.setValue(new_project_params);
//        NewTaskService.setValue(new_task_params);

        $uibModalInstance.close();

    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


//    vm.openModalFromThisModal = function(projectName)
//    {
//        var modalFromModalInstance = $uibModal.open({
//            templateUrl: 'partials/modal_in_modal.html',
//            controller: 'ModalFromModalController',
//            controllerAs: 'ModalFromModalVM',
//            windowClass: 'modal-width',
//            resolve: {
//                projectName: function () {
//                    return projectName;
//                }
//            }
//        });
//
//        modalFromModalInstance.result.then(function (projectNameFromSecondModal) {
//            vm.projectname = projectNameFromSecondModal;
//            }, function () {
//            $log.info('Modal dismissed at: ' + new Date());
//        });
//    };


// Add New Task Modal

    vm.addNewTask = function()
    {
        var addNewTaskModalInstance = $uibModal.open({
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

//            NewTaskService.setValue(new_task_params);
            taskArray.push(new_task_params);

            vm.taskPanels = taskArray;
//            vm.taskPanels = NewTaskService.taskPanels;

//            var new_task_params = {
//                'name': newTaskObject.name,
//                'status': newTaskObject.status
//            };

        }, function () {
//            $log.info('Modal dismissed at: ' + new Date());
        });

    };


//    vm.taskPanels = NewTaskService.taskPanels;










//    vm.taskPanels = NewTaskService.taskPanels;
//
//    vm.deleteTask = function(taskName)
//    {
//        var deleteThisTask = {
//            'name': taskName,
//            'status': 'Status New'
//        };
//
//        vm.taskPanels = removeByAttr(vm.taskPanels, 'name', taskName);
//
//    };
//
//    var removeByAttr = function(arr, attr, value){
//        var i = arr.length;
//        while(i--){
//            if( arr[i]
//                && arr[i].hasOwnProperty(attr)
//                && (arguments.length > 2 && arr[i][attr] === value ) ){
//
//                arr.splice(i,1);
//
//            }
//        }
//        return arr;
//    };

}]);

app.controller('AddNewTaskModalController', ['$scope', '$uibModal', '$uibModalInstance', 'projectsList', 'NewTaskService', function ($scope, $uibModal, $uibModalInstance, projectsList, NewTaskService) {

    var vm = this;

//    vm.taskPanels = NewTaskService.taskPanels;

//    var tasksArray = [];


    vm.modalType = 'Create';
    vm.modalHeading = 'Create New Task';
    vm.projects = projectsList;
    vm.selected = vm.projects[0];

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

//        console.log(taskName);

        var new_task_params = {
            'name': taskName,
            'status': 'Task Status'
        };

//        tasksArray.push(new_task_params);

        NewTaskService.setValue(new_task_params);

        $uibModalInstance.close(new_task_params);
//
//
//        $uibModalInstance.close();

    };

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);




//app.controller('ModalFromModalController', ['$scope', '$uibModal', '$uibModalInstance', 'projectName', function ($scope, $uibModal, $uibModalInstance, projectName) {
//
//    var vm = this;
//
//    vm.projectnameinsecondmodal = projectName;
//
//    vm.sendDataBackToFirstModal = function(projectName) {
//
////        console.log($scope.projectnameinsecondmodal);
////        vm.projectnameinsecondmodal = projectName;
//
//        $uibModalInstance.close(projectName);
//
//    };
//
//
//    vm.cancelModal = function () {
//        $uibModalInstance.dismiss('cancel');
//    };
//
//}]);
