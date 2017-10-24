require('page/common/nav-simple/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
require('./index.css');
var htmlTemplte = require('./index.string');
var _mm = require('util/mm.js');

$(function() {
    page.init();
    $('.banner').unslider({
        // dots: true,
    });
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});

var page = {
    init : function () {
        var html = '';
        html = _mm.renderHtml(htmlTemplte, '');
        $('.banner-con').html(html);
    }
}


