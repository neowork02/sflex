<template>
  <sui-page class="custom_page">
    <sui-page-header2 :pageId="this.$options.name" />
    <sui-page-contents>
      <!-- S::컨텐츠1 -->
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_DT')"
          required
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-range-picker
            v-model="dateValue"
            autoConfirm
            input-type="YYYY-MM-DD"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_CLASS_NOTICE')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-dropdown v-model="notiKind" :items="notiKindList" />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TIT_TTL')"
          :labelAlign="'right'"
          style="width: 100%; height: auto"
        >
          <ur-text-field
            v-model="title"
            style="width: 100%"
            maxlength="30"
            @keyup="specialChar"
            @keyup.enter="searchValid"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button type="button" @click="reset">{{ $t('MSG_BTN_RESET') }}</ur-button> <!-- 초기화 -->
          <ur-button v-permission:read="this.$options.name" type="button" color="violet" @click="searchValid">{{ $t('MSG_TXT_SRCH') }}</ur-button> <!-- 조회 -->
        </div>
      </div>
      <!-- E::컨텐츠1 -->

      <!-- S::컨텐츠2:입력정보 -->
      <div class="comm_title_wrap mt30">
        <h4 class="pr10">{{ $t('MSG_TIT_BS13_MNG') }}</h4>
        <ur-button v-permission:create="this.$options.name" type="button" color="violet" @click="checkInsert">{{ $t('MSG_BTN_NEW') }}</ur-button> <!-- 신규 -->
        <ur-button v-permission:delete="this.$options.name" type="button" color="violet" @click="checkDelete">{{ $t('MSG_BTN_DEL') }}</ur-button> <!-- 삭제 -->
        <ur-button v-permission:update="this.$options.name" type="button" color="violet" @click="checkSave">{{ $t('MSG_TXT_SAVE') }}</ur-button> <!-- 저장 -->
        <ur-button v-permission:excel="this.$options.name" type="button" color="violet" @click="excelDown">{{ $t('MSG_TXT_EXCEL_DOWNLOAD') }}</ur-button> <!-- 엑셀다운로드 -->
        <!--S:: 타이틀 오른쪽 total info -->
        <div class="right_box mt12">
          <div class="totalNo">
            <div class="totalCt">Total<span>{{ numberWithCommas(totalCnt) }}</span>{{ $t('MSG_TXT_CNT') }}</div>
          </div>
        </div>
        <!--E:: 타이틀 오른쪽 total info -->
      </div>
      <real-grid
        ref="pgeBsn00001Grid"
        grid-id="pgeBsn00001Grid"
        grid-root="/lib"
        :gridFields="gridFields"
        :gridColumns="gridColumns"
        :gridRows="gridDataList"
        :gridCellClick="gridCellClick"
        :style="gridStyle"
      />
      <ur-form-box toggleable class="mt20">
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_CLASS_NOTICE')"
          required
          :labelAlign="'right'"
          style="width: 100%; height: auto"
        >
          <ur-dropdown v-model="selectNotiKind" :items="selNotiKindList" :disabled="disabled"/>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap borTop"
          :label="$t('MSG_TXT_POST_DATE')"
          required
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-date-picker
            v-model="selectNoticeStartDate"
            autoConfirm
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap borTop"
          :label="$t('MSG_TXT_POST_END_DATE')"
          required
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-date-picker
            v-model="selectNoticeEndDate"
            autoConfirm
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TIT_TTL')"
          required
          :labelAlign="'right'"
          style="width: 100%; height: auto"
        >
          <ur-text-field
            v-model="selectTitle"
            style="width: 100%"
            maxlength="50"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_CNTN')"
          :labelAlign="'right'"
          style="width: 100%; height: auto"
        >
          <sui-web-editor
            ref="tuiEditor"
            v-model="selectContent"
            :initialValue="content"
            :height="250"
            @loaded="editorLoaded"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E::컨텐츠2:입력정보 -->

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_BSN_00001", // eslint-disable-line vue/name-property-casing
  props: {},
  components: {},
  filters: {
    // 게시일자 data format
    noticeStartDate(date) {
      return date ? utils.toStringByFormat(date, "YYYY-MM-DD") : "";
    },
    // 게시종료일자 data format
    noticeEndDate(date) {
      return date ? utils.toStringByFormat(date, "YYYY-MM-DD") : "";
    },
  },
  data() {
    return {
      today: utils.now("YYYY-MM-DD"), // 오늘 날짜
      dateValue: [],
      noticeStartDate: null,  // 조회기간(From)
      noticeEndDate: null,    // 조회기간(To)
      notiKind: "",
      title: null,
      content: null,
      selectNotiKind: "",
      selectNoticeStartDate: null,
      selectNoticeEndDate: null,
      selectTitle: null,
      selectContent: null,
      imageData: null,
      clickCheck: false,
      checkAddRow: false,
      gridDataList: [],
      notiKindList: [],
      selNotiKindList: [],
      selectedGridRowData: {},
      gridStyle: { height: "250px" },
      // select box 전체
      allSelect: {value: "", text: this.$t('MSG_TXT_ALL')}, // 전체
      // select box 선택
      selAllSelect: {value: "", text: this.$t('MSG_TXT_SEL')}, // 선택
      totalCnt: 0,
    };
  },
  created() {
    this.gridFields = [
      { fieldName: "noticeStartDate", dataType: "text", datetimeFormat: "yyyyMMdd" },
      { fieldName: "notiKindNm", dataType: "text" },
      { fieldName: "title", dataType: "text" },
    ];
    this.gridColumns = [
      {
        // 게시일자
        name: "noticeStartDateColumn",
        fieldName: "noticeStartDate",
        width: 100,
        edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
        header: {
          text: this.$t('MSG_TXT_POST_DATE'),
        },
        datetimeFormat: "yyyy-MM-dd",
      },
      {
        // 공지구분
        name: "notiKindNmColumn",
        fieldName: "notiKindNm",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TXT_CLASS_NOTICE'),
        },
      },
      {
        // 제목
        name: "titleColumn",
        fieldName: "title",
        width: 100,
        edit: false,
        header: {
          text: this.$t('MSG_TIT_TTL'),
        },
      },
    ];
  },
  computed: {
    disabled() {
      // 공지사항관리 신규버튼 클릭 시
      if (this.checkAddRow) {
        // 하단 공지구분 select-box 활성화
        return false;
      } else {
        // 하단 공지구분 select-box 비활성화
        return true;
      }
    },
  },
  watch: {
    dateValue(newVal, oldVal) {
      this.noticeStartDate = newVal[0];
      this.noticeEndDate = newVal[1];
    },
  },
  mounted() {
    this.dateValue = [this.today, this.today];
    this.notiKind = "";
    this.title = null;
    this.selectNotiKind = "";
    this.selectNoticeStartDate = null;
    this.selectNoticeEndDate = null;
    this.selectTitle = null;
    this.selectContent = null;
    this.clickCheck = false;
    this.checkAddRow = false;
    this.resetGridRowData();
    // this.allSelect >> (조회조건) 전체 포함 공지구분 공통코드 조회
    http.request(this.$options.name, "DTS_BST_00008", {
      path: { 'code-id': 'COD_NOTI_FG'}
    }).then(res => {
      res.data.unshift(Object.assign({}, this.allSelect))
      this.notiKindList = res.data
    })
    // this.allSelect >> (조회조건) 선택 포함 공지구분 공통코드 조회
    http.request(this.$options.name, "DTS_BST_00008", {
      path: { 'code-id': 'COD_NOTI_FG'}
    }).then(res => {
      res.data.unshift(Object.assign({}, this.selAllSelect))
      this.selNotiKindList = res.data
    })
  },
  methods: {
    // 초기화
    reset() {
      this.dateValue = [this.today, this.today];
      this.notiKind = "";
      this.title = null;
      this.content = null;
      this.clickCheck = false;
      this.checkAddRow = false;
      this.selectedGridRowData = null;
    },
    // data reset
    resetGridRowData() {
      this.selectedGridRowData = null;
      this.content = null;
      this.$refs.tuiEditor.setContent(this.content);
    },
    // 하단 데이터 출력란 reset
    resetFormData() {
      this.selectNotiKind = "";
      this.selectNoticeStartDate = null;
      this.selectNoticeEndDate = null;
      this.selectTitle = null;
      this.selectContent = null;
    },
    // 조회 시 validation check
    searchValid() {
      if (this.noticeStartDate === "" || this.noticeStartDate === null || this.noticeEndDate === "" || this.noticeEndDate === null) {
        // 조회일자를 입력해주세요.
        utils.messageBox("alert", this.$t('MSG_ALT_INQUIRY_DATE'));
        return;
      }
      this.search();
    },
    // 조회 파라미터
    getSearchParam() {
      const params = {
        noticeStartDate: this.noticeStartDate.replace(/-/g, ""),
        noticeEndDate: this.noticeEndDate.replace(/-/g, ""),
        notiKind: utils.trim(this.notiKind),
        title: utils.trim(this.title),
      };
      return params;
    },
    // 조회
    search() {
      this.resetFormData();
      const params = this.getSearchParam();
      http.request(this.$options.name, "DTS_BSN_00001", {
          query: params,
      }).then((res) => {
        if (res.data) {
          this.$refs.tuiEditor.setHtml(res.data.content);
          const resData = res.data;
          this.totalCnt = res.data.length;
          this.gridDataList = resData;
          if (this.gridDataList.length == 0) {
            // 데이터가 존재하지 않습니다.
            // utils.messageBox("alert", this.$t('MSG_ALT_NO_DATA'));
            // Grid 초기화
            this.gridDataList = [];
            this.$refs.pgeBsn00001Grid.setRows(this.gridDataList);
            this.totalCnt = this.$refs.pgeBsn00001Grid.getJsonRows().length;
            return;
          }
          this.checkAddRow = false;
          this.$refs.pgeBsn00001Grid.setRows(this.gridDataList);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    // 신규버튼 클릭 시 >> Grid 줄 추가 및 입력란 활성화
    checkInsert() {
      this.checkAddRow = true;
      this.$refs.pgeBsn00001Grid.onAddRow();
      this.selectNotiKind = "";
      this.selectNoticeStartDate = null;
      this.selectNoticeEndDate = null;
      this.selectTitle = null;
      this.selectContent = null;
      this.$refs.tuiEditor.setContent(this.content);
    },
    // 신규 >> 저장버튼 클릭 시 insert 파라미터
    getInsertParam() {
      const params = {
        notiKind: utils.trim(this.selectNotiKind),
        noticeStartDate: this.selectNoticeStartDate.replace(/-/g, ""),
        noticeEndDate: this.selectNoticeEndDate.replace(/-/g, ""),
        title: utils.trim(this.selectTitle),
        content: this.$refs.tuiEditor.getContent(),
      };
      return params;
    },
    // 삭제
    checkDelete() {
      // Grid row에 data check 가 없을 때
      if (!this.clickCheck) {
        // 삭제할 데이터를 선택하세요
        utils.messageBox("alert", this.$t('MSG_ALT_DEL_DATA_SELT'));
        return;
      }
      this.deletePlan();
    },
    // 삭제 파라미터
    getDeleteParam() {
      const params = {
        seqNo: utils.trim(this.selectedGridRowData.seqNo),
      };
      return params;
    },
    deletePlan() {
      // 삭제하시겠습니까?
      utils.messageBox("confirm", this.$t('MSG_ALT_DEL'), null,
        (/* ok */) => {
          const params = this.getDeleteParam();
          http.request(this.$options.name, "DTS_BSN_00004", {
              query: params,
          }).then(() => {
            this.clickCheck = false;
            this.resetGridRowData();
            // 삭제 되었습니다. >> 삭제 후 재조회
            utils.messageBox("success", this.$t("MSG_ALT_DEL_DATA"), null, this.search);
          }).catch((error) => {
            console.log(error);
          });
        },
        (/* cancel */) => {}
      );
    },
    // 수정 파라미터
    getUpdateParam() {
      const params = {
        seqNo: utils.trim(this.selectedGridRowData.seqNo),
        notiKind: utils.trim(this.selectedGridRowData.notiKind),
        noticeStartDate: this.selectNoticeStartDate.replace(/-/g, ""),
        noticeEndDate: this.selectNoticeEndDate.replace(/-/g, ""),
        title: utils.trim(this.selectTitle),
        content: this.$refs.tuiEditor.getContent(),
      };
      return params;
    },
    // 저장
    checkSave() {
      // editor size check
      if (this.$refs.tuiEditor.isContentSizeExcceed()) return;
      if (this.selectNotiKind === "" || this.selectNotiKind === null) {
        // 공지구분을 선택해주세요.
        utils.messageBox("alert", this.$t("MSG_ALT_SEL_NOTI_CATEGORY"));
        return;
      }
      if (utils.isEmpty(this.selectNoticeStartDate) ||
          utils.isEmpty(this.selectNoticeEndDate) || utils.isEmpty(this.selectTitle)) {
        // 필수입력값을 모두 입력해주세요.
        utils.messageBox("alert", this.$t("MSG_ALT_ALL_REQ_INPUT_VAL"));
        return;
      }
      // 신규버튼 클릭 후 저장
      if (this.checkAddRow) {
        // 등록하시겠습니까?
        utils.messageBox("confirm", this.$t('MSG_ALT_RGST'), null,
          (/* ok */) => {
            const params = this.getInsertParam();
            http.request(this.$options.name, "DTS_BSN_00002", {
                query: params,
            }).then(() => {
              this.checkAddRow = false;
              this.clickCheck = false;
              this.resetGridRowData();
              // 저장되었습니다. >> 저장 후 재조회
              utils.messageBox("success", this.$t("MSG_ALT_SAVE_DATA"), null, this.search);
            }).catch((error) => {
              console.log(error);
            });
          },
          (/* cancel */) => {}
        );
      // 행선택 후 저장
      } else {
        // Grid row check 안했을 때
        if (!this.clickCheck) {
          // 수정할 데이터를 선택하세요.
          utils.messageBox("alert", this.$t('MSG_ALT_MOD_NO_DATA'));
          return;
        }
        // 저장하시겠습니까?
        utils.messageBox("confirm", this.$t('MSG_ALT_IS_SAV_DATA'), null,
          (/* ok */) => {
            const params = this.getUpdateParam();
            http.request(this.$options.name, "DTS_BSN_00003", {
                query: params,
            }).then(() => {
              this.clickCheck = false;
              this.resetGridRowData();
              // 저장되었습니다. >> 저장 후 재조회
              utils.messageBox("success", this.$t("MSG_ALT_SAVE_DATA"), null, this.search);
            }).catch((error) => {
              console.log(error);
            });
          },
          (/* cancel */) => {}
        );
      }
    },
    // 엑셀다운로드
    excelDown() {
      if (this.$refs.pgeBsn00001Grid.getJsonRows().length == 0) {
        // 조회된 데이터가 없습니다.
        utils.messageBox("alert", this.$t("MSG_ALT_NO_SERACH_DATA"));
        return;
      }
      // 공지사항관리
      this.$refs.pgeBsn00001Grid.getExcelDownload(this.$t('MSG_TIT_BS13_MNG'), "PGE_BSN_00001");
    },
    // 리얼그리드 셀 클릭 이벤트
    gridCellClick(grid, data) {
      if (data.dataRow >= 0 && !this.checkAddRow) {
        this.clickCheck = true;
        this.checkAddRow = false;
        this.selectNotiKind = this.gridDataList[data.dataRow].notiKind;
        this.selectNoticeStartDate = this.gridDataList[data.dataRow].noticeStartDate;
        this.selectNoticeEndDate = this.gridDataList[data.dataRow].noticeEndDate;
        this.selectTitle = this.gridDataList[data.dataRow].title;
        this.selectContent = this.gridDataList[data.dataRow].content;
        this.selectedGridRowData = this.gridDataList[data.dataRow];
        var editorContent = this.gridDataList[data.dataRow].content;
        this.selectedGridRowData.content = editorContent;
        this.$refs.tuiEditor.setHtml(this.selectedGridRowData.content);
      } else {
        this.selectedGridRowData = {};
      }
    },
    editorLoaded() {
      this.$refs.tuiEditor.setHtml(this.selectContent);
    },
    // 특수문자 체크
    specialChar() {
      const searchNewText = utils.trim(this.title);
      if (utils.isExistSpecialChar(searchNewText)) {
        // `-_{}[];:<>/? 제외 특수문자는 입력할 수 없습니다.
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.title = ''
        });
      }
    },
    numberWithCommas(number) {
      if (number || number === 0) {
        number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return (!number && number !== 0) ? '' : number
    },
  },
};
</script>
<style scoped></style>
