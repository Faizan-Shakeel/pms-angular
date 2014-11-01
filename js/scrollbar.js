/**
 * Created by faizankhan on 11/30/13.
 */

$(function(){

    $("#chat-ul").slimScroll({
//        width: '100%',
        height: '486px',
        size: '5px',
        position: 'right',
//        color: '#FFFFFF',
        alwaysVisible: true,
        distance: '2px',
//        railVisible: true,
//        railColor: '#f0f0f0',
        wheelStep: 10,
        allowPageScroll: false
//        disableFadeOut: true
    });


    $("#accordion-notification").slimScroll({
        height: '400px',
        size: '5px',
        position: 'right',
        alwaysVisible: false,
        distance: '2px',
        wheelStep: 5,
        allowPageScroll: false
    });

    $("#accordion-history").slimScroll({
        height: '400px',
        size: '5px',
        position: 'right',
        alwaysVisible: false,
        distance: '2px',
        railVisible: true,
        railColor: '#f0f0f0',
        wheelStep: 5,
        allowPageScroll: false
    });

});

