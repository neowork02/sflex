<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SEARCH_JOIN_INFO')"
                    :labelAlign="'right'"
                    required
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
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SRCH_USER_TYPE')"
                    style="width: 50%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="srchMemType" value="member" sm>{{$t('MSG_TXT_JOINER')}}</ur-radio>   <!-- 가입자 -->
                        <ur-radio v-model="srchMemType" value="payer" sm>{{$t('MSG_TXT_PAYER')}}</ur-radio>  <!-- 결제자 -->
                    </div>
                </ur-form-item>
                <!-- 판매일자 -->
                <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_SALE_DATE')" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-date-picker v-model="srchSaleDate" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap borTop"
                    :label="$t('MSG_TXT_RECEIPT_NO')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto; border: 0"
                >
                    <ur-text-field
                        v-model="receiptNo"
                        style="width: 100%; height: auto"
                        maxlength="24"
                        @enter="search"
                        :mask="inputMask"
                        @keyup="specialChar"
                    />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <!--::S InfoText -->
                     <div class="guideList">
                         <ul class="listDot">
                            <li>{{ $t('MSG_TXT_RERECEIPT_SRCH_DESCRIPTION') }}</li>
                        </ul>
                 </div>
                 <!--::E InfoText -->
                <div class="right_box">
                    <ur-button @click="init">{{ $t('MSG_BTN_RESET') }}</ur-button>
                    <!-- 초기화 -->
                    <ur-button @click="search">{{ $t('MSG_TXT_SRCH') }}</ur-button>
                    <!-- 조회 -->
                    <ur-button color="violet" @click="onClickReceiptReIssue">
                        {{ $t('MSG_TXT_REISSUE_RECEIPT') }}
                    </ur-button>
                    <!-- 영수증재발행 -->
                </div>
            </div>

            <div class="comm_title_wrap mt25">
                <h4>{{ $t('MSG_TXT_REISSUE_RECEIPT_LIST') }}</h4>
                <!-- 영수증재발급 리스트 -->
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">
                            Total<span>{{ numberWithCommas(receiptReissuePayCnt) }}</span
                            >{{ $t('MSG_TXT_CNT') }}
                        </div>
                        <!-- 건 -->
                    </div>
                </div>
            </div>
            <real-grid
                ref="receiptReissuePayGrid"
                grid-id="receiptReissuePayGrid"
                grid-root="/lib"
                :gridFields="receiptReissuePayFields"
                :gridColumns="receiptReissuePayColumns"
                :gridCellClick="receiptReissuePayCellClick"
                :style="{ height: '250px' }"
            />

            <!-- S::정기권 정보 -->
            <div class="comm_title_wrap mt40">
                <h4>{{ $t('MSG_TXT_TICKET_INFO') }}</h4>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">
                            Total<span>{{ numberWithCommas(receiptReissueMemberCnt) }}</span
                            >{{ $t('MSG_TXT_CNT') }}
                        </div>
                        <!-- 건 -->
                    </div>
                </div>
                <!--E::: 타이틀 오른쪽 total info -->
            </div>
            <real-grid
                ref="receiptReissueMemberGrid"
                grid-id="receiptReissueMemberGrid"
                grid-root="/lib"
                :gridFields="receiptReissueMemberFields"
                :gridColumns="receiptReissueMemberColumns"
                :style="{ height: '250px' }"
            />
            <!-- E::정기권 정보 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
import _ from 'lodash';
import PosPrint from '~common/js/PosPrint/pos-print.js';
import BxlPosUtils from '~common/js/PosPrint/bxlpos.js';
import BxlCommonUtils from '~common/js/PosPrint/bxlcommon.js';

export default {
    name: 'PGE_JNN_00001', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            srchFg: 'name',
            srchVal: null,
            srchMemType: 'member',
            srchSaleDate: '', //utils.now('YYYY-MM-DD'),

            memshpInfo: null,

            receiptNo: null,

            receiptReissuePayFields: [
                { fieldName: 'parkKind', dataType: 'text' },
                { fieldName: 'paymntDate', dataType: 'text' },
                { fieldName: 'posId', dataType: 'text' },
                { fieldName: 'receiptNo', dataType: 'text' },
                { fieldName: 'saleKindNm', dataType: 'text' },
                { fieldName: 'inwonCnt', dataType: 'text' },
                { fieldName: 'saleAmt', dataType: 'text' },
                { fieldName: 'name', dataType: 'text' },
                { fieldName: 'paymntKindNm', dataType: 'text' },
                { fieldName: 'paymntCnt', dataType: 'text' },
                { fieldName: 'paymntAmt', dataType: 'text' },
            ],
            receiptReissuePayColumns: [
                {
                    // 파크구분
                    name: 'parkKind',
                    fieldName: 'parkKind',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_PARK_KIND') },
                    edit: false,
                    mergeRule: {
                        criteria: 'value', // 셀머지 옵션
                    },
                },
                {
                    // 판매일자
                    name: 'paymntDate',
                    fieldName: 'paymntDate',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_SALE_DATE') },
                    edit: false,
                    mergeRule: {
                        criteria: 'value', // 셀머지 옵션
                    },
                },
                {
                    // 포스번호
                    name: 'posId',
                    fieldName: 'posId',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_POST_NUM') },
                    edit: false,
                    mergeRule: {
                        criteria: 'value', // 셀머지 옵션
                    },
                },
                {
                    // 영수증번호
                    name: 'receiptNo',
                    fieldName: 'receiptNo',
                    width: '150',
                    header: { text: this.$t('MSG_TXT_RECEIPT_NO') },
                    edit: false,
                    mergeRule: {
                        criteria: 'value', // 셀머지 옵션
                    },
                },
                {
                    // 판매구분명
                    name: 'saleKindNm',
                    fieldName: 'saleKindNm',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_SALE_FG') },
                    edit: false,
                    mergeRule: {
                        criteria: 'value', // 셀머지 옵션
                    },
                },
                {
                    // 가입인원
                    name: 'inwonCnt',
                    fieldName: 'inwonCnt',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_PEOPLE_ENROLL') },
                    edit: false,
                },
                {
                    // 총결제금액
                    name: 'saleAmt',
                    fieldName: 'saleAmt',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_TOT_AMOUNT') },
                    edit: false,
                },
                {
                    // 결제자
                    name: 'name',
                    fieldName: 'name',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_PAYER') },
                    edit: false,
                },
                {
                    // 결제구분
                    name: 'paymntKindNm',
                    fieldName: 'paymntKindNm',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_PAYMENT_CLASS') },
                    edit: false,
                },
                {
                    // 결제건수
                    name: 'paymntCnt',
                    fieldName: 'paymntCnt',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_PAY_CNT') },
                    edit: false,
                },
                {
                    // 결제금액
                    name: 'paymntAmt',
                    fieldName: 'paymntAmt',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_PAY_AMT') },
                    edit: false,
                },
            ],
            receiptReissuePayList: [],
            receiptReissuePayCnt: 0,
            selectedReceiptReissuePay: null,

            receiptReissueMemberFields: [
                { fieldName: 'ticketNo', dataType: 'text' },
                { fieldName: 'memberName', dataType: 'text' },
                { fieldName: 'ageTypeNm', dataType: 'text' },
                { fieldName: 'fstJoinDate', dataType: 'text' },
                { fieldName: 'issueDate', dataType: 'text' },
                { fieldName: 'expireDate', dataType: 'text' },
                { fieldName: 'ticketStatusValueNm', dataType: 'text' },
                { fieldName: 'itemNm', dataType: 'text' },
                { fieldName: 'saleAmt', dataType: 'text' },
            ],
            receiptReissueMemberColumns: [
                {
                    // 정기권번호
                    name: 'ticketNo',
                    fieldName: 'ticketNo',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_SEASON_NO') },
                    edit: false,
                },
                {
                    // 성명
                    name: 'memberName',
                    fieldName: 'memberName',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_EMPL_NM') },
                    edit: false,
                },
                {
                    // 인원유형
                    name: 'ageTypeNm',
                    fieldName: 'ageTypeNM',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_AGE_TYP_CD') },
                    edit: false,
                },
                {
                    // 가입일자
                    name: 'fstJoinDate',
                    fieldName: 'fstJoinDate',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_JOIN_DATE') },
                    edit: false,
                },
                {
                    // 발급일자
                    name: 'issueDate',
                    fieldName: 'issueDate',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_ISSUE_DATE') },
                    edit: false,
                },
                {
                    // 만기일자
                    name: 'expireDate',
                    fieldName: 'expireDate',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_EXPIRE_DATE') },
                    edit: false,
                },
                {
                    // 상태
                    name: 'ticketStatusValueNm',
                    fieldName: 'ticketStatusValueNm',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_DTST_STT') },
                    edit: false,
                },
                {
                    // 티켓명
                    name: 'itemNm',
                    fieldName: 'itemNm',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_TICKET_NM') },
                    edit: false,
                },
                {
                    // 판매금액
                    name: 'saleAmt',
                    fieldName: 'saleAmt',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_SALE_AMT') },
                    edit: false,
                },
            ],
            receiptReissueMemberList: [],
            receiptReissueMemberCnt: 0,
        };
    },
    created() {},
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
            } else if (this.receiptNo) {
                return 'NNNNNNNNNNNNNNNNNNNNNNNN';
            }
        },
    },
    watch: {},
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

            utils.openLayerPopup('PGE_CTM_00016', this.onPopupCallback, {
                pageInitialData: pageInitialData,
                size: 'lg',
            });
        },
        search() {
            if (this.memshpInfo == null && this.receiptNo == null) {
                // 조회 조건을 1개 이상 입력하시기 바랍니다.
                utils.messageBox('alert', this.$t('MSG_ALT_ENTER_ONT_SEARCH'));
                return;
            }

            const params = {};

            if (!_.isNull(this.memshpInfo)) params.memshpUid = this.memshpInfo.memshpUid;
            if (!_.isNull(this.receiptNo)) params.receiptNo = this.receiptNo;
            if (!_.isNull(this.srchMemType)) params.memType = this.srchMemType;
            if (!_.isNull(this.srchSaleDate)) params.saleDate = this.srchSaleDate;

            http.request(this.$options.name, 'DTS_JNN_00001', {
                query: params,
            }).then((res) => {
                if (res.data) {
                    _.each(res.data, (row) => {
                        row.name = utils.changeMaskingCenter(row.name);
                        row.paymntAmt = utils.numberWithCommas(row.paymntAmt);
                        row.paymntDate = utils.toStringByFormat(utils.toDate(row.paymntDate), 'YYYY-MM-DD');
                        row.saleAmt = utils.numberWithCommas(row.saleAmt);
                    });

                    this.receiptReissuePayList = res.data;
                    this.receiptReissuePayCnt = this.receiptReissuePayList.length;
                    this.$refs.receiptReissuePayGrid.setRows(this.receiptReissuePayList);
                    this.selectedReceiptReissuePay = null;

                    this.receiptReissueMemberCnt = 0;
                    this.receiptReissueMemberList = [];
                    this.$refs.receiptReissueMemberGrid.setRows(this.receiptReissueMemberList);
                } else {
                    this.receiptReissuePayList = [];
                    this.receiptReissuePayCnt = this.receiptReissuePayList.length;
                    this.$refs.receiptReissuePayGrid.setRows(this.receiptReissuePayList);
                    this.selectedReceiptReissuePay = null;
                }
            });
        },
        popupSearch() {
            switch (this.srchFg) {
                case 'name':
                case 'mobile':
                case 'ticket':
                    this.popup();
                    break;
                case 'receipt':
                    this.search();
                    break;
                default:
            }
        },
        onPopupCallback(data) {
            if (!_.isNull(data)) {
                this.memshpInfo = data;

                switch (this.srchFg) {
                    case 'name':
                        this.srchVal = this.memshpInfo.name;
                        break;
                    case 'mobile':
                        this.srchVal = this.memshpInfo.mobileTel;
                        break;
                    case 'ticket':
                        this.srchVal = this.memshpInfo.ticketNo;
                        break;
                    case 'receipt':
                        this.srchVal = this.memshpInfo.receiptNo;
                }

                this.search();
            }
        },
        receiptReissuePayCellClick(grid, data) {
            if(data.cellType === 'gridEmpty')   return;
            this.selectedReceiptReissuePay = this.receiptReissuePayList[data.dataRow];
            const receiptNo = this.selectedReceiptReissuePay.saleKind === 'S004' ? this.selectedReceiptReissuePay.orgReceiptNo : this.selectedReceiptReissuePay.receiptNo;

            http.request(this.$options.name, 'DTS_JNN_00002', {
                query: {
                    receiptNo: receiptNo,
                },
            }).then((res) => {
                if (res.data) {
                    this.receiptReissueMemberList = res.data;

                    _.each(this.receiptReissueMemberList, (row) => {
                        row.memberName = utils.changeMaskingCenter(row.memberName);
                        row.fstJoinDate = utils.toStringByFormat(utils.toDate(row.fstJoinDate), 'YYYY-MM-DD');
                        row.issueDate = utils.toStringByFormat(utils.toDate(row.issueDate), 'YYYY-MM-DD');
                        row.expireDate = utils.toStringByFormat(utils.toDate(row.expireDate), 'YYYY-MM-DD');
                        row.saleAmt = utils.numberWithCommas(row.saleAmt);
                    });

                    this.receiptReissueMemberCnt = this.receiptReissueMemberList.length;
                    this.$refs.receiptReissueMemberGrid.setRows(this.receiptReissueMemberList);
                } else {
                    this.receiptReissueMemberCnt = 0;
                    this.receiptReissueMemberList = [];
                    this.$refs.receiptReissueMemberGrid.setRows(this.receiptReissueMemberList);
                }
            }).catch(e => {
                this.receiptReissueMemberCnt = 0;
                this.receiptReissueMemberList = [];
                this.$refs.receiptReissueMemberGrid.setRows(this.receiptReissueMemberList);
            });
        },
        onClickReceiptReIssue() {
            if (_.isNil(this.selectedReceiptReissuePay)) {
                // 영수증재발급할 정보를 선택해주세요.
                utils.messageBox('alert', this.$t('MSG_ALT_SEL_REISSUE_RECEIPT'));
                return;
            }

            // 판매금액(saleAmt) 값이 0 이면, "영수증을 출력할 수 없습니다." 메시지 출력
            if(this.selectedReceiptReissuePay.saleKind === 'S003') {
                let saleAmt = Number(this.selectedReceiptReissuePay.saleAmt.replace(",", ""));
                saleAmt = _.isNil(saleAmt) ? 0 : saleAmt;
                
                if(saleAmt === 0) {
                    utils.messageBox('alert', '영수증을 출력할 수 없습니다.');
                    return;
                }
            }

            const receiptNo = this.selectedReceiptReissuePay.saleKind === 'S004' ? this.selectedReceiptReissuePay.orgReceiptNo : this.selectedReceiptReissuePay.receiptNo;

            http.request(this.$options.name, 'DTS_JNN_00003', {
                query: {
                    saleKind: this.selectedReceiptReissuePay.saleKind,
                    receiptNo: receiptNo,
                },
            }).then(async res => {
                if (res.data) {
                    const payMainInfo = res.data;
                    const bxlPosUtils = new BxlPosUtils();
                    const posPrint = new PosPrint();
                    const systemTime = await http.getSystemTime();

                    console.debug(JSON.stringify(payMainInfo));
                    
                    if(this.selectedReceiptReissuePay.saleKind === 'S001') { // 일반영수증
                        // 영수증
                        await posPrint.printReceipt(bxlPosUtils, "1", payMainInfo, systemTime);

                        // 현금영수증
                        if(this.selectedReceiptReissuePay.paymntKind === "01" && !_.isNil(payMainInfo.payCashReceipt)) {
                            await posPrint.printCashReceipt(bxlPosUtils, "1", "N", payMainInfo, systemTime, "Y");
                        }
                    } else if(this.selectedReceiptReissuePay.saleKind === 'S002') { // 웹 영수증
                        await posPrint.printWebReceipt(bxlPosUtils, "1", payMainInfo, systemTime);
                    } else if(this.selectedReceiptReissuePay.saleKind === 'S003') { // 사원 웹 영수증
                        await posPrint.printWebReceipt(bxlPosUtils, "1", payMainInfo, systemTime);
                    } else if(this.selectedReceiptReissuePay.saleKind === 'S004') { // 환불 영수증
                        const receiptNo = this.selectedReceiptReissuePay.receiptNo;
                        const orgReceiptNo = this.selectedReceiptReissuePay.orgReceiptNo;
                        const posNm = this.selectedReceiptReissuePay.posNm;

                        let strReturnFg;
                        if( receiptNo.substring(0, 8) == orgReceiptNo.substring(0, 8) ) {
                            // 당일결제 취소의 경우
                            strReturnFg = "1";
                        } else {
                            strReturnFg = "0";
                            payMainInfo.webReceiptList = [];    // 영수증 출력시 webReceiptList 을 쓰는데 object에 없으면 undefined 에러가 발생하여 빈 배열 처리.
                        }

                        // 카드전표
                        await posPrint.printReturnCardReceipt(bxlPosUtils, "1", receiptNo, payMainInfo.cardReceiptList, payMainInfo.posNm, systemTime);

                        // 영수증(고객용)
                        await posPrint.printReturnReceipt(bxlPosUtils, "1", "N", strReturnFg, receiptNo, payMainInfo, posNm, systemTime);

                        // 현금영수증
                        if(this.selectedReceiptReissuePay.paymntKind === "01" && !_.isNil(payMainInfo.payCashReceipt)) {
                            await posPrint.printCashReceipt(bxlPosUtils, "1", "Y", payMainInfo, systemTime, "Y");
                        }

                        // 영수증(보관용)
                        await posPrint.printReturnReceipt(bxlPosUtils, "1", "Y", strReturnFg, receiptNo, payMainInfo, posNm, systemTime);
                    }

                    posPrint.sendPrint(bxlPosUtils);
                }
            });
        },
        init() {
            (this.srchFg = 'name'), (this.srchVal = null), (this.memshpInfo = null);

            this.receiptNo = null;

            this.receiptReissuePayList = [];
            this.$refs.receiptReissuePayGrid.setRows(this.receiptReissuePayList);

            this.receiptReissueMemberList = [];
            this.$refs.receiptReissueMemberGrid.setRows(this.receiptReissueMemberList);
        },
        // 특수문자 체크
        specialChar() {
            const searchNewText = utils.trim(this.receiptNo);
            if (utils.isExistSpecialChar(searchNewText)) {
                // `-_{}[];:<>/? 제외 특수문자는 입력할 수 없습니다.
                utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
                    this.receiptNo = '';
                });
            }
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
