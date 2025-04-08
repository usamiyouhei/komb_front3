<template>
  <LayoutTestArticle title="インタラクティブパーツ作成の練習">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>コンポーネント作成とライフサイクルの把握</h5>
          <p>ページやコンポーネントの基本的な作成方法と、ライフサイクルの把握</p>
          <div>
            <h6>初期位置の設定</h6>
            <!-- TODO:emitを使用してエラーメッセージを表示させたいが後から行う -->
            <label class="label">縦位置</label>
            <input type="number" v-model="initial_y" />

            <label class="label">横位置</label>
            <input type="number" v-model="initial_x" />

            <h6>移動範囲の設定</h6>
            <label class="label">縦方向</label>
            <input type="number" v-model="moveRange_h" />
            <label class="label">横方向</label>
            <input type="number" v-model="moveRange_w" />

            <h6>稼働方向の設定</h6>
            <button data-index="x" class="text2" @click="setDirection">横方向のみ</button>
            <button data-index="y" class="text2" @click="setDirection">縦方向のみ</button>
            <button data-index="reset" class="text2" @click="setDirection">リセット</button>

            <h6>アイコンの色を変更</h6>
            <input type="color" v-model="icon_color" />
            <h6>アイコンの座標</h6>
            <p>X軸:{{ icon_x }}</p>
            <p>Y軸:{{ icon_y }}</p>

            <h6>アイコンの位置をスライダーで調整</h6>
            <label class="label">X軸調整</label>
            <PartsSlider />
            <label class="label">Y軸調整</label>
            <PartsSlider />
          </div>

          <h6>エレメントのドラッグ</h6>
          <div>
            <div class="Sample">
              <PartsInteractiveTest
                :initialX="initial_x"
                :initialY="initial_y"
                :moveSampleDivH="moveSampleDiv_h"
                :moveSampleDivW="moveSampleDiv_w"
                :moveOnlyX="moveOnly_x"
                :moveOnlyY="moveOnly_y"
                :dirReset="dir_reset"
                :iconColor="icon_color"
                @iconMoveLimitE="iconMoveLimit"
                @iconCoordE="iconCoord"
              />
            </div>
          </div>

          <ul class="mt-1">
            <li>
              <h6>まずはドラッグ移動(@mousedown && addEventListener && removeEventListener)</h6>
              <p>とりあえず、エレメントをドラッグで動かせるようになる</p>
            </li>
            <li>
              <h6>ブラウザ領域外でのmouseupの取得</h6>
              <p>忘れがちなので、ちゃんと処理する</p>
            </li>
            <li>
              <h6>初期位置(propsとstate/ref)</h6>
              <p>propsで初期位置を指定出来るようにする</p>
            </li>
            <li>
              <h6>稼働方向の制限</h6>
              <p>縦にだけ移動、横にだけ移動を可能にするpropsを実装する</p>
            </li>
            <li>
              <h6>アイコンの変更:</h6>
              <p>
                稼働方向の設定に合わせてアイコンを変更する<br />
                <NuxtLink to="https://vuetifyjs.com/en/components/icons/" target="_blank"
                  >https://vuetifyjs.com/en/components/icons/</NuxtLink
                ><br />
                <NuxtLink to="https://pictogrammers.com/library/mdi/" target="_blank"
                  >https://pictogrammers.com/library/mdi/</NuxtLink
                >
              </p>
            </li>
            <li>
              <h6>マウスカーソルの対応:</h6>
              <p>
                マウスオーバー時に、マウスカーソルが変わるようにする<br />稼働方向に応じて、カーソルが変化するとなお良し
              </p>
            </li>

            <li>
              <h6>稼働範囲の制限:</h6>
              <p>指定した領域無いだけ移動出来るようにする<br />propsで移動領域を指定できるようにする</p>
            </li>
            <li>
              <h6>色の変更:</h6>
              <p>propsで色を変更できるようにする</p>
            </li>
            <li>
              <h6>エミット(emit)</h6>
              <p>移動した座標を、親コンポーネントで取得出来るようにする。<br />このテストページで座標を表示する</p>
            </li>
            <li>
              <h6>ウォッチ(watch)</h6>
              <p>外部にボタンや、スライダーを起き、その値で位置が動くようにする</p>
            </li>
            <li>
              <h6>位置情報の保存と復帰</h6>
              <p>移動した位置を状態管理で保存、ページに戻った時に再度反映差せる</p>
              <p>上記が出来たら、その情報をセッションストレージに保存、リロード時その値を位置に反映差せる</p>
              <p>上記が出来たら、その情報をローカルストレージに保存し永続化、リロード時その値を位置に反映差せる</p>
            </li>
          </ul>
        </section>
      </div>
    </LayoutTestReview>
  </LayoutTestArticle>
</template>

<script setup lang="ts">
/**===================================================================================================================
 * インタラクティブパーツ作成の練習
 ===================================================================================================================**/
definePageMeta({
  layout: 'default',
})

useHead({
  title: 'パーツテスト',
})

// コンテンツクラスのDivの初期値を取得
let contentsDiv: any
const contentsDiv_r = ref(0)

//アイコンを囲っているDivの初期値を取得
let sampleDiv: any
let sampleDiv_h = 0
let sampleDiv_w = 0
const sampleDiv_l = ref(0)

let moveSampleDiv_h = 0
let moveSampleDiv_w = 0

// アイコンのボトムまでの距離
let bottom_range = 0

// アイコンの右サイドまでの距離
let right_range = 0

// 定数・変数（state）
const initial_x = ref(0)
const initial_y = ref(0)

const moveRange_h = ref(0)
const moveRange_w = ref(0)

// 稼働方向を制限するための定数・変数
const moveOnly_x = ref(false)
const moveOnly_y = ref(false)
const dir_reset = ref(true)

// アイコンの色
const icon_color = ref()

// アイコンの座標
const icon_x = ref(0)
const icon_y = ref(0)

const resetDirection = () => {
  moveOnly_x.value = false
  moveOnly_y.value = false
  dir_reset.value = false
}

// 関数
const setDirection = (e: any) => {
  const data = e.currentTarget.dataset['index']
  if (data === 'x') {
    resetDirection()
    moveOnly_x.value = true
  } else if (data === 'y') {
    resetDirection()
    moveOnly_y.value = true
  } else {
    resetDirection()
    dir_reset.value = true
  }
}

onMounted(() => {
  //window.addEventListener('resize', onGetPosition)
  // 描画後にdivの大きさを取得
  contentsDiv = document.querySelector('.Contents') as HTMLElement
  contentsDiv_r.value = contentsDiv.getBoundingClientRect().right

  sampleDiv = document.querySelector('.Sample') as HTMLElement
  sampleDiv_h = sampleDiv.clientHeight
  sampleDiv_w = sampleDiv.clientWidth
  sampleDiv_l.value = sampleDiv.getBoundingClientRect().left
})

//watch
watch([moveRange_h, moveRange_w, contentsDiv_r], () => {
  if (sampleDiv && contentsDiv) {
    // 動的にユーザーが画面幅を変更した場合に対応するため
    contentsDiv_r.value = contentsDiv.getBoundingClientRect().right

    // divの初期値を移動範囲に入力された値と計算することでdivの大きさを調整している
    // 条件分岐はアイテムのボトムと右サイドより枠が内側に入らないように制御している
    if (moveRange_h.value <= bottom_range) {
      moveSampleDiv_h = sampleDiv_h - moveRange_h.value
      sampleDiv.style.height = `${moveSampleDiv_h}px`
    }

    // コンテンツクラスの右端よりサンプルクラスが外側に行かないようにした
    if (moveRange_w.value >= right_range) {
      moveSampleDiv_w = sampleDiv_w + moveRange_w.value

      if (sampleDiv_l.value + moveSampleDiv_w <= contentsDiv_r.value) {
        sampleDiv.style.width = `${moveSampleDiv_w}px`
      }
    }
  }
})

const iconMoveLimit = (bottom_limit: any, right_limit: any) => {
  bottom_range = bottom_limit
  right_range = right_limit
}

const iconCoord = (x: any, y: any) => {
  icon_x.value = x
  icon_y.value = y
}

// エミット
/*
const emits = defineEmits<{ (e: 'update:value', item: any): void }>()
const input = ref(props.value)

function onChange(value: any) {
  input.value = value
  emits('update:value', value)
}
*/

//computed
/*
const counter: Ref<number> = useState('counter', () => 500)

// computedによりcounter変数の監視が行われる
const doubleCount = computed(() => {
  return counter.value * 2
})
*/

// ライフサイクル
//onBeforeMount(() => {
//記憶した位置、サイズでの復帰を可能にする
//})

//onBeforeUnmount(() => {
//window.removeEventListener('resize', onGetPosition)
//})
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
</style>
