<template>
  <div>
    <div class="comm_title_wrap mt10">
      <h4>{{ $t('MSG_TXT_CREDIT_CARD') }}</h4><!-- 신용카드 -->
      <div class="right_box">
        <div class="totalNo">
          <div class="totalCt">Total<span>{{ list.length }}</span>{{ $t('MSG_TXT_CNT') }}</div>
        </div>
      </div>
    </div>
    <real-grid 
      ref="cardGrid"
      grid-id="pgeSaa00001T02"
      grid-root="/lib"
      :gridFields="cardFields"
      :gridColumns="cardColumns"
      :gridRows="list"
      :gridCheckBar="{ visible:false }"
      :gridImgRendererId="'renderer_imgbtn'"
      :gridImgRendererEventObj="rendererEventObj"
      :style="{height: '200px'}"/>
  </div>
</template>
<script>
import CardPopupUtils from '~common/js/card-popup-utils.js';
export default {
  name: "PGE_SAA_00001_T02",
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
      cardFields: [
        { fieldName: "esign", dataType: 'text' },
        { fieldName: "cardNo", dataType: 'text' },
        { fieldName: "cardCmpnyNm", dataType: 'text' },
        { fieldName: "apprDate", dataType: 'datetime', datetimeFormat: "yyyyMMdd"},
        { fieldName: "apprTime", dataType: 'datetime', datetimeFormat: "hhmmss"},
        { fieldName: "apprNo", dataType: 'text' },
        { fieldName: "vanKindNm", dataType: 'text' },
        { fieldName: "expireYm", dataType: 'datetime', datetimeFormat: "MMyy"},
        { fieldName: "divideGigan", dataType: 'text' },
        { fieldName: "apprAmt", dataType: 'number' },
        { fieldName: "cardSvcCd", dataType: 'text' },
        { fieldName: "cancelDate", dataType: 'datetime', datetimeFormat: "yyyyMMdd"},
        { fieldName: "cancelTime", dataType: 'datetime', datetimeFormat: "hhmmss"},
        { fieldName: "cancelApprNo", dataType: 'text' },
        { fieldName: "esignYn", dataType: 'text' },
        { fieldName: "rePaymentYn", dataType: 'text' },
      ],
      cardColumns: [{
        name: 'esignColumn',
        fieldName: 'esign',
        width: 60,
        header: { 
          text: this.$t('MSG_TXT_SIGN') // 서명
        },
        renderer: "renderer_imgbtn",
        edit: false 
      },{
        name: 'cardNoColumn',
        fieldName: 'cardNo',
        width: 150,
        header: { 
          text: this.$t('MSG_TXT_CREDIT_CARD_NO') // 신용카드번호
        },
        edit: false 
      },{
        name: 'cardCmpnyNmColumn',
        fieldName: 'cardCmpnyNm',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_CREDIT_CARD_CMPNY') // 신용카드사
        },
        edit: false 
      },{
        name: 'apprDateColumn',
        fieldName: 'apprDate',
        width: 100,
        datetimeFormat: 'yyyy/MM/dd',
        header: { 
          text: this.$t('MSG_TXT_APPR_DATE') // 승인일자
        },
        edit: false 
      },{
        name: 'apprTimeColumn',
        fieldName: 'apprTime',
        width: 100,
        datetimeFormat: 'HH:mm:ss',
        header: { 
          text: this.$t('MSG_TXT_APPR_TIME') // 승인시간
        },
        edit: false 
      },{
        name: 'apprNoColumn',
        fieldName: 'apprNo',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_APPR_NO') // 승인번호
        },
        edit: false 
      },{
        name: 'vanKindNmColumn',
        fieldName: 'vanKindNm',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_VAN_CMPNY') // VAN사
        },
        edit: false 
      },{
        name: 'expireYmColumn',
        fieldName: 'expireYm',
        width: 100,
        datetimeFormat: 'MM/yy',
        header: { 
          text: this.$t('MSG_TXT_VALID_PERIOD') // 유효기간
        },
        edit: false 
      },{
        name: 'divideGiganColumn',
        fieldName: 'divideGigan',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_INST') // 할부
        },
        edit: false 
      },{
        name: 'apprAmtColumn',
        fieldName: 'apprAmt',
        width: 100,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_APPR_AMT') // 승인금액
        },
        edit: false 
      },{
        name: 'cardSvcCdColumn',
        fieldName: 'cardSvcCd',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_CARD_SVC_NM') // 카드서비스명
        },
        edit: false 
      },{
        name: 'rePaymentYnColumn',
        fieldName: 'rePaymentYn',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_REPAY_YN') // 재결제여부
        },
        edit: false 
      },{
        name: 'cancelDateColumn',
        fieldName: 'cancelDate',
        width: 100,
        datetimeFormat: 'yyyy/MM/dd',
        header: { 
          text: this.$t('MSG_TXT_CANCEL_DATE') // 취소일자
        },
        edit: false 
      },{
        name: 'cancelTimeColumn',
        fieldName: 'cancelTime',
        width: 100,
        datetimeFormat: 'HH:mm:ss',
        header: { 
          text: this.$t('MSG_TXT_CANCEL_TIME') // 취소시간
        },
        edit: false 
      },{
        name: 'cancelApprNoColumn',
        fieldName: 'cancelApprNo',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_CANCEL_APPR_NO') // 취소승인번호
        },
        edit: false 
      }],
      rendererEventObj: {
        initContent: (parent) => {
          var div = document.createElement("div");
          div.className = "rg-btn-search";
          parent.appendChild(this._div = div);
        },
        canClick: () => true,
        render: (grid, model, width, height, info)  => { 
          const ISESIGN = this.$refs.cardGrid.getJsonRows()[model._index._itemIndex].esignYn == 'Y'
          this._modelData = model
          this._div.style.visibility = (ISESIGN ? 'visible' : 'hidden')
        },
        click: event => {
          if (this.$refs.cardGrid.getJsonRows()[this._modelData._index._itemIndex].esignYn == 'Y') {
            const ESIGN = this.$refs.cardGrid.getJsonRows()[this._modelData._index._itemIndex].esign
            this.openPopupEsign(ESIGN)
          }
        },
      }
    } // data end
  },
  computed: {},
  watch: {
    list: {
      deep: true,
      handler(newList, oldList) {
        this.$refs.cardGrid.setRows(newList)
      }
    }
  },
  created() {},
  mounted() {
    this.cardPopupUtils = new CardPopupUtils();
  },
  methods: {
    // Sign 입력창 띄우기
    openPopupEsign(esign) {
      this.cardPopupUtils.openEsignPopup('PGE_CTM_00024', this.$options.name, esign, 290, 470)
    }
  },
};
</script>
<style scoped></style>
