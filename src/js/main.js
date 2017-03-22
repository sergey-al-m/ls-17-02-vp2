$(".maincontent").onepage_scroll({
    sectionContainer: "section",
    easing: "ease",
    animationTime: 1000,
    pagination: false,
    updateURL: false,
    beforeMove: function (index) {
        $('.fixed-menu__item').removeClass('active');
        $('.fixed-menu__link[href="' + index + '"]').closest('.fixed-menu__item').addClass('active');
    },
    afterMove: function (index) {
    },
    loop: false,
    keyboard: true,
    responsiveFallback: false,
    direction: "vertical"
});

$('.nav__link, .fixed-menu__link, a.header__menu-order, a.down-arrow')
    .on('click', function (e) {
        e.preventDefault();
        $(".maincontent").moveTo($(this).attr('href'));
    });

$(function () {
    var burgerCarousel = $('.burgers-slider').owlCarousel({
        items: 1,
        loop: true
    });
    $('.burger-slider__btn_next').on('click', function (e) {
        e.preventDefault();
        burgerCarousel.trigger('next.owl.carousel');
    });
    $('.burger-slider__btn_prev').on('click', function (e) {
        e.preventDefault();
        burgerCarousel.trigger('prev.owl.carousel');
    });
});

$(function () {
    $('.team-acco').accordion({
        active: false,
        collapsible: true,
        animate: 300
    });
});

$(function () {
    $('.menu-acco__trigger').on('click', function (e) {
        e.preventDefault();
        var item = $(this).closest('.menu-acco__item');
        if (!item.hasClass('active')) {
            $(this).closest('.menu-acco').find('.menu-acco__item').filter('.active').find('.menu-acco__content').animate({
                'width': '0px'
            }).closest('.menu-acco__item').removeClass('active');
            item.addClass('active').find('.menu-acco__content').animate({
                'width': '550px'
            });
        } else {
            item.find('.menu-acco__content').animate({
                'width': '0px'
            });
            item.removeClass('active');
        }
    });
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.menu-acco').hasClass('menu-acco')) {
            $('.menu-acco__content').animate({
                'width': '0px'
            }).closest('.menu-acco__item').removeClass('active');
        }
    });
});

$(function () {
    $('.phone-mask').inputmask('+7 (999) 999 99 99');
});

$(function () {
    $('.review__view').fancybox({
        // type: 'inline',
        closeTpl: ''
    });
    $('.full-review__close').on('click', function (e) {
        e.preventDefault();
        $.fancybox.close();
    });
});

$(function () {
    $('#order-form').on('submit', function (e) {
        e.preventDefault();
        var $this = $(this);
        $.ajax({
            type: "post",
            url: 'mail.php',
            data: $this.serialize(),
            success: function () {
            },
            error: function (xhr, ajaxOptions, thrownError) {
            }
        }).done(function (data) {
            var status = '#error';
            try {
                status = $.parseJSON(data)['status'] ? '#success' : '#error';
            } catch (e) {
            }
            $.fancybox.open(
                {
                    src: status,
                    type: 'inline',
                    opts: {
                        closeTpl: '',
                        afterClose: function () {
                            $this.trigger('reset');
                        }
                    }
                }
            );
        });
    });
    $('.status-popup__close').on('click', function (e) {
        e.preventDefault();
        $.fancybox.close();
    });
}());

$(function () {
    ymaps.ready(init);
    var myMap;
    function init(){
        myMap = new ymaps.Map("map", {
            center: [56.835049, 60.606973],
            zoom: 12,
            controls : []
        });
        var myCollection = new ymaps.GeoObjectCollection(null, {
                iconLayout: 'default#image',
                iconImageHref: 'img/decor/map-marker.svg',
                iconImageSize: [46, 57],
                iconImageOffset: [-26, -52]
            }),
            myMarkers = [
                [56.831662, 60.604570],
                [56.809446, 60.569894],
                [56.852924, 60.613496],
                [56.834108, 60.659158]
            ];
        for (var i = 0; i < myMarkers.length; i++) {
            myCollection.add(new ymaps.Placemark(myMarkers[i]));
        }
        myMap.geoObjects.add(myCollection);
        myMap.behaviors.disable('scrollZoom');
    }
});