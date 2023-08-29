<template>
  <sui-page class="custom_page">
    <sui-page-header2 :pageId="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_ANNUAL')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-dropdown v-model="searchParams.yearCnt" :items="yearCntList" />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_PARK_KIND')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-dropdown v-model="searchParams.parkKind" :items="parkKindList" />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_ITEM_CD')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-text-field
            v-model="searchParams.itemCd"
            maxlength="10"
            style="width: 100%; height: auto"
            :mask="inputMask"
            @keyup.enter="search"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_TICKET_ITEM_NM')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-text-field
            v-model="searchParams.itemNm"
            maxlength="30"
            style="width: 100%; height: auto"
            @keyup="specialChar($event,'itemNm')"
            @keyup.enter="search"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_REG_VOUCHER_CD')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-text-field
            v-model="searchParams.newItemCd"
            maxlength="10"
            style="width: 100%; height: auto"
            :mask="inputMask"
            @keyup.enter="search"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_REG_VOUCHER_NM')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-text-field
            v-model="searchParams.newItemNm"
            maxlength="30"
            style="width: 100%; height: auto"
            @keyup="specialChar($event,'newItemNm')"
            @keyup.enter="search"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap">
        <div class="left_box">
          <ur-checkbox v-model="checkAll" sm class="ur-checkbox" />
          <div class="nocompBox">
            <span class="check_label">{{ $t('MSG_BTN_ALL_VIEW') }}</span>
          </div>
        </div>
        <div class="right_box mt10">
          <ur-button type="button" @click="reset">{{ $t('MSG_BTN_RESET') }}</ur-button> <!-- 초기화 -->
          <ur-button v-permission:read="this.$options.name" type="button" @click="search">{{ $t('MSG_TXT_SRCH') }}</ur-button> <!-- 조회 -->
          <ur-button v-permission:create="this.$options.name" type="button" @click="save">{{ $t('MSG_TXT_SAVE') }}</ur-button> <!-- 저장 -->
          <ur-button v-permission:excel="this.$options.name" type="button" color="violet" @click="excelDown">{{ $t('MSG_TXT_EXCEL_DOWNLOAD') }}</ur-button> <!-- 엑셀다운로드 -->
        </div>
      </div>

      <div class="comm_title_wrap mt35">
        <h4 class="pr10">{{ $t('MSG_TXT_ANNUAL_MAP_INFO') }}</h4>
        <ur-button v-permission:delete="this.$options.name" color="violet" @click="checkDelete">{{ $t('MSG_BTN_ROW_DEL') }}</ur-button> <!-- 행삭제 -->
        <!--S:: 타이틀 오른쪽 total info -->
        <div class="right_box">
          <div class="totalNo">
            <div class="totalCt">Total<span>{{ numberWithCommas(totalCnt) }}</span>{{ $t('MSG_TXT_CNT') }}</div>
            <!-- info: Total *건 -->
          </div>
        </div>
        <!--E::: 타이틀 오른쪽 total info -->
      </div>
      <!-- S::컨텐츠1 -->
      <real-grid
        ref="pgeBst00002Grid"
        grid-id="pgeBst00002Grid"
        grid-root="/lib"
        :gridFields="gridFields"
        :gridColumns="gridColumns"
        :gridRows="gridDataList"
        :gridCellClick="gridCellClick"
        :gridDbCellClick="gridDbCellClick"
        :gridEditRowChanged="gridEditRowChanged"
        :gridCellEdited="gridCellEdited"
        :style="gridStyle"
      />
      <!-- E::컨텐츠1-->

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_BST_00002",
  components: {}, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      searchParams: {
        yearCnt: "",
        parkKind: "",
        newItemCd: "",
        newItemNm: "",
        itemCd: "",
        itemNm: "",
      },
      gridDataList: [],
      originList: [],
      nowStateList: [],
      checkList: [],
      paramList: [],
      yearCntList: [],
      parkKindList: [],
      gridStyle: { height: "500px" },
      selectedGridRowData: {},
      // 체크박스
      checkAll: "N",
      //select box 전체
      allSelect: {value: '', text: this.$t('MSG_TXT_ALL')}, // 전체
      totalCnt: 0,
    };
  },
  computed: {
    // Input Mask 처리
    inputMask(val) {
      console.log(val)
      return '##########';
    },
  },
  watch: {},
  created() {
    this.gridFields = [
      { fieldName: "parkKind", dataType: "text" },
      { fieldName: "itemCd", dataType: "text" },
      { fieldName: "itemNm", dataType: "text" },
      { fieldName: "yearCntCd", dataType: "text" },
      { fieldName: "yearCnt", dataType: "text" },
      { fieldName: "newItemCd", dataType: "text" },
      { fieldName: "newItemNm", dataType: "text" },
      { fieldName: "ageKind", dataType: "number" },
      { fieldName: "ageKindNm", dataType: "text" },
      { fieldName: "saleChnlCd", dataType: "text" },
      { fieldName: "saleChnlNm", dataType: "text" },
      { fieldName: "fstRgstUsrId", dataType: "text" },
      { fieldName: "userChkYn", dataType: "text" },
      { fieldName: "fnlMdfcUsrId", dataType: "text" },
      { fieldName: "useYn", dataType: "text" },
    ];
    this.gridColumns = [
      {
        // 파크구분
        name: "parkKindColumn",
        fieldName: "parkKind",
        width: 100,
        edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        header: {
          text: this.$t('MSG_TXT_PARK_KIND'),
        },
        // 셀머지 옵션
        mergeRule: {
            criteria: "value"
        },
      },
      {
        // 권종코드
        name: "itemCdColumn",
        fieldName: "itemCd",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_ITEM_CD'),
        },
        // 셀머지 옵션
        mergeRule: {
            criteria: "value"
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
        // 셀머지 옵션
        mergeRule: {
            criteria: "value"
        },
        renderer: {
          showTooltip: true, // 툴팁여부
        },
      },
      {
        // 연차코드
        name: "yearCntCdColumn",
        fieldName: "yearCntCd",
        width: 100,
        edit: false,
        visible: false, // Grid 숨김처리
        header: {
          text: this.$t('MSG_TXT_ANNUAL'),
        },
      },
      {
        // 연차명
        name: "yearCntColumn",
        fieldName: "yearCnt",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_ANNUAL'),
        },
      },
      {
        // 재가입 권종코드
        name: "newItemCdColumn",
        fieldName: "newItemCd",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_REG_VOUCHER_CD'),
        },
      },
      {
        // 재가입 권종명
        name: "newItemNmColumn",
        fieldName: "newItemNm",
        width: 200,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_REG_VOUCHER_NM'),
        },
        renderer: {
          showTooltip: true,
        },
      },
      {
        // 연령구분코드
        name: "ageKindColumn",
        fieldName: "ageKind",
        width: 100,
        edit: false,
        visible: false,
        header: {
          text: this.$t('MSG_TXT_AGE_GROUP'),
        },
      },
      {
        // 연령구분명
        name: "ageKindNmColumn",
        fieldName: "ageKindNm",
        width: 100,
        // edit: false,
        lookupDisplay: true,
        editButtonVisibility: 'hidden',  // always, default, hidden, rowfocused, visible
        // 소인, 대인
        labels: [
          this.$t('MSG_TXT_CHILD')
          , this.$t('MSG_TXT_AUDULT')
        ],
        values: ["1", "2"],
        editor: {
          type: 'dropdown',
          dropDownCount: 2,
          textReadOnly: true,
          dropDownWhenClick: true,
        },
        header: {
          text: this.$t('MSG_TXT_AGE_GROUP'),
        },
      },
      {
        // 판매채널코드
        name: "saleChnlCdColumn",
        fieldName: "saleChnlCd",
        width: 100,
        edit: false,
        visible: false,
        header: {
          text: this.$t('MSG_TXT_SALE_CHANNEL'),
        },
      },
      {
        // 판매채널명
        name: "saleChnlNmColumn",
        fieldName: "saleChnlNm",
        width: 100,
        // edit: false,
        lookupDisplay: true,
        editButtonVisibility: 'hidden',  // always, default, hidden, rowfocused, visible
        // 겸용, 오프라인, 온라인
        labels: [
          this.$t('MSG_TXT_COMBINE_USE')
          , this.$t('MSG_TXT_OFF_LINE')
          , this.$t('MSG_TXT_ONLINE')
        ],
        values: ["CC01", "CC02", "CC03"],
        editor: {
          type: 'dropdown',
          dropDownCount: 3,
          textReadOnly: true,
          dropDownWhenClick: true,
        },
        header: {
          text: this.$t('MSG_TXT_SALE_CHANNEL'),
        },
      },
      {
        // 최초등록ID
        name: "fstRgstUsrIdColumn",
        fieldName: "fstRgstUsrId",
        width: 100,
        edit: false,
        visible: false,
        header: {
          text: this.$t('MSG_TXT_WORK_CONFIRM'),
        },
      },
      {
        // 근무자확인여부
        name: "userChkYnColumn",
        fieldName: "userChkYn",
        width: 100,
        // edit: false,
        lookupDisplay: true,
        editButtonVisibility: 'hidden',  // always, default, hidden, rowfocused, visible
        labels: ['Y', 'N'],
        values: ["Y", "N"],
        editor: {
          type: 'dropdown',
          dropDownCount: 2,
          textReadOnly: true,
          dropDownWhenClick: true,
        },
        header: {
          text: this.$t('MSG_TXT_WORK_CONFIRM'),
        },
      },
      {
        // 최종수정ID
        name: "fnlMdfcUsrIdColumn",
        fieldName: "fnlMdfcUsrId",
        width: 100,
        edit: false,
        visible: false,
        header: {
          text: this.$t('MSG_TXT_DTST_USE_YN'),
        },
      },
      {
        // 사용여부
        name: "useYnColumn",
        fieldName: "useYn",
        width: 100,
        // edit: false,
        lookupDisplay: true,
        editButtonVisibility: 'hidden',  // always, default, hidden, rowfocused, visible
        labels: ['Y', 'N'],
        values: ["Y", "N"],
        editor: {
          type: 'dropdown',
          dropDownCount: 2,
          textReadOnly: true,
          dropDownWhenClick: true,
        },
        header: {
          text: this.$t('MSG_TXT_DTST_USE_YN'),
        },
      },
    ];
  },
  mounted() {
    this.searchParams.yearCnt = "";     // 연차
    this.searchParams.parkKind = "";    // 파크구분
    this.searchParams.itemCd = "";      // 권종코드
    this.searchParams.itemNm = "";      // 권종명
    this.searchParams.newItemCd = "";   // 재가입 권종코드
    this.searchParams.newItemNm = "";   // 재가입 권종명
    this.checkAll = "N";                // 전체보기 checkbox
    this.selectedGridRowData = "";
    // (조회조건) 전체 포함 연차 공통코드 조회
    http.request(this.$options.name, "DTS_BST_00008", {
      path: { 'code-id': 'COD_Y4'}
    }).then(res => {
      res.data.unshift(Object.assign({}, this.allSelect))
      this.yearCntList = res.data
    })
    // this.allSelect >> (조회조건) 전체 포함 파크구분 공통코드 조회
    http.request(this.$options.name, "DTS_BST_00008", {
      path: { 'code-id': 'COD_PARK_KIND'}
    }).then(res => {
      res.data.unshift(Object.assign({}, this.allSelect))
      this.parkKindList = res.data
    })
  },
  methods: {
    // 초기화
    reset() {
      this.searchParams.yearCnt = "";
      this.searchParams.parkKind = "";
      this.searchParams.itemCd = "";
      this.searchParams.itemNm = "";
      this.searchParams.newItemCd = "";
      this.searchParams.newItemNm = "";
      this.checkAll = "N";
    },
    resetGridRowData() {
      this.selectedGridRowData = "";
    },
    // 리얼그리드 셀 클릭 이벤트
    gridCellClick(grid, data) {
      if (data.dataRow >= 0) {
        this.selectedGridRowData = this.gridDataList[data.dataRow];
      } else {
        this.selectedGridRowData = {};
      }
    },
    // 조회 파라미터
    getSearchParam() {
      const params = {
        yearCnt: this.searchParams.yearCnt, // 연차
        parkKind: this.searchParams.parkKind, // 파크구분
        itemCd: utils.trim(this.searchParams.itemCd), // 권종코드
        itemNm: utils.trim(this.searchParams.itemNm), // 권종명
        newItemCd: utils.trim(this.searchParams.newItemCd), // 재가입 권종코드
        newItemNm: utils.trim(this.searchParams.newItemNm), // 재가입 권종명
        checkAll: this.checkAll, // 전체보기 checkbox
      };
      return params;
    },
    // 삭제 파라미터
    getDeleteParam() {
      const params = {
        itemCd: utils.trim(this.selectedGridRowData.itemCd),
        yearCnt: utils.trim(this.selectedGridRowData.yearCntCd),
        newItemCd: utils.trim(this.selectedGridRowData.newItemCd),
      };
      return params;
    },
    // 조회
    search() {
      // searchParam 조회할 파라미터 값 설정
      const params = this.getSearchParam();
      http.request(this.$options.name, "DTS_BST_00003", {
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
          this.$refs.pgeBst00002Grid.setRows(this.gridDataList);
          this.totalCnt = this.$refs.pgeBst00002Grid.getJsonRows().length;
          return;
        }
        this.originList = this.gridDataList;
        this.$refs.pgeBst00002Grid.setRows(this.gridDataList);
      }).catch((error) => {
        console.log(error);
      });
    },
    // 저장 버튼 클릭시 validation check
    checkValidation() {
      let chkVal = true;
      // 그리드 행 상태값 가져오기
      this.nowStateList = this.$refs.pgeBst00002Grid.getAllStateRows();
      this.checkList = this.$refs.pgeBst00002Grid.getJsonRows();
      if (this.nowStateList.updated.length == 0 && this.nowStateList.created.length == 0) {
        // 변경내용 없음
        return false;
      } else {
        this.paramList = [];
        // 변경내용 있으므로 paramList에 적재
        if (this.nowStateList.updated.length > 0) {
          for (var i = 0; i < this.nowStateList.updated.length; i++) {
            const idx = this.nowStateList.updated[i];
            this.paramList.push({
              newItemCd: utils.trim(this.checkList[idx].newItemCd),
              itemCd: utils.trim(this.checkList[idx].itemCd),
              yearCnt: utils.trim(this.checkList[idx].yearCntCd),
              saleChnlCd: utils.trim(this.checkList[idx].saleChnlCd),
              userChkYn: utils.trim(this.checkList[idx].userChkYn),
              useYn: utils.trim(this.checkList[idx].useYn),
              ageKind: utils.trim(this.checkList[idx].ageKind),
            });
          }
        } else if (this.nowStateList.created.length > 0) {
          for (var i = 0; i < this.nowStateList.created.length; i++) {
            const idx = this.nowStateList.created[i];
            this.paramList.push({
              newItemCd: utils.trim(this.checkList[idx].newItemCd),
              itemCd: utils.trim(this.checkList[idx].itemCd),
              yearCnt: utils.trim(this.checkList[idx].yearCntCd),
              saleChnlCd: utils.trim(this.checkList[idx].saleChnlCd),
              userChkYn: utils.trim(this.checkList[idx].userChkYn),
              useYn: utils.trim(this.checkList[idx].useYn),
              ageKind: utils.trim(this.checkList[idx].ageKind),
            });
          }
        }
      }
      return chkVal;
    },
    // 수정 후 저장 >> 재조회
    save() {
      this.$refs.pgeBst00002Grid.gridView.commit();
      if (!this.checkValidation()) {
        // 변경된 내역이 없습니다.
        utils.messageBox("alert", this.$t('MSG_ALT_NO_CHANGE_DATA'));
        return;
      }
      // this.checkList >> 추가 및 수정 후 현재 그리드에 존재하는 데이터
      // this.originList >> 추가 및 수정 하기 전 그리드에 존재하는 데이터
      if (this.nowStateList.created.length > 0) {
        for (var i = 0; i < this.nowStateList.created.length - 1; i++) {
          for (var j = 0; j < this.originList.lastIndex; j++) {
            if (this.checkList[i].itemCd === this.originList[j].itemCd &&
              this.checkList[i].yearCntCd === this.originList[j].yearCntCd &&
              this.checkList[i].newItemCd === this.originList[j].newItemCd) {
              // 동일한 데이터가 존재합니다.
              utils.messageBox("alert", this.$t("MSG_TXT_SAME_DATA"));
              return;
            }
          }
        }
      }
      // 저장하시겠습니까?
      utils.messageBox("confirm", this.$t('MSG_ALT_IS_SAV_DATA'), null,
        (/* ok */) => {
          http.request(this.$options.name, "DTS_BST_00004", {
            data: this.paramList,
          }).then(() => {
            // 저장되었습니다.
            utils.messageBox("success", this.$t("MSG_ALT_SAVE_DATA"), null, this.search);
            this.resetGridRowData();
          }).catch((error) => {
            console.log(error);
          });
        },
        (/* cancel */) => {}
      );
    },
    checkDelete() {
      this.$refs.pgeBst00002Grid.gridView.commit(true);
      this.nowStateList = this.$refs.pgeBst00002Grid.getAllStateRows();
      this.checkList = this.$refs.pgeBst00002Grid.getJsonRows();
      // 삭제할 데이터를 선택하세요
      if (this.selectedGridRowData === "" || this.selectedGridRowData === null) {
        utils.messageBox("alert", this.$t('MSG_ALT_DEL_DATA_SELT'));
        return;
      }

      var idx = this.checkList.length - this.originList.length - 1;
      var curr = this.$refs.pgeBst00002Grid.gridView.getCurrent();

      if (idx >= curr.dataRow) {
        this.$refs.pgeBst00002Grid.dataProvider.removeRow(curr.dataRow);
        this.$refs.pgeBst00002Grid.gridView.commit(true);
        return;
      }

      this.rowDelete();
    },
    // 삭제 후 재조회
    rowDelete() {
      // 삭제하시겠습니까?
      utils.messageBox("confirm", this.$t('MSG_ALT_DEL'), null,
        (/* ok */) => {
          const params = this.getDeleteParam();
          http.request(this.$options.name, "DTS_BST_00005", {
            query: params,
          }).then(() => {
            // 삭제 되었습니다.
            utils.messageBox("success", this.$t("MSG_ALT_DEL_DATA"), null, this.search);
            this.resetGridRowData();
          }).catch((error) => {
            console.log(error);
          });
        },
        (/* cancel */) => {}
      );
    },
    // Data 조회된 그리드 데이터 엑셀 다운로드
    excelDown() {
      if (this.$refs.pgeBst00002Grid.getJsonRows().length == 0) {
        // 조회된 데이터가 없습니다.
        utils.messageBox("alert", this.$t("MSG_ALT_NO_SERACH_DATA"));
        return;
      }
      this.$refs.pgeBst00002Grid.getExcelDownload(this.$t('MSG_TIT_BS02_MNG'), "PGE_BST_00002");
    },
    // 더블클릭 시 pageInitialData 팝업창으로 데이터 보냄
    gridDbCellClick(clickData) {
      this.selectIndex = clickData.itemIndex;
      utils.openLayerPopup("PGE_BST_00003", this.onPopupCallback, {
        pageInitialData: {
          parkKind: this.selectedGridRowData.parkKind,    // 파크구분
          itemCd: this.selectedGridRowData.itemCd,        // 권종코드
          yearCntCd: this.selectedGridRowData.yearCntCd,  // 연차코드
          yearCnt: this.selectedGridRowData.yearCnt,      // 연차
          itemNm: this.selectedGridRowData.itemNm,        // 권종명
          ageKind: this.selectedGridRowData.ageKindNm,    // 연령구분
        },
        size: "lg",
      });
    },
    // 매핑티켓선택 팝업창에서 더블클릭한 해당 그리드 row에 권종코드, 권종명, 연차 데이터 적용
    onPopupCallback(data) {
      if (data === "" || data === null) {
        
      } else if (data[0] === false) {
        this.$refs.pgeBst00002Grid.dataProvider.insertRow(0, {});
        this.$refs.pgeBst00002Grid.setValue(0, "parkKind", this.selectedGridRowData.parkKind);
        this.$refs.pgeBst00002Grid.setValue(0, "itemCd", this.selectedGridRowData.itemCd);
        this.$refs.pgeBst00002Grid.setValue(0, "itemNm", this.selectedGridRowData.itemNm);
        this.$refs.pgeBst00002Grid.setValue(0, "newItemCd", "X");
        this.$refs.pgeBst00002Grid.setValue(0, "yearCntCd", "0");
        this.$refs.pgeBst00002Grid.setValue(0, "yearCnt", "신규");
        this.$refs.pgeBst00002Grid.setValue(0, "ageKind", this.selectedGridRowData.ageKind);
        this.$refs.pgeBst00002Grid.setValue(0, "ageKindNm", this.selectedGridRowData.ageKindNm);
        this.$refs.pgeBst00002Grid.setValue(0, "saleChnlCd", "CC01");
        this.$refs.pgeBst00002Grid.setValue(0, "saleChnlNm", "겸용");
        this.$refs.pgeBst00002Grid.setValue(0, "userChkYn", "N");
        this.$refs.pgeBst00002Grid.setValue(0, "useYn", "Y");
        this.$refs.pgeBst00002Grid.gridView.commit(true);
      } else {
        data.forEach(node => {
          const { itemCd } = node;
          if (utils.findIndex(this.gridDataList.data, { itemCd }) === -1) {
            node.__selected = false;
            // 매핑티켓선택팝업 >> 넘겨온 데이터 맨 윗줄에 추가
            this.$refs.pgeBst00002Grid.dataProvider.insertRow(0, {});
            // 권종선택 팝업에서 넘겨온 데이터를 insertRow 된 맨 위 index(0) 추가 (파크구분, 권종코드, 권종명)
            this.$refs.pgeBst00002Grid.setValue(0, "parkKind", this.selectedGridRowData.parkKind);
            this.$refs.pgeBst00002Grid.setValue(0, "itemCd", this.selectedGridRowData.itemCd);
            this.$refs.pgeBst00002Grid.setValue(0, "itemNm", this.selectedGridRowData.itemNm);
            // 권종선택 팝업에서 넘겨온 데이터를 insertRow 된 맨 위 index(0) 추가 (재가입 권종코드, 재가입 권종명)
            this.$refs.pgeBst00002Grid.setValue(0, "newItemCd", node.itemCd);
            this.$refs.pgeBst00002Grid.setValue(0, "newItemNm", node.itemNm);
            // 권종선택 팝업에서 넘겨온 데이터를 insertRow 된 맨 위 index(0) 추가 (연령구분, 연령구분명)
            this.$refs.pgeBst00002Grid.setValue(0, "ageKind", node.ageKind);
            this.$refs.pgeBst00002Grid.setValue(0, "ageKindNm", node.ageKindNm);
            // 권종선택 팝업에서 넘겨온 데이터를 insertRow 된 맨 위 index(0) 추가 (연차코드, 연차명)
            this.$refs.pgeBst00002Grid.setValue(0, "yearCntCd", node.yearCnt);
            this.$refs.pgeBst00002Grid.setValue(0, "yearCnt", node.yearCntNm);
            // 권종선택 팝업에서 넘겨온 데이터를 insertRow 된 맨 위 index(0) 추가 (판매채널코드, 판매채널명)
            this.$refs.pgeBst00002Grid.setValue(0, "saleChnlCd", "CC01");
            this.$refs.pgeBst00002Grid.setValue(0, "saleChnlNm", "겸용");
            // 권종선택 팝업에서 넘겨온 데이터를 insertRow 된 맨 위 index(0) 추가 (근무자확인여부)
            this.$refs.pgeBst00002Grid.setValue(0, "userChkYn", "N");
            // 권종선택 팝업에서 넘겨온 데이터를 insertRow 된 맨 위 index(0) 추가 (사용여부)
            this.$refs.pgeBst00002Grid.setValue(0, "useYn", "Y");
            this.$refs.pgeBst00002Grid.gridView.commit(true);
          }
        });
      }
      this.totalCnt = this.$refs.pgeBst00002Grid.getJsonRows().length;
    },
    // 그리드 row 변경시 이벤트
    gridEditRowChanged(grid, itemIndex, dataRow, field, oldValue, newValue) {
      this.$refs.pgeBst00002Grid.gridView.commit();
      // 현재 그리드 데이터
      this.checkList = this.$refs.pgeBst00002Grid.getJsonRows();
      let dateChk = false;

      if (dateChk) {
        // 그리드 커밋하고, oldData로 원복, row 업데이트 none
        grid.commit();
        this.$refs.pgeBst00002Grid.setValue(itemIndex, this.gridColumns[field-1].fieldName, oldValue);
        this.$refs.pgeBst00002Grid.onNoneRow(dataRow);
        return;
      }

      grid.commit();
      this.$refs.pgeBst00002Grid.setValue(itemIndex, this.gridColumns[field-1].fieldName, newValue);

      // 변경된 데이터가 처음데이터와 같은지 체크 issueDate expireDate
      if (this.checkList[itemIndex].newItemCd == this.originList[itemIndex].newItemCd) {
        this.$refs.pgeBst00002Grid.onNoneRow(dataRow);
      }

      this.$refs.pgeBst00002Grid.onUpdRow(itemIndex);
      this.nowStateList = this.$refs.pgeBst00002Grid.getAllStateRows();
    },
    // 특수문자 체크
    specialChar(event, type) {
      let searchNewText = ''
      if (type === 'itemNm') {
        searchNewText = this.searchParams.itemNm
      } else {
        searchNewText = this.searchParams.newItemNm
      }
      if (utils.isExistSpecialChar(searchNewText)) {
        // `-_{}[];:<>/? 제외 특수문자는 입력할 수 없습니다.
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          if (type === 'itemNm') {
            this.searchParams.itemNm = ''
          } else {
            this.searchParams.newItemNm = ''
          }
        });
      }
    },
    numberWithCommas(number) {
      if (number || number === 0) {
        number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return (!number && number !== 0) ? '' : number
    },
    gridCellEdited(grid, itemIndex, row, field) {
      grid.commit(true);
    },
  },
};
</script>
<style scoped></style>
