<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_BBS_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ bbsName }}
            </div>
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TITLE')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ noticeTitle }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_NOTICOBJ_TYPE')"
              :vertical="false"
            />
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
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_VALID_PERIOD')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ effectiveDate }}
            </div>
          </div>
        </div>
      </div>
      <div class="mrB10" />
      <div
        ref="viewerArea"
        class="scr_box"
        style="height:330px"
      />
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          v-if="!showMetauserBtn"
          v-permission:delete="contextPageId"
          type="button"
          class="comm_btn_border"
          @click="deleteAnnouncement"
        >
          {{ $t('MSG_BTN_DEL') }}
        </sui-button>
        <sui-button
          v-if="!showMetauserBtn"
          v-permission:update="contextPageId"
          type="button"
          class="comm_btn_solid"
          @click="modifyAnnouncement"
        >
          {{ $t('MSG_BTN_MDFC') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CLB_00002', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    closePagePopup: {
      type: Function,
      default: () => {},
    },
    pageInitialData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isWebEdtrInitialized: false,
      bbsName: '',
      bbsId: '',
      isCategoryGroupExist: false,
      postIdParam: '',
      bbsTypeCode: '',
      attachDocumentId: '',
      noticeTitle: '',
      effectiveDate: '',
      viewerContents: 'my view post',
      bbsCatgGrpItemName: '',
      urgnCheck: false,
      annCheck: false,
      showMetauserBtn: true,
      registeredUserName: '',
      usrId: '',
      viewer: 'dattata',
      approveUseYn: '',
      attachRestrictSize: 0,
    };
  },
  computed: {},
  watch: {},
  datasets: [],
  beforeMount() {},
  mounted() {
    this.postIdParam = this.pageInitialData.postIdParam;
    this.bbsTypeCode = this.pageInitialData.bbsTypeCode;
    this.isCategoryGroupExist = this.pageInitialData.isCategoryGroupExist;
    this.approveUseYn = this.pageInitialData.approveUseYn;
    this.attachRestrictSize = this.pageInitialData.attachRestrictSize;
    this.tbabRestrictSize = this.pageInitialData.tbabRestrictSize;
    this.retrieveDetails().then(() => {
      this.isWebEdtrInitialized = true;
    }).catch(() => {
      this.isWebEdtrInitialized = true;
    });
  },

  methods: {
    getBBName() {
      this.bbsId = this.pageInitialData.bbsId;
      http.request(this.contextPageId, 'DTS_CLB_00044', {
        path: {
          'bulletin-board-id': this.bbsId,
        },
      }).then(res => {
        this.bbsName = res.data[0].bbsName;
      });
      this.retrieveDetails();
    },
    retrieveDetails() {
      this.bbsId = this.pageInitialData.bbsId;
      return new Promise((resolve, reject) => {
        const pathParam = {
          'post-id': this.pageInitialData.postIdParam,
        };
        http.request(this.contextPageId, 'DTS_CLB_00004', {
          path: pathParam,
        }).then(res => {
          this.bbsId = res.data[0].bbsId;
          this.bbsName = res.data[0].bbsNm;
          this.noticeTitle = res.data[0].annNoticeObjTitle;
          const start = utils.dateformatToClient(res.data[0].validStartDtm, 'S');
          const finish = utils.dateformatToClient(res.data[0].validFinishDtm, 'S');
          this.effectiveDate = `${start}~${finish}`;
          this.$refs.viewerArea.innerHTML = res.data[0].annNoticeObjContent;
          this.bbsCatgGrpItemName = res.data[0].bbsCategoryItemNm;
          this.registeredUserName = res.data[0].registrantName;
          this.annCheck = res.data[0].annYN === 'Y';
          this.usrId = res.data[0].usrId;
          this.urgnCheck = res.data[0].urgnYN === 'Y';
          this.attachDocumentId = res.data[0].atthDocId;
          resolve(res);
          if (this.pageInitialData.postStatus) {
            this.postStatus();
          } else {
            this.getSession();
          }
          this.updateLogs(this.pageInitialData.postIdParam, 'R');
        }).catch(err => {
          reject(err);
        });
      });
    },
    onCancel() {
      this.closePagePopup(true);
    },
    onClose() {
      this.closePagePopup(false);
    },
    modifyAnnouncement() {
      utils.openLayerPopup('PGE_CLB_00012', this.onPagePopupCallback, {
        size: 'xlg',
        pageInitialData: {
          postIdParam: this.pageInitialData.postIdParam,
          bbsName: this.bbsName,
          bbsId: this.bbsId,
          isCategoryGroupExist: this.isCategoryGroupExist,
          approveUseYn: this.approveUseYn,
          attachRestrictSize: this.attachRestrictSize,
          tbabRestrictSize: this.tbabRestrictSize,
        },
      });
      this.onCancel();
    },
    deleteAnnouncement() {
      utils.messageBox('confirm', this.$t('MSG_ALT_DEL'), null, this.submitDeleteApi);
    },
    submitDeleteApi() {
      const pathParam = {
        'post-id': this.pageInitialData.postIdParam,
      };
      http.request(this.contextPageId, 'DTS_CLB_00052', {
        path: pathParam,
        query: {
          bbsId: this.bbsId,
        },
      }).then(res => {
        if (res.data.resultCode) {
          utils.messageBox('information', this.$t('MSG_ALT_PRGS_OK'), null);
          this.onCancel();
        }
      });
      this.updateLogs(this.pageInitialData.postIdParam, 'D');
    },
    postStatus() {
      this.showMetauserBtn = false;
      if (this.pageInitialData.postStatus.toUpperCase() === 'R') {
        this.showMetauserBtn = false;
      }
    },
    getSession() {
      this.sessionInfo = this.$store.getters.userInfo;
      const roleListArray = this.sessionInfo.roleList;
      const ifRoleExist = roleListArray.some(el => el.roleNickName === 'BBS_ADMIN');
      if (ifRoleExist) {
        this.showMetauserBtn = false;
      }
      if (this.$store.getters.userInfo.userId === this.usrId) {
        this.showMetauserBtn = false;
      }
    },
    onPagePopupCallback(value) {
      if (value) {
        this.onCancel();
      }
    },
    updateLogs(postId, type) {
      const pathParam = {
        'post-id': postId,
      };
      http.request(this.contextPageId, 'DTS_CLB_00061', {
        path: pathParam,
        data: {
          bbsLogDeptId: this.$store.getters.userInfo.departmentId,
          firstRegistrationProgramId: this.pageInitialData.pageId,
          firstRegistrationUserId: this.usrId,
          bbsLogTypeCd: type,
          bbsId: this.bbsId,
        },
      }).then(() => {});
    },
    onPrintClick() {
      this.openPrintWindow('PGE_CLB_00031', 'bbsId', this.bbsId);
    },
    openPrintWindow(pageId, key, value) {
      const queryString = `?${key}=${value}&postIdParam=${this.postIdParam}&bbsName=${this.bbsName}&bbsTypeCode=${this.bbsTypeCode}`;

      utils.openWindowPopup(pageId, queryString, null, {
        top: 100, left: 300, height: 700, width: 915,
      });
    },
    onScrapClick() {
      const dataParams = {
        postUID: this.postIdParam,
        bbsId: this.bbsId,
        bbsTypeCode: this.bbsTypeCode,
        usrId: this.$store.getters.userInfo.userId,
      };

      utils.messageBox('confirm', this.$t('MSG_ALT_SCRAP'), null, () => {
        http.request(this.contextPageId, 'DTS_CLB_00065', {
          data: dataParams,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_SCRAP'));
        });
      });
    },
  },
};
</script>
<style scoped>
</style>
