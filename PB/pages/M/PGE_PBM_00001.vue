<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="파크구분"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                >
                    <ur-text-field value="EL" style="width: 100%" clearable disabled />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap borTop"
                    label="POS 체크 메세지"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="POS로 등록된 PC가 아닙니다." style="width: 100%" clearable readonly class="alignR" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="IC Reader 체크 메세지"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="IC Reader 체크 중입니다." style="width: 100%" clearable readonly />
                    <ur-button color="violet">체크</ur-button>
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="가입정보"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="v1" value="Radio 000011_01" sm>성명</ur-radio>
                        <ur-radio v-model="v1" value="Radio 000011_02" sm>휴대폰 </ur-radio>
                        <ur-radio v-model="v1" value="Radio 000011_03" sm>정기권번호</ur-radio>
                        <ur-radio v-model="v1" value="Radio 000011_04" sm>스마트예약확인증번호</ur-radio>
                        <ur-radio v-model="v1" value="Radio 000011_05" sm>멤버십QR</ur-radio>
                    </div>
                    <ur-text-field value="" class="pl16" />
                    <ur-icon-button icon="search" />
                    <!-- <div>
            <ur-radio-wrapper :items="items2" v-model="value" sm />
          </div> -->
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>조회/추가</ur-button>
                    <ur-button>초기화</ur-button>
                    <ur-button>선택삭제</ur-button>
                    <ur-button color="violet">임시저장 불러오기</ur-button>
                </div>
            </div>

            <!-- S::구매 정기권 정보 -->
            <div class="comm_title_wrap mt25">
                <h4>구매 정기권 정보</h4>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">Total<span>0</span>건</div>
                    </div>
                </div>
                <!--E:: 타이틀 오른쪽 total info -->
            </div>
            <ur-data-grid
                ref="grid"
                :headers="columns"
                :data-source="list1"
                :data-set-options="{ id: 'id' }"
                :options="opts"
            />
            <!-- E::구매 정기권 정보 -->

            <!-- S::회원정보+비고 -->
            <div class="comm_shut_wrap mt45">
                <div class="inbox7">
                    <div class="comm_title_wrap">
                        <h4 class="pr10">회원정보</h4>
                        <ur-button color="violet">친구조회</ur-button>
                        <ur-button color="violet">정기권상세 조회</ur-button>
                    </div>
                    <!-- S::Inner -->
                    <div class="inner">
                        <div class="inbox3">
                            <div ref="viewerArea" class="img_box" style="height: 250px"></div>
                        </div>
                        <div class="emptybox" />
                        <div class="inbox7">
                            <ur-form-box toggleable>
                                <ur-form-item
                                    class="flex_wrap"
                                    label="성명"
                                    :labelAlign="'right'"
                                    style="width: 50%; height: auto; border: 0"
                                >
                                    <ur-text-field value="곽*훈" style="width: 100%; height: auto" readonly />
                                </ur-form-item>
                                <ur-form-item
                                    class="flex_wrap"
                                    label="생년월일"
                                    :labelAlign="'right'"
                                    style="width: 50%; height: auto"
                                >
                                    <ur-text-field value="19700102" style="width: 100%; height: auto" readonly />
                                </ur-form-item>
                                <ur-form-item
                                    class="flex_wrap"
                                    label="휴대폰"
                                    :labelAlign="'right'"
                                    style="width: 50%; height: auto"
                                >
                                    <ur-text-field value="01099077772" style="width: 100%; height: auto" readonly />
                                </ur-form-item>
                                <ur-form-item
                                    class="flex_wrap"
                                    label="성별"
                                    :labelAlign="'right'"
                                    style="width: 50%; height: auto"
                                >
                                    <ur-text-field value="남" style="width: 100%; height: auto" readonly />
                                </ur-form-item>
                                <ur-form-item
                                    class="flex_wrap"
                                    label="회원구분"
                                    :labelAlign="'right'"
                                    style="width: 50%; height: auto"
                                >
                                    <ur-text-field value="정회원" style="width: 100%; height: auto" readonly />
                                </ur-form-item>
                                <ur-form-item
                                    class="flex_wrap"
                                    label="등급"
                                    :labelAlign="'right'"
                                    style="width: 50%; height: auto"
                                >
                                    <ur-text-field value="" style="width: 100%; height: auto" readonly />
                                </ur-form-item>
                                <ur-form-item
                                    class="flex_wrap"
                                    label="누적이용일"
                                    :labelAlign="'right'"
                                    style="width: 50%; height: auto"
                                >
                                    <ur-text-field value="3" style="width: 100%; height: auto" readonly />
                                </ur-form-item>
                                <ur-form-item
                                    class="flex_wrap"
                                    label="이전가입일"
                                    :labelAlign="'right'"
                                    style="width: 50%; height: auto"
                                >
                                    <ur-text-field value="20210716" style="width: 100%; height: auto" readonly />
                                </ur-form-item>
                                <ur-form-item
                                    class="flex_wrap"
                                    label="이전만기일"
                                    :labelAlign="'right'"
                                    style="width: 50%; height: auto"
                                >
                                    <ur-text-field value="20230717" style="width: 100%; height: auto" readonly />
                                </ur-form-item>
                                <ur-form-item
                                    class="flex_wrap"
                                    label="권종명"
                                    :labelAlign="'right'"
                                    style="width: 50%; height: auto"
                                >
                                    <ur-text-field
                                        value="[T]EL 기간 120D 대인"
                                        style="width: 100%; height: auto"
                                        readonly
                                    />
                                </ur-form-item>
                                <ur-form-item
                                    class="flex_wrap"
                                    label="이전권종명"
                                    :labelAlign="'right'"
                                    style="width: 100%; height: auto"
                                >
                                    <ur-text-field
                                        value="[T]EL 연간 신규 레귤러 대인"
                                        style="width: 100%; height: auto"
                                        readonly
                                    />
                                </ur-form-item>
                            </ur-form-box>
                        </div>
                    </div>
                    <!-- E::Inner -->
                </div>
                <div class="emptybox" />
                <div class="inbox3">
                    <div class="comm_title_wrap">
                        <h4 class="pr10">비고</h4>
                        <ur-button color="violet">추가</ur-button>
                        <ur-button color="violet">삭제</ur-button>
                        <ur-button color="violet">저장</ur-button>
                        <ur-button color="violet">비고삭제</ur-button>
                    </div>
                    <ur-data-grid
                        ref="grid"
                        :headers="columns21"
                        :data-source="list21"
                        :data-set-options="{ id: 'id' }"
                        :options="opts2"
                    />
                </div>
            </div>
            <!-- E::회원정보+비고 -->

            <!-- S::이용가능권종+제휴할인 -->
            <div class="comm_shut_wrap mt45">
                <div class="inbox">
                    <div class="comm_title_wrap">
                        <h4 class="pr10">이용가능권종</h4>
                        <ur-button color="violet">조회</ur-button>
                        <ur-button color="violet">전체</ur-button>
                    </div>
                    <div class="comm_view_wrap mt10">
                        <div class="row">
                            <div class="col-xs-1">권종구분</div>
                            <div class="col-xs-3">
                                <ur-dropdown v-model="valueD1" :items="items1" />
                            </div>
                            <div class="col-xs-1">권종코드</div>
                            <div class="col-xs-3">
                                <ur-text-field value="" style="width: 100%; height: auto" />
                            </div>
                            <div class="col-xs-1">권종명</div>
                            <div class="col-xs-3">
                                <ur-text-field value="" style="width: 100%; height: auto" />
                            </div>
                        </div>
                    </div>
                    <ur-data-grid
                        ref="grid"
                        class="mt10"
                        :headers="columns31"
                        :data-source="list31"
                        :data-set-options="{ id: 'id' }"
                        :options="options"
                        style="width: 99%"
                    />
                </div>
                <div class="emptybox" />
                <div class="inbox">
                    <div class="comm_title_wrap">
                        <h4 class="pr10">제휴할인</h4>
                    </div>
                    <ur-form-box toggleable>
                        <ur-form-item
                            class="flex_wrap"
                            label="라벨명(임시)"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto; border: 0"
                        >
                            <div class="radioForm" style="margin: 3px 0">
                                <ur-radio v-model="v2" value="Radio 000012_01" sm>제휴카드</ur-radio>
                                <ur-radio v-model="v2" value="Radio 000012_02" sm>일반</ur-radio>
                                <ur-radio v-model="v2" value="Radio 000012_03" sm>선발행티켓</ur-radio>
                                <ur-radio v-model="v2" value="Radio 000012_04" sm>일모카드</ur-radio>
                            </div>
                        </ur-form-item>
                    </ur-form-box>
                    <ur-data-grid
                        ref="grid"
                        class="mt10"
                        :headers="columns41"
                        :data-source="list4"
                        :data-set-options="{ id: 'id' }"
                        :options="options"
                        Height="300"
                    />

                    <!-- S::[2023-06-19] 추가  -->
                    <!-- <ur-form-box toggleable class="mt10">
          <ur-form-item class="flex_wrap" label="일모카드/OTC번호" :labelAlign="'right'"  style="width: 100%; height: auto" >
                <ur-text-field  class="pr10" style="width: 84%;" maxlength="16" />
                 <div style="width: 16%" > 
                  <ur-button color="violet" @click="clickSearchIlmoAmt" >잔액조회</ur-button>
              </div>
          </ur-form-item>
          <ur-form-item class="flex_wrap borTop" label="카드번호" :labelAlign="'right'" style="width: 100%; height: auto">
            <ur-text-field style="width: 100%; height: auto" readonly/>
          </ur-form-item>
          <ur-form-item class="flex_wrap" label="일모금액"  :labelAlign="'right'" style="width: 100%; height: auto">
            <ur-text-field mask="number" style="width: 100%; height: auto" readonly/>
          </ur-form-item>
          <ur-form-item class="flex_wrap" label="사용금액" :labelAlign="'right'" style="width: 100%; height: auto">
            <ur-text-field style="width: 100%; height: auto" readonly/>
          </ur-form-item>
        </ur-form-box>   -->
                    <!-- E::[2023-06-19] 추가  -->
                </div>
            </div>
            <!-- E::이용가능권종+제휴할인 -->

            <!-- S::결제정보 -->
            <div class="comm_title_wrap mt45">
                <h4 class="pr10">결제정보</h4>
            </div>
            <ur-form-box toggleable>
                <ur-form-item class="flex_wrap" label="총액" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-text-field value="" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="할인액" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-text-field value="" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="결제액" :labelAlign="'right'" style="width: 100%; height: auto">
                    <ur-text-field value="" style="width: 100%; height: auto" readonly />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>임시저장</ur-button>
                    <ur-button>무료가입</ur-button>
                    <ur-button color="violet">결제처리</ur-button>
                </div>
            </div>
            <!-- E::결제정보 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00001',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            // 드롭다운
            valueD1: '1',

            // 라디오 버튼
            value: null,
            v1: 'Radio 000011_01',
            v2: 'Radio 000012_01',
            // 테이블
            options: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
            opts: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: true,
                selectCheck: true,
            },
            opts1: {
                height: 200,
                rowHeight: 41,
                noInfo: true,
                multiSelect: true,
                selectCheck: false,
            },
            opts2: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: true,
                selectCheck: false,
            },
            // SAM 컬럼명 변경
            columns: [
                { text: 'No1.', value: 'value11', width: '60px' },
                { text: '22', value: 'value22', width: '80px' },
                { text: '33', value: 'value33', width: '80px' },
                { text: '44', value: 'value44', width: '80px' },
                { text: '55', value: 'value55' },
                { text: '66', value: 'value66' },
                { text: '77', value: 'value77', width: '80px' },
                { text: '88', value: 'value88' },
                { text: '99', value: 'value99' },
                { text: '100', value: 'value101', width: '100px' },
                { text: '111', value: 'value112', width: '100px' },
                { text: '222', value: 'value123', width: '100px' },
                { text: '333', value: 'value134', width: '100px' },
                { text: '444', value: 'value145', width: '100px' },
                { text: '555', value: 'value156', width: '100px' },
            ],
            list1: [
                {
                    value11: '9991',
                    value22: '곽*훈1',
                    value33: '정회원1',
                    value44: '곽*훈1',
                    value55: '1970/01/01',
                    value66: '010-9907-7771',
                    value77: '3',
                    value88: '[T]EL 기간 130D 대인',
                    value99: '1연간회원 할인',
                    value101: '110,000',
                    value112: '11,000',
                    value123: '115,000',
                    value134: '2123/01/28',
                    value145: '2124/01/27',
                    value156: '1111111',
                },
            ],
            // 비고
            columns21: [
                { text: '일자', value: 'value1', width: '120px' },
                { text: '작성자', value: 'value2', width: '100px' },
                { text: '내용', value: 'value3' },
            ],
            list21: [
                {
                    value1: '2021/07/10',
                    value2: '곽*훈',
                    value3: '',
                },
            ],
            // 이용가능권종
            columns31: [
                { text: '코드', value: 'value1' },
                { text: '권종명', value: 'value2' },
                { text: '기준단가', value: 'value3' },
            ],
            list31: [
                {
                    value1: '1002065585',
                    value2: '[T]EL 기간 120D 대인',
                    value3: '120,000',
                },
            ],
            // 제휴할인
            columns41: [
                { text: '코드', value: '코드' },
                { text: '유형명', value: '유형명' },
                { text: '할인', value: '할인' },
            ],
            list4: [
                {
                    value1: '1002065585',
                    value2: '삼성마이키즈소인50%',
                    value3: '외국인 쿠폰 할인',
                },
            ],
        };
    },
    computed: {
        items1() {
            const items1Rtn = [];
            items1Rtn.push({ value: '1', text: '전체' });
            items1Rtn.push({ value: '2', text: 'E/L' });
            return items1Rtn;
        },
    },
};
</script>
<style scoped>
/* .custom_page .ur-form-item:nth-child(2) + .ur-form-item,
.custom_page .ur-form-item:nth-child(3) + .ur-form-item {
  border-top: none;
} */
</style>
