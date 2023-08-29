<template>
  <div>
    <div class="comm_title_wrap mt10">
      <h4>{{ $t('MSG_TXT_TICKET_ITEM')}}</h4><!-- 권종 -->
      <div class="right_box">
        <div class="totalNo">
          <div class="totalCt">Total<span>{{ list.length }}</span>{{ $t('MSG_TXT_CNT') }}</div>
        </div>
      </div>
    </div>
    <real-grid 
      ref="itemGrid"
      grid-id="pgeSaa00001T01"
      grid-root="/lib"
      :gridFields="itemFields"
      :gridColumns="itemColumns"
      :gridRows="list"
      :gridCheckBar="{ visible:false }"
      :style="{height: '200px'}"/>
  </div>
</template>
<script>
export default {
  name: "PGE_SAA_00001_T01",
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
      itemFields: [
        { fieldName: "itemName", dataType: 'text' },
        { fieldName: "itemCnt", dataType: 'number' },
        { fieldName: "saleAmt", dataType: 'number' },
        { fieldName: "adultCnt", dataType: 'number' },
        { fieldName: "childCnt", dataType: 'number' },
        { fieldName: "oldCnt", dataType: 'number' },
        { fieldName: "handicapCnt", dataType: 'number' },
        { fieldName: "adultAmt", dataType: 'number' },
        { fieldName: "childAmt", dataType: 'number' },
        { fieldName: "oldAmt", dataType: 'number' },
        { fieldName: "handicapAmt", dataType: 'number' }
      ],
      itemColumns: [{
        name: 'itemNameColumn',
        fieldName: 'itemName',
        width: 230,
        header: { 
          text: this.$t('MSG_TXT_TICKET_ITEM_NM') // 권종명
        },
        edit: false 
      },{
        name: 'itemCntColumn',
        fieldName: 'itemCnt',
        width: 70,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_PARSON_CNT') // 인원수
        },
        edit: false 
      },{
        name: 'saleAmtColumn',
        fieldName: 'saleAmt',
        width: 100,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_PAY_TOT') // 결제총액
        },
        edit: false 
      },{
        name: 'adultCntColumn',
        fieldName: 'adultCnt',
        width: 70,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_AUDULT_CNT') // 대인수
        },
        edit: false 
      },{
        name: 'childCntColumn',
        fieldName: 'childCnt',
        width: 70,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_CHILD_CNT') // 소인수
        },
        edit: false 
      },{
        name: 'oldCntColumn',
        fieldName: 'oldCnt',
        width: 70,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_OLD_CNT') /* 경로수 */
        },
        edit: false 
      },{
        name: 'handicapCntColumn',
        fieldName: 'handicapCnt',
        width: 70,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_PANELTY_CNT') /* 장애우수 */
        },
        edit: false 
      },{
        name: 'adultAmtColumn',
        fieldName: 'adultAmt',
        width: 100,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_AUDULT_UNIT_PRC') // 대인단가
        },
        edit: false 
      },{
        name: 'childAmtColumn',
        fieldName: 'childAmt',
        width: 100,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_CHILD_UNIT_PRC') // 소인단가
        },
        edit: false 
      },{
        name: 'oldAmtColumn',
        fieldName: 'oldAmt',
        width: 100,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_OLD_UNIT_PRC') // 경로단가
        },
        edit: false 
      },{
        name: 'handicapAmtColumn',
        fieldName: 'handicapAmt',
        width: 100,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_PANELTY_UNIT_PRC') // 장애우단가
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
        this.$refs.itemGrid.setRows(newList)
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
