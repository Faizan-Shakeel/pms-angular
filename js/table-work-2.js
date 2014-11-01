/**
 * Created by faizankhan on 11/30/13.
 */
//    var testCall = require("./test-server-call");

    var globalTotalNumberOfSearchResultProject;
    var globalTotalNumberOfSearchResultTask;
    var globalTotalNumberOfSearchResultFile;
    var globalTotalNumberOfSearchResultUser;

    var globalProjectSearchResultData;
    var globalTaskSearchResultData;
    var globalFileSearchResultData;
    var globalUserSearchResultData;

$(document).ready(function() {

    setShowingRecNo('projects.json', 'project');
    setShowingRecNo('tasks.json', 'task');
    setShowingRecNo('files.json', 'file');
    setShowingRecNo('users.json', 'user');

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
    makeProjectsTable();
//    alert('asdawdawd');
    makeTasksTable();
    makeFilesTable();
    makeUsersTable();

//    Search
    $('#search-width').keyup(function()
    {
        var currentActiveTab = $('#get-active-tab .active').text();
//        var searchField = $('#search-width').val();

        switch (currentActiveTab)
        {
            case 'Projects':
                var searchField = $('#search-width').val();
                if(!searchField)
                {
                    makeProjectsTable();
                    setShowingRecNo('projects.json', 'project');
//                    setTimeout(function () {
//                        initializeClickEvents();
//                    }, 200);

                    delayedInitialization();


                }

                var myExp = new RegExp(searchField, "i");

                $.getJSON('projects.json', function(data)
                {
                    var searchResultObject = {};
                    var count = 0;

                    $.each(data, function(key, val) {

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

                    globalTotalNumberOfSearchResultProject = count;
                    globalProjectSearchResultData = searchResultObject;
                    searchedRecNoDisplayControl(searchResultObject, 'project', count);
                    generateSearchedProjectsTable(searchResultObject);

                    delayedInitialization();

                }); //get JSON


                break;

            case 'Tasks':
                var searchField = $('#search-width').val();
                if(!searchField)
                {
                    makeTasksTable();
                    setShowingRecNo('tasks.json', 'task');

//                    setTimeout(function () {
//                        initializeClickEvents();
//                    }, 200);

                    delayedInitialization();

                }

                var myExp = new RegExp(searchField, "i");

                $.getJSON('tasks.json', function(data)
                {
                    var searchResultObject = {};
                    var count = 0;

                    $.each(data, function(key, val) {

                        if ((val.name.search(myExp) != -1) || (val.department.search(myExp) != -1) || (val.status.search(myExp) != -1))
                        {
                            searchResultObject[count] =
                            {
                                name: val.name,
                                status: val.status,
                                department: val.department,
                                startDate: val.startDate,
                                endDate: val.endDate
                            }

                            count += 1;
                        }
                    });

                    globalTotalNumberOfSearchResultTask = count;
                    globalTaskSearchResultData = searchResultObject;
                    searchedRecNoDisplayControl(searchResultObject, 'task', count);
                    generateSearchedTasksTable(searchResultObject);

                    delayedInitialization();

                }); //get JSON


                break;

            case 'Files':
                var searchField = $('#search-width').val();
                if(!searchField)
                {
                    makeFilesTable();
                    setShowingRecNo('files.json', 'file');

//                    setTimeout(function () {
//                        initializeClickEvents();
//                    }, 200);

                    delayedInitialization();

                }

                var myExp = new RegExp(searchField, "i");

                $.getJSON('files.json', function(data)
                {
                    var searchResultObject = {};
                    var count = 0;

                    $.each(data, function(key, val) {

                        if ((val.name.search(myExp) != -1) || (val.type.search(myExp) != -1) || (val.owner.search(myExp) != -1))
                        {
                            searchResultObject[count] =
                            {
                                name: val.name,
                                type: val.type,
                                size: val.size,
                                dateCreated: val.dateCreated,
                                owner: val.owner
                            }

                            count += 1;
                        }
                    });

                    globalTotalNumberOfSearchResultFile = count;
                    globalFileSearchResultData = searchResultObject;
                    searchedRecNoDisplayControl(searchResultObject, 'file', count);
                    generateSearchedFilesTable(searchResultObject);

                    delayedInitialization();

                }); //get JSON


                break;

            case 'Users':
                var searchField = $('#search-width').val();
                if(!searchField)
                {
                    makeUsersTable();
                    setShowingRecNo('users.json', 'user');

//                    setTimeout(function () {
//                        initializeClickEvents();
//                    }, 200);

                    delayedInitialization();

                }

                var myExp = new RegExp(searchField, "i");

                $.getJSON('users.json', function(data)
                {
                    var searchResultObject = {};
                    var count = 0;

                    $.each(data, function(key, val) {

                        if ((val.name.search(myExp) != -1) || (val.department.search(myExp) != -1) || (val.designation.search(myExp) != -1) || (val.role.search(myExp) != -1))
                        {
                            searchResultObject[count] =
                            {
                                name: val.name,
                                department: val.department,
                                designation: val.designation,
                                role: val.role
                            }

                            count += 1;
                        }
                    });

                    globalTotalNumberOfSearchResultUser = count;
                    globalUserSearchResultData = searchResultObject;
                    searchedRecNoDisplayControl(searchResultObject, 'user', count);
                    generateSearchedUsersTable(searchResultObject);

                    delayedInitialization();

                }); //get JSON


                break;
        }

    });

//    Initialize Click Events After Tables Are Generated
//    setTimeout(function () {
//        initializeClickEvents();
//    }, 200);

//    var aoskndawd = $('#test-timing').text();

//    alert($('#test-timing').val());
//    delayedInitialization();
//    alert($('#test-timing').val());
//    alert(aoskndawd);

//    initializeClickEvents();
});

function parentCheckBoxesControl(checkedProp, checkedCount)
{
    var currentActiveTab = $('#get-active-tab .active').text();

    if(checkedCount > 0)
    {
        $('#edit-record').hide();
        $('#delete-record').show();
    }
    else
    {
        $('#edit-record').hide();
        $('#delete-record').hide();
    }

    switch(currentActiveTab)
    {
        case 'Projects':
            if(checkedProp)
            {
                $('#table-projects-id tbody tr').addClass('rowHighlight2');
            }
            else
            {
                $('#table-projects-id tbody tr').removeClass('rowHighlight2');
            }

            break;

        case 'Tasks':
            if(checkedProp)
            {
                $('#table-tasks-id tbody tr').addClass('rowHighlight2');
            }
            else
            {
                $('#table-tasks-id tbody tr').removeClass('rowHighlight2');
            }

            break;

        case 'Files':
            if(checkedProp)
            {
                $('#table-files-id tbody tr').addClass('rowHighlight2');
            }
            else
            {
                $('#table-files-id tbody tr').removeClass('rowHighlight2');
            }

            break;

        case 'Users':
            if(checkedProp)
            {
                $('#table-users-id tbody tr').addClass('rowHighlight2');
            }
            else
            {
                $('#table-users-id tbody tr').removeClass('rowHighlight2');
            }

            break;
    }

    if($('#accordion').is(":visible"))
    {
//        $('#create-record').hide();
        $('#delete-record').css('marginLeft', 0);
    }
    else
    {
//        $('#create-record').show();
        $('#delete-record').css('marginLeft', 4);
    }

}


function childCheckBoxesControl(checkedProp, checkedCount)
{
    if(checkedProp)
    {
        $('#delete-record').show();

        if(checkedCount == 1)
        {
            $('#edit-record').show();
            $('#delete-record').css('marginLeft', 0);
        }
        else
        {
            $('#edit-record').hide();
        }
    }
    else if(!checkedProp)
    {
        if(checkedCount == 0 || checkedCount > 1)
        {
            $('#edit-record').hide();
        }

        else if(checkedCount == 1)
        {
            $('#edit-record').show();
            $('#delete-record').css('marginLeft', 0);
        }

        if(checkedCount == 0)
        {
            $('#delete-record').hide();
        }

    }



    if($('#accordion').is(":hidden"))
    {
        if($('#edit-record').is(":visible"))
        {
            $('#delete-record').css('marginLeft', 0);
        }
        else
        {
            $('#delete-record').css('marginLeft', 4);
        }
    }

}

function initializeClickEvents()
{
    $("#delete-record").click(function(){

        var currentActiveTab = $('#get-active-tab .active').text();

        switch (currentActiveTab)
        {
            case 'Projects':

                var myTableArray = [];
                var selectedRowsProjectsList = [];

                $("table#table-projects-id tr:has(input:checked)").each(function() {

                    var arrayOfThisRow = [];
                    var tableData = $(this).find('td');

                    if (tableData.length > 0) {
                        tableData.each(function() { arrayOfThisRow.push($(this).text()); });

                        selectedRowsProjectsList.push(arrayOfThisRow[1]);
//                myTableArray.push(arrayOfThisRow);
                    }
                });

                alert(selectedRowsProjectsList);

                break;

            case 'Tasks':

                var myTableArray = [];
                var selectedRowsTasksList = [];

                $("table#table-tasks-id tr:has(input:checked)").each(function() {

                    var arrayOfThisRow = [];
                    var tableData = $(this).find('td');

                    if (tableData.length > 0) {
                        tableData.each(function() { arrayOfThisRow.push($(this).text()); });

                        selectedRowsTasksList.push(arrayOfThisRow[1]);
//                myTableArray.push(arrayOfThisRow);
                    }
                });

                alert(selectedRowsTasksList);

                break;

            case 'Files':

                var myTableArray = [];
                var selectedRowsFilesList = [];

                $("table#table-files-id tr:has(input:checked)").each(function() {

                    var arrayOfThisRow = [];
                    var tableData = $(this).find('td');

                    if (tableData.length > 0) {
                        tableData.each(function() { arrayOfThisRow.push($(this).text()); });

                        selectedRowsFilesList.push(arrayOfThisRow[1]);
//                myTableArray.push(arrayOfThisRow);
                    }
                });

                alert(selectedRowsFilesList);

                break;

            case 'Users':

                var myTableArray = [];
                var selectedRowsUsersList = [];

                $("table#table-users-id tr:has(input:checked)").each(function() {

                    var arrayOfThisRow = [];
                    var tableData = $(this).find('td');

                    if (tableData.length > 0) {
                        tableData.each(function() { arrayOfThisRow.push($(this).text()); });

                        selectedRowsUsersList.push(arrayOfThisRow[1]);
//                myTableArray.push(arrayOfThisRow);
                    }
                });

                alert(selectedRowsUsersList);

                break;
        }
    });

    $("#edit-record").click(function(){

        var currentActiveTab = $('#get-active-tab .active').text();

        switch (currentActiveTab)
        {
            case 'Projects':

                var editSelectedRowNameProject = $("table#table-projects-id tr:has(input:checked)").children("*")[1].innerHTML;

                break;

            case 'Tasks':

                var editSelectedRowNameTask = $("table#table-tasks-id tr:has(input:checked)").children("*")[1].innerHTML;

                break;

            case 'Files':

                var editSelectedRowNameFile = $("table#table-files-id tr:has(input:checked)").children("*")[1].innerHTML;

                break;

            case 'Users':

                var editSelectedRowNameUser = $("table#table-users-id tr:has(input:checked)").children("*")[1].innerHTML;

                break;
        }
    });

    $('.parent-check-project').on('click', function (e) {

        var checkedProp = $(this).prop('checked');
        $(this).closest('table').find(':checkbox').prop('checked', this.checked);
        var checkedCount = $('.child-check-project:checkbox:checked').length;

        parentCheckBoxesControl(checkedProp, checkedCount);

        e.stopPropagation();
    });

    $('.parent-check-task').on('click', function (e) {
        var checkedProp = $(this).prop('checked');
        $(this).closest('table').find(':checkbox').prop('checked', this.checked);
        var checkedCount = $('.child-check-task:checkbox:checked').length;

        parentCheckBoxesControl(checkedProp, checkedCount);

        e.stopPropagation();
    });
    $('.parent-check-file').on('click', function (e) {
        var checkedProp = $(this).prop('checked');
        $(this).closest('table').find(':checkbox').prop('checked', this.checked);
        var checkedCount = $('.child-check-file:checkbox:checked').length;

        parentCheckBoxesControl(checkedProp, checkedCount);

        e.stopPropagation();
    });
    $('.parent-check-user').on('click', function (e) {
        var checkedProp = $(this).prop('checked');
        $(this).closest('table').find(':checkbox').prop('checked', this.checked);

        var checkedCount = $('.child-check-user:checkbox:checked').length;

        parentCheckBoxesControl(checkedProp, checkedCount);

        e.stopPropagation();
    });

    $('.child-check-project').click(function() {

        var checkedProp = $(this).prop('checked');
        var checkedCount = $('.child-check-project:checkbox:checked').length;

        childCheckBoxesControl(checkedProp, checkedCount);

        if($(this).prop('checked') == false)
        {
            $('.parent-check-project').prop('checked', false);
        }

        if($('.child-check-project:checkbox:checked').length == $('#table-projects-id tbody tr').length)
        {
            $('.parent-check-project').prop('checked', true);
        }

        if(checkedProp == true)
        {
            $("table#table-projects-id tr:has(input:checked)").each(function()
            {
                $(this).addClass('rowHighlight2');
            });
        }
        else
        {
            $("table#table-projects-id tr:has(input:not(:checked))").each(function()
            {
                $(this).removeClass('rowHighlight2');
            });
        }
    });

    $('.child-check-task').click(function(){

        var checkedProp = $(this).prop('checked');
        var checkedCount = $('.child-check-task:checkbox:checked').length;

        childCheckBoxesControl(checkedProp, checkedCount);

        if($(this).prop('checked') == false)
        {
            $('.parent-check-task').prop('checked', false);
        }

        if($('.child-check-task:checkbox:checked').length == $('#table-tasks-id tbody tr').length)
        {
            $('.parent-check-task').prop('checked', true);
        }

        if(checkedProp == true)
        {
            $("table#table-tasks-id tr:has(input:checked)").each(function()
            {
                $(this).addClass('rowHighlight2');
            });
        }
        else
        {
            $("table#table-tasks-id tr:has(input:not(:checked))").each(function()
            {
                $(this).removeClass('rowHighlight2');
            });
        }

    });

    $('.child-check-file').click(function(){

        var checkedProp = $(this).prop('checked');
        var checkedCount = $('.child-check-file:checkbox:checked').length;

        childCheckBoxesControl(checkedProp, checkedCount);

        if($(this).prop('checked') == false)
        {
            $('.parent-check-file').prop('checked', false);
        }

        if($('.child-check-file:checkbox:checked').length == $('#table-files-id tbody tr').length)
        {
            $('.parent-check-file').prop('checked', true);
        }

        if(checkedProp == true)
        {
            $("table#table-files-id tr:has(input:checked)").each(function()
            {
                $(this).addClass('rowHighlight2');
            });
        }
        else
        {
            $("table#table-files-id tr:has(input:not(:checked))").each(function()
            {
                $(this).removeClass('rowHighlight2');
            });
        }

    });

    $('.child-check-user').click(function(){

        var checkedProp = $(this).prop('checked');
        var checkedCount = $('.child-check-user:checkbox:checked').length;

        childCheckBoxesControl(checkedProp, checkedCount);

        if($(this).prop('checked') == false)
        {
            $('.parent-check-user').prop('checked', false);
        }

        if($('.child-check-user:checkbox:checked').length == $('#table-users-id tbody tr').length)
        {
            $('.parent-check-user').prop('checked', true);
        }

        if(checkedProp == true)
        {
            $("table#table-users-id tr:has(input:checked)").each(function()
            {
                $(this).addClass('rowHighlight2');
            });
        }
        else
        {
            $("table#table-users-id tr:has(input:not(:checked))").each(function()
            {
                $(this).removeClass('rowHighlight2');
            });
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
function generateSearchedTasksTable(data)
{
    $('#table-tasks-id tbody').html("");

    for(var i in data)
    {
        var output = '<tr>';
        output += '<td>';
        output += '<input type="checkbox" value="None" class="css-checkbox lrg child-check-task" id="task-table-checkbox' + i + '" name="new-style-checkbox" />';
        output += '<label class="css-label lite-gray-check" for="task-table-checkbox' + i + '"></label>';
        output += '</td>';
        output += '<td>'+ data[i].name +'</td>';
        output += '<td>'+ data[i].status +' </td>';
        output += '<td>'+ data[i].department +' </td>';
        output += '<td>'+ data[i].endDate +'</td>';
        output += '<td>'+ data[i].startDate +'</td>';
        output += '</tr>';

        $('#table-tasks-id tbody').append(output);

        if(i == 9)
        {
            return false;
        }
    }

}
function generateSearchedFilesTable(data)
{
    $('#table-files-id tbody').html("");

    for(var i in data)
    {
        var output = '<tr>';
        output += '<td>';
        output += '<input type="checkbox" value="None" class="css-checkbox lrg child-check-file" id="file-table-checkbox' + i + '" name="new-style-checkbox" />';
        output += '<label class="css-label lite-gray-check" for="file-table-checkbox' + i + '"></label>';
        output += '</td>';
        output += '<td>'+ data[i].name +'</td>';
        output += '<td>'+ data[i].type +' </td>';
        output += '<td>'+ data[i].size +' </td>';
        output += '<td>'+ data[i].dateCreated +'</td>';
        output += '<td>'+ data[i].owner +'</td>';
        output += '</tr>';

        $('#table-files-id tbody').append(output);

        if(i == 9)
        {
            return false;
        }
    }

}
function generateSearchedUsersTable(data)
{
    $('#table-users-id tbody').html("");

    for(var i in data)
    {
        var output = '<tr>';
        output += '<td>';
        output += '<input type="checkbox" value="None" class="css-checkbox lrg child-check-users" id="users-table-checkbox' + i + '" name="new-style-checkbox" />';
        output += '<label class="css-label lite-gray-check" for="users-table-checkbox' + i + '"></label>';
        output += '</td>';
        output += '<td>'+ data[i].name +'</td>';
        output += '<td>'+ data[i].department +' </td>';
        output += '<td>'+ data[i].designation +'</td>';
        output += '<td>' + data[i].role + '</td>';
        output += '</tr>';

        $('#table-users-id tbody').append(output);

        if(i == 9)
        {
            return false;
        }
    }

}


function makeProjectsTable()
{
    $.getJSON('projects.json', function(data) {
        $('#table-projects-id tbody').html("");
        $.each(data, function(key, val) {

            var output = '<tr>';
            output += '<td>';
            output += '<input type="checkbox" value="None" class="css-checkbox lrg child-check-project" id="project-table-checkbox' + key + '" name="new-style-checkbox" />';
            output += '<label class="css-label lite-gray-check" for="project-table-checkbox' + key + '"></label>';
            output += '</td>';
            output += '<td id="test-timing">'+ val.name +'</td>';
            output += '<td>'+ val.status +' </td>';
            output += '<td>'+ val.department +' </td>';
            output += '<td>'+ val.endDate +'</td>';
            output += '<td>'+ val.startDate +'</td>';
            output += '<td>' + val.budget + '</td>';
            output += '</tr>';

            $('#table-projects-id tbody').append(output);

            if(key == 9)
            {
                return false;
            }
        });
    }); //get JSON
}

function makeTasksTable()
{
    $.getJSON('tasks.json', function(data) {
        $('#table-tasks-id tbody').html("");
        $.each(data, function(key, val) {

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
//            output += '<td>' + val.leader + '</td>';
            output += '</tr>';

            $('#table-tasks-id tbody').append(output);

            if(key == 9)
            {
                return false;
            }
        });
    }); //get JSON
}

function makeFilesTable()
{
    $.getJSON('files.json', function(data) {
        $('#table-files-id tbody').html("");
        $.each(data, function(key, val) {

            var output = '<tr>';
            output += '<td>';
            output += '<input type="checkbox" value="None" class="css-checkbox lrg child-check-file" id="file-table-checkbox' + key + '" name="new-style-checkbox" />';
            output += '<label class="css-label lite-gray-check" for="file-table-checkbox' + key + '"></label>';
            output += '</td>';
            output += '<td>'+ val.name +'</td>';
            output += '<td>'+ val.type +' </td>';
            output += '<td>'+ val.size +' </td>';
            output += '<td>'+ val.dateCreated +'</td>';
            output += '<td>' + val.owner + '</td>';
            output += '</tr>';

            $('#table-files-id tbody').append(output);

            if(key == 9)
            {
                return false;
            }
        });
    }); //get JSON
}

function makeUsersTable()
{
    $.getJSON('users.json', function(data) {
        $('#table-users-id tbody').html("");
        $.each(data, function(key, val) {

            var output = '<tr>';
            output += '<td>';
            output += '<input type="checkbox" value="None" class="css-checkbox lrg child-check-user" id="user-table-checkbox' + key + '" name="new-style-checkbox" />';
            output += '<label class="css-label lite-gray-check" for="user-table-checkbox' + key + '"></label>';
            output += '</td>';
            output += '<td>'+ val.name +'</td>';
//            output += '<td>'+ val.department +' </td>';
            output += '<td>'+ val.department +'</td>';
            output += '<td>'+ val.designation +'</td>';
            output += '<td>'+ val.role +'</td>';
            output += '</tr>';

            $('#table-users-id tbody').append(output);

            if(key == 9)
            {
                return false;
            }
        });
    }); //get JSON
}

function setShowingRecNo(dataFile, tabName)
{
    var tabNameCapital = tabName.charAt(0).toUpperCase() + tabName.slice(1);

    var from = "#" + tabName + "CurrentSetFrom";
    var to = "#" + tabName + "CurrentSetTo";
    var of = "#" + 'totalRecords' + tabNameCapital;
    var nextPage = "#" + 'nextPage' + tabNameCapital;
    var previousPage = "#" + 'previousPage' + tabNameCapital;

    $.getJSON(dataFile, function(data)
    {
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
    });
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

        $.getJSON(fileName, function(data) {

            if(searchFieldValue)
            {
                data = globalProjectSearchResultData;
            }

            switch(currentActiveTab)
            {
                case 'Projects':
                    $.each(data, function(key, val)
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
//                            output += '<td>' + val.leader + '</td>';
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
                            output += '<td>'+ val.role +'</td>';
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
        }); //get JSON
    }

//    setTimeout(function () {
//        initializeClickEvents();
//    }, 500);

    delayedInitialization();

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

        $.getJSON(fileName, function(data) {

            if(searchFieldValue)
            {
                data = globalProjectSearchResultData;
            }

            switch(currentActiveTab)
            {
                case 'Projects':
                    $.each(data, function(key, val)
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
//                            output += '<td>' + val.leader + '</td>';
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
                            output += '<td>'+ val.role +'</td>';
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

        }); //get JSON
    }

//    setTimeout(function () {
//        initializeClickEvents();
//    }, 500);

    delayedInitialization();
}

function delayedInitialization()
{
    setTimeout(function () {
        initializeClickEvents();
    }, 300);
}