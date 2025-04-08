<template>
  <LayoutTestArticle title="ファイル">
    <LayoutTestFormReview @update:status="onChangeStatus($event)">
      <template v-slot:simple-const>
        <FormFilePicker
          v-model:value="input"
          placeholder="ファイル名"
          :hint="hint('ラベルなしのテキストabcdeyp')"
          :error="hint('なんかエラー')"
          :rule="[RULE.required]"
          :base="left"
          :extensions="[FILE_TYPE.IMG_PNG]"
          :mode="FORM_MODE.SIMPLE"
          @update:file="selectFile"
        />
      </template>
      <template v-slot:simple-variable>
        <FormFilePicker
          v-model:value="input"
          placeholder="ファイル名"
          :hint="hint('ラベルなしのテキストabcdeyp')"
          :base="right"
          :mode="FORM_MODE.SIMPLE"
          @update:file="selectFile"
        />
      </template>
      <template v-slot:inline-const>
        <FormFilePicker
          v-model:value="input"
          placeholder="ファイル名"
          :hint="hint('インラインのテキスト')"
          :base="left"
          :rule="[RULE.required]"
          :mode="FORM_MODE.INLINE"
          @update:file="selectFile"
        />
      </template>
      <template v-slot:inline-variable>
        <FormFilePicker
          v-model:value="input"
          placeholder="ファイル名"
          :hint="hint('インラインのテキスト')"
          :base="right"
          :mode="FORM_MODE.INLINE"
          @update:file="selectFile"
        />
      </template>
      <template v-slot:both-const>
        <FormFilePicker
          v-model:value="input"
          placeholder="ファイル名"
          :hint="hint('表示はインライン、ヒントは下')"
          :error="hint('なんかエラー')"
          :base="left"
          :mode="FORM_MODE.BOTH"
          @update:file="selectFile"
        />
      </template>
      <template v-slot:both-variable>
        <FormFilePicker
          v-model:value="input"
          placeholder="ファイル名"
          :hint="hint('表示はインライン、ヒントは下')"
          :base="right"
          :mode="FORM_MODE.BOTH"
          @update:file="selectFile"
        />
      </template>
      <template v-slot:default-const>
        <FormFilePicker
          v-model:value="input"
          placeholder="ファイル名"
          :rule="[RULE.required]"
          :error="hint('なんかエラー')"
          :hint="hint('基本フォーム')"
          :base="left"
          :mode="FORM_MODE.DEFAULT"
          @update:file="selectFile"
        />
      </template>
      <template v-slot:default-variable>
        <FormFilePicker
          v-model:value="input"
          placeholder="ファイル名"
          :hint="hint('基本フォーム')"
          :base="right"
          :mode="FORM_MODE.DEFAULT"
          @update:file="selectFile"
        />
      </template>
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
import { FILE_TYPE } from '../../../node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
// import OSS, { type PutObjectResult } from 'ali-oss'
definePageMeta({
  layout: 'default',
})

useHead({
  title: 'フォームテスト',
})

// const { $projectOssMaster } = useNuxtApp() as unknown as { $projectOssMaster: InstanceType<typeof OSS> }
// const uploadResult: Ref<PutObjectResult | null> = ref(null)
const getResult: Ref<null> = ref(null)

const formTest = useFormTest()
const initialize = ref(false)
const left: Ref<baseProps> = ref({ label: {} })
const right: Ref<baseProps> = ref({ label: {} })
const custom: Ref<baseProps> = ref({ label: {} })
const input = ref('')
const validationTest = ref('')

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

// ali-oss putテスト用
async function selectFile(file: any) {
  // console.log('FormFilePickerから受け取ったファイル', file)
  // if ($projectOssMaster) {
  //   try {
  //     const result = await $projectOssMaster.put(file.name, file)
  //     if (result.res.status === 200) {
  //       uploadResult.value = result
  //       // ローカルストレージに追加する処理
  //       // let formatJson = JSON.stringify(result)
  //       // localStorage.setItem('aliOssFile1', formatJson)
  //       // console.log('Success uploading file:', result)
  //     } else {
  //       console.error('Error uploading file:', result)
  //     }
  //   } catch (error) {
  //     console.error('Error uploading file:', error)
  //   }
  // }
  // console.log(uploadResult.value)
}
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
.userSelect {
  user-select: text;
}
</style>
