<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 담당자 정보 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="입장내역조회"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                    <ur-icon-button icon="search" icon-type="line" color="primary" @click="openmodalP00006" />

                    <!-- ::S 공통 팝업 -->
                    <ur-modal ref="modalP00006" class="modal-b1c6" large dragable title="공통팝업" @closed="closed">
                        <template slot="title">
                            <div class="modal-title">입장내역조회</div>
                        </template>
                        <template>
                            <!-- <sui-page class="custom_page"> -->
                            <div class="modal-body">
                                <!-- ::S 콘텐츠1 -->
                                <!-- <div class="comm_title_wrap">
                  <h4>임시타이틀 영역_입장내역조회</h4>
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
                                    Height="300"
                                />
                                <!-- ::E 콘텐츠1 -->
                            </div>
                            <!-- </sui-page> -->
                        </template>
                        <template slot="action">
                            <!-- <ur-button color="violet">선택</ur-button> -->
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
    name: 'PGE_PBM_00006', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            // 테이블 옵션
            options: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 입장내역조회팝업테이블
            columnsP1T1: [
                { text: '성명', value: 'value1' },
                { text: '입장일', value: 'value2' },
                { text: '입장시간', value: 'value3' },
                { text: '정상가', value: 'value4' },
            ],
            listP1T1: [
                {
                    value1: '강상현',
                    value2: '2023/01/12',
                    value3: '10:20:35',
                    value4: '129,000',
                },
            ],
        };
    },
    computed: {
        modalP00006() {
            return this.$refs.modalP00006;
        },
    },
    methods: {
        openmodalP00006() {
            this.modalP00006.open();
        },
        closeModal() {
            this.modalP00006.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
