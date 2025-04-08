<template>
  <div class="Review">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * ボタン、パーツ用の画面レビュー
 **/
</script>
<style lang="scss" scoped>
.Review {
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100% - 40px);
}
</style>
