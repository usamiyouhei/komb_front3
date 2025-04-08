<template>
  <LayoutTestArticle title="ユーティリティ関数">
    <LayoutTestReview>
      <div class="Contents">
        <p>随時追加</p>
        <section>
          <h5>useActiveRect(/@composables/utility.ts)</h5>
          <p>lock等でのマスクのrectを取得するuse系関数</p>
          <p>level=0~4の指定で取得する領域が変わる</p>
          <p class="errorTXT">返値は、pxや%が付いた文字列となる</p>
          <h6>
            useActiveRect(level:number):{ top:string='0px', left:string='0px', width:string='100%', height:string='100%'
            }
          </h6>
          <PartsHighlight
            :value="`
// 全画面
useActiveRect(0)
// ヘッダー以外
useActiveRect(1)
// ヘッダー＆ローカルヘッダー以外
useActiveRect(2)
// ヘッダー＆ローカルヘッダー＆メニュー以外
useActiveRect(3)
// ヘッダー＆ローカルヘッダー＆メニュー＆ローカルメニュー以外
useActiveRect(4)
          `"
          />
        </section>
        <section>
          <h5>useActiveRect(/@composables/utility.ts)</h5>
          <p>ModalWindow等で稼働領域の計算に使うrectを取得するuse系関数</p>
          <p>level=0~4の指定で取得する領域が変わる</p>
          <p class="errorTXT">返値は、数値となる</p>
          <h6>
            useActiveRectNum(level:number):{ top:number = 0, left:number = 0, width:number = 1024, height:number = 1024
            }
          </h6>
          <PartsHighlight
            :value="`
// 全画面
useActiveRectNum(0)
// ヘッダー以外
useActiveRectNum(1)
// ヘッダー＆ローカルヘッダー以外
useActiveRectNum(2)
// ヘッダー＆ローカルヘッダー＆メニュー以外
useActiveRectNum(3)
// ヘッダー＆ローカルヘッダー＆メニュー＆ローカルメニュー以外
useActiveRectNNum(4)
          `"
          />
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

const content1 = ` // 書き方は色々・以下はどちらも同じ結果、同じ使い方となる
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

const content2 = ` // useStateをストレージに保存する場合は以下のように書き換える

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
