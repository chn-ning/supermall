<template>
    <swiper>
      <swiper-item v-for="(item,index) in cbanners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="swiperImgLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: 'HomeSwiper',
    components: {
      Swiper,
      SwiperItem
    },
    data() {
      return {
        isImgLoad: false  //记录图片是否加载过
      }
    },
    props: {
      cbanners: {
        type: Array,
        default() {
          return []
        },
        required: true
      }
    },
    methods: {
      //1.监听图片加载完成
      swiperImgLoad() {
        if (!this.isImgLoad) {
          this.$emit('swiperImgLoad')
          this.isImgLoad = true
        }
      }
    }
  }
</script>

<style scoped>

</style>