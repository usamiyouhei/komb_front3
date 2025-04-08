<template>
  <LayoutTestArticle title="ダイアログウィンドウ">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <div class="Sample align-center">
            <ButtonSimple class="ml-4" :width="120" text="開く" @click="onOpen(true)" />
            <ButtonSimple class="ml-10" :width="120" text="リセット" @click="onOpen(true, true)" backcolor="info" />
            <ButtonSimple class="ml-4" :width="180" text="ユーザー設定テスト" @click="userOpenSwitch.opened = true" />
          </div>
        </section>
      </div>
    </LayoutTestReview>
    <!-- ユーザーモーダル確認のため一時コメントアウト -->
    <PartsDialogWindow
      :switcher="openSwitch"
      :buttons="DIALOG_BUTTON.YES_NO"
      :colors="useSetColors(DIALOG_COLOR.TWO)"
      :fixedSize="fixedRect"
      :reset="isReset"
      :headLine="headLine"
      :text="text"
      :modeless="modeless"
      @update:close="openSwitch.opened = false"
      @update:value="onChangeButton"
    >
    </PartsDialogWindow>
    <!-- <LayoutAdminUser :switcher="userOpenSwitch" />  -->
  </LayoutTestArticle>
</template>

<script setup lang="ts">
/**===================================================================================================================
 * 
===================================================================================================================**/
import { type FixedSize } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
import { type ModalSwitch } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/types'

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'パーツテスト',
})

const openSwitch: Ref<ModalSwitch> = ref({ opened: false })
const userOpenSwitch: Ref<ModalSwitch> = ref({ opened: false })
const isReset = ref(false)
const modeless = ref(false)

/*
 * クリックされたボタンを判定
 * 否定；-1
 * 保留：0
 * 肯定：1
 */
const clickedButton = ref()

// --------------------テキスト表示のテスト文字-------------------------
const headLine = 'headLine'
const text = ['aaaaaaaa', 'bbbbbbbb', 'cccccccc', 'dddddddd', 'eeeeeeee']
//---------------------------------------------------------------------

// サイズ固定＆不動ダイアログ
const fixedRect: Ref<FixedSize> = ref({
  justify: 'center',
  align: 'center',
  offsetX: '0px',
  offsetY: '-50px',
  width: '380px',
  height: '300px',
})

function onOpen(open: boolean, reset: boolean = false) {
  openSwitch.value.opened = open
  isReset.value = reset
}

// ダイアログのどのボタンがクリックされたか判定する関数
function onChangeButton(value: number) {
  clickedButton.value = value
  // console.log('emit', value)
}
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
</style>
