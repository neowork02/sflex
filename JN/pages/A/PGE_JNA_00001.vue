<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_PARK_KIND')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field style="width: 100%" placeholder="EL/CB" :value="parkKind" disabled class="alignR" />
                </ur-form-item>

                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SEARCH_JOIN_INFO')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <div>
                        <div class="radioForm">
                            <ur-radio v-model="srchFg" value="name" sm @click="onClickSrchFg('name')">
                                {{ $t('MSG_TXT_EMPL_NM') }}
                            </ur-radio>
                            <ur-radio v-model="srchFg" value="ticket" sm @click="onClickSrchFg('ticket')">
                                {{ $t('MSG_TXT_SEASON_NO') }}
                            </ur-radio>
                        </div>
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
                    :label="$t('MSG_TXT_RECEIPT_NO')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field
                        v-model="srchReceiptNo"
                        style="width: 100%"
                        maxlength="24"
                        @enter="search"
                        mask="NNNNNNNNNNNNNNNNNNNNNNNN"
                    />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_CREDIT_CARD_NO')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field
                        v-model="srchCardNo"
                        style="width: 100%"
                        maxlength="16"
                        @enter="search"
                        mask="################"
                    />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button @click="init">{{ $t('MSG_BTN_RESET') }}</ur-button>
                    <!-- 초기화 -->
                    <ur-button v-permission:read="this.$options.name" color="violet" @click="search">{{
                        $t('MSG_TXT_SRCH')
                    }}</ur-button>
                    <!-- 조회 -->
                </div>
            </div>

            <!-- S::재결제 대상 -->
            <div class="comm_shut_wrap">
                <div class="inbox7">
                    <div class="comm_title_wrap mt25">
                        <h4 class="pr10">{{ $t('MSG_TXT_SUB_REPAY') }}</h4>
                        <!-- 재결제 대상 -->
                        <ur-button color="violet" @click="onClickRePayment" v-show="showBtnRepay">{{
                            $t('MSG_TXT_REPAY')
                        }}</ur-button>
                        <!-- 재결제 -->
                        <!-- <ur-button @click="saveRePayment">재결제 테스트</ur-button> -->
                        <!--S:: 타이틀 오른쪽 total info -->
                        <div class="right_box">
                            <div class="totalNo">
                                <div class="totalCt">
                                    Total<span>{{ numberWithCommas(rePaymentCardCnt) }}</span
                                    >{{ $t('MSG_TXT_CNT') }}
                                </div>
                                <!-- 건 -->
                                <!-- info: Total *건 -->
                            </div>
                        </div>
                        <!--E::: 타이틀 오른쪽 total info -->
                    </div>
                    <real-grid
                        ref="rePaymentCardGrid"
                        grid-id="rePaymentCardGrid"
                        grid-root="/lib"
                        :gridFields="rePaymentCardFields"
                        :gridColumns="rePaymentCardColumns"
                        :gridCellClick="onRePaymentCardCellClick"
                        :style="{ height: '250px' }"
                    />
                </div>
                <div class="emptybox" />
                <div class="inbox3">
                    <div class="comm_title_wrap mt25">
                        <!--S:: 타이틀 오른쪽 total info -->
                        <div class="right_box mt12">
                            <div class="totalNo">
                                <div class="totalCt">
                                    Total<span>{{ numberWithCommas(ticketCnt) }}</span
                                    >{{ $t('MSG_TXT_CNT') }}
                                </div>
                                <!-- 건 -->
                                <!-- info: Total *건 -->
                            </div>
                        </div>
                        <!--E::: 타이틀 오른쪽 total info -->
                    </div>
                    <real-grid
                        ref="ticketGrid"
                        grid-id="ticketGrid"
                        grid-root="/lib"
                        :gridFields="ticketFields"
                        :gridColumns="ticketColumns"
                        :style="{ height: '250px' }"
                    />
                </div>
            </div>
            <!-- E::재결제 대상 -->

            <!-- S::변경카드 내역 -->
            <div class="comm_title_wrap mt45">
                <h4>{{ $t('MSG_TXT_CHANGE_CARD') }}</h4>
                <!-- 변경카드 내역 -->
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">
                            Total<span>{{ numberWithCommas(approveCardCnt) }}</span
                            >{{ $t('MSG_TXT_CNT') }}
                        </div>
                        <!-- 건 -->
                        <!-- info: Total *건 -->
                    </div>
                </div>
                <!--E::: 타이틀 오른쪽 total info -->
            </div>
            <real-grid
                ref="approveCardGrid"
                grid-id="approveCardGrid"
                grid-root="/lib"
                :gridFields="approveCardFields"
                :gridColumns="approveCardColumns"
                :style="{ height: '250px' }"
            />
            <!-- E::변경카드 내역 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
import _ from 'lodash';
import CardPopupUtils from '~common/js/card-popup-utils.js';
import WebrtcDatachannel from '~common/js/webrtc-datachannel.js';
import PosPrint from '~common/js/PosPrint/pos-print.js';
import BxlPosUtils from '~common/js/PosPrint/bxlpos.js';

export default {
    name: 'PGE_JNA_00001',
    data() {
        return {
            srchFg: 'name',
            srchVal: null,
            srchReceiptNo: null,
            srchCardNo: null,

            memshpInfo: null,

            // 조회조건
            parkKind: null,

            // 결제관련 모듈
            cardPopupUtils: null,
            webrtcDatachannel: null,
            cardPopupPage: 'PGE_CTM_00004',
            cashPopupPage: 'PGE_CTM_00017',
            payMainInfo: null,
            logSeq: '', //로그순번(카드승인)
            itemNms: '', // 상품명
            payMemberList: [], // 구매한 정기권 정보
            totSaleAmt: 0,
            totPay: 0,
            notPay: 0,
            isPos: false, // 접수 POS 여부
            posSodStatus: {}, // POS SOD 상태
            parkPosKind: '', //파크구분(POS용)
            posId: '', // POS ID
            posNm: '', // POS Name
            icReaderPort: '', // IC Reader Port
            icReaderSpeed: '', // IC Reader Speed
            showBtnRepay: true,

            // 재결제 대상 리스트
            rePaymentCardFields: [
                { fieldName: 'paymntDate', dataType: 'text' },
                { fieldName: 'posNm', dataType: 'text' },
                { fieldName: 'receiptNo', dataType: 'text' },
                { fieldName: 'compCodeNm', dataType: 'text' },
                { fieldName: 'cardNo', dataType: 'text' },
                { fieldName: 'apprNo', dataType: 'text' },
                { fieldName: 'divideGigan', dataType: 'text' },
                { fieldName: 'apprAmt', dataType: 'number' },
                { fieldName: 'apprAmtStr', dataType: 'text' },
                { fieldName: 'period', dataType: 'number' },
            ],
            rePaymentCardColumns: [
                {
                    name: 'paymntDate',
                    fieldName: 'paymntDate',
                    header: { text: this.$t('MSG_TXT_DT') }, // 일자
                    edit: false,
                },
                {
                    name: 'posNm',
                    fieldName: 'posNm',
                    header: { text: this.$t('MSG_TXT_FORCE_NAME') }, // 포스명
                    edit: false,
                },
                {
                    name: 'receiptNo',
                    fieldName: 'receiptNo',
                    header: { text: this.$t('MSG_TXT_RECEIPT_NO') }, // 영수증번호
                    edit: false,
                },
                {
                    name: 'compCodeNm',
                    fieldName: 'compCodeNm',
                    header: { text: this.$t('MSG_TXT_CARD_CMPNY') }, // 카드사
                    edit: false,
                },
                {
                    name: 'cardNo',
                    fieldName: 'cardNo',
                    header: { text: this.$t('MSG_TXT_CARD_NO') }, // 카드번호
                    edit: false,
                },
                {
                    name: 'apprNo',
                    fieldName: 'apprNo',
                    header: { text: this.$t('MSG_TXT_APPR_NO') }, // 승인번호
                    edit: false,
                },
                {
                    name: 'divideGigan',
                    fieldName: 'divideGigan',
                    header: { text: this.$t('MSG_TXT_INST') }, // 할부
                    edit: false,
                },
                {
                    name: 'apprAmt',
                    fieldName: 'apprAmt',
                    visible: false,
                },
                {
                    name: 'apprAmtStr',
                    fieldName: 'apprAmtStr',
                    header: { text: this.$t('MSG_TXT_EOD_AMT') }, // 금액
                    edit: false,
                },
                {
                    name: 'period',
                    fieldName: 'period',
                    visible: false,
                },
            ],
            rePaymentCardCnt: 0,
            rePaymentCardList: [],
            selectedRePaymentCard: null,

            // 정기권 리스트
            ticketFields: [
                { fieldName: 'ticketNo', dataType: 'text' },
                { fieldName: 'name', dataType: 'text' },
                { fieldName: 'itemNm', dataType: 'text' },
            ],
            ticketColumns: [
                {
                    name: 'ticketNo',
                    fieldName: 'ticketNo',
                    header: { text: this.$t('MSG_TXT_SEASON_NO') }, // 정기권번호
                    edit: false,
                },
                {
                    name: 'name',
                    fieldName: 'name',
                    header: { text: this.$t('MSG_TXT_EMPL_NM') }, // 성명
                    edit: false,
                },
                {
                    name: 'itemNm',
                    fieldName: 'itemNm',
                    header: { text: this.$t('MSG_TXT_TICKET_ITEM_NM') }, // 권종명
                    edit: false,
                },
            ],
            ticketCnt: 0,
            ticketList: [],

            // 조건 정보 팝업 테이블
            approveCardFields: [
                { fieldName: 'cardNo', dataType: 'text' },
                { fieldName: 'compCodeNm', dataType: 'text' },
                { fieldName: 'apprNo', dataType: 'text' },
                { fieldName: 'apprAmt', dataType: 'text' },
                { fieldName: 'statusKindNm', dataType: 'text' },
            ],
            approveCardColumns: [
                {
                    name: 'cardNo',
                    fieldName: 'cardNo',
                    header: { text: this.$t('MSG_TXT_CARD_NO') }, // 카드번호
                    edit: false,
                },
                {
                    name: 'compCodeNm',
                    fieldName: 'compCodeNm',
                    header: { text: this.$t('MSG_TXT_CARD_CMPNY') }, // 카드사
                    edit: false,
                },
                {
                    name: 'apprNo',
                    fieldName: 'apprNo',
                    header: { text: this.$t('MSG_TXT_APPR_NO') }, // 승인번호
                    edit: false,
                },
                {
                    name: 'apprAmt',
                    fieldName: 'apprAmt',
                    header: { text: this.$t('MSG_TXT_APPR_AMT') }, // 승인금액
                    edit: false,
                },
                {
                    name: 'statusKindNm',
                    fieldName: 'statusKindNm',
                    header: { text: this.$t('MSG_TXT_PROC_STATUS') }, // 처리상태
                    edit: false,
                },
            ],
            approveCardCnt: 0,
            approveCardList: [],
        };
    },
    computed: {
        disabled() {
            switch (this.srchFg) {
                case 'name':
                    return true;
                default:
                    return false;
            }
        },
        session() {
            return this.$store.getters.userInfo;
        },
        // Input Mask
        inputMask() {
            if (this.srchFg == 'ticket') {
                return '##########';
            }
        },
    },
    watch: {},
    async mounted() {
        this.parkKind = this.session.parkFg;

        this.cardPopupUtils = new CardPopupUtils();
        this.webrtcDatachannel = new WebrtcDatachannel(
            this.$options.name, //thisPage
            this.$store.getters.userInfo.userIp // ip
        );

        await this.webrtcDatachannel.initSecure();

        // 카드 로그 SEQ 조회
        await http
            .request(this.$options.name, 'DTS_CTM_00011')
            .then((res) => {
                if (res.data == null) {
                    // LOG_SEQ 조회에 실패했습니다.
                    utils.messageBox('alert', this.$t('MSG_ALT_LOG_SEQ_FAILED'), null);
                    return;
                }
                this.logSeq = res.data.logSeq;
            })
            .catch((error) => {
                console.error(error);
            });

        this.parkPosKind = this.$store.getters.userInfo.parkPosFg;
        this.posId = this.$store.getters.userInfo.posId;
        this.posNm = this.$store.getters.userInfo.posNm;
        this.icReaderPort = this.$store.getters.userInfo.icReaderPort;
        this.icReaderSpeed = this.$store.getters.userInfo.icReaderSpeed;

        this.isPos = utils.checkReceiptPos(this.parkPosKind, this.posId, this.icReaderPort, this.icReaderSpeed);
        if (!this.isPos) {
            this.posSodStatus = {};
            // POS로 등록된 PC가 아닙니다.
            this.posSodStatus.message = this.$t('MSG_ALT_PC_NOT_REG_POS');
            utils.messageBox('alert', this.posSodStatus.message);
            this.showBtnRepay = false;
        }
    },
    created() {},
    methods: {
        onClickSrchFg(srchFg) {
            this.srchVal = null;

            switch (srchFg) {
                case 'name':
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
                case 'ticket':
                    this.popup();
                    break;
            }
        },
        onPopupCallback(data) {
            if (data) {
                this.memshpInfo = data;

                switch (this.srchFg) {
                    case 'name':
                        this.srchVal = this.memshpInfo.name;
                        break;
                }

                this.search();
            }
        },
        init() {
            this.srchFg = 'name';
            this.srchVal = null;
            this.srchReceiptNo = null;
            this.srchCardNo = null;

            this.memshpInfo = null;
        },
        search() {
            if (this.memshpInfo == null && _.isEmpty(this.srchReceiptNo) && _.isEmpty(this.srchCardNo)) {
                // 조회 조건을 1개 이상 입력하시기 바랍니다.
                utils.messageBox('alert', this.$t('MSG_ALT_ENTER_ONE_SEARCH'));
                return;
            }

            let params = {};
            if (!_.isNull(this.srchReceiptNo)) params.receiptNo = this.srchReceiptNo;
            if (!_.isNull(this.srchCardNo)) params.cardNo = this.srchCardNo;
            if (!_.isNull(this.memshpInfo)) params.memshpUid = this.memshpInfo.memshpUid;

            if (this.srchFg === 'ticket' && !_.isEmpty(this.srchVal)) params.ticketNo = this.srchVal;

            http.request(this.$options.name, 'DTS_JNA_00001', {
                query: params,
            })
                .then((res) => {
                    if (res.data.length > 0) {
                        const resData = res.data;

                        this.rePaymentCardList = utils.map(resData, (row) => {
                            row.paymntDate = utils.toStringByFormat(utils.toDate(row.paymntDate), 'YYYY-MM-DD');
                            row.apprAmtStr = _.isNull(row.apprAmt) ? row.apprAmt : utils.numberWithCommas(row.apprAmt);
                            return row;
                        });

                        this.rePaymentCardCnt = this.rePaymentCardList.length;
                        this.$refs.rePaymentCardGrid.setRows(this.rePaymentCardList);

                        this.ticketCnt = 0;
                        this.ticketList = [];
                        this.$refs.ticketGrid.setRows(this.ticketList);

                        this.approveCardCnt = 0;
                        this.approveCardList = [];
                        this.$refs.approveCardGrid.setRows(this.approveCardList);
                    } else {
                        this.rePaymentCardCnt = 0;
                        this.rePaymentCardList = [];
                        this.$refs.rePaymentCardGrid.setRows(this.rePaymentCardList);

                        this.ticketCnt = 0;
                        this.ticketList = [];
                        this.$refs.ticketGrid.setRows(this.ticketList);

                        this.approveCardCnt = 0;
                        this.approveCardList = [];
                        this.$refs.approveCardGrid.setRows(this.approveCardList);

                        // 조회된 재결제 대상이 없습니다.
                        utils.messageBox('alert', this.$t('MSG_ALT_REPAY_NOT_FOUND'));
                    }
                })
                .catch((error) => console.error(error));
        },
        onClickRePayment() {
            let valid = true;
            if (_.isNil(this.selectedRePaymentCard)) {
                // 재결제 대상을 선택해주세요.
                utils.messageBox('alert', this.$t('MSG_ALT_SEL_REPAY'));
                valid = false;
                return;
            }

            if (this.selectedRePaymentCard.subCnt > 0) {
                // 제휴카드로 결제된 건입니다. 재결제가 불가능합니다.
                utils.messageBox('alert', this.$t('MSG_ALT_REPAY_NOT_POS'));
                valid = false;
                return;
            }

            if (
                this.selectedRePaymentCard.paymntDate === utils.now('YYYY-MM-DD') &&
                this.selectedRePaymentCard.rePaymentYn === 'N'
            ) {
                // 당일 결제건은 환불처리 후 가입처리하여 주십시오.
                utils.messageBox('alert', this.$t('MSG_ALT_REFUND_PAYMENT_DAT'));
                valid = false;
                return;
            }

            if (this.selectedRePaymentCard.period > 2) {
                // 재결제 가능 기간(14일)이 경과했습니다
                utils.messageBox('alert', this.$t('MSG_ALT_REPAY_IMPOSSIBLE'));
                valid = false;
                return;
            }

            if (this.selectedRePaymentCard.rePaymentYn === 'Y') {
                // 이미 재결제 처리되었습니다. 재결제는 1회만 가능합니다.
                utils.messageBox('alert', this.$t('MSG_ALT_REPAY_POS_ONLY_ONCE'));
                valid = false;
                return;
            }

            if (this.selectedRePaymentCard.apprAmt == 0) {
                // 재결제 가능 금액이 없습니다.
                utils.messageBox('alert', this.$t('MSG_ALT_NO_AMOUNT_REPAYMENT'));
                valid = false;
                return;
            }

            // 재결제 하시겠습니까?
            // 주의)재결제는 기존 결제된 금액만큼 타 카드로 결제해야만 합니다.
            // 만약 금액차이가 발생하는 경우에는 처리가 불가능하니 주의하여 주십시오.
            let alertMessage =
                this.$t('MSG_ALT_LIKE_REPAY') +
                '\r\n' +
                this.$t('MSG_ALT_NOTE_REPAY_PRE_PAID') +
                '\r\n' +
                this.$t('MSG_ALT_PROCESS_NOT_POSS_AMOUNT');
            if (valid) {
                utils.messageBox(
                    'confirm',
                    alertMessage,
                    null,
                    async () => {
                        //카드결제창 열려있는지 체크
                        if (this.isOpenCardPopup()) {
                            return;
                        }

                        //접속 시간 서버시간으로 설정
                        let systemTime = await http.getSystemTime();

                        //접속정보 설정
                        await this.webrtcDatachannel.setConnectPage(
                            this.cardPopupPage, //popupPage
                            systemTime.nowDateTime, // accessDateTime
                            this.receiveMessageFromCardPage, // receiveCallBack
                            this.initCardPopup, // initCallback
                            this.closeCardPopup // closeCallback
                        );

                        //팝업 열기
                        await this.cardPopupUtils.openPopup(
                            this.cardPopupPage,
                            this.$options.name,
                            systemTime.nowDateTime,
                            850,
                            1100
                        );

                        //접속하기
                        await this.webrtcDatachannel.connectToPopup();
                    },
                    () => {}
                );
            }
        },
        isOpenCardPopup() {
            if (this.cardPopupUtils.cardWindow != null && this.webrtcDatachannel.isOpenState()) {
                let popupNm = this.$t('MSG_TXT_PAY_CREDIT_CARD'); // 카드결제
                if (this.webrtcDatachannel.getPopupPage() == this.cardPopupPage) {
                    popupNm = this.$t('MSG_TXT_PAY_CREDIT_CARD'); // 카드결제
                } else if (this.webrtcDatachannel.getPopupPage() == this.cashPopupPage) {
                    popupNm = this.$t('MSG_TXT_CASH_RECEIPT'); // 현금영수증
                }

                // 팝업이 열려 있습니다. 확인 후 다시 시도해주세요!
                utils.messageBox('alert', `${popupNm}` + ' ' + this.$t('MSG_ALT_CHECK_TRY_AGAIN'), null, () => {
                    this.webrtcDatachannel.sendMessage({ type: 'focus' });
                });
                return true;
            } else {
                return false;
            }
        },
        /**
         * 카드결제창에서 메시지 송신
         * @param { Object } param
         */
        receiveMessageFromCardPage(param) {
            this.payMainInfo.payCardList = param.data.payCardList;

            if (param.type == 'reqOk') {
                // @deprecated start
                let tempCardPay = 0;
                _.each(this.payMainInfo.payCardList, (card, index) => {
                    tempCardPay += this.toInt(card.apprAmt);
                });
                this.cardPay = tempCardPay;
                // @deprecated end

                // 재결제 저장
                this.saveRePayment();
                this.webrtcDatachannel.sendMessage({ type: 'endOk' });

                // 재결제 리스트 초기화
                this.rePaymentCardList = [];
                this.rePaymentCardCnt = this.rePaymentCardList.length;
                this.$refs.rePaymentCardGrid.setRows(this.rePaymentCardList);

                // 재결제가 완료되었습니다.
                utils.messageBox('alert', this.$t('MSG_ALT_REPAY_COMPLETE'));
            } else if (param.type == 'reqCancel' && param.data.payCardList.length > 0) {
                // 제출증 출력
                this.printCancel(this.payMainInfo.payCardList);
                this.webrtcDatachannel.sendMessage({ type: 'endCancel' });

                // 재결제 처리 중 취소하였습니다. 입금실에 카드승인취소 요청하시기 바랍니다.
                utils.messageBox('alert', this.$t('MSG_ALT_REPAY_CANCEL'));
            }
        },
        /**
         * 카드결제창과 Webrtc 연결되면 호출
         */
        initCardPopup() {
            this.payMainInfo = {
                payerMemshpUid: this.selectedRePaymentCard.payerMemshpUid,      // 결제자 멤버십UID
                payerMemberName: this.selectedRePaymentCard.payerMemberName,    // 결제자 이름
                payerMemberKind: this.selectedRePaymentCard.payerMemberKind,    // 결제자 구분
                condTypeCd: null,
                cardCompCd: null,
                dcTypeCd: null,
                joinKind: null,
                logSeq: this.logSeq,                                            // 카드 로그 SEQ
                totSaleAmt: this.totSaleAmt,                                    // 판매금액
                totPay: this.totPay,                                            // 토탈금액
                notPay: this.notPay,                                            // 미결제금액
                cardPay: 0,                                                     // 카드금액
                itemNms: this.itemNms,                                          // 재결제 팝업에 전달하기 위한 "OOO 외 O 건"
                receiptNo: this.selectedRePaymentCard.receiptNo,                // 영수증번호
                posNm: this.posNm,                                              // 포스명
                payMemberList: this.payMemberList,                              // 영수증번호에 연결된 정기권번호
                saleAmt: null,
                netAmt: null,
                taxAmt: null,
                cashPay: null,
                cashTicketPay: null,
                cashTicketAmt: null,
                creditPay: null,
                giftcardPay: null,
                payGiftList: null,
                mobilegiftPay: null,
                payMobilegiftList: null,
                pointPay: null,
                preIssueTicketPay: null,
                petCardPay: null,
                payPetCardList: null,
                payCardList: null,
            };

            this.webrtcDatachannel.sendMessage({
                type: 'init',
                data: {
                    payMainInfo: this.payMainInfo,
                    payCardList: this.payMainInfo.payCardList,
                },
            });
        },
        closeCardPopup() {
            this.cardPopupUtils.cardWindow = null;
        },
        onRePaymentCardCellClick(grid, data) {
            if (data && data.cellType == 'gridEmpty') return;
            if (data) {
                this.selectedRePaymentCard = this.rePaymentCardList[data.dataRow];
                const receiptNo = this.selectedRePaymentCard.receiptNo;

                http.request(this.$options.name, 'DTS_JNA_00002', {
                    query: {
                        receiptNo: receiptNo,
                    },
                }).then((res) => {
                    if (res.data.length > 0) {
                        this.payMemberList = res.data;

                        _.each(this.payMemberList, (row) => {
                            row.name = utils.changeMaskingCenter(row.name);
                        });

                        this.ticketCnt = this.payMemberList.length;
                        this.$refs.ticketGrid.setRows(this.payMemberList);

                        // 재결제 팝업에 전달하기 위한 "OOO 외 O 건"
                        this.itemNms = this.payMemberList[0].itemNm;
                        if (this.payMemberList.length > 1) {
                            this.itemNms += ' ' + this.$t('MSG_TXT_EXCEPT') + ' ' + (this.payMemberList.length - 1);
                        }

                        // 결제금액 계산
                        const eqReceiptCardList = _.filter(
                            this.rePaymentCardList,
                            (row) => row.receiptNo === this.selectedRePaymentCard.receiptNo
                        );
                        let payAmt = 0;
                        _.each(eqReceiptCardList, (row) => (payAmt += Number(row.apprAmt)));

                        this.totSaleAmt = payAmt;
                        this.totPay = payAmt;
                        this.notPay = payAmt;
                    } else {
                        this.payMemberList = [];
                        this.ticketCnt = this.payMemberList.length;
                        this.$refs.ticketGrid.setRows(this.payMemberList);
                    }
                });
            }
        },
        /**
         * 숫자 변환
         * @param { Number or String or null } num
         */
        toInt(num) {
            if (utils.length(num) == 0) return 0;
            else return parseInt(num);
        },
        saveRePayment() {
            const params = {
                rePayment: this.selectedRePaymentCard,
                rePaymentCardList: this.payMainInfo.payCardList,
            };

            // const params = {"rePayment":{"paymntDate":"2023-07-10","posId":"C100V380101","posNm":"_연간회원 매출-01","receiptNo":"20230710C100V38010100006","compCode":"0004","compCodeNm":"삼성카드","cardNo":"5188*********587","apprNo":"99181019","divideGigan":"0","apprAmt":"50000","payerMemshpUid":"1000000200","payerMemberName":"이준수","subCnt":0,"rePaymentYn":"N","apprAmtStr":"50,000"},"rePaymentCardList":[{"viewCardNo":"51883198****463*","cardNoKind":"F101","inputKind":"F001","statusKind":"F201","cardNo":"51883198****463*","apprNo":"99165043","apprDate":"20230721","apprTime":"165043","vanKind":"3","tranUniqueNbr":"211633134363","cardTypeCd":"Y","giftRemainAmt":"0","compCode":"0004","compCodeNm":"삼성카드","cardKind":"0401","joinNo":"53000426","evmYn":"N","evm":"","expireYm":"9803","divideGigan":"0","apprAmt":"220000","eSignYn":"Y","eSign":"$1D4750303730303038312032333037323131363530343232333037323131363530343231303720202020200000000000003740C20500000278444BFCCC0B6CC819F08F15D2D65F0F285D0F5B67082E00000080C0606030303018180C0C0C0C0C0C0C0C0C0C0C0C0C1818181818303030E0E0C080000000000000000080808080808080808080808080000000000000000080C06030180C0603030100000000000000C0FF3F0000000000C0E030180C0C06060603010101010101010101010101010303060C0C78F8E000000000000000000FFFF8800000000000031FFEF080000006070D183060C08080808080000000008080C060301C0F0300000000000000000000070F3E3C30000000000000000000000000000007071C1C183030606060C0C0C0C0C08080808181C1C1C1C3C3636336361E0E0E06060707070606060000000000000001010101010000000000"}]}
            console.debug('params: ' + JSON.stringify(params));

            http.request(this.$options.name, 'DTS_JNA_00003', {
                data: params,
            }).then((res) => {
                if (res.status == 200) {
                    const result = res.data;
                    console.debug('result: ' + JSON.stringify(result));

                    const payMainInfo = {};
                    payMainInfo.receiptInfo = result.receiptInfo;                           // 영수증정보
                    payMainInfo.receiptInfo.payCardList = result.payCardList;               // 신규 결제 카드 리스트
                    payMainInfo.receiptInfo.payGiftList = [];                               // 기프트카드 리스트
                    payMainInfo.receiptInfo.payMobilegiftList = [];                         // 모바일기프트카드 리스트
                    payMainInfo.receiptInfo.payPetCardList = [];                            // Pet 카드(?) 리스트
                    payMainInfo.saleAmt = result.receiptInfo.saleAmt;                       // 판매금액
                    payMainInfo.netAmt = result.receiptInfo.netAmt;                         // 판매금액 - 부가세 = 부가세별도 금액 
                    payMainInfo.taxAmt = result.receiptInfo.taxAmt;                         // 부가세
                    payMainInfo.cashPay = result.receiptInfo.cashPay;                       // 현금
                    payMainInfo.cashTicketPay = result.receiptInfo.cashTicketPay;           // 상품권 cashTicketAmt와 동일. 영수증발행 메소드에서 각기 다른 이름으로 사용.
                    payMainInfo.cashTicketAmt = result.receiptInfo.cashTicketAmt;           // 상품권 cashTicketPay와 동일. 영수증발행 메소드에서 각기 다른 이름으로 사용.
                    payMainInfo.cardPay = result.receiptInfo.cardPay;                       // 카드
                    payMainInfo.creditPay = result.receiptInfo.creditPay;                   // 외상
                    payMainInfo.giftcardPay = result.receiptInfo.giftcardPay;               // 기프트카드
                    payMainInfo.mobilegiftPay = result.receiptInfo.mobilegiftPay;           // 모바일기프트
                    payMainInfo.pointPay = result.receiptInfo.pointPay;                     // 포인트
                    payMainInfo.preIssueTicketPay = result.receiptInfo.preIssueTicketPay;   // 선발행티켓
                    payMainInfo.petCardPay = result.receiptInfo.petCardPay;                 // Pet 카드(?) 리스트
                    payMainInfo.payCardList = result.payCardList;                           // 신규 결제 카드 리스트
                    payMainInfo.payCancelCardList = result.payCancelCardList;               // 취소 카드 리스트
                    payMainInfo.receiptNo = params.rePayment.receiptNo;                     // 영수증번호
                    payMainInfo.posNm = params.rePayment.posNm;                             // POS명
                    payMainInfo.payerMemberName = params.rePayment.payerMemberName;         // 결제자명
                    payMainInfo.returnList = result.returnList;                             // 취소 카드 리스트

                    console.debug('payMainInfo: ' + JSON.stringify(payMainInfo));

                    _.each(params.rePaymentCardList, (row) => {
                        if (row.statusKind === 'F201') row.statusKindNm = this.$t('MSG_TXT_NORMAL_PROCESS'); // 정상처리
                        else if (row.statusKind === 'F202')
                            row.statusKindNm = this.$t('MSG_TXT_REVOCATION_APPROVAL'); // 승인취소
                        else if (row.statusKind === 'F203') row.statusKindNm = this.$t('MSG_TXT_CANCEL_CLAIM'); // 청구취소

                        row.apprAmt = _.isNull(row.apprAmt) ? row.apprAmt : utils.numberWithCommas(row.apprAmt);
                    });

                    // 변경카드내역 Grid 세팅
                    this.approveCardList = params.rePaymentCardList;
                    this.approveCardCnt = this.approveCardList.length;
                    this.$refs.approveCardGrid.setRows(this.approveCardList);

                    // 영수증 발급
                    this.printBill(payMainInfo);
                }
            });

        },
        async printCancel(cardList) {
            const posPrint = new PosPrint();
            let bxlPosUtils = new BxlPosUtils();
            let systemTime = await http.getSystemTime();

            await posPirnt.printCancelCard(bxlPosUtils, systemTime, cardList);
        },
        async printBill(payMainInfo) {
            let systemTime = await http.getSystemTime();
            const posPrint = new PosPrint();
            let bxlPosUtils = new BxlPosUtils();

            // 2014.06.12 영수증의 대표자는 목록의 첫번째 사용자 정보를 이용한다.
            // (가족의 대표자가 방문하지 않을 수도 있음.)

            // 1. 신용카드 승인 영수증 출력 - 카드전표(재결제) , 고객용
            // 1.1. 수기서명 영수증 출력
            // 2023.08.09 재결제카드 영수증(고객용) , 기결제카드 취소영수증(고객용) 두개 출력으로 결정
            // await posPrint.printCardReceipt(bxlPosUtils, 2, payMainInfo, systemTime);

            // 1.2. 재결제 영수증 발행
            await posPrint.printRePaymentReceipt(bxlPosUtils, payMainInfo, systemTime);

            // 2. 신용카드 청구 취소 영수증 출력 - 카드취소영수증(재결제) , 고객용, 보관용
            // dsList의 내용으로 청구 취소 영수증 발행

            // 카드전표 보관증 출력
            // 2023.08.09 재결제카드 영수증(고객용) , 기결제카드 취소영수증(고객용) 두개 출력으로 결정
            // await posPrint.printRefundCardReceipt(bxlPosUtils, 2, payMainInfo.receiptNo, payMainInfo.payCancelCardList, payMainInfo.payerMemberName, payMainInfo.posNm, systemTime);

            // 영수증(고객용)
            await posPrint.printReturnReceipt(bxlPosUtils, '2', 'N', '0', payMainInfo.receiptNo, payMainInfo, payMainInfo.posNm, systemTime);

            // 영수증(보관용)
            // 2023.08.09 재결제카드 영수증(고객용) , 기결제카드 취소영수증(고객용) 두개 출력으로 결정
            // await posPrint.printReturnReceipt(bxlPosUtils, "2", "Y", "0", payMainInfo.receiptNo, null, payMainInfo.payCancelCardList, 'N', payMainInfo.posNm, payMainInfo.receiptInfo, systemTime);

            await posPrint.sendPrint(bxlPosUtils);
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
