<template>
<sui-page class="custom_page">
  <sui-page-header :pageId="this.$options.name" />
  <sui-page-contents>
    <!-- <sui-page class="custom_page"> -->
    <div class="modal-body">
      <!-- ::S 콘텐츠1 -->
      <real-grid 
        ref="privateEntrConfirmIssueGrid"
        grid-id="privateEntrConfirmIssueGrid"
        grid-root="/lib"
        :gridFields="entrConfirmIssueFields"
        :gridColumns="entrConfirmIssueColumns"
        :style="{ height: '400px' }" 
      />
      <!-- ::E 콘텐츠1 -->
    </div>
    <!-- </sui-page> -->
  </sui-page-contents>
</sui-page>
</template>

<script>
export default {
  name: 'PGE_JNP_00001',
  components: {},
  props: {
    closePagePopup: {
      type: Function,
      default() {
        return null;
      },
    },
    pageInitialData: {
      type: Object,
    },
  },
  data() {
    return {
      entrConfirmIssueFields: [
        { fieldName: 'issueDate', dataType: 'text' },
        { fieldName: 'issueTime', dataType: 'text' },
        { fieldName: 'name', dataType: 'text' },
        { fieldName: 'ticketNo', dataType: 'text' },
        { fieldName: 'itemNm', dataType: 'text' },
        { fieldName: 'remarkDesc', dataType: 'text' },
      ],
      entrConfirmIssueColumns: [
        {
          // 발급일자
          name: 'issueDate',
          fieldName: 'issueDate',
          width: '100',
          header: { text: this.$t('MSG_TXT_ISSUE_DATE') },
          edit: false
        },
        {
          // 발급시간
          name: 'issueTime',
          fieldName: 'issueTime',
          width: '100',
          header: { text: this.$t('MSG_TXT_ISSUE_TIME') },
          edit: false
        },
        {
          // 성명
          name: 'name',
          fieldName: 'name',
          width: '100',
          header: { text: this.$t('MSG_TXT_EMPL_NM') },
          edit: false
        },
        {
          // 정기권번호
          name: 'ticketNo',
          fieldName: 'ticketNo',
          width: '100',
          header: { text: this.$t('MSG_TXT_SEASON_NO') },
          edit: false
        },
        {
          // 권종명
          name: 'itemNm',
          fieldName: 'itemNm',
          width: '100',
          header: { text: this.$t('MSG_TXT_TICKET_ITEM_NM') },
          edit: false
        },
        {
          // 발급사유
          name: 'remarkDesc',
          fieldName: 'remarkDesc',
          width: '100',
          header: { text: this.$t('MSG_TXT_REASON_ISSUE') },
          edit: false
        },
      ],
      entrConfirmIssueList: [],
    }
  },
  mounted() {
    console.info(this.memshpInfo);
    this.selectEntranceConfirmList();
  },
  computed: {
    memshpInfo() {
      return this.pageInitialData;
    }
  },
  methods: {
    selectEntranceConfirmList() {
      http.request(this.$options.name, 'DTS_JNP_00001', {
        query: {
          memshpUid: this.memshpInfo.memshpUid    
        },
      }).then((res) => {
        if(res.data) {
          const resData = res.data;
          this.entrConfirmIssueList = _.map(resData, row => {

            row.issueDate = utils.toStringByFormat(utils.toDate(row.issueDate), 'YYYY-MM-DD');
            row.issueTime = utils.toStringByFormat(utils.toDate(String(row.issueDate) + String(row.issueTime)), 'HH:mm:ss');

            return {
              name: this.memshpInfo.name,
              ...row
            }
          });

          this.$refs.privateEntrConfirmIssueGrid.setRows(this.entrConfirmIssueList);
        }
      });
    },
  }
}
</script>

<style scoped></style>