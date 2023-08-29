<template>
  <sui-page class="custom_page">
    <div class="modalWrap" style="height: auto">
      <template slot="title">
        <div class="modal-title mb45">{{ $t('MSG_TXT_TICKET_TYPE_SEL') }}</div>
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
              <ur-dropdown v-model="parkKind" :items="parkKindList" />
            </ur-form-item>
            <ur-form-item
              :label="$t('MSG_TXT_TIME_DIV')"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-dropdown v-model="timeSetting" :items="timeSettingList" />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              :label="$t('MSG_TXT_ITEM_KIND')"
              :labelAlign="'right'"
              style="width: 50%; height: auto; border: 0"
            >
              <ur-dropdown v-model="itemKind" :items="itemKindList" />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              :label="$t('MSG_TXT_ITEM_CD')"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                v-model="itemCd"
                maxlength="10"
                style="width: 100%; height: auto"
                :mask="inputMask"
                @keyup.enter="search"
              />
            </ur-form-item>
            <ur-form-item
              :label="$t('MSG_TXT_TICKET_ITEM_NM')"
              :labelAlign="'right'"
              style="width: 100%; height: auto"
            >
              <ur-text-field
                v-model="itemName"
                maxlength="30"
                style="width: 100%; height: auto"
                @keyup="specialChar"
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
          <div class="comm_title_wrap mt10">
            <h4>{{ $t('MSG_TXT_ITEM_LIST') }}</h4> <!-- 권종리스트 -->
            <!--S:: 타이틀 오른쪽 total info -->
            <div class="right_box">
              <div class="totalNo">
                <div class="totalCt">Total<span>{{ numberWithCommas(totalCnt) }}</span>{{ $t('MSG_TXT_CNT') }}</div>
              </div>
            </div>
            <!--E::: 타이틀 오른쪽 total info -->
          </div>
          <real-grid
            ref="pgeBsa00002Grid"
            grid-id="pgeBsa00002Grid"
            grid-root="/lib"
            :gridFields="gridFields"
            :gridColumns="gridColumns"
            :gridRows="gridDataList"
            :gridCheckBar="{ visible: true }"
            :style="gridStyle"
          />
          <!-- ::E 콘텐츠1 -->
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
  name: "PGE_BSA_00002", // eslint-disable-line vue/name-property-casing
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
      itemKind: "",     // 권종구분
      itemCd: "",       // 권종코드
      itemName: "",     // 권종명
      parkKind: "",     // 파크구분
      timeSetting: "",  // 시간구분
      year: "",
      parkKindList: [],
      timeSettingList: [],
      itemKindList: [],
      gridDataList: [],
      gridStyle: { height: "400px" },
      // select box 전체
      allSelect: {value: "", text: this.$t('MSG_TXT_ALL')}, // 전체
      totalCnt: 0,
    };
  },
  computed: {
    // Input Mask 처리
    inputMask() {
      return '##########';
    },
  },
  watch: {},
  created() {
    this.gridFields = [
      { fieldName: "itemKind", dataType: "text" },
      { fieldName: "itemCd", dataType: "text" },
      { fieldName: "parkKind", dataType: "text" },
      { fieldName: "timeSetting", dataType: "text" },
      { fieldName: "itemName", dataType: "text" },
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
        // 파크구분
        name: "parkKindColumn",
        fieldName: "parkKind",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_PARK_KIND'),
        },
      },
      {
        // 시간
        name: "timeSettingColumn",
        fieldName: "timeSetting",
        width: 120,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TIME'),
        },
        renderer: {
          showTooltip: true,
        },
      },
      {
        // 권종명
        name: "itemNameColumn",
        fieldName: "itemName",
        width: 250,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TICKET_ITEM_NM'),
        },
        renderer: {
          showTooltip: true,
        },
      },
    ];
  },
  mounted() {
    this.itemKind = "";
    this.itemCd = "";
    this.itemName = "";
    this.parkKind = "";
    this.timeSetting = "";
    this.year = this.pageInitialData.year;
    this.itemCdList = this.pageInitialData.itemCdList;
    // this.allSelect >> (조회조건) 전체 포함 파크구분 공통코드 조회
    http.request(this.$options.name, "DTS_BST_00008", {
      path: { 'code-id': 'COD_PARK_KIND'}
    }).then(res => {
      res.data.unshift(Object.assign({}, this.allSelect))
      this.parkKindList = res.data
    })
    // this.allSelect >> (조회조건) 전체 포함 시간구분 공통코드 조회
    http.request(this.$options.name, "DTS_BST_00008", {
      path: { 'code-id': 'COD_TS'}
    }).then(res => {
      res.data.unshift(Object.assign({}, this.allSelect))
      this.timeSettingList = res.data
    })
    // this.allSelect >> (조회조건) 전체 포함 권종구분 공통코드 조회
    http.request(this.$options.name, "DTS_BST_00008", {
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
      this.itemName = "";
      this.parkKind = "";
      this.timeSetting = "";
    },
    // 조회 parameter
    getSearchParam() {
      const itemCdList = [];

      if (this.itemCdList !== null && this.itemCdList !== "") {
        utils.forEach(JSON.parse(this.itemCdList), item => {
          itemCdList.push(item.itemCd);
        });
      } 
      
      const params = {
        itemKind: this.itemKind,              // 권종구분
        itemCd: utils.trim(this.itemCd),      // 권종코드
        itemName: utils.trim(this.itemName),  // 권종명
        parkKind: this.parkKind,              // 파크구분
        timeSetting: this.timeSetting,        // 시간구분
        year: this.year,
        itemCdList: itemCdList.join(','),
      };
      return params;
    },
    // 조회
    search() {
      const params = this.getSearchParam();
      http.request(this.$options.name, "DTS_BSA_00010", {
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
          this.$refs.pgeBsa00002Grid.setRows(this.gridDataList);
          this.totalCnt = this.$refs.pgeBsa00002Grid.getJsonRows().length;
          return;
        }
        this.$refs.pgeBsa00002Grid.setRows(this.gridDataList);
        this.$refs.pgeBsa00002Grid.gridView.setAllCheck(false);
      }).catch((error) => {
        console.log(error);
      });
    },
    // 팝업 선택버튼 >> 선택 후 팝업 close
    onClickSelect() {
      const checkedIdxList = this.$refs.pgeBsa00002Grid.gridView.getCheckedRows(true);
      const pathData = []
      _.forEach(checkedIdxList, idx => {
        let {
              ...data
            } = this.gridDataList[idx];
        pathData.push(data)
      })
      if (pathData.length !== 0) {
        this.closePagePopup(pathData);
      } else {
        // 선택 안했을 때 >> 권종정보를 선택해주세요.
        utils.messageBox("alert", this.$t('MSG_ALT_SEL_TICKET_TYPE_INFO'));
        return;
      }
    },
    // 팝업 닫기버튼
    onClickClose() {
      this.closePagePopup("");
    },
    // 특수문자 체크
    specialChar() {
      const searchNewText = utils.trim(this.itemName);
      if (utils.isExistSpecialChar(searchNewText)) {
        // `-_{}[];:<>/? 제외 특수문자는 입력할 수 없습니다.
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.itemName = ''
        });
      }
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
