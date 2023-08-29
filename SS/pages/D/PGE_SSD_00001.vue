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
          <ur-button @click="init">{{ $t('MSG_BTN_RESET') }}</ur-button> <!-- 초기화 -->
          <ur-button v-permission:read="this.$options.name" @click="searchValid">{{ $t('MSG_TXT_SRCH') }}</ur-button> <!-- 조회 -->
          <ur-button v-permission:excel="this.$options.name" color="violet" @click="excelDown">{{ $t('MSG_TXT_EXCEL_DOWNLOAD') }}</ur-button> <!-- 엑셀다운로드 -->
        </div>
      </div>
      <!-- E::컨텐츠1:조회조건 -->
      <!-- S::tab -->
      <ur-tab-box ref="ssd01Tab" class="mt35" @tab-change="onChangeTab">
        <ur-tab-content :idx="0" :label="$t('MSG_TXT_BY_DATE')"/> <!-- 일별 -->
        <ur-tab-content :idx="1" :label="$t('MSG_TIT_SS06_MNG')"/> <!-- 권종별 -->
      </ur-tab-box>
      <template>
        <div class="comm_title_wrap mt10"> <!-- 일별 : 권종별 -->
          <h4>{{ currentIdx === 0 ? this.$t('MSG_TXT_BY_DATE') : this.$t('MSG_TIT_SS06_MNG')}}</h4>
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
          ref="pgeSsd00001Grid"
          grid-id="pgeSsd00001Grid"
          grid-root="/lib"
          :gridFields="gridFields[tabNo]"
          :gridColumns="gridColumns[tabNo]"
          :gridRows="gridDataList"
          :gridFooter="true"
          :style="gridStyle"
        />
      </template>
      <!-- E::tab -->

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

const DS_MAP = ["DTS_SSD_00001", "DTS_SSD_00002"]

export default {
  name: "PGE_SSD_00001",
  components: {}, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      fToday: utils.now("YYYY-01-01"),
      today: utils.now("YYYY-MM-DD"),
      dateValue: [],
      startDt: null,  // 조회기간(From)
      endDt: null,    // 조회기간(To)
      gridDataList: [],
      gridStyle: { height: "550px" },
      totalCnt: 0,
      currentIdx: 0,
      gridFields: [
        [
          { fieldName: "ymd", dataType: "text", datetimeFormat: "yyyyMMdd" },
          { fieldName: "itemCnt1", dataType: "number" },
          { fieldName: "itemCnt2", dataType: "number" },
          { fieldName: "itemCnt3", dataType: "number" },
        ],
        [
          { fieldName: "ymd", dataType: "text", datetimeFormat: "yyyyMMdd" },
          { fieldName: "itemNm", dataType: "text" },
          { fieldName: "itemCnt1", dataType: "number" },
          { fieldName: "itemCnt2", dataType: "number" },
          { fieldName: "itemCnt3", dataType: "number" },
        ]
      ],
      // 일자별 신규/재가입 구성현황
      gridColumns: [
        [
          {
            // 일자
            name: "ymdColumn",
            fieldName: "ymd",
            width: 100,
            edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
            datetimeFormat: "yyyy-MM-dd",
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
            // 신규 가입인원
            name: "itemCnt1Column",
            fieldName: "itemCnt1",
            width: 100,
            numberFormat: "#,##0",
            edit: false,
            header: {
              text: this.$t('MSG_TXT_NEW_SUBSCRIBERS'),
            },
            // 신규 가입인원 합계
            footer: {
              expression: "sum",
              numberFormat: "#,##0"
            },
            styleName: "align-right"
          },
          {
            // 재가입인원
            name: "itemCnt2Column",
            fieldName: "itemCnt2",
            width: 100,
            numberFormat: "#,##0",
            edit: false,
            header: {
              text: this.$t('MSG_TXT_RE_ENROLLMENT'),
            },
            // 재가입인원 합계
            footer: {
              expression: "sum",
              numberFormat: "#,##0"
            },
            styleName: "align-right"
          },
          {
            // 총 가입인원
            name: "itemCnt3Column",
            fieldName: "itemCnt3",
            width: 100,
            numberFormat: "#,##0",
            edit: false,
            header: {
              text: this.$t('MSG_TXT_TOTAL_SUBSCRIBERS'),
            },
            // 총 가입인원 합계
            footer: {
              expression: "sum",
              numberFormat: "#,##0"
            },
            styleName: "align-right"
          },
        ],
        // 권종별 신규/재가입 구성현황
        [
          {
            // 일자
            name: "ymdColumn",
            fieldName: "ymd",
            width: 100,
            edit: false,
            datetimeFormat: "yyyy-MM-dd",
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
            // 신규 가입인원
            name: "itemCnt1Column",
            fieldName: "itemCnt1",
            width: 100,
            numberFormat: "#,##0",
            edit: false,
            header: {
              text: this.$t('MSG_TXT_NEW_SUBSCRIBERS'),
            },
            // 신규 가입인원 합계
            footer: {
              expression: "sum",
              numberFormat: "#,##0"
            },
            styleName: "align-right"
          },
          {
            // 재가입인원
            name: "itemCnt2Column",
            fieldName: "itemCnt2",
            width: 100,
            numberFormat: "#,##0",
            edit: false,
            header: {
              text: this.$t('MSG_TXT_RE_ENROLLMENT'),
            },
            // 재가입인원 합계
            footer: {
              expression: "sum",
              numberFormat: "#,##0"
            },
            styleName: "align-right"
          },
          {
            // 총 가입인원
            name: "itemCnt3Column",
            fieldName: "itemCnt3",
            width: 100,
            numberFormat: "#,##0",
            edit: false,
            header: {
              text: this.$t('MSG_TXT_TOTAL_SUBSCRIBERS'),
            },
            // 총 가입인원 합계
            footer: {
              expression: "sum",
              numberFormat: "#,##0"
            },
            styleName: "align-right"
          },
        ]
      ],
    };
  },
  created() {},
  computed: {
    tabNo() {
      return this.currentIdx
    },
  },
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
    // 일별, 권종별 탭이동에 따른 Grid Fields && columns 변경
    onChangeTab(idx) {
      this.currentIdx = idx
      this.$refs.pgeSsd00001Grid.dataProvider.setFields(this.gridFields[idx])
      this.$refs.pgeSsd00001Grid.gridView.setColumns(this.gridColumns[idx])
      this.totalCnt = this.$refs.pgeSsd00001Grid.getJsonRows().length;
    },
    // 조회 >> validation check
    searchValid() {
      if (this.startDt === "" || this.startDt === null || this.endDt === "" || this.endDt === null) {
        // 조회일자를 입력해주세요.
        utils.messageBox("alert", this.$t('MSG_ALT_INQUIRY_DATE'));
        return;
      }
      // tab index에 따른 조회
      if (this.currentIdx === 0) {
        this.search(DS_MAP[0]);
      } else if (this.currentIdx === 1) {
        this.search(DS_MAP[1]);
      }
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
    search(dsId) {
      const params = this.getSearchParam();
      http.request("PGE_SSD_00001", dsId, {
        query: params,
      }).then((res) => {
        this.gridDataList = []
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
            this.$refs.pgeSsd00001Grid.setRows(this.gridDataList);
            this.totalCnt = this.$refs.pgeSsd00001Grid.getJsonRows().length;
            return;
          }
        }
      }).catch((error) => {
        this.gridDataList = []
      }).finally(() => {
        this.$refs.pgeSsd00001Grid.setRows(this.gridDataList)
        if (this.currentIdx === 0) {
          this.$refs.pgeSsd00001Grid.gridView.columnByName("ymdColumn").editable = false;
          this.$refs.pgeSsd00001Grid.gridView.columnByName("itemCnt1Column").editable = false;
          this.$refs.pgeSsd00001Grid.gridView.columnByName("itemCnt2Column").editable = false;
          this.$refs.pgeSsd00001Grid.gridView.columnByName("itemCnt3Column").editable = false;
        } else {
          this.$refs.pgeSsd00001Grid.gridView.columnByName("ymdColumn").editable = false;
          this.$refs.pgeSsd00001Grid.gridView.columnByName("itemNmColumn").editable = false;
          this.$refs.pgeSsd00001Grid.gridView.columnByName("itemCnt1Column").editable = false;
          this.$refs.pgeSsd00001Grid.gridView.columnByName("itemCnt2Column").editable = false;
          this.$refs.pgeSsd00001Grid.gridView.columnByName("itemCnt3Column").editable = false;
        }
      })
    },
    // Data 조회된 그리드 데이터 엑셀 다운로드
    excelDown() {
      if (this.$refs.pgeSsd00001Grid.getJsonRows().length == 0) {
        // 조회된 데이터가 없습니다.
        utils.messageBox("alert", this.$t("MSG_ALT_NO_SERACH_DATA"));
        return;
      }
      let fileName = this.currentIdx === 0 ? this.$t('MSG_TXT_BY_DATE') : this.$t('MSG_TIT_SS06_MNG')
      this.$refs.pgeSsd00001Grid.getExcelDownload(fileName, "PGE_SSD_00001");
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
<style scoped>
::v-deep .ur-tab__content-wrapper {
  height: 0px;
}
</style>
