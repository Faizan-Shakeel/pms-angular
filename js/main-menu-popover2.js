/**
 * Created by faizankhan on 11/30/13.
 */

$(document).ready(function() {

    $("#project-popover").click(function(e){

//        $('.project-status-visibility-control').css('visibility','hidden');
        $('.project-status-visibility-control').hide();
//        $('.project-status-visibility-control').hide();
//        $('#project-budget').addClass('pull-left');

        $('#new-project-modal-form').modal({
            show    : true,
            backdrop: false
        });

        e.stopPropagation();
    });

    $("#task-popover").click(function(e){

        $('#new-task-modal-form').modal({
            show    : true,
            backdrop: false
        });

        e.stopPropagation();
    });

    $("#file-popover").click(function(e){

        $('#new-file-modal-form').modal({
            show    : true,
            backdrop: false
        });

        e.stopPropagation();
    });

    $("#user-popover").click(function(e){

//        $('#user-project').css('visibility','hidden');
        $('#user-project').hide();
        $('#new-user-modal-form').modal({
            show    : true,
            backdrop: false
        });

        e.stopPropagation();
    });


    $('#new-project-active-tab').tab('show');
    $('#new-task-active-tab').tab('show');
    $('#new-file-active-tab').tab('show');
    $('#new-user-active-tab').tab('show');

    $('#info-project-active-tab-in-project').tab('show');
    $('#info-task-active-tab-in-task').tab('show');
    $('#info-file-active-tab-in-file').tab('show');
    $('#info-user-active-tab-in-user').tab('show');

    $('#new-project-modal-form').modal({
        show    : false,
        backdrop: false
    });
    $('#new-task-modal-form').modal({
        show    : false,
        backdrop: false
    });
    $('#new-file-modal-form').modal({
        show    : false,
        backdrop: false
    });
    $('#new-user-modal-form').modal({
        show    : false,
        backdrop: false
    });
    $('#confirmation-modal-form').modal({
        show    : false,
        backdrop: false
    });

    $('#getToClickRealButton').click(function(){
        $('#testClickToUpload').click();
    });

    $('#testClickToUpload').change(function(){
        $('#showFileInHere').val($(this).val().split('\\').pop());
    });

});

