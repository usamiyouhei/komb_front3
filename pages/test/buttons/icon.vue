<template>
  <LayoutTestArticle title="アイコンボタン">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>ButtonIcon(@/components/button/Icon.vue)</h5>
          <h6>色</h6>
          <div class="Sample">
            <div v-for="item in positions" class="bd">
              <ButtonIcon icon="mdi-close" :backcolor="colors[1]" :color="'#fff'" :label="item" :position="item" />
            </div>
          </div>
          <h6>なし</h6>
          <div class="Sample">
            <div v-for="item in positions" class="bd">
              <ButtonIcon icon="mdi-close" :label="item" :position="item" />
            </div>
          </div>
          <h6>narrow</h6>
          <div class="Sample">
            <div v-for="item in positions" class="bd">
              <ButtonIcon icon="mdi-close" :label="item" :position="item" narrow />
            </div>
          </div>
          <h6>色&light</h6>
          <div class="Sample">
            <div v-for="item in positions" class="bd">
              <ButtonIcon icon="mdi-close" :backcolor="colors[1]" :label="item" :position="item" light />
            </div>
          </div>
          <h6>色&light&bold</h6>
          <div class="Sample">
            <div v-for="item in positions" class="bd">
              <ButtonIcon icon="mdi-close" :backcolor="colors[1]" :label="item" :position="item" light bold />
            </div>
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

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'ボタンテスト',
})

const positions: string[] = ['', 'left', 'right', 'top', 'bottom']

const colors: string[] = [
  THEME_COLOR.surface,
  THEME_COLOR.primary,
  THEME_COLOR.secondary,
  THEME_COLOR.info,
  THEME_COLOR.success,
  THEME_COLOR.warning,
  THEME_COLOR.error,
  '#5678ff',
  'red',
]

const arrow = ref(false)
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
.bd {
  //border: 1px solid #ccc;
  margin: 0 20px 8px 0;
}
</style>
