require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');

var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');
var editTemplate = require('./answer.string');

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

    },
    onLoad: function () {
        //初始化左侧信息
        navSide.init({
            name: 'user-center',
        });
        //加载登录用户信息
        this.loadUserInfo();
        this.editUserInfo();
    },
    loadUserInfo: function () {
        var userHtml = '';
        _user.getUserInfo(function (res) {
            window.data = res;
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function (errMsg) {
            _mm.errorTips(errMsg);
        })
    },
    //编辑个人信息
    editUserInfo: function () {
        var _this = this;
        $('.panel-body').on('click', '#edit-btn', function () {
            $(".text").attr("disabled", false);
            var editAnswerHtml = '';
            editAnswerHtml = _mm.renderHtml(editTemplate, data);
            console.info(editAnswerHtml);
            $('.user-update').html(editAnswerHtml);
            $('#edit-btn').text('确定');
            $('#edit-btn').attr('id', 'confirm-btn');
        });
        $('.panel-body').on('click', '#confirm-btn', function () {
            var updateData = {
                username: $('#username').val().trim(),
                email: $('#email').val().trim(),
                question: $('#question').val().trim(),
                answer: $('#answer').val().trim(),
                phone: $('#phone').val().trim()
            };
            console.log(updateData);
            var validateResult = _this.validate(updateData);
            if (!validateResult.status){
                formError.show(validateResult.msg);
            }

            _user.updateUserInfo(updateData,function (res) {
                formError.hide();
                alert('修改成功');
            },function (errMsg) {
                formError.show(errMsg);
            })
        });
    },
    validate: function (data) {
        var result = {
            status: false,
            msg: ""
        };
        if (_mm.validate(data.username, 'not null')) {
            result.msg = 'username不能为空';
            return result;
        }
        if (!_mm.validate(data.email, 'not null')) {
            result.msg = 'email不能为空';
            return result;
        }

        if (!_mm.validate(data.email, 'email')) {
            result.msg = 'email不合法';
            return result;
        }
        if (!_mm.validate(data.question, 'not null')) {
            result.msg = '重置密码问题不能为空';
            return result;
        }
        if (!_mm.validate(data.answer, 'not null')) {
            result.msg = '重置密码答案不能为空';
            return result;
        }
        if (!_mm.validate(data.phone, 'not null')) {
            result.msg = '手机号不能为空';
            return result;
        }
        if (!_mm.validate(data.phone, 'phone')) {
            result.msg = '手机号不合法';
            return result;
        }
        result.status = true;
        return result;
    },

};

$(function () {
    page.init();
});

