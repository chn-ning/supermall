// 导入防抖动函数
import {debounce} from 'common/utils.js'
//导入回到顶部组件
import GoTop from "components/content/gotop/GoTop";

export const itemListenerMixin = {
  data() {
    return {
      itemListener: null,   //保存事件总线发出事件的回调函数
    }
  },
  mounted() {
    //调用防抖函数
    const refresh = debounce(this.$refs.scroll.refresh, 500)

    this.itemListener = () => {
      //刷新以获取最新高度(请求频繁)
      // this.$refs.scroll.refresh()
      //执行防抖动函数
      refresh()
    }
    //监听事件总线发射的事件,goodsitem中图片加载完成回调
    this.$bus.$on('goodsItemImgLoad', this.itemListener)    
  }
}


//回到顶部的混入对象
export const backTopMixin = {
  components: {
    GoTop
  },
  data() {
    return {
      isShowGoTop: false,   //记录回到顶部组件的状态是否显示,默认不显示
    }
  },
  methods: {
    clickGoTop() {
      this.$refs.scroll.gotoTop(0, 0, 1500);
    }
  }
}