<template>
  <LayoutTestArticle title="ボタンテストエントランス">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>ButtonBasic(@/components/button/basic.vue)</h5>
          <p>アイコン・テキスト・アイコンを並ぶ、ボタン構成のベース<br />基本的なスタイルは外から設定する</p>
          <div class="Sample"></div>
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
  title: 'ボタンテスト',
})
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
</style>
