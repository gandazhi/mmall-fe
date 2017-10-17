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
        $('#submit-username').click(function () {
            _this.submitUsername();
        });
        //判断是不是按的回车键
        $('.user-content').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.submitUsername();
            }
        });

        $('#submit-answer').click(function () {
            _this.submitAnswer();
        });
        $('.answer-content').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.submitAnswer();
            }
        });

        $('#submit-reset').click(function () {
            _this.submitReset();
        });
        $('.reset-content').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.submitReset();
            }
        });
    },
    //输入用户名，获取重置密码问题
    submitUsername: function () {
        window.username = $('#username').val().trim();
        var formData = {
            username: username,
        }
        var validateResult = this.fromValidate(formData, 'username');
        if (!validateResult.status) {
            formError.show(validateResult.msg);
            return;
        }
        _user.getForgetQuestion(formData, function (res) {
            formError.hide();
            $('#username-step').hide();
            $('#question-step').show();
            window.question = res;
            $('#question').val(res);
        }, function (errMsg) {
            formError.show(errMsg);
        });
    },
    //验证重置密码问题，获取token
    submitAnswer: function () {
        formError.hide();
        window.answer = $('#answer').val().trim();
        var formData = {
            username: username,
            question: question,
            answer: answer
        }
        var validateResult = this.fromValidate(formData, 'answer');
        if (!validateResult.status){
            formError.show(validateResult.msg);
            return;
        }
        _user.checkForgetQuestion(formData, function (res) {
            window.token = res;
            $('#question-step').hide();
            $('#password-step').show();
        },function (errMsg) {
            formError.show(errMsg);
        });
    },
    //重置密码
    submitReset: function () {
        formError.hide();
        var newPassword = $('#password').val().trim();
        var passwordConfirm = $('#password-confirm').val().trim();
        var formData = {
            username: username,
            newPassword: newPassword,
            passwordConfirm: passwordConfirm,
            forgetToken: token
        }
        var validateResult = this.fromValidate(formData, 'password');
        if (!validateResult.status){
            formError.show(validateResult.msg);
            return;
        }
        _user.resetPasswordQuestion(formData, function (res) {
            formError.hide();
            window.location.href = _mm.getUrlParam('redirect') || './result.html?type=resetPassword';
        }, function (errMsg) {
            formError.show(errMsg);
        })

    },
    fromValidate: function (formData, type) {
        var result = {
            status: false,
            msg: ''
        };
        if (type === 'username') {
            if (!_mm.validate(formData.username, 'not null')) {
                result.msg = '用户名不能为空';
                return result;
            }
        }else if (type === 'answer'){
            if (!_mm.validate(formData.answer, "not null")){
                result.msg = '密码重置问题答案不能为空';
                return result;
            }
        }else if (type === 'password'){
            if (!_mm.validate(formData.newPassword, "not null")){
                result.msg = '新密码不能为空';
                return result;
            }
            if (formData.newPassword.length < 6){
                result.msg = '新密码长度不能小于6';
                return result;
            }
            if (formData.newPassword != formData.passwordConfirm){
                result.msg = '两次密码输入不一致';
                return result;
            }
        }

        result.status = true;
        result.msg = '验证成功';
        return result;
    }
};

$(function () {
    page.init();
});
