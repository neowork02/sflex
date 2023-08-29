<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
                <ur-form-item class="flex_wrap" label="연차" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-dropdown v-model="valueD1" :items="items1" />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="파크구분" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-dropdown v-model="valueD2" :items="items2" />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="권종코드" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-text-field value="" style="width: 100%; height: auto" />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="권종명" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-text-field value="" style="width: 100%; height: auto" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="재가입 권종코드"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="재가입 권종명"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                </ur-form-item>
                <!-- <ur-form-item
          class="flex_wrap"
          label="라벨명(임시)"
          :labelAlign="'right'"
          style="width: 100%; height: auto"
        >
          <ur-checkbox v-model="valueC1" sm />
          <span class="check_label">전체보기</span>
        </ur-form-item> -->
            </ur-form-box>
            <div class="btn_wrap">
                <div class="left_box">
                    <ur-checkbox v-model="checkAll" sm class="ur-checkbox" />
                    <div class="nocompBox">
                        <span class="check_label">전체보기</span>
                    </div>
                </div>
                <div class="right_box mt10">
                    <ur-button>초기화</ur-button>
                    <ur-button>조회</ur-button>
                    <ur-button>저장</ur-button>
                    <ur-button color="violet">엑셀다운로드</ur-button>
                </div>
            </div>

            <div class="comm_title_wrap mt35">
                <h4 class="pr10">연차별 매핑 정보</h4>
                <ur-button color="violet"> 행삭제 </ur-button>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">Total<span>24</span>건</div>
                    </div>
                </div>
                <!--E:: 타이틀 오른쪽 total info -->
            </div>
            <!-- S::컨텐츠1 -->
            <ur-data-grid
                ref="grid"
                class=""
                :headers="columns"
                :data-source="list"
                :data-set-options="{ id: 'id' }"
                :options="options"
            />
            <!-- E::컨텐츠1-->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00049',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            // 드롭다운
            valueD1: '1',
            valueD2: '1',

            // 체크박스
            valueC1: ['전체보기'],

            dateValue1: ['', ''],
            dateValue2: [''],

            // 테이블
            options: {
                height: 500,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 연차별 매핑 정보
            columns: [
                { text: '파크구분', value: 'value1', width: '100px' },
                { text: '권종코드', value: 'value2' },
                { text: '권종명', value: 'value3', width: '200px' },
                { text: '연차', value: 'value4', width: '130px' },
                { text: '재가입 권종코드', value: 'value5' },
                { text: '재가입 권종명', value: 'value6' },
                { text: '연령구분', value: 'value7', width: '100px' },
                { text: '판매채널', value: 'value8', width: '100px' },
                { text: '근무자확인여부', value: 'value9', width: '130px' },
                { text: '사용여부', value: 'value10', width: '130px' },
            ],
            list: [
                {
                    value1: 'E/L',
                    value2: '7945067920',
                    value3: 'EL연간신규365스탠다드대인',
                    value4: '신규',
                    value5: '4502057208',
                    value6: 'EL연간신규365스탠다드대인',
                    value7: '대인',
                    value8: '겸용',
                    value9: 'N',
                    value10: 'Y',
                },
            ],
        };
    },
    computed: {
        items1() {
            const rtn = [];
            rtn.push({ value: '1', text: '전체' });
            rtn.push({ value: '2', text: '신입' });
            rtn.push({ value: '3', text: '1년차' });
            rtn.push({ value: '4', text: '2년차' });
            rtn.push({ value: '5', text: '3년차' });
            return rtn;
        },
        items2() {
            const rtn = [];
            rtn.push({ value: '1', text: '전체' });
            rtn.push({ value: '2', text: 'E/L' });
            return rtn;
        },
    },
};
</script>
<style scoped></style>
