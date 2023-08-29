<template>
  <div>
    <div class="comm_title_wrap mt10">
      <h4>{{$t('MSG_TXT_APPR_LOG')}}</h4><!-- 승인기록 -->
      <div class="right_box">
        <div class="totalNo">
          <div class="totalCt">Total<span>{{ list.length }}</span>{{ $t('MSG_TXT_CNT') }}</div>
        </div>
      </div>
    </div>
    <real-grid 
      ref="apprGrid"
      grid-id="pgeSaa00001T06"
      grid-root="/lib"
      :gridFields="apprFields"
      :gridColumns="apprColumns"
      :gridRows="list"
      :gridCheckBar="{ visible:false }"
      :style="{height: '200px'}"/>
  </div>
</template>
<script>
export default {
  name: "PGE_SAA_00001_T06",
  components: {}, // eslint-disable-line vue/name-property-casing
  props: {
    list: {
      type: Array,
      required: false,
      default: () => []
    },
  },
  data() {
    return {
      // 권종
      apprFields: [
        { fieldName: "ymd", dataType: 'datetime', datetimeFormat: "yyyyMMdd" },
        { fieldName: "hms", dataType: 'datetime', datetimeFormat: "HHmmss" },
        { fieldName: "cardNo", dataType: 'text' },
        { fieldName: "cardNoFg", dataType: 'text' },
        { fieldName: "txlName", dataType: 'text' },
        { fieldName: "tlxFg", dataType: 'text' },
        { fieldName: "posId", dataType: 'text' },
        { fieldName: "terminalFgName", dataType: 'text' },
        { fieldName: "cardCheckBillFgName", dataType: 'text' },
        { fieldName: "wcc", dataType: 'text' },
        { fieldName: "cardDataLenth", dataType: 'text' },
        { fieldName: "cardData", dataType: 'text' },
        { fieldName: "instNm", dataType: 'text' },
        { fieldName: "serviceFee", dataType: 'text' },
        { fieldName: "vat", dataType: 'text' },
        { fieldName: "approveCardAmt", dataType: 'number' },
        { fieldName: "passwd", dataType: 'text' },
        { fieldName: "rYmd", dataType: 'datetime', datetimeFormat: "yyyyMMdd" },
        { fieldName: "rHms", dataType: 'datetime', datetimeFormat: "HHmmss" },
        { fieldName: "rTxlName", dataType: 'text' },
        { fieldName: "rResponseCd", dataType: 'text' },
        { fieldName: "rApproveNo", dataType: 'text' },
        { fieldName: "rApproveVanFgName", dataType: 'text' },
        { fieldName: "rUseSelfFg", dataType: 'text' },
        { fieldName: "rFellowMaxCnt", dataType: 'text' },
        { fieldName: "rCardResponseMsg", dataType: 'text' },
        { fieldName: "rApproveDay", dataType: 'datetime', datetimeFormat: "yyyyMMdd" },
        { fieldName: "rApproveTime", dataType: 'datetime', datetimeFormat: "HHmmss" },
        { fieldName: "rSalePosId", dataType: 'text' },
        { fieldName: "cYmd", dataType: 'datetime', datetimeFormat: "yyyyMMdd" },
        { fieldName: "cHms", dataType: 'datetime', datetimeFormat: "HHmmss" },
        { fieldName: "cSendCnt", dataType: 'text' },
        { fieldName: "cTxlName", dataType: 'text' },
        { fieldName: "cTlxFgName", dataType: 'text' },
        { fieldName: "cPosId", dataType: 'text' },
        { fieldName: "cTerminalFgName", dataType: 'text' },
        { fieldName: "cCardCheckBillFgName", dataType: 'text' },
        { fieldName: "cWcc", dataType: 'text' },
        { fieldName: "cCardDataLenth", dataType: 'text' },
        { fieldName: "cCardData", dataType: 'text' },
        { fieldName: "instNm1", dataType: 'text' },
        { fieldName: "cServiceFee", dataType: 'text' },
        { fieldName: "cVat", dataType: 'text' },
        { fieldName: "cApproveCardAmt", dataType: 'number' },
        { fieldName: "cPasswd", dataType: 'text' },
        { fieldName: "cApproveVanFgName", dataType: 'text' },
        { fieldName: "cApproveNo", dataType: 'text' },
        { fieldName: "cOrgApproveDay", dataType: 'datetime', datetimeFormat: "yyyyMMdd" },
        { fieldName: "cOrgApproveTime", dataType: 'datetime', datetimeFormat: "HHmmss" },
        { fieldName: "crYmd", dataType: 'datetime', datetimeFormat: "yyyyMMdd" },
        { fieldName: "crHms", dataType: 'datetime', datetimeFormat: "HHmmss" },
        { fieldName: "crRecvCnt", dataType: 'text' },
        { fieldName: "crTxlName", dataType: 'text' },
        { fieldName: "crInquiryResCd", dataType: 'text' },
        { fieldName: "crApproveNo", dataType: 'text' },
        { fieldName: "crApproveVanFgName", dataType: 'text' },
        { fieldName: "crInquiryResMsg", dataType: 'text' },
        { fieldName: "accountUser", dataType: 'text' },
        { fieldName: "accountName", dataType: 'text' },
        { fieldName: "ip", dataType: 'text' },
        { fieldName: "cancelUser", dataType: 'text' },
        { fieldName: "cancelName", dataType: 'text' },
        { fieldName: "cancelIp", dataType: 'text' }
      ],
      apprColumns: [
        {name: 'ymdColumn', fieldName: 'ymd', width: 100, header: {text: this.$t('MSG_TXT_APPR_DATE')}, datetimeFormat: 'yyyy/MM/dd', edit: false }, // 승인일자
        {name: 'hmsColumn', fieldName: 'hms', width: 100, header: {text: this.$t('MSG_TXT_APPR_TIME2')}, datetimeFormat: 'HH:mm:ss', edit: false }, // 승인시각
        {name: 'cardNoColumn', fieldName: 'cardNo', width: 150, header: {text: this.$t('MSG_TXT_CREDIT_CARD_NO')}, edit: false }, // 신용카드번호
        {name: 'cardNoFgColumn', fieldName: 'cardNoFg', width: 100, header: {text: this.$t('MSG_TXT_CARD_CORP_CD')}, edit: false }, // 카드사코드
        {name: 'txlNameColumn', fieldName: 'txlName', width: 350, header: {text: this.$t('MSG_TXT_FULL_TXT_ID')}, edit: false }, // 전문ID
        {name: 'tlxFgColumn', fieldName: 'tlxFg', width: 100, header: {text: this.$t('MSG_TXT_FULL_TXT_KIND')}, edit: false }, // 전문구분
        {name: 'posIdColumn', fieldName: 'posId', width: 110, header: {text: 'POS ID'}, edit: false },
        {name: 'terminalFgNameColumn', fieldName: 'terminalFgName', width: 100, header: {text: this.$t('MSG_TXT_TERMINAL_ID_KIND')}, edit: false }, // 터미널ID 구분
        {name: 'cardCheckBillFgNameColumn', fieldName: 'cardCheckBillFgName', width: 120, header: {text: this.$t('MSG_TXT_CC_CHECK_KIND')}, edit: false }, // 신용카드/수표구분
        {name: 'wccColumn', fieldName: 'wcc', width: 100, header: {text: 'WCC'}, edit: false },
        {name: 'cardDataLenthColumn', fieldName: 'cardDataLenth', width: 100, header: {text: this.$t('MSG_TXT_CARD_DATA_LENGTH')}, edit: false }, // 카드DATA 길이
        {name: 'cardDataColumn', fieldName: 'cardData', width: 150, header: {text: this.$t('MSG_TXT_CARD_DATA')}, edit: false }, // 카드 DATA
        {name: 'instNmColumn', fieldName: 'instNm', width: 100, header: {text: this.$t('MSG_TXT_INST_MONTHS')}, edit: false }, // 할부개월
        {name: 'serviceFeeColumn', fieldName: 'serviceFee', width: 100, header: {text: this.$t('MSG_TXT_SVC_CHARGE')}, edit: false }, // 봉사료
        {name: 'vatColumn', fieldName: 'vat', width: 100, header: {text: this.$t('MSG_TXT_VAT_FEE')}, edit: false }, // 부가세
        {name: 'approveCardAmtColumn', fieldName: 'approveCardAmt', width: 100, header: {text: this.$t('MSG_TXT_APPR_AMT')}, edit: false, numberFormat: "#,##0" }, // 승인금액
        {name: 'passwdColumn', fieldName: 'passwd', width: 100, header: {text: this.$t('MSG_TXT_PW')}, edit: false }, // 비밀번호
        {name: 'rYmdColumn', fieldName: 'rYmd', width: 100, header: {text: this.$t('MSG_TXT_APPR_DATE')}, datetimeFormat: 'yyyy/MM/dd', edit: false }, // 승인일자
        {name: 'rHmsColumn', fieldName: 'rHms', width: 100, header: {text: this.$t('MSG_TXT_APPR_TIME2')}, datetimeFormat: 'HH:mm:ss', edit: false }, // 승인시각
        {name: 'rTxlNameColumn', fieldName: 'rTxlName', width: 100, header: {text: this.$t('MSG_TXT_RCV_PRTC_KIND')}, edit: false }, // 수신전문구분
        {name: 'rResponseCdColumn', fieldName: 'rResponseCd', width: 100, header: {text: this.$t('MSG_TXT_RESP_CODE')}, edit: false }, // 응답코드
        {name: 'rApproveNoColumn', fieldName: 'rApproveNo', width: 100, header: {text: this.$t('MSG_TXT_APPR_NO')}, edit: false }, // 승인번호
        {name: 'rApproveVanFgNameColumn', fieldName: 'rApproveVanFgName', width: 100, header: {text: this.$t('MSG_TXT_APPR_VAN_KIND')}, edit: false }, // 승인VAN사 구분
        {name: 'rUseSelfFgColumn', fieldName: 'rUseSelfFg', width: 100, header: {text: this.$t('MSG_TXT_PIC_USE_YN')}, edit: false }, // 본인사용여부
        {name: 'rFellowMaxCntColumn', fieldName: 'rFellowMaxCnt', width: 100, header: {text: this.$t('MSG_TXT_CO_ACC_CNT')}, edit: false }, // 동반인수
        {name: 'rCardResponseMsgColumn', fieldName: 'rCardResponseMsg', width: 100, header: {text: this.$t('MSG_TXT_APPR_RESP_MSG')}, edit: false }, // 승인응답메세지
        {name: 'rApproveDayColumn', fieldName: 'rApproveDay', width: 100, header: {text: this.$t('MSG_TXT_APPR_DATE')}, datetimeFormat: 'yyyy/MM/dd', edit: false }, // 승인일자
        {name: 'rApproveTimeColumn', fieldName: 'rApproveTime', width: 100, header: {text: this.$t('MSG_TXT_APPR_TIME2')}, datetimeFormat: 'HH:mm:ss', edit: false }, // 승인시각
        {name: 'rSalePosIdColumn', fieldName: 'rSalePosId', width: 100, header: {text: this.$t('MSG_TXT_RCV_PRTC_POSID')}, edit: false }, // 수신전문포스ID
        {name: 'cYmdColumn', fieldName: 'cYmd', width: 100, header: {text: this.$t('MSG_TXT_CANCEL_REQ_DATE')}, datetimeFormat: 'yyyy/MM/dd', edit: false }, // 취소요청일자
        {name: 'cHmsColumn', fieldName: 'cHms', width: 100, header: {text: this.$t('MSG_TXT_CANCEL_REQ_TIME')}, datetimeFormat: 'HH:mm:ss', edit: false }, // 취소요청시각
        {name: 'cSendCntColumn', fieldName: 'cSendCnt', width: 110, header: {text: this.$t('MSG_TXT_CANCEL_SND_TRY_CNT')}, edit: false }, // 취소송신시도횟수
        {name: 'cTxlNameColumn', fieldName: 'cTxlName', width: 100, header: {text: this.$t('MSG_TXT_CANCEL_SND_PRTC_ID')}, edit: false }, // 취소송신 전문ID
        {name: 'cTlxFgNameColumn', fieldName: 'cTlxFgName', width: 110, header: {text: this.$t('MSG_TXT_CANCEL_SND_PRTC_KIND')}, edit: false }, // 취소송신 전문구분
        {name: 'cPosIdColumn', fieldName: 'cPosId', width: 100, header: {text: this.$t('MSG_TXT_CANCEL_SND_POS_ID')}, edit: false }, // 취소송신포스ID
        {name: 'cTerminalFgNameColumn', fieldName: 'cTerminalFgName', width: 110, header: {text: this.$t('MSG_TXT_CANCEL_SND_TERMINAL_ID')}, edit: false }, // 취소송신 터미널ID
        {name: 'cCardCheckBillFgNameColumn', fieldName: 'cCardCheckBillFgName', width: 110, header: {text: this.$t('MSG_TXT_CANCEL_SND_SRCH_KIND')}, edit: false }, // 취소송신조회구분
        {name: 'cWccColumn', fieldName: 'cWcc', width: 100, header: {text: this.$t('MSG_TXT_CANCEL_SND_WCC')}, edit: false }, // 취소송신 WCC
        {name: 'cCardDataLenthColumn', fieldName: 'cCardDataLenth', width: 150, header: {text: this.$t('MSG_TXT_CANCEL_SND_CARD_DATA_LENGTH')}, edit: false }, // 취소송신카드 DATA길이
        {name: 'cCardDataColumn', fieldName: 'cCardData', width: 150, header: {text: this.$t('MSG_TXT_CANCEL_SND_CARD_DATA')}, edit: false }, // 취소송신카드DATA
        {name: 'instNm1Column', fieldName: 'instNm1', width: 120, header: {text: this.$t('MSG_TXT_CANCEL_SND_INST_MONTHS')}, edit: false }, // 취소송신 할부개월
        {name: 'cServiceFeeColumn', fieldName: 'cServiceFee', width: 100, header: {text: this.$t('MSG_TXT_CANCEL_FEE')}, edit: false }, // 취소수수료
        {name: 'cVatColumn', fieldName: 'cVat', width: 100, header: {text: this.$t('MSG_TXT_CANCEL_VAT_FEE')}, edit: false }, // 취소부가세
        {name: 'cApproveCardAmtColumn', fieldName: 'cApproveCardAmt', width: 120, header: {text: this.$t('MSG_TXT_CANCEL_SND_APPR_AMT')}, edit: false, numberFormat: "#,##0" }, // 취소송신 승인금액
        {name: 'cPasswdColumn', fieldName: 'cPasswd', width: 120, header: {text: this.$t('MSG_TXT_CANCEL_PW')}, edit: false }, // 취소송신 비밀번호
        {name: 'cApproveVanFgNameColumn', fieldName: 'cApproveVanFgName', width: 140, header: {text: this.$t('MSG_TXT_CANCEL_SND_VAN_KIND')}, edit: false }, // 취소송신 VAN사 구분
        {name: 'cApproveNoColumn', fieldName: 'cApproveNo', width: 120, header: {text: this.$t('MSG_TXT_CANCEL_SND_APPR_NO')}, edit: false }, // 취소송신 승인번호
        {name: 'cOrgApproveDayColumn', fieldName: 'cOrgApproveDay', width: 150, header: {text: this.$t('MSG_TXT_CANCEL_SND_ORG_APPR_DATE')}, datetimeFormat: 'yyyy/MM/dd', edit: false }, // 취소송신 원거래 승인일자
        {name: 'cOrgApproveTimeColumn', fieldName: 'cOrgApproveTime', width: 150, header: {text: this.$t('MSG_TXT_CANCEL_SND_ORG_APPR_TIME')}, datetimeFormat: 'HH:mm:ss', edit: false }, // 취소송신 원거래 승인시각
        {name: 'crYmdColumn', fieldName: 'crYmd', width: 100, header: {text: this.$t('MSG_TXT_CANCEL_DATE')},datetimeFormat: 'yyyy/MM/dd', edit: false }, // 취소일자
        {name: 'crHmsColumn', fieldName: 'crHms', width: 100, header: {text: this.$t('MSG_TXT_CANCEL_TIME2')}, datetimeFormat: 'HH:mm:ss', edit: false }, // 취소시각
        {name: 'crRecvCntColumn', fieldName: 'crRecvCnt', width: 120, header: {text: this.$t('MSG_TXT_CANCEL_RCV_TRY_CNT')}, edit: false }, // 취소수신 시도 횟수
        {name: 'crTxlNameColumn', fieldName: 'crTxlName', width: 100, header: {text: this.$t('MSG_TXT_CANCEL_RCV_PRTC_ID')}, edit: false }, // 취소수신 전문ID
        {name: 'crInquiryResCdColumn', fieldName: 'crInquiryResCd', width: 120, header: {text: this.$t('MSG_TXT_CANCEL_RCV_RES_CD')}, edit: false }, // 취소수신 응답코드
        {name: 'crApproveNoColumn', fieldName: 'crApproveNo', width: 120, header: {text: this.$t('MSG_TXT_CANCEL_APPR_APPR_NO')}, edit: false }, // 취소승인 승인번호
        {name: 'crApproveVanFgNameColumn', fieldName: 'crApproveVanFgName', width: 160, header: {text: this.$t('MSG_TXT_CANCEL_RCV_APPR_VAN_KIND')}, edit: false }, // 취소수신 승인VAN사구분
        {name: 'crInquiryResMsgColumn', fieldName: 'crInquiryResMsg', width: 120, header: {text: this.$t('MSG_TXT_CANCEL_RCV_RES_MSG')}, edit: false }, // 취소수신 응답메세지
        {name: 'accountUserColumn', fieldName: 'accountUser', width: 100, header: {text: this.$t('MSG_TXT_EOD_PS')}, edit: false }, // 정산인
        {name: 'accountNameColumn', fieldName: 'accountName', width: 100, header: {text: this.$t('MSG_TXT_EOD_PS_NM')}, edit: false }, // 정산인명
        {name: 'ipColumn', fieldName: 'ip', width: 100, header: {text: this.$t('MSG_TXT_APPR_IP')}, edit: false }, // 승인IP
        {name: 'cancelUserColumn', fieldName: 'cancelUser', width: 100, header: {text: this.$t('MSG_TXT_CANCEL_APPR_CHSR')}, edit: false }, // 취소승인 담당자
        {name: 'cancelNameColumn', fieldName: 'cancelName', width: 120, header: {text: this.$t('MSG_TXT_CANCEL_APPR_CHSR_NM')}, edit: false }, // 취소승인 담당자명
        {name: 'cancelIpColumn', fieldName: 'cancelIp', width: 100, header: {text: this.$t('MSG_TXT_CANCEL_IP')}, edit: false } // 취소IP
      ]
    }
  },
  computed: {},
  watch: {
    list: {
      deep: true,
      handler(newList, oldList) {
        this.$refs.apprGrid.setRows(newList)
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
  },
};
</script>
<style scoped></style>
