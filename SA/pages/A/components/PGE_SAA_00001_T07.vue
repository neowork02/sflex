<template>
  <div>
    <div class="comm_title_wrap mt10">
      <h4>{{ $t('MSG_TXT_ILMO_POINT') }}</h4><!-- 일모포인트 -->
      <div class="right_box">
        <div class="totalNo">
          <div class="totalCt">Total<span>{{ list.length }}</span>{{ $t('MSG_TXT_CNT') }}</div>
        </div>
      </div>
    </div>
    <real-grid 
      ref="pointGrid"
      grid-id="pgeSaa00001T07"
      grid-root="/lib"
      :gridFields="pointFields"
      :gridColumns="pointColumns"
      :gridRows="list"
      :gridCheckBar="{ visible:false }"
      :style="{height: '200px'}"/>
  </div>
</template>
<script>
export default {
  name: "PGE_SAA_00001_T07",
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
      pointFields: [
        { fieldName: "saleDate", dataType: 'datetime', datetimeFormat: "yyyyMMdd"},
        { fieldName: "posId", dataType: 'text' },
        { fieldName: "receiptNo", dataType: 'text' },
        { fieldName: "seqNo", dataType: 'text' },
        { fieldName: "saleKindNm", dataType: 'text' },
        { fieldName: "approveNo", dataType: 'text' },
        { fieldName: "ilmoCardNo", dataType: 'text' },
        { fieldName: "tranAmt", dataType: 'number' },
        { fieldName: "balanceAmt", dataType: 'number' },
        { fieldName: "otc", dataType: 'text' },
        { fieldName: "divisionCd", dataType: 'text' },
        { fieldName: "empId", dataType: 'text' },,
        { fieldName: "regDtm",  dataType: 'datetime', datetimeFormat: "yyyyMMddHHmmss"}
      ],
      pointColumns: [{
        name: 'saleDateColumn',
        fieldName: 'saleDate',
        width: 100,
        datetimeFormat: 'yyyy/MM/dd',
        header: { 
          text: this.$t('MSG_TXT_DT') // 일자
        },
        edit: false 
      },{
        name: 'posIdColumn',
        fieldName: 'posId',
        width: 100,
        header: { 
          text: 'POS ID'
        },
        edit: false 
      },{
        name: 'receiptNoColumn',
        fieldName: 'receiptNo',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_RECEIPT_NO') // 영수증번호
        },
        edit: false 
      },{
        name: 'seqNoColumn',
        fieldName: 'seqNo',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_SERIAL_NO') // 일련번호
        },
        edit: false 
      },{
        name: 'saleKindNmColumn',
        fieldName: 'saleKindNm',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_SALE_FG') // 판매구분
        },
        edit: false 
      },{
        name: 'approveNoColumn',
        fieldName: 'approveNo',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_APPR_NO') // 승인번호
        },
        edit: false 
      },{
        name: 'ilmoCardNoColumn',
        fieldName: 'ilmoCardNo',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_ILMO_CARD_NO') // 일모카드번호
        },
        edit: false 
      },{
        name: 'tranAmtColumn',
        fieldName: 'tranAmt',
        width: 100,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_POINT') // 포인트
        },
        edit: false 
      },{
        name: 'balanceAmtColumn',
        fieldName: 'balanceAmt',
        width: 100,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_POINT_AFTER_PRCS') // 처리 후 포인트
        },
        edit: false 
      },{
        name: 'otcColumn',
        fieldName: 'otc',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_OTC_NO') // OTC 번호
        },
        edit: false 
      },{
        name: 'divisionCdColumn',
        fieldName: 'divisionCd',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_DIVISION_SS') // 소속
        },
        edit: false 
      },{
        name: 'empIdColumn',
        fieldName: 'empId',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_EPNO') // 사번
        },
        edit: false 
      },{
        name: 'regDtmColumn',
        fieldName: 'regDtm',
        width: 100,
        datetimeFormat: 'yyyy/MM/dd HH:mm:ss',
        header: { 
          text: this.$t('MSG_TXT_DTM') // 일시
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
        this.$refs.pointGrid.setRows(newList)
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
