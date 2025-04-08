import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
/**
 * フォームテストでの
 * @returns
 */

type testFormState = {
  label: string
  labelWidth: number
  position: string
  naviColor: string
  edit: string
  hint: boolean
  bold: string
  align: string
  validationTab: number
}

export const useFormTest = defineStore(
  'form-test-status',
  () => {
    const state: Ref<testFormState> = ref({
      label: 'テスト',
      labelWidth: 60,
      position: 'top',
      edit: 'left',
      naviColor: 'Test',
      hint: false,
      bold: 'bold',
      align: 'flex-start',
      //-----------------------------------
      validationTab: 0,
    })
    return {
      state,
    }
  },
  {
    persist: process.client && {
      storage: localStorage,
    },
  }
)

type colorSettingState = {
  data: SampleData[]
}

export interface SampleData {
  id: number
  mail: string
  name: string[]
  kana: string[]
  tel: string
  zipcode: string
  prefecture: string
  address: string
  create: string
  date: string
  time: string
}

export const useSampleData = defineStore(
  'sample-data',
  () => {
    const state: Ref<colorSettingState> = ref({
      data: [],
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

export function useFakeRole() {
  return fakeRole[Math.floor(Math.random() * 2)]
}

const fakeRole = ['Admin', 'TenantAdmin']

export function useFakeFirstKana() {
  return fakeFirstKana[Math.floor(Math.random() * 100)]
}

const fakeFirstKana = [
  'サトウ',
  'スズキ',
  'タナカ',
  'イトウ',
  'タカハシ',
  'ワタナベ',
  'ナカムラ',
  'ヤマモト',
  'カトウ',
  'ヤマダ',
  'ササキ',
  'マツモト',
  'イシカワ',
  'キムラ',
  'ヤマグチ',
  'シモヤ',
  'オオタ',
  'キタムラ',
  'コバヤシ',
  'モリタ',
  'ハシモト',
  'ハヤシ',
  'オオノ',
  'シミズ',
  'フクダ',
  'オオツカ',
  'ゴトウ',
  'ミヤザキ',
  'カワグチ',
  'フクモト',
  'シノダ',
  'オカモト',
  'カワサキ',
  'ヤマシタ',
  'マツシタ',
  'オオサワ',
  'イデ',
  'タカダ',
  'カワノ',
  'ナガノ',
  'フジタ',
  'オクムラ',
  'ミヤケ',
  'シモヤ',
  'フクオカ',
  'オオヤマ',
  'モリモト',
  'オオタニ',
  'イノウエ',
  'ハセガワ',
  'タガワ',
  'サイトウ',
  'アベ',
  'マツオカ',
  'イシグロ',
  'ヤマナカ',
  'タカヤマ',
  'キクチ',
  'イマイ',
  'タチバナ',
  'ヤマネ',
  'タカセ',
  'タカハタ',
  'モトヤマ',
  'イシバ',
  'シモノ',
  'マツウラ',
  'オカベ',
  'フジワラ',
  'タカミネ',
  'フクイ',
  'オオハシ',
  'ナカヨシ',
  'ハタケ',
  'カワハラ',
  'ナカムラ',
  'ノガミ',
  'キヨカワ',
  'ホリエ',
  'カワセ',
  'タケウチ',
  'フクナガ',
  'マツナガ',
  'タケダ',
  'ハラダ',
  'タカオカ',
  'オヤマ',
  'オノデラ',
  'イケダ',
  'タナカ',
  'ヤマザキ',
  'キタガワ',
  'シマダ',
  'キノシタ',
  'サカモト',
  'ヤマネ',
  'タカギ',
  'オガワ',
  'イシハラ',
  'イノセ',
]

export function useFakeLastKana() {
  return fakeLastKana[Math.floor(Math.random() * 100)]
}

const fakeLastKana = [
  'アキラ',
  'ユウキ',
  'エリ',
  'マサキ',
  'ユウタ',
  'レイ',
  'シン',
  'ミキ',
  'ケイ',
  'ユウト',
  'ミユキ',
  'リョウ',
  'ヒカリ',
  'ユカ',
  'ショウ',
  'カオリ',
  'ユリ',
  'ナオ',
  'アヤ',
  'サヤカ',
  'サトシ',
  'タイキ',
  'マオ',
  'ハル',
  'リナ',
  'ミナミ',
  'リカ',
  'ユミ',
  'ユウナ',
  'ノブ',
  'アヤカ',
  'ヒトミ',
  'マリ',
  'ケン',
  'ミナ',
  'ユウマ',
  'ユウスケ',
  'カナ',
  'ユキオ',
  'ユウコ',
  'シオリ',
  'テツ',
  'カズ',
  'マイ',
  'ユウヤ',
  'ミツキ',
  'ハナ',
  'ナナ',
  'ジュン',
  'ヒデ',
  'マサ',
  'クミコ',
  'カオル',
  'ヒロ',
  'クニ',
  'マユ',
  'ユウキチ',
  'ユウジ',
  'リョウタ',
  'シゲ',
  'チカ',
  'モモ',
  'ヒサシ',
  'シズカ',
  'ユウヒ',
  'ミドリ',
  'ヤス',
  'タクヤ',
  'ユウシ',
  'ソウ',
  'ユウリ',
  'サトエ',
  'マユミ',
  'ハルキ',
  'シンヤ',
  'ユウイチ',
  'ユウヘイ',
  'タク',
  'ミホ',
  'タダシ',
  'キョウ',
  'ナオミ',
  'チハル',
  'カヤ',
  'リョウキ',
  'ユキ',
  'マサル',
  'テル',
  'ハルナ',
  'ヒカル',
  'ユウジロウ',
  'マナ',
  'マサヒコ',
  'クヨ',
  'ヒナタ',
  'ヒロキ',
  'サヤ',
  'ミサオ',
  'ユウキョウ',
  'ユウシン',
]

function generateJapaneseShopName() {
  const prefixes = ['山', '海', '花', '夢', '星', '月', '風', '雲']
  const mainParts = ['楽', '喜', '美', '和', '心', '太', '光', '音']
  const suffixes = ['屋', '館', '店', '房', '亭', '庵', '舎', '室']

  const prefix = prefixes[Math.floor(Math.random() * 8)]
  const mainPart = mainParts[Math.floor(Math.random() * 8)]
  const suffix = suffixes[Math.floor(Math.random() * 8)]

  return prefix + mainPart + suffix
}

// console.log(generateJapaneseShopName()) // 例: "山美屋"
