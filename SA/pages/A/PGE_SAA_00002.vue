<template>
  <sui-page class="custom_page">
    <div class="modalWrap" style="height: auto">
      <template slot="title">
        <div class="modal-title mb45">{{ $t("MSG_TXT_PAY_INFO_LIST") }}</div>
        <!-- 결제정보리스트 -->
      </template>
      <template>
        <!-- <sui-page class="custom_page"> -->
        <div class="modal-body">
          <!-- ::S 콘텐츠1 -->
          <div class="comm_title_wrap">
            <h4>{{ $t("MSG_TXT_PAY_INFO_LIST") }}</h4>
            <!--S:: 타이틀 오른쪽 total info -->
            <div class="right_box">
              <div class="totalNo">
                <div class="totalCt">Total<span>{{ gridDataList.length }}</span>건</div>
              </div>
            </div>
            <!--E::: 타이틀 오른쪽 total info -->
          </div>
          <!-- ::E 콘텐츠1 -->
          <real-grid
            ref="grid"
            grid-id="pgeSaa00002"
            grid-root="/lib"
            :gridFields="gridFields"
            :gridColumns="gridColumns"
            :gridRows="gridDataList"
            :gridDbCellClick="onDbCellClick"
            :style="gridStyle"
            :selectionStyle="'rows'"
            :gridCheckBar="{ visible: false }"
          />
          <!-- ::E 콘텐츠1 -->
          <!-- ::E 콘텐츠1 -->
        </div>
        <!-- </sui-page> -->
      </template>
      <!-- </sui-page> -->
      <div class="btn_wrap bottom">
        <div class="right_box">
          <ur-button @click="onSelection">{{ $t("MSG_BTN_SELT") }}</ur-button>
          <!-- 선택 -->
          <ur-button @click="onClickClose">
            {{ $t("MSG_BTN_CLOSE") }}
          </ur-button>
          <!-- 닫기 -->
        </div>
      </div>
    </div>
  </sui-page>
</template>
<script>
import _ from "lodash";
import BasePage from "~cm/components/BasePage"; // eslint-disable-line import/no-unresolved

export default {
  name: "PGE_SAA_00002", // eslint-disable-line vue/name-property-casing
  components: {},
  extends: BasePage,
  props: {
    closePagePopup: {
      type: Function,
      default() {
        return null;
      },
    },
    pageInitialData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      gridFields: [
        {
          fieldName: "paymntDate",
          dataType: "datetime",
          datetimeFormat: "yyyyMMddhhmmss",
        }, // 판매일자
        {
          fieldName: "paymntTime",
          dataType: "datetime",
          datetimeFormat: "HHmmss",
        }, // 판매시간
        { fieldName: "receiptNo", dataType: "text" }, // 영수증번호
        { fieldName: "saleKindNm", dataType: "text" }, // 판매구분
        { fieldName: "payerTicketNo", dataType: "text" }, // 결제자 정기권번호
        { fieldName: "ticketNo", dataType: "text" }, // 동반자 정기권번호
        { fieldName: "saleAmt", dataType: "number" }, // 총매출액
        { fieldName: "inwonCnt", dataType: "number" }, // 인원수
        { fieldName: "posId", dataType: "text" }, // POS ID
        { fieldName: "posNm", dataType: "text" }, // POS명
      ],
      gridColumns: [
        {
          // 판매일자
          name: "paymntDateColumn",
          fieldName: "paymntDate",
          width: 100,
          header: {
            text: this.$t("MSG_TXT_SALE_DATE"),
          },
          datetimeFormat: "yyyy/MM/dd",
          edit: false,
        },
        {
          // 판매시간
          name: "paymntTimeColumn",
          fieldName: "paymntTime",
          width: 100,
          header: {
            text: this.$t("MSG_TXT_SALE_DATE"),
          },
          datetimeFormat: "HH:mm:ss",
          edit: false,
        },
        {
          // 영수증번호
          name: "receiptNoColumn",
          fieldName: "receiptNo",
          width: 230,
          header: {
            text: this.$t("MSG_TXT_RECEIPT_NO"),
          },
          editor: {
            maxLength: 50,
          },
          edit: false,
        },
        {
          // 판매구분
          name: "saleKindNmColumn",
          fieldName: "saleKindNm",
          width: 130,
          header: {
            text: this.$t("MSG_TXT_SALE_FG"),
          },
          edit: false,
        },
        {
          // 결제자 정기권번호
          name: "payerTicketNoColumn",
          fieldName: "payerTicketNo",
          width: 120,
          header: {
            text: this.$t("MSG_TXT_PAYER_TICKET_NO"),
          },
          edit: false,
        },
        {
          // 동반자 정기권번호
          name: "ticketNoColumn",
          fieldName: "ticketNo",
          width: 120,
          header: {
            text: this.$t("MSG_TXT_FAMILY_TICKET_NO"),
          },
          edit: false,
        },
        {
          // 총매출액
          name: "saleAmtColumn",
          fieldName: "saleAmt",
          width: 130,
          numberFormat: "#,##0",
          header: {
            text: this.$t("MSG_TXT_TOT_SALE_AMT"),
          },
          edit: false,
          styleName: "align-right",
        },
        {
          // 인원
          name: "inwonCntColumn",
          fieldName: "inwonCnt",
          width: 100,
          numberFormat: "#,##0",
          header: {
            text: this.$t("MSG_TXT_PERSONS"),
          },
          edit: false,
          styleName: "align-right",
        },
        {
          // POS ID
          name: "posIdColumn",
          fieldName: "posId",
          width: 150,
          header: {
            text: "POS ID",
          },
          edit: false,
        },
        {
          // POS명
          name: "posNmColumn",
          fieldName: "posNm",
          width: 150,
          header: {
            text: this.$t("MSG_TXT_POS_NM"),
          },
          edit: false,
          styleName: "align-left",
        },
      ],
      gridDataList: [],
      orgGridDataList: [],
      deleteDataList: [],
      gridStyle: { height: "500px" },
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.search();
  },
  methods: {
    // 그리드 조회
    search() {
      const params = this.pageInitialData;
      http
        .request("PGE_SAA_00002", "DTS_SAA_00001", {
          query: params,
        })
        .then((res) => {
          this.gridDataList = res.data;
          this.$refs.grid.setRows(this.gridDataList);
        })
        .catch((error) => console.log(error));
    },
    // 선택
    onSelection() {
      let rowIdx = this.$refs.grid.gridView.getCurrent().dataRow;
      if (rowIdx < 0) {
        alert("실패");
        return;
      }

      const result = this.gridDataList[this.$refs.grid.gridView.getCurrent().dataRow];
      let receiptNo = result?.receiptNo;
      this.closePagePopup(receiptNo);
      return;
    },

    // 닫기
    onClickClose() {
      this.closePagePopup("");
    },

    onDbCellClick(data) {
      this.onSelection()
    },
  },
};
</script>

<style scoped></style>
