<template>
  <LayoutTestArticle title="トグルスイッチ">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>ButtonToggleSwitch(@/components/button/ButtonToggleSwitch.vue)</h5>
          <h6>default</h6>
          <div class="Sample">
            <ButtonToggleSwitch
              v-for="color in colors"
              :color="color"
              class="ma-1"
              :value="input"
              @update:value="onChange($event)"
            />
          </div>
          <h6>inset({{ input }})</h6>
          <div class="Sample">
            <ButtonToggleSwitch
              v-for="color in colors"
              :color="color"
              :inset="true"
              class="ma-1"
              :value="input"
              @update:value="onChange($event)"
            />
          </div>
          <h6>label left</h6>
          <div class="Sample">
            <ButtonToggleSwitch
              v-for="color in colors"
              class="ma-1"
              :color="color"
              :label="color"
              :position="'left'"
              :value="input"
              @update:value="onChange($event)"
            />
          </div>
          <h6>label right</h6>
          <div class="Sample">
            <ButtonToggleSwitch
              v-for="color in colors"
              class="ma-1"
              :color="color"
              :inset="true"
              :label="`テスト(${color})`"
              :position="'right'"
              :value="input"
              @update:value="onChange($event)"
            />
          </div>

          <h6>width & space-between</h6>
          <p>外からスタイルを設定すれば、以下のような表示も可能</p>
          <div class="Sample">
            <div>
              <ButtonToggleSwitch
                v-for="color in colors"
                class="between mb-3"
                :color="color"
                :inset="true"
                :label="`テスト(${color})`"
                :position="'right'"
              />
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
  title: 'ボタンテスト',
})

const colors: string[] = ['primary', 'secondary', 'success', 'info', 'warning', '#ff0000']

const input = ref(false)

function onChange(value: any) {
  // console.log('おん')
  input.value = value
}
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
.between {
  width: 200px;
  justify-content: space-between;
}
</style>
