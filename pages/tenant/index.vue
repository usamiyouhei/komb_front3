<template>
  <div class="Contents">
    <h2>株式会社テスト社</h2>
    <div class="news">
      <p>お知らせ</p>
  </div>
  </div>
</template>

<script setup lang="ts">
/**===================================================================================================================
 * 
===================================================================================================================**/
const router = useRouter()
const initialize = ref(false)
const role = ref('tenant')

definePageMeta({
  layout: 'custom',
})

useHead({
  title: 'エントランス',
})
const onClick = () => {
  console.log(role.value)
  router.push('/')
}

const parameterItems = [
  { text: '1日', value: 1, default: 'true' },
  { text: '2日', value: 2 },
]
</script>

<style lang="scss" scoped>
.Contents {
  position: relative;
  width: 100%;
  height: 1000px;
  padding: 24px 32px;
  .news {
    width: 90%;
    height: 20vh;
    border: 1px solid #333;
    margin-top: 10px;
  }
}
</style>
