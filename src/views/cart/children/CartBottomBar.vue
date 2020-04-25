<template>
  <div class="bottom-bar">
    <div class="left">
      <check-button class="left-button" :is-active="isActive" @click.native="allCheck"/>
      <span>全选</span>
    </div>
    <div class="center">
      <span>合计:￥{{totalPrice}}</span>
    </div>
    <div class="right" @click="calcClick">
      结算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'

  import {mapGetters} from 'vuex'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      
      ...mapGetters(['getCartList']),
      //总价钱
      totalPrice() {
        return this.getCartList.filter(item => item.checked).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      //购买商品的个数
      checkLength() {
        return this.getCartList.filter(item => item.checked).length
      },
      isActive() {
        if (this.getCartList.length === 0) {
          return false
        }
        return !this.getCartList.find(item => !item.checked)
      }
    },
    methods: {
      //监听全选控件
      allCheck() {
        // if (this.getCartList.length === 0) {
        //   return
        // }
        // if (this.getCartList.filter(item => !item.checked).length) {
        //   for (const i of this.getCartList) {
        //     i.checked = true
        //   }
        // }else {
        //   for (const value of this.getCartList) {
        //     value.checked = !value.checked
        //   }
        // }
        if (!this.isActive) {
         this.getCartList.forEach(item => item.checked = true) 
        }else {
          this.getCartList.forEach(item => item.checked = false)
        }
      },
      calcClick() {
        if (this.checkLength === 0) {
          this.$toast.show('请选择要购买的商品！')
        }else {
          this.$toast.show(`一共需支付${this.totalPrice}元`,2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    height: 40px;
    background-color:#f1ebeb;
    font-size: 16px;
    line-height: 40px;
  }

  .left {
    display: flex;
    width: 70px;
    align-items: center;
  }

  .left-button {
    width: 22px;
    height: 22px;
    line-height: 22px;
    margin: 0 5px 0 8px;
  }

  .center {
    flex: 1;
    margin-left: 15px;
  }
  
  .right {
    width: 100px;
    height: 100%;
    border-radius: 20px;
    color: #fff;
    text-align: center;
    background-color: orangered;
  }

  .active {
    border-color: var(--color-high-text);
    background-color: var(--color-high-text);
    border-radius: 50%;
  }
</style>