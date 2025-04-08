<template>
  <div class="departmentsList">
    <div class="ListTitle">
    <v-icon>mdi-domain</v-icon>
    <h3>事業部一覧</h3>
    
  </div>
  
  <div class="contents">
  <ButtonBasic
      class="ma-2"
      :style="{
      marginLeft: '10px',
      borderRadius:'4px',
      width:'100px',
      backgroundColor: useColor('line'),
      color: useColor('color'),
    }"
      text="事業部を追加"
      @click="onOpen(true)"
      narrow
    />
  </div>
  </div>
</template>

<script setup lang="ts">

import {
  type VariableSize,
  type FixedSize,
} from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
import { type ListButtonProps } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
import {
  type baseProps,
  defaultBase,
} from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
import { ROLE_TYPE } from '@/composables/constants'
import { type ModalSwitch } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/types'
import { storeToRefs } from 'pinia'
import { type Tenant } from '~/types/api'
/**===================================================================================================================
 * 
 ===================================================================================================================**/
 definePageMeta({
  layout: 'custom',
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
//------------------------------------------------------------------------------------------------------------
//computed
//------------------------------------------------------------------------------------------------------------
/*
const counter: Ref<number> = useState('counter', () => 500)

// computedによりcounter変数の監視が行われる
const doubleCount = computed(() => {
  return counter.value * 2
})
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
.departmentsList{
 position: relative;
 margin-top: 20px;
 width: 95%;
  .ListTitle{
    display: flex;
    align-items: center;
    margin-left: 30px;
    border-bottom: 1px solid #333;
    h3 {
      padding-left: 10px;
    }
  }
}
.contents {
  margin-left: 50px;
}
</style>