<template>
  <div>
    <div class="comm_title_wrap mt10">
      <h4>{{ $t('MSG_TXT_CASH_RECEIPT') }}</h4><!-- 현금영수증 -->
      <div class="right_box">
        <div class="totalNo">
          <div class="totalCt">Total<span>{{ list.length }}</span>{{ $t('MSG_TXT_CNT') }}</div>
        </div>
      </div>
    </div>
    <real-grid 
      ref="cashGrid"
      grid-id="pgeSaa00001T03"
      grid-root="/lib"
      :gridFields="cashFields"
      :gridColumns="cashColumns"
      :gridRows="list"
      :gridCheckBar="{ visible:false }"
      :style="{height: '200px'}"/>
  </div>
</template>
<script>
export default {
  name: "PGE_SAA_00001_T03",
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
      cashFields: [
        { fieldName: "cardNo", dataType: 'text' },
        { fieldName: "apprDate", dataType: 'datetime', datetimeFormat: "yyyyMMdd"},
        { fieldName: "apprTime", dataType: 'datetime', datetimeFormat: "hhmmss"},
        { fieldName: "cardNoKindNm", dataType: 'text' },
        { fieldName: "inputKindNm", dataType: 'text' },
        { fieldName: "statusKindNm", dataType: 'text' },
        { fieldName: "apprNo", dataType: 'text' },
        { fieldName: "expireYm", dataType: 'datetime', datetimeFormat: "yyyyMMdd"},
        { fieldName: "cardCmpnyNm", dataType: 'text' },
        { fieldName: "vanKindNm", dataType: 'text' },
        { fieldName: "divideGigan", dataType: 'text' },
        { fieldName: "apprAmt", dataType: 'number' },
        { fieldName: "cancelDate", dataType: 'datetime', datetimeFormat: "yyyyMMdd"},
        { fieldName: "cancelTime", dataType: 'datetime', datetimeFormat: "hhmmss"},
        { fieldName: "cancelApprNo", dataType: 'text' }
      ],
      cashColumns: [{
        name: 'cardNoColumn',
        fieldName: 'cardNo',
        width: 150,
        header: { 
          text: this.$t('MSG_TXT_CARD_NO') // 카드번호
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
        name: 'cardNoKindNmColumn',
        fieldName: 'cardNoKindNm',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_DISC_KIND') // 식별구분
        },
        edit: false 
      },{
        name: 'inputKindNmColumn',
        fieldName: 'inputKindNm',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_APPR_METHOD') // 승인방식
        },
        edit: false 
      },{
        name: 'statusKindNmColumn',
        fieldName: 'statusKindNm',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_PROC_STATUS') // 처리상태
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
        name: 'expireYmColumn',
        fieldName: 'expireYm',
        width: 100,
        datetimeFormat: 'yyyy/MM/dd',
        header: { 
          text: this.$t('MSG_TXT_VALID_PERIOD') // 유효기간
        },
        edit: false 
      },{
        name: 'cardCmpnyNmColumn',
        fieldName: 'cardCmpnyNm',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_CARD_CMPNY') // 카드사
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
        name: 'divideGiganColumn',
        fieldName: 'divideGigan',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_RECEIPT_DIV') // 영수증 구분
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
      }]
    }
  },
  computed: {},
  watch: {
    list: {
      deep: true,
      handler(newList, oldList) {
        this.$refs.cashGrid.setRows(newList)
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
