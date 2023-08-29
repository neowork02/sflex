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
                    <ur-text-field value="EL/CB" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap borTop"
                    label="가입정보"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="v1" value="Radio 00018_01" sm>성명</ur-radio>
                        <ur-radio v-model="v1" value="Radio 00018_02" sm>휴대폰 </ur-radio>
                        <ur-radio v-model="v1" value="Radio 00018_03" sm>정기권번호</ur-radio>
                        <ur-radio v-model="v1" value="Radio 00018_04" sm>영수증번호</ur-radio>
                        <ur-radio v-model="v1" value="Radio 00018_05" sm>멤버십QR</ur-radio>
                    </div>
                    <ur-text-field value="" class="pl16" />
                    <ur-icon-button icon="search" style="padding-top: 0px" />
                </ur-form-item>
            </ur-form-box>

            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>초기화</ur-button>
                    <ur-button color="violet">조회</ur-button>
                </div>
            </div>
            <!-- E::조회조건 -->

            <!-- S::정산내역+상세내역 -->
            <div class="comm_shut_wrap mt25">
                <div class="inbox3">
                    <div class="comm_title_wrap">
                        <h4>정산내역</h4>
                    </div>
                    <ur-data-grid
                        ref="grid"
                        :headers="columns"
                        :data-source="list"
                        :data-set-options="{ id: 'id' }"
                        :options="options18"
                        :labelAlign="'right'"
                    />
                </div>
                <div class="emptybox" />
                <div class="inbox7">
                    <div class="comm_title_wrap">
                        <h4 class="pr10">상세내역</h4>
                        <ur-button color="violet">적용</ur-button>
                        <!--S:: 타이틀 오른쪽 total info -->
                        <div class="right_box">
                            <div class="totalNo">
                                <div class="totalCt">Total<span>1</span>건</div>
                            </div>
                        </div>
                        <!--E:: 타이틀 오른쪽 total info -->
                    </div>
                    <ur-data-grid
                        ref="grid"
                        :headers="columns2"
                        :data-source="list2"
                        :data-set-options="{ id: 'id' }"
                        :options="options18"
                        :labelAlign="'right'"
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
                    <ur-date-picker autoConfirm input-type="YYYY-MM-DD" disabled />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="총결제금액"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="현금" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-text-field value="" style="width: 100%" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="WEB" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-text-field value="" style="width: 100%" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="상품권" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-text-field value="" style="width: 100%" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="외상" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-text-field value="" style="width: 100%" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="카드" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-text-field value="" style="width: 100%" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="티켓" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-text-field value="" style="width: 100%" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="멤버십포인트"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="기프트카드"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%" readonly />
                </ur-form-item>
            </ur-form-box>
            <!-- E::정산상세 -->

            <!-- S::멤버십 포인트 내역+대상자+환불금 -->
            <div class="comm_shut_wrap mt40">
                <div class="inbox70">
                    <!-- S::멤버십 포인트 내역 -->
                    <div class="comm_title_wrap">
                        <h4>멤버십 포인트 내역</h4>
                    </div>
                    <ur-form-box toggleable>
                        <ur-form-item
                            class="flex_wrap"
                            label="적립포인트"
                            required
                            :labelAlign="'right'"
                            style="width: 50%; height: auto"
                        >
                            <ur-text-field value="" style="width: 100%" readonly />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            label="잔여포인트"
                            :labelAlign="'right'"
                            style="width: 50%; height: auto"
                        >
                            <ur-text-field value="" style="width: 100%" readonly />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            label="가용포인트"
                            :labelAlign="'right'"
                            style="width: 50%; height: auto"
                        >
                            <ur-text-field value="" style="width: 100%" readonly />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            label="적립예정포인트"
                            :labelAlign="'right'"
                            style="width: 50%; height: auto"
                        >
                            <ur-text-field value="" style="width: 100%" readonly />
                        </ur-form-item>
                    </ur-form-box>
                    <!-- E::멤버십 포인트 내역 -->
                    <!-- ::S::대상자 -->
                    <div class="comm_title_wrap mt20">
                        <h4>대상자</h4>
                        <!--S:: 타이틀 오른쪽 total info -->
                        <div class="right_box">
                            <div class="totalNo">
                                <div class="totalCt">Total<span>2</span>건</div>
                            </div>
                        </div>
                        <!--E:: 타이틀 오른쪽 total info -->
                    </div>
                    <ur-data-grid
                        ref="grid"
                        :headers="columns3"
                        :data-source="list3"
                        :data-set-options="{ id: 'id' }"
                        :options="options1"
                        :labelAlign="'right'"
                    />
                    <!-- E::대상자 -->
                </div>
                <div class="emptybox" />
                <div class="inbox30">
                    <!-- ::S::환불금 -->
                    <div class="comm_title_wrap">
                        <h4 class="pr10">환불금</h4>
                        <!-- <ur-button color="violet">환불처리</ur-button>
            <ur-button color="violet">전체환불</ur-button> -->
                    </div>
                    <ur-form-box toggleable>
                        <ur-form-item
                            class="flex_wrap"
                            label="총환불금"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field value="" style="width: 100%" />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap borTop"
                            label="기프트카드"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field value="" style="width: 100%" />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            label="멤버십포인트"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field value="" style="width: 100%" />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            label="환불"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field value="" style="width: 100%" />
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
                            <ur-button>환불처리</ur-button>
                            <ur-button color="violet">전체환불</ur-button>
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
                    <ur-text-field value="" style="width: 100%; height: auto"></ur-text-field>
                    <!-- textarea 사용할 경우 -->
                    <!-- <textarea rows="2" maxlength="1000" style="width: 100%" /> -->
                </ur-form-item>
            </ur-form-box>
            <!-- E::환불사유 -->

            <!-- S::메시지 -->
            <div class="result_box mt20" style="height: auto">
                <span>현금환불입니다.</span>
            </div>
            <!-- E::메시지  -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00018', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            //드롭다운
            valueD1: '1',

            // 라디오 버튼
            v1: 'Radio 00018_01',

            value: null,

            // 테이블
            options18: {
                height: 200,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
            options1: {
                height: 150,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
            // 정산내역
            columns: [
                { text: 'No', value: 'value1' },
                { text: '영수증번호', value: 'value2' },
                { text: '정산구분', value: 'value3' },
            ],
            list: [
                {
                    value1: '1',
                    value2: 'C100V380102',
                    value3: '',
                },
            ],
            // 상세내역 테이블
            columns2: [
                { text: '성명', value: 'value1' },
                { text: '정기권번호', value: 'value2' },
                { text: '생년월일', value: 'value3' },
                { text: '인원유형', value: 'value4' },
                { text: '가입일', value: 'value5' },
                { text: '발급일', value: 'value6' },
                { text: '만기일', value: 'value7' },
                { text: '결제금액', value: 'value8' },
                { text: '권종명', value: 'value9' },
                { text: '환불가능여부', value: 'value10' },
            ],
            list2: [
                {
                    value1: '홍길동',
                    value2: '99164587',
                    value3: '1982-10-19',
                    value4: '대인',
                    value5: '2022-12-22',
                    value6: '2022-12-23',
                    value7: '2023-12-31',
                    value8: '29,000',
                    value9: 'EL연간신규350스탠다드대인',
                    value10: '가능',
                },
            ],
            // 대상자 테이블
            columns3: [
                { text: 'No.', value: 'value1', width: '50px' },
                { text: '성명', value: 'value2' },
                { text: '정기권번호', value: 'value3' },
                { text: '생년월일', value: 'value4' },
                { text: '정상가', value: 'value5' },
                { text: '할인가', value: 'value6' },
                { text: '할인유형', value: 'value7' },
                { text: '위약금', value: 'value8' },
                { text: '판매가', value: 'value9' },
                { text: 'E/L이용횟수', value: 'value10' },
                { text: '이용금액', value: 'value11' },
                { text: 'C/B이용횟수', value: 'value12' },
                { text: '이용금액', value: 'value13' },
                { text: '지급쿠폰차감', value: 'value14' },
                { text: '환불금액', value: 'value15' },
            ],

            list3: [
                {
                    value1: '1',
                    value2: '홍길동',
                    value3: '99164559',
                    value4: '1980-12-11',
                    value5: '29,000',
                    value6: '25,000',
                    value7: '-',
                    value8: '4,000',
                    value9: '25,000',
                    value10: '3',
                    value11: '15,000',
                    value12: '1',
                    value13: '5,000',
                    value14: '',
                    value15: '10,000',
                },
            ],
        };
    },
    computed: {
        itemsD1() {
            const rtn = [];
            rtn.push({ value: '1', text: '전체' });
            return rtn;
        },
    },
};
</script>
<style scoped></style>
