$(function(){
    console.log("Slick")
    $('.slick-slider-block').slick({
        arrows: true,
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

    $('.slick-slider-block-accessory').slick({
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
        dots: false,
        arrows: false
    });

});