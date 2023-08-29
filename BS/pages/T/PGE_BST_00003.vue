<template>
  <sui-page class="custom_page">
    <div class="modalWrap" style="height: auto">
      <template slot="title">
        <div class="modal-title mb45">{{ $t('MSG_TXT_SEL_MAP_TICKET_TYPE') }}</div>
      </template>
      <template>
        <div class="modal-body">
          <!-- ::S 콘텐츠1 -->
          <ur-form-box toggleable>
            <ur-form-item
              :label="$t('MSG_TXT_PARK_KIND')"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                v-model="parkKind"
                style="width: 100%; height: auto"
                readonly
              />
            </ur-form-item>
            <ur-form-item
              :label="$t('MSG_TXT_ITEM_CD')"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                v-model="itemCd2"
                style="width: 100%; height: auto"
                readonly
              />
            </ur-form-item>
            <ur-form-item
              :label="$t('MSG_TXT_ANNUAL')"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-dropdown v-model="yearCnt" :items="yearCntList" />
            </ur-form-item>
            <ur-form-item
              :label="$t('MSG_TXT_TICKET_ITEM_NM')"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                v-model="itemNm2"
                style="width: 100%; height: auto"
                readonly
              />
            </ur-form-item>
            <ur-form-item
              :label="$t('MSG_TXT_AGE_GROUP')"
              :labelAlign="'right'"
              style="width: 100%; height: auto"
            >
              <ur-text-field
                v-model="ageKind"
                style="width: 100%; height: auto"
                readonly
              />
            </ur-form-item>
          </ur-form-box>
          <ur-form-box toggleable style="margin-top: 20px">
            <ur-form-item
              :label="$t('MSG_TXT_ITEM_KIND')"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-dropdown v-model="itemKind" :items="itemKindList" />
            </ur-form-item>
            <ur-form-item
              :label="$t('MSG_TXT_ITEM_CD')"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                v-model="itemCd"
                maxlength="10"
                style="width: 100%; height: auto"
                mask="##########"
                @keyup.enter="search"
              />
            </ur-form-item>
            <ur-form-item
              :label="$t('MSG_TXT_TICKET_ITEM_NM')"
              :labelAlign="'right'"
              style="width: 100%; height: auto"
            >
              <ur-text-field
                v-model="itemNm"
                maxlength="30"
                style="width: 100%; height: auto"
                @keyup.enter="search"
              />
            </ur-form-item>
          </ur-form-box>
          <div class="btn_wrap mt10">
            <div class="right_box">
              <ur-button type="button" @click="reset">{{ $t('MSG_BTN_RESET') }}</ur-button> <!-- 초기화 -->
              <ur-button v-permission:read="this.$options.name" type="button" color="violet" @click="search">{{ $t('MSG_TXT_SRCH') }}</ur-button> <!-- 조회 -->
            </div>
          </div>
          <!-- ::E 콘텐츠1 -->
          <!-- ::S 콘텐츠2 -->
          <div class="comm_title_wrap mt10">
            <!-- <h4>임시타이틀 영역</h4> -->
            <!--S:: 타이틀 오른쪽 total info -->
            <div class="right_box mt12">
              <div class="totalNo">
                <div class="totalCt">Total<span>{{ numberWithCommas(totalCnt) }}</span>{{ $t('MSG_TXT_CNT') }}</div>
                <!-- info: Total *건 -->
              </div>
            </div>
            <!--E:: 타이틀 오른쪽 total info -->
          </div>
          <real-grid
            ref="pgeBst00003Grid"
            grid-id="pgeBst00003Grid"
            grid-root="/lib"
            :gridFields="gridFields"
            :gridColumns="gridColumns"
            :gridRows="gridDataList"
            :gridCheckBar="{ visible: true }"
            :style="gridStyle"
          />
          <!-- ::E 콘텐츠2 -->
        </div>
      </template>
      <div class="btn_wrap bottom">
        <div class="right_box">
          <ur-button @click="onClickSelect">{{ $t('MSG_BTN_SELT') }}</ur-button> <!-- 선택 -->
          <ur-button @click="onClickClose">{{ $t("MSG_BTN_CLOSE") }}</ur-button> <!-- 닫기 -->
        </div>
      </div>
    </div>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_BST_00003", // eslint-disable-line vue/name-property-casing
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
      parkKind: "",   // 파크구분
      itemCd2: "",    // 권종코드
      yearCnt: "",    // 연차
      yearCntCd: "",  // 연차코드
      itemNm2: "",    // 권종명
      ageKind: "",    // 연령구분
      itemKind: "",
      itemCd: "",
      itemNm: "",
      totalCnt: 0,
      gridDataList: [],
      itemKindList: [],
      yearCntList: [],
      gridStyle: { height: "362px" },
      //select box 전체
      allSelect: {value: '', text: this.$t('MSG_TXT_ALL')}, // 전체
    };
  },
  computed: {

  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    this.gridFields = [
      { fieldName: "itemKind", dataType: "text" },
      { fieldName: "itemCd", dataType: "text" },
      { fieldName: "itemNm", dataType: "text" },
      { fieldName: "ageKind", dataType: "text" },
      { fieldName: "ageKindNm", dataType: "text" },
      { fieldName: "yearCnt", dataType: "text" },
    ];
    this.gridColumns = [
      {
        // 구분
        name: "itemKindColumn",
        fieldName: "itemKind",
        width: 100,
        edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        header: {
          text: this.$t('MSG_TXT_DIV'),
        },
      },
      {
        // 코드ID
        name: "itemCdColumn",
        fieldName: "itemCd",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CODE_ID'),
        },
      },
      {
        // 권종명
        name: "itemNmColumn",
        fieldName: "itemNm",
        width: 200,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TICKET_ITEM_NM'),
        },
      },
      {
        // 연령구분
        name: "ageKindColumn",
        fieldName: "ageKind",
        width: 100,
        edit: false,
        visible: false, // Grid 숨김처리
        header: {
          text: this.$t('MSG_TXT_AGE_GROUP'),
        },
      },
      {
        // 연령구분명
        name: "ageKindNmColumn",
        fieldName: "ageKindNm",
        width: 100,
        edit: false,
        visible: false, // Grid 숨김처리
        header: {
          text: this.$t('MSG_TXT_AGE_GROUP'),
        },
      },
      {
        // 연차
        name: "yearCntColumn",
        fieldName: "yearCnt",
        width: 100,
        edit: false,
        visible: false, // Grid 숨김처리
        header: {
          text: this.$t('MSG_TXT_ANNUAL'),
        },
      },
      {
        // 연차명
        name: "yearCntNmColumn",
        fieldName: "yearCntNm",
        width: 100,
        edit: false,
        visible: false, // Grid 숨김처리
        header: {
          text: this.$t('MSG_TXT_ANNUAL'),
        },
      },
    ];
  },
  mounted() {
    this.getPopupData();
    this.itemKind = "";
    this.itemCd = "";
    this.itemNm = "";
    this.totalCnt = this.$refs.pgeBst00003Grid.getJsonRows().length
    // (조회조건) 연차 공통코드 조회
    http.request(this.$options.name, "DTS_BST_00008", {
      path: { 'code-id': 'COD_Y4'}
    }).then(res => {
      this.yearCntList = res.data
    })
    // this.allSelect >> (조회조건) 전체 포함 권종구분 공통코드 조회
    http.request(this.$options.name, "DTS_BST_00009", {
      path: { 'code-id': 'COD_IT'}
    }).then(res => {
      res.data.unshift(Object.assign({}, this.allSelect))
      this.itemKindList = res.data
    })
  },
  methods: {
    // 초기화
    reset() {
      this.itemKind = "";
      this.itemCd = "";
      this.itemNm = "";
    },
    // PGE_BST_00002 >> 해당 row에서 더블클릭한 pageInitialData 부모창에서 전달된 데이터
    getPopupData() {
      this.parkKind = this.pageInitialData.parkKind;
      this.itemCd2 = this.pageInitialData.itemCd;
      this.yearCnt = this.pageInitialData.yearCntCd;
      this.itemNm2 = this.pageInitialData.itemNm;
      this.ageKind = this.pageInitialData.ageKind;
      this.yearCntCd = this.pageInitialData.yearCntCd;

      if (this.pageInitialData.yearCntCd === "0" || this.pageInitialData.yearCntCd === "") {
        this.$refs.pgeBst00003Grid.gridView.commit()
        this.$refs.pgeBst00003Grid.dataProvider.insertRow(0, {});
        this.$refs.pgeBst00003Grid.setValue(0, "itemKind", "-");
        this.$refs.pgeBst00003Grid.setValue(0, "itemCd", "-");
        this.$refs.pgeBst00003Grid.setValue(0, "itemNm", "-");
      }
    },
    // 조회 파라미터
    getSearchParam() {
      const params = {
        itemKind: this.itemKind,              // 권종구분
        itemCd: utils.trim(this.itemCd),      // 권종코드
        itemNm: utils.trim(this.itemNm),      // 권종명
        itemCd2: utils.trim(this.itemCd2),    // 권종코드2
        yearCnt: utils.trim(this.yearCnt),  // 연차구분
      };
      return params;
    },
    // 조회
    search() {
      if (this.yearCnt === "0" || this.yearCnt === "" || this.yearCnt === null) {
        this.$refs.pgeBst00003Grid.gridView.commit()
        this.$refs.pgeBst00003Grid.setRows([]);
        this.$refs.pgeBst00003Grid.dataProvider.insertRow(0, {});
        this.$refs.pgeBst00003Grid.setValue(0, "itemKind", "-");
        this.$refs.pgeBst00003Grid.setValue(0, "itemCd", "-");
        this.$refs.pgeBst00003Grid.setValue(0, "itemNm", "-");
        this.totalCnt = this.$refs.pgeBst00003Grid.getJsonRows().length;
      } else {
        const params = this.getSearchParam();
        http.request(this.$options.name, "DTS_BST_00007", {
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
            this.$refs.pgeBst00003Grid.setRows(this.gridDataList);
            this.totalCnt = this.$refs.pgeBst00003Grid.getJsonRows().length;
            return;
          }
          this.$refs.pgeBst00003Grid.setRows(this.gridDataList);
          this.$refs.pgeBst00003Grid.gridView.setAllCheck(false);
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    // 선택 버튼 클릭 시 onCellClick() row 데이터 부모창으로 이동 후 팝업창 닫힘
    onClickSelect() {
      const checkedIdxList = this.$refs.pgeBst00003Grid.gridView.getCheckedRows(true);
      const pathData = []
      if (this.$refs.pgeBst00003Grid.getJsonRows()[0].itemCd === "-" &&
          this.$refs.pgeBst00003Grid.getJsonRows()[0].itemKind === "-" &&
          this.$refs.pgeBst00003Grid.getJsonRows()[0].itemNm === "-") {
        const data = false;
        pathData.push(data)
      } else {
        _.forEach(checkedIdxList, idx => {
          let {
                ...data
              } = this.gridDataList[idx];
          pathData.push(data)
        })
      }
      if (pathData.length !== 0) {
        this.closePagePopup(pathData);
      } else {
        // 선택 안했을 때 >> 권종정보를 선택해주세요.
        utils.messageBox("alert", this.$t('MSG_ALT_SEL_TICKET_TYPE_INFO'));
        return;
      }
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
