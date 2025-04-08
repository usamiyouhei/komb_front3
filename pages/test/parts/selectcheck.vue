<template>
  <LayoutTestArticle title="セレクトメニュー">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>PartsSelectMenu(@/components/parts/PartsSelectMenu.vue)</h5>
          <p>リンクやテキスト、ボタン、フォーム入力から、セレクトリストをポップさせる</p>
          <h6 class="mt-4">SELECT_INPUT_TYPE.INPUT</h6>
          <div class="Sample">
            <PartsSelectCheck
              class="mr-10"
              :width="200"
              :value="input"
              :items="items"
              :input-type="SELECT_INPUT_TYPE.INPUT"
              :select-type="SELECT_LIST_TYPE.RADIO"
              @update:value="onChange"
            />
            <PartsSelectCheck
              class="mr-10"
              :width="300"
              :value="input"
              :items="items"
              :input-type="SELECT_INPUT_TYPE.INPUT"
              fit
              @update:value="onChange"
            />
          </div>
          <h6 class="mt-6">SELECT_INPUT_TYPE.FRAME</h6>
          <div class="Sample">
            <PartsSelectCheck
              class="mr-10"
              :width="200"
              :value="input"
              :items="items"
              :input-type="SELECT_INPUT_TYPE.FRAME"
              :select-type="SELECT_LIST_TYPE.RADIO"
              @update:value="onChange"
            />
            <PartsSelectCheck
              class="mr-10"
              :width="300"
              :value="input"
              :items="items"
              :input-type="SELECT_INPUT_TYPE.FRAME"
              fit
              @update:value="onChange"
            />
          </div>
          <h6 class="mt-6">SELECT_INPUT_TYPE.BUTTON</h6>
          <div class="Sample">
            <PartsSelectCheck
              class="mr-10"
              text="ボタン風"
              :value="input"
              :items="items"
              :input-type="SELECT_INPUT_TYPE.BUTTON"
              :select-type="SELECT_LIST_TYPE.RADIO"
              @update:value="onChange"
            />
          </div>
          <h6 class="mt-6">SELECT_INPUT_TYPE.LINK</h6>
          <div class="Sample">
            <PartsSelectCheck
              class="mr-10"
              text="リンク風"
              :value="input"
              :items="items"
              :input-type="SELECT_INPUT_TYPE.LINK"
              :select-type="SELECT_LIST_TYPE.RADIO"
              @update:value="onChange"
            />
            <PartsSelectCheck
              class="mr-10"
              :value="input"
              :items="items"
              :input-type="SELECT_INPUT_TYPE.LINK"
              @update:value="onChange"
            />
          </div>
          <h6 class="mt-6">SELECT_INPUT_TYPE.TEXT</h6>
          <div class="Sample">
            <PartsSelectCheck
              class="mr-10"
              text="テキスト"
              :value="input"
              :items="items"
              :select-type="SELECT_LIST_TYPE.RADIO"
              @update:value="onChange"
            />
            <PartsSelectCheck class="mr-10" :value="input" :items="items" @update:value="onChange" />
          </div>
          <h6 class="mt-6">高さ指定</h6>
          <div class="Sample">
            <PartsSelectCheck
              class="mr-10"
              :width="200"
              :height="160"
              :value="input"
              :items="items"
              :input-type="SELECT_INPUT_TYPE.INPUT"
              :select-type="SELECT_LIST_TYPE.RADIO"
              :layout="POSITION.TOP"
              @update:value="onChange"
            />
            <PartsSelectCheck
              class="mr-10"
              :width="300"
              :height="100"
              :value="input"
              :items="items"
              :input-type="SELECT_INPUT_TYPE.INPUT"
              :layout="POSITION.TOP"
              fit
              @update:value="onChange"
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
import { type ListButtonProps } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
import {
  SELECT_INPUT_TYPE,
  SELECT_LIST_TYPE,
} from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
import { type CheckBoxSetProps } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'パーツテスト',
})
const items: CheckBoxSetProps[] = [
  { text: 'シスアド', value: ROLE_TYPE.ADMINI, icon: { icon: 'mdi-shield-account' }, checked: false },
  { text: 'アドミン', value: ROLE_TYPE.TENANT_ADMINI, icon: { icon: 'mdi-account-tie-hat' }, checked: false },
]

const input = ref('')
function onChange(value: any) {
  // console.log('結果は何？', value)
  input.value = value
}
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
</style>
