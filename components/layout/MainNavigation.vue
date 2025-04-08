<template>
  <div
    class="MainNavigation"
    :style="{
      height: `calc(100% - ${header.height}px - ${subHeader.height}px - ${footer.height}px)`,
      top: `calc(${header.height}px + ${subHeader.height}px)`,
      width: `${status.width}px`,
      backgroundColor: useColor('background'),
      color: useColor('color'),
    }"
  >
    <div class="ActionArea">
      <ButtonIcon
        :icon="ICONS.PLAY"
        :color="isDark() ? '#ccc' : '#333'"
        :size="20"
        :rotation="status.open ? '180deg' : '0deg'"
        @click="onOpen()"
        :style="{
          transition: 'marginRight 0.2s ease-in-out',
          marginRight: status.open ? '0' : '5px',
        }"
      />
    </div>
    <div class="ScrollArea">
        <!-- <div v-for="item in items[status.menuType]" :key="item.text"> -->
          <div v-for="item in currentItems" :key="item.text || index">
        <div v-if="item.text === 'tenantName'" class="TenantName">
          <div
            class="Inner"
            :class="{ InnerButton: tenants.length > 1 }"
            @click="tenants.length > 1 ? $router.push('/tenant/tenants') : ''"
          >
            <PartsTextIcon :text="tenant.value.name" />
            <div class="Text">{{ tenant.value.id ? tenant.value.name : 'テナント未選択' }}</div>
            <v-icon icon="mdi-cached" class="ChangeIcon"></v-icon>
          </div>
        </div>
        <template v-else-if="(status.menuType === 'Tenant' && tenant.value.id) || status.menuType !== 'Tenant'">
          <div
            v-if="item.text === 'projectName'"
            class="ProjectName"
            @click="$router.push('/tenant/projects/entrance')"
          >
            <ButtonBasic
              class="LocalMenuItem"
              :class="{
                Actived: routerPath === item.active,
                Dark: isDark(),
              }"
              :text="tenant.value.project ? tenant.value.project.name : '未選択'"
              :beforIcon="'mdi-arrow-right-bottom'"
              :iconSize="item.iconSize"
              :iconTop="item.iconTop"
              :iconLeft="item.iconLeft"
              :broad="true"
              :active="routerPath === item.active"
              :align="'flex-start'"
              @click="item.url ? $router.push(item.url) : null"
            />
          </div>
          <template v-else-if="item.text === 'tenant'">
            <ButtonBasic
              v-if="tenants.length > 0"
              class="LocalMenuItem"
              :class="{
                Actived: routerPath === item.active,
                Dark: isDark(),
              }"
              :text="'テナント変更'"
              :beforIcon="item.icon"
              :iconSize="item.iconSize"
              :iconTop="item.iconTop"
              :iconLeft="item.iconLeft"
              :active="routerPath === item.active"
              :broad="true"
              :align="'flex-start'"
              @click="item.url ? $router.push(item.url) : null"
            />
          </template>
          <!-- <div v-else-if="item.text === 'border'" class="Border" /> -->
          <ButtonArrow
            v-else-if="(status.menuType === 'tenant' && tenant.value.id) || status.menuType !== 'tenant'"
            class="LocalMenuItem"
            :class="{
              Actived: routerPath === item.active,
              Dark: isDark(),
            }"
            :text="item.text"
            color="#333"
            backcolor="THEME_COLOR.surface"
            :beforIcon="item.icon"
            :after-icon="['contracts', 'orders', 'accounts', 'salaries', 'management'].includes(item.identifier) ? 'mdi-chevron-down' : ''" 
            :iconSize="item.iconSize"
            :iconTop="item.iconTop"
            :iconLeft="item.iconLeft"
            :actived="expandedItem === item.identifier"
            :active="routerPath === item.active"
            :broad="true"
            :align="'flex-start'"
            @click="handleButtonClick(item)"
            />

          <div v-if="expandedItem === item.identifier" class="submenu">
            <ButtonBasic
              v-for="subItem in dataMapping[item.identifier]"
              :key="subItem.value"
              class="SubMenuItem"
              :style="{paddingLeft:'40px' ,}"
              :text="subItem.text"
              :active="routerPath === subItem.active"
              :align="'flex-start'"
              @click="router.push(subItem.url)"
            />
          </div>
          <!-- <template v-if="activeButton === item.identifier">

            <ButtonRadioSet
              v-if="selectType === SELECT_LIST_TYPE.RADIO"
              :items="buttonData[item.identifier] || []"
              :value="input"
              :color="backcolor"
              @update:value="handleSubItemClick"
            />
            <ButtonBasic
              v-else
              :items="buttonData[item.identifier] || []"
              :value="input"
              :color="backcolor"
               :active="routerPath === item.active"
              @update:value="handleSubItemClick"
            />
           
          </template> -->
          <!-- <ButtonIcon class="menuIcon":icon="['contracts', 'orders', 'accounts', 'salaries', 'management'].includes(item.identifier) ? 'mdi-chevron-down' : ''" /> -->
          <!-- <v-icon icon="mdi-cached" class="ChangeIcon"></v-icon> -->
          <!-- <ButtonArrow
            v-if="['contracts', 'orders', 'accounts', 'salaries', 'management'].includes(item.identifier)"
              name="test5"
              class="mr-10"
              :text="item.text"
              :beforIcon="item.icon"
              :value="selectedValue"
              :iconLeft="item.iconLeft"
              :items="getButtonItems(item.identifier)"
              color="'#333'"
              :backcolor="useColor(THEME_COLOR.background)"
              :style="{
                color:'#333'
              }"
              :input-type="SELECT_INPUT_TYPE.BUTTON"
              :select-type="SELECT_LIST_TYPE.RADIO"
              @update:value="(newValue) => (input.value = newValue)"
            /> -->
        </template>
      </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { type ListButtonProps } from "@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common";
import {
  SELECT_INPUT_TYPE,
  SELECT_LIST_TYPE,
} from "@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common";

/**===================================================================================================================
 * メインナビゲーション
 ===================================================================================================================**/
interface itemStatus {
  text: string
  url?: string
  active?: string
  icon?: string
  iconSize?: number
  iconTop?: string
  iconLeft?: string
  iconRotation?: string
  narrow?: boolean
}
type ButtonIdentifier = 'contracts' | 'orders' | 'accounts' | 'salaries' | 'management';

//------------------------------------------------------------------------------------------------------------
// 引数
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// 定数・変数（state）
//------------------------------------------------------------------------------------------------------------
const header = useHeaderStatus()
const subHeader = useSubHeaderStatus()
const footer = useFooterStatus()
const status = useMainNavigationStatus()
// const ruterPath = ref('/')
const router = useRouter()
const routerPath = ref(router.currentRoute.value.path);
const isShowSelect = ref(false)
const activeButton = ref<string>('');
const selectType = ref<string | null>(null);
const backcolor = ref('#fff');
const dataFiltered = ref([]);
// const buttonData = ref<Record<string, { text: string; value: string }[]>>({});
  // const buttonData = ref<Record<string, Array<{ text: string; value: string; url: string }>>>();
const buttonData = ref({});

const tenant = useTenantSetting()
const { tenants } = useUserStatus()
const tabPath = ref("")
const selectedValue = ref<string | number | boolean>('');
// const input = ref<string>("");
const getButtonItems = (identifier: string): ListButtonProps[] => {
return itemsByIdentifier[identifier] || [];
};

const expandedItem = ref<string | null>(null);


const items: { [key: string]: itemStatus[] } = {
  Test: [
    { text: 'ボタンテスト', active: '/test/buttons', url: '/test/buttons/basic', icon: 'mdi-button-pointer' },
    { text: 'パーツテスト', active: '/test/parts', url: '/test/parts/modal', icon: 'mdi-nut' },
    { text: 'フォームテスト', active: '/test/forms', url: '/test/forms/input', icon: 'mdi-list-box' },
    { text: 'ヒントとコツ', active: '/test/tips', url: '/test/tips/datetime', icon: 'mdi-lightbulb-alert' },
    { text: 'テンプレート', active: '/test/template', url: '/test/template/list', icon: 'mdi-table' },
    { text: 'カラー', active: '/test/colors', url: '/test/colors/colors', icon: 'mdi-palette' },
  ],
  Admin: [
    { text: 'エントランス', active: '/admin', url: '/admin', icon: 'mdi-home-variant-outline' },
    { text: 'border' },
    {
      text: 'プラン変更申請',
      active: '/admin/serviceplan/',
      url: '/admin/serviceplan/applies',
      icon: 'mdi-book-refresh-outline',
    },
    {
      text: 'アカウント申請',
      active: '/admin/account/',
      url: '/admin/account/applies',
      icon: 'mdi-account-plus-outline',
    },
    { text: 'border' },
    { text: 'テナント管理', active: '/admin/tenants', url: '/admin/tenants', icon: 'mdi-store-outline' },
    {
      text: 'ファイル管理',
      active: '/admin/filesmanagement/',
      url: '/admin/filesmanagement/',
      icon: 'mdi-file-upload-outline',
    },
    { text: 'border' },
    {
      text: '管理者一覧',
      active: '/admin/administrators',
      url: '/admin/administrators',
      icon: 'mdi-account-tie',
    },
    {
      text: 'テナント通知管理',
      active: '/admin/tenantnotices',
      url: '/admin/tenantnotices',
      icon: 'mdi-comment-edit-outline',
    },
  ],
  // Tenant: [
  //   { text: 'tenantName' },
  //   { text: 'エントランス', active: '/tenant', url: '/tenant', icon: 'mdi-home-variant-outline' },
  //   { text: 'プロジェクト管理', active: '/tenant/projects', url: '/tenant/projects', icon: 'mdi-earth' },
  //   {
  //     text: 'projectName',
  //     active: '/tenant/projects/',
  //     icon: 'mdi-arrow-up-left',
  //     iconTop: '-7px',
  //     iconLeft: '6px',
  //   },
  //   { text: 'border' },
  //   {
  //     text: '管理者一覧',
  //     active: '/tenant/administrators',
  //     url: '/tenant/administrators',
  //     icon: 'mdi-account-tie',
  //   },
  // ],
  Tenant: [
    { text: '事業部一覧', active: '/tenant/departments', url: '/tenant/departments', icon: 'mdi-domain' },
    { text: 'プロジェクト一覧', active: '/tenant/project/projectList', url: '/tenant/project', icon: 'mdi-file-document-multiple-outline' },
    { text: '従業員一覧', active: '/tenant/employees', url: '/tenant/employees', icon: 'mdi-text-account' },
    { text: '取引先一覧', active: '/tenant/clients', url: '/tenant/clients', icon: 'mdi-office-building' },
    { text: '契約書', active: '/tenant/contracts', url: '/tenant/contracts', icon: 'mdi-draw-pen',identifier: 'contracts' },
    { text: '受発注', active: '/tenant/purchase_orders', url: '/tenant/purchase_orders', icon: 'mdi-folder-arrow-left-right-outline', identifier: 'orders'  },
    { text: '職種一覧', active: '/tenant/occupations', url: '/tenant/occupations', icon: 'mdi-account-file-text' },
    { text: '勘定科目マスタ', active: '/tenant/accounts', url: '/tenant/accounts', icon: 'mdi-account-details', identifier: 'accounts' },
    { text: '組織収支', active: '/tenant/organizations/profit_loss', url: '/tenant/organizations/profit_loss', icon: 'mdi-finance' },
    { text: '組織売上', active: '/tenant/organizations/sales', url: '/tenant/organizations/sales', icon: 'mdi-chart-line' },
    { text: '組織費用', active: '/tenant/organizations/cost', url: '/tenant/organizations/cost', icon: 'mdi-bank-transfer' },
    { text: '給与・賞与', active: '/tenant/salaries_bonuses', url: '/tenant/salaries_bonuses', icon: 'mdi-account-cash', identifier: 'salaries' },
    { text: '経営管理', active: '/tenant/management', url: '/tenant/management', icon: 'mdi-office-building-cog', identifier: 'management' },
  ],
}


const dataMapping: Record<ButtonIdentifier, { text: string; value: string; active: string; url: string }[]> = {
  contracts: [
    { text: "契約書一覧", value: "contract",active: "/contracts", url: "/tenant/contracts" },
    { text: "契約種別一覧", value: "contract_types", active: "/contracts/types", url: "/tenant/contracts/types" },
  ],
  orders: [
    { text: "受発注一覧", value: "quote_list",active: "/purchase_orders", url: "/tenant/purchase_orders" },
    { text: "受注", value: "purchase", active: "/purchase_orders/purchase", url: "/tenant/purchase_orders/purchase" },
    { text: "発注", value: "orders", active: "/purchase_orders/orders", url: "/tenant/purchase_orders/orders" },
  ],
  accounts: [
    { text: "勘定科目一覧", value: "account_manager", active: "/accounts", url: "/tenant/accounts" },
    { text: "子勘定科目一覧", value: "account_staff", active: "/accounts/sub_accounts", url: "/tenant/accounts/sub_accounts" },
  ],
  salaries: [
    { text: "給与", value: "salaries", active: "/salaries_bonuses/salaries", url: "/tenant/salaries_bonuses/salaries" },
    { text: "賞与", value: "bonuses", active: "/salaries_bonuses/bonuses", url: "/tenant/salaries_bonuses/bonuses" },
  ],
  management: [
    { text: "経営管理者", value: "management_manager", active: "/management", url: "/tenant/management" },
    { text: "経営担当者", value: "management_staff", active: "/management/staff", url: "/tenant/management/staff" },
  ],
};
/*
{
  text: 'プロジェクト',
  active: '/tenant/projects/',
  url: '/tenant/projects/',
  icon: 'mdi-image-multiple-outline',
  iconSize: 20,
  iconLeft: '30px',
  narrow: true,
},
*/

//------------------------------------------------------------------------------------------------------------
// ライフサイクル
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
//watch
//------------------------------------------------------------------------------------------------------------
// watch(
//   router.currentRoute,
//   (value) => {
//     const path = value.path;

//     if(path.startsWith('/tenant')) {
//       status.menuType = 'Tenant'
//     } else if (path.startsWith('/admin')) {
//       status.menuType = 'Admin'
//     } else if (path.startsWith('/runbiz')) {
//       status.menuType = 'Runbiz'
//     } else if (path.startsWith('/test')) {
//       status.menuType = 'Test'
//     } else {
//       status.menuType = '';
//     }

//     // const array = value.path.split('/')
//     // if (array.length > 3) {
//     //   ruterPath.value = '/' + array[1] + '/' + array[2] + '/'
//     // } else if (array.length > 2) {
//     //   ruterPath.value = '/' + array[1] + '/' + array[2]
//     // } else {
//     //   ruterPath.value = '/' + array[1]
//     // }
//     // // tabPath.value = routerPath.value.split("/")
//   },
//   { deep: true, immediate: true }
// )

watchEffect(() => {
  console.log("buttonData updated:", buttonData);
});

const currentItems = computed(() => {
  if (routerPath.value.startsWith('/tenant')) {
    return items.Tenant;
  } else if (routerPath.value.startsWith('/admin')) {
    return items.Admin;
  } else if (routerPath.value.startsWith('/test')) {
    return items.Test;
  }
  return items.Test;
});


// ルートパスの変更を監視
watch(
  () => router.currentRoute.value.path,
  (newPath) => {
    routerPath.value = newPath;
  },
  { immediate: true }
);
console.log("Current Route Path:", router.currentRoute.value.path);



const input = ref("");
function onChange(value: any) {
  input.value = value;
}
//------------------------------------------------------------------------------------------------------------
// エミット
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// メソッド
//------------------------------------------------------------------------------------------------------------

const handleButtonClick = (item) => {
  console.log("Button Clicked:", item);
  console.log("Expanded Item before:", expandedItem.value);
  
  if (['contracts', 'orders', 'accounts', 'salaries', 'management'].includes(item.identifier)) {
    activeButton.value = activeButton.value === item.identifier ? null : item.identifier;
    expandedItem.value = expandedItem.value === item.identifier ? null : item.identifier;

    console.log("Expanded Item after:", expandedItem.value);
    
    selectType.value = "RADIO";
    buttonData.value[item.identifier] = dataMapping[item.identifier] || [];
  } else if (item.url) {
    router.push(item.url);
  }
};

function onOpen() {
  status.value.open = !status.value.open
  if (status.value.open) {
    status.value.width = 180
  } else {
    status.value.width = 48
    expandedItem.value = null;
  }
}
</script>

<style lang="scss" scoped>
.MainNavigation {
  position: fixed;
  padding-top: 0px;
  margin-right: 14px;
  background: #fff;
  transition: width 0.2s;
  li {
    position: relative;
    line-height: 14px;
  }
  .ActionArea {
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    padding-right: 2px;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  }

  .ScrollArea {
    position: relative;
    width: calc(100% + 13px);
    height: calc(100% - 52px);
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .LocalMenuItem {
    width: 192px;
    justify-content: flex-start;
    padding: 6px 11px;
    height: 42px !important;
    transition: background-color 0.5s ease;
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      transition: background-color 0s ease;
    }
    &.Actived {
      color: rgba(var(--r-color-primary), 1);
      background: rgba(var(--r-color-surface), 1);
      &:hover {
        background: rgba(var(--r-color-surface), 1);
      }
      .mdi-chevron-down {
  margin-left: auto; /* 右端に移動 */
  text-align: right; /* アイコンの位置を右揃え */
}

    }
    &.Dark {
      &.Actived {
        color: #fff;
        background: rgba(var(--r-color-surface), 1);
        &:hover {
          background: rgba(var(--r-color-surface), 1);
        }
      }
    }
  }
  .TenantName {
    position: relative;
    background-color: rgba(0, 0, 0, 0.3);
    font-size: 14px;
    height: 42px;
    border-top: 1px solid rgba(0, 0, 0, 0.4);
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    margin-bottom: 1px;
    overflow: hidden;
    .Inner {
      position: relative;
      width: 180px;
      height: 42px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 11px;
      .Text {
        margin-top: 2px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100px;
      }
      .ChangeIcon {
        position: absolute;
        display: none;
        top: 10px;
        right: 6px;
      }
      &.InnerButton {
        cursor: pointer;
        .ChangeIcon {
          display: block;
          opacity: 0.5;
        }
      }
      &.InnerButton:hover {
        .ChangeIcon {
          opacity: 1;
        }
      }
    }
  }

  .Border {
    height: 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  }
}

.submenu {
  padding-left: 8px;
}
.SubMenuItem {
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-top: 4px;
}

.after-icon {
  transition: transform 0.3s ease;
}

.rotated {
  transform: rotate(180deg);
}



::v-deep(.Label) {
  color: #333 !important;
  padding-right: 8px !important;
}
::v-deep(.mdi-chevron-down) {
  color: #333 !important;
}
::v-deep(.FloatCard) {
  width: 194%;
}
::v-deep(.ListItem) {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
