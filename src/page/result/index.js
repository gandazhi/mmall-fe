console.log('this is result.js');
require('../common/nav-simple/index.js');
require('./index.css');

var _mm = require('util/mm.js');

/**
 * 通过get获取url上传的参数
 * 通过对参数的判断，进行显示对应的提示元素
 * 默认显示操作成功
 */
$(function () {
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    //将对应的元素显示出来
    $element.show();
});
