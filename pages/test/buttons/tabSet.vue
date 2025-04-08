<template>
  <LayoutTestArticle title="タブセット">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>ButtonTabSet(@/components/button/Tabset.vue)</h5>
          <p>タブ</p>
          <div class="Sample">
            <ButtonTabSet :value="tab" :items="items" @update:value="onChangeTab($event)" class="tabSet" />
          </div>
          <div class="Sample">
            <ButtonTabSet
              :value="tab"
              :items="items"
              activeBackColor="Primary"
              @update:value="onChangeTab($event)"
              class="tabSet"
            />
          </div>
          <div class="Sample">
            <ButtonTabSet
              :value="tab"
              :items="items"
              color="#fff"
              backColor="Secondary"
              activeBackColor="Secondary"
              margin="2px"
              round="12px"
              @update:value="onChangeTab($event)"
              class="tabSet"
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
import { type TabProps } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'ボタンテスト',
})
const tab: any = ref(1)
const items: TabProps[] = [
  { text: 'タブ1', value: 1 },
  { text: 'タブ2', value: 2 },
  { text: 'タブ3', value: 3 },
  { text: 'タブ4', value: 4 },
]

function onChangeTab(value: TabProps) {
  tab.value = value.value
}
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
</style>
