<template>
  <LayoutTestArticle title="ベーシックボタン">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>ButtonBasic(@/components/button/Basic.vue)</h5>
          <p>
            アイコン・テキスト・アイコンと並ぶ、ボタン構成のベース<br />
            背景色、文字色等の設定はPropからできるが、特殊な物は外部からのStyle設定で行う<br />
            よく使うボタンは、それをWrapしてコンポーネント化する
          </p>
          <h6>default</h6>
          <p class="mb-0">style指定なし</p>
          <div class="Sample">
            <ButtonBasic class="ma-2" text="ボタン" />
            <ButtonBasic class="ma-2" befor-icon="mdi-button-cursor" />
            <ButtonBasic class="ma-2" text="ボタン" after-icon="mdi-button-cursor" />
            <ButtonBasic class="ma-2" befor-icon="mdi-button-cursor" text="ボタン" after-icon="mdi-button-cursor" />
            <ButtonBasic class="ma-2" disabled text="ボタン" />
            <ButtonBasic class="ma-2" text="ボタン" />
          </div>
          <h6>色指定サンプル</h6>
          <div class="Sample">
            <ButtonBasic class="ma-2" text="ボタン" :backcolor="THEME_COLOR.secondary" />
            <ButtonBasic class="ma-2" text="ボタン" :backcolor="THEME_COLOR.secondary" color="#fff" />
            <ButtonBasic class="ma-2" text="ボタン" :backcolor="THEME_COLOR.primary" />
            <ButtonBasic class="ma-2" text="ボタン" :backcolor="THEME_COLOR.primary" color="#fff" />
            <ButtonBasic class="ma-2" text="ボタン" :backcolor="THEME_COLOR.primary" light />
            <ButtonBasic class="ma-2" text="ボタン" :backcolor="THEME_COLOR.primary" light border />
            <ButtonBasic class="ma-2" text="ボタン" :backcolor="THEME_COLOR.primary" light border disabled />
          </div>

          <h6>スタイルサンプル</h6>
          <div class="Sample" v-for="color in colors">
            <ButtonBasic class="FormBase ma-2" :backcolor="color" color="#fff" text="ボタン" />
            <ButtonBasic class="FormBase ma-2" :backcolor="color" color="#fff" befor-icon="mdi-button-cursor" />
            <ButtonBasic
              class="FormBase ma-2"
              :backcolor="color"
              color="#fff"
              text="ボタン"
              after-icon="mdi-button-cursor"
            />
            <ButtonBasic
              class="FormBase ma-2"
              :backcolor="color"
              color="#fff"
              disabled
              text="ボタン"
              after-icon="mdi-button-cursor"
            />
          </div>
        </section>
      </div>
    </LayoutTestReview>
  </LayoutTestArticle>
</template>

<script setup lang="ts">
/**===================================================================================================================
 * 
===================================================================================================================**/
import { THEME_COLOR } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/composables/constants'

const colors: string[] = [
  THEME_COLOR.primary,
  THEME_COLOR.secondary,
  THEME_COLOR.info,
  THEME_COLOR.success,
  THEME_COLOR.warning,
  THEME_COLOR.error,
]

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'ボタンテスト',
})
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
.FormBase {
  justify-content: center;
  border-radius: 10px;
  width: 100px;
  height: 36px !important;
}
</style>
