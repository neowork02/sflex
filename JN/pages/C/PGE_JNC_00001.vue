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
                    style="width: 100%; height: auto"
                >
                    <div>
                        <div class="radioForm">
                            <ur-radio v-model="srchFg" value="name" sm @click="onClickSrchFg('name')">
                                {{ $t('MSG_TXT_EMPL_NM') }}
                            </ur-radio>
                            <ur-radio
                                v-model="srchFg"
                                value="mobile"
                                sm
                                @click="onClickSrchFg('mobile')"
                                v-show="false"
                            >
                                {{ $t('MSG_TXT_CELL_PHONE') }}
                            </ur-radio>
                            <ur-radio v-model="srchFg" value="ticket" sm @click="onClickSrchFg('ticket')">
                                {{ $t('MSG_TXT_TICKET_NO') }}
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
                <h4>{{ $t('MSG_TXT_PASS_SUB_LIST') }}</h4>
                <!-- 정기권가입자 리스트 -->
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">
                            Total<span>{{ numberWithCommas(entrConfirmIssueCnt) }}</span
                            >{{ $t('MSG_TXT_CNT') }}
                        </div>
                        <!-- 건 -->
                    </div>
                </div>
                <!--E::: 타이틀 오른쪽 total info -->
            </div>
            <real-grid
                ref="entrConfirmIssueGrid"
                grid-id="entrConfirmIssueGrid"
                grid-root="/lib"
                :gridFields="entrConfirmIssueFields"
                :gridColumns="entrConfirmIssueColumns"
                :gridDbCellClick="entrConfirmIssueDbClick"
                :style="{ height: '250px' }"
            />
            <!-- E::컨텐츠1-->

            <!-- S::컨텐츠2:발급 대상자 -->
            <div class="comm_title_wrap mt40">
                <h4>{{ $t('MSG_TXT_ISSUE_PERSON') }}</h4>
                <!-- 발급 대상자 -->
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">
                            Total<span>{{ numberWithCommas(entrConfirmIssueDetailCnt) }}</span
                            >{{ $t('MSG_TXT_CNT') }}
                        </div>
                        <!-- 건 -->
                    </div>
                </div>
                <!--E::: 타이틀 오른쪽 total info -->
            </div>
            <div class="comm_shut_wrap mt10">
                <div class="inbox2">
                    <div ref="viewerArea" class="img_box" style="width: 360px; height: 280px">
                        <img style="width: 340px; height: 260px" :src="imgUrl" v-show="isShowImg" />
                    </div>
                </div>
                <div class="emptybox" />
                <div class="inbox8">
                    <real-grid
                        ref="entrConfirmIssueDetailGrid"
                        grid-id="entrConfirmIssueDetailGrid"
                        grid-root="/lib"
                        :gridFields="entrConfirmIssueDetailFields"
                        :gridColumns="entrConfirmIssueDetailColumns"
                        :gridCellClick="entrConfirmIssueDetailCellClick"
                        :style="{ height: '228px' }"
                    />
                    <ur-form-box toggleable class="mt10">
                        <ur-form-item
                            class="flex_wrap"
                            :label="$t('MSG_TXT_REASON_ISSUE')"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field
                                v-model="remarkDesc"
                                maxlength="100"
                                @keyup="specialChar"
                                style="width: 80%; height: auto"
                            />
                            <ur-button color="violet" @click="onClicEntrConfirmIssue">
                                {{ $t('MSG_TXT_ISSUE_ADMIN_CONF') }}
                            </ur-button>
                            <!-- 입장확인증 발급 -->
                            <!-- <ur-button color="violet" @click="onClicEntrConfirmIssueTest">
                입장확인증 발급 테스트
              </ur-button> -->
                        </ur-form-item>
                    </ur-form-box>
                </div>
            </div>
            <!-- E::컨텐츠2:발급 대상자 -->

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
    name: 'PGE_JNC_00001',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            srchFg: 'name',
            srchVal: null,

            memshpInfo: null,

            isShowImg: false,
            imgUrl: null,

            entrConfirmMemship: null,
            remarkDesc: null,

            // 재결제대상 1
            entrConfirmIssueFields: [
                { fieldName: 'name', dataType: 'text' },
                { fieldName: 'birthDate', dataType: 'text' },
                { fieldName: 'itemNm', dataType: 'text' },
                { fieldName: 'ticketStatusValueNm', dataType: 'text' },
                { fieldName: 'fstJoinDate', dataType: 'text' },
                { fieldName: 'expireDate', dataType: 'text' },
                { fieldName: 'issueDate', dataType: 'text' },
                { fieldName: 'ageTypeNm', dataType: 'text' },
                { fieldName: 'parkKind', dataType: 'text' },
                { fieldName: 'ticketNo', dataType: 'text' },
            ],
            entrConfirmIssueColumns: [
                {
                    name: 'name',
                    fieldName: 'name',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_EMPL_NM') }, // 성명
                    edit: false,
                },
                {
                    name: 'birthDate',
                    fieldName: 'birthDate',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_BTH_DATE') }, // 생년월일
                    edit: false,
                },
                {
                    name: 'itemNm',
                    fieldName: 'itemNm',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_TICKET_ITEM_NM') }, // 권종명
                    edit: false,
                },
                {
                    name: 'ticketStatusValueNm',
                    fieldName: 'ticketStatusValueNm',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_TICKET_STATUS') }, // 정기권상태
                    edit: false,
                },
                {
                    name: 'fstJoinDate',
                    fieldName: 'fstJoinDate',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_JOIN_DATE') }, // 가입일자
                    edit: false,
                },
                {
                    name: 'expireDate',
                    fieldName: 'expireDate',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_EXPIRE_DATE') }, // 만기일자
                    edit: false,
                },
                {
                    name: 'issueDate',
                    fieldName: 'issueDate',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_ISSUE_DATE') }, // 발급일자
                    edit: false,
                },
                {
                    name: 'ageTypeNm',
                    fieldName: 'ageTypeNm',
                    visible: false,
                },
                {
                    name: 'parkKind',
                    fieldName: 'parkKind',
                    visible: false,
                },
                {
                    name: 'ticketNo',
                    fieldName: 'ticketNo',
                    visible: false,
                },
            ],
            entrConfirmIssueList: [],
            entrConfirmIssueCnt: 0,

            entrConfirmIssueDetailFields: [
                { fieldName: 'name', dataType: 'text' },
                { fieldName: 'ageTypeNm', dataType: 'text' },
                { fieldName: 'fstJoinDate', dataType: 'text' },
                { fieldName: 'issueDate', dataType: 'text' },
                { fieldName: 'expireDate', dataType: 'text' },
                { fieldName: 'itemNm', dataType: 'text' },
                { fieldName: 'issueCnt', dataType: 'text' },
                { fieldName: 'parkKind', dataType: 'text' },
                { fieldName: 'ticketNo', dataType: 'text' },
            ],
            entrConfirmIssueDetailColumns: [
                {
                    name: 'name',
                    fieldName: 'name',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_EMPL_NM') }, // 성명
                    edit: false,
                },
                {
                    name: 'ageTypeNm',
                    fieldName: 'ageTypeNm',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_AGE_TYP_CD') }, // 인원유형
                    edit: false,
                },
                {
                    name: 'fstJoinDate',
                    fieldName: 'fstJoinDate',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_JOIN_DAY') }, // 가입일
                    edit: false,
                },
                {
                    name: 'issueDate',
                    fieldName: 'issueDate',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_DATE_ISSUE') }, // 발급일
                    edit: false,
                },
                {
                    name: 'expireDate',
                    fieldName: 'expireDate',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_DATE_EXPIRE') }, // 만기일
                    edit: false,
                },
                {
                    name: 'itemNm',
                    fieldName: 'itemNm',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_TICKET_NM') }, // 티켓명
                    edit: false,
                },
                {
                    name: 'issueCnt',
                    fieldName: 'issueCnt',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_CUMUL_ISSUE_QUAN') }, // 누적발급수량
                    styleName: 'popup_render',
                    edit: false,
                },
                {
                    name: 'parkKind',
                    fieldName: 'parkKind',
                    visible: false,
                },
                {
                    name: 'ticketNo',
                    fieldName: 'ticketNo',
                    visible: false,
                },
            ],
            entrConfirmIssueDetailList: [],
            entrConfirmIssueDetailCnt: 0,
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
            return '##########';
        },
    },
    watch: {},
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
            console.info(data);

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
        init() {
            this.srchFg = 'name';
            this.srchVal = null;

            this.memshpInfo = null;

            this.entrConfirmMemship = null;
            this.remarkDesc = null;

            this.entrConfirmIssueList = [];
            this.entrConfirmIssueCnt = this.entrConfirmIssueList.length;
            this.$refs.entrConfirmIssueGrid.setRows(this.entrConfirmIssueList);

            this.entrConfirmIssueDetailList = [];
            this.entrConfirmIssueDetailCnt = this.entrConfirmIssueDetailList.length;
            this.$refs.entrConfirmIssueDetailGrid.setRows(this.entrConfirmIssueDetailList);

            this.isShowImg = false;
            this.imgUrl = null;
        },
        search() {
            if (_.isNull(this.memshpInfo)) {
                // 가입정보를 선택하여 주십시오.
                utils.messageBox('alert', this.$t('MSG_ALT_SEL_SUBSCRIPT_INFO'));
                return;
            }
            let params = {
                memshpUid: this.memshpInfo.memshpUid,
            };

            http.request(this.$options.name, 'DTS_JNC_00001', {
                query: params,
            })
                .then((res) => {
                    let resData = res.data;
                    if (resData.length > 0) {
                        let promiseArr = [];

                        _.each(resData, (row) => {
                            promiseArr.push(this.getMemshpName(row));
                        });

                        Promise.all(promiseArr).then((result) => {
                            this.entrConfirmIssueList = result;
                            this.entrConfirmIssueCnt = this.entrConfirmIssueList.length;
                            this.$refs.entrConfirmIssueGrid.setRows(this.entrConfirmIssueList);
                        });
                    } else {
                        this.entrConfirmIssueList = resData;
                        this.entrConfirmIssueCnt = this.entrConfirmIssueList.length;
                        this.$refs.entrConfirmIssueGrid.setRows(this.entrConfirmIssueList);
                    }
                })
                .catch((error) => console.log(error));
        },
        entrConfirmIssueDbClick(data) {
            const rowData = this.entrConfirmIssueList[data.dataRow];

            if (rowData) {
                let isVal = _.isEmpty(_.find(this.entrConfirmIssueDetailList, rowData));
                if (isVal) {
                    this.entrConfirmIssueDetailList.push(rowData);
                    this.entrConfirmIssueDetailCnt = this.entrConfirmIssueDetailList.length;
                    this.$refs.entrConfirmIssueDetailGrid.setRows(this.entrConfirmIssueDetailList);
                }
            }
        },
        entrConfirmIssueDetailCellClick(grid, data) {
            this.entrConfirmMemship = this.entrConfirmIssueDetailList[data.dataRow];

            if (this.entrConfirmMemship) {
                // 발급 대상자 이미지 조회
                http.request(this.$options.name, 'DTS_CTM_00028', {
                    query: {
                        memshpUid: this.entrConfirmMemship.memshpUid,
                    },
                }).then((res) => {
                    if (res.data.photo) {
                        this.isShowImg = true;
                        this.imgUrl = res.data.photo;
                    } else {
                        this.isShowImg = false;
                        this.imgUrl = null;
                    }
                });

                // 누적발급수량 선택시 누적사유 조회 팝업 호출
                if (data.fieldName === 'issueCnt') {
                    utils.openLayerPopup('PGE_JNP_00001', () => {}, {
                        pageInitialData: this.entrConfirmMemship,
                        size: 'lg',
                    });
                }
            }
        },
        onClicEntrConfirmIssue() {
            if (_.isEmpty(this.entrConfirmMemship)) {
                // 발급 대상자를 선택해주세요.
                utils.messageBox('alert', this.$t('MSG_ALT_SEL_ISSUE'));
                return;
            }

            http.request(this.$options.name, 'DTS_JNC_00002', {
                data: {
                    parkKind: this.entrConfirmMemship.parkKind,
                    ticketNo: this.entrConfirmMemship.ticketNo,
                    memshpUid: this.entrConfirmMemship.memshpUid,
                    remarkDesc: this.remarkDesc,
                },
            }).then((res) => {
                _.each(this.entrConfirmIssueDetailList, (row) => {
                    if (row.ticketNo === this.entrConfirmMemship.ticketNo) {
                        row.issueCnt += 1;
                    }
                });

                this.$refs.entrConfirmIssueDetailGrid.setRows(this.entrConfirmIssueDetailList);

                let bxlPosUtils = new BxlPosUtils();
                this.printEntrConfirmIssue(bxlPosUtils);

                var strSubmit = bxlPosUtils.getPosData();
                console.log(strSubmit);
                BxlCommonUtils.requestPrint('Printer1', strSubmit, (result) => {});
                // 입장확인증이 발급되었습니다.
                utils.messageBox('alert', this.$t('MSG_ALT_ADMIN_CERTIFICATE_ISSUE'));

                if (res.data.isIssueCd === 'K902') {
                    // 입장확인증 하루 출력 건수를 초과하였습니다.
                    utils.messageBox('alert', this.$t('MSG_ALT_EXCEED_NUM_PRINT'));
                }
            });
        },
        async printEntrConfirmIssue(bxlPosUtils) {
            let systemTime = await http.getSystemTime();
            const LF = '\n';
            const posPrint = new PosPrint();

            posPrint.printStamp(bxlPosUtils);
            posPrint.printLineFeed(bxlPosUtils, 1);
            bxlPosUtils.printText(this.$t('MSG_TXT_ADMIN_CONFIRM'), 0, 1, false, false, false, 0, 1);
            posPrint.printLineFeed(bxlPosUtils, 2);

            let today = utils.now();
            let prtData =
                `${today.substr(0, 4)}` +
                this.$t('MSG_TXT_DAY_OF_YEAR') +
                `${today.substr(4, 2)}` +
                this.$t('MSG_TXT_MON') +
                `${today.substr(6, 2)}` +
                this.$t('MSG_TXT_SUN') +
                LF;
            bxlPosUtils.printText(prtData, 0, 1, false, false, false, 0, 1);

            posPrint.printLineFeed(bxlPosUtils, 1);

            const userInfo = this.$store.getters.userInfo;
            const posId = userInfo.posId;
            const posNm = userInfo.posNm;

            const sReceiptNo = `${today}-${posId}`;
            let sPrnString =
                sReceiptNo + utils.space(42 - utils.lengthb(sReceiptNo) - utils.lengthb(posNm)) + posNm + LF;
            bxlPosUtils.printText(sPrnString, 0, 0, false, false, false, 0, 0);

            posPrint.printLine(bxlPosUtils);

            sPrnString =
                this.$t('MSG_TXT_MEMBER_NUM') +
                ' : ' +
                this.entrConfirmMemship.ticketNo +
                utils.space(
                    42 -
                        utils.lengthb(this.$t('MSG_TXT_MEMBER_NUM') + ' : ') -
                        utils.lengthb(this.entrConfirmMemship.ticketNo)
                ) +
                LF;
            sPrnString +=
                this.$t('MSG_TXT_TICKET_NAME') +
                ' : ' +
                this.entrConfirmMemship.name +
                utils.space(
                    42 -
                        utils.lengthb(this.$t('MSG_TXT_TICKET_NAME') + ' : ') -
                        utils.lengthb(this.entrConfirmMemship.name)
                ) +
                LF;
            sPrnString +=
                this.$t('MSG_TXT_CHAR2_DESC') +
                ' : ' +
                this.entrConfirmMemship.memberKindNm +
                utils.space(
                    42 -
                        utils.lengthb(this.$t('MSG_TXT_CHAR2_DESC') + ' : ') -
                        utils.lengthb(this.entrConfirmMemship.memberKindNm)
                ) +
                LF;
            bxlPosUtils.printText(sPrnString, 0, 0, false, false, false, 0, 0);

            posPrint.printLine(bxlPosUtils);
            posPrint.printLine(bxlPosUtils);
            posPrint.printNoticeWord(bxlPosUtils, 20, systemTime);

            posPrint.printLine(bxlPosUtils);
            posPrint.printNoticeWord(bxlPosUtils, 9, systemTime);

            posPrint.printLine(bxlPosUtils);
            posPrint.printLineFeed(bxlPosUtils, 1);
            
            let ticketNo = this.entrConfirmMemship.ticketNo;
            bxlPosUtils.printQRCode(ticketNo, 0, 1, 4, 0);
            posPrint.printLineFeed(bxlPosUtils, 2);

            posPrint.printNoticeWord(bxlPosUtils, 21, systemTime);

            posPrint.printLineFeed(bxlPosUtils, 2);

            bxlPosUtils.cutPaper(1);

            //프린터 요청
            posPrint.sendPrint(bxlPosUtils);

            this.remarkDesc = null;
            this.entrConfirmMemship = null;
        },
        getMemshpName(row) {
            return new Promise((resolve, reject) => {
                const memshpUid = row.memshpUid;
                http.request(this.$options.name, 'DTS_CTM_00010', {
                    query: {
                        memshpUid: memshpUid,
                    },
                }).then((res) => {
                    row.name = utils.changeMaskingCenter(res.data.name);
                    row.birthDate = utils.toStringByFormat(utils.toDate(res.data.birthDate), 'YYYY-MM-DD');
                    row.fstJoinDate = utils.toStringByFormat(utils.toDate(row.fstJoinDate), 'YYYY-MM-DD');
                    row.expireDate = utils.toStringByFormat(utils.toDate(row.expireDate), 'YYYY-MM-DD');
                    row.issueDate = utils.toStringByFormat(utils.toDate(row.issueDate), 'YYYY-MM-DD');
                    resolve(row);
                });
            });
        },
        // 특수문자 체크
        specialChar() {
            const searchNewText = utils.trim(this.remarkDesc);
            if (utils.isExistSpecialChar(searchNewText)) {
                // `-_{}[];:<>/? 제외 특수문자는 입력할 수 없습니다.
                utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
                    this.remarkDesc = '';
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
