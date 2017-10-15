'use strict';
var Hogan = require('hogan.js');

var conf = {
    serverHost: '',
}

var _mm = {
    request: function (param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                // 请求成功
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 没有登录状态，需要强制登录
                else if (10 === res.status) {
                    _this.doLogin();
                }
                // 请求数据错误
                else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },

    //统一登录处理
    doLogin: function () {
        window.location.href = './user-login.html?redirect=' + encodeURI(window.location.href);
    },

    //获取服务器地址
    getServerUrl: function (path) {
        return conf.serverHost + path;
    },

    //获取url参数
    getUrlParam: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },

    //渲染html文件
    renderHtml: function (htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;

    },

    //成功提示
    successTips: function (msg) {
        alert(msg || '操作成功');
    },

    //错误提示
    errorTips: function (msg) {
        alert(msg || '哪里不对了~~');
    },

    //验证字段，支持是否为空，是否为手机号，是否为邮箱
    validate: function (value, type) {
        var value = $.trim(value);
        //字段非空判断
        if (type === 'require') {
            return !!value;//转化为布尔类型值
        } else if (type === 'phone') {
            return /^1\d{10}$/.test(value);
        } else if (type === 'email') {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    goHome: function () {
        window.location.href = './index.html';
    }

};

module.exports = _mm;