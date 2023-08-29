<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 정보 -->
            <ur-button @click="openModalP00068">멤버십가입자 리스트 팝업</ur-button>
            <ur-button @click="openModalP000682">멤버십정보 팝업</ur-button>
            <ur-button @click="openModalP000683">가용일 계획관리 팝업(임시)</ur-button>
            <ur-button @click="openModalP000684">쿠폰마스터 조회</ur-button>
            <ur-button @click="openModalP000685">결제메인팝업</ur-button>
            <!-- ::S 공통 팝업 -->
            <ur-modal ref="modalP00068" class="modal-b1c6" large dragable title="공통팝업" @closed="closed">
                <template slot="title">
                    <div class="modal-title">멤버십가입자 리스트</div>
                </template>
                <template>
                    <!-- <sui-page class="custom_page"> -->
                    <div class="modal-body">
                        <!-- ::S 콘텐츠1 -->
                        <ur-form-box toggleable>
                            <ur-form-item
                                class="flex_wrap"
                                label="성명"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-text-field value="" style="width: 100%; height: auto" />
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="휴대폰"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-text-field value="" style="width: 100%; height: auto" />
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="정기권번호"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-text-field value="" style="width: 100%; height: auto" />
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="카드번호"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-button color="violet">멤버십QR</ur-button>
                                <ur-text-field value="" style="width: 57.5%; height: auto" disabled />
                            </ur-form-item>
                        </ur-form-box>
                        <div class="btn_wrap mt10">
                            <!--::S InfoText -->
                            <div class="guideList">
                                <ul class="listDot">
                                    <li>성명, 생년월일, 휴대폰은 2가지 이상 조합 조회만 가능합니다.</li>
                                    <li>
                                        조회 결과는 100건으로 제한됩니다. 100건 조회시에 원하는 결과가 없는 경우 조회
                                        조건을 추가하여 조회 바랍니다.
                                    </li>
                                </ul>
                            </div>
                            <!--::E InfoText -->
                            <div class="right_box">
                                <ur-button>초기화</ur-button>
                                <ur-button color="violet">조회</ur-button>
                            </div>
                        </div>
                        <!-- <div class="comm_title_wrap mt10">
              <h4 class="pr10">임시타이틀 영역</h4>
            </div> -->
                        <!--S:: 타이틀 오른쪽 total info -->
                        <div class="comm_title_wrap">
                            <div class="right_box mt12">
                                <div class="totalNo">
                                    <div class="totalCt">Total<span>0</span>건</div>
                                </div>
                            </div>
                        </div>
                        <!--E::: 타이틀 오른쪽 total info -->
                        <ur-data-grid
                            ref="grid"
                            :headers="columnsP1T168"
                            :data-source="listP1T168"
                            :options="options68"
                            :data-set-options="{ id: 'id' }"
                        />
                        <!-- ::E 콘텐츠1 -->
                    </div>
                    <!-- </sui-page> -->
                </template>
                <template slot="action">
                    <ur-button> 선택 </ur-button>
                    <ur-button color="violet" @click="closeModal"> 닫기 </ur-button>
                </template>
            </ur-modal>
            <!-- ::E 공통 팝업-->
            <!-- ::S 멤버십정보 팝업 -->
            <ur-modal ref="modalP000682" class="modal-b1c6" large dragable title="공통팝업" @closed="closed">
                <template slot="title">
                    <div class="modal-title">멤버십정보</div>
                </template>
                <template>
                    <!-- <sui-page class="custom_page"> -->
                    <div class="modal-body">
                        <!-- ::S 콘텐츠1 -->
                        <ur-form-box toggleable>
                            <ur-form-item
                                class="flex_wrap"
                                label="성명"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-text-field value="" style="width: 100%; height: auto" />
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="아이디"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-text-field value="" style="width: 100%; height: auto" />
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="생년월일"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-date-picker autoConfirm input-type="YYYY-MM-DD" />
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="휴대폰번호"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-text-field value="" style="width: 100%; height: auto" />
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="성별"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-text-field value="" style="width: 100%; height: auto" />
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="회원구분"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-text-field value="" style="width: 100%; height: auto" />
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="이메일"
                                :labelAlign="'right'"
                                style="width: 100%; height: auto"
                            >
                                <ur-text-field value="" style="width: 100%; height: auto" />
                            </ur-form-item>
                        </ur-form-box>
                        <!-- ::E 콘텐츠1 -->
                    </div>
                    <!-- </sui-page> -->
                </template>
                <template slot="action">
                    <ur-button color="violet" @click="closeModal"> 닫기 </ur-button>
                </template>
            </ur-modal>
            <!-- ::E 멤버십정보 팝업-->

            <!-- ::S 가용일 계획관리 임시 팝업 -->
            <ur-modal ref="modalP000683" class="modal-b1c6" medium dragable title="팝업" @closed="closed">
                <template slot="title">
                    <div class="modal-title">가용일 계획관리</div>
                </template>
                <template>
                    <!-- <sui-page class="custom_page"> -->
                    <div class="modal-body">
                        <!-- ::S 콘텐츠1 -->
                        <ur-form-box toggleable>
                            <ur-form-item label="관리번호" :labelAlign="'right'" style="width: 50%; height: auto">
                                <ur-text-field style="width: 100%; height: auto" readonly />
                            </ur-form-item>
                            <ur-form-item label="적용년도" :labelAlign="'right'" style="width: 50%; height: auto">
                                <ur-text-field style="width: 100%; height: auto" readonly />
                            </ur-form-item>
                            <ur-form-item
                                label="가용계획명"
                                required
                                :labelAlign="'right'"
                                style="width: 100%; height: auto"
                            >
                                <ur-text-field maxlength="100" style="width: 100%; height: auto" />
                            </ur-form-item>
                            <ur-form-item
                                label="상세설명"
                                required
                                :labelAlign="'right'"
                                style="width: 100%; height: auto"
                            >
                                <textarea maxlength="100" rows="4" style="width: 100%" />
                            </ur-form-item>
                        </ur-form-box>
                        <!-- ::E 콘텐츠1 -->
                    </div>
                    <!-- </sui-page> -->
                </template>
                <template slot="action">
                    <ur-button color="violet" @click="closeModal"> 닫기 </ur-button>
                </template>
            </ur-modal>
            <!-- ::E 가용일 계획관리 임시 팝업-->

            <!-- ::S 쿠폰마스터 조회 팝업 -->
            <ur-modal ref="modalP000684" class="modal-b1c6" large dragable title="공통팝업" @closed="closed">
                <template slot="title">
                    <div class="modal-title">쿠폰마스터 조회</div>
                </template>
                <template>
                    <!-- <sui-page class="custom_page"> -->
                    <div class="modal-body">
                        <!-- ::S 콘텐츠1 -->
                        <ur-form-box toggleable>
                            <ur-form-item
                                class="flex_wrap"
                                label="쿠폰마스터 번호"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-text-field value="" style="width: 100%; height: auto" />
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="쿠폰명"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-text-field value="" style="width: 100%; height: auto" />
                            </ur-form-item>
                        </ur-form-box>
                        <div class="btn_wrap mt10">
                            <div class="right_box">
                                <ur-button>초기화</ur-button>
                                <ur-button color="violet">조회</ur-button>
                            </div>
                        </div>
                        <div class="comm_title_wrap mt25">
                            <h4>쿠폰 리스트</h4>
                            <!--S:: 타이틀 오른쪽 total info -->
                            <div class="right_box">
                                <div class="totalNo">
                                    <div class="totalCt">Total<span>5</span>건</div>
                                </div>
                            </div>
                            <!--E:: 타이틀 오른쪽 total info -->
                        </div>
                        <real-grid
                            ref="ifLogGrid"
                            grid-id="ifLogGrid"
                            grid-root="/lib"
                            :gridFields="ifLogFields"
                            :gridColumns="ifLogColumns"
                            :style="{ height: '250px' }"
                        />
                        <!-- ::E 콘텐츠1 -->
                    </div>
                    <!-- </sui-page> -->
                </template>
                <template slot="action">
                    <ur-button> 선택 </ur-button>
                    <ur-button color="violet" @click="closeModal"> 닫기 </ur-button>
                </template>
            </ur-modal>
            <!-- ::E 쿠폰마스터 조회 팝업-->
            <!-- ::S 결제메인팝업 -->
            <ur-modal ref="modalP000685" class="modal-b1c6 compact" small title="" @closed="closed">
                <template>
                    <div class="modal-body">
                        <!-- ::S 콘텐츠1 -->
                        <div class="sui-confirm sui-messagebox__confirm" style="width: auto">
                            <div class="sui-messagebox__icon-area"></div>
                            <div class="sui-messagebox__message-area">품질-정기권 판매 관리</div>
                            <div class="sui-messagebox__sub-message-wrapper sui-messagebox__message--center">
                                <div class="sui-messagebox__sub-message">
                                    <span class="emp">
                                        주의! 카드 결제 내역이 있으며 창을 닫아도 취소되지 않음<br />
                                        (별도 승인 취소 절차 필요)<br />
                                        카드결제 : 1건
                                    </span>
                                </div>
                            </div>
                            <div class="sui-messagebox__button-area">
                                <button type="button" class="sui-messagebox__button--negative large">아니요</button>
                                <button type="button" class="sui-messagebox__button--positive">예</button>
                            </div>
                        </div>
                        <!-- ::E 콘텐츠1 -->
                    </div>
                </template>
                <!-- <template slot="action">
                  <ur-button> 선택 </ur-button>
                  <ur-button color="violet" @click="closeModal"> 닫기 </ur-button>
              </template> -->
            </ur-modal>
            <!-- ::E 결제메인팝업-->

            <!-- ::E  정보 -->
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00068', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            // 라디오 버튼
            v1: null,
            // 드롭다운

            // 테이블 옵션
            options68: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 그리드 리스트
            columnsP1T168: [
                { text: '성명', value: '테스트' },
                { text: '회원구분', value: '정회원' },
                { text: '정기권번호', value: '2022231456' },
                { text: '생년월일', value: '2000/01/01' },
                { text: '휴대폰', value: '01012345678' },
            ],

            listP1T168: [
                {
                    value1: '박상현',
                    value2: '정회원',
                    value3: '2021152485',
                    value4: '1985/06/19',
                    value5: '010-8877-0000',
                },
            ],

            ifLogFields: [
                { fieldName: 'requestTime', dataType: 'text' },
                { fieldName: 'responseTime', dataType: 'text' },
                { fieldName: 'systemView', dataType: 'text' },
                { fieldName: 'interface', dataType: 'text' },
                { fieldName: 'responseCode', dataType: 'text' },
            ],
            ifLogColumns: [
                {
                    name: 'requestTime',
                    fieldName: 'requestTime',
                    header: { text: 'text1' },
                    edit: false,
                },
                {
                    name: 'responseTime',
                    fieldName: 'responseTime',
                    header: { text: 'text2' },
                    edit: false,
                },
                {
                    name: 'systemView',
                    fieldName: 'systemView',
                    header: { text: 'text3' },
                    edit: false,
                },
                {
                    name: 'interface',
                    fieldName: 'interface',
                    header: { text: 'text4' },
                    edit: false,
                },
                {
                    name: 'responseCode',
                    fieldName: 'responseCode',
                    header: { text: 'text5' },
                    edit: false,
                },
            ],
        };
    },
    computed: {
        // modalPopUp
        modalP00068() {
            return this.$refs.modalP00068;
        },
        modalP000682() {
            return this.$refs.modalP000682;
        },
        modalP000683() {
            return this.$refs.modalP000683;
        },
        modalP000684() {
            return this.$refs.modalP000684;
        },
        modalP000685() {
            return this.$refs.modalP000685;
        },
    },
    methods: {
        openModalP00068() {
            this.modalP00068.open();
        },
        openModalP000682() {
            this.modalP000682.open();
        },
        openModalP000683() {
            this.modalP000683.open();
        },
        openModalP000684() {
            this.modalP000684.open();
        },
        openModalP000685() {
            this.modalP000685.open();
        },
        closeModal() {
            this.modalP00068.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
