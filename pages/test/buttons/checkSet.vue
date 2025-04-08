<template>
  <LayoutTestArticle title="チェックボタンセット">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>ButtonCheckSet(@/components/button/CheckSet.vue)</h5>
          <h6>default</h6>
          <div class="Sample">
            <ButtonCheckSet :items="items" @update:value="items = $event" />
          </div>
          <h6>inline</h6>
          <div class="Sample">
            <ButtonCheckSet :items="items" :inline="true" @update:value="items = $event" />
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
import { type CheckBoxSetProps } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'

const items: Ref<CheckBoxSetProps[]> = ref([
  { text: 'アイテム1', value: 1, checked: false },
  { text: 'アイテム2', value: 2, checked: false },
  { text: 'アイテム3', value: 3, checked: false },
  { text: 'アイテム4', value: 4, checked: false },
])

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
