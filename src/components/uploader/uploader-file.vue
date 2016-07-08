<template>
<li :class="{'weui_uploader_file': true, 'weui_uploader_status': hasStatus}" :style="{'backgroundImage': 'url(' + imageUrl + ')'}">
  <a href="javascript:;" v-if="cancelable" class="weui_icon_clear" @click="dispatchDelete(index)"></a>
  <div class="weui_uploader_status_content">
    <slot name="status"></slot>
  </div>
</li>
</template>

<script>
export default {
  props: {
    /**
     * 预览图的url，将被用于backgroud-image中
     */
    imageUrl: {
      type: String,
      required: true
    },

    /**
     * 是否包含status
     * 若包含，则预览图片上会添加黑色蒙层
     */
    hasStatus: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * 是否包含status
     * 若包含，则预览图片上会添加黑色蒙层
     */
    index: {
      type: Number,
      required: false
    },

    /**
     * 是否可删除
     * 若可删除，则预览图片上会添加删除按钮
     */
    cancelable: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
    dispatchDelete: function(index, event){
      this.$dispatch('weui-file-delete', event, index);
    }
  }
}
</script>
