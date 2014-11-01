/**
 * Created by faizankhan on 11/30/13.
 */

$(document).ready(function() {



    $(".container-full-width").on("click", "#signed-in-user-id", function() {
        alert("aslnoawdw");
    });


//    $('#signed-in-user-id').click(function(){
//        alert("aslnoawdw");
//    });


    $(document).on("click", "#change-password-button", function(){

//    $('#change-password-button').click(function(){

        $(this).hide();
        $('#user-new-password-save-button').show('slow');
        $('#user-account-form').show('slow');
        $('#change-password-cancel').text('Cancel');

    });

    $('#clickToCatch').click(function(){
        $('#testClickImageUpload').click();
    });
    $('#user-profile-pic-in-modal').click(function(){
        $('#testClickImageUpload').click();
    });

    $(document).on("click", "#user-profile", function(){
//    $('#user-profile').click(function(){
        getUserProfile();
    });

    $(document).on("click", "#user-account", function(){
//    $('#user-account').click(function(){

        $('#user-account-form').hide();
        $('#user-new-password-save-button').hide();
        $('#change-password-button').show();
        $('#change-password-cancel').text('Close');

        $('#user-account-modal-form').modal({
            show    : true,
            backdrop: false
        });

//        getUserAccount();
    });

    $('#notifications').tooltip({
        placement: 'bottom'
    });
    $('#users-online').tooltip({
        placement: 'bottom'
    });
    jQuery('.popbox').popbox();

    $("#test-drop-down li a").click(function(e){

        var selText = $(this).text();
        $(this).parents('.input-group-btn').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');

        switch (selText)
        {
            case 'Projects':
                $('#projects-tab').tab('show');
                break;
            case 'Tasks':
                $('#tasks-tab').tab('show');
                break;
            case 'Files':
                $('#files-tab').tab('show');
                break;
            case 'Users':
                $('#users-tab').tab('show');
                break;
            case 'All':
                break;
        }
    });
});

function getUserProfile()
{
    $('#user-profile-modal-form').modal({
        show    : true,
        backdrop: false
    });
}

function getUserAccount()
{
//    $('#user-account-form').hide();
//    $('#user-new-password-save-button').hide();
//    $('#change-password-button').show();
//
//    $('#user-account-modal-form').modal({
//        show    : true,
//        backdrop: false
//    });
}
