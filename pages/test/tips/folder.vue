<template>
  <LayoutTestArticle title="フォルダー構成">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>フォルダー構成とそれぞれの役割説明</h5>
          <p>随時更新（説明へのリンク、アコーディオン化あとでやる）</p>
          <ul>
            <li>
              <div class="head">
                <h1 class="bold">components</h1>
                <p>コンポーネント</p>
              </div>
              <ul>
                <li>
                  <div class="head">
                    <h2 class="bold">button</h2>
                    <p>各種ボタンコンポーネント</p>
                  </div>
                </li>
                <li>
                  <div class="head">
                    <h2 class="bold">form</h2>
                    <p>各種フォームコンポーネント</p>
                  </div>
                </li>
                <li>
                  <div class="head">
                    <h2 class="bold">layout</h2>
                    <p>レイアウト用コンポーネント</p>
                  </div>
                </li>
                <li>
                  <div class="head">
                    <h4>menu</h4>
                    <p>保留</p>
                  </div>
                </li>
                <li>
                  <div class="head">
                    <h2 class="bold">parts</h2>
                    <p>各種部品コンポーネント</p>
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <div class="head">
                <h1 class="bold">composables</h1>
                <p></p>
              </div>
            </li>
            <li>
              <div class="head">
                <h1>helpers</h1>
                <p></p>
              </div>
            </li>
            <li>
              <div class="head">
                <h1 class="bold">layouts</h1>
                <p></p>
              </div>
            </li>
            <li>
              <div class="head">
                <h1>middleware</h1>
                <p></p>
              </div>
            </li>
            <li>
              <div class="head">
                <h1 class="bold">pages</h1>
                <p></p>
              </div>
            </li>
            <li>
              <div class="head">
                <h1>plugins</h1>
                <p></p>
              </div>
            </li>
            <li>
              <div class="head">
                <h1>public</h1>
                <p></p>
              </div>
            </li>
            <li>
              <div class="head">
                <h1>server</h1>
                <p></p>
              </div>
            </li>
            <li>
              <div class="head">
                <h1>spec</h1>
                <p></p>
              </div>
            </li>
            <li>
              <div class="head">
                <h1>store</h1>
                <p></p>
              </div>
            </li>
            <li>
              <div class="head">
                <h1 class="bold">types</h1>
                <p></p>
              </div>
            </li>
          </ul>
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
  title: 'ヒントとコツ',
})
//------------------------------------------------------------------------------------------------------------
// 引数
//------------------------------------------------------------------------------------------------------------

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
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
ul {
  margin-bottom: 6px;
  li {
    margin-bottom: 12px;
  }
  .head {
    display: flex;
    margin-bottom: 6px;
  }
  h1 {
    font-size: 16px;
    line-height: 14px;
    font-weight: normal;
    color: #999;
  }
  h2 {
    font-size: 14px;
    line-height: 12px;
    font-weight: normal;
    color: #999;
  }
  h3 {
    font-size: 12px;
    line-height: 12px;
    font-weight: normal;
    color: #999;
  }
  h4 {
    font-size: 12px;
    line-height: 12px;
    font-weight: normal;
    color: #999;
  }
  .bold {
    font-weight: bold;
    color: #111;
  }
  p {
    margin: 0 0 0 10px;
    font-size: 12px;
    line-height: 12px;
  }
}
</style>
