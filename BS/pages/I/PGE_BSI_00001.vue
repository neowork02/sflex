<template>
  <sui-page class="custom_page">
    <sui-page-header2 :pageId="this.$options.name" />
    <sui-page-contents>
      <!-- S::tab -->
      <ur-tab-box ur-tab-box :default-idx="1" @tab-change="onChangeTab">
        <ur-tab-content :idx="1" :label="$t('MSG_TXT_PRIZE')">
          <template>
            <!-- S::컨텐츠1 -->
            <ur-form-box toggleable class="mt20">
              <ur-form-item
                class="flex_wrap"
                :label="$t('MSG_TXT_PRODUCT_CD')"
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
              <ur-form-item
                class="flex_wrap"
                :label="$t('MSG_TXT_PRDT_NM')"
                :labelAlign="'right'"
                style="width: 50%; height: auto"
              >
                <ur-text-field
                  v-model="posItemName"
                  maxlength="40"
                  style="width: 100%; height: auto"
                  @keyup="specialChar"
                  @keyup.enter="search"
                />
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
              <h4>{{ $t('MSG_TXT_PRIZE') }}</h4>
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
              ref="selectItemListGrid"
              grid-id="selectItemListGrid"
              grid-root="/lib"
              :gridFields="itemFields"
              :gridColumns="itemColumns"
              :gridRows="itemDataList"
              :style="itemStyle"
            />
            <!-- E::컨텐츠2-->
          </template>
        </ur-tab-content>
        <ur-tab-content :idx="2" :label="$t('MSG_TIT_BS10_MNG')">
          <bsi02 />
        </ur-tab-content>
        <ur-tab-content :idx="3" :label="$t('MSG_TIT_BS11_MNG')">
          <bsi03 />
        </ur-tab-content>
        <ur-tab-content :idx="4" :label="$t('MSG_TIT_BS12_MNG')">
          <bsi04 />
        </ur-tab-content>
      </ur-tab-box>
      <!-- E::tab -->
      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import bsi02 from "./PGE_BSI_00002";
import bsi03 from "./PGE_BSI_00003";
import bsi04 from "./PGE_BSI_00004";

export default {
  name: "PGE_BSI_00001",
  components: {
    bsi02,
    bsi03,
    bsi04,
  }, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      itemCd: null,
      posItemName: null,
      itemDataList: [],
      itemStyle: { height: "500px" },
      tabIdx: 1,
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
    // 인터페이스이력 조회관리 (상품)
    this.itemFields = [
      { fieldName: "itemCd", dataType: "text" },
      { fieldName: "posItemName", dataType: "text" },
      { fieldName: "posItemShtName", dataType: "text" },
      { fieldName: "posItemEngName", dataType: "text" },
      { fieldName: "parkKind", dataType: "text" },
      { fieldName: "itemKind", dataType: "text" },
      { fieldName: "enterValidCnt", dataType: "text" },
      { fieldName: "cls1Cd", dataType: "text" },
      { fieldName: "cls2Cd", dataType: "text" },
      { fieldName: "cls3Cd", dataType: "text" },
      { fieldName: "cls4Cd", dataType: "text" },
      { fieldName: "cls5Cd", dataType: "text" },
      { fieldName: "cls1Name", dataType: "text" },
      { fieldName: "cls2Name", dataType: "text" },
      { fieldName: "cls3Name", dataType: "text" },
      { fieldName: "cls4Name", dataType: "text" },
      { fieldName: "cls5Name", dataType: "text" },
      { fieldName: "unitPriceCdndTypeCd", dataType: "text" },
      { fieldName: "unitPriceAmt", dataType: "text" },
      { fieldName: "depositAmtCdt", dataType: "text" },
      { fieldName: "depositAmt", dataType: "text" },
      { fieldName: "vatKind", dataType: "text" },
      { fieldName: "useYn", dataType: "text" },
      { fieldName: "charProf", dataType: "text" },
      { fieldName: "char1Cd", dataType: "text" },
      { fieldName: "char1Desc", dataType: "text" },
      { fieldName: "char2Cd", dataType: "text" },
      { fieldName: "char2Desc", dataType: "text" },
      { fieldName: "ageKind", dataType: "text" },
      { fieldName: "purchaseTp", dataType: "text" },
      { fieldName: "memberDcKind", dataType: "text" },
      { fieldName: "deleteDt", dataType: "text" },
      { fieldName: "barcode", dataType: "text" },
      { fieldName: "articleKind", dataType: "text" },
      { fieldName: "pdaUseYn", dataType: "text" },
      { fieldName: "condTypeCd", dataType: "text" },
      { fieldName: "condTypeName", dataType: "text" },
      { fieldName: "condTbl", dataType: "text" },
      { fieldName: "accsSeq", dataType: "text" },
      { fieldName: "condYear", dataType: "text" },
      { fieldName: "condSeason", dataType: "text" },
      { fieldName: "condRollout", dataType: "text" },
      { fieldName: "validStartDate", dataType: "text" },
      { fieldName: "validEndDate", dataType: "text" },
      { fieldName: "usageKind", dataType: "text" },
      { fieldName: "tickKind", dataType: "text" },
      { fieldName: "singleTickKind", dataType: "text" },
      { fieldName: "dstrbKind", dataType: "text" },
      { fieldName: "manualPriceYn", dataType: "text" },
      { fieldName: "amtYn", dataType: "text" },
      { fieldName: "turnNoKind", dataType: "text" },
      { fieldName: "webSaleYn", dataType: "text" },
      { fieldName: "issueTypeCd", dataType: "text" },
      { fieldName: "joinKind", dataType: "text" },
      { fieldName: "yearlyKind", dataType: "text" },
      { fieldName: "itemDtlKind", dataType: "text" },
      { fieldName: "ilmoYn", dataType: "text" },
      { fieldName: "delYn", dataType: "text" },
      { fieldName: "fstRgstDtm", dataType: "text" },
      { fieldName: "fstRgstUsrId", dataType: "text" },
      { fieldName: "fstRgstPrgId", dataType: "text" },
      { fieldName: "fnlMdfcDtm", dataType: "text" },
      { fieldName: "fnlMdfcUsrId", dataType: "text" },
      { fieldName: "fnlMdfcPrgId", dataType: "text" },
    ];
    // 인터페이스이력 조회관리 (상품) Grid
    this.itemColumns = [
      {
        // 상품코드
        name: "itemCdColumn",
        fieldName: "itemCd",
        width: 100,
        edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        header: {
          text: this.$t('MSG_TXT_PRODUCT_CD'),
        },
      },
      {
        // POS상품명
        name: "posItemNameColumn",
        fieldName: "posItemName",
        width: 200,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_POS_PRODUCT_NM'),
        },
        renderer: {
          showTooltip: true, // 툴팁여부
        },
      },
      {
        // POS상품명(축약)
        name: "posItemShtNameColumn",
        fieldName: "posItemShtName",
        width: 200,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_POS_PRODUCT_NM_ABB'),
        },
        renderer: {
          showTooltip: true,
        },
      },
      {
        // POS상품명(영문)
        name: "posItemEngNameColumn",
        fieldName: "posItemEngName",
        width: 200,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_POS_PRODUCT_NM_ENG'),
        },
        renderer: {
          showTooltip: true,
        },
      },
      {
        // 파크구분
        name: "parkKindColumn",
        fieldName: "parkKind",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_PARK_KIND'),
        },
      },
      {
        // 상품구분
        name: "itemKindColumn",
        fieldName: "itemKind",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_PRODUCT_CLASS'),
        },
      },
      {
        // 입장객반영인원수
        name: "enterValidCntColumn",
        fieldName: "enterValidCnt",
        width: 110,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_NO_VISIT_REFLECT'),
        },
      },
      {
        // 태분류코드
        name: "cls1CdColumn",
        fieldName: "cls1Cd",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CLASS_CD'),
        },
      },
      {
        // 대분류코드
        name: "cls2CdColumn",
        fieldName: "cls2Cd",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_MAJOR_CLASS_CD'),
        },
      },
      {
        // 중분류코드
        name: "cls3CdColumn",
        fieldName: "cls3Cd",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_MID_CLASS_CD'),
        },
      },
      {
        // 소분류코드
        name: "cls4CdColumn",
        fieldName: "cls4Cd",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_SUB_CLASS_CD'),
        },
      },
      {
        // 세분류코드
        name: "cls5CdColumn",
        fieldName: "cls5Cd",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CLASSIFIC_CD'),
        },
      },
      {
        // 태분류명
        name: "cls1NameColumn",
        fieldName: "cls1Name",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_GROUP_NM'),
        },
      },
      {
        // 대분류명
        name: "cls2NameColumn",
        fieldName: "cls2Name",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_MAJOR_TAX'),
        },
      },
      {
        // 중분류명
        name: "cls3NameColumn",
        fieldName: "cls3Name",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_MID_CLASS_NM'),
        },
      },
      {
        // 소분류명
        name: "cls4NameColumn",
        fieldName: "cls4Name",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_SUB_CATEGORY'),
        },
      },
      {
        // 세분류명
        name: "cls5NameColumn",
        fieldName: "cls5Name",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CLASS_NM'),
        },
      },
      {
        // 기준판가 컨디션타입코드
        name: "unitPriceCdndTypeCdColumn",
        fieldName: "unitPriceCdndTypeCd",
        width: 150,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_STAND_COND_TYPE_CD'),
        },
      },
      {
        // 기준판가금액
        name: "unitPriceAmtColumn",
        fieldName: "unitPriceAmt",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_STAND_SELL_PRICE'),
        },
      },
      {
        // 보증급 컨디션타입
        name: "depositAmtCdtColumn",
        fieldName: "depositAmtCdt",
        width: 110,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_GRADE_COND_TYPE'),
        },
      },
      {
        // 보증금
        name: "depositAmtColumn",
        fieldName: "depositAmt",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_DEPOSIT'),
        },
      },
      {
        // 면과세구분
        name: "vatKindColumn",
        fieldName: "vatKind",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_NON_TAX_CLASS'),
        },
      },
      {
        // 사용여부
        name: "useYnColumn",
        fieldName: "useYn",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_DTST_USE_YN'),
        },
      },
      {
        // CHAR_PROF
        name: "charProfColumn",
        fieldName: "charProf",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CHAR_PROF'),
        },
      },
      {
        // CHAR1코드
        name: "char1CdColumn",
        fieldName: "char1Cd",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CHAR1_CODE'),
        },
      },
      {
        // CHAR1내용
        name: "char1DescColumn",
        fieldName: "char1Desc",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CHAR1_CONT'),
        },
      },
      {
        // CHAR2코드
        name: "char2CdColumn",
        fieldName: "char2Cd",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CHAR2_CODE'),
        },
      },
      {
        // CHAR2내용
        name: "char2DescColumn",
        fieldName: "char2Desc",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CHAR2_CONT'),
        },
      },
      {
        // 연령구분
        name: "ageKindColumn",
        fieldName: "ageKind",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_AGE_GROUP'),
        },
      },
      {
        // 구매형태
        name: "purchaseTpColumn",
        fieldName: "purchaseTp",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_PURCH_TYPE'),
        },
      },
      {
        // 회원할인구분
        name: "memberDcKindColumn",
        fieldName: "memberDcKind",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CLASS_MEM_DISCOUNT'),
        },
      },
      {
        // 단종일자
        name: "deleteDtColumn",
        fieldName: "deleteDt",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_DISCONTI_DATE'),
        },
      },
      {
        // 상품바코드
        name: "barcodeColumn",
        fieldName: "barcode",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_PRODUCT_BARCODE'),
        },
      },
      {
        // 아이템구분
        name: "articleKindColumn",
        fieldName: "articleKind",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CLASS_OF_ITEM'),
        },
      },
      {
        // 가판사용여부
        name: "pdaUseYnColumn",
        fieldName: "pdaUseYn",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_USE_KIOSK'),
        },
      },
      {
        // 컨디션유형코드
        name: "condTypeCdColumn",
        fieldName: "condTypeCd",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CON_TYPE_CD'),
        },
      },
      {
        // 컨디션유형명
        name: "condTypeNameColumn",
        fieldName: "condTypeName",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CONDITION_TYPE_NM'),
        },
      },
      {
        // 컨디션테이블
        name: "condTblColumn",
        fieldName: "condTbl",
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
        // 년도
        name: "condYearColumn",
        fieldName: "condYear",
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
        // 롤아웃_서브시즌
        name: "condRolloutColumn",
        fieldName: "condRollout",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_ROLLOUT_SUBSEASON'),
        },
      },
      {
        // 적용시작일
        name: "validStartDateColumn",
        fieldName: "validStartDate",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_APP_START_DATE'),
        },
      },
      {
        // 적용종료일
        name: "validEndDateColumn",
        fieldName: "validEndDate",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_APP_END_DATE'),
        },
      },
      {
        // 이용구분
        name: "usageKindColumn",
        fieldName: "usageKind",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CLASS_OF_USE'),
        },
      },
      {
        // 티켓유형
        name: "tickKindColumn",
        fieldName: "tickKind",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TICKET_TYPE'),
        },
      },
      {
        // 낱장발권여부
        name: "singleTickKindColumn",
        fieldName: "singleTickKind",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_SINGLE_TICKET_ISSU'),
        },
      },
      {
        // 배부구분
        name: "dstrbKindColumn",
        fieldName: "dstrbKind",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_DIV_OF_STOMACH'),
        },
      },
      {
        // MANUAL가격여부
        name: "manualPriceYnColumn",
        fieldName: "manualPriceYn",
        width: 110,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_MAMUAL_PRICE'),
        },
      },
      {
        // 금액여부
        name: "amtYnColumn",
        fieldName: "amtYn",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_AMOUNT'),
        },
      },
      {
        // 횟수사용구분
        name: "turnNoKindColumn",
        fieldName: "turnNoKind",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CLASS_FREQ_USE'),
        },
      },
      {
        // WEB판매여부
        name: "webSaleYnColumn",
        fieldName: "webSaleYn",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_WEB_SAL_STATUS'),
        },
      },
      {
        // 프린팅유형코드
        name: "issueTypeCdColumn",
        fieldName: "issueTypeCd",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_PRINT_TYPE_CD'),
        },
      },
      {
        // 신규/재가입구분
        name: "joinKindColumn",
        fieldName: "joinKind",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CLASS_NEW_RE_REG'),
        },
      },
      {
        // 연차구분
        name: "yearlyKindColumn",
        fieldName: "yearlyKind",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CLASS_ANNUAL_LEAVE'),
        },
      },
      {
        // 권종세부구분
        name: "itemDtlKindColumn",
        fieldName: "itemDtlKind",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_SUB_RIGHT'),
        },
      },
      {
        // 일모여부
        name: "ilmoYnColumn",
        fieldName: "ilmoYn",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_ILMO'),
        },
      },
      {
        // 삭제여부
        name: "delYnColumn",
        fieldName: "delYn",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_DELELE_YN'),
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
        // 최초등록사용자ID
        name: "fstRgstUsrIdColumn",
        fieldName: "fstRgstUsrId",
        width: 110,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_FST_REG_USERID'),
        },
      },
      {
        // 최초등록프로그램ID
        name: "fstRgstPrgIdColumn",
        fieldName: "fstRgstPrgId",
        width: 120,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_REG_PRGID'),
        },
      },
      {
        // 최종수정일시
        name: "fnlMdfcDtmColumn",
        fieldName: "fnlMdfcDtm",
        width: 150,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_DATE_OF_LAST_MOD'),
        },
      },
      {
        // 최종수정사용자ID
        name: "fnlMdfcUsrIdColumn",
        fieldName: "fnlMdfcUsrId",
        width: 110,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_FNL_MDF_USERID'),
        },
      },
      {
        // 최종등록프로그램ID
        name: "fnlMdfcPrgIdColumn",
        fieldName: "fnlMdfcPrgId",
        width: 120,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_FNL_REG_PRGID'),
        },
      },
    ];
  },
  mounted() {
    this.itemCd = null;
    this.posItemName = null;
  },
  methods: {
    // Tab 이동 이벤트
    onChangeTab() {
      this.reset();
      this.itemDataList = [];
      this.$refs.selectItemListGrid.setRows(this.itemDataList);
      this.totalCnt = this.$refs.selectItemListGrid.getJsonRows().length;
    },
    // 초기화
    reset() {
      this.itemCd = null;
      this.posItemName = null;
    },
    // 조회 파라미터
    getSearchParam() {
      const params = {
        itemCd: utils.trim(this.itemCd),
        posItemName: utils.trim(this.posItemName),
      };
      return params;
    },
    // 조회
    search() {
      const params = this.getSearchParam();
      http.request(this.$options.name, "DTS_BSI_00001", {
          query: params,
      }).then((res) => {
        if (res.data) {
          const resData = res.data;
          this.totalCnt = res.data.length;
          utils.map(resData, (data) => {
            data.unitPriceAmt = _.isNull(data.unitPriceAmt) ? data.unitPriceAmt : utils.numberWithCommas(data.unitPriceAmt);
            data.validStartDate = _.isNull(data.validStartDate) ? data.validStartDate : utils.toStringByFormat(utils.toDate(data.validStartDate), "YYYY-MM-DD");
            data.validEndDate = _.isNull(data.validEndDate) ? data.validEndDate : utils.toStringByFormat(utils.toDate(data.validEndDate), "YYYY-MM-DD");
            data.fstRgstDtm = _.isNull(data.fstRgstDtm) ? data.fstRgstDtm : utils.toStringByFormat(utils.toDate(data.fstRgstDtm), "YYYY-MM-DD HH:mm:ss");
            data.fnlMdfcDtm = _.isNull(data.fnlMdfcDtm) ? data.fnlMdfcDtm : utils.toStringByFormat(utils.toDate(data.fnlMdfcDtm), "YYYY-MM-DD HH:mm:ss");
          });
          this.itemDataList = resData;
          if (this.itemDataList.length == 0) {
            // 데이터가 존재하지 않습니다.
            utils.messageBox("alert", this.$t('MSG_ALT_NO_DATA'));
            // Grid 초기화
            this.itemDataList = [];
            this.$refs.selectItemListGrid.setRows(this.itemDataList);
            this.totalCnt = this.$refs.selectItemListGrid.getJsonRows().length;
            return;
          }
          this.$refs.selectItemListGrid.setRows(this.itemDataList);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    // Data 조회된 그리드 데이터 엑셀 다운로드
    excelDown() {
      if (this.$refs.selectItemListGrid.getJsonRows().length == 0) {
        // 조회된 데이터가 없습니다.
        utils.messageBox("alert", this.$t("MSG_ALT_NO_SERACH_DATA"));
        return;
      }
      this.$refs.selectItemListGrid.getExcelDownload(this.$t('MSG_TIT_IF_HISTORY_PRODUCT'), "PGE_BSI_00001");
    },
    // 특수문자 체크
    specialChar() {
      const searchNewText = utils.trim(this.posItemName);
      if (utils.isExistSpecialChar(searchNewText)) {
        // `-_{}[];:<>/? 제외 특수문자는 입력할 수 없습니다.
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.posItemName = ''
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
