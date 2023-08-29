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
          <ur-date-picker
            v-model="stndDt"
            autoConfirm
            input-type="YYYY-MM-DD"
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
      <!-- E::컨텐츠1:조회조건 -->
      <!-- S::컨텐츠2 -->
      <div class="comm_title_wrap mt25">
        <h4>{{ $t('MSG_TXT_SUB_STATUS_TIME_ZONE') }}</h4>
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
        ref="pgeSsw00001Grid"
        grid-id="pgeSsw00001Grid"
        grid-root="/lib"
        :gridFields="gridFields"
        :gridColumns="gridColumns"
        :gridRows="gridDataList"
        :gridFooter="true"
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
  name: "PGE_SSW_00001", // eslint-disable-line vue/name-property-casing
  components: {},
  data() {
    return {
      today: utils.now("YYYY-MM-DD"),
      stndDt: null,
      gridDataList: [],
      gridView: null,
      gridStyle: { height: "600px" },
      totalCnt: 0,
    };
  },
  created() {
    this.gridFields = [
      { fieldName: "paymntTime", dataType: "text" },
      { fieldName: "totItemCnt", dataType: "number" },
      { fieldName: "itemCnt1", dataType: "number" },
      { fieldName: "itemCnt2", dataType: "number" },
      { fieldName: "itemCnt3", dataType: "number" },
      { fieldName: "itemCnt4", dataType: "number" },
      { fieldName: "itemCnt5", dataType: "number" },
      { fieldName: "itemCnt6", dataType: "number" },
      { fieldName: "itemCnt7", dataType: "number" },
    ];
    this.gridColumns = [
      {
        // 시간유형
        name: "paymntTimeColumn",
        fieldName: "paymntTime",
        width: 100,
        edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        header: {
          text: this.$t('MSG_TXT_TIME_TYPE'),
        },
        // Grid 맨 하위 합계 표시
        footer: {
          // 계
          text: this.$t('MSG_TXT_TOTAL'),
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
          text: this.$t('MSG_TXT_SUM'),
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        // (월)
        name: "itemCnt1Column",
        fieldName: "itemCnt1",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_MONDAY'),
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        // (화)
        name: "itemCnt2Column",
        fieldName: "itemCnt2",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TUESDAY'),
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        // (수)
        name: "itemCnt3Column",
        fieldName: "itemCnt3",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_WEDNESDAY'),
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        // (목)
        name: "itemCnt4Column",
        fieldName: "itemCnt4",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_THURSDAY'),
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        // (금)
        name: "itemCnt5Column",
        fieldName: "itemCnt5",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_FRIDAY'),
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        // (토)
        name: "itemCnt6Column",
        fieldName: "itemCnt6",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_SATURDAY'),
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        // (일)
        name: "itemCnt7Column",
        fieldName: "itemCnt7",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_SUNDAY'),
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
  watch: {},
  mounted() {
    this.stndDt = this.today;
  },
  methods: {
    // 현재날짜로 초기화
    init() {
      this.stndDt = this.today;
    },
    // 조회 >> validation check
    searchValid() {
      if (this.stndDt === "" || this.stndDt === null) {
        // 조회일자를 입력해주세요.
        utils.messageBox("alert", this.$t('MSG_ALT_INQUIRY_DATE'));
        return;
      }
      this.search();
    },
    // 조회 파라미터
    getSearchParam() {
      const params = {
        stndDt: this.stndDt.replace(/-/g, ""),
      };
      return params;
    },
    // 조회
    search() {
      const params = this.getSearchParam();
      http.request(this.$options.name, "DTS_SSW_00001", {
        query: params,
      }).then((res) => {
        if (res.data) {
          const resData = res.data;
          this.totalCnt = res.data.length;
          utils.map(resData, (data) => {
            data.date1 = _.isNull(data.date1)
              ? data.date1
              : utils.toStringByFormat(utils.toDate(data.date1), "YYYY/MM/DD (월)");
          });
          utils.map(resData, (data) => {
            data.date2 = _.isNull(data.date2)
              ? data.date2
              : utils.toStringByFormat(utils.toDate(data.date2), "YYYY/MM/DD (화)");
          });
          utils.map(resData, (data) => {
            data.date3 = _.isNull(data.date3)
              ? data.date3
              : utils.toStringByFormat(utils.toDate(data.date3), "YYYY/MM/DD (수)");
          });
          utils.map(resData, (data) => {
            data.date4 = _.isNull(data.date4)
              ? data.date4
              : utils.toStringByFormat(utils.toDate(data.date4), "YYYY/MM/DD (목)");
          });
          utils.map(resData, (data) => {
            data.date5 = _.isNull(data.date5)
              ? data.date5
              : utils.toStringByFormat(utils.toDate(data.date5), "YYYY/MM/DD (금)");
          });
          utils.map(resData, (data) => {
            data.date6 = _.isNull(data.date6)
              ? data.date6
              : utils.toStringByFormat(utils.toDate(data.date6), "YYYY/MM/DD (토)");
          });
          utils.map(resData, (data) => {
            data.date7 = _.isNull(data.date7)
              ? data.date7
              : utils.toStringByFormat(utils.toDate(data.date7), "YYYY/MM/DD (일)");
          });
          this.gridDataList = resData;
          if (this.gridDataList.length == 0) {
            // 데이터가 존재하지 않습니다.
            utils.messageBox("alert", this.$t('MSG_ALT_NO_DATA'));
            // Grid 초기화
            this.gridDataList = [];
            this.$refs.pgeSsw00001Grid.setRows(this.gridDataList);
            this.totalCnt = this.$refs.pgeSsw00001Grid.getJsonRows().length;
            return;
          }
          this.$refs.pgeSsw00001Grid.setRows(this.gridDataList);
          this.$refs.pgeSsw00001Grid.gridView.setColumnProperty("itemCnt1Column", "header", res.data[0].date1);
          this.$refs.pgeSsw00001Grid.gridView.setColumnProperty("itemCnt2Column", "header", res.data[0].date2);
          this.$refs.pgeSsw00001Grid.gridView.setColumnProperty("itemCnt3Column", "header", res.data[0].date3);
          this.$refs.pgeSsw00001Grid.gridView.setColumnProperty("itemCnt4Column", "header", res.data[0].date4);
          this.$refs.pgeSsw00001Grid.gridView.setColumnProperty("itemCnt5Column", "header", res.data[0].date5);
          this.$refs.pgeSsw00001Grid.gridView.setColumnProperty("itemCnt6Column", "header", res.data[0].date6);
          this.$refs.pgeSsw00001Grid.gridView.setColumnProperty("itemCnt7Column", "header", res.data[0].date7);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    // Data 조회된 그리드 데이터 엑셀 다운로드
    excelDown() {
      if (this.$refs.pgeSsw00001Grid.getJsonRows().length == 0) {
        // 조회된 데이터가 없습니다.
        utils.messageBox("alert", this.$t("MSG_ALT_NO_SERACH_DATA"));
        return;
      }
      this.$refs.pgeSsw00001Grid.getExcelDownload(this.$t('MSG_TXT_SUB_STATUS_TIME_ZONE'), "PGE_SSW_00001");
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
