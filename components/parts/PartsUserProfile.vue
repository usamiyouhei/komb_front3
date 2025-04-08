<template>
  <ClientOnly>
    <teleport to="#modal-area">
      <PartsModalWindow
        name="UserStatusWindow"
        :title="'アカウント情報'"
        :switcher="switcher"
        :fixedSize="fixedRect"
        :scroll="false"
        :fixed="true"
        :resize="false"
        :small="true"
        :modeless="true"
      >
        <template #title>
          <div class="title">アカウント情報</div>
        </template>
        <div class="UserInfo">
          <div class="LocalForm">
            <ListFormProvider
              v-if="isInitialize"
              :headers="headers"
              :base="base"
              :edit="mode"
              :is-new="true"
              :datas="formDatas"
              :debug="isDebug"
              @update:change="onChange($event)"
            />
          </div>
          <div class="error mb-2">
            {{ errorMessage }}
          </div>
          <ButtonSimple
            class="LocalForm"
            text="名前を変更する"
            :height="44"
            :disabled="isError"
            @click="onClick()"
          />
          <h2 class="mt-10 mb-4">パスワード変更の為のメールを送信する</h2>
          <ButtonSimple
            class="LocalForm"
            text="メールを送信する"
            :height="44"
            @click="onSpendMail()"
          />
        </div>
      </PartsModalWindow>
    </teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
/**===================================================================================================================
 *
 ===================================================================================================================**/
//------------------------------------------------------------------------------------------------------------
// 引数
import type { ModalSwitch } from "rz-module/types";
import {
  FORM_MODE,
  FORM_ITEM,
  type FixedSize,
  type formItem,
  type baseProps,
  type DataTableHeader,
} from "rz-module/components/common";
import { useRoute } from "vue-router";

// import { type UserData } from "@/components/layout/LayoutTenantHeader.vue";

//------------------------------------------------------------------------------------------------------------
// 定数・変数（state）
//------------------------------------------------------------------------------------------------------------
interface Props {
  switcher: ModalSwitch;
  scroll?: boolean;
  name?: string;
  userData?: UserData;
}

const props = withDefaults(defineProps<Props>(), {
  scroll: false,
  resize: false,
  fixed: true,
  small: true,
});
const errorMessage = ref("");
const mode = ref("edit");
const formDatas: Ref<{ [key: string]: formItem }> = ref({});
const input: any = ref({ new: true });
const base: baseProps = {
  label: {
    width: 200,
    weight: "bold",
    align: "flex-start",
  },
  mode: FORM_MODE.DEFAULT,
};
const isError = ref(true);
const isDebug = ref(false);
const isInitialize = ref(false);

const userStore = useUserStore();
const { name: userName } = storeToRefs(userStore);
const headers: Ref<DataTableHeader[]> = ref([
  {
    key: "name",
    title: "名前",
    align: "start",
    sortable: true,
    width: 240,
    values: userName.value,
    type: FORM_ITEM.INPUT,
    rule: [RULE.required],
  },
]);

const custom: Ref<baseProps> = ref({ label: {} });
const userData = ref(props.userData);

// サイズ固定＆不動ダイアログ
const fixedRect: Ref<FixedSize> = ref({
  justify: "flex-end",
  align: "flex-start",
  offsetX: "-20px",
  offsetY: "50px",
  width: "370px",
  height: "460px",
});

custom.value = {
  label: {
    width: 50,
    weight: "normal",
    align: "flex-start",
  },
  edit: false,
  mode: FORM_MODE.INLINE,
};

const snackbar = useSnackbarList();

//------------------------------------------------------------------------------------------------------------
// ライフサイクル
//------------------------------------------------------------------------------------------------------------
onMounted(() => {
  //window.addEventListener('resize', onGetPosition)
  createFormData(headers.value, input.value);
});

//------------------------------------------------------------------------------------------------------------
//watch
//------------------------------------------------------------------------------------------------------------
watch(
  () => props.userData,
  (value) => {},
  {
    deep: true,
  }
);

//------------------------------------------------------------------------------------------------------------
//watch
//------------------------------------------------------------------------------------------------------------
function createFormData(headers: any, value: any) {
  // フォームデータを作成する
  formDatas.value = {};
  const { error, view } = useCreateFormData(headers, value, formDatas);
  isError.value = error;
  mode.value = view;
  formDatas.value.name.value = userName.value;
  console.log(formDatas.value.name, error, view, userName.value);

  isInitialize.value = true;
}

function updateFile(value: any) {
  console.log();
}

function onChange(key: string) {
  onCheck();
}

function onCheck() {
  isError.value = false;
  for (const key in formDatas.value) {
    console.log(key, formDatas.value[key]);
    if (!formDatas.value[key].isCheck || formDatas.value[key].error) {
      isError.value = true;
    }
  }
  errorMessage.value = "";

  /*
  if (name.value && password.value && password_confirmation.value) {
    isDisabled.value = false;
  } else {
    isDisabled.value = true;
  }
  errorMessage.value = "";
  */
}
async function onClick() {
  //formDatas.value["name"].value
  console.log("onClick", isError.value, formDatas.value["name"].value);

  if (isError.value) return;
  if (formDatas.value["name"].value) {
    errorMessage.value = "";
    const putData: PutUserNameBody = {
      name: formDatas.value["name"].value,
    };
    const { res, error } = await usePutUserName(putData);
    if (res) {
      userName.value = res.name;
    }
    if (!error) {
      const snackTitle = "名前の変更";
      const snackText = "名前の変更が完了しました。";
      snackbar.setItem({
        title: snackTitle,
        text: snackText,
        icon: SNACKBAR_TYPE.INFO,
        time: 10000,
      });
    }
  }
}

async function onSpendMail() {
  const { res, error } = await usePostUserPassword();
  console.log(res, error);
  if (!error) {
    const snackTitle = "パスワード変更のメール";
    const snackText = "パスワード変更のメールを送信しました。";
    snackbar.setItem({
      title: snackTitle,
      text: snackText,
      icon: SNACKBAR_TYPE.INFO,
      time: 10000,
    });
  }
}
</script>

<style lang="scss" scoped>
.UserInfo {
  position: relative;
  padding: 16px 20px;
  h2 {
    position: relative;
    font-size: 14px;
    font-weight: 400;
    color: #000;
  }
  p {
    position: relative;
    font-size: 12px;
    color: #000;
  }
}
.title {
  width: 100%;
  text-align: center;
  font-weight: bold;
}
</style>
