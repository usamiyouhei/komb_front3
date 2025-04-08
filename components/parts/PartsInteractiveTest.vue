<template>
  <div
    class="InteractiveParts"
    @mousedown="onMouseDown"
    :style="{ transform: `translate(${mouseMoveX}px, ${mouseMoveY}px)` }"
  >
    <v-icon id="icon" size="large" icon="mdi-arrow-all" />
  </div>
</template>

<script setup lang="ts">
/**===================================================================================================================
 * インタラクティブパーツのテスト
 ===================================================================================================================**/

const props = defineProps({
  initialX: {
    type: Number,
    required: true,
  },
  initialY: {
    type: Number,
    required: true,
  },
  moveSampleDivH: {
    type: Number,
    required: true,
  },
  moveSampleDivW: {
    type: Number,
    required: true,
  },
  moveOnlyX: {
    type: Boolean,
    required: true,
  },
  moveOnlyY: {
    type: Boolean,
    required: true,
  },
  dirReset: {
    type: Boolean,
    required: true,
  },
  iconColor: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(['iconMoveLimitE', 'iconCoordE'])

// 定数・変数（state）
let icon: any
let iconD: any
let sampleD: any

// アイコンの初期値
const x = ref(props.initialX)
const y = ref(props.initialY)

const dir_x = ref(x.value)
const dir_y = ref(y.value)

// アイコンの上下左右の値
let iconD_l = 0
let iconD_r = 0
let iconD_t = 0
let iconD_b = 0

// マウスの初期値
// ??:変数名を変更するとアイコンを動かせなくなる
const mouseMoveX = ref(0)
const mouseMoveY = ref(0)

// パーツを囲っているdivの範囲の初期値
let sampleD_h = 0
let sampleD_t = 0
let sampleD_b = 0
let sampleD_l = 0
let sampleD_r = 0

const move_h = ref(props.moveSampleDivH)
const move_w = ref(props.moveSampleDivW)

//　アイテムを囲っているdivのボトム値をユーザーが設定した場合
let setSampleD_b = 0
let setSampleD_r = 0

// 枠とアイコンのボトムの距離
let moveBottom_limit = 0

// 枠とアイコンの右サイドまでの距離
let moveRight_limit = 0

// アイコンの稼働方向の制御状態
const only_x = ref(props.moveOnlyX)
const only_y = ref(props.moveOnlyY)
const reset_dir = ref(props.dirReset)

//　アイコンカラー
const icon_c = ref(props.iconColor)

// ライフサイクル
onMounted(() => {
  //window.addEventListener('resize', onGetPosition)
  // アイコン情報を取得
  icon = document.getElementById('icon')

  // レンダリング後にアイコンの上下左右の値を取得
  iconD = document.querySelector('.InteractiveParts')

  if (iconD) {
    iconD_t = iconD.getBoundingClientRect().top
    iconD_b = iconD.getBoundingClientRect().bottom
    iconD_l = iconD.getBoundingClientRect().left
    iconD_r = iconD.getBoundingClientRect().right
  }

  // アイコンを囲っているdivのサイズを取得して、アイコンの動きを制限する
  sampleD = document.querySelector('.Sample')

  if (sampleD) {
    sampleD_h = sampleD.getBoundingClientRect().height
    sampleD_t = sampleD.getBoundingClientRect().top
    sampleD_b = sampleD.getBoundingClientRect().bottom
    sampleD_l = sampleD.getBoundingClientRect().left
    sampleD_r = sampleD.getBoundingClientRect().right
  }
  setSampleD_r = sampleD_r
  setSampleD_b = sampleD_b
  moveBottom_limit = sampleD_b - iconD_b
  moveRight_limit = iconD_r - sampleD_r
})

onUpdated(() => {
  sampleD_r = sampleD.getBoundingClientRect().right
  emits('iconMoveLimitE', moveBottom_limit, moveRight_limit)
})

//watch
watch(
  () => [props.initialX, props.initialY, props.moveSampleDivH, props.moveSampleDivW],
  ([valueX, valueY, valueH, valueW]) => {
    x.value = valueX
    y.value = -valueY
    move_h.value = valueH
    move_w.value = valueW

    setSampleD_r = sampleD_l + move_w.value
    setSampleD_b = sampleD_b + move_h.value - sampleD_h

    // pagesから移動する値を受け取り、値が枠内であれば初期位置を変更できるように設定
    if (sampleD_t - iconD_t <= y.value && setSampleD_b - iconD_b >= y.value) {
      mouseMoveY.value = y.value
    }
    if (sampleD_l - iconD_l <= x.value && sampleD_r - iconD_r >= x.value) {
      mouseMoveX.value = x.value
    }
  }
)

// アイコンを移動制限に合わせて変更する
watch(
  () => [props.moveOnlyX, props.moveOnlyY, props.dirReset],
  ([boolX, boolY, boolR]): void => {
    only_x.value = boolX
    only_y.value = boolY
    reset_dir.value = boolR

    const removeIcon = () => {
      icon.classList.remove('mdi-arrow-all')
      icon.classList.remove('mdi-arrow-left-right-bold')
      icon.classList.remove('mdi-arrow-up-down-bold')
    }

    if (only_x.value) {
      removeIcon()
      icon.classList.add('mdi-arrow-left-right-bold')
    } else if (only_y.value) {
      removeIcon()
      icon.classList.add('mdi-arrow-up-down-bold')
    } else {
      removeIcon()
      icon.classList.add('mdi-arrow-all')
    }
  }
)

// アイコンをユーザーが選択した色に合わせて変更する
watch(
  () => props.iconColor,
  (valueC): void => {
    icon_c.value = valueC

    icon.style.color = icon_c.value
  }
)

// アイコンをクリックしたときに発生するイベント
// 移動方向を制限を制限している
// TODO:移動方向に合わせてカーソルを変化させる
const onMouseDown = (event: any) => {
  x.value = event.clientX - mouseMoveX.value
  y.value = event.clientY - mouseMoveY.value

  // x = event.clientX or Y - xで移動した分の差分を代入することでマウスとアイコンがずれないようにする
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

const onMouseMove = (event: any) => {
  const newMouseMoveX = event.clientX - x.value
  const newMouseMoveY = event.clientY - y.value

  if (only_x.value) {
    if (newMouseMoveX <= sampleD_l - iconD_l || newMouseMoveX >= sampleD_r - iconD_r) {
      return
    }
    mouseMoveX.value = newMouseMoveX
  }

  if (only_y.value) {
    if (newMouseMoveY <= sampleD_t - iconD_t || newMouseMoveY >= setSampleD_b - iconD_b) {
      return
    }
    mouseMoveY.value = newMouseMoveY
  }

  if (reset_dir.value) {
    // TODO: アイコンを1回動かさないと動かないバグが発生
    if (
      newMouseMoveX <= sampleD_l - iconD_l ||
      newMouseMoveX >= setSampleD_r - iconD_r ||
      newMouseMoveY <= sampleD_t - iconD_t ||
      newMouseMoveY >= setSampleD_b - iconD_b
    ) {
      // console.log(1)
      return
    }

    // マウスが最後に残っていた座標を代入して残すことで、マウスが枠外から戻ってきたとき、アイコンがマウスに追従して動くようになる
    mouseMoveX.value = newMouseMoveX
    mouseMoveY.value = newMouseMoveY
  }

  // エミット
  dir_x.value = iconD.getBoundingClientRect().x
  dir_y.value = iconD.getBoundingClientRect().y
  emits('iconCoordE', dir_x.value, dir_y.value)
  return
}

const onMouseUp = () => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
}
//------------------------------------------------------------------------------------------------------------
// ライフサイクル
// onBeforeMount(() => {
//   //記憶した位置、サイズでの復帰を可能にする
// })

// onBeforeUnmount(() => {
//   //window.removeEventListener('resize', onGetPosition)
// })

//computed
/*
// const counter: Ref<number> = useState('counter', () => 500)

// computedによりcounter変数の監視が行われる
// const doubleCount = computed(() => {
//   return counter.value * 2
// })
*/
</script>

<style lang="scss" scoped>
@use '../../assets/test';
</style>
