<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 담당자 정보 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="권종선택(가입)"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                    <ur-icon-button icon="search" icon-type="line" color="primary" @click="openModalP00003" />

                    <!-- ::S 공통 팝업 -->
                    <ur-modal ref="modalP00003" class="modal-b1c6" large dragable title="공통팝업" @closed="closed">
                        <template slot="title">
                            <div class="modal-title">권종선택(가입)</div>
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
                                        style="width: 50%; height: auto; border: 0"
                                    >
                                        <ur-dropdown v-model="valueD1" :items="items13" />
                                    </ur-form-item>
                                    <ur-form-item
                                        class="flex_wrap"
                                        label="시간구분"
                                        :labelAlign="'right'"
                                        style="width: 50%; height: auto"
                                    >
                                        <ur-dropdown v-model="valueD2" :items="items2" />
                                    </ur-form-item>
                                    <ur-form-item
                                        class="flex_wrap"
                                        label="권종구분"
                                        :labelAlign="'right'"
                                        style="width: 50%; height: auto"
                                    >
                                        <ur-dropdown v-model="valueD2" :items="items3" />
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
                                        <ur-text-field value="" style="width: 100%; height: auto" />
                                    </ur-form-item>
                                </ur-form-box>
                                <div class="btn_wrap mt10">
                                    <div class="right_box">
                                        <ur-button>초기화</ur-button>
                                        <ur-button color="violet">조회</ur-button>
                                    </div>
                                </div>
                                <div class="comm_title_wrap mt10">
                                    <h4>권종 리스트</h4>
                                    <!--S:: 타이틀 오른쪽 total info -->
                                    <div class="right_box mt12">
                                        <div class="totalNo">
                                            <div class="totalCt">Total<span>3</span>건</div>
                                        </div>
                                    </div>
                                    <!--E:: 타이틀 오른쪽 total info -->
                                </div>
                                <ur-data-grid
                                    ref="grid"
                                    :headers="columnsP1T1"
                                    :data-source="listP1T13"
                                    :options="options"
                                    :data-set-options="{ id: 'id' }"
                                    Height="300"
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
    name: 'PGE_PBM_00003', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            valueD1: '1',
            valueD2: '1',

            options: {
                height: 250,
                rowHeight: 41,
                pagination: false,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 권종선택팝업테이블
            columnsP1T1: [
                { text: '코드', value: 'value1' },
                { text: '권종명', value: 'value2' },
                { text: '기준단가', value: 'value3' },
            ],
            listP1T13: [
                {
                    value1: '1002065721',
                    value2: 'EL연간신규375스탠다드대인',
                    value3: '215,000',
                },
            ],
        };
    },
    computed: {
        items13() {
            const items13Rtn = [];
            items13Rtn.push({ value: '1', text: '전체' });
            items13Rtn.push({ value: '2', text: 'E/L' });
            items13Rtn.push({ value: '3', text: 'E/L2' });
            items13Rtn.push({ value: '4', text: 'E/L3' });
            items13Rtn.push({ value: '5', text: 'E/L4' });
            return items13Rtn;
        },
        items2() {
            const items2Rtn = [];
            items2Rtn.push({ value: '1', text: '시간' });
            return items2Rtn;
        },
        items3() {
            const items2Rtn = [];
            items2Rtn.push({ value: '1', text: '권종' });
            return items2Rtn;
        },
        modalP00003() {
            return this.$refs.modalP00003;
        },
    },
    methods: {
        openModalP00003() {
            this.modalP00003.open();
        },
        closeModal() {
            this.modalP00003.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
