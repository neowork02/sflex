<template>
  <sui-page class="custom_page">
    <sui-page-header2 :pageId="this.$options.name" />
    <sui-page-contents>
      <!-- S::컨텐츠1 -->
      <ur-form-box toggleable>
        <!-- S::[2023-03-29] month-picker 수정 -->
        <ur-form-item
          class="flex_wrap"
          label="조회일자"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <div style="width: 145px">
            <ur-month-picker v-model="dateValue2" />
          </div>
          <span class="pickerSpace">~</span>
          <div style="width: 145px">
            <ur-month-picker v-model="dateValue3" />
          </div>
        </ur-form-item>
        <!-- E::[2023-03-29] month-picker 수정 -->
        <!-- <ur-form-item
          class="flex_wrap"
          label="기간"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-range-picker v-model="dateValue1" init="today" />
        </ur-form-item> -->
        <ur-form-item
          class="flex_wrap"
          label="권종"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
        <!-- S::[2023-08-22] 권종 수정 -->
         <ur-text-field
                value=""
                style="width: 40%; height: auto"
           />
          <ur-dropdown v-model="valueD1" :items="items1" style="width: 60%; height: auto" />
          <!-- E::[2023-08-22] 권종 수정 -->
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="파크구분"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-dropdown v-model="valueD1" :items="items2" />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="시간구분"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-dropdown v-model="valueD1" :items="items3" />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button>초기화</ur-button>
          <ur-button>조회</ur-button>
          <ur-button color="violet">엑셀다운로드</ur-button>
        </div>
      </div>
      <!-- E::컨텐츠1-->

      <!-- S::컨텐츠2 -->
      <div class="comm_title_wrap mt25">
        <h4>권종 가용일 정보</h4>
        <!--S:: 타이틀 오른쪽 total info -->
        <div class="right_box">
          <div class="totalNo">
            <div class="totalCt">Total<span>1</span>건</div>
          </div>
        </div>
        <!--E:: 타이틀 오른쪽 total info -->
      </div>
      <ur-data-grid
        ref="grid"
        :headers="columns"
        :data-source="list"
        :data-set-options="{ id: 'id' }"
        :options="options"
      />
      <!-- E::컨텐츠2 -->

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_PBM_00052",
  components: {}, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      // 테이블
      options: {
        height: 500,
        rowHeight: 41,
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      // 권종가용일정보 리스트
      columns: [
        { text: "No", value: "value1", width: "60px" },
        { text: "권종코드", value: "value2" },
        { text: "권종명", value: "value3" },
        { text: "파크", value: "value4" },
        { text: "시간", value: "value5" },
        { text: "년/월", value: "value6" },
        { text: "평일", value: "value7" },
        { text: "토요일", value: "value8" },
        { text: "휴일", value: "value9" },
        { text: "계", value: "value10" },
      ],
      list: [
        {
          value1: "-",
          value2: "-",
          value3: "-",
          value4: "-",
          value5: "10:15:30",
          value6: "22/10",
          value7: "-",
          value8: "-",
          value9: "-",
          value10: "-",
        },
      ],
      // 드롭다운
      valueD1: "1",

      dateValue2: ["2020", "01"],
      dateValue3: ["2020", "03"],
    };
  },
  computed: {
    items1() {
      const rtnItems1 = [];
      rtnItems1.push({ value: "1", text: "전체" });
      rtnItems1.push({ value: "2", text: "10만원권" });
      rtnItems1.push({ value: "3", text: "30만원권" });
      rtnItems1.push({ value: "4", text: "50만원권" });
      rtnItems1.push({ value: "5", text: "100만원권" });
      return rtnItems1;
    },
    items2() {
      const rtnItems2 = [];
      rtnItems2.push({ value: "1", text: "전체" });
      rtnItems2.push({ value: "2", text: "EL" });
      return rtnItems2;
    },
    items3() {
      const rtnItems3 = [];
      rtnItems3.push({ value: "1", text: "전체" });
      rtnItems3.push({ value: "2", text: "종일" });
      return rtnItems3;
    },
  },
};
</script>
<style scoped></style>
