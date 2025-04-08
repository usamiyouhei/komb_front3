<template>
  <LayoutTestArticle title="テキストエリア">
    <LayoutTestFormReview @update:status="onChangeStatus($event)">
      <template v-slot:simple-const>
        <FormTextArea
          v-model:value="input"
          placeholder="入力してください"
          :hint="hint('ラベルなしのテキストabcdeyp')"
          :error="hint('なんかエラー')"
          :rule="[RULE.required]"
          :base="left"
          :row="5"
          :mode="FORM_MODE.SIMPLE"
        />
      </template>
      <template v-slot:simple-variable>
        <FormTextArea
          v-model:value="input"
          placeholder="入力してください"
          :hint="hint('ラベルなしのテキストabcdeyp')"
          :base="right"
          :row="5"
          :mode="FORM_MODE.SIMPLE"
        />
      </template>
      <template v-slot:inline-const>
        <FormTextArea
          v-model:value="input"
          placeholder="入力してください"
          :hint="hint('インラインのテキスト')"
          :base="left"
          :rule="[RULE.required]"
          :mode="FORM_MODE.INLINE"
        />
      </template>
      <template v-slot:inline-variable>
        <FormTextArea
          v-model:value="input"
          placeholder="入力してください"
          :hint="hint('インラインのテキスト')"
          :base="right"
          :mode="FORM_MODE.INLINE"
        />
      </template>
      <template v-slot:both-const>
        <FormTextArea
          v-model:value="input"
          placeholder="入力してください"
          :hint="hint('表示はインライン、ヒントは下')"
          :error="hint('なんかエラー')"
          :base="left"
          :height="100"
          :mode="FORM_MODE.BOTH"
        />
      </template>
      <template v-slot:both-variable>
        <FormTextArea
          v-model:value="input"
          placeholder="入力してください"
          :hint="hint('表示はインライン、ヒントは下')"
          :base="right"
          :height="100"
          :mode="FORM_MODE.BOTH"
        />
      </template>
      <template v-slot:default-const>
        <FormTextArea
          v-model:value="input"
          placeholder="入力してください"
          :rule="[RULE.required]"
          :error="hint('なんかエラー')"
          :hint="hint('基本フォーム')"
          :base="left"
          :mode="FORM_MODE.DEFAULT"
        />
      </template>
      <template v-slot:default-variable>
        <FormTextArea
          v-model:value="input"
          placeholder="入力してください"
          :hint="hint('基本フォーム')"
          :base="right"
          :mode="FORM_MODE.DEFAULT"
        />
      </template>

      <section>
        <div class="Flex mb-4">
          <ButtonIcon
            label="25文字"
            narrow
            fit
            :position="POSITION.RIGHT"
            icon="mdi-arrow-up-bold"
            class="mr-2"
            color="primary"
            @click="input = Text25"
          />
          <ButtonIcon
            label="50文字"
            narrow
            fit
            :position="POSITION.RIGHT"
            icon="mdi-arrow-up-bold"
            class="mr-2"
            color="primary"
            @click="input = Text50"
          />
          <ButtonIcon
            label="100文字"
            narrow
            fit
            :position="POSITION.RIGHT"
            icon="mdi-arrow-up-bold"
            class="mr-2"
            color="primary"
            @click="input = Text100"
          />
          <ButtonIcon
            label="200文字"
            narrow
            fit
            :position="POSITION.RIGHT"
            icon="mdi-arrow-up-bold"
            class="mr-2"
            color="primary"
            @click="input = Text200"
          />
        </div>
        <p>
          {{ formTest.state.label }}
          {{ formTest.state.labelWidth }}
          {{ formTest.state.position }}
          {{ formTest.state.edit }}
          {{ formTest.state.hint }}
          {{ formTest.state.bold }}
          {{ formTest.state.align }}
        </p>
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

const Text25 = ref('テキスト入力エリア。ユーザーの長文入力に使用。')
const Text50 = ref(
  'テキストエリアはUIコンポーネントで、ユーザーが長文を入力できるように設計されています。通常、フォームで使われます。'
)
const Text100 = ref(
  'テキストエリアは、ユーザーインターフェースの一部として使用される多行テキストフィールドです。これは、ユーザーが長文を入力するためのスペースを提供します。テキストエリアは、メール、コメント、記事などの作成に通常使用され、フォームの一部として組み込まれます。'
)
const Text200 = ref(
  'テキストエリアは、ユーザーインターフェースの一部として提供される多行テキストフィールドで、ユーザーが長文のテキストを入力するための領域を提供します。これは、ウェブページやアプリケーションのフォームの中で使用され、メールの作成、フィードバックの提供、記事の作成など、さまざまな目的で利用されます。テキストエリアはスクロール可能で、入力したテキストが領域のサイズを超えると自動的にスクロールバーが表示されます。また、テキストエリアの大きさは通常、ユーザーが必要とする情報量に応じて調整可能です。'
)

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
