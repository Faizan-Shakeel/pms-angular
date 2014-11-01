/*** Created by faizankhan on 11/30/13 */

    var globalTotalNumberOfSearchResult;
    var globalProjectSearchResultData;

    var globalTotalProjectRecords;
    var globalTotalTaskRecords;
    var globalTotalFileRecords;
    var globalTotalUserRecords;


$(document).ready(function() {

    var socket = io.connect("http://localhost:1337");

    socket.emit('Project_Data_Get');

    socket.on("Project_Data_Retrieve", function(data) {

        makeProjectsTable(data);
        globalTotalProjectRecords = data;
        setShowingRecNo(data, 'project');
    });


    socket.on("Task_Data_Retrieve", function(data) {

        makeTasksTable(data);
        globalTotalTaskRecords = data;
        setShowingRecNo(data, 'task');


    });

    socket.on("File_Data_Retrieve", function(data) {

        makeFilesTable(data);
        globalTotalFileRecords = data;
        setShowingRecNo(data, 'file');


    });

    socket.on("User_Data_Retrieve", function(data) {

        makeUsersTable(data);
        globalTotalUserRecords = data;
        setShowingRecNo(data, 'user');


    });



    //    Show Project Tab As Active
    $('#projects-tab').tab('show');

    //    Tabs Click Events For Changing Search Options In Dropdown Menu
    $('#projects-tab').click(function (e) {
        $('#dropdown-item-projects').click();

        $('#well-left-task').hide();
        $('#well-right-task').hide();

        $('#well-left-file').hide();
        $('#well-right-file').hide();

        $('#well-left-user').hide();
        $('#well-right-user').hide();

        $('#well-left-project').show();
        $('#well-right-project').show();

        e.stopPropagation();
    });

    $('#tasks-tab').click(function (e) {
        $('#dropdown-item-tasks').click();

        $('#well-left-project').hide();
        $('#well-right-project').hide();

        $('#well-left-file').hide();
        $('#well-right-file').hide();

        $('#well-left-user').hide();
        $('#well-right-user').hide();

        $('#well-left-task').show();
        $('#well-right-task').show();

        e.stopPropagation();
    });

    $('#files-tab').click(function (e) {
        $('#dropdown-item-files').click();

        $('#well-left-project').hide();
        $('#well-right-project').hide();

        $('#well-left-user').hide();
        $('#well-right-user').hide();

        $('#well-left-task').hide();
        $('#well-right-task').hide();

        $('#well-left-file').show();
        $('#well-right-file').show();

        e.stopPropagation();
    });

    $('#users-tab').click(function (e) {
        $('#dropdown-item-users').click();

        $('#well-left-file').hide();
        $('#well-right-file').hide();

        $('#well-left-project').hide();
        $('#well-right-project').hide();

        $('#well-left-task').hide();
        $('#well-right-task').hide();

        $('#well-left-user').show();
        $('#well-right-user').show();

        e.stopPropagation();
    });

//    Previous Button Functionality
    $('.previous a').click(function(){

        var currentActiveTab = $('#get-active-tab .active').text();
        var jsonFileName = currentActiveTab.toLowerCase() + '.json';
        var searchFieldValue = $('#search-width').val();

        switch(currentActiveTab)
        {
            case 'Projects':
                var tableName = '#table-projects-id';
                var tableBody = '#table-projects-id tbody';
                var parentCheck = '.parent-check-project';
                var from = '#projectCurrentSetFrom';
                var to = '#projectCurrentSetTo';
                var nextPageID = '#nextPageProject';

                break;

            case 'Tasks':
                var tableName = '#table-tasks-id';
                var tableBody = '#table-tasks-id tbody';
                var parentCheck = '.parent-check-task';
                var from = '#taskCurrentSetFrom';
                var to = '#taskCurrentSetTo';
                var nextPageID = '#nextPageTask';

                break;

            case 'Files':

                var oainsd = oaisdjoasd

                var tableName = '#table-files-id';
                var tableBody = '#table-files-id tbody';
                var parentCheck = '.parent-check-file';
                var from = '#fileCurrentSetFrom';
                var to = '#fileCurrentSetTo';
                var nextPageID = '#nextPageFile';

                break;

            case 'Users':
                var tableName = '#table-users-id';
                var tableBody = '#table-users-id tbody';
                var parentCheck = '.parent-check-user';
                var from = '#userCurrentSetFrom';
                var to = '#userCurrentSetTo';
                var nextPageID = '#nextPageUser';

                break;
        }

        getPreviousPage(from, to, nextPageID, tableName, currentActiveTab, tableBody, parentCheck, jsonFileName, searchFieldValue);

    });

//    Next Button Functionality
    $('.next a').click(function(){

        var currentActiveTab = $('#get-active-tab .active').text();
        var jsonFileName = currentActiveTab.toLowerCase() + '.json';
        var searchFieldValue = $('#search-width').val();

        switch(currentActiveTab)
        {
            case 'Projects':
                var tableName = '#table-projects-id';
                var tableBody = '#table-projects-id tbody';
                var parentCheck = '.parent-check-project';
                var from = '#projectCurrentSetFrom';
                var to = '#projectCurrentSetTo';
                var nextPageID = '#nextPageProject';
                var totalNoOfRec = '#totalRecordsProject';

                break;

            case 'Tasks':
                var tableName = '#table-tasks-id';
                var tableBody = '#table-tasks-id tbody';
                var parentCheck = '.parent-check-task';
                var from = '#taskCurrentSetFrom';
                var to = '#taskCurrentSetTo';
                var nextPageID = '#nextPageTask';
                var totalNoOfRec = '#totalRecordsTask';

                break;

            case 'Files':
                var tableName = '#table-files-id';
                var tableBody = '#table-files-id tbody';
                var parentCheck = '.parent-check-file';
                var from = '#fileCurrentSetFrom';
                var to = '#fileCurrentSetTo';
                var nextPageID = '#nextPageFile';
                var totalNoOfRec = '#totalRecordsFile';

                break;

            case 'Users':
                var tableName = '#table-users-id';
                var tableBody = '#table-users-id tbody';
                var parentCheck = '.parent-check-user';
                var from = '#userCurrentSetFrom';
                var to = '#userCurrentSetTo';
                var nextPageID = '#nextPageUser';
                var totalNoOfRec = '#totalRecordsUser';

                break;
        }

        getNextPage(from, to, totalNoOfRec, nextPageID, tableName, currentActiveTab, tableBody, parentCheck, jsonFileName, searchFieldValue);

    });

//    Make Tables
//    alert(typeof (projects));
//    makeProjectsTable(projects);


//    Search
    $('#search-width').keyup(function()
    {
        var searchField = $('#search-width').val();
        if(!searchField)
        {
            makeProjectsTable();
            setShowingRecNo(globalTotalProjectRecords, 'project');
        }

        var myExp = new RegExp(searchField, "i");

        var output;
        var searchResultObject = {};
        var count = 0;

        $.each(globalTotalProjectRecords, function(key, val) {

            if ((val.name.search(myExp) != -1) || (val.department.search(myExp) != -1) || (val.status.search(myExp) != -1))
            {
                searchResultObject[count] =
                {
                    name: val.name,
                    status: val.status,
                    department: val.department,
                    endDate: val.endDate,
                    startDate: val.startDate,
                    budget: val.budget
                }

                count += 1;
            }
        });

        globalTotalNumberOfSearchResult = count;
        globalProjectSearchResultData = searchResultObject;
        searchedRecNoDisplayControl(searchResultObject, 'project', count);
        generateSearchedProjectsTable(searchResultObject);

    });

//    Initialize Click Events After Tables Are Generated
    setTimeout(function () {
        initializeClickEvents();

    }, 500);
});

//function adjustMargins(button)
//{
//    switch(button)
//    {
//        case 'Create':
//            $('#create-record').css({
//                marginLeft: 30
//            });
//            break;
//
//        case 'Edit':
//
//            $('#edit-record').css({
//                marginLeft: 100
//            });
//            break;
//
//        case 'Delete':
//            $('#delete-record').css({
//                marginLeft: 150
//            });
//            break;
//    }
//}

function editProjectModal(selectedRowName)
{

    for(var i in globalTotalProjectRecords)
    {
      //  alert(globalTotalProjectRecords[i].name);
        if(globalTotalProjectRecords[i].name == selectedRowName)
        {
            alert(globalTotalProjectRecords[i].name);
            var projNameField = $('#projectName');
            var projDepartmentField = $('#projectDepartment');
            var projStartDateField = $('#projectStartDate');
            var projEndDateField = $('#projectEndDate');
            var projDescriptionField = $('#projectDescription');

            projNameField.val(globalTotalProjectRecords[i].name);
            projDepartmentField.val(globalTotalProjectRecords[i].department);
            projStartDateField.val(globalTotalProjectRecords[i].startDate);
            projEndDateField.val(globalTotalProjectRecords[i].endDate);
            projDescriptionField.val(globalTotalProjectRecords[i].description);

            $('#projectCreateButton').text('Save Changes');
            $('#new-project-modal-form-heading').text('Edit Record');

            $('#new-project-modal-form').modal({
                show    : true,
                backdrop: false
            });

            return false;
        }
    }

    //        get values of selected project from database
//    var projectDummyValues = {
//        name: 'name dummy',
//        department: 'IT',
//        status: 'status dummy',
//        startDate: 'start date dummy',
//        endDate: 'end date dummy',
//        description: 'description dummy'
//    };


}

function deleteConfirmationModal()
{
    $('#confirmation-modal-form').modal({
        show    : true,
        backdrop: false
    });
}

function initializeClickEvents()
{
    $('.parent-check-project').on('click', function (e) {
        $(this).closest('table').find(':checkbox').prop('checked', this.checked);
        e.stopPropagation();
    });
    $('.parent-check-task').on('click', function (e) {
        $(this).closest('table').find(':checkbox').prop('checked', this.checked);
        e.stopPropagation();
    });
    $('.parent-check-file').on('click', function (e) {
        $(this).closest('table').find(':checkbox').prop('checked', this.checked);
        e.stopPropagation();
    });
    $('.parent-check-user').on('click', function (e) {
        $(this).closest('table').find(':checkbox').prop('checked', this.checked);
        e.stopPropagation();
    });

    $('.child-check-project').click(function(){

        if($(this).prop('checked') == false)
        {
            $('.parent-check-project').prop('checked', false);
        }

        if($('.child-check-project:checkbox:checked').length == $('#table-projects-id tbody tr').length)
        {
            $('.parent-check-project').prop('checked', true);
        }
    });

    $('.child-check-task').click(function(){

        if($(this).prop('checked') == false)
        {
            $('.parent-check-task').prop('checked', false);
        }

        if($('.child-check-task:checkbox:checked').length == $('#table-tasks-id tbody tr').length)
        {
            $('.parent-check-task').prop('checked', true);
        }
    });

    $('.child-check-file').click(function(){

        if($(this).prop('checked') == false)
        {
            $('.parent-check-file').prop('checked', false);
        }

        if($('.child-check-file:checkbox:checked').length == $('#table-files-id tbody tr').length)
        {
            $('.parent-check-file').prop('checked', true);
        }
    });

    $('.child-check-user').click(function(){

        if($(this).prop('checked') == false)
        {
            $('.parent-check-user').prop('checked', false);
        }

        if($('.child-check-user:checkbox:checked').length == $('#table-users-id tbody tr').length)
        {
            $('.parent-check-user').prop('checked', true);
        }
    });
}

function searchedRecNoDisplayControl(data, tabName, totalRecords)
{
    var tabNameCapital = tabName.charAt(0).toUpperCase() + tabName.slice(1);

    var from = "#" + tabName + "CurrentSetFrom";
    var to = "#" + tabName + "CurrentSetTo";
    var of = "#" + 'totalRecords' + tabNameCapital;
    var nextPage = "#" + 'nextPage' + tabNameCapital;
    var previousPage = "#" + 'previousPage' + tabNameCapital;

    if(totalRecords <= 10)
    {
        $(to).text(' ' + totalRecords);
        $(nextPage).addClass('disabled');
    }
    else
    {
        $(to).text(' ' + 10);
        $(nextPage).removeClass('disabled');
    }

    $(of).text(' ' + totalRecords);
    $(from).text(1);
}

function generateSearchedProjectsTable(data)
{
    $('#table-projects-id tbody').html("");

    for(var i in data)
    {
        var output = '<tr>';
        output += '<td>';
        output += '<input type="checkbox" value="None" class="css-checkbox lrg child-check-project" id="project-table-checkbox' + i + '" name="new-style-checkbox" />';
        output += '<label class="css-label lite-gray-check" for="project-table-checkbox' + i + '"></label>';
        output += '</td>';
        output += '<td>'+ data[i].name +'</td>';
        output += '<td>'+ data[i].status +' </td>';
        output += '<td>'+ data[i].department +' </td>';
        output += '<td>'+ data[i].endDate +'</td>';
        output += '<td>'+ data[i].startDate +'</td>';
        output += '<td>' + data[i].budget + '</td>';
        output += '</tr>';

        $('#table-projects-id tbody').append(output);

        if(i == 9)
        {
            return false;
        }
    }

}


function makeProjectsTable(project_entries)
{
    $('#table-projects-id tbody').html("");
//    alert(project_entries);
//    alert(typeof (project_entries));
//    $.getJSON('projects.json', function(data) {
    $.each(project_entries, function(key, val) {


        var currentdate = new Date(val.startDate);
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getFullYear();

        var currentdate_2 = new Date(val.endDate);
        var datetime_2 = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getFullYear();


            var output = '<tr>';
            output += '<td>';
            output += '<input type="checkbox" value="None" class="css-checkbox lrg child-check-project" id="project-table-checkbox' + key + '" name="new-style-checkbox" />';
            output += '<label class="css-label lite-gray-check" for="project-table-checkbox' + key + '"></label>';
            output += '</td>';
            output += '<td>'+ val.name +'</td>';
            output += '<td>'+ val.status +' </td>';
            output += '<td>'+ val.department +' </td>';
            output += '<td>'+ datetime_2 +'</td>';
            output += '<td>'+ datetime +'</td>';
            output += '<td>' + val.budget + '</td>';
            output += '</tr>';

            $('#table-projects-id tbody').append(output);

            if(key == 9)
            {
                return false;
            }
        });
   // }); //get JSON
}

function makeTasksTable(tasks_entries)
{
  //  $.getJSON('tasks.json', function(data) {
        $.each(tasks_entries, function(key, val) {

            var currentdate = new Date(val.endDate);
            var datetime_3 = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear();

            var currentdate = new Date(val.startDate);
            var datetime_4 = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear();


            var output = '<tr>';
            output += '<td>';
            output += '<input type="checkbox" value="None" class="css-checkbox lrg child-check-task" id="task-table-checkbox' + key + '" name="new-style-checkbox" />';
            output += '<label class="css-label lite-gray-check" for="task-table-checkbox' + key + '"></label>';
            output += '</td>';
            output += '<td>'+ val.name +'</td>';
            output += '<td>'+ val.status +' </td>';
            output += '<td>'+ val.department +' </td>';
            output += '<td>'+ datetime_3 +'</td>';
            output += '<td>'+ datetime_4 +'</td>';
            output += '<td>' + val.leader + '</td>';
            output += '</tr>';

            $('#table-tasks-id tbody').append(output);

            if(key == 9)
            {
                return false;
            }
        });
    //get JSON
}

function makeFilesTable(file_entries)
{
   // $.getJSON('files.json', function(data) {
        $.each(file_entries, function(key, val) {

            var output = '<tr>';
            output += '<td>';
            output += '<input type="checkbox" value="None" class="css-checkbox lrg child-check-file" id="file-table-checkbox' + key + '" name="new-style-checkbox" />';
            output += '<label class="css-label lite-gray-check" for="file-table-checkbox' + key + '"></label>';
            output += '</td>';
            output += '<td>'+ val.filename +'</td>';
            output += '<td>'+ val.type +' </td>';
            output += '<td>'+ val.size +' </td>';
            output += '<td>'+ val.uploadDate +'</td>';
            output += '<td>' + val.dateModified + '</td>';
            output += '</tr>';

            $('#table-files-id tbody').append(output);

            if(key == 9)
            {
                return false;
            }
        });

}
function makeUsersTable(user_entries)
{
   // $.getJSON('users.json', function(data) {
        $.each(user_entries, function(key, val) {

            var output = '<tr>';
            output += '<td>';
            output += '<input type="checkbox" value="None" class="css-checkbox lrg child-check-user" id="user-table-checkbox' + key + '" name="new-style-checkbox" />';
            output += '<label class="css-label lite-gray-check" for="user-table-checkbox' + key + '"></label>';
            output += '</td>';
            output += '<td>'+ val.name +'</td>';
            output += '<td>'+ val.department +' </td>';
            output += '<td>'+ val.designation +'</td>';
            output += '</tr>';

            $('#table-users-id tbody').append(output);

            if(key == 9)
            {
                return false;
            }
        });
}

function setShowingRecNo(data, tabName)
{
    var tabNameCapital = tabName.charAt(0).toUpperCase() + tabName.slice(1);

    var from = "#" + tabName + "CurrentSetFrom";
    var to = "#" + tabName + "CurrentSetTo";
    var of = "#" + 'totalRecords' + tabNameCapital;
    var nextPage = "#" + 'nextPage' + tabNameCapital;
    var previousPage = "#" + 'previousPage' + tabNameCapital;

//    $.getJSON(dataFile, function(data)
//    {
        var totalRecords = data.length;
        if(totalRecords <= 10)
        {
            $(to).text(' ' + totalRecords);
            $(nextPage).addClass('disabled');
        }
        else
        {
            $(to).text(' ' + 10);
            $(nextPage).removeClass('disabled');
        }

        $(of).text(' ' + totalRecords);
        $(from).text(1);
//    });
}


function getPreviousPage(from, to, nextPageID, tableName, currentActiveTab, tableBody, parentCheck, fileName, searchFieldValue)
{
    var fromText = $(from).text();
    var toText = $(to).text();

    if($(parentCheck).prop('checked') == true)
    {
        $(parentCheck).prop('checked', false);
    }

    if(toText > 10)
    {
        var lastSetFlag = false;
        var correctOffset = 20;

        if(parseInt(toText) - parseInt(fromText) != 9)
        {
            $(nextPageID).removeClass('disabled');
            correctOffset -= (9 - (parseInt(toText) - parseInt(fromText)));
            lastSetFlag = true;
        }

        var output;
        var count = 0;
        $(tableBody).html('');

        if(searchFieldValue)
        {
            data = globalProjectSearchResultData;
        }

        switch(currentActiveTab)
        {
            case 'Projects':
                $.each(globalTotalProjectRecords, function(key, val)
                {
                    key = parseInt(key);

                    if(key >= (parseInt(toText) - correctOffset))
                    {
                        output = '<tr>';
                        output += '<td>';
                        output += '<input type="checkbox" value="None" class="css-checkbox lrg child-check-project" id="project-table-checkbox' + key + '" name="new-style-checkbox" />';
                        output += '<label class="css-label lite-gray-check" for="project-table-checkbox' + key + '"></label>';
                        output += '</td>';
                        output += '<td>'+ val.name +'</td>';
                        output += '<td>'+ val.status +' </td>';
                        output += '<td>'+ val.department +' </td>';
                        output += '<td>'+ val.endDate +'</td>';
                        output += '<td>'+ val.startDate +'</td>';
                        output += '<td>' + val.budget + '</td>';
                        output += '</tr>';

                        $('#table-projects-id tbody').append(output);

                        count += 1;
                        if(count == 10)
                        {
                            var nextSet = parseInt(toText) - count;

                            if(nextSet == 10)
                            {
                                $('#previousPageProject').addClass('disabled');
                            }


                            $(from).text(' ' + parseInt(fromText) - 10);
                            if(lastSetFlag)
                            {
                                while((nextSet - $(from).text()) != 9)
                                {
                                    nextSet += 1;
                                }
                            }
                            $(to).text(' ' + nextSet);
                            return false;
                        }
                    }
                });
                break;

            case 'Tasks':
                $.each(data, function(key, val)
                {
                    if(key >= (parseInt(toText) - correctOffset))
                    {
                        var output = '<tr>';
                        output += '<td>';
                        output += '<input type="checkbox" value="None" class="css-checkbox lrg child-check-task" id="task-table-checkbox' + key + '" name="new-style-checkbox" />';
                        output += '<label class="css-label lite-gray-check" for="task-table-checkbox' + key + '"></label>';
                        output += '</td>';
                        output += '<td>'+ val.name +'</td>';
                        output += '<td>'+ val.status +' </td>';
                        output += '<td>'+ val.department +' </td>';
                        output += '<td>'+ val.endDate +'</td>';
                        output += '<td>'+ val.startDate +'</td>';
                        output += '<td>' + val.leader + '</td>';
                        output += '</tr>';

                        $('#table-tasks-id tbody').append(output);

                        count += 1;
                        if(count == 10)
                        {
                            var nextSet = parseInt(toText) - count;

                            if(nextSet == 10)
                            {
                                $('#previousPageTask').addClass('disabled');
                            }


                            $(from).text(' ' + parseInt(fromText) - 10);
                            if(lastSetFlag)
                            {
                                while((nextSet - $(from).text()) != 9)
                                {
                                    nextSet += 1;
                                }
                            }
                            $(to).text(' ' + nextSet);
                            return false;
                        }
                    }
                });
                break;

            case 'Files':
                $.each(data, function(key, val)
                {
                    if(key >= (parseInt(toText) - correctOffset))
                    {
                        var output = '<tr>';
                        output += '<td>';
                        output += '<input type="checkbox" value="None" class="css-checkbox lrg child-check-file" id="file-table-checkbox' + key + '" name="new-style-checkbox" />';
                        output += '<label class="css-label lite-gray-check" for="file-table-checkbox' + key + '"></label>';
                        output += '</td>';
                        output += '<td>'+ val.name +'</td>';
                        output += '<td>'+ val.type +' </td>';
                        output += '<td>'+ val.size +' </td>';
                        output += '<td>'+ val.dateCreated +'</td>';
                        output += '<td>' + val.dateModified + '</td>';
                        output += '</tr>';

                        $('#table-files-id tbody').append(output);

                        count += 1;
                        if(count == 10)
                        {
                            var nextSet = parseInt(toText) - count;

                            if(nextSet == 10)
                            {
                                $('#previousPageFile').addClass('disabled');
                            }


                            $(from).text(' ' + parseInt(fromText) - 10);
                            if(lastSetFlag)
                            {
                                while((nextSet - $(from).text()) != 9)
                                {
                                    nextSet += 1;
                                }
                            }
                            $(to).text(' ' + nextSet);
                            return false;
                        }
                    }
                });
                break;


            case 'Users':
                $.each(data, function(key, val)
                {
                    if(key >= (parseInt(toText) - correctOffset))
                    {
                        var output = '<tr>';
                        output += '<td>';
                        output += '<input type="checkbox" value="None" class="css-checkbox lrg child-check-user" id="user-table-checkbox' + key + '" name="new-style-checkbox" />';
                        output += '<label class="css-label lite-gray-check" for="user-table-checkbox' + key + '"></label>';
                        output += '</td>';
                        output += '<td>'+ val.name +'</td>';
                        output += '<td>'+ val.department +' </td>';
                        output += '<td>'+ val.designation +'</td>';
                        output += '</tr>';

                        $('#table-users-id tbody').append(output);

                        count += 1;
                        if(count == 10)
                        {
                            var nextSet = parseInt(toText) - count;

                            if(nextSet == 10)
                            {
                                $('#previousPageUser').addClass('disabled');
                            }

                            $(from).text(' ' + parseInt(fromText) - 10);
                            if(lastSetFlag)
                            {
                                while((nextSet - $(from).text()) != 9)
                                {
                                    nextSet += 1;
                                }
                            }
                            $(to).text(' ' + nextSet);
                            return false;
                        }
                    }
                });
                break;
            }
    }

    setTimeout(function () {
        initializeClickEvents();
    }, 500);
}

function getNextPage(from, to, totalNoOfRec, nextPageID, tableName, currentActiveTab, tableBody, parentCheck, fileName, searchFieldValue)
{
    var fromText = $(from).text();
    var toText = $(to).text();
    var totalNoOfRec = $(totalNoOfRec).text();

    if($(parentCheck).prop('checked') == true)
    {
        $(parentCheck).prop('checked', false);
    }

    if((toText.indexOf("0") >= 0) && toText < totalNoOfRec)
    {
        var output;
        $(tableBody).html('');

        var count = 0;

        if(searchFieldValue)
        {
            data = globalProjectSearchResultData;
        }

        switch(currentActiveTab)
        {
            case 'Projects':
                $.each(globalTotalProjectRecords, function(key, val)
                {
                    key = parseInt(key);

                    if(key >= toText)
                    {
                        output = '<tr>';
                        output += '<td>';
                        output += '<input type="checkbox" value="None" class="css-checkbox lrg child-check-project" id="project-table-checkbox' + key + '" name="new-style-checkbox" />';
                        output += '<label class="css-label lite-gray-check" for="project-table-checkbox' + key + '"></label>';
                        output += '</td>';
                        output += '<td>'+ val.name +'</td>';
                        output += '<td>'+ val.status +' </td>';
                        output += '<td>'+ val.department +' </td>';
                        output += '<td>'+ val.endDate +'</td>';
                        output += '<td>'+ val.startDate +'</td>';
                        output += '<td>' + val.budget + '</td>';
                        output += '</tr>';

                        $('#table-projects-id tbody').append(output);

                        count += 1;
                        if(count == 10)
                        {
                            var nextSet = parseInt(toText) + count;
                            $(from).text(parseInt(fromText) + 10);
                            $(to).text(' ' + nextSet);
                            $('#previousPageProject').removeClass('disabled');
                            return false;
                        }
                    }
                });
                break;

            case 'Tasks':
                $.each(data, function(key, val)
                {
                    if(key >= toText)
                    {
                        var output = '<tr>';
                        output += '<td>';
                        output += '<input type="checkbox" value="None" class="css-checkbox lrg child-check-task" id="task-table-checkbox' + key + '" name="new-style-checkbox" />';
                        output += '<label class="css-label lite-gray-check" for="task-table-checkbox' + key + '"></label>';
                        output += '</td>';
                        output += '<td>'+ val.name +'</td>';
                        output += '<td>'+ val.status +' </td>';
                        output += '<td>'+ val.department +' </td>';
                        output += '<td>'+ val.endDate +'</td>';
                        output += '<td>'+ val.startDate +'</td>';
                        output += '<td>' + val.leader + '</td>';
                        output += '</tr>';

                        $('#table-tasks-id tbody').append(output);

                        count += 1;
                        if(count == 10)
                        {
                            var nextSet = parseInt(toText) + count;
                            $(from).text(parseInt(fromText) + 10);
                            $(to).text(' ' + nextSet);
                            $('#previousPageTask').removeClass('disabled');
                            return false;
                        }
                    }
                });
                break;

            case 'Files':
                $.each(data, function(key, val)
                {
                    if(key >= toText)
                    {
                        var output = '<tr>';
                        output += '<td>';
                        output += '<input type="checkbox" value="None" class="css-checkbox lrg child-check-file" id="file-table-checkbox' + key + '" name="new-style-checkbox" />';
                        output += '<label class="css-label lite-gray-check" for="file-table-checkbox' + key + '"></label>';
                        output += '</td>';
                        output += '<td>'+ val.name +'</td>';
                        output += '<td>'+ val.type +' </td>';
                        output += '<td>'+ val.size +' </td>';
                        output += '<td>'+ val.dateCreated +'</td>';
                        output += '<td>' + val.dateModified + '</td>';
                        output += '</tr>';

                        $('#table-files-id tbody').append(output);

                        count += 1;
                        if(count == 10)
                        {
                            var nextSet = parseInt(toText) + count;
                            $(from).text(parseInt(fromText) + 10);
                            $(to).text(' ' + nextSet);
                            $('#previousPageFile').removeClass('disabled');
                            return false;
                        }
                    }
                });
                break;


            case 'Users':
                $.each(data, function(key, val)
                {
                    if(key >= toText)
                    {
                        var output = '<tr>';
                        output += '<td>';
                        output += '<input type="checkbox" value="None" class="css-checkbox lrg child-check-user" id="user-table-checkbox' + key + '" name="new-style-checkbox" />';
                        output += '<label class="css-label lite-gray-check" for="user-table-checkbox' + key + '"></label>';
                        output += '</td>';
                        output += '<td>'+ val.name +'</td>';
                        output += '<td>'+ val.department +' </td>';
                        output += '<td>'+ val.designation +'</td>';
                        output += '</tr>';

                        $('#table-users-id tbody').append(output);

                        count += 1;
                        if(count == 10)
                        {
                            var nextSet = parseInt(toText) + count;
                            $(from).text(parseInt(fromText) + 10);
                            $(to).text(' ' + nextSet);
                            $('#previousPageUser').removeClass('disabled');
                            return false;
                        }
                    }
                });
                break;
            }

            if(count < 10)
            {
                $(from).text(parseInt(fromText) + 10);
                $(to).text(' ' + (parseInt(toText) + count));
                $(nextPageID).addClass('disabled');
            }

    }

    setTimeout(function () {
        initializeClickEvents();
    }, 500);
}


//<form id="form1" method="post">
//    <input type="text" id="name1" name="value" value="">
//    <input type="submit"  class="update_form"  value="Save Changes"> <!-- changed -->
//    </form>
//
//    <form id="form2" method="post">
//        <input type="text" id="name2" name="value" value="">
//        <input type="submit"  class="update_form"  value="Save Changes"> <!-- changed -->
//    </form>
//
//    <script>
//        // this is the class of the submit button
//        $(".update_form").click(function() { // changed
//        $.ajax({
//            type: "POST",
//            url: "approve_test.php",
//            data: $(this).parent().serialize(), // changed
//            success: function(data)
//            {
//                alert(data); // show response from the php script.
//            }
//    });
//    return false; // avoid to execute the actual submit of the form.
//    });
//</script>