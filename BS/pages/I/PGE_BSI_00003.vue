<template>
  <sui-page class="custom_page">
    <!-- S::tab -->
    <template>
      <!-- S::컨텐츠1 -->
      <ur-form-box toggleable class="mt20">
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_ITEM_CD')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-text-field
            v-model="itemCd"
            maxlength="10"
            style="width: 100%; height: auto"
            :mask="inputMask"
            @keyup.enter="search"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="reset">{{ $t('MSG_BTN_RESET') }}</ur-button> <!-- 초기화 -->
          <ur-button @click="search">{{ $t('MSG_TXT_SRCH') }}</ur-button> <!-- 조회 -->
          <ur-button color="violet" @click="excelDown">{{ $t('MSG_TXT_EXCEL_DOWNLOAD') }}</ur-button> <!-- 엑셀다운로드 -->
        </div>
      </div>
      <!-- E::컨텐츠1-->
      <!-- S::컨텐츠2 -->
      <div class="comm_title_wrap mt25">
        <h4>{{ $t('MSG_TIT_BS11_MNG') }}</h4>
        <!--S:: 타이틀 오른쪽 total info -->
        <div class="right_box mt12">
          <div class="totalNo">
            <div class="totalCt">Total<span>{{ numberWithCommas(totalCnt) }}</span>{{ $t('MSG_TXT_CNT') }}</div>
            <!-- info: Total *건 -->
          </div>
        </div>
        <!--E:: 타이틀 오른쪽 total info -->
      </div>
      <real-grid
        ref="selectItemSaleListGrid"
        grid-id="selectItemSaleListGrid"
        grid-root="/lib"
        :gridFields="itemSaleFields"
        :gridColumns="itemSaleColumns"
        :gridRows="itemSaleDataList"
        :style="itemSaleStyle"
      />
      <!-- E::컨텐츠2-->
    </template>
    <!-- E::tab -->

    <sui-page-footer>
      <div class="comm_btn_wrap" />
    </sui-page-footer>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_BSI_00003",
  components: {}, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      itemCd: null,
      itemSaleDataList: [],
      itemSaleStyle: { height: "500px" },
      totalCnt: 0,
    };
  },
  computed: {
    // Input Mask 처리
    inputMask() {
      return '##########';
    },
  },
  watch: {},
  created() {
    // 인터페이스이력 조회관리 (권종할인가격)
    this.itemSaleFields = [
      { fieldName: "ifSeq", dataType: "text" },
      { fieldName: "conditionTypeCd", dataType: "text" },
      { fieldName: "condTable", dataType: "text" },
      { fieldName: "accsSeq", dataType: "text" },
      { fieldName: "saleOrg", dataType: "text" },
      { fieldName: "distChannelKind", dataType: "text" },
      { fieldName: "year", dataType: "text" },
      { fieldName: "condSeason", dataType: "text" },
      { fieldName: "rollout", dataType: "text" },
      { fieldName: "prodHirc", dataType: "text" },
      { fieldName: "custKind", dataType: "text" },
      { fieldName: "plant", dataType: "text" },
      { fieldName: "itemCd", dataType: "text" },
      { fieldName: "calcTypeCd", dataType: "text" },
      { fieldName: "dcAmt", dataType: "text" },
      { fieldName: "currency", dataType: "text" },
      { fieldName: "condPriceUnit", dataType: "text" },
      { fieldName: "condUnit", dataType: "text" },
      { fieldName: "validStartDate", dataType: "text" },
      { fieldName: "validEndDate", dataType: "text" },
      { fieldName: "updRule", dataType: "text" },
      { fieldName: "condTypeName", dataType: "text" },
      { fieldName: "fstRgstDtm", dataType: "text" },
      { fieldName: "fnlMdfcDtm", dataType: "text" },
    ];
    // 인터페이스이력 조회관리 (권종할인가격) Grid
    this.itemSaleColumns = [
      {
        // 순번
        name: "ifSeqColumn",
        fieldName: "ifSeq",
        width: 100,
        edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        header: {
          text: this.$t('MSG_TXT_SN'),
        },
      },
      {
        // 컨디션유형코드
        name: "conditionTypeCdColumn",
        fieldName: "conditionTypeCd",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CON_TYPE_CD'),
        },
      },
      {
        // 컨디션테이블
        name: "condTableColumn",
        fieldName: "condTable",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CON_TABLE'),
        },
      },
      {
        // 접근순번
        name: "accsSeqColumn",
        fieldName: "accsSeq",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_ACC_ORDER'),
        },
      },
      {
        // 회사코드
        name: "saleOrgColumn",
        fieldName: "saleOrg",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CPNY_CD'),
        },
      },
      {
        // 채널
        name: "distChannelKindColumn",
        fieldName: "distChannelKind",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CHANNEL'),
        },
      },
      {
        // 년도
        name: "yearColumn",
        fieldName: "year",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_DAY_YEAR'),
        },
      },
      {
        // 시즌
        name: "condSeasonColumn",
        fieldName: "condSeason",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_SEASON'),
        },
      },
      {
        // 롤아웃
        name: "rolloutColumn",
        fieldName: "rollout",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_ROLLOUT'),
        },
      },
      {
        // 상품계층도
        name: "prodHircColumn",
        fieldName: "prodHirc",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_PRODUCT_HIERARCHY'),
        },
      },
      {
        // 고객구분
        name: "custKindColumn",
        fieldName: "custKind",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CUSTOMER_CLASS'),
        },
      },
      {
        // PLANT
        name: "plantColumn",
        fieldName: "plant",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_PLANT'),
        },
      },
      {
        // 권종코드
        name: "itemCdColumn",
        fieldName: "itemCd",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_ITEM_CD'),
        },
      },
      {
        // 할인유형코드
        name: "calcTypeCdColumn",
        fieldName: "calcTypeCd",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_DISCOUNT_TYPE_CD'),
        },
      },
      {
        // 할인가격
        name: "dcAmtColumn",
        fieldName: "dcAmt",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_DISCOUNT_PRICE'),
        },
      },
      {
        // 화폐단위
        name: "currencyColumn",
        fieldName: "currency",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_MONETARY_UNIT'),
        },
      },
      {
        // 적용수량
        name: "condPriceUnitColumn",
        fieldName: "condPriceUnit",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_APP_AMOUNT'),
        },
      },
      {
        // 적용단위
        name: "condUnitColumn",
        fieldName: "condUnit",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_UNIT_OF_AP'),
        },
      },
      {
        // 유효시작일자
        name: "validStartDateColumn",
        fieldName: "validStartDate",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_EFFECT_START_DATE'),
        },
      },
      {
        // 유효종료일자
        name: "validEndDateColumn",
        fieldName: "validEndDate",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_EFFECT_END_DATE'),
        },
      },
      {
        // 적용상태
        name: "updRuleColumn",
        fieldName: "updRule",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_APP_STATUS'),
        },
      },
      {
        // 컨디션타입명
        name: "condTypeNameColumn",
        fieldName: "condTypeName",
        width: 120,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CON_TYPE_NM'),
        },
        renderer: {
          showTooltip: true, // 툴팁여부
        },
      },
      {
        // 최초등록일시
        name: "fstRgstDtmColumn",
        fieldName: "fstRgstDtm",
        width: 150,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_DATE_OF_FIRST_REG'),
        },
      },
      {
        // 최종등록일시
        name: "fnlMdfcDtmColumn",
        fieldName: "fnlMdfcDtm",
        width: 150,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_DATE_OF_LAST_REG'),
        },
      },
    ];
  },
  mounted() {
    this.itemCd = null;
  },
  methods: {
    // 초기화
    reset() {
      this.itemCd = null;
    },
    // 조회 파라미터
    getSearchParam() {
      const params = {
        itemCd: utils.trim(this.itemCd),
      };
      return params;
    },
    // 조회
    search() {
      const params = this.getSearchParam();
      http.request("PGE_BSI_00001", "DTS_BSI_00003", {
          query: params,
      }).then((res) => {
        if (res.data) {
          const resData = res.data;
          this.totalCnt = res.data.length;
          utils.map(resData, (data) => {
            data.dcAmt = _.isNull(data.dcAmt) ? data.dcAmt : utils.numberWithCommas(data.dcAmt);
            data.validStartDate = _.isNull(data.validStartDate) ? data.validStartDate : utils.toStringByFormat(utils.toDate(data.validStartDate), "YYYY-MM-DD");
            data.validEndDate = _.isNull(data.validEndDate) ? data.validEndDate : utils.toStringByFormat(utils.toDate(data.validEndDate), "YYYY-MM-DD");
            data.fstRgstDtm = _.isNull(data.fstRgstDtm) ? data.fstRgstDtm : utils.toStringByFormat(utils.toDate(data.fstRgstDtm), "YYYY-MM-DD HH:mm:ss");
            data.fnlMdfcDtm = _.isNull(data.fnlMdfcDtm) ? data.fnlMdfcDtm : utils.toStringByFormat(utils.toDate(data.fnlMdfcDtm), "YYYY-MM-DD HH:mm:ss");
          });
          this.itemSaleDataList = resData;
          if (this.itemSaleDataList.length == 0) {
            // 데이터가 존재하지 않습니다.
            utils.messageBox("alert", this.$t('MSG_ALT_NO_DATA'));
            // Grid 초기화
            this.itemSaleDataList = [];
            this.$refs.selectItemSaleListGrid.setRows(this.itemSaleDataList);
            this.totalCnt = this.$refs.selectItemSaleListGrid.getJsonRows().length;
            return;
          }
          this.$refs.selectItemSaleListGrid.setRows(this.itemSaleDataList);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    // Data 조회된 그리드 데이터 엑셀 다운로드
    excelDown() {
      if (this.$refs.selectItemSaleListGrid.getJsonRows().length == 0) {
        // 조회된 데이터가 없습니다.
        utils.messageBox("alert", this.$t("MSG_ALT_NO_SERACH_DATA"));
        return;
      }
      this.$refs.selectItemSaleListGrid.getExcelDownload(this.$t('MSG_TIT_IF_HISTORY_DIS_PRICE'), "PGE_BSI_00003");
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
