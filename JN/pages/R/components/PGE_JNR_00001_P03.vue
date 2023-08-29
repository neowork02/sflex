<template>
  <!-- 제휴할인 -->
  <div class="inbox">
    <div class="comm_title_wrap">
      <h4 class="pr10">{{ $t('MSG_TXT_AFFILIATE_DISCOUNT') }}</h4>
    </div>
    <ur-form-box toggleable>
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TXT_DIV')"
        :labelAlign="'right'"
        style="width: 100%; height: auto; border: 0"
      >
        <div class="radioForm" style="margin: 3px 0">
          <ur-radio v-model="discountType" value="card" sm :disabled='disabledDiscountType.card'>{{ $t('MSG_TXT_AFFILIATE_CARD') }}</ur-radio>
          <ur-radio v-model="discountType" value="cust" sm :disabled='disabledDiscountType.cust'>{{ $t('MSG_TXT_NORMAL') }}</ur-radio>
          <ur-radio v-model="discountType" value="preIssue" sm :disabled='disabledDiscountType.preIssue'>{{ $t('MSG_TXT_PRE_ISSUE_TICKET') }}</ur-radio>
          <ur-radio v-model="discountType" value="ilmo" sm :disabled='disabledDiscountType.ilmo'>{{ $t('MSG_TXT_ILMO_CARD') }}</ur-radio>
        </div>
      </ur-form-item>
    </ur-form-box>

    <div v-show="showDiv.card" class="mt10">
      <real-grid ref="cardGrid" grid-id="PGE_JNR_0001_DISCOUNT_CARD" grid-root="/lib"
        :gridFields="cardGrdFields"
        :gridColumns="cardGrdColumns" 
        :gridRows="[]" 
        :gridInit=false
        :gridMounted="cardGridMounted"
        :gridDbCellClick="cardGridDbCellClick"
        :gridCheckBar="{ visible: false }"
        :style="{ height: '300px' }" 
      />        
    </div>

    <div v-show="showDiv.cust" class="mt10">
      <real-grid ref="custGrid" grid-id="PGE_JNR_0001_DISCOUNT_CUST" grid-root="/lib"
        :gridFields="custGrdFields"
        :gridColumns="custGrdColumns" 
        :gridRows="[]" 
        :gridInit=false
        :gridMounted="custGridMounted"
        :gridDbCellClick="custGridDbCellClick"
        :gridCheckBar="{ visible: false }"
        :style="{ height: '300px' }" 
      />
    </div>

    <div v-show="showDiv.preIssue" class="mt10">
      <!-- <div class="inbox7"> -->
        <ur-form-box toggleable>
          <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_AMT_MARK_KIND')" :labelAlign="'right'" style="width: 100%; height: auto; border: 0">
            <div class="radioForm" style="margin: 3px 0">
              <ur-radio v-model="preIssueInfo.amtMarkKind" value="0" @click="clickAmtMarkKind" sm>{{ $t('MSG_TXT_UNMARKED') }}</ur-radio>
              <ur-radio v-model="preIssueInfo.amtMarkKind" value="1" @click="clickAmtMarkKind" sm>{{ $t('MSG_TXT_MARK') }}</ur-radio>
            </div>
          </ur-form-item>
          <ur-form-item class="flex_wrap borTop" :label="$t('MSG_TXT_PRE_ISSUE_TICKET_NO')" maxlength="16" :labelAlign="'right'" style="width: 100%; height: auto">
            <ur-text-field ref="preIssueNo" v-model='preIssueInfo.preIssueNo' @keyup.enter="enterPreIssueNo" style="width: 100%; height: auto" mask="NNNNNNNNNNNNNNNN" maxLength="16" :readonly="readonlyTextPreIssueNo"/>
          </ur-form-item>
          <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_FACE_VALUE')" :labelAlign="'right'" style="width: 100%; height: auto">
            <ur-text-field v-model='preIssueInfo.preIssuePriceAmt' mask="number" style="width: 100%; height: auto" readonly/>
          </ur-form-item>
          <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_TICKET_PRICE')" :labelAlign="'right'" style="width: 100%; height: auto" :readonly="readonlyTextPreIssueAmt">
            <ur-text-field ref='preIssueAmt' v-model='preIssueInfo.preIssueAmt' @keyup.enter="enterPreIssueAmt" mask="number" style="width: 100%; height: auto" />
          </ur-form-item>
          <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_DISCOUNT_AMT_ONE')" :labelAlign="'right'" style="width: 100%; height: auto" readonly>
            <ur-text-field v-model='preIssueInfo.cond11laAmt' mask="number" style="width: 100%; height: auto" />
          </ur-form-item>
          <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_DISCOUNT_AMT_TWO')" :labelAlign="'right'" style="width: 100%; height: auto" readonly>
            <ur-text-field v-model='preIssueInfo.cond11l7Amt' mask="number" style="width: 100%; height: auto" />
          </ur-form-item>
          <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_VALID_YN')" :labelAlign="'right'" style="width:100%; height: auto" readonly>
            <ur-text-field v-model='preIssueInfo.expireText' style="width: 100%; height: auto" />
          </ur-form-item>
        </ur-form-box>
      <!-- </div> -->
    </div>

    <div v-show="showDiv.ilmo" class="mt10">
      <!-- <div class="inbox7"> -->
        <ur-form-box toggleable>
          <!-- S::[2023-06-19] 수정  -->
          <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_ILMO_CARD_OR_OTC')" :labelAlign="'right'"  style="width: 100%; height: auto" >
              <ur-text-field ref="ilmoCardCode" v-model='ilmoInfo.ilmoCardCode' @keyup.enter="enterIlmoCardCode" mask="################" maxlength='16' class="pr10" style="width:84%; height: auto" :readonly="readonlyTextIlmoCardCode"/>
                <div style="width:16%"> 
                <ur-button color="violet" @click="clickSearchIlmoAmt">{{ $t('MSG_BTN_SEARCH_BALANCE') }}</ur-button>
              </div>
          </ur-form-item>
          <!-- E::[2023-06-19] 수정 -->
          <ur-form-item class="flex_wrap borTop" :label="$t('MSG_TXT_CARD_NO')" maxlength="16" :labelAlign="'right'" style="width: 100%; height: auto">
            <ur-text-field v-model='ilmoInfo.ilmoCardNo' style="width: 100%; height: auto" readonly/>
          </ur-form-item>
          <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_ILMO_AMT')" maxlength="16" :labelAlign="'right'" style="width: 100%; height: auto">
            <ur-text-field v-model='ilmoInfo.ilmoAmt' mask="number" style="width: 100%; height: auto" readonly/>
          </ur-form-item>
          <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_USE_AMT')" :labelAlign="'right'" style="width: 100%; height: auto">
            <ur-text-field ref='ilmoUseAmt' v-model='ilmoInfo.ilmoUseAmt' mask="number" style="width: 100%; height: auto" readonly/>
          </ur-form-item>
        </ur-form-box>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>

import _ from 'lodash'
export default {
  name: 'PGE_JNR_00001_P03',
  props: {
    pageName: {
      type: String,
      default: '',
    },
    getDiscountType: {
      type: Function,
      required: false,
    },
    checkPreIssePayYn: {
      type: Function,
      required: false,
    },
    setDiscountInfo: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      nowDate : null, //오늘일자(서버설정된 오늘 판매일자)
      
      selMemshpUid: null, //.현재 선택 회원 멤버십 UID
      selItem : null, //현재 선택 권종
      defultDicountType : 'cust', // default 제휴할인 유형
      discountType: null, // 현재 선택 제휴할인 유형

      //disabled
      disabledDiscountType:{card:true, cust:true, preIssue:true, ilmo:true},

      //show/hide
      showDiv: {card:true, cust:true, preIssue:false, ilmo:false},

      //제휴카드할인 Grid 세팅
      cardGridView: null,
      cardDataProvider: null,
      cardGrdFields: [],
      cardGrdColumns: [],

      //일반할인 Grid 세팅
      custGridView: null,
      custDataProvider: null,
      custGrdFields: [],
      custGrdColumns: [],

      preIssueDcNm: '선발행티켓', //선발행권 할인명
      ilmoDcNm: '일모포인트 할인', //일모 할인명
      exTernalPreIssueNm: '외부선발행권', // 외부선발행권명

      //일모할인정보
      ilmoInfo: {ilmoCardCode: '', //일모 포인트 조회시 사용한 번호(OTC 또는 카드번호)
                 ilmoCardNo: '', // 일모 카드번호 
                 ilmoAmt: '', // 일모 포인트 금액
                 ilmoUseAmt: '', // 일모 포인트 사용 금액
                },

      //선발행티켓 적용 정보
      preIssueInfo : {seqNo: '', // 순번
                      preIssueNo: '', // 선발행티켓번호
                      preIssuePriceAmt: '', // 선발행티켓판가_액면금액
                      preIssueCnt: '', // 선발행티켓결제건수
                      preIssueAmt: '', // 선발행티켓결제금액
                      remainAmt: '', // 선발행티켓잔여금액 
                      cond11aAmt: '', // 선발행티켓 할인가I
                      cond11l7Amt: '', // 선발행티켓  할인가II
                      custKind: '', // 선발행티켓  CUST_KIND
                      expireStartDate: '', //선발행티켓 유효시작일자
                      expireEndDate: '', //선발행티켓 유효종료일자
                      amtMarkKind: '', // 선발행티켓 금액표기구분
                      expireText: '', // 선발행티켓 유효여부
                      externalYn: '', // 외부선발행권 여부
                    },

      //discount Map
      discountMap: {}, //memshpUid(key), discountType(string)

      //제휴카드 할인 Map
      cardMap: {},  //memshpUid(key), cardDicount(jsonObject)
      //일반 할인 Map
      custMap: {}, //memshpUid(key), custDicount(jsonObject)
      //선발행티켓 Map
      preIssueMap: {}, //memshpUid(key), preIssueInfo(jsonObject)
      //일모할인 Map
      ilmoMap: {}, //memshpUid(key), ilmoInfo(jsonObject)

    }
  },
  created() {
    //제휴카드할인
    this.cardGrdFields = [
      { fieldName: "itemCd", dataType: "text", }, // 권종코드
      { fieldName: "condTypeCd", dataType: 'text', }, // 컨디션유형코드
      { fieldName: "dcType", dataType: 'text', }, // 할인유형(제휴사코드, 고객구분)
      { fieldName: "dcNm", dataType: 'text', }, // 할인명(제휴사코드명, 고객구분명)
      { fieldName: "dcAmt", dataType: 'number', }, // 할인가격
      { fieldName: "cardCompCd", dataType: 'text', }, // 제휴사코드
      { fieldName: "validStartDate", dataType: 'text', }, // 유효시작일자
      { fieldName: "validEndDate", dataType: 'text', }, // 유효종료일자
      { fieldName: "ifSeq", dataType: 'text', }, // IF순번
    ];
    this.cardGrdColumns = [
      {
        name: "dcType",
        fieldName: "dcType",
        header: { text: this.$t('MSG_TXT_CODE') },
        width: 80,
        editable: false, 
      },
      {
        name: "dcNm",
        fieldName: "dcNm",
        header: { text: this.$t('MSG_TXT_TYPE_NM') },
        width: 180,
        styleName: 'align-left',
        editable: false, 
      },
      {
        name: "dcAmt",
        fieldName: "dcAmt",
        header: { text: this.$t('MSG_TXT_DISCOUNT') },
        width: 180,
        numberFormat: "#,##0",
        styleName: 'align-center',
        editable: false, 
      },
    ];

    //일반할인
    this.custGrdFields = [
      { fieldName: "itemCd", dataType: "text", }, // 권종코드
      { fieldName: "condTypeCd", dataType: 'text', }, // 컨디션유형코드
      { fieldName: "dcType", dataType: 'text', }, // 할인유형(제휴사코드, 고객구분)
      { fieldName: "dcNm", dataType: 'text', }, // 할인명(제휴사코드명, 고객구분명)
      { fieldName: "dcAmt", dataType: 'number', }, // 할인가격
      { fieldName: "cardCompCd", dataType: 'text', }, // 제휴사코드
      { fieldName: "validStartDate", dataType: 'text', }, // 유효시작일자
      { fieldName: "validEndDate", dataType: 'text', }, // 유효종료일자
      { fieldName: "ifSeq", dataType: 'text', }, // IF순번
    ];
    this.custGrdColumns = [
      {
        name: "dcType",
        fieldName: "dcType",
        header: { text: this.$t('MSG_TXT_CODE') },
        width: 80,
        editable: false, 
      },
      {
        name: "dcNm",
        fieldName: "dcNm",
        header: { text: this.$t('MSG_TXT_TYPE_NM') },
        width: 180,
        styleName: 'align-left',
        editable: false, 
      },
      {
        name: "dcAmt",
        fieldName: "dcAmt",
        header: { text: this.$t('MSG_TXT_DISCOUNT') },
        width: 180,
        numberFormat: "#,##0",
        styleName: 'align-center',
        editable: false, 
      },
    ];
  },
  mounted() {
    //매출일자
    this.nowDate = this.$store.getters.userInfo.saleDate;
  },
  watch : {
    discountType: {
      handler() {
        //DIV display 변경하기
        this.displayDiv();

        let ilmoYn = ''
        //현재 disabled mode
        if (this.selItem == null || this.selMemshpUid == null) {
          return;
        } else {
          ilmoYn = (this.selItem != null && this.selItem.ilmoYn == 'Y')? 'Y' : 'N';
        }
        
        if (ilmoYn != "Y") {
          //일모할인정보 Clear
          for (let key in this.ilmoInfo) {
            this.ilmoInfo[key] = ''; 
          }
        }
        
        if (ilmoYn != "Y" && this.discountType == 'ilmo') {
          //일모카드 할인을 선택할 수 없는 권종입니다.
          utils.messageBox('alert', this.$t('MSG_ALT_ITEM_THAT_CAN_NOT_SEL_ILMO_DISCOUNT'));
          this.discountType = this.defultDicountType;
          return;
        }

        if (this.discountType == 'preIssue') {
          // 선발행 티켓
          if(this.selItem != null && this.preIssueMap == null) {
            this.preIssueMap = {};
          }
          this.$refs.preIssueNo.focus();
        }
        else if (this.discountType == 'ilmo') {
          // 일모
          if(this.selItem != null && this.selItem.ilmoYn == 'Y' && this.ilmoInfo == null) {
            this.ilmoInfo = {};
          }
          this.$refs.ilmoCardCode.focus();
          this.searchDiscount();
        }
        // 제휴카드/일반 할인 정보 조회
        else if (this.discountType == 'card' || this.discountType == 'cust') {
          this.searchDiscount();
        }
      }
    },
  },
  computed : {
    /**
     * 선발행 티켓 번호 Text readonly 여부
     */
    readonlyTextPreIssueNo() {
      if (this.discountType == 'preIssue' && this.selItem != null && utils.length(this.preIssueInfo.amtMarkKind) > 0) {
        return false;
      }
      else {
        return true;
      }
    },
    /**
     * 선발행 티켓 금액 Text readonly 여부
     */
    readonlyTextPreIssueAmt() {
      //외부선발행권인 경우만 티켓금액 입력 가능
      if (this.discountType == 'preIssue' && this.selItem != null && utils.length(this.preIssueInfo.amtMarkKind) > 0 && utils.length(this.preIssueInfo.preIssueNo) > 0 && this.preIssueInfo.externalYn == 'Y') {
        return false;
      }
      else {
        return true;
      }
    },
    /**
     * 일모 카드/OTC 번호 Text readonly 여부
     */
    readonlyTextIlmoCardCode() {
      if (this.discountType == 'ilmo' && this.selItem != null && this.selItem.ilmoYn == 'Y') {
        return false;
      }
      else {
        return true;
      }
    },
    
  },
  methods: {
    /**
     * 제휴카드할인 Grid Mounted 되면 호출
     */
    async cardGridMounted() {
      //grid 초기화
      await({ "gridView": this.cardGridView, "dataProvider": this.cardDataProvider } = this.$refs.cardGrid.initGrid());

      //Grid footer 안보이게 설정
      this.cardGridView.setFooters({ visible: false, });

      //check bar 보이게 설정
      this.cardGridView.setCheckBar({visible: false});

      //grid style set 
      this.$refs.cardGrid.setFitStyle("even");

      setTimeout( () => { 
        this.endGridMounted();
        
      }, 1000);
    },
    /**
     * 일반할인 Grid Mounted 되면 호출
     * @param { String } memshpUid
     */
    async custGridMounted() {
      //grid 초기화
      await({ "gridView": this.custGridView, "dataProvider": this.custDataProvider } = this.$refs.custGrid.initGrid());

      //Grid footer 안보이게 설정
      this.custGridView.setFooters({ visible: false, });

      //check bar 보이게 설정
      this.custGridView.setCheckBar({visible: false});

      //grid style set 
      this.$refs.custGrid.setFitStyle("even");
    },
    /**
     * Grid 모두 Mounted 되면 호출
     * Grid는 Visible 해야 제대로 세팅 됨.
     */
    endGridMounted() {
      //제휴카드 숨기기
      this.showDiv.card = false; 
      //default 제휴할인 유형 지정
      this.discountType = this.defultDicountType;
    },
    /**
     * 제휴할인 Enabled
     * @param { String } memshpUid
     * @param { Object } selItem
     */
    discountEnabled(memshpUid, selItem) {
      console.log("discountEnabled["+memshpUid+"]["+  this.selMemshpUid +"]");
      console.log("discountEnabled["+memshpUid+"]", selItem);
      //기존 입력 Temp 정보 Clear
      if (this.selMemshpUid != memshpUid) {
        //선발행티켓정보 Clear
        for (let key in this.preIssueInfo) {
          this.preIssueInfo[key] = ''; 
        }
        //일모할인정보 Clear
        for (let key in this.ilmoInfo) {
          this.ilmoInfo[key] = ''; 
        }
      }

      this.selMemshpUid = memshpUid;
      this.selItem = JSON.parse(JSON.stringify(selItem));

      if (this.discountMap[memshpUid] != null) {
        
        this.discountType = this.discountMap[memshpUid];
        if (this.discountType == 'ilmo' && this.selItem.ilmoYn == "N") {
          this.discountMap[memshpUid] = null;
          this.ilmoMap[memshpUid] = null;
          this.discountType == this.defultDicountType;
        }
        //선발행티켓
        else if (this.discountType == 'preIssue') {
          if (this.preIssueMap[memshpUid] != null) {
            this.preIssueInfo = JSON.parse(JSON.stringify(this.preIssueMap[memshpUid]));
            console.log("discountEnabled.this.preIssueInfo", this.preIssueInfo);
          }
        }
        //일모
        else if (this.discountType == 'ilmo') {
          if (this.ilmoMap[memshpUid] != null) {
            this.ilmoInfo = JSON.parse(JSON.stringify(this.ilmoMap[memshpUid]));
            this.searchDiscount();
            console.log("discountEnabled.this.ilmoInfo", this.ilmoInfo);
          }
        }
      }
      else if (this.selItem.ilmoYn == "Y") {
        this.discountType = 'ilmo';
        this.searchDiscount();
      }
      else {
        this.discountType = this.defultDicountType;
      }
      
      if (this.discountType == 'card' || this.discountType == 'cust') {
        this.searchDiscount();
      }
      
      for (let key in this.disabledDiscountType) {
        if (key == "ilmo" && this.selItem.ilmoYn == "N") {
          this.disabledDiscountType[key] = true; 
        }
        else {
          this.disabledDiscountType[key] = false; 
        }
      }
    },
    /**
     * 제휴할인 Disabled
     */
    discountDisabled() {
      this.selMemshpUid = null;
      this.selItem = null;
      this.discountType = this.defultDicountType;;

      //제휴할인 유형 Radio Diabled
      for (let key in this.disabledDiscountType) {
        this.disabledDiscountType[key] = true; 
      }

      //선발행티켓정보 Clear
      for (let key in this.preIssueInfo) {
        this.preIssueInfo[key] = ''; 
      }

      //일모할인정보 Clear
      for (let key in this.ilmoInfo) {
        this.ilmoInfo[key] = ''; 
      }

      //grid clear
      this.cardDataProvider.fillJsonData([], { fillMode: "set" });
      this.custDataProvider.fillJsonData([], { fillMode: "set" });
    },
    /**
     * 할인구분에 따른 화면 Display 설정
     */
    displayDiv() {
       for (let key in this.showDiv) {
        if (key == this.discountType) {
          this.showDiv[key] = true;
        }
        else {
          this.showDiv[key] = false;
        }
      }
    },
    /**
     * 해당 회원 할인정보 삭제
     * @param { String } memshpUid
     */
    deleteDicount(memshpUid) {
      this.discountMap[memshpUid] = null;
      this.cardMap[memshpUid] = null;
      this.custMap[memshpUid] = null;
      this.preIssueMap[memshpUid] = null;
      this.ilmoMap[memshpUid] = null;
    },
    /**
     * 전체 할인정보 삭제
     */
    deleteDicountAll() {
      this.discountMap = {};
      this.cardMap = {};
      this.custMap = {};
      this.preIssueMap = {};
      this.ilmoMap = {};
    },
    /**
     * 할인정보 Return
     * @param { String } memshpUid
     */
    getDiscountInfo(memshpUid) {
      let discountInfo = null;
      let temp = null;
      if (this.discountMap[memshpUid] != null) {
        switch (this.discountMap[memshpUid]) {
          case 'card':
          case 'cust':
            if (this.discountMap[memshpUid] == 'card') {
              temp = this.cardMap[memshpUid];
            }
            else if (this.discountMap[memshpUid] == 'cust') {
              temp = this.custMap[memshpUid];
            }
            console.log("getDiscountInfo:["+ memshpUid +"]", temp);
            if (temp != null) {
              discountInfo = JSON.parse(JSON.stringify(temp));
              
              // 제휴카드인 경우 제휴청구금 정보를 예수금 항목에 표시한다.
              if (discountInfo.condTypeCd == '15L1') {
                discountInfo.subType = '20L1';
                discountInfo.cardSvcCd = discountInfo.dcType;

                let dataRow = this.cardDataProvider.searchDataRow({fields:['itemCd', 'cardCompCd', 'dcType', 'condTypeCd'], values: [discountInfo.itemCd, discountInfo.cardCompCd, discountInfo.dcType, '20L1']});
                if (dataRow > -1) {
                  let row = this.cardDataProvider.getJsonRows(dataRow, dataRow)[0];
                  discountInfo.subAmt = row.dcAmt;
                  discountInfo.subAmtCard = row.dcAmt;
                }
              }
              else if (discountInfo.dcType == null || discountInfo.dcType.trim().length == 0) {
                discountInfo.subTypeCard = '';
                discountInfo.cardCompCd = '';
                discountInfo.subAmtCard = 0;
              }
              discountInfo.saleAmt = parseInt(discountInfo.price - discountInfo.dcAmt);
              discountInfo.approveCardAmt = discountInfo.saleAmt;
            }
            break;
          case 'preIssue':
            temp = this.preIssueMap[memshpUid];
            if (temp != null) {
              discountInfo = JSON.parse(JSON.stringify(temp));
              console.log("discountInfo", discountInfo);
              console.log("discountInfo.price", discountInfo.price);
              discountInfo.condTypeCd = '11L7';
              discountInfo.dcType = '';
              discountInfo.dcNm = this.preIssueDcNm;
              discountInfo.dcAmt = parseInt(discountInfo.cond11laAmt) + parseInt(discountInfo.cond11l7Amt);
              discountInfo.saleAmt = parseInt(discountInfo.price) - parseInt(discountInfo.dcAmt);
              
              discountInfo.cardCompCd = '';
              discountInfo.subTypeCard = '';
              discountInfo.subAmtCard = 0;
            }
            break;
          case 'ilmo':
            temp = this.ilmoMap[memshpUid];
            discountInfo = JSON.parse(JSON.stringify(temp));
            discountInfo.condTypeCd = '11L4';
            discountInfo.dcType = 'A1';
            discountInfo.dcAmt = discountInfo.ilmoUseAmt;
            discountInfo.saleAmt = parseInt(discountInfo.price) - parseInt(discountInfo.dcAmt);
            discountInfo.approveCardAmt = discountInfo.saleAmt;
            break;    
        }
      }
      console.log("getDiscountInfo.discountInfo",discountInfo);
      return discountInfo;
    },
    /**
     * 멤버정보에서 할인정보 추출하여 세팅
     * @param { Object } selMember
     */
    setDiscountInfoFromMember(selMember) {
      console.log("setDiscountInfoFromMember(selMember)", selMember);
      console.log("setDiscountInfoFromMember.selMember.memshpUid", selMember.memshpUid);
      let temp = null;
      switch (selMember.discountType) {
        case 'card':
        case 'cust':
          this.discountMap[selMember.memshpUid] = selMember.discountType;
          temp = {};
          temp.itemCd  = selMember.itemCd;
          temp.condTypeCd  = selMember.condTypeCd;
          temp.dcType  = selMember.dcType;
          temp.dcNm  = selMember.itemNm.replaceAll(selMember.orgItemNm, "").trim();
          temp.dcAmt  = selMember.dcAmt;
          temp.itemNm = selMember.itemNm;
          temp.price = selMember.price;
          temp.saleAmt = selMember.saleAmt;
          temp.cardCompCd  = selMember.cardCompCd;
          if (this.discountMap[selMember.memshpUid] == 'card') {
            this.cardMap[selMember.memshpUid] = temp;
            console.log("setDiscountInfoFromMember.this.cardMap[selMember.memshpUid]", this.cardMap[selMember.memshpUid]);
          }
          else if (this.discountMap[selMember.memshpUid] == 'cust') {
            this.custMap[selMember.memshpUid] = temp;
            console.log("setDiscountInfoFromMember.this.custMap[selMember.memshpUid]", this.custMap[selMember.memshpUid]);
          }
          break;
        case 'preIssue':
          this.discountMap[selMember.memshpUid] = selMember.discountType;
          temp = {};
          temp.discountType = selMember.discountType;
          temp.preIssueNo = selMember.preIssueNo;
          temp.amtMarkKind = selMember.amtMarkKind;
          temp.preIssuePriceAmt = selMember.preIssuePriceAmt;
          temp.preIssueCnt = selMember.preIssueCnt;
          temp.preIssueAmt = selMember.preIssueAmt;
          temp.cond11laAmt = selMember.cond11laAmt;
          temp.cond11l7Amt = selMember.cond11l7Amt;
          temp.custKind = '';
          temp.itemNm = selMember.itemNm;
          temp.price = selMember.price;
          temp.dcNm = selMember.dcNm;
          temp.saleAmt = selMember.saleAmt;
          temp.externalYn = selMember.externalYn;
          if (temp.externalYn == 'Y') {
            temp.expireText = this.exTernalPreIssueNm;
          }
          this.preIssueInfo = JSON.parse(JSON.stringify(temp));
          this.preIssueMap[selMember.memshpUid] = JSON.parse(JSON.stringify(temp));
          console.log("setDiscountInfoFromMember.this.preIssueMap[selMember.memshpUid]", this.preIssueMap[selMember.memshpUid]);
          break;
        case 'ilmo':
          this.discountMap[selMember.memshpUid] = selMember.discountType;
          temp = {};
          temp.itemNm = selMember.itemNm;
          temp.price = selMember.price;
          temp.dcNm = selMember.dcNm;
          temp.saleAmt = selMember.saleAmt;
          temp.ilmoCardCode = selMember.ilmoCardCode;
          temp.ilmoCardNo = selMember.ilmoCardNo;
          temp.ilmoAmt = selMember.ilmoAmt;
          temp.ilmoUseAmt = selMember.ilmoUseAmt;
          this.ilmoInfo = JSON.parse(JSON.stringify(temp));
          this.ilmoMap[selMember.memshpUid] = JSON.parse(JSON.stringify(temp));
          console.log("setDiscountInfoFromMember.this.ilmoMap[selMember.memshpUid]", this.ilmoMap[selMember.memshpUid]);
          break;
      }
    },
    /**
     * 할인정보 조회
     */
    searchDiscount() {
      if (this.selItem == null || utils.length(this.selItem.itemCd) == 0) {
        utils.messageBox('alert', this.$t('MSG_ALT_PLZ_SEL_ITEM'));
        return;
      }
      let discountType = this.discountType;

      if (discountType == "ilmo") {
        discountType = "cust";
      }

      const params = { 
         discountType: discountType
        ,itemCd: this.selItem.itemCd
      }
      http.request(this.pageName, 'DTS_JNR_00003', {
        query : params,
      }).then(res => {
        if (res.data != null && res.data.length > 0) {
          if (discountType == 'card') {
            this.cardDataProvider.fillJsonData(res.data, { fillMode: "set" });
          }
          else if (discountType == 'cust') {
            this.custDataProvider.fillJsonData(res.data, { fillMode: "set" });
          }
        }
        else {
          if (discountType == 'card') {
            this.cardDataProvider.fillJsonData([], { fillMode: "set" });
          }
          else if (discountType == 'cust') {
            this.custDataProvider.fillJsonData([], { fillMode: "set" });
          }
        }

      }).catch(error => console.log(error));
    },
    /**
     * 제휴카드할인 Grid Cell DbClick시 호출
     * @param { Object } clickData
     */
    cardGridDbCellClick(clickData) {
      let dataRow = this.cardGridView.getDataRow(clickData.itemIndex);
      let cardDiscount = this.cardDataProvider.getJsonRows(dataRow,dataRow)[0];
      cardDiscount.itemNm = this.selItem.itemNm + cardDiscount.dcNm;
      cardDiscount.price = this.selItem.price;
      this.cardMap[this.selMemshpUid] = JSON.parse(JSON.stringify(cardDiscount));
      this.discountMap[this.selMemshpUid] = this.discountType;
      this.setDiscountInfo(this.selMemshpUid, this.discountType, this.getDiscountInfo(this.selMemshpUid));
    },
    /**
     * 일반할인 Grid Cell DbClick시 호출
     * @param { Object } clickData
     */
    custGridDbCellClick(clickData) {
      let dataRow = this.custGridView.getDataRow(clickData.itemIndex);
      let custDiscount = this.custDataProvider.getJsonRows(dataRow,dataRow)[0];
      custDiscount.itemNm = this.selItem.itemNm + custDiscount.dcNm;
      custDiscount.price = this.selItem.price;
      this.custMap[this.selMemshpUid] = JSON.parse(JSON.stringify(custDiscount));
      this.discountMap[this.selMemshpUid] = this.discountType;
      this.setDiscountInfo(this.selMemshpUid, this.discountType, this.getDiscountInfo(this.selMemshpUid));

    },
    /**
     * 선발행티켓 금액구분 Click
     */
    clickAmtMarkKind() {
      let result = this.checkPreIssePayYn();
      if (result.amtMarkKind1Yn == "Y" && this.preIssueInfo.amtMarkKind == "0") {
        utils.messageBox('alert', this.$t('MSG_ALT_EXIST_MARKED_THING_SO_CANT_INPUT_UNMARKED_THING'));
        this.preIssueInfo.amtMarkKind = '';
        return false;
      }

      if (result.amtMarkKind0Yn == "Y" && this.preIssueInfo.amtMarkKind == "1") {
        utils.messageBox('alert', this.$t('MSG_ALT_EXIST_UNMAKED_THING_SO_CANT_INPUT_MARKED_THING'));
        this.preIssueInfo.amtMarkKind = '';
        return false;
      }

      //선발행티켓정보 Clear
      for (let key in this.preIssueInfo) {
        if ( key == "amtMarkKind" ) {
        } else {
          this.preIssueInfo[key] = ''; 
        }
      }

      //선발행티켓번호 활성화 및 Focus 이동
      this.$refs.preIssueNo.focus();
    },
    /**
     * 선발행티켓번호를 입력하고 Enter
     */
    enterPreIssueNo() {
      //선발행 티켓번호 모두 지우면 선택되었던 할인정보 모두 Clear
      if (utils.length(this.preIssueInfo.preIssueNo) ==  0) {
        //선발행티켓정보 Clear
        for (let key in this.preIssueInfo) {
          if ( key == "amtMarkKind" ) {
          } else {
            this.preIssueInfo[key] = ''; 
          }
        }
        this.preIssueMap[this.selMemshpUid] = null;
        if (this.getDiscountType() == "preIssue")  {
          //구매정기권정보에 할인정보 Clear
          this.setDiscountInfo(this.selMemshpUid, 'X');
        }
        return;
      }
      //선발행권 티켓정보 조회
      else {
        const params = { 
          preIssueNo: this.preIssueInfo.preIssueNo
        }
        http.request(this.pageName, 'DTS_JNR_00004', {
          query : params,
        }).then(res => {
          //선발행티켓 정보 초기화
          for (let key in this.preIssueInfo) {
            if ( key == "amtMarkKind" || key == "preIssueNo") {
            } else {
              this.preIssueInfo[key] = ''; 
            }
          }

          //내부 설발행권 처리
          if (res.data != null && res.data.length > 0) {
            if(!this.procInternalPreIssueAfterSearch(res)) {
              return false;
            }
          }
          //외부 선발행권 처리
          else {
            this.procExternalPreIssueAfterSearch(res);
          }
        }).catch(error => console.log(error));
      }
    },
    /**
     * 내부 설발행권 조회 후 처리
     * @param { Object } res
     */
    procInternalPreIssueAfterSearch(res) {
      let issueDt = res.data.issueDt; //선발행티켓 발행일
      let expireStartDt = res.data.expireStartDt; //선발행티켓 유효시작일
      let expireEndDt = res.data.expireEndDt; //선발행티켓 유효종료일
      let ticketKind = res.data.tickKind; //선발행티켓 티켓구분
      let amtMarkFg = res.data.amtMarkFg; //금액 표기 여부

      // ticketKind = '17'(연간권), '18'(연간권2년), '32'(연간권vip)
      // 출력 메시지 : "정기권 선발행권이 아닙니다. 다시 확인 부탁드립니다."
      if (ticketKind != "17" && ticketKind != "18" && ticketKind != "32") {
        utils.messageBox('alert', this.$t('MSG_ALT_NOT_PRE_ISSUE_TICKET_AND_PLZ_CHECK'), null, () => { 
          this.preIssueInfo.preIssueNo = "";
          this.$refs.preIssueNo.focus();
        });
        return false;
      }

      // 유효기간이 경과된 경우 
      if(!this.checkExpireDtForInternalPreIssue(amtMarkFg, expireStartDt, expireEndDt, issueDt)) {
        return false;
      }
      else {
        // 유효기간내인 경우 
        let collectDt 	= res.data.collectDt;	// 선발행티켓 사용일
        let disuseDt 	= res.data.disuseDt;		// 선발행티켓 폐기일
        let profitDt 	= res.data.profitDt;	// 선발행티켓 수익처리일
        
        // 사용일, 폐기일, 수익처리일 중 하나라도 값이 있으면 사용 불가
        if((collectDt != null && collectDt.trim().length > 0 )  || (disuseDt != null && disuseDt.trim().length > 0 ) || (profitDt != null && profitDt.trim().length > 0 )) {
          // 금액 표기권이지만 유효기간이 지난 경우
          utils.messageBox('alert', this.$t('MSG_ALT_THIS_PRE_ISSUE_TICKET_CANT_BE_USED'), null, () => { 
            this.preIssueInfo.preIssueNo = "";
            this.$refs.preIssueNo.focus();
          });
          return false;
        }

        //금액 계산
        let amtResult = calInternalPreIssueAmt(res);

        // 선발행 티켓은 금액 표기권과 미표기권을 혼합 접수할 수 없음.
        // 선발행 티켓, 금액 표기권 적용 여부 
        let amtMarkFg = res.data.amtMarkFg;
        let result = this.checkPreIssePayYn();
        if (result.amtMarkKind1Yn == "Y" && amtMarkFg == "0") {
          utils.messageBox('alert', this.$t('MSG_ALT_EXIST_MARKED_THING_SO_CANT_INPUT_UNMARKED_THING'), null, () => {
            this.preIssueInfo.amtMarkKind = '1';
            this.preIssueInfo.preIssueNo = "";
            this.$refs.preIssueNo.focus();
          });
          return false;
        }

        if (result.amtMarkKind0Yn == "Y" && this.preIssueInfo.amtMarkKind == "1") {
          utils.messageBox('alert', this.$t('MSG_ALT_EXIST_UNMAKED_THING_SO_CANT_INPUT_MARKED_THING'), null, ()=> {
            this.preIssueInfo.amtMarkKind = '0';
            this.preIssueInfo.preIssueNo = "";
            this.$refs.preIssueNo.focus();
          });
          return false;
        }
        this.preIssueInfo.discountType = this.discountType;
        this.preIssueInfo.amtMarkKind = amtMarkFg;
        this.preIssueInfo.preIssuePriceAmt = amtResult.totPay;
        this.preIssueInfo.preIssueCnt = 1;
        this.preIssueInfo.preIssueAmt = amtResult.cond10l6Amt;
        this.preIssueInfo.cond11laAmt = amtResult.cond11laAmt;
        this.preIssueInfo.cond11l7Amt = amtResult.cond11l7Amt;
        this.preIssueInfo.custKind = '';
        this.preIssueInfo.expireStartDate = res.data.expireStartDt;
        this.preIssueInfo.expireEndDate = res.data.expireEndDt;
        this.preIssueInfo.itemNm = this.selItem.itemNm + this.preIssueDcNm;
        this.preIssueInfo.price = this.selItem.price;
        this.preIssueInfo.dcNm = this.preIssueDcNm;
        this.preIssueMap[this.selMemshpUid] = JSON.parse(JSON.stringify(this.preIssueInfo));;
        this.discountMap[this.selMemshpUid] = this.discountType;

        this.setDiscountInfo(this.selMemshpUid, this.discountType, this.getDiscountInfo(this.selMemshpUid));
      }
      return true;
    },
    /**
     * 내부 선발행권 유효기간 체크
     * @param { String } amtMarkFg
     * @param { String } expireStartDt
     * @param { String } expireEndDt
     * @param { String } issueDt
     */
    checkExpireDtForInternalPreIssue(amtMarkFg, expireStartDt, expireEndDt, issueDt) {
      // 유효기간이 경과된 경우 
      if(parseInt(this.nowDate) < parseInt(expireStartDt) || parseInt(this.nowDate) > parseInt(expireEndDt)) {
        if (amtMarkFg == "0") {	// 금액 미표기권
          utils.messageBox('alert', this.$t('MSG_ALT_VALID_PERIOD_OF_UNMARKED_HAS_EXPIRED'), null, () => { 
            this.preIssueInfo.preIssueNo = "";
            this.$refs.preIssueNo.focus();
          });
          return false;
        } else {	// 금액 표기권
          // 발행일 기준으로 5년(60개월)이 지난 티켓은 사용 불가
          if(parseInt(utils.addMonth(issueDt, 60).substring(0,8)) < parseInt(this.nowDate)) {
            utils.messageBox('alert', this.$t('MSG_ALT_CANT_BE_USED_BECAUSE_5YEARS_HAVE_PASSED') + '\n- '+ this.$t('MSG_TXT_PBL_DT') +`: [${issueDt}]`, null, () => { 
              this.preIssueInfo.preIssueNo = "";
              this.$refs.preIssueNo.focus();
            });
            return false;
          } else {
            // 금액 표기권이지만 유효기간이 지난 경우
            utils.messageBox('alert', this.$t('MSG_ALT_PLZ_INPUT_AMT_IN_HANDWRITTEN_TICKET_FIELD'), null, () => { 
              this.preIssueInfo.preIssueNo = "";
              this.$refs.preIssueNo.focus();
            });
            return false;
          }
        }
      }
      return true;
    },
    /**
     * 내부 선발행권 금액 계산
     * @param { Object } res
     */
    calInternalPreIssueAmt(res) {
      let result = {};
      result.cond10l6Amt = parseInt(res.data.cond10l6Amt);
      result.cond11laAmt = parseInt(res.data.cond11laAmt);
      result.cond11l7Amt = parseInt(res.data.cond11l7Amt);
      result.totPay = parseInt(res.data.price);
      
      if((result.totPay - result.cond10l6Amt) > 0) {
        result.cond11laAmt = 1000;
        result.cond11l7Amt = result.totPay - result.cond10l6Amt - result.cond11laAmt;
      } else if((result.totPay - result.cond10l6Amt) == 0) {
        result.cond11laAmt = 0;
        result.cond11l7Amt = 0;
      } else {
        result.cond11laAmt = result.totPay - result.cond10l6Amt;
        result.cond11l7Amt = 0;
      }

    },
    /**
     * 외부 설발행권 조회 후 처리
     * @param { Object } res
     */
    procExternalPreIssueAfterSearch(res) {
      // 외부 선발행권인 경우
      utils.messageBox('alert', this.$t('MSG_ALT_NOT_INTERNAL_SO_PLZ_INPUT_TICKET_AMT'), null, ()=> {
        this.preIssueAmt = '';
        this.$refs.preIssueAmt.focus();
      });
      this.preIssueInfo.discountType = this.discountType;
      this.preIssueInfo.preIssuePriceAmt = this.selItem.price;
      this.preIssueInfo.expireStartDate = this.nowDate;
      this.preIssueInfo.expireEndDate = this.nowDate;
      this.preIssueInfo.expireText = this.exTernalPreIssueNm;
      this.preIssueInfo.externalYn = 'Y';
    },
    /**
     * 선발행티켓 티켓금액 입력하고  Enter
     */
    enterPreIssueAmt() {
      console.log("enterPreIssueAmt.this.preIssueInfo.preIssuePriceAmt=>", this.preIssueInfo.preIssuePriceAmt);
      console.log("enterPreIssueAmt.this.preIssueInfo.preIssueAmt=>", this.preIssueInfo.preIssueAmt);
      if (utils.length(this.preIssueInfo.preIssuePriceAmt) == 0 || parseInt(this.preIssueInfo.preIssuePriceAmt) == 0) {
        return;
      }
      if (utils.length(this.preIssueInfo.preIssueAmt) == 0 || parseInt(this.preIssueInfo.preIssueAmt) == 0) {
        utils.messageBox('alert', this.$t('MSG_ALT_PRE_ISSUE_TICKET_AMT_MUST_BE_GREATER_THAN_ZERO'));
        return;
      }
      // 결제 금액 입력시 할인가I, 할인가II 자동 입력 
      let pay = parseInt(this.preIssueInfo.preIssueAmt); // 선발행티켓금액
      let cond11laAmt = parseInt(this.preIssueInfo.cond11laAmt); //할인가I
      let cond11l7Amt = parseInt(this.preIssueInfo.cond11l7Amt); //할인가II
      
      let totPay = parseInt(this.selItem.price);
      if((totPay - pay) > 0) {
        cond11laAmt = 1000;
        cond11l7Amt = totPay - pay - cond11laAmt;

        this.setPreIssueAmts(totPay, cond11laAmt, cond11l7Amt);
      } else if((totPay - pay) == 0) {
        cond11laAmt = 0;
        cond11l7Amt = 0;

        this.setPreIssueAmts(totPay, cond11laAmt, cond11l7Amt);
      } else {
          utils.messageBox( "confirm", this.$t('MSG_ALT_INPUTTED_AMT_OVER_TICKET_PRICE_BUT_PROCESS'), null,
          (/* ok */) => {
            cond11laAmt = totPay - pay;
            cond11l7Amt = 0;

            this.setPreIssueAmts(totPay, cond11laAmt, cond11l7Amt);
          },
          (/* cancel */) => {
            this.preIssueInfo.preIssueAmt = '';
            this.$refs.preIssueAmt.focus();
          }
        );
      }
    },
    /**
     * 선발행권 할인정보 세팅
     * @param { Number } totPay
     * @param { Number } cond11laAmt
     * @param { Number } cond11l7Amt
     */
    setPreIssueAmts(totPay, cond11laAmt, cond11l7Amt) {
      this.preIssueInfo.preIssuePriceAmt = totPay;
      this.preIssueInfo.preIssueCnt = 1;
      this.preIssueInfo.cond11laAmt = cond11laAmt;
      this.preIssueInfo.cond11l7Amt = cond11l7Amt;
      this.preIssueInfo.custKind = '';
      this.preIssueInfo.itemNm = this.selItem.itemNm + this.preIssueDcNm;
      this.preIssueInfo.price = this.selItem.price;
      this.preIssueInfo.dcNm = + this.preIssueDcNm;
      this.preIssueMap[this.selMemshpUid] = JSON.parse(JSON.stringify(this.preIssueInfo));;
      this.discountMap[this.selMemshpUid] = this.discountType;

      this.setDiscountInfo(this.selMemshpUid, this.discountType, this.getDiscountInfo(this.selMemshpUid));
    },
    /**
     * 일모 잔액조회 Btn Click
     */
    clickSearchIlmoAmt() {      
      console.log("this.getLimitIlmoUseAmt()", this.getLimitIlmoUseAmt());
      if (this.selItem == null || this.selItem.ilmoYn != 'Y') {
        utils.messageBox('alert', this.$t('MSG_ALT_PLZ_SEL_ITEM_THAT_DISCOUNT_ILMO'));
        this.discountType = this.defultDicountType;
        return;
      }

      if (utils.length(this.ilmoInfo.ilmoCardCode) == 0) {
        utils.messageBox('alert', this.$t('MSG_ALT_PLZ_INPUT_ILMO_CARD_NO_OR_OTC'), null, () => {
          this.$refs.ilmoCardCode.focus();
        });
        return;
      }

      const params = { 
        ilmoCardCode: this.ilmoInfo.ilmoCardCode,
      }

      http.request(this.pageName, 'DTS_JNR_00005', {
        query : params,
      }).then(res => {
        if (res.data != null) {
          if (parseInt(res.data.status) != 200) {
            utils.messageBox('alert', "["+ res.data.status +"]" + res.data.message);
          }
          else {
            this.ilmoInfo.ilmoAmt = res.data.ilmoAmt;
            this.ilmoInfo.ilmoCardNo = res.data.ilmoCardNo;

            let limitIlmoUseAmt = this.getLimitIlmoUseAmt();
            if (parseInt(this.ilmoInfo.ilmoAmt) >=  limitIlmoUseAmt) {
              this.ilmoInfo.ilmoUseAmt = limitIlmoUseAmt;
              this.setIlmoUseAmt();
            }
            else {
              this.ilmoInfo.ilmoUseAmt = 0;
              utils.messageBox('alert', this.$t('MSG_ALT_AMOUNT_IS_INSUFFICIENT'));
            }
          }
        }
        else {
          utils.messageBox('alert', this.$t('MSG_ALT_ERR_OCCURRED_WHILE_SEARCH_ILMO_POINT'));
        }
      }).catch(error => console.log(error));

    },
    /**
     * 일모 카드/OTC 번호 Text에서 Enter
     */
    enterIlmoCardCode() {
      if (utils.length(this.ilmoInfo.ilmoCardCode) == 0) {
        // 일모 할인 정보 Clear
        for (let key in this.ilmoInfo) {
          this.ilmoInfo[key] = ''; 
        }
        this.ilmoMap[this.selMemshpUid] = null;
        if (this.getDcNm() == this.ilmoDcNm)  {
          //구매정기권정보에 할인정보 Clear
          this.setDiscountInfo(this.selMemshpUid, 'X');
        }
        return;      
      }
      else {
        this.clickSearchIlmoAmt();
      }
    },
    /**
     * 일모금액 적용(할인) 처리
     */
    setIlmoUseAmt() {
      if (utils.length(this.ilmoInfo.ilmoUseAmt) == 0 || parseInt(this.ilmoInfo.ilmoUseAmt) < 1) {
        return;
      }
      
      if (parseInt(this.ilmoInfo.ilmoUseAmt) > parseInt(this.ilmoInfo.ilmoAmt)) {
        utils.messageBox('alert', this.$t('MSG_ALT_USED_AMT_IS_OVER_THAN_ILMO_AMT'), null, () => {
          this.$refs.ilmoUseAmt.focus();
        });
        return;
      }
      let limitIlmoUseAmt = this.getLimitIlmoUseAmt();
      if (parseInt(this.ilmoInfo.ilmoUseAmt) > limitIlmoUseAmt) {
        utils.messageBox('alert', this.$t('MSG_ALT_AMOUNT_HAS_BEEN_EXCEEDED'), null, () => {
          this.$refs.ilmoUseAmt.focus();
        });
        return;
      }
      this.ilmoInfo.itemNm = this.selItem.itemNm + this.ilmoDcNm;
      this.ilmoInfo.price = this.selItem.price;
      this.ilmoMap[this.selMemshpUid] = this.ilmoInfo;
      
      this.ilmoMap[this.selMemshpUid] = JSON.parse(JSON.stringify(this.ilmoInfo));;
      this.discountMap[this.selMemshpUid] = this.discountType;

      this.setDiscountInfo(this.selMemshpUid, this.discountType, this.getDiscountInfo(this.selMemshpUid));
    },
    /**
     * 일모금액 적용금액 가져오기
     */
    getLimitIlmoUseAmt() {
      let limitIlmoUseAmt = 0;
      let custDcList = this.custDataProvider.getJsonRows();
      _.some(custDcList, (custDc)=>{
        if (custDc.itemCd == this.selItem.itemCd && custDc.condTypeCd == "11L4" && custDc.dcType == "A1") {
          limitIlmoUseAmt = custDc.dcAmt;
          return;
        }
      });
      return limitIlmoUseAmt;
    },
  },
};
</script>

<style scoped>
</style>
