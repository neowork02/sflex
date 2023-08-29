<template>
  <sui-page>
    <div class="modalWrap" style="height: auto; overflow-y: scroll">
      <template slot="title">
        <div class="modal-title mb20">{{ getMessage('MSG_TIT_PC017_MNG') }}</div>
      </template>
      <template>
        <div class="modal-body">
          <!-- S::cardpayWrap -->
          <div class="cardpayWrap">
            <!-- S::컨텐츠2:현금영수증 승인내역 -->

            <!-- S::결제유형 -->
            <div class="comm_view_wrap">
              <div class="row">
                <div class="col-xs-2">
                  <sui-input-label :label="getMessage('MSG_TXT_DIV')" />
                </div>
                <div class="col-xs-10">
                  <sui-radio v-model="certType" value="10">{{getMessage('MSG_TXT_CASH_RECEIPT_PERSONAL')}}</sui-radio>
                  <sui-radio v-model="certType" value="20">{{getMessage('MSG_TXT_CASH_RECEIPT_COMP')}}</sui-radio>
                  <sui-radio v-model="certType" value="30">{{getMessage('MSG_TXT_CASH_RECEIPT_VOLUNTARY_ISSUE')}}</sui-radio>
                  <sui-radio v-model="certType" value="40"
                    >일반영수증</sui-radio
                  >
                </div>
              </div>
              <div class="row">
                <div class="col-xs-2">
                  <sui-input-label :label="getMessage('MSG_TXT_AUTH_METHOD')" />
                </div>
                <div class="col-xs-10">
                  <sui-radio
                    v-model="certLevel"
                    :disabled="disabledFromType10"
                    value="F103"
                    >{{getMessage('MSG_TXT_CELL_PHONE')}}</sui-radio
                  >
                  <sui-radio
                    v-model="certLevel"
                    :disabled="disabledFromType20"
                    value="F104"
                    >{{getMessage('MSG_TXT_COMP_NO')}}</sui-radio
                  >
                  <sui-radio
                    v-model="certLevel"
                    :disabled="disabledFromType10"
                    value="F101"
                    >{{getMessage('MSG_TXT_CARD')}}</sui-radio
                  >
                </div>
              </div>
              <div class="row">
                <div class="col-xs-2">
                  <sui-input-label :label="getMessage('MSG_TXT_DISC_INFO')" />
                </div>
                <div class="col-xs-10">
                  <sui-text-field
                    v-model="inputData.certValue"
                    :mask="certValueMask"
                    placeholder=""
                    :readonly="readonlyTextCertValue"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-xs-2">
                  <sui-input-label :label="getMessage('MSG_TXT_CASH_RECEIPT_APPR_AMT')" />
                </div>
                <div class="col-xs-10">
                  <sui-text-field
                    v-model="inputData.apprAmt"
                    mask="currency"
                    placeholder=""
                    readonly
                  />
                </div>
              </div>
            </div>
            <!-- S::btn_wrap-->
            <div class="btn_wrap">
              <sui-button
                type="button"
                @click="clickBtnApprove"
                :disabled="disabledBtnApprove"
                class="point"
                >승인</sui-button
              >
            </div>
            <!-- E::btn_wrap -->
            <div class="comm_view_wrap mt10">
              <div class="row">
                <div class="col-xs-2">
                  <sui-input-label :label="getMessage('MSG_TXT_MESSAGE')" />
                </div>
                <div class="col-xs-10">
                  <textarea rows="3" v-model="message" readonly />
                </div>
              </div>
              <div class="row">
                <div class="col-xs-2">
                  <sui-input-label :label="getMessage('MSG_TXT_APPR')" />
                </div>
                <div class="col-xs-10">
                  <sui-text-field
                    v-model="apprData.apprNo"
                    readonly
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <!-- E::btn_wrap -->

            <!-- E::현금영수증 승인내역 -->

            <!-- S::btn_wrap -->
            <div class="btn_wrap bottom">
              <sui-button type="button" @click="clickBtnFinish" :disabled="disabledBtnFinish" class="point">{{getMessage('MSG_BTN_CPLT')}}</sui-button>
              <sui-button type="button" @click="clickBtnClose" class="point">{{getMessage('MSG_BTN_POP_CLOSE')}}</sui-button>
            </div>
            <!-- E::btn_wrap -->
          </div>
        </div>
        <!-- ::E cardpayWrap -->
      </template>
    </div>
  </sui-page>
</template>
<script>
//import _ from 'lodash';
import WebrtcDatachannel from "~common/js/webrtc-datachannel.js";
import cardUtils from "~common/js/cardUtils/card-utils.js";

export default {
  name: "PGE_CTM_00017", // eslint-disable-line vue/name-property-casing
  components: {},
  data() {
    return {
      isInit: false,
      isLogging: true, // consle log 남기는지 여부

      //IC Card Reader 정보
      icReaderPort1: 0,
      icReaderSpeed1: 0,
      cardX: null,

      //login user 정보
      userInfo: null,
      userData: null,
      userId: "",
      userIp: "",

      certValueMask: "###-####-####",

      //main과 commnucation channel util
      webrtcDatachannel: null,
      mainPage: "",
      accessDateTime: "",

      inputMode: "A",

      isAppr: false, //승인여부

      certType: "10", // 구분 - defaul = 개인
      certLevel: "F103", // 인증수단 - default = 핸드폰
      message: "", // message

      inputLength: 11,
      inputName : this.getMessage('MSG_TXT_CELL_PHONE'),

      inputData: {
        apprAmt: "0", // 현금영수증 승인 금액
        logSeq: "", // logSeq
        certType: "", // 구분
        certLevel: "", // 인증수단
        certValue: "", // 식별정보
        cardData: "", // card Data
      }, //입력 Data

      apprData: {
        certType: "",
        certLevel: "",
        logSeq: "",
        cardData: "",
        apprAmt: "",

        cardNo: "",
        apprDate: "",
        apprTime: "",
        cardNoKind: "",
        apprNo: "",
        vanKind: "",
        divideGigan: "",
        tranUniqueNbr: "",
        reResponseCd: "",
        reResponseMsg: "",
      }, // 승인 데이타
    };
  },
  created() {
    //카드 모듈 로딩
    cardUtils.cardLoad(this);
  },
  async mounted() {
    window.addEventListener("beforeunload", this.windowUnLoad);

    this.userInfo = window.utils.getLoginUserInfo();
    this.userData = window.utils.getLoginData();
    this.userId = window.utils.getLoginUserInfo().userId;
    this.userIp = window.utils.getLoginUserInfo().userIp;

    //카드 port, speed 정보 가져오기
    this.icReaderPort1 = cardUtils.parsePort(
      window.utils.getLoginUserInfo().icReaderPort
    );
    this.icReaderSpeed1 = cardUtils.parseSpeed(
      window.utils.getLoginUserInfo().icReaderSpeed
    );

    //카드 리스너 등록
    cardUtils.setListenerVuePage(this);
    //카드모듈 가져오기
    this.cardX = cardUtils.getCardX();

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
  beforeDestroy() {
    this.windowUnLoad();
  },
  filters: {
    moneyPoint(value) {
      return window.utils.numberFormat(value, 0);
    },
  },
  computed: {
    disabledFromType10() {
      if (this.certType == "10") {
        return false;
      } else {
        return true;
      }
    },
    disabledFromType20() {
      if (this.certType == "20") {
        return false;
      } else {
        return true;
      }
    },
    readonlyTextCertValue() {
      if (this.certType == "10" || this.certType == "20") {
        return false;
      } else {
        return true;
      }
    },
    disabledBtnApprove() {
      if (this.isAppr) {
        return true;
      } else if (this.certType == "10" || this.certType == "20" || this.certType == "30") {
        if (
          this.inputData.certValue == null ||
          this.inputData.certValue.trim().length == 0
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    disabledBtnFinish() {
      if (this.isAppr) {
        return false;
      } else {
        return true;
      }
    },
  },
  watch: {
    certType: {
      deep: false,
      handler() {
        // 개인
        switch (this.certType) {
          case "10": // 개인
            this.certLevel = "F103"; // 전화번호 세팅
            this.inputData.certValue = "";
            this.certValueMask = "###-####-####";
            this.inputLength = 11;
            this.inputName = this.getMessage('MSG_TXT_CELL_PHONE');
            //카드 리더기 초기화
            cardUtils.reset();
            break;
          case "20": // 사업자
            this.certLevel = "F104"; // 사업자번호 세팅
            this.inputData.certValue = "";
            this.certValueMask = "###-##-#####";
            this.inputLength = 10;
            this.inputName = this.getMessage('MSG_TXT_COMP_NO');
            //카드 리더기 초기화
            cardUtils.reset();
            break;
          case "30": // 자진발급 : 고객이 추후 현금영수증을 따로 등록함. 즉, 인증 수단없이 승인만 받아서 출력한다.
            this.certLevel = "F103"; // 전화번호 세팅
            this.inputData.certValue = "0100001234";
            this.certValueMask = "###-####-####";
            this.inputLength = 11;
            this.inputName = this.getMessage('MSG_TXT_CASH_RECEIPT_VOLUNTARY_ISSUE');

            //카드 리더기 초기화
            cardUtils.reset();
            break;
          default: // 일반 영수증 : 현금 영수증 처리를 하지 않고 일반 영수증만을 출력한다.
            this.inputData.certValue = "";
            this.certValueMask = "****-****-****-****";
            //카드 리더기 초기화
            cardUtils.reset();
            break;
        }
      },
    },
    certLevel: {
      deep: false,
      handler() {
        // 개인
        switch (this.certLevel) {
          case "F103":
            this.certValueMask = "###-####-####";
            this.inputData.certValue = "";
            if (this.certType == "30") {
              break;
            }
            if (this.isInit) {
              this.sendReqCmd();
            }
            break;
          case "F104":
            this.certValueMask = "###-##-#####";
            this.inputData.certValue = "";
            if (this.isInit) {
              this.sendReqCmd();
            }
            break;
          case "F101":
            this.certValueMask = "****-****-****-****";
            if (this.isInit) {
              this.sendCardReqCmd();
            }
            break;
        }
      },
    },
  },
  methods: {
    windowUnLoad() {
      this.trace("window close!!!");
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
        this.inputData.apprAmt = param.data.totCash.toString();
        this.inputData.logSeq = param.data.logSeq;

        //승인일자를 매출일자로 세팅
        this.inputData.apprDate = window.utils.getLoginUserInfo().saleDate;

        //창이 앞으로 오기
        window.focus();

        //카드모듈 Open
        if (this.openCardReader()) {
          //현금 영수증 정보 요청
          this.sendReqCmd();
        }
        this.isInit = true;
      } else if (param.type == "focus") {
        window.focus();
      }
      //결제메인에 데이터 전달 완료
      else if (param.type == "endFinish") {
        this.trace("receiveMessageFromMain() > endFinish");
        //카드 데이터 초기화

        //카드리더기 close
        cardUtils.close();

        //close 메시지 마지막으로 메인에 보내기
        this.webrtcDatachannel.sendClose();

        //창닫기
        top.window.opener = top;
        top.window.open("", "_parent", "");
        top.window.close();
      }
    },
    //main과 채널 생성 후 callback
    initCallBack() {},
    //Main창이 닫히는 이벤트 callback
    closeMainCallBack() {
      cardUtils.close();
      this.webrtcDatachannel.close();

      //창닫기
      top.window.opener = top;
      top.window.open("", "_parent", "");
      top.window.close();
    },
    //카드모듈 Opn
    openCardReader() {
      return cardUtils.open(this.icReaderPort1, this.icReaderSpeed1);
    },
    //현금영수증 발행번호 입력 요청
    sendReqCmd() {
      try {
        //카드 리더기 초기화
        cardUtils.reset();

        // 현금영수증 발행번호 입력 요청
        let errMsg;
        let data = "#01" + window.utils.space(2 - (this.inputLength+"").length, "0") + (this.inputLength+"") + this.inputName;
        console.log(data);
        let ret = this.cardX.ReqCmd(parseInt("C3", 16), parseInt("00", 16), parseInt("00", 16), data, errMsg);
        if (ret != 0) {
          window.utils.messageBox(
            "alert",
            `${this.getMessage('MSG_ALT_IC_READER_CASH_RECEIPT_NO_REQ_ERR')}[${ret}]`
          );
          this.openCardReader();
          return;
        }
      } catch (e) {
        alert(e);
      }
    },
    //현금영수증 카드 Read 요청
    async sendCardReqCmd() {
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
      let textApprAmt = window.utils.trim("" + this.inputData.apprAmt);
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
        "1234567890123456"; //-- 인코딩 작업을 위한 랜덤데이터

      try {
        //카드 리더기 초기화
        cardUtils.reset();

        // Cmd : 0xFB, GCD : 0x11, SCD : 0x20
        let errMsg;
        let ret = this.cardX.ReqCmd(parseInt("FB", 16), parseInt("11", 16), parseInt("20", 16), strSendData, errMsg);
        if (ret != 0) {
          window.utils.messageBox(
            "alert",
            `${this.getMessage('MSG_ALT_CASH_RECEIPT_CARD_READ_ERR')}[${ret}]`
          );
          this.openCardReader();
          return;
        }

        this.trace("PGE_CTM_0004 sendReqCmd:[" + this.inputData.apprAmt + "]");
      } catch (e) {
        alert(e);
      }
    },
    //카드 제거 했는지 여부 체크
    sendReqCardRemove() {
      //카드 리더기 초기화
      cardUtils.reset();

      let strSendData = "01"; //카드 삽입유무 체크
      var errMsg;
      let ret = this.cardX.ReqCmd(parseInt("FB", 16), parseInt("11", 16), parseInt("32", 16), strSendData, errMsg );
      if (ret != 0) {
        window.utils.messageBox(
          "confirm",
          this.getMessage('MSG_ALT_CARD_REMOVE_CHECK_RETRY_CONFRIM'),
          null,
          (/* ok */) => {
            this.trace("카드 제거 여부를 체크 재요청");
            this.openCardReader();
            this.sendReqCardRemove();
          },
          (/* cancel */) => {
            this.trace("카드 제거 여부 체크 실패");
          }
        );
      }
    },
    OnRcvData(Cmd, GCD, JCD, RCD, RData, RHexData) {
      this.trace("PGE_CTM_0017 cardX_OnRcvData");
      this.trace(`==>Cmd:[${Cmd}]`);
      this.trace(`==>GCD:[${GCD}]`);
      this.trace(`==>JCD:[${JCD}]`);
      this.trace(`==>RCD:[${RCD}]`);
      this.trace(`==>RData:[${RData}]`);
      this.trace(`==>RHexData:[${RHexData}]`);

      // 현금영수증 번호 입력
      if (Cmd == parseInt("C5", 16) && GCD == parseInt("00", 16) && JCD == parseInt("00", 16)) {
        this.OnRcvDataCertValue(RData);
      }
      //카드 리딩
      else if (Cmd == parseInt("FB", 16) && GCD == parseInt("11", 16) && JCD == parseInt("20", 16)) {
        this.OnRcvDataCardCertValue(RData);
      }
      //카드 제거 여부 체크
      else if (Cmd == parseInt("FB", 16) && GCD == parseInt("11", 16) && JCD == parseInt("32", 16)) {
        this.OnRcvCardRemove(GCD, JCD, RCD, RData, RHexData);
      }
    },
    //카드리더기에서 현금영수증 정보 입력 처리
    OnRcvDataCertValue(RData) {
      if (this.certLevel == "F103") {
        RData = this.trimExceptNumber(RData);
        if (RData.length == 10 || RData.length == 11) {
          this.inputData.certValue = RData.trim();
        } else {
          window.utils.messageBox("alert", this.getMessage('MSG_ALT_CELL_PHONE_INPUT_ERR'), null,
            () => {
              this.sendReqCmd();
            }
          );
          return;
        }
      } else if (this.certLevel == "F104") {
        RData = this.trimExceptNumber(RData);
        if (RData.length == 10) {
          this.inputData.certValue = RData.trim();
        } else {
          window.utils.messageBox("alert", this.getMessage('MSG_ALT_COMP_NO_INPUT_ERR'), null,
            () => {
              this.sendReqCmd();
            }
          );
          return;
        }
      }
    },
    //카드리더기에서 카드 리딩 입력 처리
    OnRcvDataCardCertValue(RData) {
      console.log(`this.certLvel=>${this.certLvel}`);
      if (this.certLevel == "F101") {
        let cardNo = RData.substr(6, 38).toString();
        console.log(`1.cardNo=${cardNo}`);
        if (cardNo.indexOf("=") > 0) {
          cardNo = cardNo.substr(0, cardNo.indexOf("="));
          console.log(`2.cardNo=${cardNo}`);
        }
        /* 20180309 IC카드관련 수정*/
        let secuData = "";
        if (
          RData.substr(0, 1) == "C" ||
          RData.substr(0, 4).indexOf("MF") >= 0
        ) {
          secuData = "SECU" + RData.substr(46, 8) + RData.substr(60, 86);
        } else {
          secuData = cardNo + "=99999999999999999999";
        }
        this.inputData.cardData = secuData;
        this.inputData.certValue = cardNo;
      }
    },
    //카드리더기 카드제거 여부 체크 결과 처리
    OnRcvCardRemove(GCD, JCD, RCD, RData, RHexData) {
      this.trace(`==>GCD     :[${GCD}]`);
      this.trace(`==>JCD     :[${JCD}]`);
      this.trace(`==>RData   :[${RData}]`);
      this.trace(`==>RCD     :[${parseInt(RCD, 10)}]`);
      this.trace(`==>RHexData:[${RHexData}]`);
      this.trace(`==>EMV     :[${this.cardX.Emv}]`);

      if (RCD == parseInt("00", 16)) {
        if (RData == "011") {
          this.trace("카드가 제거되었습니다.");
        } else if (RData == "010") {
          this.trace("카드가 제거되지 않았습니다.");
          window.utils.messageBox(
            "alert",
            this.getMessage('MSG_ALT_CARD_REMOVE_REQ'),
            null,
            () => {
              this.sendReqCardRemove();
            }
          );
        }
      } else {
        window.utils.messageBox(
          "confirm",
          this.getMessage('MSG_ALT_CARD_REMOVE_CHECK_RETRY_CONFRIM'),
          null,
          (/* ok */) => {
            this.trace("카드 제거 여부를 체크 재요청");
            this.openCardReader();
            this.sendReqCardRemove();
          },
          (/* cancel */) => {
            this.trace("카드 제거 여부 체크 실패");
          }
        );
      }
    },
    OnMessage(Msg) {
      this.trace("OnMessage:Msg:" + Msg);
    },
    trimExceptNumber(strs) {
      if (strs != null && strs.trim().length > 0) {
        let arr = strs.trim().split("");
        let rtnStrs = "";
        arr.forEach((str) => {
          if (str.charCodeAt(0) >= 48 && str.charCodeAt(0) <= 57) {
            rtnStrs += str;
          }
        });
        return rtnStrs;
      } else {
        return ''
      }
    },
    //승인 버튼 클릭
    clickBtnApprove() {
      this.trace("clickBtnApprove call");

      if (this.isAppr) {
        window.utils.messageBox("alert", this.getMessage('MSG_ALT_ALREADY_CASH_RECEIPT_APPR_STATUS'));
        return;
      }

      if (this.certType == "10" || this.certType == "20") {
        if (
          this.inputData.certValue == null ||
          this.inputData.certValue.trim().length == 0
        ) {
          if (this.certLevel == "F101") {
            window.utils.messageBox("alert", this.getMessage('MSG_ALT_INPUT_CARD_NO_REQ'));
            return;
          } else if (this.certLevel == "F103") {
            window.utils.messageBox("alert", this.getMessage('MSG_ALT_INPUT_CELL_PHONE_REQ'));
            return;
          } else if (this.certLevel == "F104") {
            window.utils.messageBox("alert", this.getMessage('MSG_ALT_INPUT_COMP_NO_REQ'));
            return;
          }
        }
      }

      this.inputData.certType = this.certType;
      this.inputData.certLevel = this.certLevel;

      this.trace("this.inputData", this.inputData);

      // 현금 영수증 승인 서버 요청
      window.http
        .request(this.$options.name, "DTS_CTM_00025", {
          data: this.inputData,
        })
        .then((res) => {
          this.trace("res", res);
          if (
            res.data == null ||
            res.data.reResponseCd == null ||
            res.data.reResponseCd.length == 0
          ) {
            this.isAppr = false;
            if (res.data != null) {
              this.trace(
                `승인실패 응답메시지 : [${this.getMessage('MSG_ALT_SERVER_ERR')}]${res.data.reResponseMsg}`
              );
              this.message = `[${this.getMessage('MSG_ALT_SERVER_ERR')}]${res.data.reResponseMsg}`;
            } else {
              this.trace("승인실패 응답메시지 : 정기권 서버 요청 오류");
              this.message = `[${this.getMessage('MSG_ALT_SERVER_ERR')}]${this.getMessage('MSG_ALT_CTS_SERVER_ERR')}`;
            }
            return;
          }

          this.apprData = res.data;
          this.message = `[${this.apprData.reResponseCd}]${this.apprData.reResponseMsg}`;

          // 현금영수증 승인
          if (this.apprData.reResponseCd == "0000") {
            this.trace("clickBtnApprove 현금영수증 승인완료!!!!");
            this.isAppr = true;
            //결제 메인에 현금영수증 정보 전송
            let msg = {
              type: "sendCashReceipt",
              data: { cashReceipt: this.apprData },
            };

            this.trace("clickBtnApprove() > sendMessage send cashReceipt");
            this.webrtcDatachannel.sendMessage(msg);
            if (this.certLevel == "F101") {
              this.sendReqCardRemove();
            }
          } else {
            this.isAppr = false;
          }
        })
        .catch((error) => {
          this.trace("clickBtnApprove()", error);
          this.isAppr = false;
          return;
        });
    },
    //완료 버튼 클릭
    clickBtnFinish() {
      this.trace("clickBtnFinish() call!");

      if (this.certType != "40") {
        // 완료
        if (!this.isAppr) {
          window.utils.messageBox("alert", this.getMessage('MSG_ALT_NOT_EXIST_CASH_RECEIPT_APPR_DATA'));
          return;
        }
        //결제 메인에 현금영수증 정보 전송
        let msg = {
          type: "reqFinish",
          data: { cashReceipt: this.apprData },
        };

        this.trace("clickBtnFinish() > sendMessage finsish cashReceipt");
        this.webrtcDatachannel.sendMessage(msg);
      } else {
        //일반영수증 선택 정보 전송
        let msg = {
          type: "reqNormal",
          data: { cashReceipt: this.apprData },
        };

        this.trace("clickBtnFinish() > sendMessage normal");
        this.webrtcDatachannel.sendMessage(msg);
      }
    },
    //취소 버튼 클릭
    clickBtnClose() {
      this.trace("clickBtnCancel() call!");

      //reset
      cardUtils.reset();

      //카드리더기 close
      cardUtils.close();

      //close 메시지 마지막으로 메인에 보내기
      this.webrtcDatachannel.sendClose();

      //창닫기
      top.window.opener = top;
      top.window.open("", "_parent", "");
      top.window.close();
    },
    clearObject(obj) {
      for (const [key] of Object.entries(obj)) {
        obj[key] = null;
      }
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
