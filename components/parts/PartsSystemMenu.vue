<template>
  <div class="SystemWindow">
    <div
      class="ActiveRect"
      :class="{
        transitionAll: transitionAll,
      }"
      :style="{
        width: `${viewportWidth}px`,
        height: `${viewportHeight}px`,
        display: isOpen ? 'flex' : 'none',
        justifyContent: fixedMenuRect.justify,
        alignItems: fixedMenuRect.align,
      }"
    >
      <div
        class="SystemMenu"
        v-click-outside="onClickOutside"
        v-if="isOpen"
        :style="{
          position: 'relative',
          left: fixedMenuRect.offsetX,
          top: fixedMenuRect.offsetY,
          width: fixedMenuRect.width,
          height: fixedMenuRect.height,
        }"
      >
        <div class="Content">
          <div class="Menu" v-if="selectType === 'menu'" @click="onClickMenu">
            <ul v-for="(menu, i) in menuData" :key="i" class="Lists">
              <li class="List">
                <NuxtLink>{{ menu.name }}</NuxtLink>
              </li>
            </ul>
            <hr />
            <ul class="Lists">
              <li class="List" @click="logout()">ログアウト</li>
            </ul>
          </div>
          <slot v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type FixedSize } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
import { type ModalSwitch } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/types'
//------------------------------------------------------------------------------------------------------------
// 引数
//------------------------------------------------------------------------------------------------------------
interface MenuData {
  name: string
}

interface Props {
  switcher: ModalSwitch
  fixedMenuRect?: FixedSize
  selectType?: string
}

const props = withDefaults(defineProps<Props>(), {
  selectType: 'menu',
})

//------------------------------------------------------------------------------------------------------------
// 定数・変数（state）
//------------------------------------------------------------------------------------------------------------
const transitionAll = ref(true)
const isOpen = ref(props.switcher.opened)
const viewportWidth = ref(window.innerWidth)
const viewportHeight = ref(window.innerHeight)
const menuData: MenuData[] = [{ name: 'menu1' }, { name: 'menu2' }, { name: 'menu3' }]

const fixedMenuRect = ref({
  justify: props.fixedMenuRect?.justify || 'flex-end',
  align: props.fixedMenuRect?.align || 'flex-start',
  offsetX: props.fixedMenuRect?.offsetX || '-20px',
  offsetY: props.fixedMenuRect?.offsetY || '45px',
  width: props.fixedMenuRect?.width || '230px',
  height: props.fixedMenuRect?.height || '180px',
})

//------------------------------------------------------------------------------------------------------------
// ライフサイクル
//------------------------------------------------------------------------------------------------------------
onMounted(() => {
  viewportWidth.value = window.innerWidth
  viewportHeight.value = window.innerHeight
  window.addEventListener('resize', onWindowResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
})

//------------------------------------------------------------------------------------------------------------
// watch
//------------------------------------------------------------------------------------------------------------
watch(
  () => props.switcher,
  (value) => {
    transitionAll.value = true
    isOpen.value = value.opened
  },
  {
    deep: true,
  }
)

//------------------------------------------------------------------------------------------------------------
// メソッド
//------------------------------------------------------------------------------------------------------------

function onWindowResize() {
  transitionAll.value = false
  viewportWidth.value = window.innerWidth
  viewportHeight.value = window.innerHeight
}

function logout() {
  const router = useRouter()
  useLogout(router)
}

//------------------------------------------------------------------------------------------------------------
// エミット
//------------------------------------------------------------------------------------------------------------
const emits = defineEmits<{ (e: 'update:close', item: boolean): void }>()

function onClickMenu() {
  isOpen.value = true
  props.switcher.opened = true
  emits('update:close', true)
}

function onClickOutside() {
  isOpen.value = false
  props.switcher.opened = false
  emits('update:close', false)
}
</script>

<style lang="scss" scoped>
@use '../../assets/test';
.transitionAll {
  transition: all 0.2s;
}
.ActiveRect {
  position: absolute;
  transition: left 0.2s, top 0.2s;
  overflow: hidden;
  pointer-events: auto;
}

.SystemMenu {
  box-shadow: 0 1px 4px 0 rgba(25, 25, 25, 0.4) !important;
  overflow: hidden;
  pointer-events: auto;
}

.Content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 0;
  }
}

.Menu {
  position: relative;
  .Lists {
    margin: 0;
    padding: 0;
    text-align: left;
    list-style: none;
    font-size: 14px;
    .List {
      line-height: 35px;
      height: 35px;
      padding-left: 20px;
      margin: 0;
    }
    &:hover {
      .List {
        background-color: #d3d3d3;
        opacity: 0.8;
        cursor: pointer;
      }
    }
    &:active {
      .List {
        opacity: 0.1;
        transition: opacity 0.1s ease;
      }
    }
  }
}
</style>
