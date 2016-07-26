'use strict'
require('css/common.scss');

import toast from '../components/toast/toast.vue'
import loadingToast from '../components/toast/loading-toast.vue'
window.Vue = require('vue');
window.jquery = window.$ = require('jquery');

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
    0: '待接单'
}

//补足到2位，value为string或number类型
function bitTo2(value){
    var str = '0' + value;
    return str.substr(-2, 2);
}

//location params
function getUrlParams(){
    var _ret = {};
    var _str = location.search;
    if(_str.length){
        _str = _str.replace(/^\?/, '{"').replace(/=/g, '":"').replace(/&/, '","');
        _str += '"}'
    }
    return JSON.parse(_str);
}