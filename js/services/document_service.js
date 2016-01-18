"use strict";
/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('documentServiceModule', []);

app.service('DocumentService',['mongoCrudService', function(mongoCrudService){

    var documentPanels = [];
    var documentsIdArray = [];
    var documentValues = {};
    var createDocumentPanel = function(newDocumentObject)
    {
        "use strict";

        angular.forEach(newDocumentObject, function(value, index){
            documentPanels.push(newDocumentObject[index]);
            console.log(newDocumentObject[index]);
            documentValues = {documents: newDocumentObject[index]};
            mongoCrudService.createNewEntry(documentValues);
        });
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

        var documentID = documentsIdArray.length + 'd';
        documentsIdArray.push(documentID);

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
                    console.log(valueFromGlobalList.id);
                    documentPanels = removeEntity(documentPanels, 'id', 'project', valueFromGlobalList.id, valueFromGlobalList.project);
                    mongoCrudService.deleteData(valueFromGlobalList.id);
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

    var deleteFloatingDocuments = function(floatingDocuments, deleteByProperty)
    {
        "use strict";
        //                        console.log("Global Docs AFTER : " + JSON.stringify(DocumentService.getDocumentPanels()));

        for(var floatDocument of floatingDocuments)
        {

            for(var document of documentPanels)
            {
                if(!(document.project) && (document.id == floatDocument.id))
                {
                    removeEntity(documentPanels, 'id', 'project', document.id, document.project);
                }
            }
        }
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

            if(projectDocuments.length)
            {
                for(var projectDocument of projectDocuments)
                {
                    if((projectDocument.name == document.name) || (document.project == projectName) || (document.task))
                    {
                        documentNotFound = false;
                        break;
                    }
                }
            }

            else if(document.project == projectName)
            {
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

    return{
        newDocumentID: newDocumentID,
        checkDocumentExistence: checkDocumentExistence,
        chkTaskDocsInPrjDocsWithoutPrjName: chkTaskDocsInPrjDocsWithoutPrjName,
        createDocumentPanel: createDocumentPanel,
        getDocumentPanels: getDocumentPanels,
        deleteDocument: deleteDocument,
        deleteDocumentModal: deleteDocumentModal,
        deleteDocumentGlobal: deleteDocumentGlobal,
        deleteFloatingDocuments: deleteFloatingDocuments,
        hasDuplicates: hasDuplicates,
        addTaskToDocument: addTaskToDocument,
        updateDocuments: updateDocuments,
        removePrjDocsFromExistingDocs: removePrjDocsFromExistingDocs
    };

}]);