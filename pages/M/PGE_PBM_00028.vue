<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <!-- S::컨텐츠1 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="가입정보"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="v1" value="Radio 00028_01" sm>성명</ur-radio>
                        <ur-radio v-model="v1" value="Radio 00028_02" sm>휴대폰 </ur-radio>
                        <ur-radio v-model="v1" value="Radio 00028_03" sm>정기권번호</ur-radio>
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
            <!-- E::컨텐츠1 -->
  <sui-page class="custom_page">
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <!-- S::컨텐츠1 -->
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="가입정보"
          :labelAlign="'right'"
          style="width: 100%; height: auto"
        >
          <div class="radioForm">
            <ur-radio v-model="v1" value="Radio 00028_01" sm>성명</ur-radio>
            <ur-radio v-model="v1" value="Radio 00028_02" sm>휴대폰 </ur-radio>
            <ur-radio v-model="v1" value="Radio 00028_03" sm
              >정기권번호</ur-radio
            >
          </div>
          <ur-text-field value="" class="pl16" />
          <ur-icon-button icon="search" style="padding-top: 0px" />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button>초기화</ur-button>
          <ur-button>조회</ur-button>
          <ur-button color="violet">양도 처리</ur-button>
        </div>
      </div>
      <!-- E::컨텐츠1 -->

            <!-- S::양도자+양수자 -->
            <div class="comm_shut_wrap mt25">
                <div class="inbox5">
                    <!-- <div class="comm_title_wrap total">
            <h4>양도자</h4>
          </div> -->
<<<<<<< Updated upstream
                    <!-- S::양도자 회원 정보 -->
                    <div class="comm_title_wrap">
                        <h4>양도자 회원정보</h4>
                    </div>
                    <ur-form-box toggleable>
                        <ur-form-item
                            class="flex_wrap"
                            label="멤버십ID"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field value="" style="width: 100%" readonly />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            label="성명"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field value="" style="width: 100%" readonly />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            label="생년월일"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field value="" style="width: 100%" readonly />
                            <!-- <ur-date-picker autoConfirm input-type="YYYY-MM-DD" disabled /> -->
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            label="휴대폰"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field value="" style="width: 100%" readonly />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            label="회원구분"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field value="" style="width: 100%" readonly />
                        </ur-form-item>
                    </ur-form-box>
                    <!-- E::양도자 회원 정보 -->
                    <!-- S::양도자 정기권 정보 -->
                    <div class="comm_title_wrap mt40">
                        <h4>정기권 정보</h4>
                        <!--S:: 타이틀 오른쪽 total info -->
                        <div class="right_box">
                            <div class="totalNo">
                                <div class="totalCt">Total<span>1</span>건</div>
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
                        :labelAlign="'right'"
                    />
                    <!-- E::양도자 정기권 정보 -->
                </div>
                <div class="emptybox" />
                <div class="inbox5">
                    <!-- <div class="comm_title_wrap total">
            <h4>양수자</h4>
          </div> -->
                    <!-- S::양수자 회원 정보 -->
                    <div class="comm_title_wrap">
                        <h4 class="pr10">양수자 회원정보</h4>
                        <ur-button color="violet">양수자 조회</ur-button>
                    </div>
                    <ur-form-box toggleable>
                        <ur-form-item
                            label="멤버십ID"
                            class="flex_wrap"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field value="" style="width: 100%" readonly />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            label="성명"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field value="" style="width: 100%" readonly />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            label="생년월일"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field value="" style="width: 100%" readonly />
                            <!-- <ur-date-picker autoConfirm input-type="YYYY-MM-DD" disabled /> -->
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            label="휴대폰"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field value="" style="width: 100%" readonly />
                        </ur-form-item>
                        <ur-form-item
                            class="flex_wrap"
                            label="회원구분"
                            :labelAlign="'right'"
                            style="width: 100%; height: auto"
                        >
                            <ur-text-field value="" style="width: 100%" readonly />
                        </ur-form-item>
                    </ur-form-box>
                    <!-- E::양수자 회원 정보 -->
                    <!-- S::양수자 정기권 정보 -->
                    <div class="comm_title_wrap mt40">
                        <h4>정기권 정보</h4>
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
                        :headers="columns2"
                        :data-source="list2"
                        :data-set-options="{ id: 'id' }"
                        :options="options"
                        :labelAlign="'right'"
                    />
                    <div class="btn_wrap mt10">
                        <div class="right_box">
                            <ur-button color="violet">양도 처리</ur-button>
                        </div>
                    </div>
                    <!-- E::양수자 정기권 정보 -->
                </div>
            </div>
            <!-- E::양도자+양수자 -->
=======
          <!-- S::양도자 회원 정보 -->
          <div class="comm_title_wrap">
<<<<<<< Updated upstream
            <h4>양도자 회원정보</h4>
=======
            <h4>양도 정보</h4>
>>>>>>> Stashed changes
          </div>
          <ur-form-box toggleable>
            <ur-form-item
              class="flex_wrap"
              label="멤버십ID"
              :labelAlign="'right'"
              style="width: 100%; height: auto"
            >
              <ur-text-field value="" style="width: 100%" readonly />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="성명"
              :labelAlign="'right'"
              style="width: 100%; height: auto"
            >
              <ur-text-field value="" style="width: 100%" readonly />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="생년월일"
              :labelAlign="'right'"
              style="width: 100%; height: auto"
            >
              <ur-date-picker autoConfirm input-type="YYYY-MM-DD" disabled />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="휴대폰"
              :labelAlign="'right'"
              style="width: 100%; height: auto"
            >
              <ur-text-field value="" style="width: 100%" readonly />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="회원구분"
              :labelAlign="'right'"
              style="width: 100%; height: auto"
            >
              <ur-text-field value="" style="width: 100%" readonly />
            </ur-form-item>
          </ur-form-box>
          <!-- E::양도자 회원 정보 -->
          <!-- S::양도자 정기권 정보 -->
          <div class="comm_title_wrap mt40">
            <h4>정기권 정보</h4>
            <!--S:: 타이틀 오른쪽 total info -->
            <div class="right_box">
              <div class="totalNo">
                <div class="totalCt">Total<span>1</span>건</div>
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
            :labelAlign="'right'"
          />
          <!-- E::양도자 정기권 정보 -->
        </div>
        <div class="emptybox" />
        <div class="inbox5">
          <!-- <div class="comm_title_wrap total">
            <h4>양수자</h4>
          </div> -->
          <!-- S::양수자 회원 정보 -->
          <div class="comm_title_wrap">
            <h4 class="pr10">양수자 회원정보</h4>
            <ur-button color="violet">양수자 조회</ur-button>
          </div>
          <ur-form-box toggleable>
            <ur-form-item
              label="멤버십ID"
              class="flex_wrap"
              :labelAlign="'right'"
              style="width: 100%; height: auto"
            >
              <ur-text-field value="" style="width: 100%" readonly />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="성명"
              :labelAlign="'right'"
              style="width: 100%; height: auto"
            >
              <ur-text-field value="" style="width: 100%" readonly />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="생년월일"
              :labelAlign="'right'"
              style="width: 100%; height: auto"
            >
              <ur-date-picker autoConfirm input-type="YYYY-MM-DD" disabled />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="휴대폰"
              :labelAlign="'right'"
              style="width: 100%; height: auto"
            >
              <ur-text-field value="" style="width: 100%" readonly />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="회원구분"
              :labelAlign="'right'"
              style="width: 100%; height: auto"
            >
              <ur-text-field value="" style="width: 100%" readonly />
            </ur-form-item>
          </ur-form-box>
          <!-- E::양수자 회원 정보 -->
          <!-- S::양수자 정기권 정보 -->
          <div class="comm_title_wrap mt40">
            <h4>정기권 정보</h4>
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
            :headers="columns2"
            :data-source="list2"
            :data-set-options="{ id: 'id' }"
            :options="options"
            :labelAlign="'right'"
          />
          <!-- <div class="btn_wrap mt10">
            <div class="right_box">
              <ur-button color="violet">양도 처리</ur-button>
            </div>
          </div> -->
          <!-- E::양수자 정기권 정보 -->
        </div>
      </div>
      <!-- E::양도자+양수자 -->
>>>>>>> Stashed changes

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00028',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            // 라디오 버튼
            v1: 'Radio 00028_01',

<<<<<<< Updated upstream
            value: null,
            // 테이블
            options: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
            // 양도자 정기권정보
            columns: [
                { text: '파크구분', value: 'value1', width: '100px' },
                { text: '정기권번호', value: 'value2' },
                { text: '권종명', value: 'value3' },
                { text: '가입일', value: 'value4' },
                { text: '시작일', value: 'value5' },
                { text: '종료일', value: 'value6' },
                { text: '양도가능여부', value: 'value7' },
            ],
            list: [
                {
                    value1: 'EL',
                    value2: '2022153937',
                    value3: 'EL연간신규350스탠다드대인',
                    value4: '2022/11/29',
                    value5: '2022/12/09',
                    value6: '2023/12/10',
                    value7: '불가',
                },
            ],
=======
      value: null,
      // 테이블
      options: {
        height: 300,
        rowHeight: 41,
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      // 양도자 정기권정보
      columns: [
        { text: "파크구분", value: "value1", width: "100px" },
        { text: "정기권번호", value: "value2" },
        { text: "권종명", value: "value3" },
        { text: "가입일", value: "value4" },
        { text: "시작일", value: "value5" },
        { text: "종료일", value: "value6" },
        { text: "양도가능여부", value: "value7" },
      ],
      list: [
        {
          value1: "EL",
          value2: "2022153937",
          value3: "EL연간신규350스탠다드대인",
          value4: "2022/11/29",
          value5: "2022/12/09",
          value6: "2023/12/10",
          value7: "불가",
        },
      ],
>>>>>>> Stashed changes

            // 양수자 정기권정보
            columns2: [
                { text: '파크1구분', value: 'value1', width: '100px' },
                { text: '정기2권번호', value: 'value2' },
                { text: '권종4명', value: 'value3' },
                { text: '가입5일', value: 'value4' },
                { text: '시작6일', value: 'value5' },
                { text: '종료7일', value: 'value6' },
                { text: '상8태', value: 'value7' },
            ],
            list2: [
                {
                    value1: 'EL',
                    value2: '2022153932',
                    value3: 'EL연간신규350스탠다드소인',
                    value4: '2022/12/25',
                    value5: '2022/12/26',
                    value6: '2023/12/27',
                    value7: '정상',
                },
            ],
        };
    },
};
</script>
<style scoped></style>
