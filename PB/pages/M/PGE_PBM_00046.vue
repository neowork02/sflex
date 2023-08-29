<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <!-- S::컨텐츠1:조회조건 -->
            <ur-form-box toggleable>
                <ur-form-item class="flex_wrap" label="조회일자" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-date-picker autoConfirm input-type="YYYY-MM-DD" />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="권종명" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-text-field value="" style="width: 100%" />
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
                <h4>권종별 유효인원현황</h4>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">Total<span>6</span>건</div>
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
    name: 'PGE_PBM_00046', // eslint-disable-line vue/name-property-casing
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

            // 권종별 유효인원현황 리스트
            columns: [
                { text: '권종명', value: 'value1' },
                { text: '구분(대/소)', value: 'value2' },
                { text: '유효회원수', value: 'value3' },
            ],
            list: [
                {
                    value1: 'EL연간신규350스탠다드대인',
                    value2: '대',
                    value3: '100',
                },
                {
                    value1: 'EL연간레귤러플러스시니어',
                    value2: '대',
                    value3: '200',
                },
            ],
        };
    },
};
</script>
<style scoped></style>
