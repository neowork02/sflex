<template>
  <sui-page class="custom_page">
    <sui-page-header2 :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- ::S 정보 -->
      <ur-button @click="openModalP00065">외상 결제 팝업</ur-button>

      <!-- ::S 공통 팝업 -->
      <ur-modal
        ref="modalP00065"
        class="modal-b1c6"
        large
        dragable
        title="공통팝업"
        @closed="closed"
      >
        <template slot="title">
          <div class="modal-title">외상 결제</div>
        </template>
        <template>
          <!-- <sui-page class="custom_page"> -->
          <sui-page class="custom_page">
            <div class="modal-body">
              <!-- ::S 콘텐츠1 -->
              <ur-form-box toggleable>
                <ur-form-item
                  class="flex_wrap"
                  label="총금액"
                  :labelAlign="'right'"
                  style="width: 50%; height: auto"
                >
                  375,000원
                </ur-form-item>
                <ur-form-item
                  class="flex_wrap"
                  label="미결금액"
                  :labelAlign="'right'"
                  required
                  style="width: 50%; height: auto"
                >
                  195,000원
                </ur-form-item>
              </ur-form-box>
              <ur-form-box toggleable class="mt20">
                <ur-form-item
                  class="flex_wrap"
                  label="사번"
                  required
                  :labelAlign="'right'"
                  style="width: 100%; height: auto"
                >
                  <ur-text-field value="" style="width: 100%; height: auto" />
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
              <ur-form-box toggleable class="mt20">
                <ur-form-item
                  class="flex_wrap"
                  label="외상자성명"
                  :labelAlign="'right'"
                  style="width: 50%; height: auto"
                >
                  명길동
                </ur-form-item>
                <ur-form-item
                  class="flex_wrap"
                  label="사원번호"
                  :labelAlign="'right'"
                  style="width: 50%; height: auto"
                >
                  983345667
                </ur-form-item>
                <ur-form-item
                  class="flex_wrap"
                  label="결제금액"
                  :labelAlign="'right'"
                  style="width: 100%; height: auto"
                >
                  29,500원
                </ur-form-item>
                <ur-form-item
                  label="외상사유"
                  :labelAlign="'right'"
                  style="width: 100%; height: auto"
                  class="compo_col_wrap"
                >
                  <div class="col_item_txt pb4">
                    <ur-dropdown
                      v-model="valueD1"
                      :items="items1"
                      style="width: 100%"
                    />
                  </div>
                  <div class="col_item_txt pb4">
                    <textarea rows="4" maxlength="1000" style="width: 100%" />
                  </div>
                </ur-form-item>
                <!-- <ur-form-item
                  class="flex_wrap"
                  label="라벨명(임시)"
                  :labelAlign="'right'"
                  style="width: 100%; height: auto"
                >
                  <ur-checkbox v-model="valueC1" sm />
                  <span class="check_label">삭제</span>
                </ur-form-item> -->
              </ur-form-box>
              <!-- ::E 콘텐츠2 -->
              <div class="noborBox mt10">
                <ur-checkbox v-model="valueC1" sm class="ur-checkbox" />
                <span class="check_label">삭제</span>
              </div>
            </div>
          </sui-page>
          <!-- </sui-page> -->
        </template>
        <template slot="action">
          <ur-button>완료 </ur-button>
          <ur-button color="violet" @click="closeModal">닫기</ur-button>
        </template>
      </ur-modal>
      <!-- ::E 공통 팝업-->
      <!-- ::E  정보 -->
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_PBM_00065", // eslint-disable-line vue/name-property-casing
  components: {},
  data() {
    return {
      // 라디오 버튼
      v1: null,
      // 드롭다운
      valueD1: "1",

      // 체크박스
      valueC1: ["삭제"],
    };
  },
  computed: {
    // 드랍다운
    items1() {
      const rtn = [];
      rtn.push({ value: "1", text: "전체" });
      return rtn;
    },
    // modalPopUp
    modalP00065() {
      return this.$refs.modalP00065;
    },
  },
  methods: {
    openModalP00065() {
      this.modalP00065.open();
    },
    closeModal() {
      this.modalP00065.close();
    },
    closed() {},
  },
};
</script>
<style scoped></style>
