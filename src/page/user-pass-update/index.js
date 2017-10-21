require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');

var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var htmlTemplate = require('./index.string');

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
        this.onLoad();
        this.updatePassword();
    },
    onLoad: function () {
        _user.getUserInfo(function (res) {
            var html = _mm.renderHtml(htmlTemplate, res);
            $('.panel-body').html(html);
        }, function (errMsg) {
            _mm.errorTips(errMsg);
        });
        navSide.init({
            name: 'user-pass-update',
        });
    },
    updatePassword: function () {
        var _this = this;
        $('.panel-body').on('click', '#submit-btn', function () {
            _this.update();
        });
        $('.panel-body').on('keyup', '#confirmPassword', function (e) {
            if (e.keyCode === 13) {
                _this.update();
            }
        });
    },
    validate: function (data) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_mm.validate(data.oldPassword, 'not null')) {
            result.msg = '旧密码不能为空';
            return result;
        }
        if (!_mm.validate(data.newPassword, 'not null')) {
            result.msg = '新密码不能为空';
            return result;
        }
        if (data.newPassword.length < 6) {
            result.msg = '新密码长度不能小于6位';
            return result;
        }
        if (data.newPassword != data.confirmPassword) {
            result.msg = '两次输入密码不一致';
            return result;
        }
        result.status = true;
        return result;
    },
    update: function () {
        var _this = this;
        var updateData = {
            oldPassword: $('#oldPassword').val().trim(),
            newPassword: $('#newPassword').val().trim(),
            confirmPassword: $('#confirmPassword').val().trim()
        };
        var validateResult = _this.validate(updateData);
        if (!validateResult.status) {
            formError.show(validateResult.msg);
        } else {
            formError.hide();
            _user.updatePassword(updateData, function (res) {
                _user.logout(function (res) {
                    window.location.href = './user-login.html';
                }, function (errMsg) {
                    formError.show(errMsg);
                });
            }, function (errMsg) {
                formError.show(errMsg);
            });
        }
    }
};


$(function () {
    page.init();
});