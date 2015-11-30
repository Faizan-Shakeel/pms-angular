var app = angular.module('modalNewProjectModule', ['ui.bootstrap']);

app.controller('ModalDemoCtrl', ['$scope', '$rootScope', '$uibModal', '$log', function ($scope, $rootScope, $uibModal, $log) {

    var vm = this;

    vm.open = function () {

        var modalInstance = $uibModal.open({
//            animation: false,
            templateUrl: 'partials/new_project_modal.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: 'ModalVM',
            scope: $scope,
//            size: size,
//            windowClass: 'test-modal-width',
            backdrop: false,
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
            scope: $scope,
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

app.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', 'projectName', 'NewProjectService', function ($scope, $uibModalInstance, projectName, NewProjectService) {

    var vm = this;

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
}]);

