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
      <!-- S::컨텐츠2 -->
      <div class="comm_title_wrap mt25">
        <h4>{{ $t('MSG_TXT_MEMBERSHIP_COMP') }}</h4>
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
        ref="pgeSsj00001Grid"
        grid-id="pgeSsj00001Grid"
        grid-root="/lib"
        :gridFields="gridFields"
        :gridColumns="gridColumns"
        :gridRows="gridDataList"
        :gridFooter="true"
        :style="gridStyle"
        :gridRowGroupId="gridRowGroupId"
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
  name: "PGE_SSJ_00001", // eslint-disable-line vue/name-property-casing
  components: {},
  data() {
    return {
      fToday: utils.now("YYYY-01-01"),
      today: utils.now("YYYY-MM-DD"),
      dateValue: [],
      startDt: null, // 조회기간(From)
      endDt: null, // 조회기간(To)
      gridDataList: [],
      gridStyle: { height: "600px" },
      gridRowGroupId: ["memCnt"],
      totalCnt: 0,
    };
  },
  created() {
    this.gridFields = [
      { fieldName: "memCnt", dataType: "text" },
      { fieldName: "itemCnt1", dataType: "text" },
      { fieldName: "itemCnt2", dataType: "number" },
    ];
    this.gridColumns = [
      {
        // 인원
        name: "memCntColumn",
        fieldName: "memCnt",
        width: 100,
        edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        header: {
          text: this.$t('MSG_TXT_PERSONS'),
        },
        // 셀머지 옵션
        mergeRule: {
          criteria: "value",
        },
        // Grid 맨 하위 합계 표시
        footer: {
          // 합계
          text: this.$t('MSG_TXT_SUM'),
          styleName: "align-center"
        }
      },
      {
        // 인원 구성수
        name: "itemCnt1Column",
        fieldName: "itemCnt1",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_NUMBER_PERSON'),
        },
        // 인원 구성수 인원에 따른 합계 표시
        groupFooter: {
          text: this.$t('MSG_TXT_SUM'),
          styleName: "align-center"
        },
      },
      {
        // 인원수
        name: "itemCnt2Column",
        fieldName: "itemCnt2",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_PARSON_CNT'),
        },
        // 인원에 따른 인원수 합계
        groupFooter: {
          expression: "sum",
          numberFormat: "#,##0"
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
    this.dateValue = [this.fToday, this.today];
  },
  methods: {
    // 현재년도-01-01, 현재날짜로 초기화
    init() {
      this.dateValue = [this.fToday, this.today];
    },
    // 조회 >> validation check
    searchValid() {
      if (_.isEmpty(this.startDt) || _.isEmpty(this.endDt)) {
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
      http.request(this.$options.name, "DTS_SSJ_00001", {
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
            this.$refs.pgeSsj00001Grid.setRows(this.gridDataList);
            this.totalCnt = this.$refs.pgeSsj00001Grid.getJsonRows().length;
            return;
          }
          this.$refs.pgeSsj00001Grid.setRows(this.gridDataList);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    // Data 조회된 그리드 데이터 엑셀 다운로드
    excelDown() {
      if (this.$refs.pgeSsj00001Grid.getJsonRows().length == 0) {
        // 조회된 데이터가 없습니다.
        utils.messageBox("alert", this.$t("MSG_ALT_NO_SERACH_DATA"));
        return;
      }
      this.$refs.pgeSsj00001Grid.getExcelDownload(this.$t('MSG_TXT_MEMBERSHIP_COMP'), "PGE_SSJ_00001");
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
