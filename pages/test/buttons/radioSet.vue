<template>
  <LayoutTestArticle title="ラジオボタンセット">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>ButtonRadioSet(@/components/button/RadioSet.vue)</h5>
          <h6>default</h6>
          <div class="Sample">
            <ButtonRadioSet :items="items" v-model:value="input" />
          </div>
          <h6>inline</h6>
          <div class="Sample">
            <ButtonRadioSet :items="items" :inline="true" :value="input" @update:value="input = $event" />
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
const items: ListButtonProps[] = [
  { text: 'アイテム1', value: 1 },
  { text: 'アイテム2', value: 2 },
  { text: 'アイテム3', value: 3 },
  { text: 'アイテム4', value: 4 },
]

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'ボタンテスト',
})
const input = ref(2)
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
</style>
