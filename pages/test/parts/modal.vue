<template>
  <LayoutTestArticle title="モーダルテストエントランス" :tabs="tabmenus" v-model:tab="tab">
    <LayoutTestReview v-if="tab === 'sample'">
      <div class="Contents">
        <section>
          <div class="Sample align-center">
            <ButtonToggleSwitch class="mr-4" v-model:value="fixed" position="right" label="固定" />
            <ButtonToggleSwitch class="mr-4" v-model:value="modeless" position="right" label="モーダレス" />
            <ButtonToggleSet
              class="mr-4"
              :items="activeRectItems"
              :value="activeRect"
              label="可動範囲"
              @update:value="onChangeActiveRect"
            />
          </div>
          <div class="Sample align-center">
            <ButtonSimple class="ml-4" :width="120" text="開く" @click="onOpen(true)" />
            <ButtonSimple class="ml-8" :width="120" text="閉じる" @click="onOpen(false)" backcolor="secondary" />
            <ButtonSimple class="ml-10" :width="180" text="リセット" @click="onOpen(true, true)" backcolor="info" />
          </div>
        </section>
      </div>
    </LayoutTestReview>
    <LayoutTestReview v-if="tab === 'tips'">
      <div class="Contents">
        <p>モーダルWindowはモーダルエリアにテレポート（vue3の新機能）で配置</p>
        <p>なお、クライアント側でしか使えないので注意</p>
      </div>
    </LayoutTestReview>
    <LayoutTestSimulator v-if="tab === 'simulator'">
      <div class="Simulator">
        <div class="Property">
          <FormNumeric :label="'x'" :base="simulator" :value="'100'" class="mb-1" :min="0" :max="800" />
          <FormNumeric :label="'y'" :base="simulator" :value="'100'" class="mb-1" :min="-20" :max="800" />
          <FormNumeric :label="'w'" :base="simulator" :value="'400'" class="mb-1" :min="300" :max="1200" />
          <FormNumeric :label="'h'" :base="simulator" :value="'500'" class="mb-1" :min="300" :max="1200" />
        </div>
      </div>
    </LayoutTestSimulator>
    <ClientOnly>
      <teleport to="#modal-area">
        <PartsModalWindow
          :level="activeRect"
          :switcher="openSwitch"
          :modeless="modeless"
          :fixed="fixed"
          :variableSize="variableRect"
          :fixedSize="fixedRect"
          :reset="isReset"
          @update:close="openSwitch.opened = false"
        />
      </teleport>
    </ClientOnly>
  </LayoutTestArticle>
</template>

<script setup lang="ts">
/**===================================================================================================================
 * 
===================================================================================================================**/
// import ModalWindow from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
import { type ToggleSetProps } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
import type {
  VariableSize,
  FixedSize,
} from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
import {
  FORM_MODE,
  defaultBase,
  type baseProps,
} from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
import { type TabProps } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
import { type ModalSwitch } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/types'

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'パーツテスト',
})
/**===================================================================================================================
 *
 ===================================================================================================================**/

//------------------------------------------------------------------------------------------------------------
// 引数
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
// 定数・変数（state）
//------------------------------------------------------------------------------------------------------------
const openSwitch: Ref<ModalSwitch> = ref({ opened: false })
const modeless = ref(false)
const activeRectItems: ToggleSetProps[] = [
  { text: '0', value: 0 },
  { text: '1', value: 1 },
  { text: '2', value: 2 },
  { text: '3', value: 3 },
  { text: '4', value: 4 },
]
const activeRect = ref(0)

const base = ref(JSON.parse(JSON.stringify(defaultBase)))
const simulator = ref(JSON.parse(JSON.stringify(defaultBase)))
simulator.value.small = true
simulator.value.width = 120
simulator.value.label.align = 'flex-end'
simulator.value.label.innerWidth = 14
simulator.value.label.width = 40

const fixed = ref(false)
const isReset = ref(false)

// サイズ変更＆可動ダイアログ
const variableRect: Ref<VariableSize> = ref({
  width: 800,
  minWidth: 600,
  maxWidth: 1200,
  height: 800,
  minHeight: 100,
  maxHeight: 1200,
})

// サイズ固定＆不動ダイアログ
const fixedRect: Ref<FixedSize> = ref({
  justify: 'center',
  align: 'center',
  offsetX: '0px',
  offsetY: '-100px',
  width: '50%',
  height: '300px',
})

const tabmenus: Ref<TabProps[]> = ref([
  { text: 'TIPS', value: 'tips' },
  { text: 'SAMPLE', value: 'sample' },
  { text: 'SIMULATOR', value: 'simulator' },
])
const tab = ref('simulator')

//------------------------------------------------------------------------------------------------------------
// ライフサイクル
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//watch
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//computed
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
// エミット
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
// メソッド
//------------------------------------------------------------------------------------------------------------
const level = ref(0)
function onOpenLevel(value: number) {
  level.value = value
}
function onChangeActiveRect(value: ToggleSetProps) {
  activeRect.value = +value.value
  // console.log(value)
}

function onOpen(open: boolean, reset: boolean = false) {
  openSwitch.value.opened = open
  isReset.value = reset
}
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
.SwitchContainer {
  position: relative;
  display: flex;
  height: 36px;
  justify-content: flex-start;
  align-items: center;
}
</style>

//
