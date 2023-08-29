<template>
  <!-- 임직원 정보 입력 -->
  <div class="inbox">
    <div class="comm_title_wrap">
      <h4 class="pr10">{{ $t('MSG_TXT_INPUT_EMP_NO') }}</h4>
      <ur-button color="violet" @click="searchEmpInfo">{{ $t('MSG_BTN_APPLY') }}</ur-button>
    </div>
    <ur-form-box toggleable>
      <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_NAME')" :labelAlign="'right'" style="width: 100%; height: auto; border: 0">
        <ur-text-field ref="empName" v-model='empInfo.empName' style="width: 100%; height: auto" readonly/>
      </ur-form-item>
      <ur-form-item class="flex_wrap borTop" :label="$t('MSG_TXT_EPNO')" maxlength="16" :labelAlign="'right'" style="width: 100%; height: auto">
        <ur-text-field ref="empNo" v-model='empInfo.empNo' @keyup.enter="searchEmpInfo" style="width: 100%; height: auto" mask="NNNNNNNNNNNNNNNNNNNN" maxLength="empNo"/>
      </ur-form-item>
    </ur-form-box>
  </div>
</template>

<script>

import _ from 'lodash'
export default {
  name: 'PGE_JNR_00001_P04',
  props: {
    pageName: {
      type: String,
      default: '',
    },
    setEmpInfo: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      selMemshpUid: null, //.현재 선택 회원 멤버십 UID
      selItemCd : null, //현재 선택 권종코드

      //임직원 정보
      empInfo: {empName: '', // 이름
                 empNo: '', // 사번
                 empType: '', //임직원 유형
               },
    }
  },
  created() {
  },
  mounted() {
  },
  watch : {
  },
  computed : {
  },
  methods: {
    /**
     * 임직원 정보 초기화
     * @param { String } memshpUid
     * @param { Object } selItem
     */
    initEmpInfo(memshpUid, memberName, itemCd, empNo) {
      this.selMemshpUid = memshpUid;
      this.selItemCd = itemCd;
      this.empInfo.empName = memberName;
      this.empInfo.empNo = empNo;
      console.log("initEmpInfo.empNo:",empNo);
      if (itemCd == "1000308488") {
        this.empInfo.empType = "P";
      }
      else {
        this.empInfo.empType = "E";
      }
    },
    /**
     * 임직원 정보 Clear
     */
    clearEmpInfo() {
      this.selMemshpUid = '';
      this.selItemCd = '';
      this.empInfo.empName = '';
      this.empInfo.empNo = '';
      this.empInfo.empType = '';
    },
    /**
     * 임직원 정보 조회
     */
    searchEmpInfo() {
      // 고객 선택 여부 체크
      if (this.selMemshpUid == null || utils.length(this.selMemshpUid) == 0) {
        utils.messageBox('alert', this.$t('MSG_ALT_PLZ_SEL_MEMBER'));
        return;
      }
      //권종 선택 여부 체크
      else if (this.selItemCd == null || utils.length(this.selItemCd) == 0) {
        utils.messageBox('alert', this.$t('MSG_ALT_PLZ_SEL_ITEM'));
        return;
      }
      else if (this.empInfo.empNo == null || utils.length(this.empInfo.empNo) == 0) {
        utils.messageBox('alert', this.$t('MSG_ALT_PLZ_INPUT_EMP_NO'));
        return;
      }

      this.setEmpInfo(this.selMemshpUid, this.selItemCd, this.empInfo.empNo, this.empInfo.empType);
      /*
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
      */
    },
  },
};
</script>

<style scoped>
</style>
