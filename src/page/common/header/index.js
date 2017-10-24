require('./index.css');

var _mm = require('util/mm.js');

//通用页面头部
var header = {
    init: function () {
        this.binEvent();
        this.onLoad();
    },
    binEvent: function () {
        var _this = this;
        //点击搜索，监听事件
        $('#search-btn').click(function () {
            _this.searchSubmit();
        });
        //输入文字，回车监听
        $('#search-input').keyup(function (e) {
            //13是回车键盘
            if (e.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    onLoad: function () {
        var keywords = _mm.getUrlParam('keywords');
        if (keywords) {
            $('#search-input').val(keywords);
        }
    },
    //搜索的提交
    searchSubmit: function () {
        var keywords = $.trim($('#search-input').val());
        if (keywords) {
            window.location.href = './list.html?keywords=' + keywords;
        } else {
            _mm.goHome();
        }
    }
};

header.init();