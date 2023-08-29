<template>
  <!-- 이용가능권종 -->
  <div class="inbox">
    <div class="comm_title_wrap">
      <h4 class="pr10">{{ $t('MSG_TXT_AVAIL_ITEM') }}</h4>
      <ur-button color="violet" @click="clickSearch">{{ $t('MSG_BTN_SEARCH_LIST') }}</ur-button>
      <ur-button color="violet" @click="clickAllSearch">{{ $t('MSG_TXT_ALL') }}</ur-button>
    </div>
    <div class="comm_view_wrap mt10 mb10">
      <div class="row">
        <div class="col-xs-1">{{ $t('MSG_TXT_ITEM_KIND') }}</div>
        <div class="col-xs-3">
          <ur-dropdown v-model="itemKind" :items="itemKindCdsForDropDown" />
        </div>
        <div class="col-xs-1">{{ $t('MSG_TXT_ITEM_CD') }}</div>
        <div class="col-xs-3">
          <ur-text-field v-model="itemCd" style="width: 100%; height: auto" mask="##########" maxLength="10"/>
        </div>
        <div class="col-xs-1">{{ $t('MSG_TXT_TICKET_ITEM_NM') }}</div>
        <div class="col-xs-3">
          <ur-text-field v-model="itemNm" style="width: 100%; height: auto" @keyup="specialChar()" maxLength="50"/>
        </div>
      </div>
    </div>
    <real-grid ref="grid" grid-id="PGE_JNR_0001_ITEM" grid-root="/lib"
        :gridFields="grdFields"
        :gridColumns="grdColumns" 
        :gridRows="grdDataList" 
        :gridInit=false
        :gridMounted="gridMounted"
        :gridCheckBar="{ visible: false }"
        :gridDbCellClick="gridDbCellClick"
        :style="{ height: '300px' }" 
    />
  </div>
</template>

<script>

import _ from 'lodash'
export default {
  name: 'PGE_JNR_00001_P02',
  props: {
    pageName: {
      type: String,
      default: '',
    },
    selectItem: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      //Grid 세팅
      gridView: null,
      dataProvider: null,
      grdFields: [],
      grdColumns: [],
      grdDataList: [],

      itemKindCdsForDropDown : [], //권종구분 공통코드(드롭다운용)
      itemKindCds : [], //권종구분 코드
      itemKindNms : [], //권종구분 명

      //회원정보
      memshpUid : '', //멤버십UID
      parkKind : '', //파크구분
      yearKind : '', //인원구분
      joinYcnt : 0, //연차

      //재가입자 이전 정기권정보
      oldItemCd : '', //이전권종코드

      //조회조건
      itemKind : '', //권종구분
      itemCd : '', //권종코드
      itemNm : '', //권종명

      //선택 권종
      selItem : null,
    }
  },
  created() {
    this.grdFields = [
      { fieldName: "itemCd", dataType: "text", }, // 권종코드
      { fieldName: "itemNm", dataType: 'text', }, // 권종명
      { fieldName: "validStartDate", dataType: 'text', }, // 유효시작일자
      { fieldName: "validEndDate", dataType: 'text', }, // 유효종료일자
      { fieldName: "price", dataType: 'number', }, // 기준가격
      { fieldName: "condTypeCd", dataType: 'text', }, // 컨디션유형코드
      { fieldName: "availDay", dataType: 'number', }, // 사용가능일
      { fieldName: "preAvailDay", dataType: 'number', }, // 이전사용가능일
      { fieldName: "freeAvailDay", dataType: 'number', }, // 무료사용가능일
      { fieldName: "ticketTypeKind", dataType: 'text', }, // 권종그룹코드
      { fieldName: "planKind", dataType: 'text', }, // 계획구분
      { fieldName: "joinKind", dataType: 'text', }, // 가입유형
      { fieldName: "acKind", dataType: 'text', }, // 대인/소인 구분
      { fieldName: "ifSeq", dataType: 'text', }, // IF순번
      { fieldName: "enableDay", dataType: 'number', }, // 사용가능일
      { fieldName: "expireExtendDay", dataType: 'number', }, // 만기연장일
      { fieldName: "itemKind", dataType: 'text', }, // 권종구분
      { fieldName: "expireTypeCd", dataType: 'text', }, // 만료유형코드, ET01:변동형, ET02:고정형
      { fieldName: "limitExpireDate", dataType: 'text', }, // 만료제한일자
      { fieldName: "issueStartDate", dataType: 'text', }, // 발급시작일자
      { fieldName: "issueEndDate", dataType: 'text', }, // 발급종료일자
      { fieldName: "ilmoYn", dataType: 'text', }, // 일모여부
      { fieldName: "itemPreJoinYn", dataType: 'text', }, // 권종 선가입가능 여부
      { fieldName: "periodCnt", dataType: 'text', }, // 다회권 사용가능 횟수
      { fieldName: "memberDcFg", dataType: 'text', }, // 멤버십포인트 적립대상 여부
    ];
    this.grdColumns = [
      {
        name: "itemCd",
        fieldName: "itemCd",
        header: { text: this.$t('MSG_TXT_ITEM_CD') },
        width: 70,
        editable: false, 
      },
      {
        name: "itemNm",
        fieldName: "itemNm",
        header: { text: this.$t('MSG_TXT_TICKET_ITEM_NM') },
        width: 200,
        styleName: 'align-left',
        editable: false, 
      },
      {
        name: "price",
        fieldName: "price",
        header: { text: this.$t('MSG_TXT_STD_PRICE') },
        width: 70,
        numberFormat: "#,##0",
        styleName: 'align-center',
        editable: false, 
      },
    ];
  },
  mounted() {},
  watch : {},
  computed : {},
  methods: {
    /**
     * 이용가능권종 Grid Mounted 되면 호출
     */
    async gridMounted() {
      //공통코드 조회
      http
      .getCodeList(this.pageName, ["COD_IT"], "")
      .then((res) => {
        //권종 구분
        this.itemKindCdsForDropDown.push({ value: "", text: "전체" });
        utils.forEach(res["COD_IT"], (codeObj) => {
          this.itemKindCdsForDropDown.push({ value: codeObj.codeId, text: codeObj.codeName });
          this.itemKindCds.push(codeObj.codeId);
          this.itemKindNms.push(codeObj.codeName);
        });
      })
      .catch((err) => {
        this.trace(err);
      });

      //grid 초기화
      await({ "gridView": this.gridView, "dataProvider": this.dataProvider } = this.$refs.grid.initGrid());

      //Grid footer 안보이게 설정
      this.gridView.setFooters({ visible: false, });

      //check bar 보이게 설정
      this.gridView.setCheckBar({visible: true});

      //grid style set 
      this.$refs.grid.setFitStyle("even");
    },
    /**
     * 이용가능권종 Grid Cell DbClick
     * @param { Object } clickData
     */
    gridDbCellClick(clickData) {
      let dataRow = this.gridView.getDataRow(clickData.itemIndex);
      this.selItem = this.dataProvider.getJsonRows(dataRow,dataRow)[0];
      this.selectItem(this.selItem, true);
    },
    /**
     * 초기화
     */
    clearAvailableItem() {
      this.memshpUid = '';
      this.parkKind = '';
      this.yearKind = '';
      this.joinYcnt = '';
      this.oldItemCd = '';

      //검색조건 초기회
      this.itemKind = '';
      this.itemCd = '';
      this.itemNm = '';

      this.selItem = null;

      //Grid 초기화
      this.setGridData([]);
    },
    /**
     * 선택된 회원변경시 이용가능권종 초기화 및 조회
     * @param { String } memshpUid
     * @param { String } parkKind
     * @param { String } yearKind
     * @param { String } joinYcnt
     * @param { String } oldItemCd
     */
    changeMember(memshpUid, parkKind, yearKind, joinYcnt, oldItemCd) {

      this.clearAvailableItem();

      //Grid 초기화
      this.setGridData([]);

      //선택 회원의 정보 세팅
      this.memshpUid = memshpUid;
      this.parkKind = parkKind;
      this.yearKind = yearKind;
      this.joinYcnt = joinYcnt;
      this.oldItemCd = oldItemCd;

      if (utils.length(this.memshpUid) > 0) {
        //조회
        this.clickSearch();
      }
    },
    /**
     * 이용가능 권종 조회
     */
    clickSearch() {
      if (utils.length(this.memshpUid) == 0) {
        utils.messageBox('alert', this.$t('MSG_ALT_PLZ_SEL_MEMBER'));
        return;
      }
      const params = { 
         memshpUid: this.memshpUid
        ,parkKind: this.parkKind 
        ,yearKind: this.yearKind
        ,joinYcnt: this.joinYcnt
        ,oldItemCd: this.oldItemCd
        ,itemKind: this.itemKind
        ,itemCd: this.itemCd
        ,itemNm: this.itemNm
      }
      console.log(params);
      http.request(this.pageName, 'DTS_JNR_00001', {
        data : params,
      }).then(res => {
        this.setGridData(res.data);
      }).catch(error => console.log(error));
    },
    /**
     * 전체 권종 조회 팝업 호출
     */
    clickAllSearch() {
      if (utils.length(this.memshpUid) == 0) {
        utils.messageBox('alert', this.$t('MSG_ALT_PLZ_SEL_MEMBER'));
        return;
      }
      utils.openLayerPopup('PGE_CTM_00003', this.onAllTicketPopupCallback, {
        pageInitialData: {},
        size: 'lg',
      });
    },
    /**
     * 전체 권종 조회 팝업 Callback
     * @param { Object } data
     */
    onAllTicketPopupCallback(data) {
      if (data) {
        this.dataProvider.addRow(data);
        this.selItem = data;
        this.selectItem(data, true);
      }
    },
    /**
     * 이용가능권종 Grid Data Setting
     */
    setGridData(dataList) {
        this.grdDataList = dataList;
        this.dataProvider.fillJsonData(dataList, { fillMode: "set" });
    },
    /**
     * 검색 필드 특수문자 체크
     */
    specialChar() {
      const searchNewText = utils.trim(this.itemNm);
      if (utils.isExistSpecialChar(searchNewText)) {
        // `-_{}[];:<>/? 제외 특수문자는 입력할 수 없습니다.
        utils.messageBox('warning', this.this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.itemNm = ''
        });
      }
    },
  },
};
</script>

<style scoped>
</style>
