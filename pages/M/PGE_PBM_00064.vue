<template>
  <sui-page class="custom_page">
    <sui-page-header2 :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- ::S  정보 -->
      <ur-button @click="openModalP00064">멤버십포인트 결제 팝업</ur-button>

      <!-- ::S 공통 팝업 -->
      <ur-modal
        ref="modalP00064"
        class="modal-b1c6"
        large
        dragable
        title="공통팝업"
        @closed="closed"
      >
        <template slot="title">
          <div class="modal-title">멤버십포인트 결제</div>
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
                265,000원
              </ur-form-item>
              <ur-form-item
                class="flex_wrap"
                label="미결금액"
                :labelAlign="'right'"
                required
                style="width: 50%; height: auto"
              >
                75,000원
              </ur-form-item>
              <ur-form-item
                class="flex_wrap"
                label="결제자"
                :labelAlign="'right'"
                style="width: 100%; height: auto"
              >
                목길동
              </ur-form-item>
            </ur-form-box>
            <!-- ::E 콘텐츠1 -->
            <!-- ::S 콘텐츠2 -->
            <ur-form-box toggleable class="mt20">
              <ur-form-item
                class="flex_wrap"
                label="잔여포인트"
                :labelAlign="'right'"
                style="width: 100%; height: auto"
              >
                <ur-text-field value="" style="width: 100%; height: auto" />
              </ur-form-item>
              <ur-form-item
                class="flex_wrap"
                label="가용포인트"
                required
                :labelAlign="'right'"
                style="width: 100%; height: auto"
              >
                <ur-text-field value="" style="width: 100%; height: auto" />
              </ur-form-item>
              <ur-form-item
                class="flex_wrap"
                label="적립예정포인트"
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
            <!-- <div class="btn_wrap mt10">
              <div class="right_box">
                <ur-button>새로고침</ur-button>
                <ur-button>사용처리</ur-button>
                <ur-button color="violet">취소</ur-button>
              </div>
            </div> -->
            <!--::S InfoText -->
            <div class="guideWrap guideList mt20">
              <ul class="listDot acc">
                <li>잔여포인트 : 현재 보유 포인트</li>
                <li>가용포인트 : 결제시 사용가능한 포인트</li>
                <li>적립예정포인트 : 당일 적립한 포인트(당일 사용 불가)</li>
                <li>
                  당일 적립 포인트는 다음날부터 100솜 단위로 이용 가능합니다.
                </li>
              </ul>
            </div>
            <!--::E InfoText -->
            <!--::S InfoText -->
            <!-- <div class="guideList">
              <ul class="listDot">
                <li>잔여포인트 : 현재 보유 포인트</li>
                <li>가용포인트 : 결제시 사용가능한 포인트</li>
                <li>적립예정포인트 : 당일 적립한 포인트(당일 사용 불가)</li>
              </ul>
            </div> -->
            <!--::E InfoText -->
            <!-- ::E 콘텐츠2 -->
          </div>

          <!-- </sui-page> -->
        </template>
        <template slot="action">
          <ur-button>새로고침</ur-button>
          <ur-button>사용처리</ur-button>
          <ur-button color="violet" @click="closeModal">닫기</ur-button>
        </template>
      </ur-modal>
      <!-- ::E 공통 팝업-->
      <!-- ::E 정보 -->
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_PBM_00064", // eslint-disable-line vue/name-property-casing
  components: {},
  data() {
    return {
      // 드롭다운
      valueD1: "1",
    };
  },
  computed: {
    modalP00064() {
      return this.$refs.modalP00064;
    },
  },
  methods: {
    openModalP00064() {
      this.modalP00064.open();
    },
    closeModal() {
      this.modalP00064.close();
    },
    closed() {},
  },
};
</script>
<style scoped></style>
