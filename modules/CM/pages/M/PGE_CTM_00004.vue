<template>
	<sui-page>
		<div class="modalWrap" style="height: auto; overflow-y: scroll">
			<template slot="title">
				<div class="modal-title mb20">{{ getMessage('MSG_TIT_PC004_MNG') }}</div>
			</template>
			<template>
				<div class="modal-body">
					<!-- S::cardpayWrap -->
					<div class="cardpayWrap">
						<!-- S::컨텐츠1: -->
						<div class="board_list">
							<table>
								<caption></caption>
								<colgroup>
									<col width="13.5%" />
									<col width="36.5%" />
									<col width="13.5%" />
									<col width="*" />
								</colgroup>
								<tbody>
									<tr>
										<th class="font-medium">{{ getMessage('MSG_TXT_AMOUNT_TOT') }}</th>
										<td class="right">{{ payMainInfo.totSaleAmt | moneyPoint }} {{ getMessage('MSG_TXT_WON') }}</td>
										<th class="required-icon">{{ getMessage('MSG_TXT_AMOUNT_NOTPAY') }}</th>
										<td class="right">{{ cardInputTemp.notPay | moneyPoint }} {{ getMessage('MSG_TXT_WON') }}</td>
									</tr>
								</tbody>
							</table>
						</div>
						<!-- E::컨텐츠1:-->
						<!-- S::컨텐츠2:결제유형+카드결제내역 -->
						<div class="comm_shut_wrap">
							<div class="inbox3">
								<!-- S::결제유형 -->
								<div class="comm_title_wrap mt30">
									<h4 class="pr10">{{ getMessage('MSG_TXT_PAYMENT_KIND') }}</h4>
								</div>
								<div class="comm_view_wrap">
									<div class="row">
										<div class="col-xs-4-1 required-icon">
											<sui-input-label :label="getMessage('MSG_TXT_CARD_NO')" />
										</div>
										<div class="col-xs-8">
											<sui-text-field 
												placeholder="" 
												ref="cardNo" 
												v-model="cardInputTemp.cardNo" 
												@focus="focusCardNo" 
												@blur="blurCardNo" 
												@keyup.enter="keyupFromCardNo" 
												:disabled="false" 
												:readonly="disabledTextCardNo" 
												:maxlength="maxlengthTextCardNo" 
												:mask="maskTextCardNo"
											/>
										</div>
									</div>
									<div class="row">
										<div class="col-xs-4-1 required-icon">
											<sui-input-label :label="getMessage('MSG_TXT_PAY_AMT')" />
										</div>
										<div class="col-xs-8">
											<sui-text-field 
												placeholder="" 
												ref="apprAmt" 
												maxlength="12" 
												v-model="cardInputData.apprAmt" 
												@focus="focusApprAmt" 
												@keyup.enter="enterApprAmt" 
												mask="currency" 
												:disabled="false" 
												:readonly="disabledTextApprAmt" 
											/>
										</div>
									</div>
									<div class="row">
										<div class="col-xs-4-1">
											<sui-input-label :label="getMessage('MSG_TXT_CARD_COMP_NM')" />
										</div>
										<div class="col-xs-8">
											<sui-text-field 
												placeholder="" 
												maxlength="100" 
												v-model="cardInputData.compCodeNm" 
												:disabled="false" 
												:readonly="true" 
											/>
										</div>
									</div>
									<div class="row">
										<div class="col-xs-4-1 required-icon">
											<sui-input-label :label="getMessage('MSG_TXT_VALID_PERIOD')" />
										</div>
										<div class="col-xs-8">
											<sui-text-field 
												placeholder="" 
												ref="expireYm" 
												maxlength="5" 
												v-model="cardInputData.expireYm" 
												@keyup.enter="enterExpireYm" 
												mask="##/##" 
												:disabled="false" 
												:readonly="disabledTextExpireYm" 
											/>
											<span class="text">[MM/YY]</span>
										</div>
									</div>
									<div class="row">
										<div class="col-xs-4-1 required-icon">
											<sui-input-label :label="getMessage('MSG_TXT_INST_MONTHS')" />
										</div>
										<div class="col-xs-8">
											<sui-text-field 
												placeholder="" 
												ref="divideGigan" 
												maxlength="2" 
												v-model="cardInputData.divideGigan" 
                        @blur="changeDivideGigan"
												@keyup.enter="enterDivideGigan" 
												mask="##" 
												:disabled="false" 
												:readonly="disabledTextDivideGigan" 
											/>
											<span class="text">{{getMessage('MSG_TXT_MONTH_UNIT')}}</span>
										</div>
									</div>
								</div>

								<!-- S::btn_wrap-->
								<div class="btn_wrap">
									<sui-button type="button" @click="clickBtnCardKeyin" :disabled="disabledBtnCardKeyin" class="point">수기입력</sui-button>
									<sui-button type="button" @click="clickBtnAppCard" :disabled="disabledBtnAppCard" class="point">APP카드</sui-button>
									<sui-button type="button" @click="clickBtnEasyCheck" :disabled="disabledBtnEasyCheck" class="point">EasyCheck</sui-button>
								</div>
								<!-- E::btn_wrap -->
								<!-- S::btn_wrap -->
								<div class="btn_wrap">
									<sui-button type="button" @click="clickBtnApproveFromKeyin" :disabled="disabledBtnApproveFromKeyin" class="point">수기승인</sui-button>
									<sui-button type="button" @click="clickBtnApprove" :disabled="disabledBtnApprove" class="point">승인</sui-button>
                  <sui-button type="button" @click="clickBtnEasyCehckSearch" :disabled="disabledBtnEasyCheckSearch" class="point">EasyCheck조회</sui-button>
								</div>
								<!-- E::btn_wrap -->
								<div class="comm_view_wrap mt10">
									<div class="row">
										<div class="col-xs-4-1">
											<sui-input-label :label="getMessage('MSG_TXT_ORG_APPR_DATE')" />
										</div>
										<div class="col-xs-8">
											<sui-date-picker 
                        ref="apprDate" 
                        v-model="cardInputData.apprDate" 
                        :disabled="disabledDateApprDate" 
                        @selected="selectedApprDate"
                        maxlength="10"
                      />
										</div>
									</div>
									<div class="row">
										<div class="col-xs-4-1">
											<sui-input-label :label="getMessage('MSG_TXT_APPR_NO')" />
										</div>
										<div class="col-xs-8">
											<sui-text-field 
                        placeholder="" 
                        ref="apprNo" 
                        maxlength="8" 
                        v-model="cardInputData.apprNo" 
                        @keyup.enter="enterApprNo" 
                        mask="########" 
                        :disabled="false" 
                        :readonly="disabledTextApprNo" 
                      />
										</div>
									</div>
								</div>
                <!-- S::btn_wrap -->
                <div class="btn_wrap">
                  <sui-button type="button" @click="clickBtnIcReading" :disabled="disabledBtnIcReading" class="point">{{getMessage('MSG_TXT_IC_READING')}}</sui-button>
                  <sui-button type="button" @click="clickBtnIcCancel" :disabled="disabledBtnIcCancel" class="point">{{getMessage('MSG_TXT_IC_READING_CANCEL')}}</sui-button>
                </div>
                <!-- E::btn_wrap -->
							</div>
							<!-- E::결제유형 -->
							<div class="emptybox" />
							<!-- S::카드결제내역 -->
							<div class="inbox7">
								<div class="comm_title_wrap mt30">
									<h4 class="pr10">{{getMessage('MSG_TXT_CARD_PAY_LIST')}}</h4>
								</div>
								<real-grid 
									ref="grdCard" 
									grid-id="PGE_CTM_00004_CARD" 
									grid-root="/lib"
									:gridFields="cardGrdFields"
									:gridColumns="cardGrdColumns" 
									:gridRows="payCardList" 
									:gridInit=false
									:gridCheckBar=false
                  :gridMounted="cardGridMounted"
									:style="{ height: '435px' }" 
								/>
							</div>
							<!-- E::카드결제내역 -->
						</div>
						<!-- ::E 컨텐츠2:결제유형+카드결제내역 -->

						<!-- S::컨텐츠3:메시지 -->
            <div class="con_box mt20" style="height: auto">
							<span>&nbsp;{{cardResultMessage}}</span>
						</div>
            <!-- E::컨텐츠3:메시지  -->

            <!-- S::컨텐츠:식별메시지 -->
            <div class="cardReaderMsg">{{ icReaderCehckResult }}</div>
            <!-- E::컨텐츠:식별메시지 -->

            <!-- S::btn_wrap -->
            <div class="btn_wrap bottom">
              <sui-button type="button" @click="clickBtnOk" :disabled="disabledBtnOk" class="point">{{getMessage('MSG_TXT_COMPLETE')}}</sui-button>
              <sui-button type="button" @click="clickBtnCancel" :disabled="disabledBtnCancel" class="point">{{getMessage('MSG_BTN_POP_CLOSE')}}</sui-button>
            </div>
            <!-- E::btn_wrap -->
          </div>
          <!-- ::E cardpayWrap -->
        </div>
      </template>
    </div>
  </sui-page>
</template>
<script>
import _ from 'lodash';
import WebrtcDatachannel from "~common/js/webrtc-datachannel.js";
import cardUtils from "~common/js/cardUtils/card-utils.js";

export default {
  name: "PGE_CTM_00004", // eslint-disable-line vue/name-property-casing
  components: {},
  data() {
    return {
      isLogging: false, // consle log 남기는지 여부

      //Main 결제정보
      payMainInfo: {
        payerMemshpName: "",
        payerMemshpUid: "",
        payerMemberKind: "",
        condTypeCd: "", // 제휴카드 구분
        cardCompCd: "", // 제휴카드사 코드
        dcTypeCd: "",
        joinKind: "",
        logSeq: "",
        totSaleAmt: 0,
        totPay: 0,
        notPay: 0,
        cardPay: 0,
        completeYn: "Y", // 2014.07.24 재결제 화면에서 호출한 경우에는 미결금액이 없어야 완료처리가능
      },

      //기 승인 카드결제 리스트
      oldPayCardList: [],

      //카드결제 리스트
      payCardList: [],

      //카드사별 무서명 기준 금액
      cardNoSignAmt: {},

      //카드결제정보
      cardInputTemp: {
        cardNo: "",
        nowCardNo: "",
        apprDate: "",
        totPay: 0,
        notPay: 0,
      },
      cardInputData: {
        apprAmt: "0",
        divideGigan: "",
      },
      cardApprData: {}, //카드승인 결과 데이터
      signYn: "Y",
      appCardYn: "N",
      inputMode: "A",
      easyCheckYn: "", // EasyChekck 여부
      cardTypeR: "", // 카드거래구분 R:RF카드거래
      isCardNoKeyin: false, //수기 카드 입력 여부
      nowCardApprCnt: 0,
      cardResultMessage: "",

      //IC Card Reader 정보
      icReaderCehckResult: "",
      curDt: "",
      strSwVersion: '',
      icReaderPort1: 0,
      icReaderSpeed1: 0,
      cardX: null,

      // 카드 결제 정보 Grid 세팅
      cardGridView: null,
      cardDataProvider: null,
      cardGrdFields: [],
      cardGrdColumns: [],
      cardGrdDataList: [],

      //status Kind List
      statusKindCds: [],
      statusKindNms: [],

      //login user 정보
      userInfo: null,
      userData: null,
      userId: "",
      userIp: "",

      //main과 commnucation channel util
      webrtcDatachannel: null,
      mainPage: "",
      accessDateTime: "",

      //btn disabled
      disabledBtnCardKeyin: false,
      disabledBtnAppCard: false,
      disabledBtnEasyCheck: false,
      disabledBtnIcReading: false,
      disabledBtnIcCancel : true,
      disabledBtnApproveFromKeyin: true,
      disabledBtnApprove: true,
      disabledBtnEasyCheckSearch: true,
      disabledBtnOk: true,
      disabledBtnCancel: false,

      //text disabled
      disabledTextCardNo: true,
      disabledTextApprAmt: false,
      disabledTextExpireYm: false,
      disabledTextDivideGigan: false,
      disabledTextApprNo: true,

      //datepicker
      disabledDateApprDate: true,

      //maxlength 설정
      maxlengthTextCardNo: 19,
      maskTextCardNo: "****-****-****-****",
    };
  },
  created() {
    //카드 모듈 로딩
    cardUtils.cardLoad(this);

    // 카드 결제 내역 Grid
    this.cardGrdFields = [
      {
        // 카드번호
        fieldName: "viewCardNo",
        dataType: "text",
      },
      {
        // 카드사명
        fieldName: "compCodeNm",
        dataType: "text",
      },
      {
        // 승인번호
        fieldName: "apprNo",
        dataType: "text",
      },
      {
        // 승인금액
        fieldName: "apprAmt",
        dataType: "number",
      },
      {
        // 처리상태
        fieldName: "statusKind",
        dataType: "text",
      },
    ];
    this.cardGrdColumns = [
      {
        name: "viewCardNo",
        fieldName: "viewCardNo",
        header: { text: this.getMessage('MSG_TXT_CARD_NO') },
        width: 150,
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        "textFormat": "([0-9*]{4})([0-9*]{4})([0-9*]{4})([0-9*]{4});$1-$2-$3-$4",
      },
      {
        name: "compCodeNm",
        fieldName: "compCodeNm",
        header: { text: this.getMessage('MSG_TXT_CARD_COMP_NM') },
        width: 100,
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
      {
        name: "apprNo",
        fieldName: "apprNo",
        header: { text: this.getMessage('MSG_TXT_APPR_NO') },

        width: 100,
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
      {
        name: "apprAmt",
        fieldName: "apprAmt",
        width: 100,
        header: { text: this.getMessage('MSG_TXT_APPR_AMT') },
        numberFormat: "#,##0",
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
      {
        name: "statusKind",
        fieldName: "statusKind",
        width: 100,
        sortable: false,
        lookupDisplay: true,
        values: this.statusKindCds,
        labels: this.statusKindNms,
        editor: { type: "dropdown" },
        header: { text: this.getMessage('MSG_TXT_PROC_STATUS') },
        styles: { textAlignment: "center" },
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
    ];
  },
  async mounted() {
    window.addEventListener("beforeunload", this.windowUnLoad);

    this.userInfo = window.utils.getLoginUserInfo();
    this.userData = window.utils.getLoginData();
    this.userId = window.utils.getLoginUserInfo().userId;
    this.userIp = window.utils.getLoginUserInfo().userIp;

    //카드 port, speed 정보 가져오기
    this.icReaderPort1 = cardUtils.parsePort(window.utils.getLoginUserInfo().icReaderPort);
    this.icReaderSpeed1 = cardUtils.parseSpeed(window.utils.getLoginUserInfo().icReaderSpeed);
    this.strSwVersion = window.utils.getLoginUserInfo().icSwCertifyNo;

    //카드 리스너 등록
    cardUtils.setListenerVuePage(this);
    //카드모듈 가져오기
    this.cardX = cardUtils.getCardX();

    //카드사별 무서명 기준금액 조회
    await window.http.request(this.$options.name, "DTS_CTM_00018")
      .then((res) => {
        if (res.data == null || res.data.length == 0) {
          window.utils.messageBox(
            "alert",
            this.getMessage('MSG_ALT_NO_SIGN_STD_SEARCH_ERR'),
          );
        } else {
          this.cardNoSignAmt = {};
          window.utils.forEach(res.data, (nosignAmt) => {
            this.cardNoSignAmt[nosignAmt.compCode] = nosignAmt.checkAmt;
          });
        }
      })
      .catch((error) => {
        this.trace("NoSignCheckAmtList()", error);
        return;
      });

    await window.http.getSystemTime().then(res => { this.curDt = res.nowDateTime; });
  },
  beforeDestroy() {
    this.windowUnLoad();
  },
  filters: {
    moneyPoint(value) {
      return window.utils.numberFormat(value, 0);
    },
  },
  computed: {
  },
  watch: {
    //금액 변경시
    "cardInputData.apprAmt"(newVal) {
      var notPay = this.payMainInfo.notPay + this.payMainInfo.cardPay - this.getCardAmt();
      var apprAmt = parseInt(newVal);

      if (apprAmt <= 0) {
        this.cardResultMessage = this.getMessage('MSG_ALT_INPUT_AMT_MINUS_ERR');
        return;
      } else if (notPay < apprAmt) {
        this.cardResultMessage = this.getMessage('MSG_ALT_INPUR_AMT_OVER_ERR');
      } else {
        this.cardResultMessage = "";
      }
      this.calcNotPayAmt();
    },
  },
  methods: {
    windowUnLoad() {
      this.trace("window close!!!");
      this.clearCardData();
      cardUtils.close();
      this.webrtcDatachannel.sendClose();
    },
    getMessage(messageId) {
      let messageNm = window.utils.getMessageById(messageId, this.$options.name);
      return messageNm;
    },
    receiveMessageFromMain(param) {
      if (param.type == "init") {
        //Main에서 데이터 초기 데이터 받음
        this.payMainInfo = param.data.payMainInfo;
        this.payCardList = (param.data.payCardList == null)? [] : param.data.payCardList;
        this.oldPayCardList = JSON.parse(JSON.stringify(this.payCardList));

        //승인일자를 매출일자로 세팅
        this.cardInputTemp.apprDate = window.utils.getLoginUserInfo().saleDate;

        //제휴카드 할인인 경우 금액 변경 불가
        if (this.payMainInfo.condTypeCd == "15L1") {
          this.disabledTextApprAmt = true;
        } else {
          this.disabledTextApprAmt = false;
        }

        if (
          this.payMainInfo.completeYn == null ||
          this.payMainInfo.completeYn.length == 0
        ) {
          this.payMainInfo.completeYn = "Y"; //default "Y"로 지정
        }

        //grid 데이터 세팅
        this.cardDataProvider.fillJsonData(this.payCardList, {
          fillMode: "set",
        });

        let notPay = Number(this.payMainInfo.notPay) + Number(this.payMainInfo.cardPay) - this.getCardAmt();
        this.cardInputTemp.notPay = notPay;

        //창이 앞으로 오기
        window.focus();

        //카드모듈 Open
        if (this.openCardReader()) {
          if (notPay > 0) {
            //결제금액 설정
            this.cardInputData.apprAmt = "" + notPay;

            //IC Card Read 요청
            this.checkIcCardReader();
          } else {
            //결제금액 설정
            this.cardInputData.apprAmt = "0";
            window.utils.messageBox("alert",this.getMessage('MSG_ALT_NOTPAY_ZERO_ERR'));
          }
        }
      } else if (param.type == "focus") {
        window.focus();
      }
      //결제메인에 데이터 전달 완료
      else if (param.type == "endOk" || param.type == "endCancel") {
        this.trace("receiveMessageFromMain() > endOk");
        this.closeWindow(); 
      }
    },
    //main과 채널 생성 후 callback
    initCallBack() {},
    //Main창이 닫히는 이벤트 callback
    closeMainCallBack() {
      this.closeWindow();
    },
    // cardGrid mounted 되었을때 호출
    async cardGridMounted() {
      //공통 코드 정보 로딩
      await window.http
      .getCodeList(this.pageName, ["COD_F2"], "")
      .then((res) => {
        //카드 처리상태
        window.utils.forEach(res["COD_F2"], (codeObj) => {
          this.statusKindCds.push(codeObj.codeId);
          this.statusKindNms.push(codeObj.codeName);
        });
      })
      .catch((err) => {
        this.trace(err);
      });

      //Card grid 초기화
      await ({ gridView: this.cardGridView, dataProvider: this.cardDataProvider,} = this.$refs.grdCard.initGrid());

      //Card Grid footer 안보이게 설정
      this.cardGridView.setFooters({ visible: false });

      //Card No 보이게 설정
      this.cardGridView.setRowIndicator({ visible: false });

      //Card grid style set
      this.$refs.grdCard.setFitStyle("even");

      //Main창과 인터페이스 위해 현재 페이지 등록
      this.mainPage = this.$route.query.mainPage;
      this.accessDateTime = this.$route.query.accessDateTime;
      this.webrtcDatachannel = new WebrtcDatachannel(
        this.$options.name, //thisPage
        this.mainPage, //mainPage
        this.userIp, //ip
        this.accessDateTime, // accessDateTime
        this.receiveMessageFromMain, //reciveCallback
        this.initCallBack, //initCallback
        this.closeMainCallBack //closeCallback
      );

      await this.webrtcDatachannel.initSecure();

      this.webrtcDatachannel.connect();
    },
    //카드모듈 Opn
    openCardReader() {
      return cardUtils.open(this.icReaderPort1, this.icReaderSpeed1);
    },
    checkIcCardReader() {
      //카드모듈 Open
      cardUtils.open(this.icReaderPort1, this.icReaderSpeed1);

      cardUtils.reset();

      this.cardResultMessage = this.getMessage('MSG_ALT_IC_READER_CHECK_ING');
      let strErrMsg;
      if (this.cardX.ReqCmd(0xfb, 0x11, 0x30, 0x00, strErrMsg) != 0) {
        this.writeTestResult( false, this.icReaderPort1, this.getMessage('MSG_ALT_CHECK_REQ_ERR'), this.strReaderId);
        return;
      }
    },
    getIcCardUnitInfo() {
      // ic card 단말기 정보 수집
      this.cardResultMessage = this.getMessage('MSG_ALT_IC_READER_INFO_REQ_ING');
      let strErrMsg;
      if (this.cardX.ReqCmd(0xfb, 0x11, 0x02, 0x00, strErrMsg) != 0) {
        this.writeTestResult(false, this.icReaderPort1, this.getMessage('MSG_ALT_INFO_REQ_ERR'));
        return;
      }
    },
    //카드 리더기에 IC 리딩 명령어 전송
    async sendReqCmd() {
      this.cardInputTemp.cardNo = "";
      this.trace(`this.disabledBtnCardKeyin=>[${this.disabledBtnCardKeyin}]`);
      this.trace(`this.disabledBtnApprove=>[${this.disabledBtnApprove}]`);

      await window.http.getSystemTime().then((res) => {
        this.curDt = res.nowDateTime;
      });
      this.trace("this.curDt:" + this.curDt);
      // 카드리더기로 전송하는 cmd 정의
      //거래 구분자           AN      1 	“0” : 신용 , “1” : 교통
      //거래 종류             AN      1   “0” : 구매 , “1” : 취소
      //거래 일시             AN      14  YYYYMMDDHHMMSS
      //거래 금액             AN      9   Right Justfy
      //단말기 ID             AN      8   단말기 ID(TID) :“0”으로 Padding 8자리가 넘는 경우 8자리까지만 사용
      //EMV PIN 설정          AN      1   “1” : PIN 입력, “2” : PIN 입력 안 함 (ED-946은 사용안함) “3” : 은련만 PIN 입력
      //Card Input 설정       AN      1   “1” : MS/IC, “2” : Only MS, “3” : Only IC( 기능 Disable )
      //EMV MS거래 허용 여부  AN      1   “1” : MS거래허용, “2” : MS거래불가( 기능 Disable )
      let textApprAmt = window.utils.trim("" + this.cardInputData.apprAmt);
      textApprAmt =
        window.utils.space(9 - textApprAmt.length, "0") + textApprAmt;
      //let icReaderId = this.icReaderId; // 단말기 정보는 Login 시점에 받아온다.
      let icReaderId = "0700081";
      icReaderId = window.utils.space(8 - icReaderId.length, "0") + icReaderId;

      let strSendData =
        "0" + // 신용
        "0" + // 구매
        this.curDt + // 거래일시 : yyyyMMddhhmmss 형태의 날짜시간
        textApprAmt + // 20180312 거래금액
        icReaderId + // 단말기 정보는 Login 시점에 받아온다.  : test data
        "2" +
        "1" +
        "1" +
        this.getRandomKey(); //-- 인코딩 작업을 위한 랜덤데이터

      try {
        //카드 리더기 초기화
        cardUtils.reset();

        // Cmd : 0xFB, GCD : 0x11, SCD : 0x20
        let errMsg;
        let ret = this.cardX.ReqCmd(parseInt("FB", 16), parseInt("11", 16), parseInt("20", 16), strSendData, errMsg);
        if (ret != 0) {
          window.utils.messageBox("alert", `${this.getMessage('MSG_ALT_IC_READER_APPR_REQ_ERR')}[${ret}]`);
          this.openCardReader();
          return;
        }

        this.trace(
          "PGE_CTM_0004 sendReqCmd:[" + this.cardInputData.apprAmt + "]"
        );
      } catch (e) {
        alert(e);
      }
    },
    sendReqSign(apprAmt) {
      // 전자 Sign 장비에 사인 요청
      this.trace(`전자서명 장비에 사인 요청[apprAmt=${apprAmt}]`);

      //카드 리더기 초기화
      cardUtils.reset();

      //Sign창 보여주기
      cardUtils.showSignView();

      var errMsg;
      let ret = this.cardX.ReqSignA(2, "0700081", apprAmt, "", "", errMsg);
      if (ret != 0) {
        this.trace("전자서명 장비에 사인 요청 실패");
        //Sign창 숨기기
        cardUtils.hideSignView();

        window.utils.messageBox( "confirm", `[ReqSignA]${this.getMessage('MSG_ALT_ESIGN_RETRY_CONFRIM')}`, null,
          (/* ok */) => {
            this.trace("전자서명 재시도 요청");
            this.openCardReader();
            this.sendReqSign(apprAmt);
          },
          (/* cancel */) => {
            this.trace("전자서명 재시도 요청 취소");

            //완료 처리
            this.cardApprData.signRtn = "";
            this.signComplete();
          }
        );
      }
    },
    //카드 제거 했는지 여부 체크
    sendReqCardRemove() {
      console.log("sendReqCardRemove call!");
      //카드 리더기 초기화
      cardUtils.reset();

      let strSendData = "01"; //카드 삽입유무 체크
      var errMsg;
      let ret = this.cardX.ReqCmd( parseInt("FB", 16), parseInt("11", 16), parseInt("32", 16), strSendData, errMsg);
      console.log("sendReqCardRemove.ret=>", ret);
      if (ret != 0) {
        window.utils.messageBox("confirm", this.getMessage('MSG_ALT_CARD_REMOVE_CHECK_RETRY_CONFRIM'), null,
          (/* ok */) => {
            this.trace("카드 제거 여부를 체크 재요청");
            this.openCardReader();
            this.sendReqCardRemove();
          },
          (/* cancel */) => {
            this.trace("카드 제거 여부 체크 실패");

            //완료 처리
            this.signComplete(true);
          }
        );
      }
    },
    OnRcvData(Cmd, GCD, JCD, RCD, RData, RHexData) {
      console.log("PGE_CTM_0004 cardX_OnRcvData");
      console.log(`==>Cmd:[${Cmd}]`);

      //전자서명 응답
      if (Cmd == parseInt("A7", 16)) {
        this.OnRcvDataSign();
      }
      //카드 리딩
      else if (Cmd == parseInt("FB", 16) && GCD == parseInt("11", 16) && JCD == parseInt("20", 16)) {
        this.OnRcvDataIcReading(GCD, JCD, RCD, RData, RHexData);
      }
      //수기입력 ic card format으로 변경
      else if (Cmd == parseInt("FB", 16) && GCD == parseInt("11", 16) && JCD == parseInt("26", 16)) {
        this.OnRcvDataCardKeyin(GCD, JCD, RCD, RData, RHexData);
      }
      //카드 제거 여부 체크
      else if (Cmd == parseInt("FB", 16) && GCD == parseInt("11", 16) && JCD == parseInt("32", 16)) {
        this.OnRcvDataCardRemove(GCD, JCD, RCD, RData, RHexData);
      }
      else {
        this.OnRcvDataIcReader(Cmd, GCD, JCD, RCD, RData);
      }
    },
    //카드리더기 사인응답 처리
    OnRcvDataSign() {
        console.log("OnRcvDataSign");
        // SignPad에서 확인 버튼 클릭 시
        if (this.cardX.SignLen != null && this.cardX.SignLen.length > 4000) {
          //Sign창 숨기기
          cardUtils.hideSignView();

          window.utils.messageBox("alert", this.getMessage('MSG_ALT_ESIGN_DATA_LEN_OVER_ERR'), null, () => {
              let apprAmt = parseInt(
                window.utils.trim(this.cardInputData.apprAmt)
              );
              this.sendReqSign(apprAmt);
            });
          return;
        }

        this.disabledTextCardNo = true;
        this.disabledTextApprAmt = true;
        this.disabledTextExpireYm = true;
        this.disabledTextDivideGigan = true;

        // 전자서명 : Y
        this.cardApprData.signRtn = this.cardX.Sign;
        this.signComplete();

        //카드 리더기 초기화
        cardUtils.reset();

        //Sign창 숨기기
        cardUtils.hideSignView();
    },
    // 카드리더기 IC Reading 입력 처리
    OnRcvDataIcReading(GCD, JCD, RCD, RData, RHexData) {
        console.log("OnRcvDataIcReading");
        this.trace(`==>GCD     :[${GCD}]`);
        this.trace(`==>JCD     :[${JCD}]`);
        this.trace(`==>RData   :[${RData}]`);
        this.trace(`==>RCD     :[${parseInt(RCD, 10)}]`);
        this.trace(`==>RHexData:[${RHexData}]`);
        this.trace(`==>EMV     :[${this.cardX.Emv}]`);

        let lvTemp = RData; // 임시변수로 수정 20171207
        RData = "";
        let sCardType = lvTemp.substr(0, 1);
        let lvEmvYn = "N";
        let lvEmv = "";
        let lvSecuData = "";
        let lvFallBackCode = "00";

        // 단말기 IC/MSR/RF 읽기 요청에 대한 응답
        if (RCD == parseInt("02", 16)) {
          this.trace("Track II Data & IC/EMV Data 수신");
          if (lvTemp.length <= 56) {
            // ed947 모델의 경우 2번 전송 -- 처음 수신되는 데이터는 무시 (카드번호만 수신)
            this.trace("ed947 모델 경우 1번 전송 data skip");
            return;
          }

          this.isCardNoKeyin = false;

          //edtCardNo.UserData = "";   // 수기 입력 처리하는 경우 userdata 를 reset
          switch (sCardType) {
            case "C":
              lvEmv = this.cardX.Emv.toString().substr(1); // emv data
              lvEmvYn = "Y";
              this.inputMode = "I"; // IC Card
              break;
            case "M": // MS 카드인 경우, Samsung Pay 인 경우
              if (lvTemp.substr(1, 1) == "F") {
                // fallback 거래인 경우 fallback 사유코드를 전송
                var fallBackCode = lvTemp.substr(2, 1);
                lvFallBackCode = window.utils.space(2 - fallBackCode.length, "0") + fallBackCode;
                this.inputMode = "F"; // Fallback
              } else {
                // Samsung pay 인 경우 inputMod
                // 수기입력 카드정보를 받을 때 M으로 입력됨
                if (this.inputMode != "@") {
                  this.inputMode = "A";
                }
              }
              break;

            case "R": //  RF CARD 인 경우
            case "I":
              this.cardInputData.rfCardType = sCardType; // 거래구분    'R' – (RF거래), 'I'(IR 거래)
              this.cardInputData.rfTelecom = lvTemp.substr(1, 1); // 이통사구분  SKT : “S”, KTF : “K” , LGT : “L”
              this.cardInputData.rfType = lvTemp.substr(2, 1); // 카드방식    Mobile : M , Plastic : P
              this.cardInputData.rfFlag = lvTemp.substr(3, 1); // 카드종류    Visa Wave 'V' , Pay pass(마스터) : 'P' , Mifare : ‘M’ BC모바일 ‘L’, qVDC ‘q’
              this.cardInputData.rfDongle = lvTemp.substr(4, 1); // CVM        “0” : NO CVM (NO Pin, No Sign) “1”: Signature 필요 “2”: Pin 필요
              this.cardInputData.rfTerm = "B";
              this.inputMode = "R"; // RF
              break;
          }
          this.cardInputTemp.cardNo = window.utils.trim(lvTemp.substr(6, 38).toString()); // ic 카드에서 읽어온 카드정보를 설정
          this.trace("this.cardInputTemp.cardNo=>[" + this.cardInputTemp.cardNo + "]");

          lvSecuData = "SECU" + lvTemp.substr(46, 8) + lvTemp.substr(60, 86);

          this.cardInputData.fallBackCode = lvFallBackCode; // card input data 에 fallback code 추가
          this.cardInputData.emvYn = lvEmvYn; // emv 여부
          this.cardInputData.emv = lvEmv; // EMV Data
          this.cardInputData.secuData = lvSecuData; // SECU Data

          this.trace("FALL_BACK_CODE1:[" + lvFallBackCode + "]");
          this.trace("EMV_YN1:[" + lvEmvYn + "]");
          this.trace("EMV1:[" + lvEmv + "]");
          this.trace("SECU_DATA1:[" + lvSecuData + "]");
          this.trace("btnApprove.Enable = true");

          this.disabledBtnApprove = false; // 20180401
          this.disabledBtnIcReading = false;
          this.disabledBtnIcCancel = true;
          if (this.payMainInfo.condTypeCd == "15L1") {
            this.disabledTextDivideGigan = true;
          } else {
            this.disabledTextDivideGigan = false;
          }

          this.blurCardNo(); //카드번호 변경 이벤트 호출
        } else {
          this.OnRcvDataIcReadingError(RCD, lvTemp);
        }

        lvTemp = "";
        RData = ""; // RDATA Reset  추가 : 2017.08
        lvEmv = "";
        lvSecuData = "";
    },
    // 카드리더기 IC Reading 입력시 오류 메시지 처리
    OnRcvDataIcReadingError(RCD, lvTemp) {
      console.log("OnRcvDataIcReadingError");
      if (RCD == parseInt("F3", 16)) {
        this.cardResultMessage = this.getMessage('IC_READING_NOT_ALLOW');
      } else if (RCD == parseInt("F4", 16)) {
        this.cardResultMessage = this.getMessage('MSG_ALT_MS_SWIPE_NOT_ALLOW');
        this.disabledBtnIcReading = false;
      } else if (RCD == parseInt("FF", 16)) {
        this.cardResultMessage = this.getMessage('MSG_ALT_OTHER_CARD_REQ');
        this.disabledBtnIcReading = false;
      } else {
        this.cardResultMessage = lvTemp;
        this.disabledBtnIcReading = false;
      }
    },
    // 카드리더기 수기입력 카드 암호화 처리
    OnRcvDataCardKeyin(GCD, JCD, RCD, RData, RHexData) {
      console.log("OnRcvDataCardKeyin");
      this.trace(`==>GCD     :[${GCD}]`);
      this.trace(`==>JCD     :[${JCD}]`);
      this.trace(`==>RData   :[${RData}]`);
      this.trace(`==>RCD     :[${parseInt(RCD, 10)}]`);
      this.trace(`==>RHexData:[${RHexData}]`);
      this.trace(`==>EMV     :[${this.cardX.Emv}]`);

      let lvTemp = RData; // 임시변수로 수정 20171207
      RData = "";
      let sCardType = lvTemp.substr(0, 1);
      let lvEmvYn = "N";
      let lvEmv = "";
      let lvSecuData = "";
      let lvFallBackCode = "00";

      if (RCD == parseInt("02", 16)) {
        if (lvTemp.length <= 56) {
          //  20180313 ed947 모델의 경우 2번 전송 -- 처음 수신되는 데이터는 무시 (카드번호만 수신)
          this.this.trace("ed947 모델 경우 1번 전송 data skip");
          return;
        }

        if (sCardType == "M" || this.inputMode == "@") {
          if (this.inputMode != "@") {
            this.isCardNoKeyin = false;
          }
          this.trace("lvTemp => [" + lvTemp + "]");
          this.cardInputTemp.cardNo = window.utils.trim(
            lvTemp.substr(6, 38).toString()
          ); // ic 카드에서 읽어온 카드정보를 설정
          this.cardInputData.readCardData = window.utils.trim(
            lvTemp.substr(6, 38).toString()
          );

          lvSecuData = "SECU" + lvTemp.substr(46, 8) + lvTemp.substr(60, 86);

          this.cardInputData.fallBackCode = lvFallBackCode; // card input data 에 fallback code 추가
          this.cardInputData.emvYn = lvEmvYn; // emv 여부
          this.cardInputData.emv = lvEmv; // EMV Data
          this.cardInputData.secuData = lvSecuData; // SECU Data

          this.blurCardNo();

          this.cardInputData.cardNo = this.cardInputTemp.cardNo;
          this.trace(
            "this.cardInputTemp.cardNo => [" + this.cardInputTemp.cardNo + "]"
          );
          this.trace(
            "this.cardInputData:" + JSON.stringify(this.cardInputData)
          );

          //카드승인 서버 호출
          this.clickBtnApprove();
        }
      } else {
        this.OnRcvDataCardKeyinError(RCD, lvTemp);
      }

      lvTemp = "";
      RData = ""; // RDATA Reset  추가 : 2017.08
      lvEmv = "";
      lvSecuData = "";
    },
    // 카드리더기 수기입력 카드 암호화 오류 메시지 처리
    OnRcvDataCardKeyinError(RCD, lvTemp) {
      console.log("OnRcvDataCardKeyinError");
      if (RCD == parseInt("F3", 16) || RCD == parseInt("F4", 16)) {
        this.cardResultMessage = "";
      } else if (RCD == parseInt("FF", 16)) {
        this.cardResultMessage = lvTemp;
        this.disabledBtnIcReading = false;
      } else {
        this.cardResultMessage = lvTemp;
        this.disabledBtnIcReading = false;
      }
    },
    // 카드리더기 카드 제거 여부 처리
    OnRcvDataCardRemove(GCD, JCD, RCD, RData, RHexData) {
      console.log("OnRcvDataCardRemove");
      this.trace(`==>GCD     :[${GCD}]`);
      this.trace(`==>JCD     :[${JCD}]`);
      this.trace(`==>RData   :[${RData}]`);
      this.trace(`==>RCD     :[${parseInt(RCD, 10)}]`);
      this.trace(`==>RHexData:[${RHexData}]`);
      this.trace(`==>EMV     :[${this.cardX.Emv}]`);

      if (RCD == parseInt("00", 16)) {
        if (RData == "011") {
          //카드리스트 추가전 카드제거 여부 확인했으나, 카드리스트 추가하고 카드제거확인하는 것으로 변경 2023.08.18
            //완료 처리
          //this.signComplete(true);
        } else if (RData == "010") {
          this.trace("카드가 제거되지 않았습니다.");
          window.utils.messageBox("alert", this.getMessage('MSG_ALT_CARD_REMOVE_REQ'), null,
            () => {
              this.sendReqCardRemove();
            }
          );
        }
      } else {
        window.utils.messageBox("confirm", this.getMessage('MSG_ALT_CARD_REMOVE_CHECK_RETRY_CONFRIM'), null,
          (/* ok */) => {
            this.trace("카드 제거 여부를 체크 재요청");
            this.openCardReader();
            this.sendReqCardRemove();
          },
          (/* cancel */) => {
            this.trace("카드 제거 여부 체크 실패");

            //카드리스트 추가전 카드제거 여부 확인했으나, 카드리스트 추가하고 카드제거확인하는 것으로 변경 2023.08.18
            //완료 처리
            //this.signComplete(true);
          }
        );
      }
    },
    //카드리더기 무결성 체크 관련 처리
    OnRcvDataIcReader(Cmd, GCD, JCD, RCD, RData) {
      console.log("OnRcvDataIcReader");
      this.trace("OnRcvDataIcReader.Cmd:",Cmd);
      this.trace("OnRcvDataIcReader.GCD:",GCD);
      this.trace("OnRcvDataIcReader.JCD:",JCD);
      this.trace("OnRcvDataIcReader.RCD:",RCD);
      this.trace("OnRcvDataIcReader.RData:",RData);
      //무결성 검사
      if (Cmd == 0xfb && GCD == 0x11 && JCD == 0x30 && RCD == 0x00) {
        this.OnRcvDataIcReaderCheck(RData);
      } 
      //단말기 정보 수집
      else if (Cmd == 0xfb && GCD == 0x11 && JCD == 0x02) {
        this.OnRcvDataIcReaderInfo(RCD, RData);
      }
    },
    //카드리더기 무결성 체크 결과 처리
    OnRcvDataIcReaderCheck(RData) {
      console.log("OnRcvDataIcReaderCheck");
      if (RData.substring(0, 1) != "G") {
        this.writeTestResult( false, this.icReaderPort1, this.getMessage('MSG_ALT_IC_READER_CHECK_FAIL'), this.strReaderId);
      } else {
        this.getIcCardUnitInfo();
      }
    },
    //카드리더기 정보 수집 처리
    OnRcvDataIcReaderInfo(RCD, RData) {
      console.log("OnRcvDataIcReaderInfo");
      if (RCD != 0x00) {
        // 단말기정보 수집 2
        this.strReaderId = "";
        this.writeTestResult(false, this.icReaderPort1, this.getMessage('MSG_ALT_IC_READER_INFO_FAIL'), this.strReaderId);
        window.cardUtils.close();
      } else {
        this.strReaderId = RData.substring(47, 63);
        this.writeTestResult(true, this.icReaderPort1, this.getMessage('MSG_ALT_IC_READER_CHECK_SUCCESS'), this.strReaderId);
        
      }
    },
    OnMessage(Msg) {
      this.trace("OnMessage:Msg:" + Msg);
    },
    //Sign Pad 창에서 취소 버튼 클릭시
    clickBtnSignPadCancel() {
      //Sign창 숨기기
      cardUtils.hideSignView();
      //완료 처리
      this.cardApprData.signRtn = "";
      this.signComplete();
    },
    //수기입력 버튼 클릭
    clickBtnCardKeyin() {
      cardUtils.reset();

      let apprAmt = this.cardInputData.apprAmt;
      //cardInputData 초기화
      this.initCardInputData();
      this.cardInputData.apprAmt = apprAmt;

      this.disabledTextApprAmt = true;

      //카드번호 설정
      this.maxlengthTextCardNo = 19;
      this.maskTextCardNo = "****-****-****-****";

      this.inputMode = "@"; //수기입력
      this.appCardYn = "N"; // app card 설정
      this.cardInputTemp.cardNo = ""; //카드번호 저장 변수 초기화
      this.cardInputTemp.nowCardNo = ""; //카드번호 저장 변수 초기화
      this.isCardNoKeyin = true; // 수기입력모드 설정

      this.disabledTextExpireYm = false;

      if (this.payMainInfo.condTypeCd == "15L1") {
        this.disabledTextDivideGigan = true;
      } else {
        this.disabledTextDivideGigan = false;
      }

      //버튼 설정
      this.disabledBtnCardKeyin = false;
      this.disabledBtnAppCard = false;
      this.disabledBtnEasyCheck = false;
      this.disabledBtnIcReading = false;
      this.disabledBtnIcCancel = true;
      this.disabledBtnApproveFromKeyin = false;
      //this.disabledBtnCancel = false;
      this.disabledBtnApprove = true;

      //카드번호 활성화
      this.disabledTextCardNo = false;

      //원승인일자, 승인번호 비활성화
      this.cardInputData.apprDate = "";
      this.cardInputData.apprNo = "";
      this.disabledTextApprNo = true;
      this.disabledDateApprDate = true;

      //카드번호에 Focus
      this.cardInputTemp.cardNo = "";
      this.cardInputTemp.nowCardNo = "";
      setTimeout(() => {
        this.$refs.cardNo.setFocus();
      }, 1);
    },
    //APP카드 버튼 클릭
    clickBtnAppCard() {
      this.cardX.ReqReSet();

      //카드번호 설정
      this.maxlengthTextCardNo = 24;
      this.maskTextCardNo = "****-****-****-*********";

      this.inputMode = "A"; // SWIPE -> APP 카드는 SWIPE으로 처리 : 2017.09 ICCard Reader 변경
      this.appCardYn = "Y"; // app card 설정
      this.cardInputTemp.cardNo = ""; //카드번호 저장 변수 초기화
      this.cardInputTemp.nowCardNo = ""; //카드번호 저장 변수 초기화

      this.disabledTextCardNo = false;
      this.disabledTextApprAmt = false;
      this.disabledTextExpireYm = false;

      if (this.payMainInfo.condTypeCd == "15L1") {
        this.disabledTextDivideGigan = true;
      } else {
        this.disabledTextDivideGigan = false;
      }

      //버튼 설정
      //this.disabledBtnCancel = false;
      this.disabledBtnCardKeyin = false;
      this.disabledBtnApproveFromKeyin = true;
      this.disabledBtnAppCard = false;
      this.disabledBtnEasyCheck = false;
      this.disabledBtnIcReading = false;
      this.disabledBtnIcCancel = true;

      //원승인일자, 승인번호 비활성화
      this.disabledDateApprDate = true;
      this.disabledTextApprNo = true;

      //원승인일자, 승인번호 초기화
      this.cardInputData.apprDate = "";
      this.cardInputData.apprNo = "";

      //카드번호에 Focus
      this.cardInputTemp.cardNo = "";
      this.cardInputTemp.nowCardNo = "";
      setTimeout(() => {
        this.$refs.cardNo.setFocus();
      }, 1);
    },
    //EasyCheck 버튼 클릭
    clickBtnEasyCheck() {
      this.trace("clickBtnEasyCheck() call!!");

      cardUtils.reset();

      //easy Check 여부 설정
      this.easyCheckYn = "Y";

      // 버튼 설정
      this.disabledBtnApprove = true;
      this.disabledBtnApproveFromKeyin = true;
      this.disabledBtnIcReading = false;
      this.disabledBtnIcCancel = true;
      this.disabledBtnEasyCheckSearch = false;

      // text 설정
      this.disabledTextCardNo = false;
      this.disabledTextApprAmt = false;
      this.disabledTextExpireYm = false;
      this.disabledTextDivideGigan = false;
      this.disabledDateApprDate = false;
      this.disabledTextApprNo = false;

      //카드번호 설정
      this.maxlengthTextCardNo = 19;
      this.maskTextCardNo = "****-****-****-****";

      //카드정보 초기화
      this.cardInputTemp.cardNo = "";
      this.cardInputTemp.nowCardNo = "";

      this.cardInputTemp.cardNo = "";
      this.cardInputTemp.nowCardNo = "";
      setTimeout(() => {
        this.$refs.cardNo.setFocus();
      }, 1);
    },
    //수기승인 버튼 클릭
    clickBtnApproveFromKeyin() {
      var ret = this.checkCardInputData(true);
      if (ret) {
        // 수기입력시 유효기간 및 카드번호를 ICCard Reader에 전송하여 암호화된 Data를 받는다,
        let seedKey = this.getRandomKey(); // seedkey 는 임의로 설정
        let yy = this.cardInputData.expireYm.substr(2, 2);
        let mm = this.cardInputData.expireYm.substr(0, 2);

        // Key In 할 경우 유효기간은 MMYY가 아니라 YYMM으로 설정해서 입력해야 한다.
        let keyInData = this.cardInputTemp.nowCardNo + "=" + yy + mm;

        this.trace("keyInData:[" + keyInData + "]");
        let errMsg;
        let ret = this.cardX.ReqEncKeyInData(seedKey, keyInData, errMsg);
        this.trace("clickBtnApproveFromKeyin() > ret=>[" + ret + "]");
      }
    },
    //승인 버튼 클릭
    clickBtnApprove() {
      this.trace("clickBtnApprove call");

      var ret = this.checkCardInputData();
      if (ret) {
        //수기입력시
        if (this.inputMode == "@") {
          this.cardInputData.emvYn = "N"; // emv 여부
          this.cardInputData.emv = ""; // EMV Data
          this.cardInputData.fallBackCode = "00"; // FALL_BACK_CODE
          this.cardInputData.readCardData = this.cardInputTemp.nowCardNo;
          //dsCardInput.SetColumn(0, "READ_CARD_DATA", dsCardInput.GetColumn(0, "CARD_NO"));
        }
        this.cardInputData.logSeq = this.payMainInfo.logSeq;
        this.cardInputData.cardSvcCd = this.payMainInfo.cardSvcCd;
        this.cardInputData.inputMode = this.inputMode;
        this.cardInputData.easyCheck = "A";

        this.disabledBtnEasyCheck = true;
        this.disabledBtnEasyCheckSearch = true;
        this.disabledBtnApprove = true;
        this.disabledBtnOk = true;
        //this.disabledBtnCancel = true;
        this.disabledBtnIcReading = true;
        this.disabledBtnApproveFromKeyin = true;

        this.disabledDateApprDate = true;
        this.disabledTextApprNo = true;

        //20171214
        if (
          this.cardInputData.readCardData != null &&
          this.cardInputData.readCardData.indexOf("=") > 0
        ) {
          this.cardInputData.readCardData =
            this.cardInputData.readCardData.substring(
              0,
              this.cardInputData.readCardData.indexOf("=")
            );
        }

        this.trace("clickBtnApprove =>", JSON.stringify(this.cardInputData));

        //카드승인 서버 요청
        window.http
          .request(this.$options.name, "DTS_CTM_00017", {
            data: this.cardInputData,
          })
          .then((res) => {
            this.trace("res", res);
            if (res.data == null || res.data.reResponseCd == null || res.data.reResponseCd.length == 0
            ) {
              if (res.data != null) {
                this.trace(`승인실패 응답메시지 : [${this.getMessage('MSG_ALT_SERVER_ERR')}]${res.data.reCardResponseMsg}`);
                this.cardResultMessage = `[${this.getMessage('MSG_ALT_SERVER_ERR')}]${res.data.reCardResponseMsg}`;
              } else {
                this.trace("승인실패 응답메시지 : 정기권 서버 오류");
                this.cardResultMessage = `[${this.getMessage('MSG_ALT_SERVER_ERR')}]${this.getMessage('MSG_ALT_CTS_SERVER_ERR')}`;
              }

              //버튼 세팅
              this.disabledBtnEasyCheck = false;
              this.disabledBtnEasyCheckSearch = true;
              this.disabledBtnApprove = false;
              this.disabledBtnOk = false;
              //this.disabledBtnCancel = false;
              this.disabledBtnIcReading = false;

              //Text, Date 세팅
              this.disabledTextApprNo = false;
              this.disabledDateApprDate = false;
              return;
            }

            this.cardApprData = res.data;

            this.cardResultMessage = `[${this.cardApprData.reResponseCd}]${this.cardApprData.reCardResponseMsg}`;
            let compCode = window.utils.trim(this.cardInputData.compCode);
            let apprAmt = parseInt(
              window.utils.trim(this.cardInputData.apprAmt)
            );
            let divideGigan = parseInt(
              window.utils.trim(this.cardInputData.divideGigan)
            );

            // 신용카드 승인
            if (this.cardApprData.reResponseCd == "0000") {
              this.trace("clickBtnApprove 카드승인완료!!!!");
              // 승인 정상 처리 시
              /* 
                  1) 전자사인 추가                              -- 2008.05.15 hjlee
                    - argument :할부개월, 결제금액
                    - return : signpad return 값(1) + 전자서명 데이터 ('NONE' : 정상처리가 아닐 경우 )
                  2) 삼성카드 결제금액 5만원 이하 무서명 추가   -- 2009.06.09 hjlee
              */

              /*
                  2014.06.13 무서명 체크 로직
                  1단계. 할부개월 체크 : 할부개월이 1보다 크면 무서명 불가(일시불일때만 무서명가능)
                  2단계. 공통코드 체크 : WEBPOS RCO0009T 공통코드(50018)에서 무서명 대상 카드사와 
                                          상한금액 확인, 무서명 대상인 경우에는 결제금액이 상한 금액보다 
                                          작거나 같으면 무서명, 많으면 서명
                  3단계. 신한카드 체크 : 당일 EL/CB 합산 기준 금액 이하 3회까지는 무서명, 그외에는 전부 서명
              */
              // 서명을 기본으로 처리한다.
              let signCheck = true;

              if (divideGigan > 1) {
                signCheck = true; // 할부개월 체크, 서명
              } else {
                let checkAmt = this.cardNoSignAmt[compCode];
                if (checkAmt != null && checkAmt.length > 0) {
                  // 공통코드 체크 ( 기준 금액 이하인 경우 )
                  if (apprAmt <= parseInt(checkAmt)) {
                    if (compCode == "0005") {
                      // 신한카드 3회까지는 무서명
                      this.trace(`shinhanCathis.cardApprData.shinhanCardApprCnt:${this.cardApprData.shinhanCardApprCnt}`);
                      if (parseInt(this.cardApprData.shinhanCardApprCnt) < 3) {
                        signCheck = false;
                      } else {
                        signCheck = true;
                      }
                    } else {
                      signCheck = false;
                    }
                  } else {
                    signCheck = true;
                  }
                }
              }

              this.trace(`this.cardApprData.reApproveNo    :[${this.cardApprData.reApproveNo}]`);
              this.trace(`this.cardApprData.reApproveVanFg :[${this.cardApprData.reApproveVanFg}]`);
              this.trace(`this.cardApprData.reApproveDate  :[${this.cardApprData.reApproveDate}]`);
              this.trace(`this.cardApprData.reApproveTime  :[${this.cardApprData.reApproveTime}]`);
              this.trace(`this.cardApprData.reTranUniqueNbr:[${this.cardApprData.reTranUniqueNbr}]`);
              this.trace(`this.cardApprData.reCardTypeFlag :[${this.cardApprData.reCardTypeFlag}]`);
              this.trace(`this.cardApprData.reGiftRemainAmt:[${this.cardApprData.reGiftRemainAmt}]`);
              
              if (signCheck) {
                // 전자 서명 처리인 경우
                if (this.signYn == "Y") {
                  this.trace("전자서명 시작");
                  // 전자 사인 요청

                  //사인패드 보여주는 처리 필요
                  //divSign.Visible = true;

                  this.disabledTextCardNo = true;
                  this.disabledTextApprAmt = true;
                  this.disabledTextExpireYm = true;
                  this.disabledTextDivideGigan = true;

                  //this.disabledBtnCancel = false; //20180401

                  this.sendReqSign(apprAmt);
                } else {
                  // 사인을 받지 않는 경우에도 영수증에 수기서명 : N
                  this.trace("수기서명");
                  this.cardApprData.signRtn = "";
                  this.signComplete();
                }
              } else {
                // 무서명 : X
                this.trace("무서명");
                this.cardApprData.signRtn = "2";
                this.signComplete();
              }
            } else {
              // 실패 시..
              this.trace(
                `승인실패 응답코드:[${this.cardApprData.reResponseCd}]${res.data.reCardResponseMsg}`
              );
              this.cardResultMessage = `[${this.cardApprData.reResponseCd}]${res.data.reCardResponseMsg}`;

              this.disabledBtnEasyCheck = false;
              this.disabledBtnEasyCheckSearch = true;
              this.disabledBtnApprove = false;
              this.disabledBtnOk = false;
              //this.disabledBtnCancel = false;
              this.disabledBtnIcReading = false;
              this.disabledBtnIcCancel = true;

              this.disabledTextApprNo = false;
              this.disabledDateApprDate = false;
            }
          })
          .catch((error) => {
            this.cardResultMessage = `[${this.getMessage('MSG_ALT_CARD_APPR_FAIL')}]${this.getMessage('MSG_ALT_CTS_SERVER_ERR')}`;
            this.trace("clickBtnApprove()", error);
            this.disabledBtnEasyCheck = false;
            this.disabledBtnEasyCheckSearch = true;
            this.disabledBtnApprove = false;
            this.disabledBtnOk = false;
            //this.disabledBtnCancel = false;
            this.disabledBtnIcReading = false;
            this.disabledBtnIcCancel = true;

            this.disabledTextApprNo = false;
            this.disabledDateApprDate = false;
            return;
          });
      }
    },
    //EasyCheck 조회
    clickBtnEasyCehckSearch() {
      this.searchEasyCheckData();
    },
    //IC리딩 버튼 클릭
    clickBtnIcReading() {
      this.trace("clickBtnIcReading() call!!");

      this.appCardYn = "N";
      this.easyCheckYn = "N";
      this.isCardNoKeyin = false;
      this.inputMode = "A";

      //버튼 설정
      this.disabledBtnApprove = true;
      this.disabledBtnApproveFromKeyin = true;
      this.disabledBtnCardKeyin = false;
      this.disabledBtnAppCard = false;
      this.disabledBtnEasyCheck = false;
      this.disabledBtnEasyCheckSearch = true;
      this.disabledBtnIcReading = false;
      this.disabledBtnIcCancel = false;

      //text설정
      this.disabledTextCardNo = true;
      this.disabledTextApprAmt = true;
      this.disabledTextExpireYm = true;

      //카드번호 설정
      this.maxlengthTextCardNo = 19;
      this.maskTextCardNo = "****-****-****-****";

      //잔액 초기화
      this.calcNotPayAmt();

      //IC 리딩 호출
      this.sendReqCmd();
    },
    //IC리딩취소 버튼 클릭
    clickBtnIcCancel() {
      this.trace("clickBtnIcCancel() call!!");

      //버튼 설정
      this.disabledBtnApprove = true;
      this.disabledBtnApproveFromKeyin = true;
      this.disabledBtnCardKeyin = false;
      this.disabledBtnAppCard = false;
      this.disabledBtnEasyCheck = false;
      this.disabledBtnEasyCheckSearch = true;
      this.disabledBtnIcReading = false;
      this.disabledBtnIcCancel = true;

      //text설정
      this.disabledTextCardNo = true;
      this.disabledTextApprAmt = false;
      this.disabledTextExpireYm = true;

      //카드번호 설정
      this.maxlengthTextCardNo = 19;
      this.maskTextCardNo = "****-****-****-****";

      //잔액 초기화
      this.calcNotPayAmt();

      cardUtils.reset();
    },
    //완료 버튼 클릭
    clickBtnOk() {
      this.trace("clickBtnOk() call!");

      cardUtils.reset();

      // 카드번호 초기화
      this.cardInputTemp.cardNo = "";
      this.cardInputTemp.noCardNo = "";

      // 완료 버튼 클릭 시
      if (this.payCardList.length > 0) {
        if (this.payMainInfo.completeYn == "N") {
          // 재결제 화면에서 호출한 경우에는 해당 변수값이 N 으로 들어온다.
          // completeYn = 'N' 인 경우에는 미결금액이 없어야만 완료처리가 가능하다.
          // 20170412 재결제시 미결금액 차감 오류 수정
          // 복합 결제건은 카드 재결제가 안되는지 확인 필요 그렇지 않으면 아래 로직 이상함.
          let cardAmt = this.getCardAmt();
          let notPay =
            this.payMainInfo.notPay + this.payMainInfo.cardPay - cardAmt;
          if (notPay > 0 || this.payMainInfo.totPay - cardAmt > 0) {
            window.utils.messageBox("alert", this.getMessage('MSG_ALT_REPAY_EXIST_NOTPAY_AMT'), null,
              () => {
                this.$refs.cardNo.setFocus();
              }
            );
            this.trace("재결제 처리시에는 미결금액 모두를 결제완료처리하여 주십시오.");
            return;
          }
        }

        //결제 메인에 카드승인리스트 전송
        let msg = {
          type: "reqOk",
          data: { payCardList: this.payCardList },
        };
        this.trace("clickBtnOk() > sendMessage payCardList");
        this.webrtcDatachannel.sendMessage(msg);
      } else {
        this.trace("clickBtnOk() > self close()");
        this.closeWindow();
      }
      this.trace("clickBtnOk() end");
    },
    //취소 버튼 클릭
    clickBtnCancel() {
      this.trace("clickBtnCancel() call!");

      cardUtils.reset();

      // 카드번호 초기화
      this.cardInputTemp.cardNo = "";
      this.cardInputTemp.noCardNo = "";

      this.trace("this.payCardList.length:[" + this.payCardList.length + "]");
      this.trace(
        "this.payMainInfo.completeYn:[" + this.payMainInfo.completeYn + "]"
      );
      
      if ((this.payCardList.length - this.oldPayCardList.length) > 0 && this.payMainInfo.completeYn == "Y") {
        window.utils.messageBox("alert", this.getMessage('MSG_ALT_EXIST_PAY_LIST'));
        this.trace("결제 내역이 있습니다.");
        this.disabledBtnOk = false;
        return;
      }

      if ((this.payCardList.length - this.oldPayCardList.length) > 0 && this.payMainInfo.completeYn == "N") {
        let cardAmt = this.getCardAmt();

        // 재결제 화면에서 호출한 경우
        // completeYn = 'N' 인 경우에는 미결금액이 없어야만 완료처리가 가능하다.
        // 복합 결제건은 카드 재결제가 안되는지 확인 필요 그렇지 않으면 아래 로직 이상함.
        let notPay =
          this.payMainInfo.notPay + this.payMainInfo.cardPay - cardAmt;
        if (notPay > 0 || this.payMainInfo.totPay - cardAmt > 0) {
          let sMsg = this.getMessage('MSG_ALT_PRGS_CANCEL');
          let nowApprCnt = this.payCardList.length - ((this.oldPayCardList == null)? 0 : this.oldPayCardList.length);
          sMsg += `\n\n[${this.getMessage('MSG_ALT_WARNING')}]${this.getMessage('MSG_ALT_CARD_REPAY_APPR_EXIST')}[${nowApprCnt}${this.getMessage('MSG_TXT_CNT')}]`;
          sMsg += `\n\n${this.getMessage('MSG_ALT_PLZ_REQ_MANUAL_CANCEL')}`;

          _.some(this.payCardList, (payCard, idx) => {
            if ( idx >= nowApprCnt ) {
              return;
            }
            else {
              sMsg += `\n${payCard.compCodeNm} ${payCard.cardNo} ${this.getMessage('MSG_TXT_APPR_NO')}[${payCard.apprNo}] ${this.getMessage('MSG_TXT_PAY_AMT')}[${payCard.apprAmt}]`;
            }
          });

          window.utils.messageBox("confirm", sMsg, null,
            (/* ok */) => {
              let msg = {
                type: "reqCancel",
                data: { payCardList: this.oldPayCardList },
              };
              this.trace("clickBtnOk() > sendMessage payCardList");
              this.webrtcDatachannel.sendMessage(msg);
            },
            (/* cancel */) => {
              return;
            }
          );
          return;
        } else {
          this.closeWindow();
        }
      } else {
        this.closeWindow();
      }
    },
    focusCardNo() {
      this.cardInputTemp.cardNo = "";
      this.cardInputData.expireYm = "";
      this.cardInputData.divideGigan = "";
      this.cardInputData.compCode = "";
      this.cardInputData.compCodeNm = "";
    },
    //결제금액 Focus 왔을때 0이면 지워주기
    focusApprAmt() {
      if (this.cardInputData.apprAmt == "0") {
        this.cardInputData.apprAmt = "";
      }
    },
    //   2017.08 ICCard Reader로 변경되어 Key Up Enter Event는 수기입력인 경우에만 발생
    //   (App Card, K/B 입력인 경우만 처리)
    async keyupFromCardNo() {
      // enter 입력된 경우
      //앱카드 관련 추가 - 2015.05.29 [KH.YUN]
      if (this.appCardYn == "Y") {
        if (this.cardInputTemp.cardNo != null && this.cardInputTemp.cardNo.length == 21) {
          this.trace("앱카드설정셋팅");
          this.cardInputData.rfu2 = window.utils.trim(this.cardInputTemp.cardNo).substr(16); //제휴코드
          this.cardInputData.appCardFg = "Y";
          this.cardInputData.emvYn = "N"; // emv 여부
          this.cardInputData.emv = ""; // EMV Data
          this.cardInputData.fallBackCode = "00"; // FALL_BACK_CODE

          this.trace(JSON.stringify(this.cardInputData));
        } else {
          let len = (this.cardInputTemp.cardNo == null)? 0 : this.cardInputTemp.cardNo.length;
          window.utils.messageBox("alert", `[${len}]${this.getMessage('MSG_ALT_APP_CARDNO_ERR')}`, null,
            () => {
              this.$refs.cardNo.setFocus();
            }
          );
          this.cardInputTemp.cardNo = "";
          this.cardInputTemp.nowCardNo = "";
          return;
        }
      } else {
        // 카드번호 수기 입력 자리수는 15,16
        if (this.cardInputTemp.cardNo != null && this.cardInputTemp.cardNo.length >= 15) {
          this.disabledTextExpireYm = false; // 일반카드인 경우 유효기간 활성화 - 2015.07.03 [KH.YUN]
        } else {
          window.utils.messageBox("alert", this.getMessage('MSG_ALT_CARDNO_ERR'), null,
            () => {
              this.$refs.cardNo.setFocus();
            }
          );
          this.cardInputTemp.cardNo = "";
          return;
        }

        //강제 blur 이벤트 발생시켜서 blurCardNo 호출
        if ( this.easyCheckYn == "Y") {
          this.$refs.apprAmt.setFocus();
        }
        else {
          this.$refs.expireYm.setFocus();
        }
      }
    },
    //결제금액에서 Enter 입력시
    enterApprAmt() {
      this.trace("changeApprAmt call!!");
      //수기입력
      if (this.isCardNoKeyin) {
        this.$refs.expireYm.setFocus();
      }
      //앱카드
      else if (this.appCardYn == "Y") {
        this.$refs.divideGigan.setFocus();
      }
      //easycheck
      else if (this.easyCheckYn == "Y") {
        this.$refs.expireYm.setFocus();
      } else {
        this.cardInputTemp.cardNo = ""; //카드번호 저장 변수 초기화
        this.cardInputTemp.nowCardNo = ""; //카드번호 저장 변수 초기화
        this.clickBtnIcReading();
      }
    },
    //유효기간에서 Enter시
    enterExpireYm() {
      if (this.apprCard != "Y" && this.payMainInfo.condTypeCd != "15L1") {
        this.$refs.divideGigan.setFocus();
      }
    },
    //할부개월에서 Enter시
    enterDivideGigan() {
      if (this.easyCheckYn == "Y") {
        this.$refs.apprDate.activate();
      }
      this.changeDivideGigan();
    },
    //원승인일자 선택시
    selectedApprDate() {
      if (this.easyCheckYn == "Y") {
        this.$refs.apprNo.setFocus();
      }
    },
    //승인번호에서 Enter입력시
    enterApprNo() {
      if (this.easyCheckYn == "Y") {
        //이지체크 승인 데이터 조회
        this.searchEasyCheckData();
      }
    },
    //카드번호 blur시 카드번호 변경 여부 체크 후 처리
    async blurCardNo() {
      this.trace("blurCardNo()");
      this.trace(`this.cardInputTemp.nowCardNo =>[${this.cardInputTemp.nowCardNo}]`);
      this.trace(`this.cardInputTemp.cardNo =>[${this.cardInputTemp.cardNo}]`);
      this.trace(`this.isCardNoKeyin =>[${this.isCardNoKeyin}]`);
      this.trace(`this.appCardYn =>[${this.appCardYn}]`);

      //수기 입력 모드 인 경우
      if (this.isCardNoKeyin || this.easyCheckYn == "Y") {
        
        //카드리더기로 수기입력한 카드번호 암호화한 경우
        if (this.cardInputTemp.cardNo.indexOf("=") > 0) {
          let useDay = this.cardInputTemp.cardNo.substr(this.cardInputTemp.cardNo.indexOf("=") + 1, 4);
          let cardNo = this.cardInputTemp.cardNo.substr(0, this.cardInputTemp.cardNo.indexOf("="));
          this.cardInputTemp.cardNo = cardNo
          this.cardInputTemp.nowCardNo = this.cardInputTemp.cardNo;
          this.cardInputData.cardNo = this.cardInputTemp.cardNo;
          this.cardInputData.expireYm = useDay.substring(0, 2) + useDay.substring(useDay.length - 2, useDay.length);
        }
        else {
          this.cardInputTemp.nowCardNo = this.cardInputTemp.cardNo;
          let maskCardNo =  this.cardInputTemp.nowCardNo;
          maskCardNo = this.formatMaskByPostion(maskCardNo, "*", 8, 12);
          maskCardNo = this.formatMaskByPostion(maskCardNo, "*", maskCardNo.length-1, maskCardNo.length);
          this.cardInputTemp.cardNo = maskCardNo;

          let len = (this.cardInputTemp.cardNo == null)? 0 : this.cardInputTemp.cardNo.length;
          if (len >= 14) {
            // 카드번호가 입력된 경우에만 처리
            let ret = false;
            await this.searchCardCompInfo().then((result) => { ret = result; }).catch((error) => { ret = error; });
            if (ret == false) {
              this.$refs.cardNo.setFocus();
              return;
            }
            if (this.easyCheckYn == "Y") {
              //금액으로 Focus 이동
              this.$refs.apprAmt.setFocus();
            }
            else {
              //유효기간으로 Focus 이동
              this.$refs.expireYm.setFocus();
            }
          }
        }
      } 
      //IC카드 리딩 이거나, APP카드 스캔인 경우
      else if (this.cardInputTemp.nowCardNo != this.cardInputTemp.cardNo) {
        this.cardInputTemp.nowCardNo = this.cardInputTemp.cardNo;

        if (this.appCardYn == "N") {
          let useDay = this.cardInputTemp.cardNo.substr(this.cardInputTemp.cardNo.indexOf("=") + 1, 4);
          let cardNo = this.cardInputTemp.cardNo.substr(0, this.cardInputTemp.cardNo.indexOf("="));

          this.cardInputData.cardNo = cardNo;
          this.cardInputData.expireYm = useDay.substring(0, 2) + useDay.substring(useDay.length - 2, useDay.length);
          this.cardInputData.readCardData = this.cardInputTemp.cardNo.replaceAll("\r\n", "");
        }
        //앱카드 일경우
        else {
          let maskCardNo =  this.cardInputTemp.nowCardNo;
          maskCardNo = this.formatMaskByPostion(maskCardNo, "*", 8, 12);
          maskCardNo = this.formatMaskByPostion(maskCardNo, "*", maskCardNo.length-1, maskCardNo.length);
          this.cardInputTemp.cardNo = maskCardNo;

          this.cardInputData.cardNo = window.utils.trim(this.cardInputTemp.cardNo).substr(0, 16);
          this.cardInputData.expireYm = "8911";
          this.cardInputData.readCardData = this.cardInputData.cardNo + "=8911";
        }

        this.cardInputTemp.cardNo = this.cardInputData.cardNo;

        this.disabledTextExpireYm = true;
        this.disabledTextExpireYm = true;
        this.disabledBtnApprove = false; // 승인 버튼 enabled = true

        this.cardInputData.divideGigan = "01";

        var nLength = window.utils.trim(this.cardInputData.cardNo).length;

        if (nLength >= 14) {
          // 카드번호가 입력된 경우에만 처리

          let ret = false;
          await this.searchCardCompInfo()
            .then((result) => {
              ret = result;
            })
            .catch((error) => {
              ret = error;
            });
          this.trace("blurCardNo()=>this.searchCardCompInfo() result=>", ret);
          if (ret == false) {
            return;
          }

          this.$refs.apprAmt.setFocus();

          this.changeDivideGigan(); //승인 버튼 활성화 세팅
        }
      }

      this.calcNotPayAmt();
    },
    changeDivideGigan() {
      //할부개월 체크
      if (this.checkDivideGigan()) {
        this.cardResultMessage = "";
      } else {
        this.cardResultMessage = "할부개월 입력 오류";
      }

      //카드정보가 모두 입력된 경우, 수기승인, 승인, EasyCheck조회 버튼 활성화 세팅
      let ret = this.checkCardInfo();
      this.trace("changeDivideGigan. ret==>[" + ret + "]");
      this.trace("changeDivideGigan. this.inputMode==>[" + this.inputMode + "]");
      if (ret) {
        // EasyCheck 인 경우
        if (this.easyCheckYn == "Y") {
          this.disabledBtnApprove = true;
          this.disabledBtnApproveFromKeyin = true;
          this.disabledBtnEasyCheckSearch = false;
        }
        // 수기입력인 경우
        else if (this.inputMode == "@") {
          this.disabledBtnApprove = true;
          this.disabledBtnApproveFromKeyin = false;
          this.disabledBtnEasyCheckSearch = true;
        }
        //그외인 경우
        else {
          this.disabledBtnApprove = false;
          this.disabledBtnApproveFromKeyin = true;
          this.disabledBtnEasyCheckSearch = true;
        }
      } else {
        //this.disabledBtnApproveFromKeyin = true;
        this.disabledBtnApprove = true;
        this.disabledBtnEasyCheckSearch = true;
      }
    },
    //카드 결제 후 다음 결제 위한 초기화
    initCard() {
      this.trace("initCard call!!");

      this.clearObject(this.cardInputData);

      this.disabledTextCardNo = true;

      this.disabledBtnCardKeyin = true;
      this.disabledBtnAppCard = true;
      this.disabledBtnEasyCheck = true;
      this.disabledBtnEasyCheckSearch = true;
      this.disabledBtnApprove = true;
      this.disabledBtnIcReading = true;
      this.disabledBtnIcCancel = true;
      this.disabledBtnApproveFromKeyin = true;
      this.easyCheckYn = "N";

      // 메시지 초기화
      this.cardResultMessage = "";

      // 남은 금액 재계산
      this.calcNotPayAmt();
      let cardAmt = this.getCardAmt();
      let notPay = Number(this.payMainInfo.notPay) + Number(this.payMainInfo.cardPay) - cardAmt;
      this.trace("notPay : [" + notPay + "]");
      if (notPay > 0) {
        this.cardInputData.apprAmt = "" + notPay;
        this.trace("apprAmt : [" + this.cardInputData.apprAmt + "]");

        //text 상태 설정
        this.disabledTextApprAmt = false;

        //버튼 상태 설정
        this.disabledBtnIcReading = false;
        this.disabledBtnCardKeyin = false;
        this.disabledBtnAppCard = false;
        this.disabledBtnEasyCheck = false;
        this.disabledBtnEasyCheckSearch = true;
        this.disabledBtnIcReading = false;
        this.disabledBtnIcCancel = true;

        //결제금액에 focus
        this.$refs.apprAmt.setFocus();
      }
    },
    //cardInputData 초기화
    initCardInputData() {
      this.clearObject(this.cardInputData);
      this.cardInputData.condTypeCd = this.payMainInfo.condTypeCd;
      this.cardInputData.logSeq = this.payMainInfo.logSeq;
      this.cardInputData.joinFg = this.payMainInfo.joinFg;
      if (this.payMainInfo.condTypeCd == "15L1") {
        this.cardInputData.divideGigan = "01";
        this.disabledTextDivideGigan = true;
      } else {
        this.disabledTextDivideGigan = false;
      }
    },
    //카드회사 정보 조회
    searchCardCompInfo() {
      this.trace("this.searchCardCompInfo() call");
      return new Promise((resolve, reject) => {
        window.http.request(this.$options.name, "DTS_CTM_00012", {
            query: { searchNo: this.cardInputTemp.cardNo },
          })
          .then((res) => {
            if (res.data == null || res.data.cardCmpnyCd == null || res.data.cardCmpnyCd.length == 0) {
              this.cardInputData.compCode = "";
              this.cardInputData.compCodeNm = "";
              window.utils.messageBox("alert", this.getMessage('MSG_ALT_NOT_EXIST_CARD_COMP_INFO'), null,
                () => {
                  reject(false);
                }
              );
              return;
            }

            let cardCompCd = res.data.cardCmpnyCd;
            let cardCompNm = res.data.cardCmpnyNm;
            let cardKind = res.data.cardFg;
            let cardJoinNo = res.data.joinNo;
            let useYn = res.data.useYn;

            this.trace("cardCompCd:", cardCompCd);
            this.trace("cardCompNm:", cardCompNm);
            this.trace("cardKind:", cardKind);
            this.trace("cardJoinNo:", cardJoinNo);
            this.trace("useYn:", useYn);

            if (this.payMainInfo.condTypeCd == "15L1") {
              // 제휴카드 중 외환카드 의 경우 제휴카드 빈을 강제로 셋팅-20130114 서민복 선임 변경

              // 2014.09.04 9.1일 하나에버랜드카드 외환카드에서 하나SK카드로 카드사변경
              if (cardCompCd == "0014") {
                // 2014.09.04 9.1일 하나에버랜드카드 외환카드에서 하나SK카드로 카드사변경
                cardCompCd = "0011";
              }

              if (cardCompCd != this.payMainInfo.cardCompCd) {
                window.utils.messageBox("alert", this.getMessage('MSG_ALT_NOT_MATCH_AFFILIATE_CARD'));
                reject(false);
                return;
              }
              
            }

            //제휴삼성카드 RF 카드거래인 경우 MST 거래하도록 함
            if (this.payMainInfo.condTypeCd == "15L1" && this.cardTypeR == "R" && cardCompCd == "0004") {
              let apprAmt = this.cardInputData.apprAmt;
              this.clearObject(this.cardInputData);
              this.cardInputData.apprAmt = apprAmt;
              window.utils.messageBox("alert", this.getMessage('MSG_ALT_PLZ_USE_MST_FOR_SAMSUNG_AFFILIATE_CARD'));

              this.cardTypeR = "";
              reject(false);
              return;
            }

            this.cardInputData.compCode = cardCompCd;
            this.cardInputData.compCodeNm = cardCompNm;
            this.cardInputData.cardKind = cardKind;
            this.cardInputData.joinNo = cardJoinNo;
            this.cardInputData.compUseYn = useYn;

            //제휴카드 사용의 경우 제휴할인구분 추가 setting
            if (this.payMainInfo.condTypeCd == "15L1") {
              this.cardInputData.cardSvcCd = this.payMainInfo.cardSvcCd;
            }

            this.cardInputData.compCodeNm;

            resolve(true);
            return;
          })
          .catch((error) => {
            this.trace("searchCardCompInfo()", error);
            reject(false);
            return;
          });
      });
    },
    //이지체크 승인건 조회
    async searchEasyCheckData() {
      this.trace("this.searchEasyCheckData() call");
      // 카드번호 체크
      if (this.cardInputTemp.nowCardNo == null || this.cardInputTemp.nowCardNo.length < 10) {
        window.utils.messageBox("alert", this.getMessage('MSG_ALT_NOT_INPUT_CARDNO'), null, () => {
          this.$refs.cardNo.setFocus();
        });
        return;
      }
      // 결제금액 체크
      let apprAmt = (this.cardInputData.apprAmt)? parseInt(this.cardInputData.apprAmt) : 0;
      if (apprAmt <= 0) {
        window.utils.messageBox("alert", this.getMessage('MSG_ALT_NOT_INPUT_PAY_AMT'), null, () => {
          this.$refs.apprAmt.setFocus();
        });
        return;
      }

      // 카드사명 조회여부 체크
      if (this.cardInputData.compCode == null || this.cardInputData.compCode.length == 0) {
        window.utils.messageBox("alert", this.getMessage('MSG_ALT_CARD_COMP_ERR'), null, () => {
          this.$refs.cardNo.setFocus();
        });
        return;
      }

      //할부 개월 체크
      if (!this.checkDivideGigan()) {
        window.utils.messageBox("alert", this.getMessage('MSG_ALT_DIVIDE_GIGAN_ERR'), null, () => {
          this.$refs.divideGigan.setFocus();
        });
        return;
      }

      // 원승인일자 체크
      if (this.cardInputData.apprDate == null || this.cardInputData.apprDate.length == 0) {
        window.utils.messageBox("alert", this.getMessage('MSG_ALT_ORG_APPR_DATE_ERR'), null, () => {
          this.$refs.apprDate.activate();
        });
        return;
      }

      // 승인번호 체크
      if (this.cardInputData.apprNo != null && this.cardInputData.apprNo.length < 6) {
        window.utils.messageBox("alert", this.getMessage('MSG_ALT_APPR_NO_ERR'), null, () => {
            this.$refs.apprNo.setFocus();
          });
        return;
      }
      

      //이미 등록된  EasyCheck 건인지 체크
      let checkIdx = -1;
      _.some(this.payCardList, (card, index) => {
        this.trace(`${card.cardNo} == ${this.cardInputTemp.nowCardNo}`);
        this.trace(`${card.apprDate} == ${this.cardInputData.apprDate}`);
        this.trace(`${card.apprNo} == ${this.cardInputData.apprNo}`);
        if (card.cardNo == this.cardInputTemp.nowCardNo
            && card.apprDate == this.cardInputData.apprDate 
            && card.apprNo == this.cardInputData.apprNo ) {
          checkIdx = index;
          return;
        }
      });
      this.trace(`checkIdx==>${checkIdx}`);
      if (checkIdx > -1)  {
        window.utils.messageBox("alert", this.getMessage('MSG_ALT_ALREADY_EXIST_EASYCHECK_APPR_ERR'), null, () => {
            this.$refs.cardNo.setFocus();
          });
        return;  
      }

      this.disabledDateApprDate = true;
      this.disabledTextApprNo = true;
      this.disabledBtnApprove = true;

      this.cardInputData.vanKind = "3";
      await window.http.getSystemTime().then((res) => { this.curDt = res.nowDateTime;});

      //lvApproveDate = calApproveDt.Value; //dsDateTime.GetColumn(0, "YMD");
      this.cardInputData.apprTime = this.curDt.substring(8, 14);

      let data = {};
      // 2014.06.14 Easy Check 데이터를 웹포스 테이블에서 조회한다.
      data.cardNo = this.cardInputTemp.nowCardNo;
      if (this.cardInputData.expireYm != null || window.utils.trim(this.cardInputData.expireYm).trim().length > 0) {
        data.expireYm = this.cardInputData.expireYm;
      } else {
        data.expireYm = "0000";
      }

      let divideGigan = (this.cardInputData.divideGigan)? parseInt(this.cardInputData.divideGigan) : 0;

      if (divideGigan == 1) {
        data.divideGigan = "00";
      } else {
        let textDivideGigan = "" + divideGigan;
        this.trace(`2 - textDivideGigan.length==>[${2 - textDivideGigan.length}]`);
        data.divideGigan = window.utils.space(2 - textDivideGigan.length, "0") + textDivideGigan;
      }

      data.apprAmt = this.cardInputData.apprAmt;
      data.apprDate = this.cardInputData.apprDate;
      data.apprNo = this.cardInputData.apprNo;

      this.trace(`searchEasyCheckData cardNo :[${this.cardInputTemp.nowCardNo}]`);

      window.http.request(this.$options.name, "DTS_CTM_00016", {
          data: data,
        })
        .then((res) => {
          if (res.data == null || res.data.length == 0) {
            window.utils.messageBox("alert",this.getMessage('MSG_ALT_PLZ_CHECK_CARD_INFO'));
            this.disabledDateApprDate = false;
            this.disabledTextApprNo = false;
            return;
          } else {
            let resultList = res.data;
            let cancelIdx = -1;

            this.trace(resultList);

            // 신용취소된 데이터가 존재하는지 체크
            _.some(resultList, (easyCheck, idx) => {
              if (easyCheck.msgType == "0200") {
                cancelIdx = idx;
                return;
              }
            });
            if (cancelIdx > -1) {
              window.utils.messageBox("alert", this.getMessage('MSG_ALT_EXIST_APPR_CANCEL_DATA'));
              this.disabledDateApprDate = false;
              this.disabledTextApprNo = false;
              return;
            }

            // 신용승인 데이터가 존재하면...
            let apprIdx = -1;
            _.some(resultList, (easyCheck, idx) => {
              if (easyCheck.msgType == "0100") {
                apprIdx = idx;
                return;
              }
            });
            if (apprIdx > -1) {
              //카드 번호 서버조회한 번호로 세팅
              this.cardInputTemp.nowCardNo = resultList[apprIdx].cardNo;

              //승인 데이터 Row 추가
              this.addPayCardList("NONE");

              //다음 입력위해 초기화
              this.initCard();

              //this.disabledBtnCancel = true;
              this.easyCheckYn = "N";

              this.$refs.cardNo.setFocus();
              return;
            } else {
              window.utils.messageBox("alert", this.getMessage('MSG_ALT_NOT_EXIST_APPR_DATA'));
              this.disabledDateApprDate = false;
              this.disabledTextApprNo = false;
              return;
            }
          }
        })
        .catch((error) => {
          this.trace("searchEasyCheckData()", error);
          return;
        });
    },
    //미결 금액 계산
    calcNotPayAmt() {
      let cardAmt = this.getCardAmt();
      //let apprAmt = this.cardInputData.apprAmt ? parseInt(this.cardInputData.apprAmt) : 0;
      let notPay = this.payMainInfo.notPay + this.payMainInfo.cardPay - cardAmt;
      this.cardInputTemp.notPay = notPay;

      // if (cardAmt > 0) {
      //   this.disabledBtnCancel = true;
      // } else {
      //   this.disabledBtnCancel = false;
      // }
    },
    //카드정보 입력 여부 체크
    checkCardInfo() {
      //카드번호 입력 여부 체크
      if (this.cardInputTemp.cardNo == null || this.cardInputTemp.cardNo.length < 10) {
        return false;
      }
      let apprAmt = parseInt(this.cardInputData.apprAmt);
      if (apprAmt == 0) {
        return false;
      }
      //카드사 조회 여부 체크
      if (this.cardInputData.compCode == null || this.cardInputData.compCode.length == 0) {
        return false;
      }
      //유효기간 체크
      if (this.cardInputData.expireYm == null || this.cardInputData.expireYm.length != 4) {
        return false;
      }
      //할부개월 체크
      return this.checkDivideGigan();
    },
    // 할부개월 체크
    checkDivideGigan() {
      let cardCompCd = this.cardInputData.compCode;
      let useYn = this.cardInputData.compUseYn;
      let divideGigan = (this.cardInputData.divideGigan)? parseInt(this.cardInputData.divideGigan) : 0;
      if (divideGigan == 0) {
        this.cardInputData.divideGigan = '00';
      }
      // BC카드
      if (cardCompCd == "0002" && divideGigan == 60) {
        //홍원주(2010.06.09) : BC 카드의 겨우 60개월 입력 가능 변경
        return true;
      }
      // 삼성카드
      else if (cardCompCd == "0004" && useYn == "Y") {
        // 삼성카드중 FFM018T의 값이 s인 것들은 60 ~ 72 허용
        if (divideGigan < 0) {
          return false;
        } else if (divideGigan > 18 && divideGigan < 60) {
          return false;
        }
        //서민복(2011.04.28) : 삼성카드이면서 FFM018T 값중 USE_GUBUN = 'S' 인것들에 대해서 60~72 개월까지 입력가능 변경
        else if (divideGigan > 72) {
          return false;
        } else {
          return true;
        }
      }
      // 일반카드
      else {
        if (divideGigan < 0) {
          return false;
        } else if (divideGigan > 18) {
          return false;
        } else {
          return true;
        }
      }
    },
    //입력된 카드 데이터 체크
    checkCardInputData(isKeyin) {
      try {
        this.cardResultMessage = "";
        let apprAmt = parseInt(this.cardInputData.apprAmt);
        let readCardData = window.utils.trim(this.cardInputData.readCardData);

        // 1.카드번호
        if (
          this.cardInputTemp.cardNo == null ||
          this.cardInputTemp.cardNo.length < 10
        ) {
          window.utils.messageBox("alert", this.getMessage('MSG_ALT_NOT_INPUT_CARDNO'), null, () => {
            this.$refs.cardNo.setFocus();
          });
          return false;
        }
        if (this.inputMode != "@") {
          //수기입력일경우 제외.
          // 1-1. 카드번호 READ NO
          if (readCardData == null || readCardData.length < 10) {
            window.utils.messageBox("alert", this.getMessage('MSG_ALT_NOT_INPUT_CARD_READ_DATA'), null,
              () => {
                this.$refs.cardNo.setFocus();
              }
            );
            return false;
          }
        }
        // 2. 금액
        if (apprAmt == 0) {
          window.utils.messageBox("alert", this.getMessage('MSG_ALT_NOT_INPUT_PAY_AMT'), null, () => {
            this.$refs.apprAmt.setFocus();
          });
          return false;
        }

        //결제금액이 미결금액 초과여부 체크
        let notPay = this.payMainInfo.notPay + this.payMainInfo.cardPay - this.getCardAmt();
        if (notPay < apprAmt) {
          window.utils.messageBox("alert", this.getMessage('MSG_ALT_OVER_NOT_PAY_AMT'), null,
            () => {
              this.$refs.apprAmt.setFocus();
            }
          );
          return false;
        }

        // 3. 카드사
        if (this.cardInputData.compCode == null || this.cardInputData.compCode.length == 0) {
          window.utils.messageBox("alert", this.getMessage('MSG_ALT_CARD_COMP_ERR'), null, () => {
            this.$refs.cardNo.setFocus();
          });
          return false;
        }

        // 4. 유효기간
        if (this.cardInputData.expireYm == null || this.cardInputData.expireYm.length != 4) {
          window.utils.messageBox("alert", this.getMessage('MSG_ALT_PLZ_CHECK_EXPIRE_YM'), null,
            () => {
              this.$refs.expireYm.setFocus();
            }
          );
          return false;
        }

        //앱카드인 경우 유효기간 월 체크하지 않음 - 2015.05.29 [KH.YUN]
        //수기입력인 경우에도 유효기간 check 하지 않음 : 2017.09 -> 수기 입력된 데이터가 카드 reader 기에서 변경됨
        if (this.cardInputData.appCardFg != "Y") {
          let expireMm = 0;
          //수기입력인 경우
          if (isKeyin) {
            expireMm = parseInt(this.cardInputData.expireYm.substring(0, 2));
          } else {
            expireMm = parseInt(this.cardInputData.expireYm.substring(2, 4));
          }
          if (expireMm > 12) {
            window.utils.messageBox("alert", this.getMessage('MSG_ALT_PLZ_CHECK_EXPIRE_MONTH'), null,
              () => {
                this.$refs.expireYm.setFocus();
              }
            );
            return false;
          }
        }

        // 5. 할부개월
        if (!this.checkDivideGigan()) {
          window.utils.messageBox("alert", this.getMessage('MSG_ALT_DIVIDE_GIGAN_ERR'), null, () => {
            this.$refs.divideGigan.setFocus();
          });
          return false;
        }
      } catch (e) {
        this.trace("checkCardInputData() error > ", e);
        return false;
      }

      return true;
    },
    //서명 입력 완료
    signComplete(isCardRemove) {
      console.log("signComplete.isCardRemove=>", isCardRemove);
    
      this.trace(`signComplete call==>[${this.cardApprData.signRtn}]`);
      
      this.disabledTextApprNo = false;
      this.disabledDateApprDate = false;

      this.disabledBtnEasyCheck = false;
      this.disabledBtnEasyCheckSearch = true;
      this.disabledBtnApprove = false;
      this.disabledBtnOk = false;

      this.addPayCardList(this.cardApprData.signRtn);
      this.initCard();

      //this.disabledBtnCancel = true;

      this.$refs.apprAmt.setFocus();
      
      //IC 카드이고 카드제거여부 체크 안됐으면 체크 요청
      if (this.inputMode == "I" && !isCardRemove) {
        this.sendReqCardRemove();
      }

    },
    //카드결제 리스트에 데이터 추가
    addPayCardList(signRtn) {
      this.trace("addPayCardList call");
      try {
        let eSignYn = "";
        let eSignData = "";

        signRtn = window.utils.trim(signRtn);

        // signRtn=""  : 수기서명 : N
        // signRtn="2" : 무서명 : X
        // 그외 전자서명 : Y
        let cardData = {};
        cardData.viewCardNo = this.cardInputTemp.cardNo;
        cardData.cardNoKind = "F101";
        if (this.easyCheckYn == "Y") {
          cardData.inputKind = "F002"; //이지체크
        } else {
          cardData.inputKind = "F001";

          // ICCard Reader 로 변경 input 모드가 R/A/@/F/I 로 변경 : 2017.09
          if (this.inputMode == "@") {
            cardData.inputKind = "F003"; //수기승인
          }
        }

        cardData.statusKind = "F201";
        if (this.easyCheckYn == "Y") {
          cardData.cardNo = this.cardInputTemp.nowCardNo;
          cardData.apprNo = this.cardInputData.apprNo;
          cardData.apprDate = this.cardInputData.apprDate;
          cardData.apprTime = this.cardInputData.apprTime;
          cardData.vanKind = this.cardInputData.vanKind;
          cardData.tranUniqueNbr = ''; // 2017.08 VAN 거래고유 번호 추가
          cardData.cardTypeCd = ''; // 2017.08 CARD TYPE 추가 : G (선불기프트 카드)
          cardData.giftRemainAmt = ''; // 2017.08 선불기프트 카드 잔액
        }
        else {
          cardData.cardNo = this.cardInputTemp.cardNo;
          cardData.apprNo = this.cardApprData.reApproveNo;
          cardData.apprDate = this.cardApprData.reApproveDate;
          cardData.apprTime = this.cardApprData.reApproveTime;
          cardData.vanKind = this.cardApprData.reApproveVanFg;
          cardData.tranUniqueNbr = this.cardApprData.reTranUniqueNbr; // 2017.08 VAN 거래고유 번호 추가
          cardData.cardTypeCd = this.cardApprData.reCardTypeFlag; // 2017.08 CARD TYPE 추가 : G (선불기프트 카드)
          cardData.giftRemainAmt = this.cardApprData.reGiftRemainAmt; // 2017.08 선불기프트 카드 잔액
        }
        cardData.compCode = this.cardInputData.compCode;
        cardData.compCodeNm = this.cardInputData.compCodeNm;
        cardData.cardKind = this.cardInputData.cardKind;
        cardData.joinNo = this.cardInputData.joinNo;
        cardData.evmYn = this.cardInputData.emvYn;
        cardData.evm = this.cardInputData.emv;

        if (this.cardInputData.expireYm == null || window.utils.trim(this.cardInputData.expireYm).length == 0) {
          cardData.expireYm = "0000";
        } else {
          cardData.expireYm = this.cardInputData.expireYm;
        }
        if (parseInt(this.cardInputData.divideGigan) == 1) {
          cardData.divideGigan = "0";
        } else {
          cardData.divideGigan = this.cardInputData.divideGigan;
        }

        cardData.apprAmt = this.cardInputData.apprAmt;

        //미결금액 재계산
        this.calcNotPayAmt();

        // 전자서명 추가                        -- 2008.05.15 hjlee
        // 삼성카드 결제금액 5만원이하 무서명   -- 2009.06.08 hjlee
        // 2014.07.17 전자서명 구분에 따른 코드
        // 전자서명 : Y, 수기서명 : N, 무서명   : X
        if (this.easyCheckYn != "Y") {
          if (signRtn == "2") {
            // 무서명 : X
            eSignYn = "X";
            eSignData = "";
          } else {
            if (signRtn == null || signRtn.length == 0) {
              eSignYn = "N";
            } else {
              eSignYn = "Y";
              eSignData = signRtn;
            }
          }
          cardData.eSignYn = eSignYn;
          cardData.eSign = eSignData;
        }

        this.disabledBtnCardKeyin = true;
        this.disabledBtnAppCard = true;
        this.disabledBtnOk = false;
        //this.disabledBtnCancel = true;

        //맨앞에 카드 데이터 추가
        this.payCardList.splice(0, 0, cardData);
        this.cardDataProvider.fillJsonData(this.payCardList, { fillMode: "set" });
        this.nowCardApprCnt++;

        //카드 결제 추가시 마다 결제Main에 반영
        let msg = {
          type: "send",
          data: { payCardList: this.payCardList },
        };
        this.trace("addPayCardList() > sendMessage payCardList");
        this.webrtcDatachannel.sendMessage(msg);
      } catch(e) {
        this.trace("addPayCardList() error", e);
      }
    },
    //현재 Grid에 표시된 카드결제 금액 합
    getCardAmt() {
      let cardAmt = 0;
      window.utils.forEach(this.payCardList, (payCard) => {
        cardAmt += parseInt(payCard.apprAmt);
      });
      return cardAmt;
    },
    //무결성 테스트 결과 저장
    writeTestResult(rflag, kiccPosPort, msg, readerId) {
      var strResult = "SUCCESS";
      let param = {};
      if ( rflag == false || this.strReaderId == null || this.strReaderId.length == 0) {
        param.readerId = msg;
        strResult = "FAIL";
      } else {
        param.readerId = readerId; // IC Card Reader ID
      }

      param.posIp = window.utils.getLoginUserInfo().userIp;
      param.portNo = kiccPosPort + "";
      param.result = strResult;
      param.swVersion = this.strSwVersion;
      param.workDate = this.curDt.substring(0, 8);
      param.workTime = this.curDt.substring(8, 14);

      window.http.request(this.$options.name, "DTS_BAP_00001", {
          data: param,
        })
        .then((res) => {
          if (res.data) {
            this.trace("res.data:" + res.data);
          }
        })
        .catch((error) => {
          this.trace(error);
        });

      if (strResult != "SUCCESS") {
        this.cardResultMessage = `${this.getMessage('MSG_ALT_IC_READER_CHECK_FAIL')}: ${msg}`;
        this.icReaderCehckResult = '';
        window.utils.messageBox("alert", `${this.getMessage('MSG_ALT_IC_READER_CHECK_FAIL')}: ${msg}`);
      } else {
        this.cardResultMessage = strResult;
        this.icReaderCehckResult = `[${this.getMessage('MSG_TXT_SW_IDENTIFICATION')}]${window.utils.space(16 - param.swVersion.length, "#")}${param.swVersion} [${this.getMessage('MSG_TXT_IC_READER_IDENTIFICATION')}]${window.utils.space(16 - param.readerId.length, "#")} ${param.readerId}`;
        this.clickBtnIcReading();
      }
    },
    //수기 입력되는 카드번호 masking 처리
    formatMaskByPostion(str, chr, startPosition, endPosition) {
      if (str == null || str.length == 0) {
        return "";
      }

      var temp = str.substr(0, startPosition);

      if (endPosition > str.length) {
        endPosition = str.length;
      }

      for (var i = startPosition; i < endPosition; i++) {
        temp = temp + chr;
      }

      if (endPosition < str.length) {
        temp += str.substr(endPosition, str.length);
      }
      return temp;
    },
    clearObject(obj) {
      for (const [key] of Object.entries(obj)) {
        obj[key] = null;
      }
    },
    //창 닫기
    closeWindow() {
      //카드 데이터 Clear
      this.clearCardData();
      
      //카드리더기 close
      cardUtils.close();

      //close 메시지 마지막으로 메인에 보내기
      this.webrtcDatachannel.sendClose();

      //창닫기
      top.window.opener = top;
      top.window.open('', '_parent', '');
      top.window.close(); 
    },
    //카드 데이터 Clear
    clearCardData() {
      this.cardInputData = {};
      this.cardInputTemp = {};
      this.cardApprData = {};
      this.payMainInfo = {};
      this.oldPayCardList = [];
      this.payCardList = [];
    },
    //인코딩위한 랜덤키 생성
    getRandomKey() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let str = '';
      let len = 16;

      for (let i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return str;
    },
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

