<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
                <!-- 영수증번호 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_RECEIPT_NO')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field
                        ref="receiptNo"
                        v-model="srchObj.receiptNo"
                        class="ur-text-field__input input-text-saa00001"
                        maxlength="24"
                        style="width: 100%"
                        @keyup="receiptNoTextFieldKeyup"
                        :mask="'NNNNNNNNNNNNNNNNNNNNNNNN'"
                    />
                </ur-form-item>
                <!-- 결제일자 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_PAY_DATE')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-date-picker v-model="srchObj.saleYmd" autoConfirm />
                    <ur-icon-button icon="search" @click="onPayInfoPopupClick" />
                </ur-form-item>
                <!-- 검색조건 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SEARCH_CONDITION')"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                >
                    <div class="radioForm">
                        <!-- 성명 -->
                        <ur-radio v-model="srchFg" name="incondi" value="name" sm @click="clickRadio('name')">{{
                            $t('MSG_TXT_EMPL_NM')
                        }}</ur-radio>
                        <ur-radio
                            v-model="srchFg"
                            name="incondi"
                            value="mobileTel"
                            sm
                            @click="clickRadio('mobileTel')"
                            >{{ $t('MSG_TXT_CELL_PHONE') }}</ur-radio
                        ><!-- 휴대폰 -->
                        <!-- 정기권번호 -->
                        <ur-radio v-model="srchFg" name="incondi" value="ticketNo" sm @click="clickRadio('ticketNo')">{{
                            $t('MSG_TXT_TICKET_NO')
                        }}</ur-radio>
                    </div>
                    <ur-text-field
                        ref="refSrchVal"
                        v-model="srchVal"
                        :disabled="isSrchValDisabled"
                        :trim="true"
                        @keyup="textFieldKeyup"
                        class="pl16"
                        :maxlength="10"
                        :mask="inputMask"
                    />
                    <ur-icon-button icon="search" @click="searchMember" />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button @click="initSrchField">{{ $t('MSG_BTN_RESET') }}</ur-button
                    ><!-- 초기화 -->
                    <ur-button
                        color="violet"
                        @click="onClickSearch(srchObj.receiptNo)"
                        v-permission:read="this.$options.name"
                        >{{ $t('MSG_TXT_SRCH') }}</ur-button
                    ><!-- 조회 -->
                </div>
            </div>

            <!-- S::영수증번호+결제정보 -->
            <div class="comm_shut_wrap mt25">
                <div class="inbox3">
                    <div class="comm_title_wrap">
                        <h4 class="pr10">{{ $t('MSG_TXT_RECEIPT_NO') }}</h4>
                        <!-- 영수증번호 -->
                    </div>
                    <real-grid
                        ref="receiptGrid"
                        grid-id="pgeSaa00001"
                        grid-root="/lib"
                        :gridFields="receiptFields"
                        :gridColumns="receiptColumns"
                        :gridRows="receiptList"
                        :selectionStyle="'rows'"
                        :style="{ height: '477px' }"
                        :gridCheckBar="{ visible: false }"
                    />
                </div>
                <div class="emptybox" />
                <div class="inbox7">
                    <div class="comm_title_wrap">
                        <h4 class="pr10">{{ $t('MSG_TXT_PAY_INFO') }}</h4>
                        <!-- 결제정보 -->
                    </div>
                    <!-- 결제정보 -->
                    <p01 :payData="payInfo" />
                    <!-- 결제정보 -->
                </div>
            </div>
            <!-- E::영수증번호+결제정보 -->

            <!-- S::결제수단 -->
            <div class="comm_title_wrap mt20">
                <h4 class="pr10">{{ $t('MSG_TXT_PAY_METHOD') }}</h4>
                <!-- 결제수단 -->
            </div>
            <p02 :payData="payMethod" />
            <!-- E::결제수단 -->
            <template v-if="saleKind === 'S004'">
            <div class="comm_title_wrap mt20">
                <h4 class="pr10">{{ $t('MSG_TXT_PAY_ORG_METHOD') }}</h4>
                <!-- 결제수단 -->
            </div>
            <p02 :payData="orgPayMethod" />
            </template>

            <!-- S::정기권 정보 -->
            <div class="comm_title_wrap mt40">
                <h4>{{ $t('MSG_TXT_TICKET_INFO') }}</h4>
                <!-- 정기권 정보 -->
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">
                            Total<span>{{ ticketList.length }}</span
                            >{{ $t('MSG_TXT_CNT') }}
                        </div>
                    </div>
                </div>
                <!--E::: 타이틀 오른쪽 total info -->
            </div>
            <p03 :ticketList="ticketList" />
            <!-- E::정기권 정보 -->

            <!-- S::tab -->
            <ur-tab-box ref="saa01Tab" class="mt45" @tab-change="onChangeTab">
                <ur-tab-content :idx="0" :label="$t('MSG_TXT_TICKET_ITEM_NM')"
                    ><!-- 권종명 -->
                    <t01 :list="tabDataList" />
                </ur-tab-content>
                <ur-tab-content :idx="1" :label="$t('MSG_TXT_CREDIT_CARD')"
                    ><!-- 신용카드 -->
                    <t02 :list="tabDataList" />
                </ur-tab-content>
                <ur-tab-content :idx="2" :label="$t('MSG_TXT_CASH_RECEIPT')"
                    ><!-- 현금영수증 -->
                    <t03 :list="tabDataList" />
                </ur-tab-content>
                <ur-tab-content :idx="3" :label="$t('MSG_TXT_GIFT_CARD')"
                    ><!-- 상품권 -->
                    <t04 :list="tabDataList" />
                </ur-tab-content>
                <ur-tab-content :idx="4" :label="$t('MSG_TXT_RETURN')"
                    ><!-- 환불 -->
                    <t05 :list="tabDataList" :parkKind="parkKind"/>
                </ur-tab-content>
                <ur-tab-content :idx="5" :label="$t('MSG_TXT_APPR_LOG')"
                    ><!-- 승인기록 -->
                    <t06 :list="tabDataList" />
                </ur-tab-content>
                <ur-tab-content :idx="6" :label="$t('MSG_TXT_ILMO_POINT')"
                    ><!-- 일모포인트 -->
                    <t07 :list="tabDataList" />
                </ur-tab-content>
                <ur-tab-content :idx="7" :label="$t('MSG_TXT_GIFT_CARD_ENG')"
                    ><!-- 기프트카드 -->
                    <t08 :list="tabDataList" />
                </ur-tab-content>
            </ur-tab-box>
            <!-- E::tab -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
import moment from 'moment';
import p01 from './components/PGE_SAA_00001_P01';
import p02 from './components/PGE_SAA_00001_P02';
import p03 from './components/PGE_SAA_00001_P03';
import t01 from './components/PGE_SAA_00001_T01';
import t02 from './components/PGE_SAA_00001_T02';
import t03 from './components/PGE_SAA_00001_T03';
import t04 from './components/PGE_SAA_00001_T04';
import t05 from './components/PGE_SAA_00001_T05';
import t06 from './components/PGE_SAA_00001_T06';
import t07 from './components/PGE_SAA_00001_T07';
import t08 from './components/PGE_SAA_00001_T08';

// 데이터서비스ID
const DS_MAP = [
    'DTS_SAA_00005', // 권종
    'DTS_SAA_00006', // 신용카드
    'DTS_SAA_00007', // 현금영수증
    'DTS_SAA_00008', // 상품권
    'DTS_SAA_00009', // 환불
    'DTS_SAA_00010', // 승인
    'DTS_SAA_00011', // 포인트
    'DTS_SAA_00012', // 기프트카드
];

export default {
    name: 'PGE_SAA_00001',
    components: {
        t01,
        t02,
        t03,
        t04,
        t05,
        t06,
        t07,
        t08,
        p03,
        p01,
        p02,
    }, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            // 검색 조건 구분
            srchFg: 'name',
            // 검색 입력 활성화 여부
            isSrchValDisabled: '',
            // 검색 입력 값
            srchVal: '',
            srchObj: {
                receiptNo: '',
                saleYmd: '',
                name: '',
                ticketNo: ''
            },
            name: '',
            payInfo: [],
            ticketList: [],
            payMethod: [],
            orgPayMethod: [],
            // 영수증 번호 리스트
            receiptFields: [{ fieldName: 'receiptNo', dataType: 'text' }], // 판매일자
            receiptColumns: [
                {
                    name: 'receiptNoColumn',
                    fieldName: 'receiptNo',
                    width: 100,
                    header: {
                        text: this.$t('MSG_TXT_RECEIPT_NO') /* 영수증번호 */,
                    },
                    edit: false,
                },
            ],
            receiptList: [],
            tabDataList: [],
            currentReceiptNo: '',
        };
    },
    computed: {
        saleKind() {
            let saleKind = ''
            if (this.payInfo.length > 0) {
                saleKind = this.payInfo[0].saleKind
            }
            return saleKind
        },
        parkKind() {
            let parkKind = ''
            if (this.payInfo.length > 0) {
                parkKind = this.payInfo[0].parkKind
            }
            return parkKind
        },
        inputMask() {
            if (this.srchFg === 'ticketNo') {
                return 'N#########';
            }
        },
    },
    watch: {},
    created() {},
    mounted() {
        this.srchObj.saleYmd = moment(new Date()).format('YYYY-MM-DD');
        this.$refs.receiptGrid.gridView.sortingOptions.enabled = false;
        this.$refs.receiptGrid.gridView.onCellClicked = (grid, clickData) => {
            if (clickData.cellType !== 'gridEmpty' && clickData.cellType !== 'header') {
                this.currentReceiptNo = grid.getJsonRows()[clickData.dataRow].receiptNo;
                this.searchInfo();
                this.$refs.saa01Tab.setIdx(0);
            }
        };

        const receiptNo = utils.getParameter(this, 'receiptNo');
        if (receiptNo) {
            this.onClickSearch(receiptNo);
        }
    },
    methods: {
        initSrchField() {
            this.currentReceiptNo = '';
            this.srchFg = 'name';
            this.isSrchValDisabled = true;
            this.srchVal = '';
            for (let key in this.srchObj) this.srchObj[key] = '';
            this.srchObj.saleYmd = moment(new Date()).format('YYYY-MM-DD');
        },
        initDataField() {
            this.payInfo = [];
            this.ticketList = [];
            this.payMethod = [];
            this.tabDataList = [];
            this.currentReceiptNo = '';
        },
        // 결제일자 조회버튼 click
        clickRadio(srchFg) {
            srchFg = srchFg || this.srchFg;
            this.srchVal = '';
            switch (srchFg) {
                case 'ticketNo':
                    this.isSrchValDisabled = false;
                    this.$nextTick(() => this.$refs.refSrchVal.focus());
                    break;
                case 'mobileTel':
                case 'name':
                    this.isSrchValDisabled = true;
                    this.srchObj[this.srchFg] = this.srchVal;
                    this.openSearchFgPopup();
                    break;
                default:
            }
        },
        // 회원검색 팝업 오픈
        openSearchFgPopup() {
            utils.openLayerPopup(
                'PGE_CTM_00016',
                (result) => {
                    if (result) {
                        this.srchObj[this.srchFg] = result[this.srchFg];
                        this.srchObj.ticketNo = result.ticketNo;
                        this.srchVal = result[this.srchFg];
                        this.searchReceiptNo(result.memshpUid);
                    }
                },
                {
                    pageInitialData: {
                        [this.srchFg]: this.srchVal,
                    },
                    size: 'lg',
                }
            );
        },
        //결제정보리스트 팝업
        onPayInfoPopupClick() {
            if (!this.srchObj.saleYmd) {
                /* 기간을 입력해주세요. */
                utils.messageBox('alert', utils.strFormat(this.$t('MSG_ALT_CHK_SEARCH'), this.$t('MSG_TXT_PRD')));
                return;
            }

            utils.openLayerPopup(
                'PGE_SAA_00002',
                (result) => {
                    if (result) {
                        this.setCurrentReceiptNo(result);
                        this.searchInfo();
                        this.$refs.saa01Tab.setIdx(0);
                    }
                },
                {
                    pageInitialData: {
                        ...this.srchObj,
                        saleYmd: this.srchObj.saleYmd.replace(/-/g, ''),
                    },
                    size: 'lg',
                }
            );
        },
        textFieldKeyup(event) {
            if (event.keyCode === 13) {
                this.searchMember();
            }
        },
        // 멤버십팝업조회
        searchMember() {
            if (this.srchFg === 'ticketNo') {
                if (!this.srchVal) {
                    /* 정기권번호를 입력해주세요. */
                    utils.messageBox(
                        'alert',
                        utils.strFormat(this.$t('MSG_ALT_CHK_SEARCH'), this.$t('MSG_TXT_TICKET_NO'))
                    );
                    this.$nextTick(() => this.$refs.refSrchVal.focus());
                    return;
                }
                this.srchObj['ticketNo'] = this.srchVal;
            }

            this.openSearchFgPopup();
        },

        // 조회
        onClickSearch(receiptNo) {
            if (!receiptNo) {
                /* 영수증번호를 입력해주세요. */
                utils.messageBox(
                    'alert',
                    utils.strFormat(this.$t('MSG_ALT_CHK_SEARCH'), this.$t('MSG_TXT_RECEIPT_NO'))
                );
                this.$nextTick(() => this.$refs.receiptNo.focus());
                return;
            }

            this.setCurrentReceiptNo(receiptNo);
            this.searchInfo();
            this.$refs.saa01Tab.setIdx(0);
        },

        // 조회
        searchTab(dsId, params) {
            const _params = params;
            http.request('PGE_SAA_00001', dsId, {
                query: _params,
            })
                .then((res) => {
                    this.tabDataList = res.data;
                })
                .catch((error) => console.log(error));
        },

        // 조회
        searchReceiptNo(memshpUid) {
            const params = { memshpUid: memshpUid };
            http.request('PGE_SAA_00001', 'DTS_SAA_00013', {
                query: params,
            })
                .then((res) => {
                    if (!res.data?.receiptNo) {
                        this.initDataField();
                        utils.messageBox('alert', this.$t('MSG_ALT_NO_DATA')); /* 데이터가 존재하지 않습니다. */
                        return;
                    }

                    this.setCurrentReceiptNo(res.data.receiptNo);
                    this.searchInfo();
                    this.$refs.saa01Tab.setIdx(0);
                })
                .catch((error) => console.log(error));
        },

        searchInfo() {
            const params = { receiptNo: this.currentReceiptNo };
            http.request('PGE_SAA_00001', 'DTS_SAA_00002', {
                query: params,
            })
                .then((res) => {
                    if (res.data.info.length <= 0) {
                        this.initDataField();
                        utils.messageBox('alert', this.$t('MSG_ALT_NO_DATA')); /* 데이터가 존재하지 않습니다. */
                        return;
                    }

                    // 영수증 리스트 추가
                    const findIdx = this.receiptList.findIndex((v) => this.currentReceiptNo === v.receiptNo);
                    if (findIdx < 0) {
                        this.receiptList.unshift({ receiptNo: this.currentReceiptNo });
                    }
                    this.$refs.receiptGrid.setRows(this.receiptList);
                    this.$refs.receiptGrid.gridView.setCurrent({ itemIndex: findIdx < 0 ? 0 : findIdx });

                    // 데이터set
                    
                    this.getMemshpName(res.data.info[0].payerMemshpUid).then((data) => {
                        res.data.info[0].name = data.name || ''
                        this.payInfo = res.data.info
                    });

                    this.payMethod = res.data.method;
                    this.orgPayMethod = res.data.orgMethod;
                    res.data.ticketList.forEach(v => {
                        v.name = ''
                        this.getMemshpName(v.memshpUid).then((data) => v.name = utils.maskName(data.name || ''))
                    })
                    this.ticketList = res.data.ticketList;
                })
                .catch((error) => console.log(error));
        },
        //탭변경
        onChangeTab(idx) {
            this.tabDataList = []
            if (this.currentReceiptNo) {
                this.searchTab(DS_MAP[idx], { receiptNo: this.currentReceiptNo });
            }
        },

        setCurrentReceiptNo(receiptNo) {
            this.currentReceiptNo = receiptNo;
            const findIdx = this.receiptList.findIndex((v) => receiptNo === v.receiptNo);
            if (findIdx > 0) this.receiptList.splice(findIdx, 1);
        },

        getMemshpName(memshpUid) {
            return new Promise((resolve) => {
                http
                .request(this.$options.name, "DTS_CTM_00010", {
                    query: {
                    memshpUid: memshpUid,
                    },
                }, true)
                .then((res) => {
                    resolve(res.data);
                })
            });
        },
        maskingName(name) {
            let maskingName = name.length == 2 ? name.replace(name.substring(1, 2), '*') : name;
            if (name.length > 2) {
                maskingName = name[0] + '*'.repeat(name.substring(1, name.length - 1).length) + name[name.length - 1];
            }
            return maskingName;
        },
        receiptNoTextFieldKeyup(event) {
            if (event.keyCode === 13) {
                this.onClickSearch(event.target._value);
            }
        },
        inputTextReceiptNo() {
            this.srchObj.receiptNo = this.srchObj.receiptNo.replace(/[^A-Za-z0-9]/g, '').toLocaleUpperCase();
        }
    },
};
</script>
<style scoped>
.input-text-saa00001 {
    width: 100%;
    min-width: 50px;
    height: 32px;
}
</style>
