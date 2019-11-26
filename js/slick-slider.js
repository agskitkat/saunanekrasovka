$(function() {
    $('.slick-slider-block').slick({
        arrows: true,
        lazyLoad: 'ondemand',
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
                    dots: true,
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