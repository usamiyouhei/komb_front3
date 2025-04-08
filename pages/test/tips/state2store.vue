<template>
  <LayoutTestArticle title="状態管理">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>useState</h5>
          <p>Nuxt2で採用されていた、store(Vuex)は廃止</p>
          <p>Nuxt3では、composablesフォルダとuseStateを使用して、状態管理を行う</p>
          <p>なお、設計思想的な物は定かではないが、composablesフォルダはstoreであるというのは若干語弊がある</p>
          <p>
            composablesフォルダ自体は、useStateに限らず、exportされた、変数・関数を全てグローバル上に設置され、<br />
            自動インポートされるフォルダと思っておけばOK
          </p>
          <PartsHighlight :value="content1" />
        </section>
        <section>
          <h5>defineStore(pinia)</h5>
          <p>stateをローカルやセッションに保存する場合は、piniaモジュールを利用している</p>
          <p>ローカルストレージに保存する事で、永続化が出来る</p>
          <p>なお、ローカルストレージなので、Clientサイドのみで実行する形にしないといけない<br />onMounted以後に使用するとか、if (process.client)で処理を制限するとか、{{ `<ClientOnly>` }}で囲むとかやり方は色々</p>
          <PartsHighlight :value="content2" />
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

const content1 = `
// 書き方は色々・以下はどちらも同じ結果、同じ使い方となる
type colorSettingState = {
  base: string
  theme: string
}

export const useColorSetting = () =>
  useState<colorSettingState>('color-setting', () => 
  {
    return { base: 'light', theme: 'default' }
  })

export function useColorSetting() {
  const state = useState<colorSettingState>('deley-status', () => 
  ({ base: 'light', theme: 'default' }))
  return {
    value:state.value
  }
}
// setpu内での呼び出し 
const colorSetting = useColorSetting() 
colorSetting.value.base

// template内での使用
<div :base="colorSetting.base"></div>

// 以下の書き方の場合、setpu内での呼び出しは同じだが、template内での使用時にもvalueが必要になるので注意
export function useColorSetting() {
  return useState<colorSettingState>('deley-status', () => 
  ({ base: 'light', theme: 'default' }))
}

// template内での使用
<div :base="colorSetting.value.base"></div>
`

const content2 = `
// useStateをストレージに保存する場合は以下のように書き換える

import { defineStore } from 'pinia'

type colorSettingState = {
  base: string
  theme: string
}

export const useColorSetting = defineStore(
  'color-setting',
  () => {
    const state: Ref<colorSettingState> = ref({
      base: 'light',
      theme: 'default',
    })
    return {
      value: state,
    }
  },
  {
    persist: process.client && {
      storage: localStorage,
    },
  }
)
// !注 以下にしてしまうと、リアクティブな値にならないので、NG
/*
  return {
    value: state.value,
  }
*/

// template内での使用は以下のvalue付きになる
<div :base="colorSetting.value.base"></div>
`

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
</style>
