var app = angular.module('modalNewProjectModule', ['ui.bootstrap']);

app.controller('ModalDemoCtrl', ['$scope', '$rootScope', '$uibModal', '$log', function ($scope, $rootScope, $uibModal, $log) {

    var vm = this;

// Modal

    vm.open = function () {

        var modalInstance = $uibModal.open({
//            animation: false,
            templateUrl: 'partials/new_project_modal.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: 'ModalVM',
//            scope: $scope,
//            size: size,
//            windowClass: 'test-modal-width',
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
            controller: 'EditModalInstanceCtrl',
            controllerAs: 'ModalVM',
//            scope: $scope,
//            windowClass: 'test-modal-width',
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

app.controller('EditModalInstanceCtrl', ['$scope', '$uibModalInstance', 'selectedProject', 'NewProjectService', function ($scope, $uibModalInstance, selectedProject, NewProjectService) {

    var vm = this;

    vm.modalHeading = 'Update Project';
    vm.modalType = 'Update';

    vm.projectname = selectedProject;

    vm.ok = function(updatedProjectName) {

        var projectArray = NewProjectService.panels;

        angular.forEach(projectArray, function(value,index){

            if(value.name == selectedProject)
            {
                projectArray[index].name = updatedProjectName;
            }
        });

        $uibModalInstance.close();

    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

app.controller('ModalInstanceCtrl', ['$scope', '$uibModal', '$uibModalInstance', 'projectName', 'NewProjectService', function ($scope, $uibModal, $uibModalInstance, projectName, NewProjectService) {

    var vm = this;

// Roles Dropdown

    vm.roleOptions = [
        {'role' : 'Admin'},
        {'role' : 'Project Leader'},
        {'role' : 'User'}
    ];

// Datepicker

    vm.projectDate = new Date();

    vm.status = {
        opened: false
    };

    vm.openDatePicker = function($event) {
        vm.status.opened = true;
    };

    vm.format = 'dd.MM.yyyy';

    vm.modalHeading = 'Create New Project';
    vm.modalType = 'Create';

    vm.ok = function(projectName) {

        var new_project_params = {
            'name': projectName,
            'status': 'Status New'
        };

        NewProjectService.setValue(new_project_params);

        $uibModalInstance.close();

    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };









    vm.openModalFromThisModal = function(projectName)
    {
//        console.log(projectName);
//        $uibModalInstance.close();

        var modalFromModalInstance = $uibModal.open({
            templateUrl: 'partials/modal_in_modal.html',
            controller: 'ModalFromModalCtrl',
            controllerAs: 'ModalFromModalVM',
//            scope: $scope,
//            backdrop: false,
            resolve: {
                projectName: function () {
                    return projectName;
                }
            }
        });




            modalFromModalInstance.result.then(function (projectNameFromSecondModal) {
                vm.projectname = projectNameFromSecondModal;
                }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });




    }

}]);




app.controller('ModalFromModalCtrl', ['$scope', '$uibModal', '$uibModalInstance', 'projectName', function ($scope, $uibModal, $uibModalInstance, projectName) {

    var vm = this;

    vm.projectnameinsecondmodal = projectName;

    vm.sendDataBackToFirstModal = function(projectName) {

//        console.log($scope.projectnameinsecondmodal);
//        vm.projectnameinsecondmodal = projectName;

        $uibModalInstance.close(projectName);

    };


    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);
