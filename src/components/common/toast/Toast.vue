<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    // props: {
    //   message: {
    //     type: String,
    //     default: ''
    //   },
    //   show: {
    //     type: Boolean,
    //     default: false
    //   }
    // }
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message='☺', time='1500') {
        this.message = message
        this.isShow = true

        setTimeout(() => {
          this.message = ''
          this.isShow = false
        }, time)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position:fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    padding: 8px 12px;
    border-radius: 20px;
    background-color:rgba(0, 0, 0,.7);
    color: #fff;
    font-size: 18px;
    white-space: nowrap;
  }
</style>