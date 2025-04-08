<template>
  <article class="TestContainer colorTXT">
    <div
      v-if="menu"
      class="LocalMenu backgroundBG"
      :style="{
        width: `${status.width}px`,
        minWidth: `${status.width}px`,
        borderColor: useColor('line'),
      }"
    >
      <div class="LocalMenuHeader lineBG">
        <div class="Inner">
          <div class="Title">{{ menuTitle }}</div>
          <ButtonIcon
            :icon="ICONS.PLAY"
            :color="isDark() ? '#ccc' : '#fff'"
            :size="20"
            :rotation="status.open ? '180deg' : '0deg'"
            fit
            @click="onOpen()"
            :style="{
              transition: 'marginRight 0.2s ease-in-out',
              marginRight: status.open ? '0' : '5px',
            }"
          />
        </div>
      </div>
      <div class="LocalMenuContents">
        <div class="py-4" :class="{ dark: isDark() }">
          <div v-for="item in items[menu]">
            <div v-if="item.separator" class="Separator" />
            <ButtonBasic
              v-else
              class="LocalMenuItem"
              :class="{
                Actived: ruterPath === item.url,
              }"
              :text="item.text"
              :beforIcon="item.icon"
              :iconTop="item.iconTop"
              :rotation="item.rotation"
              :active="ruterPath === item.url"
              :disabled="item.disabled"
              :align="'flex-start'"
              @click="item.url ? $router.push(item.url) : ''"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="LocalContents backgroundBG"
      :style="{
        width: `calc(100% - ${menu ? status.width + 10 : 0}px)`,
        borderColor: useColor('line'),
      }"
    >
      <div class="LocalHeader lineBG colorTXT">
        <h3>{{ title }}</h3>
        <ButtonTabSet
          v-if="tabs"
          :items="tabs"
          :value="tab"
          :activeColor="useColor('color')"
          :activeBackColor="useColor('background')"
          class="LocalHeaderTab"
          padding="6px 16px 4px"
          @update:value="onChangeTab($event)"
        />
      </div>
      <slot />
    </div>
  </article>
</template>

<script lang="ts">
export interface menuProps {
  text?: string
  url?: string
  icon?: string
  iconTop?: string
  disabled?: boolean
  rotation?: string
  separator?: boolean
}
</script>

<script setup lang="ts">
/**===================================================================================================================
 * テスト用アーティクルフレーム
  ===================================================================================================================**/
import { type TabProps } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
//------------------------------------------------------------------------------------------------------------
// 引数
//------------------------------------------------------------------------------------------------------------
interface Props {
  title: string
  tabs?: TabProps[]
  tab?: string
}
const props = withDefaults(defineProps<Props>(), {
  tab: '',
})
//------------------------------------------------------------------------------------------------------------
// 定数・変数（state）
//------------------------------------------------------------------------------------------------------------
const menu = ref('parts')
const menuTitle = ref('パーツテスト')
const ruterPath = ref('/')

const items: { [key: string]: menuProps[] } = {
  forms: [
    {
      text: 'フォームテスト',
      url: '/test/forms/form',
      icon: 'mdi-send-check',
    },
    {
      text: 'バリデーションテスト',
      url: '/test/forms/validation',
      icon: 'mdi-spellcheck',
    },
    {
      separator: true,
    },
    {
      text: 'テキスト入力',
      url: '/test/forms/input',
      icon: 'mdi-form-textbox',
    },
    {
      text: 'パスワード',
      url: '/test/forms/password',
      icon: 'mdi-form-textbox-password',
    },
    {
      text: '数値',
      url: '/test/forms/numeric',
      icon: 'mdi-numeric',
    },
    {
      text: 'メール',
      url: '/test/forms/mail',
      icon: 'mdi-email-outline',
    },
    {
      text: 'テキストエリア',
      url: '/test/forms/textarea',
      icon: 'mdi-form-textarea',
    },
    {
      text: '日付',
      url: '/test/forms/date',
      icon: 'mdi-calendar-range',
    },
    {
      text: '時刻',
      url: '/test/forms/time',
      icon: 'mdi-clock-time-five-outline',
    },
    {
      text: '時刻（セレクト）',
      url: '/test/forms/selecttime',
      icon: 'mdi-archive-clock-outline',
    },
    {
      text: '日付時刻',
      url: '/test/forms/datetime',
      icon: 'mdi-calendar-clock',
    },
    {
      text: 'セレクト',
      url: '/test/forms/select',
      icon: 'mdi-form-dropdown',
      disabled: true,
    },
    {
      text: 'リスト',
      url: '/test/forms/list',
      icon: 'mdi-form-select',
      disabled: true,
    },
    {
      text: '価格',
      url: '/test/forms/price',
      icon: 'mdi-currency-jpy',
      disabled: true,
    },
    {
      text: 'ファイル',
      url: '/test/forms/filepicker',
      icon: 'mdi-file-plus-outline',
    },
    {
      text: 'セレクトラジオ',
      url: '/test/forms/selectradio',
      icon: 'mdi-order-bool-ascending-variant',
      disabled: true,
    },
    {
      text: 'セレクトチェック',
      url: '/test/forms/selectcheck',
      icon: 'mdi-order-bool-ascending-variant',
      disabled: true,
    },
    {
      text: 'チェックグループ',
      url: '/test/forms/checkgroup',
      icon: 'mdi-checkbox-multiple-marked-outline',
    },
    {
      text: 'ラジオグループ',
      url: '/test/forms/radiogroup',
      icon: 'mdi-checkbox-multiple-marked-circle-outline',
      iconTop: '2px',
    },
  ],
  parts: [
    {
      text: 'モーダルウィンドウ',
      url: '/test/parts/modal',
      icon: 'mdi-window-maximize',
    },
    {
      text: 'ダイアログウィンドウ',
      url: '/test/parts/dialog',
      icon: 'mdi-window-maximize',
    },
    {
      text: 'セレクトメニュー',
      url: '/test/parts/select',
      icon: 'mdi-list-box-outline',
    },
    {
      text: 'セレクトチェック',
      url: '/test/parts/selectcheck',
      icon: 'mdi-list-box-outline',
    },
    {
      text: 'ツールチップ',
      url: '/test/parts/tooltip',
      icon: 'mdi-tooltip-edit-outline',
    },
    {
      text: 'スナックバー',
      url: '/test/parts/snackbar',
      icon: 'mdi-card-text',
    },
    {
      text: 'ページネーション',
      url: '/test/parts/pagination',
      icon: 'mdi-numeric',
    },
    {
      text: 'プログレス',
      url: '/test/parts/progress',
      icon: 'mdi-progress-helper',
    },
    {
      text: 'アコーディオン',
      url: '/test/parts/accordion',
      icon: 'mdi-window-open',
    },
    {
      text: 'スライダー',
      url: '/test/parts/slider',
      icon: 'mdi-tune-variant',
    },
    {
      text: 'カレンダー',
      url: '/test/parts/calendar',
      icon: 'mdi-calendar',
    },
    {
      text: '時計（時刻ピッカー）',
      url: '/test/parts/clock',
      icon: 'mdi-clock-outline',
    },
    {
      text: 'イメージドラッガー',
      url: '/test/parts/imagedragger',
      icon: 'mdi-image-outline',
    },
    {
      text: 'インタラクティブ',
      url: '/test/parts/interactiveTest',
      icon: 'mdi-arrow-expand-all',
    },
  ],
  buttons: [
    {
      text: 'ベーシックボタン',
      url: '/test/buttons/basic',
      icon: 'mdi-card-outline',
    },
    {
      text: 'シンプルボタン',
      url: '/test/buttons/simple',
      icon: 'mdi-card',
    },
    {
      text: 'アイコンボタン',
      url: '/test/buttons/icon',
      icon: 'mdi-information-outline',
    },
    {
      text: '色々なボタン',
      url: '/test/buttons/various',
      icon: 'mdi-shape-outline',
    },
    {
      text: 'トグルボタン',
      url: '/test/buttons/toggle',
      icon: 'mdi-radiobox-indeterminate-variant',
      rotation: '90deg',
    },
    {
      text: 'トグルセット',
      url: '/test/buttons/toggleSet',
      icon: 'mdi-toggle-switch-variant-off',
      rotation: '90deg',
    },
    {
      text: 'トグルスイッチ',
      url: '/test/buttons/toggleSwitch',
      icon: 'mdi-toggle-switch',
    },
    {
      text: 'タブセット',
      url: '/test/buttons/tabSet',
      icon: 'mdi-table-row',
    },
    {
      text: 'ラジオボタンセット',
      url: '/test/buttons/radioSet',
      icon: 'mdi-radiobox-marked',
    },
    {
      text: 'チェックセット',
      url: '/test/buttons/checkset',
      icon: 'mdi-checkbox-outline',
    },
  ],
  tips: [
    {
      text: '日付操作',
      url: '/test/tips/datetime',
      icon: 'mdi-calendar-clock',
    },
    {
      text: '状態管理',
      url: '/test/tips/state2store',
      icon: 'mdi-content-save-edit-outline',
    },
    {
      text: 'ユーティリティ',
      url: '/test/tips/utility',
      icon: 'mdi-content-save-edit-outline',
    },
    {
      text: 'フォルダ構成',
      url: '/test/tips/folder',
      icon: 'mdi-content-save-edit-outline',
    },
    {
      text: 'ファイルドラッガー',
      url: '/test/tips/fileDragger',
      icon: 'mdi-file-arrow-left-right-outline',
    },
  ],
}

//メニューは、routerのwatchで判断
const router = useRouter()
const navi = useMainNavigationStatus()
const status = useLocalMenuStatus()

//------------------------------------------------------------------------------------------------------------
// ライフサイクル
//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
//watch
//------------------------------------------------------------------------------------------------------------
watch(
  router.currentRoute,
  (value) => {
    ruterPath.value = value.path
    const path = value.path.split('/')[2]
    if (path === 'forms') {
      menu.value = 'forms'
      menuTitle.value = 'フォームテスト'
    } else if (path === 'buttons') {
      menu.value = 'buttons'
      menuTitle.value = 'ボタンテスト'
    } else if (path === 'parts') {
      menu.value = 'parts'
      menuTitle.value = 'パーツテスト'
    } else if (path === 'tips') {
      menu.value = 'tips'
      menuTitle.value = 'ヒントとコツ'
    } else {
      menu.value = ''
      menuTitle.value = ''
    }
  },
  { deep: true, immediate: true }
)

//------------------------------------------------------------------------------------------------------------
// エミット
//------------------------------------------------------------------------------------------------------------

const emits = defineEmits<{ (e: 'update:tab', item: any): void }>()

function onChangeTab(value: any) {
  emits('update:tab', value.value)
}

function onOpen() {
  status.value.open = !status.value.open
  if (status.value.open) {
    status.value.width = 200
  } else {
    status.value.width = 48
  }
}
</script>

<style lang="scss" scoped>
$color: var(--r-color-color);
$base: var(--r-color-base);
$primary: var(--r-color-primary);
$reverse: var(--r-color-reverse);
$back: var(--r-color-back);
$disabled: var(--r-color-disabled);
//$color: var(--v-theme-test-lighten-1);
.TestContainer {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;
  .LocalMenu {
    position: relative;
    height: 100%;
    margin-right: 14px;
    border-radius: 6px;
    border: 1px solid #b3b3b3;
    background: #fff;
    padding-left: 0px;
    transition:
      width 0.2s,
      min-width 0.2s;
    .LocalMenuHeader {
      padding: 0px 8px;
      width: 100%;
      height: 34px;
      border-radius: 5.5px 5.5px 0px 0px;
      background: #d9d9d9;
      display: flex;
      justify-content: flex-end;
      overflow: hidden;
      .Inner {
        position: relative;
        width: 180px;
        min-width: 180px;
        font-weight: bold;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .Title {
          padding-top: 3px;
          padding-right: 14px;
          position: relative;
          white-space: nowrap;
          font-size: 14px;
          color: rgba($color, 1);
        }
      }
    }
    .LocalMenuContents {
      width: calc(100% + 13px);
      height: calc(100% - 34px);
      overflow-y: scroll;
      overflow-x: hidden;
    }

    .LocalMenuItem {
      width: 198px;
      margin-bottom: 0px;
      justify-content: flex-start;
      padding: 6px 10px;
      height: 42px !important;
      ::v-deep(.Back) {
        transition: background-color 0.5s ease;
        opacity: 1 !important;
      }
      &:hover {
        ::v-deep(.Back) {
          transition: background-color 0s ease;
          opacity: 1 !important;
        }
      }
      &:active {
        ::v-deep(.Back) {
          opacity: 1 !important;
        }
      }
      &.Actived {
        ::v-deep(.Back) {
          transition: background-color 0.5s ease;
          opacity: 1 !important;
        }
      }
    }
    .disabled {
      color: rgba($disabled, 1);
      ::v-deep(.Back) {
        background-color: rgba($back, 0);
      }
    }
    .LocalMenuItem:not(.disabled) {
      ::v-deep(.Back) {
        background-color: rgba($primary, 0);
        transition: background-color 0.5s ease;
        opacity: 1 !important;
      }
      &:hover {
        ::v-deep(.Back) {
          background-color: rgba($primary, 0.1);
        }
      }
      &:active {
        ::v-deep(.Back) {
          background-color: rgba($primary, 0.1);
        }
      }
      &.Actived {
        color: rgba($primary, 1);
        ::v-deep(.Back) {
          background-color: rgba($primary, 0.2);
        }
      }
    }
    .dark {
      .LocalMenuItem:not(.disabled) {
        ::v-deep(.Back) {
          background-color: rgba($base, 0);
        }
        &:hover {
          ::v-deep(.Back) {
            background-color: rgba($base, 0.5);
          }
        }
        &:active {
          ::v-deep(.Back) {
            background-color: rgba($base, 0.4);
          }
        }
        &.Actived {
          color: rgba($color, 1);
          ::v-deep(.Back) {
            background-color: rgba($base, 1);
          }
        }
      }
      .disabled {
        ::v-deep(.Back) {
          background-color: rgba($back, 0);
        }
      }
    }

    .Separator {
      height: 1px;
      margin-top: 10px;
      border-bottom: 1px solid #b3b3b3;
      margin-bottom: 10px;
      margin-right: 2px;
    }
  }
  .LocalContents {
    position: relative;
    height: 100%;
    border-radius: 6px;
    border: 1px solid #b3b3b3;
    background: #fff;
    transition:
      width 0.2s,
      min-width 0.2s;
    min-width: 600px;
    .LocalHeader {
      padding: 0px 16px;
      width: 100%;
      height: 34px;
      border-radius: 5.5px 5.5px 0px 0px;
      background: #d9d9d9;
      font-weight: bold;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      h3 {
        padding-top: 4px;
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 16px !important;
        line-height: 16px !important;
        white-space: nowrap;
      }
    }
  }
}
</style>
