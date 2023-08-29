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
                    style="width: 100%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="v1" value="Radio 00012_01" sm>성명</ur-radio>
                        <ur-radio v-model="v1" value="Radio 00012_02" sm>휴대폰</ur-radio>
                        <ur-radio v-model="v1" value="Radio 00012_03" sm>정기권번호</ur-radio>
                        <ur-radio v-model="v1" value="Radio 00012_04" sm>멤버십QR</ur-radio>
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

            <!-- S::상세정보+비고 -->
            <div class="comm_shut_wrap mt25">
                <div class="inbox7">
                    <!-- S::Inner -->
                    <div class="inner">
                        <div class="inbox3">
                            <div class="comm_title_wrap">
                                <h4 class="pr10">사진</h4>
                            </div>
                            <div ref="viewerArea" class="img_box" style="height: 250px">
                                <!-- no image 일 경우 클래스 추가 -->
                                <img style="height: 100%; width: 100%" class="noimage" />
                                <!-- <img
                    style="height: 100%; width: 100%"
                    src="https://code.sdsdev.co.kr/pages/UI-DEV/uidev-component/sample/img/nimitz_16x10.29f8b415.jpg"
                  /> -->
                            </div>
                        </div>
                        <div class="emptybox" />
                        <div class="inbox7">
                            <div class="comm_title_wrap">
                                <h4 class="pr10">상세정보</h4>
                                <ur-button color="violet">드림포인트</ur-button>
                                <ur-button color="violet">이용조회</ur-button>
                            </div>
                            <ur-form-box toggleable>
                                <ur-form-item
                                    class="flex_wrap"
                                    label="멤버십ID"
                                    :labelAlign="'right'"
                                    style="width: 100%; height: auto"
                                >
                                    <ur-text-field style="width: 100%" value="" readonly />
                                </ur-form-item>
                                <ur-form-item
                                    class="flex_wrap"
                                    label="성명"
                                    :labelAlign="'right'"
                                    style="width: 100%; height: auto"
                                >
                                    <ur-text-field style="width: 100%" value="" readonly />
                                </ur-form-item>
                                <ur-form-item
                                    class="flex_wrap"
                                    label="생년월일"
                                    :labelAlign="'right'"
                                    style="width: 100%; height: auto"
                                >
                                    <ur-date-picker v-model="dateValue1" init="today" readonly />
                                </ur-form-item>
                                <ur-form-item
                                    class="flex_wrap"
                                    label="회원구분"
                                    :labelAlign="'right'"
                                    style="width: 100%; height: auto"
                                >
                                    <ur-text-field style="width: 100%" value="" readonly />
                                </ur-form-item>
                                <ur-form-item
                                    class="flex_wrap"
                                    label="정기권번호"
                                    :labelAlign="'right'"
                                    style="width: 100%; height: auto"
                                >
                                    <ur-text-field style="width: 100%" value="" readonly />
                                </ur-form-item>
                                <ur-form-item
                                    class="flex_wrap"
                                    label="총가입일수"
                                    :labelAlign="'right'"
                                    style="width: 100%; height: auto"
                                >
                                    <ur-text-field style="width: 100%" value="" readonly />
                                </ur-form-item>
                            </ur-form-box>
                        </div>
                    </div>
                    <!-- E::Inner -->
                </div>
                <div class="emptybox" />
                <div class="inbox3">
                    <div class="comm_title_wrap">
                        <h4 class="pr10">비고</h4>
                        <ur-button color="violet">상세조회</ur-button>
                    </div>
                    <ur-data-grid
                        ref="grid"
                        :headers="columns2"
                        :data-source="list2"
                        :data-set-options="{ id: 'id' }"
                        :options="options"
                    />
                </div>
            </div>
            <!-- E::회원정보+비고 -->

            <!-- S::컨텐츠2 -->
            <!--[2023-05-02] 수정 -->
            <div class="comm_title_wrap mt45">
                <h4 class="pr10">결제정보</h4>
                <ur-button color="violet">결제정보상세</ur-button>
            </div>
            <ur-form-box toggleable>
                <ur-form-item class="flex_wrap" label="일시" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-date-picker v-model="dateValue1" init="today" disabled />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="POS ID" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-text-field style="width: 100%" value="" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="영수증번호"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field style="width: 100%" value="" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="결제총액" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-text-field style="width: 100%" value="" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="결제자" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-text-field style="width: 100%" value="" readonly />
                </ur-form-item>
<<<<<<< Updated upstream
                <ur-form-item class="flex_wrap" label="가입회원" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-text-field style="width: 100%" value="" readonly />
                </ur-form-item>
            </ur-form-box>
            <!--//[2023-05-02] 수정 -->
            <!-- E::컨텐츠2 -->
=======
              </ur-form-box>
            </div>
          </div>
          <!-- E::Inner -->
        </div>
        <div class="emptybox" />
        <div class="inbox3">
          <div class="comm_title_wrap">
            <h4 class="pr10">비고</h4>
            <ur-button color="violet">상세조회</ur-button>
            <!--S:: 타이틀 오른쪽 total info -->
            <div class="right_box">
              <div class="totalNo">
                <div class="totalCt">Total<span>0</span>건</div>
              </div>
            </div>
            <!--E::: 타이틀 오른쪽 total info -->
          </div>
          <ur-data-grid
            ref="grid"
            :headers="columns2"
            :data-source="list2"
            :data-set-options="{ id: 'id' }"
            :options="options"
          />
        </div>
      </div>
      <!-- E::회원정보+비고 -->

      <!-- S::컨텐츠2 -->
      <!--[2023-05-02] 수정 -->
      <div class="comm_title_wrap mt45">
        <h4 class="pr10">결제정보</h4>
        <ur-button color="violet">결제정보상세</ur-button>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="일시"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-date-picker v-model="dateValue1" init="today" disabled />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="POS ID"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field style="width: 100%" value="" disabled />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="영수증번호"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field style="width: 100%" value="" disabled />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="결제총액"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field style="width: 100%" value="" disabled />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="결제자"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field style="width: 100%" value="" disabled />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="가입회원"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-text-field style="width: 100%" value="" disabled />
        </ur-form-item>
      </ur-form-box>
      <!--//[2023-05-02] 수정 -->
      <!-- E::컨텐츠2 -->
>>>>>>> Stashed changes

            <div class="comm_title_wrap mt45">
                <h4 class="pr10">정기권정보</h4>
                <ur-button color="violet">정기권 접수 이동 </ur-button>
                <ur-button color="violet">정기권정보변경</ur-button>
                <ur-button color="violet">연차적용</ur-button>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">Total<span>1</span>건</div>
                    </div>
                </div>
                <!--E:: 타이틀 오른쪽 total info -->
            </div>
            <!-- S::컨텐츠3 -->
            <ur-data-grid
                ref="grid"
                :headers="columns"
                :data-source="list12"
                :data-set-options="{ id: 'id' }"
                :options="options2"
            >
                <template #right-info>
                    <ur-button sm color="violet"> 동기화 </ur-button>
                    <ur-button sm>
                        <ur-icon icon="download" icon-type="line" />
                        엑셀양식다운로드
                    </ur-button>
                    <ur-button sm>
                        <ur-icon icon="upload" icon-type="line" />
                        엑셀업로드
                    </ur-button>
                </template>
            </ur-data-grid>

            <!-- E::컨텐츠3-->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00012',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            dateValue1: '',

            v1: 'Radio 00012_01',

            value: null,
            valueR2: 'COC',
            dateValue1: ['', ''],

            // 테이블
            options: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
            options2: {
                height: 200,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
            opts: {
                height: 200,
                rowHeight: 41,
                noInfo: true,
                multiSelect: true,
                selectCheck: true,
            },
            // 정기권정보 테이블
            columns: [
                { text: '파크구분', value: 'value1' },
                { text: '정기권번호', value: 'value2' },
                { text: '티켓명', value: 'value3' },
                { text: '가입일', value: 'value4' },
                { text: '시작일', value: 'value5' },
                { text: '종료일', value: 'value6' },
                { text: '환불일자', value: 'value7' },
                { text: '상태', value: 'value8' },
                { text: '가입일수', value: 'value9' },
                { text: '총가일일수', value: 'value10' },
                { text: '연차', value: 'value11' },
            ],
            list12: [
                {
                    value1: '1',
                    value2: '2',
                    value3: '3',
                    value4: '4',
                    value5: '5',
                    value6: '6',
                    value7: '7',
                    value8: '8',
                    value9: '9',
                    value10: '10',
                    value11: '11',
                },
            ],
            // 비고 테이블
            columns2: [
                { text: '일자', value: 'value1' },
                { text: '작성자', value: 'value2' },
                { text: '내용', value: 'value3' },
            ],
            list2: [
                {
                    value1: '2022/12/21',
                    value2: '소길동',
                    value3: '',
                },
            ],
        };
    },
};
</script>
<style scoped></style>
