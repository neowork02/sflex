<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="조회일자"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                >
                    <ur-range-picker v-model="dateValue139" init="today" />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>초기화</ur-button>
                    <ur-button>조회</ur-button>
                    <ur-button color="violet">엑셀다운로드</ur-button>
                </div>
            </div>

            <!-- S::tab -->
            <ur-tab-box class="mt35">
                <ur-tab-content :idx="1" label="일별집계">
                    <h4>일별집계</h4>
                </ur-tab-content>
                <ur-tab-content :idx="2" label="일별집계 상세">
                    <template>
                        <div class="comm_title_wrap mt10">
                            <h4>일별집계 상세</h4>
                            <!--S:: 타이틀 오른쪽 total info -->
                            <div class="right_box">
                                <div class="totalNo">
                                    <div class="totalCt">Total<span>2</span>건</div>
                                </div>
                            </div>
                            <!--E:: 타이틀 오른쪽 total info -->
                        </div>
                        <ur-data-grid
                            ref="grid"
                            :headers="columns"
                            :data-source="list"
                            :data-set-options="{ id: 'id' }"
                            :options="options39"
                        />
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
    name: 'PGE_PBM_00039',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            value: null,

            dateValue139: ['', ''],

            // 테이블
            options39: {
                rowHeight: 41,
                headerHeight: 41,
                height: 500,
                styleBordered: false,
                resizableColumn: false,
                multiSelect: false,
                selectCheck: false,
                resizeFullWidth: true,
                noInfo: true,
            },

            // 일별집계상세
            columns: [
                { text: '일1자', value: 'value1', width: '100px' },
                { text: '구2분', value: 'value2' },
                { text: '총3판매 금액', value: 'value3' },
                { text: '일분할 이연', value: 'value4' },
                { text: '일4분할 대상', value: 'value5' },
                { text: '순65판매(전체)', value: 'value6' },
                { text: '순1판매(일분할 대상)', value: 'value7' },
                { text: '③A1기존판매(일분할대상)', value: 'value8' },
                { text: '③B당4일판매(일분할대상)(①A-②A)', value: 'value9' },
                { text: '④A기3존판매당일분할금액(③A/ⓝ)', value: 'value10' },
                { text: '④B당2일분할금액(③B/ⓝ)', value: 'value11' },
                { text: '④당일분할금액합계(④A+④B)', value: 'value12' },
                { text: '⑤가입매출', value: 'value13' },
                { text: '⑥A당일판매일분할대상선수금이체(③B-④B-⑤)', value: 'value14' },
                { text: '⑥B당3일판매일4분할제외5선수금이체①-②-③B', value: 'value15' },
                { text: '⑥당일판매선수금이체합계⑥A+⑥B', value: 'value16' },
                { text: '⑦누적2선수금매출이체', value: 'value17' },
                { text: '매출계(④+⑤+⑦)', value: 'value18' },
                { text: 'ⓝ가1용일수(일분할N값)', value: 'value19' },
                { text: '정2합성', value: 'value20' },
            ],
            list: [
                {
                    value1: '2023/03/01',
                    value2: '레귤러1266',
                    value3: '2',
                    value4: '3',
                    value5: '4',
                    value6: '9',
                    value7: '8',
                    value8: '7',
                    value9: '6',
                    value10: '5',
                    value11: '15',
                    value12: '14',
                    value13: '24',
                    value14: '42',
                    value15: '55',
                    value16: '75',
                    value17: '64',
                    value18: '62',
                    value19: '53',
                    value20: '37',
                },
            ],
        };
    },
};
</script>
<style scoped></style>
