import {
  ADD_COUNTER, 
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
    //1.查找旧数组中是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    
    //2.有则执行addCounter方法,没有则执行addToCart方法
    if (oldProduct) {
      context.commit(ADD_COUNTER, oldProduct)
      resolve('当前商品数量+1！')
    }else {
      context.commit(ADD_TO_CART, payload)
      resolve('成功添加到购物车！')
    }
    })
  }
}