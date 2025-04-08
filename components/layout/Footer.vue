<template>
  <div
    class="Footer"
    :style="{
      height: `${status.height}px`,
      backgroundColor: useColor('header'),
      color: useColor('reverse'),
    }"
  >
    <!--

    footer
    <div class="Flex">
      <div class="Label">ベース</div>
      <ButtonToggleSet
        :items="baseToggleItems"
        :line-color="'transparent'"
        :value="colorSetting.value.base"
        @update:value="onChangeBaseColor($event)"
        small
        dark
        class="mr-6"
      />
      <div class="Label">テーマ</div>
      <ButtonToggleSet
        :items="colorToggleItems"
        :line-color="'transparent'"
        :value="colorSetting.value.theme"
        @update:value="onChangeThemeColor($event)"
        small
        dark
      />
    </div>
    -->
  </div>
</template>

<script setup lang="ts">
import { type ToggleSetProps } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
import {
  FORM_MODE,
  defaultBase,
  type baseProps,
} from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
const base = ref(defaultBase)
base.value.mode = FORM_MODE.INLINE
base.value.label.width = 0
// base.value.label.color = useColor('reverse')

const status = useFooterStatus()
const colorSetting = useColorSetting()

const colorToggleItems: ToggleSetProps[] = [
  { text: 'ADMIN', value: 'admin', activeBack: useColor('base', 'light', 'admin') },
  { text: 'TENANT', value: 'tenant', activeBack: useColor('base', 'light', 'tenant') },
  { text: 'TEST', value: 'test', activeBack: useColor('base', 'light', 'test') },
  { text: 'DEFAULT', value: 'default', activeBack: useColor('base', 'light', 'default') },
]
const baseToggleItems: ToggleSetProps[] = [
  {
    text: 'LIGHT',
    value: 'light',
    activeBack: '#fff',
    activeColor: useColor('color', 'light', 'test'),
    back: '#555',
  },
  {
    text: 'DARK',
    value: 'dark',
    activeBack: useColor('surface', 'dark', 'test'),
    back: '#555',
  },
]
function onChangeBaseColor(value: ToggleSetProps) {
  colorSetting.value.base = value.value.toString()
}
function onChangeThemeColor(value: ToggleSetProps) {
  colorSetting.value.theme = value.value.toString()
}
</script>

<style lang="scss" scoped>
.Footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.Flex {
  display: flex;
  align-items: center;
}
.Label {
  font-size: 10px;
  margin-right: 8px;
}
</style>
