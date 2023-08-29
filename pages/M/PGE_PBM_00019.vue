<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="재결제기간"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <ur-range-picker v-model="dateValue1" init="today" />
                </ur-form-item>

                <ur-form-item class="flex_wrap" label="가입정보" :labelAlign="'right'" style="width: 50%; height: auto">
                    <div class="radioForm">
                        <ur-radio v-model="v1" value="Radio 00019_01" sm>성명</ur-radio>
                        <ur-radio v-model="v1" value="Radio 00019_02" sm>휴대폰 </ur-radio>
                        <ur-radio v-model="v1" value="Radio 00019_03" sm>정기권번호</ur-radio>
                    </div>
                    <ur-text-field value="" class="pl16" />
                    <ur-icon-button icon="search" style="padding-top: 0px" />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>초기화</ur-button>
                    <ur-button color="violet">조회</ur-button>
                </div>
            </div>

            <!-- S::컨텐츠1 -->
            <div class="comm_title_wrap mt25">
                <h4>재결제 리스트</h4>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">Total<span>6</span>건</div>
                    </div>
                </div>
                <!--E:: 타이틀 오른쪽 total info -->
            </div>
            <ur-data-grid
                ref="grid"
                :headers="columns"
                :data-source="list"
                :data-set-options="{ id: 'id' }"
                :options="options666"
            />
            <!-- E::컨텐츠1-->

            <!-- <div class="comm_title_wrap total mt45">
        <h4 class="pr10">신용카드 결제정보</h4>
      </div> -->
            <!-- S::컨텐츠2:기결제 정보 -->
            <div class="comm_title_wrap mt40">
                <h4>기결제 정보</h4>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">Total<span>7</span>건</div>
                    </div>
                </div>
                <!--E:: 타이틀 오른쪽 total info -->
            </div>
            <ur-data-grid
                ref="grid"
                :headers="columns2"
                :data-source="list2"
                :data-set-options="{ id: 'id' }"
                :options="options2"
                :labelAlign="'right'"
            />
            <!-- E::컨텐츠2:기결제 정보 -->

            <!-- S::컨텐츠3:재결제 정보 -->
            <div class="comm_title_wrap mt40">
                <h4>재결제 정보</h4>
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
                class="mb45"
                :headers="columns3"
                :data-source="list3"
                :data-set-options="{ id: 'id' }"
                :options="options2"
                :labelAlign="'right'"
            />
            <!-- E::컨텐츠3:재결제 정보 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00019',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            // 드롭다운
            value1: '11',
            value2: '12',
            value3: '13',
            value4: '14',
            value5: '15',
            value6: '16',
            valuePD1: '17',
            valuePD2: '18',
            valuePD3: '19',
            valuePD4: '20',

            // 라디오 버튼
            v1: 'Radio 00019_01',
            value: null,

            dateValue1: ['', ''],

            // 테이블
            options666: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
            options2: {
                height: 150,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 재결제 리스트 테이블
            columns: [
                { text: '재결제일자', value: 'value1', width: '150px' },
                { text: '재결제시간', value: 'value2', width: '120px' },
                { text: '기결제일자', value: 'value3' },
                { text: '기결제시간', value: 'value4' },
                { text: '영수증번호(약식)', value: 'value5' },
                { text: '카드번호', value: 'value6' },
                { text: '결제총액', value: 'value7' },
                { text: '카드제총액', value: 'value8' },
                { text: '기결제건수', value: 'value9' },
                { text: '재결제건수', value: 'value10' },
                { text: '카드번호', value: 'value11' },
            ],
            list: [
                {
                    value1: '2023/01/15',
                    value2: '13:10:30',
                    value3: '2022/12/27',
                    value4: '10:30:50',
                    value5: '99164559',
                    value6: '54508900****550*',
                    value7: '190,000',
                    value8: '210,000',
                    value9: '5',
                    value10: '1',
                    value11: '',
                },
            ],
            // 기결제 정보 테이블
            columns2: [
                { text: '신용카드번호', value: 'value1' },
                { text: '신용카드사', value: 'value2' },
                { text: '승인일자', value: 'value3' },
                { text: '승인시간', value: 'value4' },
                { text: '승인번호', value: 'value5' },
                { text: 'VAN사', value: 'value6' },
                { text: '유효시간', value: 'value7' },
                { text: '할부', value: 'value8' },
                { text: '승인금액', value: 'value9' },
            ],
            list2: [
                {
                    value1: '97243249****823*',
                    value2: '현대카드',
                    value3: '2023/02/03',
                    value4: '10:30:50',
                    value5: '99164559',
                    value6: '나이스 정보통신',
                    value7: '1',
                    value8: '0',
                    value9: '170,000',
                },
            ],

            // 재결제 정보 테이블
            columns3: [
                { text: '2신용1카드번호', value: 'value1' },
                { text: '신용4카드사', value: 'value2' },
                { text: '승인3일자', value: 'value3' },
                { text: '승인5시간', value: 'value4' },
                { text: '승인6번호', value: 'value5' },
                { text: 'VA7N사', value: 'value6' },
                { text: '유8효시간', value: 'value7' },
                { text: '할9부', value: 'value8' },
                { text: '승인2금액', value: 'value9' },
            ],
            list3: [
                {
                    value1: '54392785****245*',
                    value2: '신한카드',
                    value3: '2023/03/19',
                    value4: '12:10:40',
                    value5: '87164559',
                    value6: 'NHN한국사이버결제',
                    value7: '2',
                    value8: '1',
                    value9: '125,000',
                },
            ],
        };
    },
};
</script>
<style scoped></style>
