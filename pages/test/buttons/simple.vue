<template>
  <LayoutTestArticle title="シンプルボタン">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>ButtonSimple(@/components/button/Simple.vue)</h5>
          <p>テーマカラーのシンプルな汎用ボタン</p>
          <h6>default</h6>
          <div class="Sample">
            <ButtonSimple class="ma-2" text="ボタン" />
            <ButtonSimple class="ma-2" text="ボタン" befor-icon="mdi-button-cursor" />
          </div>
          <template v-for="color in colors">
            <h6>{{ color }}</h6>
            <div class="Sample">
              <div class="Flex">
                <ButtonSimple class="ma-2" :backcolor="color" text="ボタン" />
                <ButtonSimple class="ma-2" :backcolor="color" befor-icon="mdi-button-cursor" />
                <ButtonSimple class="ma-2" :backcolor="color" text="ボタン" after-icon="mdi-button-cursor" />
                <ButtonSimple class="ma-2" :backcolor="color" disabled text="ボタン" after-icon="mdi-button-cursor" />
              </div>
              <div class="Flex">
                <ButtonSimple class="ma-2" :backcolor="color" small text="ボタン" />
                <ButtonSimple class="ma-2" :backcolor="color" small befor-icon="mdi-button-cursor" />
                <ButtonSimple class="ma-2" :backcolor="color" small text="ボタン" after-icon="mdi-button-cursor" />
                <ButtonSimple
                  class="ma-2"
                  :backcolor="color"
                  small
                  disabled
                  text="ボタン"
                  after-icon="mdi-button-cursor"
                />
              </div>
            </div>
          </template>
          <h6>border</h6>
          <div class="Sample">
            <ButtonSimple class="ma-2" :backcolor="colors[0]" :color="colors[0]" border text="ボタン" />
            <ButtonSimple class="ma-2" :backcolor="colors[0]" border befor-icon="mdi-button-cursor" />
            <ButtonSimple
              class="ma-2"
              :backcolor="colors[0]"
              :border="true"
              text="ボタン"
              after-icon="mdi-button-cursor"
            />
            <ButtonSimple
              class="ma-2"
              :backcolor="colors[0]"
              disabled
              border
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
  THEME_COLOR.surface,
  THEME_COLOR.primary,
  THEME_COLOR.secondary,
  THEME_COLOR.info,
  THEME_COLOR.success,
  THEME_COLOR.warning,
  THEME_COLOR.error,
  '#666',
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
</style>
