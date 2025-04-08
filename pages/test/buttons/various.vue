<template>
  <LayoutTestArticle title="色々なボタン">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>ButtonArrow(@/components/button/Arrow.vue)</h5>
          <p><v-icon icon="mdi-chevron-down" size="24" />がくるくるするボタン</p>
          <h6>color</h6>
          <div class="Sample">
            <ButtonArrow
              v-for="(color, key, i) in colors"
              class="ma-2"
              :text="'ボタン' + color.toString()"
              :actived="arrow"
              :backcolor="color"
              @click="arrow = !arrow"
            />
          </div>
          <h6>幅指定</h6>
          <div class="Sample">
            <ButtonArrow class="ma-2" text="ボタン" :actived="arrow" @click="arrow = !arrow" />
            <ButtonArrow class="ma-2" text="ボタン" :actived="arrow" @click="arrow = !arrow" :width="200" />
            <ButtonArrow class="ma-2" text="ボタン" :actived="arrow" @click="arrow = !arrow" :width="300" />
          </div>
        </section>
        <section>
          <h5>ButtonIcon(@/components/button/Icon.vue)</h5>
          <h6>enum ICONS</h6>
          <p>よく使うアイコンは、enumで登録</p>
          <div class="Sample">
            <div v-for="(icon, i) in icons" class="bd">
              <ButtonIcon :icon="icon" :size="30" :label="keys[i]" />
            </div>
          </div>
        </section>
        <section>
          <h5>ButtonInnerForm(@/components/button/InnerForm.vue)</h5>
          <h6>フォーム内ボタン</h6>
          <p>色は指定しない場合は、自動でプライマリーカラー</p>
          <div class="Sample Test">
            <div v-for="(item, i) in formIons" class="form">
              <ButtonInnerForm :icon="item.icon" :size="item.size" :width="item.width" />
            </div>
          </div>
          <div class="Sample Admin">
            <div v-for="(item, i) in formIons" class="form">
              <ButtonInnerForm :icon="item.icon" :size="item.size" :width="item.width" />
            </div>
          </div>
          <div class="Sample Tenant">
            <div v-for="(item, i) in formIons" class="form">
              <ButtonInnerForm :icon="item.icon" :size="item.size" :width="item.width" />
            </div>
          </div>
          <div class="Sample">
            <div v-for="(item, i) in formIons" class="form">
              <ButtonInnerForm :icon="item.icon" :size="item.size" :width="item.width" />
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

const toggle = ref(false)
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

const icons: string[] = [ICONS.CLOSE, ICONS.COG, ICONS.MENU, ICONS.PENCIL, ICONS.PENCIL_BOX, ICONS.RESIZE]
const formIons: { icon: string; size?: number; width?: number }[] = [
  { icon: FORM_ICONS.CLOSE },
  { icon: FORM_ICONS.UP, size: 34, width: 24 },
  { icon: FORM_ICONS.DOWN, size: 34, width: 24 },
  { icon: FORM_ICONS.LEFT, size: 34, width: 24 },
  { icon: FORM_ICONS.RIGHT, size: 34, width: 24 },
  { icon: FORM_ICONS.DATE },
  { icon: FORM_ICONS.TIME },
  { icon: FORM_ICONS.EYE_ON, size: 26, width: 36 },
  { icon: FORM_ICONS.MAIL },
  { icon: FORM_ICONS.YEN },
  { icon: FORM_ICONS.CELLPHONE },
  { icon: FORM_ICONS.PHONE },
]

const keys = Object.keys(ICONS)
const arrow = ref(false)
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
// @import '@/assets/form.scss';
@use '../../../assets/variables.scss';

.bd {
  //border: 1px solid #ccc;
  margin: 0 20px 8px 0;
}
.form {
  position: relative;
  width: 80px;
  height: variables.$input-height;
  border: variables.$input-border;
  border-radius: variables.$input-radius;
}
</style>
