<template>
  <sui-page class="custom_page">
    <sui-page-header2 :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- ::S 정보 -->
      <ur-button @click="openModalP00035">결제정보리스트 팝업</ur-button>

      <!-- ::S 공통 팝업 -->
      <ur-modal
        ref="modalP00035"
        class="modal-b1c6"
        large
        dragable
        title="공통팝업"
        @closed="closed"
      >
        <template slot="title">
          <div class="modal-title mb45">결제정보리스트</div>
        </template>
        <template>
          <!-- <sui-page class="custom_page"> -->
          <div class="modal-body">
            <!-- ::S 콘텐츠1 -->
            <!-- <div class="comm_title_wrap">
              <h4>결제정보리스_임시타이틀 영역</h4>
            </div> -->
            <!--S:: 타이틀 오른쪽 total info -->
            <div class="comm_title_wrap">
              <div class="right_box">
                <div class="totalNo">
                  <div class="totalCt">Total<span>0</span>건</div>
                </div>
              </div>
            </div>
            <!--E::: 타이틀 오른쪽 total info -->
            <ur-data-grid
              ref="grid"
              :headers="columnsP1T1"
              :data-source="listP1T1"
              :options="options"
              :data-set-options="{ id: 'id' }"
            />
            <!-- ::E 콘텐츠1 -->
          </div>
          <!-- </sui-page> -->
        </template>
        <template slot="action">
          <ur-button>선택</ur-button>
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
  name: "PGE_PBM_00035", // eslint-disable-line vue/name-property-casing
  components: {},
  data() {
    return {
      // 드롭다운

      // 테이블 옵션
      options: {
        height: 250,
        rowHeight: 41,
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },

      // 결제정보리스트팝업 테이블
      columnsP1T1: [
        { text: "판매일자", value: "value1", width: "100px" },
        { text: "판매시간", value: "value2", width: "100px" },
        { text: "영수증번호", value: "value3" },
        { text: "판매구분", value: "value4", width: "100px" },
        { text: "결제자 정기권번호", value: "value5" },
        { text: "동반자 정기권번호", value: "value6" },
        { text: "총매출액", value: "value7" },
        { text: "인원수", value: "value8", width: "70px" },
        { text: "POS ID", value: "value9" },
        { text: "POS명", value: "value10" },
      ],
      listP1T1: [
        {
          value1: "2021/11/18",
          value2: "13:35:10",
          value3: "20221227C100",
          value4: "일반",
          value5: "9522152818",
          value6: "7322173941",
          value7: "325,000",
          value8: "1",
          value9: "C100V380108",
          value10: "연간회원 매출-05_최상현",
        },
      ],
    };
  },
  computed: {
    modalP00035() {
      return this.$refs.modalP00035;
    },
  },
  methods: {
    openModalP00035() {
      this.modalP00035.open();
    },
    closeModal() {
      this.modalP00035.close();
    },
    closed() {},
  },
};
</script>
<style scoped></style>
