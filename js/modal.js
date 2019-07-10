$(function(){
    $(".js-target-close-modal").click( function(e){
        $(this).closest(".modal").removeClass("active");
    });

    $(".js-target-open-sauna").click( function(e){
        $(".js-target-sauna").addClass("active");
    });

    $(".js-target-open-order").click( function(e){
        $(".js-target-sauna").removeClass("active");
        $(".js-target-order").addClass("active");
    });
});