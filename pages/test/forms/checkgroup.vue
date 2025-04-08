<template>
  <LayoutTestArticle title="チェックグループ">
    <LayoutTestFormReview @update:status="onChangeStatus($event)">
      <template v-slot:simple-const>
        <FormCheckGroup
          placeholder="入力してください"
          :hint="hint('ラベルなしのテキストabcdeyp')"
          :error="hint('なんかエラー')"
          :rule="[RULE.required]"
          :base="left"
          :mode="FORM_MODE.SIMPLE"
          :items="items"
          @update:value="items = $event"
          inline
        />
      </template>
      <template v-slot:simple-variable>
        <FormCheckGroup
          placeholder="入力してください"
          :hint="hint('ラベルなしのテキストabcdeyp')"
          :base="right"
          :mode="FORM_MODE.SIMPLE"
          :items="items"
          @update:value="items = $event"
          inline
        />
      </template>
      <template v-slot:inline-const>
        <FormCheckGroup
          placeholder="入力してください"
          :hint="hint('インラインのテキスト')"
          :base="left"
          :rule="[RULE.required]"
          :mode="FORM_MODE.INLINE"
          :items="items"
          inline
          @update:value="items = $event"
        />
      </template>
      <template v-slot:inline-variable>
        <FormCheckGroup
          placeholder="入力してください"
          :hint="hint('インラインのテキスト')"
          :base="right"
          :mode="FORM_MODE.INLINE"
          :items="items"
          inline
          @update:value="items = $event"
        />
      </template>
      <template v-slot:both-const>
        <FormCheckGroup
          placeholder="入力してください"
          :hint="hint('表示はインライン、ヒントは下')"
          :error="hint('なんかエラー')"
          :base="left"
          :mode="FORM_MODE.BOTH"
          :items="items"
          @update:value="items = $event"
        />
      </template>
      <template v-slot:both-variable>
        <FormCheckGroup
          placeholder="入力してください"
          :hint="hint('表示はインライン、ヒントは下')"
          :base="right"
          :mode="FORM_MODE.BOTH"
          :items="items"
          @update:value="items = $event"
        />
      </template>
      <template v-slot:default-const>
        <FormCheckGroup
          placeholder="入力してください"
          :rule="[RULE.required]"
          :error="hint('なんかエラー')"
          :hint="hint('基本フォーム')"
          :base="left"
          :mode="FORM_MODE.DEFAULT"
          :items="items"
          @update:value="items = $event"
        />
      </template>
      <template v-slot:default-variable>
        <FormCheckGroup
          placeholder="入力してください"
          :hint="hint('基本フォーム')"
          :base="right"
          :mode="FORM_MODE.DEFAULT"
          :items="items"
          @update:value="items = $event"
        />
      </template>
      <section>
        <p>
          {{ formTest.state.label }}
          {{ formTest.state.labelWidth }}
          {{ formTest.state.position }}
          {{ formTest.state.edit }}
          {{ formTest.state.hint }}
          {{ formTest.state.bold }}
          {{ formTest.state.align }}
        </p>
        <h6>チェックボックスグループは、フレームで囲う事がないので、bothかdefault推奨</h6>
      </section>
    </LayoutTestFormReview>
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
import type { CheckBoxSetProps } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
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

const items: Ref<CheckBoxSetProps[]> = ref([
  { text: 'シスアド', value: ROLE_TYPE.ADMINI, checked: false, icon: { icon: 'mdi-shield-account' } },
  { text: 'アドミン', value: ROLE_TYPE.TENANT_ADMINI, checked: false, icon: { icon: 'mdi-account-tie-hat' } },
])

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
