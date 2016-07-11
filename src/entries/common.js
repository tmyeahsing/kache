'use strict'
require('css/common.scss');

window.Vue = require('vue');
window.AV = require('js/av.js');

AV.init({
    appId: 'DCT46JPe0tVDCWnaBaFWjqug-gzGzoHsz',
    appKey: '0jOY9oLEJDXNRTlzFyALSg1X'
});

Vue.filter('date', function(value, type){
    var _date = new Date(value);
    var _pDate = [];
    var _pTime = [];
    _pDate.push(_date.getFullYear());
    _pDate.push(_date.getMonth() + 1);
    _pDate.push(_date.getDate());
    _pTime.push(_date.getHours());
    _pTime.push(_date.getMinutes());
    _pTime.push(_date.getSeconds());

    return _pDate.join('-') + ' ' + _pTime.join(':');
})