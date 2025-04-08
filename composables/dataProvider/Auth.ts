import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'
dayjs.locale(ja)

//----------------------------------------------------------
//データ通信の型(openAPIからの参照、もしくはコピー)
//----------------------------------------------------------

type passwordCheckState = {
  mail: string
  verify: string
  start_time: string
}

export const usePasswordCheck = defineStore(
  'password-check',
  () => {
    const state: Ref<passwordCheckState> = ref({ mail: '', verify: '', start_time: '' })
    return {
      value: state,
    }
  },
  {
    persist: process.client && {
      storage: localStorage,
    },
  }
)

type sessionState = {
  start_time: string
  onetime_token: string
}

export const useSession = defineStore(
  'session',
  () => {
    const state: Ref<sessionState> = ref({ onetime_token: '', start_time: '' })
    return {
      value: state,
    }
  },
  {
    persist: process.client && {
      storage: localStorage,
    },
  }
)

//----------------------------------------------------------
// API処理
//----------------------------------------------------------

/**
 * POST
 * /admin/v1/auth/request
 * メールアドレスを指定してワンタイムパスワードメールを要求する。
 */
export async function usePostRequest(email: string) {
  const passwordCheck = usePasswordCheck()
  const sessionCheck = useSession()
  const url = useApiBase('/auth/request')
  const postData = { email: email }
  const { data, error } = await useFetch<{ verify_token: string }>(url, {
    method: 'POST',
    // mode: 'cors',
    // cache: 'no-cache',
    body: postData,
  })
  // useSetError(error.value, 'POST')
  passwordCheck.value.mail = email
  passwordCheck.value.start_time = dayjs().format()
  if (data.value) {
    passwordCheck.value.verify = data.value?.verify_token
  }
  return { data, error }
}

/**
 * POST
 * /admin/v1/auth
 * 認証用トークンとワンタイムパスワードを指定して、アクセストークンを要求する。
 */
export async function usePostPassword(password: string) {
  const passwordCheck = usePasswordCheck()
  const sessionCheck = useSession()

  const url = useApiBase('/auth')
  const headers = new Headers({
    // Authorization: `...`,
  })
  const postData = {
    verify_token: passwordCheck.value.verify,
    password: password,
  }

  const { data, error } = await useFetch<{ access_token: string }>(url, {
    method: 'POST',
    headers: headers,
    body: postData,
  })
  // useSetError(error.value, 'POST')
  if (data.value) {
    sessionCheck.value.onetime_token = data.value.access_token
    sessionCheck.value.start_time = dayjs().format()
  }
  return { data, error }
}
