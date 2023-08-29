<template>
  <sui-page class="custom_page">
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <!-- S::컨텐츠1 -->
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="조회일자"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-range-picker
            v-model="dateValue"
            autoConfirm
            input-type="YYYY-MM-DD"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="성공여부"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <div class="radioForm">
            <ur-radio v-model="successYn" value="A" sm>전체</ur-radio>
            <ur-radio v-model="successYn" value="Y" sm>성공</ur-radio>
            <ur-radio v-model="successYn" value="N" sm>실패</ur-radio>
          </div>
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button type="button" @click="reset">초기화</ur-button>
          <ur-button type="button" color="violet" @click="searchValid"
            >조회</ur-button
          >
        </div>
      </div>
      <!-- E::컨텐츠1-->

      <!-- S::컨텐츠2 -->
      <div class="comm_title_wrap mt25">
        <h4>배치작업리스트</h4>
        <!--S:: 타이틀 오른쪽 total info -->
        <div class="right_box">
          <div class="totalNo">
            <div class="totalCt">Total<span>{{ this.gridDataList.length }}</span>건</div>
          </div>
        </div>
        <!--E:: 타이틀 오른쪽 total info -->
      </div>
      <real-grid
        ref="pgeBss00001Grid"
        grid-id="pgeBss00001Grid"
        grid-root="/lib"
        :gridFields="gridFields"
        :gridColumns="gridColumns"
        :gridRows="gridDataList"
        :style="gridStyle"
      />
      <!-- E::컨텐츠2-->

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_BSS_00001",
  components: {}, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      // v-model="dateValue" >>> init="today" 추가
      today: utils.now("YYYY-MM-DD"),
      dateValue: [],
      // searchStartDt: this.today,  // 조회기간(From)
      // searchEndDt: this.today,    // 조회기간(To)
      // 나중에 삭제 S
      searchStartDt: "",
      searchEndDt: "",
      // 나중에 삭제 E
      successYn: "A",
      gridDataList: [],
      gridStyle: { height: "600px" },
    };
  },
  computed: {},
  watch: {
    dateValue(newVal, oldVal) {
      this.searchStartDt = newVal[0];
      this.searchEndDt = newVal[1];
    },
  },
  created() {
    // 배치작업관리 Grid
    this.gridFields = [
      // 성공여부
      { fieldName: "successYn", dataType: "text" },
      // 프로세스 ID
      { fieldName: "processId", dataType: "text" },
      // 프로세스명
      { fieldName: "processName", dataType: "text" },
      // 일자
      { fieldName: "procDate", dataType: "datetime", datetimeFormat: "yyyyMMdd" },
      // 시간
      { fieldName: "procTime", dataType: "datetime", datetimeFormat: "hhmmss" },
      // 상태
      { fieldName: "statusKind", dataType: "text" },
      // 오류코드
      { fieldName: "sqlCode", dataType: "text" },
      // 오류메시지
      { fieldName: "sqlErrm", dataType: "text" },
      // 수행스크립트
      { fieldName: "exeScript", dataType: "text" },
      // SMS전송여부
      { fieldName: "smsTransfrYn", dataType: "text" },
      // 등록자
      { fieldName: "fstRgstUsrId", dataType: "text" },
      // 수정자
      { fieldName: "fnlMdfcUsrId", dataType: "text" },
      // 비고
      { fieldName: "remarkDesc", dataType: "text" },
    ];
    // 배치작업관리 Grid
    this.gridColumns = [
      {
        name: "successYnColumn",
        fieldName: "successYn",
        width: 100,
        edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        header: {
          text: "성공여부",
        },
      },
      {
        name: "processIdColumn",
        fieldName: "processId",
        width: 100,
        edit: false,
        header: {
          text: "프로세스 ID",
        },
      },
      {
        name: "processNameColumn",
        fieldName: "processName",
        width: 100,
        edit: false,
        header: {
          text: "프로세스명",
        },
      },
      {
        name: "procDateColumn",
        fieldName: "procDate",
        width: 100,
        edit: false,
        header: {
          text: "일자",
        },
        datetimeFormat: "yyyy-MM-dd",
      },
      {
        name: "procTimeColumn",
        fieldName: "procTime",
        width: 100,
        edit: false,
        header: {
          text: "시간",
        },
        datetimeFormat: "HH:mm:ss",
      },
      {
        name: "statusKindColumn",
        fieldName: "statusKind",
        width: 100,
        edit: false,
        header: {
          text: "상태",
        },
      },
      {
        name: "sqlCodeColumn",
        fieldName: "sqlCode",
        width: 100,
        edit: false,
        header: {
          text: "오류코드",
        },
      },
      {
        name: "sqlErrmColumn",
        fieldName: "sqlErrm",
        width: 100,
        edit: false,
        header: {
          text: "오류메시지",
        },
      },
      {
        name: "exeScriptColumn",
        fieldName: "exeScript",
        width: 100,
        edit: false,
        header: {
          text: "수행스크립트",
        },
      },
      {
        name: "smsTransfrYnColumn",
        fieldName: "smsTransfrYn",
        width: 100,
        edit: false,
        header: {
          text: "SMS전송여부",
        },
      },
      {
        name: "fstRgstUsrIdColumn",
        fieldName: "fstRgstUsrId",
        width: 100,
        edit: false,
        header: {
          text: "등록자",
        },
      },
      {
        name: "fnlMdfcUsrIdColumn",
        fieldName: "fnlMdfcUsrId",
        width: 100,
        edit: false,
        header: {
          text: "수정자",
        },
      },
      {
        name: "remarkDescColumn",
        fieldName: "remarkDesc",
        width: 100,
        edit: false,
        header: {
          text: "비고",
        },
      },
    ];
  },
  mounted() {
    // 데이터로 인해 나중에 삭제
    this.dateValue = ["2019-12-26", this.today];
    // this.dateValue = [this.today, this.today];
    this.successYn = "A";
  },
  methods: {
    reset() {
      // 데이터로 인해 나중에 삭제
      this.dateValue = ["2019-12-26", this.today];
      // this.dateValue = [this.today, this.today];
      this.successYn = "A";
    },
    searchValid() {
      if (
        this.searchStartDt === "" ||
        this.searchStartDt === null ||
        this.searchEndDt === "" ||
        this.searchEndDt === null
      ) {
        utils.messageBox("alert", "조회일자를 입력해주세요.");
        return;
      }
      this.search();
    },
    getSearchParam() {
      const params = {
        searchStartDt: this.searchStartDt.replace(/-/g, ""),
        searchEndDt: this.searchEndDt.replace(/-/g, ""),
        successYn: this.successYn,
      };
      return params;
    },
    search() {
      const params = this.getSearchParam();
      http
        .request(this.$options.name, "DTS_BSS_00001", {
          query: params,
        })
        .then((res) => {
          if (res.data) {
            const resData = res.data;
            this.gridDataList = resData;
            this.$refs.pgeBss00001Grid.setRows(this.gridDataList);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped></style>
