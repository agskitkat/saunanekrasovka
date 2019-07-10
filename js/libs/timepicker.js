(function( $ ){
    $.fn.timepicker = function() {

        this.each(function(key, picker) {
            var now = new Date();
            var hour = now.getHours() ;
            var set_hours = 24 ;
            var arHours = [];

            var height = $(picker).find(".time-picker__roll").offsetHeight;

            for(var i = 0; i < set_hours; i++) {
                var c = hour + i;
                if(c > set_hours - 1) {
                    arHours.push( { time: (c - set_hours), className: "tomorrow"});
                } else {
                    arHours.push({ time:c, className: "today"});
                }
                var current = arHours[arHours.length-1];
                $(picker).find(".time-picker__roll-wrap select")
                    .append("<option class='time-picker__hour "+current.className+"'>"+current.time+":00</option>");
            }
        });

    };
})( jQuery );