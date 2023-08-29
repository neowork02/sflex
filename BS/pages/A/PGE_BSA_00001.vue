<template>
  <sui-page class="custom_page">
    <sui-page-header2 :pageId="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_YEAR')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
          required
        >
          <ur-year-picker v-model="searchParams.stndDt" autoConfirm />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button type="button" @click="reset">{{ $t("MSG_BTN_RESET") }}</ur-button> <!-- 초기화 -->
          <ur-button v-permission:read="this.$options.name" type="button" color="violet" @click="searchValid">{{ $t("MSG_TXT_SRCH") }}</ur-button> <!-- 조회 -->
        </div>
      </div>
      <!-- S::가용일계획+가용일관리+가용일 권종정보 관리 -->
      <div class="comm_shut_wrap mt30">
        <div class="inbox7">
          <!-- S::Inner -->
          <div class="inner">
            <div class="inbox">
              <!-- S::가용일계획 -->
              <div class="comm_title_wrap">
                <h4 class="pr10">{{ $t("MSG_TXT_AVAIL_PLAN") }}</h4>
                <ur-button v-permission:create="this.$options.name" type="button" color="violet" @click="checkAddPlan">{{
                  $t("MSG_BTN_NEW")
                }}</ur-button> <!-- 신규(추가) -->
                <ur-button v-permission:update="this.$options.name" type="button" color="violet" @click="saveValidation">{{
                  $t("MSG_TXT_SAVE")
                }}</ur-button> <!-- 저장 -->
                <ur-button v-permission:delete="this.$options.name" type="button" color="violet" @click="checkDelete">{{
                  $t("MSG_BTN_DEL")
                }}</ur-button> <!-- 삭제 -->
              </div>
              <real-grid
                ref="pgeBsa00001Grid1"
                grid-id="pgeBsa00001Grid1"
                grid-root="/lib"
                :gridFields="gridFields1"
                :gridColumns="gridColumns1"
                :gridRows="gridDataList1"
                :gridCheckBar="{ visible: true }"
                :gridCellClick="gridCellClick1"
                :style="gridStyle1"
                :gridEditRowChanged="gridEditRowChanged"
              />
              <!-- E::가용일계획 -->
            </div>
            <div class="emptybox" />
            <div class="inbox">
              <!-- S::가용일관리 -->
              <div class="comm_title_wrap">
                <h4 class="pr10">{{ $t("MSG_TXT_AVAIL_MANAGE") }}</h4>
                <ur-button v-permission:create="this.$options.name" type="button" color="violet" @click="saveMn">{{
                  $t("MSG_TXT_SAVE")
                }}</ur-button> <!-- 저장 -->
                <!--S:: 타이틀 오른쪽 -->
                <div class="right_box">
                  <ur-dropdown
                    v-model="month"
                    ref="month"
                    :items="monthList"
                    style="width: 200px"
                  />
                </div>
                <!--E::: 타이틀 오른쪽 -->
              </div>
              <real-grid
                ref="pgeBsa00001Grid2"
                grid-id="pgeBsa00001Grid2"
                grid-root="/lib"
                :gridFields="gridFields2"
                :gridColumns="gridColumns2"
                :gridRows="gridDataList2"
                :gridHeaderClick="gridHeaderClick"
                :gridCellClick="gridCellClick2"
                :gridEditRowChanged="gridEditRowChanged2"
                :style="gridStyle2"
              />
              <!-- E::가용일관리 -->
            </div>
          </div>
          <!-- E::Inner -->
        </div>
        <div class="emptybox" />
        <div class="inbox3">
          <!-- S::가용일 권종정보 관리 -->
          <div class="comm_title_wrap">
            <h4 class="pr10">{{ $t("MSG_TXT_AVAIL_TICKET_INFO_MANAGE") }}</h4>
            <ur-button v-permission:create="this.$options.name" type="button" color="violet" @click="popup()">{{
              $t("MSG_TXT_ADD_TICKET_TYPE")
            }}</ur-button> <!-- 권종추가 -->
            <ur-button v-permission:delete="this.$options.name" type="button" color="violet" @click="checkDelete2">{{
              $t("MSG_BTN_ROW_DEL")
            }}</ur-button> <!-- 행삭제 -->
            <ur-button v-permission:update="this.$options.name" type="button" color="violet" @click="infoSave">{{
              $t("MSG_TXT_SAVE")
            }}</ur-button> <!-- 저장 -->
          </div>
          <real-grid
            ref="pgeBsa00001Grid4"
            grid-id="pgeBsa00001Grid4"
            grid-root="/lib"
            :gridFields="gridFields4"
            :gridColumns="gridColumns4"
            :gridRows="gridDataList4"
            :gridCheckBar="{ visible: true }"
            :gridCellClick="gridCellClick4"
            :style="gridStyle4"
          />
          <!-- [2023-04-06] 수정 -->
          <!-- S::board_list_type2 -->
          <div class="board_list_type2 mt20">
            <table>
              <caption></caption>
              <colgroup>
                <col width="*" />
                <col width="*" />
                <col width="*" />
                <col width="*" />
              </colgroup>
              <thead>
                <tr>
                  <th>{{ $t("MSG_TXT_DAY_OF_WEEK") }}</th> <!-- 요일구분 -->
                  <th>{{ $t("MSG_TXT_DIV") }}</th> <!-- 구분 -->
                  <th>{{ $t("MSG_TXT_AVAIL_DATE") }}</th> <!-- 가용일 -->
                  <th>{{ $t("MSG_TXT_NAVAIL_DATE") }}</th> <!-- 비가용일 -->
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowspan="2">{{ $t("MSG_TXT_WEEKDAY") }}</td> <!-- 평일 -->
                  <!-- 왼쪽/오른쪽 정렬일 경우 td에 클래스 추가(기본설정 중앙정렬) : class="left"/class="right"/ -->
                  <td>{{ $t("MSG_TXT_EL") }}</td> <!-- EL -->
                  <td>{{ weekElYcnt }}</td>
                  <td>{{ weekElNcnt }}</td>
                </tr>
                <tr>
                  <td>{{ $t("MSG_TXT_CB") }}</td> <!-- CB -->
                  <td>{{ weekCbYcnt }}</td>
                  <td>{{ weekCbNcnt }}</td>
                </tr>
                <tr>
                  <td rowspan="2">{{ $t("MSG_TXT_DAY_SATURDAY") }}</td> <!-- 토요일 -->
                  <td>{{ $t("MSG_TXT_EL") }}</td> <!-- EL -->
                  <td>{{ sunElYcnt }}</td>
                  <td>{{ sunElNcnt }}</td>
                </tr>
                <tr>
                  <td>{{ $t("MSG_TXT_CB") }}</td> <!-- CB -->
                  <td>{{ sunCbYcnt }}</td>
                  <td>{{ sunCbNcnt }}</td>
                </tr>
                <tr>
                  <td rowspan="2">{{ $t("MSG_TXT_HLDY_CAL") }}</td> <!-- 휴일 -->
                  <td>{{ $t("MSG_TXT_EL") }}</td> <!-- EL -->
                  <td>{{ holiElYcnt }}</td>
                  <td>{{ holiElNcnt }}</td>
                </tr>
                <tr>
                  <td>{{ $t("MSG_TXT_CB") }}</td> <!-- CB -->
                  <td>{{ holiCbYcnt }}</td>
                  <td>{{ holiCbNcnt }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td rowspan="2">{{ $t("MSG_TXT_TOTAL") }}</td> <!-- 계 -->
                  <td>{{ $t("MSG_TXT_EL") }}</td> <!-- EL -->
                  <td>{{ sumElYcnt }}</td>
                  <td>{{ sumElNcnt }}</td>
                </tr>
                <tr>
                  <td>{{ $t("MSG_TXT_CB") }}</td> <!-- CB -->
                  <td>{{ sumCbYcnt }}</td>
                  <td>{{ sumCbNcnt }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <!-- E::board_list_type2 -->
          <!-- //[2023-04-06] 수정 -->
          <!-- E::가용일 권종정보 관리 -->
        </div>
      </div>
      <!-- E::가용일계획+가용일관리+가용일 권종정보 관리 -->

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_BSA_00001",
  components: {}, // eslint-disable-line vue/name-property-casing
  filters: {},
  data() {
    return {
      searchParams: {
        stndDt: null,
      },
      today: utils.now("YYYY"),
      year: null,
      lastYear: null,
      lastPlanName: null,
      lastDetail: null,
      clickCheck: false,
      clickCheck2: false,
      month: null,
      rowCheck: false,
      headerCheck: false,
      sumData: null,
      weekElYcnt: null,
      weekElNcnt: null,
      weekCbYcnt: null,
      weekCbNcnt: null,
      sunElYcnt: null,
      sunElNcnt: null,
      sunCbYcnt: null,
      sunCbNcnt: null,
      holiElYcnt: null,
      holiElNcnt: null,
      holiCbYcnt: null,
      holiCbNcnt: null,
      sumElYcnt: null,
      sumElNcnt: null,
      sumCbYcnt: null,
      sumCbNcnt: null,
      // 가용일 계획 Grid
      gridDataList1: [],
      selectedGridRowData: {},
      gridStyle1: { height: "629px" },
      checkList: [],
      paramList: [],
      paramList2: [],
      originList: [],
      nowStateList: [],
      monthList: [],
      // 가용일 관리 Grid
      gridDataList2: [],
      selectedGridRowData2: {},
      gridStyle2: { height: "629px" },
      // 가용일 권종정보 관리 Grid
      gridDataList4: [],
      selectedGridRowData4: {},
      gridStyle4: { height: "238px" },
      // select box 전체
      allSelect: {value: "", text: this.$t('MSG_TXT_ALL')}, // 전체
      dayWeekKind: null,
    };
  },
  computed: {

  },
  watch: {
    // 가용일 권종정보 관리 하단 요일구분에 따른 sumData
    sumData(newVal, oldVal) {
      if (newVal) {
        this.weekElYcnt = utils.numberWithCommas(newVal[0].elYcnt); // 평일 EL 가용일
        this.weekElNcnt = utils.numberWithCommas(newVal[0].elNcnt); // 평일 EL 비가용일
        this.weekCbYcnt = utils.numberWithCommas(newVal[0].cbYcnt); // 평일 CB 가용일
        this.weekCbNcnt = utils.numberWithCommas(newVal[0].cbNcnt); // 평일 CB 비가용일
        this.sunElYcnt = utils.numberWithCommas(newVal[1].elYcnt); // 토요일 EL 가용일
        this.sunElNcnt = utils.numberWithCommas(newVal[1].elNcnt); // 토요일 EL 비가용일
        this.sunCbYcnt = utils.numberWithCommas(newVal[1].cbYcnt); // 토요일 CB 가용일
        this.sunCbNcnt = utils.numberWithCommas(newVal[1].cbNcnt); // 토요일 CB 비가용일
        this.holiElYcnt = utils.numberWithCommas(newVal[2].elYcnt); // 휴일 EL 가용일
        this.holiElNcnt = utils.numberWithCommas(newVal[2].elNcnt); // 휴일 EL 비가용일
        this.holiCbYcnt = utils.numberWithCommas(newVal[2].cbYcnt); // 휴일 CB 가용일
        this.holiCbNcnt = utils.numberWithCommas(newVal[2].cbNcnt); // 휴일 CB 비가용일
        this.sumElYcnt = utils.numberWithCommas(
          parseInt(this.weekElYcnt) +
            parseInt(this.sunElYcnt) +
            parseInt(this.holiElYcnt)
        );
        this.sumElNcnt = utils.numberWithCommas(
          parseInt(this.weekElNcnt) +
            parseInt(this.sunElNcnt) +
            parseInt(this.holiElNcnt)
        );
        this.sumCbYcnt = utils.numberWithCommas(
          parseInt(this.weekCbYcnt) +
            parseInt(this.sunCbYcnt) +
            parseInt(this.holiCbYcnt)
        );
        this.sumCbNcnt = utils.numberWithCommas(
          parseInt(this.weekCbNcnt) +
            parseInt(this.sunCbNcnt) +
            parseInt(this.holiCbNcnt)
        );
      }
    },
    month: {
      deep: true,
      handler() {
        if (this.gridDataList1.length > 0) {
          this.nowStateList = this.$refs.pgeBsa00001Grid2.getAllStateRows();
          // 해당연도 1~12 월 01~31일 setting
          if (this.month > '00') {
            this.searchStartMonth = (this.searchParams.stndDt + this.month + "01");
            this.searchEndMonth = (this.searchParams.stndDt + this.month + "31");
          // 전체 >> 해당연도 + 0101 ~ 해당년도 + 1231
          } else {
            this.searchStartMonth = (this.searchParams.stndDt + "0101");
            this.searchEndMonth = (this.searchParams.stndDt + "1231");
          }
          if (this.rowCheck || this.headerCheck) {
            if (this.month === "" || this.month === null) {
              this.selectMonth();
              return;
            } else {
              this.checkSelectMonth();
              return;
            }
          }
          this.selectMonth();
        }
      },
    },
  },
  created() {
    // 가용일 계획 Grid
    (this.gridFields1 = [
      { fieldName: "year", dataType: "text" },
      { fieldName: "planNo", dataType: "text" },
      { fieldName: "planName", dataType: "text" },
      { fieldName: "detail", dataType: "text" },
    ]),
      // 가용일 관리 Grid
      (this.gridFields2 = [
        { fieldName: "ymd", dataType: "text" },
        { fieldName: "dayWeekKind", dataType: "text" },
        { fieldName: "dayWeekKindNm", dataType: "text" },
        { fieldName: "fstRgstUsrId", dataType: "text" },
        { fieldName: "elEnableYn", dataType: "text" },
        { fieldName: "fnlMdfcUsrId", dataType: "text" },
        { fieldName: "cbEnableYn", dataType: "text" },
      ]),
      //가용일 권종정보 관리 Grid
      (this.gridFields4 = [
        { fieldName: "itemKind", dataType: "text" },
        { fieldName: "itemCd", dataType: "text" },
        { fieldName: "parkKind", dataType: "text" },
        { fieldName: "timeSetting", dataType: "text" },
        { fieldName: "itemName", dataType: "text" },
      ]);
    this.gridColumns1 = [
      {
        // 연도
        name: "yearColumn",
        fieldName: "year",
        width: 50,
        edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        header: {
          text: this.$t("MSG_TXT_YR"),
        },
      },
      {
        // 관리번호
        name: "planNoColumn",
        fieldName: "planNo",
        width: 50,
        edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        visible: false, // Grid 숨김처리
        header: {
          text: this.$t("MSG_TXT_YR"),
        },
      },
      {
        // 가용계획명
        name: "planNameColumn",
        fieldName: "planName",
        width: 150,
        edit: true,
        editor: {
          maxLength: 100
        },
        header: {
          text: this.$t("MSG_TXT_AVAIL_PLAN_NM"),
        },
        renderer: {
          showTooltip: true, // 툴팁여부
        },
      },
      {
        // 상세설명
        name: "detailColumn",
        fieldName: "detail",
        width: 100,
        edit: true,
        editor: {
          maxLength: 100
        },
        header: {
          text: this.$t("MSG_TXT_DETAIL_DESCRIPT"),
        },
        renderer: {
          showTooltip: true,
        },
      },
    ];
    this.gridColumns2 = [
      {
        // 일자
        name: "ymdColumn",
        fieldName: "ymd",
        width: 100,
        edit: false,
        header: {
          text: this.$t("MSG_TXT_DT"),
        },
      },
      {
        // 요일구분코드 (01, 03, 04)
        name: "dayWeekKindColumn",
        fieldName: "dayWeekKind",
        width: 100,
        edit: false,
        visible: false,
        header: {
          text: this.$t('MSG_TXT_DAY_OF_WEEK'),
        },
      },
      {
        // 요일구분명
        name: "dayWeekKindNmColumn",
        fieldName: "dayWeekKindNm",
        width: 100,
        // edit: false,
        lookupDisplay: true,
        editButtonVisibility: 'hidden',  // always, default, hidden, rowfocused, visible
        // 평일, 토요일, 휴일
        labels: [
          this.$t("MSG_TXT_WEEKDAY")
          , this.$t("MSG_TXT_DAY_SATURDAY")
          , this.$t("MSG_TXT_HLDY_CAL")
        ],
        values: ["01", "03", "04"],
        editor: {
          type: 'dropdown',
          dropDownCount: 3,
          textReadOnly: true,
          dropDownWhenClick: true,
        },
        header: {
          text: this.$t("MSG_TXT_DAY_OF_WEEK"),
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
          text: this.$t('MSG_TXT_FST_REG_USERID'),
        },
      },
      {
        // E/L
        name: "elEnableYnColumn",
        fieldName: "elEnableYn",
        width: 60,
        header: {
          text: this.$t("MSG_TXT_E_L"), // 에버랜드 가용여부 체크박스
          checkLocation: "right",
        },
        checked: false,
        renderer: {
          type: "html",
          callback: function (grid, cell, w, h) {
            const dataRowIndex = cell.index.dataRow;
            // value 값이 Y 일 때 check되어 노출
            var checked = cell.value >= "Y" ? "checked" : "";
            return (
              "<input type='checkbox' style='margin-left:6px' value = '" +
              cell.value +
              "'" +
              checked +
              " name='checkbox + " +
              dataRowIndex +
              "'/>"
            );
          },
        },
        edit: false,
      },
      {
        // 최종수정ID
        name: "fnlMdfcUsrIdColumn",
        fieldName: "fnlMdfcUsrId",
        width: 100,
        edit: false,
        visible: false,
        header: {
          text: this.$t('MSG_TXT_FNL_MDF_USERID'),
        },
      },
      {
        // C/B
        name: "cbEnableYnColumn",
        fieldName: "cbEnableYn",
        width: 60,
        header: {
          text: this.$t("MSG_TXT_C_B"), // 캐리비안베이 가용여부 체크박스
          checkLocation: "right",
        },
        checked: false,
        renderer: {
          type: "html",
          callback: function (grid, cell, w, h) {
            const dataRowIndex = cell.index.dataRow;
            var checked = cell.value >= "Y" ? "checked" : "";
            return (
              "<input type='checkbox' style='margin-left:6px' value = '" +
              cell.value +
              "'" +
              checked +
              " name='checkbox + " +
              dataRowIndex +
              "'/>"
            );
          },
        },
        edit: false,
      },
    ];
    this.gridColumns4 = [
      {
        // 구분
        name: "itemKindColumn",
        fieldName: "itemKind",
        width: 100,
        edit: false,
        header: {
          text: this.$t("MSG_TXT_DIV"),
        },
      },
      {
        // 권종코드
        name: "itemCdColumn",
        fieldName: "itemCd",
        width: 100,
        edit: false,
        header: {
          text: this.$t("MSG_TXT_ITEM_CD"),
        },
      },
      {
        // 파크
        name: "parkKindColumn",
        fieldName: "parkKind",
        width: 100,
        edit: false,
        header: {
          text: this.$t("MSG_TXT_PARK"),
        },
      },
      {
        // 시간
        name: "timeSettingColumn",
        fieldName: "timeSetting",
        width: 100,
        edit: false,
        header: {
          text: this.$t("MSG_TXT_TIME"),
        },
        renderer: {
          showTooltip: true,
        },
      },
      {
        // 권종명
        name: "itemNameColumn",
        fieldName: "itemName",
        width: 150,
        edit: false,
        header: {
          text: this.$t("MSG_TXT_TICKET_ITEM_NM"),
        },
        renderer: {
          showTooltip: true,
        },
      },
    ];
  },
  mounted() {
    this.searchParams.stndDt = this.today; // 해당연도 (YYYY) 로 setting
    this.selectedGridRowData = "";
    this.selectedGridRowData2 = "";
    this.selectedGridRowData4 = "";
    this.month = "";
    this.clickCheck = false;
    this.clickCheck2 = false;
    this.rowCheck = false;
    this.headerCheck = false;
    // this.allSelect >> (조회조건) 전체 포함 월(1월~12월) 공통코드 조회
    http.request(this.$options.name, "DTS_BST_00008", {
      path: { 'code-id': 'COD_A4'}
    }).then(res => {
      res.data.unshift(Object.assign({}, this.allSelect))
      this.monthList = res.data
    })
  },
  methods: {
    // 초기화
    reset() {
      this.searchParams.stndDt = this.today;
      this.selectedGridRowData = "";
      this.selectedGridRowData2 = "";
      this.selectedGridRowData4 = "";
      this.clickCheck = false;
      this.clickCheck2 = false;
    },
    // 데이터 row data 선택 초기화
    resetGridRowData() {
      this.selectedGridRowData = "";
      this.selectedGridRowData2 = "";
      this.selectedGridRowData4 = "";
    },
    // 가용일 계획 Grid 이벤트 START
    // 조회 validation check
    searchValid() {
      if ( this.searchParams.stndDt === "" || this.searchParams.stndDt === null ) {
        // 조회년도를 입력해주세요.
        utils.messageBox("alert", this.$t("MSG_ALT_ENTER_INQ_YEAR"));
        return;
      }
      this.search();
    },
    // 조회 파라미터
    getSearchParam() {
      const params = {
        stndDt: this.searchParams.stndDt, // 조회년도
      };
      return params;
    },
    // 조회 (가용일 계획)
    search() {
      this.$refs.pgeBsa00001Grid1.gridView.commit();
      const params = this.getSearchParam();
      http
        .request("PGE_BSA_00001", "DTS_BSA_00001", {
          query: params,
        })
        .then((res) => {
          const resData = res.data;
          this.gridDataList1 = resData;
          if (this.gridDataList1.length == 0) {
            // 데이터가 존재하지 않습니다.
            utils.messageBox("alert", this.$t('MSG_ALT_NO_DATA'));
            // 가용일 계획 Grid 초기화
            this.$refs.pgeBsa00001Grid1.setRows([]);
            // 가용일 관리 Grid 초기화
            this.$refs.pgeBsa00001Grid2.setRows([]);
            // 가용일 권종정보 관리 Grid 초기화
            this.$refs.pgeBsa00001Grid4.setRows([]);
            // 가용일 권종정보 관리 Grid 하단 sumData 초기화
            this.sumDataList();
            return;
          }
          this.clickCheck = false;
          this.originList = this.gridDataList1;
          this.$refs.pgeBsa00001Grid1.setRows(this.gridDataList1);
          // 해더체크박스 check >> false
          this.$refs.pgeBsa00001Grid1.gridView.setAllCheck(false);
          this.$refs.pgeBsa00001Grid4.gridView.setAllCheck(false);
          // 가용일 관리 && 가용일 권종정보 관리 && sumData 동시 조회
          this.search2();
          this.search3();
          this.search4();
          // 월 (dropdown) 초기화
          this.month = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 가용일 계획 신규(추가) 버튼 클릭
    checkAddPlan() {
      this.$refs.pgeBsa00001Grid1.gridView.commit();
      // 마지막 lastIndex 값 구하기
      const lastIndex = this.$refs.pgeBsa00001Grid1.getJsonRows().length;
      // 가용일 계획 Gird 마지막 row 추가
      this.$refs.pgeBsa00001Grid1.onAddRow();
      // 조회년도에 해당되는 (연도) 세팅
      this.$refs.pgeBsa00001Grid1.setValue(lastIndex, "year", this.searchParams.stndDt);
      this.$refs.pgeBsa00001Grid1.setValue(lastIndex, "planName", null);
      this.$refs.pgeBsa00001Grid1.setValue(lastIndex, "detail", null);
      this.$refs.pgeBsa00001Grid1.gridView.commit();
    },
    saveValidation() {
      if (!this.checkValidation()) {
        // 변경된 내역이 없습니다.
        utils.messageBox("alert", this.$t("MSG_ALT_NO_CHANGE_DATA"));
        return;
      }
      // 추가할 때, validation check
      const insertIdxList = [
        ...this.$refs.pgeBsa00001Grid1.getAllStateRows().created
      ];
      for (var i = insertIdxList[0]; i <= insertIdxList.lastItem; i++) {
        if (this.$refs.pgeBsa00001Grid1.getJsonRows()[i].planName == null || this.$refs.pgeBsa00001Grid1.getJsonRows()[i].planName == "") {
          // 가용계획명을 입력해주세요.
          utils.messageBox("alert", this.$t('MSG_ALT_ENTER_AVAIL_PLAN_NM'));
          return;
        }
        if (this.$refs.pgeBsa00001Grid1.getJsonRows()[i].detail == null || this.$refs.pgeBsa00001Grid1.getJsonRows()[i].detail == "") {
          // 상세설명을 입력해주세요.
          utils.messageBox("alert", this.$t('MSG_ALT_ENTER_DETAIL_DESCRIPT'));
          return;
        }
      }
      // 수정할 때, validation check
      const updateIdxList = [
        ...this.$refs.pgeBsa00001Grid1.getAllStateRows().updated
      ];
      for (var i = 0; i < updateIdxList.length; i++) {
        if (this.$refs.pgeBsa00001Grid1.getJsonRows()[updateIdxList[i]].planName == null || this.$refs.pgeBsa00001Grid1.getJsonRows()[updateIdxList[i]].planName == "") {
          // 가용계획명을 입력해주세요.
          utils.messageBox("alert", this.$t('MSG_ALT_ENTER_AVAIL_PLAN_NM'));
          return;
        }
        if (this.$refs.pgeBsa00001Grid1.getJsonRows()[updateIdxList[i]].detail == null || this.$refs.pgeBsa00001Grid1.getJsonRows()[updateIdxList[i]].detail == "") {
          // 상세설명을 입력해주세요.
          utils.messageBox("alert", this.$t('MSG_ALT_ENTER_DETAIL_DESCRIPT'));
          return;
        }
      }
      this.savePlan();
    },
    // 가용일 계획 저장 버튼 클릭
    savePlan() {
      this.checkedList = this.$refs.pgeBsa00001Grid1.getCheckedItems();
      const rowState = this.$refs.pgeBsa00001Grid1.getAllStateRows();
      // (추가-insert) 일 때
      if (rowState.created.length > 0 && rowState.updated.length == 0) {
        const changeIdxList = [
          ...this.$refs.pgeBsa00001Grid1.getAllStateRows().created
        ];
        let changeList = [];
        utils.forEach(changeIdxList, (dataRow) => {
          let jsonRow = this.$refs.pgeBsa00001Grid1.getJsonRows()[dataRow];
          jsonRow.year = this.searchParams.stndDt;
          jsonRow.planName = this.$refs.pgeBsa00001Grid1.getJsonRows()[dataRow].planName;
          jsonRow.detail = this.$refs.pgeBsa00001Grid1.getJsonRows()[dataRow].detail;
          changeList.push(jsonRow);
        });
        let paramList = [...changeList]
        // 저장하시겠습니까?
        utils.messageBox("confirm", this.$t("MSG_ALT_IS_SAV_DATA"), null,
          (/* ok */) => {
            http.request(this.$options.name, "DTS_BSA_00006", {
              data: paramList,
            }).then(() => {
              this.clickCheck = false;
              this.clickCheck2 = false;
              // 저장되었습니다. >> 저장(추가) 후 재조회
              utils.messageBox("success", this.$t("MSG_ALT_SAVE_DATA"), null, this.search);
              this.resetGridRowData();
            })
            .catch((error) => {
              console.log(error);
            });
          },
          (/* cancel */) => {}
        );
      // (수정-update) 일 때,
      } else if (rowState.updated.length > 0 && rowState.created.length == 0) {
        const changeIdxList = [
          ...this.$refs.pgeBsa00001Grid1.getAllStateRows().updated
        ];
        let changeList = [];
        utils.forEach(changeIdxList, (dataRow) => {
          let jsonRow = this.$refs.pgeBsa00001Grid1.getJsonRows()[dataRow];
          jsonRow.year = this.searchParams.stndDt;
          jsonRow.planNo = this.$refs.pgeBsa00001Grid1.getJsonRows()[dataRow].planNo;
          jsonRow.planName = this.$refs.pgeBsa00001Grid1.getJsonRows()[dataRow].planName;
          jsonRow.detail = this.$refs.pgeBsa00001Grid1.getJsonRows()[dataRow].detail;
          changeList.push(jsonRow);
        });
        let paramList = [...changeList]
        // 저장하시겠습니까
        utils.messageBox("confirm", this.$t("MSG_ALT_IS_SAV_DATA"), null,
          (/* ok */) => {
            http.request(this.$options.name, "DTS_BSA_00007", {
                data: paramList,
            })
            .then(() => {
              this.clickCheck = false;
              this.clickCheck2 = false;
              // 저장되었습니다. >> 저장(수정) 후 재조회
              utils.messageBox("success", this.$t("MSG_ALT_SAVE_DATA"), null, this.search);
              this.resetGridRowData();
            })
            .catch((error) => {
              console.log(error);
            });
          },
          (/* cancel */) => {}
        );
      } else if (rowState.created.length > 0 && rowState.updated.length > 0) {
        const changeIdxList = [
          ...this.$refs.pgeBsa00001Grid1.getAllStateRows().created
          ,...this.$refs.pgeBsa00001Grid1.getAllStateRows().updated
        ];

        let changeList = [];
        utils.forEach(changeIdxList, (dataRow) => {
          let jsonRow = this.$refs.pgeBsa00001Grid1.getJsonRows()[dataRow];
          jsonRow.year = this.searchParams.stndDt;
          jsonRow.planNo = this.$refs.pgeBsa00001Grid1.getJsonRows()[dataRow].planNo;
          jsonRow.planName = this.$refs.pgeBsa00001Grid1.getJsonRows()[dataRow].planName;
          jsonRow.detail = this.$refs.pgeBsa00001Grid1.getJsonRows()[dataRow].detail;
          changeList.push(jsonRow);
        });
        let paramList = [...changeList]

        // 저장하시겠습니까
        utils.messageBox("confirm", this.$t("MSG_ALT_IS_SAV_DATA"), null,
          (/* ok */) => {
            http.request(this.$options.name, "DTS_BSA_00007", {
                data: paramList,
            })
            .then(() => {
              this.clickCheck = false;
              this.clickCheck2 = false;
              // 저장되었습니다. >> 저장(수정) 후 재조회
              utils.messageBox("success", this.$t("MSG_ALT_SAVE_DATA"), null, this.search);
              this.resetGridRowData();
            })
            .catch((error) => {
              console.log(error);
            });
          },
          (/* cancel */) => {}
        );
      }
    },
    // 가용일 계획 삭제 버튼 클릭
    checkDelete() {
      this.$refs.pgeBsa00001Grid1.gridView.commit();
      this.checkedList = this.$refs.pgeBsa00001Grid1.getCheckedItems();
      let rowState = this.$refs.pgeBsa00001Grid1.getAllStateRows();
      if (this.checkedList === "" || this.checkedList === null || this.checkedList.length == 0) {
        // 삭제할 데이터를 선택하세요
        utils.messageBox("alert", this.$t("MSG_ALT_DEL_DATA_SELT"));
        return;
      }
      // check row 데이터가 추가한 데이터에 포함되어있는지 체크
      const interSec = rowState.created.filter(x => this.checkedList.includes(x));
      // 추가 버튼을 누른 후 입력하지 않은 addRow >> 삭제
      if (JSON.stringify(interSec) === JSON.stringify(this.checkedList)) {
        this.$refs.pgeBsa00001Grid1.onDelRow(this.checkedList);
        return;
      }
      this.deletePlan();
    },
    deletePlan() {
      const changeIdxList = [
        ...this.$refs.pgeBsa00001Grid1.getCheckedItems()
      ];
      let changeList = [];
      utils.forEach(changeIdxList, (dataRow) => {
        let jsonRow = this.$refs.pgeBsa00001Grid1.getJsonRows()[dataRow];
        jsonRow.planNo = this.$refs.pgeBsa00001Grid1.getJsonRows()[dataRow].planNo, // 관리번호
        jsonRow.year = utils.trim(this.searchParams.stndDt), // 적용년도
        changeList.push(jsonRow);
      });
      let paramList = [...changeList]
      // 삭제하시겠습니까?
      utils.messageBox("confirm", this.$t("MSG_ALT_DEL"), null,
        (/* ok */) => {
          http.request(this.$options.name, "DTS_BSA_00008", {
            data: paramList,
          })
          .then(() => {
            // 체크된 row 가져오기 return Array
            this.$refs.pgeBsa00001Grid1.onDelRow(this.checkedList);
            this.clickCheck = false;
            this.clickCheck2 = false;
            // 삭제 되었습니다. >> 삭제 후 재조회
            utils.messageBox("success", this.$t("MSG_ALT_DEL_DATA"), null, this.search);
            this.resetGridRowData();
          })
          .catch((error) => {
            console.log(error);
          });
        },
        (/* cancel */) => {}
      );
    },
    // 가용일 관리 >> 월 조회 파라미터
    getSearchMonthParam() {
      // 가용일 계획 Grid row data 선택되었을 때,
      if (this.clickCheck) {
        const params = {
          planNo: utils.trim(this.selectedGridRowData.planNo),
          searchStartMonth: utils.trim(this.searchStartMonth),
          searchEndMonth: utils.trim(this.searchEndMonth),
        };
        return params;
      } else {
        const params = {
          planNo: utils.trim(this.gridDataList1[0].planNo),
          searchStartMonth: utils.trim(this.searchStartMonth),
          searchEndMonth: utils.trim(this.searchEndMonth),
        };
        return params;
      }
    },
    checkSelectMonth() {
      this.nowStateList = this.$refs.pgeBsa00001Grid2.getAllStateRows();
      this.checkValidation2()
      if (this.nowStateList.updated.length > 0) {
        // 변경된 가용일이 있습니다. 저장하시겠습니까?	
        utils.messageBox("confirm", this.$t("MSG_ALT_AVAIL_DAY_CHANGE_SAVE"), null,
          (/* ok */) => {
            http.request(this.$options.name, "DTS_BSA_00009", {
            data: this.paramList2,
          }).then(() => {
            this.clickCheck = false;
            this.clickCheck2 = false;
            this.rowCheck = false;
            this.headerCheck = false;
            // 저장되었습니다.
            utils.messageBox("success", this.$t("MSG_ALT_SAVE_DATA"), null, null);
            // 가용일 관리 >> E/L 헤더 체크박스 초기화 false
            var elCheckColumn = this.$refs.pgeBsa00001Grid2.gridView.columnByName("elEnableYnColumn");
            elCheckColumn.checked = false;
            // 가용일 관리 >> C/B 헤더 체크박스 초기화 false
            var cbCheckColumn = this.$refs.pgeBsa00001Grid2.gridView.columnByName("cbEnableYnColumn");
            cbCheckColumn.checked = false;
            this.selectMonth();
            this.resetGridRowData();
          })
          .catch((error) => {
            console.log(error);
          });
        },
        (/* cancel */) => {}
        );
        return;
      } else {

      }
      this.selectMonth();
    },
    // 월(dropdown) 선택에 따른 조회
    selectMonth() {
      const params = this.getSearchMonthParam();
      http.request("PGE_BSA_00001", "DTS_BSA_00016", {
        query: params,
      })
      .then((res) => {
        const resData = res.data;
        // 일자 data format (YYYY-MM-DD)
        utils.map(resData, data => {
          data.ymd = _.isNull(data.ymd) ? data.ymd : utils.toStringByFormat(utils.toDate(data.ymd), "YYYY-MM-DD");
        });
        this.gridDataList2 = resData;
        this.originList = this.gridDataList2;
        this.$refs.pgeBsa00001Grid2.setRows(this.gridDataList2);
        // 가용일 관리 >> E/L 헤더 체크박스 초기화 false
        var elCheckColumn = this.$refs.pgeBsa00001Grid2.gridView.columnByName("elEnableYnColumn");
        elCheckColumn.checked = false;
        // 가용일 관리 >> C/B 헤더 체크박스 초기화 false
        var cbCheckColumn = this.$refs.pgeBsa00001Grid2.gridView.columnByName("cbEnableYnColumn");
        cbCheckColumn.checked = false;
      })
      .catch((error) => {
        console.log(error);
      });
    },
    // 가용일 관리 조회 파라미터
    getSearchParam2() {
      // 가용일 계획 Grid row data 선택되었을 때 >> 조회년도, 관리번호로 가용일 관리 data 조회
      if (this.clickCheck) {
        const params = {
          stndDt: this.searchParams.stndDt, // 조회년도
          planNo: utils.trim(this.selectedGridRowData.planNo), // 관리번호
        };
        return params;
      } else {
        const params = {
          stndDt: this.searchParams.stndDt, // 조회년도
          planNo: utils.trim(this.gridDataList1[0].planNo), // 관리번호
        };
        return params;
      }
    },
    // 조회 (가용일 관리)
    search2() {
      const params = this.getSearchParam2();
      http
        .request("PGE_BSA_00001", "DTS_BSA_00003", {
          query: params,
        })
        .then((res) => {
          const resData = res.data;
          utils.map(resData, data => {
            data.ymd = _.isNull(data.ymd) ? data.ymd : utils.toStringByFormat(utils.toDate(data.ymd), "YYYY-MM-DD");
          });
          this.gridDataList2 = resData;
          this.originList = this.gridDataList2;
          this.$refs.pgeBsa00001Grid2.setRows(this.gridDataList2);
          // 가용일 관리 >> E/L 헤더 체크박스 초기화 false
          var elCheckColumn = this.$refs.pgeBsa00001Grid2.gridView.columnByName("elEnableYnColumn");
          elCheckColumn.checked = false;
          // 가용일 관리 >> C/B 헤더 체크박스 초기화 false
          var cbCheckColumn = this.$refs.pgeBsa00001Grid2.gridView.columnByName("cbEnableYnColumn");
          cbCheckColumn.checked = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 가용일 관리 저장 버튼 클릭
    saveMn() {
      if (!this.checkValidation2()) {
        // 변경된 내역이 없습니다.
        utils.messageBox("alert", this.$t("MSG_ALT_NO_CHANGE_DATA"));
        return;
      }
      // 저장하시겠습니까?
      utils.messageBox("confirm", this.$t("MSG_ALT_IS_SAV_DATA"), null,
        (/* ok */) => {
          http.request(this.$options.name, "DTS_BSA_00009", {
            data: this.paramList2,
          }).then(() => {
            this.clickCheck = false;
            this.clickCheck2 = false;
            this.rowCheck = false;
            this.headerCheck = false;
            // 저장되었습니다.
            utils.messageBox("success", this.$t("MSG_ALT_SAVE_DATA"), null, null);
            // 가용일 관리 >> E/L 헤더 체크박스 초기화 false
            var elCheckColumn = this.$refs.pgeBsa00001Grid2.gridView.columnByName("elEnableYnColumn");
            elCheckColumn.checked = false;
            // 가용일 관리 >> C/B 헤더 체크박스 초기화 false
            var cbCheckColumn = this.$refs.pgeBsa00001Grid2.gridView.columnByName("cbEnableYnColumn");
            cbCheckColumn.checked = false;
            this.resetGridRowData();
          })
          .catch((error) => {
            console.log(error);
          });
        },
        (/* cancel */) => {}
      );
    },
    // 가용일 관리 Grid 이벤트 END
    // 가용일 관리 sum Grid 이벤트 START
    getSearchParam3() {
      // 가용일 계획 Grid row data 선택되었을 때
      // 조회년도, 관리번호로 가용일 관리 data 조회에 따른 가용일 관리 sum Data 조회
      if (this.clickCheck) {
        const params = {
          stndDt: this.searchParams.stndDt, // 조회년도
          planNo: utils.trim(this.selectedGridRowData.planNo), // 관리번호
        };
        return params;
      } else {
        const params = {
          stndDt: this.searchParams.stndDt, // 조회년도
          planNo: utils.trim(this.gridDataList1[0].planNo), // 관리번호
        };
        return params;
      }
    },
    // 가용일 관리 sum 조회
    search3() {
      const params = this.getSearchParam3();
      http.request("PGE_BSA_00001", "DTS_BSA_00004", {
        query: params,
      })
      .then((res) => {
        this.sumData = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    },
    // 가용일 관리 sum Grid 이벤트 END
    // 가용일 권종정보 관리 Grid 이벤트 START
    getSearchParam4() {
      if (this.clickCheck) {
        const params = {
          stndDt: this.searchParams.stndDt, // 조회년도
          planNo: utils.trim(this.selectedGridRowData.planNo), // 관리번호
        };
        return params;
      } else {
        const params = {
          stndDt: this.searchParams.stndDt, // 조회년도
          planNo: utils.trim(this.gridDataList1[0].planNo), // 관리번호
        };
        return params;
      }
    },
    // 가용일 권종정보 관리 조회
    search4() {
      const params = this.getSearchParam4();
      http.request("PGE_BSA_00001", "DTS_BSA_00005", {
        query: params,
      })
      .then((res) => {
        this.gridDataList4 = res.data;
        this.$refs.pgeBsa00001Grid4.setRows(this.gridDataList4);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    // 가용일 권종정보 관리 권종추가 버튼 클릭
    popup() {
      // 권종선택 팝업 openLayer
      utils.openLayerPopup("PGE_BSA_00002", this.onPopupCallback, {
        pageInitialData: {
          year: utils.trim(this.searchParams.stndDt),
          itemCdList: null
        },
        size: "lg",
      });
    },
    onPopupCallback(data) {
      if (data) {
        data.forEach(node => {
          const { itemCd } = node;
          if (utils.findIndex(this.gridDataList4.data, { itemCd }) === -1) {
            node.__selected = false;
            // 가용일 권종정보 관리 Grid 줄 (넘어온 data.length 만큼) 추가
            this.$refs.pgeBsa00001Grid4.onAddRow(node);
            // 마지막 lastIndex 값 구하기
            const lastIndex = this.$refs.pgeBsa00001Grid4.getJsonRows().lastIndex;
            // 권종선택 팝업에서 넘겨온 데이터를 addRow 된 lastIndex 추가 (구분)
            this.$refs.pgeBsa00001Grid4.setValue(lastIndex, "itemKind", node.itemKind);
            // 권종선택 팝업에서 넘겨온 데이터를 addRow 된 lastIndex 추가 (권종코드)
            this.$refs.pgeBsa00001Grid4.setValue(lastIndex, "itemCd", node.itemCd);
            // 권종선택 팝업에서 넘겨온 데이터를 addRow 된 lastIndex 추가 (권종명)
            this.$refs.pgeBsa00001Grid4.setValue(lastIndex, "itemName", node.itemName);
            // 권종선택 팝업에서 넘겨온 데이터를 addRow 된 lastIndex 추가 (파크)
            this.$refs.pgeBsa00001Grid4.setValue(lastIndex, "parkKind", node.parkKind);
            // 권종선택 팝업에서 넘겨온 데이터를 addRow 된 lastIndex 추가 (시간)
            this.$refs.pgeBsa00001Grid4.setValue(lastIndex, "timeSetting", node.timeSetting);
          }
        });
      }
    },
    // 가용일 권종정보 관리 행삭제 버튼 클릭
    checkDelete2() {
      this.$refs.pgeBsa00001Grid4.gridView.commit();
      this.checkedList = this.$refs.pgeBsa00001Grid4.getCheckedItems();
      let rowState = this.$refs.pgeBsa00001Grid4.getAllStateRows();
      if (utils.isEmpty(this.checkedList) || this.checkedList.length == 0) {
        // 삭제할 데이터를 선택하세요
        utils.messageBox("alert", this.$t("MSG_ALT_DEL_DATA_SELT"));
        return;
      }
      // check row 데이터가 추가한 데이터에 포함되어있는지 체크
      const interSec = rowState.created.filter(x => this.checkedList.includes(x));
      // 추가 버튼을 누른 후 입력하지 않은 addRow >> 삭제
      if (JSON.stringify(interSec) === JSON.stringify(this.checkedList)) {
        this.$refs.pgeBsa00001Grid4.onDelRow(this.checkedList);
        return;
      }
      const changeIdxList = [
        ...this.$refs.pgeBsa00001Grid4.getCheckedItems()
      ];
      let changeList = [];
      utils.forEach(changeIdxList, (dataRow) => {
        let jsonRow = this.$refs.pgeBsa00001Grid4.getJsonRows()[dataRow];
        changeList.push(jsonRow);
      });
      let paramList = [...changeList]
      // 삭제하시겠습니까?
      utils.messageBox("confirm", this.$t("MSG_ALT_DEL"), null,
        (/* ok */) => {
          http.request(this.$options.name, "DTS_BSA_00011", {
            data: paramList,
          })
          .then(() => {
            this.clickCheck = false;
            this.clickCheck2 = false;
            // 삭제 되었습니다. >> 삭제 후 재조회
            utils.messageBox("success", this.$t("MSG_ALT_DEL_DATA"), null, this.research);
            this.selectedGridRowData2 = "";
            this.selectedGridRowData4 = "";
          })
          .catch((error) => {
            console.log(error);
          });
        },
        (/* cancel */) => {}
      );
    },
    // 가용일 권종정보 관리 권종추가 저장 버튼 클릭
    infoSave() {
      this.nowStateList = this.$refs.pgeBsa00001Grid4.getAllStateRows();
      if (this.nowStateList.created.length == 0) {
        // 변경된 내역이 없습니다.
        utils.messageBox("alert", this.$t("MSG_ALT_NO_CHANGE_DATA"));
        return;
      }
      // created >> 생성(추가) 상태인 row 데이터
      const changeIdxList = [
        ...this.$refs.pgeBsa00001Grid4.getAllStateRows().created
      ];
      let changeList = [];
      utils.forEach(changeIdxList, (dataRow) => {
        let jsonRow = this.$refs.pgeBsa00001Grid4.getJsonRows()[dataRow];
        jsonRow.planNo = utils.trim(this.selectedGridRowData.planNo);
        changeList.push(jsonRow);
      });
      let paramList = [...changeList]
      // 저장하시겠습니까?
      utils.messageBox("confirm", this.$t("MSG_ALT_IS_SAV_DATA"), null,
        (/* ok */) => {
          http.request(this.$options.name, "DTS_BSA_00013", {
            data: paramList,
          }).then(() => {
            this.clickCheck = false;
            this.clickCheck2 = false;
            // 저장되었습니다.
            utils.messageBox("success", this.$t("MSG_ALT_SAVE_DATA"), null, this.research);
            this.selectedGridRowData2 = "";
            this.selectedGridRowData4 = "";
          })
          .catch((error) => {
            console.log(error);
          });
        },
        (/* cancel */) => {}
      );
    },
    // 가용일 관리 >> check box 헤더 셀 클릭 이벤트
    gridHeaderClick(grid, col, chk) {
      this.headerCheck = true;
      this.nowStateList = this.$refs.pgeBsa00001Grid2.getAllStateRows();
      // E/L 컬럼 >> check box 헤더 클릭시 전체 체크 or 미체크
      if (col.name === "elEnableYnColumn") {
        this.cellCheckList = this.$refs.pgeBsa00001Grid2.getJsonRows();
        this.cellCheckList = _.map(this.cellCheckList, data => {
          data = {
            ...data,
            elEnableYn: chk == true ? 'Y' : 'N'
          };
          return data;
        });
        this.$refs.pgeBsa00001Grid2.setRows(this.cellCheckList);
      }
      // C/B 컬럼 >> check box 헤더 클릭시 전체 체크 or 미체크
      if (col.name === "cbEnableYnColumn") {
        this.cellCheckList = this.$refs.pgeBsa00001Grid2.getJsonRows();
        this.cellCheckList = _.map(this.cellCheckList, data => {
          data = {
            ...data,
            cbEnableYn: chk == true ? 'Y' : 'N'
          };
          return data;
        });
        this.$refs.pgeBsa00001Grid2.setRows(this.cellCheckList);
      }
    },
    // 가용일 관리 sumData
    sumDataList() {
      this.sumData = null;
      this.weekElYcnt = null;
      this.weekElNcnt = null;
      this.weekCbYcnt = null;
      this.weekCbNcnt = null;
      this.sunElYcnt = null;
      this.sunElNcnt = null;
      this.sunCbYcnt = null;
      this.sunCbNcnt = null;
      this.holiElYcnt = null;
      this.holiElNcnt = null;
      this.holiCbYcnt = null;
      this.holiCbNcnt = null;
      this.sumElYcnt = null;
      this.sumElNcnt = null;
      this.sumCbYcnt = null;
      this.sumCbNcnt = null;
    },
    // 가용일 계획 Grid 셀 클릭 이벤트
    gridCellClick1(grid, data) {
      if (this.$refs.pgeBsa00001Grid1.gridRows.length - 1 >= data.dataRow) {
        // 가용일 계획 Grid row data 클릭 시 clickCheck = true
        this.clickCheck = true;
        this.selectedGridRowData = this.gridDataList1[data.dataRow];
        this.sumDataList();
        this.search2();
        this.search3();
        this.search4();
        this.month = "";
      } else {
        this.selectedGridRowData = {};
        this.$refs.pgeBsa00001Grid2.setRows(null);
        this.sumDataList();
      }
    },
    // 가용일 관리 Grid 셀 클릭 이벤트
    gridCellClick2(grid, data) {
      this.rowCheck = true;
      if (data.dataRow >= 0) {
        this.selectedGridRowData2 = this.gridDataList2[data.dataRow];
      } else {
        this.selectedGridRowData2 = {};
      }
      // 셀 체크박스 (E/L, C/B)
      if (data.column === "elEnableYnColumn" || data.column === "cbEnableYnColumn") {
        let chkNow = grid.getValue(data.itemIndex, data.fieldName);
        this.$refs.pgeBsa00001Grid2.setValue(
          data.itemIndex,
          data.fieldName,
          chkNow == "N" ? "Y" : "N"
        );
        grid.commit();
      }
    },
    // 가용일 권종정보 관리 Grid 셀 클릭 이벤트
    gridCellClick4(grid, data) {
      if (data.dataRow >= 0) {
        // 가용일 권종정보 관리 Grid row data 클릭 시 clickCheck = true
        this.clickCheck2 = true;
        this.selectedGridRowData4 = this.gridDataList4[data.dataRow];
      } else {
        this.selectedGridRowData4 = {};
      }
    },
    // 가용일 계획 Grid row 변경시 이벤트 (추가(등록), 수정)
    gridEditRowChanged(grid, itemIndex, dataRow, field, oldValue, newValue) {
      // 현재 그리드 데이터
      this.$refs.pgeBsa00001Grid1.gridView.commit();
      this.checkList = this.$refs.pgeBsa00001Grid1.getJsonRows();
      let dateChk = false;

      if (dateChk) {
        // 그리드 커밋하고, oldData로 원복, row 업데이트 none
        grid.commit();
        this.$refs.pgeBsa00001Grid1.setValue(itemIndex, this.gridColumns[field].fieldName, oldValue);
        this.$refs.pgeBsa00001Grid1.onNoneRow(dataRow);
        return;
      }

      this.$refs.pgeBsa00001Grid1.setValue(itemIndex, this.gridColumns[field].fieldName, newValue);
      // 변경된 데이터가 처음데이터와 같은지 체크 issueDate expireDate
      if (
        this.checkList[itemIndex].planName ==
          this.originList[itemIndex].planName &&
        this.checkList[itemIndex].detail == this.originList[itemIndex].detail
      ) {
        this.$refs.pgeBsa00001Grid1.onNoneRow(dataRow);
      }
      this.$refs.pgeBsa00001Grid1.onUpdRow(itemIndex);
      this.nowStateList = this.$refs.pgeBsa00001Grid1.getAllStateRows();
    },
    // 가용일 계획 Grid 변경내용 확인
    checkValidation() {
      let chkVal = true;

      // 그리드 행 상태값 가져오기
      this.nowStateList = this.$refs.pgeBsa00001Grid1.getAllStateRows();
      this.checkList = this.$refs.pgeBsa00001Grid1.getJsonRows();

      if (this.nowStateList.created.length == 0 && this.nowStateList.updated.length == 0) {
        // 변경내용 없음
        return false;
      }
      return chkVal;
    },
    // 가용일 관리 Grid row 변경시 이벤트
    gridEditRowChanged2(grid, itemIndex, dataRow, field, oldValue, newValue) {
      this.$refs.pgeBsa00001Grid2.gridView.commit();
      this.rowCheck = true;
      // 현재 그리드 데이터
      this.checkList = this.$refs.pgeBsa00001Grid2.getJsonRows();
      let dateChk = false;

      if (dateChk) {
        // 그리드 커밋하고, oldData로 원복, row 업데이트 none
        grid.commit();
        this.$refs.pgeBsa00001Grid2.setValue(itemIndex, this.gridColumns[field-1].fieldName, oldValue);
        this.$refs.pgeBsa00001Grid2.onNoneRow(dataRow);
        return;
      }
      
      this.$refs.pgeBsa00001Grid2.setValue(itemIndex, this.gridColumns[field-1].fieldName, newValue);
      // 변경된 데이터가 처음데이터와 같은지 체크 issueDate expireDate
      if (this.checkList[itemIndex].elEnableYn == this.originList[itemIndex].elEnableYn &&
          this.checkList[itemIndex].cbEnableYn == this.originList[itemIndex].cbEnableYn) {
        this.$refs.pgeBsa00001Grid2.onNoneRow(dataRow);
      }
      this.$refs.pgeBsa00001Grid2.onUpdRow(itemIndex);
      this.nowStateList = this.$refs.pgeBsa00001Grid2.getAllStateRows();
    },
    // 가용일 권종정보 관리 Grid 변경내용 확인
    checkValidation2() {
      let chkVal = true;
      // 그리드 행 상태값 가져오기
      this.nowStateList = this.$refs.pgeBsa00001Grid2.getAllStateRows();
      this.checkList = this.$refs.pgeBsa00001Grid2.getJsonRows();
      if (this.nowStateList.updated.length == 0 && !this.rowCheck && !this.headerCheck) {
        // 변경내용 없음
        return false;
      } else {
        if (this.rowCheck) {
          // 변경내용 있으므로 paramList2에 적재
          this.paramList2 = [];
          // 가용일 권종정보 관리 Grid 수정된 파라미터 >> paramList2 에 push
          for (var i = 0; i < this.nowStateList.updated.length; i++) {
            const idx = this.nowStateList.updated[i];
            const ymd = utils.trim(this.checkList[idx].ymd.replace(/-/g, ""));
            const elEnableYn = utils.trim(this.checkList[idx].elEnableYn);
            const cbEnableYn = utils.trim(this.checkList[idx].cbEnableYn);

            if(this.checkList[idx].dayWeekKindNm === this.$t("MSG_TXT_WEEKDAY")) {
              this.dayWeekKind = "01";
            } else if (this.checkList[idx].dayWeekKindNm === this.$t("MSG_TXT_DAY_SATURDAY")) {
              this.dayWeekKind = "03";
            } else if (this.checkList[idx].dayWeekKindNm === this.$t("MSG_TXT_HLDY_CAL")){
              this.dayWeekKind = "04";
            } else {
              this.dayWeekKind = utils.trim(this.checkList[idx].dayWeekKindNm);
            }

            this.paramList2.push({
              planNo: utils.trim(this.selectedGridRowData.planNo),
              ymd: ymd,
              dayWeekKind: this.dayWeekKind,
              elEnableYn: elEnableYn,
              cbEnableYn: cbEnableYn,
            });
          }
        } else {
          // 변경내용 있으므로 paramList2에 적재
          this.paramList2 = [];
          // 가용일 권종정보 관리 Grid 수정된 파라미터 >> paramList2 에 push
          for (var i = 0; i < this.checkList.length - 1; i++) {
            const ymd = utils.trim(this.checkList[i].ymd.replace(/-/g, ""));
            const elEnableYn = utils.trim(this.checkList[i].elEnableYn);
            const cbEnableYn = utils.trim(this.checkList[i].cbEnableYn);

            if(this.checkList[i].dayWeekKindNm === this.$t("MSG_TXT_WEEKDAY")) {
              this.dayWeekKind = "01";
            } else if (this.checkList[i].dayWeekKindNm === this.$t("MSG_TXT_DAY_SATURDAY")) {
              this.dayWeekKind = "03";
            } else if (this.checkList[i].dayWeekKindNm === this.$t("MSG_TXT_HLDY_CAL")){
              this.dayWeekKind = "04";
            } else {
              this.dayWeekKind = utils.trim(this.checkList[i].dayWeekKindNm);
            }

            this.paramList2.push({
              planNo: utils.trim(this.selectedGridRowData.planNo),
              ymd: ymd,
              dayWeekKind: this.dayWeekKind,
              elEnableYn: elEnableYn,
              cbEnableYn: cbEnableYn,
            });
          }
        }
      }
      return chkVal;
    },
    research() {
      this.clickCheck = true;
      this.search4();
      // 월 (dropdown) 초기화
      this.month = "";
      // 해더체크박스 check >> false
      this.$refs.pgeBsa00001Grid1.gridView.setAllCheck(false);
      this.$refs.pgeBsa00001Grid4.gridView.setAllCheck(false);
      this.clickCheck = false;
    },
  },
};
</script>
<style scoped></style>
