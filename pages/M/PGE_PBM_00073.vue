<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 정보 -->
            <ur-button @click="openModalP00073">드림포인트 조회 팝업</ur-button>

            <!-- ::S 드림포인트조회 팝업 -->
            <ur-modal ref="modalP00073" class="modal-b1c6" large dragable title="공통팝업" @closed="closed">
                <!-- <div class="modalWrap" style="height: auto"> -->
                <template slot="title">
                    <div class="modal-title">드림포인트 조회</div>
                </template>
                <template>
                    <div class="modal-body">
                        <!-- ::S 콘텐츠1 -->
                        <ur-form-box toggleable>
                            <ur-form-item
                                class="flex_wrap"
                                label="성명"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-text-field value="" style="width: 100%" readonly />
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="년도"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-dropdown v-model="valueD1" :items="items1" />
                            </ur-form-item>
                        </ur-form-box>
                        <div class="btn_wrap mt10">
                            <div class="right_box">
                                <ur-button>초기화</ur-button>
                                <ur-button color="violet">조회</ur-button>
                            </div>
                        </div>
                        <!-- ::E 콘텐츠1 -->
                        <!-- ::S 콘텐츠2 -->
                        <ur-form-box toggleable class="mt20">
                            <ur-form-item
                                class="flex_wrap"
                                label="누적포인트"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-text-field value="" style="width: 100%" readonly />
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="사용포인트"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-text-field value="" style="width: 100%" readonly />
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="잔여포인트"
                                :labelAlign="'right'"
                                style="width: 100%; height: auto"
                            >
                                <ur-text-field value="" style="width: 100%" readonly />
                            </ur-form-item>
                        </ur-form-box>
                        <!-- <div class="comm_title_wrap mt20">
              <h4 class="pr10">임시타이틀 영역_드림포인트</h4>
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
                        <!-- ::E 콘텐츠2 -->
                    </div>
                </template>
                <template slot="action">
                    <ur-button color="violet" @click="closeModal"> 닫기 </ur-button>
                </template>
                <!-- </div> -->
            </ur-modal>
            <!-- ::E 드림포인트조회 팝업-->
            <!-- ::E  정보 -->
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00068', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            // 라디오 버튼
            v1: null,

            // 테이블 옵션
            options: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
            dateValue1: ['', ''],
            dateValue2: [''],

            //드림포인트조회 팝업 리스트
            columnsP1T1: [
                { text: '일시', value: 'value1' },
                { text: '구분', value: 'value2' },
                { text: '포인트', value: 'value3' },
                { text: '시설명', value: 'value4' },
                { text: '이용금액', value: 'value5' },
            ],

            listP1T1: [
                {
                    value1: '2023/02/15',
                    value2: '정회원',
                    value3: '21567852485',
                    value4: '에델바이스(매장)',
                    value5: '53,500',
                },
            ],
        };
    },
    computed: {
        items1() {
            const items1Rtn = [];
            items1Rtn.push({ value: '1', text: '2023' });
            items1Rtn.push({ value: '2', text: '2022' });
            items1Rtn.push({ value: '3', text: '2021' });
            items1Rtn.push({ value: '4', text: '2020' });
            return items1Rtn;
        },

        modalP00073() {
            return this.$refs.modalP00073;
        },
    },
    methods: {
        openModalP00073() {
            this.modalP00073.open();
        },

        closeModal() {
            this.modalP00073.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
