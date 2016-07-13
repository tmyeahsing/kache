'use strict'
require('css/common.scss');

window.Vue = require('vue');
window.jquery = window.$ = require('jquery');

Vue.filter('date', function(value, type){
    var _date = new Date(value);
    var _pDate = [];
    var _pTime = [];
    _pDate.push(_date.getFullYear());
    _pDate.push(bitTo2(_date.getMonth() + 1));
    _pDate.push(bitTo2(_date.getDate()));
    _pTime.push(bitTo2(_date.getHours()));
    _pTime.push(bitTo2(_date.getMinutes()));
    _pTime.push(bitTo2(_date.getSeconds()));

    return _pDate.join('-') + ' ' + _pTime.join(':');
});

//补足到2位，value为string或number类型
function bitTo2(value){
    var str = '0' + value;
    return str.substr(-2, 2);
}