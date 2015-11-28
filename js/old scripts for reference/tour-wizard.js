/**
 * Created by faizankhan on 11/30/13.
 */

//$(window).load(function() {
//    $('#testing-bootstrap-tour-plugin').featureTour({
//        /* Options will go here */
//    });
//});

$(window).load(function() {
//    $.removeCookie('127.0.0.1', { path: '/' });
//    var testingCookieValue = $.cookie('127.0.0.1');
//    alert(testingCookieValue);


// Instance the tour
    var tour = new Tour();
//    var tour = new Tour({
//        onEnd: function(tour) {

//            var testingCookieValue = $.cookie('userName');
//            alert(testingCookieValue);

//                $.removeCookie('127.0.0.1', { path: '/' });
//        }
//    });

// Add your steps. Not too many, you don't really want to get your users sleepy
    tour.addSteps([
        {
            element: "#menu-opener", // string (jQuery selector) - html element next to which the step popover should be shown
            title: "Main Menu", // string - title of the popover
            content: "Click To Show / Hide Main Menu", // string - content of the popover
            backdrop: true
        },
        {
            element: "#expand-tooltip",
            title: "Expand / Contract View",
            content: "Click To Expand / Contract View",
            placement: "bottom",
            backdrop: true
        },
        {
            element: "#chatting-list-opener",
            title: "Chatting List",
            content: "Click To Show / Hide Chatting List",
            placement: "left",
            backdrop: true
        },
        {
            element: "#notifications-panel",
            title: "Notifications",
            content: "Click To Show / Hide Notifications",
//            placement: "left",
            backdrop: true
        },
        {
            element: "#history-panel",
            title: "History",
            content: "Click To Show / Hide The History",
            placement: "top",
            backdrop: true
        }
    ]);


//    tour.addSteps({
//        placement:"right"
//    });

// Initialize the tour
    tour.init();

// Start the tour
    tour.start();
});
