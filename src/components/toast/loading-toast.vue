<template>
    <div v-show="shown" class="weui_loading_toast">
        <div class="weui_mask_transparent"></div>
        <div class="weui_toast">
            <div class="weui_loading">
                <div v-for="n in 12"
                     class="weui_loading_leaf"
                     :class="'weui_loading_leaf_' + n"></div>
            </div>

            <div class="weui_toast_content">
                {{text}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data:function(){
            return {
                shown: false,
                text: ''
            }
        },
        methods: {
            show: function(text){
                this.text = text;
                this.shown = true;
            },
            hide: function(){
                this.shown = false;
            }
        }
    }
</script>
