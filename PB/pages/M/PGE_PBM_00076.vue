<template>
  <sui-page class="custom_page">
    <sui-page-header2 :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>스케줄러 정보</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="스케줄명"
          :label-align="'right'"
          required
          style="width: 50%; height: auto"
        >
          <ur-text-field style="width: 100%" value="" placeholder="스케줄명" />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="설명"
          :label-align="'right'"
          required
          style="width: 50%; height: auto"
        >
          <ur-text-field style="width: 100%" value="" placeholder="설명" />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="Cron EXP"
          :label-align="'right'"
          required
          style="width: 50%; height: auto"
        >
          <ur-text-field style="width: 100%" value="" placeholder="Cron EXP" />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="사용 여부"
          :label-align="'right'"
          required
          style="width: 50%; height: auto"
        >
          <div class="radioForm">
            <ur-radio v-model="v1" value="Radio 00076_01" sm>Y</ur-radio>
            <ur-radio v-model="v1" value="Radio 00076_02" sm>N</ur-radio>
          </div>
          <!-- <ur-radio-wrapper v-model="valueR1" :items="itemsR1" sm /> -->
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="Trigger Name"
          :label-align="'right'"
          required
          style="width: 50%; height: auto"
        >
          <ur-text-field
            style="width: 100%"
            value=""
            placeholder="Trigger Name"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="Trigger Group"
          :label-align="'right'"
          required
          style="width: 50%; height: auto"
        >
          <ur-text-field
            style="width: 100%"
            value=""
            placeholder="Trigger Group"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="Job Name"
          :label-align="'right'"
          required
          style="width: 50%; height: auto"
        >
          <ur-text-field style="width: 100%" value="" placeholder="Job Name" />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="Job Group"
          :label-align="'right'"
          required
          style="width: 50%; height: auto"
        >
          <ur-text-field style="width: 100%" value="" placeholder="Job Group" />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="Class명"
          :label-align="'right'"
          required
          style="width: 50%; height: auto"
        >
          <ur-text-field style="width: 100%" value="" placeholder="Class명" />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="Method명"
          :label-align="'right'"
          required
          style="width: 50%; height: auto"
        >
          <ur-text-field style="width: 100%" value="" placeholder="Method명" />
        </ur-form-item>
      </ur-form-box>

      <!-- S::컨텐츠2 -->
      <div class="comm_title_wrap mt25">
        <h4>스케줄러 실행 이력</h4>
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
        :headers="columnsT1"
        :data-source="listT1"
        :data-set-options="{ id: 'id' }"
        :options="opts"
      />
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button> 목록 </ur-button>
          <ur-button color="violet"> 저장 </ur-button>
        </div>
      </div>
      <!-- E::컨텐츠2-->

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_PBM_00076", // eslint-disable-line vue/name-property-casing
  components: {},
  data() {
    return {
      // 라디오 버튼
      v1: "Radio 00076_01",

      valueR1: "1",

      opts: {
        height: 300,
        rowHeight: 41,
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },

      columnsT1: [
        { text: "No.", value: "value1" },
        { text: "시작시간", value: "value2" },
        { text: "종료시간", value: "value3" },
        { text: "수행시간", value: "value4" },
        { text: "성공여부", value: "value5" },
      ],
      listT1: [
        {
          value1: "1",
          value2: "2022-10-13 10:16:45",
          value3: "2022-10-13 10:16:45",
          value4: "291846",
          value5: "Y",
        },
      ],
    };
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    itemsR1() {
      const rtn = [];
      rtn.push({ value: "1", text: "Y" });
      rtn.push({ value: "2", text: "N" });
      return rtn;
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped></style>
