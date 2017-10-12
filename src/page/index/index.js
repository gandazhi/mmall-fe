require('./index.css');
require('../module.js');
console.log('this is index');
var _mm = require('util/mm');


var res = _mm.request({
    url: 'http://www.mmall.com/product/get_list.do?orderBy=price-asc'
});
console.log(res);

console.log(_mm.getUrlParam("test"));

var html = '<div>{{data}}</div>';
var data = {
    data: 'gandazhi',
};
console.log(_mm.renderHtml(html,data));

var email = 'gandazhi@gmail.com';
console.log(_mm.validate(email, 'email'));

