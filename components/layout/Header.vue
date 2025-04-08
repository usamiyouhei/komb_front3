<template>
  <div
    class="Header"
    :style="{
      height: `${status.height}px`,
      backgroundColor: useColor('header'),
      color: useColor('reverse'),
    }"
  />
  <h1 :style="{ position: 'relative', zIndex: 10 }">{{ pageTitle }}</h1>
  <div class="ActionArea">
    <div class="Account" @click="userOpenSwitch.opened = true">{{ `${user.mail.value}` }}</div>
    <div class="Role">
      <div>{{ `（${user.role.value}）` }}</div>
    </div>
    <ButtonBasic
      class="ma-2"
      after-icon="mdi-logout-variant"
      text="ログアウト"
      iconRight="4px"
      @click="dialogSwitch.opened = true"
      narrow
    />
    
      <ButtonIcon :icon="ICONS.COG" :size="30" bold narrow color="fff" @click="onOpen(true)" />
     

    <!--
        <PartsSystemMenu :switcher="openSwitch" @update:close="openSwitch.opened = false" />
      -->
  </div>
  <PartsDialogWindow
    :switcher="dialogSwitch"
    :buttons="DIALOG_BUTTON.OK_CANCEL"
    :colors="useSetColors(DIALOG_COLOR.TWO)"
    :fixedSize="dialogFixedRect"
    :reset="true"
    :title="'ログアウトの確認'"
    @update:close="dialogSwitch.opened = false"
    @update:value="onDialogResult($event)"
  >
    <div class="FlexCenter pt-3">ログアウトします。よろしいですか？</div>
  </PartsDialogWindow>
  <!-- 2024.02.05 syntaxErro CustomParseFormatのため、コメントアウト -->
  <!-- <LayoutAdminUser :switcher="userOpenSwitch" :userData="userData" /> -->
</template>

<script setup lang="ts">
import {
  type VariableSize,
  type FixedSize,
} from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
import { type ListButtonProps } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
import {
  type baseProps,
  defaultBase,
} from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
import { ROLE_TYPE } from '@/composables/constants'
import { type ModalSwitch } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/types'
import { storeToRefs } from 'pinia'
import { type Tenant } from '~/types/api'

export interface UserData {
  id: string
  mail: string
  role: string
  tenants: Array<Tenant>
}

const router = useRouter()
const status = useHeaderStatus()
const route = useRoute()
const user = useUserStatus()


const pageTitle = computed(() => {
  return route.path.startsWith('/tenant') ? 'runbiz' : 'OwnWorld';
});


const dialogFixedRect: Ref<FixedSize> = ref({
  justify: 'center',
  align: 'center',
  offsetX: '0px',
  offsetY: '-100px',
  width: '300px',
  height: '180px',
})

// テスト用、role変更
const roleSelectBase: baseProps = defaultBase

const items: ListButtonProps[] = [
  { text: 'Admin', value: ROLE_TYPE.ADMINI },
  { text: 'TenantAdmin ', value: ROLE_TYPE.TENANT_ADMINI },
]

function onChangeRole(value: ROLE_TYPE) {
  user.role.value = value
  router.push(useCheckRole())
}

const openSwitch: Ref<ModalSwitch> = ref({ opened: false })
const dialogSwitch: Ref<ModalSwitch> = ref({ opened: false })
function onOpen(open: boolean) {
  openSwitch.value.opened = open
}

// ユーザー情報＆テナント情報を取得
onBeforeMount(() => {})

const { id, mail, role, tenants } = useUserStatus()
const userOpenSwitch: Ref<ModalSwitch> = ref({ opened: false })
const userData: UserData = { id: id.value, mail: mail.value, role: role.value, tenants: tenants.value }



function onDialogResult(value: any) {
  // console.log(value)
  if (value === 1) {
    const router = useRouter()
    useLogout(router)
  }
}

watch(
  () => user.role.value,
  (newRole) => {
    console.log('Role updated:', newRole);
  }
);

</script>

<style lang="scss" scoped>
.Header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 10px 0 20px;
  h1 {
    padding-top: 2px ;
    font-size: 20px;
  }
  .ActionArea {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .Account {
    white-space: nowrap;
    cursor: pointer;
  }
  .Role {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 140px;
  }
}
</style>
