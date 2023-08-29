<template>
  <sui-page class="custom_page">
    <div class="modalWrap" style="height: auto">
      <!-- ::S 쿠폰마스터 조회 팝업 -->
      <template slot="title">
        <div class="modal-title mb45">{{ $t("MSG_TIT_SEARCH_COUPON_MASTER") }}</div>
      </template>
      <template>
        <!-- <sui-page class="custom_page"> -->
        <div class="modal-body">
          <!-- ::S 콘텐츠1 -->
          <ur-form-box toggleable>
            <ur-form-item
              class="flex_wrap"
              :label="$t('MSG_TXT_COUPON_MASTER_NUM')"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                v-model="cpnMstNo"
                style="width: 100%; height: auto"
                maxlength="10"
                :mask="inputMask"
                @keyup.enter="search"/>
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              :label="$t('MSG_TXT_COUPON_NM')"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                v-model="cpnMstNm"
                style="width: 100%; height: auto"
                maxlength="50"
                @keyup.enter="search"/>
            </ur-form-item>
          </ur-form-box>
          <div class="btn_wrap mt10">
            <div class="right_box">
              <ur-button type="button" @click="reset">{{ $t('MSG_BTN_RESET') }}</ur-button> <!-- 초기화 -->
              <ur-button v-permission:read="this.$options.name" type="button" color="violet" @click="search">{{ $t('MSG_TXT_SRCH') }}</ur-button> <!-- 조회 -->
            </div>
          </div>
          <div class="comm_title_wrap mt25">
            <h4>{{ $t("MSG_TIT_COUPON_LIST") }}</h4>
            <!--S:: 타이틀 오른쪽 total info -->
            <div class="right_box">
              <div class="totalNo">
                <div class="totalCt">Total<span>{{ numberWithCommas(totalCnt) }}</span>{{ $t('MSG_TXT_CNT') }}</div> <!-- 총 : 건 -->
                <!-- info: Total *건 -->
              </div>
            </div>
            <!--E:: 타이틀 오른쪽 total info -->
          </div>
          <real-grid
            ref="pgeBsc00002Grid"
            grid-id="pgeBsc00002Grid"
            grid-root="/lib"
            :gridFields="gridFields"
            :gridColumns="gridColumns"
            :gridRows="gridDataList"
            :gridCellClick="onCellClick"
            :gridDbCellClick="onDbCellClick"
            :style="gridStyle"
          />
          <!-- ::E 콘텐츠1 -->
        </div>
        <!-- </sui-page> -->
      </template>
      <div class="btn_wrap bottom">
        <div class="right_box">
          <ur-button @click="onClickSelect">{{ $t('MSG_BTN_SELT') }}</ur-button> <!-- 선택 -->
          <ur-button color="violet" @click="onClickClose">{{ $t("MSG_BTN_CLOSE") }}</ur-button> <!-- 닫기 -->
        </div>
      </div>
      <!-- ::E 쿠폰마스터 조회 팝업-->
    </div>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_BSC_00002", // eslint-disable-line vue/name-property-casing
  components: {},
  props: {
    closePagePopup: {
      type: Function,
      default() {
        return null;
      },
    },
    pageInitialData: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      cpnMstNo: null,
      cpnMstNm: null,
      gridDataList: [],
      gridStyle: { height: "400px" },
      totalCnt: 0,
    };
  },
  computed: {
    // Input Mask 처리
    inputMask() {
      return '##########';
    },
  },
  created() {
    this.gridFields = [
      // 쿠폰마스터 번호
      { fieldName: "cpnMstNo", dataType: "text" },
      // 발행차수
      { fieldName: "issueSeq", dataType: "text" },
      // 쿠폰명
      { fieldName: "cpnMstNm", dataType: "text" },
    ];
    this.gridColumns = [
      {
        // 쿠폰마스터 번호
        name: "cpnMstNoColumn",
        fieldName: "cpnMstNo",
        width: 100,
        edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        header: {
          text: this.$t('MSG_TXT_COUPON_MASTER_NUM'),
        },
      },
      {
        // 발행차수
        name: "issueSeqColumn",
        fieldName: "issueSeq",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_PUBLIC_ORDER'),
        },
      },
      {
        // 쿠폰명
        name: "cpnMstNmColumn",
        fieldName: "cpnMstNm",
        width: 200,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_COUPON_NM'),
        },
      },
    ];
  },
  mounted() {
    this.cpnMstNo = null;
    this.cpnMstNm = null;
    this.$refs.pgeBsc00002Grid.setRows([]);
  },
  methods: {
    // 초기화
    reset() {
      this.cpnMstNo = null;
      this.cpnMstNm = null;
    },
    // 조회 파라미터
    getSearchParam() {
      const params = {
        cpnMstNo: utils.trim(this.cpnMstNo), // 쿠폰마스터번호
        cpnMstNm: utils.trim(this.cpnMstNm), // 쿠폰명
      };
      return params;
    },
    // 조회
    search() {
      const params = this.getSearchParam();
      http.request(this.$options.name, "DTS_BSC_00007", {
        query: params,
      }).then((res) => {
        const resData = res.data;
        this.totalCnt = res.data.length;
        this.gridDataList = resData;
        if (this.gridDataList.length == 0) {
          // 데이터가 존재하지 않습니다.
          utils.messageBox("alert", this.$t('MSG_ALT_NO_DATA'));
          // Grid 초기화
          this.gridDataList = [];
          this.$refs.pgeBsc00002Grid.setRows(this.gridDataList);
          this.totalCnt = this.$refs.pgeBsc00002Grid.getJsonRows().length;
          return;
        }
        this.$refs.pgeBsc00002Grid.setRows(this.gridDataList);
      }).catch((error) => {
        console.log(error);
      });
    },
    // Grid row 클릭 이벤트
    onCellClick(grid, data) {
      this.selectedData = this.gridDataList[data.dataRow];
    },
    // Grid 더블클릭 시 row 데이터 부모창으로 이동 후 팝업창 닫힘
    onDbCellClick(data) {
      const selectedData = this.gridDataList[data.dataRow];
      this.closePagePopup(selectedData);
    },
    // 선택 버튼 클릭 시 onCellClick() row 데이터 부모창으로 이동 후 팝업창 닫힘
    onClickSelect() {
      if (this.selectedData == null) {
        // 매핑티켓을 선택해주세요.
        utils.messageBox("alert", this.$t('MSG_ALT_SEL_MAP_TICKET'));
        return;
      }
      const selectedData = this.selectedData;
      this.closePagePopup(selectedData);
    },
    // 닫기 버튼 클릭시 팝업창 닫힘
    onClickClose() {
      this.closePagePopup("");
    },
    numberWithCommas(number) {
      if (number || number === 0) {
        number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return (!number && number !== 0) ? '' : number
    },
  },
};
</script>
<style scoped></style>