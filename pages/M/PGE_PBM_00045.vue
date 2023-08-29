<template>
  <sui-page class="custom_page">
    <sui-page-header2 :pageId="this.$options.name" />
    <sui-page-contents>
      <!-- S::컨텐츠1:조회조건 -->
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="조회일자"
          :labelAlign="'right'"
          style="width: 100%; height: auto"
        >
          <ur-range-picker v-model="dateValue2" init="today" />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button>초기화</ur-button>
          <ur-button>조회</ur-button>
          <ur-button color="violet">엑셀다운로드</ur-button>
        </div>
      </div>
      <!-- E::컨텐츠1:조회조건 -->
      <!-- S::tab -->
      <ur-tab-box class="mt35">
        <ur-tab-content :idx="1" label="일별">
          <h4>일별</h4>
        </ur-tab-content>
        <ur-tab-content :idx="2" label="권종별">
          <template>
            <div class="comm_title_wrap mt10">
              <h4>권종별</h4>
              <!--S:: 타이틀 오른쪽 total info -->
              <div class="right_box">
                <div class="totalNo">
                  <div class="totalCt">Total<span>3</span>건</div>
                  <!-- info: Total *건 -->
                </div>
              </div>
              <!--E:: 타이틀 오른쪽 total info -->
            </div>
            <ur-data-grid
              ref="grid"
              :headers="columns2"
              :data-source="list2"
              :data-set-options="{ id: 'id' }"
              :options="options124"
            />
          </template>
        </ur-tab-content>
      </ur-tab-box>
      <!-- E::tab -->

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_PBM_00045",
  components: {}, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      dateValue2: ["", ""],

      // 테이블
      options124: {
        height: 500,
        rowHeight: 41,
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },

      // 권종별
      columns2: [
        { text: "일자", value: "value1" },
        { text: "권종명", value: "value2" },
        { text: "신규가입인원", value: "value3" },
        { text: "재가입인원", value: "value4" },
        { text: "총가입인원", value: "value5" },
      ],
      list2: [
        {
          value1: "2022/12/15",
          value2: "EL연간신규365스탠다드대인",
          value3: "15",
          value4: "3",
          value5: "19",
        },
      ],
    };
  },
};
</script>
<style scoped></style>
