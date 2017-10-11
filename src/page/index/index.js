require('./index.css');
require('../module.js');
console.log('this is index');
var _mm = require('util/mm');


_mm.request({
    url: '/product/get_list.do',
    success: function (res) {
        console.log(res);
    },
    error: function (err) {
        console.log(err);
    }
});

console.log(_mm.getUrlParam("test"));

var html = '<div>{{data}}</div>';
var data = {
    data: 'gandazhi',
};
console.log(_mm.renderHtml(html,data));

var email = 'gandazhi@gmail.com';
console.log(_mm.validate(email, 'email'));

