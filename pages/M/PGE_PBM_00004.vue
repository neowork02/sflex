<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 담당자 정보 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="정기권가입자 리스트"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                    <ur-icon-button icon="search" icon-type="line" color="primary" @click="openModalP00004" />

                    <!-- ::S 공통 팝업 -->
                    <ur-modal ref="modalP00004" class="modal-b1c6" large dragable title="공통팝업" @closed="closed">
                        <template slot="title">
                            <div class="modal-title">정기권가입자 리스트</div>
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
                                        label="휴대폰번호"
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
                                        <ur-text-field value="" style="width: 55%; height: auto" readonly />
                                    </ur-form-item>
                                </ur-form-box>
                                <div class="btn_wrap mt10">
                                    <!--::S InfoText -->
                                    <div class="guideList">
                                        <ul class="listDot">
                                            <li>
                                                이름은 단독 검색이 불가합니다. 휴대폰 번호나 카드번호를 함께 입력하시기
                                                바랍니다.
                                            </li>
                                            <!-- <li>
                        성명, 생년월일, 휴대폰은 2가지 이상 조합 조회만
                        가능합니다.
                      </li>
                      <li>
                        조회 결과는 100건으로 제한됩니다. 100건 조회시에 원하는
                        결과가 없는 경우 조회 조건을 추가하여 조회 바랍니다.
                      </li> -->
                                        </ul>
                                    </div>
                                    <!--::E InfoText -->
                                    <div class="right_box">
                                        <ur-button>초기화</ur-button>
                                        <ur-button color="violet">조회</ur-button>
                                    </div>
                                </div>
                                <!-- 
                <div class="comm_title_wrap mt10">
                  <h4>임시타이틀 영역</h4>
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
                                    :headers="columnsP1T14"
                                    :data-source="listP1T14"
                                    :options="options555"
                                    :data-set-options="{ id: 'id' }"
                                    class="mt10"
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
                </ur-form-item>

                <!-- ::E 담당자 정보 -->
            </ur-form-box>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00004', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            // 라디오 버튼
            v1: null,

            // 테이블 옵션
            options555: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 정기권가입자 리스트 팝업테이블
            columnsP1T14: [
                { text: '성명', value: '성명' },
                { text: '회원구분', value: '회원구분' },
                { text: '정기권번호', value: '정기권번호' },
                { text: '생년월일', value: '생년월일' },
                { text: '휴대폰', value: '휴대폰' },
            ],

            listP1T14: [
                {
                    value1: '차상현',
                    value2: '정회원',
                    value3: '1021152475',
                    value4: '1982/11/07',
                    value5: '010-1888-2980',
                },
            ],
        };
    },
    computed: {
        modalP00004() {
            return this.$refs.modalP00004;
        },
    },
    methods: {
        openModalP00004() {
            this.modalP00004.open();
        },
        closeModal() {
            this.modalP00004.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
