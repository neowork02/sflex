<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
                <ur-form-item class="flex_wrap" label="파크구분" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-text-field value="EL/CB" style="width: 100%" placeholder="" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="가입정보" :labelAlign="'right'" style="width: 50%; height: auto">
                    <div class="radioForm">
                        <ur-radio v-model="v1" value="Radio 00011_01" sm>성명</ur-radio>
                        <!-- <ur-radio v-model="v1" value="Radio 00011_02" sm>휴대폰 </ur-radio> -->
                        <ur-radio v-model="v1" value="Radio 00011_02" sm>정기권번호</ur-radio>
                    </div>
                    <!-- <div>
            <ur-radio-wrapper :items="items" v-model="value" sm />
          </div> -->
                    <ur-text-field value="" class="pl16" />
                    <ur-icon-button icon="search" style="padding-top: 0px" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="영수증번호"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="신용카드번호"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%" />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>초기화</ur-button>
                    <ur-button color="violet">조회</ur-button>
                </div>
            </div>

            <!-- S::재결제 대상 -->
            <div class="comm_shut_wrap">
                <div class="inbox7">
                    <div class="comm_title_wrap mt25">
                        <h4 class="pr10">재결제 대상</h4>
                        <ur-button color="violet"> 재결제 </ur-button>
                        <!--S:: 타이틀 오른쪽 total info -->
                        <div class="right_box">
                            <div class="totalNo">
                                <div class="totalCt">Total<span>2</span>건</div>
                            </div>
                        </div>
                        <!--E:: 타이틀 오른쪽 total info -->
                    </div>
                    <ur-data-grid
                        ref="grid"
                        :headers="columns211"
                        :data-source="list211"
                        :data-set-options="{ id: 'id' }"
                        :options="options"
                    />
                </div>
                <div class="emptybox" />
                <div class="inbox3">
                    <div class="comm_title_wrap mt25">
                        <!-- <h4 class="pr10">재결제 대상</h4>
            <ur-button color="violet"> 재결제 </ur-button> -->
                        <!--S:: 타이틀 오른쪽 total info -->
                        <div class="right_box mt12">
                            <div class="totalNo">
                                <div class="totalCt">Total<span>3</span>건</div>
                            </div>
                        </div>
                        <!--E:: 타이틀 오른쪽 total info -->
                    </div>
                    <ur-data-grid
                        ref="grid"
                        :headers="columns"
                        :data-source="list11"
                        :data-set-options="{ id: 'id' }"
                        :options="options"
                    />
                </div>
            </div>
<<<<<<< Updated upstream
            <!-- E::재결제 대상 -->
=======
            <!--E:: 타이틀 오른쪽 total info -->
        </div>
      </div>
      <!-- E::재결제 대상 -->
>>>>>>> Stashed changes

            <!-- S::변경카드 내역 -->
            <div class="comm_title_wrap mt45">
                <h4>변경카드 내역</h4>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">Total<span>4</span>건</div>
                    </div>
                </div>
                <!--E::: 타이틀 오른쪽 total info -->
            </div>
            <ur-data-grid
                ref="grid"
                :headers="columns3"
                :data-source="list3"
                :data-set-options="{ id: 'id' }"
                :options="options"
                :labelAlign="'right'"
            />
            <!-- E::변경카드 내역 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00011',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            // 라디오 버튼
            v1: 'Radio 00011_01',

            value: null,
            // 테이블
            options: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 재결제대상 1 테이블
            columns: [
                { text: '정기권번호', value: 'value1', width: '150px' },
                { text: '성명', value: 'value2', width: '120px' },
                { text: '권종명', value: 'value3' },
            ],
            list11: [
                {
                    value1: '2022153937',
                    value2: '여길동',
                    value3: 'EL연간신규350스탠다드대인',
                },
            ],
            // 재결제대상 2 테이블
            columns211: [
                { text: '일자', value: '2023/01/02', width: '100px' },
                { text: '포스명', value: 'EL포스' },
                { text: '영수증번호', value: '1234567890' },
                { text: '카드사', value: '삼성카드' },
                { text: '카드번호', value: '2345678910' },
                { text: '승인번호', value: '111222333' },
                { text: '할부', value: '11' },
                { text: '금액', value: '123,456' },
            ],
            list211: [
                {
                    value1: '2022/12/22',
                    value2: '연간회원 매출-08_김*현',
                    value3: '00004',
                    value4: '삼성카드',
                    value5: '95708900****550*',
                    value6: '90164459',
                    value7: '0',
                    value8: '170,000',
                },
            ],

            // 변경카드내역 테이블
            columns3: [
                { text: '카드번호', value: 'value1' },
                { text: '카드사', value: 'value2' },
                { text: '승인번호', value: 'value3' },
                { text: '승인금액', value: 'value4' },
                { text: '처리상태', value: 'value5' },
            ],
            list3: [
                {
                    value1: '2021152485998677',
                    value2: '현대카드',
                    value3: '1194568',
                    value4: '259,000',
                    value5: '정상매입',
                },
            ],
        };
    },
};
</script>
<style scoped></style>
