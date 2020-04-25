<template>
  <div class="check-button" :class="{active: isActive}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: 'CheckButton',
    props: {
      isActive: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    border: 1px solid #aaaaaa;
    border-radius: 50%;
  }

  .check-button img {
    width: 20px;
    height: 20px;
  }

  .active {
    border-color: var(--color-high-text);
    background-color: var(--color-high-text);
    border-radius: 50%;
  }
</style>