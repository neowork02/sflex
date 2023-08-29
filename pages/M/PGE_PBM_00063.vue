<template>
  <sui-page class="custom_page">
    <sui-page-header2 :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- ::S 정보 -->
      <ur-button @click="openModalP00063">기프트카드 결제 팝업</ur-button>

      <!-- ::S 공통 팝업 -->
      <ur-modal
        ref="modalP00063"
        class="modal-b1c6"
        large
        dragable
        title="공통팝업"
        @closed="closed"
      >
        <!-- <div class="modalWrap" style="height: auto"> -->
        <template slot="title">
          <div class="modal-title">기프트카드 결제</div>
        </template>
        <template>
          <!-- <sui-page class="custom_page"> -->
          <div class="modal-body">
            <!-- ::S 콘텐츠1 -->
            <ur-form-box toggleable>
              <ur-form-item
                class="flex_wrap"
                label="총금액"
                :labelAlign="'right'"
                style="width: 50%; height: auto"
              >
                235,000원
              </ur-form-item>
              <ur-form-item
                class="flex_wrap"
                label="미결금액"
                :labelAlign="'right'"
                required
                style="width: 50%; height: auto"
              >
                50,000원
              </ur-form-item>
            </ur-form-box>
            <!-- ::E 콘텐츠1 -->
            <div class="comm_shut_wrap mt20">
              <div class="inbox5">
                <!-- ::S 콘텐츠2 -->
                <ur-form-box toggleable>
                  <ur-form-item
                    class="flex_wrap"
                    label="기프트카드 코드"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                  >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                  </ur-form-item>
                  <ur-form-item
                    class="flex_wrap"
                    label="잔액"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                  >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                  </ur-form-item>
                  <ur-form-item
                    class="flex_wrap"
                    label="사용금액"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                  >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                  </ur-form-item>
                </ur-form-box>
                <div class="btn_wrap mt10">
                  <div class="right_box">
                    <ur-button color="violet">잔액조회</ur-button>
                    <ur-button color="violet">사용</ur-button>
                  </div>
                </div>
                <!-- ::E 콘텐츠2 -->
              </div>
              <div class="emptybox" />
              <div class="inbox5">
                <!-- ::S 콘텐츠3 -->
                <!-- ::S 기프트카드 사용 목록 -->
                <real-grid
                  ref="grid"
                  grid-id="grdFields"
                  grid-root="/lib"
                  :gridFields="grdFields"
                  :gridColumns="grdColumns"
                  :style="{ height: '165px' }"
                />
                <!-- ::E 기프트카드 사용 목록 -->
                <!-- ::E 콘텐츠3-->
              </div>
            </div>

            <!-- <ur-form-box toggleable class="mt20">
              <ur-form-item
                class="flex_wrap"
                label="기프트카드 코드"
                :labelAlign="'right'"
                style="width: 100%; height: auto"
              >
                <ur-text-field value="" style="width: 100%; height: auto" />
              </ur-form-item>
              <ur-form-item
                class="flex_wrap"
                label="잔액"
                :labelAlign="'right'"
                style="width: 100%; height: auto"
              >
                <ur-text-field value="" style="width: 100%; height: auto" />
              </ur-form-item>
              <ur-form-item
                class="flex_wrap"
                label="사용금액"
                :labelAlign="'right'"
                style="width: 100%; height: auto"
              >
                <ur-text-field value="" style="width: 100%; height: auto" />
              </ur-form-item>
            </ur-form-box> -->
          </div>
          <!-- </sui-page> -->
        </template>
        <template slot="action">
          <ur-button>완료</ur-button>
          <ur-button color="violet" @click="closeModal">닫기</ur-button>
        </template>
        <!-- </div> -->
      </ur-modal>
      <!-- ::E 공통 팝업-->
      <!-- ::E 정보 -->
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_PBM_00063", // eslint-disable-line vue/name-property-casing
  components: {},
  data() {
    return {
      // 모바일기프트카드 결제 내역 Grid
      grdFields: [
        { fieldName: "cardNo", dataType: "String" }, // 카드번호
        { fieldName: "otcNo", dataType: "String" }, // OTC
        { fieldName: "pointUseAmt", dataType: "number" }, // 사용금액
        { fieldName: "balanceAmt", dataType: "number" }, // 잔액
      ],
      grdColumns: [
        {
          name: "cardNo",
          fieldName: "cardNo",
          width: 100,
          header: { text: "카드번호" },
          editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        },
        {
          name: "otcNo",
          fieldName: "otcNo",
          width: 80,
          header: { text: "OTC" },
          editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        },
        {
          name: "pointUseAmt",
          fieldName: "pointUseAmt",
          width: 80,
          header: { text: "사용금액" },
          numberFormat: "#,##0",
          editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        },
        {
          name: "balanceAmt",
          fieldName: "balanceAmt",
          width: 80,
          header: { text: "잔액" },
          numberFormat: "#,##0",
          editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        },
      ],
      ifLogFields: [
        { fieldName: "requestTime", dataType: "text" },
        { fieldName: "responseTime", dataType: "text" },
        { fieldName: "systemView", dataType: "text" },
        { fieldName: "interface", dataType: "text" },
        { fieldName: "responseCode", dataType: "text" },
        { fieldName: "responseMsg", dataType: "text" },
        { fieldName: "requestContent", dataType: "text" },
        { fieldName: "responseContent", dataType: "text" },
        { fieldName: "transactionId", dataType: "text" },
      ],
      ifLogColumns: [
        {
          name: "requestTime",
          fieldName: "requestTime",
          header: { text: "요청시간" },
          edit: false,
        },
        {
          name: "responseTime",
          fieldName: "responseTime",
          header: { text: "응답시간" },
          edit: false,
          displayCallback: function (grid, index, value) {
            return utils.maskName(value);
          },
        },
        {
          name: "systemView",
          fieldName: "systemView",
          header: { text: "조회시스템" },
          edit: false,
          displayCallback: function (grid, index, value) {
            return utils.maskBirthDate(value);
          },
        },
        {
          name: "interface",
          fieldName: "interface",
          header: { text: "인터페이스 URL" },
          edit: false,
          displayCallback: function (grid, index, value) {
            return utils.maskTel(value);
          },
        },
        {
          name: "responseCode",
          fieldName: "responseCode",
          header: { text: "응답상태코드" },
          edit: false,
        },
        {
          name: "requestContent",
          fieldName: "requestContent",
          header: { text: "요청전문내용" },
          edit: false,
        },
        {
          name: "responseContent",
          fieldName: "responseContent",
          header: { text: "응답전문내용" },
          edit: false,
        },
        {
          name: "transactionId",
          fieldName: "transactionId",
          header: { text: "트랙잭션 ID" },
          edit: false,
        },
      ],
    };
  },
  created() {},
  computed: {
    modalP00063() {
      return this.$refs.modalP00063;
    },
  },
  methods: {
    openModalP00063() {
      this.modalP00063.open();
    },
    closeModal() {
      this.modalP00063.close();
    },
    closed() {},
  },
};
</script>
<style scoped></style>
