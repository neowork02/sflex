<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_RESERVE_DATE')"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <ur-range-picker v-model="dateValue" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_PROC_STATUS')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="srchProSts" value="A" sm>{{ $t('MSG_TXT_ALL') }}</ur-radio>
                        <!-- 전체 -->
                        <ur-radio v-model="srchProSts" value="S" sm>{{ $t('MSG_TXT_CONDITION') }}</ur-radio>
                        <!-- 정상 -->
                        <ur-radio v-model="srchProSts" value="E" sm>{{ $t('MSG_TXT_ETC') }}</ur-radio>
                        <!-- 기타 -->
                    </div>
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap borTop"
                    :label="$t('MSG_TXT_RESERVE_INFO')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio class="ltrSpacing" v-model="searchKind" value="N" sm @click="onClickSearchKind('N')">
                            {{ $t('MSG_TXT_RSVD_BY') }}
                        </ur-radio>
                        <ur-radio class="ltrSpacing" v-model="searchKind" value="T" sm @click="onClickSearchKind('T')">
                            {{ $t('MSG_TXT_RESERVE_PHONE_NUM') }}
                        </ur-radio>
                        <ur-radio class="ltrSpacing" v-model="searchKind" value="C" sm @click="onClickSearchKind('C')">
                            {{ $t('MSG_TXT_RESERVE_CONF_NUM') }}
                        </ur-radio>
                    </div>
                    <ur-text-field
                        class="pl10"
                        v-model="searchVal"
                        style="width: 31%"
                        :disabled="disabled"
                        @enter="search"
                        :mask="inputMask"
                    />
                    <ur-icon-button class="ml10" icon="search" @click="popupSearch" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap borTop"
                    :label="$t('MSG_TXT_RESERVE_STATUS')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="srchRevSts" value="C" sm>{{ $t('MSG_TXT_ALL') }}</ur-radio>
                        <!-- 전체 -->
                        <ur-radio v-model="srchRevSts" value="F" sm>{{ $t('MSG_TXT_RESERVE_REQ') }}</ur-radio>
                        <!-- 예약신청 -->
                        <ur-radio v-model="srchRevSts" value="D" sm>{{ $t('MSG_TXT_RESERVE_CANCEL') }}</ur-radio>
                        <!-- 예약취소 -->
                        <ur-radio v-model="srchRevSts" value="E" sm>{{ $t('MSG_TXT_ISSUE_COMP') }}</ur-radio>
                        <!-- 발급완료 -->
                        <ur-radio v-model="srchRevSts" value="J" sm>{{ $t('MSG_TXT_RSV_DATE') }}</ur-radio>
                        <!-- 예약일 -->
                    </div>
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

            <!-- S::tab -->
            <ur-tab-box class="mt35" :default-idx="1" ref="webReserveTab" @tab-change="onChangeTab">
                <ur-tab-content :idx="1" :label="$t('MSG_TIT_JN11_MNG')">
                    <pgeJnw00002 ref="pgeJnw00002" @getDetail="getDetail" />
                </ur-tab-content>
                <ur-tab-content :idx="2" :label="$t('MSG_TIT_JN12_MNG')">
                    <pgeJnw00003 ref="pgeJnw00003" />
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
import _ from 'lodash';
import pgeJnw00002 from './PGE_JNW_00002';
import pgeJnw00003 from './PGE_JNW_00003';

export default {
    name: 'PGE_JNW_00001',
    components: {
        pgeJnw00002,
        pgeJnw00003
    },
    data() {
        return {
            gridStyle: { height: '250px' },
            gridStyle2: { height: '150px' },

            dateValue: [utils.now("YYYY-MM-DD"), utils.now("YYYY-MM-DD")],
            srchStartDt: null, // 재결제기간(From)
            srchEndDt: null, // 재결제기간(To)
            srchProSts: 'A',
            searchKind: 'N',
            searchVal: null,
            srchRevSts: 'C',

            memshpInfo: null,
        };
    },
    computed: {
        rsvDtDm() {
            const rsvDtDm = String(this.rsvDt) + String(this.rsvTm);
            return utils.toStringByFormat(utils.toDate(rsvDtDm), 'YYYY-MM-DD HH:mm:ss');
        },
        disabled() {
            switch (this.searchKind) {
                case 'N':
                case 'T':
                    return true;
                default:
                    return false;
            }
        },
        // Input Mask
        inputMask() {
            return 'NNNNNNNNNNNNNNNN';
        },
    },
    watch: {
        dateValue(newVal, oldVal) {
            this.srchStartDt = newVal[0];
            this.srchEndDt = newVal[1];
        },
    },
    created() {},
    mounted() {},
    methods: {
        onClickSearchKind(searchKind) {
            this.searchVal = null;

            switch (searchKind) {
                case 'N':
                case 'T':
                    this.popup();
                    break;
            }
        },
        popup() {
            utils.openLayerPopup('PGE_CTM_00016', this.onPopupCallback, {
                pageInitialData: {},
                size: 'lg',
            });
        },
        popupSearch() {
            switch (this.searchKind) {
                case 'N':
                case 'T':
                    this.popup();
                    break;
                case 'C':
                    break;
            }
        },
        onPopupCallback(data) {
            if (data) {
                this.memshpInfo = data;

                switch (this.searchKind) {
                    case 'N':
                        this.searchVal = this.memshpInfo.name;
                        break;
                    case 'T':
                        this.searchVal = this.memshpInfo.mobileTel;
                        break;
                }

                this.search();
            }
        },
        init() {
            let now = utils.now();
            now = utils.toStringByFormat(utils.toDate(now), 'YYYY-MM-DD');
            this.dateValue = [now, now];

            this.searchKind = 'N';
            this.searchVal = null;

            this.srchProSts = 'A';
            this.srchRevSts = 'C';
        },
        search() {
            if (_.isEmpty(this.srchStartDt) || _.isEmpty(this.srchEndDt)) {
                // 예약일자를 입력해주세요.
                utils.messageBox("alert", this.$t('MSG_ALT_RESERVE_DATE'));
                return;
            }
            let params = {
                srchStartDt: this.srchStartDt,
                srchEndDt: this.srchEndDt,
                srchProSts: this.srchProSts,
                srchRevSts: this.srchRevSts,
            };

            if (this.memshpInfo) params.srchMemshpUid = this.memshpInfo.memshpUid;
            if (this.searchKind === 'C' && this.searchVal) params.srchRsvProofNo = this.searchVal;

            http.request(this.$options.name, 'DTS_JNW_00005', {
                query: params,
            }).then((res) => {
                if (res.data) {
                    this.webReserveList = res.data.list;

                    _.each(this.webReserveList, (row) => {
                        row.rsvDt = utils.toStringByFormat(utils.toDate(row.rsvDt), 'YYYY-MM-DD');
                        row.rsvTm = utils.toStringByFormat(
                            utils.toDate(String(row.rsvDt) + String(row.rsvTm)),
                            'HH:mm:ss'
                        );
                        row.inwonCnt = utils.numberWithCommas(row.inwonCnt);
                        row.pymtAmt = utils.numberWithCommas(row.pymtAmt);
                        row.cancelDt = utils.toStringByFormat(utils.toDate(row.cancelDt), 'YYYY-MM-DD');
                        row.visitRlDt = utils.toStringByFormat(utils.toDate(row.visitRlDt), 'YYYY-MM-DD');
                        // 정상 : 기타
                        row.pymtStatus = row.pymtStatus === '3' ? this.$t('MSG_TXT_CONDITION') : this.$t('MSG_TXT_ETC');
                    });

                    this.$refs.pgeJnw00002.setRows(this.webReserveList, res.data.sumData);
                }
            });
        },
        downloadExcel() {
            this.$refs.pgeJnw00002.downloadExcel();
        },
        getDetail(rsvNo) {
            console.debug(rsvNo);
            this.$refs.pgeJnw00003.getDetail(rsvNo);
            this.$refs.webReserveTab.setIdx(2);
        },
        numberWithCommas(number) {
            if (number || number === 0) {
                number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
            return !number && number !== 0 ? '' : number;
        },
        //탭변경
        onChangeTab(idx) {
            console.debug(idx);
            if(idx === 1) {
                this.search();
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
.ltrSpacing {
    letter-spacing: -1.5px;
}
</style>
