<template>
	<sui-page></sui-page>
</template>
<script>
import WebrtcDatachannel from "~common/js/webrtc-datachannel.js";
import cardUtils from "~common/js/cardUtils/card-utils.js";

export default {
  name: "PGE_CTM_00023", // eslint-disable-line vue/name-property-casing
  components: {},
  data() {
    return {
      isLogging: true, // consle log 남기는지 여부
      signData : {
        apprAmt: 0, //승인 금액

      }
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
    this.icReaderPort1 = cardUtils.parsePort(window.utils.getLoginUserInfo().icReaderPort);
    this.icReaderSpeed1 = cardUtils.parseSpeed(window.utils.getLoginUserInfo().icReaderSpeed);

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
    // 계산된 속성, date pickproperty로 사용가능
  },
  watch: {},
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
        this.apprAmt = param.data.apprAmt;

        //창이 앞으로 오기
        window.focus();
        
        this.openCardReader();
        
        this.sendReqSign(this.apprAmt);
      } 
      else if (param.type == "focus") {
        window.focus();
      }
      //결제메인에 데이터 전달 완료
      else if (param.type == "sendOk") {
        this.trace("receiveMessageFromMain() > sendOk");
        
        // 창 닫기
        this.closeSignPad();
      }
    },
    //main과 채널 생성 후 callback
    initCallBack() {},
    //Main창이 닫히는 이벤트 callback
    closeMainCallBack() {
      cardUtils.close();
      this.webrtcDatachannel.close();
      top.window.opener = top;
      top.window.open('', '_parent', '');
      top.window.close(); 
    },
    //카드모듈 Opn
    openCardReader() {
      return cardUtils.open(this.icReaderPort1, this.icReaderSpeed1);
    },
    sendReqSign(apprAmt) {
      // 전자 Sign 장비에 사인 요청
      this.trace(`전자서명 장비에 사인 요청[apprAmt=${apprAmt}]`);

      //카드 리더기 초기화
      cardUtils.reset();

      //Sign창 보여주기
      cardUtils.showSignView(0, 10);

      var errMsg;
      let ret = this.cardX.ReqSignA(2, "0700081", apprAmt, "", "", errMsg);
      if (ret != 0) {
        this.trace(`[${ret}]전자서명 장비에 사인 요청 실패`);
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

            this.clickBtnSignPadCancel();
          }
        );
      }
    },
    OnRcvData(Cmd, GCD, JCD, RCD, RData, RHexData) {
      this.trace("PGE_CTM_0004 cardX_OnRcvData");
      this.trace(`==>Cmd:[${Cmd}]`);
      this.trace(`==>GCD:[${GCD}]`);
      this.trace(`==>JCD:[${JCD}]`);
      this.trace(`==>RCD:[${RCD}]`);
      this.trace(`==>RData:[${RData}]`);
      this.trace(`==>RHexData:[${RHexData}]`);

      //전자서명 응답
      if (Cmd == parseInt("A7", 16)) {
        this.trace("Sign_OnRcvData");
        // SignPad에서 확인 버튼 클릭 시
        if (this.cardX.SignLen != null && this.cardX.SignLen.length > 4000) {
          //Sign창 숨기기
          cardUtils.hideSignView();
          window.utils.messageBox("alert", this.getMessage('MSG_ALT_ESIGN_DATA_LEN_OVER_ERR'), null, () => {
              let apprAmt = parseInt(window.utils.trim(this.signData.apprAmt));
              this.sendReqSign(apprAmt);
            });
          return;
        }
        //Sign창 숨기기
        cardUtils.hideSignView();

        // 전자서명 : Y
        this.trace("this.cardX.SignLen", this.cardX.SignLen);
        this.trace("this.cardX.Sign", this.cardX.Sign);
        this.signData.eSign = window.utils.trim(this.cardX.Sign);
        this.signComplete();

        //카드 리더기 초기화
        cardUtils.reset();
      }
    },
    OnMessage(Msg) {
      this.trace("OnMessage:Msg:" + Msg);
    },
    //Sign 패드 취소 버튼 클릭
    clickBtnSignPadCancel() {
        //Sign창 숨기기
        cardUtils.hideSignView();

        // 전자서명 : Y
        this.signData.eSign = "";
        this.signComplete();

    },
    //Sign 패드 창닫기
    closeSignPad() {
      this.trace("closeSignPad() call!");

      cardUtils.reset();

      // Sign Data 초기화
      this.signData = {};

      //카드리더기 close
      cardUtils.close();

      //close 메시지 마지막으로 메인에 보내기
      this.webrtcDatachannel.sendClose();

      //창닫기      
      top.window.opener = top;
      top.window.open('', '_parent', '');
      top.window.close();
    },
    //서명 입력 완료
    signComplete() {
      //사인 결과 호출 페이지 반영
      let msg = {
        type: "sendSign",
        data: { signData: this.signData },
      };
      this.trace("signComplete() > sendMessage payCardList");
      this.webrtcDatachannel.sendMessage(msg);
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

