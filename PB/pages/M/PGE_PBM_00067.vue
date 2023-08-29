<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 정보 -->
            <ur-button @click="openModalP00067">결제완료 팝업</ur-button>

            <!-- ::S 공통 팝업 -->
            <ur-modal ref="modalP00067" class="modal-b1c6" small dragable title="공통팝업" @closed="closed">
                <template slot="title">
                    <div class="modal-title">결제완료</div>
                </template>
                <template>
                    <!-- <sui-page class="custom_page"> -->
                    <div class="modal-body">
                        <!-- ::S 컨텐츠1 -->

                        <div class="con_box center" style="height: auto">
                            <span class="point">20220621V100C38010200008 </span>
                        </div>
                        <ur-data-grid
                            ref="grid"
                            :headers="columns1"
                            :data-source="list1"
                            :data-set-options="{ id: 'id' }"
                            :options="options"
                            :labelAlign="'right'"
                            class="mt20"
                        />
                        <ur-form-box toggleable class="mt20">
                            <ur-form-item
                                class="flex_wrap"
                                label="전체비고"
                                :labelAlign="'right'"
                                style="width: 100%; height: auto"
                            >
                                <textarea rows="3" />
                            </ur-form-item>
                        </ur-form-box>
                        <!-- S::메시지 -->
                        <div class="result_box center mt20" style="height: auto">
                            <span>결제금액 : 140,000</span>
                        </div>
                        <!-- E::메시지  -->

                        <!-- <div class="btn_wrap mt10">
              <div class="right_box">
                <ur-button color="violet">확인</ur-button>
              </div>
            </div> -->
                        <!-- ::E 컨텐츠1 -->
                    </div>
                    <!-- </sui-page> -->
                </template>
                <template slot="action">
                    <ur-button color="violet" @click="closeModal">확인</ur-button>
                </template>
            </ur-modal>
            <!-- ::E 공통 팝업-->
            <!-- ::E 정보 -->
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00067', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            options: {
                height: 250,
                rowHeight: 41,
                pagination: false,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 결제완료팝업 리스트
            columns1: [
                { text: '성명', value: 'value1' },
                { text: '정기권번호', value: 'value2' },
            ],
            list1: [
                {
                    value1: '홍길동',
                    value2: '1002065751',
                },
            ],
        };
    },
    computed: {
        modalP00067() {
            return this.$refs.modalP00067;
        },
    },
    methods: {
        openModalP00067() {
            this.modalP00067.open();
        },
        closeModal() {
            this.modalP00067.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
