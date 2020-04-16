<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: {
      type: String,
      required: true
    },
    activeColor: {
      type: String,
      default: 'green'
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      //判断当前path是否为活跃状态的path：如果是,则为ture否则为false
      // return this.$route.path.indexOf(this.path) !== -1

      //判断当前是否为活跃状态：如果是,则为true否则为false
      return this.$route.path === this.path? true: false
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {} 
    }
  },
  methods: {
    itemClick() {
      //判断是否已经处于活跃状态,防止多次点击当前页面报错
      if(this.$route.path === this.path) {
        return
      }else{
        //如果当前path不是处于活跃状态的path才执行push跳转
        this.$router.push(this.path)
      }
    }
  }
}
</script>

<style scoped>
 .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 1px;
  }
  /* .active{
    color: red;
  } */
</style>