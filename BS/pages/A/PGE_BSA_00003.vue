<template>
  <sui-page class="custom_page">
    <sui-page-header2 :pageId="this.$options.name" />
    <sui-page-contents>
      <!-- S::컨텐츠1 -->
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_SRCH_DT')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <div style="width: 145px">
            <ur-month-picker
              v-model="stndDt"
              autoConfirm
              input-type="YYYY-MM"
            />
          </div>
          <span class="pickerSpace">~</span>
          <div style="width: 145px">
            <ur-month-picker
              v-model="endDt"
              autoConfirm
              input-type="YYYY-MM"
            />
          </div>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_TICKET_ITEM')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-text-field
            v-model="searchItemNm"
            style="width: 40%; height: auto"
          />
          <ur-dropdown
            v-model="searchParams.itemName"
            :items="itemNameList"
            style="width: 60%; height: auto"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_PARK_KIND')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-dropdown v-model="searchParams.parkFg" :items="parkKindList" />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_TIME_DIV')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-dropdown v-model="searchParams.timeSetting" :items="timeSettingList" />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="reset">{{ $t('MSG_BTN_RESET') }}</ur-button> <!-- 초기화 -->
          <ur-button v-permission:read="this.$options.name" @click="search">{{ $t('MSG_TXT_SRCH') }}</ur-button> <!-- 조회 -->
          <ur-button v-permission:excel="this.$options.name" color="violet" @click="excelDown">{{ $t('MSG_TXT_EXCEL_DOWNLOAD') }}</ur-button> <!-- 엑셀다운로드 -->
        </div>
      </div>
      <!-- E::컨텐츠1-->

      <!-- S::컨텐츠2 -->
      <div class="comm_title_wrap mt25">
        <h4>{{ $t('MSG_TXT_TICKET_AVA_DATE_INFO') }}</h4>
        <!--S:: 타이틀 오른쪽 total info -->
        <div class="right_box">
          <div class="totalNo">
            <div class="totalCt">Total<span>{{ numberWithCommas(totalCnt) }}</span>{{ $t('MSG_TXT_CNT') }}</div>
            <!-- info: Total *건 -->
          </div>
        </div>
        <!--E::: 타이틀 오른쪽 total info -->
      </div>
      <real-grid
        ref="pgeBsa00003Grid"
        grid-id="pgeBsa00003Grid"
        grid-root="/lib"
        :gridFields="gridFields"
        :gridColumns="gridColumns"
        :gridLayout="gridLayout"
        :gridRows="gridDataList"
        :style="gridStyle"
        :gridRowGroupId="gridRowGroupId"
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
  name: "PGE_BSA_00003",
  components: {}, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      fToday: utils.now("YYYY"), // 현재기준연도 (YYYY) (From)
      tToday: utils.now("YYYY"), // 현재기준연도 (YYYY) (To)
      stndDt: [], // 조회기간-시작 (From)
      endDt: [],  // 조회기간-종료 (To)
      searchParams: {
        itemName: "",
        parkFg: "",
        timeSetting: "",
      },
      searchItemNm: "",
      gridDataList: [],
      itemNameList: [],
      parkKindList: [],
      timeSettingList: [],
      gridStyle: { height: "550px" },
      gridRowGroupId: ["articleNo"],
      //select box 전체
      allSelect: {value: '', text: this.$t('MSG_TXT_ALL')}, // 전체
      totalCnt: 0,
    };
  },
  computed: {
    
  },
  watch: {
    searchItemNm(obj) {
      this.selectSearchItemNm();
    },
  },
  created() {
    this.gridFields = [
      // 권종코드
      { fieldName: "articleNo", dataType: "text" },
      // 권종명
      { fieldName: "itemName", dataType: "text" },
      // 파크
      { fieldName: "parkFg", dataType: "text" },
      // 시간
      { fieldName: "timeSetting", dataType: "text" },
      // 년/월
      { fieldName: "ymd", dataType: "text" },
      // 평일
      { fieldName: "week", dataType: "text" },
      // 토요일
      { fieldName: "sat", dataType: "text" },
      // 휴일
      { fieldName: "dayOff", dataType: "text" },
      // 계
      { fieldName: "tot", dataType: "text" },
      // 평일 (가용)
      { fieldName: "weekY", dataType: "number" },
      // 평일 (비가용)
      { fieldName: "weekN", dataType: "number" },
      // 토요일 (가용)
      { fieldName: "satY", dataType: "number" },
      // 토요일 (비가용)
      { fieldName: "satN", dataType: "number" },
      // 휴일 (가용)
      { fieldName: "dayOffY", dataType: "number" },
      // 휴일 (비가용)
      { fieldName: "dayOffN", dataType: "number" },
      // 계 (가용)
      { fieldName: "totY", dataType: "number" },
      // 계 (비가용)
      { fieldName: "totN", dataType: "number" },
    ];
    this.gridColumns = [
      {
        // 권종코드
        name: "articleNoColumn",
        fieldName: "articleNo",
        width: 100,
        edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        header: {
          text: this.$t('MSG_TXT_ITEM_CD'),
        },
        mergeRule: {
          criteria: "value", // 셀머지 옵션
        },
      },
      {
        // 권종명
        name: "itemNameColumn",
        fieldName: "itemName",
        width: 200,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TICKET_ITEM_NM'),
        },
        mergeRule: {
          criteria: "value",
        },
        renderer: {
          showTooltip: true, // 툴팁여부
        },
      },
      {
        // 파크 (E/L, C/B)
        name: "parkFgColumn",
        fieldName: "parkFg",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_PARK'),
        },
        mergeRule: {
          criteria: "value",
        },
      },
      {
        // 시간
        name: "timeSettingColumn",
        fieldName: "timeSetting",
        width: 150,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TIME'),
        },
        mergeRule: {
          criteria: "value",
        },
        renderer: {
          showTooltip: true,
        },
      },
      {
        // 년/월
        name: "ymdColumn",
        fieldName: "ymd",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_YEAR_MONTH'),
        },
        groupFooter: {
          text: this.$t('MSG_TXT_SUM'), // 하단 Grid 합계
        },
      },
      {
        // 평일
        name: "weekColumn",
        fieldName: "week",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_WEEKDAY'),
        },
      },
      {
        // 토요일
        name: "satColumn",
        fieldName: "sat",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_DAY_SATURDAY'),
        },
      },
      {
        // 휴일
        name: "dayOffColumn",
        fieldName: "dayOff",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_HLDY_CAL'),
        },
      },
      {
        // 계
        name: "totColumn",
        fieldName: "tot",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TOTAL'),
        },
      },
      {
        // 평일 (가용)
        name: "weekYColumn",
        fieldName: "weekY",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_WEEK_AVA'),
        },
        groupFooter: {
          numberFormat: "#,##0",
          expression: "sum",
        },
      },
      {
        // 평일 (비가용)
        name: "weekNColumn",
        fieldName: "weekN",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_WEEK_NAVA'),
        },
        groupFooter: {
          numberFormat: "#,##0",
          expression: "sum",
        },
      },
      {
        // 토요일 (가용)
        name: "satYColumn",
        fieldName: "satY",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_SAT_AVA'),
        },
        groupFooter: {
          numberFormat: "#,##0",
          expression: "sum",
        },
      },
      {
        // 토요일 (비가용)
        name: "satNColumn",
        fieldName: "satN",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_SAT_NAVA'),
        },
        groupFooter: {
          numberFormat: "#,##0",
          expression: "sum",
        },
      },
      {
        // 휴일 (가용)
        name: "dayOffYColumn",
        fieldName: "dayOffY",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_HOLI_AVA'),
        },
        groupFooter: {
          numberFormat: "#,##0",
          expression: "sum",
        },
      },
      {
        // 휴일 (비가용)
        name: "dayOffNColumn",
        fieldName: "dayOffN",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_HOLI_NAVA'),
        },
        groupFooter: {
          numberFormat: "#,##0",
          expression: "sum",
        },
      },
      {
        // 계 (가용)
        name: "totYColumn",
        fieldName: "totY",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TOTAL_AVA'),
        },
        groupFooter: {
          numberFormat: "#,##0",
          expression: "sum",
        },
      },
      {
        // 계 (비가용)
        name: "totNColumn",
        fieldName: "totN",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TOTAL_NAVA'),
        },
        groupFooter: {
          numberFormat: "#,##0",
          expression: "sum",
        },
      },
    ];
    this.gridLayout = [
      "articleNoColumn",
      "itemNameColumn",
      "parkFgColumn",
      "timeSettingColumn",
      "ymdColumn",
      {
        // 평일 >> 평일 (가용), 평일 (비가용)
        name: "weekColumn",
        header: { text: this.$t('MSG_TXT_WEEKDAY') },
        items: ["weekYColumn", "weekNColumn"],
      },
      {
        // 토요일 >> 토요일 (가용), 토요일 (비가용)
        name: "satColumn",
        header: { text: this.$t('MSG_TXT_DAY_SATURDAY') },
        items: ["satYColumn", "satNColumn"],
      },
      {
        // 휴일 >> 휴일 (가용), 휴일 (비가용)
        name: "dayOffColumn",
        header: { text: this.$t('MSG_TXT_HLDY_CAL') },
        items: ["dayOffYColumn", "dayOffNColumn"],
      },
      {
        // 계 >> 계 (가용), 계 (비가용)
        name: "totColumn",
        header: { text: this.$t('MSG_TXT_TOTAL') },
        items: ["totYColumn", "totNColumn"],
      },
    ];
  },
  mounted() {
    this.stndDt = [this.fToday, "01"]; // 현재기준연도(YYYY) 01월
    this.endDt = [this.tToday, "12"]; // 현재기준연도(YYYY) 12월
    this.searchItemNm = "";
    this.searchParams.itemName = "";
    this.searchParams.parkFg = "";
    this.searchParams.timeSetting = "";
    // this.allSelect >> (조회조건) 전체 포함 권종 전체 데이터 조회
    http.request(this.$options.name, "DTS_BSA_00015", {
      query: {
        searchItemNm: this.searchItemNm,
      }
    }).then(res => {
      res.data.unshift(Object.assign({}, this.allSelect))
      this.itemNameList = res.data
    })
    // this.allSelect >> (조회조건) 전체 포함 파크구분코드 공통코드 조회
    http.request(this.$options.name, "DTS_BSA_00014", {
      path: { 'code-id': 'COD_PARK_KIND'}
    }).then(res => {
      res.data.unshift(Object.assign({}, this.allSelect))
      this.parkKindList = res.data
    })
    // this.allSelect >> (조회조건) 전체 포함 시간구분코드 공통코드 조회
    http.request(this.$options.name, "DTS_BSA_00014", {
      path: { 'code-id': 'COD_TS'}
    }).then(res => {
      res.data.unshift(Object.assign({}, this.allSelect))
      this.timeSettingList = res.data
    })
  },
  methods: {
    // 초기화
    reset() {
      this.stndDt = [this.fToday, "01"];
      this.endDt = [this.tToday, "12"];
      this.searchItemNm = "";
      this.searchParams.itemName = "";
      this.searchParams.parkFg = "";
      this.searchParams.timeSetting = "";
    },
    selectSearchItemNm() {
      http.request(this.$options.name, "DTS_BSA_00015", {
        query: {
          searchItemNm: this.searchItemNm,
        }
      }).then(res => {
        res.data.unshift(Object.assign({}, this.allSelect))
        this.itemNameList = res.data;
        if (utils.isEmpty(this.searchItemNm)) {
          this.searchParams.itemName = "";
        }
        if (utils.isEmpty(this.searchParams.itemName)) {
          this.searchParams.itemName = "";
        }
      })
    },
    // 조회 파라미터
    getSearchParam() {
      const params = {
        stndDt: this.stndDt[0] + this.stndDt[1],  // 조회기간-시작 (From)
        endDt: this.endDt[0] + this.endDt[1],     // 조회기간-종료 (To)
        itemName: this.searchParams.itemName,     // 권종명
        parkFg: this.searchParams.parkFg,         // 파크구분
        timeSetting: this.searchParams.timeSetting, // 시간구분
      };
      return params;
    },
    // 조회
    search() {
      // 조회일자 validation check
      if (_.isEmpty(this.stndDt[0]) || _.isEmpty(this.stndDt[1]) || _.isEmpty(this.endDt[0]) || _.isEmpty(this.endDt[1])) {
        // 조회기간을 입력해주세요.
        utils.messageBox("alert", this.$t('MSG_ALT_ENTER_INQ_PERIOD'));
        return;
      }
      const params = this.getSearchParam();
      http.request(this.$options.name, "DTS_BSA_00012", {
          query: params,
      }).then((res) => {
        const resData = res.data;
        this.totalCnt = res.data.length;
        this.gridDataList = resData;
        if (this.gridDataList.length == 0) {
          // 데이터가 존재하지 않습니다.
          utils.messageBox("alert", this.$t('MSG_ALT_NO_DATA'));
          // Grid 초기화
          this.gridDataList = [];
          this.$refs.pgeBsa00003Grid.setRows(this.gridDataList);
          this.totalCnt = this.$refs.pgeBsa00003Grid.getJsonRows().length;
          return;
        }
        this.$refs.pgeBsa00003Grid.setRows(this.gridDataList);
      }).catch((error) => {
        console.log(error);
      });
    },
    // Data 조회된 그리드 데이터 엑셀 다운로드
    excelDown() {
      if (this.$refs.pgeBsa00003Grid.getJsonRows().length == 0) {
        // 조회된 데이터가 없습니다.
        utils.messageBox("alert", this.$t('MSG_ALT_NO_SERACH_DATA'));
        return;
      }
      this.$refs.pgeBsa00003Grid.getExcelDownload(this.$t('MSG_TIT_BS05_MNG'), "PGE_BSA_00003");
    },
    numberWithCommas(number) {
      if (number || number === 0) {
        number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return (!number && number !== 0) ? '' : number
    },
  },
};
</script>
<style scoped></style>
