<template>
  <LayoutTestArticle title="ファイルドラッガー">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>機能説明</h5>
          <h6>使用用途</h6>
          <p>ファイルをOwnWorldにアップロード</p>

          <h6>主な機能</h6>
          <ul>
            <li>ドラッグ&ドロップからファイルをアップロード(ドラッグエリア内に限る)</li>
            <li>ファイル選択ボタンからファイルをアップロード</li>
            <li>拡張子変換</li>
            <li>プレビュー(イメージファイルに限る)</li>
            <li>アップロードファイル数を制限</li>
            <li>アップロードしたファイルを削除</li>
          </ul>

          <h6>アップロードできるファイルの種類</h6>
          <ul>
            <li>テキストファイル(.txt)</li>
            <li>イメージファイル(.png, .jpeg, .jpg)</li>
            <li>オーディオファイル(.mp3, .ogg, .wav)</li>
            <li>動画ファイル(.mp4, .avi)</li>
          </ul>
        </section>
        <section>
          <h5>ImageDragger.vue(/@components/parts/ImageDragger.vue)</h5>
          <h6>使用用途</h6>
          <h6>enum</h6>
          <p>DROP_TYPE(フォームの種類を選択)</p>
          <p>FILE_EXTENSION(拡張子名を変更)</p>
          <p>FILE_TYPE(ファイルタイプの変更)</p>

          <h6>Props</h6>
          <p>selectUpload(アップロードするファイル数を制限)</p>
          <p>selectType(フォームの種類を選択)</p>
          <p>textFiles(テキストファイルの配列を格納)</p>
          <p>audioFiles(音楽ファイルの配列を格納)</p>
          <p>movieFiles(動画ファイルの配列を格納)</p>
          <p>imgFiles(イメージファイルの配列を格納)</p>
          <p>files(単一ファイルの配列を格納)</p>
          <p>imgUrl(画像urlを格納)</p>
          <p>title(コンポーネントのタイトル)</p>

          <h6>主なメソッド</h6>
          <h6>dropFile</h6>
          <p>引数([アップロードしたファイル])</p>
          <p>ドロップでアップロードしたファイルを親コンポーネントに渡し配列で管理</p>
          <PartsHighlight :value="content1" />

          <h6>uploadFile</h6>
          <p>引数([アップロードしたファイル])</p>
          <p>inputでアップロードしたファイルを親コンポーネントに渡し配列で管理</p>
          <PartsHighlight :value="content2" />

          <h6>changeExtension</h6>
          <p>引数([拡張子を変更するファイル],[ファイルのインデックス],[変更する拡張子名],[拡張子のタイプ])</p>
          <p>拡張子を変更したファイルを親コンポーネントに渡して該当のファイルと入れ替え</p>
          <p>引数からファイル、ファイルのインデックス、変更したい拡張子名、拡張子のタイプを受け取る</p>
          <p>受け取ったファイルからファイル名だけを取り出し</p>
          <p>新しいBolbを作成して、そのBlobを使用して、変更したい拡張氏を使用して新しいファイルを作成</p>
          <p>※最初にファイル名を取り出さないとファイル名も変更されるためファイル名を取り出す必要がある</p>
          <p>※5行目正しくは、${fileName[1]}.${ex}。コードの兼ね合いで変更</p>
          <PartsHighlight :value="content3" />

          <h6>changeType</h6>
          <p>引数([拡張子を変更するファイル])</p>
          <p>変更できる拡張子を表示し、選択された拡張子をchangeExtensionに渡す</p>
          <PartsHighlight :value="content4" />
        </section>

        <section>
          <h5>imageDragger(/@pages/test/parts/imageDragger.vue)</h5>
          <h6>主なメソッド</h6>
          <h6>createImgFile</h6>
          <p>引数([イメージを作成するファイル], [追加したい配列])</p>
          <p>受け取ったファイルからURLを作成し、imgURLに代入する</p>
          <p>イメージURLが作成できた場合、追加したい配列に追加する</p>
          <PartsHighlight :value="content5" />

          <h6>checkFile</h6>
          <p>引数([追加するファイル],[ファイル拡張子の種類])</p>
          <p>アップロードされたファイルをチェックして所定の処理を実行する</p>
          <PartsHighlight :value="content6" />

          <h6>addDropItems</h6>
          <p>引数([アップロードしたファイル])</p>
          <p>ドロップからアプロードされたファイルを引数で受け取って、所定の処理を実行する</p>
          <PartsHighlight :value="content7" />

          <h6>addInputItems</h6>
          <p>引数([アップロードしたファイル])</p>
          <p>インプットからアプロードされたファイルを引数で受け取って、所定の処理を実行する</p>
          <PartsHighlight :value="content8" />

          <h6>changeType</h6>
          <p>引数([追加するファイル],[ファイルのインデックス])</p>
          <p>
            単一ファイルの場合、filesを配列で管理しているため、変更したファイルオブジェクトを配列の最初に入れて最新のファイルを表示している
          </p>
          <p>複数ファイルの場合、配列から変更したオブジェクトと変更前のオブジェクトを入れ替える</p>
          <PartsHighlight :value="content9" />

          <h6>changeUploadNum</h6>
          <p>引数([false: 単一,true: 複数])</p>
          <p>イベントで真偽値を受け取り、ファイルのアップロード数を制限する</p>
          <PartsHighlight :value="content10" />
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
  title: 'ヒントとコツ',
})

//------------------------------------------------------------------------------------------------------------
// 定数・変数（state）
//------------------------------------------------------------------------------------------------------------
const content1 = `
// ドロップしたファイルを配列に追加して管理
function dropFile(event: any) {
  const uploadItems = event.dataTransfer.items
  if (uploadItems && uploadItems.length > 0) {
    emits('update:dropValue', uploadItems)
  }
  isEnter.value = false
}// ドロップしたファイルを配列に追加して管理
function dropFile(event: any) {
  const uploadItems = event.dataTransfer.items
  if (uploadItems && uploadItems.length > 0) {
    emits('update:dropValue', uploadItems)
  }
  isEnter.value = false
}`

const content2 = `
// inputから追加したファイルを配列に追加
function uploadFile(event: any) {
  const uploadItems = event.target.files
  if (uploadItems && uploadItems.length > 0) {
    emits('update:inputValue', uploadItems)
  }
  isEnter.value = false
}`

const content3 = `// 拡張子を変更
function changeExtension(file: any, i: number, ex: string, type: string) {
  const fileName = file.file.name.match(/(.+?)\.\w+$/)
  const newBlob = new Blob([file.file], { type: type })
  const createFile = new File([newBlob], {fileName[1]}.{ex}, { type: newBlob.type })
  if (!selectUpload.value) {
    const newFile = { file: createFile, height: file.height, width: file.width }
    emits('update:changeType', newFile, i)
  } else {
    emits('update:changeType', createFile, i)
  }
}
`

const content4 = `
// 拡張子を判別する処理
function changeType(files: any) {
  const fileType = files.file.type
  if (fileType.indexOf('image') >= 0) {
    return extensions.image
  } else if (fileType.indexOf('text') >= 0) {
    return extensions.text
  } else if (fileType.indexOf('audio') >= 0) {
    return extensions.audio
  } else if (fileType.indexOf('video') >= 0) {
    return extensions.movie
  }
}`
const content5 = `
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
}`
const content6 = `
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
}`
const content7 = `
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
}`
const content8 = `
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
}`
const content9 = `
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
}`
const content10 = `
// アップロードできるファイル数を切り替える処理
function changeUploadNum(event: boolean) {
  resetFiles()
  selectUpload.value = event
}`
</script>

<style lang="scss" scoped>
@use '../../../assets/test';
</style>
