<template>
  <div>
    <ur-form-box toggleable>
      <!-- 영수증번호 -->
      <ur-form-item
        :label="$t('MSG_TXT_RECEIPT_NO')"
        class="flex_wrap"
        :labelAlign="'right'"
        style="width: 50%; height: auto"
      >
        <ur-text-field
          :value="payInfo.receiptNo"
          style="width: 50%; height: auto"
          readonly
        />
        <ur-text-field
          :value="payInfo.cashYnText"
          style="width: 50%; height: auto"
          readonly
        />
      </ur-form-item>
      <!-- 결제자 정보 -->
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TXT_PAYER_INFO')"
        :labelAlign="'right'"
        style="width: 50%; height: auto; border: 0"
      >
        <ur-text-field 
          :style="{width: payInfo.name ? '90%' : '100%', height: 'auto'}"
          :value="payInfo.name"
          readonly />
        <ur-icon-button 
          v-if="payInfo.name"
          icon="search" 
          style="padding-top: 0px" 
          @click="payerSearch"/>
      </ur-form-item>
      <ur-form-item
        class="flex_wrap"
        label="POS ID"
        :labelAlign="'right'"
        style="width: 50%; height: auto; border: 0"
      >
        <ur-text-field
          :value="payInfo.posId"
          style="width: 100%; height: auto"
          readonly
        />
      </ur-form-item>
      <!-- 파크구분 -->
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TXT_PARK_KIND')"
        :labelAlign="'right'"
        style="width: 50%; height: auto"
      >
        <ur-text-field
          :value="payInfo.parkKindNm"
          style="width: 100%; height: auto"
          readonly
        />
      </ur-form-item>
      <!-- POS명 -->
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TXT_POS_NM')"
        :labelAlign="'right'"
        style="width: 50%; height: auto"
      >
        <ur-text-field
          :value="payInfo.posNm"
          style="width: 100%; height: auto"
          readonly
        />
      </ur-form-item>
      <!-- 대인 -->
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TXT_AUDULT')"
        :labelAlign="'right'"
        style="width: 50%; height: auto"
      >
        <ur-text-field
          :value="numberWithCommas(payInfo.adultCnt)"
          style="width: 10%; height: auto"
          readonly
        />
        <ur-text-field
          :value="numberWithCommas(payInfo.adultAmt)"
          style="width: 90%; height: auto"
          readonly
        />
      </ur-form-item>
      <!-- 예약구분 -->
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TXT_RESV_KIND')"
        :labelAlign="'right'"
        style="width: 50%; height: auto"
      >
        <ur-text-field
          :value="payInfo.reserveKindNm"
          style="width: 100%; height: auto"
          readonly
        />
      </ur-form-item>
      <!-- 판매일시 -->
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TXT_SALE_DTM')"
        :labelAlign="'right'"
        style="width: 50%; height: auto"
      >
        <ur-text-field
          :value="payInfo.paymntDtm"
          style="width: 100%; height: auto"
          readonly
        />
      </ur-form-item>
      <!-- 소인 -->
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TXT_CHILD')"
        :labelAlign="'right'"
        style="width: 50%; height: auto"
      >
        <ur-text-field
          :value="numberWithCommas(payInfo.childCnt)"
          style="width: 10%; height: auto"
          readonly
        />
        <ur-text-field
          :value="numberWithCommas(payInfo.childAmt)"
          style="width: 90%; height: auto"
          readonly
        />
      </ur-form-item>
      <!-- 예약번호 -->
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TXT_RESV_NO')"
        :labelAlign="'right'"
        style="width: 50%; height: auto"
      >
        <ur-text-field
          v-model="payInfo.reserveNo"
          style="width: 100%; height: auto"
          readonly
        />
      </ur-form-item>
      <!-- 판매구분 -->
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TXT_SALE_FG')"
        :labelAlign="'right'"
        style="width: 50%; height: auto"
      >
        <ur-text-field
          v-model="payInfo.saleKindNm"
          style="width: 100%; height: auto"
          readonly
        />
      </ur-form-item>
      <!-- 경로 -->
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TXT_OLD')"
        :labelAlign="'right'"
        style="width: 50%; height: auto"
      >
        <ur-text-field
          :value="numberWithCommas(payInfo.oldCnt)"
          style="width: 10%; height: auto"
          readonly
        />
        <ur-text-field
          :value="numberWithCommas(payInfo.oldAmt)"
          style="width: 90%; height: auto"
          readonly
        />
      </ur-form-item>
      <!-- 외상자명 -->
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TXT_CREDITORS_NM')"
        :labelAlign="'right'"
        style="width: 50%; height: auto"
      >
        <ur-text-field
          v-model="payInfo.creditName"
          style="width: 100%; height: auto"
          readonly
        />
      </ur-form-item>
      <!-- 판매액 -->
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TXT_SALE_AMT')"
        :labelAlign="'right'"
        style="width: 50%; height: auto"
      >
        <ur-text-field
          :value="numberWithCommas(payInfo.saleAmt)"
          style="width: 100%; height: auto"
          readonly
        />
      </ur-form-item>
      <!-- 장애우 -->
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TXT_PANELTY')"
        :labelAlign="'right'"
        style="width: 50%; height: auto"
      >
        <ur-text-field
          :value="numberWithCommas(payInfo.handicapCnt)"
          style="width: 10%; height: auto"
          readonly
        />
        <ur-text-field
          :value="numberWithCommas(payInfo.handicapAmt)"
          style="width: 90%; height: auto"
          readonly
        />
      </ur-form-item>
      <!-- 사원번호 -->
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TXT_EMP_NO')"
        :labelAlign="'right'"
        style="width: 50%; height: auto"
      >
        <ur-text-field
          v-model="payInfo.empNo"
          style="width: 100%; height: auto"
          readonly
        />
      </ur-form-item>
      <!-- 부가세 -->
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TXT_VAT_FEE')"
        :labelAlign="'right'"
        style="width: 50%; height: auto"
      >
        <ur-text-field
          :value="numberWithCommas(payInfo.taxAmt)"
          style="width: 100%; height: auto"
          readonly
        />
      </ur-form-item>
      <!-- 순매출액 -->
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TXT_NET_SALE_AMT')"
        :labelAlign="'right'"
        style="width: 50%; height: auto"
      >
        <ur-text-field
          :value="numberWithCommas(payInfo.netAmt)"
          style="width: 100%; height: auto"
          readonly
        />
      </ur-form-item>
      <!-- 예수금액 -->
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TXT_DEPOSIT_AMT')"
        :labelAlign="'right'"
        style="width: 50%; height: auto"
      >
        <ur-text-field
          :value="numberWithCommas(payInfo.depositAmt)"
          style="width: 100%; height: auto"
          readonly
        />
      </ur-form-item>
      <!-- 총인원 -->
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TXT_TOTAL_PERSONS')"
        :labelAlign="'right'"
        style="width: 50%; height: auto"
      >
        <ur-text-field
          :value="numberWithCommas(payInfo.inwonCnt)"
          style="width: 100%; height: auto"
          readonly
        />
      </ur-form-item>
      <!-- 사유 -->
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TIT_RSN')"
        :labelAlign="'right'"
        style="width: 100%; height: auto"
      >
        <textarea
          v-model="payInfo.remark"
          rows="2"
          maxlength="1000"
          style="width: 100%"
          readonly
        />
      </ur-form-item>
    </ur-form-box>
  </div>
</template>
<script>
export default {
  name: "PGE_SAA_00001_P01",
  components: {}, // eslint-disable-line vue/name-property-casing
  props: {
    payData: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      payInfoObj: {
        receiptNo: '',// 영수증번호
        payerMemshpUid: '',
        cashYn: '',// 현금영수증승인여부
        cashYnText: '',
        payerYn: '',// 결제자 여부
        name: '',// 결제자 정보
        posId: '',// 포스아이디
        parkKind: '',// 파크구분
        posNm: '',// 포스명
        adultCnt: '',// 대인
        adultAmt: '',
        reserveKindNm: '',// 예약구분
        paymntDtm: '',// 판매일시
        childCnt: '',// 소인
        childAmt: '',
        reserveNo: '',// 예약번호
        saleKindNm: '',// 판매구분
        oldCnt: '',// 경로
        oldAmt: '',
        creditName: '',// 외상자명
        saleAmt: '',// 판매액
        handicapCnt: '',// 장애우
        handicapAmt: '',
        empNo: '',// 사원번호
        taxAmt: '',// 부가세액
        netAmt: '',// 순매출액
        depositAmt: '',// 예수금액
        inwonCnt: '',// 총인원
        remark: '',// 사유
      }
    }
  },
  computed: {
    payInfo() {
      let result = this.payInfoObj
      if (this.payData.length > 0) {
        result = this.payData[0]
        result.cashYnText = this.$t('MSG_TXT_CASH_RECEIPT_APPR') + ' : ' + result.cashYn // 현금영수증승인
        result.paymntDtm = moment(result.paymntDtm, 'YYYYMMDDHHmmss').format('YYYY/MM/DD HH:mm:ss')
      }
      return result
    }
  },
  created() {},
  mounted() {},
  methods: {
    numberWithCommas(number) {
      if (number || number === 0) {
        number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return (!number && number !== 0) ? '' : number
    },
    payerSearch() {
      utils.openLayerPopup("PGE_CTM_00018", () => {}, {
        pageInitialData: {
          memshpUid: this.payInfo.payerMemshpUid,
        },
        size: "lg",
      })
    }
  },
};
</script>
<style scoped></style>
