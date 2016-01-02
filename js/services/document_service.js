"use strict";
/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('newDocumentServiceModule', []);

app.service('NewDocumentService', function(){

    var documentPanels = [];
    var documentsIdArray = [];

    var createDocumentPanel = function(newDocumentObject)
    {
        "use strict";

        angular.forEach(newDocumentObject, function(value, index){
            documentPanels.push(newDocumentObject[index]);
        });
    };

    var checkDocumentExistence = function(documentName, documentsArray)
    {
        "use strict";

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

    var newDocumentID = function()
    {
        "use strict";

        var documentID = documentsIdArray.length;
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

        angular.forEach(documentsArray, function(valueFromGlobalList,indexGlobalList){
            angular.forEach(documentPanels, function(valueFromSpecificProject,indexSpecificProject){
                if(valueFromGlobalList.id == valueFromSpecificProject.id)
                {
                    documentPanels = removeEntity(documentPanels, 'id', valueFromGlobalList.id);
                }
            });
        });
    };

    var deleteDocumentModal = function(selectedDocumentToDelete, modalDocumentsArray)
    {
        "use strict";

        removeEntity(modalDocumentsArray, 'id', selectedDocumentToDelete.id);
    };

    var deleteDocumentGlobal = function(documentsToDelete, deleteFrom)
    {
        "use strict";

        for(var document of documentsToDelete)
        {
            removeEntity(deleteFrom, 'id', document.id);
        }
    };

    var deleteFloatingDocuments = function(floatingDocuments)
    {
        "use strict";

        for(var floatDocument of floatingDocuments)
        {
            for(var document of documentPanels)
            {
                if(!(document.projectName) && (document.id == floatDocument.id))
                {
                    removeEntity(documentPanels, 'projectName', document.projectName);
                }
            }
        }
    };

    var updateDocuments = function(updatedDocuments, global)
    {
        "use strict";

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

    var removeProjectDocumentsFromExistingDocuments = function(projectDocuments, projectName)
    {
        "use strict";

        var filteredArray = [];
        var documentNotFound;

        for(var document of documentPanels)
        {
            documentNotFound = true;

            if(projectDocuments.length)
            {
                for(var projectDocument of projectDocuments)
                {
                    if((projectDocument.name == document.name) || (document.projectName == projectName))
                    {
                        documentNotFound = false;
                        break;
                    }
                }
            }

            else if(document.projectName == projectName)
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

    function hasDuplicates(array)
    {
        "use strict";

        return (new Set(array)).size !== array.length;
    }

    var removeEntity = function(arr, attr, value)
    {
        "use strict";

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

    return{
        newDocumentID: newDocumentID,
        checkDocumentExistence: checkDocumentExistence,
        createDocumentPanel: createDocumentPanel,
        getDocumentPanels: getDocumentPanels,
        deleteDocument: deleteDocument,
        deleteDocumentModal: deleteDocumentModal,
        deleteDocumentGlobal: deleteDocumentGlobal,
        deleteFloatingDocuments: deleteFloatingDocuments,
        hasDuplicates: hasDuplicates,
        updateDocuments: updateDocuments,
        removeProjectDocumentsFromExistingDocuments: removeProjectDocumentsFromExistingDocuments
    };

});
