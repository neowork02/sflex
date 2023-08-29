<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 정보 -->
            <ur-button @click="openModalP00066">수표조회 팝업</ur-button>

            <!-- ::S 공통 팝업 -->
            <ur-modal ref="modalP00066" class="modal-b1c6" small dragable title="공통팝업" @closed="closed">
                <template slot="title">
                    <div class="modal-title">수표조회</div>
                </template>
                <template>
                    <!-- <sui-page class="custom_page"> -->
                    <div class="modal-body">
                        <!-- ::S 컨텐츠1 -->
                        <div ref="viewerArea" class="img_box" style="height: 220px">
                            <img style="width: 100%; height: 200px" src="@/assets/images/contents/example_01.png" />
                        </div>
                        <ur-form-box toggleable class="mt20">
                            <ur-form-item
                                class="flex_wrap"
                                label="수표구분"
                                :labelAlign="'right'"
                                style="width: 100%; height: auto"
                            >
                                <!-- <div class="radioForm">
                  <ur-radio v-model="v1" value="Radio 00066_01" sm
                    >10만원권</ur-radio
                  >
                  <ur-radio v-model="v1" value="Radio 00066_02" sm
                    >30만원권
                  </ur-radio>
                  <ur-radio v-model="v1" value="Radio 00066_03" sm
                    >50만원권</ur-radio
                  >
                  <ur-radio v-model="v1" value="Radio 00066_04" sm
                    >100만원권</ur-radio
                  >
                  <ur-radio v-model="v1" value="Radio 00066_05" sm
                    >기타</ur-radio
                  >
                </div> -->
                                <div style="width: 100%">
                                    <ur-radio-wrapper :items="items2" v-model="value" sm />
                                </div>
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap borTop"
                                label="수표금액"
                                :labelAlign="'right'"
                                style="width: 100%; height: auto"
                            >
                                <ur-text-field value="" style="width: 100%; height: auto" />
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="수표번호"
                                :labelAlign="'right'"
                                style="width: 100%; height: auto"
                            >
                                <ur-text-field value="" style="width: 100%; height: auto" />
                            </ur-form-item>
                            <ur-form-item label="일련번호" :labelAlign="'right'" style="width: 100%; height: auto">
                                <ur-text-field value="" style="width: 100%; height: auto" />
                            </ur-form-item>
                            <ur-form-item label="발행은행" :labelAlign="'right'" style="width: 100%; height: auto">
                                <ur-text-field value="" style="width: 100%; height: auto" />
                            </ur-form-item>
                            <ur-form-item label="발행일자" :labelAlign="'right'" style="width: 100%; height: auto">
                                <ur-date-picker v-model="dateValue1" init="today" />
                            </ur-form-item>
                            <ur-form-item label="조회결과" :labelAlign="'right'" style="width: 100%; height: auto">
                                <ur-text-field value="" style="width: 100%; height: auto" readonly />
                            </ur-form-item>
                            <ur-form-item label="조회시간" :labelAlign="'right'" style="width: 100%; height: auto">
                                <ur-text-field value="" style="width: 100%; height: auto" readonly />
                            </ur-form-item>
                        </ur-form-box>
                        <!-- <div class="btn_wrap mt10">
              <div class="right_box">
                <ur-button>조회</ur-button>
                <ur-button color="violet">취소</ur-button>
              </div>
            </div> -->
                        <!-- ::E 컨텐츠1 -->
                    </div>
                    <!-- </sui-page> -->
                </template>
                <template slot="action">
                    <ur-button>조회</ur-button>
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
    name: 'PGE_PBM_00066', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            // 드롭다운
            valueD1: '1',
            valueD2: '1',
            valueD3: '1',

            // 라디오 버튼
            v1: 'Radio 00066_01',

            value: null,
        };
    },
    computed: {
        // modalPopUp
        modalP00066() {
            return this.$refs.modalP00066;
        },
        items2() {
            const rtn = [];
            rtn.push({ value: '1', text: '10만원권' });
            rtn.push({ value: '2', text: '30만원권' });
            rtn.push({ value: '3', text: '50만원권' });
            rtn.push({ value: '4', text: '100만원권' });
            rtn.push({ value: '5', text: '기타' });
            return rtn;
        },
    },
    methods: {
        openModalP00066() {
            this.modalP00066.open();
        },
        closeModal() {
            this.modalP00066.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
