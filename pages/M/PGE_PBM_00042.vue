<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <!-- S::컨텐츠1:조회조건 -->
            <ur-form-box toggleable>
                <ur-form-item class="flex_wrap" label="조회일자" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-date-picker autoConfirm input-type="YYYY-MM-DD" />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>초기화</ur-button>
                    <ur-button>조회</ur-button>
                    <ur-button color="violet">엑셀다운로드</ur-button>
                </div>
            </div>
            <!-- E::컨텐츠1:조회조건 -->
            <!-- S::컨텐츠2 -->
            <div class="comm_title_wrap mt25">
                <h4>시간대별 주별 가입현황</h4>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">Total<span>4</span>건</div>
                        <!-- info: Total *건 -->
                    </div>
                </div>
                <!--E:: 타이틀 오른쪽 total info -->
            </div>
            <ur-data-grid
                ref="grid"
                :headers="columns"
                :data-source="list"
                :options="options"
                :data-set-options="{ id: 'id' }"
            >
            </ur-data-grid>
            <!-- E::컨텐츠2-->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00042', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            //드롭다운
            valueD1: '1',

            // 테이블
            options: {
                height: 500,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 시간대별 주별 가입현황 리스트
            columns: [
                { text: '시간유형', value: 'value1' },
                { text: '합계', value: 'value2' },
                { text: '2023/01/09(월)', value: 'value3' },
                { text: '2023/01/10(화)', value: 'value4' },
                { text: '2023/01/11(수)', value: 'value5' },
                { text: '2023/01/12(목)', value: 'value6' },
                { text: '2023/01/13(금)', value: 'value7' },
                { text: '2023/01/14(토)', value: 'value8' },
                { text: '2023/01/15(일)', value: 'value9' },
            ],
            list: [
                {
                    value1: '13시',
                    value2: '50',
                    value3: '10',
                    value4: '10',
                    value5: '10',
                    value6: '10',
                    value7: '2',
                    value8: '6',
                    value9: '2',
                },
            ],
        };
    },
};
</script>
<style scoped></style>
