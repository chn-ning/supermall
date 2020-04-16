<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item,index) in crecommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    crecommends: {
      type: Array,
      default() {
        return []
      },
      required: true
    }
  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    font-size: 14px;
    margin-top: 12px;
    padding-bottom: 30px;
    border-bottom: 10px solid #eee;
  }

  .recommend-item {
    flex: 1;
    text-align: center;
  }

  .recommend-item img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
</style>