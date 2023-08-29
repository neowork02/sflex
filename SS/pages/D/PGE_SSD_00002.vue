<template>
  <sui-page class="custom_page">
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <!-- S::컨텐츠1:조회조건 -->
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="조회일자"
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
          <ur-button @click="init">초기화</ur-button>
          <ur-button @click="searchValid">조회</ur-button>
          <ur-button color="violet" @click="excelDown">엑셀다운로드</ur-button>
        </div>
      </div>
      <!-- E::컨텐츠1:조회조건 -->
      <!-- S::tab -->
      <template>
        <div class="comm_title_wrap mt10">
          <h4>권종별</h4>
          <!--S:: 타이틀 오른쪽 total info -->
          <div class="right_box">
            <div class="totalNo">
              <div class="totalCt">Total<span>{{ this.gridDataList.length }}</span>건</div>
              <!-- info: Total *건 -->
            </div>
          </div>
          <!--E:: 타이틀 오른쪽 total info -->
        </div>
        <real-grid
          ref="pgeSsd00002Grid"
          grid-id="pgeSsd00002Grid"
          grid-root="/lib"
          :gridFields="gridFields"
          :gridColumns="gridColumns"
          :gridRows="gridDataList"
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
export default {
  name: "PGE_SSD_00002",
  components: {}, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      fToday: utils.now("YYYY-01-01"),
      today: utils.now("YYYY-MM-DD"),
      dateValue: [],
      srchFromDt: null, // 조회기간(From)
      srchToDt: null, // 조회기간(To)
      gridDataList: [],
      gridStyle: { height: "600px" },
    };
  },
  created() {
    this.gridFields = [
      { fieldName: "ymd", dataType: "text", datetimeFormat: "yyyyMMdd" },
      { fieldName: "itemNm", dataType: "text" },
      { fieldName: "itemCnt1", dataType: "number" },
      { fieldName: "itemCnt2", dataType: "number" },
      { fieldName: "itemCnt3", dataType: "number" },
    ];
    this.gridColumns = [
      {
        name: "ymdColumn",
        fieldName: "ymd",
        width: 100,
        edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        datetimeFormat: "yyyy-MM-dd",
        header: {
          text: "일자",
        },
        footer: {
          text: "합계",
          styleName: "align-center"
        }
      },
      {
        name: "itemNmColumn",
        fieldName: "itemNm",
        width: 100,
        edit: false,
        header: {
          text: "권종명",
        },
      },
      {
        name: "itemCnt1Column",
        fieldName: "itemCnt1",
        width: 100,
        edit: false,
        header: {
          text: "신규 가입인원",
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        name: "itemCnt2Column",
        fieldName: "itemCnt2",
        width: 100,
        edit: false,
        header: {
          text: "재가입인원",
        },
        footer: {
          expression: "sum",
          numberFormat: "#,##0"
        },
        styleName: "align-right"
      },
      {
        name: "itemCnt3Column",
        fieldName: "itemCnt3",
        width: 100,
        edit: false,
        header: {
          text: "총 가입인원",
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
    init() {
      this.dateValue = [this.fToday, this.today];
    },
    searchValid() {
      if (this.startDt === "" || this.startDt === null || this.endDt === "" || this.endDt === null) {
        utils.messageBox("alert", "조회일자를 입력해주세요.");
        return;
      }
      this.search();
    },
    getSearchParam() {
      const params = {
        startDt: this.startDt.replace(/-/g, ""),
        endDt: this.endDt.replace(/-/g, ""),
      };
      return params;
    },
    search() {
      const params = this.getSearchParam();
      http.request(this.$options.name, "DTS_SSD_00002", {
        query: params,
      }).then((res) => {
        if (res.data) {
          const resData = res.data;
          utils.map(resData, (data) => {
            data.ymd = _.isNull(data.ymd)
              ? data.ymd
              : utils.toStringByFormat(utils.toDate(data.ymd), "YYYY-MM-DD");
          });
          this.gridDataList = resData;
          if (this.gridDataList.length == 0) {
            utils.messageBox("alert", "데이터가 존재하지 않습니다.");
            return;
          }
          this.$refs.pgeSsd00002Grid.setRows(this.gridDataList);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    excelDown() {
      if (this.$refs.pgeSsd00002Grid.getJsonRows().length == 0) {
        // 조회된 데이터가 없습니다.
        utils.messageBox("alert", this.$t("MSG_ALT_NO_SERACH_DATA"));
        return;
      }
      this.$refs.pgeSsd00002Grid.getExcelDownload("(권종별) 가입인원구성현황");
    },
  },
};
</script>
<style scoped></style>