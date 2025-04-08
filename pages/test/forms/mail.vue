<template>
  <LayoutTestArticle title="テキスト入力">
    <LayoutTestFormReview @update:status="onChangeStatus($event)">
      <template v-slot:simple-const>
        <FormEmail
          v-model:value="input"
          placeholder="入力してください"
          :hint="hint('ラベルなしのテキストabcdeyp')"
          :error="hint('なんかエラー')"
          :rule="[RULE.required]"
          :base="left"
          :mode="FORM_MODE.SIMPLE"
        />
      </template>
      <template v-slot:simple-variable>
        <FormEmail
          v-model:value="input"
          placeholder="入力してください"
          :hint="hint('ラベルなしのテキストabcdeyp')"
          :base="right"
          :mode="FORM_MODE.SIMPLE"
        />
      </template>
      <template v-slot:inline-const>
        <FormEmail
          v-model:value="input"
          placeholder="入力してください"
          :hint="hint('インラインのテキスト')"
          :base="left"
          :rule="[RULE.required]"
          :mode="FORM_MODE.INLINE"
        />
      </template>
      <template v-slot:inline-variable>
        <FormEmail
          v-model:value="input"
          placeholder="入力してください"
          :hint="hint('インラインのテキスト')"
          :base="right"
          :mode="FORM_MODE.INLINE"
        />
      </template>
      <template v-slot:both-const>
        <FormEmail
          v-model:value="input"
          placeholder="入力してください"
          :hint="hint('表示はインライン、ヒントは下')"
          :error="hint('なんかエラー')"
          :base="left"
          :mode="FORM_MODE.BOTH"
        />
      </template>
      <template v-slot:both-variable>
        <FormEmail
          v-model:value="input"
          placeholder="入力してください"
          :hint="hint('表示はインライン、ヒントは下')"
          :base="right"
          :mode="FORM_MODE.BOTH"
        />
      </template>
      <template v-slot:default-const>
        <FormEmail
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
        <FormEmail
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
            label="name@mail.com"
            narrow
            fit
            :position="POSITION.RIGHT"
            icon="mdi-arrow-up-bold"
            class="mr-2"
            color="primary"
            @click="input = 'name@mail.com'"
          />
          <ButtonIcon
            label="name@mail.co.jp"
            narrow
            fit
            :position="POSITION.RIGHT"
            icon="mdi-arrow-up-bold"
            class="mr-2"
            color="primary"
            @click="input = 'name@mail.co.jp'"
          />
          <ButtonIcon
            label="美しい日本@お名前.com"
            narrow
            fit
            :position="POSITION.RIGHT"
            icon="mdi-arrow-up-bold"
            class="mr-2"
            color="primary"
            @click="input = '美しい日本@お名前.com'"
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
.userSelect {
  user-select: text;
}
</style>
