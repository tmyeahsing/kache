'use strict'
require('css/common.scss');

import toast from '../components/toast/toast.vue'
import loadingToast from '../components/toast/loading-toast.vue'
import {bitTo2} from './utils.js'

window.Vue = require('vue');
window.jquery = window.$ = require('jquery');
window.TMapKey = '5SZBZ-THVRF-KSYJR-NZ5IA-MVFSQ-TLFK2' //腾讯地图开发key

//promisefy ajax
$.extend($, {
    grantedAjax(options){
        options.beforeSend = function(xhr, setting){
            xhr.setRequestHeader('X-LC-Id', AppId);
            xhr.setRequestHeader('X-LC-Key', AppKey);
            xhr.setRequestHeader('X-LC-Session', SessionToken);
        };
        return Promise.resolve($.ajax(options));
    },
    promiseAjax(options){
        return Promise.resolve($.ajax(options));
    }
});

//vue filters
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
Vue.filter('countDown', function(value, from, gap){
    if(!value){
        return '倒计时获取中';
    }else{
        var _past = new Date(value) - new Date(from)
        var _left = parseInt(gap) - _past;
        return _left;
    }
});

//global vue components
window.ToastHandler = new Vue({
    el: '#toastContainer',
    components: {
        toast: toast,
        loadingToast: loadingToast
    },
    methods: {
        showToast(text, cb){
            this.$refs.toast.show(text, cb);
        },
        showLoading(text){
            this.$refs.loading.show(text);
        },
        hideLoading(){
            this.$refs.loading.hide();
        }
    }
})

//location params
window.UrlParams = getUrlParams();

//单据状态
window.OrderStatusMap = {
    0: '待接单',
    1: '待维修',
    2: '待确认',
    3: '待付款',
    4: '已完成'
}

//location params
function getUrlParams(){
    var _ret = {};
    var _str = location.search;
    if(_str.length){
        _str = _str.replace(/^\?/, '{"').replace(/=/g, '":"').replace(/&/, '","');
        _str += '"}'
        _ret = JSON.parse(_str)
    }
    return _ret;
}