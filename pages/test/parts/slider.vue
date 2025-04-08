<template>
  <LayoutTestArticle title="サンプル">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>PartsPagination(@/components/parts/Slider.vue)</h5>
          <p>ぐりぐり動かせる</p>

          <h6>type === SLIDER_TYPE.SMOOTH</h6>
          <div class="Sample">
            <PartsSlider
              :type="SLIDER_TYPE.SMOOTH"
              width="400px"
              :value="rangePosition1"
              @update:value="updateValue1"
            />
          </div>

          <h6>type === SLIDER_TYPE.POINT</h6>
          <div class="Sample">
            <PartsSlider :type="SLIDER_TYPE.POINT" width="400px" :value="rangePosition2" @update:value="updateValue2" />
          </div>

          <h6>showMinMaxLabel === true</h6>
          <div class="Sample">
            <PartsSlider
              :type="SLIDER_TYPE.SMOOTH"
              :showMinMaxLabel="true"
              width="400px"
              :value="rangePosition3"
              @update:value="updateValue3"
            />
          </div>

          <h6>showValueLabel === true</h6>
          <div class="Sample">
            <PartsSlider
              :type="SLIDER_TYPE.SMOOTH"
              :showValueTip="true"
              width="400px"
              :value="rangePosition4"
              @update:value="updateValue4"
            />
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
const rangePosition1 = ref(10)
const rangePosition2 = ref(20)
const rangePosition3 = ref(30)
const rangePosition4 = ref(40)

const updateValue1 = (v: number) => {
  rangePosition1.value = v
}
const updateValue2 = (v: number) => {
  rangePosition2.value = v
}
const updateValue3 = (v: number) => {
  rangePosition3.value = v
}
const updateValue4 = (v: number) => {
  rangePosition4.value = v
}
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
</style>
