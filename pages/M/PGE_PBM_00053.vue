<template>
  <sui-page class="custom_page">
    <sui-page-header2 :pageId="this.$options.name" />
    <sui-page-contents>
      <!-- S::컨텐츠1 -->
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="쿠폰마스터번호"
          :labelAlign="'right'"
          style="width: 100%; height: auto"
        >
          <ur-text-field value="" style="width: 42.3%; height: auto" />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button>초기화</ur-button>
          <ur-button>조회</ur-button>
          <ur-button color="violet">저장</ur-button>
        </div>
      </div>
      <!-- E::컨텐츠1-->

      <!-- S::컨텐츠2 -->
      <div class="comm_title_wrap mt25">
        <h4>쿠폰마스터</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="파크구분"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-text-field
            value="EL"
            style="width: 100%; height: auto"
            readonly
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="쿠폰마스터번호"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-text-field
            value="1002065751"
            style="width: 100%; height: auto"
            readonly
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="쿠폰명"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-text-field
            value="에버블라썸 음료 1+1 할인쿠폰"
            style="width: 100%; height: auto"
            readonly
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="쿠폰유형"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="환불가능여부"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-text-field
            value="가능"
            style="width: 100%; height: auto"
            readonly
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="환불차감액"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-text-field
            value="10000"
            style="width: 100%; height: auto"
            readonly
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="유효기간"
          :labelAlign="'right'"
          style="width: 100%; height: auto"
        >
          <!--text-field 일 경우 -->
          <ur-text-field
            value="2023/01/01 ~ 2023/12/31"
            style="width: 42.3%; height: auto"
            readonly
          />
          <!-- range picker 일 경우-->
          <!-- <ur-range-picker v-model="dateValue1" init="today" /> -->
        </ur-form-item>
      </ur-form-box>
      <!-- E::컨텐츠2-->

      <!-- S::컨텐츠3 -->
      <div class="comm_title_wrap mt35">
        <h4>지급정보</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="지급일"
          :labelAlign="'right'"
          style="width: 100%; height: auto"
        >
          <span class="pr10">D+</span>
          <ur-text-field value="" />
        </ur-form-item>
      </ur-form-box>
      <!-- E::컨텐츠3-->

      <!-- S::컨텐츠4 -->
      <div class="comm_title_wrap mt40">
        <h4 class="pr10">지급대상 권종</h4>
        <ur-button color="violet"> 추가 </ur-button>
        <ur-button color="violet"> 삭제 </ur-button>
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
        :options="opts"
      />
      <!-- E::컨텐츠4-->

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_PBM_00053",
  components: {}, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      dateValue1: ["", ""],
      dateValue2: [""],

      // 테이블
      opts: {
        height: 200,
        rowHeight: 41,
        noInfo: true,
        multiSelect: true,
        selectCheck: true,
      },

      // 지급대상 권종
      columns: [
        { text: "파크구분", value: "value1" },
        { text: "권종코드", value: "value2" },
        { text: "권종명", value: "value3" },
        { text: "정상가", value: "value4" },
        { text: "지급수량", value: "value5" },
      ],
      list: [
        {
          value1: "E/L",
          value2: "9751572341",
          value3: "EL연간신규365스탠다드대인",
          value4: "285,000",
          value5: "15",
        },
      ],
    };
  },
};
</script>
<style scoped></style>
