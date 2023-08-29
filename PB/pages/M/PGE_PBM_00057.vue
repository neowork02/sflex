<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <!-- S::tab -->
            <ur-tab-box class="">
                <ur-tab-content :idx="1" label="상품">
                    <template>
                        <template> <h4>상품</h4> </template>
                    </template>
                </ur-tab-content>
                <ur-tab-content :idx="2" label="권종기준가격">
                    <template>
                        <!-- S::컨텐츠1 -->
                        <ur-form-box toggleable class="mt20">
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
                                style="width: 50%; height: auto"
                            >
                                <ur-text-field value="" style="width: 100%; height: auto" />
                            </ur-form-item>
                        </ur-form-box>
                        <div class="btn_wrap mt10">
                            <div class="right_box">
                                <ur-button>초기화</ur-button>
                                <ur-button>조회</ur-button>
                                <ur-button color="violet">엑셀다운로드</ur-button>
                            </div>
                        </div>
                        <!-- E::컨텐츠1-->
                        <!-- S::컨텐츠2 -->
                        <div class="comm_title_wrap mt25">
                            <h4>권종기준가격</h4>
                            <!--S:: 타이틀 오른쪽 total info -->
                            <div class="right_box">
                                <div class="totalNo">
                                    <div class="totalCt">Total<span>2</span>건</div>
                                    <!-- info: Total *건 -->
                                </div>
                            </div>
                            <!--E:: 타이틀 오른쪽 total info -->
                        </div>
                        <ur-data-grid
                            ref="grid"
                            :headers="columns2"
                            :data-source="list2"
                            :data-set-options="{ id: 'id' }"
                            :options="options44"
                        />
                        <!-- E::컨텐츠2-->
                    </template>
                </ur-tab-content>
                <ur-tab-content :idx="3" label="권종할인가격">
                    <template>
                        <template> <h4>권종할인가격</h4> </template>
                    </template>
                </ur-tab-content>
                <ur-tab-content :idx="4" label="권종제휴가격">
                    <template>
                        <template> <h4>권종제휴가격</h4> </template>
                    </template>
                </ur-tab-content>
            </ur-tab-box>
            <!-- E::tab -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00057',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            // 테이블
            options44: {
                height: 450,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
            // 권종기준가격 리스트
            columns2: [
                { text: '순번', value: 'value1' },
                { text: '컨디션타입', value: 'value2' },
                { text: '컨디션테이블', value: 'value3' },
                { text: 'Access순번', value: 'value4' },
                { text: '회사코드', value: 'value5' },
                { text: '채널', value: 'value6' },
                { text: '년도', value: 'value7' },
                { text: '시즌', value: 'value8' },
                { text: '롤아웃', value: 'value9' },
                { text: '권종코드', value: 'value10' },
                { text: '할인유형', value: 'value11' },
                { text: '기준가격', value: 'value12' },
                { text: '화폐단위', value: 'value13' },
                { text: '적용수량', value: 'value14' },
                { text: '적용단위', value: 'value15' },
                { text: '유효기간FR', value: 'value16' },
                { text: '유효기간TO', value: 'value17' },
            ],
            list2: [
                {
                    value1: '1,188,750,508',
                    value2: '11L4',
                    value3: '739',
                    value4: '20',
                    value5: 'L140',
                    value6: '10',
                    value7: '',
                    value8: '',
                    value9: '',
                    value10: '1000558805',
                    value11: 'C',
                    value12: '340,000',
                    value13: 'KRW',
                    value14: '1',
                    value15: 'EA',
                    value16: '2015-04-17',
                    value17: '2022-12-31',
                },
            ],
        };
    },
};
</script>
<style scoped></style>
