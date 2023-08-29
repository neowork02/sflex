<template>
  <sui-page class="custom_page">
    <div class="modalWrap" style="height: auto">
      <!-- <div class="modalWrap" style="height: auto"> -->
      <template slot="title">
        <div class="modal-title mb45">{{ $t('MSG_TIT_JN02_MNG') }}</div>
      </template>
      <template>
        <!-- <sui-page class="custom_page"> -->
        <div class="modal-body">
          <!-- ::S 컨텐츠1 -->
          <ur-form-box>
            <ur-form-item
              class="flex_wrap"
              label="결제자"
              :labelAlign="'right'"
              style="width: 100%; height: auto"
              >{{ payerMemberName }}</ur-form-item
            >
          </ur-form-box>
          <!-- ::E 컨텐츠1 -->

          <!-- S::컨텐츠2 -->
          <div class="comm_title_wrap mt30">
            <h4 class="pr10">{{ $t('MSG_TXT_COM_PASS_INFO') }}</h4>
          </div>
          <real-grid
            ref="grdMember"
            grid-id="PGE_JNR_0002_MEMBER"
            grid-root="/lib"
            :gridFields="memberGrdFields"
            :gridColumns="memberGrdColumns"
            :gridRows="[]"
            :gridInit="false"
            :gridMounted="memberGridMounted"
            :style="{ height: '170px' }"
          />

          <!-- ::E 컨텐츠2 -->
          <!-- S::컨텐츠3 -->
          <div class="comm_shut_wrap">
            <div class="inbox3">
              <div class="comm_title_wrap mt30">
                <h4 class="pr10">{{ $t('MSG_TXT_PAYMENT_KIND') }}</h4>
              </div>

              <div class="board_list">
                <table>
                  <caption></caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="auto" />
                    <col width="10%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th class="center">{{ $t('MSG_TXT_AMOUNT_TOT') }}</th>
                      <td class="right_cost">{{ totSaleAmt | moneyPoint }}</td>
                      <td>원</td>
                    </tr>

                    <tr>
                      <th class="center">{{ $t('MSG_TXT_AMOUNT_NOTPAY') }}</th>
                      <td class="right_cost">{{ notPay | moneyPoint }}</td>
                      <td>원</td>
                    </tr>
                    <tr>
                      <th class="center">
                        <ur-button sm @click="payCash" :disabled="disabledPayCash">{{ $t('MSG_TXT_CASH') }}</ur-button>
                      </th>
                      <td class="right_cost">
                        <ur-text-field
                          v-model="tempCashPay"
                          ref="cashPay"
                          mask="number"
                          @blur="blurCashPay"
                          @keyup.enter="blurCashPay"
                          maxlength="12"
                          :readonly="disabledPayCash"
                          style="width: 100%; height: auto"
                        />
                      </td>
                      <td>원</td>
                    </tr>
                    <tr>
                      <th class="center">
                        <ur-button sm @click="openPopupCard" :disabled="disabledPayCard">{{ $t('MSG_TXT_CARD') }}</ur-button>
                      </th>
                      <td class="right_cost">{{ cardPay | moneyPoint }}</td>
                      <td>원</td>
                    </tr>
                    <tr>
                      <th class="center">
                        <ur-button sm @click="openModalPayGift" :disabled="disabledPayGiftcard">{{ $t('MSG_TXT_GIFT_CARD') }}</ur-button>
                      </th>
                      <td class="right_cost">{{ giftcardPay | moneyPoint }}</td>
                      <td>원</td>
                    </tr>
                    <tr>
                      <th class="center">
                        <ur-button sm @click="openModalPayMobileGift" :disabled="disabledPayMobilegiftcard">{{ $t('MSG_TXT_MOBILE_GIFT_CARD') }}</ur-button>
                      </th>
                      <td class="right_cost">
                        {{ mobilegiftPay | moneyPoint }}
                      </td>
                      <td>원</td>
                    </tr>
                    <tr>
                      <th class="center">
                        <ur-button sm @click="openModalPayPoint" :disabled="disabledPayPoint">{{ $t('MSG_TXT_MEMSHP_POINT') }}</ur-button>
                      </th>
                      <td class="right_cost">{{ pointPay | moneyPoint }}</td>
                      <td>원</td>
                    </tr>
                    <tr>
                      <th class="center">
                        <ur-button sm @click="openModalPayCredit" :disabled="disabledPayCredit">{{ $t('MSG_TXT_CREDIT2') }}</ur-button>
                      </th>
                      <td class="right_cost">{{ creditPay | moneyPoint }}</td>
                      <td>원</td>
                    </tr>
                    <tr>
                      <th class="center">{{ $t('MSG_TXT_PRE_ISSUED_TICKET') }}</th>
                      <td class="right_cost">{{ preIssuePay | moneyPoint }}</td>
                      <td>원</td>
                    </tr>
                    <tr>
                      <th class="center">
                        <ur-button sm @click="payCashTicket" :disabled="disabledPayCachticket">{{ $t('MSG_TXT_HANDWRITTEN_TICKET') }}</ur-button>
                      </th>
                      <td class="right_cost">
                        <ur-text-field
                          v-model="tempCashTicketPay"
                          ref="cashTicketPay"
                          mask="number"
                          @blur="blurCashTicketPay"
                          @keyup.enter="blurCashTicketPay"
                          :readonly="disabledPayCachticket"
                          maxlength="12"
                          style="width: 100%; height: auto"
                        />
                      </td>
                      <td>원</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="btn_wrap mt10">
                <div class="right_box">
                  <ur-button color="violet" @click="openModalSearchCheck">{{ $t('MSG_BTN_CHECK_SEARCH') }}</ur-button>
                  <ur-button color="violet" @click="clickBtnFinish" class="emp">{{ $t('MSG_BTN_CPLT') }}</ur-button>
                </div>
              </div>
            </div>
            <div class="emptybox" />
            <div class="inbox7">
              <div class="comm_title_wrap mt30">
                <h4 class="pr10">{{ $t('MSG_TXT_CARD_PAY_LIST') }}</h4>
              </div>
              <real-grid
                ref="grdCard"
                grid-id="PGE_JNR_0002_CARD"
                grid-root="/lib"
                :gridFields="cardGrdFields"
                :gridColumns="cardGrdColumns"
                :gridRows="[]"
                :gridInit="false"
                :gridMounted="cardGridMounted"
                :style="{ height: '125px' }"
              />
              <div class="comm_title_wrap mt10">
                <h4 class="pr10">{{ $t('MSG_TXT_GIFT_CARD_PAY_LIST') }}</h4>
              </div>
              <real-grid
                ref="grdGift"
                grid-id="PGE_JNR_0002_GIFT"
                grid-root="/lib"
                :gridFields="giftGrdFields"
                :gridColumns="giftGrdColumns"
                :gridRows="[]"
                :gridInit="false"
                :gridCheckBar="{ visible: false }"
                :gridMounted="giftGridMounted"
                :style="{ height: '125px' }"
              />
              <div class="comm_title_wrap mt10">
                <h4 class="pr10">{{ $t('MSG_TXT_MOBILE_GIFT_CARD_PAY_LIST') }}</h4>
              </div>
              <real-grid
                ref="grdMobile"
                grid-id="PGE_JNR_0002_MOBILE"
                grid-root="/lib"
                :gridFields="mobileGrdFields"
                :gridColumns="mobileGrdColumns"
                :gridRows="[]"
                :gridInit="false"
                :gridCheckBar="{ visible: false }"
                :gridMounted="mobileGridMounted"
                :style="{ height: '125px' }"
              />
            </div>
          </div>
          <!-- ::E 컨텐츠3 -->
        </div>
        <div class="btn_wrap mt10">
          <div class="right_box">
            <ur-button color="violet" @click="closePopup('ING')">{{ $t('MSG_BTN_SEL_ITEM') }}</ur-button>
            <ur-button color="violet" @click="closePopup">{{ $t('MSG_BTN_POP_CLOSE') }}</ur-button>
          </div>
        </div>
        <!-- </sui-page> -->
      </template>
      <!-- </div> -->
    </div>
    <!-- ::E 팝업-->
    <!-- ::S 카드결제 정보 있음 경고 팝업 -->
    <ur-modal ref="modalCardPayExistAlert" class="modal-b1c6 compact" small title="" @closed="closedCardPayExistAlert">
        <template>
            <div class="modal-body">
                <!-- ::S 콘텐츠1 -->
                <div class="sui-confirm sui-messagebox__confirm" style="width: auto">
                    <div class="sui-messagebox__icon-area"></div>
                    <div class="sui-messagebox__message-area">{{ cfgCmpSystemTitle }}</div>
                    <div class="sui-messagebox__sub-message-wrapper sui-messagebox__message--center">
                        <div class="sui-messagebox__sub-message">
                            <span class="emp">
                                {{ cardPayExistAlertMsg }}
                            </span>
                        </div>
                    </div>
                    <div class="sui-messagebox__button-area">
                        <button type="button" @click="clickCloseCardPayExistAlert" class="sui-messagebox__button--negative large">팝업종료</button>
                    </div>
                </div>
                <!-- ::E 콘텐츠1 -->
            </div>
        </template>
    </ur-modal>
    <!-- ::E 카드결제 정보 있음 경고 팝업-->  
  </sui-page>
</template>

<script>
import PosPrint from "~common/js/PosPrint/pos-print.js";
import CardPopupUtils from "~common/js/card-popup-utils.js";
import WebrtcDatachannel from "~common/js/webrtc-datachannel.js";

export default {
  name: "PGE_JNR_00002", // eslint-disable-line vue/name-property-casing
  components: {},
  props: {
    pageInitialData: {
      type: Object,
      default: () => {},
    },
    closePagePopup: {
      type: Function,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      isLogging: true, // console log 남기는지 여부

      icReaderUseYn: 'N', // IC Reader 사용 여부

      isElectReceiptIssueApply : true, //전자영수증 발행 여부 적용 여부

      receiptIssueYn : "Y", //POS  영수증 출력 여부

      isPaySave: false, //지불 저장여부
      parkKind: "", //. 파크구분
      paymntDate: "", // 지불일자
      posId: "", // POS ID
      posNm: "", // POS Name
      receiptNo: "", //영수증 번호
      payerMemberName: "", //결제자 명
      payerMemshpUid: "", //결제자 UID
      payerMemberKind: "", //결제자 회원구분
      totSaleAmt: 0, // 총 금액
      totNetAmt: 0, // 총 순매출액(부가세제외)
      totTaxAmt: 0, // 총 부가세액
      totPay: 0, // 지불 금액
      notPay: 0, // 미결제 금액
      cashPay: 0, // 현금 결제 금액
      tempCashPay: "0", //화면에 입력하는 현금 결제 금액
      cardPay: 0, // 카드 결제 금액
      giftcardPay: 0, // 상품권 결제 금액
      mobilegiftPay: 0, // 기프트카드 결제 금액
      pointPay: 0, //멤버십포인트 금액
      creditPay: 0, //외상결제 금액
      preIssuePay: 0, // 선발행결제 금액
      ilmoPay: 0, // 일모포인트 할인 금액
      cashTicketPay: 0, // 티켓(수기) 금액
      tempCashTicketPay: 0, // 화면에 입력하는 티켓(수기) 금액
      isCashReceipt: false, // 현금영수증 여부
      totCash: 0, //현금 총 금액
      itemNms: "", // 상품명
      orgItemNms: "", // 권종명
      payMemberList: [
        //sample
        /*
        {
          memshpUid: "2022153567", name: "김사육", memberKind: "2", birthDate: "19880406", mobileTel: "01011111113", payerYn: "N",
          joinDcnt: 1095, jonYcnt: 3, joinCnt: 3, ageTypeCd: "C101",
          preJoinYn: "N", issueDate: "20230322", expireDate: "20240322", joinDate: "", issueKind: "C202", joinKind: "C202", firstJoinDate: "20220722",
          seq: 1, itemNm: "EL연간3,4년차365스탠다드대인", itemCd: "1002065753", itemKind: "IT01", itemFrDate: "20220209", itemToDate: "29991231", periodCnt: 0,
          dcType: "", dcTypeNm: "", condTypeCd: "10L6", subTypeCd: "", dcAmt: 0, price: 210000, saleAmt: 210000, taxAmt: 19091, netAmt: 190909, cardCompCd: "", ticketTypeFg: "G601", planKind: "T722",
          preIssuePayYn: "N", preIssueNo: "", amtMarkKind: "", issueTicketTypeFg: "",
          mobileYn: "N", groupSeq: "", dtlSeq: "",
          rsvNo: "", rsvSeqNo: "",
          ticketNo: "",
          ilmoCardNo: "", ilmoOtcNo: "", ilmoUseAmt: 0,
        },
        */
      ], //구매정기권 정보
      payCardList: [
        //sample
        /*
        {
          cardNo : "", veiwCardNo : "", apprDate : "", apprTime : "", cardNoKind : "", inputKind : "", statusKind : "", expireYm : "", compCode : "", , compName : "", 
          vanKind : "", divideGigan : "", apprAmt : 0, cancelDate : "", cancelTime : "", cancelApprNo : "", esign : "", eSignYn : "", 
          cardsvcCd : "", rePaymentYn : "", tranUniqueNbr : "", cardTypeCd : "", giftRemainAmt : 0, emvYn : "", emv : "", convKind : "", 
        },
        */
      ], //카드 결제 정보
      payCachReceipt: {
        issueYn: "N",
        certType: "",
        certLevel: "",
        logSeq: "",
        cardData: "",
        apprAmt: "",
        cardNo: "",
        apprDate: "",
        apprTime: "",
        cardNoFg: "",
        apprNo: "",
        vanKind: "",
        divideGigan: "",
        reResponseCd: "",
        reResponseMsg: "",
      }, //현금영수증 정보
      payGiftList: [
        //sample
        /*
        {
          giftCompCd :"", giftNo : "", unitcostAmt : 0, paymntAmt : 0, remainAmt: 0 , searchYn : "",
        },
        */
      ], //상품권 결제 정보
      payMobilegiftList: [
        //sample
        /*
        {
          mobileGiftNo : "", saleKind : "", otcNo : "", pointUseAmt : 0, cancelAmt : 0, penaltyAmt : 0, balanceAmt : 0, orgReceiptAmt : 0, 
        }
        */
      ], //모바일기프트카드 결제 정보
      payCredit: {
        payYn: "N",
        creditEmpNo: "",
        creditName: "",
        paymntAmt: 0,
        creditReasonDesc: "",
        creditReasonCd: "",
      }, //외상 결제 정보
      payPoint: {
        payYn: "N",
        payerMemshpUid: "",
        pointUseAmt: "0",
        remainPointAmt: "0",
        naPointAmt: "0",
        saveSchedlPointAmt: "0",
      }, //멤버십 포인트 결제 정보

      payPrintInfoList: [], //영수증인쇄 정보
      pointStatus: {}, //최종포인트 정보

      // 정기권 정보 Grid 세팅
      memberGridView: null,
      memberDataProvider: null,
      memberGrdFields: [],
      memberGrdColumns: [],
      //ageTypeCd Code List
      ageTypeCds: [],
      ageTypeNms: [],

      // 카드 결제 정보 Grid 세팅
      cardGridView: null,
      cardDataProvider: null,
      cardGrdFields: [],
      cardGrdColumns: [],

      //status Kind List
      statusKindCds: [],
      statusKindNms: [],

      // 상품권 결제 정보 Grid 세팅
      giftGridView: null,
      giftDataProvider: null,
      giftGrdFields: [],
      giftGrdColumns: [],

      //gift Comp Cd List
      giftCompCds: [],
      giftCompNms: [],

      // 모바일기프트카드 결제 정보 Grid 세팅
      mobileGridView: null,
      mobileDataProvider: null,
      mobileGrdFields: [],
      mobileGrdColumns: [],

      cardPopupUtils: null,
      webrtcDatachannel: null,
      cardPopupPage: "PGE_CTM_00004",
      cashPopupPage: "PGE_CTM_00017",

      logSeq: "", //로그순번(카드승인)

      //카드결제건 있음 경고 팝업 관련
      cfgCmpSystemTitle : utils.getConfigurationValue('CFG_CMP_SYSTEM_TITLE'), //팝업 타이틀
      cardPayExistAlertMsg: '', //카드결제건 있음 경고 메시지
    };
  },
  created() {
    // 정기권 정보 Grid
    this.memberGrdFields = [
      { fieldName: "name", dataType: "text" }, // 성명
      { fieldName: "itemNm", dataType: "text" }, // 권종명
      { fieldName: "ageTypeCd", dataType: "text" }, // 인원유형
      { fieldName: "saleAmt", dataType: "number" }, // 결제금액
    ];
    this.memberGrdColumns = [
      {
        name: "name",
        fieldName: "name",
        header: { text: this.$t('MSG_TXT_EMPL_NM') },
        width: 100,
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
      {
        name: "itemNm",
        fieldName: "itemNm",
        header: { text: this.$t('MSG_TXT_TICKET_ITEM_NM') },
        width: 200,
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
      {
        name: "ageTypeCd",
        fieldName: "ageTypeCd",
        width: 100,
        sortable: false,
        lookupDisplay: true,
        values: this.ageTypeCds,
        labels: this.ageTypeNms,
        editor: { type: "dropdown" },
        header: { text: this.$t('MSG_TXT_AGE_TYP_CD') },
        styles: { textAlignment: "center" },
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
      {
        name: "saleAmt",
        fieldName: "saleAmt",
        width: 100,
        header: { text: this.$t('MSG_TXT_PAY_AMT') },
        numberFormat: "#,##0",
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
    ];

    // 카드 결제 내역 Grid
    this.cardGrdFields = [
      { fieldName: "viewCardNo", dataType: "text" }, // 카드번호
      { fieldName: "compCodeNm", dataType: "text" }, // 카드사명
      { fieldName: "apprNo", dataType: "text" }, // 승인번호
      { fieldName: "apprAmt", dataType: "number" }, // 승인금액
      { fieldName: "divideGigan", dataType: "text" }, // 할부개월
      { fieldName: "statusKind", dataType: "text" }, // 처리상태
    ];
    this.cardGrdColumns = [
      {
        name: "viewCardNo",
        fieldName: "viewCardNo",
        header: { text: this.$t('MSG_TXT_CARD_NO') },
        width: 130,
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        textFormat: "([0-9*]{4})([0-9*]{4})([0-9*]{4})([0-9*]{4});$1-$2-$3-$4",
      },
      {
        name: "compCodeNm",
        fieldName: "compCodeNm",
        header: { text: this.$t('MSG_TXT_CARD_COMP_NM') },
        width: 120,
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
      {
        name: "apprNo",
        fieldName: "apprNo",
        header: { text: this.$t('MSG_TXT_APPR_NO') },
        width: 80,
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
      {
        name: "apprAmt",
        fieldName: "apprAmt",
        width: 90,
        header: { text: this.$t('MSG_TXT_APPR_AMT') },
        numberFormat: "#,##0",
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
      {
        name: "divideGigan",
        fieldName: "divideGigan",
        width: 60,
        header: { text: this.$t('MSG_TXT_INST_MONTHS') },
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
      {
        name: "statusKind",
        fieldName: "statusKind",
        width: 70,
        sortable: false,
        lookupDisplay: true,
        values: this.statusKindCds,
        labels: this.statusKindNms,
        editor: { type: "dropdown" },
        header: { text: this.$t('MSG_TXT_PROC_STATUS') },
        styles: { textAlignment: "center" },
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
    ];
    // 상품권 결제 내역 Grid
    this.giftGrdFields = [
      { fieldName: "unitCostAmt", dataType: "number" }, // 단가
      { fieldName: "paymntAmt", dataType: "number" }, // 금액
      { fieldName: "remainAmt", dataType: "number" }, // 잔액
      { fieldName: "giftCompCd", dataType: "text" }, // 발행사
      { fieldName: "giftNo", dataType: "text" }, // 번호
    ];
    this.giftGrdColumns = [
      {
        name: "giftCompCd",
        fieldName: "giftCompCd",
        width: 100,
        sortable: false,
        lookupDisplay: true,
        values: this.giftCompCds,
        labels: this.giftCompNms,
        editor: { type: "dropdown" },
        header: { text: this.$t('MSG_TXT_GIFT_ISSURE') },
        styles: { textAlignment: "center" },
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
      {
        name: "giftNo",
        fieldName: "giftNo",
        header: { text: this.$t('MSG_TXT_GIFT_NO') },
        width: 100,
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
      {
        name: "unitcostAmt",
        fieldName: "unitCostAmt",
        width: 100,
        header: { text: this.$t('MSG_TXT_UNIT_PRICE') },
        numberFormat: "#,##0",
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
      {
        name: "paymntAmt",
        fieldName: "paymntAmt",
        width: 100,
        header: { text: this.$t('MSG_TXT_GIFT_AMT') },
        numberFormat: "#,##0",
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
      {
        name: "remainAmt",
        fieldName: "remainAmt",
        width: 100,
        header: { text: this.$t('MSG_TXT_BALANCE') },
        numberFormat: "#,##0",
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
    ];

    // 모바일기프트카드 결제 내역 Grid
    this.mobileGrdFields = [
      { fieldName: "mobileGiftNo", dataType: "String" }, // 카드번호
      { fieldName: "otcNo", dataType: "String" }, // OTC
      { fieldName: "pointUseAmt", dataType: "number" }, // 사용금액
      { fieldName: "balanceAmt", dataType: "number" }, // 잔액
    ];
    this.mobileGrdColumns = [
      {
        name: "mobileGiftNo",
        fieldName: "mobileGiftNo",
        width: 150,
        header: { text: this.$t('MSG_TXT_CARD_NO') },
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
      {
        name: "otcNo",
        fieldName: "otcNo",
        width: 150,
        header: { text: "OTC" },
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
      {
        name: "pointUseAmt",
        fieldName: "pointUseAmt",
        width: 100,
        header: { text: "사용금액" },
        numberFormat: "#,##0",
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
      {
        name: "balanceAmt",
        fieldName: "balanceAmt",
        width: 100,
        header: { text: this.$t('MSG_TXT_BALANCE') },
        numberFormat: "#,##0",
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
    ];
    //접수화면에서 전달받은 데이터 화면 세팅
    this.totSaleAmt = this.pageInitialData.totSaleAmt;
    this.preIssuePay = this.pageInitialData.preIssuePay;
    this.ilmoPay = this.pageInitialData.ilmoPay;
    this.payerMemshpUid = this.pageInitialData.payerMemshpUid;
    this.payerMemberName = this.pageInitialData.payerMemberName;
    this.payerMemberKind = this.pageInitialData.payerMemberKind;
    this.payMemberList = this.pageInitialData.payMemberList;
  },
  async mounted() {
    this.parkKind = this.$store.getters.userInfo.parkFg;
    this.paymntDate = this.$store.getters.userInfo.saleDate;
    this.posId = this.$store.getters.userInfo.posId;
    this.posNm = this.$store.getters.userInfo.posNm;
    this.icReaderUseYn = this.$store.getters.userInfo.icReaderUseYn;
    
    await http
      .request(this.$options.name, "DTS_CTM_00011")
      .then((res) => {
        if (res.data == null) {
          utils.messageBox("alert", "LOG_SEQ 조회에 실패했습니다.", null);
          return;
        }
        this.logSeq = res.data.logSeq;
      })
      .catch((error) => {
        console.log(error);
      });

    //card popup 관련 초기화
    this.cardPopupUtils = new CardPopupUtils();
    this.webrtcDatachannel = new WebrtcDatachannel(
      this.$options.name, //thisPage
      this.$store.getters.userInfo.userIp // ip
    );

    await this.webrtcDatachannel.initSecure();

    this.itemNms = this.payMemberList[0].itemNm;
    this.orgItemNms = this.payMemberList[0].orgItemNm;
    if (this.payMemberList.length > 1) {
      this.itemNms += " 외 " + (this.payMemberList.length - 1);
      this.orgItemNms += " 외 " + (this.payMemberList.length - 1);
    }

    //전체 금액 재계산
    this.calculatePayAmt();
  },
  destroyed() {
    if (this.cardWindow != null) {
      try {
        this.cardWindow.close();
      } catch (e) {
        console.log(this.cardWindow + ":" + e);
      }
    }
  },
  computed: {
    /**
     * 현금 결제 가능 여부
     */
    disabledPayCash() {
      if (this.defaultCheckPay()) {
        if (this.checkCardPayOnly()) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    /**
     * 카드 결제 가능 여부
     */
    disabledPayCard() {
      if (this.icReaderUseYn == 'Y' && this.defaultCheckPay()) {
        return false;
      } else {
        return true;
      }
    },
    /**
     * 상품권 결제 가능 여부
     */
    disabledPayGiftcard() {
      if (this.defaultCheckPay()) {
        if (this.checkCardPayOnly()) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    /**
     * 모바일기프트카드 결제 가능 여부
     */
    disabledPayMobilegiftcard() {
      if (this.defaultCheckPay()) {
        if (this.checkCardPayOnly()) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    /**
     * 멤버십 포인트 결제 가능 여부
     */
    disabledPayPoint() {
      if (this.defaultCheckPay()) {
        if (this.checkCardPayOnly()) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    /**
     * 외상 결제 가능 여부
     */
    disabledPayCredit() {
      if (this.defaultCheckPay()) {
        if (this.checkCardPayOnly()) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    /**
     * 티켓(수기) 결제 가능 여부
     */
    disabledPayCachticket() {
      if (this.defaultCheckPay()) {
        if (this.checkCardPayOnly()) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
  },
  watch: {},
  filters: {
    moneyPoint(value) {
      return utils.numberFormat(value, 0);
    },
  },
  methods: {
    /**
     * 구매 정기권 정보 Grid Mouted시 호출
     */
    async memberGridMounted() {
      //공통 코드 정보 로딩
      await http
        .getCodeList(this.$options.name, ["COD_C1"], "")
        .then((res) => {
          //인원유형
          utils.forEach(res["COD_C1"], (codeObj, key) => {
            this.ageTypeCds.push(codeObj.codeId);
            this.ageTypeNms.push(codeObj.codeName);
          });
        })
        .catch((err) => {
          console.log(err);
        });

      //Member grid 초기화
      await ({
        gridView: this.memberGridView,
        dataProvider: this.memberDataProvider,
      } = this.$refs.grdMember.initGrid());

      //Member Grid footer 안보이게 설정
      this.memberGridView.setFooters({ visible: false });

      //Member No 보이게 설정
      this.memberGridView.setRowIndicator({ visible: false });

      //Member grid style set
      this.$refs.grdMember.setFitStyle("even");

      console.log("this.payMemberList", this.payMemberList);
      this.memberDataProvider.fillJsonData(this.payMemberList, {fillMode: "set",});
    },
    /**
     * 카드 결제 정보 Grid Mouted시 호출
     */
    async cardGridMounted() {
      //공통 코드 정보 로딩
      await http
        .getCodeList(this.$options.name, ["COD_F2"], "")
        .then((res) => {
          //카드 처리상태
          utils.forEach(res["COD_F2"], (codeObj, key) => {
            this.statusKindCds.push(codeObj.codeId);
            this.statusKindNms.push(codeObj.codeName);
          });
        })
        .catch((err) => {
          console.log(err);
        });

      //Card grid 초기화
      await ({
        gridView: this.cardGridView,
        dataProvider: this.cardDataProvider,
      } = this.$refs.grdCard.initGrid());

      //Card Grid footer 안보이게 설정
      this.cardGridView.setFooters({ visible: false });

      //Card No 보이게 설정
      this.cardGridView.setRowIndicator({ visible: false });

      //Card grid style set
      this.$refs.grdCard.setFitStyle("even");
    },
    /**
     * 상품권 결제 정보 Grid Mouted시 호출
     */
    async giftGridMounted() {
      //Pops 공통 코드 정보 로딩
      await http
        .getPopsCodeList(this.$options.name, ["P011"], "")
        .then((res) => {
          //상품권 발행사
          utils.forEach(res["P011"], (codeObj, key) => {
            this.giftCompCds.push(codeObj.codeId);
            this.giftCompNms.push(codeObj.codeName);
          });
        })
        .catch((err) => {
          console.log(err);
        });

      //Gift grid 초기화
      await ({
        gridView: this.giftGridView,
        dataProvider: this.giftDataProvider,
      } = this.$refs.grdGift.initGrid());

      //Gift Grid footer 안보이게 설정
      this.giftGridView.setFooters({ visible: false });

      //Gift No 보이게 설정
      this.giftGridView.setRowIndicator({ visible: false });

      //Gift grid style set
      this.$refs.grdGift.setFitStyle("even");
    },
    /**
     * 기프트카드 결제 정보 Grid Mouted시 호출
     */
    async mobileGridMounted() {
      //Mobilegiftcard grid 초기화
      await ({
        gridView: this.mobileGridView,
        dataProvider: this.mobileDataProvider,
      } = this.$refs.grdMobile.initGrid());

      //Mobilegiftcard Grid footer 안보이게 설정
      this.mobileGridView.setFooters({ visible: false });

      //Mobilegiftcard No 보이게 설정
      this.mobileGridView.setRowIndicator({ visible: false });

      //Mobilegiftcard grid style set
      this.$refs.grdMobile.setFitStyle("even");
    },
    /**
     * 결제금액 계산
     */
    calculatePayAmt() {
      var tempTotPayAmt = 0;
      tempTotPayAmt += this.toInt(this.cashPay);
      tempTotPayAmt += this.toInt(this.cardPay);
      tempTotPayAmt += this.toInt(this.giftcardPay);
      tempTotPayAmt += this.toInt(this.mobilegiftPay);
      tempTotPayAmt += this.toInt(this.pointPay);
      tempTotPayAmt += this.toInt(this.creditPay);
      tempTotPayAmt += this.toInt(this.preIssuePay);
      tempTotPayAmt += this.toInt(this.cashTicketPay);

      this.totPay = tempTotPayAmt;
      this.notPay = this.totSaleAmt - this.totPay;
    },
    /**
     * 그냥 창 닫기
     */
    closePopup(gubn) {
      //카드결제창 열려있는지 체크
      if (this.isOpenCardPopup()) {
        return;
      }
      let msg = "";
      if (this.payCardList != null && this.payCardList.length > 0) {
        msg += `\n- 카드결제 : ${this.payCardList.length} 건`;
      }

      if (msg.length > 0) {
        this.cardPayExistAlertMsg = this.$t('MSG_ALT_EXIST_CARD_PAY_LIST_AND_CONFIRM') + msg;
        this.cardPayExistAlertMsg = this.cardPayExistAlertMsg.replaceAll("\\n\\r", "\n");
        this.cardPayExistAlertMsg = this.cardPayExistAlertMsg.replaceAll("\\n", "\n");
        this.$refs.modalCardPayExistAlert.open();
      } else {
        this.clearPayData();
        this.closePagePopup(gubn);
      }
    },
    /**
     * 전체 결제 정보 가져가지
     */
    getPayMainInfo() {
      return {
        payerMemshpUid: this.payerMemshpUid,
        payerMemberName: this.payerMemberName,
        payerMemberKind: this.payerMemberKind,
        condTypeCd: this.payMemberList[0].condTypeCd,
        cardCompCd: this.payMemberList[0].cardCompCd,
        cardSvcCd: this.payMemberList[0].cardSvcCd,
        dcType: this.payMemberList[0].dcType,
        joinKind: this.payMemberList[0].joinKind,
        logSeq: this.logSeq,
        totSaleAmt: this.totSaleAmt,
        totPay: this.totPay,
        notPay: this.notPay,
        cardPay: this.cardPay,
        mobilegiftPay: this.mobilegiftPay,
        pointPay: this.pointPay,
        itemNms: this.itemNms,
      };
    },
    /**
     * 기본 결제 정보 체크
     * @param { boolean } bMsgAlert
     */
    defaultCheckPay(bMsgAlert) {
      if (this.payMemberList == null || this.payMemberList.length == 0) {
        if (bMsgAlert) {
          utils.messageBox("alert", this.$t('MSG_ALT_NO_TICKET_INFO_FOR_PAY'));
        }
        return false;
      }
      //선발행티켓과 결제수단 혼합 불가
      if (this.toInt(this.preIssuePay) > 0) {
        return false;
      }
      return true;
    },
    /**
     * 제휴카드(15L1) 할인으로 카드 결제만 가능
     */
    checkCardPayOnly() {
      if (this.payMemberList != null && this.payMemberList.length > 0 && this.payMemberList[0].condTypeCd == "15L1") {
        return true;
      } else {
        return false;
      }
    },
    /**
     * 결제수단 선택시 체크 사항
     * @param { String } payType
     */
    checkBeforePay(payType) {
      if (!this.defaultCheckPay()) {
        return false;
      }

      //선발행티켓과 결제수단 혼합 불가
      if (this.toInt(this.preIssuePay) > 0) {
        return false;
      }

      if (this.checkCardPayOnly() && payType != "CARD") {
        // 제휴카드(15L1) 할인으로 카드 결제만 가능함.
        utils.messageBox("alert", "제휴카드 할인입니다. 카드결제만 가능 합니다.");
        return false;
      }

      if ((this.notPay <= 0 || this.totSaleAmt <= this.totPay) && payType != "GIFT" && payType != "CREDIT" &&payType != "POINT" &&payType != "MOBILEGIFT") {
        utils.messageBox("alert", "미결제금액이 없습니다.");
        return false;
      }

      return true;
    },
    /**
     * 현금 결제
     */
    payCash() {
      //카드결제창 열려있는지 체크
      if (this.isOpenCardPopup()) {
        return;
      }

      if (this.checkBeforePay("CASH")) {
        this.tempCashPay = this.notPay + this.toInt(this.cashPay);

        //전체 금액 재계산
        this.calculatePayAmt();

        this.$refs.cashPay.focus();
      }
    },
    /**
     * 현금 field에서 blur 되었을때...
     */
    blurCashPay() {
      let tempNotPay = this.toInt(this.notPay) + this.toInt(this.cashPay);
      if (tempNotPay < this.toInt(this.tempCashPay)) {
        utils.messageBox("alert", "미결제금액을 초과했습니다.", null, () => {
          this.$refs.cashPay.focus();
        });
        this.tempCashPay = "" + tempNotPay;
        this.cashPay = tempNotPay;
      } else {
        this.cashPay = this.toInt(this.tempCashPay);
      }

      //전체 금액 재계산
      this.calculatePayAmt();
    },
    /**
     * 티켓(수기) 결제
     */
    payCashTicket() {
      //카드결제창 열려있는지 체크
      if (this.isOpenCardPopup()) {
        return;
      }

      if (this.checkBeforePay("CASH_TICKET")) {
        this.tempCashTicketPay = this.notPay + this.toInt(this.cashTicketPay);

        //전체 금액 재계산
        this.calculatePayAmt();

        this.$refs.cashTicketPay.focus();
      }
    },
    /**
     * 티켓(수기) field에서 blur 되었을때...
     */
    blurCashTicketPay() {
      let tempNotPay = this.toInt(this.notPay) + this.toInt(this.cashTicketPay);
      if (tempNotPay < this.toInt(this.tempCashTicketPay)) {
        utils.messageBox("alert", "미결제금액을 초과했습니다.", null, () => {
          this.$refs.cashTicketPay.focus();
        });
        this.tempCashTicketPay = "" + tempNotPay;
        this.cashTicketPay = tempNotPay;
      } else {
        this.cashTicketPay = this.toInt(this.tempCashTicketPay);
      }

      //전체 금액 재계산
      this.calculatePayAmt();
    },
    /**
     * 수표 조회창 띄우기
     */
    openModalSearchCheck() {
      utils.openLayerPopup("PGE_CTM_00009", this.onCheckPopupCallback, {
        pageInitialData: {},
        width: "500px",
      });
    },
    /**
     * 수표 조회 완료 Callback
     * @param { Object } data
     */
    onCheckPopupCallback(data) {},
    /**
     * 상품권 결제창 띄우기
     */
    openModalPayGift() {
      //카드결제창 열려있는지 체크
      if (this.isOpenCardPopup()) {
        return;
      }

      if (this.checkBeforePay("GIFT")) {
        utils.openLayerPopup("PGE_CTM_00005", this.onGiftPopupCallback, {
          pageInitialData: {
            payMainInfo: this.getPayMainInfo(),
            payGiftList: this.payGiftList,
          },
          size: "lg",
        });
      }
    },
    /**
     * 상품권 결제 완료 Callback
     * @param { Array } data
     */
    onGiftPopupCallback(data) {
      //창을 그냥 닫은 경우
      if (data == null) {
        return;
      }

      //결제 내용 결제Main 반영
      this.payGiftList = data;

      //상품권 결제 합계 계산
      if (this.payGiftList.length == 0) {
        this.payGiftList = [];
      }
      var tempGiftcardPay = 0;
      utils.forEach(this.payGiftList, (gift, index) => {
        tempGiftcardPay += gift.paymntAmt;
      });
      this.giftcardPay = tempGiftcardPay;

      //상품권 결제 정보 Grid 세팅
      this.giftDataProvider.setRows(this.payGiftList);

      //전체 금액 재계산
      this.calculatePayAmt();
    },
    /**
     * 멤버십 포인트 띄우기
     */
    openModalPayPoint() {
      //카드결제창 열려있는지 체크
      if (this.isOpenCardPopup()) {
        return;
      }

      if (this.checkBeforePay("POINT")) {
        utils.openLayerPopup("PGE_CTM_00007", this.onPointPopupCallback, {
          pageInitialData: {
            payMainInfo: this.getPayMainInfo(),
            payPoint: this.payPoint,
          },
          size: "lg",
        });
      }
    },
    /**
     * 멤버십 포인트 결제 완료 Callback
     * @param { Object } data
     */
    onPointPopupCallback(data) {
      // 창을 그냥 닫은 경우
      if (data == null) {
        return;
      }

      //결제 내용 결제Main 반영
      this.payPoint = data;
      this.pointPay = this.payPoint.pointUseAmt;

      //전체 금액 재계산
      this.calculatePayAmt();
    },
    /**
     * 외상 결제창 띄우기
     */
    openModalPayCredit() {
      //카드결제창 열려있는지 체크
      if (this.isOpenCardPopup()) {
        return;
      }

      if (this.checkBeforePay("CREDIT")) {
        utils.openLayerPopup("PGE_CTM_00008", this.onCreditPopupCallback, {
          pageInitialData: {
            payMainInfo: this.getPayMainInfo(),
            payCredit: this.payCredit,
          },
          size: "lg",
        });
      }
    },
    /**
     * 외상 결제 완료 Callback
     * @param { Object } data
     */
    onCreditPopupCallback(data) {
      // 창을 그냥 닫은 경우
      if (data == null) {
        return;
      }

      //결제 내용 결제Main 반영
      this.payCredit = data;

      //결제 여부 및 금액  세팅
      if (this.payCredit.paymntAmt == null || this.payCredit.paymntAmt == 0) {
        this.payCredit.payYn = "N";
        this.payCredit.paymntAmt = 0;
      }
      if (this.payCredit.paymntAmt > 0) {
        this.payCredit.payYn = "Y";
      }
      this.creditPay = this.payCredit.paymntAmt;

      //전체 금액 재계산
      this.calculatePayAmt();
    },
    /**
     * 카드 결제창 띄우기
     */
    async openPopupCard() {
      //카드결제창 열려있는지 체크
      if (this.isOpenCardPopup()) {
        return;
      }

      if (this.checkBeforePay("CARD")) {
        //접속 시간 서버시간으로 설정
        let systemTime = await http.getSystemTime();

        //접속정보 설정
        this.webrtcDatachannel.setConnectPage(
          this.cardPopupPage, //popupPage
          systemTime.nowDateTime, // accessDateTime
          this.receiveMessageFromCardPage, // receiveCallBack
          this.initCardPopup, // initCallback
          this.closeCardPopup // closeCallback
        );

        //팝업 열기
        this.cardPopupUtils.openPopup(
          this.cardPopupPage,
          this.$options.name,
          systemTime.nowDateTime,
          850,
          1100
        );

        //접속하기
        this.webrtcDatachannel.connectToPopup();
      }
    },
    /**
     * 카드결제/현금영수증 창이 열려있는제 체크
     */
    isOpenCardPopup() {
      if (this.cardPopupUtils.cardWindow != null && this.webrtcDatachannel.isOpenState()) {
        let popupNm = "카드결제";
        if (this.webrtcDatachannel.getPopupPage() == this.cardPopupPage) {
          popupNm = "카드결제";
        } else if (this.webrtcDatachannel.getPopupPage() == this.cashPopupPage) {
          popupNm = "현금영수증";
        }

        utils.messageBox(
          "alert",
          `${popupNm} 팝업이 열려 있습니다.\n확인 후 다시 시도해주세요!`,
          null,
          () => {
            this.webrtcDatachannel.sendMessage({ type: "focus" });
          }
        );
        return true;
      } else {
        return false;
      }
    },
    /**
     * 카드결제창과 Webrtc 연결되면 호출
     */
    initCardPopup() {
      this.trace("initCardPopup");
      this.webrtcDatachannel.sendMessage({
        type: "init",
        data: {
          payMainInfo: this.getPayMainInfo(),
          payCardList: this.payCardList,
        },
      });
    },
    closeCardPopup() {
      this.cardPopupUtils.cardWindow = null;
    },
    /**
     * 카드결제창에서 메시지 송신
     * @param { Object } param
     */
    receiveMessageFromCardPage(param) {
      if (
        param.type == "send" ||
        param.type == "reqOk" ||
        param.type == "reqCancel"
      ) {
        this.trace(`param.type=>${param.type}`);
        this.trace(param.data);

        this.payCardList = param.data.payCardList;

        //카드 결제 합계 계산
        if (this.payCardList == null || this.payCardList.length == 0) {
          this.payCardList = [];
        }
        var tempCardPay = 0;
        utils.forEach(this.payCardList, (card, index) => {
          tempCardPay += this.toInt(card.apprAmt);
        });
        this.cardPay = tempCardPay;

        //카드 결제 정보 Grid 세팅
        this.cardDataProvider.setRows(this.payCardList);

        //전체 금액 재계산
        this.calculatePayAmt();

        if (param.type == "reqOk") {
          this.webrtcDatachannel.sendMessage({ type: "endOk" });
        } else if (param.type == "reqCancel") {
          this.webrtcDatachannel.sendMessage({ type: "endCancel" });
        }
      }
    },
    /**
     * 기프트카드 결제창 띄우기
     */
    openModalPayMobileGift() {
      //카드결제창 열려있는지 체크
      if (this.isOpenCardPopup()) {
        return;
      }

      if (this.checkBeforePay("MOBILEGIFT")) {
        utils.openLayerPopup("PGE_CTM_00006", this.onMobileGiftPopupCallback, {
          pageInitialData: {
            payMainInfo: this.getPayMainInfo(),
            payMobilegiftList: this.payMobilegiftList,
          },
          size: "lg",
        });
      }
    },
    /**
     * 기프트카드 결제 완료 Callback
     * @param { Array } data
     */
    onMobileGiftPopupCallback(data) {
      this.trace(`data==>[${data}]`);
      // 창을 그냥 닫은 경우
      if (data == null) {
        return;
      }

      //결제 내용 결제Main 반영
      this.payMobilegiftList = data;

      var tempMobilegiftPay = 0;
      utils.forEach(this.payMobilegiftList, (mobile, index) => {
        tempMobilegiftPay += this.toInt(mobile.pointUseAmt);
      });

      this.mobilegiftPay = tempMobilegiftPay;

      this.mobileDataProvider.setRows(this.payMobilegiftList);

      //전체 금액 재계산
      this.calculatePayAmt();
    },
    /**
     * 완료 버튼 Click
     */
    clickBtnFinish() {
      if (this.toInt(this.notPay) != 0) {
        utils.messageBox("alert", "미결금액을 확인하세요.");
        return;
      }

      var cashPay = this.toInt(this.cashPay);
      var giftcardPay = this.toInt(this.giftcardPay);
      var mobilegiftPay = this.toInt(this.mobilegiftPay);
      var preIssuePay = this.toInt(this.preIssuePay);
      var cashTicketPay = this.toInt(this.cashTicketPay);

      var totCash =
        cashPay + giftcardPay + mobilegiftPay + preIssuePay + cashTicketPay;
      if (totCash > 0) {
        this.isCashReceipt = true;
        this.totCash = totCash;
        this.openModalCashReceipt();
      } else {
        this.savePayment();
      }
    },
    /**
     * 현금영수증 승인 팝업 Open
     */
    async openModalCashReceipt() {
      //카드결제창 열려있는지 체크
      if (this.isOpenCardPopup()) {
        return;
      }

      //접속 시간 서버시간으로 설정
      let systemTime = await http.getSystemTime();

      //접속정보 설정
      this.webrtcDatachannel.setConnectPage(
        this.cashPopupPage, //popupPage
        systemTime.nowDateTime, // accessDateTime
        this.receiveMessageFromCashPage, // receiveCallBack
        this.initCashPopup, // initCallback
        this.closeCashPopup // closeCallback
      );

      //팝업 열기
      this.cardPopupUtils.openPopup(
        this.cashPopupPage,
        this.$options.name,
        systemTime.nowDateTime,
        520,
        700
      );

      //접속하기
      this.webrtcDatachannel.connectToPopup();
    },
    /**
     * 현금영수증 팝업 통신 연결되면 호출
     */
    initCashPopup() {
      this.trace("initCashPopup");
      this.webrtcDatachannel.sendMessage({
        type: "init",
        data: { totCash: this.totCash, logSeq: this.logSeq },
      });
    },
    /**
     * 현금영수증 팝업 Close 메시지 호출 시
     */
    closeCashPopup() {
      this.cardPopupUtils.cardWindow = null;
    },
    /**
     * 현금영수증 팝업에서 메세지 송신 시 호출
     * @param { Object } param
     */
    receiveMessageFromCashPage(param) {
      if (param.type == "sendCashReceipt") {
        this.trace(`param.type=>${param.type}`);
        this.payCashReceipt = param.data.cashReceipt;
        this.payCashReceipt.issueYn = "Y";
      } else if (param.type == "reqFinish" || param.type == "reqNormal") {
        this.trace(`param.type=>${param.type}`);
        this.trace(param.data);

        if (param.type == "reqFinish") {
          this.payCashReceipt = param.data.cashReceipt;
          this.payCashReceipt.issueYn = "Y";
        } else if (param.type == "reqNormal") {
          this.payCashReceipt = {};
          this.payCashReceipt.issueYn = "N";
        }
        this.webrtcDatachannel.sendMessage({ type: "endFinish" });

        this.savePayment();
      }
    },
    /**
     * 결제 내용 저장
     */
    savePayment() {
      if (this.isPaySave) {
        utils.messageBox("alert", "이미 저장 되었습니다.", null, () => {
          // 이미 저장되었으므로 저장 후 처리 호출
          let receiptIssueYn = this.receiptIssueYn;
          let elecReceiptIssueYn = (this.isElectReceiptIssueApply)? this.pointStatus.elecReceiptIssueYn  : "N" ;
          console.log("receiptIssueYn", receiptIssueYn);
          console.log("elecReceiptIssueYn", elecReceiptIssueYn);
            if (receiptIssueYn == "Y" && elecReceiptIssueYn != 'Y') {
            window.utils.messageBox("confirm", '고객 영수증을 발행하시겠습니까?(카드할부 무조건 발행)', null,
              (/* ok */) => {
                this.endSavePayment("Y");
              },
              (/* cancel */) => {
                this.endSavePayment("N");
              }
            );
          }
          else {
            this.endSavePayment("N");
          }
        });
        return;
      }

      if (this.toInt(this.notPay) != 0) {
        utils.messageBox("alert", "미결금액을 확인하세요.");
        return;
      }
      //현금영수증 밣행이 'Y'가 아니면 'N'
      this.trace(this.payCashReceipt);
      if (this.payCashReceipt == null || this.payCashReceipt.issueYn != "Y") {
        this.payCashReceipt = {};
        this.payCashReceipt.issueYn = "N";
      }

      let payMainData = {
        parkKind: this.parkKind,
        paymntDate: this.paymntDate,
        posId: this.posId,
        payerMemshpUid: this.payerMemshpUid,
        payerMemberKind: this.payerMemberKind,
        totPay: this.totPay,
        cashPay: this.cashPay,
        cardPay: this.cardPay,
        giftcardPay: this.giftcardPay,
        mobilegiftPay: this.mobilegiftPay,
        pointPay: this.pointPay,
        creditPay: this.creditPay,
        preIssuePay: this.preIssuePay,
        cashTicketPay: this.cashTicketPay,
        ilmoPay: this.ilmoPay,
        logSeqNo: this.logSeq,
        itemNms: this.itemNms,
        orgItemNms: this.orgItemNms,
        payMemberList: this.payMemberList,
        payCardList: this.payCardList,
        payGiftList: this.payGiftList,
        payMobilegiftList: this.payMobilegiftList,
        payCredit: this.payCredit,
        payPoint: this.payPoint,
        payCashReceipt: this.payCashReceipt,
      };

      console.log("payMainData", payMainData);

      http
        .request(this.$options.name, "DTS_CTM_00026", {
          data: payMainData,
        })
        .then((res) => {
          if (res && res.data && res.data.resultCode == "1") {
            this.isPaySave = true;
            this.parkKind = res.data.parkKind;
            this.posId = res.data.posId;
            this.receiptNo = res.data.receiptNo;
            this.totSaleAmt = res.data.saleAmt;
            this.totNetAmt = res.data.netAmt;
            this.totTaxAmt = res.data.taxAmt;
            this.payMemberList = res.data.payMemberList;
            this.payPrintInfoList = res.data.payPrintInfoList;
            this.pointStatus = res.data.pointStatus;
            this.receiptIssueYn = res.data.receiptIssueYn;

            console.log("this.pointStatus.elecReceiptIssueYn", this.pointStatus.elecReceiptIssueYn);
            let elecReceiptIssueYn = (this.isElectReceiptIssueApply)? this.pointStatus.elecReceiptIssueYn  : "N" ;
            let receiptIssueYn = this.receiptIssueYn;
            console.log("elecReceiptIssueYn", elecReceiptIssueYn);
            console.log("receiptIssueYn", receiptIssueYn);
            if (receiptIssueYn== "Y" && elecReceiptIssueYn != 'Y') {
              window.utils.messageBox("confirm", '고객 영수증을 발행하시겠습니까?(카드할부 무조건 발행)', null,
                (/* ok */) => {
                  this.endSavePayment("Y");
                },
                (/* cancel */) => {
                  this.endSavePayment("N");
                }
              );
            }
            else {
              this.endSavePayment("N");
            }
          }
        })
        .catch((e) => console.log(e));
    },
    /**
     * 영수증 출력 후 결제 오나료 창 띄우기
     * @param { String } receiptIssueYn
     */
    async endSavePayment(receiptIssueYn) {
      // 영수증 출력
      await this.printReceipt(receiptIssueYn);
      this.openModalPayEnd();
    },
    /**
     * 영수증 Print
     * @param { String } receiptIssueYn
     */
    async printReceipt(receiptIssueYn) {
      let payMainData = {
        parkKind: this.parkKind,
        paymntDate: this.paymntDate,
        posId: this.posId,
        posNm: this.posNm,
        receiptIssueYn: receiptIssueYn,
        receiptNo: this.receiptNo,
        payerMemshpUid: this.payerMemshpUid,
        payerMemberName: this.payerMemberName,
        payerMemberKind: this.payerMemberKind,
        saleAmt: this.totSaleAmt,
        netAmt: this.totNetAmt,
        taxAmt: this.totTaxAmt,
        totPay: this.totPay,
        cashPay: this.cashPay,
        cardPay: this.cardPay,
        giftcardPay: this.giftcardPay,
        mobilegiftPay: this.mobilegiftPay,
        pointPay: this.pointPay,
        creditPay: this.creditPay,
        preIssuePay: this.preIssuePay,
        cashTicketPay: this.cashTicketPay,
        ilmoPay: this.ilmoPay,
        logSeqNo: this.logSeq,
        payMemberList: this.payMemberList,
        payCardList: this.payCardList,
        payGiftList: this.payGiftList,
        payMobilegiftList: this.payMobilegiftList,
        payCredit: this.payCredit,
        payPoint: this.payPoint,
        payCashReceipt: this.payCashReceipt,
        payPrintInfoList: this.payPrintInfoList,
        pointStatus: this.pointStatus,
        programId : this.$options.name,
      };
      let posPrint = new PosPrint();
      await posPrint.printAfterSavePay(payMainData);
    },
    /**
     * 결제 완료 창 띄우기
     */
    openModalPayEnd() {
      let pageInitialData = {
        receiptNo: this.receiptNo,
        totPay: this.totPay,
        payMemberList: this.payMemberList,
      };
      utils.openLayerPopup("PGE_CTM_00010", this.onPayEndPopupCallback, {
        pageInitialData: pageInitialData,
        width: "500px",
      });
    },
    /**
     * 결제 완료 창 Callback
     */
    onPayEndPopupCallback() {
      this.clearPayData();
      this.closePagePopup("FINISH");
    },
    /**
     * 숫자 변환
     * @param { Number or String or null } num
     */
    toInt(num) {
      if (utils.length(num) == 0) {
        return 0;
      } else {
        return parseInt(num);
      }
    },
    /**
     * clearPayData
     */
    clearPayData() {
      this.isPaySave = false;
      this.payerMemberName = ""; //결제자 명
      this.payerMemshpUid = ""; //결제자 UID
      this.payerMemberKind = ""; //결제자 회원구분
      this.totSaleAmt = 0; // 총 금액
      this.totPay = 0; // 지불 금액
      this.notPay = 0; // 미결제 금액
      this.cashPay = 0; // 현금 결제 금액
      this.tempCashPay = "0"; //화면에 입력하는 현금 결제 금액
      this.cardPay = 0; // 카드 결제 금액
      this.giftcardPay = 0; // 상품권 결제 금액
      this.mobilegiftPay = 0; // 기프트카드 결제 금액
      this.pointPay = 0; //멤버십포인트 금액
      this.creditPay = 0; //외상결제 금액
      this.preIssuePay = 0; // 선발행결제 금액
      this.ilmoPay = 0; // 일모포인트 할인 금액
      this.cashTicketPay = 0; // 티켓(수기) 금액
      this.tempCashTicketPay = 0; // 화면에 입력하는 티켓(수기) 금액
      this.isCashReceipt = false; // 현금영수증 여부
      this.totCash = 0; //현금 총 금액
      this.payMemberList = []; //구매정기권 정보
      this.payCardList = []; //카드 결제 정보
      this.payCachReceipt = { issueYn: "N" }; //현금영수증 정보
      this.payGiftList = []; //상품권 결제 정보
      this.payMobilegiftList = []; //모바일기프트카드 결제 정보
      this.payCredit = {
        payYn: "N",
        creditEmpNo: "",
        creditName: "",
        paymntAmt: 0,
        creditReasonDesc: "",
        creditReasonCd: "",
      }; //외상 결제 정보
      this.payPoint = {
        payYn: "N",
        payerMemshpUid: "",
        pointUseAmt: "0",
        remainPointAmt: "0",
        naPointAmt: "0",
        saveSchedlPointAmt: "0",
      }; //멤버십 포인트 결제 정보
    },
    /**
     * 카드결제 있음 경고창 닫기
     */
    clickCloseCardPayExistAlert() {
        this.$refs.modalCardPayExistAlert.close();
    },
    /**
     * 카드결제 있음 경고창 닫기
     */
    closedCardPayExistAlert() {
    },
    /**
     * console.log
     * @param { Object or String } msg
     * @param { Object or String } msg2
     */
    trace(msg, msg2) {
      if (this.isLogging) {
        if (msg2) {
          console.log(msg, msg2);
        } else {
          console.log(msg);
        }
      }
    },
  },
};
</script>
<style scoped></style>
