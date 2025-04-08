<template>
  <LayoutTestArticle title="トグルセット">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>ButtonToggleSet(@/components/button/ToggleSet.vue)</h5>
          <h6>トグルセット</h6>
          <div class="Sample">
            <ButtonToggleSet
              v-for="color in colors"
              :value="input"
              @update:value="onChangeToggle($event)"
              class="ma-1"
              :items="items"
              :active-back-color="color"
            />
          </div>
          <div class="Sample">
            <ButtonToggleSet
              v-for="color in colors"
              :value="input"
              @update:value="onChangeToggle($event)"
              class="ma-1"
              :items="items2"
              :active-back-color="color"
            />
          </div>
          <div class="Sample">
            <ButtonToggleSet
              v-for="color in colors"
              :value="input"
              :inline="true"
              @update:value="onChangeToggle($event)"
              class="ma-1"
              :items="items"
              :active-back-color="color"
            />
          </div>
          <div class="Sample">
            <ButtonToggleSet
              v-for="color in colors"
              :value="input"
              :inline="true"
              @update:value="onChangeToggle($event)"
              class="ma-1"
              :items="items2"
              :active-back-color="color"
            />
          </div>
        </section>
        <section>
          <h6>ラベル</h6>
          <p>
            簡易的なラベル設定も出来るが、詳細調整は無理なので、フォーム等でラベル幅の体裁を揃えて使う場合は、FormBlank(@/components/form/Blank.vue)を使用する
          </p>
          <div class="Sample">
            <ButtonToggleSet
              v-for="color in colors"
              :value="input"
              @update:value="onChangeToggle($event)"
              class="ma-1"
              :items="items2"
              :active-back-color="color"
              :label="color"
            />
          </div>
          <div class="Sample">
            <ButtonToggleSet
              v-for="color in colors"
              :value="input"
              :inline="true"
              @update:value="onChangeToggle($event)"
              class="ma-1"
              :items="items2"
              :active-back-color="color"
              :label="color"
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
import { type ToggleSetProps } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'ボタンテスト',
})

const items: ToggleSetProps[] = [
  { icon: 'mdi-format-align-left', value: 1 },
  { icon: 'mdi-format-align-center', value: 2 },
  { icon: 'mdi-format-align-center', value: 3 },
  { icon: 'mdi-format-align-center', value: 4 },
]

const items2: ToggleSetProps[] = [
  { text: 'トグル-1', value: 1 },
  { text: 'トグル-2', value: 2 },
  { text: 'トグル-3', value: 3 },
  { text: 'トグル-4', value: 4 },
]

const colors: string[] = ['primary', 'secondary', 'success', 'info', 'warning']

const simple: ToggleSetProps[] = [{ value: 1 }, { value: 2 }]

const input: any = ref(2)

function onChangeToggle(value: ToggleSetProps) {
  input.value = value.value
}
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
</style>
