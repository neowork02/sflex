<template>
  <sui-page>
    <div class="modalWrap" style="height: auto; overflow-y: scroll">
      <sui-page-header :pageId="this.$options.name" />
      <!-- ::S alert 콘텐츠 -->
      <template>
        <div class="modal-body">
          <div class="cardpayWrap">
            <div class="msgWrap">
              <span class="accountTitChoice">{{ message }}</span>
            </div>
            <!-- ::E alert 콘텐츠 -->
            <br />
            <!-- S::btn_wrap -->
            <div class="btn_wrap">
              <sui-button type="button" @click="checkIcCardReader" class="default"><span>다시하기</span></sui-button>
              <sui-button type="button" @click="closeWindow" class="point"><span>닫기</span></sui-button>
            </div>
            <!-- E::btn_wrap -->
          </div>
        </div>
      </template>
    </div>
  </sui-page>
</template>
<script>
import WebrtcDatachannel from "~common/js/webrtc-datachannel.js";
import cardUtils from "~common/js/cardUtils/card-utils.js";
export default {
  name: "PGE_CTM_00020", // eslint-disable-line vue/name-property-casing
  components: {},
  data() {
    return {
      isLogging : true, // console log 남기기 여부

      cardX: null, //카드 모듈
      strReaderId: "",
      strSwVersion: '',
      icReaderPort1: 0,
      icReaderSpeed1: 0,
      curDt: "",
      loginData: null,

      message: this.getMessage('MSG_ALT_IC_READER_CHECK_ING'),

      mainPage: "",
      accessDateTime : "",
    };
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    //카드 모듈 로딩
    cardUtils.cardLoad(this);
  },
  async mounted() {
    window.addEventListener("beforeunload", this.windowUnLoad);

    this.loginData = window.utils.getLoginData();
    this.icReaderPort1 = window.cardUtils.parsePort(window.utils.getLoginUserInfo().icReaderPort);
    this.icReaderSpeed1 = window.cardUtils.parseSpeed(window.utils.getLoginUserInfo().icReaderSpeed);
    this.strSwVersion = window.utils.getLoginUserInfo().icSwCertifyNo;

    this.trace("this.icReaderPort1:"+ this.icReaderPort1);
    this.trace("this.icReaderSpeed1:" + this.icReaderSpeed1);

    await window.http.getSystemTime().then(res => { this.curDt = res.nowDateTime; });
    
    //카드 리스너 등록
    window.cardUtils.setListenerVuePage(this);
    
    //카드모듈 가져오기
    this.cardX = window.cardUtils.getCardX();
    
    //Main창과 인터페이스 위해 현재 페이지 등록
    this.mainPage = this.$route.query.mainPage;
    this.accessDateTime = this.$route.query.accessDateTime;
    this.webrtcDatachannel = new WebrtcDatachannel(
        this.$options.name, //thisPage
        this.mainPage, //mainPage
        window.utils.getLoginUserInfo().userIp, //ip
        this.accessDateTime, //accessDateTime
        this.receiveMessageFromMain, //reciveCallback
        this.initCallBack, //initCallback
        this.closeMainCallBack //closeCallback
    );
    this.webrtcDatachannel.setVuePage(this);

    await this.webrtcDatachannel.initSecure();

    this.webrtcDatachannel.connect();
  },
  beforeDestroy() {
    this.windowUnLoad();
  },
  filters: {},
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
        //창이 앞으로 오기
        window.focus();

        //무결성 체크하기
        this.checkIcCardReader();
      } else if (param.type == "focus") {
        window.focus();
      }
    },
    //main과 채널 생성 후 callback
    initCallBack() {},
    //Main창이 닫히는 이벤트 callback
    closeMainCallBack() {
      this.closeWindow();
    },
    checkIcCardReader() {
      //카드모듈 Open
      cardUtils.open(this.icReaderPort1, this.icReaderSpeed1);

      this.message = this.getMessage('MSG_ALT_IC_READER_CHECK_ING');
      let strErrMsg;
      if (this.cardX.ReqCmd(0xfb, 0x11, 0x30, 0x00, strErrMsg) != 0) {
        this.writeTestResult(false, this.icReaderPort1, this.getMessage('MSG_ALT_CHECK_REQ_ERR'), this.strReaderId);
        cardUtils.close();
        return;
      }
    },
    getIcCardUnitInfo() {
      // ic card 단말기 정보 수집
      this.message = this.getMessage('MSG_ALT_IC_READER_INFO_REQ_ING');
      let strErrMsg;
      if (this.cardX.ReqCmd(0xfb, 0x11, 0x02, 0x00, strErrMsg) != 0) {
        this.writeTestResult(false, this.icReaderPort1, this.getMessage('MSG_ALT_INFO_REQ_ERR'), this.strReaderId);
        cardUtils.close();
        return;
      }
    },
    OnRcvData(CMD, GCD, JCD, RCD, RData, RHEXDATA) {
      this.trace("OnRcvData.CMD=>", CMD);
      this.trace("OnRcvData.GCD=>", GCD);
      this.trace("OnRcvData.JCD=>", JCD);
      this.trace("OnRcvData.RCD=>", RCD);
      this.trace("OnRcvData.RData=>", RData);
      this.trace("OnRcvData.RHEXDATA=>", RHEXDATA);

      //무결성 검사
      if (CMD == 0xfb && GCD == 0x11 && JCD == 0x30 && RCD == 0x00) {
        if (RData.substring(0, 1) != "G") {
          this.writeTestResult( false, this.icReaderPort1, this.getMessage('MSG_ALT_IC_READER_CHECK_FAIL'), this.strReaderId);
          cardUtils.close();
        } else {
          this.getIcCardUnitInfo();
        }
      } 
      //단말기 정보 수집
      else if (CMD == 0xfb && GCD == 0x11 && JCD == 0x02) {
        if (RCD != 0x00) {
          // 단말기정보 수집 2
          this.strReaderId = "";
          this.writeTestResult(false, this.icReaderPort1, this.getMessage('MSG_ALT_IC_READER_INFO_FAIL'), this.strReaderId);
          window.cardUtils.close();
        } else {
          this.strReaderId = RData.substring(47, 63);
          this.writeTestResult(true, this.icReaderPort1, this.getMessage('MSG_ALT_IC_READER_CHECK_SUCCESS'), this.strReaderId);
          cardUtils.close();
        }
      }
    },
    OnMessage(Msg) {
      this.trace("OnMessage:Msg:" + Msg);
    },
    async writeTestResult(rflag, kiccPosPort, msg, readerId) {
      var strResult = "SUCCESS";
      let param = {};
      if ( rflag == false || this.strReaderId == null || this.strReaderId.length == 0) {
        param.readerId = msg;
        strResult = "FAIL";
      } else {
        param.readerId = readerId; // IC Card Reader ID
      }
      
      await window.http.getSystemTime().then(res => { this.curDt = res.nowDateTime; });

      param.posIp = window.utils.getLoginUserInfo().userIp;
      param.portNo = kiccPosPort + "";
      param.result = strResult;
      param.swVersion = this.strSwVersion;
      param.workDate = this.curDt.substring(0, 8);
      param.workTime = this.curDt.substring(8, 14);

      await window.http.request(this.$options.name, "DTS_BAP_00001", {
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
        this.sendFail();
        this.message = `${this.getMessage('MSG_ALT_IC_READER_CHECK_FAIL')}: [${msg}]`;
        window.utils.messageBox("alert", this.message);
      } else {
        this.sendSuccess();
        this.message = strResult;
        this.closeWindow();
      }
    },
    //무결성체크 실패 메시지 전송
    sendFail() {
      let msg = {
        type: "fail",
      };
      this.webrtcDatachannel.sendMessage(msg);
    },
    //무결성체크 성공 메시지 전송
    sendSuccess() {
      let msg = {
        type: "success",
      };
      this.webrtcDatachannel.sendMessage(msg);
    },
    closeWindow() {
      top.window.opener = top;
      top.window.open("", "_parent", "");
      top.window.close();
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
