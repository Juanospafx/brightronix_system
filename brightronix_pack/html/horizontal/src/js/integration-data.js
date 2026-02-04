//************************* UPDATED FILE *************************//

// src/js/integration-data.js

// 1. Core Imports
import $ from 'jquery';
// 2. Owl Carousel Import
import 'owl.carousel';


"use strict";

$(function () {

    $("#owl_demo_1").owlCarousel({
        items: 1,
        dots: false,
        URLhashListener: true,
        startPosition: 'URLHash'
    });
    $(document).on("click", ".thumb-wrap a", function (e) {
        $('.thumb-wrap a').removeClass('active-thumb');
        $(this).addClass('active-thumb');
        return;
    });
    $('.product-detail-slider .owl-carousel .item').find('img').each(function (index) {
        var src = $(this).attr('src');
        $('.product-detail-slider .thumb-wrap > a').eq(index).css('background-image', 'url(' + src + ')');
    });
});