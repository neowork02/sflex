<template>
  <sui-page>
    <div class="modalWrap" style="height: auto; overflow-y: scroll">
      <template slot="title">
        <div class="modal-title mb20">카드결제</div>
      </template>
      <template>
        <div class="modal-body">
          <!-- S::cardpayWrap -->
          <div class="cardpayWrap">
            <!-- S::컨텐츠1: -->
            <div class="board_list">
              <table>
                <caption></caption>
                <colgroup>
                  <col width="13.5%" />
                  <col width="36.5%" />
                  <col width="13.5%" />
                  <col width="*" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>총금액</th>
                    <td class="right">220,000원</td>
                    <th class="required-icon">미결금액</th>
                    <td class="right">220,000원</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- E::컨텐츠1:-->

            <!-- S::컨텐츠2:결제유형+카드결제내역 -->
            <div class="comm_shut_wrap">
              <div class="inbox4">
                <!-- S::결제유형 -->
                <div class="comm_title_wrap mt30">
                  <h4 class="pr10">결제유형</h4>
                </div>
                <div class="comm_view_wrap">
                  <div class="row">
                    <div class="col-xs-4-1 required-icon">
                      <sui-input-label label="카드번호" />
                    </div>
                    <div class="col-xs-8">
                      <sui-text-field
                        placeholder=""
                        ref="cardNo"
                        maxlength="19"
                        v-model="cardNo"
                        :disabled="false"
                        :readonly="false"
                        mask="****-****-****-****"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xs-4-1 required-icon">
                      <sui-input-label label="결제금액" />
                    </div>
                    <div class="col-xs-8">
                      <sui-text-field
                        placeholder=""
                        ref="apprAmt"
                        maxlength="12"
                        v-model="cardInputData.apprAmt"
                        mask="currency"
                        :disabled="disabledTextApprAmt"
                        :readonly="false"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xs-4-1">
                      <sui-input-label label="카드사명" />
                    </div>
                    <div class="col-xs-8">
                      <sui-text-field
                        placeholder=""
                        maxlength="100"
                        v-model="cardInputData.compCodeNm"
                        :disabled="true"
                        :readonly="true"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xs-4-1 required-icon">
                      <sui-input-label label="유효기간" />
                    </div>
                    <div class="col-xs-8">
                      <sui-text-field
                        placeholder=""
                        maxlength="5"
                        v-model="cardInputData.expireYm"
                        mask="##-##"
                        :disabled="disabledTextExpireYm"
                        :readonly="false"
                      />
                      <span class="text">[MM/YY]</span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xs-4-1 required-icon">
                      <sui-input-label label="할부개월" />
                    </div>
                    <div class="col-xs-8">
                      <sui-text-field
                        placeholder=""
                        maxlength="5"
                        v-model="cardInputData.divideGigan"
                        mask="##"
                        :disabled="disabledTextDivideGigan"
                        :readonly="false"
                      />
                      <span class="text">개월</span>
                    </div>
                  </div>
                </div>

                <!-- S::btn_wrap-->
                <div class="btn_wrap">
                  <sui-button
                    type="button"
                    :disabled="disabledBtnCardInput"
                    class="point"
                    ><span>수기입력</span></sui-button
                  >
                  <sui-button
                    type="button"
                    :disabled="disabledBtnAppCard"
                    class="point"
                    ><span>APP카드</span></sui-button
                  >
                  <sui-button
                    type="button"
                    :disabled="disabledBtnNfcReading"
                    class="point"
                    ><span>NFC리딩</span></sui-button
                  >
                </div>
                <!-- E::btn_wrap -->
                <!-- S::btn_wrap -->
                <div class="btn_wrap">
                  <sui-button
                    type="button"
                    :disabled="disabledBtnEasyCehck"
                    class="point"
                    ><span>EasyCheck</span></sui-button
                  >
                  <sui-button
                    type="button"
                    :disabled="disabledBtnInAgree"
                    class="point"
                    ><span>수기승인</span></sui-button
                  >
                  <sui-button
                    type="button"
                    :disabled="disabledBtnAgree"
                    class="point"
                    ><span>승인</span></sui-button
                  >
                </div>
                <!-- E::btn_wrap -->
                <div class="comm_view_wrap mt10">
                  <div class="row">
                    <div class="col-xs-4-1">
                      <sui-input-label label="원승인일자" />
                    </div>
                    <div class="col-xs-8">
                      <sui-select-box
                        v-model="currentSelected"
                        option-list="optionList"
                        @list-click="itemSelected"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xs-4-1">
                      <sui-input-label label="승인번호" />
                    </div>
                    <div class="col-xs-8">
                      <sui-text-field
                        placeholder=""
                        maxlength="100"
                        :disabled="false"
                        :readonly="false"
                      />
                    </div>
                  </div>
                </div>
                <!-- S::btn_wrap -->
                <div class="btn_wrap">
                  <sui-button
                    type="button"
                    :disabled="disabledBtnCardInput"
                    class="point"
                    ><span>IC리딩</span></sui-button
                  >
                  <sui-button
                    type="button"
                    :disabled="disabledBtnCardInput"
                    class="point"
                    ><span>완료</span></sui-button
                  >
                  <sui-button
                    type="button"
                    :disabled="disabledBtnCardInput"
                    class="point"
                    ><span>취소</span></sui-button
                  >
                </div>
                <!-- E::btn_wrap -->
              </div>
              <!-- E::결제유형 -->
              <div class="emptybox" />
              <!-- S::카드결제내역 -->
              <div class="inbox6">
                <div class="comm_title_wrap mt30">
                  <h4 class="pr10">카드결제내역</h4>
                </div>
                <real-grid
                  ref="grdCard"
                  grid-id="PGE_CTM_00004_CARD"
                  grid-root="/lib"
                  :gridFields="c"
                  :gridColumns="cardGrdColumns"
                  :gridRows="payCardList"
                  :gridInit="false"
                  :gridCheckBar="false"
                  :gridCellClick="cardGridCellClick"
                  :gridEditRowChanged="cardGridEditRowChanged"
                  :style="{ height: '435px' }"
                />
              </div>
              <!-- E::카드결제내역 -->
            </div>
            <!-- ::E 컨텐츠2:결제유형+카드결제내역 -->

            <!-- S::컨텐츠3:메시지 -->
            <div class="con_box mt20" style="height: auto">
              <span>상세리턴 값 결과</span>
            </div>
            <!-- E::컨텐츠3:메시지  -->
            <!-- S::컨텐츠:식별메시지 -->
            <div class="cardReaderMsg">
              [SW식별] <span>####ERPS-MEM0001</span> <em>/</em> [리더기식별]
              <span>## ####EP-7633111</span>
            </div>
            <!-- E::컨텐츠:식별메시지 -->
            <!-- S::btn_wrap -->
            <div class="btn_wrap bottom">
              <sui-button
                type="button"
                :disabled="disabledBtnCardInput"
                class="default"
                ><span>확인</span></sui-button
              >
              <sui-button
                type="button"
                :disabled="disabledBtnCardInput"
                class="point"
                ><span>취소</span></sui-button
              >
            </div>
            <!-- E::btn_wrap -->
          </div>
          <!-- ::E cardpayWrap -->
        </div>
      </template>
    </div>
  </sui-page>
</template>

<script>
export default {
  name: "PGE_CTM_00004", // eslint-disable-line vue/name-property-casing
  components: {},
  data() {
    return {
      isLogging: true, // consle log 남기는지 여부

      //Main 결제정보
      payMainInfo: {
        payerMemshpName: "",
        payerMemshpUid: "",
        payerMemberKind: "",
        condTtypeCd: "",
        cardCompCd: "",
        dcTypeCd: "",
        joinKind: "",
        logSeq: "",
        totSaleAmt: 0,
        totPay: 0,
        notPay: 0,
        cardPay: 0,
        // optionList: ["rrr"],

        selected: [],
        isActive: false, // 옵션 리스트 펼침 여부
      },
      //카드결제 정보
      cardNo: "",
      cardInputData: { apprAmt: "11111" },
      cardResultMessage: "",

      //카드결제 리스트
      payCardList: [],

      // 카드 결제 정보 Grid 세팅
      cardGridView: null,
      cardDataProvider: null,
      cardGrdFields: [],
      cardGrdColumns: [],
      cardGrdDataList: [],

      //status Kind List
      statusKindCds: [],
      statusKindNms: [],

      //btn disabled
      disabledBtnCardInput: false,
      disabledBtnAppCard: false,
      disabledBtnNfcReading: false,
      disabledBtnEasyCehck: false,
      disabledBtnInAgree: true,
      disabledBtnAgree: true,
      disabledBtnClear: true,
      disabledBtnOk: true,
      disabledBtnCancel: false,

      //text disabled
      disabledTextApprAmt: false,
      disabledTextExpireYm: false,
      disabledTextDivideGigan: false,
    };
  },
  computed: {},
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    // 카드 결제 내역 Grid
    this.cardGrdFields = [
      {
        // 카드번호
        fieldName: "cardNo",
        dataType: "text",
      },
      {
        // 카드사명
        fieldName: "compName",
        dataType: "text",
      },
      {
        // 유효년월
        fieldName: "compValid",
        dataType: "text",
      },
      {
        // 승인일자
        fieldName: "apprDate",
        dataType: "text",
      },
      {
        // 승인시각
        fieldName: "apprTime",
        dataType: "text",
      },
      {
        // 승인번호
        fieldName: "apprNo",
        dataType: "text",
      },
      {
        // 승인금액
        fieldName: "apprAmt",
        dataType: "number",
      },
      {
        // 처리상태
        fieldName: "statusKind",
        dataType: "text",
      },
    ];
    this.cardGrdColumns = [
      {
        name: "cardNo",
        fieldName: "cardNo",
        header: { text: "카드번호" },
        width: 150,
      },
      {
        name: "compName",
        fieldName: "ompName",
        header: { text: "카드사" },
        width: 100,
      },
      {
        name: "compValid",
        fieldName: "compValid",
        header: { text: "유효년월" },
        width: 100,
      },
      {
        name: "apprDate",
        fieldName: "apprDate",
        header: { text: "승인일자" },
        width: 100,
      },
      {
        name: "apprTime",
        fieldName: "apprTime",
        header: { text: "승인시각" },
        width: 100,
      },
      {
        name: "apprNo",
        fieldName: "apprNo",
        header: { text: "승인번호" },
        width: 100,
      },
      {
        name: "apprAmt",
        fieldName: "apprAmt",
        width: 100,
        header: { text: "승인금액" },
        numberFormat: "#,##0",
        editable: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
      },
      {
        name: "statusKind",
        fieldName: "statusKind",
        width: 100,
        sortable: false,
        lookupDisplay: true,
        values: this.statusKindCds,
        labels: this.statusKindNms,
        editor: { type: "dropdown" },
        header: { text: "처리상태" },
        styles: { textAlignment: "center" },
      },
    ];
  },
  async mounted() {
    //Card grid 초기화
    await ({
      gridView: this.cardGridView,
      dataProvider: this.cardDataProvider,
    } = this.$refs.grdCard.initGrid());
  },
  filters: {
    moneyPoint(value) {
      return window.utils.numberFormat(value, 0);
    },
  },
  methods: {
    //카드결제내역 Grid Method
    cardGridCellClick(data) {
      this.trace(data);
    },
    cardGridEditRowChanged(data) {
      this.trace(data);
    },
    cardGridRendered() {},
    trace(msg, msg2) {
      if (this.isLogging) {
        if (msg2) {
          console.log(msg, msg2);
        } else {
          console.log(msg);
        }
      }
    },
  },
};
</script>
<style scoped></style>
