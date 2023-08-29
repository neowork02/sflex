<template>
  <div>
    <div class="comm_title_wrap mt10">
        <h4>{{ $t('MSG_TXT_RESERVE_INFO') }}</h4>
        <!-- 예약정보 -->
    </div>
    <ur-form-box toggleable>
        <ur-form-item
            :label="$t('MSG_TXT_RSVN_DT')"
            labelAlign="right"
            style="width: 25%; height: auto"
        >
            {{ rsvDtDm }}
        </ur-form-item>
        <ur-form-item
            class="flex_wrap"
            :label="$t('MSG_TXT_RESV_NO')"
            labelAlign="right"
            style="width: 25%; height: auto"
        >
            {{ rsvNo }}
        </ur-form-item>
        <ur-form-item
            :label="$t('MSG_TXT_TICKET_NM')"
            :labelAlign="'right'"
            style="width: 50%; height: auto"
        >
            {{ ticketName }}
        </ur-form-item>
        <ur-form-item
            class="flex_wrap borTop"
            :label="$t('MSG_TXT_RSVD_BY')"
            :labelAlign="'right'"
            style="width: 25%; height: auto"
        >
            {{ memberName }}
        </ur-form-item>
        <ur-form-item
            :label="$t('MSG_TXT_BTH_DATE')"
            :labelAlign="'right'"
            style="width: 25%; height: auto"
        >
            {{ birthday }}
        </ur-form-item>
        <ur-form-item
            :label="$t('MSG_TXT_TEL')"
            :labelAlign="'right'"
            style="width: 25%; height: auto"
        >
            {{ tel }}
        </ur-form-item>
        <ur-form-item
            :label="$t('MSG_TXT_MEM_TYPE')"
            :labelAlign="'right'"
            style="width: 25%; height: auto"
        >
            {{ inwonFg }}
        </ur-form-item>
        <ur-form-item
            :label="$t('MSG_TXT_RESERVE_AMOUNT')"
            :labelAlign="'right'"
            style="width: 25%; height: auto"
        >
            {{ pymtAmt }}
        </ur-form-item>
        <ur-form-item
            :label="$t('MSG_TXT_APPR_NO')"
            :labelAlign="'right'"
            style="width: 25%; height: auto"
        >
            {{ approveNo }}
        </ur-form-item>
        <ur-form-item
            :label="$t('MSG_TXT_APPROVE_DATE')"
            :labelAlign="'right'"
            style="width: 25%; height: auto"
        >
            {{ pgTrdDt }}
        </ur-form-item>
        <ur-form-item
            :label="$t('MSG_TXT_TRANS_KEY')"
            :labelAlign="'right'"
            style="width: 25%; height: auto"
        >
            {{ pgTkey }}
        </ur-form-item>
    </ur-form-box>

    <div class="comm_title_wrap mt20">
        <h4>{{ $t('MSG_TXT_PROFILE') }}</h4>
        <!-- 회원정보 -->
        <!--S:: 타이틀 오른쪽 total info -->
        <div class="right_box">
            <div class="totalNo">
                <div class="totalCt">
                    Total<span>{{ numberWithCommas(webReserveMemberCnt) }}</span
                    >{{ $t('MSG_TXT_CNT') }}
                    <!-- info: Total *건 -->
                </div>
            </div>
        </div>
        <!--E::: 타이틀 오른쪽 total info -->
    </div>
    <real-grid
        ref="webReserveMemberGrid"
        grid-id="webReserveMemberGrid"
        grid-root="/lib"
        :gridFields="webReserveMemberFields"
        :gridColumns="webReserveMemberColumns"
        :gridImgRendererId="webReserveMemberRendererId"
        :gridImgRendererEventObj="webReserveMemberRendererEventObj"
        :style="gridStyle"
    />

    <div class="comm_title_wrap mt20">
        <h4>{{ $t('MSG_TXT_PAY_INFO') }}</h4>
        <!-- 결제정보 -->
        <!--S:: 타이틀 오른쪽 total info -->
        <div class="right_box">
            <div class="totalNo">
                <div class="totalCt">
                    Total<span>{{ numberWithCommas(webReservePayCnt) }}</span
                    >{{ $t('MSG_TXT_CNT') }}
                    <!-- info: Total *건 -->
                </div>
            </div>
        </div>
        <!--E::: 타이틀 오른쪽 total info -->
    </div>
    <real-grid
        ref="webReservePayGrid"
        grid-id="webReservePayGrid"
        grid-root="/lib"
        :gridFields="webReservePayFields"
        :gridColumns="webReservePayColumns"
        :style="gridStyle"
    />

    <div class="comm_title_wrap mt20">
        <h4>{{ $t('MSG_TXT_TICKET_INFO') }}</h4>
        <!-- 정기권정보 -->
        <!--S:: 타이틀 오른쪽 total info -->
        <div class="right_box">
            <div class="totalNo">
                <div class="totalCt">
                    Total<span>{{ numberWithCommas(webReserveTicketCnt) }}</span
                    >{{ $t('MSG_TXT_CNT') }}
                    <!-- info: Total *건 -->
                </div>
            </div>
        </div>
        <!--E::: 타이틀 오른쪽 total info -->
    </div>
    <real-grid
        ref="webReserveTicketGrid"
        grid-id="webReserveTicketGrid"
        grid-root="/lib"
        :gridFields="webReserveTicketFields"
        :gridColumns="webReserveTicketColumns"
        :style="gridStyle"
    />
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  name: 'PGE_JNW_00003',
  data() {
    return {
      gridStyle: { height: '250px' },
      rsvDt: null,
      rsvTm: null,
      rsvNo: null,
      birthday: null,
      memberName: null,
      tel: null,
      pymtAmt: null,
      approveNo: null,
      pgTrdDt: null,
      inwonFg: null,
      ticketName: null,
      pgTkey: null,

      webReserveMemberFields: [
          { fieldName: 'birthday', dataType: 'text' },
          { fieldName: 'memberName', dataType: 'text' },
          { fieldName: 'ticketName', dataType: 'text' },
          { fieldName: 'memshpUid' },
      ],
      webReserveMemberColumns: [
          {
              // 생년월일
              name: 'birthday',
              fieldName: 'birthday',
              header: { text: this.$t('MSG_TXT_BTH_DATE') },
              edit: false,
          },
          {
              // 성명
              name: 'memberName',
              fieldName: 'memberName',
              header: { text: this.$t('MSG_TXT_EMPL_NM') },
              edit: false,
          },
          {
              // 티켓명
              name: 'ticketName',
              fieldName: 'ticketName',
              header: { text: this.$t('MSG_TXT_TICKET_NM') },
              edit: false,
          },
          {
              // 멤버십정보
              name: 'memshpUid',
              fieldName: 'memshpUid',
              header: { text: this.$t('MSG_TXT_MEMSHP_INFO') },
              renderer: 'renderer_imgbtn',
              edit: false,
          },
      ],
      webReserveMemberList: [],
      webReserveMemberCnt: 0,

      webReserveMemberRendererId: 'renderer_imgbtn',
      webReserveMemberRendererEventObj: {
          initContent: function (parent) {
              var div = document.createElement('div');
              div.className = 'rg-btn-search';

              parent.appendChild(div);
          },
          canClick: function () {
              return true;
          },
          render: function (grid, model, width, height, info) {
              this._value = model.value;
          },
          click: function (event) {
              const memshpUid = this._value;
              utils.openLayerPopup('PGE_CTM_00018', () => {}, {
                  pageInitialData: {
                      memshpUid: memshpUid,
                  },
                  size: 'lg',
              });
          },
      },

      webReservePayFields: [
          { fieldName: 'pymtSeqNo', dataType: 'text' },
          { fieldName: 'transferFgDesc', dataType: 'text' },
          { fieldName: 'pymtAmt', dataType: 'text' },
          { fieldName: 'approveNo', dataType: 'text' },
          { fieldName: 'coCmpnyCd', dataType: 'text' },
          { fieldName: 'pgTrdDt', dataType: 'text' },
      ],
      webReservePayColumns: [
          {
              // 결제번호
              name: 'pymtSeqNo',
              fieldName: 'pymtSeqNo',
              header: { text: this.$t('MSG_TXT_PAYMENT_NUM') },
              edit: false,
          },
          {
              // 거래상태
              name: 'transferFgDesc',
              fieldName: 'transferFgDesc',
              header: { text: this.$t('MSG_TXT_TRANS_STATUS') },
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
              // 승인번호
              name: 'approveNo',
              fieldName: 'approveNo',
              header: { text: this.$t('MSG_TXT_APPR_NO') },
              edit: false,
          },
          {
              // 카드사코드
              name: 'coCmpnyCd',
              fieldName: 'coCmpnyCd',
              header: { text: this.$t('MSG_TXT_CARD_CORP_CD') },
              edit: false,
          },
          {
              // 처리일자
              name: 'pgTrdDt',
              fieldName: 'pgTrdDt',
              header: { text: this.$t('MSG_TXT_PROC_DATE') },
              edit: false,
          },
      ],
      webReservePayList: [],
      webReservePayCnt: 0,

      webReserveTicketFields: [
          { fieldName: 'ticketName', dataType: 'text' },
          { fieldName: 'saleAmt', dataType: 'text' },
          { fieldName: 'ticketCnt', dataType: 'text' },
          { fieldName: 'adultCnt', dataType: 'text' },
          { fieldName: 'childCnt', dataType: 'text' },
          { fieldName: 'handicapCnt', dataType: 'text' },
          { fieldName: 'oldCnt', dataType: 'text' },
          { fieldName: 'adultAmt', dataType: 'text' },
          { fieldName: 'childAmt', dataType: 'text' },
          { fieldName: 'handicapAmt', dataType: 'text' },
          { fieldName: 'oldAmt', dataType: 'text' },
      ],
      webReserveTicketColumns: [
          {
              // 권종명
              name: 'ticketName',
              fieldName: 'ticketName',
              header: { text: this.$t('MSG_TXT_TICKET_ITEM_NM') },
              edit: false,
          },
          {
              // 결제총액
              name: 'saleAmt',
              fieldName: 'saleAmt',
              header: { text: this.$t('MSG_TXT_PAY_TOT') },
              edit: false,
          },
          {
              // 총인원수
              name: 'ticketCnt',
              fieldName: 'ticketCnt',
              header: { text: this.$t('MSG_TXT_TOT_NUM_PEOPLE') },
              edit: false,
          },
          {
              // 대인수
              name: 'adultCnt',
              fieldName: 'adultCnt',
              header: { text: this.$t('MSG_TXT_AUDULT_CNT') },
              edit: false,
          },
          {
              // 소인수
              name: 'childCnt',
              fieldName: 'childCnt',
              header: { text: this.$t('MSG_TXT_CHILD_CNT') },
              edit: false,
          },
          {
              // 장애인수
              name: 'handicapCnt',
              fieldName: 'handicapCnt',
              header: { text: this.$t('MSG_TXT_NUM_PEOPLE_DISABLE') },
              edit: false,
          },
          {
              // 경로수
              name: 'oldCnt',
              fieldName: 'oldCnt',
              header: { text: this.$t('MSG_TXT_OLD_CNT') },
              edit: false,
          },
          {
              // 대인 결제총액
              name: 'adultAmt',
              fieldName: 'adultAmt',
              header: { text: this.$t('MSG_TXT_TOT_INTER_PAYMENT') },
              edit: false,
          },
          {
              // 소인 결제총액
              name: 'childAmt',
              fieldName: 'childAmt',
              header: { text: this.$t('MSG_TXT_TOT_CHILD_PAYMENT') },
              edit: false,
          },
          {
              // 장애인 결제총액
              name: 'handicapAmt',
              fieldName: 'handicapAmt',
              header: { text: this.$t('MSG_TXT_TOT_DISABLE_PAYMENT') },
              edit: false,
          },
          {
              // 경로 결제총액
              name: 'oldAmt',
              fieldName: 'oldAmt',
              header: { text: this.$t('MSG_TXT_TOT_OLD_PAYMENT') },
              edit: false,
          },
      ],
      webReserveTicketList: [],
      webReserveTicketCnt: 0,
    }
  },
  computed: {
    rsvDtDm() {
      const rsvDtDm = String(this.rsvDt) + String(this.rsvTm);
      return utils.toStringByFormat(utils.toDate(rsvDtDm), 'YYYY-MM-DD HH:mm:ss');
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    selectWebReserveDetail(rsvNo) {
        return new Promise((resolve, reject) => {
            http.request('PGE_JNW_00001', 'DTS_JNW_00001', {
                query: {
                    rsvNo: rsvNo,
                },
            }).then((res) => {
                if (res.data) {
                    resolve(res.data);
                }
            });
        });
    },
    selectWebReserveMemberList(rsvNo) {
        return new Promise((resolve, reject) => {
            http.request('PGE_JNW_00001', 'DTS_JNW_00002', {
                query: {
                    rsvNo: rsvNo,
                },
            }).then((res) => {
                if (res.data.length > 0) {
                    resolve(res.data);
                }
            });
        });
    },
    selectWebReservePayList(rsvNo) {
        return new Promise((resolve, reject) => {
            http.request('PGE_JNW_00001', 'DTS_JNW_00003', {
                query: {
                    rsvNo: rsvNo,
                },
            }).then((res) => {
                if (res.data.length > 0) {
                    resolve(res.data);
                }
            });
        });
    },
    selectWebReserveTicketList(rsvNo) {
        return new Promise((resolve, reject) => {
            http.request('PGE_JNW_00001', 'DTS_JNW_00004', {
                query: {
                    rsvNo: rsvNo,
                },
            }).then((res) => {
                if (res.data.length > 0) {
                    resolve(res.data);
                }
            });
        });
    },
    getDetail(rsvNo) {
        const webReserveDetail = this.selectWebReserveDetail(rsvNo);
        const webReserveMemberList = this.selectWebReserveMemberList(rsvNo);
        const webReservePayList = this.selectWebReservePayList(rsvNo);
        const webReserveTicketList = this.selectWebReserveTicketList(rsvNo);

        const promiseArr = [webReserveDetail, webReserveMemberList, webReservePayList, webReserveTicketList];

        Promise.all(promiseArr).then((result) => {
            // 스마트예약 정보
            this.rsvDt = result[0].rsvDt;
            this.rsvTm = result[0].rsvTm;
            this.rsvNo = result[0].rsvNo;
            this.birthday = utils.toStringByFormat(utils.toDate(result[0].birthday), 'YYYY-MM-DD');
            this.memberName = result[0].memberName;
            this.tel = result[0].tel;
            this.pymtAmt = utils.numberWithCommas(result[0].pymtAmt);
            this.approveNo = result[0].approveNo;
            this.pgTrdDt = utils.toStringByFormat(utils.toDate(result[0].pgTrdDt), 'YYYY-MM-DD');
            this.inwonFg = result[0].inwonFg;
            this.ticketName = result[0].ticketName;
            this.pgTkey = result[0].pgTkey;

            // 예약자 정보
            this.webReserveMemberList = result[1];
            if (this.webReserveMemberList.length > 0) {
                _.each(this.webReserveMemberList, (member) => {
                    member.birthday = utils.toStringByFormat(utils.toDate(member.birthday), 'YYYY-MM-DD');
                });
            }
            this.webReserveMemberCnt = this.webReserveMemberList.length;
            this.$refs.webReserveMemberGrid.setRows(this.webReserveMemberList);

            // 결제 정보
            this.webReservePayList = result[2];
            if (this.webReservePayList.length > 0) {
                _.each(this.webReservePayList, (pay) => {
                    pay.pymtAmt = utils.numberWithCommas(pay.pymtAmt);
                    pay.pgTrdDt = utils.toStringByFormat(utils.toDate(pay.pgTrdDt), 'YYYY-MM-DD');
                });
            }
            this.webReservePayCnt = this.webReservePayList.length;
            this.$refs.webReservePayGrid.setRows(this.webReservePayList);

            // 티켓 정보
            this.webReserveTicketList = result[3];
            if (this.webReserveTicketList.length > 0) {
                _.each(this.webReserveTicketList, (ticket) => {
                    ticket.saleAmt = utils.numberWithCommas(ticket.saleAmt);
                    ticket.ticketCnt = utils.numberWithCommas(ticket.ticketCnt);
                    ticket.adultCnt = utils.numberWithCommas(ticket.adultCnt);
                    ticket.childCnt = utils.numberWithCommas(ticket.childCnt);
                    ticket.handicapCnt = utils.numberWithCommas(ticket.handicapCnt);
                    ticket.oldCnt = utils.numberWithCommas(ticket.oldCnt);
                    ticket.adultAmt = utils.numberWithCommas(ticket.adultAmt);
                    ticket.childAmt = utils.numberWithCommas(ticket.childAmt);
                    ticket.handicapAmt = utils.numberWithCommas(ticket.handicapAmt);
                    ticket.oldAmt = utils.numberWithCommas(ticket.oldAmt);
                });
            }
            this.webReserveTicketCnt = this.webReserveTicketList.length;
            this.$refs.webReserveTicketGrid.setRows(this.webReserveTicketList);

            this.$refs.webReserveTab.setIdx(2);
        });
    },
    numberWithCommas(number) {
      if (number || number === 0) {
        number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
      return !number && number !== 0 ? '' : number;
    },
  },
}
</script>