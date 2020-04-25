<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">HN 购物街</div>
    </nav-bar>
    <!-- copy的tab-control -->
    <tab-control
      class="copy-tab-control"
      :titles="['流行','新款','精选']"
      @handleClickIndex="handleClickIndex"
      ref="copytabControl"
      v-show="isShowCopyTab"
    />
    <!-- better-scroll -->
    <scroll
      class="bscroll"
      ref="scroll"
      :probe-type="3"
      @currentPosition="currentPosition"
      @pullUpLoad="pullUpLoad"
      :pullUpLoad="true">
      <!-- 轮播图 -->
      <home-swiper :cbanners="banners" @swiperImgLoad="swiperImgLoad" />
      <home-recommend :crecommends="recommends" />
      <!-- 本周流行 -->
      <home-popular />
      <!-- 选项卡控件 -->
      <tab-control
        :titles="['流行','新款','精选']"
        @handleClickIndex="handleClickIndex"
        ref="tabControl"
      />
      <!-- 商品列表 -->
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 回到顶部 -->
    <go-top @click.native="clickGoTop" v-show="isShowGoTop" />
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabcontrol/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import GoTop from "components/content/gotop/GoTop";

  import HomeSwiper from "./children/HomeSwiper";
  import HomeRecommend from "./children/HomeRecommend";
  import HomePopular from "./children/HomePopular";

  import {getHomeMultiData, getHomeGoods} from "network/home";

  //导入混入
  import {itemListenerMixin} from 'common/mixin'

  export default {
    name: "Home",
    components: {
      Scroll,
      NavBar,
      TabControl,
      GoodsList,
      GoTop,
      HomeSwiper,
      HomeRecommend,
      HomePopular
    },
    data() {
      return {
        indexValue: "pop",    //选项卡控件当前的列表值
        isShowGoTop: false,   //记录回到顶部组件的状态是否显示,默认不显示
        taboffsetTop: 0,      //保存选项卡控件垂直(y轴)偏移值
        isShowCopyTab: false, //记录copy的选项卡是否显示
        saveY: 0,             //记录离开时的y坐标
        banners: [], //轮播图数据
        recommends: [],
        goods: {
          //商品列表数据
          pop: { page: 0, list: [] }, //流行
          new: { page: 0, list: [] }, //新款
          sell: { page: 0, list: [] } //精选
        }
      };
    },
    computed: {
      showGoods() {
        return this.goods[this.indexValue].list;
      }
    },
    created() {
      //请求轮播图数据
      this.getMultiData();
      //请求商品列表数据
      this.getGoods("pop");
      this.getGoods("new");
      this.getGoods("sell");
    },
    mixins: [itemListenerMixin],
    mounted() {
      // console.log('home mounted');
    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.gotoTop(0, this.saveY, 0)
    },
    deactivated() {
      // 1.保存y值
      this.saveY = this.$refs.scroll.scroll.y

      //2.取消全局事件的监听
      this.$bus.$off('goodsItemImgLoad', this.itemListener)
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      //1.监听选项卡控件当前下标
      handleClickIndex(index) {
        switch (index) {
          case 0:
            this.indexValue = "pop";
            break;
          case 1:
            this.indexValue = "new";
            break;
          case 2:
            this.indexValue = "sell";
        }

        //统一tabControl的选中状态下标
        this.$refs.tabControl.currentIndex = index
        this.$refs.copytabControl.currentIndex = index
      },
      //2.监听回到顶部 
      clickGoTop() {
        this.$refs.scroll.gotoTop(0, 0, 1500);
      },
      //3.监听当前上拉的坐标
      currentPosition(position) {
        //监听回到顶部是否显示
        this.isShowGoTop = -position.y > 1000;
        //监听copy的选项卡是否显示
        this.isShowCopyTab = -position.y >= this.taboffsetTop
      },
      //4.监听上拉加载更多
      pullUpLoad() {
        this.getGoods(this.indexValue);
      },
      //5.监听轮播图组件图片加载完成
      swiperImgLoad() {
        //此时再获取tabControl的offsetTop并保存到变量中
        this.taboffsetTop = this.$refs.tabControl.$el.offsetTop
      },
      /**
       * 网络请求相关的方法
       */
      getMultiData() {
        getHomeMultiData().then(res => {
          //把接口返回的数据保存到对应的变量中
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        });
      },
      getGoods(type) {
        let page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          //把接口返回的数据解包并push到对应的数组中
          this.goods[type].list.push(...res.data.list);
          //每调用一次页码加一
          this.goods[type].page += 1;
          this.$refs.scroll.finishPullUp(); //完成上拉,多次上拉加载更多
        });
      }
    }
  };
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  position: relative;
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
  font-size: 18px;
  /* 使用原生滚动才需要设置的样式 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10; */
}

.copy-tab-control {
  position: relative;
  background-color: #ffffff;
  z-index: 9;
  margin-top: -1px;
}

.bscroll {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>