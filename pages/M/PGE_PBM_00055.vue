<template>
  <sui-page class="custom_page">
    <sui-page-header2 :pageId="this.$options.name" />
    <sui-page-contents>
      <!-- S::컨텐츠1 -->
      <ur-form-box toggleable>
        <ur-form-item
          label="스케줄명"
          :label-align="'right'"
          style="width: 100%; height: auto"
          class="flex_wrap"
        >
          <ur-text-field style="width: 50%" value="" />
        </ur-form-item>
      </ur-form-box>
      <!-- <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="조회일자"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-range-picker v-model="dateValue1" init="today" />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="성공여부"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <div class="radioForm">
            <ur-radio v-model="v1" value="Radio 00055_01" sm>전체</ur-radio>
            <ur-radio v-model="v1" value="Radio 00055_02" sm>성공</ur-radio>
            <ur-radio v-model="v1" value="Radio 00055_03" sm>실패</ur-radio>
          </div>
        </ur-form-item>
      </ur-form-box> -->
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button>초기화</ur-button>
          <ur-button color="violet">조회</ur-button>
        </div>
      </div>
      <!-- E::컨텐츠1-->

      <!-- S::컨텐츠2 -->
      <div class="comm_title_wrap mt25">
        <h4>배치작업리스트</h4>
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
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button>삭제</ur-button>
          <ur-button color="violet">신규등록</ur-button>
        </div>
      </div>
      <!-- E::컨텐츠2-->

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_PBM_00055",
  components: {}, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      // 라디오 버튼
      v1: "Radio 00055_01",

      dateValue1: ["", ""],
      dateValue2: [""],

      // 테이블
      options: {
        height: 500,
        rowHeight: 41,
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      // 배치작업리스트
      columns: [
        { text: "성공여부", value: "value1" },
        { text: "프로세스 ID", value: "value2" },
        { text: "프로세스명", value: "value3" },
        { text: "일자", value: "value4" },
        { text: "시간", value: "value5" },
        { text: "상태", value: "value6" },
        { text: "오류코드", value: "value7" },
        { text: "오류메시지", value: "value8" },
        { text: "수행스크립트", value: "value9" },
        { text: "SMS전송여부", value: "value10" },
        { text: "등록자", value: "value11" },
        { text: "수정자", value: "value12" },
        { text: "비고", value: "value13" },
      ],
      list: [
        {
          value1: "성공",
          value2: "PKG_RECEIVE.P_TICKET",
          value3: "티켓정보수신",
          value4: "2022/10/25",
          value5: "12:10:37",
          value6: "수행완료",
          value7: "0",
          value8: "티켓정보 수신작업이 완료되었습니다.",
          value9: "EXEC PKG_RECEIVE.P_TICKET",
          value10: "미전송",
          value11: "BATCH SYSTEM",
          value12: "방길동",
          value13: "-",
        },
      ],
    };
  },
};
</script>
<style scoped></style>
