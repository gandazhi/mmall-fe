require('page/common/nav/index.js');
require('page/common/header/index.js');
require('page/index/index');
require('./index.css');

var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _product = require('service/product-service');
var htmlTemplate = require('./index.string');

var page = {
    data: {
        listParam: {
            keywords: _mm.getUrlParam('keywords') || '',
            orderBy: _mm.getUrlParam('orderBy') || 'sales_volume-desc',
            pageNum: _mm.getUrlParam('pageNum') || 1,
            pageSize: _mm.getUrlParam('pageSize') || 20,
        }
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function () {

    },
    onLoad: function () {
        this.loadList();
    },
    loadList: function () {
        var listParam = this.data.listParam;
        _product.searchProductList(listParam, function (res) {
            var html = _mm.renderHtml(htmlTemplate, {
                list: res.list
            });
            $('.p-list-con').html(html);
        }, function (errMsg) {
            _mm.errorTips(errMsg);
        });
    },
};

$(function () {
    page.init();
});