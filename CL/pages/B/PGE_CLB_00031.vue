<template>
  <div class="body_print">
    <h1 class="header-title_print">
      {{ frame0.boardTitle }}
    </h1>
    <div class="mrB15" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_RGST_USR')"
          />
        </div>
        <div class="col-xs-11">
          {{ frame0.userName }}
        </div>
      </div>
      <div
        v-if="frame0.attachFileName !== null"
        class="row"
      >
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TIT_ATTH_FILE_NM')"
          />
        </div>
        <div class="col-xs-11">
          {{ frame0.attachFileName }}
        </div>
      </div>
    </div>
    <!-- <div class="underLine"></div>    -->
    <div class="mrB30" />
    <sui-web-editor
      ref="tuiEditor"
      :isViewer="true"
      class="width100"
      @loaded="loadEmailInfo"
    />
    <div class="comm_btn_wrap">
      <sui-button
        v-permission:print="contextPageId"
        type="button"
        class="comm_btn_solid"
        @click="onPrintClick"
      >
        {{ $t("MSG_BTN_PRTG") }}
      </sui-button>
    </div>
  </div>
</template>

<script>
import BasePage from '~cm/components/BasePage';

/* eslint max-len: ["error", { "code" : 500 }] */
export default {
  name: 'PGE_CLB_00031', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  data() {
    return {
      isShownPopupDetail: false,
      bbsId: '',
      postIdParam: '',
      bbsName: '',
      bbsTypeCode: '',
      searchEmailType: '',
      attachGroupId: 'ATG_CLB_BBS_COMMON',
      isEditorViewerMode: true,
      frame0: {
        boardTitle: '',
        userName: '',
        attachDocumentId: '',
        attachFileName: '',
      },
      qnaNoticeObjTextContent: '',
    };
  },
  computed: {
  },
  watch: {},
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.onLoad();
    });
  },

  methods: {
    onLoad() {
      this.postIdParam = utils.getParameter(this, 'postIdParam');
      this.bbsId = utils.getParameter(this, 'bbsId');
      this.bbsName = utils.getParameter(this, 'bbsName');
      this.bbsTypeCode = utils.getParameter(this, 'bbsTypeCode');
      this.loadEmailInfo();
      setTimeout(() => {
        this.onPrintClick();
      }, 500);
    },
    loadEmailInfo() {
      let dataServiceId = '';
      if (this.bbsTypeCode === 'Q') {
        dataServiceId = 'DTS_CLB_00018';
      } else if (this.bbsTypeCode === 'N') {
        dataServiceId = 'DTS_CLB_00004';
      } else if (this.bbsTypeCode === 'F') {
        dataServiceId = 'DTS_CLB_00010';
      }

      http.request(this.contextPageId, dataServiceId, {
        path: {
          'post-id': this.postIdParam,
        },
      }).then(res => {
        if (res.data) {
          if (this.bbsTypeCode === 'Q') {
            this.frame0.boardTitle = res.data[0].qnaNoticeObjTextTitle;
            this.frame0.userName = res.data[0].userName;
            this.qnaNoticeObjTextContent = res.data[0].qnaNoticeObjTextContent;
            this.$refs.tuiEditor.setHtml(res.data[0].qnaNoticeObjTextContent);
            this.frame0.attachFileName = res.data[0].attachFileName;
          } else if (this.bbsTypeCode === 'N') {
            this.frame0.boardTitle = res.data[0].annNoticeObjTitle;
            this.frame0.userName = res.data[0].registrantName;
            this.qnaNoticeObjTextContent = res.data[0].annNoticeObjContent;
            this.$refs.tuiEditor.setHtml(res.data[0].annNoticeObjContent);
            this.frame0.attachFileName = res.data[0].attachFileName;
          } else if (this.bbsTypeCode === 'F') {
            this.frame0.boardTitle = res.data[0].noticobjTitle;
            this.frame0.userName = res.data[0].registrantName;
            this.qnaNoticeObjTextContent = res.data[0].noticObjContent;
            this.$refs.tuiEditor.setHtml(res.data[0].noticObjContent);
            this.frame0.attachFileName = res.data[0].attachFileName;
          }
        }
      });
    },
    onPrintClick() {
      window.print();
    },
  },
};
</script>

<style scoped>
.body_print {
    height: 100%;
    overflow:auto;
    width: 100%;
    padding: 30px;
    white-space: nowrap;
}
.underLine {border-bottom:2px solid #000000}
.col-xs-1 {background-color:#ffffff !important}
.col-xs-11 {white-space:normal !important}
.header-title_print {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    font-size: 20px;   
    font-weight: bold;
    line-height: 1.5;
    color: #000000;
    white-space: normal;
}
</style>
