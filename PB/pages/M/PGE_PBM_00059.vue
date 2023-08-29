<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <!-- S::tab -->
            <ur-tab-box class="">
                <ur-tab-content :idx="1" label="상품">
                    <template> <h4>상품</h4> </template>
                </ur-tab-content>
                <ur-tab-content :idx="2" label="권종기준가격">
                    <template> <h4>권종기준가격</h4> </template>
                </ur-tab-content>
                <ur-tab-content :idx="3" label="권종할인가격">
                    <template> <h4>권종할인가격</h4> </template>
                </ur-tab-content>
                <ur-tab-content :idx="4" label="권종제휴가격">
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
                                label="카드명"
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
                            <h4>권종제휴가격</h4>
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
                            :headers="columns4"
                            :data-source="list4"
                            :data-set-options="{ id: 'id' }"
                            :options="options59"
                        />
                        <!-- E::컨텐츠2-->
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
    name: 'PGE_PBM_00059',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            // 테이블
            options59: {
                height: 450,
                multiSelect: false,
                selectCheck: false,
                rowHeight: 41,
                noInfo: true,
            },

            // 권종제휴가격 리스트
            columns4: [
                { text: '순번', value: 'value1' },
                { text: '적용수량', value: 'value2' },
                { text: '화폐단위', value: 'value3' },
                { text: '적용단위', value: 'value4' },
                { text: '유효기간FR', value: 'value5' },
                { text: '유효기간TO', value: 'value6' },
                { text: '적용상태', value: 'value7' },
                { text: '권종명', value: 'value8' },
                { text: '이용기간', value: 'value9' },
                { text: '대인소인구분', value: 'value10' },
                { text: '카드서비스코드', value: 'value11' },
                { text: '권종그룹코드', value: 'value12' },
                { text: '계획인자', value: 'value13' },
                { text: '가입유형', value: 'value14' },
                { text: '컨디션타입명', value: 'value15' },
                { text: '최초등록일시', value: 'value16' },
                { text: '최종수정일시', value: 'value17' },
            ],
            list4: [
                {
                    value1: '12',
                    value2: '739',
                    value3: 'KRW',
                    value4: '',
                    value5: '',
                    value6: '',
                    value7: '',
                    value8: '연간회원권',
                    value9: '1년',
                    value10: '대인',
                    value11: '3005',
                    value12: '',
                    value13: '',
                    value14: '1000308447',
                    value15: '',
                    value16: '2022/11/27',
                    value17: '2023/03/11',
                },
            ],
        };
    },
};
</script>
<style scoped></style>
