$(function() {
    var date_start = false;
    var date_stop  = new Date();

    $(".calendar").calendar(function(date){
        date_start = date;
    });

    $(".time-picker").timepicker();

    var steps = 1;
    var end_steps = 4;

    $(".js-target-next-step").click(function(){

        var steps_container = $(this).closest(".steps");
        steps_container.find(".step_active").removeClass("step_active");

        switch(steps) {
            case 1:

                break;
            case 2:

                break;
            case 3:

                break;
            case 4:

                break;
        }
    });

    $(".js-target-back-step").click(function(){
        if(steps === 1) {
            $(".modal.js-target-order").removeClass("active");
        }
    });

    function setStepInfo() {

    }
});