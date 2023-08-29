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
                        <template> <h4>권종기준가격</h4> </template>
                    </template>
                </ur-tab-content>
                <ur-tab-content :idx="3" label="권종할인가격">
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
                            <h4>권종할인가격</h4>
                            <!--S:: 타이틀 오른쪽 total info -->
                            <div class="right_box">
                                <div class="totalNo">
                                    <div class="totalCt">Total<span>3</span>건</div>
                                    <!-- info: Total *건 -->
                                </div>
                            </div>
                            <!--E:: 타이틀 오른쪽 total info -->
                        </div>
                        <ur-data-grid
                            ref="grid"
                            :headers="columns3"
                            :data-source="list3"
                            :data-set-options="{ id: 'id' }"
                            :options="options58"
                        />
                        <!-- E::컨텐츠2-->
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
    name: 'PGE_PBM_00058',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            // 테이블
            options58: {
                height: 450,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 권종할인가격 리스트
            columns3: [
                { text: '순번', value: 'value1' },
                { text: '컨디션유형코드', value: 'value2' },
                { text: '컨디션테이블', value: 'value3' },
                { text: '접근순번', value: 'value4' },
                { text: '111', value: 'value5' }, // 회사코드
                { text: '222', value: 'value6' }, // 채널
                { text: '333', value: 'value7' }, // 년도
                { text: '444', value: 'value8' }, // 시즌
                { text: '555', value: 'value9' }, // 롤아웃
                { text: '상품계층도', value: 'value10' },
                { text: '고객구분', value: 'value11' },
                { text: 'PLANT', value: 'value12' },
                { text: '권종코드', value: 'value13' },
                { text: '할인유형코드', value: 'value14' },
                { text: '할인가격', value: 'value15' },
                { text: '화폐단위', value: 'value16' },
                { text: '적용수량', value: 'value17' },
                { text: '적용단위', value: 'value18' },
                { text: '유효시작일자', value: 'value19' },
                { text: '유효종료일자', value: 'value20' },
                { text: '적용상태', value: 'value21' },
                { text: '컨디션타입명', value: 'value22' },
                { text: '최초등록일시', value: 'value23' },
            ],
            list3: [
                {
                    value1: '1,188,750,508',
                    value2: '23L4',
                    value3: '516',
                    value4: '20',
                    value5: 'L150',
                    value6: '10',
                    value7: '',
                    value8: '',
                    value9: '',
                    value10: '',
                    value11: 'N6',
                    value12: '',
                    value13: '1000308441',
                    value14: 'A',
                    value15: '10,000',
                    value16: 'KRW',
                    value17: '',
                    value18: '',
                    value19: '2022/12/25',
                    value20: '2023/12/24',
                    value21: '',
                    value22: '',
                    value23: '2022/12/11',
                },
            ],
        };
    },
};
</script>
<style scoped></style>
