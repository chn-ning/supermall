<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">HN 购物街</div>
    </nav-bar>
    <!-- better-scroll -->
    <scroll
      class="bscroll"
      ref="scroll"
      :probe-type="3"
      @currentPosition="currentPosition"
      @pullUpLoad="pullUpLoad"
      :pullUpLoad="true">
      <!-- 轮播图 -->
      <home-swiper :cbanners="banners" />
      <home-recommend :crecommends="recommends" />
      <!-- 本周流行 -->
      <home-popular />
      <!-- 选项卡控件 -->
      <tab-control
        class="tab-control"
        :titles="['流行','新款','精选']"
        @handleClickIndex="handleClickIndex"
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

import { getHomeMultiData, getHomeGoods } from "network/home";

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
      indexValue: "pop", //选项卡控件当前的列表值
      isShowGoTop: false, //记录回到顶部组件的状态是否显示,默认不显示
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
  methods: {
    /**
     * 事件监听相关的方法
     */
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
    },
    //监听回到顶部
    clickGoTop() {
      this.$refs.scroll.gotoTop(0, 0, 1500);
    },
    //监听当前上拉的坐标
    currentPosition(position) {
      this.isShowGoTop = -position.y > 1000;
    },
    //监听上拉加载更多
    pullUpLoad() {
      this.getGoods(this.indexValue);
      this.$refs.scroll.scroll.refresh() //图片数据加载完进行刷新(解决bug)
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
  padding-top: 44px;
  position: relative;
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
  font-size: 18px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
}

.tab-control {
  position: sticky;
  top: 44px;
  background-color: #ffffff;
  z-index: 9;
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