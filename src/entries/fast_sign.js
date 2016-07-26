'use strict'
import Uploader from '../components/uploader/uploader.vue'

Vue.transition('zoom', {
    enterClass: 'zoomIn',
    leaveClass: 'zoomOut'
});

new Vue({
    el: 'body',
    components: {
        Uploader: Uploader
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
            this.getUserInfo().then(function(user){
                self._userId = user.objectId;
                if(user.myMobilePhoneNumber){
                    self.doSign();
                }else{
                    self.showVerifyContainer();
                }
            })

        },
        doSign(){
            var self = this;
            var images = this.$refs.uploader.uploadFiles;
            if (images.length) {
                var formData = new FormData();
                images.forEach(function (ele, i) {
                    formData.append('images[' + i + ']', ele.file);
                });
                $.ajax({
                    url: '/api/upload',
                    type: 'post',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        submit(data)
                    }
                })
            } else {
                submit();
            }

            function submit(images) {
                var params = {
                    desc: self.typeMap[self.type],
                    type: 1,
                    status: 0
                };
                if (images) {
                    params.images = images.data.map(function (ele, i) {
                        return ele.fileUrl;
                    });
                    params.thumbnails = images.data.map(function (ele, i) {
                        return ele.filethumbnailUrl;
                    });
                }
                $.ajax({
                    url: '/api/order',
                    type: 'POST',
                    data: params,
                    success: function (data) {
                        if (data.success) {
                            window.location.href = './order_list.html';
                        }
                    },
                    error: function (err) {
                        self.console = err.error
                    }
                })
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
            $.grantedAjax({
                url: 'https://api.leancloud.cn/1.1/requestSmsCode',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    mobilePhoneNumber: self.phone
                })
            })
            .then(data => self.console = JSON.stringify(data))
            .catch(err => self.console = err.responseText)
        },
        validateCode(){
            var self = this;
            $.grantedAjax({
                url: 'https://api.leancloud.cn/1.1/verifySmsCode/'+ self.code + '??mobilePhoneNumber=' + self.phone,
                type: 'post',
                contentType: 'application/json'
            })
            .then(function(){
                  return self.modifyUserMobile();
             })
            .then(function(){
                self.hideVerifyContainer();
                self.doSign();
            })
            .catch(err => self.console = err.responseText)
        },
        modifyUserMobile(){
            var self = this;
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



