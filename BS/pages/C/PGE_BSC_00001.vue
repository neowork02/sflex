<template>
  <sui-page class="custom_page">
    <sui-page-header2 :pageId="this.$options.name" />
    <sui-page-contents>
      <!-- S::컨텐츠1 -->
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_COUPON_MASTER_NUM')"
          :labelAlign="'right'"
          style="width: 100%; height: auto"
        >
          <ur-text-field
            v-model="searchParams.cpnMstNo"
            style="width: 42.3%; height: auto"
            maxlength="10"
            :mask="inputMask"
            @keyup.enter="searchValid"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button type="button" @click="reset">{{ $t('MSG_BTN_RESET') }}</ur-button> <!-- 초기화 -->
          <ur-button v-permission:read="this.$options.name" color="violet" @click="searchValid">{{ $t('MSG_TXT_SRCH') }}</ur-button> <!-- 조회 -->
        </div>
      </div>
      <!-- E::컨텐츠1-->

      <!-- S::컨텐츠2 -->
      <div class="comm_title_wrap mt40">
        <h4 class="pr10">{{ $t('MSG_TXT_COUPON_MASTER') }}</h4> <!-- 쿠폰마스터 -->
        <ur-button v-permission:create="this.$options.name" color="violet" @click="cmAddRow">{{ $t('MSG_BTN_ADD') }}</ur-button> <!-- 추가 -->
        <ur-button v-permission:update="this.$options.name" color="violet" @click="cmSave">{{ $t('MSG_TXT_SAVE') }}</ur-button> <!-- 저장 -->
        <ur-button v-permission:delete="this.$options.name" color="violet" @click="getCmDelete">{{ $t('MSG_BTN_DEL') }}</ur-button> <!-- 삭제 -->
        <!--S:: 타이틀 오른쪽 total info -->
        <div class="right_box">
          <div class="totalNo">
            <div class="totalCt">Total<span>{{ numberWithCommas(totalCnt) }}</span>{{ $t('MSG_TXT_CNT') }}</div>
          </div>
        </div>
        <!--E::: 타이틀 오른쪽 total info -->
      </div>
      <real-grid
        ref="pgeBsc00001Grid"
        grid-id="pgeBsc00001Grid"
        grid-root="/lib"
        :gridFields="gridFields"
        :gridColumns="gridColumns"
        :gridRows="gridDataList"
        :gridCheckBar="{ visible: true }"
        :gridCellClick="gridCellClick"
        :gridCellEdited="gridCellEdited"
        :gridEditRowChanged="gridEditRowChanged"
        :style="gridStyle"
      />
      <!-- E::컨텐츠2-->
      
      <!-- S::컨텐츠3 -->
      <div class="comm_title_wrap mt40">
        <h4 class="pr10">{{ $t('MSG_TXT_TICKET_TYPE_SUBPAY') }}</h4> <!-- 지급대상권종 -->
        <ur-button v-permission:create="this.$options.name" color="violet" @click="popup2()">{{ $t('MSG_BTN_ADD') }}</ur-button> <!-- 추가 -->
        <ur-button v-permission:update="this.$options.name" color="violet" @click="ticketSave">{{ $t('MSG_TXT_SAVE') }}</ur-button> <!-- 저장 -->
        <ur-button v-permission:delete="this.$options.name" color="violet" @click="getTicketDelete">{{ $t('MSG_BTN_DEL') }}</ur-button> <!-- 삭제 -->
        <!--S:: 타이틀 오른쪽 total info -->
        <div class="right_box">
          <div class="totalNo">
            <div class="totalCt">Total<span>{{ numberWithCommas(totalCnt2) }}</span>{{ $t('MSG_TXT_CNT') }}</div>
          </div>
        </div>
        <!--E::: 타이틀 오른쪽 total info -->
      </div>
      <real-grid
        ref="pgeBsc00001Grid2"
        grid-id="pgeBsc00001Grid2"
        grid-root="/lib"
        :gridFields="gridFields2"
        :gridColumns="gridColumns2"
        :gridRows="gridDataList2"
        :gridCheckBar="{ visible: true }"
        :gridCellEdited="gridCellEdited2"
        :gridEditRowChanged="gridEditRowChanged2"
        :style="gridStyle2"
      />
      <!-- E::컨텐츠3-->

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_BSC_00001",
  components: {}, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      searchParams: {
        cpnMstNo: "",
      },
      gridDataList: [],
      gridStyle: { height: "250px" },
      gridDataList2: [],
      gridStyle2: { height: "250px" },
      addData: false,
      addCheck: false,
      clickCheck: false,
      paramList: [],
      paramList2: [],
      totalCnt: 0,
      totalCnt2: 0,
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
      { fieldName: "cpnMstNo", dataType: "text" },
      { fieldName: "mstId", dataType: "text" },
      { fieldName: "issueSeq", dataType: "number" },
      { fieldName: "cpnMstNm", dataType: "text" },
      { fieldName: "cpnFg", dataType: "text" },
      { fieldName: "refundYn", dataType: "text" },
      { fieldName: "refundAmt", dataType: "number" },
      { fieldName: "validFromDt", dataType: "text" },
      { fieldName: "paymntDcnt", dataType: "text" },
    ];
    this.gridColumns = [
      {
        // 쿠폰마스터번호
        name: "cpnMstNoColumn",
        fieldName: "cpnMstNo",
        width: 120,
        edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        header: {
          text: this.$t('MSG_TXT_COUPON_MASTER_NUM'),
        },
      },
      {
        // 쿠폰마스터ID
        name: "mstIdColumn",
        fieldName: "mstId",
        width: 120,
        edit: false,
        visible: false,
        header: {
          text: this.$t('MSG_TXT_COUPON_MASTER_ID'),
        },
      },
      {
        // 발행차수
        name: "issueSeqColumn",
        fieldName: "issueSeq",
        width: 100,
        edit: false,
        numberFormat: "#,##0",
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
      {
        // 쿠폰유형
        name: "cpnFgColumn",
        fieldName: "cpnFg",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_COUPON_TYPE'),
        },
      },
      {
        // 환불차감여부
        name: "refundYnColumn",
        fieldName: "refundYn",
        width: 100,
        edit: false,
        numberFormat: "#,##0",
        header: {
          text: this.$t('MSG_TXT_REFUND_AB_YN'),
        },
      },
      {
        // 환불차감액
        name: "refundAmtColumn",
        fieldName: "refundAmt",
        width: 100,
        edit: false,
        numberFormat: "#,##0",
        header: {
          text: this.$t('MSG_TXT_REFUND_DEDUC'),
        },
      },
      {
        // 유효기간
        name: "validFromDtColumn",
        fieldName: "validFromDt",
        width: 150,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_VALID_PERIOD'),
        },
      },
      {
        // 지급일
        name: "paymntDcntColumn",
        fieldName: "paymntDcnt",
        width: 100,
        numberFormat: "#,##0",
        header: {
          text: this.$t('MSG_TXT_PAYMENT_DATE'),
        },
        editor: {
          type: "number",
          maxLength: 5,
        },
      },
    ];
    this.gridFields2 = [
      { fieldName: "parkFg", dataType: "text" },
      { fieldName: "itemCd", dataType: "text" },
      { fieldName: "itemName", dataType: "text" },
      { fieldName: "price", dataType: "text" },
      { fieldName: "paymntCnt", dataType: "number", minimum: 0 },
    ];
    this.gridColumns2 = [
      {
        // 파크구분
        name: "parkFgColumn",
        fieldName: "parkFg",
        width: 100,
        edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        header: {
          text: this.$t('MSG_TXT_PARK_KIND'),
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
      },
      {
        // 권종명
        name: "itemNameColumn",
        fieldName: "itemName",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_TICKET_ITEM_NM'),
        },
      },
      {
        // 정상가
        name: "priceColumn",
        fieldName: "price",
        width: 100,
        numberFormat: "#,##0",
        edit: false,
        header: {
          text: this.$t('MSG_TXT_REGULAR_PRICE'),
        },
      },
      {
        // 지급수량
        name: "paymntCntColumn",
        fieldName: "paymntCnt",
        width: 100,
        numberFormat: "#,##0",
        header: {
          text: this.$t('MSG_TXT_PAYMENT_AMOUNT'),
        },
        editor: {
          type: "number",
          maxLength: 5,
        },
      },
    ];
  },
  mounted() {
    this.searchParams.cpnMstNo = null;
    this.clickCheck = false;
    this.addCheck = false;
    this.addData = false;
  },
  methods: {
    // 초기화
    reset() {
      this.searchParams.cpnMstNo = null;
    },
    // 조회 validation check >> 유지? 삭제?
    searchValid() {
      // if (this.searchParams.cpnMstNo === "" || this.searchParams.cpnMstNo === null) {
      //   utils.messageBox("alert", this.$t('MSG_ALT_COUPON_MASTER_NUM10'));
      //   return;
      // }
      this.search();
    },
    // 조회 파라미터
    getSearchParam() {
      const params = {
        cpnMstNo: utils.trim(this.searchParams.cpnMstNo), // 쿠폰마스터번호
      };
      return params;
    },
    // 조회
    search() {
      const params = this.getSearchParam();
      http.request(this.$options.name, "DTS_BSC_00001", {
          query: params,
      }).then(res => {
        if (res.data) {
          const resData = res.data;
          this.totalCnt = res.data.length;
          utils.map(resData, data => {
            // 유효시작일 data format
            data.fromDt = _.isNull(data.validFromDt) ? data.validFromDt : utils.toStringByFormat(utils.toDate(data.validFromDt), "YYYY-MM-DD");
          });
          utils.map(resData, data => {
            // 유효종료일 data format
            data.toDt = _.isNull(data.validToDt) ? data.validToDt : utils.toStringByFormat(utils.toDate(data.validToDt), "YYYY-MM-DD");
          });
          utils.map(resData, data => {
            // 유효시작일 ~ 유효종료일 data format
            data.validFromDt = data.fromDt + " ~ " + data.toDt;
            // 유효시작일 || 유효종료일 >> null 일 경우 Grid 미노출
            if (data.fromDt === "" || data.fromDt === null || data.toDt === "" || data.toDt === null) {
              data.validFromDt = null;
            }
          });
          this.gridDataList = resData;
          if (resData.length == 0) {
            // 데이터가 존재하지 않습니다.
            utils.messageBox("alert", this.$t('MSG_ALT_NO_DATA'));
            this.clickCheck = false;
            this.addCheck = false;
            this.addData = false;
            this.gridDataList = [];
            this.$refs.pgeBsc00001Grid.setRows(this.gridDataList);
            this.totalCnt = this.$refs.pgeBsc00001Grid.getJsonRows().length;
            return;
          }
          this.addCheck = false;
          this.addData = false;
          // 쿠폰마스터 Grid 초기화 및 총 건수 0으로 설정
          this.$refs.pgeBsc00001Grid.setRows(this.gridDataList);
          this.totalCnt = this.$refs.pgeBsc00001Grid.getJsonRows().length;
          // 지급대상권종 Grid 초기화 및 총 건수 0으로 설정
          this.gridDataList2 = [];
          this.$refs.pgeBsc00001Grid2.setRows(this.gridDataList2);
          this.totalCnt2 = this.$refs.pgeBsc00001Grid2.getJsonRows().length;
          this.$refs.pgeBsc00001Grid.gridView.setAllCheck(false);
          this.$refs.pgeBsc00001Grid2.gridView.setAllCheck(false);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    // 쿠폰마스터 이벤트 S
    // 쿠폰마스터 >> 추가
    cmAddRow() {
      this.addCheck = true;
      // PGE_BSC_00002 팝업 이동 및 callback(data)
      utils.openLayerPopup("PGE_BSC_00002", this.onPopupCallback, {
        size: "lg",
      });
    },
    // PGE_BSC_00002 Grid 선택한 row 값에 해당하는 데이터를 쿠폰마스터 Grid에 추가
    onPopupCallback(data) {
      this.userInfo = data;
      if (data) {
        const addNewRow = [];
        addNewRow.push({
          mstId: this.userInfo.mstId,
          cpnMstNo: this.userInfo.cpnMstNo,
          issueSeq: this.userInfo.issueSeq,
          cpnMstNm: this.userInfo.cpnMstNm,
          cpnFg: this.userInfo.cpnFg,
          refundYn: this.userInfo.refundYn,
          refundAmt: this.userInfo.refundAmt,
          validFromDt: utils.toStringByFormat(utils.toDate(this.userInfo.validFromDt), "YYYY-MM-DD")
                       + " ~ " + utils.toStringByFormat(utils.toDate(this.userInfo.validToDt), "YYYY-MM-DD"),
          paymntDcnt: "D+ " + this.userInfo.paymntDcnt
        });
        if (addNewRow.length > 0) {
          // 유효기간이 null 일 경우 화면에 null (빈 값)으로 출력
          if (utils.trim(addNewRow[0].validFromDt) === "~") {
            addNewRow[0].validFromDt = null;
          }
          // 추가할 줄 생성
          this.addRow(addNewRow);
          this.addData = true;
        }
      }
      this.totalCnt = this.$refs.pgeBsc00001Grid.getJsonRows().length;
    },
    addRow(rows) {
      rows.forEach((row) => {
        // 쿠폰마스터 Grid에 줄 생성
        this.$refs.pgeBsc00001Grid.setAddRow(row);
      });
    },
    // 쿠폰마스터 >> 저장
    cmSave() {
      // 수정하고 저장할 땐 this.addDate === false
      if (!this.addData) {
        if (!this.checkValidation()) {
          // 변경된 내역이 없습니다.
          utils.messageBox("alert", this.$t("MSG_ALT_NO_CHANGE_DATA"));
          return;
        }
        this.checkedList = this.$refs.pgeBsc00001Grid.getCheckedItems();
        if (this.checkedList === "" || this.checkedList === null || this.checkedList.length === 0) {
          // 선택박스를 체크해주세요.
          utils.messageBox("alert", this.$t('MSG_ALT_CHECK_SEL_BOX'));
          return;
        }
        // updated >> 생성(수정) 상태인 row 데이터
        const changeIdxList = [
          ...this.$refs.pgeBsc00001Grid.getAllStateRows().updated
        ];
        let changeList = [];
        utils.forEach(changeIdxList, (dataRow) => {
          let jsonRow = this.$refs.pgeBsc00001Grid.getJsonRows()[dataRow];
          jsonRow.paymntDcnt = jsonRow.paymntDcnt.substr(3);
          changeList.push(jsonRow);
        });
        let paramList = [...changeList]
        // 저장하시겠습니까?
        utils.messageBox("confirm", this.$t("MSG_ALT_IS_SAV_DATA"), null,
          (/* ok */) => {
            http.request(this.$options.name, "DTS_BSC_00002", {
                data: paramList,
            }).then(() => {
              // 저장되었습니다.
              utils.messageBox("success", this.$t("MSG_ALT_SAVE_DATA"), null, this.search);
            }).catch((error) => {
              console.log(error);
            });
          },
          (/* cancel */) => {}
        );
      // 추가 버튼을 누른 후 저장버튼을 눌렀을 때 >> this.addDate === true
      } else {
        this.checkedList = this.$refs.pgeBsc00001Grid.getCheckedItems();
        if (this.checkedList === "" || this.checkedList === null || this.checkedList.length === 0) {
          // 선택박스를 체크해주세요.
          utils.messageBox("alert", this.$t('MSG_ALT_CHECK_SEL_BOX'));
          return;
        }
        const checkIdx = this.$refs.pgeBsc00001Grid.getCheckedItems().lastItem
        if (utils.trim(this.$refs.pgeBsc00001Grid.getJsonRows()[checkIdx].paymntDcnt) == "" ||
            utils.trim(this.$refs.pgeBsc00001Grid.getJsonRows()[checkIdx].paymntDcnt) == null) {
          // 지급일을 입력해주세요.
          utils.messageBox("alert", this.$t('MSG_ALT_ENTER_PAY_DATE'));
          return;
        }
        // created >> 생성(추가) 상태인 row 데이터
        const changeIdxList = [
          ...this.$refs.pgeBsc00001Grid.getAllStateRows().created
        ];
        let changeList = [];
        utils.forEach(changeIdxList, (dataRow) => {
          let jsonRow = this.$refs.pgeBsc00001Grid.getJsonRows()[dataRow];
          jsonRow.paymntDcnt = jsonRow.paymntDcnt.substr(3);
          changeList.push(jsonRow);
        });
        let paramList = [...changeList]
        // 저장하시겠습니까?
        utils.messageBox("confirm", this.$t("MSG_ALT_IS_SAV_DATA"), null,
          (/* ok */) => {
            http.request(this.$options.name, "DTS_BSC_00002", {
                data: paramList,
            }).then(() => {
              this.addCheck = false;
              // 저장되었습니다. >> 저장 후 재조회
              utils.messageBox("success", this.$t("MSG_ALT_SAVE_DATA"), null, this.search);
            }).catch((error) => {
              console.log(error);
            });
          },
          (/* cancel */) => {}
        );
      }
    },
    // 쿠폰마스터 >> 삭제
    getCmDelete() {
      this.$refs.pgeBsc00001Grid.gridView.commit(true);
      this.checkedList = this.$refs.pgeBsc00001Grid.getCheckedItems();
      let rowState = this.$refs.pgeBsc00001Grid.getAllStateRows();
      if (this.checkedList === "" || this.checkedList === null || this.checkedList.length === 0) {
        // 삭제할 데이터를 선택하세요
        utils.messageBox("alert", this.$t('MSG_ALT_DEL_DATA_SELT'));
        return;
      }
      // 저장하지 않은 추가한 데이터만 삭제하기 위함
      const changeIdxList = [
        ...this.$refs.pgeBsc00001Grid.getAllStateRows().created,
      ];
      // 추가 버튼을 누른 후 입력하지 않은 addRow >> 삭제
      if (this.checkedList.lastItem === rowState.created.lastItem) {
        this.$refs.pgeBsc00001Grid.onDelRow(changeIdxList);
        return;
      }
      this.cmDelete();
    },
    cmDelete() {
      const changeIdxList = [
        ...this.$refs.pgeBsc00001Grid.getCheckedItems()
      ];
      let changeList = [];
      utils.forEach(changeIdxList, (dataRow) => {
        let jsonRow = this.$refs.pgeBsc00001Grid.getJsonRows()[dataRow];
        changeList.push(jsonRow);
      });
      let paramList = [...changeList]
      // 삭제하시겠습니까?
      utils.messageBox("confirm", this.$t('MSG_ALT_DEL'), null,
        (/* ok */) => {
          http.request("PGE_BSC_00001", "DTS_BSC_00003", {
              data: paramList,
          }).then(() => {
            // 체크된 row 가져오기 return Array
            this.$refs.pgeBsc00001Grid.onDelRow(this.checkedList);
            // 삭제 되었습니다. >> 삭제 후 재조회
            utils.messageBox("success", this.$t('MSG_ALT_DEL_DATA'), null, this.search);
            this.clickCheck = false;
          }).catch((error) => {
            console.log(error);
          });
        },
        (/* cancel */) => {}
      );
    },
    // 지급대상권종 이벤트 S
    // 지급대상권종 >> 저장
    ticketSave() {
      // 수정하고 저장할 땐 this.addDate === false
      if (!this.addData) {
        if (!this.checkValidation2()) {
          // 변경된 내역이 없습니다.
          utils.messageBox("alert", this.$t("MSG_ALT_NO_CHANGE_DATA"));
          return;
        }
        this.checkedList = this.$refs.pgeBsc00001Grid2.getCheckedItems();
        if (this.checkedList === "" || this.checkedList === null || this.checkedList.length === 0) {
          // 선택박스를 체크해주세요.
          utils.messageBox("alert", this.$t('MSG_ALT_CHECK_SEL_BOX'));
          return;
        }
        // updated >> 생성(수정) 상태인 row 데이터
        const changeIdxList = [
          ...this.$refs.pgeBsc00001Grid2.getAllStateRows().updated
        ];
        let changeList = [];
        utils.forEach(changeIdxList, (dataRow) => {
          let jsonRow = this.$refs.pgeBsc00001Grid2.getJsonRows()[dataRow];
          jsonRow.mstId = utils.trim(this.selectedGridRowData.mstId);
          jsonRow.issueSeq = utils.trim(this.selectedGridRowData.issueSeq);
          changeList.push(jsonRow);
        });
        let paramList = [...changeList]
        // 저장하시겠습니까?
        utils.messageBox("confirm", this.$t("MSG_ALT_IS_SAV_DATA"), null,
          (/* ok */) => {
            http.request(this.$options.name, "DTS_BSC_00005", {
                data: paramList,
            }).then(() => {
              // 저장되었습니다. >> 저장 후 재조회
              utils.messageBox("success", this.$t("MSG_ALT_SAVE_DATA"), null, this.search);
            }).catch((error) => {
              console.log(error);
            });
          },
          (/* cancel */) => {}
        );
      // 추가 버튼을 누른 후 저장버튼을 눌렀을 때 >> this.addDate === true
      } else {
        this.checkedList = this.$refs.pgeBsc00001Grid2.getCheckedItems();
        if (this.checkedList === "" || this.checkedList === null || this.checkedList.length === 0) {
          // 선택박스를 체크해주세요.
          utils.messageBox("alert", this.$t('MSG_ALT_CHECK_SEL_BOX'));
          return;
        }
        const checkIdx = this.$refs.pgeBsc00001Grid2.getCheckedItems().lastItem
        if (utils.trim(this.$refs.pgeBsc00001Grid2.getJsonRows()[checkIdx].paymntCnt) == "" ||
            utils.trim(this.$refs.pgeBsc00001Grid2.getJsonRows()[checkIdx].paymntCnt) == null) {
          // 지급수량을 입력해주세요.
          utils.messageBox("alert", this.$t('MSG_ALT_ENTER_PAY_AMOUNT'));
          return;
        }
        // created >> 생성(추가) 상태인 row 데이터
        const changeIdxList = [
          ...this.$refs.pgeBsc00001Grid2.getAllStateRows().created
        ];
        let changeList = [];
        utils.forEach(changeIdxList, (dataRow) => {
          let jsonRow = this.$refs.pgeBsc00001Grid2.getJsonRows()[dataRow];
          jsonRow.mstId = utils.trim(this.selectedGridRowData.mstId);
          jsonRow.issueSeq = utils.trim(this.selectedGridRowData.issueSeq);
          changeList.push(jsonRow);
        });
        let paramList = [...changeList]
        // 저장하시겠습니까?
        utils.messageBox("confirm", this.$t("MSG_ALT_IS_SAV_DATA"), null,
          (/* ok */) => {
            http.request(this.$options.name, "DTS_BSC_00005", {
                data: paramList,
            }).then(() => {
              // 저장되었습니다.
              utils.messageBox("success", this.$t("MSG_ALT_SAVE_DATA"), null, this.search);
            }).catch((error) => {
              console.log(error);
            });
          },
          (/* cancel */) => {}
        );
      }
    },
    // PGE_BSA_00002 (권종선택) 팝업 호출
    popup2() {
      if (this.gridDataList.length === 0 || !this.clickCheck) {
        // 쿠폰마스터 번호를 선택해주세요.
        utils.messageBox("alert", this.$t('MSG_ALT_SEL_COUPON_MASTER_NUM'));
        return;
      }
      if (this.$refs.pgeBsc00001Grid.getAllStateRows().created.length > 0) {
        // 쿠폰마스터 정보(추가)를 저장 후 진행해주세요.
        utils.messageBox("alert", this.$t('MSG_ALT_PROC_ADD_COUPON_MASTER'));
        return;
      }
      if (this.$refs.pgeBsc00001Grid.getAllStateRows().updated.length > 0) {
        // 쿠폰마스터 정보(수정)를 저장 후 진행해주세요.
        utils.messageBox("alert", this.$t('MSG_ALT_PROC_CORRECT_COUPON_MASTER'));
        return;
      }
      const itemCdIdxList = [
        ...this.$refs.pgeBsc00001Grid2.getJsonRows()
      ];
      let itemCdList = [];
      utils.forEach(itemCdIdxList, (dataRow) => {
        let jsonRow = dataRow
        itemCdList.push(jsonRow);
      });
      let paramList = [...itemCdList]
      // PGE_BSA_00002 팝업 이동 및 callback(data)
      utils.openLayerPopup("PGE_BSA_00002", this.onPopupCallback2, {
        pageInitialData: {
          year: null,
          itemCdList: JSON.stringify(paramList)
        },
        size: "lg",
      });
    },
    // PGE_BSA_00002 Grid 선택한 row 값에 해당하는 데이터를 쿠폰마스터 Grid에 추가
    onPopupCallback2(data) {
      if (data) {
        data.forEach(node => {
          const { itemCd } = node;
          if (utils.findIndex(this.gridDataList2.data, { itemCd }) === -1) {
            node.__selected = false;
            // 권종선택 팝업 Grid 줄 (넘어온 data.length 만큼) 추가
            this.$refs.pgeBsc00001Grid2.onAddRow(node);
            // 마지막 lastIndex 값 구하기
            const lastIndex = this.$refs.pgeBsc00001Grid2.getJsonRows().lastIndex;
            // 권종선택 팝업에서 넘겨온 데이터를 addRow 된 lastIndex 추가 (파크구분)
            this.$refs.pgeBsc00001Grid2.setValue(lastIndex, "parkFg", node.parkKind);
            // 권종선택 팝업에서 넘겨온 데이터를 addRow 된 lastIndex 추가 (권종코드)
            this.$refs.pgeBsc00001Grid2.setValue(lastIndex, "itemCd", node.itemCd);
            // 권종선택 팝업에서 넘겨온 데이터를 addRow 된 lastIndex 추가 (권종명)
            this.$refs.pgeBsc00001Grid2.setValue(lastIndex, "itemName", node.itemName);
          }
        });
        this.addData = true;
      }
      this.totalCnt2 = this.$refs.pgeBsc00001Grid2.getJsonRows().length;
    },
    // 체크된 row 가져오기
    getTicketDelete() {
      this.$refs.pgeBsc00001Grid2.gridView.commit(true);
      this.checkedList = this.$refs.pgeBsc00001Grid2.getCheckedItems();
      let rowState = this.$refs.pgeBsc00001Grid2.getAllStateRows();
      if (this.checkedList === "" || this.checkedList === null || this.checkedList.length === 0) {
        // 삭제할 데이터를 선택하세요
        utils.messageBox("alert", this.$t('MSG_ALT_DEL_DATA_SELT'));
        return;
      }
      // 저장하지 않은 추가한 데이터만 삭제하기 위함
      const changeIdxList = [
        ...this.$refs.pgeBsc00001Grid2.getAllStateRows().created,
      ];
      // 추가 버튼을 누른 후 입력하지 않은 addRow >> 삭제
      if (this.checkedList.lastItem === rowState.created.lastItem) {
        this.$refs.pgeBsc00001Grid2.onDelRow(changeIdxList);
        return;
      }
      this.ticketDelete();
    },
    // 행 삭제
    ticketDelete() {
      const changeIdxList = [
        ...this.$refs.pgeBsc00001Grid2.getCheckedItems()
      ];
      let changeList = [];
      utils.forEach(changeIdxList, (dataRow) => {
        let jsonRow = this.$refs.pgeBsc00001Grid2.getJsonRows()[dataRow];
        jsonRow.mstId = utils.trim(this.selectedGridRowData.mstId),
        changeList.push(jsonRow);
      });
      let paramList = [...changeList]
      // 삭제하시겠습니까?
      utils.messageBox("confirm", this.$t('MSG_ALT_DEL'), null,
        (/* ok */) => {
          http.request("PGE_BSC_00001", "DTS_BSC_00006", {
              data: paramList,
          }).then(() => {
            // 체크된 row 가져오기 return Array
            this.$refs.pgeBsc00001Grid2.onDelRow(this.checkedList);
            // 삭제 되었습니다. >> 삭제 후 재조회
            utils.messageBox("success", this.$t('MSG_ALT_DEL_DATA'), null, this.search);
          }).catch((error) => {
            console.log(error);
          });
        },
        (/* cancel */) => {}
      );
    },
    // 쿠폰마스터 그리드 셀 수정
    gridCellEdited(grid, itemIndex, row, field) {
      // 쿠폰마스터 그리드 커밋
      grid.commit(true);
    },
    // 쿠폰마스터 그리드 row 변경시 이벤트
    gridEditRowChanged(grid, itemIndex, dataRow, field, oldValue, newValue) {
      grid.commit(true);
      // 현재 그리드 데이터
      this.checkList = this.$refs.pgeBsc00001Grid.getJsonRows();
      this.$refs.pgeBsc00001Grid.setValue(itemIndex, "paymntDcnt", "D+ " + this.checkList[itemIndex].paymntDcnt)

      // 변경된 데이터가 처음데이터와 같은지 체크 paymntCnt
      if (this.checkList[itemIndex].paymntDcnt == this.gridDataList[itemIndex].paymntDcnt) {
        this.$refs.pgeBsc00001Grid.onNoneRow(dataRow);
      }
      this.$refs.pgeBsc00001Grid.onUpdRow(itemIndex);
      this.nowStateList = this.$refs.pgeBsc00001Grid.getAllStateRows();
    },
    // 변경내용 확인
    checkValidation() {
      let chkVal = true;
      // 그리드 행 상태값 가져오기
      this.nowStateList = this.$refs.pgeBsc00001Grid.getAllStateRows();
      if (this.nowStateList.updated.length === 0) {
        // 변경내용 없음
        return false;
      } 
      return chkVal;
    },
    // 지급대상권종 그리드 셀 수정
    gridCellEdited2(grid, itemIndex, row, field) {
      // 지급대상권종 그리드 커밋
      grid.commit(true);
    },
    // 지급대상 권종 그리드 row 변경시 이벤트
    gridEditRowChanged2(grid, itemIndex, dataRow, field, oldValue, newValue) {
      grid.commit(true);
      // 현재 그리드 데이터
      this.checkList2 = this.$refs.pgeBsc00001Grid2.getJsonRows();

      // 변경된 데이터가 처음데이터와 같은지 체크 paymntCnt
      if (this.checkList2[itemIndex].paymntCnt == this.gridDataList2[itemIndex].paymntCnt) {
        this.$refs.pgeBsc00001Grid2.onNoneRow(dataRow);
      }
      this.$refs.pgeBsc00001Grid2.onUpdRow(itemIndex);
      this.nowStateList2 = this.$refs.pgeBsc00001Grid2.getAllStateRows();
    },
    // 변경내용 확인
    checkValidation2() {
      let chkVal = true;
      // 그리드 행 상태값 가져오기
      this.nowStateList2 = this.$refs.pgeBsc00001Grid2.getAllStateRows();
      if (this.nowStateList2.updated.length === 0) {
        // 변경내용 없음
        return false;
      } 
      return chkVal;
    },
    // 쿠폰마스터 Grid >> 매핑된 지급대상 권종 조회할 때
    getSearchParam2() {
      const params = {
        issueSeq: utils.trim(this.selectedGridRowData.issueSeq), // 발행순서
        cpnMstNo: utils.trim(this.selectedGridRowData.cpnMstNo), // 쿠폰마스터번호
      };
      return params;
    },
    detailCouponMaster() {
      if (this.cpnMstNo === "" || this.cpnMstNo === null) {
        return;
      } else {
        const params = this.getSearchParam2();
        http.request(this.$options.name, "DTS_BSC_00004", {
            query: params,
        }).then((res) => {
          if (res.data) {
            const resData = res.data;
            this.totalCnt2 = res.data.length;
            utils.map(resData, (data) => {
              // 정상가 (금액) data format >> 숫자 콤마
              data.price = _.isNull(data.price) ? data.price : utils.numberWithCommas(data.price);
            });
            this.gridDataList2 = resData;
            this.$refs.pgeBsc00001Grid2.setRows(this.gridDataList2);
          }
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    // 리얼그리드 셀 클릭 이벤트
    gridCellClick(grid, data) {
      if (data.dataRow >= 0 && !this.addCheck) {
        this.clickCheck = true;
        this.selectedGridRowData = this.gridDataList[data.dataRow];
        // 쿠폰마스터 Grid row 해당하는 파라미터를 넘겨 지급대상 권종 조회
        this.detailCouponMaster();
      } else {
        this.selectedGridRowData = {};
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
