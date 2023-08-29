<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 담당자 정보 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="지급쿠폰 조회"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                    <ur-icon-button icon="search" icon-type="line" color="primary" @click="openModalP00005" />

                    <!-- ::S 공통 팝업 -->
                    <ur-modal ref="modalP00005" class="modal-b1c6" large dragable title="공통팝업" @closed="closed">
                        <template slot="title">
                            <div class="modal-title">지급쿠폰 조회</div>
                        </template>
                        <template>
                            <!-- <sui-page class="custom_page"> -->
                            <div class="modal-body">
                                <!-- ::S 콘텐츠1 -->
                                <!-- <div class="comm_title_wrap">
                  <h4>임시타이틀 영역_지급쿠폰 조회</h4>
                </div> -->
                                <!--S:: 타이틀 오른쪽 total info -->
                                <div class="comm_title_wrap">
                                    <div class="right_box">
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
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00005', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            // 드롭다운

            // 테이블 옵션
            options: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 지급쿠폰조회팝업테이블
            columnsP1T1: [
                { text: '지급일자', value: 'value1' },
                { text: '쿠폰코드', value: 'value2' },
                { text: '쿠폰명', value: 'value3' },
                { text: '유효기간', value: 'value4' },
                { text: '상태', value: 'value5' },
            ],
            listP1T1: [
                {
                    value1: '2023/02/17',
                    value2: '6021752485',
                    value3: '연간회원 할인(상품)',
                    value4: '2023/10/15',
                    value5: '만료',
                },
            ],
        };
    },
    computed: {
        modalP00005() {
            return this.$refs.modalP00005;
        },
    },
    methods: {
        openModalP00005() {
            this.modalP00005.open();
        },
        closeModal() {
            this.modalP00005.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
