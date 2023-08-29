<template>
  <sui-page class="custom_page">
    <div class="modalWrap" style="height: auto;">
    <sui-page-header :page-id="this.$options.name" />
        <div class="modal-title mb45"></div>
          <div class="modal-body">            
            <ur-form-box toggleable>                
                <ur-form-item label="이용환불금" :labelAlign="'right'" required style="width: 100%; height: auto">{{ usedAmt | moneyPoint }}원</ur-form-item>                
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box"></div>
            </div>               
            <real-grid ref="pgeJnf00005" grid-id="pgeJnf00005" grid-root="/lib"
              :gridFields="grdCouponFields"
              :gridColumns="grdCouponColumns" 
              :gridRows="grdCouponDataList" 
              :gridInit="false"
              :style="{ height: '200px' }"
              @rendered="grdCouponRendered"
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
  name: "PGE_JNF_00005",
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
      gvCoupon: null, 
      dpCoupon: null,
      
      usedAmt: 0,
      
      grdCouponDataList: [],

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
    this.grdCouponFields = [
      { fieldName: "kind", dataType: "text" },
      { fieldName: "mstId", dataType: "text" },
      { fieldName: "sendCnt", dataType: "text" },
      { fieldName: "seasonRefundAmt", dataType: "number" },
      { fieldName: "statCd", dataType: "text" },
      { fieldName: "memberUid", dataType: "text" },
      { fieldName: "cpnNm", dataType: "text" },
      { fieldName: "persCpnNo", dataType: "text" },      
      { fieldName: "saleDt", dataType: "datetime", datetimeFormat: "yyyyMMdd" },
      { fieldName: "posId", dataType: "text" },
      { fieldName: "receiptNo", dataType: "text" },
      { fieldName: "saleTm", dataType: "text" }
    ];
    
    //grid 컬럼 정보 정의
    this.grdCouponColumns = [        
        {
          name: "kind",
          fieldName: "kind",
          width: 70,
          header: { text: "구분" },
          editable: false,
        },
        {
          name: "cpnNm",
          fieldName: "cpnNm",
          width: 180,
          header: { text: "쿠폰명" },
          editable: false,
        },
        {
          name: "statCd",
          fieldName: "statCd",
          width: 100,
          sortable: false,
          lookupDisplay: true,
          editButtonVisibility: "always",
          values: ["USED", "DIST"], 
          labels: ["사용", "미사용"],
          header: { text: "사용여부" },
          editable: false,
        },
        {
          name: "saleDt",
          fieldName: "saleDt",
          width: 100,
          header: { text: "사용일자" },
          styles: {
            datetimeFormat: "yyyy/MM/dd",
          },
          editable: false,
        },
        {
          name: "saleTm",
          fieldName: "saleTm",
          width: 100,
          header: { text: "사용시간" },
          editable: false,
        },
        {
          name: "receiptNo",
          fieldName: "receiptNo",
          width: 100,
          header: { text: "영수증번호" },
          editable: false,
        },
        {
          name: "seasonRefundAmt",
          fieldName: "seasonRefundAmt",
          width: 100,
          numberFormat: "#,##0",
          header: { text: "환불차감액" },
          editable: false,
        }
      ];    
  },
  mounted() {    
    if (this.pageInitialData.ticketNo) {
      this.receiptNo = this.pageInitialData.receiptNo;
      this.memshpUid = this.pageInitialData.memshpUid;
      this.ticketNo = this.pageInitialData.ticketNo;
      
      console.log("mounted > receiptNo:" + this.receiptNo);
      console.log("mounted > memshpUid:" + this.memshpUid);
      console.log("mounted > ticketNo:" + this.ticketNo);

      this.fnsearch();
    }

    //grid 초기화
    ({"gridView":this.gvCoupon, "dataProvider":this.dpCoupon } =  this.$refs.pgeJnf00005.initGrid());

    // grid style set 
    this.$refs.pgeJnf00005.setFitStyle("even");
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
    grdCouponRendered(provider, view) {
      this.$refs.pgeJnf00005.RealGridJS.setRootContext("/");
    },
    fnsearch() {
      const queryParams = {
        receiptNo: this.receiptNo,
        memshpUid: this.memshpUid,
        ticketNo: this.ticketNo
      };

      http.request(this.$options.name, "DTS_JNF_00004", {
          query: queryParams,
        }).then((res) => {
          if (res.data) {
            let resData = res.data;
            if (resData.length > 0) {              
              this.grdCouponDataList = utils.map(resData, (row) => {
                //row.name = utils.changeMaskingCenter(row.name);
                //row.birthMmdd = utils.toStringByFormat(utils.toDate(row.birthMmdd), 'YYYY-MM-DD');
                return row;
              });
              
              this.$refs.pgeJnf00005.setRows(this.grdCouponDataList);

              let amt = 0;
              let status = "";
              for (let i = 0; i < this.dpCoupon.getRowCount(); i++) {
                status = this.dpCoupon.getValue(i, "statCd");
                if(status == "USED") { 
                  amt += this.dpCoupon.getValue(i, "seasonRefundAmt");
                }
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
