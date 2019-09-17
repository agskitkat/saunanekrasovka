$(function(){

    $('.slick-slider-block').slick({
        arrows: true,
        lazyLoad: 'ondemand',

        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    infinite: true,
                    dots: false,
                    arrows: false
                }
            }, {
                breakpoint: 1,
                settings: {
                    infinite: true,
                    dots: false,
                    arrows: false
                }
            },
        ]
    });

    $('.slick-slider-block-accessory').slick({
        centerMode: true,
        variableWidth: true,
        dots: false,
        lazyLoad: 'ondemand',
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    //slidesToShow: 3,
                    //slidesToScroll: 3,
                    arrows: false
                }
            }
        ]
    });

});