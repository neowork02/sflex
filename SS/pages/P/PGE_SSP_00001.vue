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
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_VALID_MEMBERS')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <div class="radioForm">
            <ur-radio v-model="valMem" value="01" sm>{{ $t('MSG_TXT_ALL') }}</ur-radio> <!-- 전체 -->
            <ur-radio v-model="valMem" value="02" sm>{{ $t('MSG_TXT_NORMAL') }}</ur-radio> <!-- 일반 -->
            <ur-radio v-model="valMem" value="03" sm>{{ $t('MSG_TXT_PRE_JOIN') }}</ur-radio> <!-- 선가입 -->
          </div>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap borTop"
          :label="$t('MSG_TXT_TICKET_ITEM_NM')"
          :labelAlign="'right'"
          style="width: 100%; height: auto"
        >
          <ur-text-field
            v-model="itemNm"
            maxlength="50"
            style="width: 42.3%"
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
      <!-- E::컨텐츠1:조회조건 -->
      <!-- S::컨텐츠2 -->
      <div class="comm_title_wrap mt25">
        <h4>{{ $t('MSG_TXT_STATUS_TICKET_TYPE') }}</h4>
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
        ref="pgeSsp00001Grid"
        grid-id="pgeSsp00001Grid"
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
  name: "PGE_SSP_00001", // eslint-disable-line vue/name-property-casing
  components: {},
  data() {
    return {
      today: utils.now("YYYY-MM-DD"),
      stndDt: null,
      itemNm: null,
      gridDataList: [],
      gridStyle: { height: "600px" },
      totalCnt: 0,
      valMem: "01",
    };
  },
  created() {
    this.gridFields = [
      { fieldName: "itemNm", dataType: "text" },
      { fieldName: "char2Desc", dataType: "text" },
      { fieldName: "ticketNo", dataType: "number" },
    ];
    this.gridColumns = [
      {
        // 권종명
        name: "itemNmColumn",
        fieldName: "itemNm",
        width: 100,
        edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        header: {
          text: this.$t('MSG_TXT_TICKET_ITEM_NM'),
        },
        // Grid 맨 하위 합계 표시
        footer: {
          // 계
          text: this.$t('MSG_TXT_TOTAL'),
          styleName: "align-center"
        }
      },
      {
        // 구분(대/소)
        name: "char2DescColumn",
        fieldName: "char2Desc",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CLASS'),
        },
      },
      {
        // 유효회원수
        name: "ticketNoColumn",
        fieldName: "ticketNo",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_ACTIVE_MEMBER'),
        },
        // 유효회원수 합계
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
    this.itemNm = null;
    this.valMem = "01";
  },
  methods: {
    // 현재날짜로 초기화
    init() {
      this.stndDt = this.today;
      this.itemNm = null;
      this.valMem = "01";
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
        itemNm: utils.trim(this.itemNm),
        valMem: this.valMem,
      };
      return params;
    },
    // 조회
    search() {
      const params = this.getSearchParam();
      http.request(this.$options.name, "DTS_SSP_00001", {
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
            this.$refs.pgeSsp00001Grid.setRows(this.gridDataList);
            this.totalCnt = this.$refs.pgeSsp00001Grid.getJsonRows().length;
            return;
          }
          this.$refs.pgeSsp00001Grid.setRows(this.gridDataList);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    // Data 조회된 그리드 데이터 엑셀 다운로드
    excelDown() {
      if (this.$refs.pgeSsp00001Grid.getJsonRows().length == 0) {
        // 조회된 데이터가 없습니다.
        utils.messageBox("alert", this.$t("MSG_ALT_NO_SERACH_DATA"));
        return;
      }
      this.$refs.pgeSsp00001Grid.getExcelDownload(this.$t('MSG_TXT_STATUS_TICKET_TYPE'), "PGE_SSP_00001");
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