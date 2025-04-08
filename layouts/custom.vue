<template>
  <div v-if="initialize" class="MainFlame">
    <LayoutTenantHeader>
      <template #title>
        <slot name="headerTitle" />
     

      </template>
    </LayoutTenantHeader>
    <!-- <LayoutSubHeader /> -->
    <LayoutMainNavigation>
      <slot name="mainNavigation" />
    </LayoutMainNavigation>
    <LayoutMainContainer><slot /></LayoutMainContainer>
    <LayoutFooter />
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
/**===================================================================================================================
 *
 ===================================================================================================================**/
import { MENU_TYPE } from '@/composables/constants'
const navi = useMainNavigationStatus()
const user = useUserStatus()
//Routerの監視、パスのアドレスを見て、メインメニューの中身等が変わる
navi.value.menuType = MENU_TYPE.TENANT
const nowcategory = ref(MENU_TYPE.NONE)
const router = useRouter()
const colorSetting = useColorSetting()
const { role } = useUserStatus()

const initialize = ref(false)
const route = useRoute()
useHead({
  meta: [{ property: 'og:title', content: `App Name - ${route.meta.title}` }],
})
const subHeaderStatus = useSubHeaderStatus();
subHeaderStatus.value = {
  height: 0,
  visible: false,
};

//------------------------------------------------------------------------------------------------------------
// ライフサイクル
//------------------------------------------------------------------------------------------------------------
// onMounted(async () => {
//   //先に有効期限を確認しないといけない
//   useSetThemeColors()
//   const result = await useGetSelf()
//   if (!result) {
//     router.push('/login')
//   } else {
//     // ロールが確認できたら、そのまま、selfの取得
//     await checkRole(router.currentRoute.value.path)
//     await checkTenant(router.currentRoute.value.path)
//   }
// })

onMounted(async () => {
  useSetThemeColors()
  initialize.value = true
})

// async function checkRole(path: string) {
//   const userRole = await role.value
//   const address = path.split('/')
//   if (userRole === ROLE_TYPE.ADMINI) {
//   } else if (userRole === ROLE_TYPE.TENANT_ADMINI) {
//     if (address[1] === 'admin') {
//       router.push('/login')
//       return
//     }
//   } else {
//     router.push('/login')
//     return
//   }
//   initialize.value = true
// }

async function checkTenant(path: string) {
  if (nowcategory.value !== MENU_TYPE.TENANT && path === 'tenant') {
    // クライアントサイドでのみ実行
    // アドミンから、テナントに移る時、所属テナントを再読み込みする
    // 2024.1.18 テスト用にコメントアウト
    // await useGetSelf()
  }
  if (path === 'test') {
    nowcategory.value = MENU_TYPE.TEST
  } else if (path === 'admin') {
    nowcategory.value = MENU_TYPE.ADMIN
  } else if (path === 'tenant'){
    nowcategory.value = MENU_TYPE.TENANT
    const { tenants } = useUserStatus()
    const tenant = useTenantSetting()
    // console.log('多分ここでエラー出てるよね？')
    // console.log('選択中のtenant', tenants.value, tenant.value)
    const exists = tenants.value.some((item) => item.id === tenant.value.id)
    // console.log(exists);  // true
    if (!exists) {
      tenant.value.id = ''
      tenant.value.key = ''
      tenant.value.name = ''
      tenant.value.project = undefined
    }
    //読み込んだtenants の中に、tenantが無ければ
  }
}

//------------------------------------------------------------------------------------------------------------
//watch
//------------------------------------------------------------------------------------------------------------
watch(
  router.currentRoute,
  async (value) => {
    //     await checkRole(value.path)
    // await checkTenant(value.path)
    const path = value.path.split('/')[1]
    // if (path === 'test') {
    navi.value.menuType = MENU_TYPE.TEST
    // colorSetting.value.theme = path
    colorSetting.value.theme = 'test'
    // } else if (path === 'admin') {
    //   navi.value.menuType = MENU_TYPE.ADMIN
    //   colorSetting.value.theme = path
    // } else {
    //   navi.value.menuType = MENU_TYPE.TENANT
    //   colorSetting.value.theme = 'tenant'
    //   // テナントに、現在選択中のテナントが無ければ、
  },
  // }
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
