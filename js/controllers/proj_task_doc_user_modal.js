
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
            backdrop: 'static',
            resolve: {
                projectName: function () {
                    return vm.projectname;
                }
            }
        });

        projectModalInstance.result.then(function () {

//            console.log("OUT NOW");

        }, function () {
//            $log.info('Modal dismissed at: ' + new Date());
        });
    };


    /*////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////// Add New Project Modal ///////[END]/////////////////////////////////////////////
    */////////////////////////////////////////////////////////////////////////////////////////////////


    vm.editProject = function (name) {

        var editProjectModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_project_modal.html',
            controller: 'EditModalInstanceController',
            controllerAs: 'ModalVM',
            windowClass: 'modal-width',
            backdrop: 'static',
            backdrop: false,
            resolve: {
                selectedProject: function(){
                    return name;
                }
            }
        });
    };

     /*////////////////////////////////////////////////////////////////////////////////////////////////
     //////////////// Add New Task Global /////////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

    vm.newTaskModal = function()
    {
        var newTaskModalModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_task_modal.html',
            controller: 'AddNewTaskModalController',
            controllerAs: 'AddNewTaskModalVM',
            windowClass: 'modal-width',
            backdrop: 'static',
            resolve: {
                projectsAndArrays: function () {
                    return {
                        isGlobal: true,
                        projectsArray: NewProjectService.projectPanels
//                        tasksArray: tasksArray
                    };
                }
            }
        });

        newTaskModalModalInstance.result.then(function () {

//            console.log("Task Created");

        }, function () {
//            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    /*////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////// Add New Task Global ///////[END]/////////////////////////////////////////////////
    */////////////////////////////////////////////////////////////////////////////////////////////////

}]);

app.controller('EditModalInstanceController', ['$scope', '$uibModalInstance', 'selectedProject', 'NewProjectService', function ($scope, $uibModalInstance, selectedProject, NewProjectService) {

    var vm = this;

    vm.modalHeading = 'Update Project';
    vm.modalType = 'Update';

    vm.projectname = selectedProject;

    vm.taskPanels = NewProjectService.getSelectedProjectTasksArray(selectedProject);
    vm.documentPanels = NewProjectService.getSelectedProjectDocumentsArray(selectedProject);

    vm.createNewProject = function(updatedProjectName) {

        var projectsArray = NewProjectService.projectPanels;

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

    var projectsArray = NewProjectService.projectPanels;
    var tasksArray = [];
    var documentsArray = [];

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// New Project Create Button Click //////////////////////////////////////////////
     *////////////////////////////////////////////////////////////////////////////////////////////////

    vm.createNewProject = function(projectName) {

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

        $uibModalInstance.close();

    };

    /*///////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////// New Project Create Button Click /////[END]////////////////////////////////////////////
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
                tasksArray: function () {
                    return {
                        tasksArray: NewTaskService.taskPanels
                    };
                }
            }
        });

        addExistingTasksModalInstance.result.then(function (selected_existing_tasks) {

            var new_tasks_obj = {};

            for(var i in selected_existing_tasks)
            {
                for(var j in NewTaskService.taskPanels)
                {
                    if(selected_existing_tasks[i].id == NewTaskService.taskPanels[j].id)
                    {
                        if(NewTaskService.taskPanels[j].projectName)
                        {
                            new_tasks_obj = selected_existing_tasks[i];
                            new_tasks_obj.id = NewTaskService.newTaskID();
                            tasksArray.push(new_tasks_obj);
                            new_tasks_obj = {};
                        }
                        else
                        {
                            NewTaskService.deleteTask([selected_existing_tasks[i]]);
                            tasksArray.push(selected_existing_tasks[i]);
                        }
                    }
                }
            }

            vm.taskPanels = tasksArray;

        }, function () {
//            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Add Existing Tasks Modal /////////////////////[E N D]////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////


////////////////// Add New Task Modal //////////////////

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Add New Task Modal /////////////////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////


    vm.addNewTask = function()
    {
        var addNewTaskModalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'partials/new_task_modal.html',
            controller: 'AddNewTaskModalController',
            controllerAs: 'AddNewTaskModalVM',
            windowClass: 'modal-width',
            backdrop: 'static',
            resolve: {
                projectsAndArrays: function () {
                    return {
                        isGlobal: false,
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

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// Add New Task Modal /////////////////////////[E N D]////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

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

//function getMergedArrays(arr1, arr2)
//{
//    var arr3 = [];
//
//    for(var i in arr1){
//        var shared = false;
//        for (var j in arr2)
//            if (arr2[j].name == arr1[i].name) {
//                shared = true;
//                break;
//            }
//        if(!shared) arr3.push(arr1[i])
//    }
//
//    return arr3.concat(arr2);
//}

app.controller('AddExistingTasksModalController', ['$scope', '$uibModalInstance', 'tasksArray', 'NewTaskService', function ($scope, $uibModalInstance, tasksArray, NewTaskService) {

    var vm = this;
    var noTasks = false;

//    vm.existingTasksOptions = tasksArray.tasksArray;

    vm.modalHeading = 'Import Tasks In Project';

    if(tasksArray.tasksArray.length==0)
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
        vm.existingTasksOptions = tasksArray.tasksArray;
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

                for(var i in vm.selectedExistingTasks)
                {
                    taskNamesArray.push(vm.selectedExistingTasks[i].name);
                }

//                console.log(hasDuplicates(taskNamesArray));

                if(hasDuplicates(taskNamesArray))
                {
                    alert("A Project Can Not Have Tasks With Same Names");
                    return;
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

//ES6
//Only string values in the array
function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

//ES5
//Only string values in the array
//function hasDuplicates(array) {
//    var valuesSoFar = Object.create(null);
//    for (var i = 0; i < array.length; ++i) {
//        var value = array[i];
//        if (value in valuesSoFar) {
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

//This function was found originally for removing array duplicates, but ""return true;"" has been added only to check if array has duplicate values.
//function uniq_fast(a) {
//    var seen = {};
//    var out = [];
//    var len = a.length;
//    var j = 0;
//    for(var i = 0; i < len; i++) {
//        var item = a[i];
//        if(seen[item] !== 1) {
//            return true;
////            console.log("CALLED");
//            seen[item] = 1;
//            out[j++] = item;
//        }
//    }
//    return false;
//}

app.controller('AddNewTaskModalController', ['$scope', '$uibModalInstance', 'projectsAndArrays', 'NewProjectService', 'NewTaskService', function ($scope, $uibModalInstance, projectsAndArrays, NewProjectService, NewTaskService) {

    var vm = this;
    var new_task_params = '';

    if(projectsAndArrays.isGlobal)
    {
        vm.projectsListVisibility = true;
    }
    else
    {
        vm.projectsListVisibility = false;
    }

    vm.projectsList = projectsAndArrays.projectsArray;
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

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// New Task Create Button Click /////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

    vm.addNewTaskInProject = function(taskName) {

        if(projectsAndArrays.isGlobal)
        {
            new_task_params = {
                'name': taskName,
                'status': 'Task Status',
                'projectsArray': vm.selectedProjects
            };

            var newTaskObject = {};
            var newTasksArray = [];
            var taskAlreadyExistsInProject = false;

            if(new_task_params.projectsArray)
            {
                for(var i in new_task_params.projectsArray)
                {
                    newTaskObject.id = NewTaskService.newTaskID();
                    newTaskObject.name = new_task_params.name;
                    newTaskObject.status = "Waiting For Approval";
                    newTaskObject.projectName = new_task_params.projectsArray[i].name;

                    taskAlreadyExistsInProject = NewProjectService.addTaskToProject(newTaskObject.projectName, newTaskObject);

                    if(taskAlreadyExistsInProject.status)
                    {
//                        console.log("This ONE");
                        alert("Task Already Exists In Project : " + taskAlreadyExistsInProject.inProject);
                        return;
                    }
                    else
                    {
                        newTasksArray.push(newTaskObject);
                    }

//                    console.log("This Shouldn't Be Called");
                    newTaskObject = {};
                }

                NewTaskService.setValue(newTasksArray);

                $uibModalInstance.close();

            }
            else
            {
                for(var x in NewTaskService.taskPanels)
                {
                    if(!(NewTaskService.taskPanels[x].projectName) && (NewTaskService.taskPanels[x].name == new_task_params.name))
                    {
                        alert("Multiple Tasks With Same Names Can Not Be Associated Within The Same Project");
                        return;
                    }
                }

                newTaskObject.id = NewTaskService.newTaskID();
                newTaskObject.name = new_task_params.name;
                newTaskObject.status = "Waiting For Approval";
                newTaskObject.projectName = '';
                newTasksArray.push(newTaskObject);
                NewTaskService.setValue(newTasksArray);
                newTaskObject = {};

                $uibModalInstance.close();

            }

        }
        else
        {
            if(NewTaskService.checkTaskExistence(taskName, projectsAndArrays.tasksArray))
            {
                alert('Task Already Exists');
                return;
            }

            new_task_params = {
                'id': NewTaskService.newTaskID(),
                'name': taskName,
                'status': 'Task Status'
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

app.controller('AddNewDocumentModalController', ['$scope', '$uibModalInstance', 'documentsArray', 'NewDocumentService', function ($scope, $uibModalInstance, documentsArray, NewDocumentService) {

    var vm = this;

    vm.modalType = 'Create';
    vm.modalHeading = 'Create New Document';

    /*////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// New Document Create Button Click /////////////////////////////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

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

    /*/////////////////////////////////////////////////////////////////////////////////////////////////
     ////////////////// New Document Create Button Click //////////////////[E N D]/////////////////////
     */////////////////////////////////////////////////////////////////////////////////////////////////

    vm.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);


