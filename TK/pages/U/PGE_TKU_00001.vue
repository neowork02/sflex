<template>
  <sui-page class="custom_page">
    <sui-page-header2 :pageId="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <!-- 가입 정보 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_SEARCH_JOIN_INFO')"
          :labelAlign="'right'"
          style="width: 100%; height: auto"
        >
          <div class="radioForm">
            <!-- 성명 -->
            <ur-radio
              v-model="srchFg"
              value="name"
              sm
              @click="onClickSrchFg('name')"
              >{{ $t("MSG_TXT_EMPL_NM") }}</ur-radio
            >
            <!-- 정기권번호 -->
            <ur-radio
              v-model="srchFg"
              value="ticket"
              sm
              @click="onClickSrchFg('ticket')"
              >{{ $t("MSG_TXT_TICKET_NO") }}</ur-radio
            >
          </div>
          <ur-text-field
            v-model="srchVal"
            maxlength="10"
            value=""
            class="pl16"
            :disabled="srchFg !== 'ticket'"
            :mask="inputMask"
            @enter="btnPopup"
          />
          <ur-icon-button
            icon="search"
            style="padding-top: 0px"
            @click="btnPopup"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <!-- 초기화 -->
          <ur-button @click="reset">{{ $t("MSG_BTN_RESET") }}</ur-button>
          <!-- 조회 -->
          <ur-button v-permission:read="this.$options.name" @click="searchAction">{{ $t("MSG_TXT_SRCH") }}</ur-button>
          <!-- 저장 -->
          <ur-button v-permission:update="this.$options.name" @click="update">{{ $t("MSG_TXT_SAVE") }}</ur-button>
          <!-- 엑셀다운로드 -->
          <ur-button v-permission:excel="this.$options.name" color="violet" @click="excelDown">{{
            $t("MSG_TXT_EXCEL_DOWNLOAD")
          }}</ur-button>
        </div>
      </div>
      <div class="comm_title_wrap mt25">
        <!-- 회원 정기권 목록 -->
        <h4>{{ $t("MSG_TXT_TICKET_LIST") }}</h4>
        <!--S:: 타이틀 오른쪽 total info -->
        <div class="right_box">
          <div class="totalNo">
            <div class="totalCt">Total<span>{{ totalCnt }}</span>{{ $t("MSG_TXT_CNT") }}</div>
          </div>
        </div>
        <!--E::: 타이틀 오른쪽 total info -->
      </div>
      <!-- <div class="totalNo">
        <div class="totalCt">
          총 <span>{{ gridDataList.length }}</span
          >개
        </div>
      </div> -->
      <real-grid
        ref="pgeTku00001Grid"
        grid-id="pgeTku00001Grid"
        grid-root="/lib"
        :gridFields="gridFields"
        :gridColumns="gridColumns"
        :gridLayout="gridLayout"
        :gridRows="gridDataList"
        :gridCellEdited="gridCellEdited"
        :gridEditRowChanged="gridEditRowChanged"
        :style="gridStyle"
        :gridHeigth="1500"
      />
      <br />

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: "PGE_TKU_00001",
  components: {}, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      srchFg: "name",
      srchVal: null,      
      srchRceiptNo: null,
      memshpInfo: null,
      totalCnt: 0,
      ticketList: [],
      originList: [],
      nowStateList: [],
      checkList: [],
      paramList: [],
      entraceHistoryList: [],
      gridDataList: [],
      gridStyle: { height: "600px" },
    };
  },
  computed: {
    session() {
      return this.$store.getters.userInfo;
    },
    // Input Mask
    inputMask() {
      if (this.srchFg == 'ticket') {
        return 'N#########';
      }
    },
  },
  watch: {
    // srchVal() {
    //   // 정기권번호 입력란 숫자만
    //   return this.srchVal = this.srchVal.replace(/[^0-9]/g, '');
    // }
  },
  created() {
    this.gridFields = [
      // 파크구분
      { fieldName: "parkKind", dataType: "text" },
      // 정기권번호
      { fieldName: "ticketNo", dataType: "text" },
      // 성명(회원명)
      { fieldName: "memberName", dataType: "text" },
      // 권종명
      { fieldName: "itemNm", dataType: "text" },
      // 인원유형(가입유형코드)
      { fieldName: "ageTypeNm", dataType: "text" },
      // 상태(정기권상태값)
      { fieldName: "ticketStatusValue", dataType: "text" },
      // 상태명(정기권상태값)
      { fieldName: "ticketStatusValueNm", dataType: "text" },
      // 가입일자
      {fieldName: "joinYmd", dataType: "datetime", datetimeFormat: "yyyyMMdd" },
      // 시작일(발급일자)
      { fieldName: "issueDate", dataType: "text", datetimeFormat: "yyyyMMdd" },
      // 종료일(만기일자)
      { fieldName: "expireDate", dataType: "text", datetimeFormat: "yyyyMMdd" },
      // 비고
      { fieldName: "note", dataType: "text" },
      // 결제일
      { fieldName: "paymntDate", dataType: "text" },
      // 어제일자
      { fieldName: "preDate", dataType: "text" },
      // 변경 정기권상태값
      { fieldName: "ticketStatusChg", dataType: "text" },
      // 양수여부
      { fieldName: "giveYn", dataType: "text" },
      // 양수자
      { fieldName: "recvTicketNo", dataType: "text" },
    ];
    this.gridColumns = [
      {
        // 파크구분
        name: "parkKindColumn",
        fieldName: "parkKind",
        width: 100,
        edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        header: { text: this.$t("MSG_TXT_PARK_KIND") },
      },
      {
        // 정기권번호 파크정기권번호구분
        name: "ticketNoColumn",
        fieldName: "ticketNo",
        width: 160,
        header: {
          text: this.$t("MSG_TXT_PARK_TICKET_KIND"),
        },
        edit: false,
        header: { text: this.$t("MSG_TXT_TICKET_NO") },
      },
      {
        // 성명
        name: "memberNameColumn",
        fieldName: "memberName",
        width: 130,
        edit: false,
        header: { text: this.$t("MSG_TXT_EMPL_NM") },
        displayCallback: function (grid, index, value) {
          // 양끝 제외 마스킹
          let tmp = value;
          if (!utils.isEmpty(tmp)) {
            if (tmp.length === 2) {
              tmp = tmp.substr(0, 1) + "*";
            } else if (tmp.length > 2) {
              let targetNm = value.split("");
              targetNm.forEach(function (data, i) {
                if (i === 0 || i === targetNm.length - 1) return;
                targetNm[i] = "*";
              });
              tmp = targetNm.join();
              tmp = tmp.replace(/,/g, "");
            }
          }
          return tmp;
        },
      },
      {
        // 권종명
        name: "itemNmColumn",
        fieldName: "itemNm",
        width: 340,
        edit: false,
        header: { text: this.$t("MSG_TXT_TICKET_ITEM_NM") },
        styles: {
          textAlignment: "near",
        },
      },
      {
        // 인원유형
        name: "ageTypeNmColumn",
        fieldName: "ageTypeNm",
        width: 100,
        edit: false,
        header: { text: this.$t("MSG_TXT_AGE_TYP_CD") },
      },
      {
        // 상태
        name: "ticketStatusValueNmColumn",
        fieldName: "ticketStatusValueNm",
        width: 100,
        edit: false,
        header: { text: this.$t("MSG_TXT_DTST_STT") },
        // lookupDisplay: true,
        // editButtonVisibility: 'always',  //default, hidden, rowfocused, visible
        // [정상, 만기]
        // labels: [this.$t('MSG_TXT_CONDITION'), this.$t('MSG_TXT_EXPIRE_NAME')],
        // values: ["C001","C002"],
        // editor: {
        //   type: 'dropdown', 
        //   dropDownCount: 5, 
        //   textReadOnly: true,
        //   dropDownWhenClick: true
        // },
        // styleCallback: function (grid, dataCell) {
        //   let ret = {};
        //   let ticketStatusValue = grid.getValue(dataCell.index.itemIndex,"ticketStatusValue");
        //   // 정기권상태 : 정상/만기는 수정가능
        //   if (ticketStatusValue === 'C001' || ticketStatusValue === 'C002') {  
        //     ret.editable = true;
        //   } else {
        //     ret.editable = false;
        //   }
        //   return ret;
        // },
      },
      {
        // 가입일
        name: "joinYmdColumn",
        fieldName: "joinYmd",
        width: 160,
        edit: false,
        datetimeFormat: "yyyy-MM-dd",
        header: { text: this.$t("MSG_TXT_JOIN_DAY") },
      },
      {
        // 시작일
        name: "issueDateColumn",
        fieldName: "issueDate",
        width: 160,
        sortable: false,
        editButtonVisibility: "default", // always, default, hidden, rowfocused, visible
        editor: {
          type: "date",
          datetimeFormat: "yyyy-MM-dd",
          commitOnSelect: true,
          mask: {
            editMask: "9999-99-99",
            placeHolder: "yyyy-MM-dd",
            includedFormat: true,
          },
        },
        header: { text: this.$t("MSG_TXT_START_DATE") },
        styleCallback: function (grid, dataCell) {
          let ret = {};
          let ticketStatusValue = grid.getValue(dataCell.index.itemIndex,"ticketStatusValue");
          // 결제일 == 시작일 동일한 경우, 결제 당일에는 시작일/만기일 변경 불가하고 다음날부터 가능하도록 되어야합니다. 
          // 시작일이 경과한 후에도 시작일을 변경할 수 있어야합니다.  
          // 정기권상태 : 정상/만기는 && 최종것만 수정가능
          if ( dataCell.index.itemIndex == 0 && (ticketStatusValue === 'C001' || ticketStatusValue === 'C002')) {  
            ret.editable = true;
          } else {
            ret.editable = false;
          }
          return ret;
        },
      },
      {
        // 종료일
        name: "expireDateColumn",
        fieldName: "expireDate",
        width: 160,
        sortable: false,
        editButtonVisibility: "default", // always, default, hidden, rowfocused, visible
        editor: {
          type: "date",
          datetimeFormat: "yyyy-MM-dd",
          commitOnSelect: true,
          mask: {
            editMask: "9999-99-99",
            placeHolder: "yyyy-MM-dd",
            includedFormat: true,
          },
        },
        header: { text: this.$t("MSG_TXT_END_DATE") },
        styleCallback: function (grid, dataCell) {
          let ret = {};
          let ticketStatusValue = grid.getValue(dataCell.index.itemIndex,"ticketStatusValue");
          // 결제일 == 시작일 동일한 경우, 결제 당일에는 시작일/만기일 변경 불가하고 다음날부터 가능하도록 되어야합니다. 
          // 시작일이 경과한 후에도 시작일을 변경할 수 있어야합니다.  
          // 정기권상태 : 정상/만기는 && 최종것만 수정가능
          if ( dataCell.index.itemIndex == 0 && (ticketStatusValue === 'C001' || ticketStatusValue === 'C002')) {  
            ret.editable = true;
          } else {
            ret.editable = false;
          }
          return ret;
        },
      },
      {
        // 비고
        name: "noteColumn",
        fieldName: "note",
        width: 356,
        edit: false,
        header: { text: this.$t("MSG_TXT_NOTE") },
      },
      {text: 'ticketStatusChg', fieldName: '', hidden: true},
    ];
    this.gridLayout = [
      "parkKindColumn",
      "ticketNoColumn",
      "memberNameColumn",
      {
        name: "group1",
        direction: "vertical",
        items: [
          {
            name: "group2",
            direction: "horizontal",
            items: ["itemNmColumn", "ageTypeNmColumn"],
            header: {
              text: "group2",
              visible: false,
            },
          },
          "noteColumn",
        ],
        header: {
          text: "group1",
          visible: false,
        },
      },
      {
        name: "group3",
        direction: "vertical",
        items: [
          {
            name: "group4",
            direction: "horizontal",
            items: [
              "ticketStatusValueNmColumn",
              "joinYmdColumn",
              "issueDateColumn",
              "expireDateColumn",
            ],
            header: {
              text: "group4",
              visible: false,
            },
          },
        ],
        header: {
          text: "group3",
          visible: false,
        },
      },
    ];
  },
  mounted() {
    // this.parkKind = this.session.parkFg;
    this.parkKind = "EL";
  },
  methods: {
    // 초기화 버튼 이벤트
    reset() {
      this.srchVal = "";
      this.memshpInfo = "";
    },
    // 성명 클릭시 이벤트
    onClickSrchFg(srchFg) {
      this.srchVal = null;

      switch (srchFg) {
        case "name":
          this.popup();
          break;
      }
    },
    // 멤버십가입자 리스트 팝업  호출
    popup() {
      let pageInitialData = {};
      if (this.srchFg === "ticket") pageInitialData.ticketNo = this.srchVal;

      // utils.openLayerPopup("PGE_CTM_00011", this.onPopupCallback, {
      //   pageInitialData: pageInitialData,
      //   size: "lg",
      // });
      utils.openLayerPopup("PGE_CTM_00016", this.onPopupCallback, {
        pageInitialData: pageInitialData,
        size: "lg",
      });
    },
    // 검색조건 선택 case
    popupSearch() {
      switch (this.srchFg) {
        case "name":
          this.popup();
          break;
        case "ticket":
          // if(this.srchVal == null) {
          //   // 정기권번호를 입력해주세요.
          //   utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SEARCH'), this.$t('MSG_TXT_TICKET_NO')), null, null);
          //   return;
          // }
          // this.popup();
          break;
      }
    },
    // 검색버튼 클릭시 팝업 호출
    btnPopup() {
      switch (this.srchFg) {
        case "name":
          this.popup();
          break;
        case "ticket":
          this.popup();
          break;
      }
    },
    // 정기권가입자리스트 팝업 Callback
    onPopupCallback(data) {
      if (data) {
        this.memshpInfo = data;

        switch (this.srchFg) {
          case "name":
            this.srchVal = this.memshpInfo.name;
            break;
          case "ticket":
            this.srchVal = this.memshpInfo.ticketNo;
            break;
        }
        this.searchAction();
      }
    },
    // 회원정기권 리스트 조회
    searchAction() {
      if (utils.isEmpty(this.memshpInfo)) {
        // 성명 혹은 정기권 ,검색조건 중 하나 입력 값이 존재해야 합니다.
        utils.messageBox("alert", this.$t("MSG_ALT_CHK_SERCH_ONE"));
        return;
      }
      const params = {
        memshpUid: this.memshpInfo.memshpUid,
      };
      // 회원 정기권 리스트 조회 /api/v1/regular/list
      http.request(this.$options.name, "DTS_TKU_00001", {
          query: params,
        })
        .then((res) => {
          if (res.data.length > 0) {
            const resData = res.data;
            // console.log(res.data);
            this.totalCnt = utils.numberWithCommas(res.data.length);
            this.gridDataList = _.map(resData, (data) => {
              if (data.memshpUid === this.memshpInfo.memshpUid) {
                data = {
                  ...data,
                  memberName: this.memshpInfo.name,                  
                };
              }
              return data;
            });
            // 조회 최초 데이터 적재
            this.originList = this.gridDataList;
            this.$refs.pgeTku00001Grid.setRows(this.gridDataList);
          }
        })
        .catch((error) => console.log(error));
    },
    // 그리드 row 변경시 이벤트
    gridCellEdited(grid, itemIndex, row, field) {
      grid.commit(true);
    },
    async gridEditRowChanged(grid, itemIndex, dataRow, field, oldValue, newValue) {
      // 현재 그리드 데이터
      const issueDateField = 8;    // 시작일 필드
      const expireDateField = 9;   // 종료일 필드
      this.checkList = this.$refs.pgeTku00001Grid.getJsonRows();
      let issueDate = utils.toStringByFormat(grid.getValue(itemIndex,"issueDate"), "YYYYMMDD");     // 시작일
      let expireDate = utils.toStringByFormat(grid.getValue(itemIndex,"expireDate"), "YYYYMMDD");   // 종료일
      let ticketStatusValue = grid.getValue(itemIndex,"ticketStatusValue");                         // 정기권상태코드
      let giveYn = grid.getValue(itemIndex,"giveYn");                                               // 양수여부
      let recvTicketNo = grid.getValue(itemIndex,"recvTicketNo");                                   // 양수자
      let nowDate = utils.now("YYYYMMDD");                                                          // 오늘일자
      let preDate = grid.getValue(itemIndex,"preDate");                                             // 어제일자

      let oldIssueDate = utils.toStringByFormat(this.originList[itemIndex].issueDate, "YYYYMMDD");
      let oldExpireDate = utils.toStringByFormat(this.originList[itemIndex].expireDate, "YYYYMMDD");
      let chkNewDate = utils.toStringByFormat(newValue, "YYYYMMDD");
      let dateChk = false;
      
      if (field === issueDateField && (oldIssueDate > issueDate)) {
        // 변경 시작일은 현재 시작일보다 커야 합니다.
        utils.messageBox("alert", this.$t("MSG_ALT_NEW_START_DT_CHECK"));
        dateChk = true;
      }

      if (field === issueDateField && (chkNewDate > expireDate)) {
        // 시작일은 종료일보다 작아야 합니다.
        utils.messageBox("alert", this.$t("MSG_ALT_ABLE_START_DT_PREC_FINS_DT"));
        dateChk = true;
      }

      if (field === expireDateField && (issueDate > chkNewDate)) {
        // 종료일은 시작일보다 이후로 설정되어야 합니다.
        utils.messageBox("alert", this.$t("MSG_TXT_END_GRTR_START_DTM"));
        dateChk = true;
      }

      // 정기권상태코드 정상 경우
      // 현재 상태가 정상이고 종료일을 어제로 변경후 저장하면 상태가 '만기'로 변경되도록 부탁드립니다. 
      // 시작일이 경과한 후 시작일을 변경하는 경우, 변경하려는 시작일 이전에 방문한 일자가 있으면 해당 일자를 포함하여 
      // 그 일자 이전으로만 지정할 수 있어야합니다.
      // ex : 시작일 2023/07/01을 2023/07/07로 변경하게되면 방문일자(2023/07/03, 2023/07/04) 포함하여 그 일자 이전이면 2023/07/03일로 지정
      if (ticketStatusValue === 'C001' && !dateChk) {
        
        if (field === issueDateField) {
          // 시작일이 경과(오늘기준)
          if (issueDate < nowDate) {
            // 입장기록 가져오기
            await this.getEntranceHistory(grid,itemIndex);
            // 정기권시작일자와 변경시작일자 사이에 입장기록이 있으면, 첫번째 입장일자로 설정
            if (this.entraceHistoryList.length > 0) {
              issueDate = this.entraceHistoryList[0].ymd;
              // 시작일자는 변경하려는 시작일자 이전에 방문한 일자(YYYY-MM-DD)로 설정합니다.
              utils.messageBox("alert", utils.strFormat(this.$t('MSG_ALT_ENTARANCE_DAY_SET'), utils.toStringByFormat(issueDate, "YYYY-MM-DD")), null);
              dateChk = false;
            }
          }
          this.$refs.pgeTku00001Grid.setValue(itemIndex, 'ticketStatusChg', 'C001');
          this.$refs.pgeTku00001Grid.setValue(itemIndex, 'issueDate', utils.toStringByFormat(issueDate, "YYYY-MM-DD"));
        }

        if (field === expireDateField && !dateChk) {
          // 종료일이 어제로 변경 체크
          if (expireDate < nowDate) {
            // 저장시 만기상태로 설정
            // 현재 상태가 정상이고 종료일을 오늘기준 과거일자로 변경하게되면 저장후 정기권상태가 만기로 변경됩니다.
            // utils.messageBox("alert", utils.strFormat(this.$t('MSG_ALT_EXPIRE_STATUS_SET'), utils.toStringByFormat(preDate, "YYYY-MM-DD")), null);
            utils.messageBox("alert", utils.strFormat(this.$t('MSG_ALT_EXPIRE_STATUS_SET')), null);
            this.$refs.pgeTku00001Grid.setValue(itemIndex, 'ticketStatusChg', 'C002');
            dateChk = false;
          } else {
            this.$refs.pgeTku00001Grid.setValue(itemIndex, 'ticketStatusChg', 'C001');
            dateChk = false;
          }
          this.$refs.pgeTku00001Grid.setValue(itemIndex, 'expireDate', newValue);
        }
      }

      // 정기권상태코드 만기 경우
      // 현재 상태가 만기이더라도 종료일을 오늘보다 미래로 변경이 가능하면 됩니다. 오늘보다 미래로 변경 시 상태값이 '정상'이 되도록 부탁드립니다. 
      if (ticketStatusValue === 'C002' && !dateChk) {
        if (field === expireDateField) {
          // 양도된 정기권입니다. 날짜 변경은 불가합니다.\n양수자 정기권 : {0} : 20231234567  recvTicketNo
          if (giveYn == 'Y') {
            utils.messageBox("alert", utils.strFormat(this.$t('MSG_ALT_GIVE_STOP_CHK'), recvTicketNo), null);
            grid.commit(true);
            dateChk = true;
          } else {
            // 종료일이 오늘보다 체크
            if (expireDate > nowDate) {
              // 정상상태가 이미 있는데, 정상으로 변경하는 경우 체크
              let count = this.checkList.filter(v => v.ticketStatusValue == 'C001').length;
              if (count > 0) {
                // 이미 정기권 상태값 정상건이 존재합니다.
                utils.messageBox("alert", this.$t("MSG_ALT_TICKET_STATUS_ALREADY_NORMAL"));
                grid.commit(true);
                dateChk = true;
              } else {
                // 저장시 정상상태로 설정
                // 현재 상태가 만기이고 종료일을 오늘보다 미래일자(YYYY-MM-DD)로 변경하게되면 저장후 정기권상태가 정상으로 변경됩니다.
                utils.messageBox("alert", utils.strFormat(this.$t('MSG_ALT_NORMAL_STATUS_SET'), utils.toStringByFormat(expireDate, "YYYY-MM-DD")), null);
                this.$refs.pgeTku00001Grid.setValue(itemIndex, 'ticketStatusChg', 'C001');
                dateChk = false;
              }
            } else {
              // 현재 만기상태인데 종료일자 변경은 불가합니다.\n(단, 종료일자 변경가능한 경우는 정기권 상태값을 정상으로 변경하는 경우입니다.)
              if (expireDate != oldExpireDate) {
                utils.messageBox("alert", this.$t("MSG_ALT_EXPIRE_END_CHG_CHK"));
                grid.commit(true);
                dateChk = true;
              }
            }
          }
          if (!dateChk) {
            this.$refs.pgeTku00001Grid.setValue(itemIndex, 'expireDate', newValue);
          }
        }

        if (field === issueDateField) {
          // 현재 만기상태인데 시작일자 변경은 불가합니다.
          if (issueDate != oldIssueDate) {
            utils.messageBox("alert", this.$t("MSG_ALT_EXPIRE_START_CHG_CHK"));
            grid.commit(true);
            dateChk = true;
          }
        }
      }

      if (dateChk) {
        // 그리드 커밋하고, oldData로 원복, row 업데이트 none
        this.$refs.pgeTku00001Grid.setValue(itemIndex, this.gridColumns[field-1].fieldName, oldValue);
        this.$refs.pgeTku00001Grid.onNoneRow(dataRow);
        return;
      }

      grid.commit(true);
      // this.$refs.pgeTku00001Grid.setValue(itemIndex, this.gridColumns[field-1].fieldName, newValue);

      // 변경된 데이터가 처음데이터와 같은지 체크 issueDate expireDate
      if (this.checkList[itemIndex].issueDate == this.originList[itemIndex].issueDate && this.checkList[itemIndex].expireDate == this.originList[itemIndex].expireDate ) {
        this.$refs.pgeTku00001Grid.onNoneRow(dataRow);
      }
      this.$refs.pgeTku00001Grid.onUpdRow(itemIndex);
      this.nowStateList = this.$refs.pgeTku00001Grid.getAllStateRows();
      // console.log(this.$refs.pgeTku00001Grid.getJsonRows());
      // this.$refs.pgeTku00001Grid.gridView.columnByName('issueDate').editable = false;
    },
    // 변경내용 확인
    checkValidation() {
      let chkVal = true;

      // 그리드 행 상태값 가져오기
      this.nowStateList = this.$refs.pgeTku00001Grid.getAllStateRows();
      this.checkList = this.$refs.pgeTku00001Grid.getJsonRows();

      if (this.nowStateList.updated.length == 0) {
        // 변경내용 없음
        return false;
      } else {
        // 변경내용 있으므로 paramList에 적재
        this.paramList = [];
        // this.nowStateList = this.nowStateList.updated;

        // 정기권변경로그 CTTCH001T 등록
        // CHANGE_KIND : 01 (상태변경), 02 (시작일 변경), 03 (종료일 변경)
        for (var i = 0; i < this.nowStateList.updated.length; i++) {
          const idx = this.nowStateList.updated[i];
          const chkChangeList = [];
          const chkParkKind = this.checkList[idx].parkKind;
          const chkTicketNo = this.checkList[idx].ticketNo;
          const chkIssueDate = utils.toStringByFormat(this.checkList[idx].issueDate, "YYYYMMDD");
          const chkExpireDate = utils.toStringByFormat(this.checkList[idx].expireDate, "YYYYMMDD");
          const orgIssueDate = utils.toStringByFormat(this.originList[idx].issueDate, "YYYYMMDD");
          const orgExpireDate = utils.toStringByFormat(this.originList[idx].expireDate, "YYYYMMDD");
          const orgJoinYmd = utils.toStringByFormat(this.originList[idx].joinYmd, "YYYYMMDD");
          const orgTicketStatus = this.originList[idx].ticketStatusValue;
          const ticketStatusChg = this.checkList[idx].ticketStatusChg;

          // 정기권 변경정보 log 리스트 CTTCH001T 등록 - 01: 상태 변경
          if (orgTicketStatus != ticketStatusChg) {
            chkChangeList.push({
              parkKind: chkParkKind,
              ticketNo: chkTicketNo,
              changeKind: "01",
              oldVal: orgTicketStatus,
              newVal: ticketStatusChg,
              programId: "PGE_TKU_00001",
            });
          }

          // 정기권 변경정보 log 리스트 CTTCH001T 등록 - 02: 시작일 변경
          if (orgIssueDate != chkIssueDate) {
            chkChangeList.push({
              parkKind: chkParkKind,
              ticketNo: chkTicketNo,
              changeKind: "02",
              oldVal: orgIssueDate,
              newVal: chkIssueDate,
              programId: "PGE_TKU_00001",
            });
          }

          // 정기권 변경정보 log 리스트 CTTCH001T 등록 - 03: 종료일 변경
          if (orgExpireDate != chkExpireDate) {
            chkChangeList.push({
              parkKind: chkParkKind,
              ticketNo: chkTicketNo,
              changeKind: "03",
              oldVal: orgExpireDate,
              newVal: chkExpireDate,
              programId: "PGE_TKU_00001",
            });
          }

          this.paramList.push({
            parkKind: chkParkKind,
            memshpUid: this.memshpInfo.memshpUid,
            ticketNo: chkTicketNo,
            joinYmd: orgJoinYmd,
            issueDate: chkIssueDate,
            expireDate: chkExpireDate,
            ticketStatusChg : ticketStatusChg,
            ticketStatusValue : orgTicketStatus,
            itemCd: this.originList[idx].itemCd,
            itemNm: this.originList[idx].itemNm,
            ageTypeCd: this.originList[idx].ageTypeCd,
            ageTypeNm: this.originList[idx].ageTypeNm,
            changeList: chkChangeList,
            orgTicketStatus: orgTicketStatus,
            orgIssueDate: orgIssueDate,
            orgExpireDate: orgExpireDate,
            programId: "PGE_TKU_00001",
          });
        }
      }
      return chkVal;
    },
    // 변경된 내용 업데이트
    update() {
      if (!this.checkValidation()) {
        // 변경된 내역이 없습니다.
        utils.messageBox("alert", this.$t("MSG_ALT_NO_CHANGE_DATA"));
        return;
      }

      // 회원정기권 정보 변경 /api/v1/regular/update
      // 저장 하시겠습니까?
      utils.messageBox(
        "confirm",
        this.$t("MSG_ALT_WANT_SAVE"),
        null,
        (/* ok */) => {
          http.request("PGE_TKU_00001", "DTS_TKU_00002", {
              data: this.paramList,
            })
            .then((res) => {
              let resData = res.data;
              if (resData) {
                  if (resData.result === 'success') {
                      // 저장되었습니다.
                      utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, this.searchAction);
                  } else if(resData.result === 'fail') {
                      // 저장에 실패 하였습니다.
                      utils.messageBox('alert', this.$t('MSG_ALT_SVE_ERR'));
                  }
              }
            })
            .catch((error) => {
              console.log(error);
            });
        },
        (/* cancel */) => {}
      );
    },
    // 숫자만 입력
    onlyNumber(e) {
      const regex = /[^0-9]/g;
      if (regex.test(e.target.value)) {
        e.target.value = e.target.value.replace(regex, "");
        return e.target.value;
      }
    },
    // 엑셀다운로드
    excelDown() {
      if (this.$refs.pgeTku00001Grid.getJsonRows().length == 0) {
        // 조회된 데이터가 없습니다.
        utils.messageBox("alert", this.$t("MSG_ALT_NO_SERACH_DATA"));
        return;
      }
      // 정기권 정보변경
      this.$refs.pgeTku00001Grid.getExcelDownload(this.$t("MSG_TIT_TK02_MNG"), "PGE_TKU_00001");
    },
    // 입장기록 가져오기
    async getEntranceHistory(grid, itemIndex) {
      const ticketNo = grid.getValue(itemIndex, "ticketNo");
      const startYmd = utils.toStringByFormat(this.originList[itemIndex].issueDate, "YYYYMMDD");
      const endYmd = utils.toStringByFormat(grid.getValue(itemIndex, "issueDate"), "YYYYMMDD");
      const params = {
        ticketNo : ticketNo,
        startYmd : startYmd,
        endYmd : endYmd,
      }
      // /api/v1/regular/entrancehistory
      await http.request(this.$options.name, "DTS_TKU_00004", {
        query: params,
      })
      .then((res) => {
        if(res.data.length > 0) {
          this.entraceHistoryList = res.data;
        }
      });
    },
  },
};
</script>
<style scoped></style>
