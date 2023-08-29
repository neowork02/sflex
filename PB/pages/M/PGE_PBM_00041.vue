<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <!-- S::컨텐츠1:조회조건 -->
            <ur-form-box toggleable>
                <ur-form-item class="flex_wrap" label="조회일자" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-range-picker v-model="dateValue1" init="today" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="요일구분"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="v1" value="Radio 00041_01" sm>전체</ur-radio>
                        <ur-radio v-model="v1" value="Radio 00041_02" sm>평일</ur-radio>
                        <ur-radio v-model="v1" value="Radio 00041_03" sm>토요일</ur-radio>
                        <ur-radio v-model="v1" value="Radio 00041_04" sm>휴일</ur-radio>
                    </div>
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
                <h4>시간대별 권종별 가입현황</h4>
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
    name: 'PGE_PBM_00041', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            // 라디오 버튼
            v1: 'Radio 00041_01',
            value: null,

            // 테이블
            options: {
                height: 500,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
            // 시간대별 권종별 가입현황 리스트
            columns: [
                { text: '권종명', value: 'value1' },
                { text: '합계', value: 'value2' },
                { text: '9시이전', value: 'value3' },
                { text: '9시', value: 'value4' },
                { text: '10시', value: 'value5' },
                { text: '11시', value: 'value6' },
                { text: '12시', value: 'value7' },
                { text: '13시', value: 'value8' },
                { text: '14시', value: 'value9' },
                { text: '15시', value: 'value10' },
                { text: '16시', value: 'value11' },
                { text: '17시', value: 'value12' },
                { text: '18시', value: 'value13' },
                { text: '19시', value: 'value14' },
                { text: '20시', value: 'value15' },
                { text: '21시', value: 'value16' },
                { text: '22시이후', value: 'value17' },
            ],
            list: [
                {
                    value1: 'EL연간250위크데이대인',
                    value2: '2',
                    value3: '1',
                    value4: '3',
                    value5: '4',
                    value6: '5',
                    value7: '9',
                    value8: '2',
                    value9: '8',
                    value10: '7',
                    value11: '6',
                    value12: '10',
                    value13: '11',
                    value14: '23',
                    value15: '12',
                    value16: '14',
                    value17: '13',
                },
            ],
        };
    },
};
</script>
<style scoped></style>
