<template>
  <LayoutTestArticle title="日付操作">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>dayjs(<NuxtLink to="https://nuxt.com/modules/dayjs">https://nuxt.com/modules/dayjs</NuxtLink>)</h5>
          <p>
            date-fns(@nuxtjs/date-fns)を使いたかったがNuxt3にまだ対応していなかった為断念<br />
            無理やり使う事もできるが、今回はNuxt3のモジュールとして推奨されているday.jsを使用する
          </p>
          <p>
            参考記事 :
            <NuxtLink to="https://www.wakuwakubank.com/posts/743-javascript-dayjs/#index_id9" target="blank"
              >Day.jsで日付操作(比較, 差分, フォーマット)</NuxtLink
            >
          </p>
          <div class="Flex mb-4">
            <ButtonSimple text="現在時間を取得" @click="onGetNow()" small class="ml-2" />
          </div>
          <h6>日本時間を(YYYY-MM-DD HH:mm:ss)で表示</h6>
          <div class="Sample">
            {{ now?.format('YYYY-MM-DD HH:mm:ss') }}
          </div>
          <h6>日本時間をYYYY年MM月DD日(dddd)で表示</h6>
          <div class="Sample">
            {{ now?.format('YYYY年MM月DD日(dddd)') }}
          </div>
          <h6>3日後,12日後,15日後</h6>
          <div class="Sample">
            {{ now?.add(3, 'd').format('YYYY/MM/DD') }}
            {{ now?.add(12, 'd').format('YYYY/MM/DD') }}
            {{ now?.add(15, 'd').format('YYYY/MM/DD') }}
          </div>
          <h6>3日前,12日前,15日前</h6>
          <div class="Sample">
            {{ now?.subtract(3, 'd').format('YYYY/MM/DD') }}
            {{ now?.subtract(12, 'd').format('YYYY/MM/DD') }}
            {{ now?.subtract(15, 'd').format('YYYY/MM/DD') }}
          </div>
          <h6>月の始まりと終わり、週の始まりと終わり</h6>
          <div class="Sample">
            <div>
              {{ now?.startOf('month').format('YYYY年MM月DD日(dddd)') }}～{{
                now?.endOf('month').format('YYYY年MM月DD日(dddd)')
              }}<br />
              {{ now?.startOf('week').format('YYYY年MM月DD日(dddd)') }}～{{
                now?.endOf('week').format('YYYY年MM月DD日(dddd)')
              }}
            </div>
          </div>

          <p>差分とったりも出来るので、必要な時に追記します</p>
        </section>
      </div>
    </LayoutTestReview>
  </LayoutTestArticle>
</template>

<script setup lang="ts">
/**===================================================================================================================
 * 
 ===================================================================================================================**/
import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'
dayjs.locale(ja)

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'ヒントとコツ',
})
//------------------------------------------------------------------------------------------------------------
// 引数
//------------------------------------------------------------------------------------------------------------
const now: Ref<dayjs.Dayjs | undefined> = ref()

now.value = dayjs() // 現在の日付情報を取得

//------------------------------------------------------------------------------------------------------------
// 定数・変数（state）
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
// ライフサイクル
//------------------------------------------------------------------------------------------------------------
/*
onBeforeMount(() => {
  //記憶した位置、サイズでの復帰を可能にする
})

onMounted(() => {
  //window.addEventListener('resize', onGetPosition)
})

onBeforeUnmount(() => {
  //window.removeEventListener('resize', onGetPosition)
})
*/
//------------------------------------------------------------------------------------------------------------
//watch
//------------------------------------------------------------------------------------------------------------
/*
watch(
  () => props.value,
  (value) => {
    input.value = value
  }
)
*/
//------------------------------------------------------------------------------------------------------------
// エミット
//------------------------------------------------------------------------------------------------------------
/*
const emits = defineEmits<{ (e: 'update:value', item: any): void }>()
const input = ref(props.value)

function onChange(value: any) {
  input.value = value
  emits('update:value', value)
}
*/

//------------------------------------------------------------------------------------------------------------
// メソッド
//------------------------------------------------------------------------------------------------------------
function onGetNow() {
  now.value = dayjs()
}
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
</style>
