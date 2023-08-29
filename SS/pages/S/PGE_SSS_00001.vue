<template>
  <sui-page class="custom_page">
    <sui-page-header2 :pageId="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_SRCH_DT')"
          :labelAlign="'right'"
          style="width: 100%; height: auto"
        >
        <ur-range-picker
          v-model="dateValue"
          autoConfirm
          input-type="YYYY-MM-DD"
        />
        </ur-form-item>
      </ur-form-box>

      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="init">{{ $t("MSG_BTN_RESET") }}</ur-button> <!-- 초기화 -->
          <ur-button v-permission:read="this.$options.name" @click="searchValid">{{ $t("MSG_TXT_SRCH") }}</ur-button> <!-- 조회 -->
          <ur-button v-permission:excel="this.$options.name" color="violet" @click="excelDown">{{ $t("MSG_TXT_EXCEL_DOWNLOAD") }}</ur-button> <!-- 엑셀다운로드 -->
        </div>
      </div>

      <!-- S::일자별 리스트+상세정보 -->
      <div class="comm_shut_wrap mt30">
        <div class="inbox3">
          <!-- S::일자별 리스트 -->
          <div class="comm_title_wrap">
            <h4>{{ $t('MSG_TXT_STATUS_PERIOD') }}</h4>
            <!--S:: 타이틀 오른쪽 total info -->
            <div class="right_box">
              <div class="totalNo">
                <div class="totalCt">Total<span>{{ numberWithCommas(totalCnt) }}</span>{{ $t('MSG_TXT_CNT') }}</div>
                <!-- info: Total *건 -->
              </div>
            </div>
            <!--E:: 타이틀 오른쪽 total info -->
          </div>
          <real-grid
            ref="pgeSss00001Grid"
            grid-id="pgeSss00001Grid"
            grid-root="/lib"
            :gridFields="gridFields"
            :gridColumns="gridColumns"
            :gridRows="gridDataList"
            :gridCheckBar="{ visible: true }"
            :onItemAllChecked="onItemAllChecked"
            :onItemChecked="onItemChecked"
            :gridFooter="true"
            :style="gridStyle"
          />
          <!-- E::일자별 리스트 -->
        </div>
        <div class="emptybox" />
        <div class="inbox7">
          <!-- S::상세정보 -->
          <div class="comm_title_wrap">
            <h4 class="pr10">{{ $t('MSG_TIT_DTL_INFO') }}</h4>
            <ur-button v-permission:excel="this.$options.name" color="violet" @click="excelDownDetail">{{ $t("MSG_TXT_EXCEL_DOWNLOAD") }}</ur-button> <!-- 엑셀다운로드 -->
            <!--S:: 타이틀 오른쪽 total info -->
            <div class="right_box">
              <div class="totalNo">
                <div class="totalCt">Total<span>{{ numberWithCommas(detailTotalCnt) }}</span>{{ $t('MSG_TXT_CNT') }}</div>
                <!-- info: Total *건 -->
              </div>
            </div>
            <!--E:: 타이틀 오른쪽 total info -->
          </div>
          <real-grid
            ref="pgeSss00001DetailGrid"
            grid-id="pgeSss00001DetailGrid"
            grid-root="/lib"
            :gridFields="gridDetailFields"
            :gridColumns="gridDetailColumns"
            :gridRows="gridDetailDataList"
            :style="gridDetailStyle"
          />
          <!-- E::상세정보 -->
        </div>
      </div>
      <!-- E::만기일자별 리스트+상세정보 -->

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_SSS_00001",
  components: {}, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      fToday: utils.now("YYYY-01-01"),
      today: utils.now("YYYY-MM-DD"),
      dateValue: [],
      startDt: null,  // 조회기간(From)
      endDt: null,    // 조회기간(To)
      totalCnt: 0,
      detailTotalCnt: 0,
      gridDataList: [],
      gridDetailDataList: [],
      gridStyle: { height: "600px" },
      gridDetailStyle: { height: "600px" },
    };
  },
  created() {
    this.gridFields = [
      { fieldName: "ymd", dataType: "text" },
      { fieldName: "memshpUid", dataType: "number" },
    ];
    this.gridColumns = [
      {
        // 일자
        name: "ymdColumn",
        fieldName: "ymd",
        width: 100,
        edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        header: {
          text: this.$t('MSG_TXT_DT'),
        },
        // Grid 맨 하위 합계 표시
        footer: {
          // 합계
          text: this.$t('MSG_TXT_SUM'),
          styleName: "align-center"
        }
      },
      {
        // 중지정기권수
        name: "memshpUidColumn",
        fieldName: "memshpUid",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CANCEL_PASS'),
        },
        // 중지정기권수 합계
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
    ];
    this.gridDetailFields = [
      { fieldName: "ymd", dataType: "text" },
      { fieldName: "itemNm", dataType: "text" },
      { fieldName: "stopRymd", dataType: "number" },
      { fieldName: "stopRperiod", dataType: "text" },
    ];
    this.gridDetailColumns = [
      {
        // 일자
        name: "ymdColumn",
        fieldName: "ymd",
        width: 100,
        edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        header: {
          text: this.$t('MSG_TXT_DT'),
        },
      },
      {
        // 정기권번호
        name: "itemNmColumn",
        fieldName: "itemNm",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TICKET_NO'),
        },
      },
      {
        // 중지일수
        name: "stopRymdColumn",
        fieldName: "stopRymd",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_DAYS_SUSPENSION'),
        },
      },
      {
        // 중지기간
        name: "stopRperiodColumn",
        fieldName: "stopRperiod",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_SUSPENSION_PERIOD'),
        },
      },
    ];
  },
  computed: {},
  watch: {
    dateValue(newVal, oldVal) {
      this.startDt = newVal[0];
      this.endDt = newVal[1];
    },
  },
  mounted() {
    this.dateValue = [this.fToday, this.today];
  },
  methods: {
    // 현재년도-01-01, 현재날짜로 초기화
    init() {
      this.dateValue = [this.fToday, this.today];
    },
    // 조회 >> validation check
    searchValid() {
      if (this.startDt === "" || this.startDt === null || this.endDt === "" || this.endDt === null) {
        // 조회일자를 입력해주세요.
        utils.messageBox("alert", this.$t('MSG_ALT_INQUIRY_DATE'));
        return;
      }
      this.search();
    },
    // 조회 파라미터
    getSearchParam() {
      const params = {
        startDt: this.startDt.replace(/-/g, ""),
        endDt: this.endDt.replace(/-/g, ""),
      };
      return params;
    },
    // 조회
    search() {
      const params = this.getSearchParam();
      http.request(this.$options.name, "DTS_SSS_00001", {
        query: params,
      }).then((res) => {
        if (res.data) {
          const resData = res.data;
          this.totalCnt = res.data.length;
          utils.map(resData, (data) => {
            data.ymd = _.isNull(data.ymd)
              ? data.ymd
              : utils.toStringByFormat(utils.toDate(data.ymd), "YYYY-MM-DD");
          });
          this.gridDataList = resData;
          if (this.gridDataList.length == 0) {
            // 데이터가 존재하지 않습니다.
            utils.messageBox("alert", this.$t('MSG_ALT_NO_DATA'));
            // Grid 초기화
            this.gridDataList = [];
            this.gridDetailDataList = [];
            this.$refs.pgeSss00001Grid.setRows(this.gridDataList);
            this.$refs.pgeSss00001DetailGrid.setRows(this.gridDetailDataList);
            this.totalCnt = this.$refs.pgeSss00001Grid.getJsonRows().length;
            this.detailTotalCnt = this.$refs.pgeSss00001DetailGrid.getJsonRows().length;
            return;
          }
          this.$refs.pgeSss00001DetailGrid.setRows(null);
          this.detailTotalCnt = this.$refs.pgeSss00001DetailGrid.getJsonRows().length;
          this.$refs.pgeSss00001Grid.setRows(this.gridDataList);
          this.$refs.pgeSss00001Grid.gridView.setAllCheck(false);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    // check bar 클릭(선택)시 데이터에 해당하는 상제 정보 조회
    getSearchDetailParam() {
      this.checkedList = this.$refs.pgeSss00001Grid.gridView.getCheckedRows(true);
      let ymdList = [];

      utils.forEach(this.checkedList, (dataRow) => {
        let jsonRow = this.$refs.pgeSss00001Grid.getJsonRows()[dataRow];
        jsonRow.ymd = this.$refs.pgeSss00001Grid.getJsonRows()[dataRow].ymd.replace(/-/g, ""); // 중지일자
        ymdList.push(jsonRow.ymd);
      });

      let paramList = [...ymdList]
      const params = {
        ymdList: paramList.join(',')  // 중지일자 List
      };
      return params;
    },
    // 기간별 중지 처리자 상세 정보
    searchDetail() {
      const params = this.getSearchDetailParam();
      http.request(this.$options.name, "DTS_SSS_00002", {
        query: params,
      }).then((res) => {
        const resData = res.data;
        this.detailTotalCnt = res.data.length;
        utils.map(resData, (data) => {
            data.ymd = _.isNull(data.ymd)
              ? data.ymd
              : utils.toStringByFormat(utils.toDate(data.ymd), "YYYY-MM-DD");
          });
        // 현재 check bar 에 선택 X >> 상세정보 Grid 초기화
        if (this.checkedList === null || this.checkedList === "" || this.checkedList.length === 0) {
          this.gridDetailDataList = [];
          this.$refs.pgeSss00001DetailGrid.setRows(this.gridDetailDataList);
          this.detailTotalCnt = this.$refs.pgeSss00001DetailGrid.getJsonRows().length;
          return;
        }
        this.gridDetailDataList = resData;
        this.$refs.pgeSss00001DetailGrid.setRows(this.gridDetailDataList);
      }).catch((error) => {
        console.log(error);
      });
    },
    // Data 조회된 기간별 중지 처리자 현황 그리드 데이터 엑셀 다운로드
    excelDown() {
      if (this.$refs.pgeSss00001Grid.getJsonRows().length == 0) {
        // 조회된 데이터가 없습니다.
        utils.messageBox("alert", this.$t("MSG_ALT_NO_SERACH_DATA"));
        return;
      }
      this.$refs.pgeSss00001Grid.getExcelDownload(this.$t('MSG_TXT_STATUS_PERIOD'), "PGE_SSS_00001");
    },
    // Data 조회된 상세 정보 그리드 데이터 엑셀 다운로드
    excelDownDetail() {
      if (this.$refs.pgeSss00001DetailGrid.getJsonRows().length == 0) {
        // 조회된 데이터가 없습니다.
        utils.messageBox("alert", this.$t("MSG_ALT_NO_SERACH_DATA"));
        return;
      }
      this.$refs.pgeSss00001DetailGrid.getExcelDownload(this.$t('MSG_TXT_STATUS_DETAIL_PERIOD'), "PGE_SSS_00001");
    },
    // check bar 전체(선택, 해제) 이벤트
    onItemAllChecked(grid, checked) {
      this.searchDetail();
    },
    // check bar 선택, 해제 이벤트
    onItemChecked(grid, itemIndex, checked) {
      this.searchDetail();
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