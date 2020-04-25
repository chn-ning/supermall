<template>
  <div class="goods-item" @click="handleClick">
    <!-- <img :src="showImg" alt="" @load="imgLoad"> -->
    <img v-lazy="showImg" alt="" @load="imgLoad">
    <div class="item-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="cfav">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showImg() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    //监听图片加载完成
    imgLoad() {
      //通过事件总线方式发射事件
      this.$bus.$emit('goodsItemImgLoad')
    },
    //处理点击跳转详情页
    handleClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
  .goods-item {
    padding-bottom: 42px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }

  .item-info {
    font-size: 14px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .item-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .item-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .item-info .cfav {
    position: relative;
  }

  .item-info .cfav::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>