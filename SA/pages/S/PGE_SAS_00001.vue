<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
                <!-- 조회기간 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SRCH_DT')"
                    required
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-range-picker v-model="srchObj.srchDt" init="today" autoConfirm />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="POS ID" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-dropdown v-model="srchObj.srchPosId" :items="posList" />
                </ur-form-item>
            </ur-form-box>

            <div class="btn_wrap mt10">
                <div class="right_box">
                    <!-- 초기화 -->
                    <ur-button @click="initSrchField">{{
                        $t('MSG_BTN_INITIALIZE')
                    }}</ur-button>
                    <!-- 초기화 -->
                    <ur-button @click="search" v-permission:read="this.$options.name">{{
                        $t('MSG_TXT_SRCH')
                    }}</ur-button>
                    <!-- 조회 -->
                    <ur-button color="violet" @click="excelDownload" v-permission:excel="this.$options.name"
                        >{{ $t('MSG_TXT_EXCEL_DOWNLOAD') }}
                    </ur-button>
                    <!-- 엑셀다운로드 -->
                </div>
            </div>

            <div class="comm_title_wrap mt25">
                <h4>{{ $t('MSG_TIT_SA10_MNG') }}</h4>
                <!-- 판매상세조회 -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">
                            {{ $t('MSG_TXT_COM_TOT') }}<span>{{ numberWithCommas(gridDataList.length) }}</span
                            >{{ $t('MSG_TXT_CNT') }}
                        </div>
                        <!-- 총 *건 -->
                    </div>
                </div>
            </div>
            <!-- S::컨텐츠1 -->
            <real-grid
                ref="grid"
                grid-id="pgeSas00001Grid"
                grid-root="/lib"
                :gridFields="gridFields"
                :gridColumns="gridColumns"
                :gridRows="gridDataList"
                :gridCellClick="onCellClick"
                :style="{ height: '400px' }"
            />
            <!-- E::컨텐츠1-->

            <div class="board_list_type2" style="border-top: none">
                <table>
                    <caption></caption>
                    <colgroup>
                        <col width="*" />
                        <col width="*" />
                        <col width="*" />
                        <col width="*" />
                        <col width="*" />
                        <col width="*" />
                        <col width="*" />
                        <col width="*" />
                        <col width="*" />
                        <col width="*" />
                        <col width="*" />
                        <col width="*" />
                        <col width="*" />
                        <col width="*" />
                        <col width="*" />
                    </colgroup>
                    <tfoot>
                        <!-- 판매 -->
                        <tr>
                            <td rowspan="3"></td>
                            <td rowspan="3"></td>
                            <td rowspan="3"></td>
                            <td rowspan="3"></td>
                            <td rowspan="3"></td>
                            <td rowspan="3"></td>
                            <td>{{ $t('MSG_TXT_SALE') }}</td>
                            <td class="right">{{ numberWithCommas(totSale.inwonCnt) }}</td>
                            <td class="right">{{ numberWithCommas(totSale.saleAmt) }}</td>
                            <td class="right">{{ numberWithCommas(totSale.realAmt) }}</td>
                            <td class="right"></td>
                            <td class="right" rowspan="3"></td>
                            <td class="right">{{ numberWithCommas(totSale.paymntCnt) }}</td>
                            <td class="right">{{ numberWithCommas(totSale.paymntAmt) }}</td>
                            <td class="right" rowspan="3"></td>
                        </tr>
                        <!-- 환불 -->
                        <tr>
                            <td>{{ $t('MSG_TXT_RETURN') }}</td>
                            <td class="right">{{ numberWithCommas(totRefund.inwonCnt) }}</td>
                            <td class="right">{{ numberWithCommas(totRefund.saleAmt) }}</td>
                            <td class="right">{{ numberWithCommas(totRefund.realAmt) }}</td>
                            <td class="right">{{ numberWithCommas(totRefund.penaltyAmt) }}</td>
                            <td class="right">{{ numberWithCommas(totRefund.paymntCnt) }}</td>
                            <td class="right">{{ numberWithCommas(totRefund.paymntAmt) }}</td>
                        </tr>
                        <!-- 매출 -->
                        <tr>
                            <td>{{ $t('MSG_TXT_AMT') }}</td>
                            <td class="right">
                                {{ numberWithCommas(totSale.inwonCnt - totRefund.inwonCnt) }}
                            </td>
                            <td class="right">
                                {{ numberWithCommas(totSale.saleAmt - totRefund.saleAmt) }}
                            </td>
                            <td class="right">
                                {{ numberWithCommas(totSale.realAmt - totRefund.realAmt) }}
                            </td>
                            <td class="right"></td>
                            <td class="right">
                                {{ numberWithCommas(totSale.paymntCnt - totRefund.paymntCnt) }}
                            </td>
                            <td class="right">
                                {{ numberWithCommas(totSale.paymntAmt - totRefund.paymntAmt) }}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <!-- E::board_list_type2 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
import moment from 'moment';
import _ from 'lodash'
export default {
    name: 'PGE_SAS_00001',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            srchObj: {
                srchDt: ['', ''], // 조회일자(From), 조회일자(To)
                srchPosId: '',
            },
            posList: [],
            gridFields: [
                {
                    fieldName: 'paymntDate',
                    dataType: 'datetime',
                    datetimeFormat: 'yyyyMMdd',
                }, // 결제일자
                {
                    fieldName: 'paymntTime',
                    dataType: 'datetime',
                    datetimeFormat: 'HHmmss',
                }, // 결제시간
                { fieldName: 'receiptNoSmry', dataType: 'text' }, // 영수증번호(약식)
                { fieldName: 'ticketNo', dataType: 'text' }, // 정기권번호
                { fieldName: 'name', dataType: 'text' }, // 결제자
                { fieldName: 'saleKindName', dataType: 'text' }, // 판매구분
                { fieldName: 'inwonCnt', dataType: 'number' }, // 인원
                { fieldName: 'saleAmt', dataType: 'number' }, // 결제총액
                { fieldName: 'realAmt', dataType: 'number' }, // 판매총액
                { fieldName: 'penaltyAmt', dataType: 'number' }, // 위약금
                { fieldName: 'paymntKindName', dataType: 'text' }, // 결제수단
                { fieldName: 'paymntCnt', dataType: 'number' }, // 결제건수
                { fieldName: 'paymntAmt', dataType: 'number' }, // 결제금액
                { fieldName: 'receiptNo', dataType: 'text' }, // 영수증번호
                { fieldName: 'orgReceiptNo', dataType: 'text' }, // 원거래번호
            ],

            gridColumns: [
                {
                    // 결제일자
                    name: 'paymntDateColumn',
                    fieldName: 'paymntDate',
                    width: 90,
                    header: {
                        text: this.$t('MSG_TXT_PAY_DATE'),
                    },
                    mergeRule: { criteria: "values['receiptNo'] + value" },
                    datetimeFormat: 'yyyy/MM/dd',
                    edit: false,
                    // sortable: false,
                },
                {
                    // 결제시간
                    name: 'paymntTimeColumn',
                    fieldName: 'paymntTime',
                    width: 80,
                    header: {
                        text: this.$t('MSG_TXT_PAY_TIME'),
                    },
                    mergeRule: { criteria: "values['receiptNo'] + value" },
                    datetimeFormat: 'HH:mm:ss',
                    edit: false,
                    // sortable: false,
                },
                {
                    // 영수증번호(약식)
                    name: 'receiptNoSmryColumn',
                    fieldName: 'receiptNoSmry',
                    styleName: 'popup_render',
                    width: 150,
                    header: {
                        text: this.$t('MSG_TXT_RECIPT_NO_INFORM'),
                    },
                    mergeRule: { criteria: 'value' },
                    edit: false,
                },
                {
                    // 정기권번호
                    name: 'ticketNoColumn',
                    fieldName: 'ticketNo',
                    width: 100,
                    mergeRule: { criteria: 'value' },
                    header: {
                        text: this.$t('MSG_TXT_SEASON_NO'),
                    },
                    edit: false,
                    // sortable: false,
                },
                {
                    // 결제자
                    name: 'nameColumn',
                    fieldName: 'name',
                    width: 100,
                    header: {
                        text: this.$t('MSG_TXT_PAYER'),
                    },
                    mergeRule: { criteria: "values['receiptNo'] + value" },
                    edit: false,
                    // sortable: false,
                },
                {
                    // 판매구분
                    name: 'saleKindNameColumn',
                    fieldName: 'saleKindName',
                    width: 80,
                    header: {
                        text: this.$t('MSG_TXT_SALE_FG'),
                    },
                    mergeRule: { criteria: "values['receiptNo'] + value" },
                    edit: false,
                    // sortable: false,
                },
                {
                    // 인원
                    name: 'inwonCntColumn',
                    fieldName: 'inwonCnt',
                    numberFormat: '#,##0',
                    width: 50,
                    header: {
                        text: this.$t('MSG_TXT_PERSONS'),
                    },
                    edit: false,
                    // sortable: false,
                    mergeRule: { criteria: "values['receiptNo'] + value" },
                    styleName: 'align-right',
                },
                {
                    // 결제총액
                    name: 'saleAmtColumn',
                    fieldName: 'saleAmt',
                    numberFormat: '#,##0',
                    width: 100,
                    header: {
                        text: this.$t('MSG_TXT_PAY_TOT'),
                    },
                    edit: false,
                    // sortable: false,
                    mergeRule: { criteria: "values['receiptNo'] + value" },
                    styleName: 'align-right',
                },
                {
                    // 판매총액
                    name: 'realAmtColumn',
                    fieldName: 'realAmt',
                    numberFormat: '#,##0',
                    width: 100,
                    header: {
                        text: this.$t('MSG_TXT_SALE_TOT'),
                    },
                    edit: false,
                    // sortable: false,
                    mergeRule: { criteria: "values['receiptNo'] + values['ticketNo'] + value" },
                    styleName: 'align-right',
                },
                {
                    // 위약금
                    name: 'penaltyAmtColumn',
                    fieldName: 'penaltyAmt',
                    numberFormat: '#,##0',
                    width: 100,
                    header: {
                        text: this.$t('MSG_TXT_PENALTY'),
                    },
                    edit: false,
                    // sortable: false,
                    mergeRule: { criteria: "values['receiptNo'] + value" },
                    styleName: 'align-right',
                },
                {
                    // 결제수단
                    name: 'paymntKindNameColumn',
                    fieldName: 'paymntKindName',
                    width: 100,
                    header: {
                        text: this.$t('MSG_TXT_PAY_METHOD'),
                    },
                    // sortable: false,
                    mergeRule: { criteria: "values['receiptNo'] + value" },
                    edit: false,
                },
                {
                    // 결제건수
                    name: 'paymntCntColumn',
                    fieldName: 'paymntCnt',
                    numberFormat: '#,##0',
                    width: 60,
                    header: {
                        text: this.$t('MSG_TXT_PAY_CNT'),
                    },
                    // sortable: false,
                    mergeRule: { criteria: "values['receiptNo'] + values['paymntKindName'] + value" },
                    edit: false,
                    styleName: 'align-right',
                },
                {
                    // 결제금액
                    name: 'paymntAmtColumn',
                    fieldName: 'paymntAmt',
                    numberFormat: '#,##0',
                    width: 100,
                    header: {
                        text: this.$t('MSG_TXT_PAY_AMT'),
                    },
                    // sortable: false,
                    mergeRule: { criteria: "values['receiptNo'] + values['paymntKindName'] + value" },
                    edit: false,
                    styleName: 'align-right',
                },
                {
                    // 원거래번호
                    name: 'orgReceiptNoColumn',
                    fieldName: 'orgReceiptNo',
                    width: 120,
                    styleName: 'popup_render',
                    header: {
                        text: this.$t('MSG_TXT_ORG_NO'),
                    },
                    edit: false,
                    mergeRule: { criteria: "values['receiptNo'] + value" },
                    // sortable: false,
                    renderer: {
                        showTooltip: true,
                    },
                },
            ],
            gridDataList: [],
            sale: {},
            refund: {},
        };
    },
    computed: {
        totSale() {
            return this.gridDataList
                .filter((v) => v.saleKind != 'S004')
                .reduce(
                    (acc, v, i, t) => {
                        const findReceiptNo = t.findIndex((o) => o.receiptNo == v.receiptNo) == i
                        const findTicketNo = t.findIndex((o) => o.receiptNo == v.receiptNo && o.ticketNo == v.ticketNo) == i
                        const findPayKind = t.findIndex((o) => o.receiptNo == v.receiptNo && o.paymntKindName == v.paymntKindName) == i
                        acc.inwonCnt += (findReceiptNo ? v.inwonCnt : 0);
                        acc.saleAmt += (findReceiptNo ? v.saleAmt : 0);
                        acc.realAmt += (findTicketNo ? v.realAmt : 0);
                        acc.paymntCnt += (findPayKind ? v.paymntCnt : 0);
                        acc.paymntAmt += (findPayKind ? v.paymntAmt : 0);
                        return acc;
                    },
                    { inwonCnt: 0, saleAmt: 0, realAmt: 0, paymntCnt: 0, paymntAmt: 0 }
                );
        },
        totRefund() {
            return this.gridDataList
                .filter((v) => v.saleKind == 'S004')
                .reduce(
                    (acc, v, i, t) => {
                        const findReceiptNo = t.findIndex((o) => o.receiptNo == v.receiptNo) == i
                        const findTicketNo = t.findIndex((o) => o.receiptNo == v.receiptNo && o.ticketNo == v.ticketNo) == i
                        const findPayKind = t.findIndex((o) => o.receiptNo == v.receiptNo && o.paymntKindName == v.paymntKindName) == i
                        acc.inwonCnt += (findReceiptNo ? v.inwonCnt : 0);
                        acc.saleAmt += (findReceiptNo ? v.saleAmt : 0);
                        acc.realAmt += (findTicketNo ? v.realAmt : 0);
                        acc.penaltyAmt += (findReceiptNo ? v.penaltyAmt : 0);
                        acc.paymntCnt += (findPayKind ? v.paymntCnt : 0);
                        acc.paymntAmt += (findPayKind ? v.paymntAmt : 0);
                        return acc;
                    },
                    { inwonCnt: 0, saleAmt: 0, realAmt: 0, penaltyAmt: 0, paymntCnt: 0, paymntAmt: 0 }
                );
        },
    },
    watch: {},
    created() {},
    mounted() {
        http.request(this.$options.name, 'DTS_SAS_00002', {}).then((res) => {
            res.data.unshift({ value: '', text: this.$t('MSG_TXT_ALL') });
            this.posList = res.data;
        });
    },
    methods: {
        initSrchField() {
            const currentDate = moment(new Date()).format('YYYY-MM-DD');
            this.srchObj.srchDt = [currentDate, currentDate];
            this.srchObj.srchPosId = '';
        },
        initDataField() {
            this.gridDataList = [];
            this.$refs.grid.setRows(this.gridDataList);
            this.sale = {};
            this.refund = {};
        },
        search() {
            if (this.invalidDate(this.srchObj.srchDt)) {
                return;
            }

            const _PARAMS = {
                srchStartDt: this.srchObj.srchDt[0].replace(/-/g, ''),
                srchEndDt: this.srchObj.srchDt[1].replace(/-/g, ''),
                srchPosId: this.srchObj.srchPosId,
            };

            let promiseList = [];
            http.request(this.$options.name, 'DTS_SAS_00001', { query: _PARAMS })
                .then((res) => {
                    if (res.data) {
                        if (res.data.length <= 0) {
                            utils.messageBox('alert', '데이터가 존재하지 않습니다.');
                            this.initDataField();
                            return;
                        }

                        this.gridDataList = res.data;

                        /* 결제수단 표현을 위한 데이터 재조합 */
                        let skipEndIdx = -1
                        this.gridDataList.forEach((data,idx,self) => {
                            const sameReceiptArr = self.filter(v => v.receiptNo == data.receiptNo)
                            const samePaymntKindArr = sameReceiptArr.filter(v => v.paymntKindName == data.paymntKindName)
                            if (samePaymntKindArr.length > 1 && skipEndIdx <= idx) {
                                const paymntKindCnt = sameReceiptArr.length / samePaymntKindArr.length
                                const paymntKindArr = _.cloneDeep(self.slice(idx, idx + paymntKindCnt))
                                sameReceiptArr.forEach((v,i) => {
                                    const temp = paymntKindArr[Math.floor(i / samePaymntKindArr.length)]
                                    self[idx+i].paymntKindName = temp.paymntKindName
                                    self[idx+i].paymntCnt = temp.paymntCnt
                                    self[idx+i].paymntAmt = temp.paymntAmt
                                })
                                skipEndIdx = idx + sameReceiptArr.length
                            }
                        })

                        this.$refs.grid.setRows(this.gridDataList);
                        this.gridDataList.forEach((row) => {
                            // 그리드데이터
                            this.getMemshpName(row).then((result) => {
                                promiseList.push(result);
                                Promise.all(promiseList).then((data) => {}).finally(() => {
                                    this.$refs.grid.setRows(this.gridDataList);
                                });
                            });
                        });
                    }
                })
                .catch((error) => console.log(error));
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
            const fromDate = moment(date[0], 'YYYY-MM-DD').add(1, 'month');

            if (!toDate.isBefore(fromDate)) {
                utils.messageBox('alert', '기간은 1개월을 초과할 수 없습니다.');
                return true;
            }

            return false;
        },

        // cell click
        onCellClick(grid, data) {data.itemIndex
            // const row = grid.getJsonRows()[data.dataRow]
            const row = grid.getJsonRows()[data.itemIndex]
            let receiptNo = ''
            if (data.fieldIndex == 2) {
                receiptNo = row.receiptNo 
            } else if (data.fieldIndex == 14) {
                receiptNo = row.orgReceiptNo
            }

            if (!receiptNo) {
                return
            }

            const queryString = `receiptNo=${receiptNo}`
            utils.openWindowPopup('PGE_SAA_00001', queryString)
        },

        numberWithCommas(number) {
            return (number || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },

        excelDownload() {
            if (this.$refs.grid.getJsonRows().length == 0) {
                // 조회된 데이터가 없습니다.
                utils.messageBox('alert', this.$t('MSG_ALT_NO_SERACH_DATA'));
                return;
            }
            // 판매상세 조회
            this.$refs.grid.getExcelDownload(this.$t('MSG_TIT_SA10_MNG'), 'PGE_SAS_00001');
        },

        getMemshpName(row) {
            return new Promise((resolve, reject) => {
                const memshpUid = row.payerMemshpUid;
                http.request(
                    this.$options.name,
                    'DTS_CTM_00010',
                    {
                        query: {
                            memshpUid: memshpUid,
                        },
                    },
                    true
                ).then((res) => {
                    if (res.data?.name) {
                        row.name = this.maskingName(res.data.name);
                    }
                    resolve(row);
                });
            });
        },

        maskingName(name) {
            let maskingName = name.length == 2 ? name.replace(name.substring(1, 2), '*') : name;
            if (name.length > 2) {
                maskingName = name[0] + '*'.repeat(name.substring(1, name.length - 1).length) + name[name.length - 1];
            }
            return maskingName;
        },
    },
};
</script>
<style scoped></style>
