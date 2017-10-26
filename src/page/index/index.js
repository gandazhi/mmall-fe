require('page/common/nav-simple/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
require('./index.css');
var htmlTemplate = require('./index.string');
var floorTemplate = require('./floor.string');
var _mm = require('util/mm.js');
var _index = require('service/index-service');

$(function () {
    page.init();
    $('.banner').unslider({
        // dots: true,
    });
    $('.banner-con .banner-arrow').click(function () {
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});

var page = {
    init: function () {
        var html = '';
        html = _mm.renderHtml(htmlTemplate, '');
        $('.banner-con').html(html);
        this.getProductRecommend();
    },
    getProductRecommend: function () {

        var categoryIdArray = new Array('100001', '100002');
        var floorClass = new Array('floor1','floor2')
        var data = {
            categoryId: categoryIdArray[1],
            num: _mm.getUrlParam('num') || '10'
        };
        _index.getProductRecommend(data, function (res) {
            //渲染模板
            var floorHtml = _mm.renderHtml(floorTemplate, {data: res});
            $('.floor-warp').html(floorHtml);
        }, function (errMsg) {
            _mm.errorTips(errMsg);
        });
    },
};


