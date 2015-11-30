var app = angular.module('modalNewProjectModule', ['ui.bootstrap']);

app.controller('ModalDemoCtrl', ['$scope', '$rootScope', '$uibModal', '$log', function ($scope, $rootScope, $uibModal, $log) {

//    $scope.form = {};

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
                newProjectName: function(){
                    return name;
                }
            }
        });
    };
}]);

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

app.controller('EditModalInstanceCtrl', ['$scope', '$uibModalInstance', 'newProjectName', 'NewProjectService', function ($scope, $uibModalInstance, newProjectName, NewProjectService) {

//    var scope = this;
    var vm = this;

//    console.log("TESTIGN : " + vm.modalForm.projectname);

    this.projectname = newProjectName;
//    $scope.form.modalForm.projectname = newProjectName;

//    alert($scope);
//    console.log($scope.testForm);
//    $scope.name = 'test change';

//    $scope.project.name = projectName;

//    project.name = selectedProject;
//    $scope.project.name = "test";

//    alert($scope.project.name);
//    $scope.project.name = selectedProject;

//    var arrayToBeModified = NewProjectService.panels;

//    angular.forEach(NewProjectService.panels, function(value,index){
//        alert(value['status'] + " at " + index);
//
//        if(value.name == selectedProject)
//        {
//            $scope.project.name =
//        }
//
//    });

    $scope.ok = function(project) {
        var new_project_params = {
            'name': project.name,
            'status': 'Status New'
        };

        NewProjectService.setValue(new_project_params);

        $uibModalInstance.close();

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

app.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', 'projectName', 'NewProjectService', function ($scope, $uibModalInstance, projectName, NewProjectService) {

//    var vm = this;

//    this.projectname = 'oaisndoaiwd';

    $scope.ok = function(projectName) {
        console.log(projectName);
        console.log($scope.modalForm);

        var new_project_params = {
            'name': projectName,
            'status': 'Status New'
        };

        NewProjectService.setValue(new_project_params);

        $uibModalInstance.close();

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

