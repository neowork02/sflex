<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 콘텐츠1 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="가입정보"
                    :labelAlign="'right'"
                    required
                    style="width: 100%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="v1" value="Radio 000271_01" sm>성명</ur-radio>
                        <ur-radio v-model="v1" value="Radio 000271_02" sm>휴대폰 </ur-radio>
                        <ur-radio v-model="v1" value="Radio 000271_03" sm>정기권번호</ur-radio>
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
            <!-- ::E 콘텐츠1 -->
            <!-- ::S 콘텐츠2 -->
            <div class="comm_title_wrap mt25">
                <h4 class="pr10">중지처리 대상</h4>
                <ur-button color="violet">저장</ur-button>
                <ur-button color="violet">삭제</ur-button>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">Total<span>15</span>건</div>
                    </div>
                </div>
                <!--E:: 타이틀 오른쪽 total info -->
            </div>
            <ur-data-grid
                ref="grid"
                :headers="columns217"
                :data-source="list"
                :options="options777"
                :data-set-options="{ id: 'id' }"
            >
<<<<<<< Updated upstream
            </ur-data-grid>
            <!-- ::E 콘텐츠2 -->
=======
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
      <!-- ::E 콘텐츠1 -->
      <!-- ::S 콘텐츠2 -->
      <div class="comm_title_wrap mt25">
        <h4 class="pr10">중지처리 대상</h4>
        <ur-button color="violet">저장</ur-button>
        <ur-button color="violet">삭제</ur-button>
        <!--S:: 타이틀 오른쪽 total info -->
        <div class="right_box">
          <div class="totalNo">
            <div class="totalCt">Total<span>15</span>건</div>
          </div>
        </div>
        <!--E:: 타이틀 오른쪽 total info -->
        :data-set-options="{ id: 'id' }"
      >
      </ur-data-grid>
      <!-- ::E 콘텐츠2 -->
>>>>>>> Stashed changes

            <!-- ::S 콘텐츠3 -->
            <!-- <div class="comm_title_wrap mt40">
        <h4>중지처리 정기권 내역 조회</h4>
      </div> -->
            <ur-form-box toggleable class="mt45">
                <ur-form-item
                    class="flex_wrap"
                    label="가입정보"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="v2" value="Radio 000272_01" sm>성명</ur-radio>
                        <ur-radio v-model="v2" value="Radio 000272_02" sm>휴대폰 </ur-radio>
                        <ur-radio v-model="v2" value="Radio 000272_03" sm>정기권번호</ur-radio>
                    </div>
                    <ur-text-field value="" class="pl16" />
                    <ur-icon-button icon="search" style="padding-top: 0px" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="조회일자"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="v3" value="Radio 000273_01" sm>중지일자 </ur-radio>
                        <ur-radio v-model="v3" value="Radio 000273_02" sm>중지종료예상일자 </ur-radio>
                    </div>
                    <!-- S::[2023-07-11] 수정 -->
                    <div style="width: auto; padding-left: 12px">
                        <ur-range-picker v-model="dateValue" autoConfirm input-type="YYYY-MM-DD" />
                    </div>
                    <!-- ::E [2023-07-11] 수정 -->
                    <!--   <div style="width: 35%" class="pl16">
                       <ur-date-picker autoConfirm input-type="YYYY-MM-DD" /> 
                    </div>-->
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>초기화</ur-button>
                    <ur-button color="violet">조회</ur-button>
                </div>
            </div>
            <!-- ::E 콘텐츠 -->
            <!-- S::콘텐츠4 -->
            <div class="comm_title_wrap mt25">
                <h4>중지처리 정기권 리스트</h4>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">Total<span>16</span>건</div>
                    </div>
                </div>
                <!--E:: 타이틀 오른쪽 total info -->
            </div>
            <ur-data-grid
                ref="grid"
                :headers="columns27"
                :data-source="list27"
                :data-set-options="{ id: 'id' }"
                :options="options777"
                :labelAlign="'right'"
            />
            <!-- E::콘텐츠4 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00027', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            //드롭다운
            valueD1: '1',

            // 라디오 버튼
            v1: 'Radio 000271_01',
            v2: 'Radio 000272_01',
            v3: 'Radio 000273_01',
            value: null,

            // 테이블
            options777: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 중지처리 대상 테이블
            columns217: [
                { text: '파크구분', value: 'value1', width: '150px' },
                { text: '정기권번호', value: 'value2', width: '150px' },
                { text: '결제자', value: 'value3', width: '120px' },
                { text: '발급일', value: 'value4' },
                { text: '만기일', value: 'value5' },
                { text: '발급구분', value: 'value6' },
                { text: '권종명', value: 'value7' },
                { text: '상태', value: 'value8' },
                { text: '중지시작일자', value: 'value9' },
                { text: '중지종료예상일', value: 'value10' },
                { text: '중지종료일', value: 'value11' },
                { text: '중지기간', value: 'value12' },
                { text: '예상만기일', value: 'value13' },
                { text: '중지사유', value: 'value14' },
                { text: '비고', value: 'value15' },
            ],
            list: [
                {
                    value1: 'EL',
                    value2: '2023153993',
                    value3: '1000000090',
                    value4: '2023-01-13',
                    value5: '2024-01-13',
                    value6: '발급구분코드-신규',
                    value7: 'EL2연간신규365스탠다드대인',
                    value8: '정상',
                    value9: '2024-05-24',
                    value10: '2023-08-22',
                    value11: '',
                    value12: '90',
                    value13: '',
                    value14: '',
                    value15: '',
                },
            ],
            // 중지처리정기권 리스트 테이블
            columns27: [
                { text: '일자', value: '2022/01/01', width: '100px' },
                { text: '포스명', value: '포스명1' },
                { text: '영수증번호', value: '5689456123' },
                { text: '카드사', value: '하나카드' },
                { text: '카드번호', value: '3333555645' },
                { text: '승인번호', value: '789888945' },
                { text: '할부', value: '22' },
                { text: '금액', value: '567,890' },
            ],
            list27: [
                {
                    value1: '2022/12/22',
                    value2: '연간회원 매출-11_김*현',
                    value3: '00012',
                    value4: '롯데2카드',
                    value5: '95718900****551*',
                    value6: '87456559',
                    value7: '0',
                    value8: '234,000',
                },
            ],
        };
    },
};
</script>
<style scoped></style>
