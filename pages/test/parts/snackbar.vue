<template>
  <LayoutTestArticle title="スナックバー">
    <LayoutTestReview>
      <div class="Contents">
        <div class="Contents">
          <section>
            <p>const snackbar = useSnackbarList()</p>
            <p>snackbar.setItem({text,icon,time})</p>
            <div class="Sample">
              <ButtonSimple text="スナックバー追加" @click="onPush" />
            </div>
          </section>
        </div>
      </div>
    </LayoutTestReview>
  </LayoutTestArticle>
</template>

<script setup lang="ts">
/**===================================================================================================================
 * 
===================================================================================================================**/
import { type snackbarProp } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
definePageMeta({
  layout: 'default',
})

useHead({
  title: 'パーツテスト',
})

const snackbar = useSnackbarList()

const counter = ref(0)

function onPush() {
  snackbar.setItem(testList[counter.value])
  counter.value++
  if (testList.length <= counter.value) {
    counter.value = 0
  }
}

const testList: snackbarProp[] = [
  {
    text: 'スナックバー1:アラート:5秒',
    icon: SNACKBAR_TYPE.ALERT,
    time: 99999999,
  },
  {
    text: 'スナックバー2:ベル:10秒',
    icon: SNACKBAR_TYPE.BELL,
    time: 10000,
  },
  {
    text: 'スナックバー3:デンジャー:1秒',
    icon: SNACKBAR_TYPE.DANGER,
    time: 1000,
  },
  {
    text: 'スナックバー5:エラー',
    icon: SNACKBAR_TYPE.ERROR,
  },
  {
    text: 'スナックバー5:インフォ',
    icon: SNACKBAR_TYPE.INFO,
  },
  {
    text: 'スナックバー4:デフォルト',
    icon: SNACKBAR_TYPE.DEFAULT,
  },
  {
    text: '改行テスト\n改行しますか？',
  },
  {
    text: 'アイコン＆文字色の変更SNACKBAR_TYPE.ERROR,info',
    icon: SNACKBAR_TYPE.INFO,
    color: THEME_COLOR.info,
  },
  {
    text: '文字色の変更\n#ff9999',
    icon: SNACKBAR_TYPE.ERROR,
    color: '#ff9999',
  },
  {
    title: '長文の自動改行',
    text: '日本の美しい四季を描写したこのテキストは、試験表示用に作成されました。春は桜の花が咲き誇り、夏は緑豊かな風景と共に暖かな日差しを浴びます。秋には紅葉が美しく彩られ、冬は雪に覆われた静寂が広がります。この素晴らしい風景を一年中楽しむことができます。日本の自然の美しさをお楽しみください。',
    icon: SNACKBAR_TYPE.BELL,
  },
  {
    title: '長文の改行',
    text: '日本の美しい四季を描写したこのテキストは、試験表示用に作成されました。\n春は桜の花が咲き誇り、夏は緑豊かな風景と共に暖かな日差しを浴びます。秋には紅葉が美しく彩られ、冬は雪に覆われた静寂が広がります。\nこの素晴らしい風景を一年中楽しむことができます。日本の自然の美しさをお楽しみください。',
  },
]
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
</style>
