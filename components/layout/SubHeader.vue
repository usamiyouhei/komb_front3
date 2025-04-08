<template>
  <div
    class="SubHeader"
    :style="{
      top: `${hStatus.height}px`,
      height: `${status.height}px`,
      backgroundColor: useColor('subheader'),
      color: useColor('reverse'),
      borderBottom: `6px solid ${useColor('base')}`,
    }"
  >
    <h2>統合管理画面（{{ user.role.value }}）</h2>
    <TubSet
      :value="tab"
      :items="NODE_ENV === 'development' ? itemsTest[user.role.value] : items[user.role.value]"
      :color="useColor('reverse')"
      @update:value="onChangeTab($event)"
      :activeBackColor="useColor('base')"
      class="tabSet"
    />
  </div>
</template>

<script setup lang="ts">
/**===================================================================================================================
 * 
 ===================================================================================================================**/
// import TubSet, { TabProps } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
// 2024.1.29 検証のため、import先を変更
import TubSet from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/button/ButtonTabSet.vue'
import { type TabProps } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'

//------------------------------------------------------------------------------------------------------------
// 定数・変数（state）
//------------------------------------------------------------------------------------------------------------
const NODE_ENV = process.env.NODE_ENV
const router = useRouter()
const hStatus = useHeaderStatus()
const navi = useMainNavigationStatus()
const status = useSubHeaderStatus()

const tab = ref('test')
const user = useUserStatus()

const items: { [key: string]: TabProps[] } = {
  Admin: [
    { text: 'テナント管理', value: 'tenant', url: 'redirect' },
    { text: 'アドミン管理', value: 'admin', url: 'redirect' },
  ],
  TenantAdmin: [{ text: 'テナント管理', value: 'tenant', url: 'redirect' }],
  None: [{ text: 'テスト', value: 'test', url: '/test' }],
}

const itemsTest: { [key: string]: TabProps[] } = {
  Admin: [
    { text: 'テスト', value: 'test', url: '/test' },
    { text: 'テナント管理', value: 'tenant', url: 'redirect' },
    { text: 'アドミン管理', value: 'admin', url: 'redirect' },
  ],
  TenantAdmin: [
    { text: 'テスト', value: 'test', url: '/test' },
    { text: 'テナント管理', value: 'tenant', url: 'redirect' },
  ],
  None: [{ text: 'テスト', value: 'test', url: '/test' }],
}

//------------------------------------------------------------------------------------------------------------
// ライフサイクル
//------------------------------------------------------------------------------------------------------------
onBeforeMount(() => {
  //記憶した位置、サイズでの復帰を可能にする
  const array = router.currentRoute.value.path.split('/')
  tab.value = array[1]
})

//------------------------------------------------------------------------------------------------------------
//watch
//------------------------------------------------------------------------------------------------------------
watch(
  () => user.role,
  (value) => {
    // console.log(value.value)
    if (value.value === 'Admin') {
      tab.value = 'admin'
    } else if (value.value === 'TenantAdmin') {
      tab.value = 'tenant'
    } else {
      tab.value = 'test'
    }
  },
  { deep: true }
)

watch(
  router.currentRoute,
  (value) => {
    const path = value.path.split('/')[1]
    if (path === 'test') {
      tab.value = 'test'
    } else if (path === 'admin') {
      tab.value = 'admin'
    } else {
      tab.value = 'tenant'
    }
  },
  { deep: true, immediate: true }
)

//------------------------------------------------------------------------------------------------------------
// メソッド
//------------------------------------------------------------------------------------------------------------

const onChangeTab = (value: TabProps) => {
  if (value) {
    if (value.url === 'redirect' && value.value) {
      router.push(useCheckRole(String(value.value)))
    } else {
      router.push(navi.value.lastTestUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
.SubHeader {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 2px 10px 0 24px;
  line-height: 16px;
  size: 16px;
  h2 {
    font-size: 16px;
  }
  .tabSet {
    position: absolute;
    bottom: -2px;
    right: 20px;
  }
}
</style>
