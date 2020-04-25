<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar ref="nav" @titleClick="titleClick"/>
    <!-- better-scroll -->
    <scroll class="scroll-content" ref="scroll" 
      :probe-type="3" @currentPosition="currentPosition">
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages"/>
      <!-- 商品信息 -->
      <detail-base-info :goods="goods"/>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"/>
      <!-- 商品详情 -->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <!-- 商品参数 -->
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <!-- 商品评论 -->
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <!-- 商品推荐 -->
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <!-- 底部导航栏 -->
    <detail-bottom-bar @addToCart="addToCart"/>
    <!-- 回到顶部 -->
    <go-top @click.native="clickGoTop" v-show="isShowGoTop" />
    <!-- <toast :message='message' :show="isShowToast"/> -->
  </div>
</template>

<script>
  // import Toast from 'components/common/toast/Toast'
  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import DetailNavBar from './children/DetailNavBar'
  import DetailSwiper from './children/DetailSwiper'
  import DetailBaseInfo from './children/DetailBaseInfo'
  import DetailShopInfo from './children/DetailShopInfo'
  import DetailGoodsInfo from './children/DetailGoodsInfo'
  import DetailParamInfo from './children/DetailParamInfo'
  import DetailCommentInfo from './children/DetailCommentInfo'
  import DetailBottomBar from './children/DetailBottomBar'

  import {getDetailData, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'

  //导入混入
  import {itemListenerMixin, backTopMixin} from 'common/mixin'

  import {mapActions} from 'vuex'
  export default {
    name: 'Detail',
    components: {
      Scroll,
      GoodsList,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar
      // Toast
    },
    data() {
      return {
        iid: null,
        topImages: [],  //保存轮播图数据
        goods: {},      //保存商品数据
        shop: {},       //保存店铺数据
        detailInfo: {}, //保存商品详情数据
        paramInfo: {},  //保存商品参数数据
        commentInfo: {},//保存商品评论数据
        recommends: [], //保存商品推荐数据
        titleOffSetYs:[]//保存导航栏对应联动的Y值
        // message:'',
        // isShowToast: false
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.id
      //2.根据iid请求详情数据
      getDetailData(this.iid).then(res => {
        const data = res.result
        //1.保存轮播图数据
        this.topImages = data.itemInfo.topImages
        //2.保存商品数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //3.保存店铺数据
        this.shop = new Shop(data.shopInfo)
        //4.保存商品详情数据
        this.detailInfo = data.detailInfo
        //5.保存参数数据
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //6.保存商品评论数据
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
      //3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    methods: {

      ...mapActions(['addCart']),

      imageLoad() {
        this.$refs.scroll.refresh()
        //等商品详情图片加载完再保存导航栏对应联动的Y值
        this.titleOffSetYs.push(0)
        this.titleOffSetYs.push(this.$refs.params.$el.offsetTop)
        this.titleOffSetYs.push(this.$refs.comment.$el.offsetTop)
        this.titleOffSetYs.push(this.$refs.recommend.$el.offsetTop)
      },
      //监听当前滚动的坐标,并改变currentIndex的值
      currentPosition(position) {
        let positionY = -position.y
        if ( (this.$refs.nav.currentIndex !== 0) && (positionY >= this.titleOffSetYs[0] && positionY < this.titleOffSetYs[1]) ) {
          this.$refs.nav.currentIndex = 0
        }else if ( (this.$refs.nav.currentIndex !== 1) && (positionY >= this.titleOffSetYs[1] && positionY < this.titleOffSetYs[2]) ) {
          this.$refs.nav.currentIndex = 1
        }else if ( (this.$refs.nav.currentIndex !== 2) && (positionY >= this.titleOffSetYs[2] && positionY < this.titleOffSetYs[3]) ) {
          this.$refs.nav.currentIndex = 2
        }else if ( (this.$refs.nav.currentIndex !== 3) && (positionY >= this.titleOffSetYs[3]) ) {
          this.$refs.nav.currentIndex = 3
        }
        //监听回到顶部是否显示
        this.isShowGoTop = -position.y > 1000;
      },
      //监听顶部导航栏的点击,实现联动效果
      titleClick(index) {
        this.$refs.scroll.gotoTop(0, -this.titleOffSetYs[index], 1000)
      },
      //监听加入购物车
      addToCart() {
        //1.获取加入购物车商品的展示信息
        const product = {}
        product.iid = this.iid
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        //2.将商品添加到购物车
        // this.$store.commit('addToCart', product)
        
        //1.普通方式
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // })
        //2.使用映射的方式
        this.addCart(product).then(res => {
          // this.message = res
          // this.isShowToast = true
          // setTimeout(() => {
          //   this.message = ''
          //   this.isShowToast = false
          // }, 1500)

          this.$toast.show(res, 1500)
        })
      }
    },
    //使用混入
    mixins: [itemListenerMixin, backTopMixin],
    mounted() {
      // console.log('detail mounted');
    },
    destroyed () {
      //2.取消全局事件的监听
      this.$bus.$off('goodsItemImgLoad', this.itemListener)      
    },
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 12;
    background-color: #ffffff;
    height: 100vh;
  }

  .scroll-content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>