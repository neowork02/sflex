<template>
  <div>
    <ur-form-box toggleable>
      <!-- 현금 -->
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TXT_CASH')"
        :labelAlign="'right'"
        style="width: 33.3%; height: auto"
      >
        <ur-text-field :value="numberWithCommas(payMethod.cashCnt)" style="width: 10%; height: auto" readonly />
        <ur-text-field :value="numberWithCommas(payMethod.cashAmt)" style="width: 90%; height: auto" readonly />
      </ur-form-item>
      <!-- 신용카드 -->
      <ur-form-item
        :label="$t('MSG_TXT_CREDIT_CARD')"
        class="flex_wrap"
        :labelAlign="'right'"
        style="width: 33.3%; height: auto"
      >
        <ur-text-field :value="numberWithCommas(payMethod.cardCnt)" style="width: 10%; height: auto" readonly />
        <ur-text-field :value="numberWithCommas(payMethod.cardAmt)" style="width: 90%; height: auto" readonly
        />
      </ur-form-item>
      <!-- 상품권 -->
      <ur-form-item
        :label="$t('MSG_TXT_GIFT_CARD')"
        class="flex_wrap borNone"
        :labelAlign="'right'"
        style="width: 33.3%; height: auto"
      >
        <ur-text-field :value="numberWithCommas(payMethod.giftCnt)" style="width: 10%; height: auto" readonly />
        <ur-text-field :value="numberWithCommas(payMethod.giftAmt)" style="width: 90%; height: auto" readonly />
      </ur-form-item>
      <!-- 멤버십포인트 -->
      <ur-form-item
        :label="$t('MSG_TXT_MEMSHP_POINT')"
        class="flex_wrap"
        :labelAlign="'right'"
        style="width: 33.3%; height: auto"
      >
        <ur-text-field :value="numberWithCommas(payMethod.pointCnt)" style="width: 10%; height: auto" readonly />
        <ur-text-field :value="numberWithCommas(payMethod.pointAmt)" style="width: 90%; height: auto" readonly />
      </ur-form-item>
      <!-- 티켓 -->
      <ur-form-item
        :label="$t('MSG_TXT_TICKET')"
        class="flex_wrap"
        :labelAlign="'right'"
        style="width: 33.3%; height: auto"
      >
        <ur-text-field :value="numberWithCommas(payMethod.ticketCnt)" style="width: 10%; height: auto" readonly />
        <ur-text-field :value="numberWithCommas(payMethod.ticketAmt)" style="width: 90%; height: auto" readonly />
      </ur-form-item>
      <!-- 웹 -->
      <ur-form-item
        :label="$t('MSG_TXT_WEB')"
        class="flex_wrap"
        :labelAlign="'right'"
        style="width: 33.3%; height: auto"
      >
        <ur-text-field :value="numberWithCommas(payMethod.webCnt)" style="width: 10%; height: auto" readonly />
        <ur-text-field :value="numberWithCommas(payMethod.webAmt)" style="width: 90%; height: auto" readonly />
      </ur-form-item>
      <!-- 기프트카드 -->
      <ur-form-item
        :label="$t('MSG_TXT_GIFT_CARD_ENG')"
        class="flex_wrap"
        :labelAlign="'right'"
        style="width: 33.3%; height: auto"
      >
        <ur-text-field :value="numberWithCommas(payMethod.giftCardCnt)" style="width: 10%; height: auto" readonly />
        <ur-text-field :value="numberWithCommas(payMethod.giftCardAmt)" style="width: 90%; height: auto" readonly />
      </ur-form-item>
      <!-- 외상 -->
      <ur-form-item
        :label="$t('MSG_TXT_CREDIT2')"
        class="flex_wrap"
        :labelAlign="'right'"
        style="width: 33.3%; height: auto"
      >
        <ur-text-field :value="numberWithCommas(payMethod.creditCnt)" style="width: 10%; height: auto" readonly />
        <ur-text-field :value="numberWithCommas(payMethod.creditAmt)" style="width: 90%; height: auto" readonly />
      </ur-form-item>
      <!-- 총계 -->
      <ur-form-item
        :label="$t('MSG_TXT_TOTAL_CNT')"
        class="flex_wrap"
        :labelAlign="'right'"
        style="width: 33.3%; height: auto"
      >
        <ur-text-field
          :value="numberWithCommas(payMethod.totalAmt)"
          style="width: 100%; height: auto"
          readonly
        />
      </ur-form-item>
    </ur-form-box>
  </div>
</template>
<script>
export default {
  name: "PGE_SAA_00001_P02",
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
      payMethodObj: {
        cashCnt: '',//현금
        cashAmt: '',
        cardCnt: '',//신용카드
        cardAmt: '',
        giftCnt: '',//상품권
        giftAmt: '',
        pointCnt: '',//멤버십포인트
        pointAmt: '',
        ticketCnt: '',//티켓수
        ticketAmt: '',
        webCnt: '',//웹
        webAmt: '',
        giftCardCnt: '',//기프트카드
        giftCardAmt: '',
        creditCnt: '',//외상
        creditAmt: '',
        totalAmt: ''//총계
      },
    }
  },
  computed: {
    payMethod() {
      let result = this.payMethodObj
      if (this.payData.length > 0) {
        result = this.payData[0]
        result.paymntDtm = moment(result.paymntDtm, 'YYYYMMDDHHmmss').format('YYYY/MM/DD HH:mm:ss')
      }
      return result
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    numberWithCommas(number) {
      if (number || number === 0) {
        number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return (!number && number !== 0) ? '' : number
    }
  },
};
</script>
<style scoped></style>
