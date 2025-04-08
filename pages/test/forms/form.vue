<template>
  <LayoutTestArticle title="フォームテスト">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>バリデーションのテスト</h5>
          <h6>サブタイトル</h6>
          <p>説明文</p>
          <div class="Sample">
            <FormInput
              placeholder="入力してください"
              label="半角制限"
              :data="formDatas.test1"
              :value="validationTest"
              :hint="'半角英数字で入力してください'"
              :base="custom"
              :rule="[RULE.required, RULE.alphanumeric]"
            />
            <ButtonSimple
              class="ml-2 mt-1-5"
              text="check"
              small
              @click="formDatas.test1.onCheck = 'check'"
              :backcolor="THEME_COLOR.primary"
            />
            <ButtonSimple
              class="ml-2 mt-1-5"
              text="reset"
              small
              @click="formDatas.test1.onCheck = 'clear'"
              :backcolor="THEME_COLOR.error"
            />
          </div>
          <p>{{ formDatas.test1.onCheck }} / {{ RULE.required }}</p>
        </section>
      </div>
    </LayoutTestReview>
  </LayoutTestArticle>
</template>

<script setup lang="ts">
/**===================================================================================================================
 * 
===================================================================================================================**/
import { type formReviewStatus } from '@/components/layout/test/FormReview.vue'
import {
  FORM_MODE,
  FORM_ITEM,
  type formItem,
  type baseProps,
} from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
definePageMeta({
  layout: 'default',
})

useHead({
  title: 'フォームテスト',
})

const formTest = useFormTest()
const initialize = ref(false)
const left: Ref<baseProps> = ref({ label: {} })
const right: Ref<baseProps> = ref({ label: {} })
const custom: Ref<baseProps> = ref({ label: {} })
const input = ref('')
const validationTest = ref('')

const formDatas: Ref<{ [key: string]: formItem }> = ref({
  test2: {
    name: 'test2',
    label: '半角制限',
    hint: '半角で入力してください',
    type: FORM_ITEM.INPUT,
  },
  test1: {
    name: 'test1',
    label: '半角英数制限',
    hint: '半角英数字で入力してください',
    type: FORM_ITEM.INPUT,
  },
  test3: {
    name: 'test3',
    label: '半角数字＆-制限',
    hint: '半角と-で入力してください',
    type: FORM_ITEM.INPUT,
  },
  test4: {
    name: 'test3',
    label: '半角数字制限',
    hint: '半角数字で入力してください',
    type: FORM_ITEM.INPUT,
  },
  test5: {
    name: 'test3',
    label: '日付フォーマット',
    hint: 'YYYY-MM-DD で入力してください',
    type: FORM_ITEM.INPUT,
  },
  test6: {
    name: 'test3',
    label: '時間フォーマット',
    hint: 'HH:mm:ss で入力してください',
    type: FORM_ITEM.INPUT,
  },
  test7: {
    name: 'test3',
    label: '日付時間フォーマット',
    hint: 'YYYY-MM-HH HH:mm:ss で入力してください',
    type: FORM_ITEM.INPUT,
  },
  test8: {
    name: 'test3',
    label: '半角文字数制限',
    hint: '半角8文字以上16文字以下で入力してください',
    type: FORM_ITEM.INPUT,
  },
  test9: {
    name: 'test3',
    label: '半角文字数制限min',
    hint: '半角8文字以上で入力してください',
    type: FORM_ITEM.INPUT,
  },
  test10: {
    name: 'test3',
    label: '半角文字数制限max',
    hint: '半角10文字以下で入力してください',
    type: FORM_ITEM.INPUT,
  },
  test11: {
    name: 'test3',
    label: '文字数制限',
    hint: '8文字以上16文字以下で入力してください',
    type: FORM_ITEM.INPUT,
  },
})

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
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
</style>
