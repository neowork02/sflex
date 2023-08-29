<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <!-- S::컨텐츠1:조회조건 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="조회일자"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                >
                    <ur-range-picker v-model="dateValue1" init="today" />
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
                <h4>가입인원구성현황</h4>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">Total<span>0</span>건</div>
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
            <!-- E::컨텐츠2 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00043', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            // 테이블
            options: {
                height: 500,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 가입인원구성현황 리스트
            columns: [
                { text: '인원', value: 'value1' },
                { text: '인원 구성수', value: 'value2' },
                { text: '인원수', value: 'value3' },
            ],
            list: [
                {
                    value1: '1인',
                    value2: '대인',
                    value3: '1',
                },
                {
                    value1: '2인',
                    value2: '소인',
                    value3: '2',
                },
            ],
        };
    },
};
</script>
<style scoped></style>
