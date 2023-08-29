<template>
  <sui-page class="custom_page">
    <div class="modalWrap" style="height: auto;">
    <sui-page-header :page-id="this.$options.name" />
        <div class="modal-title mb45"></div>
          <div class="modal-body">            
            <ur-form-box toggleable>                
                <ur-form-item label="이용금액" :labelAlign="'right'" required style="width: 100%; height: auto">{{ usedAmt | moneyPoint }}원</ur-form-item>                
             </ur-form-box>
            <div class="btn_wrap mt10">
              <div class="right_box"></div>
            </div>            
             <real-grid ref="pgeJnf00003" grid-id="pgeJnf00003" grid-root="/lib"
              :gridFields="grdELFields"
              :gridColumns="grdELColumns" 
              :gridRows="grdELDataList" 
              :gridInit="false"
              :style="{ height: '200px' }"
              @rendered="grdELRendered"
            />
          </div>
          <div class="btn_wrap mt10">
            <div class="right_box">
              <ur-button color="violet" @click="closePopup">닫기</ur-button>
            </div>
          </div>
    </div>   
  </sui-page>
</template>
<script>

export default {
  name: "PGE_JNF_00003",
  props: {
    pageInitialData: {
      type: Object,
      default: () => { },
    },
    closePagePopup: {
      type: Function,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      gvEL: null, 
      dpEL: null,
      
      usedAmt: 0,
      
      grdELDataList: [],

      // 테이블 옵션
      options: {
        // 토탈 X
        height: 280,
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      }, 
    };
  },
  created() {

    //grid 필드 정보 정의
    this.grdELFields = [
      { fieldName: "ymd", dataType: "datetime", datetimeFormat: "yyyyMMdd"},
      { fieldName: "hms", dataType: "text"},
      { fieldName: "ticketNo", dataType: "text"},
      { fieldName: "memberName", dataType: "text"},
      { fieldName: "price", dataType: "number" }
    ];
    
    //grid 컬럼 정보 정의
    this.grdELColumns = [        
        {
          name: "memberName",
          fieldName: "memberName",
          width: 100,
          header: { text: "성명" },
          editable: false,
        },
        {
          name: "ymd",
          fieldName: "ymd",
          width: 100,
          header: { text: "입장일" },
          styles: {
            datetimeFormat: "yyyy/MM/dd",
          },
          editable: false,
        },
        {
          name: "hms",
          fieldName: "hms",
          width: 100,
          header: { text: "입장시간" },
          editable: false,
        },
        {
          name: "price",
          fieldName: "price",
          width: 100,
          numberFormat: "#,##0",
          header: { text: "정상가" },
          editable: false,
        }
      ];    
  },
  mounted() {    
    if (this.pageInitialData.ticketNo) {
      this.parkKind = this.pageInitialData.targetFg;
      this.memshpUid = this.pageInitialData.memshpUid;
      this.ticketNo = this.pageInitialData.ticketNo;
      this.memberName = this.pageInitialData.memberName;
      
      if (utils.isNull(this.memberName)) {
        this.memberName = "";
      }

      console.log("mounted > parkKind:" + this.parkKind);
      console.log("mounted > memshpUid:" + this.memshpUid);
      console.log("mounted > ticketNo:" + this.ticketNo);
      console.log("mounted > memberName:" + this.memberName);

      this.fnsearch();
    }

    //grid 초기화
    ({"gridView":this.gvEL, "dataProvider":this.dpEL } =  this.$refs.pgeJnf00003.initGrid());

    // grid style set 
    this.$refs.pgeJnf00003.setFitStyle("even");
  },
  computed: {
    
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  methods: {
    //그냥 창 닫기
    closePopup() {
      this.closePagePopup(null);
    },
    //데이터 돌려주면 창 닫기
    returnPopup() {
      //1. Validation Check

      //2. grdDataList Grid에서 가져와서 다시 세팅

      //3. 그리드 데이타 리스트 돌려주시면 화면 닫기
      this.closePagePopup(null);
    },
    grdELRendered(provider, view) {
      this.$refs.pgeJnf00003.RealGridJS.setRootContext("/");
    },
    fnsearch() {
      //this.dpEL.clearRows();
      
      const queryParams = {
        parkKind: this.parkKind,
        memshpUid: this.memshpUid,
        memshpName: this.memberName,
        ticketNo: this.ticketNo
      };

      http.request(this.$options.name, "DTS_JNF_00003", {
          query: queryParams,
        }).then((res) => {
          if (res.data) {
            let resData = res.data;
            if (resData.length > 0) {
              this.grdELDataList = utils.map(resData, (row) => {
                //row.name = utils.changeMaskingCenter(row.name);
                //row.birthMmdd = utils.toStringByFormat(utils.toDate(row.birthMmdd), 'YYYY-MM-DD');
                return row;
              });
              
              this.$refs.pgeJnf00003.setRows(this.grdELDataList);

              let amt = 0;
              for (let i = 0; i < this.dpEL.getRowCount(); i++) {
                amt += this.dpEL.getValue(i, "price");
              }
              this.usedAmt = amt;
            }
          }
        });
    },
  },  
  // 필터
  filters: {
    moneyPoint(value) {
      return utils.numberFormat(value, 0);
    }
  },
};
</script>
<style scoped></style>
