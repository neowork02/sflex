<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <!-- S::컨텐츠1 -->
            <ur-form-box toggleable>
                <ur-form-item class="flex_wrap" label="장비ID" :labelAlign="'right'" style="width: 33%; height: auto">
                    <ur-text-field v-model="posId" style="width: 100%" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="장비명" :labelAlign="'right'" style="width: 33%; height: auto">
                    <ur-text-field v-model="posNm" style="width: 100%" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="현재 IP" :labelAlign="'right'" style="width: 34%; height: auto">
                    <ur-text-field v-model="posIp" style="width: 100%" readonly />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button @click="clickDeleteTempDate" color="violet">TEMP DATA 제거</ur-button>
                </div>
            </div>
            <!-- E::컨텐츠1 -->

            <!-- S::컨텐츠2 -->
            <div class="comm_title_wrap mt25">
                <h4>POS 설정</h4>
            </div>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="영수증 발행 여부"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="receiptIssueYn" @click="clickReceiptIssueYn('Y')" value="Y" sm
                            >전건 출력여부 확인</ur-radio
                        >
                        <ur-radio v-model="receiptIssueYn" @click="clickReceiptIssueYn('N')" value="N" sm
                            >전건 출력여부 생략</ur-radio
                        >
                    </div>
                </ur-form-item>
            </ur-form-box>
            <!-- E::컨텐츠2 -->

            <!-- S::컨텐츠3 -->
            <div class="comm_title_wrap mt25">
                <h4>장비 TEST</h4>
            </div>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="SCANNER TEST"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <div style="width: 24%" class="pr10">
                        <ur-button @click="clickScannerTest" color="violet" style="width: 100%" class="nar"
                            >TEST</ur-button
                        >
                    </div>
                    <ur-text-field
                        v-model="scannerInput"
                        ref="scannerInput"
                        @keyup.enter="enterScannerInput"
                        style="width: 76%; height: auto"
                        :readonly="readonlyTextScannerInput"
                    />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="영수증 PRINTER TEST"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <div style="width: 24%" class="pr10">
                        <ur-button @click="clickReceiptPrintTest" color="violet" style="width: 100%" class="nar"
                            >TEST</ur-button
                        >
                    </div>
                </ur-form-item>

                <ur-form-item
                    class="flex_wrap borTop"
                    label="무결성 제약조건 TEST"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <div style="width: 24%" class="pr10">
                        <ur-button @click="clickIcReaderTest" color="violet" style="width: 100%" class="nar"
                            >무결성체크결과</ur-button
                        >
                    </div>
                    <ur-text-field v-model="lastIcReaderTestResult" style="width: 76%; height: auto" readonly />
                </ur-form-item>

                <ur-form-item
                    class="flex_wrap borTop"
                    label="전자서명 TEST"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <div style="width: 24%" class="pr10">
                        <ur-button @click="clickSignTest" color="violet" style="width: 100%" class="nar"
                            >TEST</ur-button
                        >
                    </div>
                </ur-form-item>

                <!-- ::S 무결성체크 팝업 -->
                <ur-modal
                    ref="modalIcReaderTest"
                    class="modal-b1c6"
                    large
                    dragable
                    title="무결성체크팝업"
                    @closed="closedModalIcReaderTest"
                >
                    <template slot="title">
                        <div class="modal-title mb45">무결성체크결과</div>
                    </template>
                    <template>
                        <!-- <sui-page class="custom_page"> -->
                        <div class="modal-body">
                            <!-- ::S 콘텐츠1 -->
                            <ur-form-box toggleable>
                                <ur-form-item
                                    class="flex_wrap"
                                    label="장비IP"
                                    :labelAlign="'right'"
                                    style="width: 45%; height: auto; border: 0"
                                >
                                    <ur-text-field v-model="posIp" style="width: 100%" readonly />
                                </ur-form-item>
                                <ur-form-item
                                    class="flex_wrap"
                                    label="조회기간"
                                    :labelAlign="'right'"
                                    style="width: 55%; height: auto"
                                >
                                    <ur-range-picker
                                        ref="rangeDate"
                                        v-model="range"
                                        autoConfirm
                                        input-type="YYYY-MM-DD"
                                        init="day+30"
                                        :inputType="this.userDateFormat"
                                        :modelType="this.userDateFormat"
                                    />
                                </ur-form-item>
                            </ur-form-box>
                            <div class="btn_wrap">
                                <div class="right_box">
                                    <ur-button @click="searchIcReaderTestList" color="violet">조회</ur-button>
                                </div>
                            </div>
                            <!--S:: 타이틀 오른쪽 total info -->
                            <div class="comm_title_wrap mt10">
                                <div class="right_box">
                                    <div class="totalNo">
                                        <div class="totalCt">
                                            Total<span> {{ gridDataCnt }} </span>건
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--E::: 타이틀 오른쪽 total info -->
                            <real-grid
                                ref="grdTest"
                                grid-id="PGE_BAP_0001_TEST"
                                grid-root="/lib"
                                :gridFields="grdFields"
                                :gridColumns="grdColumns"
                                :gridRows="[]"
                                :gridInit="false"
                                :gridMounted="gridMounted"
                                :style="{ height: '300px' }"
                            />
                            <!-- ::E 콘텐츠1 -->
                        </div>
                        <!-- </sui-page> -->
                    </template>
                    <template slot="action">
                        <ur-button @click="testIcReader">무결성체크</ur-button>
                        <ur-button color="violet" @click="clickCloseModal">닫기</ur-button>
                    </template>
                </ur-modal>
                <!-- ::E 무결성체크 팝업-->
            </ur-form-box>
            <!-- E::컨텐츠3 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
import PosPrint from '~common/js/PosPrint/pos-print.js';
import CardPopupUtils from '~common/js/card-popup-utils.js';
import WebrtcDatachannel from '~common/js/webrtc-datachannel.js';
export default {
    name: 'PGE_BAP_00001', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            parkKind: '',
            parkPosKind: '',
            icReaderPort: '',
            icReaderSpeed: '',
            posId: '',
            posNm: '',
            posIp: '',
            portNo: '',
            isPos: false,
            range: [],

            userDateFormat: this.$store.getters.userInfo.dateFormat,

            readonlyTextScannerInput: true,

            scannerInput: '',
            lastIcReaderTestResult: '',
            receiptIssueYn: '',

            //Grid 변수
            gridView: null,
            dataProvider: null,
            grdFields: [],
            grdColumns: [],
            gridDataCnt: 0,

            cardPopupUtils: null,
            webrtcDatachannel: null,
            testPopupPage: 'PGE_CTM_00020',
            signPopupPage: 'PGE_CTM_00023',
        };
    },
    created() {
        this.grdFields = [
            { fieldName: 'posIp', dataType: 'text' },
            { fieldName: 'readerId', dataType: 'text' },
            { fieldName: 'portNo', dataType: 'text' },
            { fieldName: 'swVersion', dataType: 'text' },
            { fieldName: 'result', dataType: 'text' },
            { fieldName: 'workDate', dataType: 'text' },
            { fieldName: 'workTime', dataType: 'text' },
        ];
        this.grdColumns = [
            {
                name: 'posIp',
                fieldName: 'posIp',
                header: { text: 'POS IP' },
                width: 90,
                editable: false,
            },
            {
                name: 'readerId',
                fieldName: 'readerId',
                header: { text: 'Reader ID' },
                width: 90,
                editable: false,
            },
            {
                name: 'portNo',
                fieldName: 'portNo',
                header: { text: 'PORT NO' },
                width: 90,
                editable: false,
            },
            {
                name: 'swVersion',
                fieldName: 'swVersion',
                header: { text: 'SW VERSION' },
                width: 90,
                editable: false,
            },
            {
                name: 'result',
                fieldName: 'result',
                header: { text: '검증결과' },
                width: 90,
                editable: false,
            },
            {
                name: 'workDate',
                fieldName: 'workDate',
                header: { text: '검증일' },
                width: 90,
                editable: false,
            },
            {
                name: 'workTime',
                fieldName: 'workTime',
                header: { text: '검증시간' },
                width: 90,
                editable: false,
            },
        ];
    },
    async mounted() {
        this.parkKind = this.$store.getters.userInfo.parkFg;
        this.parkPosKind = this.$store.getters.userInfo.parkPosFg;
        this.icReaderPort = this.$store.getters.userInfo.icReaderPort;
        this.icReaderSpeed = this.$store.getters.userInfo.icReaderSpeed;
        this.posId = this.$store.getters.userInfo.posId;
        this.posNm = this.$store.getters.userInfo.posNm;
        this.posIp = this.$store.getters.userInfo.userIp;
        this.portNo = this.parsePort(this.icReaderPort);

        this.searchLastIcReaderTestResult();
        this.searchReceiptIssueYn();

        //접수 POS 인지 체크
        this.checkIsPos();

        //접수 POS인 경우만 무결성 Test, Sign Test 진행
        if (this.isPos) {
            //card popup 관련 초기화
            this.cardPopupUtils = new CardPopupUtils();
            this.webrtcDatachannel = new WebrtcDatachannel(
                this.$options.name, //thisPage
                this.$store.getters.userInfo.userIp // ip
            );

            await this.webrtcDatachannel.initSecure(); // webrtc 통신 암호화 위한 설정
        }
    },
    computed: {},
    methods: {
        /**
         * Grid Mounted 되면 호출
         */
        async gridMounted() {
            //grid 초기화
            await ({ gridView: this.gridView, dataProvider: this.dataProvider } = this.$refs.grdTest.initGrid());

            //Grid footer 안보이게 설정
            this.gridView.setFooters({ visible: false });

            //grid style set
            this.$refs.grdTest.setFitStyle('even');
        },
        /**
         * Grid Data 건수
         */
        setGridDataCnt() {
            if (this.dataProvider == null) {
                this.gridDataCnt = 0;
            } else {
                this.gridDataCnt = this.dataProvider.getJsonRows().length;
            }
        },
        /**
         * 현재 PC가 POS로 등록되었는지 체크
         */
        checkIsPos() {
            //접수 POS인지 체크
            this.isPos = utils.checkReceiptPos(this.parkPosKind, this.posId, this.icReaderPort, this.icReaderSpeed);
            if (!this.isPos) {
                utils.messageBox('alert', 'POS로 등록된 PC가 아닙니다.');
                return false;
            }
            return true;
        },
        /**
         * 영수증 출력 여부 변경
         */
        clickReceiptIssueYn(receiptIssueYn) {
            this.receiptIssueYn = receiptIssueYn;
            this.updateReceiptIssueYn();
        },
        /**
         * Scanner Test 버튼 클릭
         */
        clickScannerTest() {
            this.scannerInput = '';
            this.readonlyTextScannerInput = false;
            this.$refs.scannerInput.focus();
        },
        /**
         * Scanner 입력되었을때 호출
         */
        enterScannerInput() {
            if (utils.length(this.scannerInput) > 0) {
                utils.messageBox('alert', '정상적으로 입력되었습니다.');
                this.readonlyTextScannerInput = true;
            }
        },
        /**
         * 영수증 테스트 버튼 Click
         */
        clickReceiptPrintTest() {
            let posPrint = new PosPrint();
            posPrint.printTestReceipt();
        },
        /**
         * 무결성 테스트 버튼 Click
         */
        clickIcReaderTest() {
            if (!this.checkIsPos()) return;

            if (this.isOpenCardPopup()) {
                return;
            }

            this.$refs.modalIcReaderTest.open();
            this.searchIcReaderTestList();
        },
        /**
         * Sign 테스트 버튼 Click
         */
        clickSignTest() {
            if (!this.checkIsPos()) return;
            this.testSign();
        },
        /**
         * 임시저장 데이터 삭제
         */
        clickDeleteTempDate() {
            http.request(this.$options.name, 'DTS_BAP_00004', {
                query: {},
            })
                .then((res) => {
                    if (res != null && res.data != null && res.data.resultCode == '1') {
                        utils.messageBox('alert', '삭제되었습니다.');
                    }
                })
                .catch((error) => console.log(error));
        },
        /**
         * 영수증 발행여부 조회
         */
        searchReceiptIssueYn() {
            if (!this.checkIsPos()) return;

            const params = {
                posId: this.posId,
            };
            console.log('params', params);
            http.request(this.$options.name, 'DTS_BAP_00005', {
                query: params,
            })
                .then((res) => {
                    if (res != null && res.data != null && res.data.receiptIssueYn != null) {
                        this.receiptIssueYn = res.data.receiptIssueYn;
                    } else {
                        this.receiptIssueYn = '';
                    }
                })
                .catch((error) => console.log(error));
        },
        /**
         * 영수증 발행여부 저장
         */
        updateReceiptIssueYn() {
            if (!this.checkIsPos()) return;

            if (utils.length(this.receiptIssueYn) == 0) {
                utils.messageBox('alert', '영수증 발행여부를 선택해주세요.');
                return;
            }

            const params = {
                receiptIssueYn: this.receiptIssueYn,
                posId: this.posId,
            };
            http.request(this.$options.name, 'DTS_BAP_00006', {
                query: params,
            })
                .then((res) => {
                    if (res != null && res.data != null && res.data.receiptIssueYn != null) {
                        this.receiptIssueYn = res.data.receiptIssueYn;
                    } else {
                        this.receiptIssueYn = '';
                    }
                })
                .catch((error) => console.log(error));
        },
        /**
         * 금일 최종 무결성 테스트 결과 조회
         */
        searchLastIcReaderTestResult() {
            const params = {
                posIp: this.posIp,
                portNo: this.portNo,
            };
            http.request(this.$options.name, 'DTS_BAP_00002', {
                data: params,
            })
                .then((res) => {
                    if (res != null && res.data != null) {
                        this.lastIcReaderTestResult = res.data.result;
                    } else {
                        this.lastIcReaderTestResult = '';
                    }
                })
                .catch((error) => console.log(error));
        },
        //무결성 테스트 결과 리스트 조회
        searchIcReaderTestList() {
            if (this.checkValidate()) return false;
            const searchStartDate = utils.dateformatToServer(this.range[0]).substring(0, 8);
            const searchEndDate = utils.dateformatToServer(this.range[1]).substring(0, 8);
            const params = {
                posIp: this.posIp,
                searchStartDate: searchStartDate,
                searchEndDate: searchEndDate,
            };
            http.request(this.$options.name, 'DTS_BAP_00003', {
                data: params,
            })
                .then((res) => {
                    if (res != null && res.data != null && res.data.length > 0) {
                        this.dataProvider.fillJsonData(res.data, { fillMode: 'set' });
                    } else {
                        this.dataProvider.fillJsonData([], { fillMode: 'set' });
                    }
                    this.setGridDataCnt();
                })
                .catch((error) => console.log(error));
        },
        /**
         * PG 팝업이 열려있는지 체크
         */
        isOpenCardPopup() {
            if (this.cardPopupUtils.cardWindow != null && this.webrtcDatachannel.isOpenState()) {
                let popupNm = '무결성 TEST';
                if (this.webrtcDatachannel.getPopupPage() == this.testPopupPage) {
                    popupNm = '무결성 TEST';
                } else if (this.webrtcDatachannel.getPopupPage() == this.signPopupPage) {
                    popupNm = 'Sign TEST';
                }

                utils.messageBox('alert', `${popupNm} 팝업이 열려 있습니다.\n확인 후 다시 시도해주세요!`, null, () => {
                    this.webrtcDatachannel.sendMessage({ type: 'focus' });
                });
                return true;
            } else {
                return false;
            }
        },
        /**
         * 무결성 테스트 창 Open
         */
        async testIcReader() {
            if (this.isOpenCardPopup()) {
                return;
            }

            //접속 시간 서버시간으로 설정
            let systemTime = await http.getSystemTime();

            //접속정보 설정
            this.webrtcDatachannel.setConnectPage(
                this.testPopupPage, //popupPage
                systemTime.nowDateTime, // accessDateTime
                this.receiveMessageFromTestPage, // receiveCallBack
                this.initTestPopup, //initCallback
                this.closeTestPopup // closeCallback
            );

            //팝업 열기
            this.cardPopupUtils.openPopup(this.testPopupPage, this.$options.name, systemTime.nowDateTime, 350, 650);

            //접속하기
            this.webrtcDatachannel.connectToPopup();
        },
        /**
         * 카드리더기 무결성 체크 창이 Open되고 데이터 통신이 연결되면 호출
         */
        initTestPopup() {
            this.webrtcDatachannel.sendMessage({ type: 'init' });
        },
        /**
         * 카드리더기 무결성 체크 창이 닫히면 호출
         */
        closeTestPopup() {
            this.cardPopupUtils.cardWindow = null;
        },
        /**
         * 카드리더기 무결성 체크창에서 전송된 데이터 호출
         * @param { Object } param
         */
        receiveMessageFromTestPage(param) {
            if (param.type == 'fail' || param.type == 'success') {
                this.searchLastIcReaderTestResult();
                this.searchIcReaderTestList();
            }
        },
        /**
         * Sign 입력 창 Open
         */
        async testSign() {
            //Sign 입력창 열려있는지 체크
            if (this.isOpenCardPopup()) {
                return;
            }

            //접속 시간 서버시간으로 설정
            let systemTime = await http.getSystemTime();

            //접속정보 설정
            this.webrtcDatachannel.setConnectPage(
                this.signPopupPage, //popupPage
                systemTime.nowDateTime, // accessDateTime
                this.receiveMessageFromSignPage, // receiveCallBack
                this.initSignPopup, //initCallback
                this.closeSignPopup // closeCallback
            );

            //팝업 열기
            this.cardPopupUtils.openPopup(this.signPopupPage, this.$options.name, systemTime.nowDateTime, 295, 470);

            //접속하기
            this.webrtcDatachannel.connectToPopup();
        },
        /**
         * Sign 입력창이 Open되고 데이터 통신이 연결되면 호출
         */
        initSignPopup() {
            let apprAmt = 50000; //Sign 요청 금액
            this.webrtcDatachannel.sendMessage({
                type: 'init',
                data: { apprAmt: apprAmt },
            });
        },

        /**
         * Sign 입력창이 닫히면 호출
         */
        closeSignPopup() {
            this.cardPopupUtils.cardWindow = null;
        },

        /**
         * Sign 입력창에서 전송된 데이터 호출
         * @param { Object } param
         */
        receiveMessageFromSignPage(param) {
            if (param.type == 'sendSign') {
                this.webrtcDatachannel.sendMessage({ type: 'sendOk' });
            }
        },
        /**
         * 달력의 오류를 확인할 수 있는 validate 함수
         */
        checkValidate() {
            if (utils.isEmpty(this.range[1]) || utils.isEmpty(this.range[0])) {
                utils.messageBox(
                    'warning',
                    utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PRD')),
                    null,
                    null
                );
                return true;
            }
            if (!this.$refs.rangeDate.isValid()) {
                utils.messageBox('warning', this.$t('MSG_ALT_CHK_DT'), null, null);
                return true;
            }
            return false;
        },
        /**
         * 무결성 리스트 Modal 닫기
         */
        clickCloseModal() {
            this.$refs.modalIcReaderTest.close();
            this.closedModalIcReaderTest();
        },
        /**
         * 무결성 리스트 Modal 닫히면 최종 무결성 체크 결과 다시 조회
         */
        closedModalIcReaderTest() {
            this.searchLastIcReaderTestResult();
        },
        /**
         * Port 정보 Parsing
         * @param { String } port
         */
        parsePort(port) {
            let iPort = 0;
            if (port != null && port.length > 0) {
                if (typeof port === 'string' || port instanceof String) {
                    iPort = parseInt(port.substring(3, 4));
                } else {
                    iPort = port;
                }
            }
            return iPort;
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
