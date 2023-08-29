<template>
  <sui-page class="custom_page">
    <sui-page-header2 :pageId="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_SRCH_DT')"
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
          :label="$t('MSG_TXT_TICKET_ITEM_NM')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-text-field
            v-model="itemNm"
            maxlength="50"
            style="width: 100%; height: auto"
            @keyup="specialChar"
            @keyup.enter="searchValid"
          />
        </ur-form-item>
      </ur-form-box>

      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="init">{{ $t('MSG_BTN_RESET') }}</ur-button> <!-- 초기화 -->
          <ur-button v-permission:read="this.$options.name" @click="searchValid">{{ $t('MSG_TXT_SRCH') }}</ur-button> <!-- 조회 -->
          <ur-button v-permission:excel="this.$options.name" color="violet" @click="excelDown">{{ $t('MSG_TXT_EXCEL_DOWNLOAD') }}</ur-button> <!-- 엑셀다운로드 -->
        </div>
      </div>

      <!-- S::만기일자별 리스트+권종상세 -->
      <div class="comm_shut_wrap mt30">
        <div class="inbox3">
          <!-- S::만기일자별 리스트 -->
          <div class="comm_title_wrap">
            <h4>{{ $t('MSG_TXT_LIST_MAT_DATE') }}</h4>
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
            ref="pgeSse00001Grid"
            grid-id="pgeSse00001Grid"
            grid-root="/lib"
            :gridFields="gridFields"
            :gridColumns="gridColumns"
            :gridRows="gridDataList"
            :gridCellClick="gridCellClick"
            :gridFooter="true"
            :style="gridStyle"
          />
          <!-- E::만기일자별 리스트 -->
        </div>
        <div class="emptybox" />
        <div class="inbox7">
          <!-- S::권종 상세 -->
          <div class="comm_title_wrap">
            <h4 class="pr10">{{ $t('MSG_TXT_TICKET_TYPE_DETAIL') }}</h4>
            <ur-button v-permission:excel="this.$options.name" color="violet" @click="excelDownDetail">{{ $t('MSG_TXT_EXCEL_DOWNLOAD') }}</ur-button> <!-- 엑셀다운로드 -->
            <!--S:: 타이틀 오른쪽 total info -->
            <div class="right_box">
              <div class="totalNo">
                <div class="totalCt">Total<span>{{ numberWithCommas(totalCnt2) }}</span>{{ $t('MSG_TXT_CNT') }}</div>
                <!-- info: Total *건 -->
              </div>
            </div>
            <!--E:: 타이틀 오른쪽 total info -->
          </div>
          <real-grid
            ref="pgeSse00001DetailGrid"
            grid-id="pgeSse00001DetailGrid"
            grid-root="/lib"
            :gridFields="gridDetailFields"
            :gridColumns="gridDetailColumns"
            :gridRows="gridDetailDataList"
            :gridFooter="true"
            :style="gridDetailStyle"
          />
          <!-- E::권종상세 -->
        </div>
      </div>
      <!-- E::만기일자별 리스트+권종상세 -->

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_SSE_00001",
  components: {}, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      fToday: utils.now("YYYY-01-01"),
      today: utils.now("YYYY-MM-DD"),
      dateValue: [],
      startDt: null,  // 조회기간(From)
      endDt: null,    // 조회기간(To)
      itemNm: null,
      gridDataList: [],
      gridDetailDataList: [],
      gridStyle: { height: "600px" },
      gridDetailStyle: { height: "600px" },
      totalCnt: 0,
      totalCnt2: 0,
    };
  },
  created() {
    this.gridFields = [
      { fieldName: "joinYmd", dataType: "text" },
      { fieldName: "memshpUid", dataType: "number" },
    ];
    this.gridColumns = [
      {
        // 만기일자
        name: "joinYmdColumn",
        fieldName: "joinYmd",
        width: 100,
        edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        header: {
          text: this.$t('MSG_TXT_EXPIRE_DATE'),
        },
        // Grid 맨 하위 합계 표시
        footer: {
          // 합계
          text: this.$t('MSG_TXT_SUM'),
          styleName: "align-center"
        }
      },
      {
        // 만기자수
        name: "memshpUidColumn",
        fieldName: "memshpUid",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_NUMBER_MAT'),
        },
        // 만기자수 합계
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
      { fieldName: "itemCnt", dataType: "number" },
    ];
    this.gridDetailColumns = [
      {
        // 만기일자
        name: "ymdColumn",
        fieldName: "ymd",
        width: 100,
        edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        header: {
          text: this.$t('MSG_TXT_EXPIRE_DATE'),
        },
        // Grid 맨 하위 합계 표시
        footer: {
          // 합계
          text: this.$t('MSG_TXT_SUM'),
          styleName: "align-center"
        }
      },
      {
        // 권종명
        name: "itemNmColumn",
        fieldName: "itemNm",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TICKET_ITEM_NM'),
        },
      },
      {
        // 만기자수
        name: "itemCntColumn",
        fieldName: "itemCnt",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_NUMBER_MAT'),
        },
        // 만기자수 합계
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
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
    this.itemNm = null;
  },
  methods: {
    // 현재년도-01-01, 현재날짜로 초기화
    init() {
      this.dateValue = [this.fToday, this.today];
      this.itemNm = null;
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
        itemNm: utils.trim(this.itemNm),
      };
      return params;
    },
    // 조회
    search() {
      const params = this.getSearchParam();
      http.request(this.$options.name, "DTS_SSE_00001", {
        query: params,
      }).then((res) => {
        if (res.data) {
          const resData = res.data;
          this.totalCnt = res.data.length;
          utils.map(resData, (data) => {
            data.joinYmd = _.isNull(data.joinYmd)
              ? data.joinYmd
              : utils.toStringByFormat(utils.toDate(data.joinYmd), "YYYY-MM-DD");
          });
          this.gridDataList = resData;
          if (this.gridDataList.length == 0) {
            // 데이터가 존재하지 않습니다.
            utils.messageBox("alert", this.$t('MSG_ALT_NO_DATA'));
            // Grid 초기화
            this.gridDataList = [];
            this.gridDetailDataList = [];
            this.$refs.pgeSse00001Grid.setRows(this.gridDataList);
            this.$refs.pgeSse00001DetailGrid.setRows(this.gridDetailDataList);
            this.totalCnt = this.$refs.pgeSse00001Grid.getJsonRows().length;
            this.totalCnt2 = this.$refs.pgeSse00001DetailGrid.getJsonRows().length;
            return;
          }
          this.$refs.pgeSse00001Grid.setRows(this.gridDataList);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    // 만기일자별 리스트 row 데이터에 해당하는 권종상세 조회
    getSearchParam2() {
      const params = {
        joinYmd: this.selectedGridRowData.joinYmd.replace(/-/g, ""),  // 만기일자
        itemNm: utils.trim(this.itemNm),
      };
      return params;
    },
    // row클릭 >> 권종 상세 조회
    searchDetail() {
      const params = this.getSearchParam2();
      http.request(this.$options.name, "DTS_SSE_00002", {
          query: params,
      }).then((res) => {
        const resData = res.data;
        this.totalCnt2 = res.data.length;
        utils.map(resData, (data) => {
            data.ymd = _.isNull(data.ymd)
              ? data.ymd
              : utils.toStringByFormat(utils.toDate(data.ymd), "YYYY-MM-DD");
          });
        this.gridDetailDataList = resData;
        this.$refs.pgeSse00001DetailGrid.setRows(this.gridDetailDataList);
      }).catch((error) => {
        console.log(error);
      });
    },
    // Data 조회된 만기일자별 리스트 그리드 데이터 엑셀 다운로드
    excelDown() {
      if (this.$refs.pgeSse00001Grid.getJsonRows().length == 0) {
        // 조회된 데이터가 없습니다.
        utils.messageBox("alert", this.$t("MSG_ALT_NO_SERACH_DATA"));
        return;
      }
      this.$refs.pgeSse00001Grid.getExcelDownload(this.$t('MSG_TXT_LIST_MAT_DATE'), "PGE_SSE_00001");
    },
    // Data 조회된 권종상세 그리드 데이터 엑셀 다운로드
    excelDownDetail() {
      if (this.$refs.pgeSse00001DetailGrid.getJsonRows().length == 0) {
        // 조회된 데이터가 없습니다.
        utils.messageBox("alert", this.$t("MSG_ALT_NO_SERACH_DATA"));
        return;
      }
      this.$refs.pgeSse00001DetailGrid.getExcelDownload(this.$t('MSG_TXT_EXP_DATE_TYPE_DETAIL'), "PGE_SSE_00001");
    },
    // 리얼그리드 셀 클릭 이벤트
    gridCellClick(grid, data) {
      if (data.dataRow >= 0) {
        this.selectedGridRowData = this.gridDataList[data.dataRow];
        this.searchDetail();
      } else {
        this.selectedGridRowData = {};
      }
    },
    // 특수문자 체크
    specialChar() {
      const searchNewText = utils.trim(this.itemNm);
      if (utils.isExistSpecialChar(searchNewText)) {
        // `-_{}[];:<>/? 제외 특수문자는 입력할 수 없습니다.
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.itemNm = ''
        });
      }
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