$(function(){

    // Закрыть детально для мобилы
    $(".js-target-close-modal").click( function(e){
        $(this).closest(".modal").removeClass("active");
    });
    // Открыть детально для мобилы
    $(".js-target-open-sauna").click( function(e){
        $(".js-target-sauna").addClass("active");
    });



    $(".js-target-open-order").click( function(e){
        $(".js-target-sauna").removeClass("active");
        $(".js-target-order").addClass("active");
    });


    $(".modal.active").click( function(e){
        $(".js-target-sauna").addClass("active");
    });
});