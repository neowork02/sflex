<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="가입정보"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="v1" value="Radio 00023_01" sm>성명</ur-radio>
                        <ur-radio v-model="v1" value="Radio 00023_02" sm>정기권번호 </ur-radio>
                        <!-- <ur-radio v-model="v1" value="Radio 00023_03" sm
              >휴대폰</ur-radio
            >
            <ur-radio v-model="v1" value="Radio 00023_04" sm
              >영수증번호</ur-radio
            > -->
                    </div>
                    <ur-text-field value="" class="pl16" />
                    <ur-icon-button icon="search" style="padding-top: 0px" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="영수증번호"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto; border: 0"
                >
                    <ur-text-field style="width: 100%; height: auto" />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>초기화</ur-button>
                    <ur-button>조회</ur-button>
                    <ur-button color="violet"> 영수증재발행 </ur-button>
                </div>
            </div>

            <div class="comm_title_wrap mt25">
                <h4>영수증재발급 리스트</h4>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">Total<span>9</span>건</div>
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

            <!-- S::정기권 정보 -->
            <div class="comm_title_wrap mt40">
                <h4>정기권 정보</h4>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">Total<span>10</span>건</div>
                    </div>
                </div>
                <!--E:: 타이틀 오른쪽 total info -->
            </div>
            <ur-data-grid
                ref="grid"
                :headers="columns2"
                :data-source="list2"
                :data-set-options="{ id: 'id' }"
                :options="options"
                :labelAlign="'right'"
            />
            <!-- E::정기권 정보 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00023', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            //드롭다운
            valueD1: '1',

            // 라디오 버튼
            v1: 'Radio 00023_01',
            value: null,

            // 테이블
            options: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
            opts: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: true,
                selectCheck: true,
            },

            // 영수증재발급 리스트 테이블
            columns: [
                { text: '파크구분', value: 'value1', width: '100px' },
                { text: '판매일자', value: 'value2' },
                { text: '포스번호', value: 'value3' },
                { text: '영수증번호', value: 'value4' },
                { text: '판매구분', value: 'value5' },
                { text: '가입인원', value: 'value6' },
                { text: '총결제금액', value: 'value7' },
                { text: '결제자명', value: 'value8' },
                { text: '결제구분', value: 'value9' },
                { text: '결제건수', value: 'value10' },
                { text: '결제금액', value: 'value11' },
            ],
            list: [
                {
                    value1: 'EL',
                    value2: '2022/10/15',
                    value3: 'C100V380102',
                    value4: '0001',
                    value5: '일반',
                    value6: '1',
                    value7: '260,000',
                    value8: '홍*동',
                    value9: '신용카드',
                    value10: '1',
                    value11: '285,000',
                },
            ],

            // 정기권정보 테이블
            columns2: [
                { text: 'No', value: 'value1', width: '80px' },
                { text: '정기권번호', value: 'value2' },
                { text: '인원유형', value: 'value3' },
                { text: '가입일자', value: 'value4' },
                { text: '발급일자', value: 'value5' },
                { text: '만기일자', value: 'value6' },
                { text: '상태', value: 'value7' },
                { text: '티켓명', value: 'value8' },
            ],
            list2: [
                {
                    value1: '1',
                    value2: '99164559',
                    value3: '대인',
                    value4: '2022/11/28',
                    value5: '2022/11/29',
                    value6: '2023/11/19',
                    value7: '정상',
                    value8: 'EL연간신규350스탠다드',
                },
            ],
        };
    },
};
</script>
<style scoped></style>
