<template>
  <article class="MainArticle colorTXT surfaceBG">
    <div
      class="MainContents colorTXT backgroundBG"
      :style="{
        width: `calc(100%)`,
        borderColor: useColor('line'),
      }"
    >
      <div class="MainHeader lineBG colorTXT">
        <h3>{{ title }}</h3>
        <ButtonTabSet
          v-if="tabs"
          :items="tabs"
          :value="tab"
          :activeColor="useColor('color')"
          :activeBackColor="useColor('background')"
          class="LocalHeaderTab"
          padding="6px 16px 4px"
          @update:value="onChangeTab"
        />
      </div>
      <slot />
    </div>
  </article>
</template>

<script setup lang="ts">
import { type TabProps } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
interface Props {
  title: string
  tabs?: TabProps[]
  tab?: string
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
  tab: '',
})

const emits = defineEmits<{ (e: 'update:tab', item: any): void }>()

function onChangeTab(value: any) {
  emits('update:tab', value.value)
}
</script>

<style lang="scss" scoped>
.MainArticle {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;

  .MainContents {
    position: relative;
    height: 100%;
    border-radius: 6px;
    border: 1px solid #b3b3b3;
    background: #fff;
    transition:
      width 0.2s,
      min-width 0.2s;
    min-width: 600px;
    overflow: hidden;
    .MainHeader {
      padding: 0px 16px;
      width: 100%;
      height: 34px;
      border-radius: 5.5px 5.5px 0px 0px;
      background: #d9d9d9;
      font-weight: bold;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      h3 {
        padding-top: 4px;
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 16px !important;
        line-height: 16px !important;
        white-space: nowrap;
      }
    }
  }
}
</style>
