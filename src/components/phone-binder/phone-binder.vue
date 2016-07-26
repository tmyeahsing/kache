<template>
    <div class="g_bind_phone animated" v-show="show" transition="zoom">
        <div class="weui_cells_title"><i class="weui_icon_warn"></i>绑定手机号，方便维修人员及时联系您</div>
        <div class="weui_cells weui_cells_form">
            <div class="weui_cell weui_vcode">
                <div class="weui_cell_bd weui_cell_primary">
                    <input class="weui_input" type="number" pattern="[0-9]*" placeholder="请输入手机号" v-model="phone">
                </div>
                <div class="weui_cell_ft">
                    <a class="weui_btn weui_btn_primary weui_btn_mini" href="javascript:" @click="sendMsg">获取验证码</a>
                </div>
            </div>
            <div class="weui_cell">
                <div class="weui_cell_bd weui_cell_primary">
                    <input class="weui_input" type="number" placeholder="请输入验证码" v-model="code">
                </div>
            </div>
        </div>

        <div class="weui_btn_area">
            <a class="weui_btn weui_btn_primary" href="javascript:" @click="validateCode">提交</a>
        </div>
        <p>{{console}}</p>
    </div>
    <toast v-ref:toast></toast>
    <loading-toast v-ref:loading></loading-toast>
</template>

<style lang="scss">
    .g_bind_phone{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #e6e6e6;
        -webkit-animation-duration:.5s;
        animation-duration:.5s;
        .weui_cells_title{
            .weui_icon_warn{
                margin-right: 10px;
                &:before{
                     margin-top: -4px;
                 }
            }
        }
        .weui_vcode{
            .weui_btn{
                margin: 5px;
                border-radius: 0;
                font-size: 18px;
                &:after{
                     border-radius: 0;
                }
            }
        }
    }
</style>
<script>
    import toast from '../toast/toast.vue'
    import loadingToast from '../toast/loading-toast.vue'
    export default {
        components: {
            toast: toast,
            loadingToast: loadingToast
        },
        data: function(){
            return {
                show: true
            }
        },
        methods: {
            sendMsg(){
                var self = this;
                self.showLoading('发送验证码...');
                $.grantedAjax({
                    url: 'https://api.leancloud.cn/1.1/requestSmsCode',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        mobilePhoneNumber: self.phone
                    })
                }).then(function(data){
                    self.hideLoading();
                    self.showToast('验证码已发送')
                    //倒计时
                }).catch(function(err){
                    self.hideLoading();
                    self.console = err.responseText;
                });
            },
            validateCode(){
                var self = this;
                self.showLoading('验证中...');
                $.grantedAjax({
                    url: 'https://api.leancloud.cn/1.1/verifySmsCode/'+ self.code +'?mobilePhoneNumber=' + self.phone,
                    type: 'post',
                    contentType: 'application/json'
                }).then(function(){
                    return self.modifyUserMobile();
                }).then(function(){
                    self.hideLoading();
                    self.showToast('绑定成功', function(){
                        self.hideVerifyContainer();
                        self.doSign();
                    });
                }).catch(function(err){
                    self.hideLoading();
                    self.console = err.responseText;
                });
            },
            modifyUserMobile(){
                var self = this;
                self.showLoading('绑定中...')
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
    }
</script>
