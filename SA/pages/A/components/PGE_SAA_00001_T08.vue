<template>
  <div>
    <div class="comm_title_wrap mt10">
      <h4>{{ $t('MSG_TXT_GIFT_CARD_ENG') }}</h4><!-- 기프트카드 -->
      <div class="right_box">
        <div class="totalNo">
          <div class="totalCt">Total<span>{{ list.length }}</span>{{ $t('MSG_TXT_CNT') }}</div>
        </div>
      </div>
    </div>
    <real-grid 
      ref="giftCardGrid"
      grid-id="pgeSaa00001T08"
      grid-root="/lib"
      :gridFields="giftCardFields"
      :gridColumns="giftCardColumns"
      :gridRows="list"
      :gridCheckBar="{ visible:false }"
      :style="{height: '200px'}"/>
  </div>
</template>
<script>
export default {
  name: "PGE_SAA_00001_T08",
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
      giftCardFields: [
        { fieldName: "cardNo", dataType: 'text' },
        { fieldName: "saleKindNm", dataType: 'text' },
        { fieldName: "pointUseAmt", dataType: 'number' },
        { fieldName: "cancelAmt", dataType: 'number' },
        { fieldName: "panaltyAmt", dataType: 'number' }
      ],
      giftCardColumns: [{
        name: 'cardNoColumn',
        fieldName: 'cardNo',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_GIFT_CARD_NO') // 기프트카드 번호
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
        name: 'pointUseAmtColumn',
        fieldName: 'pointUseAmt',
        width: 100,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_USE_AMT') // 사용금액
        },
        edit: false 
      },{
        name: 'cancelAmtColumn',
        fieldName: 'cancelAmt',
        width: 100,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_CANCEL_AMT') // 취소금액
        },
        edit: false 
      },{
        name: 'panaltyAmtColumn',
        fieldName: 'panaltyAmt',
        width: 100,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_PENALTY') // 위약금
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
        this.$refs.giftCardGrid.setRows(newList)
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
