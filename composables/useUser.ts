import { ROLE_TYPE, MENU_TYPE } from '@/composables/constants'
import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * roleをCheckして、適切なURLを返す関数
 * middlewareでも使える？
 */
export function useCheckRole(category?: string) {
  const navi = useMainNavigationStatus()
  const { role } = useUserStatus()
  let url = '/login'
  if (role.value === ROLE_TYPE.ADMINI) {
    if (category === 'tenant') {
      url = navi.value.lastTenantUrl
      navi.value.menuType = MENU_TYPE.TENANT
    } else {
      url = navi.value.lastAdminUrl
    }
  } else if (role.value === ROLE_TYPE.TENANT_ADMINI) {
    url = navi.value.lastTenantUrl
    navi.value.menuType = MENU_TYPE.TENANT
  }
  return url
}

// export function useCheckRole(category?: string) {
//   const navi = useMainNavigationStatus();
//   const { role } = useUserStatus();

//   console.log('Current role:', role.value);
//   console.log('Category passed:', category);

//   let url = '/login';

//   if (role.value === ROLE_TYPE.ADMINI) {
//     console.log('Admin role detected');
//     if (category === 'tenant') {
//       url = navi.value.lastTenantUrl || '/default-tenant-url';
//       navi.value.menuType = MENU_TYPE.TENANT;
//     } else {
//       url = navi.value.lastAdminUrl || '/default-admin-url';
//     }
//   } else if (role.value === ROLE_TYPE.TENANT_ADMINI) {
//     console.log('TenantAdmin role detected');
//     url = navi.value.lastTenantUrl || '/default-tenant-url';
//     navi.value.menuType = MENU_TYPE.TENANT;
//   }

//   console.log('Redirect URL:', url);
//   return url;
// }


import { storeToRefs } from 'pinia'
import type { Tenant } from '~/types/api'

export function useUserStatus() {
  const userStore = useUserStore()
  const { id, tenantId, account, firstname, lastname, mail, role, status, memo, tenants } = storeToRefs(userStore)
  return {
    id,
    tenantId,
    account,
    firstname,
    lastname,
    mail,
    role,
    status,
    memo,
    tenants,
  }
}

export const useUserStore = defineStore(
  'user',
  () => {
    // Objectでの保存も考えたが、個別に出し入れしたいので、とりあえず以下でテスト
    const id = ref('')
    const tenantId = ref('')
    const account = ref('')
    const firstname = ref('')
    const lastname = ref('')
    const mail = ref('')
    const role: Ref<ROLE_TYPE | string> = ref(ROLE_TYPE.NONE)
    const status = ref(0)
    const memo = ref('')
    const tenants: Ref<Tenant[]> = ref([{ id: '', tenant_uniquekey: '', tenant_name: '' }])

    return {
      id,
      tenantId,
      account,
      firstname,
      lastname,
      mail,
      role,
      status,
      memo,
      tenants,
    }
  },
  {
    persist: process.client && {
      storage: localStorage,
    },
  }
)

/** ログアウト処理を行う */

export function useLogout(router: any) {
  const tenantState = useTenantSetting()
  tenantState.value.id = ''
  tenantState.value.key = ''
  tenantState.value.name = ''
  tenantState.value.project = undefined
  const userStore = useUserStore()
  const { id, tenantId, account, firstname, lastname, mail, role, status, memo, tenants } = storeToRefs(userStore)
  id.value = ''
  tenantId.value = ''
  account.value = ''
  firstname.value = ''
  lastname.value = ''
  mail.value = ''
  role.value = ROLE_TYPE.NONE
  status.value = -1
  memo.value = ''
  tenants.value = []

  const navi = useMainNavigationStatus()
  navi.value.lastTenantUrl = '/tenant'
  navi.value.lastAdminUrl = '/admin'
  navi.value.lastRunbizUrl = '/runbiz'

  const sessionCheck = useSession()
  sessionCheck.value.onetime_token = ''
  sessionCheck.value.start_time = ''

  // console.log('ログアウト処理完了', role.value, id.value)
  navigateTo('/login')
}
