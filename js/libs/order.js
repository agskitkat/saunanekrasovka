$(function() {
    $(".time-picker").timepicker();
    $(".calendar").calendar();
    var steps = 1;
    var end_steps = 4;
    $(".js-target-next-step").click(function(){
        $(this).closest(".steps")
    });
});