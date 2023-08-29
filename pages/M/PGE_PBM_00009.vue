<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 담당자 정보 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="접수임시저장리스트"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                    <ur-icon-button icon="search" icon-type="line" color="primary" @click="openModalP000009" />

                    <!-- ::S 공통 팝업 -->
                    <ur-modal ref="modalP00009" class="modal-b1c6" large dragable title="공통팝업" @closed="closed">
                        <template slot="title">
                            <div class="modal-title">접수임시저장리스트</div>
                        </template>
                        <template>
                            <!-- <sui-page class="custom_page"> -->
                            <div class="modal-body">
                                <!-- ::S 콘텐츠1 -->
                                <ur-form-box toggleable>
                                    <ur-form-item
                                        label="파크구분"
                                        :labelAlign="'right'"
                                        style="width: 50%; height: auto"
                                    >
                                        <ur-text-field value="EL/CB" style="width: 100%; height: auto" readonly />
                                    </ur-form-item>
                                    <ur-form-item
                                        label="성명"
                                        :labelAlign="'right'"
                                        required
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

                                <!-- <div class="comm_title_wrap mt10">
                  <h4>임시타이틀 영역_접수임시저장리스트</h4>
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
                                    :options="options"
                                    :data-set-options="{ id: 'id' }"
                                />
                                <!-- ::E 콘텐츠1 -->
                            </div>
                            <!-- </sui-page> -->
                        </template>
                        <template slot="action">
                            <ur-button>선택</ur-button>
                            <ur-button color="violet" @click="closeModal">닫기</ur-button>
                        </template>
                    </ur-modal>
                    <!-- ::E 공통 팝업-->
                </ur-form-item>
                <!-- ::E 담당자 정보 -->
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>초기화</ur-button>
                    <ur-button color="violet"> 검색 </ur-button>
                </div>
            </div>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00009', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            // 드롭다운
            valueD1: '1',

            // 테이블 옵션
            options: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 접수임시저장리스트 팝업테이블
            columnsP1T1: [
                { text: 'No.', value: 'value1', width: '40px' },
                { text: '성명', value: 'value2', width: '80px' },
                { text: '생년월일', value: 'value3', width: '100px' },
                { text: '인원유형', value: 'value4', width: '100px' },
                { text: '만기일', value: 'value5' },
                { text: '선가입', value: 'value6' },
                { text: '티켓명', value: 'value7' },
            ],
            listP1T1: [
                {
                    value1: '1',
                    value2: '최상현',
                    value3: '1977/07/14',
                    value4: '대인',
                    value5: '2023/10/27',
                    value6: '선가입',
                    value7: '종일권',
                },
            ],
        };
    },
    computed: {
        modalP00009() {
            return this.$refs.modalP00009;
        },
    },
    methods: {
        openModalP000009() {
            this.modalP00009.open();
        },
        closeModal() {
            this.modalP00009.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
