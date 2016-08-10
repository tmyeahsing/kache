<template>
<div :class="'weui_dialog_' + type + (show?' weui_dialog_show':'')">
<!--  <div class="weui_mask" v-show="show"></div>-->
  <div class="weui_dialog animated" v-show="show" transition="zoom">
    <div class="weui_dialog_hd">
      <div class="weui_dialog_title">{{title}}</div>
    </div>
    <div class="weui_dialog_bd"><slot></slot></div>
    <div class="weui_dialog_ft">
      <a v-if="type === 'confirm'" href="javascript:;" class="weui_btn_dialog default" @click="dispathEventAndClose('weui-dialog-cancel')">{{cancelButton}}</a>
      <a href="javascript:;" class="weui_btn_dialog primary" @click="dispathEventAndClose('weui-dialog-confirm')">{{confirmButton}}</a>
    </div>
  </div>
</div>
</template>

<style lang="scss">
  .weui_dialog_confirm{
    .weui_dialog_bd{
      input{
        display: block;
        width: 100%;
        border: none;
        border-bottom: 1px solid #e6e6e6;
        background-color: transparent;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        -webkit-tap-highlight-color: transparent;
        &:focus{
          outline: none;
        }
      }
    }
  }
  .weui_dialog_confirm, .weui_dialog_alert{
    position: fixed;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    transition: width 0s 0.5s, height 0s 0.5s;
    text-align: center;
    background-color: rgba(0,0,0,.6);
    &:before{
      content: '';
      display: inline-block;
      vertical-align: middle;
      height: 100%;
    }
  }
  .weui_dialog_show{
    width: 100%;
    height: 100%;
    transition: width 0s 0s, height 0s 0s;
  }
  .weui_dialog{
    position: relative;
    display: inline-block;
    vertical-align: middle;
    transform: none;
    left: 0;
    top: 0;
    -webkit-animation-duration:.5s;
    animation-duration:.5s;
  }
</style>

<script>
export default {
  props: {

    /**
    * 双向绑定的属性，控制显隐
    */
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    },
    /**
     * 对话框类型
     * alert: 提示框，只包含确定按钮（默认）
     * confirm: 询问框，包含确定和取消按钮
     */
    type: {
      type: String,
      required: false,
      default: 'alert'
    },

    /**
     * 对话框标题
     */
    title: {
      type: String,
      required: true
    },

    /**
     * 确定按钮名称
     */
    confirmButton: {
      type: String,
      required: false,
      default: '确定'
    },

    /**
     * 取消按钮名称
     */
    cancelButton: {
      type: String,
      required: false,
      default: '取消'
    }

  },

  methods: {
    dispathEventAndClose(event) {
      this.$dispatch(event);
      if(event === 'weui-dialog-cancel'){
        this.show = false;
      }
    }
  }
}
</script>
