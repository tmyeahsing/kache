<template>
    <div v-show="shown">
        <div class="weui_mask_transparent"></div>
        <div class="weui_toast">
            <i class="weui_icon_toast"></i>
            <div class="weui_toast_content">
                {{text}}
            </div>
        </div>
    </div>
</template>

<script>
    var _timeout = undefined;
    export default {
        data:function(){
            return {
                shown: false,
                text: ''
            }
        },
        methods: {
            show: function(text, cb){
                var self = this;
                if(_timeout){
                    clearTimeout(_timeout);
                }
                this.text = text;
                this.shown = true;
                _timeout = setTimeout(function(){
                    self.shown = false;
                    clearTimeout(_timeout);
                    _timeout = undefined;
                    if(typeof cb === 'function'){
                        cb();
                    }
                }, 3000);
            }
        }
    }
</script>
