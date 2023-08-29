<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <!-- S::컨텐츠1 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="조회일자"
                    required
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-range-picker autoConfirm input-type="YYYY-MM-DD" init="day+30" />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="발급용도" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-dropdown v-model="valueD1" :items="items1" />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>초기화</ur-button>
                    <ur-button>조회</ur-button>
                    <ur-button color="violet">엑셀다운로드</ur-button>
                </div>
            </div>
            <!-- E::컨텐츠1 -->

            <!-- S::컨텐츠2 -->
            <div class="comm_title_wrap mt25">
                <h4>입장확인증 발급 리스트</h4>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">Total<span>8</span>건</div>
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

            <!-- S::컨텐츠3 -->
            <div class="comm_title_wrap mt40">
                <h4>발급 대상자</h4>
            </div>
            <ur-form-box toggleable>
                <ur-form-item class="flex_wrap" label="성명" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-text-field value="" style="width: 100%" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="정기권번호"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="발급사유" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-text-field value="" style="width: 100%" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="발급용도"
                    reqired
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="등록자" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-text-field value="" style="width: 100%" readonly />
                </ur-form-item>
                <ur-form-item label="등록일자" class="flex_wrap" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-date-picker autoConfirm input-type="YYYY-MM-DD" disabled />
                </ur-form-item>
            </ur-form-box>
            <!-- E::컨텐츠3 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00022', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            //드롭다운
            valueD1: '1',

            // 라디오 버튼
            v1: 'Radio 00022_01',
            value: null,

            // 테이블
            options: {
                height: 400,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
            // 입장확인증 발급 리스트 테이블
            columns: [
                { text: 'No', value: 'value1', width: '100px' },
                { text: '발급일자', value: 'value2' },
                { text: '발급시간', value: 'value3' },
                { text: '정기권번호', value: 'value4' },
                { text: '권종명', value: 'value5' },
                { text: '상태', value: 'value6' },
                { text: '발급사유', value: 'value7' },
                { text: '발급용도', value: 'value8' },
                { text: '등록자', value: 'value9' },
                { text: '등록일자', value: 'value10' },
            ],
            list: [
                {
                    value1: '1',
                    value2: '10:10',
                    value3: '2023-01-15',
                    value4: '92345678',
                    value5: 'EL연간신규350스탠다드대인',
                    value6: '',
                    value7: '',
                    value8: '',
                    value9: '곽길동',
                    value10: '2022-06-11',
                },
            ],
        };
    },
};
</script>
<style scoped></style>
