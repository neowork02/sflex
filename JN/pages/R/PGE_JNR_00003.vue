<template>
  <sui-page class="custom_page">
    <div class="modalWrap" style="height: auto;">
      <template slot="title">
          <div class="modal-title mb45">${{ $t('MSG_TIT_JN03_MNG') }}</div>
        </template>
        <template>
          <div class="modal-body">
            <!-- ::S 콘텐츠1 -->
            <div class="msgWrap">
              <span class="accountTitChoice">{{ payerText }}</span>
              <ur-icon-button icon="search" @click="clickSearch" />
            </div>
           <div class="btn_wrap mt20">
              <div class="center_box">
                <ur-button @click="clickConfirm" v-show="showBtnConfirm">{{ $t('MSG_BTN_CFRM') }}</ur-button>
                <ur-button @click="clickCancel" color="violet">취소</ur-button>
              </div>
            </div>
            <!--::S InfoText -->
            <div class="guideWrap guideList mt20">
              <ul class="listDot acc">
                <li>{{ $t('MSG_TXT_MEMBERSHIP_POINTS_OF_THE_PAYER_ARE_USED')}}</li>
                <li>{{ $t('MSG_TXT_MEMBERSHP_POINTS_ARE_CREDITED_TO_THE_PAYER')}}</li>
                <li>{{ $t('MSG_TXT_COUPON_IS_GIVEN_TO_THE_PAYER')}}</li>
              </ul>
            </div>
            <!--::E InfoText -->
            <!-- ::E 콘텐츠1 -->
          </div>
        </template>
    </div> 
    <!-- ::E 팝업-->
  </sui-page>
</template>

<script>
export default {
  name: "PGE_JNR_00003", // eslint-disable-line vue/name-property-casing
  components: {},
  props: {
    pageInitialData: {
      type: Object,
      default: () => { },
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
      payerMemberName: "", //결제자 명
      payerMemshpUid: "", //결제자 UID
      payerMemberKind: "", //결제자 회원구분
      payerMemberKindNm: "", //결제자 회원구분명

      payerText: "",
    };
  },
  created() {},
  mounted() {
    this.payerMemshpUid = this.pageInitialData.payerMemshpUid;
    this.payerMemberName = this.pageInitialData.payerMemberName;
    this.payerMemberKind = this.pageInitialData.payerMemberKind;

    this.setPayerText();
  },
  computed: {
    showBtnConfirm() {
      if (utils.length(this.payerMemshpUid) > 0 && utils.length(this.payerMemberKind)) {
        return true;
      }
      else {
        return false;
      }
    },
  },
  watch: {},
  methods: {
    /**
     * 결제자 Text 세팅
     */
    setPayerText() {
      if (utils.length(this.payerMemshpUid) > 0 && utils.length(this.payerMemberKind) > 0) {
        
        this.payerMemberKindNm = ("2" == this.payerMemberKind)? "정회원" : "준회원";
        this.payerText = this.payerMemberName + "("+ this.payerMemberKindNm +")";
      }
      else {
        this.payerText = this.$t('MSG_ALT_PLZ_SEL_THE_PAYER');
      }
    },
    /**
     * 조회 Click
     */
    clickSearch() {
      utils.openLayerPopup("PGE_CTM_00016", (result) => {
        console.log("result",result);
          if (result) {
            this.payerMemshpUid = result.memshpUid
            this.payerMemberName = result.name
            this.payerMemberKind = result.memberKind
            this.setPayerText();
          }
        },
        {
          pageInitialData: {},
          size: "lg",
        });
    },
    /**
     * 확인 Click
     */
    clickConfirm() {
      let returnVal = {};
      returnVal.status = 'CONFIRM';
      returnVal.payerMemshpUid = this.payerMemshpUid;
      returnVal.payerMemberName = this.payerMemberName;
      returnVal.payerMemberKind = this.payerMemberKind;
      this.closePagePopup(returnVal);
    },
    /**
     * 취소 Click
     */
    clickCancel() {
      this.closePagePopup(null);
    },
  },
};
</script>
<style scoped></style>
