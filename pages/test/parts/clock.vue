<template>
  <LayoutTestArticle title="サンプル">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>PartsPagination(@/components/parts/Pagination.vue)</h5>
          <!-- 時間を表示 -->
          <div class="Sample">
            <PartsClock :selectType="CLOCK_TYPE.DISPLAY" />
          </div>
          <!-- インプットをクリックしてタイムピッカーを表示 -->
          <div class="Sample">
            <PartsClock :selectType="CLOCK_TYPE.INPUT_DIAL" :fixedRect="dialogFixedRect" />
          </div>
          <!-- タイムピッカーをそのまま表示 -->
          <div class="Sample">
            <PartsClock :selectType="CLOCK_TYPE.DIAL" :fixedRect="dialogFixedRect" />
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
import {
  CLOCK_TYPE,
  type FixedSize,
} from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'パーツテスト',
})

const dialogFixedRect: Ref<FixedSize> = ref({
  justify: 'center',
  align: 'center',
  offsetX: '0px',
  offsetY: '0px',
  width: '330px',
  height: '420px',
})
</script>
<style lang="scss" scoped>
@use '../../../assets/test';
</style>
