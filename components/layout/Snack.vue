<template>
  <div
    class="Footer"
    :style="{
      height: `${status.height}px`,
      backgroundColor: status.backcolor,
      color: status.color,
    }"
  >
    footer
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.Footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
