<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
                <!-- 조회일자 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SRCH_DT')"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                >
                    <ur-range-picker v-model="srchDt" init="today" autoConfirm />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button @click="initSrchField">{{
                        $t('MSG_BTN_RESET')
                    }}</ur-button
                    ><!-- 초기화 -->
                    <ur-button @click="search" v-permission:read="this.$options.name">{{
                        $t('MSG_TXT_SRCH')
                    }}</ur-button
                    ><!-- 조회 -->
                    <ur-button @click="excelDownload" color="violet" v-permission:excel="this.$options.name">{{
                        $t('MSG_TXT_EXCEL_DOWNLOAD')
                    }}</ur-button
                    ><!-- 엑셀다운로드 -->
                </div>
            </div>

<!-- S::tab -->
            <ur-tab-box ref="sad01Tab" class="mt35" @tab-change="onChangeTab">
                <ur-tab-content :idx="0" :label="$t('MSG_TIT_SA08_MNG')"/><!-- 일별집계 -->
                <ur-tab-content :idx="1" :label="$t('MSG_TIT_SA09_MNG')"/><!-- 일별집계상세 -->
            </ur-tab-box>
            <template>
                <div class="comm_title_wrap mt10">
                    <h4>{{ currentIdx === 0 ? $t('MSG_TIT_SA08_MNG') : $t('MSG_TIT_SA09_MNG')}}</h4><!-- 일별집계,일별집계상세 -->
                    <!--S:: 타이틀 오른쪽 total info -->
                    <div class="right_box">
                        <div class="totalNo">
                            <div class="totalCt">Total<span>{{ numberWithCommas(gridDataList.length) }}</span>{{ $t('MSG_TXT_CNT') }}</div>
                            <!--E:: 타이틀 오른쪽 total info -->
                        </div>
                    </div>
                </div>
                <real-grid
                    ref="dayAggGrid"
                    grid-id="pgeSad00001Grid1"
                    grid-root="/lib"
                    :gridLayout="gridLayout"
                    :gridFields="gridFields"
                    :gridColumns="gridColumns"
                    :gridRows="gridDataList"
                    :style="{ height: '480px' }"
                    :gridFooter="true"
                    :gridCheckBar="{ visible: false }"
                />
            </template>
            <!-- E::tab -->
            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
import moment from 'moment';

const DS_MAP = [
    'DTS_SAD_00001', // 일별집계
    'DTS_SAD_00002', // 일별집계상세
];

export default {
    name: 'PGE_SAD_00001',
    components: {}, // eslint-disable-line vue/name-property-casing
    computed: {
        gridLayout() {
            return [
                'ymdColumn',
                'itemTypeColumn',
                {
                    name: 'dummy1Column',
                    header: { text: this.$t('MSG_TXT_TOT_SALE_AMT2'), styleName: 'multi-line-css' } /* 총판매 금액 */,
                    items: ['totalSaleAmtColumn', 'tdexTotalSaleAmtColumn', 'tdTotalSaleAmtColumn'],
                },
                {
                    name: 'dummy2Column',
                    header: { text: this.$t('MSG_TXT_DAY_DIVD_DELAY'), styleName: 'multi-line-css' } /* 일분할 이연 */,
                    items: ['tdexTotalDepositAmtColumn', 'tdexTotalCardRqAmtColumn', 'tdexPenaltyAmtColumn'],
                },
                {
                    name: 'dummy3Column',
                    header: { text: this.$t('MSG_TXT_DAY_DIVD_TARG'), styleName: 'multi-line-css' } /* 일분할 대상 */,
                    items: ['tdTotalDepositAmtColumn', 'tdTotalCardRqAmtColumn', 'tdPenaltyAmtColumn'],
                },
                {
                    name: 'dummy4Column',
                    header: { text: this.$t('MSG_TXT_NET_SALE_ALL'), styleName: 'multi-line-css' } /* 순판매(전체) */,
                    items: ['resortNetAmtColumn', 'resortTaxAmtColumn'],
                },
                {
                    name: 'dummy5Column',
                    header: {
                        text: this.$t('MSG_TXT_NET_SALE_DAY_DIVD_TARG'),
                        styleName: 'multi-line-css',
                    } /* 순판매(일분할 대상) */,
                    items: ['tdResortNetAmtColumn', 'tdResortTaxAmtColumn'],
                },
                'preResortNetAmtColumn',
                'tdResortAmtColumn',
                'pretDivideAmtColumn',
                'todayDivideAmtColumn',
                'totDivideAmtColumn',
                'tdTodaySaleAmtColumn',
                'todayResortArAmtColumn',
                'tdexResortArAmtColumn',
                'totArAmtColumn',
                'cumulDivideAmtColumn',
                'totalDivideAmtColumn',
                'divideDaysColumn',
                'saleCheckColumn'
            ]
        },
        gridColumns() {
            return [
                {
                    name: 'ymdColumn',
                    fieldName: 'ymd',
                    width: 100,
                    header: { text: this.$t('MSG_TXT_DT') },
                    edit: false,
                    datetimeFormat: 'yyyy/MM/dd',
                    footer: { text: this.$t('MSG_TXT_SUM'), styleName: 'align-center' },
                    mergeRule: { criteria: 'value' },
                } /* 일자 */,
                {
                    name: 'itemTypeColumn',
                    fieldName: 'itemType',
                    width: 100,
                    header: { text: this.$t('MSG_TXT_DIV') },
                    edit: false,
                    groupFooter: { text: this.$t('MSG_TXT_SUM'), styleName: 'align-center' },
                    visible: this.currentIdx == 0 ? false : true
                } /* 구분 */,
                {
                    name: 'dummy1Column',
                    fieldName: 'dummy1Column',
                    width: 100,
                    header: { text: this.$t('MSG_TXT_TOT_SALE_AMT2'), styleName: 'multi-line-css' },
                    edit: false,
                } /* 총판매 금액 */,
                {
                    name: 'dummy2Column',
                    fieldName: 'dummy2Column',
                    width: 100,
                    header: { text: this.$t('MSG_TXT_DAY_DIVD_DELAY'), styleName: 'multi-line-css' },
                    edit: false,
                } /* 일분할 이연 */,
                {
                    name: 'dummy3Column',
                    fieldName: 'dummy3Column',
                    width: 100,
                    header: { text: this.$t('MSG_TXT_DAY_DIVD_TARG'), styleName: 'multi-line-css' },
                    edit: false,
                } /* 일분할 대상 */,
                {
                    name: 'dummy4Column',
                    fieldName: 'dummy4Column',
                    width: 100,
                    header: { text: this.$t('MSG_TXT_NET_SALE_ALL'), styleName: 'multi-line-css' },
                    edit: false,
                } /* 순판매(전체) */,
                {
                    name: 'dummy5Column',
                    fieldName: 'dummy5Column',
                    width: 100,
                    header: { text: '순판매\n(일분할 대상)', styleName: 'multi-line-css' },
                    edit: false,
                },
                {
                    name: 'totalSaleAmtColumn',
                    fieldName: 'totalSaleAmt',
                    width: 100,
                    header: { text: 'ⓐ합계' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'tdexTotalSaleAmtColumn',
                    fieldName: 'tdexTotalSaleAmt',
                    width: 100,
                    header: { text: '당일판매\n(일분할제외)', styleName: 'multi-line-css' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'tdTotalSaleAmtColumn',
                    fieldName: 'tdTotalSaleAmt',
                    width: 100,
                    header: { text: 'ⓐ1당일판매\n(일분할대상)', styleName: 'multi-line-css' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'tdexTotalDepositAmtColumn',
                    fieldName: 'tdexTotalDepositAmt',
                    width: 100,
                    header: { text: 'ⓑ예수금' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'tdexTotalCardRqAmtColumn',
                    fieldName: 'tdexTotalCardRqAmt',
                    width: 100,
                    header: { text: 'ⓒ제휴\n청구액', styleName: 'multi-line-css' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'tdexPenaltyAmtColumn',
                    fieldName: 'tdexPenaltyAmt',
                    width: 100,
                    header: { text: 'ⓓ위약금' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'tdTotalDepositAmtColumn',
                    fieldName: 'tdTotalDepositAmt',
                    width: 100,
                    header: { text: 'ⓑ1예수금' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'tdTotalCardRqAmtColumn',
                    fieldName: 'tdTotalCardRqAmt',
                    width: 100,
                    header: { text: 'ⓒ1제휴\n청구액', styleName: 'multi-line-css' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'tdPenaltyAmtColumn',
                    fieldName: 'tdPenaltyAmt',
                    width: 100,
                    header: { text: 'ⓓ1위약금' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'resortNetAmtColumn',
                    fieldName: 'resortNetAmt',
                    width: 100,
                    header: { text: '①(신규)순판매금액\n(ⓐ-ⓑ+ⓒ-ⓓ\n-ⓑ1+ⓒ1-ⓓ1)', styleName: 'multi-line-css' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'resortTaxAmtColumn',
                    fieldName: 'resortTaxAmt',
                    width: 100,
                    header: { text: '②부가세\n(①/1.1)', styleName: 'multi-line-css' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'tdResortNetAmtColumn',
                    fieldName: 'tdResortNetAmt',
                    width: 100,
                    header: { text: '①A순판매금액\n(ⓐ1-ⓑ1+ⓒ1-ⓓ1)', styleName: 'multi-line-css' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'tdResortTaxAmtColumn',
                    fieldName: 'tdResortTaxAmt',
                    width: 100,
                    header: { text: '②A부가세\n(①A/1.1)', styleName: 'multi-line-css' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'preResortNetAmtColumn',
                    fieldName: 'preResortNetAmt',
                    width: 100,
                    header: { text: '③A기존판매\n(일분할 대상)', styleName: 'multi-line-css' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'tdResortAmtColumn',
                    fieldName: 'tdResortAmt',
                    width: 100,
                    header: { text: '③B당일판매\n(일분할대상)\n(①A-②A)', styleName: 'multi-line-css' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'pretDivideAmtColumn',
                    fieldName: 'pretDivideAmt',
                    width: 100,
                    header: { text: '④A기존판매\n당일분할금액\n(③A/ⓝ)', styleName: 'multi-line-css' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'todayDivideAmtColumn',
                    fieldName: 'todayDivideAmt',
                    width: 100,
                    header: { text: '④B당일\n분할금액\n(③B/ⓝ)', styleName: 'multi-line-css' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'totDivideAmtColumn',
                    fieldName: 'totDivideAmt',
                    width: 100,
                    header: { text: '④당일분할금액\n합계\n(④A+④B)', styleName: 'multi-line-css' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'tdTodaySaleAmtColumn',
                    fieldName: 'tdTodaySaleAmt',
                    width: 100,
                    header: { text: '⑤가입매출' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'todayResortArAmtColumn',
                    fieldName: 'todayResortArAmt',
                    width: 100,
                    header: {
                        text: '⑥A당일판매\n일분할 대상\n선수금 이체\n(③B-④B-⑤)',
                        styleName: 'multi-line-css',
                    },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'tdexResortArAmtColumn',
                    fieldName: 'tdexResortArAmt',
                    width: 100,
                    header: { text: '⑥B당일판매\n일분할 제외\n선수금 이체\n①-②-③B', styleName: 'multi-line-css' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'totArAmtColumn',
                    fieldName: 'totArAmt',
                    width: 100,
                    header: { text: '⑥당일판매\n선수금 이체 합계\n⑥A+⑥B', styleName: 'multi-line-css' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'cumulDivideAmtColumn',
                    fieldName: 'cumulDivideAmt',
                    width: 100,
                    header: { text: '⑦누적 선수금\n매출이체', styleName: 'multi-line-css' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'totalDivideAmtColumn',
                    fieldName: 'totalDivideAmt',
                    width: 100,
                    header: { text: '매출계\n(④+⑤+⑦)', styleName: 'multi-line-css' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'divideDaysColumn',
                    fieldName: 'divideDays',
                    width: 100,
                    header: { text: 'ⓝ가용일수\n(일분할 N값)', styleName: 'multi-line-css' },
                    edit: false,
                    numberFormat: '#,##0',
                    footer: { expression: 'sum', numberFormat: '#,##0' },
                    groupFooter: { expression: 'sum', numberFormat: '#,##0' },
                },
                {
                    name: 'saleCheckColumn',
                    fieldName: 'saleCheck',
                    width: 100,
                    header: { text: this.$t('MSG_TXT_CONSISTENCY') },
                    edit: false,
                } /* 정합성 */,
            ]
        }
    },
    data() {
        return {
            srchDt: ['', ''],
            currentIdx: 0,
            gridFields: [
                { fieldName: 'ymd', dataType: 'datetime', datetimeFormat: 'yyyyMMdd' },
                { fieldName: 'itemType', dataType: 'text' },
                { fieldName: 'totalSaleAmt', dataType: 'number' },
                { fieldName: 'tdexTotalSaleAmt', dataType: 'number' },
                { fieldName: 'tdTotalSaleAmt', dataType: 'number' },
                { fieldName: 'tdexTotalDepositAmt', dataType: 'number' },
                { fieldName: 'tdexTotalCardRqAmt', dataType: 'number' },
                { fieldName: 'tdexPenaltyAmt', dataType: 'number' },
                { fieldName: 'tdTotalDepositAmt', dataType: 'number' },
                { fieldName: 'tdTotalCardRqAmt', dataType: 'number' },
                { fieldName: 'tdPenaltyAmt', dataType: 'number' },
                { fieldName: 'resortNetAmt', dataType: 'number' },
                { fieldName: 'resortTaxAmt', dataType: 'number' },
                { fieldName: 'tdResortNetAmt', dataType: 'number' },
                { fieldName: 'tdResortTaxAmt', dataType: 'number' },
                { fieldName: 'preResortNetAmt', dataType: 'number' },
                { fieldName: 'tdResortAmt', dataType: 'number' },
                { fieldName: 'pretDivideAmt', dataType: 'number' },
                { fieldName: 'todayDivideAmt', dataType: 'number' },
                { fieldName: 'totDivideAmt', dataType: 'number' },
                { fieldName: 'tdTodaySaleAmt', dataType: 'number' },
                { fieldName: 'todayResortArAmt', dataType: 'number' },
                { fieldName: 'tdexResortArAmt', dataType: 'number' },
                { fieldName: 'totArAmt', dataType: 'number' },
                { fieldName: 'cumulDivideAmt', dataType: 'number' },
                { fieldName: 'totalDivideAmt', dataType: 'number' },
                { fieldName: 'divideDays', dataType: 'number' },
                { fieldName: 'saleCheck', dataType: 'text' }
            ],
            gridDataList: [],
        };
    },
    created() {},
    mounted() {
        // 셀 커스텀 스타일 적용
        /* this.$refs.dayAggGrid.gridView.setCellStyleCallback(function (grid, dataCell) {
            var ret = {};
            if (grid.getJsonRows()[dataCell._index.itemIndex].checkResult == 1) {
                ret.styleName = 'SAD0001-font-color-red';
                ret.editable = false;
            }
            return ret;
        }); */

        let header = this.$refs.dayAggGrid.gridView.getHeader();
        header.heights = [40, 65];
        this.$refs.dayAggGrid.gridView.setHeader(header);

        this.initSrchField();
    },
    methods: {
        initSrchField() {
            const currentDate = moment(new Date()).format('YYYY-MM-DD');
            this.srchDt = [currentDate, currentDate];
        },
        search() {
            this.currentIdx = 0;
            this.$refs.sad01Tab.setIdx(this.currentIdx);
        },
        searchTab(dsId) {
            if (this.invalidDate(this.srchDt)) {
                return;
            }

            const params = {
                startDate: this.srchDt[0].replace(/-/g, ''),
                endDate: this.srchDt[1].replace(/-/g, ''),
            };
            http.request('PGE_SAD_00001', dsId, {
                query: params,
            })
                .then((res) => {
                    this.gridDataList = [];
                    if (res?.data?.length > 0) {
                        this.gridDataList = res.data;
                    } else {
                        utils.messageBox('alert', this.$t('MSG_ALT_NO_DATA')); /* 데이터가 존재하지 않습니다. */
                    }
                })
                .catch((e) => {
                    this.gridDataList = [];
                })
                .finally(() => {
                    // this.gridDataList.forEach((v) => (v.checkResultStr = v.checkResult == 0 ? '정상' : '오류'));
                    this.$refs.dayAggGrid.setRows(this.gridDataList);
                });
        },
        excelDownload() {
            if (this.$refs.dayAggGrid.getJsonRows().length == 0) {
                // 조회된 데이터가 없습니다.
                utils.messageBox('alert', this.$t('MSG_ALT_NO_SERACH_DATA'));
                return;
            }

            let fileName =
                this.currentIdx === 0
                    ? this.$t('MSG_TIT_SA08_MNG')
                    : this.$t('MSG_TIT_SA09_MNG'); /* 일별집계,일별집계상세 */
            this.$refs.dayAggGrid.getExcelDownload(fileName, 'PGE_SAD_00001');
        },
        invalidDate(date) {
            const _DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
            if (!_DATE_REGEX.test(date[0])) {
                utils.messageBox(
                    'alert',
                    utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_START_DATE'))
                ); // 시작일자는 필수
                return true;
            }

            if (!_DATE_REGEX.test(date[1])) {
                utils.messageBox(
                    'alert',
                    utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_END_DATE'))
                ); // 종료일자는 필수
                return true;
            }

            const toDate = moment(date[1], 'YYYY-MM-DD');
            const fromDate = moment(date[0], 'YYYY-MM-DD').add(1, 'year');

            if (!toDate.isBefore(fromDate)) {
                utils.messageBox('alert', '기간은 12개월을 초과할 수 없습니다.');
                return true;
            }
        },
        onChangeTab(idx) {
            this.currentIdx = idx
            this.$refs.dayAggGrid.gridView.groupBy(this.currentIdx == 0 ? [] : ['ymd'])

            this.gridDataList = []
            this.$refs.dayAggGrid.setRows(this.gridDataList);

            this.searchTab(DS_MAP[idx]);
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
<style scoped>
::v-deep .ur-tab__content-wrapper {
  height: 0px;
}
::v-deep .multi-line-css {
    white-space: pre;
}
::v-deep .SAD0001-font-color-red {
    color: red;
}
</style>
