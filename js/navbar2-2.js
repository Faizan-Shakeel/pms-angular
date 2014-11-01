/**
 * Created by faizankhan on 11/30/13.
 */

$('#create-record').hide();

$(document).ready(function() {

//    $('#create-record').hide();
    $('#expand-tooltip').tooltip();
    $('#contract-tooltip').tooltip();

    $('#create-project-dropdown-menu').click(function(e){
        $('.project-status-visibility-control').css('visibility','hidden');
        $('#new-project-modal-form').modal({
            show    : true,
            backdrop: false
        });
        e.stopPropagation();
    });
    $('#create-task-dropdown-menu').click(function(e){
        $('#new-task-modal-form').modal({
            show    : true,
            backdrop: false
        });
        e.stopPropagation();
    });
    $('#create-file-dropdown-menu').click(function(e){
        $('#new-file-modal-form').modal({
            show    : true,
            backdrop: false
        });
        e.stopPropagation();
    });
    $('#create-user-dropdown-menu').click(function(e){
        $('#user-project').css('visibility','hidden');
        $('#new-user-modal-form').modal({
            show    : true,
            backdrop: false
        });
        e.stopPropagation();
    });


    $('#expand-tooltip').click(function(e){

        $('#expand-tooltip').hide();
        $('#contract-tooltip').show();

        if(($('#accordion').is(':visible')) && ($('#chatting-list-fixed').is(':visible')))
        {
            $('#menu-opener').click();
            $('#chatting-list-opener').click();
        }

        else if(($('#accordion').is(':hidden')) && ($('#chatting-list-fixed').is(':visible')))
        {
            $('#chatting-list-opener').click();
        }

        else if(($('#accordion').is(':visible')) && ($('#chatting-list-fixed').is(':hidden')))
        {
            $('#menu-opener').click();
        }

        e.stopPropagation();
    });

    $('#contract-tooltip').click(function(e){

        $('#contract-tooltip').hide();
        $('#expand-tooltip').show();

        if(($('#accordion').is(':hidden')) && ($('#chatting-list-fixed').is(':hidden')))
        {
            $('#menu-opener').click();
            $('#chatting-list-opener').click();
        }

        else if(($('#accordion').is(':visible')) && ($('#chatting-list-fixed').is(':hidden')))
        {
            $('#chatting-list-opener').click();
        }

        else if(($('#accordion').is(':hidden')) && ($('#chatting-list-fixed').is(':visible')))
        {
            $('#menu-opener').click();
        }

        e.stopPropagation();
    });

});
