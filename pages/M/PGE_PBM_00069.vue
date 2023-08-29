<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 정보 -->
            <ur-button @click="openModalP00069">현금영수증 승인 팝업</ur-button>

            <!-- ::S 공통 팝업 -->
            <ur-modal ref="modalP00069" class="modal-b1c6" medium dragable title="공통팝업" @closed="closed">
                <template slot="title">
                    <div class="modal-title">현금영수증 승인</div>
                </template>
                <template>
                    <!-- <sui-page class="custom_page"> -->
                    <div class="modal-body">
                        <!-- ::S 컨텐츠1 -->
                        <ur-form-box toggleable class="mt20">
                            <ur-form-item
                                class="flex_wrap"
                                label="구분"
                                :labelAlign="'right'"
                                style="width: 100%; height: auto"
                            >
                                <div class="radioForm">
                                    <ur-radio v-model="v1" value="Radio 000691_01" sm>개인</ur-radio>
                                    <ur-radio v-model="v1" value="Radio 000691_02" sm>사업자</ur-radio>
                                    <ur-radio v-model="v1" value="Radio 000691_03" sm>자진발급</ur-radio>
                                    <ur-radio v-model="v1" value="Radio 000691_04" sm>일반영수증</ur-radio>
                                </div>
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap borTop"
                                label="인증수단"
                                :labelAlign="'right'"
                                style="width: 100%; height: auto"
                            >
                                <div class="radioForm">
                                    <ur-radio v-model="v2" value="Radio 000692_01" sm>핸드폰</ur-radio>
                                    <ur-radio v-model="v2" value="Radio 000692_02" sm>사업자번호</ur-radio>
                                    <ur-radio v-model="v2" value="Radio 000692_03" sm>카드</ur-radio>
                                    <ur-radio v-model="v2" value="Radio 000692_04" sm>자진발급</ur-radio>
                                </div>
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="식별정보"
                                :labelAlign="'right'"
                                style="width: 100%; height: auto"
                            >
                                <ur-text-field value="" style="width: 100%; height: auto" />
                            </ur-form-item>
                        </ur-form-box>
                        <div class="btn_wrap mt10">
                            <div class="right_box">
                                <ur-button color="violet">승인</ur-button>
                            </div>
                        </div>
                        <!-- ::E 컨텐츠1 -->
                        <!-- ::S 컨텐츠2 -->
                        <ur-form-box toggleable class="mt20">
                            <ur-form-item
                                class="flex_wrap"
                                label="Message"
                                :labelAlign="'right'"
                                style="width: 100%; height: auto"
                            >
                                <textarea rows="3" readonly />
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap borTop"
                                label="승인번호"
                                :labelAlign="'right'"
                                style="width: 100%; height: auto"
                            >
                                <ur-text-field value="" style="width: 100%; height: auto" readonly />
                            </ur-form-item>
                        </ur-form-box>
                        <!-- ::E 컨텐츠2 -->
                    </div>
                    <!-- </sui-page> -->
                </template>
                <template slot="action">
                    <ur-button>완료</ur-button>
                    <ur-button color="violet" @click="closeModal">닫기</ur-button>
                </template>
            </ur-modal>
            <!-- ::E 공통 팝업-->
            <!-- ::E 정보 -->
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00069', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            // 라디오 버튼
            v1: 'Radio 000691_01',
            v2: 'Radio 000692_01',
            value: null,
        };
    },
    computed: {
        modalP00069() {
            return this.$refs.modalP00069;
        },
    },
    methods: {
        openModalP00069() {
            this.modalP00069.open();
        },
        closeModal() {
            this.modalP00069.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
