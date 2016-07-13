'use strict'
import actionSheet from '../components/actionsheet/actionsheet.vue'

new Vue({
    el: 'body',
    components: {
        'Hello': actionSheet
    },
    data:{
        phone: '',
        code: ''
    },
    methods: {
        sendMsg(){
            /*AV.Cloud.requestSmsCode({
                mobilePhoneNumber: this.phone,
                name: '卡车',
                op: '手机验证',
                ttl: 10
            }).then(function(){
                console.log('success')
            }, function(err){
                console.log(err)
            });*/
        },
        validateCode(){
            AV.Cloud.verifySmsCode(this.code, this.phone).then(function(a){
                console.log('success');
                console.log(a);
            }, function(err){
                console.log(err);
            });
        }
    }
})