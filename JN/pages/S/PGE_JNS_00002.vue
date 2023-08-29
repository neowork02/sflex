<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_REPAY_PERIOD')"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <ur-range-picker v-model="dateValue" />
                </ur-form-item>

                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SEARCH_JOIN_INFO')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="srchFg" value="name" sm @click="onClickSrchFg('name')">
                            {{ $t('MSG_TXT_EMPL_NM') }}
                        </ur-radio>
                        <ur-radio v-model="srchFg" value="ticket" sm @click="onClickSrchFg('ticket')">
                            {{ $t('MSG_TXT_SEASON_NO') }}
                        </ur-radio>
                    </div>
                    <ur-text-field
                        class="pl16"
                        v-model="srchVal"
                        :disabled="disabled"
                        @enter="popupSearch"
                        :mask="inputMask"
                    />
                    <ur-icon-button icon="search" style="padding-top: 0px" @click="popupSearch" />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button @click="init">{{ $t('MSG_BTN_RESET') }}</ur-button>
                    <!-- 초기화 -->
                    <ur-button v-permission:read="this.$options.name" color="violet" @click="search">{{ $t('MSG_TXT_SRCH') }}</ur-button>
                    <!-- 조회 -->
                </div>
            </div>

            <!-- S::컨텐츠1 -->
            <div class="comm_title_wrap mt25">
                <h4>{{ $t('MSG_TXT_REPAY_LIST') }}</h4>
                <!-- 재결제 리스트 -->
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">
                            Total<span>{{ numberWithCommas(repaymentCnt) }}</span
                            >{{ $t('MSG_TXT_CNT') }}
                        </div>
                        <!-- 건 -->
                        <!-- info: Total *건 -->
                    </div>
                </div>
                <!--E::: 타이틀 오른쪽 total info -->
            </div>
            <real-grid
                ref="repaymentGrid"
                grid-id="repaymentGrid"
                grid-root="/lib"
                :gridFields="repaymentFields"
                :gridColumns="repaymentColumns"
                :gridCellClick="repaymentCellClick"
                :style="{ height: '250px' }"
            />
            <!-- E::컨텐츠1-->

            <!-- S::컨텐츠2:기결제 정보 -->
            <div class="comm_title_wrap mt40">
                <h4>{{ $t('MSG_TXT_PREPAY_INFO') }}</h4>
                <!-- 기결제 정보 -->
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">
                            Total<span>{{ numberWithCommas(cardCnt) }}</span
                            >{{ $t('MSG_TXT_CNT') }}
                        </div>
                        <!-- 건 -->
                    </div>
                </div>
                <!--E::: 타이틀 오른쪽 total info -->
            </div>
            <real-grid
                ref="cardGrid"
                grid-id="cardGrid"
                grid-root="/lib"
                :gridFields="cardFields"
                :gridColumns="cardColumns"
                :style="{ height: '150px' }"
            />
            <!-- E::컨텐츠2:기결제 정보 -->

            <!-- S::컨텐츠3:재결제 정보 -->
            <div class="comm_title_wrap mt40">
                <h4>{{ $t('MSG_TXT_REPAY_INFO') }}</h4>
                <!-- 재결제 정보 -->
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">
                            Total<span>{{ numberWithCommas(reCardCnt) }}</span
                            >{{ $t('MSG_TXT_CNT') }}
                        </div>
                        <!-- 건 -->
                        <!-- info: Total *건 -->
                    </div>
                </div>
                <!--E::: 타이틀 오른쪽 total info -->
            </div>
            <real-grid
                ref="reCardGrid"
                grid-id="reCardGrid"
                grid-root="/lib"
                :gridFields="reCardFields"
                :gridColumns="reCardColumns"
                :style="{ height: '150px' }"
            />
            <!-- E::컨텐츠3:재결제 정보 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
import _ from 'lodash';
import moment from 'moment';

export default {
    name: 'PGE_JNS_00002',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            dateValue: [utils.now("YYYY-MM-DD"), utils.now("YYYY-MM-DD")],
            srchStartDt: null, // 재결제기간(From)
            srchEndDt: null, // 재결제기간(To)
            srchFg: 'name', //
            srchVal: null, //

            memshpInfo: null,

            // 재결제자조회 리스트
            repaymentFields: [
                { fieldName: 'approveYmd', dataType: 'text' },
                { fieldName: 'approveHms', dataType: 'text' },
                { fieldName: 'ymd', dataType: 'text' },
                { fieldName: 'hms', dataType: 'text' },
                { fieldName: 'receiptNo', dataType: 'text' },
                // { fieldName: 'payerYn', dataType: 'text' },
                { fieldName: 'saleAmt', dataType: 'text' },
                { fieldName: 'approveAmt', dataType: 'text' },
                { fieldName: 'cardCnt', dataType: 'text' },
                { fieldName: 'reCardCnt', dataType: 'text' },
                { fieldName: 'payerTicketNo', dataType: 'text' },
            ],
            repaymentColumns: [
                {
                    name: 'approveYmd',
                    fieldName: 'approveYmd',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_REPAY_DATE') }, // 재결제일자
                    // 셀머지 옵션 >> 영수증번호(약식)
                    mergeRule: {
                        criteria: "values['receiptNo'] + value"
                    },
                    edit: false,
                },
                {
                    name: 'approveHms',
                    fieldName: 'approveHms',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_REPAY_TIME') }, // 재결제시간
                     // 셀머지 옵션 >> 영수증번호(약식)
                     mergeRule: {
                        criteria: "values['receiptNo'] + value"
                    },
                    edit: false,
                },
                {
                    name: 'ymd',
                    fieldName: 'ymd',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_PREPAY_DATE') }, // 기결제일자
                     // 셀머지 옵션 >> 영수증번호(약식)
                     mergeRule: {
                        criteria: "values['receiptNo'] + value"
                    },
                    edit: false,
                },
                {
                    name: 'hms',
                    fieldName: 'hms',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_PREPAY_TIME') }, // 기결제시간
                     // 셀머지 옵션 >> 영수증번호(약식)
                     mergeRule: {
                        criteria: "values['receiptNo'] + value"
                    },
                    edit: false,
                },
                {
                    name: 'receiptNo',
                    fieldName: 'receiptNo',
                    width: '200',
                    header: { text: this.$t('MSG_TXT_RECIPT_NO_INFORM') }, // 영수증번호(약식)
                    styleName: 'popup_render',
                     // 셀머지 옵션 >> 영수증번호(약식)
                     mergeRule: {
                        criteria: "values['receiptNo'] + value"
                    },
                    edit: false,
                },
                {
                    name: 'saleAmt',
                    fieldName: 'saleAmt',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_PAY_TOT') }, // 결제총액
                     // 셀머지 옵션 >> 영수증번호(약식)
                     mergeRule: {
                        criteria: "values['receiptNo'] + value"
                    },
                    edit: false,
                },
                {
                    name: 'approveAmt',
                    fieldName: 'approveAmt',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_CARD_AMOUNT') }, // 카드제총액
                     // 셀머지 옵션 >> 영수증번호(약식)
                     mergeRule: {
                        criteria: "values['receiptNo'] + value"
                    },
                    edit: false,
                },
                {
                    name: 'cardCnt',
                    fieldName: 'cardCnt',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_NUM_PREPAID_TRANS') }, // 기결제건수
                     // 셀머지 옵션 >> 영수증번호(약식)
                     mergeRule: {
                        criteria: "values['receiptNo'] + value"
                    },
                    edit: false,
                },
                {
                    name: 'reCardCnt',
                    fieldName: 'reCardCnt',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_NUM_REPAY') }, // 재결제건수
                    edit: false,
                },
                {
                    name: 'payerTicketNo',
                    fieldName: 'payerTicketNo',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_MEMBER_NUM') }, // 정기권번호
                    edit: false,
                },
            ],
            repaymentDataList: [],
            repaymentCnt: 0,

            // 신용카드 기결제 정보 리스트
            cardFields: [
                { fieldName: 'cardNo', dataType: 'text' },
                { fieldName: 'compCodeNm', dataType: 'text' },
                { fieldName: 'apprDate', dataType: 'text' },
                { fieldName: 'apprTime', dataType: 'text' },
                { fieldName: 'apprNo', dataType: 'text' },
                { fieldName: 'vanKindNm', dataType: 'text' },
                { fieldName: 'expireYm', dataType: 'text' },
                { fieldName: 'divideGigan', dataType: 'text' },
                { fieldName: 'apprAmt', dataType: 'text' },
            ],
            cardColumns: [
                {
                    name: 'cardNo',
                    fieldName: 'cardNo',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_CREDIT_CARD_NO') }, // 신용카드번호
                    edit: false,
                },
                {
                    name: 'compCodeNm',
                    fieldName: 'compCodeNm',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_CREDIT_CARD_CMPNY') }, // 신용카드사
                    edit: false,
                },
                {
                    name: 'apprDate',
                    fieldName: 'apprDate',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_APPR_DATE') }, // 승인일자
                    edit: false,
                },
                {
                    name: 'apprTime',
                    fieldName: 'apprTime',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_APPR_TIME2') }, // 승인시각
                    edit: false,
                },
                {
                    name: 'apprNo',
                    fieldName: 'apprNo',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_APPR_NO') }, // 승인번호
                    edit: false,
                },
                {
                    name: 'vanKindNm',
                    fieldName: 'vanKindNm',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_VAN_CMPNY') }, // VAN사
                    edit: false,
                },
                {
                    name: 'expireYm',
                    fieldName: 'expireYm',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_VALID_TIME') }, // 유효시간
                    edit: false,
                },
                {
                    name: 'divideGigan',
                    fieldName: 'divideGigan',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_INST') }, // 할부
                    edit: false,
                },
                {
                    name: 'apprAmt',
                    fieldName: 'apprAmt',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_APPR_AMT') }, // 승인금액
                    edit: false,
                },
            ],
            cardDataList: [],
            cardCnt: 0,

            // 신용카드 재결제 정보 리스트
            reCardFields: [
                { fieldName: 'cardNo', dataType: 'text' },
                { fieldName: 'compCodeNm', dataType: 'text' },
                { fieldName: 'approveYmd', dataType: 'text' },
                { fieldName: 'approveHms', dataType: 'text' },
                { fieldName: 'approveNo', dataType: 'text' },
                { fieldName: 'vanKindNm', dataType: 'text' },
                { fieldName: 'expireYm', dataType: 'text' },
                { fieldName: 'divideGigan', dataType: 'text' },
                { fieldName: 'approveAmt', dataType: 'text' },
            ],
            reCardColumns: [
                {
                    name: 'cardNo',
                    fieldName: 'cardNo',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_CREDIT_CARD_NO') }, // 신용카드번호
                    edit: false,
                },
                {
                    name: 'compCodeNm',
                    fieldName: 'compCodeNm',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_CREDIT_CARD_CMPNY') }, // 신용카드사
                    edit: false,
                },
                {
                    name: 'approveYmd',
                    fieldName: 'approveYmd',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_APPR_DATE') }, // 승인일자
                    edit: false,
                },
                {
                    name: 'approveHms',
                    fieldName: 'approveHms',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_APPR_TIME2') }, // 승인시각
                    edit: false,
                },
                {
                    name: 'approveNo',
                    fieldName: 'approveNo',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_APPR_NO') }, // 승인번호
                    edit: false,
                },
                {
                    name: 'vanKindNm',
                    fieldName: 'vanKindNm',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_VAN_CMPNY') }, // VAN사
                    edit: false,
                },
                {
                    name: 'expireYm',
                    fieldName: 'expireYm',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_VALID_TIME') }, // 유효시간
                    edit: false,
                },
                {
                    name: 'divideGigan',
                    fieldName: 'divideGigan',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_INST') }, // 할부
                    edit: false,
                },
                {
                    name: 'approveAmt',
                    fieldName: 'approveAmt',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_APPR_AMT') }, // 승인금액
                    edit: false,
                },
            ],
            reCardDataList: [],
            reCardCnt: 0,
        };
    },
    computed: {
        disabled() {
            switch (this.srchFg) {
                case 'name':
                case 'mobile':
                    return true;
                default:
                    return false;
            }
        },
        // Input Mask
        inputMask() {
            if (this.srchFg == 'ticket') {
                return '##########';
            }
        },
    },
    watch: {
        dateValue(newVal, oldVal) {
            this.srchStartDt = newVal[0];
            this.srchEndDt = newVal[1];
        },
    },
    created() {},
    mounted() {},
    methods: {
        onClickSrchFg(srchFg) {
            this.srchVal = null;

            switch (srchFg) {
                case 'name':
                case 'mobile':
                    this.popup();
                    break;
            }
        },
        popup() {
            let pageInitialData = {};
            if (this.srchFg === 'ticket') pageInitialData.ticketNo = this.srchVal;

            utils.openLayerPopup('PGE_CTM_00011', this.onPopupCallback, {
                pageInitialData: pageInitialData,
                size: 'lg',
            });
        },
        popupSearch() {
            switch (this.srchFg) {
                case 'name':
                case 'mobile':
                case 'ticket':
                    this.popup();
                    break;
                default:
            }
        },
        onPopupCallback(data) {
            if (data) {
                this.memshpInfo = data;

                switch (this.srchFg) {
                    case 'name':
                        this.srchVal = this.memshpInfo.name;
                        break;
                    case 'mobile':
                        this.srchVal = this.memshpInfo.mobileTel;
                        break;
                }

                this.search();
            }
        },
        search() {
            if (_.isEmpty(this.srchStartDt) || _.isEmpty(this.srchEndDt)) {
                // 재결제일자를 입력해주세요.
                utils.messageBox("alert", this.$t('MSG_ALT_ENTER_REPAYMENT_DATE'));
                return;
            }
            const params = {
                srchStartDt: this.srchStartDt,
                srchEndDt: this.srchEndDt,
            };

            if (!_.isNull(this.srchReceiptNo)) params.receiptNo = this.srchReceiptNo;
            if (!_.isNull(this.memshpInfo)) params.memshpUid = this.memshpInfo.memshpUid;

            if (this.srchFg === 'ticket' && !_.isEmpty(this.srchVal)) params.ticketNo = this.srchVal;

            http.request(this.$options.name, 'DTS_JNS_00001', {
                query: params,
            }).then((res) => {
                if (res.data) {
                    this.repaymentDataList = res.data;

                    _.each(this.repaymentDataList, (row) => {
                        row.approveYmd = utils.toStringByFormat(utils.toDate(row.approveYmd), 'YYYY-MM-DD');
                        row.approveHms = utils.toStringByFormat(
                            utils.toDate(String(row.approveYmd) + String(row.approveHms)),
                            'HH:mm:ss'
                        );
                        row.ymd = utils.toStringByFormat(utils.toDate(row.ymd), 'YYYY-MM-DD');
                        row.hms = utils.toStringByFormat(utils.toDate(String(row.ymd) + String(row.hms)), 'HH:mm:ss');
                        row.saleAmt = _.isNull(row.saleAmt) ? row.saleAmt : utils.numberWithCommas(row.saleAmt);
                        row.approveAmt = _.isNull(row.approveAmt)
                            ? row.approveAmt
                            : utils.numberWithCommas(row.approveAmt);
                    });

                    this.repaymentCnt = this.repaymentDataList.length;
                    this.$refs.repaymentGrid.setRows(this.repaymentDataList);

                    this.cardDataList = [];
                    this.cardCnt = this.cardDataList.length;
                    this.$refs.cardGrid.setRows(this.cardDataList);

                    this.reCardDataList = [];
                    this.reCardCnt = this.reCardDataList.length;
                    this.$refs.reCardGrid.setRows(this.reCardDataList);
                }
            });
        },
        repaymentCellClick(grid, data) {
            if (!_.isEmpty(this.repaymentDataList)) {
                const receiptNo = this.repaymentDataList[data.dataRow].receiptNo;

                this.getCardDataList(receiptNo);
                this.getReCardDataList(receiptNo);
            }

            if(data.fieldIndex == 4) {
                const row = grid.getJsonRows()[data.itemIndex];
                let receiptNo = row.receiptNo;

                const queryString = `receiptNo=${receiptNo}`
                utils.openWindowPopup('PGE_SAA_00001', queryString);
            }
        },
        getCardDataList(receiptNo) {
            http.request(this.$options.name, 'DTS_JNS_00002', {
                query: {
                    receiptNo: receiptNo,
                },
            }).then((res) => {
                if (res.data) {
                    const resData = res.data;
                    utils.map(resData, (data) => {
                        data.apprAmt = _.isNull(data.apprAmt) ? data.apprAmt : utils.numberWithCommas(data.apprAmt);
                    });

                    this.cardDataList = res.data;
                    this.cardCnt = this.cardDataList.length;
                    this.$refs.cardGrid.setRows(this.cardDataList);
                }
            });
        },
        getReCardDataList(receiptNo) {
            http.request(this.$options.name, 'DTS_JNS_00003', {
                query: {
                    receiptNo: receiptNo,
                },
            }).then((res) => {
                if (res.data) {
                    let resData = res.data;
                    utils.map(resData, (row) => {
                        row.approveYmd = utils.toStringByFormat(utils.toDate(row.approveYmd), 'YYYY-MM-DD');
                        row.approveHms = utils.toStringByFormat(
                            utils.toDate(String(row.approveYmd) + String(row.approveHms)),
                            'HH:mm:ss'
                        );
                        row.approveAmt = _.isNull(row.approveAmt)
                            ? row.approveAmt
                            : utils.numberWithCommas(row.approveAmt);
                    });

                    this.reCardDataList = resData;
                    this.reCardCnt = this.reCardDataList.length;
                    this.$refs.reCardGrid.setRows(this.reCardDataList);
                }
            });
        },
        init() {
            this.dateValue = [utils.now("YYYY-MM-DD"), utils.now("YYYY-MM-DD")];
            this.srchFg = 'name';
            this.srchVal = null;
            this.memshpInfo = null;
        },
        numberWithCommas(number) {
            if (number || number === 0) {
                number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
            return !number && number !== 0 ? '' : number;
        },
    },
};
</script>
<style scoped></style>
