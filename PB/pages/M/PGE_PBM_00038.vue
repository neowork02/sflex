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
                    <ur-range-picker v-model="dateValue138" init="today" />
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
                    <template>
                        <div class="comm_title_wrap mt10">
                            <h4>일별집계</h4>
                            <!--S:: 타이틀 오른쪽 total info -->
                            <div class="right_box">
                                <div class="totalNo">
                                    <div class="totalCt">Total<span>1</span>건</div>
                                </div>
                            </div>
                            <!--E:: 타이틀 오른쪽 total info -->
                        </div>
                        <ur-data-grid
                            ref="grid"
                            :headers="columns"
                            :data-source="list"
                            :data-set-options="{ id: 'id' }"
                            :options="options38"
                        />
                    </template>
                </ur-tab-content>
                <ur-tab-content :idx="2" label="일별집계 상세">
                    <h4>일별집계 상세</h4>
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
    name: 'PGE_PBM_00038',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            value: null,

            dateValue138: ['', ''],

            // 테이블
            options38: {
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

            // 일별집계
            columns: [
                { text: '일자', value: 'value1', width: '100px' },
                { text: '총판매 금액', value: 'value2' },
                { text: '일분할 이연', value: 'value3' },
                { text: '일분할 대상', value: 'value4' },
                { text: '순판매(전체)', value: 'value5' },
                { text: '순판매(일분할 대상)', value: 'value6' },
                { text: '③A기존판매(일분할대상)', value: 'value7' },
                { text: '③B당일판매(일분할대상)(①A-②A)', value: 'value8' },
                { text: '④A기존판매당일분할금액(③A/ⓝ)', value: 'value9' },
                { text: '④B당일분할금액(③B/ⓝ)', value: 'value10' },
                { text: '④당일분할금액합계(④A+④B)', value: 'value11' },
                { text: '⑤가입매출', value: 'value12' },
                { text: '⑥A당일판매일분할대상선수금이체(③B-④B-⑤)', value: 'value13' },
                { text: '⑥B당일판매일분할제외선수금이체①-②-③B', value: 'value14' },
                { text: '⑥당일판매선수금이체합계⑥A+⑥B', value: 'value15' },
                { text: '⑦누적선수금매출이체', value: 'value16' },
                { text: '매출계(④+⑤+⑦)', value: 'value17' },
                { text: 'ⓝ가용일수(일분할N값)', value: 'value18' },
                { text: '정합성', value: 'value19' },
            ],
            list: [
                {
                    value1: '2023/02/12',
                    value2: '0',
                    value3: '1',
                    value4: '2',
                    value5: '3',
                    value6: '4',
                    value7: '5',
                    value8: '6',
                    value9: '7',
                    value10: '8',
                    value11: '9',
                    value12: '10',
                    value13: '11',
                    value14: '12',
                    value15: '13',
                    value16: '14',
                    value17: '15',
                    value18: '16',
                    value19: '17',
                },
            ],
        };
    },
};
</script>
<style scoped></style>
