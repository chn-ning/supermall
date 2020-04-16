<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  //封装better-scroll框架的组件
  export default {
    name: 'Scroll',
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      gotoTop(x, y, time=1000) {
        //scrollTo(x, y, time)回到顶部
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp() //完成上拉
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType, //动态决定该值(0|1|2|3),可以提高性能
        click: true,
        pullUpLoad: this.pullUpLoad //动态决定是否监听上拉到底部加载更多
      })
      //监听当前滚动的坐标
      this.scroll.on('scroll', (position) => {        
        this.$emit('currentPosition',position)
      })
      //监听上拉加载
      this.scroll.on('pullingUp', () => {
        this.$emit('pullUpLoad')
        // setTimeout(() => {
        //   this.scroll.finishPullUp()
        // },3000)
      })
    }
  }
</script>

<style scoped>

</style>