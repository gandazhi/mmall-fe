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

        //通过ajax掉接口，验证这些字段的合法性
        $('#username').blur(function () {
            var username = $.trim($('#username').val());
            //如果username为空，则不触发验证username合法这个事件
            if (!_mm.validate(username, 'not null')) {
                return;
            }
            _user.checkUsername(username, function (res) {
                formError.hide();
            }, function (errMsg) {
                formError.show(errMsg);
            });
        });
        $('#email').blur(function () {
            var email = $('#email').val().trim();
            if (!_mm.validate(email, 'not null')) {
                return null;
            }
            _user.checkEmail(email, function (res) {
                formError.hide();
            }, function (errMsg) {
                formError.show(errMsg);
            });
        });
        $('#phone').blur(function () {
            var phone = $('#phone').val().trim();
            if (!_mm.validate(phone, 'not null')) {
                return;
            }
            _user.checkPhone(phone, function (res) {
                formError.hide();
            }, function (errMsg) {
                formError.show(errMsg);
            });
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
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#passwordConfirm').val()),
            email: $.trim($('#email').val()),
            phone: $.trim($('#phone').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val())
        };
        var validateResult = this.fromValidate(formData);
        if (validateResult.status) {
            //表单验证成功，调用注册接口
            _user.register(formData, function (res) {
                window.location.href = _mm.getUrlParam('redirect') || './result.html?type=register';
            }, function (errMsg) {
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
        if (_mm.validate(formData.username, "chinese")){
            result.msg = "用户名不合法";
            return result;
        }
        if (!_mm.validate(formData.password, "not null")) {
            result.msg = '密码不能为空';
            return result;
        }
        if (formData.password.length < 6) {
            result.msg = '密码长度不能小于6位';
            return result;
        }
        if (formData.password != formData.passwordConfirm) {
            result.msg = '两次输入密码不一致';
            return result;
        }
        if (!_mm.validate(formData.email, "not null")) {
            result.msg = '邮箱不能为空';
            return result
        }
        if (!_mm.validate(formData.phone, "not null")) {
            result.msg = '手机号不能为空';
            return result;
        }
        if (!_mm.validate(formData.phone, 'phone')) {
            result.msg = '手机号不合法';
            return result;
        }
        if (!_mm.validate(formData.question, "not null")) {
            result.msg = '修改密码提示问题不能为空';
            return result;
        }
        if (!_mm.validate(formData.answer, "not null")) {
            result.msg = '修改密码提示问题答案不能为空';
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
