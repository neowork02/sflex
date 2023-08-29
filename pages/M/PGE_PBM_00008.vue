<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 담당자 정보 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="비고정보 관리"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                    <ur-icon-button icon="search" icon-type="line" color="primary" @click="openModalP000008" />

                    <!-- ::S 공통 팝업 -->
                    <ur-modal ref="modalP00008" class="modal-b1c6" large dragable title="공통팝업" @closed="closed">
                        <template slot="title">
                            <div class="modal-title">비고정보 관리</div>
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
                                        <ur-text-field value="차길동" style="width: 100%; height: auto" readonly />
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
                                        <ur-button>추가</ur-button>
                                        <ur-button>삭제</ur-button>
                                        <ur-button color="violet">저장</ur-button>
                                    </div>
                                </div>

                                <!-- <div class="comm_title_wrap mt10">
                  <h4>임시타이틀 영역_비고정보 관리</h4>
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
    name: 'PGE_PBM_00008', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            // 라디오 버튼
            v1: null,

            // 테이블 옵션
            options: {
                height: 250,
                rowHeight: 41,
                pagination: false,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 비고정보관리 팝업테이블
            columnsP1T1: [
                { text: '작성일', value: 'value1', width: '120px' },
                { text: '작성자', value: 'value2', width: '100px' },
                { text: '비고', value: 'value3' },
                { text: '등록일시', value: 'value4', width: '120px' },
                { text: '등록자', value: 'value5', width: '100px' },
                { text: '수정일시', value: 'value6', width: '120px' },
                { text: '수정자', value: 'value7', width: '100px' },
            ],

            listP1T1: [
                {
                    value1: '2022/12/14',
                    value2: '주상현',
                    value3: '',
                    value4: '2022/12/20',
                    value5: '차길동',
                    value6: '2023/01/08',
                    value7: '김길동',
                },
            ],
        };
    },
    computed: {
        modalP00008() {
            return this.$refs.modalP00008;
        },
    },
    methods: {
        openModalP000008() {
            this.modalP00008.open();
        },
        closeModal() {
            this.modalP00008.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
