<template>
  <div class="MainArticle">
    <div class="MainHeader">
      <h2>{{ title }}</h2>
      {{ scroll }}
    </div>
    <div class="MainContents" :class="{ isScroll: scroll }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  scroll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  scroll: true,
})

const header = useHeaderStatus()
const subHeader = useSubHeaderStatus()
const footer = useFooterStatus()
const navi = useMainNavigationStatus()
</script>

<style lang="scss" scoped>
.MainArticle {
  position: relative;
  width: 100%;
  height: 100%;
  .MainHeader {
    position: relative;
    width: 100%;
    height: 40px;
    padding: 8px 32px;
    h2 {
      font-size: 16px;
    }
  }
  .MainContents {
    position: relative;
    width: 100%;
    height: calc(100% - 40px);
  }
  .isScroll {
    overflow-y: scroll;
    overflow-x: hidden;
  }
}
</style>
