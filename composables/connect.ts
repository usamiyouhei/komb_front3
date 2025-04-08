// useFetch、useAsyncDataではErrorの詳細等が取れないので、自前で用意

import { useRuntimeConfig } from 'nuxt/app'
// export const API_BASE = 'https://ow-server.ow-dev.scope-next.info/admin/v1'
export function useApiBase(param?: string) {
  const runtimeConfig = useRuntimeConfig()
  const API_BASE = runtimeConfig.public.apiBase
  return API_BASE + param
}

export function useHeader() {
  const sessionCheck = useSession()
  return new Headers({
    accept: 'application/json',
    Authorization: `Bearer ${sessionCheck.value.onetime_token}`,
  })
}

export async function useConnect<ResT = void | null>(
  endpoint: string,
  option: { method: any; headers?: any; params?: any } | { method: any; headers?: any; body?: any },
  errorCheck: boolean = true
) {
  const { data, error } = await useFetch<ResT>(`${endpoint}`, option)
  // console.log('errorcheck', errorCheck)
  if (errorCheck) useSetError(error.value, option.method)
  return { res: data.value, error: error.value }
}
