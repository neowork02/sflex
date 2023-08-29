<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <!-- S::컨텐츠1 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SRCH_DT')"
                    required
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-range-picker v-model="dateValue" autoConfirm input-type="YYYY-MM-DD" init="day+0" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_ISSUE_PURPOSE')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-dropdown v-model="srchUseKind" :items="useKindOptions" />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button @click="init">{{ $t('MSG_BTN_RESET') }}</ur-button>
                    <!-- 초기화 -->
                    <ur-button v-permission:read="this.$options.name" @click="search">{{ $t('MSG_TXT_SRCH') }}</ur-button>
                    <!-- 조회 -->
                    <ur-button v-permission:excel="this.$options.name" color="violet" @click="downloadExcel">{{ $t('MSG_TXT_EXCEL_DOWNLOAD') }}</ur-button>
                    <!-- 엑셀다운로드 -->
                </div>
            </div>
            <!-- E::컨텐츠1 -->

            <!-- S::컨텐츠2 -->
            <div class="comm_title_wrap mt25">
                <h4>{{ $t('MSG_TXT_LIST_ISSUE_CONF') }}</h4>
                <!-- 입장확인증 발급 리스트 -->
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">
                            Total<span>{{ numberWithCommas(ccEntranceConfirmCnt) }}</span
                            >{{ $t('MSG_TXT_CNT') }}
                        </div>
                        <!-- info: Total *건 -->
                    </div>
                </div>
                <!--E::: 타이틀 오른쪽 total info -->
            </div>
            <real-grid
                ref="ccEntranceConfirmGrid"
                grid-id="ccEntranceConfirmGrid"
                grid-root="/lib"
                :gridFields="ccEntranceConfirmFields"
                :gridColumns="ccEntranceConfirmColumns"
                :gridCellClick="onCcEntranceConfirmCellClick"
                :style="{ height: '400px' }"
            />
            <!-- E::컨텐츠2-->

            <!-- S::컨텐츠3 -->
            <div class="comm_title_wrap mt40">
                <h4>{{ $t('MSG_TXT_ISSUE_PERSON') }}</h4>
                <!-- 발급 대상자 -->
            </div>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_EMPL_NM')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field :value="name" style="width: 100%" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SEASON_NO')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field style="width: 100%" :value="ticketNo" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_REASON_ISSUE')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field style="width: 100%" :value="remarkDesc" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_ISSUE_PURPOSE')"
                    reqired
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field style="width: 100%" :value="useKind" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_FST_RGST_USR')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field style="width: 100%" :value="fstRgstUsrId" readonly />
                </ur-form-item>
                <ur-form-item
                    :label="$t('MSG_TXT_FST_RGST_DT')"
                    class="flex_wrap"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-date-picker autoConfirm input-type="YYYY-MM-DD" :value="issueDate" disabled />
                </ur-form-item>
            </ur-form-box>
            <!-- E::컨텐츠3 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
import _ from 'lodash';

export default {
    name: 'PGE_JNP_00002', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            today: utils.now('YYYY-MM-DD'),

            dateValue: [],
            srchStartDt: utils.now('YYYY-MM-DD'), // 재결제기간(From)
            srchEndDt: utils.now('YYYY-MM-DD'),   // 재결제기간(To)

            useKindOptions: [
                { value: 'All', text: this.$t('MSG_TXT_ALL') }, // 전체
                { value: 'G730', text: this.$t('MSG_TXT_ISSUE_CONF') }, // 이용확인증 발급
            ],
            srchUseKind: 'All',

            ccEntranceConfirmFields: [
                { fieldName: 'issueDate', dataType: 'text' },
                { fieldName: 'issueTime', dataType: 'text' },
                { fieldName: 'ticketNo', dataType: 'text' },
                { fieldName: 'itemNm', dataType: 'text' },
                { fieldName: 'ticketStatusValue', dataType: 'text' },
                { fieldName: "ticketStatusValueNm", dataType: "text" },
                { fieldName: 'remarkDesc', dataType: 'text' },
                { fieldName: 'useKind', dataType: 'text' },
                { fieldName: 'useKindNm', dataType: 'text' },
                { fieldName: 'fstRgstUsrId', dataType: 'text' },
                { fieldName: 'fstRgstDtm', dataType: 'text' },
            ],
            ccEntranceConfirmColumns: [
                {
                    // 발급일자
                    name: 'issueDate',
                    fieldName: 'issueDate',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_ISSUE_DATE') },
                    edit: false,
                },
                {
                    // 발급시간
                    name: 'issueTime',
                    fieldName: 'issueTime',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_ISSUE_TIME') },
                    edit: false,
                },
                {
                    // 정기권번호
                    name: 'ticketNo',
                    fieldName: 'ticketNo',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_SEASON_NO') },
                    edit: false,
                },
                {
                    // 권종명
                    name: 'itemNm',
                    fieldName: 'itemNm',
                    width: '250',
                    header: { text: this.$t('MSG_TXT_TICKET_ITEM_NM') },
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
                    // 발급사유
                    name: 'remarkDesc',
                    fieldName: 'remarkDesc',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_REASON_ISSUE') },
                    edit: false,
                },
                {
                    // 발급용도
                    name: 'useKindNm',
                    fieldName: 'useKindNm',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_ISSUE_PURPOSE') },
                    edit: false,
                },
                {
                    // 등록자
                    name: 'fstRgstUsrId',
                    fieldName: 'fstRgstUsrId',
                    width: '100',
                    header: { text: this.$t('MSG_TXT_FST_RGST_USR') },
                    edit: false,
                },
                {
                    // 등록일자
                    name: 'fstRgstDtm',
                    fieldName: 'fstRgstDtm',
                    width: '200',
                    header: { text: this.$t('MSG_TXT_FST_RGST_DT') },
                    edit: false,
                },
            ],
            ccEntranceConfirmList: [],
            ccEntranceConfirmCnt: 0,
            ccEntranceConfirm: null,

            name: null,
            ticketNo: null,
            remarkDesc: null,
            useKind: null,
            fstRgstUsrId: null,
            issueDate: null,
        };
    },
    created() {},
    watch: {
        dateValue(newVal, oldVal) {
            this.srchStartDt = newVal[0];
            this.srchEndDt = newVal[1];
        },
        ccEntranceConfirm(newVal, oldVal) {
            if (newVal != null) {
                this.ticketNo = newVal.ticketNo;
                this.remarkDesc = newVal.remarkDesc;
                this.useKind = newVal.useKindNm;
                this.fstRgstUsrId = newVal.fstRgstUsrId;
                this.issueDate = newVal.issueDate;
            } else {
                this.name = null;
                this.ticketNo = null;
                this.remarkDesc = null;
                this.useKind = null;
                this.fstRgstUsrId = null;
                this.issueDate = null;
            }
        },
    },
    mounted() {
    },
    methods: {
        init() {
            this.dateValue = [this.today, this.today];
            this.srchUseKind = 'All';
        },
        search() {
            if (_.isEmpty(this.srchStartDt) || _.isEmpty(this.srchEndDt)) {
                // 조회일자를 입력해주세요.
                utils.messageBox("alert", this.$t('MSG_ALT_INQUIRY_DATE'));
                return;
            }
            const params = {
                srchStartDt: this.srchStartDt,
                srchEndDt: this.srchEndDt,
                useKind: this.srchUseKind,
            };

            http.request(this.$options.name, 'DTS_JNP_00002', {
                query: params,
            })
                .then((res) => {
                    if (res.data) {
                        this.ccEntranceConfirmList = res.data;

                        this.ccEntranceConfirmList = utils.map(this.ccEntranceConfirmList, (row) => {
                            row.issueDate = utils.toStringByFormat(utils.toDate(row.issueDate), 'YYYY-MM-DD');
                            row.issueTime = utils.toStringByFormat(utils.toDate(row.fstRgstDtm), 'HH:mm:ss');
                            row.fstRgstDtm = utils.toStringByFormat(row.fstRgstDtm, 'YYYY-MM-DD HH:mm:ss');
                            return row;
                        });

                        this.ccEntranceConfirmCnt = this.ccEntranceConfirmList.length;
                        this.$refs.ccEntranceConfirmGrid.setRows(this.ccEntranceConfirmList);
                    }
                })
                .catch((error) => console.log(error));
        },
        downloadExcel() {
            if (this.$refs.ccEntranceConfirmGrid.getJsonRows().length == 0) {
                // 조회된 데이터가 없습니다.
                utils.messageBox('alert', this.$t('MSG_ALT_NO_SERACH_DATA'));
                return;
            }
            // 회원정기권목록
            this.$refs.ccEntranceConfirmGrid.getExcelDownload(this.$t('MSG_TXT_TICKET_LIST'), 'PGE_JNP_00002');
        },
        onCcEntranceConfirmCellClick(grid, data) {
            if (data.cellType !== 'gridEmpty') {
                this.ccEntranceConfirm = this.ccEntranceConfirmList[data.dataRow];

                http.request(this.$options.name, 'DTS_CTM_00001', {
                    query: {
                        memshpUid: this.ccEntranceConfirm.memshpUid,
                    },
                }).then((res) => {
                    if (res.data) this.name = res.data[0].name;
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
