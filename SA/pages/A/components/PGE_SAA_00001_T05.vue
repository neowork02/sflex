<template>
  <div>
    <div class="comm_title_wrap mt10">
      <h4>{{ $t('MSG_TXT_RETURN') }}</h4> <!-- 환불 -->
      <div class="right_box">
        <div class="totalNo">
          <div class="totalCt">Total<span>{{ list.length }}</span>{{ $t('MSG_TXT_CNT') }}</div>
        </div>
      </div>
    </div>
    <real-grid 
      ref="refundGrid"
      grid-id="pgeSaa00001T05"
      grid-root="/lib"
      :gridFields="refundFields"
      :gridColumns="refundColumns"
      :gridRows="list"
      :gridCheckBar="{ visible:false }"
      :gridCellClick="gridCellClick"
      :style="{height: '200px'}"/>
  </div>
</template>
<script>
export default {
  name: "PGE_SAA_00001_T05",
  components: {}, // eslint-disable-line vue/name-property-casing
  props: {
    list: {
      type: Array,
      required: false,
      default: () => []
    },
    parkKind: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      // 권종
      refundFields: [
        { fieldName: "ticketNo", dataType: 'text' },
        { fieldName: "refundDate", dataType: 'datetime', datetimeFormat: 'yyyyMMdd'},
        { fieldName: "applyDays", dataType: 'text' },
        { fieldName: "useDays", dataType: 'text' },
        { fieldName: "usedDyas", dataType: 'text' },
        { fieldName: "remainDays", dataType: 'text' },
        { fieldName: "itemNm", dataType: 'text' },
        { fieldName: "penaltyAmt", dataType: 'number' },
        { fieldName: "useAmt", dataType: 'number' },
        { fieldName: "useCnt", dataType: 'number' },
        { fieldName: "baseAmt", dataType: 'number' },
        { fieldName: "returnRate", dataType: 'number' },
        { fieldName: "returnAmt", dataType: 'number' },
        { fieldName: "remarkDesc", dataType: 'text' },
        { fieldName: "memshpUid" }
      ],
      refundColumns: [{
        name: 'ticketNoColumn',
        fieldName: 'ticketNo',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_TICKET_NO') // 정기권번호
        },
        edit: false 
      },{
        name: 'refundDateColumn',
        fieldName: 'refundDate',
        width: 100,
        datetimeFormat: 'yyyy/MM/dd',
        header: { 
          text: this.$t('MSG_TXT_REFUND_DATE') // 환불일자
        },
        edit: false 
      }/* ,{
        name: 'applyDaysColumn',
        fieldName: 'applyDays',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_APPLY_PERIOD') // 이용기간
        },
        edit: false 
      },{
        name: 'useDaysColumn',
        fieldName: 'useDays',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_USE_PERIOD') // 사용기간
        },
        edit: false 
      },{
        name: 'usedDyasColumn',
        fieldName: 'usedDyas',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_NET_USE_PERIOD') // 실사용기간
        },
        edit: false 
      },{
        name: 'remainDaysColumn',
        fieldName: 'remainDays',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_REMANING_PERIOD') // 잔여기간
        },
        edit: false 
      } */,{
        name: 'itemNmColumn',
        fieldName: 'itemNm',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_TICKET_NM') // 티켓명
        },
        edit: false 
      },{
        name: 'penaltyAmtColumn',
        fieldName: 'penaltyAmt',
        width: 100,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_PENALTY') // 위약금
        },
        edit: false 
      },{
        name: 'useAmtColumn',
        fieldName: 'useAmt',
        width: 100,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_APPLY_AMT') // 이용금액
        },
        edit: false 
      },{
        name: 'useCntColumn',
        fieldName: 'useCnt',
        width: 100,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_APPLY_CNT') // 이용횟수
        },
        styleCallback: function (grid, dataCell) {
            var ret = {};
            var useCnt = grid.getValue(dataCell.index.itemIndex, 'useCnt');
            ret.renderer = useCnt == '0' ? {} : { type: 'button' };
            return ret;
        },
        edit: false 
      },{
        name: 'baseAmtColumn',
        fieldName: 'baseAmt',
        width: 100,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_REFUND_STND_AMT') // 환불기준 금액
        },
        edit: false 
      },{
        name: 'returnRateColumn',
        fieldName: 'returnRate',
        width: 100,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_REFUND_RATE') // 환불율
        },
        edit: false 
      },{
        name: 'returnAmtColumn',
        fieldName: 'returnAmt',
        width: 100,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_REFUND_AMT') // 환불금액
        },
        edit: false 
      },{
        name: 'remarkDescColumn',
        fieldName: 'remarkDesc',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_REFUND_DESC') // 환불사유
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
        this.$refs.refundGrid.setRows(newList)
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    gridCellClick(grid, data) {
      const targetPage = this.parkKind === 'EL' ? 'PGE_JNF_00003' : 'PGE_JNF_00004'
      const row = grid.getJsonRows()[data.dataRow]

      if (data.fieldIndex != '9') {
        return
      }

      http.request('PGE_SAA_00001', 'DTS_CTM_00010', {
            query: { memshpUid: row.memshpUid }
          }, true)
          .then((res) => {
              if (res.data?.name) {
                  let pageInitialData = {
                    targetFg : this.parkKind,
                    memshpUid : row.memshpUid,
                    ticketNo : row.ticketNo,
                    memberName :res.data.name,
                    receiptNo : row.receiptNo
                  }

                  utils.openLayerPopup(targetPage, () => {}, {
                      pageInitialData: pageInitialData,
                      size: 'lg',
                  });
              }
          })
          .catch((e) => {})
    }
  },
};
</script>
<style scoped></style>
