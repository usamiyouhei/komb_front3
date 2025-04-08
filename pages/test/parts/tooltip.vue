<template>
  <LayoutTestArticle title="ツールチップ">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>何にでも設定できる</h5>
          <div class="Sample">
            <div>
              <div :style="{ display: 'flex' }">
                <PartsTooltip
                  text="ツールTOPツールTOPツールTOP"
                  class="ma-2"
                  :position="POSITION.TOP"
                  :offsetY="-4"
                  :offsetX="-50"
                  :arrowOffsetX="-50"
                >
                  <ButtonIcon :icon="ICONS.COG" :size="30" label="SYSTEM" bold narrow />
                </PartsTooltip>
                <PartsTooltip text="ツールBOTTOM" class="ma-2" :position="POSITION.BOTTOM" :offsetY="2">
                  <ButtonIcon :icon="ICONS.CLOSE" :size="30" label="CLOSE" bold narrow />
                </PartsTooltip>
              </div>
              <div :style="{ display: 'flex' }">
                <PartsTooltip text="ツールBOTTOM" class="ma-2" :position="POSITION.LEFT" :offsetY="-7">
                  <ButtonIcon :icon="ICONS.MENU" :size="30" label="CLOSE" bold narrow />
                </PartsTooltip>
              </div>
              <div :style="{ display: 'flex' }">
                <PartsTooltip text="ツールBOTTOM" class="ma-2" :position="POSITION.RIGHT" :offsetY="-7">
                  <ButtonIcon :icon="ICONS.PENCIL" :size="30" label="CLOSE" bold narrow />
                </PartsTooltip>
              </div>
            </div>
          </div>
          <div class="Sample mt-12">
            <PartsTooltip text="ツールTOP" class="ma-2" :position="POSITION.TOP"> ただのテキスト </PartsTooltip>
            <PartsTooltip text="ツールBOTTOM" class="ma-2" :position="POSITION.BOTTOM" :offsetY="-4">
              ただのテキスト
            </PartsTooltip>
            <PartsTooltip text="ツールBOTTOM" class="ma-2" :position="POSITION.LEFT"> ただのテキスト </PartsTooltip>
            <PartsTooltip text="ツールBOTTOM" class="ma-2" :position="POSITION.RIGHT"> ただのテキスト </PartsTooltip>
          </div>
          <div class="Sample">
            <PartsTooltip text="ツールTOP" class="ma-2" :position="POSITION.TOP">
              <NuxtLink to="#">ただのリンク</NuxtLink>
            </PartsTooltip>
            <PartsTooltip text="ツールBOTTOM" class="ma-2" :position="POSITION.BOTTOM" :offsetY="0">
              <NuxtLink to="#">ただのリンク</NuxtLink>
            </PartsTooltip>
            <PartsTooltip text="ツールBOTTOM" class="ma-2" :position="POSITION.LEFT" :offsetX="-4">
              <NuxtLink to="#">ただのリンク</NuxtLink>
            </PartsTooltip>
            <PartsTooltip text="ツールBOTTOM" class="ma-2" :position="POSITION.RIGHT" :offsetX="4">
              <NuxtLink to="#">ただのリンク</NuxtLink>
            </PartsTooltip>
          </div>
          <div class="Sample">
            <PartsTooltip text="ツールTOP" class="ma-2" :position="POSITION.BOTTOM" :deley="0"> deley=0 </PartsTooltip>
            <PartsTooltip text="ツールBOTTOM" class="ma-2" :position="POSITION.BOTTOM" :offsetY="0" :deley="250">
              deley=250
            </PartsTooltip>
            <PartsTooltip text="ツールTOP" class="ma-2" :position="POSITION.BOTTOM"> default(deley=500) </PartsTooltip>
            <PartsTooltip text="ツールBOTTOM" class="ma-2" :position="POSITION.BOTTOM" :offsetX="-4" :deley="750">
              deley=750
            </PartsTooltip>
            <PartsTooltip text="ツールBOTTOM" class="ma-2" :position="POSITION.BOTTOM" :offsetX="4" :deley="1000">
              deley=1000
            </PartsTooltip>
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
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
</style>
