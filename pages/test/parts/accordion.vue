<template>
  <LayoutTestArticle title="サンプル">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>PartsAccordion(@/components/parts/Accordion.vue)</h5>
          <p>タイトルタップで、コンテンツが開く</p>

          <h6>auto===true</h6>
          <div class="Sample">
            <PartsAccordion>
              <template v-slot:header
                ><div class="Head"><h4>アコーディオン</h4></div></template
              >
              <template v-slot:contents>
                <div class="Test">
                  <h5>PartsAccordion</h5>
                  <h6>(@/components/parts/Accordion.vue)</h6>
                  <p>
                    コーディオンは、ウェブデザインやユーザーインターフェース設計において、コンテンツを縦方向に折りたたむためのUIパターンです。各セクションはヘッダーでラベル付けされ、クリックまたはタップすると、関連するコンテンツが表示または非表示になります。一部のアコーディオンでは、一度に1つのセクションのみが開く（他のセクションが閉じる）仕組みになっています。これは、情報過多を防ぎ、ユーザーが必要な情報に直感的にアクセスできるようにします。また、スペースが限られたUIにおいて、大量の情報を整理して表示するための効果的な手法となります。アコーディオンは、FAQs、メニュー、フォームなど、さまざまなコンテキストで利用されます。
                  </p>
                </div>
              </template>
            </PartsAccordion>
          </div>

          <h6>auto===false</h6>
          <div class="Sample">
            <PartsAccordion :auto="false" :opened="isOpen">
              <template v-slot:header
                ><div class="Head">
                  <p>アコーディオン</p>
                  <ButtonArrow
                    class="FloatArrow"
                    :color="'#333'"
                    :after-icon="'mdi-chevron-down'"
                    :actived="isOpen"
                    icon
                    light
                    :width="26"
                    @click="isOpen = !isOpen"
                  />
                </div>
              </template>
              <template v-slot:contents>
                <div class="Test">
                  <h5>PartsAccordion</h5>
                  <h6>(@/components/parts/Accordion.vue)</h6>
                  <p>
                    コーディオンは、ウェブデザインやユーザーインターフェース設計において、コンテンツを縦方向に折りたたむためのUIパターンです。各セクションはヘッダーでラベル付けされ、クリックまたはタップすると、関連するコンテンツが表示または非表示になります。一部のアコーディオンでは、一度に1つのセクションのみが開く（他のセクションが閉じる）仕組みになっています。これは、情報過多を防ぎ、ユーザーが必要な情報に直感的にアクセスできるようにします。また、スペースが限られたUIにおいて、大量の情報を整理して表示するための効果的な手法となります。アコーディオンは、FAQs、メニュー、フォームなど、さまざまなコンテキストで利用されます。
                  </p>
                </div>
              </template>
            </PartsAccordion>
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

const isOpen = ref(false)
</script>
<style lang="scss" scoped>
@use '../../../assets/test';
.Test {
  padding: 20px 10px;
}
.Head {
  position: relative;
  border-bottom: 1px solid #666;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 4px;
  h4 {
    color: rgb(var(--v-theme-primary));
  }
  p {
    font-size: 12px;
    font-weight: bold;
    padding: 0;
    margin: 0;
  }
}
</style>
