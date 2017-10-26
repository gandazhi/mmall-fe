var _mm = require('util/mm.js');

var _product = {
    searchProductList: function (listParam, resolve, reject) {
        _mm.request({
            data: listParam,
            url: _mm.getServerUrl('/product/search_list.do'),
            success: resolve,
            error: reject
        });
    },
};

module.exports = _product;