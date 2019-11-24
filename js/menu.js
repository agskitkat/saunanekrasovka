$(function() {
    $("#js-event-open-menu").click(function() {
        $('body').css({"overflow":"hidden"});
        $('nav.menu').addClass('active');
    });

    $("#js-event-close-menu").click(function() {
        $('body').css({"overflow":"visible"});
        $('nav.menu').removeClass('active');
    });
});