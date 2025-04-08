<template>
  <div class="Contents">
    <div>ログイン状況を確認して、未ログインの場合はログイン画面に飛ばす</div>
    <div>accountのrollがAdministrator系とtenantManager系でページが切り替わる</div>
    <div>ここのページはエントランスという形になる（defaultでテナントページ）</div>
    <v-btn variant="outlined"> Button </v-btn>
    <v-card text="ここのページはエントランスという形になる（defaultでテナントページ）" variant="outlined"></v-card>
    <v-chip variant="outlined"> Chip </v-chip>
  </div>
</template>

<script setup lang="ts">
/**===================================================================================================================
 * 
===================================================================================================================**/
const router = useRouter()
const initialize = ref(false)
const role = ref('test')

definePageMeta({
  layout: 'default',
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
}
</style>
