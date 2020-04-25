import Vue from 'vue'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import App from './App.vue'
import store from './store'
import router from './router'
import toast from 'components/common/toast'

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

//解决移动端300ms延迟
fastclick.attach(document.body)

//使用图片懒加载插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')// 懒加载使用的图片
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
