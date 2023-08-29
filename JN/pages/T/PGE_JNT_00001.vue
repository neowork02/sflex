<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 콘텐츠1 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SEARCH_JOIN_INFO')"
                    :labelAlign="'right'"
                    required
                    style="width: 100%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="srchFg" value="name" sm @click="onClickSrchFg('name', 'cs')">
                            {{ $t('MSG_TXT_EMPL_NM') }}
                        </ur-radio>
                        <ur-radio v-model="srchFg" value="ticket" sm @click="onClickSrchFg('ticket', 'cs')">
                            {{ $t('MSG_TXT_SEASON_NO') }}
                        </ur-radio>
                    </div>
                    <ur-text-field
                        class="pl16"
                        v-model="srchVal"
                        :disabled="disabled(srchFg)"
                        @enter="popupSearch(srchFg, 'cs')"
                        mask="##########"
                    />
                    <ur-icon-button icon="search" style="padding-top: 0px" @click="popupSearch(srchFg, 'cs')" />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button @click="init">{{ $t('MSG_BTN_RESET') }}</ur-button>
                    <!-- 초기화 -->
                    <ur-button @click="search" color="violet">{{ $t('MSG_TXT_SRCH') }}</ur-button>
                    <!-- 조회 -->
                </div>
            </div>
            <!-- ::E 콘텐츠1 -->

            <!-- ::S 콘텐츠2 -->
            <div class="comm_title_wrap mt25">
                <h4 class="pr10">{{ $t('MSG_TXT_TARGET_PROCESS') }}</h4>
                <!-- 중지처리 대상 -->
                <ur-button color="violet" @click="save">{{ $t('MSG_TXT_STOP_PROCESS') }}</ur-button>
                <!-- 중지처리 -->
                <ur-button color="violet" @click="del">{{ $t('MSG_TXT_CANCEL_STOP_PROCESS') }}</ur-button>
                <!-- 중지처리해제 -->
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">
                            Total<span>{{ numberWithCommas(cardStopCnt) }}</span
                            >{{ $t('MSG_TXT_CNT') }}
                            <!-- info: Total *건 -->
                        </div>
                    </div>
                </div>
                <!--E::: 타이틀 오른쪽 total info -->
            </div>
            <real-grid
                ref="cardStopGrid"
                grid-id="cardStopGrid"
                grid-root="/lib"
                :gridFields="cardStopFields"
                :gridColumns="cardStopColumns"
                :style="{ height: '250px' }"
                :gridDbCellClick="gridDbCellClick"
                :gridCellEdited="gridCellEdited"
                :gridEditRowChanged="gridEditRowChanged"
                :gridCheckBar="{ visible: true }"
            />
            <!-- ::E 콘텐츠2 -->

            <!-- ::S 콘텐츠3 -->
            <ur-form-box toggleable class="mt45">
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SEARCH_JOIN_INFO')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="srchTiFg" value="name" @click="onClickSrchFg('name', 'ti')" sm>{{
                            $t('MSG_TXT_EMPL_NM')
                        }}</ur-radio>
                        <ur-radio v-model="srchTiFg" value="ticket" @click="onClickSrchFg('ticket', 'ti')" sm>{{
                            $t('MSG_TXT_SEASON_NO')
                        }}</ur-radio>
                    </div>
                    <ur-text-field
                        class="pl16"
                        v-model="srchTiVal"
                        :disabled="disabled(srchTiFg)"
                        @enter="popupSearch(srchTiFg, 'ti')"
                        mask="##########"
                    />
                    <ur-icon-button icon="search" style="padding-top: 0px" @click="popupSearch(srchTiFg, 'ti')" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SRCH_DT')"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="searchDateType" value="stopDate" sm
                            >{{ $t('MSG_TXT_DATE_SUSPENSE') }}
                        </ur-radio>
                        <ur-radio v-model="searchDateType" value="stopEndFrcastDate" sm>{{
                            $t('MSG_TXT_EXPECT_DATE_SUSPENSE')
                        }}</ur-radio>
                    </div>
                    <div style="width: auto; padding-left: 12px">
                        <ur-range-picker v-model="dateValue" autoConfirm input-type="YYYY-MM-DD" />
                    </div>
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button @click="initTi">{{ $t('MSG_BTN_RESET') }}</ur-button>
                    <!-- 초기화 -->
                    <ur-button @click="searchTi" color="violet">{{ $t('MSG_TXT_SRCH') }}</ur-button>
                    <!-- 조회 -->
                </div>
            </div>
            <!-- ::E 콘텐츠 -->
            <!-- S::콘텐츠4 -->
            <div class="comm_title_wrap mt25">
                <h4 class="pr10">{{ $t('MSG_TXT_LIST_CANCEL_PASS') }}</h4>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">
                            Total<span>{{ numberWithCommas(tiCnt) }}</span
                            >{{ $t('MSG_TXT_CNT') }}
                        </div>
                        <!-- info: Total *건 -->
                    </div>
                </div>
                <!--E::: 타이틀 오른쪽 total info -->
            </div>
            <real-grid
                ref="TiGrid"
                grid-id="TiGrid"
                grid-root="/lib"
                :gridFields="tiFields"
                :gridColumns="tiColumns"
                :style="{ height: '250px' }"
            />
            <!-- E::콘텐츠4 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
import _ from 'lodash';

export default {
    name: 'PGE_JNT_00001', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            srchFg: 'name',
            srchVal: null,
            memshpInfo: null,

            srchTiFg: 'name',
            srchTiVal: null,
            memshpInfoTi: null,

            ticketCodeList: [],

            searchDateType: 'stopDate',
            dateValue: [],

            isEntr: false,

            cardStopFields: [
                { fieldName: 'parkKind', dataType: 'text' }, // 파크구분
                { fieldName: 'ticketNo', dataType: 'text' }, // 정기권번호
                { fieldName: 'memberName', dataType: 'text' }, // 성명
                { fieldName: 'issueDate', dataType: 'datetime' }, // 발급일
                { fieldName: 'expireDate', dataType: 'datetime' }, // 만기일
                { fieldName: 'issueKindNm', dataType: 'text' }, // 발급구분
                { fieldName: 'itemNm', dataType: 'text' }, // 권종명
                { fieldName: 'ticketStatusNm', dataType: 'text' }, // 상태
                { fieldName: 'stopDate', dataType: 'datetime' }, // 중지시작일자
                { fieldName: 'stopEndFrcastDate', dataType: 'datetime' }, // 중지종료예상일자
                { fieldName: 'stopPeriod', dataType: 'text' }, // 중지기간
                { fieldName: 'stopEndAnticipateDate', dataType: 'datetime' }, // 예상만기일
                { fieldName: 'stopEndDate', dataType: 'datetime' }, // 중지종료일
                { fieldName: 'stopReasonKind', dataType: 'text' }, // 중지사유
                { fieldName: 'remarkDesc', dataType: 'text' }, // 비고
                { fieldName: 'memshpUid', dataType: 'text' }, // 멤버십UID
                { fieldName: 'seq', dataType: 'text' }, // 일련번호
                { fieldName: 'ticketStatus', dataType: 'text' }, // 정기권상태코드
            ],
            cardStopColumns: [
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
                    // 결제자
                    name: 'memberName',
                    fieldName: 'memberName',
                    header: { text: this.$t('MSG_TXT_EMPL_NM') },
                    edit: false,
                },
                {
                    // 발급일
                    name: 'issueDate',
                    fieldName: 'issueDate',
                    header: { text: this.$t('MSG_TXT_DATE_ISSUE') },
                    edit: false,
                    datetimeFormat: 'yyyy-MM-dd',
                },
                {
                    // 만기일
                    name: 'expireDate',
                    fieldName: 'expireDate',
                    header: { text: this.$t('MSG_TXT_DATE_EXPIRE') },
                    edit: false,
                    datetimeFormat: 'yyyy-MM-dd',
                },
                {
                    // 발급구분
                    name: 'issueKindNm',
                    fieldName: 'issueKindNm',
                    header: { text: this.$t('MSG_TXT_ISSUE_KIND') },
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
                    // 상태
                    name: 'ticketStatusNm',
                    fieldName: 'ticketStatusNm',
                    header: { text: this.$t('MSG_TXT_DTST_STT') },
                    edit: false,
                },
                {
                    // 중지시작일자
                    name: 'stopDate',
                    fieldName: 'stopDate',
                    header: { text: this.$t('MSG_TXT_STOP_START_DATE') },
                    editor: {
                        type: 'date',
                        datetimeFormat: 'yyyy-MM-dd',
                        commitOnSelect: true,
                        mask: {
                            editMask: '9999-99-99',
                            placeHolder: 'yyyy-MM-dd',
                            includedFormat: true,
                        },
                    },
                    datetimeFormat: 'yyyy-MM-dd',
                    // styleCallback: function (grid, dataCell) {
                    //     let ret = {};
                    //     let ticketStatusValue = grid.getValue(dataCell.index.itemIndex, 17); // 17: 정기권상태 Index 번호

                    //     if (ticketStatusValue === 'C001') {
                    //         ret.editable = true;
                    //     } else {
                    //         ret.editable = false;
                    //     }
                    //     return ret;
                    // },
                },
                {
                    // 중지종료예상일자
                    name: 'stopEndFrcastDate',
                    fieldName: 'stopEndFrcastDate',
                    header: { text: this.$t('MSG_TXT_EXPECT_DATE_SUSPENSE') },
                    width: 150,
                    editor: {
                        type: 'date',
                        datetimeFormat: 'yyyy-MM-dd',
                        commitOnSelect: true,
                        mask: {
                            editMask: '9999-99-99',
                            placeHolder: 'yyyy-MM-dd',
                            includedFormat: true,
                        },
                    },
                    datetimeFormat: 'yyyy-MM-dd',
                },
                {
                    // 중지기간
                    name: 'stopPeriod',
                    fieldName: 'stopPeriod',
                    header: { text: this.$t('MSG_TXT_SUSPENSION_PERIOD') },
                    editor: {
                        type: 'line',
                        inputCharacters: '0-9',
                    },
                },
                {
                    // 예상만기일
                    name: 'stopEndAnticipateDate',
                    fieldName: 'stopEndAnticipateDate',
                    header: { text: this.$t('MSG_TXT_EXPECTE_DATE') },
                    edit: false,
                    datetimeFormat: 'yyyy-MM-dd',
                },
                {
                    // 중지종료일
                    name: 'stopEndDate',
                    fieldName: 'stopEndDate',
                    header: { text: this.$t('MSG_TXT_END_DATE_SUSPENSE') },
                    editor: {
                        type: 'date',
                        datetimeFormat: 'yyyy-MM-dd',
                        commitOnSelect: true,
                        mask: {
                            editMask: '9999-99-99',
                            placeHolder: 'yyyy-MM-dd',
                            includedFormat: true,
                        },
                    },
                    datetimeFormat: 'yyyy-MM-dd',
                    styleCallback: function (grid, dataCell) {
                        let ret = {};
                        let ticketStatusValue = grid.getValue(dataCell.index.itemIndex, 17); // 17: 정기권상태 Index 번호

                        if (ticketStatusValue === 'C008') {
                            ret.editable = true;
                        } else {
                            ret.editable = false;
                        }
                        return ret;
                    },
                },
                {
                    // 중지사유
                    name: 'stopReasonKind',
                    fieldName: 'stopReasonKind',
                    header: { text: this.$t('MSG_TXT_REASON_SUSPENSE') },
                    lookupDisplay: true,
                    editButtonVisibility: 'always', //default, hidden, rowfocused, visible
                    // [중지사유코드-사유1, 중지사유코드-사유2, 중지사유코드-사유3, 중지사유코드-사유4, 중지사유코드-사유5]
                    labels: [
                        this.$t('MSG_TXT_STOP_CODE_REASON1'),
                        this.$t('MSG_TXT_STOP_CODE_REASON2'),
                        this.$t('MSG_TXT_STOP_CODE_REASON3'),
                        this.$t('MSG_TXT_STOP_CODE_REASON4'),
                        this.$t('MSG_TXT_STOP_CODE_REASON5'),
                    ], // this.cardStopCauseLabels,
                    values: ['CA01', 'CA02', 'CA03', 'CA04', 'CA05'], // this.cardStopCauseValues,
                    editor: {
                        type: 'dropdown',
                        dropDownCount: 5,
                        textReadOnly: true,
                        dropDownWhenClick: true,
                    },
                },
                {
                    // 비고
                    name: 'remarkDesc',
                    fieldName: 'remarkDesc',
                    header: { text: this.$t('MSG_TXT_NOTE') },
                },
                {
                    name: 'memshpUid',
                    fieldName: 'memshpUid',
                    visible: false,
                },
                {
                    name: 'seq',
                    fieldName: 'seq',
                    visible: false,
                },
                {
                    name: 'ticketStatus',
                    fieldName: 'ticketStatus',
                    visible: false,
                },
            ],
            cardStopList: [],
            cardStopCnt: 0,

            tiFields: [
                { fieldName: 'ticketNo', dataType: 'text' },
                { fieldName: 'stopDate', dataType: 'text' },
                { fieldName: 'stopEndFrcastDate', dataType: 'text' },
                { fieldName: 'stopEndDate', dataType: 'text' },
                { fieldName: 'expireDate', dataType: 'text' },
                { fieldName: 'stopReasonKindNm', dataType: 'text' },
                { fieldName: 'remarkDesc', dataType: 'text' },
            ],
            tiColumns: [
                {
                    // 정기권번호
                    name: 'ticketNo',
                    fieldName: 'ticketNo',
                    header: { text: this.$t('MSG_TXT_SEASON_NO') },
                    edit: false,
                },
                {
                    // 중지일자
                    name: 'stopDate',
                    fieldName: 'stopDate',
                    header: { text: this.$t('MSG_TXT_DATE_SUSPENSE') },
                    edit: false,
                },
                {
                    // 중지종료예상일자
                    name: 'stopEndFrcastDate',
                    fieldName: 'stopEndFrcastDate',
                    header: { text: this.$t('MSG_TXT_EXPECT_DATE_SUSPENSE') },
                    edit: false,
                },
                {
                    // 중지종료일자
                    name: 'stopEndDate',
                    fieldName: 'stopEndDate',
                    header: { text: this.$t('MSG_TXT_END_DATE_SUSPENSE') },
                    edit: false,
                },
                {
                    // 예상만기일
                    name: 'expireDate',
                    fieldName: 'expireDate',
                    header: { text: this.$t('MSG_TXT_EXPECTE_DATE') },
                    edit: false,
                },
                {
                    // 중지사유
                    name: 'stopReasonKindNm',
                    fieldName: 'stopReasonKindNm',
                    header: { text: this.$t('MSG_TXT_REASON_SUSPENSE') },
                    edit: false,
                },
                {
                    // 비고
                    name: 'remarkDesc',
                    fieldName: 'remarkDesc',
                    header: { text: this.$t('MSG_TXT_NOTE') },
                    edit: false,
                },
            ],
            tiList: [],
            tiCnt: 0,
        };
    },
    created() {},
    computed: {
        // Input Mask
        inputMask() {
            if (this.srchFg == 'ticket') {
                return '##########';
            }
        },
    },
    watch: {},
    beforeMount() {},
    mounted() {},
    methods: {
        disabled(fg) {
            switch (fg) {
                case 'name':
                case 'mobile':
                    return true;
                default:
                    return false;
            }
        },
        onClickSrchFg(fg, type) {
            switch (type) {
                case 'cs':
                    this.srchVal = null;
                    break;
                case 'ti':
                    this.srchTiVal = null;
                    break;
            }

            switch (fg) {
                case 'name':
                case 'mobile':
                    this.popup(fg, type);
                    break;
            }
        },
        popupSearch(fg, type) {
            switch (fg) {
                case 'name':
                case 'mobile':
                case 'ticket':
                    this.popup(fg, type);
                    break;
                default:
            }
        },
        popup(fg, type) {
            let pageInitialData = {};
            if (fg === 'ticket') {
                pageInitialData.ticketNo = type == 'cs' ? this.srchVal : this.srchTiVal;
            }

            const func = type == 'cs' ? this.onPopupCallback : this.onPopupTiCallback;

            utils.openLayerPopup('PGE_CTM_00011', func, {
                pageInitialData: pageInitialData,
                size: 'lg',
            });
        },
        onPopupCallback(data) {
          if (data) {
            this.memshpInfo = data;
            // 정기권가입자 리스트 팝업에서 중지가능여부 N 인 정기권 권종 확인
            let params = {
              ticketNo: this.memshpInfo.ticketNo,    // 정기권번호
              memshpUid: this.memshpInfo.memshpUid,  // 멤버십 UID
            };
            // 정기권 중지가능여부 데이터 서비스
            http.request(this.$options.name, 'DTS_JNT_00006', {
              query: params,
            }).then((res) => {
              if (res.data[0].stopPsbYn === 'N') {
                // 해당 정기권 권종 (itemName) 은 중지처리 불가 권종입니다.
                utils.messageBox('alert', utils.strFormat(this.$t('MSG_ALT_PASS_TYPE_CANCEL'), res.data[0].itemName), null);
                this.memshpInfo = null;
                return;
              } else {
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
            });
          }
        },
        onPopupTiCallback(data) {
            if (data) {
                this.memshpInfoTi = data;

                switch (this.srchTiFg) {
                    case 'name':
                        this.srchTiVal = this.memshpInfoTi.name;
                        break;
                    case 'mobile':
                        this.srchTiVal = this.memshpInfoTi.mobileTel;
                        break;
                }

                this.searchTi();
            }
        },
        search() {
            if (_.isNull(this.memshpInfo)) {
                // 가입정보를 선택하여 주세요
                utils.messageBox('alert', this.$t('MSG_ALT_SEL_SUB_INFO'));
                return;
            }

            let params = {};
            if (!_.isNull(this.memshpInfo)) params.memshpUid = this.memshpInfo.memshpUid;

            http.request(this.$options.name, 'DTS_JNT_00001', {
                query: params,
            }).then((res) => {
                console.info(res.data);
                let cardStopList = res.data.cardStopList;

                if (!_.isEmpty(cardStopList)) {
                    _.each(cardStopList, (row) => {
                        row.issueDate = utils.toStringByFormat(utils.toDate(row.issueDate), 'YYYY-MM-DD');      // 발급일
                        row.expireDate = utils.toStringByFormat(utils.toDate(row.expireDate), 'YYYY-MM-DD');    // 만기일

                        // 중지시작일자
                        row.stopDate = _.isNull(row.stopDate)
                            ? utils.now('YYYY-MM-DD')
                            : utils.toStringByFormat(utils.toDate(row.stopDate), 'YYYY-MM-DD');         
                        
                        // 중지종료일자
                        row.stopEndDate = !_.isNull(row.stopEndDate)
                            ? utils.toStringByFormat(utils.toDate(row.stopEndDate), 'YYYY-MM-DD')
                            : null;                                                                     

                        // 중지종료예상일자
                        let stopEndFrcastDate = row.stopEndFrcastDate;
                        row.stopEndFrcastDate = utils.toStringByFormat(stopEndFrcastDate, 'YYYY-MM-DD');

                        // 중지기간
                        if (!_.isEmpty(stopEndFrcastDate)) {
                            let stopPeriod = utils.getDayOffset(stopEndFrcastDate, row.stopDate);
                            stopPeriod += 1;
                            row.stopPeriod = stopPeriod;
                        }

                        // 예상만기일
                        row.stopEndAnticipateDate = row.ticketStatus === 'C008' ? row.expireDate : null;
                    });

                    this.cardStopList = cardStopList;
                    this.cardStopCnt = this.cardStopList.length;
                    this.$refs.cardStopGrid.setRows(this.cardStopList);
                } else {
                    this.cardStopList = [];
                    this.cardStopCnt = this.cardStopList.length;
                    this.$refs.cardStopGrid.setRows(this.cardStopList);
                }
            });
        },
        searchTi() {
            if (_.isNull(this.memshpInfoTi) && _.isEmpty(this.dateValue)) {
                // 가입정보나 조회일자중 하나를 입력하여 주세요.
                utils.messageBox('alert', this.$t("MSG_ALT_SUB_INFO_INQUIRY_DATE"));
                return;
            }

            if (!_.isEmpty(this.dateValue) && (_.isEmpty(this.dateValue[0]) || _.isEmpty(this.dateValue[1]))) {
                // 조회일자를 시작일과 종료일을 입력하여 주세요.
                utils.messageBox('alert', this.$t("MSG_ALT_START_END_SEARCH_DATE"));
                return;
            }

            let params = {
                memshpUid: this.memshpInfoTi != null ? this.memshpInfoTi.memshpUid : null,
                searchDateType: this.searchDateType,
                searchStartDt: this.dateValue[0],
                searchEndDt: this.dateValue[1],
            };

            http.request(this.$options.name, 'DTS_JNT_00004', {
                query: params,
            }).then((res) => {
                let resData = res.data;

                if (!_.isEmpty(resData)) {
                    _.each(resData, (row) => {
                        row.stopDate = utils.toStringByFormat(row.stopDate, 'YYYY-MM-DD');
                        row.stopEndFrcastDate = utils.toStringByFormat(row.stopEndFrcastDate, 'YYYY-MM-DD');
                        row.stopEndDate = utils.toStringByFormat(row.stopEndDate, 'YYYY-MM-DD');
                        row.expireDate = utils.toStringByFormat(row.expireDate, 'YYYY-MM-DD');
                    });

                    this.tiList = resData;
                    this.tiCnt = this.tiList.length;
                    this.$refs.TiGrid.setRows(this.tiList);
                } else {
                    this.tiList = [];
                    this.tiCnt = 0;
                    this.$refs.TiGrid.setRows(this.tiList);
                }
            });
        },
        gridDbCellClick(data) {
            if (data.fieldName === 'ticketNo') {
                const rows = this.$refs.cardStopGrid.gridView.getJsonRows();
                const memshpUid = rows[data.dataRow].memshpUid;
                this.openPopupMemshpDetail(memshpUid);
            }

            if (data.fieldName === 'payerMemshpUid') {
                const rows = this.$refs.cardStopGrid.gridView.getJsonRows();
                const payerMemshpUid = rows[data.dataRow].payerMemshpUid;
                this.openPopupMemshpDetail(payerMemshpUid);
            }
        },
        openPopupMemshpDetail(memshpUid) {
            utils.openLayerPopup('PGE_CTM_00018', () => {}, {
                pageInitialData: {
                    memshpUid: memshpUid,
                },
                size: 'lg',
            });
        },
        gridCellEdited(grid, itemIndex, row, field) {
            grid.commit(true);
        },
        async gridEditRowChanged(grid, itemIndex, dataRow, field, oldValue, newValue) {
            const row = this.cardStopList[dataRow];

            grid.commit(true);

            const issueDateIdx = 3;     // 발급일 index
            const expireDateIdx = 4; // 만기일 index
            const stopDateIdx = 8; // 중지시작일 index
            const stopEndFrcastDateIdx = 9; // 중지종료예상일자 index
            const stopPeriodIdx = 10; // 중지기간 index
            const stopEndAnticipateDateIdx = 11; // 예상만기일 index
            const stopEndDateIdx = 12; // 중지종료일 index
            const stopDate = grid.getValue(itemIndex, stopDateIdx);     // 중지시작일자

            const ticketStop = 'C008';

            // 중지시작일자(8)
            if (field === stopDateIdx) {
                const stopDate = utils.toStringByFormat(newValue, 'YYYYMMDD');
                const today = utils.now('YYYYMMDD');
                const period = utils.getDayOffset(stopDate, today);
                if(period > 0) {
                    // 오늘기준 미래일자는 불가합니다
                    utils.messageBox('alert', this.$t('MSG_ALT_REQ_NOT_TOMORROW'));
                    grid.setValue(itemIndex, stopDateIdx, oldValue);
                    return;
                }

                const issueDate = grid.getValue(itemIndex, issueDateIdx);
                if(utils.compareTo(newValue, issueDate) < 0) {
                    // 중지시작일자가 발급일보다 앞설 수 없습니다.
                    utils.messageBox('alert', this.$t("MSG_ALT_START_ISSUANCE_DATE"));
                    grid.setValue(itemIndex, stopDateIdx, oldValue);
                    return;
                }

                const expireDate = grid.getValue(itemIndex, expireDateIdx);
                if(utils.compareTo(expireDate, newValue) < 0) {
                    // 중지시작일자가 만기일보다 뒤일 수 없습니다.
                    utils.messageBox('alert', this.$t("MSG_ALT_START_EXPIRE_DATE"));
                    grid.setValue(itemIndex, stopDateIdx, oldValue);
                    return;
                }

                const stopEndFrcastDate = grid.getValue(itemIndex, stopEndFrcastDateIdx);   // 중지종료예상일자
                if(!_.isNull(stopEndFrcastDate)) {
                    if(utils.compareTo(stopEndFrcastDate, stopDate) < 0) {
                        // 중지시작일자가 중지종료예상일자보다 뒤일 수 없습니다.
                        utils.messageBox('alert', this.$t("MSG_ALT_START_LATER_END_DATE"));
                        grid.setValue(itemIndex, stopDateIdx, oldValue);
                        return;
                    }

                    if(row.ticketStatus === 'C001') {
                        // 중지기간 자동 계산
                        const stopEndFrcastDate = grid.getValue(itemIndex, stopEndFrcastDateIdx);   // 중지종료예상일자
                        let period = utils.getDayOffset(stopEndFrcastDate, stopDate) + 1;
                        grid.setValue(itemIndex, stopPeriodIdx, period);

                        // 예상만기일 자동 계산
                        let stopEndAnticipateDate = utils.toStringByFormat(utils.addDay(row.expireDate, period), 'YYYY-MM-DD');
                        grid.setValue(itemIndex, stopEndAnticipateDateIdx, stopEndAnticipateDate);
                    } else if(row.ticketStatus === 'C008') {
                        // let oldPeriod = grid.getValue(itemIndex, stopPeriodIdx);

                        // 중지기간 자동 계산
                        const stopEndFrcastDate = grid.getValue(itemIndex, stopEndFrcastDateIdx);   // 중지종료예상일자
                        let period = utils.getDayOffset(stopEndFrcastDate, stopDate) + 1;
                        grid.setValue(itemIndex, stopPeriodIdx, period);

                        // 예상만기일 자동 계산
                        // let changePeriod = period - oldPeriod;
                        let stopEndAnticipateDate = utils.toStringByFormat(utils.addDay(row.expireDate, period), 'YYYY-MM-DD');
                        grid.setValue(itemIndex, stopEndAnticipateDateIdx, stopEndAnticipateDate);
                    }

                    // 정기권상태가 중지일 경우, 중지종료일자도 변경
                    if (row.ticketStatus === ticketStop) {
                        let stopEndDate = utils.toStringByFormat(utils.addDay(stopEndAnticipateDate, 1), 'YYYY-MM-DD');
                        grid.setValue(itemIndex, stopEndDateIdx, stopEndDate);
                    }
                }

                // 입장기록 확인
                await this.getEntrHistory(grid, itemIndex, stopDateIdx, stopEndFrcastDateIdx);

                if (this.isEntr) {
                    // 입장기록이 있어 중지처리 불가합니다.
                    utils.messageBox('alert', this.$t('MSG_ALT_IS_ENTR_TRUE'));
                    return;
                }
            }

            // 중지종료예상일자(9)
            else if (field === stopEndFrcastDateIdx) {               
                if(row.ticketStatus === 'C001') {
                    // 중지기간 자동 계산
                    const stopEndFrcastDate = grid.getValue(itemIndex, stopEndFrcastDateIdx);   // 중지종료예상일자
                    let period = utils.getDayOffset(stopEndFrcastDate, stopDate) + 1;

                    if(period <= 0) {
                        // 중지종료예상일자가 중지시작일자보다 앞설 수 없습니다.
                        utils.messageBox('alert', this.$t("MSG_ALT_END_SUSPENSION_END_DATE"));
                        grid.setValue(itemIndex, stopEndFrcastDateIdx, oldValue);
                        return;
                    }

                    grid.setValue(itemIndex, stopPeriodIdx, period);

                    // 예상만기일 자동 계산
                    let stopEndAnticipateDate = utils.toStringByFormat(utils.addDay(row.expireDate, period), 'YYYY-MM-DD');
                    grid.setValue(itemIndex, stopEndAnticipateDateIdx, stopEndAnticipateDate);
                } else if(row.ticketStatus === 'C008') {
                    // let oldPeriod = grid.getValue(itemIndex, stopPeriodIdx);

                    // 중지기간 자동 계산
                    const stopEndFrcastDate = grid.getValue(itemIndex, stopEndFrcastDateIdx);   // 중지종료예상일자
                    let period = utils.getDayOffset(stopEndFrcastDate, stopDate) + 1;

                    if(period <= 0) {
                        // 중지종료예상일자가 중지시작일자보다 앞설 수 없습니다.
                        utils.messageBox('alert', this.$t("MSG_ALT_END_SUSPENSION_END_DATE"));
                        grid.setValue(itemIndex, stopEndFrcastDateIdx, oldValue);
                        return;
                    }

                    grid.setValue(itemIndex, stopPeriodIdx, period);

                    // 예상만기일 자동 계산
                    // let changePeriod = period - oldPeriod;
                    let stopEndAnticipateDate = utils.toStringByFormat(utils.addDay(row.expireDate, period), 'YYYY-MM-DD');
                    grid.setValue(itemIndex, stopEndAnticipateDateIdx, stopEndAnticipateDate);
                }

                // 정기권상태가 중지일 경우, 중지종료일자도 변경
                if (row.ticketStatus === ticketStop) {
                    let stopEndDate = utils.toStringByFormat(utils.addDay(newValue, 1), 'YYYY-MM-DD');
                    grid.setValue(itemIndex, stopEndDateIdx, stopEndDate);
                }

                // 입장기록 확인
                await this.getEntrHistory(grid, itemIndex, stopDateIdx, stopEndFrcastDateIdx);

                if (this.isEntr) {
                    // 입장기록이 있어 중지처리 불가합니다.
                    utils.messageBox('alert', this.$t('MSG_ALT_IS_ENTR_TRUE'));
                    return;
                }
            }

            // 중지기간(10)
            if (field === stopPeriodIdx) {
                let changePeriod = null;
                let stopEndFrcastDate = null;
                let stopEndAnticipateDate = null;

                if(row.ticketStatus === 'C001') {
                    changePeriod = newValue;
                    stopEndFrcastDate = utils.toStringByFormat(utils.addDay(stopDate, changePeriod-1), 'YYYY-MM-DD');           // 중지종료예상일자
                    stopEndAnticipateDate = utils.toStringByFormat(utils.addDay(row.expireDate, changePeriod), 'YYYY-MM-DD');   // 예상만기일
                } else if(row.ticketStatus === 'C008') {
                    changePeriod = newValue - oldValue;
                    
                    // 중지종료예상일자
                    stopEndFrcastDate = grid.getValue(itemIndex, stopEndFrcastDateIdx);
                    stopEndFrcastDate = utils.toStringByFormat(utils.addDay(stopEndFrcastDate, changePeriod), 'YYYY-MM-DD');

                    // 예상만기일
                    stopEndAnticipateDate = grid.getValue(itemIndex, stopEndAnticipateDateIdx);
                    stopEndAnticipateDate = utils.toStringByFormat(utils.addDay(stopEndAnticipateDate, changePeriod), 'YYYY-MM-DD');

                    console.debug(stopEndFrcastDate);
                }

                // 중지종료예상일자 자동 계산
                grid.setValue(itemIndex, stopEndFrcastDateIdx, stopEndFrcastDate);

                // 예상만기일 자동 계산
                grid.setValue(itemIndex, stopEndAnticipateDateIdx, stopEndAnticipateDate);

                // 정기권상태가 중지일 경우, 중지종료일자도 변경
                if (row.ticketStatus === ticketStop) {
                    let stopEndDate = utils.addDay(stopEndFrcastDate, 1);
                    stopEndDate = utils.toStringByFormat(stopEndDate, 'YYYY-MM-DD');
                    grid.setValue(itemIndex, stopEndDateIdx, stopEndDate);
                }

                // 입장기록 확인
                await this.getEntrHistory(grid, itemIndex, stopDateIdx, stopEndFrcastDateIdx);

                if (this.isEntr) {
                    // 입장기록이 있어 중지처리 불가합니다.
                    utils.messageBox('alert', this.$t('MSG_ALT_IS_ENTR_TRUE'));
                    return;
                }
            }

            // 중지종료일(12),
            if (field === stopEndDateIdx) {
                // 중지종료예상일자
                let stopEndFrcastDate = utils.toStringByFormat(grid.getValue(itemIndex, stopEndFrcastDateIdx), 'YYYY-MM-DD');

                const tmpOldValue = oldValue;

                let sead = utils.toStringByFormat(utils.addDay(stopEndFrcastDate, 1), 'YYYY-MM-DD');
                oldValue = _.isNil(oldValue) ? sead : oldValue;

                // 변경된 중지기간
                let changePeriod = utils.getDayOffset(newValue, oldValue);

                // 중지기간
                let prevStopPeriod = grid.getValue(itemIndex, stopPeriodIdx);
                let stopPeriod = Number(prevStopPeriod) + Number(changePeriod);

                if(stopPeriod <= 0) {
                    // 중지종료일이 중지시작일자보다 앞설 수 없습니다.
                    utils.messageBox('alert', this.$t("MSG_ALT_END_EARLY_SUSPENSION_START_DATE"));
                    grid.setValue(itemIndex, stopEndDateIdx, tmpOldValue);
                    return;
                }
                grid.setValue(itemIndex, stopPeriodIdx, stopPeriod);
                
                // 변경된 중지종료예상일자
                stopEndFrcastDate = utils.toStringByFormat(utils.addDay(stopEndFrcastDate, changePeriod), 'YYYY-MM-DD');
                grid.setValue(itemIndex, stopEndFrcastDateIdx, stopEndFrcastDate);

                // 예상만기일
                let stopEndAnticipateDate = utils.toStringByFormat(grid.getValue(itemIndex, stopEndAnticipateDateIdx), 'YYYY-MM-DD');
                    stopEndAnticipateDate = utils.toStringByFormat(utils.addDay(stopEndAnticipateDate, changePeriod), 'YYYY-MM-DD');
                grid.setValue(itemIndex, stopEndAnticipateDateIdx, stopEndAnticipateDate);

                // 입장기록 확인
                await this.getEntrHistory(grid, itemIndex, stopDateIdx, stopEndFrcastDateIdx);

                if (this.isEntr) {
                    // 입장기록이 있어 중지처리 불가합니다.
                    utils.messageBox('alert', this.$t('MSG_ALT_IS_ENTR_TRUE'));
                    return;
                }
            }

            grid.commit(true);
        },
        getEntrHistory(grid, itemIndex, stopDateIdx, stopEndFrcastDateIdx) {
            const stopDate = utils.toStringByFormat(grid.getValue(itemIndex, stopDateIdx), 'YYYYMMDD');
            const stopEndFrcastDate = utils.toStringByFormat(
                grid.getValue(itemIndex, stopEndFrcastDateIdx),
                'YYYYMMDD'
            );

            if (!_.isEmpty(stopDate) && !_.isEmpty(stopEndFrcastDate)) {
                console.debug(`${stopDate} ~ ${stopEndFrcastDate}`);

                let params = {
                    ticketNo: this.memshpInfo.ticketNo,
                    stopDate: stopDate,
                    stopEndFrcastDate: stopEndFrcastDate,
                };

                http.request(this.$options.name, 'DTS_JNT_00005', {
                    query: params,
                }).then((res) => {
                    if (res.data.entrCnt > 0) {
                        // 입장기록이 있어 중지처리 불가합니다.
                        utils.messageBox('alert', this.$t('MSG_ALT_IS_ENTR_TRUE'));
                        this.isEntr = true;
                    } else {
                        this.isEntr = false;
                    }
                });
            }
        },
        save() {
            let param = this.$refs.cardStopGrid.getJsonRows();

            console.debug(JSON.stringify(param));

            if (param.length == 0) {
                // 중지처리 대상 데이터가 없습니다.
                utils.messageBox('alert', this.$t('MSG_ALT_NO_DATA_STOP'));
                return;
            }

            let valid = true;
            _.each(param, (row) => {
                const stopDate = utils.toStringByFormat(row.stopDate, 'YYYYMMDD');
                const today = utils.now('YYYYMMDD');
                const period = utils.getDayOffset(stopDate, today);
                if(period > 0) {
                    // 오늘기준 미래일자는 불가합니다
                    utils.messageBox('alert', this.$t('MSG_ALT_REQ_NOT_TOMORROW'));
                    valid = false;
                    return;
                }

                if (_.isNull(row.stopEndFrcastDate)) {
                    // 중지종료예상일자는 필수값입니다.
                    utils.messageBox('alert', this.$t('MSG_ALT_REQ_STOP_END_DATE'));
                    valid = false;
                    return;
                }

                if (_.isNull(row.stopEndAnticipateDate)) {
                    // 예상만기일은 필수값입니다.
                    utils.messageBox('alert', this.$t('MSG_ALT_REQ_DUE_DATE'));
                    valid = false;
                    return;
                }

                if (_.isNull(row.stopReasonKind)) {
                    // 중지사유는 필수값입니다.
                    utils.messageBox('alert', this.$t('MSG_ALT_REQ_STOP_REASON'));
                    valid = false;
                    return;
                }

                if(_.isNil(row.remarkDesc)) {
                    // 비고는 필수값입니다.
                    utils.messageBox('alert', this.$t("MSG_ALT_REMARK_REQUIRE_VALUE"));
                    valid = false;
                    return;
                }

                if (!_.isNull(row.remarkDesc) && row.remarkDesc.length > 2000) {
                    // 비고란에 입력한 데이터가 너무 큽니다.
                    utils.messageBox('alert', this.$t('MSG_ALT_DATA_ENTER_TOO_LARGE'));
                    valid = false;
                    return;
                }

                if (this.isEntr) {
                    // 입장기록이 있어 중지처리 불가합니다.
                    utils.messageBox('alert', this.$t('MSG_ALT_IS_ENTR_TRUE'));
                    valid = false;
                    return;
                }
            });

            if (valid) {
                // 중지처리 하시겠습니까?
                utils.messageBox(
                    'confirm',
                    this.$t('MSG_ALT_WANT_STOP_PROCESS'),
                    null,
                    () => {
                        _.each(param, (row) => {
                            row.issueDate = utils.toStringByFormat(row.issueDate, 'YYYYMMDD');
                            row.expireDate = utils.toStringByFormat(row.expireDate, 'YYYYMMDD');
                            row.stopDate = utils.toStringByFormat(row.stopDate, 'YYYYMMDD');
                            row.stopEndFrcastDate = utils.toStringByFormat(row.stopEndFrcastDate, 'YYYYMMDD');
                            row.stopEndDate = utils.toStringByFormat(row.stopEndDate, 'YYYYMMDD');
                            row.stopEndAnticipateDate = utils.toStringByFormat(row.stopEndAnticipateDate, 'YYYYMMDD');
                        });

                        http.request(this.$options.name, 'DTS_JNT_00002', {
                            data: param,
                        }).then((res) => {
                            const resData = res.data;
                            if (resData.code == 'success') {
                                // 중지처리 되었습니다.
                                utils.messageBox('alert', this.$t('MSG_ALT_BEEN_STOP'));
                                this.search();
                            } else {
                                // 중지처리중 오류 발생하였습니다.
                                utils.messageBox('alert', this.$t('MSG_ALT_ERROR_STOP_PROCESS'));
                            }
                        });
                    },
                    () => {}
                );
            }
        },
        del() {
            const checkedIdxList = this.$refs.cardStopGrid.gridView.getCheckedRows(true);
            const gridRows = this.$refs.cardStopGrid.gridView.getJsonRows();

            if (checkedIdxList.length == 0) {
                // 중지처리해제 대상 데이터가 없습니다. 중지처리해제 대상 데이터를 체크해주세요.
                utils.messageBox('alert', this.$t('MSG_ALT_DATA_CANCEL_STOP_PROCESS'));
                return;
            }

            const param = _.reduce(
                checkedIdxList,
                (result, idx) => {
                    let { ticketStatus, ...data } = gridRows[idx];

                    const codeStop = 'C008'; // 중지
                    if (ticketStatus == codeStop) {
                        result.push(gridRows[idx]);
                    }

                    return result;
                },
                []
            );

            if (param.length < 1) {
                // 중지처리해제 대상 중 상태가 정상인 데이터가 있습니다.
                utils.messageBox('alert', this.$t('MSG_ALT_UNSTOP_TARGET'));
                return;
            }

            let confirm_msg = '';
            if (param.length > 1) {
                confirm_msg += this.$t('MSG_ALT_CANCEL_STOP_PROCESS'); // 중지종료일을 오늘날짜로 중지처리해제 하시겠습니까?
            } else {
                let row = param[0];

                confirm_msg += `${this.$t('MSG_TXT_EXPECT_DATE_SUSPENSE')}: ${utils.toStringByFormat(row.stopEndFrcastDate, 'YYYY-MM-DD')}\r\n`; // 중지종료예상일자:
                confirm_msg += `${this.$t('MSG_TXT_SUSPENSION_PERIOD')}: ${row.stopPeriod}\r\n`; // 중지기간:
                confirm_msg += `${this.$t('MSG_TXT_EXPECTE_DATE')}: ${utils.toStringByFormat(row.stopEndAnticipateDate, 'YYYY-MM-DD')}\r\n`; // 예상만기일
                confirm_msg += `${this.$t('MSG_TXT_END_DATE_SUSPENSE')}: ${utils.toStringByFormat(row.stopEndDate, 'YYYY-MM-DD')}\r\n`; // 중지종료일
                confirm_msg += this.$t('MSG_ALT_CANCEL_STOP_PROCESS'); // 중지종료일을 오늘날짜로 중지처리해제 하시겠습니까?
            }

            utils.messageBox(
                'confirm',
                confirm_msg,
                null,
                () => {
                    _.each(param, (row) => {
                        row.stopDate = utils.toStringByFormat(row.stopDate, 'YYYYMMDD');

                        // 종지종료일
                        let stopEndDate = utils.now('YYYYMMDD');
                        row.stopEndDate = stopEndDate;

                        // 예상만기일
                        let period = utils.getDayOffset(stopEndDate, row.stopEndFrcastDate);
                        period -= 1;
                        
                        let stopEndAnticipateDate = utils.addDay(row.stopEndAnticipateDate, period);
                        row.stopEndAnticipateDate = utils.toStringByFormat(stopEndAnticipateDate, 'YYYYMMDD');
                        row.stopEndFrcastDate = utils.toStringByFormat(row.stopEndFrcastDate, 'YYYYMMDD');
                    });

                    http.request(this.$options.name, 'DTS_JNT_00003', {
                        data: param,
                    }).then((res) => {
                        const resData = res.data;
                        if (resData.code == 'success') {
                            this.search();
                            // 중지처리해제 되었습니다.
                            utils.messageBox('alert', this.$t('MSG_ALT_CANCEL_STOP_PROCESS_END'));
                        } else {
                            // 중지처리해제중 오류 발생하였습니다.
                            utils.messageBox('alert', this.$t('MSG_ALT_ERROR_CANCEL_STOP_PROCESS'));
                        }
                    });
                },
                () => {}
            );
        },
        init() {
            this.srchFg = 'name';
            this.srchVal = null;
            this.memshpInfo = null;
        },
        initTi() {
            this.srchTiFg = 'name';
            this.srchTiVal = null;
            this.searchDateType = 'stopDate';
            this.dateValue = [];
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
