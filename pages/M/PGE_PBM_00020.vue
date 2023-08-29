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
            <ur-radio v-model="v1" value="Radio 00020_01" sm>성명</ur-radio>
            <ur-radio v-model="v1" value="Radio 00020_02" sm>휴대폰 </ur-radio>
            <ur-radio v-model="v1" value="Radio 00020_03" sm
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
          <ur-button color="violet">조회</ur-button>
        </div>
      </div>

      <!-- S::컨텐츠1 -->
      <div class="comm_title_wrap mt25">
        <h4>정기권가입자 리스트</h4>
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
        :headers="columns"
        :data-source="list"
        :data-set-options="{ id: 'id' }"
        :options="options"
      />
      <!-- E::컨텐츠1-->

      <!-- S::컨텐츠2:발급 대상자 -->
      <div class="comm_title_wrap mt40">
        <h4>발급 대상자</h4>
        <!--S:: 타이틀 오른쪽 total info -->
        <div class="right_box">
          <div class="totalNo">
            <div class="totalCt">Total<span>2</span>건</div>
          </div>
        </div>
        <!--E:: 타이틀 오른쪽 total info -->
      </div>
      <div class="comm_shut_wrap mt10">
        <div class="inbox2">
          <div
            ref="viewerArea"
            class="img_box"
            style="width: 360px; height: 280px"
          >
            <img
              style="width: 340px; height: 260px"
              src="https://code.sdsdev.co.kr/pages/UI-DEV/uidev-component/sample/img/nimitz_16x10.29f8b415.jpg"
            />
          </div>
        </div>
        <div class="emptybox" />
        <div class="inbox8">
          <ur-data-grid
            ref="grid"
            :headers="columns2"
            :data-source="list2"
            :data-set-options="{ id: 'id' }"
            :options="opts"
            :labelAlign="'right'"
            Height="300"
          />
          <ur-form-box toggleable class="mt10">
            <ur-form-item
              class="flex_wrap"
              label="발급사유"
              :labelAlign="'right'"
              style="width: 100%; height: auto"
            >
              <ur-text-field value="" style="width: 80%; height: auto" />
              <ur-button color="violet">입장확인증 발급</ur-button>
            </ur-form-item>
          </ur-form-box>
        </div>
      </div>
      <!-- E::컨텐츠2:발급 대상자 -->

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_PBM_00020",
  components: {}, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      // 라디오 버튼
      value: null,
      v1: "Radio 00020_01",

      dateValue1: ["", ""],

      // 테이블
      options: {
        height: 250,
        rowHeight: 41,
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      opts: {
        height: 228,
        rowHeight: 41,
        noInfo: true,
        multiSelect: true,
        selectCheck: true,
      },

      // 정기권가입자 리스트 테이블
      columns: [
        { text: "성명", value: "value1", width: "150px" },
        { text: "생년월일", value: "value2", width: "180px" },
        { text: "권종명", value: "value3" },
        { text: "정기권상태", value: "value4", width: "180px" },
        { text: "가입일자", value: "value5", width: "180px" },
        { text: "만기일자", value: "value6", width: "180px" },
        { text: "발급일자", value: "value7", width: "180px" },
      ],
      list: [
        {
          value1: "홍길동",
          value2: "1983/05/14",
          value3: "EL연간신규350스탠다드대인",
          value4: "정상",
          value5: "2022/11/27",
          value6: "2023/11/26",
          value7: "2022/11/28",
        },
      ],
      // 발급 대상자 테이블
      columns2: [
        { text: "성명", value: "value1", width: "100px" },
        { text: "인원유형", value: "value2", width: "120px" },
        { text: "가입일", value: "value3" },
        { text: "발급일", value: "value4" },
        { text: "만기일", value: "value5" },
        { text: "티켓명", value: "value6" },
        { text: "누적발급수량", value: "value7", width: "100px" },
      ],
      list2: [
        {
          value1: "홍일동",
          value2: "대인",
          value3: "2022/10/20",
          value4: "2023/10/19",
          value5: "2022/10/22",
          value6: "EL연간신규350스탠다드대인",
          value7: "1",
        },
      ],
    };
  },
};
</script>
<style scoped></style>
