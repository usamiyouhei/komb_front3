<template>
  <LayoutTestArticle title="時刻（セレクト）">
    <LayoutTestFormReview @update:status="onChangeStatus($event)">
      <template v-slot:simple-const>
        <FormSelectTime
          v-model:value="input"
          placeholder="入力してください"
          :hint="hint('ラベルなしのテキストabcdeyp')"
          :base="left"
          :mode="FORM_MODE.SIMPLE"
          :hourTime="hour"
          :minuteTime="minute"
          :secondTime="second"
        />
      </template>
      <template v-slot:simple-variable>
        <FormSelectTime
          v-model:value="input"
          placeholder="入力してください"
          :hint="hint('ラベルなしのテキストabcdeyp')"
          :base="right"
          :mode="FORM_MODE.SIMPLE"
          :hourTime="hour"
          :minuteTime="minute"
          :secondTime="second"
        />
      </template>
      <template v-slot:inline-const>
        <FormSelectTime
          v-model:value="input"
          placeholder="入力してください"
          :hint="hint('インラインのテキスト')"
          :base="left"
          :rule="[RULE.required]"
          :mode="FORM_MODE.INLINE"
          :hourTime="hour"
          :minuteTime="minute"
          :secondTime="second"
        />
      </template>
      <template v-slot:inline-variable>
        <FormSelectTime
          v-model:value="input"
          placeholder="入力してください"
          :hint="hint('インラインのテキスト')"
          :base="right"
          :mode="FORM_MODE.INLINE"
          :hourTime="hour"
          :minuteTime="minute"
          :secondTime="second"
        />
      </template>
      <template v-slot:both-const>
        <FormSelectTime
          v-model:value="input"
          placeholder="入力してください"
          :hint="hint('表示はインライン、ヒントは下')"
          :error="hint('なんかエラー')"
          :base="left"
          :mode="FORM_MODE.BOTH"
          :hourTime="hour"
          :minuteTime="minute"
          :secondTime="second"
        />
      </template>
      <template v-slot:both-variable>
        <FormSelectTime
          v-model:value="input"
          placeholder="入力してください"
          :hint="hint('表示はインライン、ヒントは下')"
          :base="right"
          :mode="FORM_MODE.BOTH"
          :hourTime="hour"
          :minuteTime="minute"
          :secondTime="second"
        />
      </template>
      <template v-slot:default-const>
        <FormSelectTime
          v-model:value="input"
          placeholder="入力してください"
          :rule="[RULE.required]"
          :error="hint('なんかエラー')"
          :hint="hint('基本フォーム')"
          :base="left"
          :mode="FORM_MODE.DEFAULT"
          :hourTime="hour"
          :minuteTime="minute"
          :secondTime="second"
        />
      </template>
      <template v-slot:default-variable>
        <FormSelectTime
          v-model:value="input"
          placeholder="入力してください"
          :hint="hint('基本フォーム')"
          :base="right"
          :mode="FORM_MODE.DEFAULT"
          :hourTime="hour"
          :minuteTime="minute"
          :secondTime="second"
        />
      </template>
    </LayoutTestFormReview>
  </LayoutTestArticle>
</template>

<script setup lang="ts">
import { type formReviewStatus } from '@/components/layout/test/FormReview.vue'
import {
  FORM_MODE,
  FORM_ITEM,
  type formItem,
  type baseProps,
} from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'

const formTest = useFormTest()
const initialize = ref(false)
const left: Ref<baseProps> = ref({ label: {} })
const right: Ref<baseProps> = ref({ label: {} })
const custom: Ref<baseProps> = ref({ label: {} })
const input = ref('')

const hour = [
  { text: '00', value: '00' },
  { text: '01', value: '01' },
  { text: '02', value: '02' },
  { text: '03', value: '03' },
  { text: '04', value: '04' },
  { text: '05', value: '05' },
  { text: '06', value: '06' },
  { text: '07', value: '07' },
  { text: '08', value: '08' },
  { text: '09', value: '09' },
  { text: '10', value: '10' },
  { text: '11', value: '11' },
  { text: '12', value: '12' },
  { text: '13', value: '13' },
  { text: '14', value: '14' },
  { text: '15', value: '15' },
  { text: '16', value: '16' },
  { text: '17', value: '17' },
  { text: '18', value: '18' },
  { text: '19', value: '19' },
  { text: '20', value: '20' },
  { text: '21', value: '21' },
  { text: '22', value: '22' },
  { text: '23', value: '23' },
]

const minute = [
  { text: '00', value: '00' },
  { text: '15', value: '15' },
  { text: '30', value: '30' },
  { text: '45', value: '45' },
]

const second = [
  { text: '00', value: '00' },
  { text: '15', value: '15' },
  { text: '30', value: '30' },
  { text: '45', value: '45' },
]

custom.value = {
  label: {
    width: 80,
    weight: 'normal',
    align: 'flex-start',
  },
  edit: true,
  mode: FORM_MODE.INLINE,
}

//------------------------------------------------------------------------------------------------------------
//watch
//------------------------------------------------------------------------------------------------------------
watch(
  () => formTest.state,
  (state) => {
    left.value = {
      label: {
        text: state.label,
        width: state.labelWidth,
        weight: state.bold,
        align: state.align,
      },
      edit: formTest.state.edit === 'left',
    }
    right.value = {
      label: {
        text: state.label,
        width: state.labelWidth,
        weight: state.bold,
        align: state.align,
      },
      edit: state.edit === 'right',
    }
  },
  {
    immediate: true,
    deep: true,
  }
)

definePageMeta({
  layout: 'default',
})
onMounted(() => {
  initialize.value = true
})

function hint(str: string) {
  if (formTest.state.hint) {
    return str
  } else {
    return undefined
  }
}

function onChangeStatus(value: formReviewStatus) {
  // console.log(value)
}

function selectTime(time: any) {
  input.value = time
}
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
.userSelect {
  user-select: text;
}
</style>
