<template>
	<sui-page></sui-page>
</template>
<script>
import cardUtils from "~common/js/cardUtils/card-utils.js";
export default {
  name: "PGE_CTM_00024", // eslint-disable-line vue/name-property-casing
  components: {},
  data() {
    return { imgUrl: null };
  },
  created() {
    cardUtils.cardLoad(this); //카드 모듈 로딩
  },
  async mounted() {
    try {
      cardUtils.reset();
      this.cardX = cardUtils.getCardX()
      this.cardX.Sign = this.$route.query.esign;
      
      //Sign창 보여주기
      cardUtils.setSignViewMode();
      cardUtils.showSignView(0, 10);
    } catch (e) {
      console.log(e);
    }
  },
  computed: {},
  watch: {},
  methods: {
    OnMessage() {},
    OnRcvData() {},
    //Sign 패드 취소 버튼 클릭
    clickBtnSignPadCancel() {
      //Sign창 숨기기
      cardUtils.hideSignView();
      //창닫기      
      top.window.opener = top;
      top.window.open('', '_parent', '');
      top.window.close();
    }
  }
};
</script>
<style scoped></style>