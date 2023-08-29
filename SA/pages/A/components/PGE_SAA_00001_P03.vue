<template>
  <div>
    <real-grid 
        ref="ticketGrid"
        grid-id="pgeSaa00001G01"
        grid-root="/lib"
        :gridFields="ticketFields"
        :gridColumns="ticketColumns"
        :gridRows="ticketList"
        :gridCheckBar="{ visible:false }"
        :gridImgRendererId="'renderer_imgbtn'"
        :gridImgRendererEventObj="rendererEventObj"
        :style="{height: '200px'}"/>
  </div>
</template>
<script>
export default {
  name: "PGE_SAA_00001_P03",
  components: {}, // eslint-disable-line vue/name-property-casing
  props: {
    ticketList: {
      type: Array,
      required: false,
    }
  },
  data() {
    return {
      // 정기권 정보 리스트
      ticketFields: [
        { fieldName: "ticketNo", dataType: 'text' },
        { fieldName: "name", dataType: 'text' },
        { fieldName: "payerMemshpUid", dataType: 'text' },
        { fieldName: "itemNm", dataType: 'text' },
        { fieldName: "dcTypeNm", dataType: 'text' },
        { fieldName: "ageTypeNm", dataType: 'text' },
        { fieldName: "joinDcnt", dataType: 'number' },
        { fieldName: "joinYmd", dataType: 'datetime', datetimeFormat: "yyyyMMdd" },
        { fieldName: "expireDate", dataType: 'datetime', datetimeFormat: "yyyyMMdd" },
        { fieldName: "issueDate", dataType: 'datetime', datetimeFormat: "yyyyMMdd" },
        { fieldName: "issueKindNm", dataType: 'text' },
        { fieldName: "ticketStatusNm", dataType: 'text' }
      ],
      ticketColumns: [{
        name: 'ticketNoColumn',
        fieldName: 'ticketNo',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_TICKET_NO') // 정기권번호
        },
        edit: false 
      },{
        name: 'nameColumn',
        fieldName: 'name',
        width: 60,
        header: { 
          text: this.$t('MSG_TXT_EMPL_NM') // 성명
        },
        edit: false 
      },{
        name: 'payerMemshpUidColumn',
        fieldName: 'payerMemshpUid',
        width: 50,
        header: { 
          text: this.$t('MSG_TXT_PAYER') // 결제자
        },
        renderer: "renderer_imgbtn",
        edit: false 
      },{
        name: 'itemNmColumn',
        fieldName: 'itemNm',
        width: 230,
        header: { 
          text: this.$t('MSG_TXT_TICKET_ITEM_NM') // 권종명
        },
        edit: false 
      },{
        name: 'dcTypeNmColumn',
        fieldName: 'dcTypeNm',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_DISCOUNT_TYP') // 할인유형명
        },
        edit: false 
      },{
        name: 'ageTypeNmColumn',
        fieldName: 'ageTypeNm',
        width: 50,
        header: { 
          text: this.$t('MSG_TXT_AGE_TYP_CD') // 인원유형
        },
        edit: false 
      },{
        name: 'joinDcntColumn',
        fieldName: 'joinDcnt',
        width: 80,
        numberFormat: '#,##0',
        header: { 
          text: this.$t('MSG_TXT_JOIN_DAYS') // 가입일수
        },
        edit: false 
      },{
        name: 'joinYmdColumn',
        fieldName: 'joinYmd',
        width: 80,
        datetimeFormat: 'yyyy/MM/dd',
        header: { 
          text: this.$t('MSG_TXT_JOIN_DATE') // 가입일자
        },
        edit: false 
      },{
        name: 'expireDateColumn',
        fieldName: 'expireDate',
        width: 80,
        datetimeFormat: 'yyyy/MM/dd',
        header: { 
          text: this.$t('MSG_TXT_EXPIRE_DATE') // 만기일자
        },
        edit: false 
      },{
        name: 'issueDateColumn',
        fieldName: 'issueDate',
        width: 80,
        datetimeFormat: 'yyyy/MM/dd',
        header: { 
          text: this.$t('MSG_TXT_ISSUE_DATE') // 발급일자
        },
        edit: false 
      },{
        name: 'issueKindNmColumn',
        fieldName: 'issueKindNm',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_ISSUE_KIND') // 발급구분
        },
        edit: false 
      },{
        name: 'ticketStatusNmColumn',
        fieldName: 'ticketStatusNm',
        width: 100,
        header: { 
          text: this.$t('MSG_TXT_STATUS') // 상태
        },
        edit: false 
      }],
      rendererEventObj: {
        initContent: parent => {
          var div = document.createElement("div");
          div.className = "rg-btn-search";

          parent.appendChild(div);
        },
        canClick: () => true,
        render: (grid, model, width, height, info)  => { this._value = model.value },
        click: event => {
          const memshpUid = this._value;
          utils.openLayerPopup("PGE_CTM_00018", () => {}, {
            pageInitialData: {
              memshpUid: memshpUid,
            },
            size: "lg",
          })
        },
      }
    }
  },
  computed: {},
  watch: {
    ticketList: {
      deep: true,
      handler(newList, oldList) {
        this.$refs.ticketGrid.setRows(newList)
      }
    }
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped></style>
