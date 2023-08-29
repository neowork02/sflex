<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 담당자 정보 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="친구조회"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                    <ur-icon-button icon="search" icon-type="line" color="primary" @click="openModalP000007" />

                    <!-- ::S 공통 팝업 -->
                    <ur-modal ref="modalP00007" class="modal-b1c6" large dragable title="공통팝업" @closed="closed">
                        <template slot="title">
                            <div class="modal-title">친구조회</div>
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
                                        <ur-text-field value="홍길동" style="width: 100%; height: auto" readonly />
                                    </ur-form-item>
                                    <ur-form-item
                                        class="flex_wrap"
                                        label="정기권번호"
                                        :labelAlign="'right'"
                                        style="width: 50%; height: auto"
                                    >
                                        <ur-text-field value="2021152485" style="width: 100%; height: auto" readonly />
                                    </ur-form-item>
                                </ur-form-box>
                                <div class="btn_wrap mt10">
                                    <div class="right_box">
                                        <ur-button color="violet">조회</ur-button>
                                    </div>
                                </div>

                                <!-- <div class="comm_title_wrap mt10">
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
                                    :headers="columnsP1T1"
                                    :data-source="listP1T1"
                                    :options="options666"
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
                </ur-form-item>

                <!-- ::E 담당자 정보 -->
            </ur-form-box>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00007', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            // 라디오 버튼
            v1: null,

            // 테이블 옵션
            options666: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 친구정보조회팝업테이블
            columnsP1T1: [
                { text: '성명1', value: 'value1' },
                { text: '회원구분2', value: 'value2' },
                { text: '정기권번호3', value: 'value3' },
                { text: '생년월일4', value: 'value4' },
                { text: '휴대폰5', value: 'value5' },
            ],

            listP1T1: [
                {
                    value1: '김병현',
                    value2: '정회원',
                    value3: '2021152485',
                    value4: '1980/12/12',
                    value5: '010-8877-0000',
                },
            ],
        };
    },
    computed: {
        modalP00007() {
            return this.$refs.modalP00007;
        },
    },
    methods: {
        openModalP000007() {
            this.modalP00007.open();
        },
        closeModal() {
            this.modalP00007.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
