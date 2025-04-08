<template>
  <LayoutTestArticle title="価格">
    <LayoutTestFormReview>
      <template v-slot:simple-const>ラベルなしのテキスト</template>
      <template v-slot:simple-variable>ラベルなしのテキスト</template>
      <template v-slot:inline-const>インラインのテキスト</template>
      <template v-slot:inline-variable>インラインのテキスト</template>
      <template v-slot:both-const>表示はインライン、ヒントは下</template>
      <template v-slot:both-variable>表示はインライン、ヒントは下</template>
      <template v-slot:default-const>基本フォーム</template>
      <template v-slot:default-variable>基本フォーム</template>
    </LayoutTestFormReview>
  </LayoutTestArticle>
</template>

<script setup lang="ts">
/**===================================================================================================================
 * 
===================================================================================================================**/
const router = useRouter()
const initialize = ref(false)
const role = ref('administrator')

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'フォームテスト',
})
onMounted(() => {
  initialize.value = true
})
const onClick = () => {
  // console.log(role.value)
  router.push('/')
}
</script>
