<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <!-- S::tab -->
            <ur-tab-box class="">
                <ur-tab-content :idx="1" label="상품">
                    <template>
                        <!-- S::컨텐츠1 -->
                        <ur-form-box toggleable class="mt20">
                            <ur-form-item
                                class="flex_wrap"
                                label="상품코드"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                <ur-text-field value="" style="width: 100%; height: auto" />
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="상품명"
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
                            <h4>상품</h4>
                            <!--S:: 타이틀 오른쪽 total info -->
                            <div class="right_box">
                                <div class="totalNo">
                                    <div class="totalCt">Total<span>1</span>건</div>
                                    <!-- info: Total *건 -->
                                </div>
                            </div>
                            <!--E:: 타이틀 오른쪽 total info -->
                        </div>
                        <ur-data-grid
                            ref="grid"
                            :headers="columns"
                            :data-source="list"
                            :data-set-options="{ id: 'id' }"
                            :options="options33"
                        />
                        <!-- E::컨텐츠2-->
                    </template>
                </ur-tab-content>
                <ur-tab-content :idx="2" label="권종기준가격">
                    <template>
                        <template> <h4>권종기준가격</h4> </template>
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
    name: 'PGE_PBM_00056',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            // 테이블
            options33: {
                height: 450,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 상품코드 리스트
            columns: [
                { text: '상품코드', value: 'value1' },
                { text: 'POS상품명', value: 'value2' },
                { text: 'POS상품명(축약)', value: 'value3' },
                { text: 'POS상품명(영문)', value: 'value4' },
                { text: '파크구분', value: 'value5' },
                { text: '상품구분', value: 'value6' },
                { text: '입장객반영인원수', value: 'value7' },
                { text: '태분류코드', value: 'value8' },
                { text: '대분류코드', value: 'value9' },
                { text: '중분류코드', value: 'value10' },
                { text: '소분류코드', value: 'value11' },
                { text: '세분류코드', value: 'value12' },
                { text: '태분류명', value: 'value13' },
                { text: '대분류명', value: 'value14' },
                { text: '중분류명', value: 'value15' },
                { text: '소분류명', value: 'value16' },
                { text: '세분류명', value: 'value17' },
            ],
            list: [
                {
                    value1: '1000558805',
                    value2: '연간회원권, 대인,신규,1년차,에메랄드',
                    value3: 'EL회원신규에메랄드대인',
                    value4: '연간회원권,대인,신규,1년차,에메랄드',
                    value5: '01',
                    value6: '06',
                    value7: '1',
                    value8: '06',
                    value9: '103',
                    value10: '003',
                    value11: '002',
                    value12: '002',
                    value13: '서비스',
                    value14: '파크',
                    value15: '입장티켓',
                    value16: '회원',
                    value17: '개인회원',
                },
            ],
        };
    },
};
</script>
<style scoped></style>
