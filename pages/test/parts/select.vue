<template>
  <LayoutTestArticle title="セレクトメニュー">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>PartsSelectMenu(@/components/parts/PartsSelectMenu.vue)</h5>
          <p>リンクやテキスト、ボタン、フォーム入力から、セレクトリストをポップさせる</p>
          <h6 class="mt-4">SELECT_INPUT_TYPE.INPUT</h6>
          <div class="Sample">
            <PartsSelectMenu
              name="test1"
              class="mr-10"
              :width="200"
              :value="input"
              :items="items"
              :input-type="SELECT_INPUT_TYPE.INPUT"
              :select-type="SELECT_LIST_TYPE.RADIO"
              @update:value="onChange"
            />
            <PartsSelectMenu
              name="test2"
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
            <PartsSelectMenu
              name="test3"
              class="mr-10"
              :width="200"
              :value="input"
              :items="items"
              :input-type="SELECT_INPUT_TYPE.FRAME"
              :select-type="SELECT_LIST_TYPE.RADIO"
              @update:value="onChange"
            />
            <PartsSelectMenu
              name="test4"
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
            <PartsSelectMenu
              name="test5"
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
            <PartsSelectMenu
              name="test6"
              class="mr-10"
              text="リンク風"
              :value="input"
              :items="items"
              :input-type="SELECT_INPUT_TYPE.LINK"
              :select-type="SELECT_LIST_TYPE.RADIO"
              @update:value="onChange"
            />
            <PartsSelectMenu
              name="test7"
              class="mr-10"
              :value="input"
              :items="items"
              :input-type="SELECT_INPUT_TYPE.LINK"
              @update:value="onChange"
            />
          </div>
          <h6 class="mt-6">SELECT_INPUT_TYPE.TEXT</h6>
          <div class="Sample">
            <PartsSelectMenu
              name="test8"
              class="mr-10"
              text="テキスト"
              :value="input"
              :items="items"
              :select-type="SELECT_LIST_TYPE.RADIO"
              @update:value="onChange"
            />
            <PartsSelectMenu
              name="test9"
              class="mr-10"
              :value="input"
              :items="items"
              :input-type="SELECT_INPUT_TYPE.TEXT"
              :select-type="SELECT_LIST_TYPE.DEFAULT"
              @update:value="onChange"
            />
          </div>
          <h6 class="mt-6">高さ指定</h6>
          <div class="Sample">
            <PartsSelectMenu
              name="test10"
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
            <PartsSelectMenu
              name="test11"
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
definePageMeta({
  layout: 'default',
})

useHead({
  title: 'パーツテスト',
})

const items: ListButtonProps[] = [
  { text: 'シスアド', value: ROLE_TYPE.ADMINI, icon: { icon: 'mdi-shield-account' } },
  { text: 'アドミン', value: ROLE_TYPE.TENANT_ADMINI, icon: { icon: 'mdi-account-tie-hat' } },
]

const input = ref('')
function onChange(value: any) {
  input.value = value
}
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
</style>
