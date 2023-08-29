<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <!-- S::컨텐츠1 -->
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
                        <ur-radio v-model="srchFg" value="ticket" sm @click="onClickSrchFg('ticket')">
                            {{ $t('MSG_TXT_SEASON_NO') }}
                        </ur-radio>
                    </div>
                    <ur-text-field
                        class="pl16"
                        v-model="srchVal"
                        :disabled="disabled"
                        @enter="popup"
                        :mask="inputMask"
                    />
                    <ur-icon-button icon="search" style="padding-top: 0px" @click="popup" />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button @click="init">{{ $t('MSG_BTN_RESET') }}</ur-button>
                    <!-- 초기화 -->
                    <ur-button v-permission:read="this.$options.name" @click="search" color="violet">{{ $t('MSG_TXT_SRCH') }}</ur-button>
                    <!-- 조회 -->
                </div>
            </div>
            <!-- E::컨텐츠1 -->

            <!-- S::양도자+양수자 -->
            <div class="comm_shut_wrap mt25">
                <div class="inbox5">
                    <!-- S::양도자 회원 정보 -->
                    <div class="comm_title_wrap">
                        <h4>{{ $t('MSG_TXT_TRANS_MEM_INFO') }}</h4>
                    </div>
                    <ur-form-box toggleable>
                        <ur-form-item
                            class="flex_wrap"
                            :label="$t('MSG_TXT_MEMBER_ID')"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field :value="senderMemshpUid" style="width: 100%" readonly />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            :label="$t('MSG_TXT_EMPL_NM')"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field :value="senderName" style="width: 100%" readonly />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            :label="$t('MSG_TXT_BTH_DATE')"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field :value="senderBirthDate" style="width: 100%" readonly />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            :label="$t('MSG_TXT_CELL_PHONE')"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field :value="senderMobileTel" style="width: 100%" readonly />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            :label="$t('MSG_TXT_CLASS_MEMBER')"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field :value="senderMemberKindNm" style="width: 100%" readonly />
                        </ur-form-item>
                    </ur-form-box>
                    <!-- E::양도자 회원 정보 -->
                    <!-- S::양도자 정기권 정보 -->
                    <div class="comm_title_wrap mt40">
                        <h4 class="pr10">{{ $t('MSG_TXT_TICKET_INFO') }}</h4>
                        <!--S:: 타이틀 오른쪽 total info -->
                        <div class="right_box">
                            <div class="totalNo">
                                <div class="totalCt">
                                    Total<span>{{ numberWithCommas(senderCnt) }}</span
                                    >{{ $t('MSG_TXT_CNT') }}
                                </div>
                                <!-- info: Total *건 -->
                            </div>
                        </div>
                        <!--E:: 타이틀 오른쪽 total info -->
                    </div>

                    <real-grid
                        ref="senderGrid"
                        grid-id="senderGrid"
                        grid-root="/lib"
                        :gridFields="senderFields"
                        :gridColumns="senderColumns"
                        :onItemChecked="onItemChecked"
                        :style="{ height: '250px' }"
                        :gridCheckBar="{
                            visible: true,
                            exclusive: true,
                        }"
                    />

                    <!-- E::양도자 정기권 정보 -->
                </div>
                <div class="emptybox" />
                <div class="inbox5">
                    <!-- S::양수자 회원 정보 -->
                    <div class="comm_title_wrap">
                        <h4 class="pr10">{{ $t('MSG_TXT_TRANSFEREE_MEM_INFO') }}</h4>
                        <!-- 양수자 조회 -->
                        <ur-button v-permission:read="this.$options.name" color="violet" @click="popupReceiver">{{ $t('MSG_TXT_ASSIGN_INQ') }}</ur-button>
                    </div>
                    <ur-form-box toggleable>
                        <ur-form-item
                            class="flex_wrap"
                            :label="$t('MSG_TXT_MEMBER_ID')"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field :value="receiverMemshpUid" style="width: 100%" readonly />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            :label="$t('MSG_TXT_EMPL_NM')"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field :value="receiverName" style="width: 100%" readonly />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            :label="$t('MSG_TXT_BTH_DATE')"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field :value="receiverBirthDate" style="width: 100%" readonly />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            :label="$t('MSG_TXT_CELL_PHONE')"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field :value="receiverMobileTel" style="width: 100%" readonly />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            :label="$t('MSG_TXT_CLASS_MEMBER')"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field :value="receiverMemberKindNm" style="width: 100%" readonly />
                        </ur-form-item>
                    </ur-form-box>
                    <!-- E::양수자 회원 정보 -->
                    <!-- S::양수자 정기권 정보 -->
                    <div class="comm_title_wrap mt40">
                        <h4 class="pr10">{{ $t('MSG_TXT_TICKET_INFO') }}</h4>
                        <!--S:: 타이틀 오른쪽 total info -->
                        <div class="right_box">
                            <div class="totalNo">
                                <div class="totalCt">
                                    Total<span>{{ numberWithCommas(receiverCnt) }}</span
                                    >{{ $t('MSG_TXT_CNT') }}
                                </div>
                                <!-- info: Total *건 -->
                            </div>
                        </div>
                        <!--E:: 타이틀 오른쪽 total info -->
                    </div>

                    <real-grid
                        ref="receiverGrid"
                        grid-id="receiverGrid"
                        :gridFields="receiverFields"
                        :gridColumns="receiverColumns"
                        :style="{ height: '250px' }"
                    />

                    <div class="btn_wrap mt10">
                        <div class="right_box">
                            <!-- 양도 처리 -->
                            <ur-button color="violet" @click="transfer">{{ $t('MSG_TXT_TRANS_PROCESS') }}</ur-button>
                        </div>
                    </div>
                    <!-- E::양수자 정기권 정보 -->
                </div>
            </div>
            <!-- E::양도자+양수자 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
import _ from 'lodash';

export default {
    name: 'PGE_JNE_00001',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            srchFg: 'name',
            srchVal: null,

            sender: null, // 양도자
            senderMemshpUid: null,
            senderName: null,
            senderBirthDate: null,
            senderMobileTel: null,
            senderMemberKindNm: null,
            senderTicket: null,

            receiver: null, // 양수자
            receiverMemshpUid: null,
            receiverName: null,
            receiverBirthDate: null,
            receiverMobileTel: null,
            receiverMemberKindNm: null,

            senderFields: [
                { fieldName: 'parkKind', dataType: 'text' },
                { fieldName: 'ticketNo', dataType: 'text' },
                { fieldName: 'itemCd', dataType: 'text' },
                { fieldName: 'itemNm', dataType: 'text' },
                { fieldName: 'fstJoinDate', dataType: 'text' },
                { fieldName: 'issueDate', dataType: 'text' },
                { fieldName: 'expireDate', dataType: 'text' },
                { fieldName: 'ticketStatusValueNm', dataType: 'text' },
                { fieldName: 'transferValue', dataType: 'text' },
                { fieldName: 'transferValueNm', dataType: 'text' },
                { fieldName: 'transferCause', dataType: 'text' },
            ],
            senderColumns: [
                {
                    // 파크구분
                    name: 'parkKind',
                    fieldName: 'parkKind',
                    header: { text: this.$t('MSG_TXT_PARK_KIND') },
                    edit: false,
                },
                {
                    // 정기권번호
                    name: 'ticketNo',
                    fieldName: 'ticketNo',
                    header: { text: this.$t('MSG_TXT_SEASON_NO') },
                    edit: false,
                },
                {
                    // 권종코드
                    name: 'itemCd',
                    fieldName: 'itemCd',
                    header: { text: this.$t('MSG_TXT_ITEM_CD') },
                    edit: false,
                },
                {
                    // 권종명
                    name: 'itemNm',
                    fieldName: 'itemNm',
                    header: { text: this.$t('MSG_TXT_TICKET_ITEM_NM') },
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
                    name: 'issueDate',
                    fieldName: 'issueDate',
                    header: { text: this.$t('MSG_TXT_START_DATE') },
                    edit: false,
                },
                {
                    // 종료일
                    name: 'expireDate',
                    fieldName: 'expireDate',
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
                {
                    name: 'transferValue',
                    fieldName: 'transferValue',
                    visible: false,
                },
                {
                    // 양도가능여부
                    name: 'transferValueNm',
                    fieldName: 'transferValueNm',
                    header: { text: this.$t('MSG_TXT_TRANSFER_YN') },
                    edit: false,
                },
                {
                    name: 'transferCause',
                    fieldName: 'tranferCause',
                    visible: false,
                },
            ],
            senderList: [],
            senderCnt: 0,

            receiverFields: [
                { fieldName: 'parkKind', dataType: 'text' },
                { fieldName: 'ticketNo', dataType: 'text' },
                { fieldName: 'itemCd', dataType: 'text' },
                { fieldName: 'itemNm', dataType: 'text' },
                { fieldName: 'fstJoinDate', dataType: 'text' },
                { fieldName: 'issueDate', dataType: 'text' },
                { fieldName: 'expireDate', dataType: 'text' },
                { fieldName: 'ticketStatusValueNm', dataType: 'text' },
            ],
            receiverColumns: [
                {
                    // 파크구분
                    name: 'parkKind',
                    fieldName: 'parkKind',
                    header: { text: this.$t('MSG_TXT_PARK_KIND') },
                    edit: false,
                },
                {
                    // 정기권번호
                    name: 'ticketNo',
                    fieldName: 'ticketNo',
                    header: { text: this.$t('MSG_TXT_SEASON_NO') },
                    edit: false,
                },
                {
                    // 권종코드
                    name: 'itemCd',
                    fieldName: 'itemCd',
                    header: { text: this.$t('MSG_TXT_ITEM_CD') },
                    edit: false,
                },
                {
                    // 권종명
                    name: 'itemNm',
                    fieldName: 'itemNm',
                    header: { text: this.$t('MSG_TXT_TICKET_ITEM_NM') },
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
                    name: 'issueDate',
                    fieldName: 'issueDate',
                    header: { text: this.$t('MSG_TXT_START_DATE') },
                    edit: false,
                },
                {
                    // 종료일
                    name: 'expireDate',
                    fieldName: 'expireDate',
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
            receiverList: [],
            receiverCnt: 0,
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
        // Input Mask
        inputMask() {
            return '##########';
        },
    },
    watch: {
        sender(newVal, oldVal) {
            if (_.isEmpty(newVal)) {
                this.senderMemshpUid = null;
                this.senderName = null;
                this.senderBirthDate = null;
                this.senderMobileTel = null;
                this.senderMemberKindNm = null;
            } else {
                this.senderMemshpUid = newVal.memshpUid;
                this.senderName = utils.maskName(newVal.name);
                this.senderBirthDate = utils.maskBirthDate(newVal.birthDate);
                this.senderMobileTel = utils.maskTel(newVal.mobileTel);
                this.senderMemberKindNm = newVal.memberKindNm;
            }
        },
        receiver(newVal, oldVal) {
            if (_.isEmpty(newVal)) {
                this.receiverMemshpUid = null;
                this.receiverName = null;
                this.receiverBirthDate = null;
                this.receiverMobileTel = null;
                this.receiverMemberKindNm = null;
            } else {
                this.receiverMemshpUid = newVal.memshpUid;
                this.receiverName = utils.maskName(newVal.name);
                this.receiverBirthDate = utils.maskBirthDate(newVal.birthDate);
                this.receiverMobileTel = utils.maskTel(newVal.mobileTel);
                this.receiverMemberKindNm = newVal.memberKindNm;
            }
        },
    },
    created() {},
    mounted() {},
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
        popupReceiver() {
            console.debug(this.senderTicket);
            if (this.senderTicket) {
                if (this.senderTicket.transferValue === 'N') {
                    utils.messageBox('alert', this.senderTicket.transferCause);
                    return;
                }
            } else {
                // 양도할 정기권을 선택해주세요.
                utils.messageBox('alert', this.$t('MSG_ALT_SEL_PASS_TRANSFER'));
                return;
            }

            utils.openLayerPopup('PGE_CTM_00016', this.onReceiverPopupCallback, {
                pageInitialData: {},
                size: 'lg',
            });
        },
        onPopupCallback(data) {
            if (data) {
                this.sender = data;
                console.debug('sender:' + JSON.stringify(this.sender));

                switch (this.srchFg) {
                    case 'name':
                        this.srchVal = this.sender.name;
                        break;
                }

                this.receiver = null;
                this.search();
            }
        },
        onReceiverPopupCallback(data) {
            if (data) {
                this.receiver = data;
                this.searchReceiver();
            }
        },
        init() {
            this.srchFg = 'name';
            this.srchVal = null;
            this.sender = null;
            this.receiver = null;
        },
        search() {
            if (_.isNull(this.sender)) {
                // 가입정보를 먼저 선택해주세요.
                utils.messageBox('alert', this.$t('MSG_ALT_SEL_REGIST_INFO'));
                return;
            }

            http.request(this.$options.name, 'DTS_JNE_00001', {
                query: {
                    memshpUid: this.sender.memshpUid,
                },
            }).then((res) => {
                let ticketList = [];
                let resData = res.data;

                if (resData.length > 0) {
                    let ticket = resData[0];

                    ticket.fstJoinDate = utils.toStringByFormat(utils.toDate(ticket.fstJoinDate), 'YYYY-MM-DD');
                    ticket.issueDate = utils.toStringByFormat(utils.toDate(ticket.issueDate), 'YYYY-MM-DD');
                    ticket.expireDate = utils.toStringByFormat(utils.toDate(ticket.expireDate), 'YYYY-MM-DD');

                    ticketList.push(ticket);

                    if (ticket.transferValue === 'N') {
                        utils.messageBox('alert', ticket.transferCause);
                    }
                }

                this.senderCnt = ticketList.length;
                this.$refs.senderGrid.setRows(ticketList);
                this.senderTicket = null;

                if (ticketList.length > 0) {
                    // row가 무조건 1개 이므로 0번째 index에 default를 체크로
                    this.$refs.senderGrid.gridView.checkRow(0, true, false);
                    // row가 무조건 1개 이므로 0번째 index에 Json값 return
                    const ds = this.$refs.senderGrid.gridView.getDataSource();
                    this.senderTicket = ds.getJsonRow(0);
                    console.debug(this.senderTicket);
                }

            });
        },
        searchReceiver() {
            if (_.isNull(this.receiver)) {
                // 양수자 조회를 먼저 선택해주세요.
                utils.messageBox('alert', this.$t('MSG_ALT_SEL_TRANS_SEARCH'));
                return;
            }

            http.request(this.$options.name, 'DTS_JNE_00002', {
                query: {
                    memshpUid: this.receiver.memshpUid,
                },
            }).then((res) => {
                let resData = res.data;

                if (resData.length > 0) {
                    _.each(resData, (ticket) => {
                        ticket.fstJoinDate = utils.toStringByFormat(utils.toDate(ticket.fstJoinDate), 'YYYY-MM-DD');

                        ticket.issueDate = utils.toStringByFormat(utils.toDate(ticket.issueDate), 'YYYY-MM-DD');

                        ticket.expireDate = utils.toStringByFormat(utils.toDate(ticket.expireDate), 'YYYY-MM-DD');
                    });

                    this.receiverList = resData;
                    this.receiverCnt = this.receiverList.length;
                    this.$refs.receiverGrid.setRows(this.receiverList);
                } else {
                    this.receiverCnt = 0;
                    this.receiverList = [];
                    this.$refs.receiverGrid.setRows(this.receiverList);
                }
            });
        },
        transfer() {
            let valid = true;

            if (_.isNull(this.sender)) {
                // 가입정보를 먼저 선택해주세요.
                utils.messageBox('alert', this.$t('MSG_ALT_SEL_REGIST_INFO'));
                valid = false;
                return;
            }

            if (_.isNull(this.receiver)) {
                // 양수자 조회를 먼저 선택해주세요.
                utils.messageBox('alert', this.$t('MSG_ALT_SEL_TRANS_SEARCH'));
                valid = false;
                return;
            }

            if (_.isNull(this.senderTicket)) {
                // 정기권을 선택해주세요.
                utils.messageBox('alert', this.$t('MSG_ALT_SEL_COM_PASS'));
                valid = false;
                return;
            }

            if (this.senderTicket.transferValue === 'N') {
                // 양도가 불가능한 정기권입니다.
                utils.messageBox('alert', this.$t('MSG_ALT_NON_TRANS_PASS'));
                valid = false;
                return;
            }

            if (this.receiverList.length > 0) {
                // 양수인이 정기권이 있으면 양도할 수 없습니다.
                utils.messageBox('alert', this.$t('MSG_ALT_NON_TRANS_RECEIVER'));
                valid = false;
                return;
            }

            let senderAgeLevel = this.getAgeLevel(this.getMonths(this.sender.birthDate));
            let receiverAgeLevel = this.getAgeLevel(this.getMonths(this.receiver.birthDate));

            let senderAgeType = this.getAgeLevelNm(senderAgeLevel);
            let receipverAgeType = this.getAgeLevelNm(receiverAgeLevel);

            if(senderAgeLevel != receiverAgeLevel) {
                // 연령대에 맞지 않는 정기권을 양도하려고 합니다.
                utils.messageBox("alert", utils.strFormat(this.$t('MSG_ALT_TRANSFER_AGE'), senderAgeType, receipverAgeType));
                valid = false;
                return;
            }

            if(valid) {
                utils.messageBox(
                    'confirm',
                    this.$t('MSG_ALT_DO_U_WANT_TRANSFER_TICKET'),   // 양도처리하시겠습니까?
                    null,
                    () => {
                        http.request(this.$options.name, 'DTS_JNE_00003', {
                            data: {
                                parkKind: this.sender.parkKind,
                                senderTicketNo: this.sender.ticketNo,
                                senderMemshpUid: this.sender.memshpUid,
                                receiverMemshpUid: this.receiver.memshpUid,
                                receiverMemberKind: this.receiver.memberKind,
                            },
                        }).then((res) => {
                            let resData = res.data;
                            if (resData) {
                                if (resData.result === 'success') {
                                    this.search();
                                    this.searchReceiver();

                                    // 양도 처리 되었습니다.
                                    utils.messageBox('alert', this.$t('MSG_ALT_TRANS_PROCESS'));
                                } else if(resData.result === 'fail') {
                                    // 양도 처리가 실패하였습니다.
                                    utils.messageBox('alert', this.$t('MSG_ALT_TRANS_PROCESS_ERROR'));
                                }
                            }
                        });
                    },
                    () => {}
                );
            }
        },
        onItemChecked(grid, itemIndex, checked) {
            const ds = grid.getDataSource();
            this.senderTicket = ds.getJsonRow(itemIndex);
            console.dir(this.senderTicket);
        },
        onlyNumber(e) {
            const regex = /[^0-9]/g;
            if (regex.test(e.target.value)) {
                e.target.value = e.target.value.replace(regex, '');
                return e.target.value;
            }
        },
        numberWithCommas(number) {
            if (number || number === 0) {
                number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
            return !number && number !== 0 ? '' : number;
        },
        getMonths(bdstr) {
            var today = new Date();
            let birthDate = new Date(bdstr);
            var birthYear = birthDate.getFullYear();
            var birthMonth = birthDate.getMonth();
            var birthDay = birthDate.getDate();

            var todayYear = today.getFullYear();
            var todayMonth = today.getMonth();
            var todayDay = today.getDate();

            var months = (todayYear - birthYear) * 12 + todayMonth - birthMonth;
            if (todayMonth < birthMonth || (todayMonth === birthMonth && todayDay < birthDay)) {
                months--;
            }

            return months;
        },
        getAgeLevel(month) {
            if(month < 36) return 1;                        // 베이비
            else if(month >= 36 && month < 156) return 2;   // 소인
            else if(month >= 156 && month < 720) return 3;  // 대인
            else if(month >= 720) return 4;                 // 시니어
        },
        getAgeLevelNm(ageLevel) {
            if(ageLevel == 1) return this.$t('MSG_ALT_BABY');
            else if(ageLevel == 2) return this.$t('MSG_ALT_CHILD');
            else if(ageLevel == 3) return this.$t('MSG_ALT_ADULT');
            else if(ageLevel == 4) return this.$t('MSG_ALT_SENIOR');
        } 
    },
};
</script>
<style scoped></style>
