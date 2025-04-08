<template>
  <div v-if="initialize" class="MainFlame">
    <slot />
    <div id="modal-area" />
    <div id="dialog-area" />
    <div id="float-area" />
    <div id="snackbar">
      <LayoutLock />
      <LayoutMask />
      <LayoutSnackbar />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MENU_TYPE } from '@/composables/constants'
const navi = useMainNavigationStatus()

//Routerの監視、パスのアドレスを見て、メインメニューの中身等が変わる
navi.value.menuType = MENU_TYPE.TENANT
const router = useRouter()
const colorSetting = useColorSetting()
//------------------------------------------------------------------------------------------------------------
// ライフサイクル
//------------------------------------------------------------------------------------------------------------
onMounted(() => {
  useSetThemeColors()
})

//------------------------------------------------------------------------------------------------------------
//watch
//------------------------------------------------------------------------------------------------------------
watch(
  router.currentRoute,
  (value) => {
    const path = value.path.split('/')[1]
    if (path === 'test') {
      navi.value.menuType = MENU_TYPE.TEST
      // navi.value.backcolor = useGetThemeColor(THEME_COLOR.test)
    } else if (path === 'admin') {
      navi.value.menuType = MENU_TYPE.ADMIN
      // navi.value.backcolor = useGetThemeColor(THEME_COLOR.admin)
    } else {
      navi.value.menuType = MENU_TYPE.TENANT
      // navi.value.backcolor = useGetThemeColor(THEME_COLOR.tenant)
    }
  },
  { deep: true, immediate: true }
)

// カラーセットが変更されたら、ルートのCSS変数を書き換える
watch(
  () => colorSetting.value,
  (value) => {
    useSetThemeColors()
  },
  { deep: true }
)

const initialize = ref(false)
onMounted(() => {
  // 他サイトからバックで戻る時等に、最初Layoutが崩れてしまうので、mountを待ってから表示するようにする
  initialize.value = true
})
</script>

<style lang="scss" scoped>
.MainFlame {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
#modal-area {
  position: fixed;
  z-index: 3;
}
#dialog-area {
  position: fixed;
  z-index: 4;
}
#float-area {
  position: fixed;
  z-index: 5;
}
#snackbar {
  position: fixed;
  z-index: 6;
}
</style>
