<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item,index) in titles"
      :key="index" 
      :class="{active: index === currentIndex}"
      @click="clickIndex(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {
      // 记录当前选中的索引值,默认下标0为选中状态
      currentIndex: 0
    }
  },
  methods: {
    clickIndex(index) {
      this.currentIndex = index
      //发射事件，把当前下标（index）传出去
      this.$emit('handleClickIndex',index)
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      },
      required: true
    }
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 4px;
  }

  /* 选中时的样式 */
  .active {
    color: var(--color-high-text);
  }
  
  .active span {
    border-bottom: 2px solid var(--color-high-text);
  }
</style>