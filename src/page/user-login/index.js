require('../common/nav-simple/index.js');
require('./index.css');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

var formError = {
    show: function (msg) {
        $('.error-item').show().find('.error-msg').text(msg);
    },
    hide: function () {
        $('.error-item').hide().find('.error-msg').text('');
    }
};

var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        $('#submit').click(function () {
            _this.submit();
        });
        //判断是不是按的回车键
        $('.user-content').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    submit: function () {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        };
        var validateResult = this.fromValidate(formData);
        if (validateResult.status) {
            //表单验证成功，调用登录接口
            _user.login(formData, function(res){
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            }, function(errMsg){
                formError.show(errMsg);
            });
        } else {
            //表单验证失败
            formError.show(validateResult.msg);
        }
    },
    fromValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_mm.validate(formData.username, 'not null')) {
            result.msg = '用户名不能为空';
            return result;
        }
        else if (!_mm.validate(formData.password, 'not null')) {
            result.msg = '密码不能为空';
            return result;
        }
        result.status = true;
        result.msg = '验证成功';
        return result;
    }
};

$(function () {
    page.init();
});
