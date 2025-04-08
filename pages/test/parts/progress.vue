<template>
  <LayoutTestArticle title="プログレスバー">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>PartsProgress(@/components/parts/Progress.vue)</h5>
          <p>Vuetifyそのまま、とりあえずラップ</p>
          <div class="Sample">
            <PartsProgress class="mr-2" />
            <PartsProgress> <v-icon :icon="ICONS.LOCK" size="18" /></PartsProgress>
          </div>
          <div class="Sample align-center">
            <ButtonSimple class="mr-6" :text="'start'" @click="onStart" />
            <PartsProgress class="mr-6" :type="PROGRESS_TYPE.CIRCLE" :value="elapsedTime" />
            <PartsProgress
              class="mr-6"
              :type="PROGRESS_TYPE.CIRCLE"
              :value="elapsedTime"
              :size="80"
              :width="10"
              :color="THEME_COLOR.primary"
            />
          </div>
          <div class="Sample">
            <ButtonSimple class="mr-6" :text="'ロック'" @click="onLock()" />
            <ButtonSimple class="mr-6" :text="'ロック1'" @click="onLock(1)" />
            <ButtonSimple class="mr-6" :text="'ロック2'" @click="onLock(2)" />
            <ButtonSimple class="mr-6" :text="'ロック3'" @click="onLock(3)" />
            <ButtonSimple class="mr-6" :text="'ロック4'" @click="onLock(4)" />
            <ButtonSimple class="mr-6" :text="'ロック5'" @click="onLock(5)" />
            {{ lock.state?.level }} / {{ lock.state?.lock }}
          </div>
          <div class="Sample">
            <div>
              <PartsProgress :type="PROGRESS_TYPE.LINE" :value="elapsedTime" />
              <PartsProgress :type="PROGRESS_TYPE.LINE" :value="elapsedTime" class="LineLocal flex-row"
                ><div class="mr-4">{{ elapsedTime }}</div></PartsProgress
              >
              <PartsProgress :type="PROGRESS_TYPE.LINE" :value="elapsedTime" class="LineLocal flex-row-reverse"
                ><div class="mr-4">{{ elapsedTime }}</div></PartsProgress
              >
              <PartsProgress :type="PROGRESS_TYPE.LINE" :value="elapsedTime" class="LineLocal flex-column-reverse"
                ><div class="mr-4">{{ elapsedTime }}</div></PartsProgress
              >
              <PartsProgress :type="PROGRESS_TYPE.LINE" :value="elapsedTime" class="LineLocal flex-column"
                ><div class="mr-4">{{ elapsedTime }}</div></PartsProgress
              >
            </div>
          </div>
        </section>
      </div>
    </LayoutTestReview>
  </LayoutTestArticle>
</template>

<script setup lang="ts">
/**===================================================================================================================
 * 
===================================================================================================================**/
definePageMeta({
  layout: 'default',
})

useHead({
  title: 'パーツテスト',
})
//------------------------------------------------------------------------------------------------------------
// 定数・変数（state）
//------------------------------------------------------------------------------------------------------------
const timeId: Ref<NodeJS.Timer | null> = ref(null)
const startTime = ref(0)
const elapsedTime = ref(0)
const limitTime = ref(5000)

//------------------------------------------------------------------------------------------------------------
// ライフサイクル
//------------------------------------------------------------------------------------------------------------
onBeforeMount(() => {
  //記憶した位置、サイズでの復帰を可能にする
})

onMounted(() => {
  //window.addEventListener('resize', onGetPosition)
  //onGetPosition();
})

onBeforeUnmount(() => {
  delay.cancel()
  lock.off()
})

function onStart() {
  clearTime()
  startTime.value = performance.now()
  elapsedTime.value = 0
  timeId.value = setInterval(checkTime, 16)
}

function clearTime() {
  if (timeId.value) {
    clearTimeout(timeId.value)
  }
}

function checkTime() {
  //setIntervalやsetTimeoutの経過タイムは信用出来ないので、
  const time = performance.now() - startTime.value
  elapsedTime.value = Math.round((time / limitTime.value) * 100)
  if (elapsedTime.value >= 100) {
    elapsedTime.value = 100
    clearTime()
  }
}

const lock = useLock()
const delay = useDelay()
async function onLock(level?: number) {
  lock.on(level, true)
  onStart()
  await delay.wait(1500)
  lock.off()
}
</script>
<style lang="scss" scoped>
@use '../../../assets/test';
.LineLocal {
  justify-content: space-between;
  width: 400px;
  //flex-direction: column-reverse;
  flex-direction: row-reverse;
  margin-bottom: 10px;
}
</style>
