<template>
  <sui-page class="custom_page">
    <div class="modalWrap" style="height: auto">
      <template slot="title">
        <!-- 배치 수동 실행 -->
        <div class="modal-title mb45">{{ $t('MSG_TIT_BATCH_MANUAL_PROCESS') }}</div>
      </template>
      <template>
        <sui-page class="custom_page">
          <div class="modal-body">
            <ur-form-box toggleable>                
              <!-- 파라미터 -->
              <ur-form-item
                class="flex_wrap"
                :label="$t('MSG_TIT_PRMT')"
                :labelAlign="'right'"
                style="width: 100%; height: auto"
              >
                  <!-- { "testData" : "12345" } -->
                  <textarea rows="4" v-model="paramInfo" :placeholder="$t('MSG_TXT_EXAMPLE_PARAM')" maxlength="3000" style="width: 100%" />
              </ur-form-item>
            </ur-form-box>
          </div>
        </sui-page>
      </template>
      <div class="btn_wrap bottom">
        <div class="right_box">
          <!-- 실행 -->
          <ur-button @click="onProcess"> {{ $t("MSG_TXT_PROCESS") }} </ur-button>
          <!-- 닫기 -->
          <ur-button @click="onClickClose" color="violet">{{ $t("MSG_BTN_CLOSE") }}</ur-button>
        </div>
      </div>
    </div>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_BSS_00004",
  components: {},
  props: {
    closePagePopup: {
      type: Function,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      paramInfo: '', // 파라미터 내용
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 팝업닫기
    onClickClose() {
      this.closePagePopup("");
    },
    // 수동실행
    onProcess() {
      // const param = JSON.parse(this.paramInfo);
      const param = JSON.parse(JSON.stringify(this.paramInfo));
      this.closePagePopup(param);
    }
  },
};
</script>
<style scoped></style>
