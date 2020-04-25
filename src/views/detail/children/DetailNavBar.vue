<template>
  <div>
    <nav-bar>
      <div slot="left" class="navbar-back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="navbar">
        <div class="navbar-item" v-for="(item, index) in titles" 
          :key="index" @click="titleClick(index)"
          :class="{active: index === currentIndex}">{{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'DetailNavBar',
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backClick() {
        this.$router.back()
        // this.$router.go(-1)
      }
    },
  }
</script>

<style scoped>
  .navbar-back img {
    padding-top: 10px;
  }

  .navbar {
    display: flex;
    font-size: 17px;
  } 
  .navbar-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }
</style>