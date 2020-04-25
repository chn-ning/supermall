export default {
  //商品长度
  cartLength(state) {
    return state.cartList.length
  },
  //商品数据
  getCartList(state) {
    return state.cartList
  }
}