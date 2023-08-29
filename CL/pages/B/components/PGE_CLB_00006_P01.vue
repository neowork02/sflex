<template>
  <div>
    <div class="comm_popup_wrap_xlarge">
      <div class="mrB10" />
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_BBS_NM')" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ bbsName }}
            </div>
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_NOTICOBJ_TTL')" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ noticeTitle }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_CATG_GRP_ITEM')" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ bbsCatgGrpItemName }}
            </div>
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_VALID_PERIOD')" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ effectiveDate }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_NOTICOBJ_TYPE')" />
          </div>
          <div class="col-xs-5">
            <sui-checkbox
              v-model="urgnCheck"
              :disabled="true"
            >
              {{ $t('MSG_TXT_UGRN') }}
            </sui-checkbox>
            <div class="comp_spacing" />
            <sui-checkbox
              v-model="annCheck"
              :disabled="true"
            >
              {{ $t('MSG_TXT_ANNM') }}
            </sui-checkbox>
          </div>
          <div class="col-xs-1" />
          <div class="col-xs-5" />
        </div>
      </div>
      <div class="mrB10" />
      <div
        ref="viewerArea"
        class="scr_box"
      />
      <div class="mrB10" />
      <cmp-file-attacher
        ref="fileAttacher"
        :pageId="'PGE_CLB_00006'"
        :showAddDeleteBtn="false"
        :showUpDownArrowBtn="false"
        :showDDRegion="false"
        :attachGroupId="'ATG_CLB_BBS_COMMON'"
        :attachDocumentId="attachDocumentId"
      />
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button
        v-permission:update="contextPageId"
        type="button"
        class="comm_btn_border"
        :disabled="!isApprove"
        @click="rejectAnnouncement"
      >
        {{ $t('MSG_BTN_RJT') }}
      </sui-button>
      <sui-button
        v-permission:update="contextPageId"
        type="button"
        class="comm_btn_solid"
        :disabled="!isApprove"
        @click="confirmApproveAnnouncement"
      >
        {{ $t('MSG_BTN_APPR') }}
      </sui-button>
    </div>
    <sui-popup
      v-model="showPopup"
      :title="$t('MSG_TIT_RJT_SCG_POPUP')"
    >
      <p02
        :rejectInformationParam="rejectInformationParam"
        :parentPageId="'PGE_CLB_00006'"
        @exit="onPopupCancelClicked"
      />
    </sui-popup>
  </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';
import p02 from './PGE_CLB_00006_P02';

export default {
  name: 'PGE_CLB_00006_P01', // eslint-disable-line vue/name-property-casing
  components: {
    p02,
  },
  extends: BasePage,
  props: {
    biddingInformationParam: {
      type: Object,
      default() {
        return {};
      },
    },
    closePagePopup: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      isWebEdtrInitialized: false,
      attachDocumentId: '',
      rejectInformationParam: {},
      showPopup: false,
      viewerContents: 'my view  post',
      noticeTitle: '',
      effectiveDate: '',
      bbsCatgGrpItemName: '',
      bbsName: '',
      urgnCheck: false,
      annCheck: false,
      showMetauserBtn: false,
      registeredUserName: '',
      isAdmin: false,
      isBbsApprover: false,
      isApprove: false,
      registerUsrId: '',
      currentUsrId: '',
      tempObj: [],
    };
  },
  computed: {},
  watch: {},
  datasets: [],
  mounted() {
    this.$nextTick(() => {
      this.setPostingContent();
      if (this.biddingInformationParam.status === 'R') {
        this.getApproversByBbsId();
      }
    });
  },

  methods: {
    setEnableFlag() {
      this.sessionInfo = this.$store.getters.userInfo;
      const roleListArray = this.sessionInfo.roleList;
      this.isApprove = roleListArray.some(el => el.roleNickName === 'BBS_ADMIN');
      if (this.isApprove) return;
      this.currentUsrId = this.$store.getters.userInfo.userId;
      utils.forEach(this.tempObj, (value, idx) => {
        if (this.tempObj[idx].userId === this.currentUsrId) {
          this.isApprove = true;
        }
      });
    },
    setPostingContent() {
      if (this.biddingInformationParam) {
        this.rejectInformationParam = {
          postId: this.biddingInformationParam.postId,
        };
        this.noticeTitle = this.biddingInformationParam.title;
        this.bbsIdValue = this.biddingInformationParam.bullBoardId;
        this.effectiveDate =
          utils.dateformatToClient(this.biddingInformationParam.validStartDtm,'S')
          + "~"
          + utils.dateformatToClient(this.biddingInformationParam.validFinDtm,'S');
        this.$refs.viewerArea.innerHTML = this.biddingInformationParam.noticeObjectTextContent;
        this.isWebEdtrInitialized = true;
        this.bbsCatgGrpItemName = this.biddingInformationParam.boardCategoryItemName;
        this.registeredUserName = this.biddingInformationParam.registUsr;
        this.annCheck = this.biddingInformationParam.announcementYn === 'Y' ? true : false;
        this.urgnCheck = this.biddingInformationParam.urgentYn === 'Y' ? true : false;
        if (this.biddingInformationParam.attchDocId) {
          this.attachDocumentId = this.biddingInformationParam.attchDocId;
        }
        this.bbsName = this.biddingInformationParam.bullBoardName;
      }
    },
    getApproversByBbsId() {
      http.request(this.contextPageId, 'DTS_CLB_00054', {
        path: {
          'bulletin-board-id': this.bbsIdValue,
        },
      }).then(res => {
        this.tempObj = res.data.users;
        this.setEnableFlag();
      });
    },
    editorInitCallback() {
      this.$refs.myEditor.setHtml(this.viewerContents);
    },
    updateLogs(postId, type) {
      const pathParam = {
        'post-id': postId,
      };
      http.request(this.contextPageId, 'DTS_CLB_00061', {
        path: pathParam,
        data: {
          firstRegistrationProgramId: 'PGE_CLB_00006',
          bbsLogTypeCd: type,
          bbsId: this.bbsId,
        },
      }).then(() => {
      });
    },
    confirmApproveAnnouncement() {
      utils.messageBox('confirm', this.$t('MSG_ALT_APPR'), null, this.approveAnnouncement);
    },
    approveAnnouncement() {
      http.request(this.contextPageId, 'DTS_CLB_00032', {
        path: {
          'post-id': this.biddingInformationParam.postId,
        },
        query: {
          'appr-user-id': this.$store.getters.userInfo.epid,
        },
      }).then(res => {
        if (res.data.resultCode === 1) {
          utils.messageBox('information', this.$t('MSG_ALT_PRGS_OK'), null);
          this.onCancel();
        } else {
          this.onCancel();
        }
      });
    },
    rejectAnnouncement() {
      this.showPopup = true;
    },
    onPopupCancelClicked(type) {
      this.showPopup = false;
      if (type) {
        this.onCancel(true);
      }
    },
    onCancel(value) {
      this.$emit('exit', value);
    },
  },
};
</script>
<style scoped>
</style>
