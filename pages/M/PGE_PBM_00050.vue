<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 정보 -->
            <ur-button @click="openModalP00050">매핑권종선택 팝업</ur-button>

            <!-- ::S 공통 팝업 -->
            <ur-modal ref="modalP00050" class="modal-b1c6" large dragable title="공통팝업" @closed="closed">
                <template slot="title">
                    <div class="modal-title mb45">매핑권종선택</div>
                </template>
                <template>
                    <!-- <sui-page class="custom_page"> -->
                    <div class="modal-body">
                        <!-- ::S 콘텐츠1 -->
                        <ur-form-box toggleable>
                            <ur-form-item
                                class="flex_wrap"
                                label="파크구분"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-text-field value="EL" style="width: 100%; height: auto" readonly />
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="권종코드"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-text-field value="1002065751" style="width: 100%; height: auto" readonly />
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="연차"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-text-field value="1년차" style="width: 100%; height: auto" readonly />
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="권종명"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-text-field
                                    value="EL연간신규365스탠다드대인"
                                    style="width: 100%; height: auto"
                                    readonly
                                />
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="연령구분"
                                :labelAlign="'right'"
                                style="width: 100%; height: auto"
                            >
                                <ur-text-field value="대인" style="width: 36.7%; height: auto" readonly />
                            </ur-form-item>
                        </ur-form-box>
                        <ur-form-box toggleable style="margin-top: 20px">
                            <ur-form-item
                                class="flex_wrap"
                                label="권종구분"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-dropdown v-model="valueD1" :items="items1Info" />
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="권종코드"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-text-field value="" style="width: 100%; height: auto" />
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="권종명"
                                :labelAlign="'right'"
                                style="width: 100%; height: auto"
                            >
                                <ur-text-field value="" style="width: 36.7%; height: auto" />
                            </ur-form-item>
                        </ur-form-box>
                        <div class="btn_wrap mt10">
                            <div class="right_box">
                                <ur-button color="violet">조회</ur-button>
                            </div>
                        </div>
                        <!-- ::E 콘텐츠1 -->

                        <!-- ::S 콘텐츠2 -->
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
                            :headers="columnsP1T150"
                            :data-source="listP1T150"
                            :options="options50"
                            :data-set-options="{ id: 'id' }"
                        />
                        <!-- ::E 콘텐츠2 -->
                    </div>
                    <!-- </sui-page> -->
                </template>
                <template slot="action">
                    <ur-button> 선택 </ur-button>
                    <ur-button color="violet" @click="closeModal"> 닫기 </ur-button>
                </template>
            </ur-modal>
            <!-- ::E 공통 팝업-->
            <!-- ::E  정보 -->
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00050', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            // 라디오 버튼
            v1: null,
            // 드롭다운
            valueD1: '1',

            // 테이블 옵션
            options50: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 매핑권종선택 팝업테이블
            columnsP1T150: [
                { text: '성명', value: 'value1' },
                { text: '회원구분', value: 'value2' },
                { text: '정기권번호', value: 'value3' },
                { text: '생년월일', value: 'value4' },
                { text: '휴대폰', value: 'value5' },
            ],

            listP1T150: [
                {
                    value1: '예상현',
                    value2: '정회원',
                    value3: '3157152485',
                    value4: '1985/06/29',
                    value5: '010-9*75-2570',
                },
            ],
        };
    },
    computed: {
        // 드랍다운
        items1Info() {
            const items1Info = [];
            items1Info.push({ value: '1', text: '전체' });
            items1Info.push({ value: '2', text: '10만원' });
            items1Info.push({ value: '3', text: '30만원' });
            items1Info.push({ value: '4', text: '50만원' });
            items1Info.push({ value: '5', text: '100만원' });
            return items1Info;
        },
        // modalPopUp
        modalP00050() {
            return this.$refs.modalP00050;
        },
    },
    watch: {},
    methods: {
        openModalP00050() {
            this.modalP00050.open();
        },
        closeModal() {
            this.modalP00050.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
