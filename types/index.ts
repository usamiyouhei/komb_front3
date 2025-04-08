// vuetify でエクスポートされていないtableヘッダーの型
export type DataTableCompareFunction<T = any> = (a: T, b: T) => number
export type SelectItemKey =
  | boolean
  | string
  | (string | number)[]
  | ((item: Record<string, any>, fallback?: any) => any)
type Density = null | 'default' | 'comfortable' | 'compact'

// ModalWindowの開閉で使用
type ModalSwitch = {
  opened: boolean
}

// エラーをチェックして、問題がない場合にモーダルを操作
type ErrorCheckSwitch = {
  isError: boolean
}

type SubmitData = { key: string; type: string; name: string; value?: string | string[] }
