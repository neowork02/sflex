<template>
  <sui-page class="custom_page">
    <sui-page-header2 :pageId="this.$options.name" />
    <sui-page-contents>
      <!-- S::컨텐츠1:조회조건 -->
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_SRCH_DT')"
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
          :label="$t('MSG_TXT_DAY_OF_WEEK')"
          :labelAlign="'right'"
          required
          style="width: 50%; height: auto"
        >
          <div class="radioForm">
            <ur-radio v-model="dtTpCd" value="ALL" sm>{{ $t('MSG_TXT_ALL') }}</ur-radio> <!-- 전체 -->
            <ur-radio v-model="dtTpCd" value="01" sm>{{ $t('MSG_TXT_WEEKDAY') }}</ur-radio> <!-- 평일 -->
            <ur-radio v-model="dtTpCd" value="03" sm>{{ $t('MSG_TXT_DAY_SATURDAY') }}</ur-radio> <!-- 토요일 -->
            <ur-radio v-model="dtTpCd" value="04" sm>{{ $t('MSG_TXT_HLDY_CAL') }}</ur-radio> <!-- 휴일 -->
          </div>
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="init">{{ $t('MSG_BTN_RESET') }}</ur-button> <!-- 초기화 -->
          <ur-button v-permission:read="this.$options.name" @click="searchValid">{{ $t('MSG_TXT_SRCH') }}</ur-button> <!-- 조회 -->
          <ur-button v-permission:excel="this.$options.name" color="violet" @click="excelDown">{{ $t('MSG_TXT_EXCEL_DOWNLOAD') }}</ur-button> <!-- 엑셀다운로드 -->
        </div>
      </div>
      <!-- E::컨텐츠1:조회조건 -->
      <!-- S::컨텐츠2 -->
      <div class="comm_title_wrap mt25">
        <h4>{{ $t('MSG_TXT_SUB_STATUS_TICKET_TYPE') }}</h4>
        <!--S:: 타이틀 오른쪽 total info -->
        <div class="right_box">
          <div class="totalNo">
            <div class="totalCt">Total<span>{{ numberWithCommas(totalCnt) }}</span>{{ $t('MSG_TXT_CNT') }}</div>
          </div>
        </div>
        <!--E:: 타이틀 오른쪽 total info -->
      </div>
      <real-grid
        ref="pgeSst00001Grid"
        grid-id="pgeSst00001Grid"
        grid-root="/lib"
        :gridFields="gridFields"
        :gridColumns="gridColumns"
        :gridRows="gridDataList"
        :gridFooter="true"
        :style="gridStyle"
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
  name: "PGE_SST_00001", // eslint-disable-line vue/name-property-casing
  components: {},
  data() {
    return {
      today: utils.now("YYYY-MM-DD"),
      dateValue: [],
      startDt: null,  // 조회기간(From)
      endDt: null,    // 조회기간(To)
      dtTpCd: "ALL",
      gridDataList: [],
      gridStyle: { height: "600px" },
      totalCnt: 0,
    };
  },
  created() {
    this.gridFields = [
      { fieldName: "itemName", dataType: "text" },
      { fieldName: "totItemCnt", dataType: "number" },
      { fieldName: "itemCnt08", dataType: "number" },
      { fieldName: "itemCnt09", dataType: "number" },
      { fieldName: "itemCnt10", dataType: "number" },
      { fieldName: "itemCnt11", dataType: "number" },
      { fieldName: "itemCnt12", dataType: "number" },
      { fieldName: "itemCnt13", dataType: "number" },
      { fieldName: "itemCnt14", dataType: "number" },
      { fieldName: "itemCnt15", dataType: "number" },
      { fieldName: "itemCnt16", dataType: "number" },
      { fieldName: "itemCnt17", dataType: "number" },
      { fieldName: "itemCnt18", dataType: "number" },
      { fieldName: "itemCnt19", dataType: "number" },
      { fieldName: "itemCnt20", dataType: "number" },
      { fieldName: "itemCnt21", dataType: "number" },
      { fieldName: "itemCnt22", dataType: "number" },
    ];
    this.gridColumns = [
      {
        // 권종명
        name: "itemNameColumn",
        fieldName: "itemName",
        width: 300,
        numberFormat: "#,##0",
        edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        header: {
          text: this.$t('MSG_TXT_TICKET_ITEM_NM')
        },
        // Grid 맨 하위 합계 표시
        footer: {
          // 합계
          text: this.$t('MSG_TXT_SUM'),
          styleName: "align-center"
        }
      },
      {
        // 합계
        name: "totItemCntColumn",
        fieldName: "totItemCnt",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_SUM')
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        // 9시이전
        name: "itemCnt08Column",
        fieldName: "itemCnt08",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_BEFORE_NINE')
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        // 9시
        name: "itemCnt09Column",
        fieldName: "itemCnt09",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TIME9')
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        // 10시
        name: "itemCnt10Column",
        fieldName: "itemCnt10",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TIME10')
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        // 11시
        name: "itemCnt11Column",
        fieldName: "itemCnt11",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TIME11')
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        // 12시
        name: "itemCnt12Column",
        fieldName: "itemCnt12",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TIME12')
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        // 13시
        name: "itemCnt13Column",
        fieldName: "itemCnt13",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TIME13')
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        // 14시
        name: "itemCnt14Column",
        fieldName: "itemCnt14",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TIME14')
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        // 15시
        name: "itemCnt15Column",
        fieldName: "itemCnt15",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TIME15')
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        // 16시
        name: "itemCnt16Column",
        fieldName: "itemCnt16",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TIME16')
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        // 17시
        name: "itemCnt17Column",
        fieldName: "itemCnt17",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TIME17')
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        // 18시
        name: "itemCnt18Column",
        fieldName: "itemCnt18",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TIME18')
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        // 19시
        name: "itemCnt19Column",
        fieldName: "itemCnt19",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TIME19')
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        // 20시
        name: "itemCnt20Column",
        fieldName: "itemCnt20",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TIME20')
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        // 21시
        name: "itemCnt21Column",
        fieldName: "itemCnt21",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TIME21')
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        // 22시 이후
        name: "itemCnt22Column",
        fieldName: "itemCnt22",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_AFTER_TIME22')
        },
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
    this.dateValue = [this.today, this.today];
    this.dtTpCd = "ALL";
  },
  methods: {
    // 현재날짜로 초기화
    init() {
      this.dateValue = [this.today, this.today];
      this.dtTpCd = "ALL";
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
        dtTpCd: this.dtTpCd,
      };
      return params;
    },
    // 조회
    search() {
      const params = this.getSearchParam();
      http.request(this.$options.name, "DTS_SST_00001", {
        query: params,
      }).then((res) => {
        if (res.data) {
          const resData = res.data;
          this.totalCnt = res.data.length;
          this.gridDataList = resData;
          if (this.gridDataList.length == 0) {
            // 데이터가 존재하지 않습니다.
            utils.messageBox("alert", this.$t('MSG_ALT_NO_DATA'));
            // Grid 초기화
            this.gridDataList = [];
            this.$refs.pgeSst00001Grid.setRows(this.gridDataList);
            this.totalCnt = this.$refs.pgeSst00001Grid.getJsonRows().length;
            return;
          }
          this.$refs.pgeSst00001Grid.setRows(this.gridDataList);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    // Data 조회된 그리드 데이터 엑셀 다운로드
    excelDown() {
      if (this.$refs.pgeSst00001Grid.getJsonRows().length == 0) {
        // 조회된 데이터가 없습니다.
        utils.messageBox("alert", this.$t("MSG_ALT_NO_SERACH_DATA"));
        return;
      }
      this.$refs.pgeSst00001Grid.getExcelDownload(this.$t('MSG_TXT_SUB_STATUS_TICKET_TYPE'), "PGE_SST_00001");
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
