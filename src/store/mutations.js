import {
  ADD_COUNTER, 
  ADD_TO_CART
} from './mutation-types'

export default {
  //商品数量加1
  [ADD_COUNTER](state, payload) {
    payload.count += 1
  },
  //添加商品
  [ADD_TO_CART](state, payload) {
    payload.count = 1
    payload.checked = true
    state.cartList.push(payload)
  }
}