var _mm = require('util/mm.js');

var _index = {
    getProductRecommend: function (listParam, resolve, reject) {
        _mm.request({
            data: listParam,
            url: _mm.getServerUrl('/index/getProductRecommend.do'),
            success: resolve,
            error: reject
        });
    },
};

module.exports = _index;