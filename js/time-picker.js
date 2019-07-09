$(function() {
    $(".time-picker").each(function(key, picker) {
        var now = new Date();
        var hour = now.getHours() ;
        var set_hours = 24 ;
        var arHours = [];

        var height = $(picker).find(".time-picker__roll").offsetHeight;

        for(var i = 0; i < set_hours; i++) {
            var c = hour + i;
            if(c > set_hours - 1) {
                arHours.push( { time: (c - set_hours), className: ""});
            } else {
                arHours.push({ time:c, className: ""});
            }
            var current = arHours[arHours.length-1];
            $(picker).find(".time-picker__roll-block")
                .append("<div class='time-picker__hour "+current.className+"'>"+current.time+":00</div>");
        }

        $(picker).find(".time-picker__roll .time-picker__hour").on("click", function(element) {
            var margin = parseInt($(picker).find(".time-picker__roll .time-picker__roll-block").css("margin-top"));
            console.log(margin, $(element).addClass("time-picker__hour_active") );

        });
    });
});