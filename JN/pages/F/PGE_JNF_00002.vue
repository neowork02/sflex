<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <!-- S::조회조건 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="파크구분"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                >
                    <ur-text-field
                        v-model="parkKind"
                        ref="parkKind"
                        value=""
                        style="width: 100%; height: auto"
                        readonly
                    />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap borTop"
                    label="POS 체크 메세지"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field v-model="posSodStatus.message" style="width: 100%" clearable readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="IC Reader 무결성 체크"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field v-model="icReaderStatusMessage" style="width: 100%" clearable readonly />
                    <ur-button color="violet" @click="clickCheckIcReader">체크</ur-button>
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap borTop"
                    label="가입정보"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="memshpOption" @click="clickSearchGubn('name')" value="11" sm>성명</ur-radio>
                        <ur-radio v-model="memshpOption" @click="clickSearchGubn('mobile')" value="22" sm
                            >휴대폰</ur-radio
                        >
                        <ur-radio v-model="memshpOption" @click="clickSearchGubn('ticket')" value="33" sm
                            >정기권번호</ur-radio
                        >
                        <ur-radio v-model="memshpOption" @click="clickSearchGubn('receipt')" value="44" sm
                            >영수증번호</ur-radio
                        >
                        <ur-radio v-model="memshpOption" @click="clickSearchGubn('memshpUid')" value="55" sm
                            >멤버십UID</ur-radio
                        >
                        <ur-radio v-model="memshpOption" @click="clickSearchGubn('qr')" value="66" sm
                            >멤버십QR</ur-radio
                        >
                    </div>
                    <ur-text-field
                        v-model="srchVal"
                        ref="srchVal"
                        maxlength="24"
                        value=""
                        class="pl16"
                        :disabled="optionFlag !== '1'"
                        :mask="searchTextMask"
                        trim
                        @keyup.enter="srchValEnterDown()"
                    />
                    <!-- <ur-icon-button icon="search" style="padding-top: 0px" :disabled="btnFlag !== '1'" @click="popup()" /> -->
                </ur-form-item>
            </ur-form-box>

            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button @click="fnReSet(true)">초기화</ur-button>
                    <ur-button color="violet" @click="fnSearch()">조회</ur-button>
                </div>
            </div>
            <!-- E::조회조건 -->

            <!-- S::정산내역+상세내역 -->
            <div class="comm_shut_wrap mt25">
                <div class="inbox2">
                    <div class="comm_title_wrap">
                        <h4>정산내역</h4>
                    </div>
                    <real-grid
                        ref="pgeJnf00002Receipt"
                        grid-id="pgeJnf00002Receipt"
                        grid-root="/lib"
                        :gridFields="grdReceiptFields"
                        :gridColumns="grdReceiptColumns"
                        :gridRows="grdReceiptDataList"
                        :style="{ height: '200px' }"
                        :gridInit="false"
                        :gridMounted="grdReceiptMounted"
                        :gridDbCellClick="grdReceiptDbCellClick"
                    />
                </div>
                <div class="emptybox" />
                <div class="inbox8">
                    <div class="comm_title_wrap">
                        <h4 class="pr10">상세내역</h4>
                        <ur-button color="violet" @click="fnAdd()" hidden>적용</ur-button>
                        <!--S:: 타이틀 오른쪽 total info -->
                        <div class="right_box">
                            <div class="totalNo">
                                <div class="totalCt">
                                    Total<span>{{ detailCnt }}</span
                                    >건
                                </div>
                            </div>
                        </div>
                        <!--E:: 타이틀 오른쪽 total info -->
                    </div>
                    <real-grid
                        ref="pgeJnf00002Detail"
                        grid-id="pgeJnf00002Detail"
                        grid-root="/lib"
                        :gridFields="grdDetailFields"
                        :gridColumns="grdDetailColumns"
                        :gridRows="grdDetailDataList"
                        :style="{ height: '200px' }"
                        :gridInit="false"
                        :gridMounted="grdDetailMounted"
                        :gridDbCellClick="grdDetailDbCellClick"
                    />
                </div>
            </div>
            <!-- E::정산내역+상세내역 -->

            <!-- S::정산상세 -->
            <div class="comm_title_wrap mt40">
                <h4>정산상세</h4>
            </div>
            <ur-form-box toggleable>
                <ur-form-item class="flex_wrap" label="결제일자" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-text-field v-model="paymntDate" ref="paymntDate" value="" style="width: 100%" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="총결제금액"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field
                        v-model="saleAmt"
                        ref="saleAmt"
                        value=""
                        style="width: 100%"
                        mask="number"
                        readonly
                    />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="현금" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-text-field
                        v-model="cashAmt"
                        ref="cashAmt"
                        value=""
                        style="width: 100%"
                        mask="number"
                        readonly
                    />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="WEB" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-text-field v-model="webAmt" ref="webAmt" value="" style="width: 100%" mask="number" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="상품권" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-text-field
                        v-model="giftcardAmt"
                        ref="giftcardAmt"
                        value=""
                        style="width: 100%"
                        mask="number"
                        readonly
                    />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="외상" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-text-field
                        v-model="creditAmt"
                        ref="creditAmt"
                        value=""
                        style="width: 100%"
                        mask="number"
                        readonly
                    />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="카드" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-text-field
                        v-model="cardAmt"
                        ref="cardAmt"
                        value=""
                        style="width: 100%"
                        mask="number"
                        readonly
                    />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="티켓" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-text-field
                        v-model="preticketAmt"
                        ref="preticketAmt"
                        value=""
                        style="width: 100%"
                        mask="number"
                        readonly
                    />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="멤버십포인트"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        v-model="pointAmt"
                        ref="pointAmt"
                        value=""
                        style="width: 100%"
                        mask="number"
                        readonly
                    />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="기프트카드"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        v-model="restGiftAmt"
                        ref="restGiftAmt"
                        value=""
                        style="width: 100%"
                        mask="number"
                        readonly
                    />
                </ur-form-item>
            </ur-form-box>
            <!-- E::정산상세 -->

            <!-- S::멤버십 포인트 내역+대상자+환불금 -->
            <div class="comm_shut_wrap mt40">
                <div class="inbox7">
                    <!-- S::멤버십 포인트 내역 -->
                    <div class="comm_title_wrap">
                        <h4>멤버십 포인트 내역</h4>
                        <!-- [2023-08-04] 추가 -->
                        <div class="title_compo">
                            <span class="infoTxt"
                                >* 적립포인트는 해당건 결제 당시 적립된 포인트임. 잔여포인트/가용포인트/적립예정포인트는
                                결제자의 현재 솜(포인트) 정보임</span
                            >
                        </div>
                        <!-- [2023-08-04] 추가 -->
                    </div>
                    <ur-form-box toggleable>
                        <ur-form-item
                            class="flex_wrap"
                            label="적립포인트"
                            required
                            :labelAlign="'right'"
                            style="width: 50%; height: auto"
                        >
                            <ur-text-field
                                v-model="savePointAmt"
                                ref="savePointAmt"
                                value=""
                                style="width: 100%"
                                mask="number"
                                readonly
                            />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            label="잔여포인트"
                            :labelAlign="'right'"
                            style="width: 50%; height: auto"
                        >
                            <ur-text-field
                                ref="remainPointAmt"
                                :value="getReturnAmt(remainPointAmt)"
                                style="width: 100%"
                                class="alignR"
                                readonly
                            />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            label="가용포인트"
                            :labelAlign="'right'"
                            style="width: 50%; height: auto"
                        >
                            <ur-text-field
                                v-model="naPointAmt"
                                ref="naPointAmt"
                                value=""
                                style="width: 100%"
                                mask="number"
                                readonly
                            />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            label="적립예정포인트"
                            :labelAlign="'right'"
                            style="width: 50%; height: auto"
                        >
                            <ur-text-field
                                v-model="saveSchedlPointAmt"
                                ref="saveSchedlPointAmt"
                                value=""
                                style="width: 100%"
                                mask="number"
                                readonly
                            />
                        </ur-form-item>
                    </ur-form-box>
                    <!-- E::멤버십 포인트 내역 -->
                    <!-- ::S::대상자 -->
                    <div class="comm_title_wrap mt20">
                        <h4>대상자</h4>
                        <!--S:: 타이틀 오른쪽 total info -->
                        <div class="right_box">
                            <div class="totalNo">
                                <div class="totalCt">
                                    Total<span>{{ targetCnt }}</span
                                    >건
                                </div>
                            </div>
                        </div>
                        <!--E:: 타이틀 오른쪽 total info -->
                    </div>
                    <real-grid
                        ref="pgeJnf00002Return"
                        grid-id="pgeJnf00002Return"
                        grid-root="/lib"
                        :gridFields="grdReturnFields"
                        :gridColumns="grdReturnColumns"
                        :gridRows="grdReturnDataList"
                        :style="{ height: '200px' }"
                        :gridInit="false"
                        :gridMounted="grdReturnMounted"
                        :gridCellClick="grdReturnCellClick"
                        :gridDbCellClick="grdReturnDbCellClick"
                    />
                    <!-- E::대상자 -->
                </div>
                <div class="emptybox" />
                <div class="inbox3">
                    <!-- ::S::환불금 -->
                    <div class="comm_title_wrap">
                        <h4 class="pr10">환불금</h4>
                    </div>
                    <ur-form-box toggleable>
                        <ur-form-item
                            class="flex_wrap pointTit"
                            label="총환불금"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field
                                ref="returnAmt"
                                :value="getReturnAmt(returnAmt)"
                                :font-color="getReturnAmtFontColor(returnAmt)"
                                style="width: 100%;"
                                class="alignR"
                                readonly
                            />
                        </ur-form-item>
                    </ur-form-box>

                    <ur-form-box toggleable class="mt10">
                        <!-- <ur-form-item
                            class="flex_wrap"
                            label="총환불금"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field
                                v-model="returnAmt"
                                ref="returnAmt"
                                value=""
                                style="width: 100%"
                                mask="number"
                                readonly
                            />
                        </ur-form-item> -->
                        <ur-form-item
                            class="flex_wrap"
                            label="기프트카드"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field
                                ref="mgiftReturn"
                                :value="getReturnAmt(mgiftReturn)"
                                :font-color="getReturnAmtFontColor(mgiftReturn)"
                                style="width: 100%"
                                class="alignR"
                                readonly
                            />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap borTop"
                            label="멤버십포인트"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field
                                ref="memshpReturn"
                                :value="getReturnAmt(memshpReturn)"
                                :font-color="getReturnAmtFontColor(memshpReturn)"
                                style="width: 100%"
                                class="alignR"
                                readonly
                            />
                        </ur-form-item>
                        <ur-form-item ref="stcReturn"
                            class="flex_wrap"
                            :label="stcReturn"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field
                                ref="cashReturn"
                                :value="getReturnAmt(cashReturn)"
                                :font-color="getReturnAmtFontColor(cashReturn)"
                                style="width: 100%"
                                class="alignR"
                                readonly
                            />
                        </ur-form-item>
                    </ur-form-box>
                    <!--::S InfoText -->
                    <div class="guideList mt10">
                        <!-- ::S[2023-07-13] 수정 -->
                        <span class="strong">[환불 시 주의사항]</span>
                        <ul class="listDot refund">
                            <li>환불처리 후 복구처리 불가</li>
                            <li>기프트카드 환불은 에버랜드 앱에서 확인, 일모포인트는 SSF샵 앱-마이페이지에서 확인</li>
                            <li>
                                현금 환불건은 정산상세내역에서 결제수단 확인 (손님에게 직접 반환 없음)
                                <ul class="listDash">
                                    <li>신용카드 결제건 현금 환불 시 수기 청구 취소(입금실 제출)</li>
                                    <li>스마트예약 온라인결제건 현금 환불 시 계좌이체 (입금실 제출)</li>
                                    <li>
                                        <span class="infoTxt point"
                                            >기타 환불 건은 환불창 우측 상단 <i class="shortcut_information"></i>버튼
                                            눌러서 환불 프로세스 확인 후 처리필요</span
                                        >
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <!-- ::E[2023-07-13] 수정 -->
                        <!-- <ul class="listDot">
                            <li>기프트카드 금액은 모바일기프트카드로 자동반환됩니다.</li>
                            <li>기프트카드 환불금은 에버랜드 앱에서 확인</li>
                            <li>일모포인트는 SSF샵에 마이페이지에서 확인</li>
                        </ul> -->
                    </div>
                    <div class="btn_wrap mt10">
                        <div class="right_box">
                            <ur-button :disabled="btnRefund !== '1'" @click="fnRefundProcess()">환불처리</ur-button>
                            <ur-button :disabled="btnRefundAppr !== '1'" color="violet" @click="fnRefundAppr()"
                                >전체환불 상신</ur-button
                            >
                            <ur-button :disabled="btnRefundAll !== '1'" color="violet" @click="fnRefundAll()"
                                >전체환불 처리</ur-button
                            >
                        </div>
                    </div>
                    <!-- E::환불금 -->
                </div>
            </div>
            <!-- E::멤버십 포인트 내역+대상자+환불금 -->

            <!-- S::환불사유 -->
            <div class="comm_title_wrap mt40">
                <h4>환불사유</h4>
            </div>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="환불사유"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                >
                    <ur-text-field
                        v-model="reason"
                        ref="reason"
                        maxlength="100"
                        value=""
                        style="width: 100%; height: auto"
                        @keyup="specialChar()"
                    >
                    </ur-text-field>
                </ur-form-item>
            </ur-form-box>
            <!-- E::환불사유 -->

            <!-- S::메시지 -->
            <div class="result_box mt20" style="height: auto">
                <span>{{ stcMsg }}</span>
            </div>
            <!-- E::메시지  -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>

        <!-- ::S 현금영수증 취소사유 -->
        <ur-modal
            ref="modalCashCancelReason"
            class="modal-b1c6"
            middle
            dragable
            title="현금영수증 취소사유"
            @closed="closedcashcancelreason"
        >
            <template>
                <div class="modal-body">
                    <ur-form-box toggleable>
                        <ur-form-item
                            class="flex_wrap borTop"
                            label="취소사유"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <div class="radioForm">
                                <ur-radio v-model="cancelOption" value="1" sm>거래취소</ur-radio>
                                <ur-radio v-model="cancelOption" value="2" sm>오류발급</ur-radio>
                                <ur-radio v-model="cancelOption" value="3" sm>기타</ur-radio>
                            </div>
                        </ur-form-item>
                    </ur-form-box>
                    <div class="btn_wrap mt10">
                        <div class="right_box">
                            <ur-button color="violet" @click="fnCashCancelClosed()">선택</ur-button>
                        </div>
                    </div>
                </div>
            </template>
        </ur-modal>
        <!-- ::E 현금영수증 취소사유 -->
    </sui-page>
</template>
<script>
import PosPrint from '~common/js/PosPrint/pos-print.js';
//import PosPrint from '~common/js/PosPrint/pos-print-refund.js';
import CardPopupUtils from '~common/js/card-popup-utils.js';
import WebrtcDatachannel from '~common/js/webrtc-datachannel.js';
export default {
    name: 'PGE_JNF_00002', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            parkKind: '',
            parkPosKind: '',
            posId: '',
            posNm: '',
            icReaderUseYn: 'N', //카드리더기 사용여부
            icReaderPort: '',
            icReaderSpeed: '',
            isElectReceiptIssueApply: true, //전자영수증 발행 여부 적용 여부

            isPos: false, // 접수 POS 여부
            posSodStatus: {}, // POS SOD 상태
            icReaderCheckResult: false, // IC Reader 상태 체크 결과
            icReaderStatusMessage: 'IC Reader 체크 중입니다.', // IC Reader 상태 메세지

            btnRefund: '0', // 환불처리 버튼
            btnRefundAppr: '0', // 전체환불 상신 버튼
            btnRefundAll: '0', // 전체환불 처리 버튼

            pvRECEIPT_NO: '', // 전역변수 영수증번호
            pvIS_RETURN_FG: '', // 전역변수 환불구분값 (0:현금 환불, 1:당일취소, 2:청구취소)
            pvCASH_YN: '', // 전역변수 현금여부
            pvSaleYmd: '', // 젼역변수 영업일자
            pvPosId: '', // 젼역변수 포스ID
            pvApprMemshpUid: '', // 상신_멤버십UID
            pvApprTicketNo: '', // 상신_정기권번호
            pvMgiftCardStatus: '', // 모바일기프트카드상태("Y:정상,N:비정상or모바일결제수단X")

            gvReceipt: null,
            dpReceipt: null,
            gvDetail: null,
            dpDetail: null,
            gvReturn: null,
            dpReturn: null,

            grdReceiptDataList: [],
            grdDetailDataList: [],
            grdReturnDataList: [],
            cardDataList: [],
            cardCancelDataList: [],
            returnDetail: [],
            checkedList: [], // 상세내역 그리드 check
            billDVO: null,
            validDVO: null,
            retCardData: null, // 카드취소 데이타 (1.청구취소, 2.카드취소없이, complete 사용)
            retCashData: null, // 현금취소 데이타

            memshpOption: null,
            srchVal: '',
            optionFlag: '0',
            btnFlag: '1',

            // parkKind: 'EL',
            detailCnt: 0,
            targetCnt: 0,
            returnCnt: 0,
            stcMsg: '',
            stcReturn: '',
            returnAmt: null, // 총환불
            mgiftReturn: null, // 모바일 기프트카드
            memshpReturn: null, // 멤버십 포인트
            cashReturn: null, // 환불

            // 정산상세
            paymntDate: '',
            saleAmt: 0, // 총결제금액
            cashAmt: 0, // 현금
            webAmt: 0, // WEB
            giftcardAmt: 0, // 상품권
            creditAmt: 0, // 외상
            cardAmt: 0, // 카드
            preticketAmt: 0, // 티켓
            pointAmt: 0, // 멤버십포인트
            restGiftAmt: 0, // 기프트카드
            rTranUniqueNbr: '', // VAN 거래고유번호

            reason: '',
            cancelOption: '1',

            savePointAmt: 0, // 적립포인트
            remainPointAmt: 0, // 잔여포인트금액
            naPointAmt: 0, // 가용포인트금액
            saveSchedlPointAmt: 0, // 적립예정포인트금액

            //Sign 요청(카드 리더기)
            cardPopupUtils: null,
            webrtcDatachannel: null,
            signPopupPage: 'PGE_CTM_00023',
            checkPopupPage: 'PGE_CTM_00020',

            signData: null,

            printData: null,

            codeValidityValue: 'APPR01',
            codeContent: null,
        };
    },
    created() {
        // pgeJnf00002Receipt 필드 정보 정의
        this.grdReceiptFields = [
            { fieldName: 'receiptNo', dataType: 'text' },
            { fieldName: 'ymd', dataType: 'text' },
            { fieldName: 'hms', dataType: 'text' },
            { fieldName: 'flag', dataType: 'text' },
        ];
        //pgeJnf00002Receipt 컬럼 정보 정의
        this.grdReceiptColumns = [
            {
                name: 'receiptNo',
                fieldName: 'receiptNo',
                header: { text: '영수증번호' },
                edit: false,
            },
            // {
            //   name: "flag",
            //   fieldName: "flag",
            //   header: { text: "정산구분" },
            //   edit: false,
            // }
        ];

        // pgeJnf00002Detail 필드 정보 정의
        this.grdDetailFields = [
            { fieldName: 'refundPenaltyPeriod', dataType: 'text' },
            { fieldName: 'refundYn', dataType: 'text' },
            { fieldName: 'memshpUid', dataType: 'text' },
            { fieldName: 'memberName', dataType: 'text' },
            { fieldName: 'birthday', dataType: 'text' },
            { fieldName: 'ageTypeCd', dataType: 'text' },
            { fieldName: 'ageTypeNm', dataType: 'text' },
            { fieldName: 'amt', dataType: 'number' },
            { fieldName: 'fstJoinDate', dataType: 'text' },
            { fieldName: 'issueDate', dataType: 'text' },
            { fieldName: 'expireDate', dataType: 'text' },
            { fieldName: 'paymentYmd', dataType: 'text' },
            { fieldName: 'ticketStatusValue', dataType: 'text' },
            { fieldName: 'ticketStatusValueNm', dataType: 'text' },
            { fieldName: 'itemNm', dataType: 'text' },
            { fieldName: 'ticketNo', dataType: 'text' },
            { fieldName: 'payerMemshpUid', dataType: 'text' },
            { fieldName: 'payerMemberName', dataType: 'text' },
            { fieldName: 'payerMemberKind', dataType: 'text' },
            { fieldName: 'oldTicketCd', dataType: 'text' },
            { fieldName: 'itemCd', dataType: 'text' },
            { fieldName: 'memberDcFg', dataType: 'text' },
            { fieldName: 'condTypeCd', dataType: 'text' },
            { fieldName: 'dcTypeCd', dataType: 'text' },
            { fieldName: 'dcNm', dataType: 'text' },
            { fieldName: 'price', dataType: 'text' },
            { fieldName: 'dcAmt', dataType: 'text' },
            { fieldName: 'dcAmt1', dataType: 'text' },
            { fieldName: 'saleAmt', dataType: 'text' },
            { fieldName: 'subTypeCd', dataType: 'text' },
            { fieldName: 'subAmt', dataType: 'text' },
            { fieldName: 'cardCompCd', dataType: 'text' },
            { fieldName: 'receiptNo', dataType: 'text' },
            { fieldName: 'joinDcnt', dataType: 'text' },
            { fieldName: 'mobileYn', dataType: 'text' },
            { fieldName: 'elEnterCnt', dataType: 'text' },
            { fieldName: 'cbEnterCnt', dataType: 'text' },
            { fieldName: 'penaltyAmt', dataType: 'number' },
            { fieldName: 'payerYn', dataType: 'text' },
            { fieldName: 'returnDeposit', dataType: 'text' },
            { fieldName: 'itemCnt', dataType: 'text' },
            { fieldName: 'depositAmt', dataType: 'number' },
            { fieldName: 'elUseAmt', dataType: 'text' },
            { fieldName: 'returnAmt', dataType: 'text' },
            { fieldName: 'totAmt', dataType: 'text' },
            { fieldName: 'cbUseAmt', dataType: 'text' },
            { fieldName: 'cbEnterAmt', dataType: 'text' },
            { fieldName: 'drmUseYn', dataType: 'text' },
            { fieldName: 'subFg', dataType: 'text' },
            { fieldName: 'changeArticleYn', dataType: 'text' },
            { fieldName: 'remark', dataType: 'text' },
            { fieldName: 'newReceiptNo', dataType: 'text' },
            { fieldName: 'gvSaleYmd', dataType: 'text' },
            { fieldName: 'gvUserId', dataType: 'text' },
            { fieldName: 'savePointAmt', dataType: 'text' }, // 적립포인트
            { fieldName: 'couponUsedAmt', dataType: 'text' }, // 지급쿠폰사용금액
            { fieldName: 'remainPointAmt', dataType: 'text' }, // 잔여포인트금액
            { fieldName: 'naPointAmt', dataType: 'text' }, // 가용포인트금액
            { fieldName: 'saveSchedlPointAmt', dataType: 'text' }, // 적립예정포인트금액
            { fieldName: 'preTicketYn', dataType: 'text' }, // 선가입 유무
            { fieldName: 'giveYn', dataType: 'text' }, // 양도여부
            { fieldName: 'knoxApprId', dataType: 'text' }, // 전체환불 상신ID
            { fieldName: 'knoxApprStatusValue', dataType: 'text' }, // 전체환불 상신 상태
        ];

        //pgeJnf00002Receipt 컬럼 정보 정의
        this.grdDetailColumns = [
            { name: 'payerMemberName', fieldName: 'payerMemberName', header: { text: '결제자' }, edit: false },    
            { name: 'memberName', fieldName: 'memberName', header: { text: '성명' }, edit: false },
            { name: 'ticketNo', fieldName: 'ticketNo', header: { text: '정기권번호' }, edit: false },
            { name: 'birthday', fieldName: 'birthday', header: { text: '생년월일' }, edit: false },
            { name: 'ageTypeNm', fieldName: 'ageTypeNm', header: { text: '인원유형' }, edit: false },
            { name: 'fstJoinDate', fieldName: 'fstJoinDate', header: { text: '가입일' }, edit: false },
            { name: 'issueDate', fieldName: 'issueDate', header: { text: '발급일' }, edit: false },
            { name: 'expireDate', fieldName: 'expireDate', header: { text: '만기일' }, edit: false },
            { name: 'amt', fieldName: 'amt', numberFormat: '#,##0', header: { text: '결제금액' }, edit: false },
            { name: 'itemNm', fieldName: 'itemNm', width: 250, header: { text: '권종명' }, edit: false },
            { name: 'refundYn', fieldName: 'refundYn', header: { text: '환불가능여부' }, edit: false },
        ];

        // pgeJnf00002Return 필드 정보 정의
        this.grdReturnFields = [
            { fieldName: 'refundPenaltyPeriod', dataType: 'text' },
            { fieldName: 'refundYn', dataType: 'text' },
            { fieldName: 'memshpUid', dataType: 'text' },
            { fieldName: 'memberName', dataType: 'text' },
            { fieldName: 'birthday', dataType: 'text' },
            { fieldName: 'ageTypeCd', dataType: 'text' },
            { fieldName: 'ageTypeNm', dataType: 'text' },
            { fieldName: 'amt', dataType: 'number' },
            { fieldName: 'fstJoinDate', dataType: 'text' },
            { fieldName: 'issueDate', dataType: 'text' },
            { fieldName: 'expireDate', dataType: 'text' },
            { fieldName: 'paymentYmd', dataType: 'text' },
            { fieldName: 'ticketStatusValue', dataType: 'text' },
            { fieldName: 'ticketStatusValueNm', dataType: 'text' },
            { fieldName: 'itemNm', dataType: 'text' },
            { fieldName: 'ticketNo', dataType: 'text' },
            { fieldName: 'payerMemshpUid', dataType: 'text' },
            { fieldName: 'payerMemberName', dataType: 'text' },
            { fieldName: 'oldTicketCd', dataType: 'text' },
            { fieldName: 'itemCd', dataType: 'text' },
            { fieldName: 'memberDcFg', dataType: 'text' },
            { fieldName: 'condTypeCd', dataType: 'text' },
            { fieldName: 'dcTypeCd', dataType: 'text' },
            { fieldName: 'dcNm', dataType: 'text' },
            { fieldName: 'price', dataType: 'number' },
            { fieldName: 'dcAmt', dataType: 'number' },
            { fieldName: 'dcAmt1', dataType: 'number' },
            { fieldName: 'saleAmt', dataType: 'text' },
            { fieldName: 'subTypeCd', dataType: 'text' },
            { fieldName: 'subAmt', dataType: 'text' },
            { fieldName: 'cardCompCd', dataType: 'text' },
            { fieldName: 'receiptNo', dataType: 'text' },
            { fieldName: 'joinDcnt', dataType: 'text' },
            { fieldName: 'mobileYn', dataType: 'text' },
            { fieldName: 'elEnterCnt', dataType: 'text' },
            { fieldName: 'cbEnterCnt', dataType: 'text' },
            { fieldName: 'penaltyAmt', dataType: 'number' },
            { fieldName: 'payerYn', dataType: 'text' },
            { fieldName: 'returnDeposit', dataType: 'text' },
            { fieldName: 'itemCnt', dataType: 'text' },
            { fieldName: 'depositAmt', dataType: 'number' },
            { fieldName: 'elUseAmt', dataType: 'number' },
            { fieldName: 'returnAmt', dataType: 'number' },
            { fieldName: 'totAmt', dataType: 'text' },
            { fieldName: 'cbUseAmt', dataType: 'number' },
            { fieldName: 'cbEnterAmt', dataType: 'number' },
            { fieldName: 'drmUseYn', dataType: 'text' },
            { fieldName: 'subFg', dataType: 'text' },
            { fieldName: 'changeArticleYn', dataType: 'text' },
            { fieldName: 'remark', dataType: 'text' },
            { fieldName: 'newReceiptNo', dataType: 'text' },
            { fieldName: 'gvSaleYmd', dataType: 'text' },
            { fieldName: 'gvUserId', dataType: 'text' },
            { fieldName: 'savePointAmt', dataType: 'number' }, // 적립포인트
            { fieldName: 'couponUsedAmt', dataType: 'number' }, // 지급쿠폰사용금액
            { fieldName: 'remainPointAmt', dataType: 'text' }, // 잔여포인트금액
            { fieldName: 'naPointAmt', dataType: 'text' }, // 가용포인트금액
            { fieldName: 'saveSchedlPointAmt', dataType: 'text' }, // 적립예정포인트금액
            { fieldName: 'preTicketYn', dataType: 'text' }, // 선가입 유무
            { fieldName: 'giveYn', dataType: 'text' }, // 양도여부
            { fieldName: 'knoxApprId', dataType: 'text' }, // 전체환불 상신ID
            { fieldName: 'knoxApprStatusValue', dataType: 'text' }, // 전체환불 상신 상태
        ];

        //pgeJnf00002Return 컬럼 정보 정의
        this.grdReturnColumns = [
            { name: 'memberName', fieldName: 'memberName', header: { text: '성명' }, edit: false },
            { name: 'ticketNo', fieldName: 'ticketNo', header: { text: '정기권번호' }, edit: false },
            { name: 'birthday', fieldName: 'birthday', header: { text: '생년월일' }, edit: false },
            { name: 'price', fieldName: 'price', numberFormat: '#,##0', header: { text: '정상가' }, edit: false }, // PRICE
            { name: 'dcAmt1', fieldName: 'dcAmt1', numberFormat: '#,##0', header: { text: '할인가' }, edit: false }, // DC_AMT1
            { name: 'dcNm', fieldName: 'dcNm', header: { text: '할인유형' }, edit: false }, // DC_TYPE
            {
                name: 'penaltyAmt',
                fieldName: 'penaltyAmt',
                numberFormat: '#,##0',
                header: { text: '위약금' },
                edit: false,
            }, // PENALTY_AMT
            { name: 'amt', fieldName: 'amt', numberFormat: '#,##0', header: { text: '판매가' }, edit: false }, // AMT
            {
                name: 'elEnterCnt',
                fieldName: 'elEnterCnt',
                numberFormat: '#,##0',
                header: { text: 'E/L이용횟수' },
                edit: false,
                styleCallback: function (grid, dataCell) {
                    var ret = {};
                    var elEnterCnt = grid.getValue(dataCell.index.itemIndex, 'elEnterCnt');
                    ret.renderer = elEnterCnt == '0' ? {} : { type: 'button' };
                    return ret;
                },
            }, // USE_CNT
            {
                name: 'elUseAmt',
                fieldName: 'elUseAmt',
                numberFormat: '#,##0',
                header: { text: '이용금액' },
                edit: false,
            }, // EL_USE_AMT
            {
                name: 'cbEnterCnt',
                fieldName: 'cbEnterCnt',
                numberFormat: '#,##0',
                header: { text: 'C/B이용횟수' },
                edit: false,
                styleCallback: function (grid, dataCell) {
                    var ret = {};
                    var cbEnterCnt = grid.getValue(dataCell.index.itemIndex, 'cbEnterCnt');
                    ret.renderer = cbEnterCnt == '0' ? {} : { type: 'button' };
                    return ret;
                },
            }, // CB_ENTER_CNT
            {
                name: 'cbEnterAmt',
                fieldName: 'cbEnterAmt',
                numberFormat: '#,##0',
                header: { text: '이용금액' },
                edit: false,
            }, // CB_ENTER_AMT
            {
                name: 'couponUsedAmt',
                fieldName: 'couponUsedAmt',
                numberFormat: '#,##0',
                header: { text: '지급쿠폰차감' },
                edit: false,
                styleCallback: function (grid, dataCell) {
                    var ret = {};
                    var couponUsedAmt = grid.getValue(dataCell.index.itemIndex, 'couponUsedAmt');
                    ret.renderer = couponUsedAmt == '0' ? {} : { type: 'button' };
                    return ret;
                },
            },
            /*
            {
                name: 'savePointAmt',
                fieldName: 'savePointAmt',
                numberFormat: '#,##0',
                header: { text: '적립포인트' },
                edit: false,
            },
            */
            {
                name: 'returnAmt',
                fieldName: 'returnAmt',
                numberFormat: '#,##0',
                header: { text: '환불금액' },
                edit: false,
            }, // RETURN_AMT
        ];

        // pgeJnf00002Card 필드 정보 정의
        this.grdCardFields = [
            { fieldName: 'cardNo', dataType: 'text' },
            { fieldName: 'encCardNo', dataType: 'text' },
            { fieldName: 'apprDate', dataType: 'text' },
            { fieldName: 'apprTime', dataType: 'text' },
            { fieldName: 'cardNoKind', dataType: 'text' },
            { fieldName: 'inputKind', dataType: 'text' },
            { fieldName: 'statusKind', dataType: 'text' },
            { fieldName: 'apprNo', dataType: 'text' },
            { fieldName: 'expireYm', dataType: 'text' },
            { fieldName: 'compCode', dataType: 'text' },
            { fieldName: 'vanKind', dataType: 'text' },
            { fieldName: 'divideGigan', dataType: 'text' },
            { fieldName: 'apprAmt', dataType: 'text' },
            { fieldName: 'cancelDate', dataType: 'text' },
            { fieldName: 'cancelTime', dataType: 'text' },
            { fieldName: 'cancelApprNo', dataType: 'text' },
            { fieldName: 'cardSvcCd', dataType: 'text' },
            { fieldName: 'eSign', dataType: 'text' },
            { fieldName: 'eSignYn', dataType: 'text' },
            { fieldName: 'rePaymentYn', dataType: 'text' },
            { fieldName: 'tranUniqueNbr', dataType: 'text' },
            { fieldName: 'emvYn', dataType: 'text' },
            { fieldName: 'emv', dataType: 'text' },
            { fieldName: 'fallBackCode', dataType: 'text' },
        ];

        //pgeJnf00002Card 컬럼 정보 정의
        this.grdCardColumns = [
            { name: 'cardNo', fieldName: 'cardNo', header: { text: '신용카드번호' }, edit: false },
            { name: 'apprDate', fieldName: 'apprDate', header: { text: '승인일자' }, edit: false },
            { name: 'apprTime', fieldName: 'apprTime', header: { text: '승인시각' }, edit: false },
            { name: 'apprNo', fieldName: 'apprTime', header: { text: '승인번호' }, edit: false },
            { name: 'expireYm', fieldName: 'expireYm', header: { text: '유효기간' }, edit: false },
            { name: 'compCode', fieldName: 'compCode', header: { text: '신용카드사' }, edit: false },
            { name: 'divideGigan', fieldName: 'divideGigan', header: { text: '할부기간' }, edit: false },
            { name: 'apprAmt', fieldName: 'apprAmt', header: { text: '승인금액' }, edit: false },
            { name: 'statusKind', fieldName: 'statusKind', header: { text: '처리상태' }, edit: false },
            { name: 'cancelDate', fieldName: 'cancelDate', header: { text: '취소일자' }, edit: false },
            { name: 'cancelTime', fieldName: 'cancelTime', header: { text: '취소시각' }, edit: false },
            { name: 'tranUniqueNbr', fieldName: 'tranUniqueNbr', header: { text: '취소승인번호' }, edit: false },
        ];
    },
    computed: {
        modalCashCancelReason() {
            return this.$refs.modalCashCancelReason;
        },

        /**
         * 검색창 Mask
         */
        searchTextMask() {
            // 정기권번호
            if (this.memshpOption == '33') {
                return 'N#########';
            }
            // 영수증번호
            else if (this.memshpOption == '44') {
                return null;
            }
            //멤버십QR
            else if (this.memshpOption == '55') {
                return '##########';
            }
            //멤버십QR
            else if (this.memshpOption == '66') {
                return null;
            }
        },
    },
    watch: {
        // 대상자 Total 값이 변경되면,
        targetCnt() {
            console.log('watch > targetCnt : ', this.targetCnt);
            if (this.toInt(this.targetCnt) == 0) {
                this.btnRefund = '0';
            } else {
                this.btnRefund = '1';
            }
            this.fnControlButton();
        },
    },
    async mounted() {
        //파크구분
        this.parkKind = this.$store.getters.userInfo.parkFg;
        this.parkPosKind = this.$store.getters.userInfo.parkPosFg;
        this.posId = this.$store.getters.userInfo.posId;
        this.posNm = this.$store.getters.userInfo.posNm;
        this.icReaderUseYn = this.$store.getters.userInfo.icReaderUseYn;
        this.icReaderPort = this.$store.getters.userInfo.icReaderPort;
        this.icReaderSpeed = this.$store.getters.userInfo.icReaderSpeed;
        
        //매출일자
        this.nowDate = this.$store.getters.userInfo.saleDate;

        console.log('mounted > this.parkPosKind:' + this.parkPosKind);
        console.log('mounted > this.posId:' + this.posId);
        console.log('mounted > this.icReaderPort:' + this.icReaderPort);
        console.log('mounted > this.icReaderSpeed:' + this.icReaderSpeed);

        //접수 POS인지 체크
        this.isPos = utils.checkReceiptPos(this.parkPosKind, this.posId, this.icReaderPort, this.icReaderSpeed);
        if (!this.isPos) {
            this.posSodStatus = {};
            this.posSodStatus.message = 'POS로 등록된 PC가 아닙니다.';
            utils.messageBox('alert', this.posSodStatus.message);
        }

        //접수 POS인 경우만 무결성 체크 진행
        if (this.isPos && this.icReaderUseYn == 'Y') {
            //card popup 관련 초기화
            this.cardPopupUtils = new CardPopupUtils();
            this.webrtcDatachannel = new WebrtcDatachannel(
                this.$options.name, //thisPage
                this.$store.getters.userInfo.userIp // ip
            );

            await this.webrtcDatachannel.initSecure(); // webrtc 통신 암호화 위한 설정

            //POS SOD 상태 조회
            this.posSodStatus = await utils.checkPosSod(this.parkPosKind, this.posId);

            //카드 무결성 체크 창 열기
            this.cinformOpenPopupCheck();
        }

        // 검색박스 활성화
        this.memshpOption = '33';

        this.btnFlag = '1';
        this.optionFlag = '1';
        this.$refs.srchVal.focus();

        // 카드 데이터 데스트증 삭제 할것
        //this.memshpOption = "44";
        //this.srchVal = '20230523C100V38010200001';

        //card popup 관련 초기화
        this.cardPopupUtils = new CardPopupUtils();
        this.webrtcDatachannel = new WebrtcDatachannel(
            this.$options.name, //thisPage
            this.$store.getters.userInfo.userIp // ip
        );

        await this.webrtcDatachannel.initSecure(); // webrtc 통신 암호화 위한 설정
        //setTimeout(this.$refs.srchVal.focus(), 100);

        this.isCardGrd = false;
    },
    methods: {
        getReturnAmt(val){
            return utils.numberFormat(val, 0);
        },
        getReturnAmtFontColor(val) {
            if (this.toInt(val) < 0) {
                return "red";
            }
            else {
                return "";
            }
        },
        grdReceiptMounted() {
            //grid 초기화
            ({ gridView: this.gvReceipt, dataProvider: this.dpReceipt } = this.$refs.pgeJnf00002Receipt.initGrid());

            // grid Receipt ROW 변경시 이벤트
            this.gvReceipt.onCurrentRowChanged = (grid, oldRow, newRow) => {
                this.grdReceiptCurrentRowChanged(grid, oldRow, newRow);
            };

            // grid style set
            this.$refs.pgeJnf00002Receipt.setFitStyle('even');
        },
        grdDetailMounted() {
            //grid 초기화
            ({ gridView: this.gvDetail, dataProvider: this.dpDetail } = this.$refs.pgeJnf00002Detail.initGrid());

            // grid Detail ROW 변경시 이벤트
            this.gvDetail.onCurrentRowChanged = (grid, oldRow, newRow) => {
                this.grdDetailCurrentRowChanged(grid, oldRow, newRow);
            };

            // grid style set
            this.$refs.pgeJnf00002Detail.setFitStyle('even');
        },
        grdReturnMounted() {
            //grid 초기화
            ({ gridView: this.gvReturn, dataProvider: this.dpReturn } = this.$refs.pgeJnf00002Return.initGrid());

            // grid style set
            this.$refs.pgeJnf00002Return.setFitStyle('even');
        },

        /**
         * 조회구분 클릭
         * @param { String } searchGubn
         */
        clickSearchGubn(searchGubn) {
            switch (searchGubn) {
                //성명, 휴대폰 클릭시 멤버십 가입자리스트 팝업 호출
                case 'name':
                    this.btnFlag = '0';
                    this.optionFlag = '1';
                    this.srchVal = '';
                    // 멤버십 팝업 호출
                    this.popup();
                    break;
                case 'mobile':
                    this.btnFlag = '0';
                    this.optionFlag = '1';
                    this.srchVal = '';
                    // 멤버십 팝업 호출
                    this.popup();
                    break;
                //정기권, 예약확인증번호, 멤버십QR 호출시 텍스트창 활성화
                case 'ticket':
                    this.btnFlag = '1';
                    this.optionFlag = '1';
                    this.$refs.srchVal.focus();
                    break;
                case 'receipt':
                    this.btnFlag = '0';
                    this.optionFlag = '1';
                    this.$refs.srchVal.focus();
                    break;
                case 'memshpUid':
                    this.btnFlag = '0';
                    this.optionFlag = '1';
                    this.$refs.srchVal.focus();
                    break;
                case 'qr':
                    this.btnFlag = '0';
                    this.optionFlag = '1';
                    this.$refs.srchVal.focus();
                    break;
            }
        },

        // 조회조건: 입력값 Enterkey
        srchValEnterDown() {
            console.log('methods : srchValEnterDown : srchVal : ' + this.srchVal);
            console.log('methods : srchValEnterDown : memshpOption : ' + this.memshpOption);

            let searchValue = (utils.length(this.srchVal) == 0)? '' : this.srchVal.trim();
            if (this.memshpOption == '33') {
                // 정기권번호
                if (searchValue.length != 10) {
                    utils.messageBox('alert', '정기권번호 10자리 입력하십시요.', null, () => {
                        this.$refs.srchVal.focus();
                    });
                    return;
                } else {
                    this.fnSearchReceipt('TICKET', '', this.srchVal, '', '');
                }
            } else if (this.memshpOption == '44') {
                // 영수증번호
                if (searchValue.length != 24) {
                    utils.messageBox('alert', '영수증번호 24자리 입력하십시요.', null, () => {
                        this.$refs.srchVal.focus();
                    });
                    return;
                } else {
                    this.fnSearchReceipt('RECEIPT', this.srchVal, '', '', '');
                }
            } else if (this.memshpOption == '55') {
                // 멤버십QR
                if (searchValue.length != 10) {
                    utils.messageBox('alert', '멤버십UID 10자리 입력하십시요.', null, () => {
                        this.$refs.srchVal.focus();
                    });
                    return;
                } else {
                    this.fnSearchReceipt('MEMSHPUID', '', '', this.srchVal, '');
                }
            }
             else if (this.memshpOption == '66') {
                // 멤버십QR
                if (searchValue.length != 16) {
                    utils.messageBox('alert', '멤버십QR 16자리 입력하십시요.', null, () => {
                        this.$refs.srchVal.focus();
                    });
                    return;
                } else {
                    this.fnSearchReceipt('CARDNO', '', '', '', this.srchVal);
                }
            }
        },

        // EL/CB/COUPON 이용건,  팝업
        usedPopup(pType, pMemshpUid, pTicketNo, pMemberName, pReceiptNo) {
            let pageInitialData = {};
            pageInitialData.targetFg = pType;
            pageInitialData.memshpUid = pMemshpUid;
            pageInitialData.ticketNo = pTicketNo;
            pageInitialData.memberName = pMemberName;
            pageInitialData.receiptNo = pReceiptNo;

            let targetPage = 'PGE_JNF_00003';
            if (pType == 'COUPON') {
                targetPage = 'PGE_JNF_00005';
            } else if (pType == 'CB') {
                targetPage = 'PGE_JNF_00004';
            }

            utils.openLayerPopup(targetPage, this.onUsedPopupCallback, {
                pageInitialData: pageInitialData,
                size: 'lg',
            });
        },
        onUsedPopupCallback(data) {},

        // 가입자리스트 검색 팝업
        popup() {
            let pageInitialData = {};
            if (this.memshpOption == '33') pageInitialData.ticketNo = this.srchVal;

            utils.openLayerPopup('PGE_CTM_00011', this.onPopupCallback, {
                pageInitialData: pageInitialData,
                size: 'lg',
            });
        },

        // 가입자리스트 검색 팝업 Call Back
        onPopupCallback(data) {
            console.info(data);
            if (data) {
                this.memshpInfo = data;

                //this.memshpOption = "33";
                //this.srchVal = this.memshpInfo.ticketNo;
                //this.fnSearchReceipt("TICKET", "", this.srchVal, "");

                this.memshpOption = '55';
                this.srchVal = this.memshpInfo.memshpUid;
                this.fnSearchReceipt('MEMSHPUID', '', '', this.srchVal);
            }
        },

        // 초기화 버튼
        fnReSet(bFlag) {
            //조회 조건
            if (bFlag) {
                this.memshpOption = '33';
                this.btnFlag = '1';
                this.optionFlag = '1';
                this.srchVal = '';
                this.$refs.srchVal.focus();
            }

            this.btnRefund = true;
            this.btnRefundAppr = true;
            this.btnRefundAll = true;

            // 전역변수
            this.pvRECEIPT_NO = '';
            this.pvIS_RETURN_FG = '';
            this.pvCASH_YN = '';
            this.pvSaleYmd = '';
            this.pvPosId = '';
            this.pvApprMemshpUid = '';
            this.pvApprTicketNo = '';
            this.pvMgiftCardStatus = '';

            // 그리드 초기화
            this.dpReceipt.clearRows();
            this.dpDetail.clearRows();
            this.dpReturn.clearRows();

            this.billDVO = null;
            this.validDVO = null;
            this.cardDataList = [];
            this.cardCancelDataList = [];
            this.retCardData = null;
            this.retCashData = null;

            this.detailCnt = 0;
            this.targetCnt = 0;
            this.returnCnt = 0;

            this.stcMsg = '';
            this.stcReturn = '';
            this.returnAmt = null;
            this.mgiftReturn = null;
            this.memshpReturn = null;
            this.cashReturn = null;

            // 정산상세
            this.paymntDate = '';
            this.saleAmt = 0;
            this.cashAmt = 0;
            this.webAmt = 0;
            this.giftcardAmt = 0;
            this.creditAmt = 0;
            this.cardAmt = 0;
            this.pointAmt = 0;
            this.preticketAmt = 0;
            this.restGiftAmt = 0;
            this.rTranUniqueNbr = '';

            this.savePointAmt = 0;
            this.remainPointAmt = 0;
            this.naPointAmt = 0;
            this.saveSchedlPointAmt = 0;

            this.reason = '';
            this.signData = '';
        },

        // 조회 버튼
        fnSearch() {
            this.srchValEnterDown();
        },

        // 조회(영수증)
        fnSearchReceipt(pFlag, pKeyword='', pTicketNo='', pMemshpUid='', pCardNo='') {
            // 조회
            const queryParams = {
                flag: pFlag,
                keyword: pKeyword,
                ticketNo: pTicketNo,
                memshpUid: pMemshpUid,
                cardNo: pCardNo,
            };

            http.request(this.$options.name, 'DTS_JNF_00001', {
                query: queryParams,
            }).then((res) => {
                if (res.data) {
                    let resData = res.data;
                    if (resData.length == 0) {
                        utils.messageBox('alert', '조회된 데이타가 없습니다.');
                        this.fnReSet(false);
                    } else {
                        this.stcMsg = '';
                        this.stcReturn = '';
                        this.returnAmt = null;
                        this.mgiftReturn = null;
                        this.memshpReturn = null;
                        this.cashReturn = null;

                        this.targetCnt = 0;
                        this.btnRefundAppr = '0';
                        this.btnRefundAll = '0';

                        this.grdReceiptDataList = utils.map(resData, (row) => {
                            //row.name = utils.changeMaskingCenter(row.name);
                            //row.birthMmdd = utils.toStringByFormat(utils.toDate(row.birthMmdd), 'YYYY-MM-DD');
                            return row;
                        });
                        this.$refs.pgeJnf00002Receipt.setRows(this.grdReceiptDataList);
                        this.fnSetFocusBygvReceipt();
                    }
                } else {
                    utils.messageBox('alert', '조회된 데이타가 없습니다.');
                    this.fnReSet(false);
                }
            });
        },

        // pgeJnf00002Receipt set focus : 영수증정보 조회 후, 영수중 상세정보를 get 하기 위한 포커스 셋
        fnSetFocusBygvReceipt() {
            console.log('methods > fnSetFocusBygvReceipt');
            let focusCell = this.gvReceipt.getCurrent();
            focusCell.dataRow = 0;
            focusCell.column = 'receiptNo';
            focusCell.fieldName = 'receiptNo';

            this.gvReceipt.setCurrent(focusCell);
        },
        // pgeJnf00002Detail set focus : [상세내역] 조회 후, [멤버십 포인트 내역] 포커스 셋
        fnSetFocusBygvDetail() {
            console.log('methods > fnSetFocusBygvDetail');
            let focusCell = this.gvDetail.getCurrent();
            focusCell.dataRow = 0;
            focusCell.column = 'memberName';
            focusCell.fieldName = 'memberName';

            this.gvDetail.setCurrent(focusCell);
        },
        grdReceiptDbCellClick(data) {},

        // 그리드_대상자_클릭
        grdReturnCellClick(grid, data) {
            console.log('methods > grdReturnCellClick > dataRow:' + data.dataRow);
            console.log('methods > grdReturnCellClick > column:' + data.column);

            if (data.dataRow == undefined) return;

            let memshpUid = this.dpReturn.getValue(data.dataRow, 'memshpUid');
            let memberName = this.dpReturn.getValue(data.dataRow, 'memberName');
            let ticketNo = this.dpReturn.getValue(data.dataRow, 'ticketNo');
            let receiptNo = this.dpReturn.getValue(data.dataRow, 'receiptNo');

            console.log('methods > grdReturnCellClick > memshpUid:' + memshpUid);
            console.log('methods > grdReturnCellClick > memberName:' + memberName);
            console.log('methods > grdReturnCellClick > ticketNo:' + ticketNo);
            console.log('methods > grdReturnCellClick > receiptNo:' + receiptNo);

            if ('elEnterCnt' == data.column) {
                let elEnterCnt = this.dpReturn.getValue(data.dataRow, 'elEnterCnt');
                if (Number(elEnterCnt) > 0) {
                    this.usedPopup('EL', memshpUid, ticketNo, memberName, receiptNo);
                }
            } else if ('cbEnterCnt' == data.column) {
                let cbEnterCnt = this.dpReturn.getValue(data.dataRow, 'cbEnterCnt');
                if (Number(cbEnterCnt) > 0) {
                    this.usedPopup('CB', memshpUid, ticketNo, memberName, receiptNo);
                }
            } else if ('couponUsedAmt' == data.column) {
                let couponUsedAmt = this.dpReturn.getValue(data.dataRow, 'couponUsedAmt');
                if (Number(couponUsedAmt) > 0) {
                    this.usedPopup('COUPON', memshpUid, ticketNo, memberName, receiptNo);
                }
            }
        },

        // grid Receipt ROW 변경시 이벤트
        grdReceiptCurrentRowChanged(grid, oldRow, newRow) {
            console.log('methods > grdReceiptCurrentRowChanged > oldRow:' + oldRow);
            console.log('methods > grdReceiptCurrentRowChanged > newRow:' + newRow);

            // 대상자 초기화
            this.dpReturn.clearRows();

            if (newRow < 0) return;

            let flag = this.dpReceipt.getValue(newRow, 'flag');
            if (flag == '3') {
                //utils.messageBox('alert', "선가입 데이터 입니다. (스마트예약 마이페이지에서 손님 직접 취소로 안내)");
                //return;
            } else if (flag == '2') {
                // 환불 TEXT. able
            } else {
                // 환불 TEXT. disable
            }

            // 환불정보 상세 조회
            let receiptNo = this.dpReceipt.getValue(newRow, 'receiptNo');
            this.fnSearchRefundList(receiptNo, flag);
        },

        // grid Detail ROW 변경시 이벤트
        grdDetailCurrentRowChanged(grid, oldRow, newRow) {
            console.log('methods > grdDetailCurrentRowChanged > oldRow:' + oldRow);
            console.log('methods > grdDetailCurrentRowChanged > newRow:' + newRow);
        },

        // 환불정보 상세 조회
        fnSearchRefundList(pReceiptNo, pFlag) {
            console.log('methods > fnSearchRefundList > receiptNo:' + pReceiptNo);

            const queryParams = {
                receiptNo: pReceiptNo,
                flag: pFlag,
            };
            http.request(this.$options.name, 'DTS_JNF_00002', {
                query: queryParams,
            }).then((res) => {
                if (res.data) {
                    // divCash.Visible = false;

                    let isReturnFg = res.data.isReturnFg;
                    if (isReturnFg == '0') {
                        this.detailCnt = 0;
                        utils.messageBox('alert', '조회된 데이타가 없습니다.');
                    } else {
                        // 전역변수 매핑
                        this.pvRECEIPT_NO = pReceiptNo;
                        this.pvCASH_YN = res.data.cashYn;
                        this.pvSaleYmd = res.data.saleYmd;
                        this.pvPosId = res.data.gvPosId;
                        this.pvMgiftCardStatus = res.data.mgiftCardStatus;

                        if (!utils.isNull(res.data.tranUniqueNbr)) {
                            //this.rTranUniqueNbr = res.data.rTranUniqueNbr;  //van 사 고유번호
                            this.rTranUniqueNbr = res.data.tranUniqueNbr; //van 사 고유번호
                        }

                        // "환불" 문구 --> pFlag
                        if (pFlag == '2') {
                            //stcRerutn.Visible = true;
                            // "환불" 문구 표시
                        } else {
                            //stcRerutn.Visible = false;
                            // "환불" 문구 미표시
                        }
                        this.srchVal = '';

                        // 상세내역
                        let detailData = res.data.refundDetailList;

                        this.dpDetail.fillJsonData(detailData, { fillMode: 'set' });
                        let jsonObj = this.dpDetail.getJsonRow(0);
                        console.log(jsonObj);

                        this.grdDetailDataList = utils.map(detailData, (row) => {
                            row.birthday = utils.toStringByFormat(utils.toDate(row.birthday), 'YYYY-MM-DD');
                            row.fstJoinDate = utils.toStringByFormat(utils.toDate(row.fstJoinDate), 'YYYY-MM-DD');
                            row.issueDate = utils.toStringByFormat(utils.toDate(row.issueDate), 'YYYY-MM-DD');
                            row.expireDate = utils.toStringByFormat(utils.toDate(row.expireDate), 'YYYY-MM-DD');
                            return row;
                        });

                        this.detailCnt = detailData.length;

                        this.$refs.pgeJnf00002Detail.setRows(this.grdDetailDataList);

                        // 정산상세
                        let billData = res.data.billDVO;
                        this.billDVO = billData;
                        console.log('methods > fnSearchRefundList > billData.paymntDate:' + billData.paymntDate);
                        console.log('methods > fnSearchRefundList > billData.receiptCnt:' + billData.receiptCnt);

                        this.paymntDate = utils.toStringByFormat(utils.toDate(billData.paymntDate), 'YYYY-MM-DD');
                        this.saleAmt = billData.saleAmt;
                        this.cashAmt = billData.cashAmt;
                        this.webAmt = billData.webAmt;
                        this.giftcardAmt = billData.giftcardAmt;
                        this.creditAmt = billData.creditAmt;
                        this.cardAmt = billData.cardAmt;
                        this.preticketAmt = billData.preticketAmt;
                        this.pointAmt = billData.pointAmt;
                        this.restGiftAmt = billData.restGiftAmt;

                        // 멤버십 포인트 내역 SET
                        let pointData = res.data.memshpPointDVO;
                        this.savePointAmt = pointData.savePointAmt; // savePointAmt_적립포인트
                        this.remainPointAmt = pointData.remainPointAmt; // remainPointAmt_잔여포인트금액
                        this.naPointAmt = pointData.naPointAmt; // naPointAmt_가용포인트금액
                        this.saveSchedlPointAmt = pointData.saveSchedlPointAmt; // saveSchedlPointAmt_적립예정포인트금액

                        // dsCard
                        let cardData = res.data.cardDetailList;
                        this.cardDataList = cardData;
                        this.cardCancelDataList = cardData;

                        // 환불금 요약정보
                        let returnDetail = res.data.returnDVO;
                        this.returnDetailDVO = returnDetail;

                        this.fnSetFocusBygvDetail();

                        //this.fnReturnFg();
                        this.fnReturnFg(billData.receiptCnt);
                    }
                } else {
                    this.detailCnt = 0;
                    utils.messageBox('alert', '조회된 데이타가 없습니다.');
                }
            });
        },

        // 환불 구분값 설정
        fnReturnFg(receiptCnt) {
            if (this.dpReceipt.getRowCount() == 0) {
                return;
            }

            let receipYMD = this.pvRECEIPT_NO.substr(0, 8);
            // pvSaleYmd
            let couponUsedAmt = 0;
            let penaltyAmt = 0;

            for (let i = 0; i < this.dpDetail.getRowCount(); i++) {
                couponUsedAmt += this.toInt(this.dpDetail.getValue(i, 'couponUsedAmt')); // returnDeposit
                penaltyAmt += this.toInt(this.dpDetail.getValue(i, 'penaltyAmt'));
            }
            console.log('methods > fnReturnFg > couponUsedAmt:' + couponUsedAmt);
            console.log('methods > fnReturnFg > penalty:' + penaltyAmt);

            // pvIS_RETURN_FG: 전역변수 환불구분값 (0:현금 환불, 1:당일취소, 2:청구취소)
            // 이용실적이 없고 위약금이 발생하지 않았을 경우
            if (couponUsedAmt == 0 && penaltyAmt == 0) {
                // pvEarnDreamPT_YN == 'N'
                // 영수증번호에, 환불이력이 있는 영수증번호가 있다면 '현금환불'
                if (receiptCnt > 0) {
                    this.pvIS_RETURN_FG = '0';
                } else if (receipYMD == this.pvSaleYmd) {
                    this.pvIS_RETURN_FG = '1';
                } else {
                    // 14일 이내에 환불처리시. ( 당일 포함 14일 이내 )
                    let saleYmd = utils.toDate(this.pvSaleYmd);
                    let receiptYMD = utils.toDate(receipYMD);

                    console.log('methods > fnReturnFg > saleYmd:' + saleYmd);
                    console.log('methods > fnReturnFg > receiptYMD:' + receiptYMD);
                    console.log('methods > fnReturnFg > diff:' + utils.getDayOffset(saleYmd, receiptYMD));

                    let dsCard = this.cardDataList[0];
                    let approveYmd = '';
                    console.log('methods > fnReturnFg > dsCard:' + dsCard);
                    if (dsCard != null) {
                        approveYmd = dsCard.apprDate;
                    }

                    if (utils.getDayOffset(saleYmd, receiptYMD) < 14) {
                        // 당일 재결제한 데이터의 경우에는 환불 시 청구취소대신 승인 취소로 환불처리한다.
                        if (this.pvSaleYmd == approveYmd) {
                            // 승인일자와 영업일자가 같은 경우에는 당일 취소로 처리한다.
                            this.pvIS_RETURN_FG = '1';
                        } else {
                            this.pvIS_RETURN_FG = '2';
                        }
                    } else {
                        this.pvIS_RETURN_FG = '0';
                    }
                    this.fnRefundMsg('');
                }
            } else {
                this.pvIS_RETURN_FG = '0';
            }
            console.log('methods > fnReturnFg > pvIS_RETURN_FG:' + this.pvIS_RETURN_FG);
            console.log('methods > fnReturnFg > pvCASH_YN:' + this.pvCASH_YN);
        },

        // 그리드_대상자 더블클릭
        grdReturnDbCellClick(data) {
            console.log('grdReturnDbCellClick > data.dataRow:' + data.dataRow);

            if (data.dataRow == undefined) return;

            let tCnt = this.dpReturn.getRowCount();
            if (this.pvIS_RETURN_FG == '0' || tCnt == 1) {
                this.dpReturn.removeRow(data.dataRow);
                // 환불금 계산
                this.fnCaluReturnAmt(false);
            } else {
                let txt_add = '';
                if (this.pvIS_RETURN_FG == '1') {
                    txt_add = '당일취소는 부분취소 불가입니다.\n\n전체 삭제하겠습니까?';
                } else if (this.pvIS_RETURN_FG == '2') {
                    txt_add = '청구취소는 부분취소 불가입니다.\n\n전체 삭제하겠습니까?';
                }
                utils.messageBox(
                    'confirm',
                    txt_add,
                    null,
                    (/* ok */) => {
                        this.dpReturn.clearRows();
                        // 환불금 계산
                        this.fnCaluReturnAmt(false);
                        // 대상자 Total
                        this.targetCnt = this.dpReturn.getRowCount();
                    },
                    (/* cancel */) => {
                        return;
                    }
                );
            }
            // 대상자 Total
            this.targetCnt = this.dpReturn.getRowCount();
        },

        // 그리드_상세내역_더블클릭
        grdDetailDbCellClick(data) {
            console.log('methods > grdDetailDbCellClick > pvIS_RETURN_FG:' + this.pvIS_RETURN_FG);
            console.log('grdDetailDbCellClick > data.dataRow:' + data.dataRow);
            if (data.dataRow == undefined) return;

            if (this.pvIS_RETURN_FG == '1') {
                for (let i = 0; i < this.dpDetail.getRowCount(); i++) {
                    if (this.fnAddRow(i) == false) {
                        return false;
                    }
                }

                // 웹 예약 결제의 건
                if (Number(this.billDVO.webAmt) > 0) {
                    this.fnRefundMsg(
                        '환불처리 완료 후 [에버랜드 APP]-[예약내역]-[예약취소] 버튼을 눌러주셔야 됩니다(최종 환불까지 4~6일 소요)'
                    );
                } else {
                    if (Number(this.billDVO.cardAmt) > 0) {
                        this.fnRefundMsg(
                            '전체금액 환불로 신용카드 승인이 자동 취소됩니다. 카드사 영업일 기준 4~6일 소요.'
                        );
                    } else {
                        this.fnRefundMsg('현금환불입니다.');
                    }
                }
            } else if (this.pvIS_RETURN_FG == '2') {
                for (let i = 0; i < this.dpDetail.getRowCount(); i++) {
                    if (this.fnAddRow(i) == false) {
                        return false;
                    }
                }

                // 웹 예약 결제의 건
                if (Number(this.billDVO.webAmt) > 0) {
                    this.fnRefundMsg(
                        '환불처리 완료 후 [에버랜드 APP]-[예약내역]-[예약취소] 버튼을 눌러주셔야 됩니다(최종 환불까지 4~6일 소요)'
                    );
                } else {
                    if (Number(this.billDVO.cardAmt) > 0) {
                        this.fnRefundMsg(
                            '전체금액 환불로 신용카드 승인이 자동 취소됩니다. 카드사 영업일 기준 4~6일 소요.'
                        );
                    } else {
                        this.fnRefundMsg('현금환불입니다.');
                    }
                }
            } else {
                if (this.fnAddRow(data.dataRow) == true) {
                    if (Number(this.billDVO.webAmt) == 0) {
                        this.fnRefundMsg('현금환불입니다.');
                    } else {
                        // 웹 예약 결제의 건
                        console.log('grdDetailDbCellClick > 웹 예약 결제의 건==>');

                        // 환불금 요약정보 가 있다면,
                        //console.log('methods > fnAddRow > returnDetailDVO.receiptNo:' + this.returnDetailDVO.receiptNo);
                        if (!utils.isNull(this.returnDetailDVO)) {
                            let nAmt = 0; // 판매금액
                            let nReturnAmt = 0; // 환불금액 -> 원결제금액에서 위약금+이용금액을 제한 금액
                            let nPenaltyAmt = 0; // 위약금 + 이용금액
                            let nMgiftAmt = Number(this.returnDetailDVO.payMgift); // 기프트카드 사용금액
                            let nMgiftOthersAmt = Number(this.returnDetailDVO.pay04); // 기프트카드 이외 사용금액

                            for (let i = 0; i < this.dpReturn.getRowCount(); i++) {
                                nAmt += Number(this.dpReturn.getValue(i, 'amt'));
                                nReturnAmt += Number(this.dpReturn.getValue(i, 'returnAmt'));
                            }
                            nPenaltyAmt = nAmt - nReturnAmt;

                            console.log('methods > grdDetailDbCellClick > nAmt:' + nAmt);
                            console.log('methods > grdDetailDbCellClick > nReturnAmt:' + nReturnAmt);
                            console.log('methods > grdDetailDbCellClick > nPenaltyAmt:' + nPenaltyAmt);
                            console.log('methods > grdDetailDbCellClick > nMgiftAmt:' + nMgiftAmt);
                            console.log('methods > grdDetailDbCellClick > nMgiftOthersAmt:' + nMgiftOthersAmt);

                            // 모바일 기프트카드로만 결제한 경우
                            if (nAmt == nMgiftAmt) {
                                this.fnRefundMsg('시스템 자동 환불 대상입니다.');
                            } else {
                                this.fnRefundMsg('센터 환불처리 대상(현금) or 입금실 부분청구 취소 요청');
                            }
                        }
                    }
                }
            }
            // 대상자 Total
            this.targetCnt = this.dpReturn.getRowCount();
        },

        // 적용 버튼 클릭 : 김상현프로 적용버튼 삭제
        fnAdd() {
            this.getCheckedItems();

            if (this.checkedList.length == 0) {
                utils.messageBox('alert', '선택된 항목이 없습니다.');
                return false;
            }

            console.log('methods > fnAdd > pvIS_RETURN_FG:' + this.pvIS_RETURN_FG);

            let txt_add = '';
            if (this.pvIS_RETURN_FG == '1') {
                txt_add = '당일취소는 부분취소 불가입니다.\n\n전체 추가하겠습니까?';
            } else if (this.pvIS_RETURN_FG == '2') {
                txt_add = '청구취소는 부분취소 불가입니다.\n\n전체 추가하겠습니까?';
            }

            if (this.pvIS_RETURN_FG == '1' || this.pvIS_RETURN_FG == '2') {
                utils.messageBox(
                    'confirm',
                    txt_add,
                    null,
                    (/* ok */) => {
                        for (let i = 0; i < this.dpDetail.getRowCount(); i++) {
                            if (this.fnAddRow(i) == false) {
                                this.dpReturn.clearRows();
                                return false;
                            }
                        }
                    },
                    (/* cancel */) => {
                        return false;
                    }
                );
            } else {
                let checkedRow;
                for (let k = 0; k < this.checkedList.length; k++) {
                    checkedRow = this.checkedList[k];
                    console.log('methods > fnAdd > checkedRow:' + checkedRow);
                    if (this.fnAddRow(checkedRow) == false) {
                        return false;
                    }
                }
            }
        },

        // 환불대상 ROW Validation && 추가
        fnAddRow(nRow) {
            console.log('methods > fnAddRow > nRow:' + nRow);

            let status = this.dpDetail.getValue(nRow, 'ticketStatusValue');

            console.log('methods > fnAddRow > status:' + status);
            console.log('methods > fnAddRow > paymntDate:' + this.paymntDate);
            console.log('methods > fnAddRow > expireDate:' + this.dpDetail.getValue(nRow, 'expireDate'));

            if (utils.isNull(this.paymntDate)) {
                utils.messageBox('alert', '결제 내역이 존재 하지않습니다. 확인바랍니다.');
                return false;
            }

            let sMemshpUid = this.dpDetail.getValue(nRow, 'memshpUid');
            let options = {
                fields: ['memshpUid'],
                value: sMemshpUid,
                startIndex: 0,
                startFieldIndex: 0,
                wrap: true,
                caseSensitive: false,
                partialMatch: false,
            };
            let index = this.gvReturn.searchCell(options);
            if (index != null) {
                utils.messageBox('alert', '이미 추가 되었습니다.');
                return false;
            }

            if (status == 'C002' || status == 'C006') {
                utils.messageBox('alert', '처리할 수 없는 정기권입니다.');
                return false;
            }

            let expireDate = this.dpDetail.getValue(nRow, 'expireDate');
            if (Number(expireDate) < Number(this.pvSaleYmd)) {
                utils.messageBox('alert', '만기일이 지난 정기권입니다. 처리할 수 없습니다.');
                return false;
            }

            if (utils.isNull(this.pvRECEIPT_NO)) {
                utils.messageBox('alert', '무료권은 환불 할 수 없습니다.');
                return false;
            }

            let preTicketYn = this.dpDetail.getValue(nRow, 'preTicketYn');
            if (preTicketYn == 'Y') {
                utils.messageBox(
                    'alert',
                    '선가입으로 가입된 이력이 있어 환불이 불가합니다, 선가입권 환불을 먼저 처리해주세요.'
                );
                return false;
            }

            //환불가능여부
            let refundYn = this.dpDetail.getValue(nRow, 'refundYn');
            if (refundYn == 'N') {
                utils.messageBox('alert', '환불할 수 없는 권종입니다.');
                return false;
            }

            //양도유무
            let giveYn = this.dpDetail.getValue(nRow, 'giveYn');
            if (giveYn == 'Y') {
                utils.messageBox('alert', '양도 받은 정기권 입니다, 환불 할 수 없습니다.');
                return false;
            }

            // 전체환불진행 건
            // 결재 진행 상태 0:전송대기, 1:결재진행 중, 2:완결, 3:반려, 4:상신취소, 5:전결, 6:후완결
            let knoxApprId = this.dpDetail.getValue(nRow, 'knoxApprId');
            let knoxApprStatusValue = this.dpDetail.getValue(nRow, 'knoxApprStatusValue');

            console.log('methods > fnAddRow > knoxApprId:' + knoxApprId);
            console.log('methods > fnAddRow > knoxApprStatusValue:' + knoxApprStatusValue);
            console.log('methods > fnAddRow > this.pvIS_RETURN_FG:' + this.pvIS_RETURN_FG);

            let except = false;
            if (this.pvIS_RETURN_FG == '0') {
                if (!utils.isNull(knoxApprId) && !utils.isNull(knoxApprStatusValue)) {
                    if (knoxApprStatusValue == '0' || knoxApprStatusValue == '1') {
                        utils.messageBox('alert', '전체환불 진행중인 정기권 입니다.');
                        return false;
                    }
                    if (knoxApprStatusValue == '2' || knoxApprStatusValue == '5' || knoxApprStatusValue == '6') {
                        utils.messageBox('alert', '전체환불 결재완료의 건 입니다.');
                        if (this.dpReturn.getRowCount() == 0) except = true;
                        // 전체환불 버튼 활성화
                    } else {
                        // 전체환불 상신 버튼 활성화
                    }
                } else {
                    // 전체환불 상신 버튼 활성화
                }
            }

            // 복사
            var newRows = [];
            newRows.push(this.dpDetail.getJsonRow([nRow]));
            this.dpReturn.addRows(newRows);

            this.stcReturn = '환불';

            // 환불금 계산
            this.fnCaluReturnAmt(except);

            return true;
        },

        // 환불금 계산 -- TO_BE function 을 생성
        fnCaluReturnAmt(except) {
            // 대상자가 없다면
            if (this.dpReturn.getRowCount() == 0) {
                this.stcMsg = '';
                this.stcReturn = '';
                this.returnAmt = null;
                this.mgiftReturn = null;
                this.memshpReturn = null;
                this.cashReturn = null;
                return;
            }

            let nAmt = 0; // 판매금액
            let nReturnAmt = 0; // 환불금액 -> 원결제금액에서 위약금+이용금액을 제한 금액
            let nPenaltyAmt = 0; // 위약금 + 이용금액
            let nMgiftAmt = 0; // 기프트카드 사용금액
            let nMemshpAmt = 0; // 멤버십 포인트  사용금액
            let nMgiftOthersAmt = 0; // (기프트카드+멤버십 포인트) 이외 사용금액
            let creditAmt = this.toInt(this.creditAmt); // 외상금액
            let savePointAmt = 0; // 적립 멤버십 포인트
            let naPointAmt = this.toInt(this.naPointAmt); // 가용포인트
            let gmAmt = nMgiftAmt + nMemshpAmt; // 기프트카드 사용금액 + 멤버십 포인트 사용금액
            let nRemainPenaltyAmt = 0;
            let payPos = '';

            // 환불금 요약정보 가 있다면,
            //console.log('methods > fnCaluReturnAmt > returnDetailDVO.receiptNo:' + this.returnDetailDVO.receiptNo);
            //if (!utils.isNull(this.returnDetailDVO)) {
            nMgiftAmt = this.toInt(this.returnDetailDVO.payMgift); // 기프트카드 사용금액
            nMemshpAmt = this.toInt(this.returnDetailDVO.payMemshp); // 멤버십 포인트  사용금액
            nMgiftOthersAmt = this.toInt(this.returnDetailDVO.pay04); // (기프트카드+멤버십 포인트) 이외 사용금액
            payPos = this.returnDetailDVO.payPos;
            //}

            for (let i = 0; i < this.dpReturn.getRowCount(); i++) {
                nAmt += this.toInt(this.dpReturn.getValue(i, 'amt'));
                nReturnAmt += this.toInt(this.dpReturn.getValue(i, 'returnAmt'));
                //savePointAmt += this.toInt(this.dpReturn.getValue(i, "savePointAmt"));
            }

            // 전체환불_승인결제 완료의 건인 경우,
            if (except) nReturnAmt = nAmt;

            nPenaltyAmt = nAmt - nReturnAmt;
            nRemainPenaltyAmt = nPenaltyAmt;

            console.log('methods > fnCaluReturnAmt > except:' + except);
            console.log('methods > fnCaluReturnAmt > nAmt:' + nAmt);
            console.log('methods > fnCaluReturnAmt > nReturnAmt:' + nReturnAmt);
            console.log('methods > fnCaluReturnAmt > nPenaltyAmt:' + nPenaltyAmt);
            console.log('methods > fnCaluReturnAmt > nMgiftAmt:' + nMgiftAmt);
            console.log('methods > fnCaluReturnAmt > nMemshpAmt:' + nMemshpAmt);
            console.log('methods > fnCaluReturnAmt > nMgiftOthersAmt:' + nMgiftOthersAmt);
            console.log('methods > fnCaluReturnAmt > creditAmt:' + creditAmt);
            console.log('methods > fnCaluReturnAmt > savePointAmt:' + savePointAmt);
            console.log('methods > fnCaluReturnAmt > pvMgiftCardStatus:' + this.pvMgiftCardStatus);

            this.returnAmt = nReturnAmt;

            // 모바일기프트카드로 결재를 했는데, 모바일기프크카드 상태가 '정상(Y)'이 아니면, 현금으로
            if (nMgiftAmt > 0 && this.pvMgiftCardStatus == 'N') {
                nMgiftOthersAmt = nMgiftOthersAmt + nMgiftAmt;
                nMgiftAmt = 0;
            }
            console.log('methods > fnCaluReturnAmt > nMgiftOthersAmt:' + nMgiftOthersAmt);
            console.log('methods > fnCaluReturnAmt > nMgiftAmt:' + nMgiftAmt);

            // 1.nMgiftOthersAmt : 멤버십 포인트, 모바일 기프트카드 을 제외한 금액
            if (nMgiftOthersAmt > 0) {
                if (nMgiftOthersAmt >= nReturnAmt) {
                    this.cashReturn = nReturnAmt;
                    nReturnAmt = 0;
                } else {
                    this.cashReturn = nMgiftOthersAmt;
                    nReturnAmt = nReturnAmt - nMgiftOthersAmt;
                }
            } else {
                this.cashReturn = 0;
            }

            if (nReturnAmt > 0) {
                // 2.모바일 기프트카드
                if (nMgiftAmt > 0) {
                    if (nMgiftAmt >= nReturnAmt) {
                        this.mgiftReturn = nReturnAmt;
                        nReturnAmt = 0;
                    } else {
                        this.mgiftReturn = nMgiftAmt;
                        nReturnAmt = nReturnAmt - nMgiftAmt;
                    }
                } else {
                    this.mgiftReturn = 0;
                }
            } else {
                this.mgiftReturn = 0;
            }

            if (nReturnAmt > 0) {
                // 3. 멤버십 포인트
                if (nMemshpAmt > 0) {
                    if (nMemshpAmt >= nReturnAmt) {
                        this.memshpReturn = nReturnAmt;
                        nReturnAmt = 0;
                    } else {
                        this.memshpReturn = nMemshpAmt;
                        nReturnAmt = nReturnAmt - nMemshpAmt;
                    }
                } else {
                    this.memshpReturn = 0;
                }
            } else {
                this.memshpReturn = 0;
            }

            // 외상
            /*
        if(creditAmt > 0) {
          if (creditAmt >= nReturnAmt) {
            alert(1);
            this.cashReturn = 0;
            //this.returnDetailDVO.cashReturn = 0;
          } else {
            alert(2);
            this.cashReturn = nReturnAmt - creditAmt;
            //this.returnDetailDVO.cashReturn = nReturnAmt - creditAmt;
          }
        }
        */

            console.log('methods > fnCaluReturnAmt > payPos:' + payPos);

            if (payPos.toUpperCase() == 'MEM') {
                if (this.pvIS_RETURN_FG == '1' && nPenaltyAmt == 0) {
                    this.stcReturn = '카드 환불';
                } else if (this.pvIS_RETURN_FG == '2' && nPenaltyAmt == 0) {
                    this.stcReturn = '카드 환불';
                } else {
                    this.stcReturn = '현금 환불';
                }
            } else if (payPos.toUpperCase() == 'WEB') {
                if (this.pvIS_RETURN_FG == '1' && nPenaltyAmt == 0) {
                    this.stcReturn = 'WEB 환불';
                }
                if (this.pvIS_RETURN_FG == '2' && nPenaltyAmt == 0) {
                    this.stcReturn = 'WEB 환불';
                } else {
                    this.stcReturn = '현금 환불';
                }
            }

            // 적립금(savePointAmt), 가용포인트(naPointAmt)
            // 가용포인트 < 적립금
            // if(savePointAmt < naPointAmt) {
            //   this.stcReturn = this.stcReturn + ", 취소 적립금이 가용포인트 보다 많습니다.";
            // }
            //}
        },

        // 환불처리 버튼
        async fnRefundProcess() {
            // POS SOD 체크 및 처리 ::START
            this.posSodStatus = await utils.checkPosSod(this.parkPosKind, this.posId);
            let sodRtn = {};
            switch (this.posSodStatus.rtnCode) {
                case -1:
                    utils.messageBox('alert', this.posSodStatus.message);
                    return;
                case 1:
                    sodRtn = await utils.procPosSod(this.parkPosKind, this.posId, false); // 신규개설
                    break;
                case 2:
                    sodRtn = await utils.procPosSod(this.parkPosKind, this.posId, true); // 재개설
                    break;
                case 0:
                    sodRtn = { sodProcYn: 'Y' }; //이미 개설 완료
                    break;
            }

            if (sodRtn.sodProcYn != 'Y') {
                utils.messageBox('alert', sodRtn.message);
                return;
            } else {
                if (this.posSodStatus.rtnCode != 0) {
                    this.posSodStatus = await utils.checkPosSod(this.parkPosKind, this.posId);
                }
            }
            // POS SOD 체크 및 처리 ::END

            if (this.fnIsCalc() == false) {
                return false;
            }

            if (this.dpReturn.getRowCount() == 0) {
                utils.messageBox('alert', '대상자를 추가하십시오.');
                return false;
            }

            let nAmt = 0;
            let nSumAmt = 0;
            for (let i = 0; i < this.dpReturn.getRowCount(); i++) {
                nAmt = Number(this.dpReturn.getValue(i, 'returnAmt'));
                nSumAmt += Number(this.dpReturn.getValue(i, 'returnAmt'));
                if (nAmt <= 0) {
                    utils.messageBox('alert', '마이너스 금액은 환불 할 수 없습니다.');
                    return false;
                }
            }

            if (nSumAmt <= 0) {
                utils.messageBox('alert', '마이너스 금액은 환불 할 수 없습니다.');
                this.dpReturn.clearRows();
                return false;
            }

            let sMsg = '';

            if (this.pvIS_RETURN_FG == '1' || this.pvIS_RETURN_FG == '2') {
                sMsg = '해당정보에 대한 환불처리를 하시겠습니까?';
            } else {
                sMsg = '환불 처리됩니다. 금액을 확인하세요.\n\n환불하시겠습니까?';
                /*
                console.log("------------------------------>this.btnRefundAll:"+ this.btnRefundAll); 
                // 전체환불 처리 버튼이 활성화 되어 있는데, 환불처리 버튼을 클릭시
                if(this.btnRefundAll == "1") {
                    this.fnCaluReturnAmt(false);    // 계산 다시
                    this.fnRefundMessage_0();       // 근무자 메세지 다시
                    this.btnRefundAll = '0';        // 전체활불 처리 버튼 비활성화
                    sMsg = '전체환불 결재완료의 건 입니다. \n\n환불처리 하시겠습니까?';
                }
                */
            }

            utils.messageBox(
                'confirm',
                sMsg,
                null,
                (/* ok */) => {
                    this.fnRefundProcessStep2();
                },
                (/* cancel */) => {
                    // 테스트
                    //this.fnCashCancelPopup();
                    return;
                }
            );
        },
        async fnRefundProcessStep2() {
            this.fnReturnCashAmt();

            let sRemark = this.reason;
            let webAmt = this.toInt(this.billDVO.webAmt);
            let smartYn = 'N';
            if (webAmt > 0) {
                smartYn = 'Y';
            }

            const values = {
                cashYn: this.pvCASH_YN,
                isReturnFg: this.pvIS_RETURN_FG,
                remark: sRemark,
                receiptNo: this.pvRECEIPT_NO,
                smartYn: smartYn,
            };
            this.validDVO = values;

            if (this.pvIS_RETURN_FG == '1' || this.pvIS_RETURN_FG == '2') {
                console.log('methods > fnRefundProcess > IS_RETURN_FG > 1 2');
                // 카드 취소
                if (this.toInt(this.cardAmt) > 0) {
                    console.log('methods > fnRefundProcess > IS_RETURN_FG > 1 2 > card');

                    // console.log(
                    //     'methods > this.cardDataList.length > :' + (this.cardDataList == null)
                    //         ? 0
                    //         : this.cardDataList.length
                    // );
                    for (let i = 0; i < this.cardDataList.length; i++) {
                        let cardData = this.cardDataList[i];
                        let lvTranUniqNo = cardData.tranUniqueNbr;
                        let inputKind = cardData.inputKind;

                        console.log('1.cardData', cardData);
                        console.log('methods > dpCard.lvTranUniqNo:' + lvTranUniqNo);
                        console.log('methods > dpCard.inputKind:' + inputKind);
                        console.log('methods > dpCard.fallBackCode:' + cardData.fallBackCode);

                        // 이지체크가 아닌때
                        if (inputKind != 'F002') {
                            if (lvTranUniqNo == '') {
                                utils.messageBox(
                                    'alert',
                                    '승인취소할 카드의 VAN거래고유번호가 없습니다. \n\n MSR버전에서 취소처리 진행하시기 바랍니다.'
                                );
                                return;
                            } else {
                                console.log('2.cardData', cardData);
                                console.log('cardData.fallBackCode', cardData.fallBackCode);
                                cardData.fallBackCode = '00';
                                cardData.emvYn = 'N';
                            }
                        }
                    }

                    // 카드취소
                    await this.fnCardCancel();
                } else {
                    console.log('methods > fnRefundProcess > IS_RETURN_FG > 1 2 > cash');
                    console.log(
                        'methods > fnRefundProcess > IS_RETURN_FG > 1 2 > cash > this.rTranUniqueNbr:' +
                            this.rTranUniqueNbr
                    );

                    // 현금 영수증 취소
                    if (
                        this.toInt(this.cashAmt) > 0 ||
                        this.toInt(this.giftcardAmt) > 0 ||
                        this.toInt(this.preticketAmt) > 0 ||
                        this.toInt(this.restGiftAmt) > 0
                    ) {
                        if (this.rTranUniqueNbr == 'NO_DATA') {
                            //MSR 버전
                            utils.messageBox(
                                'alert',
                                '승인취소할 현금영수증의 VAN거래고유번호가 없습니다. \n\n MSR버전에서 취소처리 진행하시기 바랍니다.'
                            );
                            return;
                        } else {
                            if (this.rTranUniqueNbr == '') {
                                // 현금영수증이 없는 경우
                                console.log('methods > fnRefundProcess > IS_RETURN_FG > 1 2 > cash fnComplete');
                                await this.fnComplete();
                            } else {
                                console.log('methods > fnRefundProcess > IS_RETURN_FG > 1 2 > cash fnCashCancel');
                                await this.fnCashCancelPopup(); // 현금영수증 취소 -> 사유선택 후 프로세스
                            }
                        }
                    } else {
                        console.log('methods > fnRefundProcess > IS_RETURN_FG > 1 2 > cash fnComplete');
                        await this.fnComplete();
                    }
                }
            } else {
                //gfnService("complete", "CHANGE_ARTICLE_YN=" + quote(lvCHANGE_ARTICLE_YN));
                console.log('methods > fnRefundProcess > IS_RETURN_FG > 0');
                await this.fnComplete();
            }
        },
        // 전체환불 처리 진행
        async fnRefundAll() {
            // POS SOD 체크 및 처리 ::START
            this.posSodStatus = await utils.checkPosSod(this.parkPosKind, this.posId);
            let sodRtn = {};
            switch (this.posSodStatus.rtnCode) {
                case -1:
                    utils.messageBox('alert', this.posSodStatus.message);
                    return;
                case 1:
                    sodRtn = await utils.procPosSod(this.parkPosKind, this.posId, false); // 신규개설
                    break;
                case 2:
                    sodRtn = await utils.procPosSod(this.parkPosKind, this.posId, true); // 재개설
                    break;
                case 0:
                    sodRtn = { sodProcYn: 'Y' }; //이미 개설 완료
                    break;
            }

            if (sodRtn.sodProcYn != 'Y') {
                utils.messageBox('alert', sodRtn.message);
                return;
            } else {
                if (this.posSodStatus.rtnCode != 0) {
                    this.posSodStatus = await utils.checkPosSod(this.parkPosKind, this.posId);
                }
            }
            // POS SOD 체크 및 처리 ::END

            if (this.fnIsCalc() == false) {
                return false;
            }

            if (this.dpReturn.getRowCount() == 0) {
                utils.messageBox('alert', '대상자를 추가하십시오.');
                return false;
            }

            let sMsg = '전체환불 처리 하시겠습니까?';

            utils.messageBox(
                'confirm',
                sMsg,
                null,
                (/* ok */) => {
                    console.log('methods > fnRefundAll start');

                    console.log('methods > fnComplete > mgiftReturn:' + this.mgiftReturn);
                    console.log('methods > fnComplete > memshpReturn:' + this.memshpReturn);
                    console.log('methods > fnComplete > cashReturn:' + this.cashReturn);

                    this.returnDetailDVO.mgiftReturn = this.mgiftReturn;
                    this.returnDetailDVO.memshpReturn = this.memshpReturn;
                    this.returnDetailDVO.cashReturn = this.cashReturn;

                    // 메세지 초기화
                    this.fnRefundMsg('');

                    let sRemark = this.reason;
                    let knoxApprId = this.dpReturn.getValue(0, 'knoxApprId');
                    let ticketNo = this.dpReturn.getValue(0, 'ticketNo');
                    let webAmt = this.toInt(this.billDVO.webAmt);
                    let smartYn = 'N';

                    if (webAmt > 0) {
                        smartYn = 'Y';
                    }

                    const values = {
                        cashYn: 'Y',
                        isReturnFg: '0',
                        remark: sRemark,
                        receiptNo: this.pvRECEIPT_NO,
                        ticketNo: ticketNo,
                        knoxApprId: knoxApprId,
                        smartYn: smartYn,
                    };
                    this.validDVO = values;

                    console.log('methods > fnRefundAll > ' + this.validDVO);

                    const dataParams = {
                        validDVO: this.validDVO,
                        returnDVO: this.returnDetailDVO,
                    };

                    http.request(this.$options.name, 'DTS_JNF_00008', {
                        data: dataParams,
                    }).then((res) => {
                        if (res.data) {
                            let resData = res.data;
                            if (resData.length == 0) {
                                utils.messageBox('alert', '조회된 데이타가 없습니다.fnRefundAll');
                            } else {
                                let errorCode = res.data.errorCode;
                                let errorMsg = res.data.errorMsg;

                                console.log('methods > fnRefundAll > errorCode:' + errorCode);

                                if (!utils.isNull(errorCode) || !utils.isNull(errorMsg)) {
                                    if (errorCode == '0400') {
                                        utils.messageBox('alert', '조회된 데이타가 없습니다.fnRefundAll');
                                        return;
                                    } else if (errorCode == '0100') {
                                        utils.messageBox('alert', '결재 진행중 입니다.');
                                        return;
                                    } else if (errorCode == '0200') {
                                        utils.messageBox('alert', '결재 반려 되었습니다.');
                                        return;
                                    } else if (errorCode == '0300') {
                                        let sMsg = '상신취소 되었습니다. 재 상신 하시겠습니까?';
                                        utils.messageBox(
                                            'confirm',
                                            sMsg,
                                            null,
                                            (/* ok */) => {
                                                // 결제상신 호출
                                                this.onClickApprvPopupCall();
                                            },
                                            (/* cancel */) => {
                                                return;
                                            }
                                        );
                                    } else if (errorCode == '0500') {
                                        utils.messageBox(
                                            'alert',
                                            '이미 환불 완료된 건입니다. 관리자에게 문의하여 주십시오.'
                                        );
                                        return;
                                    } else if (errorCode == '0000') {
                                        let paymntDate = res.data.saleYmd;
                                        let newReceiptNo = res.data.newReceiptNo;
                                        let payerMemshpUid = res.data.payerMemshpUid;
                                        let payerMemberName = res.data.payerMemberName;
                                        let payerMemberKind = res.data.payerMemberKind;
                                        let payerTicketNo = res.data.payerTicketNo;
                                        let payerMemberKindNm = res.data.payerMemberKindNm;
                                        let refundList = res.data.refundDetailList;
                                        let ticketList = res.data.ticketSaleDetailList;
                                        let cardList = res.data.cardDetailList;
                                        let refundAmtInfo = res.data.refundAmtInfo;
                                        let repayYn = res.data.repayYn;
                                        let penaltyYn = res.data.penaltyYn;
                                        let elecReceiptIssueYn = res.data.elecReceiptIssueYn;
                                        let pointStatus = res.data.pointStatus;
                                        let receiptIssueYn = res.data.receiptIssueYn;
                                        let refundData = {
                                            parkKind: this.parkKind,
                                            paymntDate: paymntDate,
                                            posId: this.posId,
                                            posNm: this.posNm,
                                            returnFg: '0',
                                            cashReceiptYn: 'Y',
                                            newReceiptNo: newReceiptNo,
                                            payerMemshpUid: payerMemshpUid,
                                            payerMemberName: payerMemberName,
                                            payerMemberKind: payerMemberKind,
                                            payerMemberKindNm: payerMemberKindNm,
                                            payerTicketNo: payerTicketNo,
                                            refundList: refundList,
                                            ticketList: ticketList,
                                            cardList: cardList,
                                            refundAmtInfo: refundAmtInfo,
                                            repayYn: repayYn,
                                            penaltyYn: penaltyYn,
                                            cashReceiptData: this.retCashData,
                                            elecReceiptIssueYn: elecReceiptIssueYn,
                                            pointStatus: pointStatus,
                                        };
                                        //alert(detailData.length);
                                        //alert(ticketSaleData.length);
                                        //alert(cardData.length);
                                        //alert(refundData.elecReceiptIssueYn);
                                        console.log('fnRefundAll >elecReceiptIssueYn:' + refundData.elecReceiptIssueYn);

                                        // 영수증 발행.
                                        this.printData = refundData;
                                        elecReceiptIssueYn = this.isElectReceiptIssueApply ? elecReceiptIssueYn : 'N';
                                        if (receiptIssueYn == 'Y' && elecReceiptIssueYn != 'Y') {
                                            window.utils.messageBox(
                                                'confirm',
                                                '고객 영수증을 발행하시겠습니까?(카드할부 무조건 발행)',
                                                null,
                                                (/* ok */) => {
                                                    this.fnPrint(this.printData, 'Y');
                                                },
                                                (/* cancel */) => {
                                                    this.fnPrint(this.printData, 'N');
                                                }
                                            );
                                        } else {
                                            this.fnPrint(this.printData, 'N');
                                        }

                                        // this.memshpOption = "33";
                                        // this.srchVal = this.dpReturn.getValue(0, "ticketNo");
                                        // this.srchValEnterDown();
                                    }
                                }
                            }
                        } else {
                            utils.messageBox('alert', '조회된 데이타가 없습니다.fnRefundAll');
                        }
                    });

                    //this.fnAllRefund();
                },
                (/* cancel */) => {}
            );
        },

        // 전체환불 상신
        fnRefundAppr() {
            if (this.fnIsCalc() == false) {
                return false;
            }

            if (this.dpReturn.getRowCount() == 0) {
                utils.messageBox('alert', '대상자를 추가하십시오.');
                return false;
            }

            let sMsg = '전체환불 상신 하시겠습니까?';

            utils.messageBox(
                'confirm',
                sMsg,
                null,
                (/* ok */) => {
                    console.log('methods > fnRefundAppr start');

                    // 메세지 초기화
                    this.fnRefundMsg('');

                    let sRemark = this.reason;
                    this.pvApprMemshpUid = this.dpReturn.getValue(0, 'memshpUid');
                    this.pvApprTicketNo = this.dpReturn.getValue(0, 'ticketNo');

                    console.log('methods > fnRefundAppr > ' + this.validDVO);

                    const queryParams = {
                        receiptNo: this.pvRECEIPT_NO,
                        memshpUid: this.pvApprMemshpUid,
                        ticketNo: this.pvApprTicketNo,
                    };

                    http.request(this.$options.name, 'DTS_JNF_00010', {
                        query: queryParams,
                    }).then((res) => {
                        if (res.data) {
                            let resData = res.data;
                            if (resData.length == 0) {
                                utils.messageBox('alert', '조회된 데이타가 없습니다.fnRefundAppr');
                            } else {
                                // 결제상신 호출
                                this.codeContent = res.data.contents;
                                this.onClickApprvPopupCall();
                            }
                        } else {
                            utils.messageBox('alert', '조회된 데이타가 없습니다.fnRefundAppr');
                        }
                    });
                },
                (/* cancel */) => {}
            );
        },

        // 전체환불
        fnAllRefund() {
            // 결제 대기중

            let sMsg = '전체환불 처리됩니다. 금액을 확인하세요.\n\n 환불 하시겠습니까?';

            utils.messageBox(
                'confirm',
                sMsg,
                null,
                (/* ok */) => {
                    // 결제상신 호출
                },
                (/* cancel */) => {}
            );
        },

        fnComplete() {
            console.log('methods > fnComplete');
            // dsReturn
            // dsValid
            // dsRetCard ( divSign, signPand ) : card cancel시에 data
            // dsRetCash : cash, 현금영수증
            console.log('methods > fnComplete > ' + this.dpReturn.getJsonRows().length);
            console.log('methods > fnComplete > ' + this.validDVO);
            console.log('methods > fnComplete > ' + this.retCashData);
            console.log('methods > fnComplete > signData:' + this.signData);
            console.log('methods > fnComplete > mgiftReturn:' + this.mgiftReturn);
            console.log('methods > fnComplete > memshpReturn:' + this.memshpReturn);
            console.log('methods > fnComplete > cashReturn:' + this.cashReturn);

            //if (!utils.isNull(this.returnDetailDVO)) {
            this.returnDetailDVO.mgiftReturn = this.mgiftReturn;
            this.returnDetailDVO.memshpReturn = this.memshpReturn;
            this.returnDetailDVO.cashReturn = this.cashReturn;
            //}

            const dataParams = {
                refundDetailList: this.dpReturn.getJsonRows(),
                validDVO: this.validDVO,
                retCardList: this.retCardData,
                signData: this.signData,
                returnDVO: this.returnDetailDVO,
                retCashList: this.retCashData != null ? [this.retCashData] : null,
                mgiftReturn: this.mgiftReturn,
                memshpReturn: this.memshpReturn,
                cashReturn: this.cashReturn,
            };

            http.request(this.$options.name, 'DTS_JNF_00005', {
                data: dataParams,
            }).then((res) => {
                if (res.data) {
                    let resData = res.data;
                    if (resData.length == 0) {
                        utils.messageBox('alert', '조회된 데이타가 없습니다.9');
                    } else {
                        let paymntDate = res.data.saleYmd;
                        let newReceiptNo = res.data.newReceiptNo;
                        let payerMemshpUid = res.data.payerMemshpUid;
                        let payerMemberName = res.data.payerMemberName;
                        let payerMemberKind = res.data.payerMemberKind;
                        let payerTicketNo = res.data.payerTicketNo;
                        let payerMemberKindNm = res.data.payerMemberKindNm;
                        let refundList = res.data.refundDetailList;
                        let ticketList = res.data.ticketSaleDetailList;
                        let cardList = res.data.cardDetailList;
                        let refundAmtInfo = res.data.refundAmtInfo;
                        let repayYn = res.data.repayYn;
                        let penaltyYn = res.data.penaltyYn;
                        let elecReceiptIssueYn = res.data.elecReceiptIssueYn;
                        let receiptIssueYn = res.data.receiptIssueYn;
                        let pointStatus = res.data.pointStatus;
                        let refundData = {
                            parkKind: this.parkKind,
                            paymntDate: paymntDate,
                            posId: this.posId,
                            posNm: this.posNm,
                            returnFg: this.pvIS_RETURN_FG,
                            cashReceiptYn: this.pvCASH_YN,
                            newReceiptNo: newReceiptNo,
                            payerMemshpUid: payerMemshpUid,
                            payerMemberName: payerMemberName,
                            payerMemberKind: payerMemberKind,
                            payerMemberKindNm: payerMemberKindNm,
                            payerTicketNo: payerTicketNo,
                            refundList: refundList,
                            ticketList: ticketList,
                            cardList: cardList,
                            refundAmtInfo: refundAmtInfo,
                            repayYn: repayYn,
                            penaltyYn: penaltyYn,
                            cashReceiptData: this.retCashData,
                            elecReceiptIssueYn: elecReceiptIssueYn,
                            pointStatus: pointStatus,
                        };
                        //alert(detailData.length);
                        //alert(ticketSaleData.length);
                        //alert(cardData.length);
                        //alert(refundData.elecReceiptIssueYn);
                        console.log('fnComplete >elecReceiptIssueYn:' + refundData.elecReceiptIssueYn);

                        // 영수증 발행.
                        this.printData = refundData;
                        elecReceiptIssueYn = this.isElectReceiptIssueApply ? elecReceiptIssueYn : 'N';
                        if (receiptIssueYn == 'Y' && elecReceiptIssueYn != 'Y') {
                            window.utils.messageBox(
                                'confirm',
                                '고객 영수증을 발행하시겠습니까?(카드할부 무조건 발행)',
                                null,
                                (/* ok */) => {
                                    this.fnPrint(this.printData, 'Y');
                                },
                                (/* cancel */) => {
                                    this.fnPrint(this.printData, 'N');
                                }
                            );
                        } else {
                            this.fnPrint(this.printData, 'N');
                        }

                        // this.memshpOption = "33";
                        // this.srchVal = this.dpReturn.getValue(0, "ticketNo");
                        // this.srchValEnterDown();
                    }
                } else {
                    utils.messageBox('alert', '조회된 데이타가 없습니다.');
                }
            });
        },
        //영수증 출력 끝나면 호출
        fnFinishRefundPrint() {
            this.fnReSet(true);
        },

        // 카드 취소 : 서버 처리
        async fnCardCancel() {
            console.log('methods > fnCardCancel: 카드 취소 서버 처리');
            // dsCard  --> this.validDVO
            // console.log('methods > fnCardCancel > ' + (this.cardDataList == null) ? 0 : this.cardDataList.length);
            console.log('methods > fnCardCancel > ', this.validDVO);

            const dataParams = {
                cardDetailList: this.cardDataList,
                validDVO: this.validDVO,
            };

            await http
                .request(this.$options.name, 'DTS_JNF_00006', {
                    data: dataParams,
                })
                .then((res) => {
                    if (res.data) {
                        let resData = res.data;
                        if (resData.length == 0) {
                            utils.messageBox('alert', '조회된 데이타가 없습니다.');
                        } else {
                            let errorCode = res.data.errorCode;
                            let errorMsg = res.data.errorMsg;
                            // 서버 에러
                            if (!utils.isNull(errorCode) || !utils.isNull(errorMsg)) {
                                if (errorCode != '0000') {
                                    utils.messageBox('alert', errorCode + ':' + errorMsg);
                                    return;
                                }
                            }

                            // dsRetCard=dsRetCard dsRecv=dsRecv
                            this.retCardData = res.data.retCardList;
                            let retCardDataList = res.data.retCardList;
                            let recvData = res.data.recvList;

                            console.log('methods > fnCardCancel > retCardDataList:' + retCardDataList.length);
                            console.log('methods > fnCardCancel > recvData[0].compCode:' + recvData[0].compCode);
                            console.log('methods > fnCardCancel > recvData[0].apprAmt:' + recvData[0].approveAmt);
                            console.log('methods > fnCardCancel > recvData[0].divideGigan:' + recvData[0].divideGigan);
                            console.log('methods > fnCardCancel > recvData[0].responseCd:' + recvData[0].responseCd);

                            let sSignRtn = '0';
                            let sCompCode = recvData[0].compCode;
                            let nAmt = this.toInt(recvData[0].approveAmt);
                            let nAllotMonth = this.toInt(recvData[0].divideGigan);
                            let responseCd = recvData[0].responseCd;
                            let inputFg = recvData[0].inputFg;

                            console.log('methods > fnCardCancel > responseCd:' + responseCd);
                            console.log('methods > fnCardCancel > inputFg:' + inputFg);

                            if (responseCd == '0000') {
                                // 이지체크시
                                if (inputFg == 'F002') {
                                    console.log('methods > fnCardCancel > inputFg:' + inputFg + ' 이지체크시');
                                    if (this.pvIS_RETURN_FG == '1') {
                                        utils.messageBox('alert', '이지체크 취소 요망!', null, () => {
                                            this.fnCashCancel();
                                        });
                                    } else {
                                        utils.messageBox('alert', '입금실 추가 취소 요청!', null, () => {
                                            this.fnCashCancel();
                                        });
                                    }
                                } else {
                                    console.log('methods > fnCardCancel > inputFg:' + inputFg + ' X 이지체크');

                                    if (sCompCode == '0004' && nAmt <= 50000 && nAllotMonth == 1) {
                                        console.log(
                                            'methods > fnCardCancel > inputFg:' + inputFg + ' X 이지체크 > X signPad'
                                        );
                                        sSignRtn = '2';
                                        this.fnCashCancel();
                                    } else {
                                        console.log(
                                            'methods > fnCardCancel > inputFg:' + inputFg + ' X 이지체크 > signPad'
                                        );
                                        // signPad open
                                        this.fnReqSign();
                                        //this.fnCashCancel();
                                    }
                                }
                            } else {
                                utils.messageBox('alert', '관리자에게 문의하여 주십시오.');
                            }
                        }
                    } else {
                        utils.messageBox('alert', '조회된 데이타가 없습니다.');
                    }
                });
        },
        // 현금영수증 취소 : 서버 처리
        fnCashCancelProc() {
            console.log('methods > fnCashCancelProc start');

            // dsValid
            // this.cancelOption
            // dsRetCard ( divSign, signPand ) : card cancel시에 data

            console.log('methods > fnCashCancelProc > ' + this.validDVO);
            console.log('methods > fnCashCancelProc > cancelOption:' + this.cancelOption);

            const dataParams = {
                validDVO: this.validDVO,
                cashKind: this.cancelOption,
            };

            http.request(this.$options.name, 'DTS_JNF_00007', {
                data: dataParams,
            }).then((res) => {
                if (res.data) {
                    let resData = res.data;
                    if (resData.length == 0) {
                        utils.messageBox('alert', '조회된 데이타가 없습니다.');
                    } else {
                        let errorCode = res.data.errorCode;
                        let errorMsg = res.data.errorMsg;

                        if (!utils.isNull(errorCode) || !utils.isNull(errorMsg)) {
                            if (errorCode != '0000') {
                                utils.messageBox('alert', errorCode + ':' + errorMsg);
                                return;
                            }
                        } else {
                            this.retCashData = res.data.payCashDtlDVO;

                            this.fnComplete();
                        }
                    }
                } else {
                    utils.messageBox('alert', '조회된 데이타가 없습니다.');
                }
            });
        },

        fnCashCancel() {
            if (this.pvCASH_YN == 'Y') {
                if (this.pvIS_RETURN_FG == '1' || this.pvIS_RETURN_FG == '2') {
                    this.fnCashCancelPopup();
                }
            } else {
                this.fnComplete();
            }
        },

        // 현금영수증 취소사유_열기
        fnCashCancelPopup() {
            this.modalCashCancelReason.open();
        },

        // 현금영수증 취소사유_선택
        fnCashCancelClosed() {
            console.log('methods > fnCashCancelClosed');

            this.modalCashCancelReason.close();

            console.log('methods > fnCashCancelClosed > this.cancelOption : ' + this.cancelOption);

            this.fnCashCancelProc();
        },
        // 현금영수증 취소사유_X
        closedcashcancelreason() {},
        // 현금환불: 금액 계산 및 환불메세지 설정 --> pvIS_RETURN_FG: 0 일때, 호출 된다.
        // pvIS_RETURN_FG: 0_현금 환불, 1_당일취소, 2_청구취소
        fnReturnCashAmt() {
            console.log('methods > fnReturnCashAmt > this.pvIS_RETURN_FG :' + this.pvIS_RETURN_FG);

            let cashAmt = 0;
            let msg = '';

            let restGiftAmt = this.billDVO.restGiftAmt;

            if (this.pvIS_RETURN_FG == '0') {
                msg = '현금 환불 금액 ' + utils.numberWithCommas(this.cashReturn) + '원 입니다';
            } else {
                console.log('methods > fnReturnCashAmt > this.billDVO.posId:' + this.billDVO.posId);
                console.log('methods > fnReturnCashAmt > this.pvPosId:' + this.pvPosId);

                if (this.pvIS_RETURN_FG == '1' && this.billDVO.posId == this.pvPosId) {
                    if (this.toInt(this.billDVO.cashAmt) > 0) {
                        msg += '현금 : ' + utils.numberWithCommas(this.billDVO.cashAmt) + '원 ';
                    }

                    if (this.toInt(this.billDVO.preticketAmt) > 0) {
                        msg += '티켓 : ' + utils.numberWithCommas(this.billDVO.preticketAmt) + '원 ';
                    }

                    if (this.toInt(this.billDVO.giftcardAmt) > 0) {
                        msg += '상품권 : ' + utils.numberWithCommas(this.billDVO.giftcardAmt) + '원 ';
                    }

                    if (this.toInt(this.billDVO.restGiftAmt) > 0) {
                        msg += '기프트카드 : ' + utils.numberWithCommas(this.billDVO.restGiftAmt) + '원 ';
                    }

                    if (this.toInt(this.billDVO.pointAmt) > 0) {
                        msg += '멤버십포인트 : ' + utils.numberWithCommas(this.billDVO.pointAmt) + '원 ';
                    }

                    if (!utils.isNull(msg)) {
                        msg += '입니다.';
                    }
                } else {
                    // 당일취소인데 같은 포스가 아니고,
                    // 청구취소이면 외상 금액도 포함.
                    cashAmt += Number(this.billDVO.cashAmt);
                    cashAmt += Number(this.billDVO.preticketAmt);
                    cashAmt += Number(this.billDVO.giftcardAmt);
                    cashAmt += Number(this.billDVO.restGiftAmt);
                    cashAmt += Number(this.billDVO.pointAmt);
                    msg = '현금 환불 금액 ' + utils.numberWithCommas(cashAmt) + '원 입니다';
                }
            }

            // 적립금(savePointAmt), 가용포인트(naPointAmt)
            // 가용포인트 < 적립금
            //if (savePointAmt < naPointAmt) {
            //  msg += ", 취소 적립금이 가용포인트 보다 많습니다.";
            //}

            //this.fnRefundMsg(msg);
        },

        // POS 개설 check
        fnIsCalc() {
            return true;
        },

        // 체크된 row 가져오기
        getCheckedItems() {
            this.checkedList = this.$refs.pgeJnf00002Detail.getCheckedItems();
        },

        /**
         * 환불영수증 발행하기
         * @param { Object } refundData
         */
        async fnPrint(refundData, receiptIssueYn) {
            let posPrint = new PosPrint();
            refundData.receiptIssueYn = receiptIssueYn;
            refundData.programId = this.$options.name;
            await posPrint.printAfterSaveRefund(refundData);

            utils.messageBox('alert', '환불이 완료되었습니다.');
            this.fnReSet(true); // 초기화
        },
        /**
         * Sign 요청하기
         */
        fnReqSign() {
            this.openPopupSign();
        },

        /**
         * Sign 입력창이 떠있는지 체크
         */
        isOpenCardPopup() {
            if (this.cardPopupUtils.cardWindow != null && this.webrtcDatachannel.isOpenState()) {
                let popupNm = 'Sign 입력';
                if (this.webrtcDatachannel.getPopupPage() == this.signPopupPage) {
                    popupNm = 'Sign 입력';
                } else if (this.webrtcDatachannel.getPopupPage() == this.checkPopupPage) {
                    popupNm = '무결성 체크';
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
         * Sign 입력창 띄우기
         */
        async openPopupSign() {
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
            let apprAmt = this.toInt(this.cardAmt);
            console.log('initSignPopup');
            this.webrtcDatachannel.sendMessage({ type: 'init', data: { apprAmt: apprAmt } });
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
                console.log('param.data.signData', param.data.signData);

                this.signData = param.data.signData.eSign;

                this.webrtcDatachannel.sendMessage({ type: 'sendOk' });

                this.fnCashCancel();
            }
        },

        /**
         * Click 카드 리더기 체크
         */
        clickCheckIcReader() {
            this.openPopupCheck();
        },
        /**
         * 카드 리더기 체크(무결성체크) 열지 확인
         */
        async cinformOpenPopupCheck() {
            let chekResult = await utils.getIcReaderCheckResult(
                this.$options.name,
                this.$store.getters.userInfo.userIp,
                this.icReaderPort
            );
            this.icReaderStatusMessage = chekResult.icReaderStatusMessage;
            this.icReaderCheckResult = chekResult.icReaderCheckResult;

            //무결성 체크 결과가 없거나 실패한 경우
            if (!this.icReaderCheckResult) {
                this.openPopupCheck();
            }
        },

        /**
         * 무결성 체크창 띄우기
         */
        async openPopupCheck() {
            //카드리더기 미사용여부 체크
            if (this.icReaderUseYn == 'N') {
                utils.messageBox('alert', '카드리더기 미사용 상태입니다.(POPS POS 정보 확인)');
                return;
            }

            //무결성 체크창 열려있는지 체크
            if (this.isOpenCardPopup()) {
                return;
            }

            //접속 시간 서버시간으로 설정
            let systemTime = await http.getSystemTime();

            //접속정보 설정
            this.webrtcDatachannel.setConnectPage(
                this.checkPopupPage, //popupPage
                systemTime.nowDateTime, // accessDateTime
                this.receiveMessageFromCheckPage, // receiveCallBack
                this.initCheckPopup, //initCallback
                this.closeCheckPopup // closeCallback
            );

            //팝업 열기
            this.cardPopupUtils.openPopup(this.checkPopupPage, this.$options.name, systemTime.nowDateTime, 350, 650);

            //접속하기
            this.webrtcDatachannel.connectToPopup();
        },

        /**
         * 무결성 체크 창이 Open되고 데이터 통신이 연결되면 호출
         */
        initCheckPopup() {
            console.log('initCheckPopup');
            this.webrtcDatachannel.sendMessage({ type: 'init' });
        },

        /**
         * 무결성 체크창이 닫히면 호출
         */
        closeCheckPopup() {
            this.cardPopupUtils.cardWindow = null;
        },

        /**
         * 무결성 체크창에서 전송된 데이터 호출
         * @param { Object } param
         */
        async receiveMessageFromCheckPage(param) {
            if (param.type == 'fail' || param.type == 'success') {
                let chekResult = await utils.getIcReaderCheckResult(
                    this.$options.name,
                    this.$store.getters.userInfo.userIp,
                    this.icReaderPort
                );
                console.log('chekResult', chekResult);
                this.icReaderStatusMessage = chekResult.icReaderStatusMessage;
                this.icReaderCheckResult = chekResult.icReaderCheckResult;
            }
        },

        // 결재상신 팝업 호출
        async onClickApprvPopupCall() {
            utils.openLayerPopup('PGE_CMZ_00012', this.onCloseApprvPopup, {
                pageInitialData: {
                    //paymntRequDate: this.queryData.paymntRequDate,
                    //paymntRequSeq: this.queryData.paymntRequSeq,
                    title: '정기권 전체 환불 요청 - ' + this.pvApprTicketNo,
                    aprvTaskCd: this.codeValidityValue,
                    contents: this.codeContent,
                },
                size: 'xlg',
            });
        },
        // 결재상신 Callback
        onCloseApprvPopup(PrgData) {
            if (!utils.isEmpty(PrgData)) {
                console.log('approvalId:' + PrgData.approvalId);
                console.log('receiptNo:' + this.pvRECEIPT_NO);

                const dataParams = {
                    receiptNo: this.pvRECEIPT_NO,
                    knoxApprId: PrgData.approvalId,
                    memshpUid: this.pvApprMemshpUid,
                    ticketNo: this.pvApprTicketNo,
                };

                http.request(this.$options.name, 'DTS_JNF_00009', {
                    data: dataParams,
                }).then((res) => {
                    if (res.data) {
                        let errorCode = res.data.errorCode;
                        if (!utils.isNull(errorCode) || !utils.isNull(errorMsg)) {
                            if (errorCode != '0000') {
                                utils.messageBox('alert', errorCode + ':' + errorMsg);
                                return;
                            } else {
                                utils.messageBox('alert', '상신 완료 되었습니다.');
                                this.fnReSet(true);
                            }
                        }
                    }
                });
            }
        },

        // 전체환불 상신 버튼, 전체환불 처리 버튼 제어
        fnControlButton() {
            let targetCnt = this.toInt(this.targetCnt);

            if (this.pvIS_RETURN_FG == '0') {
                if (targetCnt == 1) {
                    // 결재 진행 상태 0:전송대기, 1:결재진행 중, 2:완결, 3:반려, 4:상신취소, 5:전결, 6:후완결
                    let knoxApprId = this.dpReturn.getValue(0, 'knoxApprId');
                    let knoxApprStatusValue = this.dpReturn.getValue(0, 'knoxApprStatusValue');

                    if (knoxApprStatusValue == '0' || knoxApprStatusValue == '1') {
                        this.btnRefundAppr = '0';
                        this.btnRefundAll = '0';
                    } else if (knoxApprStatusValue == '2' || knoxApprStatusValue == '5' || knoxApprStatusValue == '6') {
                        this.btnRefund = '0';
                        this.btnRefundAppr = '0';
                        this.btnRefundAll = '1';

                        // 전체환불 승인완료건 만 남아 있다면, 계산 다시
                        this.fnCaluReturnAmt(true);
                    } else if (knoxApprStatusValue == '3' || knoxApprStatusValue == '4') {
                        this.btnRefundAppr = '1';
                        this.btnRefundAll = '0';
                    } else if (utils.isNull(knoxApprId)) {
                        this.btnRefundAppr = '1';
                        this.btnRefundAll = '0';
                    } else {
                        this.btnRefundAppr = '0';
                        this.btnRefundAll = '0';
                    }
                } else {
                    this.btnRefundAppr = '0';
                    this.btnRefundAll = '0';
                }
            } else {
                this.btnRefundAppr = '0';
                this.btnRefundAll = '0';
            }

            this.fnRefundMessage(targetCnt);
        },

        // stcReturn, stcMsg
        fnRefundMessage(targetCnt) {
            console.log('methods > fnRefundMessage');
            console.log('methods > fnRefundMessage > this.pvIS_RETURN_FG:' + this.pvIS_RETURN_FG);
            // let webAmt = this.toInt(this.billDVO.webAmt);
            // let cardAmt = this.toInt(this.billDVO.cardAmt);
            // let cashAmt = this.toInt(this.billDVO.cashAmt);
            // let pointAmt = this.toInt(this.billDVO.pointAmt);
            // let restGiftAmt = this.toInt(this.billDVO.restGiftAmt);
            // let saleAmt = this.toInt(this.billDVO.saleAmt);

            if (targetCnt == 0 || this.billDVO == null) {
                this.stcReturn = '현금 환불';
                this.stcMsg = '';
                return;
            }

            // 당일 취소
            if (this.pvIS_RETURN_FG == '1') {
                this.fnRefundMessage_1();
                // 청구취소
            } else if (this.pvIS_RETURN_FG == '2') {
                this.fnRefundMessage_2();
                // 현금환불
            } else {
                this.fnRefundMessage_0();
            }

            let elEnterCnt = 0;
            let elUseAmt = 0;
            let penaltyAmt = 0;
            let nRow = 0;
            for (let i = 0; i < this.dpReturn.getRowCount(); i++) {
                elEnterCnt = this.toInt(this.dpReturn.getValue(i, 'elEnterCnt'));
                elUseAmt = this.toInt(this.dpReturn.getValue(i, 'elUseAmt'));
                penaltyAmt = this.toInt(this.dpReturn.getValue(i, 'penaltyAmt'));

                if (elEnterCnt > 0 && elUseAmt == 0 && penaltyAmt == 0) {
                    nRow++;
                    break;
                }
            }

            // 당일 결제 환불 인 경우, 입장권
            if (nRow > 0) {
                this.stcMsg = this.stcMsg + '(세부 결제내역 확인, 입장권 결제 후 환불)';
            }
        },

        fnRefundMessage_1() {
            let webAmt = this.toInt(this.billDVO.webAmt);
            let cardAmt = this.toInt(this.billDVO.cardAmt);
            let cashAmt = this.toInt(this.billDVO.cashAmt);
            let pointAmt = this.toInt(this.billDVO.pointAmt);
            let restGiftAmt = this.toInt(this.billDVO.restGiftAmt);
            let saleAmt = this.toInt(this.billDVO.saleAmt);

            // 웹 예약 결제의 건
            if (webAmt > 0) {
                this.stcMsg =
                    '환불처리 완료 후 [에버랜드 APP]-[예약내역]-[예약취소] 버튼을 눌러주셔야 됩니다(최종 환불까지 4~6일 소요)';
                this.stcReturn = 'WEB 환불';
            } else {
                if (cardAmt > 0 && cardAmt == saleAmt) {
                    this.stcMsg = '전체금액 환불로 신용카드 승인이 자동 취소됩니다. 카드사 영업일 기준 4~6일 소요. ';
                    this.stcReturn = '카드 환불';
                } else if (cashAmt > 0 && cashAmt == saleAmt) {
                    this.stcMsg = '현금 반환 (정산 상세 결제 수단 확인, 손님에게 직접 반환 불가)';
                    this.stcReturn = '현금 환불';
                } else if (pointAmt > 0 && pointAmt == saleAmt) {
                    this.stcMsg = '솜(포인트)으로 복구 됩니다.';
                    this.stcReturn = '현금 환불';
                } else if (restGiftAmt > 0 && restGiftAmt == saleAmt) {
                    this.stcMsg = '모바일 기프트카드 금액으로 복구됩니다.';
                    this.stcReturn = '현금 환불';
                } else {
                    let msg = '';
                    let cnt = 0;
                    // 당일취소+같은포스 --> 메세지 로직 삭제(캐스터가 직접 현물로 환불을 하지 않으므로)
                    // 당일취소+다른포스
                    if (cardAmt > 0) {
                        msg += '전체금액 환불로 신용카드 승인이 자동 취소됩니다. 카드사 영업일 기준 4~6일 소요. ';
                        cnt++;
                    }
                    if (pointAmt > 0) {
                        msg += '솜(포인트): ' + utils.numberWithCommas(pointAmt) + ' 복구. ';
                        cnt++;
                    }
                    if (restGiftAmt > 0) {
                        msg += '모바일 기프트카드: ' + utils.numberWithCommas(restGiftAmt) + ' 복구. ';
                        cnt++;
                    }
                    
                    cashAmt += this.toInt(this.billDVO.preticketAmt);
                    cashAmt += this.toInt(this.billDVO.giftcardAmt);

                    if (cashAmt > 0) {
                        this.stcMsg = '현금 ';
                        msg += '현금 반환 (정산 상세 결제 수단 확인, 손님에게 직접 반환 불가) ' + utils.numberWithCommas(cashAmt) + '원. ';                            
                        cnt++;
                    }

                    if (cnt > 0) {
                        msg = '복합 결제 취소건입니다.' + msg;
                        this.stcReturn = '복합 환불';
                    } else {
                        this.stcReturn = '현금 환불';
                    }
                    this.stcMsg = msg;
                }
            }
        },

        //
        fnRefundMessage_2() {
            let webAmt = this.toInt(this.billDVO.webAmt);
            let cardAmt = this.toInt(this.billDVO.cardAmt);
            let cashAmt = this.toInt(this.billDVO.cashAmt);
            let pointAmt = this.toInt(this.billDVO.pointAmt);
            let restGiftAmt = this.toInt(this.billDVO.restGiftAmt);
            let saleAmt = this.toInt(this.billDVO.saleAmt);

            // 웹 예약 결제의 건
            if (webAmt > 0) {
                this.stcMsg =
                    '환불처리 완료 후 [에버랜드 APP]-[예약내역]-[예약취소] 버튼을 눌러주셔야 됩니다(최종 환불까지 4~6일 소요)';
                this.stcReturn = 'WEB 환불';
            } else {
                if (cardAmt > 0 && cardAmt == saleAmt) {
                    this.stcMsg = '전체금액 환불로 신용카드 승인이 자동 취소됩니다. 카드사 영업일 기준 4~6일 소요.';
                    this.stcReturn = '카드 환불';
                } else if (cashAmt > 0 && cashAmt == saleAmt) {
                    this.stcMsg = '현금 반환 (정산 상세 결제 수단 확인, 손님에게 직접 반환 불가)';
                    this.stcReturn = '현금 환불';
                } else if (pointAmt > 0 && pointAmt == saleAmt) {
                    this.stcMsg = '솜(포인트)으로 복구 됩니다.';
                    this.stcReturn = '현금 환불';
                } else if (restGiftAmt > 0 && restGiftAmt == saleAmt) {
                    this.stcMsg = '모바일 기프트카드 금액으로 복구됩니다.';
                    this.stcReturn = '현금 환불';
                } else {
                    let msg = '';
                    let cnt = 0;

                    if (cardAmt > 0) {
                        msg += '전체금액 환불로 신용카드 승인이 자동 취소됩니다. 카드사 영업일 기준 4~6일 소요. ';
                        cnt++;
                    }
                    if (pointAmt > 0) {
                        msg += '솜(포인트): ' + utils.numberWithCommas(pointAmt) + ' 복구. ';
                        cnt++;
                    }
                    if (restGiftAmt > 0) {
                        msg += '모바일 기프트카드: ' + utils.numberWithCommas(restGiftAmt) + ' 복구. ';
                        cnt++;
                    }
                    cashAmt += this.toInt(this.billDVO.preticketAmt);
                    cashAmt += this.toInt(this.billDVO.giftcardAmt);
                    if (cashAmt > 0) {
                        this.stcMsg = '현금 ';
                        msg += '현금 반환 (정산 상세 결제 수단 확인, 손님에게 직접 반환 불가) ' + utils.numberWithCommas(cashAmt) + '원. ';
                        cnt++;
                    }

                    if (cnt > 0) {
                        msg = '복합 결제 취소건입니다.' + msg;
                        this.stcReturn = '복합 환불';
                    } else {
                        this.stcReturn = '현금 환불';
                    }
                    this.stcMsg = msg;
                }
            }
        },

        //
        fnRefundMessage_0() {
            //let returnAmt = this.toInt(this.returnAmt);       // 총환불금
            let mgiftReturn = this.toInt(this.mgiftReturn); // 기프트카드
            let memshpReturn = this.toInt(this.memshpReturn); // 멤버십포인트
            let cashReturn = this.toInt(this.cashReturn); // 현금환불금
            let webAmt = this.toInt(this.billDVO.webAmt); //
            let creditAmt = this.toInt(this.creditAmt); // 외상금액

            console.log('methods > fnRefundMessage > 0 > mgiftReturn :' + mgiftReturn);
            console.log('methods > fnRefundMessage > 0 > memshpReturn :' + memshpReturn);
            console.log('methods > fnRefundMessage > 0 > cashReturn :' + cashReturn);
            console.log('methods > fnRefundMessage > 0 > webAmt :' + webAmt);

            let msg = '';
            let cnt = 0;

            // 웹 예약 결제의 건
            if (webAmt > 0) {
                //this.stcMsg = '현금 계좌이체 환불 대상(4~6일 소요) or 입금실 부분청구 취소 요청';
                //this.stcReturn = 'WEB 환불';
                if (cashReturn > 0 && cashReturn >= 300000) {
                    msg += '현금 계좌이체 환불 대상(4~6일 소요) :' + utils.numberWithCommas(cashReturn) + ' 원. ';
                    cnt++;
                } else if (cashReturn > 0) {
                    msg +=
                        '현금 반환 (정산 상세 결제 수단 확인, 손님에게 직접 반환 불가) :' +
                        utils.numberWithCommas(cashReturn) +
                        ' 원. ';
                    cnt++;
                }

                if (memshpReturn > 0) {
                    msg += '솜(포인트): ' + utils.numberWithCommas(memshpReturn) + ' 복구. ';
                    cnt++;
                }

                if (cnt > 1) {
                    msg = '복합 결제 취소건입니다. ' + msg;
                    this.stcReturn = '복합 환불';
                } else {
                    this.stcReturn = '현금 환불';
                }
                this.stcMsg = msg;
            } else {
                if (memshpReturn > 0) {
                    msg += '솜(포인트): ' + utils.numberWithCommas(memshpReturn) + ' 복구. ';
                    cnt++;
                }
                if (mgiftReturn > 0) {
                    msg += '모바일 기프트카드: ' + utils.numberWithCommas(mgiftReturn) + ' 복구. ';
                    cnt++;
                }
                if (cashReturn > 0 && cashReturn >= 300000) {
                    msg += '현금 계좌이체 환불 대상(4~6일 소요) :' + utils.numberWithCommas(cashReturn) + ' 원. ';
                    cnt++;
                } else if (cashReturn > 0) {
                    msg +=
                        '현금 반환 (정산 상세 결제 수단 확인, 손님에게 직접 반환 불가) :' +
                        utils.numberWithCommas(cashReturn) +
                        ' 원. ';
                    cnt++;
                } else if (creditAmt > 0) {
                    msg +=
                        '외상(정산 상세 결제 수단 확인, 손님에게 직접 반환 불가) :' +
                        utils.numberWithCommas(creditAmt) +
                        ' 원. ';
                    cnt++;
                }

                if (cnt > 1) {
                    msg = '복합 결제 취소건입니다. ' + msg;
                    this.stcReturn = '복합 환불';
                } else {
                    this.stcReturn = '현금 환불';
                }
                this.stcMsg = msg;
            }
        },

        // 메세지
        fnRefundMsg(sMsg) {
            console.log('methods > fnRefundMsg > sMsg:' + sMsg);
            console.log('methods > fnRefundMsg > sMsg:' + sMsg);
            this.stcMsg = sMsg; // divMsg.stcMsg.Text = sMsg;

            let elEnterCnt = 0;
            let elUseAmt = 0;
            let penaltyAmt = 0;
            let nRow = 0;
            for (let i = 0; i < this.dpReturn.getRowCount(); i++) {
                elEnterCnt = this.toInt(this.dpReturn.getValue(i, 'elEnterCnt'));
                elUseAmt = this.toInt(this.dpReturn.getValue(i, 'elUseAmt'));
                penaltyAmt = this.toInt(this.dpReturn.getValue(i, 'penaltyAmt'));

                if (elEnterCnt > 0 && elUseAmt == 0 && penaltyAmt == 0) {
                    nRow++;
                    break;
                }
            }

            // 당일 결제 환불 인 경우, 입장권
            if (nRow > 0) {
                this.stcMsg = this.stcMsg + '(세부 결제내역 확인, 입장권 결제 후 환불)';
            }
        },

        /**
         * 숫자 변환
         * @param { Number or String or null } num
         */
        toInt(num) {
            if (utils.length(num) == 0) {
                return 0;
            } else {
                return parseInt(num);
            }
        },

        // 특수문자 체크
        specialChar() {
            const searchNewText = utils.trim(this.reason);
            if (utils.isExistSpecialChar(searchNewText)) {
                // `-_{}[];:<>/? 제외 특수문자는 입력할 수 없습니다.
                utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
                    this.reason = '';
                    this.$refs.reason.focus();
                });
            }
        },
    },
};
</script>
<style scoped></style>
