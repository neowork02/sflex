<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
<<<<<<< Updated upstream
                <ur-form-item
                    class="flex_wrap"
                    label="예약일자"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <ur-range-picker v-model="dateValue1" init="today" />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="처리상태" :labelAlign="'right'" style="width: 50%; height: auto">
                    <div class="radioForm">
                        <ur-radio v-model="v1" value="Radio 000251_01" sm>전체</ur-radio>
                        <ur-radio v-model="v1" value="Radio 000251_02" sm>정상 </ur-radio>
                        <ur-radio v-model="v1" value="Radio 000251_03" sm>기타</ur-radio>
                    </div>
                    <!-- <ur-text-field value="" class="pl16" />
                   <ur-icon-button icon="search" /> -->
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap borTop"
                    label="예약 정보"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="v2" value="Radio 000252_01" sm>예약자명</ur-radio>
                        <ur-radio v-model="v2" value="Radio 000252_02" sm>예약자전화번호</ur-radio>
                        <ur-radio v-model="v2" value="Radio 000252_03" sm>예약확인증번호 </ur-radio>
                    </div>
                    <ur-text-field value="" class="pl16" style="width: 29%" />
                    <ur-icon-button icon="search" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap borTop"
                    label="예약상태"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="v3" value="Radio 000253_01" sm>전체</ur-radio>
                        <ur-radio v-model="v3" value="Radio 000253_02" sm>예약신청</ur-radio>
                        <ur-radio v-model="v3" value="Radio 000253_03" sm>예약취소</ur-radio>
                        <ur-radio v-model="v3" value="Radio 000253_04" sm>발급완료</ur-radio>
                        <ur-radio v-model="v3" value="Radio 000253_05" sm>예약일</ur-radio>
                    </div>
                </ur-form-item>
=======
              <ur-form-item
                class="flex_wrap"
                label="예약일시"
                :labelAlign="'right'"
                style="width: 25%; height: auto"
              >
                2022/12/25 10:22:35
              </ur-form-item>
              <ur-form-item
                class="flex_wrap"
                label="예약번호"
                :labelAlign="'right'"
                style="width: 25%; height: auto"
              >
                1754053128
              </ur-form-item>
              <ur-form-item
                class="flex_wrap"
                label="티켓명"
                :labelAlign="'right'"
                style="width: 50%; height: auto"
              >
                여름방학 시즌권(재가입,대인)
              </ur-form-item>
              <ur-form-item
                label="예약자명"
                :labelAlign="'right'"
                style="width: 25%; height: auto"
              >
                테스트
              </ur-form-item>
              <ur-form-item
                class="flex_wrap"
                label="생년월일"
                :labelAlign="'right'"
                style="width: 25%; height: auto"
              >
                1988/01/01
              </ur-form-item>
              <ur-form-item
                class="flex_wrap"
                label="전화번호"
                :labelAlign="'right'"
                style="width: 25%; height: auto"
              >
                010-2234-5678
              <ur-form-item
                style="width: 25%; height: auto"
              >
                대인
              </ur-form-item>
              <ur-form-item
                class="flex_wrap"
                label="예약금액"
                :labelAlign="'right'"
                style="width: 25%; height: auto"
              >
                270,000
              </ur-form-item>
              <ur-form-item
                class="flex_wrap"
                label="승인번호"
                :labelAlign="'right'"
                style="width: 25%; height: auto"
              >
                12345678
              </ur-form-item>
              <ur-form-item
                class="flex_wrap"
                label="승인일"
                :labelAlign="'right'"
                style="width: 25%; height: auto"
              >
                2022/12/14
              </ur-form-item>

              <ur-form-item
                class="flex_wrap"
                label="거래KEY"
                :labelAlign="'right'"
                style="width: 25%; height: auto"
              >
                92345678
              </ur-form-item>
>>>>>>> Stashed changes
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>초기화</ur-button>
                    <ur-button>조회</ur-button>
                    <ur-button color="violet">엑셀다운로드</ur-button>
                </div>
            </div>
<<<<<<< Updated upstream
            <!-- S::tab -->
            <ur-tab-box class="mt35">
                <ur-tab-content :idx="1" label="웹예약">
                    <h4>웹예약</h4>
                </ur-tab-content>
                <ur-tab-content :idx="2" label="상세조회">
                    <template>
                        <div class="comm_title_wrap mt10">
                            <h4>예약 정보</h4>
                        </div>
                        <ur-form-box toggleable>
                            <ur-form-item
                                class="flex_wrap"
                                label="예약일시"
                                :labelAlign="'right'"
                                style="width: 25%; height: auto"
                            >
                                2022/12/25 10:22:35
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="예약번호"
                                :labelAlign="'right'"
                                style="width: 25%; height: auto"
                            >
                                1754053128
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="티켓명"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                여름방학 시즌권(재가입,대인)
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap borTop"
                                label="예약자명"
                                :labelAlign="'right'"
                                style="width: 25%; height: auto"
                            >
                                테스트
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="생년월일"
                                :labelAlign="'right'"
                                style="width: 25%; height: auto"
                            >
                                1988/01/01
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="전화번호"
                                :labelAlign="'right'"
                                style="width: 25%; height: auto"
                            >
                                010-2234-5678
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="회원유형"
                                :labelAlign="'right'"
                                style="width: 25%; height: auto"
                            >
                                대인
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="예약금액"
                                :labelAlign="'right'"
                                style="width: 25%; height: auto"
                            >
                                270,000
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="승인번호"
                                :labelAlign="'right'"
                                style="width: 25%; height: auto"
                            >
                                12345678
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="승인일"
                                :labelAlign="'right'"
                                style="width: 25%; height: auto"
                            >
                                2022/12/14
                            </ur-form-item>

                            <ur-form-item
                                class="flex_wrap"
                                label="거래KEY"
                                :labelAlign="'right'"
                                style="width: 25%; height: auto"
                            >
                                92345678
                            </ur-form-item>
                        </ur-form-box>
                        <div class="comm_title_wrap mt20">
                            <h4>회원 정보</h4>
                            <!--S:: 타이틀 오른쪽 total info -->
                            <div class="right_box">
                                <div class="totalNo">
                                    <div class="totalCt">Total<span>12</span>건</div>
                                </div>
                            </div>
                            <!--E:: 타이틀 오른쪽 total info -->
                        </div>
                        <ur-data-grid
                            ref="grid"
                            :headers="columns"
                            :data-source="list"
                            :data-set-options="{ id: 'id' }"
                            :options="options"
                        />
                        <div class="comm_title_wrap mt20">
                            <h4>결제 정보</h4>
                            <!--S:: 타이틀 오른쪽 total info -->
                            <div class="right_box">
                                <div class="totalNo">
                                    <div class="totalCt">Total<span>13</span>건</div>
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
                        />
                        <div class="comm_title_wrap mt20">
                            <h4>정기권 정보</h4>
                            <!--S:: 타이틀 오른쪽 total info -->
                            <div class="right_box">
                                <div class="totalNo">
                                    <div class="totalCt">Total<span>14</span>건</div>
                                </div>
                            </div>
                            <!--E:: 타이틀 오른쪽 total info -->
                        </div>
                        <ur-data-grid
                            ref="grid"
                            :headers="columns3"
                            :data-source="list3"
                            :data-set-options="{ id: 'id' }"
                            :options="options"
                        />
                    </template>
                </ur-tab-content>
            </ur-tab-box>
            <!-- E::tab -->
=======
            <ur-data-grid
              ref="grid"
              :headers="columns2"
              :data-source="list2"
              :data-set-options="{ id: 'id' }"
              :options="options1"
            />
            <div class="comm_title_wrap mt20">
              <h4>정기권 정보</h4>
              <!--S:: 타이틀 오른쪽 total info -->
              <div class="right_box">
                <div class="totalNo">
                  <div class="totalCt">Total<span>14</span>건</div>
                </div>
              </div>
              <!--E:: 타이틀 오른쪽 total info -->
            </div>
            <ur-data-grid
              ref="grid"
              :headers="columns3"
              :data-source="list3"
              :data-set-options="{ id: 'id' }"
              :options="options"
            />
          </template>
        </ur-tab-content>
      </ur-tab-box>
      <!-- E::tab -->
>>>>>>> Stashed changes

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00025',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            // 라디오 버튼
            v1: 'Radio 000251_01',
            v2: 'Radio 000252_01',
            v3: 'Radio 000253_01',
            value: null,

            dateValue1: ['', ''],

            // 테이블
            options: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 회원정보 리스트 테이블
            columns: [
                { text: '번호', value: 'value1' },
                { text: '생년월일', value: 'value2' },
                { text: '성명', value: 'value3' },
                { text: '티켓명', value: 'value4' },
                { text: '멤버십정보', value: 'value5' },
            ],
            list: [
                {
                    value1: '1',
                    value2: '2000/01/01',
                    value3: '오가현',
                    value4: 'EL 연간 평일권 소인',
                    value5: '',
                },
            ],

            // 결제정보 리스트 테이블
            columns2: [
                { text: '번호', value: 'value1' },
                { text: '결제번호', value: 'value2' },
                { text: '거래상태', value: 'value3' },
                { text: '결제금액', value: 'value4' },
                { text: '승인(교환권)번호', value: 'value5' },
                { text: '카드사코드', value: 'value6' },
                { text: '처리일자', value: 'value7' },
            ],
            list2: [
                {
                    value1: '1',
                    value2: '1',
                    value3: '결제완료',
                    value4: '270,000',
                    value5: '12345678',
                    value6: '987654321',
                    value7: '2022/09/01',
                },
            ],
            // 정기권정보 리스트 테이블
            columns3: [
                { text: '번호', value: 'value1' },
                { text: '권종명', value: 'value2' },
                { text: '결제총액', value: 'value3' },
                { text: '총인원수', value: 'value4' },
                { text: '대인', value: 'value5' },
                { text: '소인', value: 'value6' },
                { text: '경로', value: 'value7' },
                { text: '장애우', value: 'value8' },
                { text: '대인', value: 'value9' },
                { text: '소인', value: 'value10' },
                { text: '경로', value: 'value11' },
                { text: '장애우', value: 'value12' },
            ],
            list3: [
                {
                    value1: '1',
                    value2: 'EL 연간 평일권 소인',
                    value3: '90,000',
                    value4: '1',
                    value5: '1',
                    value6: '0',
                    value7: '0',
                    value8: '0',
                    value9: '90,000',
                    value10: '0',
                    value11: '0',
                    value12: '0',
                },
            ],
        };
    },
};
</script>
<style scoped>
.custom_page .ur-form-item:nth-child(2) + .ur-form-item,
.custom_page .ur-form-item:nth-child(3) + .ur-form-item {
    border-top: none;
}
</style>
