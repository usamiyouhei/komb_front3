<template>
  <LayoutTestArticle title="TestListSample">
    <ListSet
      name="ListSample"
      title="一覧サンプル"
      :data="testData"
      :headers="headers"
      :base="base"
      :variableRect="variableRect"
      :fixedRect="fixedRect"
      @update:post="onPostSubmit($event)"
      @update:put="onPutSubmit($event)"
    >
    </ListSet>
  </LayoutTestArticle>
</template>

<script setup lang="ts">
/**===================================================================================================================
* *
===================================================================================================================**/
import { faker } from '@faker-js/faker/locale/ja'
import { useSampleData, type SampleData, useFakeFirstKana, useFakeLastKana } from '@/composables/test'
import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'

//------------------------------------------------------------------------------------------------------------
// 引数
//------------------------------------------------------------------------------------------------------------
import type {
  VariableSize,
  FixedSize,
} from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
import {
  type DataTableHeader,
  FORM_ITEM,
  type baseProps,
  FORM_MODE,
  TABLE_ITEM_KEY,
  CONST_TABLE_ITEM,
} from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
import { RULE } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/composables/validation'
dayjs.locale(ja)

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'テンプレート',
})

//------------------------------------------------------------------------------------------------------------
// 定数・変数（state）
//------------------------------------------------------------------------------------------------------------
// タイプはフォームの設定、keyはテーブル&フォームどちらでも使用
// keyの
const commentMargin = '0 0 16px'

const headers: DataTableHeader[] = [
  //コメント(色はcolor色)
  {
    ...CONST_TABLE_ITEM.COMMENT,
    ...{
      contents: [
        'これはコメント文です',
        'アカウントを使用することで、ユーザーの情報や行動履歴などをきちんと保存・管理することができます。',
      ],
      margin: commentMargin,
      list: true,
    },
  },
  //注釈 (基本info色、罫線で囲まれる)
  {
    ...CONST_TABLE_ITEM.NOTE,
    ...{
      contents: [
        'これは注釈文です',
        '情報を正確に入力し、内容をよく確認してください。',
        '一度確認して、誤りがないかを再度チェックしてください。',
        '全ての必須項目を埋めてから送信して下さい。',
      ],
      margin: commentMargin,
      list: true,
    },
  },
  { ...CONST_TABLE_ITEM.LINE, ...{ color: THEME_COLOR.line, margin: '0 0 32px' } },
  CONST_TABLE_ITEM.ID,
  {
    key: 'mail',
    title: 'Email',
    align: 'start',
    sortable: true,
    width: 250,
    strWidth: '250px',
    minWidth: '250px',
    maxWidth: '250px',
    fixed: true,
    choice: true,
    rule: [RULE.required],
    type: FORM_ITEM.EMAIL,
  },
  {
    key: 'memo',
    title: 'メモ',
    align: 'start',
    sortable: false,
    width: 250,
    strWidth: '250px',
    minWidth: '250px',
    maxWidth: '250px',
    fixed: true,
    choice: true,
    type: FORM_ITEM.INPUT,
  },
  {
    key: 'name',
    title: '名前',
    align: 'center',
    sortable: true,
    width: 140,
    strWidth: '140px',
    minWidth: '140px',
    maxWidth: '140px',
    fixed: true,
    choice: true,
    type: FORM_ITEM.NAME,
    rule: [RULE.required],
  },
  {
    key: 'kana',
    title: 'カナ',
    align: 'center',
    sortable: true,
    width: 140,
    strWidth: '140px',
    minWidth: '140px',
    maxWidth: '140px',
    fixed: true,
    choice: true,
    type: FORM_ITEM.KANA,
    rule: [RULE.required],
  },
  {
    key: 'tel',
    title: 'phone',
    align: 'center',
    sortable: true,
    width: 140,
    strWidth: '140px',
    minWidth: '140px',
    maxWidth: '140px',
    fixed: true,
    choice: true,
    type: FORM_ITEM.TEL,
    rule: [RULE.required],
  },
  {
    key: 'zipcode',
    title: '郵便番号',
    align: 'center',
    width: 90,
    strWidth: '90px',
    minWidth: '90px',
    maxWidth: '90px',
    fixed: true,
    choice: true,
    type: FORM_ITEM.ZIPCODE,
    rule: [RULE.required],
  },
  // { ...CONST_TABLE_ITEM.LINE, ...{ color: THEME_COLOR.primary, margin: '0 0 16px' } },
  {
    key: 'prefecture',
    title: '都道府県',
    align: 'center',
    width: 90,
    strWidth: '90px',
    minWidth: '90px',
    maxWidth: '90px',
    fixed: false,
    choice: true,
    type: FORM_ITEM.INPUT,
    row: 2,
    resize: false,
    rule: [RULE.required],
  },
  {
    key: 'address',
    title: '住所',
    align: 'start',
    width: 200,
    strWidth: '200px',
    minWidth: '200px',
    maxWidth: '200px',
    fixed: false,
    choice: true,
    type: FORM_ITEM.INPUT,
    row: 2,
    resize: false,
    rule: [RULE.required],
  },
  {
    key: 'create',
    title: 'create',
    align: 'center',
    width: 120,
    strWidth: '120px',
    minWidth: '120px',
    maxWidth: '120px',
    choice: true,
    readOnly: true,
    type: FORM_ITEM.DATETIME,
  },
  {
    key: 'date',
    title: 'date',
    align: 'center',
    width: 120,
    strWidth: '120px',
    minWidth: '120px',
    maxWidth: '120px',
    choice: true,
    type: FORM_ITEM.DATE,
  },
  {
    key: 'time',
    title: 'time',
    align: 'center',
    width: 120,
    strWidth: '120px',
    minWidth: '120px',
    maxWidth: '120px',
    choice: true,
    type: FORM_ITEM.TIME,
  },
  //注意 (Labelに注意アイコン表示、色は基本WARNING色)
  {
    ...CONST_TABLE_ITEM.ATTENTION,
    ...{
      contents: [
        'これは注意文です',
        '入力内容を再確認してください。未入力の項目がありませんか？',
        '送信前にもう一度ご確認を。',
      ],
      margin: commentMargin,
      list: true,
    },
  },
  //警告 (Labelに警告アイコン表示、色は基本error色)
  {
    ...CONST_TABLE_ITEM.WARNING,
    ...{
      contents: [
        'これは警告文です',
        'エラーが発生。再度確認を。必須項目が未入力です！入力内容に誤りがあります。',
        'こんな感じで警告文が差し込めます',
      ],
      margin: commentMargin,
      list: true,
    },
  },
  CONST_TABLE_ITEM.BLANK,
  {
    ...CONST_TABLE_ITEM.ACTION,
    ...{
      contents: [{ text: 'edit' }, { text: 'sort' }],
      width: 32 * 2 + 20,
      strwidth: `${32 * 2 + 20}px`,
      minWidth: `${32 * 2 + 20}px`,
      maxWidth: `${32 * 2 + 20}px`,
    },
  },
]

const base: baseProps = {
  label: {
    width: 70,
    weight: 'normal',
    align: 'flex-start',
  },
  mode: FORM_MODE.INLINE,
}

const variableRect: Ref<VariableSize> = ref({
  x: 500,
  y: 200,
  width: 700,
  minWidth: 700,
  maxWidth: 700,
  height: 600,
  minHeight: 300,
  maxHeight: 1200,
})

// サイズ固定＆不動ダイアログ
const fixedRect: Ref<FixedSize> = ref({
  justify: 'flex-end',
  align: 'flex-start',
  offsetX: '-10px',
  offsetY: '200px',
  width: '500px',
  height: '600px',
})

//------------------------------------------------------------------------------------------------------------
// ライフサイクル
//------------------------------------------------------------------------------------------------------------
onMounted(() => {
  generateTestData()
})

//------------------------------------------------------------------------------------------------------------
// メソッド
//------------------------------------------------------------------------------------------------------------
async function onPostSubmit(value: any) {
  // console.log(value)
}

async function onPutSubmit(value: any) {
  // ここから、API通信へと飛ばす
}

const sampleData = useSampleData()
const testData: Ref<SampleData[]> = ref([])
function generateTestData() {
  const tempData: SampleData[] = []
  faker.seed(1234)
  for (let i = 0; i < 1000; i++) {
    const fakeData: SampleData = {
      id: i,
      mail: faker.internet.email(),
      name: [faker.person.lastName(), faker.person.firstName()],
      kana: [useFakeFirstKana(), useFakeLastKana()],
      tel: faker.phone.number(),
      zipcode: faker.location.zipCode(),
      prefecture: faker.location.state(),
      address: faker.location.streetAddress(),
      create: dayjs(faker.date.past().toString()).format('YYYY年MM月DD日 HH:mm:ss'),
      date: dayjs(faker.date.past().toString()).format('YYYY年MM月DD日'),
      time: dayjs(faker.date.past().toString()).format('HH:mm:ss'),
    }
    tempData.push(fakeData)
  }
  // sampleData.value.data = tempData
  testData.value = tempData
  // console.log(testData.value)

  /*
      if (sampleData.value.data.length === 0) {
      } else {
        // console.log(sampleData.value.data)
        testData.value = sampleData.value.data
      }
      */
}
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
</style>
