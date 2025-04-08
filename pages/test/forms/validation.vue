<template>
  <LayoutTestArticle title="バリデーションのテスト">
    <LayoutTestReview class="noScroll">
      <div class="Flex mb-4">
        <ButtonToggleSet
          :items="[
            { text: '文字種', value: 0 },
            { text: 'カウント', value: 1 },
            { text: 'フォーマット', value: 2 },
            { text: 'その他', value: 3 },
          ]"
          :value="formTest.state.validationTab"
          @update:value="formTest.state.validationTab = Number($event.value)"
          class="mr-2"
        />
        <PartsSelectMenu
          name="バリデーションテスト"
          class="mr-10"
          :width="300"
          :value="input"
          :items="items[formTest.state.validationTab]"
          :input-type="SELECT_INPUT_TYPE.INPUT"
          :select-type="SELECT_LIST_TYPE.RADIO"
          fit
          @update:value="onChange"
        />
        <ButtonSimple class="ml-2 mt-1-5" text="check" small @click="onAll('check')" :backcolor="THEME_COLOR.primary" />
        <ButtonSimple class="ml-2 mt-1-5" text="reset" small @click="onAll('clear')" :backcolor="THEME_COLOR.error" />
      </div>
      <div class="ScrollContainer">
        <div class="Contents Flex">
          <div class="Column">
            <section v-for="item in formDatas[formTest.state.validationTab]">
              <p class="mb-0">{{ item.name }}{{ item.rule }}</p>
              <div class="Sample">
                <FormInput
                  placeholder="入力してください"
                  :label="item.label"
                  :data="item"
                  :hint="item.ruleParams?.hint"
                  :base="custom"
                  :rule="item.rule"
                />
                <ButtonSimple
                  class="ml-2 mt-1-5"
                  text="check"
                  small
                  @click="item.onCheck = 'check'"
                  :backcolor="THEME_COLOR.primary"
                />
                <ButtonSimple
                  class="ml-2 mt-1-5"
                  text="reset"
                  small
                  @click="item.onCheck = 'clear'"
                  :backcolor="THEME_COLOR.error"
                />
              </div>
              <p class="info" v-if="item.ruleParams?.info">{{ item.ruleParams?.info }}</p>
            </section>
          </div>
          <div class="Column">
            <section v-for="item in formDatas[formTest.state.validationTab]">
              <h6>{{ item.name }}</h6>
              <div class="Sample">
                value:{{ item.value }}<br />
                error:{{ item.error }}
              </div>
            </section>
          </div>
        </div>
      </div>
    </LayoutTestReview>
  </LayoutTestArticle>
</template>

<script setup lang="ts">
/**===================================================================================================================
 * 
===================================================================================================================**/
/* __placeholder__ */
/**===================================================================================================================
*
===================================================================================================================**/
import type { formReviewStatus } from '@/components/layout/test/FormReview.vue'
import type { ListButtonProps } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
import {
  FORM_MODE,
  FORM_ITEM,
  type formItem,
  type baseProps,
} from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
import {
  SELECT_INPUT_TYPE,
  SELECT_LIST_TYPE,
} from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
definePageMeta({
  layout: 'default',
})

useHead({
  title: 'フォームテスト',
})

//------------------------------------------------------------------------------------------------------------
// 定数・変数（state）
//------------------------------------------------------------------------------------------------------------
const formTest = useFormTest()
const initialize = ref(false)
const tab = ref(0)

const input = ref('12345-abcd-ほげ')
const custom: Ref<baseProps> = ref({ label: {} })

custom.value = {
  label: {
    width: 220,
    weight: 'bold',
    align: 'flex-end',
  },
  edit: true,
  width: 250,
  mode: FORM_MODE.INLINE,
}

const items: ListButtonProps[][] = [
  // 文字種テスト
  [
    { text: '012345ab-+=@?', value: '012345ab-+=@?' },
    { text: '012345abcde', value: '012345abcde' },
    { text: '01234-56789-', value: '01234-56789-' },
    { text: '0123456789', value: '0123456789' },
    { text: '123456789', value: '123456789' },
    { text: 'abcdefghi', value: 'abcdefghi' },
    { text: 'カタカナタロウ', value: 'カタカナタロウ' },
    { text: 'ひらがなたろう', value: 'ひらがなたろう' },
  ],
  // カウントテスト
  [
    { text: '01234', value: '01234' },
    { text: '012345678', value: '012345678' },
    { text: '0123456789abcd', value: '0123456789abcd' },
    { text: '012３４', value: '012３４' },
    { text: '012３４５６７８', value: '012３４５６７８' },
    { text: '012３４５６７８abcd', value: '012３４５６７８abcd' },
  ],
  [
    { text: '2022-08-09', value: '2022-08-09' },
    { text: '13:16:40', value: '13:16:40' },
    { text: '2022-08-09 13:16:40', value: '2022-08-09 13:16:40' },
    { text: '2022/08/09 13:16:40', value: '2022/08/09 13:16:40' },
  ],
  [
    { text: '平山なると@お名前.com', value: '平山なると@お名前.com' },
    { text: 'naruto@ringzero.co.jp', value: 'naruto@ringzero.co.jp' },
    { text: '09011112222', value: '09011112222' },
    { text: '090-3333-4444', value: '090-3333-4444' },
    { text: '09-03-44', value: '09-03-44' },
    {
      text: 'https://reffect.co.jp/vue/veevaliate4/#%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E3%81%AE%E8%A8%AD%E5%AE%9A-handlechange',
      value:
        'https://reffect.co.jp/vue/veevaliate4/#%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E3%81%AE%E8%A8%AD%E5%AE%9A-handlechange',
    },
    {
      text: 'https://lhiroki1205.hatenablog.com/entry/2022/11/08/015534',
      value: 'https://lhiroki1205.hatenablog.com/entry/2022/11/08/015534',
    },
    { text: '444-0053', value: '444-0053' },
    { text: '4440053', value: '440053' },
  ],
]

const formDatas: Ref<formItem[][]> = ref([
  [
    {
      name: 'test1-1',
      label: '半角制限',
      hint: '半角で入力してください',
      value: '123-abc-ほげ',
      type: FORM_ITEM.INPUT,
      rule: [RULE.required, RULE.symbol],
    },
    {
      name: 'test1-2',
      label: '半角英数制限',
      hint: '半角英数字で入力してください',
      value: '123-abc-ほげ',
      type: FORM_ITEM.INPUT,
      rule: [RULE.required, RULE.alphanumeric],
    },
    {
      name: 'test1-3',
      label: '半角数字と-制限',
      hint: '半角の数字とハイフンで入力してください',
      value: '123-abc-ほげ',
      type: FORM_ITEM.INPUT,
      rule: [RULE.required, RULE.hyphen],
    },
    {
      name: 'test1-4',
      label: '半角数字制限',
      hint: '半角数字で入力してください',
      value: '123-abc-ほげ',
      type: FORM_ITEM.INPUT,
      rule: [RULE.required, RULE.number],
    },
    {
      name: 'test1-4',
      label: '数値制限',
      hint: '数値で入力してください',
      value: '123-abc-ほげ',
      type: FORM_ITEM.INPUT,
      rule: [RULE.required, RULE.numeric],
    },
    {
      name: 'test1-4',
      label: '半角英字制限',
      hint: '半角英字で入力してください',
      value: '123-abc-ほげ',
      type: FORM_ITEM.INPUT,
      rule: [RULE.required, RULE.alphabet],
    },
    {
      name: 'test1-5',
      label: 'カタカナ制限',
      hint: 'カタカナで入力してください',
      value: '123-abc-ほげ',
      type: FORM_ITEM.INPUT,
      rule: [RULE.required, RULE.katakana],
    },
    {
      name: 'test1-6',
      label: 'ひらがな制限',
      hint: 'ひらがなで入力してください',
      value: '123-abc-ほげ',
      type: FORM_ITEM.INPUT,
      rule: [RULE.required, RULE.hiragana],
    },
  ],
  [
    {
      name: 'test2-1',
      label: '文字数(半角相当)制限',
      hint: '半角6文字以上10文字以下で入力してください',
      value: '123-abc-ほげ',
      type: FORM_ITEM.INPUT,
      min: 6,
      max: 10,
      rule: [RULE.required, RULE.min, RULE.max, RULE.countBoth],
    },
    {
      name: 'test2-2',
      label: '文字数(半角相当)制限min',
      hint: '半角6文字以上で入力してください',
      value: '123-abc-ほげ',
      type: FORM_ITEM.INPUT,
      min: 6,
      rule: [RULE.required, RULE.min, RULE.countBoth],
    },
    {
      name: 'test7',
      label: '文字数(半角相当)制限max',
      hint: '半角10文字以下で入力してください',
      value: '123-abc-ほげ',
      max: 10,
      type: FORM_ITEM.INPUT,
      rule: [RULE.required, RULE.max, RULE.countBoth],
    },
    {
      name: 'test2-1',
      label: '文字数制限',
      hint: '6文字以上10文字以下で入力してください',
      value: '123-abc-ほげ',
      type: FORM_ITEM.INPUT,
      min: 6,
      max: 10,
      rule: [RULE.required, RULE.min, RULE.max],
    },
    {
      name: 'test2-2',
      label: '文字数制限min',
      hint: '6文字以上で入力してください',
      value: '123-abc-ほげ',
      type: FORM_ITEM.INPUT,
      min: 6,
      rule: [RULE.required, RULE.min],
    },
    {
      name: 'test7',
      label: '文字数制限max',
      hint: '10文字以下で入力してください',
      value: '123-abc-ほげ',
      max: 10,
      type: FORM_ITEM.INPUT,
      rule: [RULE.required, RULE.max],
    },
  ],
  [
    {
      name: 'test8',
      label: '日付フォーマット',
      hint: 'YYYY-MM-DD で入力してください',
      value: '123-abc-ほげ',
      type: FORM_ITEM.INPUT,
      rule: [RULE.required, RULE.date],
    },
    {
      name: 'test9',
      label: '時間フォーマット',
      hint: 'HH:mm:ss で入力してください',
      value: '123-abc-ほげ',
      type: FORM_ITEM.INPUT,
      rule: [RULE.required, RULE.time],
    },
    {
      name: 'test10',
      label: '日付時間フォーマット',
      hint: 'YYYY-MM-DD HH:mm:ss で入力してください',
      value: '123-abc-ほげ',
      type: FORM_ITEM.INPUT,
      rule: [RULE.required, RULE.datetime],
    },
    {
      name: 'test11',
      label: '自由フォーマット',
      hint: 'YYYY/MM/DD HH:mm:ss で入力してください',
      value: '123-abc-ほげ',
      type: FORM_ITEM.INPUT,
      format: 'YYYY/MM/DD HH:mm:ss',
      rule: [RULE.required, RULE.format],
    },
  ],
  [
    {
      name: 'test11',
      label: 'メールアドレス',
      hint: 'メールアドレスの形式で入力してください(日本語を含むメールアドレスには対応していません)',
      value: '123-abc-ほげ',
      type: FORM_ITEM.INPUT,
      rule: [RULE.required, RULE.mail],
      info: '現状、日本語等2バイト文字を含むメールアドレスのバリデーションは不可能に近い為、\n@を.を含むくらいのバリデーションにして、\n実際に確認が必要な場合は送信チェックで確認する仕組みにする等の処理をする',
    },
    {
      name: 'test11',
      label: '電話番号',
      hint: '電話番号の形式で入力してください',
      value: '123-abc-ほげ',
      type: FORM_ITEM.INPUT,
      rule: [RULE.required, RULE.phone],
    },
    {
      name: 'test11',
      label: 'アドレス',
      hint: 'HTTPアドレスの形式で入力してください',
      value: '123-abc-ほげ',
      type: FORM_ITEM.INPUT,
      rule: [RULE.required, RULE.url],
    },
    {
      name: 'test11',
      label: '郵便番号',
      hint: '日本の郵便番号の形式で入力してください',
      value: '123-abc-ほげ',
      type: FORM_ITEM.INPUT,
      rule: [RULE.required, RULE.zipcode],
    },
  ],
])

//------------------------------------------------------------------------------------------------------------
// ライフサイクル
//------------------------------------------------------------------------------------------------------------
onMounted(() => {
  initialize.value = true
})
//------------------------------------------------------------------------------------------------------------
//watch
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// メソッド
//------------------------------------------------------------------------------------------------------------
function onAll(value: string) {
  for (let i = 0; i < formDatas.value.length; i++) {
    console.log('formDatas.value.length', formDatas.value.length)
    for (let j = 0; j < formDatas.value[i].length; j++) {
      formDatas.value[i][j].onCheck = value
      console.log('formDatas.value[i].length', formDatas.value[i].length)
      console.log('formDatas.value[i][j].onCheck', formDatas.value[i][j].onCheck)
    }
  }
}

function onChange(value: string) {
  for (let i = 0; i < formDatas.value.length; i++) {
    for (let j = 0; j < formDatas.value[i].length; j++) {
      formDatas.value[i][j].value = value
      formDatas.value[i][j].onCheck = 'check'
    }
  }
}
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
section {
  margin-bottom: 6px;
  .Sample {
    padding: 4px 10px;
    height: 50px;
    flex-wrap: nowrap;
  }
}
.Flex {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  min-width: 2000px;
}
.Column {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-width: 300px;
  max-width: 50%;
}
.ScrollContainer {
  position: relative;
  width: calc(100% + 0px);
  height: calc(100% - 30px);
  overflow-y: scroll;
  overflow-x: hidden;
}
.noScroll {
  padding-right: 4px;
  overflow-y: hidden;
  overflow-x: hidden;
}
.info {
  position: relative;
  max-width: 600px;
  font-size: 12px;
  padding: 0;
  margin: 4px 0 16px 12px;
}
</style>
