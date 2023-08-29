<template>
  <div>
    <div class="comm_title_wrap mt10">
      <h4>{{ $t('MSG_TXT_GIFT_CARD') }}</h4> <!-- 상품권 -->
      <div class="right_box">
        <div class="totalNo">
          <div class="totalCt">Total<span>{{ list.length }}</span>{{ $t('MSG_TXT_CNT') }}</div>
        </div>
      </div>
    </div>
    <real-grid 
      ref="giftGrid"
      grid-id="pgeSaa00001T04"
      grid-root="/lib"
      :gridFields="giftFields"
      :gridColumns="giftColumns"
      :gridRows="list"
      :gridCheckBar="{ visible:false }"
      :style="{height: '200px'}"/>
  </div>
</template>
<script>
export default {
  name: "PGE_SAA_00001_T04",
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
      giftFields: [
        { fieldName: "giftCompNm", dataType: 'text' },
        { fieldName: "giftNo", dataType: 'text' },
        { fieldName: "unitCostAmt", dataType: 'number' },
        { fieldName: "paymntAmt", dataType: 'number' },
        { fieldName: "remainAmt", dataType: 'number' }
      ],
      giftColumns: [{
        name: 'giftCompNmColumn',
        fieldName: 'giftCompNm',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_GIFT_ISSURE') // 상품권발행사
        },
        edit: false 
      },{
        name: 'giftNoColumn',
        fieldName: 'giftNo',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_GIFT_NO') // 상품권번호
        },
        edit: false 
      },{
        name: 'unitCostAmtColumn',
        fieldName: 'unitCostAmt',
        width: 100,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_PAR_VALUE') // 액면금액
        },
        edit: false 
      },{
        name: 'paymntAmtColumn',
        fieldName: 'paymntAmt',
        width: 100,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_PAY_AMT') // 결제금액
        },
        edit: false 
      },{
        name: 'remainAmtColumn',
        fieldName: 'remainAmt',
        width: 100,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_RSDL_AMT') // 잔여금액
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
        this.$refs.giftGrid.setRows(newList)
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
