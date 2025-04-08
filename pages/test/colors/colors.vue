<template>
  <LayoutTestArticle title="カラーマネージメント" :tabs="tabmenus" :tab="tab" @update:tab="tab = $event">
    <LayoutTestReview :style="{ padding: tab === 'layout' ? '16px 6px' : undefined }">
      <div v-if="tab === 'color'" class="Contents">
        <section>
          <div class="Flex">
            <div
              v-for="base in baseItems"
              class="BaseArea mr-4"
              :style="{
                background: useColor('background', base),
                color: useColor('color', base),
              }"
            >
              <h3 class="color">{{ base }}</h3>
              <div class="Flex">
                <div v-for="theme in themeItems" class="ColorArea">
                  <h4 class="color">{{ theme }}</h4>
                  <template v-for="color in colorItems">
                    <Color :color="useColor(color, base, theme)" :base="base" :label="color" border class="mb-1" />
                  </template>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div v-else-if="tab === 'tips'" class="Contents">
        <section>
          <p>色は、基本vuetifyのテーマカラーを使用</p>
          <p>
            と思ったが、色々とカスタマイズが大変＆切り替えがスムーズではないので、独自のテーマカラーセットを使う事にする
          </p>
          <p>テーマを簡易的に変更して使える形にしたい</p>
          <p>
            なお、カラーマネージメント系のメソッドは、ローカルストレージを利用しているので、クライアントサイド描画時のみで使用してください<br />
            onMounted以後に使用するとか、if (process.client)で処理を制限するとか、{{ `<ClientOnly>` }}で囲むとかやり方は色々
          </p>
        </section>
        <section>
          <h5>useColorSetting</h5>
          <p>bese: ['light' , 'dark'] と theme: ['admin','tenant','test','default']を設定する</p>
          <p>この値は、グローバル＆ローカルストレージに保存され、サイトを開く時に読み込まれる</p>
          <p>この設定された値がuseColorで、base,theme省略時の値として使われる</p>
          <p>また、この値が変更された時、:rootにある、CSS変数（--r-color-xxxx）が自動でセットされる</p>
          <p>css内ではvar(--r-color-xxxxx)の形式で色を呼び出す事が出来る</p>
          <p>
            なお、cssにはvuetifyとの仕様統一の為、RR,GG,BB形式で保存しているので、rgba(var(--r-color-xxxx),1)の形で指定する
          </p>
          <PartsHighlight :value="content1" class="mb-4" />
        </section>
        <section>
          <h5>useColor && THEME_COLOR</h5>
          <h6>useColor(color:string,base?:string, theme?:string)</h6>
          <p>ベース、テーマで変わるテーマカラーを取得する関数</p>
          <PartsHighlight :value="content2" class="mb-4" />
          <h6>enum THEME_COLOR</h6>
          <p>
            enumで色を用意しています（入力補間で使えます）<br />Stringでの直書きはタイポの誘因となるので、なるべくTHEME_COLORを使ってください
          </p>
          <PartsHighlight :value="content3" class="mb-4" />
        </section>
        <section>
          <h5>useGetThemeColor</h5>
          <p>useGetThemeColor(color:string)</p>
          <p>
            コンポーネントのpropsで色指定する場合、基本string型であるが内容としては、<br />
            red,blue等の色名や、#333,#F66や#00ff99,#56789AといったHex型、<br />
            さらに今回のカラーマネージメントで設定されてるprimary,secondary等の定数があり、<br />
            いちいち対応するのが面倒なので<br />
            この関数を通す事で、適切な色を返してくれる（ハスｗ）
          </p>
          <PartsHighlight :value="content4" class="mb-4" />
        </section>
      </div>
      <div v-else-if="tab === 'layout'" class="Contents Flex pa-0">
        <div
          v-for="color in colorSetItems"
          class="ColorLayout"
          :style="{
            color: useColor('color', color.base, color.theme),
          }"
        >
          <div
            class="ColorLayoutHeader"
            :style="{
              backgroundColor: useColor('header', color.base, color.theme),
            }"
          >
            Header({{ color.base }}:{{ color.theme }})
          </div>
          <div
            class="ColorLayoutSubHeader"
            :style="{
              backgroundColor: useColor('subheader', color.base, color.theme),
              borderBottom: `3px solid ${useColor('base', color.base, color.theme)}`,
            }"
          >
            SubHeader
            <ButtonTabSet
              :items="[
                { text: 'テスト', value: '1' },
                { text: 'タブ', value: '2' },
              ]"
              :value="'1'"
              color="#fff"
              activeColor="#fff"
              :activeBackColor="useColor('base', color.base, color.theme)"
              class="LocalHeaderTab"
              padding="2px 8px 0px"
              round="3px"
              font-size="10px"
            />
          </div>
          <div class="ColorLayoutMain">
            <div class="ColorLayoutMenu" :style="{ backgroundColor: useColor('base', color.base, color.theme) }">
              <div class="head">Menu</div>
              <ul>
                <li class="default">デフォルト</li>
                <li class="active">アクティブ</li>
                <li class="menu">ホバー</li>
                <li class="default">デフォルト</li>
              </ul>
            </div>
            <div
              class="ColorLayoutContainer"
              :style="{ backgroundColor: useColor('surface', color.base, color.theme) }"
            >
              <div
                class="ColorLayoutArticle"
                :style="{
                  backgroundColor: useColor('background', color.base, color.theme),
                  border: `1px solid ${useColor('line', color.base, color.theme)}`,
                }"
              >
                <h1 :style="{ backgroundColor: useColor('line', color.base, color.theme) }">Contents</h1>
                <div class="ColorLayoutContents">
                  <p>美しい日本語</p>
                  <FormInput :edit="true" />
                  <div class="Flex">
                    <div class="mr-2" :style="{ color: useColor('guide', color.base, color.theme) }">
                      半角で入力してください
                    </div>
                    <div class="mr-2" :style="{ color: useColor('error', color.base, color.theme) }">
                      エラーが発生しました
                    </div>
                  </div>
                  <div class="Flex">
                    <NuxtLink class="mr-2 link" to="#" :style="{ color: useColor('link', color.base, color.theme) }"
                      >リンク</NuxtLink
                    >
                    <NuxtLink class="mr-2 link" to="#" :style="{ color: useColor('active', color.base, color.theme) }"
                      >リンク</NuxtLink
                    >
                    <NuxtLink class="mr-2 link" to="#" :style="{ color: useColor('visited', color.base, color.theme) }"
                      >リンク</NuxtLink
                    >
                    <NuxtLink class="mr-2 link" to="#" :style="{ color: useColor('error', color.base, color.theme) }"
                      >ERROR</NuxtLink
                    >
                  </div>
                  <div class="Flex">
                    <ButtonSimple
                      class="mr-1"
                      color="#fff"
                      :backcolor="useColor('primary', color.base, color.theme)"
                      text="primary"
                      small
                    />
                    <ButtonSimple
                      class="mr-1"
                      color="#fff"
                      :backcolor="useColor('secondary', color.base, color.theme)"
                      text="secondary"
                      small
                    />
                    <ButtonSimple
                      class="mr-1"
                      color="#999"
                      :backcolor="useColor('disabled', color.base, color.theme)"
                      text="disabled"
                      small
                    />
                  </div>
                  <div class="Flex">
                    <div class="icon mr-2" :style="{ color: useColor('success', color.base, color.theme) }">
                      <v-icon icon="mdi-bell" />succes
                    </div>
                    <div class="icon mr-2" :style="{ color: useColor('warning', color.base, color.theme) }">
                      <v-icon icon="mdi-alert-circle" />warn
                    </div>
                    <div class="icon mr-2" :style="{ color: useColor('info', color.base, color.theme) }">
                      <v-icon icon="mdi-alert-circle" />info
                    </div>
                    <div class="icon mr-2" :style="{ color: useColor('error', color.base, color.theme) }">
                      <v-icon icon="mdi-alert" />error
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="ColorLayoutFooter"
            :style="{ backgroundColor: useColor('header', color.base, color.theme) }"
          ></div>
        </div>
      </div>
      <div v-else-if="tab === 'simulator'" class="Contents">
        <div class="Flex">
          <FormBlank class="mr-4" label="ベース" :base="base">
            <ButtonToggleSet
              :items="baseToggleItems"
              :value="colorSetting.value.base"
              @update:value="onChangeBaseColor($event)"
            />
          </FormBlank>
          <FormBlank class="mr-4" label="テーマ" :base="base">
            <ButtonToggleSet
              :items="colorToggleItems"
              :value="colorSetting.value.theme"
              @update:value="onChangeThemeColor($event)"
            />
          </FormBlank>
        </div>
        <div class="Flex test">{{ colorSetting.value.base }}/{{ colorSetting.value.theme }}</div>
        <div class="Flex align-start">
          <div class="ColorLayout color">
            <div class="ColorLayoutHeader headerBG">Header</div>
            <div
              class="ColorLayoutSubHeader subheaderBG"
              :style="{
                borderBottom: `3px solid ${useColor('base')}`,
              }"
            >
              SubHeader
              <ButtonTabSet
                :items="[
                  { text: 'テスト', value: '1' },
                  { text: 'タブ', value: '2' },
                ]"
                :value="'1'"
                color="#fff"
                activeColor="#fff"
                :activeBackColor="useColor('base')"
                class="LocalHeaderTab"
                padding="2px 8px 0px"
                round="3px"
                font-size="10px"
              />
            </div>
            <div class="ColorLayoutMain">
              <div class="ColorLayoutMenu baseBG">
                <div class="head">Menu</div>
                <ul>
                  <li class="default">デフォルト</li>
                  <li class="active">アクティブ</li>
                  <li class="menu">ホバー</li>
                  <li class="default">デフォルト</li>
                </ul>
              </div>
              <div class="ColorLayoutContainer surfaceBG">
                <div
                  class="ColorLayoutArticle backgroundBG"
                  :style="{
                    border: `1px solid ${useColor('line')}`,
                  }"
                >
                  <h1 class="lineBG">Contents</h1>
                  <div class="ColorLayoutContents">
                    <p>美しい日本語</p>
                    <FormInput :edit="true" />
                    <div class="Flex">
                      <div class="mr-2 guide">半角で入力してください</div>
                      <div class="mr-2 error">エラーが発生しました</div>
                    </div>
                    <div class="Flex">
                      <NuxtLink class="mr-2 link" to="#">リンク</NuxtLink>
                      <NuxtLink class="mr-2 link active" to="#">リンク</NuxtLink>
                      <NuxtLink class="mr-2 link visited" to="#">リンク</NuxtLink>
                      <NuxtLink class="mr-2 link error" to="#">ERROR</NuxtLink>
                    </div>
                    <div class="Flex">
                      <ButtonSimple class="mr-1" color="#fff" :backcolor="useColor('primary')" text="primary" small />
                      <ButtonSimple
                        class="mr-1"
                        color="#fff"
                        :backcolor="useColor('secondary')"
                        text="secondary"
                        small
                      />
                      <ButtonSimple class="mr-1" color="#999" :backcolor="useColor('disabled')" text="disabled" small />
                    </div>
                    <div class="Flex">
                      <div class="icon mr-2 success"><v-icon icon="mdi-bell" />succes</div>
                      <div class="icon mr-2 warning"><v-icon icon="mdi-alert-circle" />warn</div>
                      <div class="icon mr-2 info"><v-icon icon="mdi-alert-circle" />info</div>
                      <div class="icon mr-2 error"><v-icon icon="mdi-alert" />error</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="ColorLayoutFooter headerBG"></div>
          </div>
          <div class="Flex backgroundBG pa-2">
            <div class="mr-4">
              <Color
                v-for="color in colorItems.slice(0, 9)"
                :color="useColor(color)"
                :base="colorSetting.value.base"
                :label="color"
                border
                class="mb-1"
              />
            </div>
            <div>
              <Color
                v-for="color in colorItems.slice(9, 18)"
                :color="useColor(color)"
                :base="colorSetting.value.base"
                :label="color"
                border
                class="mb-1"
              />
            </div>
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
import Color from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/parts/PartsColorChip.vue'
import { type TabProps,FORM_MODE, defaultBase, type baseProps, type ToggleSetProps } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'カラー',
})
//------------------------------------------------------------------------------------------------------------
// 定数・変数（state）
//------------------------------------------------------------------------------------------------------------
const colorSetItems: Ref<{ base: string; theme: string }[]> = ref([
  { base: 'light', theme: 'admin' },
  { base: 'light', theme: 'tenant' },
  { base: 'light', theme: 'test' },
  { base: 'light', theme: 'default' },
  { base: 'dark', theme: 'admin' },
  { base: 'dark', theme: 'tenant' },
  { base: 'dark', theme: 'test' },
  { base: 'dark', theme: 'default' },
])
const baseItems: Ref<string[]> = ref(['light', 'dark'])
const themeItems: Ref<string[]> = ref(['admin', 'tenant', 'test', 'default'])
const colorItems: Ref<string[]> = ref([
  'header',
  'subheader',
  'base',
  'primary',
  'secondary',
  'error',
  'info',
  'success',
  'warning',
  'background',
  'surface',
  'disabled',
  'line',
  'guide',
  'link',
  'visited',
  'active',
  'color',
  'reverse',
  'form',
  'formline',
  'scroll',
  'listhead',
  'listbody',
])

const tabmenus: Ref<TabProps[]> = ref([
  { text: 'COLOR', value: 'color' },
  { text: 'TIPS', value: 'tips' },
  { text: 'LAYOUT', value: 'layout' },
  { text: 'SIMULATOR', value: 'simulator' },
])
const tab = ref('color')

const base = ref(defaultBase)
base.value.mode = FORM_MODE.INLINE
base.value.label.width = 0
const colorToggleItems: ToggleSetProps[] = [
  { text: 'ADMIN', value: 'admin', activeBack: useColor('base', 'light', 'admin') },
  { text: 'TENANT', value: 'tenant', activeBack: useColor('base', 'light', 'tenant') },
  { text: 'TEST', value: 'test', activeBack: useColor('base', 'light', 'test') },
  { text: 'DEFAULT', value: 'default', activeBack: useColor('base', 'light', 'default') },
]
const baseToggleItems: ToggleSetProps[] = [
  {
    text: 'LIGHT',
    value: 'light',
    activeBack: '#fff',
    activeColor: useColor('color', 'light', 'test'),
  },
  {
    text: 'DARK',
    value: 'dark',
    activeBack: useColor('surface', 'dark', 'test'),
  },
]

const content1 = `  const colorSetting = useColorSetting()
  colorSetting.base = 'dark'
  colorSetting.theme = 'admin'
`

const content2 = `  useColor('primary','dark', 'admin')
  useColor('primary')
  useColor(THEME_COLOR.primary)
  useColor(THEME_COLOR.secondary)
`

const content3 = `  useColor(THEME_COLOR.THEME_COLOR.primary)
  useColor(THEME_COLOR.THEME_COLOR.secondary)
  useColor(THEME_COLOR.THEME_COLOR.surface)
`

const content4 = `  // 
  let color = '#F00'
  useGetThemeColor(color)

  color = 'primary'
  useGetThemeColor(primary)

`

//------------------------------------------------------------------------------------------------------------
// ライフサイクル
//------------------------------------------------------------------------------------------------------------
/*
onBeforeMount(() => {
  //記憶した位置、サイズでの復帰を可能にする
})

onMounted(() => {
  //window.addEventListener('resize', onGetPosition)
})

onBeforeUnmount(() => {
  //window.removeEventListener('resize', onGetPosition)
})
*/
//------------------------------------------------------------------------------------------------------------
//watch
//------------------------------------------------------------------------------------------------------------
/*
watch(
  () => props.value,
  (value) => {
    input.value = value
  }
)
*/
//------------------------------------------------------------------------------------------------------------
// エミット
//------------------------------------------------------------------------------------------------------------
/*
const emits = defineEmits<{ (e: 'update:value', item: any): void }>()
const input = ref(props.value)

function onChange(value: any) {
  input.value = value
  emits('update:value', value)
}
*/

//------------------------------------------------------------------------------------------------------------
// メソッド
//------------------------------------------------------------------------------------------------------------
const colorSetting = useColorSetting()
function onChangeBaseColor(value: ToggleSetProps) {
  // console.log(value.value)
  colorSetting.value.base = value.value.toString()
}
function onChangeThemeColor(value: ToggleSetProps) {
  // console.log(value.value)
  colorSetting.value.theme = value.value.toString()
}
</script>

<style lang="scss" scoped>

@use '../../../assets/test';

ul {
  position: relative;
  margin-left: 16px;
  font-size: 12px;
  padding-left: 0;
  li {
    position: relative;
    padding: 0;
    margin: 0;
    list-style: none;
  }
}

.ColorLayout {
  position: relative;
  width: 340px;
  height: 300px;
  margin: 8px;
  font-size: 10px;
  .ColorLayoutHeader {
    position: relative;
    width: 100%;
    height: 26px;
    background-color: #444;
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
    padding-top: 2px;
    padding-left: 8px;
  }
  .ColorLayoutSubHeader {
    position: relative;
    width: 100%;
    height: 22px;
    background-color: #555;
    color: #fff;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    font-size: 10px;
    font-weight: bold;
    padding: 2px 8px 0;
  }
  .ColorLayoutMain {
    position: relative;
    height: calc(100% - 60px);
    // border-right: 1px solid rgba(var(--r-color-line));
    display: flex;
    .ColorLayoutMenu {
      position: relative;
      width: 80px;
      height: 100%;
      background-color: #59f;
      color: #fff;
      font-size: 10px;
      .head {
        padding: 4px 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      }
      ul {
        margin: 0;
        li {
          margin: 0;
          padding: 4px 8px;
          font-size: 10px;
        }
      }
      .active {
        background-color: rgba(255, 255, 255, 0.8);
        color: #59f;
      }
    }
    .ColorLayoutContainer {
      position: relative;
      width: 300px;
      height: 100%;
      padding: 8px;
      .ColorLayoutArticle {
        position: relative;
        height: 100%;
        border-radius: 5px;
        border: 1px solid #ccc;
        h1 {
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          background-color: #ccc;
          padding: 4px 8px;
          font-size: 12px !important;
        }
        .ColorLayoutContents {
          padding: 8px;
          p {
            font-size: 14px !important;
          }
          .icon {
            font-size: 12px;
            ::v-deep(.v-icon) {
              margin-right: 2px;
            }
          }
        }
        .link {
          line-height: 10px;
        }
      }
    }
  }
  .ColorLayoutFooter {
    position: relative;
    width: 100%;
    height: 14px;
    background-color: #444;
    color: #fff;
  }
}
.Flex {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;
}
.BaseArea {
  position: relative;
  padding: 10px;
  border: 1px solid #999;
}
.ColorArea {
  position: relative;
  padding: 10px;
}
</style>
