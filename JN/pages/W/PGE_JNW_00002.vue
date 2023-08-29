<template>
  <div>
    <div class="comm_title_wrap mt10">
      <h4>{{ $t('MSG_TXT_WEB_RESERVE_LIST') }}</h4>
      <!--S:: 타이틀 오른쪽 total info -->
      <div class="right_box">
        <div class="totalNo">
          <div class="totalCt">
            Total<span>{{ numberWithCommas(webReserveCnt) }}</span
            >{{ $t('MSG_TXT_CNT') }}
            <!-- info: Total *건 -->
          </div>
        </div>
      </div>
      <!--E::: 타이틀 오른쪽 total info -->
    </div>
    <real-grid
      ref="webReserveGrid"
      grid-id="webReserveGrid"
      grid-root="/lib"
      :gridFields="webReserveFields"
      :gridColumns="webReserveColumns"
      :gridDbCellClick="webReserveDbCellClick"
      :style="gridStyle"
    />

    <!-- S::board_list -->
    <div class="board_list mt40">
      <table>
        <caption></caption>
        <colgroup>
          <col width="*" />
          <col width="*" />
          <col width="*" />
          <col width="*" />
          <col width="*" />
          <col width="*" />
          <col width="*" />
          <col width="*" />
          <col width="*" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <th rowspan="2">{{ $t('MSG_TXT_TOT_NUM') }}</th>
            <td rowspan="2" class="right">{{ totCnt }}</td>
            <th>{{ $t('MSG_TXT_TOTAL_PERSONS') }}</th>
            <td class="right">{{ totInwonCnt }}</td>
            <th rowspan="2">{{ $t('MSG_TXT_RESERVE_REQ') }}</th>
            <td class="right">{{ totReserveCnt }}</td>
            <th rowspan="2">{{ $t('MSG_TXT_RESERVE_CANCEL') }}</th>
            <td class="right">{{ totCancelCnt }}</td>
            <th rowspan="2">{{ $t('MSG_TXT_ISSUE_COMP') }}</th>
            <td class="right">{{ totEndCnt }}</td>
          </tr>
          <tr>
            <th>{{ $t('MSG_TXT_AMOUNT_TOT') }}</th>
            <td class="right">{{ totPymtAmt }}</td>
            <td class="right">{{ totReserveAmt }}</td>
            <td class="right">{{ totCancelAmt }}</td>
            <td class="right">{{ totEndAmt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- E::board_list -->
  </div>
</template>

<script>
export default {
  name: 'PGE_JNW_00002',
  props: {},
  data() {
    return {
      webReserveFields: [
        { fieldName: 'rsvDt', dataType: 'text' },
        { fieldName: 'rsvTm', dataType: 'text' },
        { fieldName: 'rsvNo', dataType: 'text' },
        { fieldName: 'rsvProofNo', dataType: 'text' },
        { fieldName: 'inwonCnt', dataType: 'text' },
        { fieldName: 'pymtAmt', dataType: 'text' },
        { fieldName: 'cancelDt', dataType: 'text' },
        { fieldName: 'visitRlDt', dataType: 'text' },
        { fieldName: 'pymtStatus', dataType: 'text' },
        { fieldName: 'pgTkey', dataType: 'text' },
      ],
      webReserveColumns: [
        {
          // 예약일자
          name: 'rsvDt',
          fieldName: 'rsvDt',
          header: { text: this.$t('MSG_TXT_RESERVE_DATE') },
          edit: false,
        },
        {
          // 예약시간
          name: 'rsvTm',
          fieldName: 'rsvTm',
          header: { text: this.$t('MSG_TXT_RESERVE_TIME') },
          edit: false,
        },
        {
          // 예약번호
          name: 'rsvNo',
          fieldName: 'rsvNo',
          header: { text: this.$t('MSG_TXT_RESV_NO') },
          edit: false,
        },
        {
          // 예약확인증번호
          name: 'rsvProofNo',
          fieldName: 'rsvProofNo',
          header: { text: this.$t('MSG_TXT_RESERVE_CONF_NUM') },
          edit: false,
        },
        {
          // 인원
          name: 'inwonCnt',
          fieldName: 'inwonCnt',
          header: { text: this.$t('MSG_TXT_PERSONS') },
          edit: false,
        },
        {
          // 결제금액
          name: 'pymtAmt',
          fieldName: 'pymtAmt',
          header: { text: this.$t('MSG_TXT_PAY_AMT') },
          edit: false,
        },
        {
          // 취소일
          name: 'cancelDt',
          fieldName: 'cancelDt',
          header: { text: this.$t('MSG_TXT_DATE_CANCEL') },
          edit: false,
        },
        {
          // 완료일
          name: 'visitRlDt',
          fieldName: 'visitRlDt',
          header: { text: this.$t('MSG_TXT_COMP_DATE') },
          edit: false,
        },
        {
          // 처리상태
          name: 'pymtStatus',
          fieldName: 'pymtStatus',
          header: { text: this.$t('MSG_TXT_PROC_STATUS') },
          edit: false,
        },
        {
          // 거래KEY
          name: 'pgTkey',
          fieldName: 'pgTkey',
          header: { text: this.$t('MSG_TXT_TRANS_KEY') },
          edit: false,
        },
      ],
      webReserveList: [],
      webReserveCnt: 0,
      sumData: null,
      gridStyle: { height: '250px' },
      totCnt: null,
      totInwonCnt: null,
      totPymtAmt: null,
      totReserveCnt: null,
      totReserveAmt: null,
      totCancelCnt: null,
      totCancelAmt: null,
      totEndCnt: null,
      totEndAmt: null,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    numberWithCommas(number) {
      if (number || number === 0) {
        number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
      return !number && number !== 0 ? '' : number;
    },
    webReserveDbCellClick(data) {
      const rsvNo = this.webReserveList[data.dataRow].rsvNo;
      this.$emit('getDetail', rsvNo);
    },
    setRows(webReserveList, sumData) {
      this.webReserveList = webReserveList;
      this.webReserveCnt = this.webReserveList.length;
      this.$refs.webReserveGrid.setRows(this.webReserveList);

      this.totCnt = utils.numberWithCommas(sumData.totCnt);
      this.totInwonCnt = utils.numberWithCommas(sumData.totInwonCnt);
      this.totPymtAmt = utils.numberWithCommas(sumData.totPymtAmt);
      this.totReserveCnt = utils.numberWithCommas(sumData.totReserveCnt);
      this.totReserveAmt = utils.numberWithCommas(sumData.totReserveAmt);
      this.totCancelCnt = utils.numberWithCommas(sumData.totCancelCnt);
      this.totCancelAmt = utils.numberWithCommas(sumData.totCancelAmt);
      this.totEndCnt = utils.numberWithCommas(sumData.totEndCnt);
      this.totEndAmt = utils.numberWithCommas(sumData.totEndAmt);
    },
    downloadExcel() {
        if (this.$refs.webReserveGrid.getJsonRows().length == 0) {
            // 조회된 데이터가 없습니다.
            utils.messageBox('alert', this.$t('MSG_ALT_NO_SERACH_DATA'));
            return;
        }
        // 웹예약목록
        this.$refs.webReserveGrid.getExcelDownload(this.$t('MSG_TXT_RESERVE_LIST_WEB'), 'PGE_JNW_00001');
    },
  },
}
</script>