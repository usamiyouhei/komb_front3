<template>
  <LayoutTestArticle title="ページネーション">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>PartsPagination(@/components/parts/Pagination.vue)</h5>
          <p>Vuetifyそのままでも行けそうだが、表示領域に合わせて自動で、表示個数変えたいのでとりあえずラップ</p>
          <div class="Sample">
            <PartsPagination :page="input" :length="pageCount" @update:value="input = $event" />
          </div>
          {{ input }}
        </section>
      </div>
    </LayoutTestReview>
  </LayoutTestArticle>
</template>

<script setup lang="ts">
/**===================================================================================================================
 * 
===================================================================================================================**/
definePageMeta({
  layout: 'default',
})

useHead({
  title: 'パーツテスト',
})

const input = ref(1)
const pageCount = 50
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
</style>
