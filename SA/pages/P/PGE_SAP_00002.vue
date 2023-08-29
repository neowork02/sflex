<template>
  <sui-page class="custom_page">
    <div class="modalWrap" style="height: auto;">
    <template slot="title">
      <div class="modal-title mb45">{{ '상품권입금 조회' }}</div> <!-- 상품권입금 조회 -->
    </template>
    <template>
      <div class="modal-body">
        <!-- S::board_list_type2 -->
        <div class="board_list_type2 fixHeight">
          <table>
            <caption></caption>
            <colgroup>
              <col width="80px" />
              <col width="65px" />
              <col width="100px" />
              <col width="100px" />
              <col width="100px" />
              <col width="100px" />
              <col width="100px" />
              <col width="100px" />
              <col width="100px" />
              <col width="100px" />
              <col width="100px" />
              <col width="100px" />
              <col width="100px" />
            </colgroup>
            <thead>
              <tr>
                <th rowspan="2">제휴사</th>
                <th rowspan="2">구분</th>
                <th colspan="10">권종</th>
                <th rowspan="2">합계</th>
              </tr>
              <tr>
                <th>1천원</th>
                <th>2천원</th>
                <th>5천원</th>
                <th>1만원</th>
                <th>3만원</th>
                <th>5만원</th>
                <th>7만원</th>
                <th>10만원</th>
                <th>30만원</th>
                <th>50만원</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowspan="2">합계</td>
                <td>수량</td>
                <td class="right">{{numberWithCommas(giftColSummary.cnt.g1k)}}</td>
                <td class="right">{{numberWithCommas(giftColSummary.cnt.g2k)}}</td>
                <td class="right">{{numberWithCommas(giftColSummary.cnt.g5k)}}</td>
                <td class="right">{{numberWithCommas(giftColSummary.cnt.g10k)}}</td>
                <td class="right">{{numberWithCommas(giftColSummary.cnt.g30k)}}</td>
                <td class="right">{{numberWithCommas(giftColSummary.cnt.g50k)}}</td>
                <td class="right">{{numberWithCommas(giftColSummary.cnt.g70k)}}</td>
                <td class="right">{{numberWithCommas(giftColSummary.cnt.g100k)}}</td>
                <td class="right">{{numberWithCommas(giftColSummary.cnt.g300k)}}</td>
                <td class="right">{{numberWithCommas(giftColSummary.cnt.g500k)}}</td>
                <td class="right">{{numberWithCommas(giftColSummary.cnt.total)}}</td>
              </tr>
              <tr>
                <td>금액</td>
                <td class="right">{{numberWithCommas(giftColSummary.amt.g1k)}}</td>
                <td class="right">{{numberWithCommas(giftColSummary.amt.g2k)}}</td>
                <td class="right">{{numberWithCommas(giftColSummary.amt.g5k)}}</td>
                <td class="right">{{numberWithCommas(giftColSummary.amt.g10k)}}</td>
                <td class="right">{{numberWithCommas(giftColSummary.amt.g30k)}}</td>
                <td class="right">{{numberWithCommas(giftColSummary.amt.g50k)}}</td>
                <td class="right">{{numberWithCommas(giftColSummary.amt.g70k)}}</td>
                <td class="right">{{numberWithCommas(giftColSummary.amt.g100k)}}</td>
                <td class="right">{{numberWithCommas(giftColSummary.amt.g300k)}}</td>
                <td class="right">{{numberWithCommas(giftColSummary.amt.g500k)}}</td>
                <td class="right">{{numberWithCommas(giftColSummary.amt.total)}}</td>
              </tr>
              <template v-for="(gift, index) in giftList">
                <tr :key="'tr_cnt_' + index">
                  <td rowspan="2">{{ gift.cmpnyNm }}</td>
                  <td>수량</td>
                  <td class="right"><input type="number" class="ur-text-field__input input-text-sap00001" v-model="gift.giftDeposit1kCnt" @input="keyDown(gift,'giftDeposit1kCnt')"/></td>
                  <td class="right"><input type="number" class="ur-text-field__input input-text-sap00001" v-model="gift.giftDeposit2kCnt" @input="keyDown(gift,'giftDeposit2kCnt')"/></td>
                  <td class="right"><input type="number" class="ur-text-field__input input-text-sap00001" v-model="gift.giftDeposit5kCnt" @input="keyDown(gift,'giftDeposit5kCnt')"/></td>
                  <td class="right"><input type="number" class="ur-text-field__input input-text-sap00001" v-model="gift.giftDeposit10kCnt" @input="keyDown(gift,'giftDeposit10kCnt')"/></td>
                  <td class="right"><input type="number" class="ur-text-field__input input-text-sap00001" v-model="gift.giftDeposit30kCnt" @input="keyDown(gift,'giftDeposit30kCnt')"/></td>
                  <td class="right"><input type="number" class="ur-text-field__input input-text-sap00001" v-model="gift.giftDeposit50kCnt" @input="keyDown(gift,'giftDeposit50kCnt')"/></td>
                  <td class="right"><input type="number" class="ur-text-field__input input-text-sap00001" v-model="gift.giftDeposit70kCnt" @input="keyDown(gift,'giftDeposit70kCnt')"/></td>
                  <td class="right"><input type="number" class="ur-text-field__input input-text-sap00001" v-model="gift.giftDeposit100kCnt" @input="keyDown(gift,'giftDeposit100kCnt')"/></td>
                  <td class="right"><input type="number" class="ur-text-field__input input-text-sap00001" v-model="gift.giftDeposit300kCnt" @input="keyDown(gift,'giftDeposit300kCnt')"/></td>
                  <td class="right"><input type="number" class="ur-text-field__input input-text-sap00001" v-model="gift.giftDeposit500kCnt" @input="keyDown(gift,'giftDeposit500kCnt')"/></td>
                  <td class="right">{{ numberWithCommas(giftRowSummary[index].cnt) }}</td>
                </tr>
                <tr :key="'tr_amt_' + index">
                  <td>금액</td>
                  <td class="right">{{ numberWithCommas(gift.giftDeposit1kCnt * 1000) }}</td>
                  <td class="right">{{ numberWithCommas(gift.giftDeposit2kCnt * 2000) }}</td>
                  <td class="right">{{ numberWithCommas(gift.giftDeposit5kCnt * 5000) }}</td>
                  <td class="right">{{ numberWithCommas(gift.giftDeposit10kCnt * 10000) }}</td>
                  <td class="right">{{ numberWithCommas(gift.giftDeposit30kCnt * 30000) }}</td>
                  <td class="right">{{ numberWithCommas(gift.giftDeposit50kCnt * 50000) }}</td>
                  <td class="right">{{ numberWithCommas(gift.giftDeposit70kCnt * 70000) }}</td>
                  <td class="right">{{ numberWithCommas(gift.giftDeposit100kCnt * 100000) }}</td>
                  <td class="right">{{ numberWithCommas(gift.giftDeposit300kCnt * 300000) }}</td>
                  <td class="right">{{ numberWithCommas(gift.giftDeposit500kCnt * 500000) }}</td>
                  <td class="right">{{ numberWithCommas(giftRowSummary[index].amt) }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div class="btn_wrap bottom">
          <div class="right_box">
            <ur-button @click="initItems">초기화</ur-button>
            <ur-button @click="closeModal">확인</ur-button>
            <ur-button color="violet" @click="closeModal">닫기</ur-button>
          </div>
        </div>
      </div>
        <!-- </sui-page> -->
      </template>
    </div>
  </sui-page>
</template>
<script>
import _ from 'lodash'
import sapMixin from './mixin/pcAccount.data.mixin'
export default {
  name: "PGE_SAP_00002", // eslint-disable-line vue/name-property-casing
  components: {},
  mixins: [ sapMixin ],
  props: {
    closePagePopup: {
      type: Function,
      default() {
        return null;
      },
    },
    pageInitialData: {
      type: Object
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {
    if(!utils.isEmpty(this.pageInitialData.giftList)){
      this.giftList = _.cloneDeep(this.pageInitialData.giftList)
    }
  },
  methods: {
    closeModal() {
      this.closePagePopup(this.giftList);
    },
    initItems() {
      this.giftList = _.cloneDeep(this.pageInitialData.orgGiftList)
    }
  }
};
</script>
<style scoped>
.input-text-sap00001 { 
  width: 100%;
  min-width:95px; 
  height:32px;
  text-align: right;
}
</style>
