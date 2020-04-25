/* Home首页视图请求数据的函数模块 */
import {request} from './request'

//请求轮播图多条数据
export function getHomeMultiData() {
  return request({
    url: '/home/multidata'
  })
}

//请求商品列表数据
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}