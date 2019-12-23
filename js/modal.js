$(function(){

    // Закрыть детально для мобилы
    $(".js-target-close-modal").click( function(e){
        $('body').css({"overflow":"visible"});
        $(this).closest(".modal").removeClass("active");
    });

    // Открыть детально для мобилы
    $(".js-target-open-sauna").click( function(e){
        $('body').css({"overflow":"hidden"});
        var modal =  $(".js-target-sauna");
        $(modal).addClass("active");
        var object = JSON.parse($(this).attr('data-sauna'));
        console.log(object);

        // Set Id
        $(modal)
            .find('.js-target-open-order')
            .attr({"data-sauna-id":object.id});

        // Set in order items
        var c = $(modal).find('.item__irows');
        $(c).html("");
        $.each(object.in_order, function(k, v){
            $(c).append('<div class="item__info-key">'+v+'</div>');
        });

        // Set Name
        $(modal)
            .find('.sauna__header')
            .html('<span>'+object.name+'</span> <div class="sauna__status">'+(object.vip?"vip":"")+'</div>');

        // Set price
        $(modal)
            .find('.js-price')
            .html(object.price);

        // Set min hour order
        $(modal)
            .find('.sauna__max-guests')
            .html('мин. заказ ' + object.min_order +' часа');

        // Set over guest count price
        $(modal)
            .find('.sauna__info-more .js-user-price')
            .html( object.over_guest_price );

        // Set max guest
        $(modal)
            .find('.sauna__info-more .js-user-max-guest')
            .html(object.min_guest);

        // Set images
        var c = $(modal).find('.sauna__image');

        var s = "";
        $.each(object.images, function(k, v) {
            s +='<div class="sauna__image-bg" style="background-image: url('+v+')"></div>';
        });

        $(c).html("<div class='slick-slider-block-modal'>"+s+"</div>");

        $('.slick-slider-block-modal').slick({
            arrows: true,
            //lazyLoad: 'ondemand',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false,
                        arrows: false
                    }
                }, {
                    breakpoint: 1,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false,
                        arrows: false
                    }
                },
            ]
        });



    });

    $(".js-target-open-order").click( function(e){
        $('body').css({"overflow":"hidden"});
        $(".js-target-sauna").removeClass("active");
        $(".js-target-order").addClass("active");

        var sid = $(this).attr('data-sauna-id');
        var name = $(this).attr('data-sauna-name');

        console.log(sid, name);

        $("#current-sauna-name").val(name);
        $("#current-sauna-id").val(sid).trigger('change');

        $('.js-target-order #sauna_currnt option[value="'+sid+'"]').prop('selected', true);
    });


    $(".modal.active").click( function(e){
        $(".js-target-sauna").addClass("active");
    });
});