<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 콘텐츠1 -->
            <div class="comm_title_wrap">
                <h4>{{ $t('MSG_TXT_NON_DREAM_POINT') }}</h4>
            </div>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SEARCH_JOIN_INFO')"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="srchFg" value="name" sm @click="onClickSrchFg('name')">
                            {{ $t('MSG_TXT_EMPL_NM') }}
                        </ur-radio>
                        <ur-radio v-model="srchFg" value="mobile" sm @click="onClickSrchFg('mobile')" v-show="false">
                            {{ $t('MSG_TXT_CELL_PHONE') }}
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

            <div class="comm_title_wrap mt25">
                <h4>{{ $t('MSG_TXT_COM_PASS_INFO') }}</h4>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">
                            Total<span>{{ notConvtDpMemberCnt }}</span
                            >{{ $t('MSG_TXT_CNT') }}
                        </div>
                        <!-- info: Total *건 -->
                    </div>
                </div>
                <!--E:: 타이틀 오른쪽 total info -->
            </div>

            <real-grid
                ref="notConvtDpMemberGrid"
                grid-id="notConvtDpMemberGrid"
                grid-root="/lib"
                :gridFields="notConvtDpMemberFields"
                :gridColumns="notConvtDpMemberColumns"
                :style="{ height: '250px' }"
            />

            <!-- ::E 콘텐츠1 -->

            <!-- ::S 콘텐츠2 -->
            <div class="comm_title_wrap mt40">
                <!-- 멤버십포인트 전환 대상자 -->
                <h4>{{ $t('MSG_TXT_MEMBER_CONVER_TARGET') }}</h4>
            </div>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SEARCH_JOIN_INFO')"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="srchFg2" value="name" sm @click="onClickSrchFg2('name')">
                            {{ $t('MSG_TXT_EMPL_NM') }}
                        </ur-radio>
                        <ur-radio v-model="srchFg2" value="mobileTel" sm @click="onClickSrchFg2('mobileTel')" v-show="false">
                            {{ $t('MSG_TXT_CELL_PHONE') }}
                        </ur-radio>
                        <ur-radio v-model="srchFg2" value="mobile" sm @click="onClickSrchFg2('mobile')" v-show="false">
                            {{ $t('MSG_TXT_CELL_PHONE') }}
                        </ur-radio>
                        <ur-radio v-model="srchFg2" value="ticket" sm @click="onClickSrchFg2('ticket')">
                            {{ $t('MSG_TXT_SEASON_NO') }}
                        </ur-radio>
                        <ur-radio v-model="srchFg2" value="qr" sm @click="onClickSrchFg2('qr')">
                            {{ $t('MSG_TXT_MEMBER_QR') }}
                        </ur-radio>
                    </div>
                    <ur-text-field
                        class="pl16"
                        v-model="srchVal2"
                        :disabled="disabled2"
                        @enter="popupSearch2"
                        :mask="inputMask"
                    />
                    <ur-icon-button icon="search" style="padding-top: 0px" @click="popupSearch2" />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button @click="init2">{{ $t('MSG_BTN_RESET') }}</ur-button>
                    <!-- 초기화 -->
                    <ur-button v-permission:read="this.$options.name" @click="search2">{{ $t('MSG_TXT_SRCH') }}</ur-button>
                    <!-- 조회 -->
                    <ur-button v-permission:create="this.$options.name" color="violet" @click="transferPoint">
                        {{ $t('MSG_TXT_MEMBER_CONVER') }}
                    </ur-button>
                    <!-- 멤버십포인트 전환 -->
                </div>
            </div>
            <!-- ::E 콘텐츠2 -->
            <!-- ::S 콘텐츠3 -->
            <div class="comm_title_wrap mt25">
                <!-- 회원 정보 -->
                <h4>{{ $t('MSG_TXT_MEMBER_PROFILE') }}</h4>
            </div>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_MEMBER_ID')"
                    :labelAlign="'right'"
                    style="width: 33.3%; height: auto"
                >
                    <ur-text-field :value="memshpInfo2MemshpUid" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_EMPL_NM')"
                    :labelAlign="'right'"
                    style="width: 33.3%; height: auto"
                >
                    <ur-text-field :value="memshpInfo2Name" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_BTH_DATE')"
                    :labelAlign="'right'"
                    style="width: 33.3%; height: auto"
                >
                    <ur-text-field :value="memshpInfo2BirthDate" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap borTop"
                    :label="$t('MSG_TXT_CELL_PHONE')"
                    :labelAlign="'right'"
                    style="width: 33.3%; height: auto"
                >
                    <ur-text-field :value="memshpInfo2MobileTel" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_ADDR')"
                    :labelAlign="'right'"
                    style="width: 33.3%; height: auto"
                >
                    <ur-text-field :value="memshpInfo2Addr" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_CLASS_MEMBER')"
                    :labelAlign="'right'"
                    style="width: 33.3%; height: auto"
                >
                    <ur-text-field :value="memshpInfo2MemberKindNm" style="width: 100%; height: auto" readonly />
                </ur-form-item>
            </ur-form-box>
            <!-- ::E 콘텐츠3 -->
            <!-- ::S 콘텐츠4 -->
            <div class="comm_title_wrap mt40">
                <!-- 멤버십 포인트 정보 -->
                <h4>{{ $t('MSG_TXT_MEMBER_POINT_INFO') }}</h4>
            </div>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_REMAIN_POINT')"
                    :labelAlign="'right'"
                    style="width: 33.3%; height: auto"
                >
                    <ur-text-field :value="remainPointAmt" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_EXPECT_POINT')"
                    :labelAlign="'right'"
                    style="width: 33.3%; height: auto"
                >
                    <ur-text-field :value="saveSchedlPointAmt" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_AVAILY_POINT')"
                    :labelAlign="'right'"
                    style="width: 33.3%; height: auto"
                >
                    <ur-text-field :value="naPointAmt" style="width: 100%; height: auto" readonly />
                </ur-form-item>
            </ur-form-box>
            <!-- ::E 콘텐츠4 -->
            <!-- ::S 콘텐츠5 -->
            <!--             
            <div class="comm_title_wrap mt40">
                <h4>{{ $t('MSG_TXT_COM_PASS_INFO') }}</h4>
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">
                            Total<span>{{ transferMemCnt }}</span
                            >{{ $t('MSG_TXT_CNT') }}
                        </div>
                    </div>
                </div>
            </div>
            -->

            <!-- <real-grid
                ref="transferMemGrid"
                grid-id="transferMemGrid"
                grid-root="/lib"
                :gridFields="transferMemFields"
                :gridColumns="transferMemColumns"
                :style="{ height: '250px' }"
            /> -->
            <!-- ::E 콘텐츠5 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
import _ from 'lodash';

export default {
    name: 'PGE_JNM_00001', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            srchFg: 'name',
            srchVal: null,

            srchFg2: 'name',
            srchVal2: null,

            memshpInfo: null,
            memshpInfo2: null,

            transferMember: null,

            memshpInfo2MemshpUid: null,
            memshpInfo2Name: null,
            memshpInfo2BirthDate: null,
            memshpInfo2MobileTel: null,
            memshpInfo2Addr: null,
            memshpInfo2MemberKindNm: null,

            remainPointAmt: 0,
            saveSchedlPointAmt: 0,
            naPointAmt: 0,

            notConvtDpMemberFields: [
                { fieldName: 'ticketNo', dataType: 'text' },
                { fieldName: 'name', dataType: 'text' },
                { fieldName: 'birthDate', dataType: 'text' },
                { fieldName: 'mobileTel', dataType: 'text' },
                { fieldName: 'nonPoint', dataType: 'text' },
            ],
            notConvtDpMemberColumns: [
                {
                    // 정기권번호
                    name: 'ticketNo',
                    fieldName: 'ticketNo',
                    header: { text: this.$t('MSG_TXT_SEASON_NO') },
                    edit: false,
                },
                {
                    // 성명
                    name: 'name',
                    fieldName: 'name',
                    header: { text: this.$t('MSG_TXT_EMPL_NM') },
                    edit: false,
                    displayCallback: function (grid, index, value) {
                        return utils.maskName(value);
                    },
                },
                {
                    // 생년월일
                    name: 'birthDate',
                    fieldName: 'birthDate',
                    header: { text: this.$t('MSG_TXT_BTH_DATE') },
                    edit: false,
                    displayCallback: function (grid, index, value) {
                        return utils.maskBirthDate(value);
                    },
                },
                {
                    // 휴대폰
                    name: 'mobileTel',
                    fieldName: 'mobileTel',
                    header: { text: this.$t('MSG_TXT_CELL_PHONE') },
                    edit: false,
                    displayCallback: function (grid, index, value) {
                        return utils.maskTel(value);
                    },
                },
                {
                    // 미전환 드림포인트
                    name: 'nonPoint',
                    fieldName: 'nonPoint',
                    header: { text: this.$t('MSG_TXT_UNCONVERT_DREAM_POINT') },
                    edit: false,
                },
            ],
            notConvtDpMemberList: [],
            notConvtDpMemberCnt: 0,

            transferMemFields: [
                { fieldName: 'ticketNo', dataType: 'text' },
                { fieldName: 'itemNm', dataType: 'text' },
                { fieldName: 'fstJoinDate', dataType: 'text' },
                { fieldName: 'dayDivideStartDate', dataType: 'text' },
                { fieldName: 'dayDivideEndDate', dataType: 'text' },
                { fieldName: 'ticketStatusValueNm', dataType: 'text' },
            ],
            transferMemColumns: [
                {
                    // 정기권번호
                    name: 'ticketNo',
                    fieldName: 'ticketNo',
                    header: { text: this.$t('MSG_TXT_SEASON_NO') },
                    edit: false,
                },
                {
                    // 티켓명
                    name: 'itemNm',
                    fieldName: 'itemNm',
                    header: { text: this.$t('MSG_TXT_TICKET_NM') },
                    edit: false,
                },
                {
                    // 가입일
                    name: 'fstJoinDate',
                    fieldName: 'fstJoinDate',
                    header: { text: this.$t('MSG_TXT_JOIN_DAY') },
                    edit: false,
                },
                {
                    // 시작일
                    name: 'dayDivideStartDate',
                    fieldName: 'dayDivideStartDate',
                    header: { text: this.$t('MSG_TXT_START_DATE') },
                    edit: false,
                },
                {
                    // 종료일
                    name: 'dayDivideEndDate',
                    fieldName: 'dayDivideEndDate',
                    header: { text: this.$t('MSG_TXT_END_DATE') },
                    edit: false,
                },
                {
                    // 상태
                    name: 'ticketStatusValueNm',
                    fieldName: 'ticketStatusValueNm',
                    header: { text: this.$t('MSG_TXT_DTST_STT') },
                    edit: false,
                },
            ],
            transferMemList: [],
            transferMemCnt: 0,
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
        disabled2() {
            switch (this.srchFg2) {
                case 'name':
                case 'mobile':
                    return true;
                default:
                    return false;
            }
        },
        // Input Mask
        inputMask() {
            if (this.srchFg === 'ticket' || this.srchFg2 === 'ticket') {
                return '##########';
            } else if (this.srchFg2 === 'qr') {
                return 'N###############';
            }
        },
    },
    created() {},
    mounted() {},
    watch: {
        transferMember(newVal, oldVal) {
            if (_.isEmpty(newVal)) {
                this.memshpInfo2MemshpUid = null;
                this.memshpInfo2Name = null;
                this.memshpInfo2BirthDate = null;
                this.memshpInfo2MobileTel = null;
                this.memshpInfo2Addr = null;
                this.memshpInfo2MemberKindNm = null;
                this.remainPointAmt = 0;
                this.saveSchedlPointAmt = 0;
                this.naPointAmt = 0;
            } else {
                this.memshpInfo2MemshpUid = newVal.memshpUid;
                this.memshpInfo2Name = utils.maskName(newVal.name);
                this.memshpInfo2BirthDate = utils.maskBirthDate(newVal.birthDate);
                this.memshpInfo2MobileTel = utils.maskTel(newVal.mobileTel);
                this.memshpInfo2Addr = newVal.addr;
                this.memshpInfo2MemberKindNm = newVal.memberKindNm;
                this.remainPointAmt = utils.numberWithCommas(newVal.remainPointAmt);
                this.saveSchedlPointAmt = utils.numberWithCommas(newVal.saveSchedlPointAmt);
                this.naPointAmt = utils.numberWithCommas(newVal.naPointAmt);
            }
        },
    },
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
        onClickSrchFg2(srchFg2) {
            this.srchVal2 = null;

            switch (srchFg2) {
                case 'name':
                case 'mobile':
                    this.popup2();
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
        popup2() {
            let pageInitialData = {};
            if (this.srchFg2 === 'ticket') pageInitialData.ticketNo = this.srchVal2;

            utils.openLayerPopup('PGE_CTM_00016', this.onPopupCallback2, {
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
            }
        },
        popupSearch2() {
            switch (this.srchFg2) {
                case 'name':
                case 'mobile':
                case 'ticket':
                    this.popup2();
                    break;
            }
        },
        onPopupCallback(data) {
            // console.info(data);
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
        onPopupCallback2(data) {
            // console.info(data);
            if (data) {
                this.memshpInfo2 = data;

                switch (this.srchFg2) {
                    case 'name':
                        this.srchVal2 = this.memshpInfo2.name;
                        break;
                    case 'mobile':
                        this.srchVal2 = this.memshpInfo2.mobileTel;
                        break;
                }

                this.search2();
            }
        },
        init() {
            this.srchFg = 'name';
            this.srchVal = null;

            this.memshpInfo = null;
        },
        init2() {
            this.srchFg2 = 'name';
            this.srchVal2 = null;

            this.memshpInfo2 = null;
        },
        search() {
            if (_.isNull(this.memshpInfo)) {
                // 미전환 드림포인트 회원를 먼저 선택해주세요.
                utils.messageBox('alert', this.$t('MSG_ALT_SEL_DREAM_POINT_FIRST'));
                return;
            }
            console.info(this.memshpInfo);

            http.request(this.$options.name, 'DTS_JNM_00001', {
                query: {
                    memshpUid: this.memshpInfo.memshpUid,
                },
            }).then((res) => {
                let resData = res.data;
                
                if (!utils.isEmpty(resData.ticketNo)) {
                    resData.birthDate = utils.toStringByFormat(utils.toDate(resData.birthDate), 'YYYY-MM-DD');
                    resData.nonPoint = utils.numberWithCommas(resData.nonPoint);

                    this.notConvtDpMemberList = [];
                    this.notConvtDpMemberList.push(resData);
                    this.notConvtDpMemberCnt = utils.numberWithCommas(this.notConvtDpMemberList.length);
                    this.$refs.notConvtDpMemberGrid.setRows(this.notConvtDpMemberList);
                } else {
                    // 미전환 드림포인트가 없습니다.
                    utils.messageBox('alert', this.$t('MSG_ALT_MEMBERSHIP_POINT_EMPTY'));
                }
            });
        },
        search2() {
            if (_.isNull(this.memshpInfo2)) {
                // 멤버십포인트 전환 대상자를 먼저 선택해주세요.
                utils.messageBox('alert', this.$t('MSG_ALT_SEL_MEMBERSHIP_POINT_FIRST'));
                return;
            }

            http.request(this.$options.name, 'DTS_JNM_00002', {
                query: {
                    memshpUid: this.memshpInfo2.memshpUid,
                },
            }).then((res) => {
                let resData = res.data;
                // console.info(resData);

                if (resData) {
                    this.transferMember = resData;

                    let ticket = this.transferMember.ticket;

                    if (ticket) {
                        ticket.fstJoinDate = utils.toStringByFormat(utils.toDate(ticket.fstJoinDate), 'YYYY-MM-DD');
                        ticket.dayDivideStartDate = utils.toStringByFormat(
                            utils.toDate(ticket.dayDivideStartDate),
                            'YYYY-MM-DD'
                        );
                        ticket.dayDivideEndDate = utils.toStringByFormat(
                            utils.toDate(ticket.dayDivideEndDate),
                            'YYYY-MM-DD'
                        );

                        this.transferMember.ticket = ticket;
                    }

                    this.transferMemList = [];
                    this.transferMemList.push(this.transferMember.ticket);
                    this.transferMemCnt = utils.numberWithCommas(this.transferMemList.length);
                    // this.$refs.transferMemGrid.setRows(this.transferMemList);
                }
            });
        },
        transferPoint() {
            if (_.isNull(this.memshpInfo)) {
                // 미전환 드림포인트 회원를 먼저 선택해주세요.
                utils.messageBox('alert', this.$t('MSG_ALT_SEL_DREAM_POINT_FIRST'));
                return;
            }

            if (_.isNull(this.memshpInfo2)) {
                // 멤버십포인트 전환 대상자를 먼저 선택해주세요.
                utils.messageBox('alert', this.$t('MSG_ALT_SEL_MEMBERSHIP_POINT_FIRST'));
                return;
            }

            http.request(this.$options.name, 'DTS_JNM_00003', {
                data: {
                    memshpUid: this.memshpInfo.memshpUid,
                    transferMemshpUid: this.transferMember.memshpUid,
                },
            }).then((res) => {

                if (!utils.isEmpty(res.data.memshpUid)) {
                    this.init();
                    this.notConvtDpMemberCnt = 0;
                    this.notConvtDpMemberList = [];
                    this.$refs.notConvtDpMemberGrid.setRows(this.notConvtDpMemberList);

                    // this.init2();
                    // this.transferMemCnt = 0;
                    // this.transferMemList = [];
                    // this.$refs.transferMemGrid.setRows(this.transferMemList);
                    // 멤버십포인트 전환이 성공적으로 완료되었습니다.
                    utils.messageBox("success", this.$t("MSG_ALT_MEMBERSHIP_POINT_SUCCESS"), null, this.search2);
                } else {
                    // 전환할 포인트가 없습니다.
                    utils.messageBox('alert', this.$t('MSG_ALT_MEMBERSHIP_POINT_NONE'));
                }
            });
        },
        onlyNumber(e) {
            const regex = /[^0-9]/g;
            if (regex.test(e.target.value)) {
                e.target.value = e.target.value.replace(regex, '');
                return e.target.value;
            }
        },
    },
};
</script>
<style scoped>
.custom_page .ur-form-item:nth-child(2) + .ur-form-item,
.custom_page .ur-form-item:nth-child(3) + .ur-form-item {
    border-top: none;
}
</style>
