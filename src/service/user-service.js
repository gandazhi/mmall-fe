var _mm = require('util/mm.js');

var _user = {
    login: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/login.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    checkUsername: function (username, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/check_valid.do'),
            data: {
                str: username,
                type: 'username'
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    checkEmail: function (email, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/check_valid.do'),
            data: {
                str: email,
                type: 'email'
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    checkPhone: function (phone, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/check_valid.do'),
            data: {
                str: phone,
                type: 'phone'
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    register: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/register.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    getForgetQuestion: function (username, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/forget_get_question.do'),
            data: username,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    checkForgetQuestion: function (questionInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/for_get_checkAnswer.do'),
            data: questionInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    resetPasswordQuestion: function (passwordInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/forget_reset_password.do'),
            data: passwordInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    getUserInfo: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    updateUserInfo: function (updateInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/update_information.do'),
            data: updateInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
};
module.exports = _user;