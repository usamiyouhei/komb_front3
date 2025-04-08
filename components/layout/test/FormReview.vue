<template>
  <div class="FormPreview">
    <div class="ActionArea">
      <div class="d-flex mb-3">
        <FormInput
          class="mr-3"
          :base="base"
          :width="120"
          label="ラベル"
          :value="formTest.state.label"
          @update:value="onChangeLabel($event)"
        />
        <FormInput
          class="mr-5"
          label="ラベル幅"
          :width="50"
          suffix="px"
          :base="base"
          :value="formTest.state.labelWidth.toString()"
          @update:value="onChangeLabelWidth($event)"
        />
        <FormBlank class="mr-4" label="太さ" :base="base">
          <div class="SwitchContainer">
            <ButtonToggleSwitch
              :value="formTest.state.bold === 'bold'"
              @update:value="onChangeBold($event)"
              :color="useColor('primary')"
            />
          </div>
        </FormBlank>
        <FormBlank class="mr-4" label="右寄せ" :base="base">
          <div class="SwitchContainer">
            <ButtonToggleSwitch
              :value="formTest.state.align === 'flex-end'"
              @update:value="onChangeAlign($event)"
              :color="useColor('primary')"
            />
          </div>
        </FormBlank>
        <FormBlank class="mr-4" label="ヒント" :base="base">
          <div class="SwitchContainer">
            <ButtonToggleSwitch
              :value="formTest.state.hint"
              @update:value="onChangeHint($event)"
              :color="useColor('primary')"
            />
          </div>
        </FormBlank>
      </div>
      <div class="d-flex mb-3">
        <FormBlank class="mr-4" label="縦配置" :base="base">
          <ButtonToggleSet
            :items="positionItems"
            :value="formTest.state.position"
            @update:value="onChangePosition($event)"
          />
        </FormBlank>
        <FormBlank class="mr-0" label="EDIT" :base="base">
          <ButtonToggleSet
            :items="editItems"
            :width="66"
            :value="formTest.state.edit"
            @update:value="onChangeEdit($event)"
          />
        </FormBlank>
      </div>
    </div>
    <div class="ScrollContents">
      <div class="TableArea mb-4" :class="formTest.state.naviColor">
        <table :style="{ width: '100%' }">
          <thead>
            <tr>
              <th :style="{ width: '100px', minWidth: '100px', maxWidth: '100px' }">view</th>
              <th :style="{ width: '400px', minWidth: '400px', maxWidth: '400px' }">input幅固定</th>
              <th>必須+input幅可変</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>simple</th>
              <td :style="{ verticalAlign: formTest.state.position }"><slot name="simple-const" /></td>
              <td :style="{ verticalAlign: formTest.state.position }"><slot name="simple-variable" /></td>
            </tr>
            <tr>
              <th>inline</th>
              <td :style="{ verticalAlign: formTest.state.position }"><slot name="inline-const" /></td>
              <td :style="{ verticalAlign: formTest.state.position }"><slot name="inline-variable" /></td>
            </tr>
            <tr>
              <th>both</th>
              <td :style="{ verticalAlign: formTest.state.position }"><slot name="both-const" /></td>
              <td :style="{ verticalAlign: formTest.state.position }"><slot name="both-variable" /></td>
            </tr>
            <tr>
              <th>default</th>
              <td :style="{ verticalAlign: formTest.state.position }"><slot name="default-const" /></td>
              <td :style="{ verticalAlign: formTest.state.position }"><slot name="default-variable" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export interface formReviewStatus {
  label: string
  labelWidth: number
  position: string
  edit: string
}
</script>

<script setup lang="ts">
import {
  FORM_MODE,
  defaultBase,
  type baseProps,
} from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
import { type ToggleSetProps } from '@/node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'

//------------------------------------------------------------------------------------------------------------
// 定数・変数（state）
//------------------------------------------------------------------------------------------------------------
const base = ref(defaultBase)
base.value.mode = FORM_MODE.INLINE
base.value.label.width = 0
const formTest = useFormTest()

const positionItems: ToggleSetProps[] = [
  { icon: 'mdi-format-vertical-align-top', value: 'top' },
  { icon: 'mdi-format-vertical-align-center', value: 'middle' },
  { icon: 'mdi-format-vertical-align-bottom', value: 'bottom' },
]

const editItems: ToggleSetProps[] = [
  { text: 'LEFT', value: 'left' },
  { text: 'RIGHT', value: 'right' },
]

//------------------------------------------------------------------------------------------------------------
// エミット
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// メソッド
//------------------------------------------------------------------------------------------------------------

function onChangeLabel(value: string) {
  formTest.state.label = value
}

function onChangeLabelWidth(value: string) {
  formTest.state.labelWidth = Number(value)
}

function onChangePosition(value: ToggleSetProps) {
  formTest.state.position = value.value.toString()
}

function onChangeNaviColor(value: ToggleSetProps) {
  formTest.state.naviColor = value.value.toString()
}

function onChangeEdit(value: ToggleSetProps) {
  formTest.state.edit = value.value.toString()
}

function onChangeHint(value: boolean) {
  formTest.state.hint = value
}
function onChangeBold(value: boolean) {
  formTest.state.bold = value ? 'bold' : 'normal'
}
function onChangeAlign(value: boolean) {
  formTest.state.align = value ? 'flex-end' : 'flex-start'
}
</script>

<style lang="scss" scoped>
.FormPreview {
  position: relative;
  padding: 26px 6px 26px 30px;
  height: calc(100% - 32px);
  .ActionArea {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    padding-right: 20px;
  }
  .SwitchContainer {
    position: relative;
    display: flex;
    height: 36px;
    justify-content: flex-start;
    align-items: center;
  }
  .TableArea {
    position: relative;
    width: 100%;
  }
  .ScrollContents {
    position: relative;
    margin-top: 10px;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 10px;
    height: calc(100% - 32px - 60px);
  }
  table {
    border-collapse: collapse;
    border: solid 1px rgba(var(--r-color-guide), 0.4);
    font-size: 14px;
    thead {
      tr {
        background: rgba(var(--r-color-guide), 0.3);
        color: rgba(var(--r-color-color), 1);
        th {
          padding: 6px 10px 4px;
          white-space: nowrap;
        }
      }
    }
    tbody {
      th {
        background: rgba(var(--r-color-guide), 0.15);
        color: rgba(var(--r-color-color), 0.9);
        padding: 10px 10px 8px;
      }
      td {
        background: rgba(var(--r-color-background));
        padding: 10px 10px 8px;
      }
    }
    td,
    th {
      border: solid 1px rgba(var(--r-color-guide), 0.6);
    }
  }
}
</style>
