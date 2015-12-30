/**
 * Created by faizankhan on 11/8/2014.
 */

var app = angular.module('newDocumentServiceModule', []);

app.service('NewDocumentService', function(){

    var documentPanels = [];
    var documentsIdArray = [];

    var setValue = function(newDocumentObject){

        angular.forEach(newDocumentObject, function(value, index){
            documentPanels.push(newDocumentObject[index]);
        });

    };

    var checkDocumentExistence = function(documentName, documentsArray)
    {
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
        var documentID = documentsIdArray.length;
        documentsIdArray.push(documentID);

        return documentID;
    };

    var getValue = function(){
        return documentPanels;
    };

    var deleteDocument = function(documentsArray)
    {
        angular.forEach(documentsArray, function(valueFromGlobalList,indexGlobalList){
            angular.forEach(documentPanels, function(valueFromSpecificProject,indexSpecificProject){
                if(valueFromGlobalList.id == valueFromSpecificProject.id)
                {
                    documentPanels = removeEntity(documentPanels, 'id', valueFromGlobalList.id);
                }
            });
        });
    };

    var removeEntity = function(arr, attr, value){
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
        setValue: setValue,
        getValue: getValue,
        deleteDocument: deleteDocument,
        documentPanels: documentPanels
    };

});
