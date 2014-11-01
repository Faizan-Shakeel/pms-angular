/**
 * Created by faizankhan on 11/30/13.
 */

$(document).ready(function() {

    $("#project-popover").click(function(e){
        $(".project-popover-buttons").show();
        e.stopPropagation();
    });

    $("#task-popover").click(function(e){
        $(".task-popover-buttons").show();
        e.stopPropagation();
    });

    $("#file-popover").click(function(e){
        $(".file-popover-buttons").show();
        e.stopPropagation();
    });

    $("#user-popover").click(function(e){
        $(".user-popover-buttons").show();
        e.stopPropagation();
    });

    var $projectPopover = $(".project-popover-buttons");
    var $taskPopover = $(".task-popover-buttons");
    var $filePopover = $(".file-popover-buttons");
    var $userPopover = $(".user-popover-buttons");

    $('#project-popover').popover({animation:true, content:$projectPopover, html:true});
    $('#task-popover').popover({animation:true, content:$taskPopover, html:true});
    $('#file-popover').popover({animation:true, content:$filePopover, html:true});
    $('#user-popover').popover({animation:true, content:$userPopover, html:true});

    $('#new-project-active-tab').tab('show');
    $('#new-task-active-tab').tab('show');
    $('#new-file-active-tab').tab('show');
    $('#new-user-active-tab').tab('show');

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

