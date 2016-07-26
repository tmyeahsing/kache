'use strict'
import uploader from '../components/uploader/uploader.vue'
import phoneBinder from '../components/phone-binder/phone-binder.vue'

Vue.transition('zoom', {
    enterClass: 'zoomIn',
    leaveClass: 'zoomOut'
});

new Vue({
    el: 'body',
    components: {
        uploader: uploader,
        phoneBinder: phoneBinder
    },
    data: {
        type: 0,
        typeMap: {
            0: '开不动，轮胎坏了',
            1: '开不动，不知何故'
        },
        uploadMaxLength: 4,
        isVerifyContainerShown: false,
        phone: '',
        code: '',
        console: ''
    },
    methods: {
        selectType: function(type){
            this.type = type;
        },
        sign(){
            var self = this;
            ToastHandler.showLoading('确认报修信息...');
            this.getUserInfo().then(function(user){
                ToastHandler.hideLoading();
                self._userId = user.objectId;
                if(user.myMobilePhoneNumber){
                    self.doSign();
                }else{
                    self.showVerifyContainer();
                }
            }).catch(function(err){
                ToastHandler.hideLoading();
                self.console = err.responseText;
            })
        },
        doSign(){
            var self = this;
            var images = this.$refs.uploader.uploadFiles;
            if (images.length) {
                var formData = new FormData();
                ToastHandler.showLoading('发送照片...');
                images.forEach(function (ele, i) {
                    formData.append('images[' + i + ']', ele.file);
                });
                $.promiseAjax({
                    url: '/api/upload',
                    type: 'post',
                    data: formData,
                    processData: false,
                    contentType: false
                }).then(function(data){
                    ToastHandler.hideLoading();
                    submit(data);
                }).catch(function(err){
                    ToastHandler.hideLoading();
                    self.console = err.responseText;
                });
            } else {
                submit();
            }

            function submit(images) {
                var params = {
                    desc: self.typeMap[self.type],
                    type: 1,
                    status: 0
                };
                ToastHandler.showLoading('提交报修信息...');
                if (images) {
                    params.images = images.data.map(function (ele, i) {
                        return ele.fileUrl;
                    });
                    params.thumbnails = images.data.map(function (ele, i) {
                        return ele.filethumbnailUrl;
                    });
                }
                $.promiseAjax({
                    url: '/api/order',
                    type: 'POST',
                    data: params
                }).then(function(data){
                    ToastHandler.hideLoading();
                    if (data.success) {
                        ToastHandler.showToast('提交成功', function(){
                            window.location.href = './order_list.html';
                        })
                    }
                }).catch(function(err){
                    ToastHandler.hideLoading();
                    self.console = err.responseText;
                });
            }
        },
        getUserInfo(){
            return $.grantedAjax({
                url: 'https://api.leancloud.cn/1.1/users/me'
            });
        },
        showVerifyContainer(){
            this.isVerifyContainerShown = true;
        },
        hideVerifyContainer(){
            this.isVerifyContainerShown = false;
        },
        toggleVerifyContainer(){
            this.isVerifyContainerShown = !this.isVerifyContainerShown;
        },
        sendMsg(){
            var self = this;
            ToastHandler.showLoading('发送验证码...');
            $.grantedAjax({
                url: 'https://api.leancloud.cn/1.1/requestSmsCode',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    mobilePhoneNumber: self.phone
                })
            }).then(function(data){
                ToastHandler.hideLoading();
                ToastHandler.showToast('验证码已发送')
                //倒计时
            }).catch(function(err){
                ToastHandler.hideLoading();
                self.console = err.responseText;
            });
        },
        validateCode(){
            var self = this;
            ToastHandler.showLoading('验证中...');
            $.grantedAjax({
                url: 'https://api.leancloud.cn/1.1/verifySmsCode/'+ self.code +'?mobilePhoneNumber=' + self.phone,
                type: 'post',
                contentType: 'application/json'
            }).then(function(){
                return self.modifyUserMobile();
            }).then(function(){
                ToastHandler.hideLoading();
                ToastHandler.showToast('绑定成功', function(){
                    self.hideVerifyContainer();
                    self.doSign();
                });
            }).catch(function(err){
                ToastHandler.hideLoading();
                self.console = err.responseText;
            });
        },
        modifyUserMobile(){
            var self = this;
            ToastHandler.showLoading('绑定中...')
            return $.grantedAjax({
                url: 'https://api.leancloud.cn/1.1/users/' + self._userId,
                type: 'put',
                contentType: 'application/json',
                data: JSON.stringify({
                    myMobilePhoneNumber: self.phone
                })
            });
        }
    }
})



