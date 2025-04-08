<template>
  <LayoutTestArticle title="イメージドラッガー">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>PartsImageDragger(@/components/parts/PartsImageDragger.vue)</h5>
          <div class="Sample">
            <h6>アップロードするファイル数(オン:複数)</h6>
            <ButtonToggleSwitch @update:value="changeUploadNum($event)" />
          </div>
          <div>
            <!-- ファイルをアップロードする際に使用 -->
            <PartsImageDragger
              :selectType="DROP_TYPE.DROP_AREA"
              :selectUpload="selectUpload"
              :imgUrl="imgUrl"
              @update:dropValue="addDropItems($event)"
              @update:inputValue="addInputItems($event)"
            />
            <!-- 複数のファイルをアップロードした際に使用 -->
            <PartsImageDragger
              :selectType="DROP_TYPE.DIAPLAY_FILES"
              :selectUpload="selectUpload"
              :title="'テキストファイル'"
              :files="textFiles"
              @update:deleteValue="deleteItem($event)"
              @update:changeType="changeType"
            />
            <PartsImageDragger
              :selectType="DROP_TYPE.DIAPLAY_FILES"
              :selectUpload="selectUpload"
              :title="'オーディオファイル'"
              :files="audioFiles"
              @update:deleteValue="deleteItem($event)"
              @update:changeType="changeType"
            />
            <PartsImageDragger
              :selectType="DROP_TYPE.DIAPLAY_FILES"
              :selectUpload="selectUpload"
              :title="'動画ファイル'"
              :files="movieFiles"
              @update:deleteValue="deleteItem($event)"
              @update:changeType="changeType"
            />
            <PartsImageDragger
              :selectType="DROP_TYPE.DIAPLAY_FILES"
              :selectUpload="selectUpload"
              :title="'イメージファイル'"
              :files="imgFiles"
              :imgUrl="imgUrl"
              @update:deleteValue="deleteItem($event)"
              @update:changeType="changeType"
            />
            <!-- 単体のファイルをアップロードした際に使用 -->
            <PartsImageDragger
              :selectType="DROP_TYPE.DISPLAY_FILE"
              :selectUpload="selectUpload"
              :title="'ファイル'"
              :files="files"
              :imgUrl="imgUrl"
              @update:deleteValue="deleteItem($event)"
              @update:changeType="changeType"
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
import {
  FILE_EXTENSION,
  DROP_TYPE,
} from '../../../node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
definePageMeta({
  layout: 'default',
})

useHead({
  title: 'パーツテスト',
})

// 各種ファイルを配列で格納
const imgFiles: any = ref([])
const textFiles: any = ref([])
const audioFiles: any = ref([])
const movieFiles: any = ref([])
// 単体のファイルをアップロードした際のファイルを格納
const files: any = ref([])

// imgタグでしようするURLを代入
const imgUrl: Ref<string> = ref('')

// 単体か複数かアップロードするファイル数を切り替える
const selectUpload: Ref<boolean> = ref(false)

const fileMap: FileTypeMap = {
  image: imgFiles,
  text: textFiles,
  audio: audioFiles,
  video: movieFiles,
}

type FileTypeMap = {
  [key: string]: typeof imgFiles | typeof textFiles | typeof audioFiles | typeof movieFiles
}

// 画像ファイルに画像の情報（url, height, width）を格納する
function createImgFile(file: any, pushFile: any) {
  const fileURL = URL.createObjectURL(file)
  imgUrl.value = fileURL
  const img = new Image()
  img.onload = () => {
    pushFile.value.push({ file: file, height: img.height, width: img.width })
    URL.revokeObjectURL(fileURL)
  }
  img.src = fileURL
}

// 追加されたファイルの種類を判別して格納する
function checkFile(file: any, fileType: any) {
  if (fileType.indexOf('image') >= 0) {
    createImgFile(file, imgFiles)
  } else if (fileType.indexOf('text') >= 0) {
    textFiles.value.push({ file: file })
  } else if (fileType.indexOf('audio') >= 0) {
    audioFiles.value.push({ file: file })
  } else if (fileType.indexOf('video') >= 0) {
    movieFiles.value.push({ file: file })
  }
}

// ドロップしてファイルを追加する処理
function addDropItems(items: any) {
  const file = items[0].getAsFile()
  const fileType = items[0].getAsFile().type

  if (selectUpload.value) {
    checkFile(file, fileType)
  } else {
    if (fileType.indexOf('image') >= 0) {
      resetFiles()
      createImgFile(file, files)
    } else {
      resetFiles()
      files.value.push({ file: file })
    }
  }
}

// inputからファイルを追加する処理
function addInputItems(items: any) {
  const file = items[0]
  const fileType = items[0].type

  if (selectUpload.value) {
    checkFile(file, fileType)
  } else {
    if (fileType.indexOf('image') >= 0) {
      resetFiles()
      createImgFile(file, files)
    } else {
      resetFiles()
      files.value.push({ file: file })
    }
  }
}

// 追加されたファイルを削除する処理
function deleteItem(item: any) {
  if (selectUpload.value) {
    const fileTypeKey = getFileTypeKey(item.type)
    if (fileTypeKey) {
      fileMap[fileTypeKey].value = fileMap[fileTypeKey].value.filter((file: any) => file.file !== item)
    }
  } else {
    resetFiles()
  }
}

// ファイルのキーを取得する処理
function getFileTypeKey(type: string): string | null {
  for (let key of ['image', 'text', 'audio', 'video']) {
    if (type.includes(key)) {
      return key
    }
  }
  return null
}

// ファイルの拡張子を変更する処理
function changeType(item: any, i: number) {
  if (!selectUpload.value) {
    files.value.unshift(item)
    return
  }
  const fileTypeKey = getFileTypeKey(item.type)
  if (fileTypeKey) {
    fileMap[fileTypeKey].value[i].file = item
  }
}

// アップロードできるファイル数を切り替える処理
function changeUploadNum(event: boolean) {
  resetFiles()
  selectUpload.value = event
}

// すべてのファイルの中身をリセットする処理
function resetFiles() {
  textFiles.value = []
  imgFiles.value = []
  audioFiles.value = []
  movieFiles.value = []
  files.value = []
  imgUrl.value = ''
}
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
</style>
