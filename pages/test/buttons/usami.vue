<template>
  <h1>button シリーズ</h1>

  <div class="container">
    <test02 :hoverType="1" back="rgba(255, 180,20, 0.5)">ボタン０１</test02>
    <test02
      color="#f00"
      :hoverType="1"
      back="#333"
      border="1px solid #f00"
      fontSize="22px"
      radius="15px"
      :beforeType="1"
      >button</test02
    >
    <test02
      border="1px solid #333"
      back="rgba(200, 122, 157, 0.699)"
      :hoverType="3"
      radius="20px"
      fontFamily="system-ui"
      width="180px"
      Shadow="30px"
      fontWeight="bold"
      :afterType="1"
      >Next Page</test02
    >
    <test02 color="#00f" back="#fff" border="3px  #000" borderStyle="dotted" :hoverType="4">次へ</test02>
    <test02
      color="#27acd9"
      back=" #e1f3f9"
      border=""
      width="280px"
      height="70px"
      :hoverType="5"
      fontWeight="bold"
      fontFamily="system-ui"
      >詳細ページ</test02
    >
    <test02
      color="#099"
      back=""
      :hoverType="6"
      width="300px"
      height="65px"
      radius="50px"
      borderStyle="inset"
      border="3px #e0e0e0"
      fontWeight="bold"
      :afterType="1"
      >お問い合わせ</test02
    >
    <test02
      color="#333"
      back="rgb(253, 226, 179)"
      border="2px solid rgba(203, 122, 157, 0.699) 
"
      width="230px"
      height="60px"
      radius="10px 5px 10px 5px"
      :hoverType="7"
      :afterType="2"
      >NEXT PAGE</test02
    >
    <test02 width="80px" height="80px" back="" border="" :hoverType="8" radius="100%"><span>PUSH</span></test02>
    <test02 color="" back="" border="" :hoverType="9">Push Me</test02>
    <test02 color="" back="" border="" height="" :hoverType="10">詳細はこちら</test02>
    <test02 color="" back="" border="" :hoverType="11">ボタン11</test02>
    <test02 color="" back="" border="" :hoverType="12" radius="15px">送信</test02>
    <test02 color="" back="" border="" :hoverType="13">Next page</test02>
    <test02 color="" back="" border="" width="100px" height="100px" radius="100%" fontSize="15px" :hoverType="14"
      >次のページ</test02
    >
    <test02 color="" back="" border="" radius="" :hoverType="15" :afterType="3"><span>次はこちら</span></test02>
    <test02 color="" back="" border="" radius="" width="150px" fontSize="15px" :hoverType="16"
      ><span>PUSH ME</span></test02
    >
    <test02 color="" back="" border="" radius="" :hoverType="17" :beforeType="2">Next</test02>
    <test02 fontFamily="system-ui" width="200px" radius="30px" :afterType="3"
      ><v-icon fontSize="50px">mdi-cog-outline</v-icon>設定</test02
    >
    <test02 fontFamily="system-ui" width="100px" radius="30px"
      ><v-icon>mdi-gamepad-down</v-icon><v-icon>mdi-gamepad-circle-right</v-icon></test02
    >
    <test02 fontFamily="system-ui" width="150px">button</test02>
    <test02 fontFamily="system-ui" width="150px" color="#ace0a6" back="" textShadow="1px 2px 5px #525252"
      >button</test02
    >
    <test02 fontFamily="system-ui" color="" back="" :hoverType="18">button</test02>
    <test02 fontFamily="system-ui" color="#e6ce7a" back="" height="100px" width="100px" radius="100%">button</test02>
    <test02 fontFamily="system-ui" color="" back="" radius="30px" :hoverType="19"
      ><v-icon color="#f0f0f0">mdi-email-outline</v-icon>mail</test02
    >
    <test02 fontFamily="system-ui" color="" back="" height="100px" radius="30px" :hoverType="19"
      >button<v-icon color="#fff">mdi-arrow-down-bold-outline</v-icon></test02
    >
    <test02
      fontFamily="system-ui"
      color=""
      back=""
      height="150px"
      width="150px"
      radius="100%"
      :hoverType="20"
      :afterType="5"
      >button</test02
    >
    <test02
      fontFamily="system-ui"
      color=""
      back=""
      radius="20px"
      width="130px"
      height="150px"
      :hoverType="21"
      :afterType="5"
      >button</test02
    >

    <test02 fontFamily="system-ui" color="#fff" back="" radius="10px" width="250px" height="50px" :hoverType="22"
      ><v-icon>mdi-image</v-icon>choose image</test02
    >
    <test02
      fontFamily="italic"
      color="#fff"
      back="#fc42f9"
      radius="10px"
      width="130px"
      height="120px"
      :hoverType="23"
      :afterType="5"
      >button</test02
    >
    <test02 fontFamily="italic" color="#888" back="#f0f0f0" radius="100%" width="150px" height="100px" fontSize="20px"
      ><v-icon color="#fa55aa">mdi-cards-heart-outline</v-icon>Favo</test02
    >
    <test02
      fontFamily="serif"
      color="#fff"
      back="#99fc42"
      radius="10px"
      width="130px"
      height="120px"
      :hoverType="24"
      :afterType="5"
      >button</test02
    >
    <test02 fontFamily="serif" color="#fff" back="#3827f5" radius="100%" width="60px" height="60px" :hoverType="22"
      ><v-icon>mdi-plus</v-icon></test02
    >
    <test02 fontFamily="serif" color="#fff" back="#3827f5" radius="100%" width="60px" height="60px" :hoverType="22"
      ><v-icon>mdi-minus</v-icon></test02
    >
    <test02 fontFamily="serif" color="#fff" back="" radius="100%" width="60px" height="60px" :hoverType="26"
      ><v-icon>mdi-white-balance-sunny</v-icon></test02
    >
    <test02 fontFamily="serif" color="#fff" back="" radius="100%" width="60px" height="60px" :hoverType="26"
      ><v-icon>mdi-weather-night</v-icon></test02
    >
    <test02
      fontFamily="system-ui"
      color="#fff"
      back=""
      radius="10px"
      width="180px"
      height="60px"
      fontSize="20px"
      :hoverType="25"
      >アカウント<v-icon>mdi-account-arrow-down-outline</v-icon></test02
    >
    <test02 fontFamily="system-ui" color="#888" back="" radius="10px" width="180px" height="40px" fontSize="20px"
      >Button</test02
    >
    <test02
      fontFamily="system-ui"
      color="#888"
      back=""
      radius="10px"
      width="50px"
      height="50px"
      fontSize="20px"
      :hoverType="27"
      ><v-icon>mdi-alarm</v-icon></test02
    >
    <test02
      fontFamily="system-ui"
      color="#888"
      back=""
      radius="10px"
      width="100px"
      height="40px"
      fontSize="20px"
      :hoverType="27"
      >button</test02
    >
    <test02
      fontFamily="system-ui"
      color=""
      back=""
      radius="10px"
      width="100px"
      height="40px"
      fontSize="20px"
      :hoverType="28"
      :afterType="6"
      ><span>Read More</span></test02
    >
  </div>
</template>

<script setup lang="ts">
import test02 from '@/components/usami/Button.vue'

/**===================================================================================================================
 * 
 ===================================================================================================================**/
//------------------------------------------------------------------------------------------------------------
// ライフサイクル
//------------------------------------------------------------------------------------------------------------
/*
onBeforeMount(() => {
  //記憶した位置、サイズでの復帰を可能にする
})

onMounted(() => {
  //window.addEventListener('resize', onGetPosition)
})

onBeforeUnmount(() => {
  //window.removeEventListener('resize', onGetPosition)
})
*/

//------------------------------------------------------------------------------------------------------------
// メソッド
//------------------------------------------------------------------------------------------------------------
</script>

<style lang="scss" scoped>
h1 {
  color: #000;
  text-align: center;
}

.container {
  display: flex;
  flex-wrap: wrap;
}
</style>
