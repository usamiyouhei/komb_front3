<template>
  <LayoutTestArticle title="サンプル">
    <LayoutTestReview>
      <div class="Contents">
        <section>
          <h5>PartsPagination(@/components/parts/Pagination.vue)</h5>
          <p>Vuetifyそのままでも行けそうだが、表示領域に合わせて自動で、表示個数変えたいのでとりあえずラップ</p>
          <!--  情報を表示 -->
          <div class="Sample">
            <PartsCalendar :selectType="CALENDAR_TYPE.DISPLAY" :events="events" displayToday small />
          </div>
          <!-- インプットから１日だけ選択可能 -->
          <div class="Sample">
            <PartsCalendar :selectType="CALENDAR_TYPE.DAY_INPUT" :fixedSize="fixedCalendarRect" displayToday small />
          </div>
          <!-- カレンダーから一日だけ選択可能 -->
          <div class="Sample">
            <PartsCalendar :selectType="CALENDAR_TYPE.DAY_CALENDAR" displayToday small />
          </div>
          <!-- インプットから期間を選択可能 -->
          <div class="Sample">
            <PartsCalendar :selectType="CALENDAR_TYPE.PERIOD_INPUT" :fixedSize="fixedCalendarRect" displayToday small />
          </div>
          <!-- カレンダーから期間を選択可能 -->
          <div class="Sample">
            <PartsCalendar :selectType="CALENDAR_TYPE.PERIOD_CALENDAR" displayToday small />
          </div>
          <!-- インプットから複数の日を選択可能 -->
          <div class="Sample">
            <PartsCalendar
              :selectType="CALENDAR_TYPE.MULTI_DAYS_INPUT"
              :fixedSize="fixedCalendarRect"
              displayToday
              small
            />
          </div>
          <!-- カレンダーから複数の日を選択可能 -->
          <div class="Sample">
            <PartsCalendar :selectType="CALENDAR_TYPE.MULTI_DAYS_CALENDAR" displayToday small />
          </div>
          <!-- インプットから許可された日で複数の日を選択可能 -->
          <div class="Sample">
            <PartsCalendar
              :selectType="CALENDAR_TYPE.PERMITTED_INPUT"
              :fixedSize="fixedCalendarRect"
              :permittedDate="permittedDate"
              displayToday
              small
            />
          </div>
          <!-- カレンダーから許可された日で複数の日を選択可能 -->
          <div class="Sample">
            <PartsCalendar
              :selectType="CALENDAR_TYPE.PERMITTED_CALENDAR"
              :permittedDate="permittedDate"
              displayToday
              small
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
  CALENDAR_TYPE,
  type EventItem,
  type FixedSize,
} from '../../../node_modules/@ringzero/nuxt3-front-template-set/dist/runtime/components/common'
import dayjs from 'dayjs'

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'パーツテスト',
})

// --------------------------テスト------------------------------------
const permittedDate = ref<string[]>(['2023-09-01', '2023-09-14', '2023-09-30'])
const events: EventItem[] = [
  {
    id: 1,
    value: 'イベント',
    start: new Date(2023, 8, 12),
    end: new Date(2023, 8, 14),
    color: THEME_COLOR.warning,
    isEditable: true,
  },
]

const fixedCalendarRect: Ref<FixedSize> = ref({
  justify: 'flex-end',
  align: 'flex-start',
  offsetX: '-300px',
  offsetY: '200px',
  width: '380px',
  height: '450px',
})
//---------------------------------------------------------------------
</script>
<style lang="scss" scoped>
@use '../../../assets/test';
</style>
