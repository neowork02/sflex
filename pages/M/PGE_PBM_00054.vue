<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <!-- S::컨텐츠1 -->
            <ur-form-box toggleable>
                <ur-form-item class="flex_wrap" label="장비명" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-text-field value="" style="width: 100%" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="현재 IP" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-text-field value="" style="width: 100%" readonly />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button color="violet">TEMP DATA 제거</ur-button>
                </div>
            </div>
            <!-- E::컨텐츠1 -->

            <!-- S::컨텐츠2 -->
            <div class="comm_title_wrap mt25">
                <h4>임시타이틀 영역</h4>
            </div>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="SCANNER TEST"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <div style="width: 18%" class="pr10">
                        <ur-button color="violet" style="width: 100%">TEST</ur-button>
                    </div>
                    <ur-text-field value="" style="width: 82%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="영수증 PRINTER TEST"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <div style="width: 18%" class="pr10">
                        <ur-button color="violet" style="width: 100%">TEST</ur-button>
                    </div>
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="NFC TEST" :labelAlign="'right'" style="width: 50%; height: auto">
                    <div style="width: 18%" class="pr10">
                        <ur-button color="violet" style="width: 100%" @click="openModalP00055">TEST</ur-button>
                    </div>
                    <ur-text-field value="" style="width: 82%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="무결성 제약조건 TEST"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <div style="width: 75%">######EP-7633111####ERPS-MEM0001</div>
                    <div style="width: 25%">
                        <ur-button color="violet" style="width: 100%" @click="openModalP00054"
                            >무결성체크결과
                        </ur-button>
                    </div>
                </ur-form-item>
                <!-- ::S 무결성체크 팝업 -->
                <ur-modal ref="modalP00054" class="modal-b1c6" large dragable title="무결성체크팝업" @closed="closed">
                    <template slot="title">
                        <div class="modal-title mb45">무결성체크결과</div>
                    </template>
                    <template>
                        <!-- <sui-page class="custom_page"> -->
                        <div class="modal-body">
                            <!-- ::S 콘텐츠1 -->
                            <ur-form-box toggleable>
                                <ur-form-item
                                    class="flex_wrap"
                                    label="장비IP"
                                    :labelAlign="'right'"
                                    style="width: 45%; height: auto; border: 0"
                                >
                                    <ur-text-field style="width: 100%" value="71.26.60.174" />
                                </ur-form-item>
                                <ur-form-item
                                    class="flex_wrap"
                                    label="조회기간"
                                    :labelAlign="'right'"
                                    style="width: 55%; height: auto"
                                >
                                    <ur-range-picker autoConfirm input-type="YYYY-MM-DD" init="day+30" />
                                </ur-form-item>
                            </ur-form-box>
                            <!-- <div class="btn_wrap mt10"> -->
                            <div class="btn_wrap">
                                <div class="right_box">
                                    <ur-button color="violet">조회</ur-button>
                                </div>
                            </div>
                            <!-- <div class="comm_title_wrap mt10">
                                <h4>임시타이틀 영역</h4>
                            </div> -->
                            <!--S:: 타이틀 오른쪽 total info -->
                            <div class="comm_title_wrap mt10">
                                <div class="right_box">
                                    <div class="totalNo">
                                        <div class="totalCt">Total<span>0</span>건</div>
                                    </div>
                                </div>
                            </div>
                            <!--E::: 타이틀 오른쪽 total info -->
                            <ur-data-grid
                                ref="grid"
                                :headers="columns"
                                :data-source="list"
                                :options="options"
                                :data-set-options="{ id: 'id' }"
                            />
                            <!-- ::E 콘텐츠1 -->
                        </div>
                        <!-- </sui-page> -->
                    </template>
                    <template slot="action">
                        <ur-button>무결성체크</ur-button>
                        <ur-button color="violet" @click="closeModal">닫기</ur-button>
                    </template>
                </ur-modal>
                <!-- ::E 무결성체크 팝업-->
                <!-- ::S NFC TEST 팝업 -->
                <ur-modal ref="modalP00055" class="modal-b1c6" small dragable title="NFC TEST팝업" @closed="closed">
                    <template slot="title">
                        <div class="modal-title mb45">NFC TEST(임시타이틀)</div>
                    </template>
                    <template>
                        <!-- <sui-page class="custom_page"> -->
                        <div class="modal-body">
                            <!-- ::S 콘텐츠1 -->
                            <div class="msgWrap">
                                <span class="resultTit">50000원 IC Card 입력 대기 중</span>
                            </div>
                            <!-- ::E 콘텐츠1 -->
                        </div>
                        <!-- </sui-page> -->
                    </template>
                    <template slot="action">
                        <ur-button color="violet" @click="closeModal">취소</ur-button>
                    </template>
                </ur-modal>
                <!-- ::E NFC TEST 팝업-->
            </ur-form-box>
            <!-- E::컨텐츠2 -->

            <!-- S::컨텐츠3 -->
            <div class="comm_title_wrap mt40">
                <h4 class="pr10">전자서명 TEST</h4>
                <ur-button color="violet">TEST</ur-button>
            </div>
            <ur-form-box toggleable>
                <ur-form-item class="flex_wrap" label="타입" :labelAlign="'right'" style="width: 100%; height: auto">
                    <div class="radioForm">
                        <ur-radio v-model="v1" value="Radio 00054_01" sm>결제</ur-radio>
                        <ur-radio v-model="v1" value="Radio 00054_02" sm>비결제</ur-radio>
                    </div>
                    <span class="pl16 pr10">할부개월</span>
                    <ur-text-field value="3" />
                    <span class="pl16 pr10">결제금액</span>
                    <ur-text-field value="1000" />
                </ur-form-item>

                <ur-form-item
                    class="flex_wrap borTop"
                    label="사용할 암호화 키 "
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="20221221" style="width: 100%" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap borTop"
                    label="해제할 암호화 키"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="435225278" style="width: 100%" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="라벨명(임시)"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                >
                    <textarea rows="8" />
                    <!-- <div class="img_box" style="height: 150px"></div> -->
                </ur-form-item>
            </ur-form-box>
            <!-- E::컨텐츠3 -->

            <!-- <div class="comm_title_wrap mt30">
        <h4>임시타이틀 영역</h4>
      </div>
      <ur-data-grid
        ref="grid"
        :headers="columns"
        :data-source="list"
        :options="options"
        :data-set-options="{ id: 'id' }"
      >
      </ur-data-grid> -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00054', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            //드롭다운
            valueD1: '1',

            // 라디오 버튼
            v1: 'Radio 00054_01',

            value: null,

            // 테이블
            options: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
            // 그리드 리스트
            columns: [
                { text: 'POS IP', value: 'value1' },
                { text: 'Reader ID', value: 'value2' },
                { text: 'PORT NO', value: 'value3' },
                { text: 'SW VERSION', value: 'value4' },
                { text: '검증결과', value: 'value5' },
                { text: '검증일', value: 'value6' },
                { text: '검증시간', value: 'value7' },
            ],
            list: [
                {
                    value1: '71.26.60.174',
                    value2: '####EP-7633111',
                    value3: '3',
                    value4: 'EVER-MEMZ001',
                    value5: 'SUCCESS',
                    value6: '2022-10-18',
                    value7: '14:14:57',
                },
            ],
        };
    },
    created() {},
    computed: {
        modalP00054() {
            return this.$refs.modalP00054;
        },
        modalP00055() {
            return this.$refs.modalP00055;
        },
    },
    methods: {
        openModalP00054() {
            this.modalP00054.open();
        },
        openModalP00055() {
            this.modalP00055.open();
        },
        closeModal() {
            this.modalP00054.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
