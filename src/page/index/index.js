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
        // this.test();
    },
    getProductRecommend: function () {

        var categoryIdArray = new Array('100002', '100006');
        var floorClass = new Array('floor1', 'floor2')
        $.each(categoryIdArray, function (key, value) {
            var data = {
                categoryId: value,
                num: _mm.getUrlParam('num') || '10',
                key: key
            };
            _index.getProductRecommend(data, function (res) {
                var floorHtml = _mm.renderHtml(floorTemplate, {data: res});
                console.log(data);

                $('#' + floorClass[data.key]).html(floorHtml);
            },function (errMsg) {
                _mm.errorTips(errMsg);
            });
        });
        // for (var k = 0; k < categoryIdArray.length; k++) {
        //     var data = {
        //         categoryId: categoryIdArray[k],
        //         num: _mm.getUrlParam('num') || '10',
        //         k: k
        //     };
        //     console.log(data);
        //     _index.getProductRecommend(data, function (res) {
        //         //渲染模板
        //         var floorHtml = _mm.renderHtml(floorTemplate, {data: res});
        //         console.log(data);
        //
        //         $('#' + floorClass[data.k]).html(floorHtml);
        //     }, function (errMsg) {
        //         _mm.errorTips(errMsg);
        //     });
        // }
    },
    test: function () {
        var array = new Array('1', '2', '3');
        for (var i = 0; i< array.length, i++;){
            alert(11111);
            console.log(i);
            console.log(array[i]);
        }
    }
};


