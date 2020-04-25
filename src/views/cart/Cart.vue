<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <scroll class="scroll-content" ref="scroll">
      <cart-list/>
    </scroll>
    <!-- 底部结算 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'

  import CartList from './children/CartList'
  import CartBottomBar from './children/CartBottomBar'

  import {mapGetters} from 'vuex'

  export default {
    name: 'Cart',
    components: {
      NavBar,
      Scroll,
      CartList,
      CartBottomBar
    },
    computed: {
      // cartLength() {
      //    return this.$store.state.cartList.length
      //    return this.$store.getters.cartLength
      // }

      //使用辅助函数将store中的getter映射到局部计算属性
      //1.使用数组形式
      // ...mapGetters(['cartLength'])
      //2.使用对象形式：另起名字
      ...mapGetters({
        length: 'cartLength'
      })
    },
    activated() {
      this.$refs.scroll.refresh()
    },
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .cart-nav {
    background-color: var(--color-tint);
    color: #ffffff;
    font-size: 18px;
  }

  .scroll-content {
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
</style>