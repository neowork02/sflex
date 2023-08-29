<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <!-- S::컨텐츠1 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="검색조건"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="v1" value="Radio 00070_01" sm>성명</ur-radio>
                        <ur-radio v-model="v1" value="Radio 00070_02" sm>휴대폰</ur-radio>
                        <ur-radio v-model="v1" value="Radio 00070_03" sm>정기권번호</ur-radio>
                    </div>
                    <ur-text-field value="" class="pl16" />
                    <ur-icon-button icon="search" style="padding-top: 0px" />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="사번" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-text-field value="" style="width: 100%" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="예약방문증번호"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%" />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="임직원 구분" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-dropdown v-model="valueD1" :items="items1" />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="인사확인" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-dropdown v-model="valueD1" :items="items2" />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="처리상태" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-dropdown v-model="valueD1" :items="items3" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="발급일자"
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
                    <ur-button>엑셀양식다운로드</ur-button>
                    <ur-button>엑셀다운로드</ur-button>
                    <ur-button>업로드 </ur-button>
                    <ur-button>저장</ur-button>
                    <ur-button color="violet">삭제</ur-button>
                </div>
            </div>
            <!-- E::컨텐츠1 -->
            <!-- S::컨텐츠2 -->
            <div class="comm_title_wrap mt25">
                <h4>임직원권 조회</h4>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">Total<span>19</span>건</div>
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
            </ur-data-grid
            ><!-- E::컨텐츠2 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00070', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            //드롭다운
            valueD1: '1',

            // 라디오 버튼
            v1: 'Radio 00070_01',

            value: null,

            // 테이블
            options: {
                height: 450,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 임직원권조회 리스트
            columns: [
                { text: 'No', value: 'value1', width: '80px' },
                { text: '구분', value: 'value2' },
                { text: '사번', value: 'value3' },
                { text: '멤버십정보', value: 'value4' },
                { text: '인사확인', value: 'value5' },
                { text: '비고', value: 'value6' },
                { text: '처리상태', value: 'value7' },
                { text: '처리일자', value: 'value8' },
                { text: '예약방문증번호', value: 'value9' },
                { text: '파크구분', value: 'value10' },
                { text: '정기권번호', value: 'value11' },
                { text: '발급일', value: 'value12' },
                { text: '만료일', value: 'value13' },
                { text: '정기권상태', value: 'value14' },
                { text: '등록일시', value: 'value15' },
                { text: '등록자', value: 'value16' },
                { text: '수정일시', value: 'value17' },
                { text: '수정자', value: 'value18' },
                { text: 'APP수신일자', value: 'value19' },
            ],
            list: [
                {
                    value1: '1',
                    value2: '일반',
                    value3: '351072891',
                    value4: '',
                    value5: '',
                    value6: '',
                    value7: '정상',
                    value8: '2022/10/16',
                    value9: 'EL1001HLKUXI6EU1',
                    value10: 'EL',
                    value11: '99164559',
                    value12: '2022/11/09',
                    value13: '2023/12/17',
                    value14: '결제완료',
                    value15: '2022/12/20',
                    value16: '강길동',
                    value17: '2022/12/21',
                    value18: '이길동',
                    value19: '2022/12/22',
                },
            ],
        };
    },
    computed: {
        items1() {
            const rtn = [];
            rtn.push({ value: '1', text: '구분 전체' });

            return rtn;
        },
        items2() {
            const rtn = [];
            rtn.push({ value: '1', text: '인사확인 전체' });
            return rtn;
        },
        items3() {
            const rtn = [];
            rtn.push({ value: '1', text: '처리상태 전체' });
            return rtn;
        },
    },
};
</script>
<style scoped></style>
