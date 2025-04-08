<template>
  <LayoutTestArticle title="トグルボタン">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>ButtonToggleSet(@/components/button/ButtonToggle.vue)</h5>
          <h6>トグルボタン</h6>
          <p>ButtonIconをwrapした物、必要に応じてパターンを増やす</p>
          <p>ラジオ、チェックをさらにコンポーネント化するかも（セットだけで良いかもだけど）</p>
          <div class="Sample surfaceBG">
            <div v-for="color in colors">
              <ButtonToggle
                class="ma-1"
                value="ButtonA"
                :label="color ? color : 'ラジオボタン'"
                :icon="TOGGLE_TYPE.RADIO"
                :actived="input"
                :color="color ? color : undefined"
                @update:value="input = !input"
              />
              <ButtonToggle
                class="ma-1"
                value="ButtonB"
                :label="color ? color : 'チェックボックス'"
                :icon="TOGGLE_TYPE.CHECK"
                :actived="input"
                :color="color ? color : undefined"
                @update:value="input = !input"
              />
            </div>
          </div>
          <h6>外から、アイコンセット指定も可能(TOGGLE_TYPE.OTHER)</h6>
          <div class="Sample surfaceBG">
            <div v-for="color in colors">
              <ButtonToggle
                class="ma-1"
                value="ButtonB"
                :label="color ? color : 'カスタム'"
                :icon="TOGGLE_TYPE.OTHER"
                :icons="[
                  { icon: 'mdi-toggle-switch-variant', color: color || '#456' },
                  { icon: 'mdi-toggle-switch-variant-off', color: color || '#456' },
                ]"
                :actived="input"
                :color="color"
                @update:value="input = !input"
              />
            </div>
          </div>
          <h6>外から、アイコンセット指定も可能(TOGGLE_TYPE.CIRCLE)</h6>
          <div class="Sample surfaceBG">
            <div v-for="color in colors">
              <ButtonToggle
                value="ButtonB"
                class="ma-1"
                :label="color ? color : 'カスタム'"
                :icon="TOGGLE_TYPE.CIRCLE"
                :icons="[
                  { icon: 'mdi-bell-circle', color: color || '#456' },
                  { icon: 'mdi-bell-circle-outline', color: color || '#456' },
                ]"
                :actived="input"
                :color="color"
                @update:value="input = !input"
              />
            </div>
          </div>
          <h6>外から、アイコンセット指定も可能(TOGGLE_TYPE.SQUARE)</h6>
          <div class="Sample surfaceBG">
            <div v-for="color in colors">
              <ButtonToggle
                class="ma-1"
                value="ButtonB"
                :label="color ? color : 'カスタム'"
                :icon="TOGGLE_TYPE.SQUARE"
                :icons="[
                  { icon: 'mdi-account-box', color: color || '#456' },
                  { icon: 'mdi-account-box-outline', color: color || '#456' },
                ]"
                :actived="input"
                :color="color"
                @update:value="input = !input"
              />
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
// import { ToggleProps, TOGGLE_TYPE } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
// 2024.1.29 検証のため、import先を変更
import ToggleProps from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/button/ButtonToggle.vue'
import { TOGGLE_TYPE } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'ボタンテスト',
})

const input = ref(false)
const colors: string[] = ['primary', 'secondary', 'success', 'info', 'warning', '']
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
</style>
