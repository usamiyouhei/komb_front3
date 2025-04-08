import type { FetchError } from 'ofetch'
export function useSetError(error: any | null, method?: string) {
  if (error) {
    const snackbar = useSnackbarList()
    let res = error.message.replaceAll(')', '')
    const arry = res.split(useApiBase())

    const text = error.data?.message || `code:${error.data?.code}\n${error.data?.detail} `
    console.log(text)
    if (error.statusCode === 401) {
      //ページの切り替え
      navigateTo('/login')
      snackbar.setItem({
        title: `ログイン期間の終了`,
        text: `ログイン期間が終了しました。ログインし直してください`,
        icon: SNACKBAR_TYPE.ALERT,
        time: 100000,
      })
    } else if (error.statusCode === 502) {
      // navigateTo('/login')
      snackbar.setItem({
        title: `${error.statusCode}`,
        text: `${method} ${arry[1]}\n\n${text}\n`,
        icon: SNACKBAR_TYPE.ERROR,
        time: 100000,
      })
      /*
      snackbar.setItem({
        title: `未ログイン`,
        text: `ログインしてください`,
        icon: SNACKBAR_TYPE.ALERT,
        time: 100000,
      })
      */
    } else {
      // 不正な問い合わせ
      snackbar.setItem({
        title: `${error.statusCode}`,
        text: `${method} ${arry[1]}\n\n${text}\n`,
        icon: SNACKBAR_TYPE.ERROR,
        time: 100000,
      })
    }

    // console.log('message', error.message)
    // console.log('data', error.data)
    // console.log('statusCode', error.statusCode)

    /*
    // console.log('message',error.data)
    // console.log('message', error.message)
    // console.log('name', error.name)
    // console.log('status', error.status)
    // console.log('statusMessage', error.statusMessage)
    // console.log('statusText', error.statusText)
    // console.log('response', error.response)
    // console.log('request', error.request)
    // console.log('cause', error.cause)
    */
  }
}
