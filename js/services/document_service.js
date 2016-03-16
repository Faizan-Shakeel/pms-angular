"use strict";
/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('documentServiceModule', ['ngFileUpload']);

app.service('DocumentService',['NotificationsAndHistoryService' ,'mongoCrudService', '$localStorage', 'Upload', function(NotificationsAndHistoryService, mongoCrudService, $localStorage, Upload)
{
    var accordionInfo;
    var documentPanels = [];
    var documentsIdArray = [];
    var action;
    var actionBy;
    var elementType;
    var historyObject;

    var createDocumentPanel = function(newDocumentObject)
    {
        "use strict";

        angular.forEach(newDocumentObject, function(value, index){
            documentPanels.push(newDocumentObject[index]);
            console.log(newDocumentObject[index]);
            var documentValues = {documents: newDocumentObject[index]};
            mongoCrudService.createNewEntry(documentValues);

            action = 'created';
            actionBy = 'User';
            elementType = 'Document';

            NotificationsAndHistoryService.addNotifications(newDocumentObject[index], action, actionBy, elementType);

            accordionInfo = NotificationsAndHistoryService.getAccordionStatus();
            NotificationsAndHistoryService.setNotificationsCount(accordionInfo.isSecondOpen, accordionInfo.accVisibility);

            historyObject = {elementType: elementType, element: newDocumentObject[index]};
            NotificationsAndHistoryService.makeHistory(historyObject);
        });
    };

    var getDocumentById = function(documentId)
    {
        for(var documentGlobal of documentPanels)
        {
            if(documentGlobal.id == documentId)
            {
                return documentGlobal;
            }
        }
    };

    var updatedDocumentParams = function(updated_document)
    {
        for(var documentToUpdate of documentPanels)
        {
            if(documentToUpdate.id == updated_document.id)
            {
                documentToUpdate.description = updated_document.description;

                break;
            }
        }
    };

    var checkDocumentExistenceById = function(documentId)
    {
        "use strict";
//                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        var documentAlreadyExists = false;

        for(var documentPanel of documentPanels)
        {
            if(documentPanel.id == documentId)
            {
                documentAlreadyExists = true;
                break;
            }
        }

        return documentAlreadyExists;

    };

    var checkDocumentExistence = function(documentName, documentsArray)
    {
        "use strict";
//                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        var documentAlreadyExists = false;

        for(var doc of documentsArray)
        {
            if(doc.name == documentName)
            {
                documentAlreadyExists = true;
                break;
            }
            else
            {
                documentAlreadyExists = false;
            }
        }

        return documentAlreadyExists;

    };

    var chkTaskDocsInPrjDocsWithoutPrjName = function(taskDocs, modalDocs)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        var documentAlreadyExists = false;

        for(var tDoc of taskDocs)
        {
            for(var mDoc of modalDocs)
            {
                if(tDoc.name == mDoc.name)
                {
                    documentAlreadyExists = true;
                    return {status: documentAlreadyExists, existingDocument: mDoc.name};
                    break;
                }
                else
                {
                    documentAlreadyExists = false;
                }
            }
        }

        return documentAlreadyExists;

    };

    var newDocumentID = function()
    {
        "use strict";
        if ($localStorage.documentsIdArray)
        {
            documentsIdArray = $localStorage.documentsIdArray.slice();
        }
        var documentID = documentsIdArray.length + 'd';
        documentsIdArray.push(documentID);
        $localStorage.documentsIdArray = documentsIdArray.slice();

        return documentID;
    };

    var getDocumentPanels = function(){
        "use strict";

        return documentPanels;
    };

    var deleteDocument = function(documentsArray)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        angular.forEach(documentsArray, function(valueFromGlobalList,indexGlobalList){
            angular.forEach(documentPanels, function(valueFromSpecificProject,indexSpecificProject){
                if(valueFromGlobalList.id == valueFromSpecificProject.id)
                {
                    console.log('this focument called');
                    documentPanels = removeEntity(documentPanels, 'id', 'project', valueFromGlobalList.id, valueFromGlobalList.project);
                    mongoCrudService.deleteData(valueFromGlobalList.id);
                    mongoCrudService.deleteFile(valueFromGlobalList.url);
                }
            });
        });
    };

    var deleteDocumentModal = function(selectedDocumentToDelete, modalDocumentsArray)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        removeEntity(modalDocumentsArray, 'id', 'project', selectedDocumentToDelete.id, selectedDocumentToDelete.project);
    };

    var deleteDocumentGlobal = function(documentsToDelete, deleteFrom)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        for(var document of documentsToDelete)
        {
            removeEntity(deleteFrom, 'id', 'project', document.id, document.project);
        }
    };

    var deleteFloatingDocuments = function(floatingDocuments)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        for(var floatDocument of floatingDocuments)
        {

            for(var document of documentPanels)
            {
                if(!(document.project) && (document.id == floatDocument.id))
                {
                    console.log("documentPanels : " + JSON.stringify(documentPanels));

                    removeEntity(documentPanels, 'id', 'project', document.id, document.project);

                    console.log("documentPanels : " + JSON.stringify(documentPanels));
                }
            }
        }
    };

    var deleteDocumentsFromModalTask = function(docToDelete, modalTasks)
    {
        var documentDeletedFlag = false;

        if(docToDelete.task)
        {
            for (var task of modalTasks)
            {
                if(task.name == docToDelete.task)
                {
                    removeEntity(task.documents, 'id', 'project', docToDelete.id, docToDelete.project);
                    documentDeletedFlag = true;
                }
            }
        }

        return documentDeletedFlag;

    };

    var addTaskToDocument = function(documentsArray, taskName)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        angular.forEach(documentsArray, function(value, index)
        {
            documentsArray[index].task = taskName;
        });
    };

    var updateDocuments = function(updatedDocuments, global)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        for(var i=0; i<updatedDocuments.length; i++)
        {
            for(var j=0; j<documentPanels.length; j++)
            {
                if(documentPanels[j].id == updatedDocuments[i].id)
                {
                    documentPanels[j] = updatedDocuments[i];
                    if(global)
                    {
                        return documentPanels[j];
                    }
                }
            }
        }
    };

    var removePrjDocsFromExistingDocs = function(projectDocuments, projectName)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        var filteredArray = [];
        var documentNotFound;

        for(var document of documentPanels)
        {
            documentNotFound = true;

            console.log("document" + JSON.stringify(document));

            if(projectDocuments.length)
            {
                console.log("TTWWOO");

                for(var projectDocument of projectDocuments)
                {
                    console.log("TTHHRREE");

                    if((projectDocument.name == document.name) || (document.project == projectName) || (document.task))
                    {
                        documentNotFound = false;
                        break;
                    }
                }
            }

            else if(document.project == projectName)
            {
                console.log("FFOOUURR");

                documentNotFound = false;
            }

            else if(document.task)
            {
                documentNotFound = false;
            }

            if(documentNotFound)
            {
                filteredArray.push(document);
            }
        }

        return filteredArray;

    };

    var removeTaskDocsFromExistingDocs = function(taskDocuments, taskName)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        var filteredArray = [];
        var documentNotFound;

        for(var document of documentPanels)
        {
            documentNotFound = true;

            console.log("document" + JSON.stringify(document));

            if(taskDocuments.length)
            {
                console.log("TTWWOO");

                for(var taskDoc of taskDocuments)
                {
                    console.log("TTHHRREE");

                    if((taskDoc.name == document.name) || (document.task == taskName) || (document.project))
                    {
                        documentNotFound = false;
                        break;
                    }
                }
            }

            else if(document.task == taskName)
            {
                console.log("FFOOUURR");

                documentNotFound = false;
            }

            else if(document.project)
            {
                documentNotFound = false;
            }

            if(documentNotFound)
            {
                filteredArray.push(document);
            }
        }

        return filteredArray;

    };

    var hasDuplicates = function(array)
    {
        "use strict";

        return (new Set(array)).size !== array.length;
    };

    var removeEntity = function(arr, attr, attr2, value, value2)
    {
        "use strict";

        var i = arr.length;
        while(i--){
            if( arr[i]
                && arr[i].hasOwnProperty(attr)
                && (arguments.length > 2 && arr[i][attr] === value && arr[i][attr2] === value2) ){

                arr.splice(i,1);
            }
        }
        return arr;
    };

    var extractFileExtension = function(file)
    {
        //** Here we are extracting the extension of the file. **
        var fileExtension = '';
        for (var i = file.length - 1; i>=0; i--)
        {
            fileExtension = file[i] + fileExtension;
            if (file[i] == '.')
            {
                break;
            }
        }
        return fileExtension;
    }

    var uploadFile = function(documentName,file, callback)    
    {
        var progressPercentage;
        var fileExtension = extractFileExtension(file.name);
        documentName = documentName + fileExtension;
        file.upload = Upload.upload({
            url: '/uploads',
            method: 'POST',
            data: {'file': file, documentName: documentName}
        }).then(function(res)
        {
           console.log(res);
           console.log("Document Saved Successfully");
           //return {msg: 'successfully uploaded'};
        }, function (res)
        {
            console.log(res);
        }, function (evt)
        {
            progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            callback({progress: progressPercentage, fileName: evt.config.data.file.name});
        });
    }

    return{
        newDocumentID: newDocumentID,
        checkDocumentExistenceById: checkDocumentExistenceById,
        checkDocumentExistence: checkDocumentExistence,
        chkTaskDocsInPrjDocsWithoutPrjName: chkTaskDocsInPrjDocsWithoutPrjName,
        createDocumentPanel: createDocumentPanel,
        getDocumentById: getDocumentById,
        updatedDocumentParams: updatedDocumentParams,
        getDocumentPanels: getDocumentPanels,
        deleteDocument: deleteDocument,
        deleteDocumentModal: deleteDocumentModal,
        deleteDocumentGlobal: deleteDocumentGlobal,
        deleteFloatingDocuments: deleteFloatingDocuments,
        deleteDocumentsFromModalTask: deleteDocumentsFromModalTask,
        hasDuplicates: hasDuplicates,
        addTaskToDocument: addTaskToDocument,
        updateDocuments: updateDocuments,
        removePrjDocsFromExistingDocs: removePrjDocsFromExistingDocs,
        extractFileExtension: extractFileExtension,
        uploadFile: uploadFile,
        removeTaskDocsFromExistingDocs: removeTaskDocsFromExistingDocs
    };

}]);
