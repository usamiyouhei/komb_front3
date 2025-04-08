<template>
  <div
    class="MainContainer"
    :style="{
      height: `calc(100% - ${header.height}px - ${subHeader.height}px - ${footer.height}px)`,
      top: `calc(${header.height}px + ${subHeader.height}px)`,
      left: `${navi.width}px`,
      width: `calc(100% - ${navi.width}px)`,
      backgroundColor: useColor('surface'),
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const header = useHeaderStatus()
const subHeader = useSubHeaderStatus()
const footer = useFooterStatus()
const navi = useMainNavigationStatus()
</script>

<style lang="scss" scoped>
.MainContainer {
  position: fixed;
  transition: left 0.2s, width 0.2s;
}
</style>
