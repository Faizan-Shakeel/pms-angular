/**
 * Created by faizankhan on 11/30/13.
 */

$(document).ready(function() {

//    var arr = ['One', 'Two', 'Three'];
//    var sel = $('#taskProject');
//    var projectSelectOption;
//
//    $(arr).each(function(key, val)
//    {
//        projectSelectOption += '<option>' + val + '</option>';
//    });
//
//    sel.html(projectSelectOption);


    $('#menu-opener').click(function(e){
        $('#accordion').toggle();

        if($('#chatting-list-fixed').is(':visible'))
        {
            $('#table-width').toggleClass('col-lg-8 col-lg-10');
            $('#table-width').toggleClass('col-md-8 col-md-10');
            $('#table-width').toggleClass('col-sm-8 col-sm-10');
//            $('#table-width').toggleClass('col-xs-8 col-xs-10');
        }
        else
        {
            $('#table-width').toggleClass('col-lg-10 col-lg-12');
            $('#table-width').toggleClass('col-md-10 col-md-12');
            $('#table-width').toggleClass('col-sm-10 col-sm-12');
//            $('#table-width').toggleClass('col-xs-10 col-xs-12');
        }

        if(($('#accordion').is(':hidden')) && ($('#chatting-list-fixed').is(':hidden')))
        {
            $('#expand-tooltip').hide();
            $('#contract-tooltip').show();
        }
        else if(($('#accordion').is(':visible')) && ($('#chatting-list-fixed').is(':visible')))
        {
            $('#expand-tooltip').show();
            $('#contract-tooltip').hide();
        }


//        previousNextButtonsMovement();

        e.stopPropagation();
    });

    $('#chatting-list-opener').click(function(e){
        $('#chatting-list-fixed').toggle();

        if($('#accordion').is(':visible'))
        {
            $('#table-width').toggleClass('col-lg-8 col-lg-10');
            $('#table-width').toggleClass('col-md-8 col-md-10');
            $('#table-width').toggleClass('col-sm-8 col-sm-10');
//            $('#table-width').toggleClass('col-xs-8 col-xs-10');
        }
        else
        {
            $('#table-width').toggleClass('col-lg-10 col-lg-12');
            $('#table-width').toggleClass('col-md-10 col-md-12');
            $('#table-width').toggleClass('col-sm-10 col-sm-12');
//            $('#table-width').toggleClass('col-xs-10 col-xs-12');
        }

        if(($('#accordion').is(':hidden')) && ($('#chatting-list-fixed').is(':hidden')))
        {
            $('#expand-tooltip').hide();
            $('#contract-tooltip').show();
        }
        else if(($('#accordion').is(':visible')) && ($('#chatting-list-fixed').is(':visible')))
        {
            $('#expand-tooltip').show();
            $('#contract-tooltip').hide();
        }

//        previousNextButtonsMovement();

        e.stopPropagation();
    });

});
