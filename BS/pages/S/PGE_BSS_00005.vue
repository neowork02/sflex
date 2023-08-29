<template>
  <sui-page class="custom_page">
    <sui-page-header2 :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_SRCH_DT')"
          :labelAlign="'right'"
          required
          style="width: 50%; height: auto"
        >
          <ur-range-picker
            v-model="rangeDateValue"
            autoConfirm
            input-type="YYYY-MM-DD"
          />
        </ur-form-item>
        <!-- 조회시스템 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_SEARCH_SYSTEM')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-dropdown v-model="queryData.requOrgCd" :items="apiSystemCdList" />
        </ur-form-item>
        <!-- 인터페이스 URL -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_INTERFACE_URL')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-text-field
            ref="interfaceUrl"
            v-model="queryData.interfaceUrl"
            style="width: 100%"
            maxlength="50"
            @keyup="specialChar($event,'interfaceUrl')"
            @keyup.enter="onClickSearch"
          />
        </ur-form-item>
        <!-- 트랜젝션 ID -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_TRANSACTION_ID')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-text-field
            ref="transactionId"
            v-model="queryData.transactionId"
            style="width: 100%"
            maxlength="50"
            @keyup="specialChar($event,'transactionId')"
            @keyup.enter="onClickSearch"
          />
        </ur-form-item>
        <!-- 처리결과 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_PRCS_RSLT')"
          :label-align="'left'"
          :labelAlign="'right'"
          style="width: 100%; height: auto"
          maxlength="50"
          @keyup.enter="onClickSearch"
        >
          <ur-dropdown
            v-model="queryData.respnsStatusCd"
            :items="apiResultCdList"
            style="width: 42.3%"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <!-- 초기화 -->
          <ur-button type="button"  @click="onReset">
            {{ $t("MSG_BTN_RESET") }}
          </ur-button>
          <!-- 조회 -->
          <ur-button
            type="button"
           color="violet"
            v-permission:read="this.$options.name"
            @click="onClickSearch"
          >
            {{ $t("MSG_TXT_SRCH") }}
          </ur-button>
        </div>
      </div>
      <div class="comm_title_wrap mt25">
        <!-- I/F 로그 목록 -->
        <h4 class="pr10">{{ $t("MSG_TXT_INTERFACE_LOG_LIST") }}</h4>
        <ur-button
          color="violet"
          v-permission:excel="this.$options.name"
          @click="onDownloadExcel()"
          >{{ $t("MSG_TXT_EXCEL_DOWNLOAD") }}</ur-button
        >
        <div class="right_box">
          <div class="totalNo">
            <div class="totalCt">
              Total<span>{{ totalCnt }}</span
              >{{ $t("MSG_TXT_CNT") }}
            </div>
          </div>
        </div>
      </div>
      <real-grid
        ref="pgeBss00005Grid"
        grid-id="pgeBss00005Grid"
        grid-root="/lib"
        :gridFields="realFields"
        :gridColumns="realColumns"
        :style="{ height: '400px' }"
      />
    </sui-page-contents>
  </sui-page>
</template>

<script>
export default {
  name: "PGE_BSS_00005", // eslint-disable-line vue/name-property-casing
  components: {},
  data() {
    return {
      // 드롭다운
      apiSystemCdList: [],
      apiResultCdList: [],
      allSelect: { value: "", text: this.$t("MSG_TXT_ALL") }, // 전체
      // 리얼 그리드
      realFields: [],
      realColumns: [],
      queryData: {
        respnsStatusCd: "",
        requOrgCd: "",
        interfaceUrl: "",
        transactionId: "",
      },
      rangeDateValue: [
        // moment().add(-1, "days").add(-6, "months").format("YYYY-MM-DD"),
        moment().add(0, "days").format("YYYY-MM-DD"),
        moment().add(0, "days").format("YYYY-MM-DD"),
      ],
      rangeDate: {
        // startDate: moment()
        //   .add(-1, "days")
        //   .add(-6, "months")
        //   .format("YYYY-MM-DD"),
        startDate: moment().add(0, "days").format("YYYY-MM-DD"),
        endDate: moment().add(0, "days").format("YYYY-MM-DD"),
      },
      totalCnt: 0,
      userDateFormat: "YYYY-MM-DD",
    };
  },
  computed: {
    serverDate() {
      return utils.now("YYYY-MM-DD");
    },
  },
  watch: {},
  created() {
    this.realFields = [
      { fieldName: "reqDate", dataType: "text" }, // 요청시간
      { fieldName: "respDate", dataType: "text" }, // 응답시간
      { fieldName: "requOrgCd", dataType: "text" }, // 조회시스템
      { fieldName: "ifUrlDesc", dataType: "text" }, // 인터페이스 URL
      { fieldName: "respnsStatusCd", dataType: "text" }, // 응답상태코드
      { fieldName: "respnsMsgDesc", dataType: "text" }, // 응답메세지
      { fieldName: "requTlgrmDesc", dataType: "text" }, // 요청전문내용
      { fieldName: "respnsTlgrmDesc", dataType: "text" }, // 응답전문내용
      { fieldName: "transactionId", dataType: "text" }, // 트랜젝션 ID
    ];
    this.realColumns = [
      {
        // 요청시간
        name: "reqDate",
        fieldName: "reqDate",
        type: "data",
        header: {
          text: this.$t("MSG_TXT_REQ_DATE_TIME"),
        },
      },
      {
        // 응답시간
        name: "respDate",
        fieldName: "respDate",
        type: "data",
        header: {
          text: this.$t("MSG_TXT_RESP_DATE_TIME"),
        },
      },
      {
        // 조회시스템
        name: "systemCd",
        fieldName: "requOrgCd",
        type: "data",
        header: {
          text: this.$t("MSG_TXT_SEARCH_SYSTEM"),
        },
      },
      {
        // 인터페이스 URL
        name: "interfaceUrl",
        fieldName: "ifUrlDesc",
        type: "data",
        header: {
          text: this.$t("MSG_TXT_INTERFACE_URL"),
        },
        renderer: {
          showTooltip: true,
        },
      },
      {
        // 응답상태코드
        name: "respnsStatusCd",
        fieldName: "respnsStatusCd",
        type: "data",
        header: {
          text: this.$t("MSG_TXT_RESP_STATUS_CD"),
        },
      },
      {
        // 응답메세지
        name: "respnsMsgDesc",
        fieldName: "respnsMsgDesc",
        type: "data",
        header: {
          text: this.$t("MSG_TXT_RESP_MSG"),
        },
        renderer: {
          showTooltip: true,
        },
      },
      {
        // 요청전문내용
        name: "requTlgrmDesc",
        fieldName: "requTlgrmDesc",
        type: "data",
        header: {
          text: this.$t("MSG_TXT_REQ_API_PARAM"),
        },
        renderer: {
          showTooltip: true,
        },
      },
      {
        // 응답전문내용
        name: "respnsTlgrmDesc",
        fieldName: "respnsTlgrmDesc",
        type: "data",
        header: {
          text: this.$t("MSG_TXT_RESP_API_VALUE"),
        },
        renderer: {
          showTooltip: true,
        },
      },
      {
        // 트랜젝션 ID
        name: "transactionID",
        fieldName: "transactionId",
        type: "data",
        header: {
          text: this.$t("MSG_TXT_TRANSACTION_ID"),
        },
        renderer: {
          showTooltip: true,
        },
      },
    ];
  },
  mounted() {
    // 초기화
    this.onReset();

    // 공통 코드 정보 로딩
    http
      .request(this.$options.name, "DTS_BST_00008", {
        path: { "code-id": "COD_API_SYSTEM_CD" },
      })
      .then((res) => {
        res.data.unshift(Object.assign({}, this.allSelect));
        this.apiSystemCdList = res.data;
      });

    http
      .request(this.$options.name, "DTS_BST_00008", {
        path: { "code-id": "COD_API_RESULT_CD" },
      })
      .then((res) => {
        res.data.unshift(Object.assign({}, this.allSelect));
        this.apiResultCdList = res.data;
      });
  },
  methods: {
    // 초기화
    onReset() {
      this.rangeDateValue = [this.serverDate, this.serverDate];
      this.queryData.respnsStatusCd = "";
      this.queryData.requOrgCd = "";
      this.queryData.transactionId = "";
      this.queryData.interfaceUrl = "";

      this.$refs.pgeBss00005Grid.setRows([]);
    },
    // 조회기간 가져오기
    updateDate() {
      this.rangeDate = {
        startDate: utils.dateformatToServer(this.rangeDateValue[0], "S"),
        endDate: utils.dateformatToServer(this.rangeDateValue[1], "S"),
      };
    },
    // 조회 처리
    onClickSearch() {
      // 조회기간 설정
      this.updateDate();
      // 조회필수값 체크
      if (!this.validate()) {
        return;
      }
      const queryParams = utils.cloneDeep(this.rangeDate);
      utils.assign(queryParams, {
        transactionId: this.queryData.transactionId,
      });
      utils.assign(queryParams, { ifUrlDesc: this.queryData.interfaceUrl });
      if (this.queryData.requOrgCd != "") {
        utils.assign(queryParams, { requOrgCd: this.queryData.requOrgCd });
      }
      if (this.queryData.respnsStatusCd != "") {
        utils.assign(queryParams, {
          respnsStatusCd: this.queryData.respnsStatusCd,
        });
      }

      // /api/v1/if-log-mng
      http
        .request(this.$options.name, "DTS_BSS_00009", {
          query: queryParams,
        })
        .then((res) => {
          if (res.data) {
            this.totalCnt = utils.numberWithCommas(res.data.length);
            this.$refs.pgeBss00005Grid.setRows(res.data);
          }
        });
    },
    // 조회값 체크
    validate() {
      if (_.isEmpty(this.rangeDate.startDate)) {
        // 시작일을 입력하세요.
        utils.messageBox(
          "alert",
          null,
          utils.strFormat(
            this.$t("MSG_ALT_CHK_NCSR"),
            this.$t("MSG_TXT_START_DATE")
          )
        );
        return false;
      }
      if (_.isEmpty(this.rangeDate.endDate)) {
        // 종료일을 입력하세요.
        utils.messageBox(
          "alert",
          null,
          utils.strFormat(
            this.$t("MSG_ALT_CHK_NCSR"),
            this.$t("MSG_TXT_END_DATE")
          )
        );
        return false;
      }
      return true;
    },
    // 엑셀다운로드
    onDownloadExcel() {
      if (this.$refs.pgeBss00005Grid.getJsonRows().length == 0) {
        // 조회된 데이터가 없습니다.
        utils.messageBox(
          "warning",
          utils.strFormat(this.$t("MSG_ALT_NO_DATA"))
        );
        return;
      }
      this.$refs.pgeBss00005Grid.getExcelDownload(
        this.$t("MSG_TXT_INTERFACE_LOG"), "PGE_BSS_00005"
      );
    },
    // 특수문자 체크
    specialChar(event, type) {
      let searchNewText = ''
      if (type === 'interfaceUrl') {
        searchNewText = this.queryData.interfaceUrl
      } else {
        searchNewText = this.queryData.transactionId
      }
      if (utils.isExistSpecialChar(searchNewText)) {
        // `-_{}[];:<>/? 제외 특수문자는 입력할 수 없습니다.
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          if (type === 'interfaceUrl') {
            this.queryData.interfaceUrl = ''
          } else {
            this.queryData.transactionId = ''
          }
        });
      }
    },
  },
};
</script>
<style scoped></style>
