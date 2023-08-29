<template>
  <div>
    <div class="mrB20" />
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_BBS_NM')"
            :vertical="false"
            required
          />
        </div>
        <div class="col-xs-5">
          <cmp-mlng-editor
            ref="mlngEditor"
            :pageId="contextPageId"
            :vertical="false"
            :editable="true"
            :multiLanguageId="bbsData.bbsPageTitleMsgResoId"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_BBS_ID')"
            :vertical="false"
            required
          />
        </div>
        <div class="col-xs-5">
          <div class="comm_label">
            BBS_
          </div>
          <div class="comp_spacing" />
          <sui-text-field
            ref="textFieldBbsIdPostfix"
            v-model="bbsIdPostfix"
            maxlength="96"
            :disabled="!isNew"
            :readonly="false"
            @keyup="onKeyUpInput(bbsIdPostfix)"
          />
          <div class="comp_spacing" />
          <sui-button
            type="button"
            class="comm_btn_duplicate"
            :disabled="!isNew"
            @click="onClickCheckDuplication"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_BBS_TYP')"
            :vertical="false"
            required
          />
        </div>
        <div class="col-xs-5">
          <sui-code-select
            ref="codeSelectBbsType"
            v-model="bbsData.bbsTypeCodeVldVal"
            :disabled="!isNew"
            codeId="COD_BBS_TYPE"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_CATG_GRP_NM')"
            :vertical="false"
            :required="isFaq"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            v-model="bbsData.bbsCatgGrpName"
            :disabled="true"
            :readonly="false"
          />
          <sui-button
            type="button"
            class="comm_btn_InputScr"
            :disabled="!isNew"
            @click="openPopup"
          />
          <div class="comp_spacing" />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_BSIC_VLD_PRD')"
            :vertical="false"
          />
        </div>
        <div
          v-show="!isNotice"
          class="col-xs-5"
        />
        <div
          v-show="isNotice"
          class="col-xs-5"
        >
          <sui-code-select
            ref="codeSelectBasicDisplayPeriod"
            v-model="bbsData.bbBsicVldPrdCode"
            :initialSelectedIndex="0"
            :pageId="contextPageId"
            codeId="COD_NOTICOBJ_BSIC_VLD_PRD"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_APPR_RJT_USR_ID')"
            :vertical="false"
          />
        </div>
        <div
          v-show="!isNotice"
          class="col-xs-5"
        />
        <div
          v-show="isNotice"
          class="col-xs-5"
        >
          <sui-radio
            v-model="bbsData.approveUseYn"
            value="Y"
            :disabled="!isNotice"
          >
            Yes
          </sui-radio>
          <sui-radio
            v-model="bbsData.approveUseYn"
            value="N"
            :disabled="!isNotice"
          >
            No
          </sui-radio>
          <cmp-user-grid-select
            ref="userSelect"
            :readonly="true"
            :selectedUserMulti="selectedUserMulti"
            :buttonDisabled="bbsData.approveUseYn==='N'"
            @selected="onSelectedUserMulti"
          />
          <div class="comp_spacing" />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_NEW_TAG_DISP_PRD')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-code-select
            ref="codeSelectNewTagDisplayPeriod"
            v-model="bbsData.newMarkPrdCode"
            :initialSelectedIndex="0"
            codeId="COD_NEW_MARK_PRD"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_REPL_USE_YN')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-radio
            v-model="bbsData.answerUseYn"
            value="Y"
            :disabled="!isQna"
          >
            Yes
          </sui-radio>
          <sui-radio
            v-model="bbsData.answerUseYn"
            value="N"
            :disabled="!isQna"
          >
            No
          </sui-radio>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_CONTENT_LIMIT_SIZE')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            v-model="bbsData.tbabRestrictSize"
            maxlength="100"
            :number="true"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_ATTH_LIMIT_SIZE')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            v-model="bbsData.attachRestrictSize"
            maxlength="100"
            :number="true"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_TOT_MDFC_PRMSN_YN')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-radio
            v-model="bbsData.totalModificationPermissionYn"
            value="Y"
            :disabled="!isQna"
          >
            Yes
          </sui-radio>
          <sui-radio
            v-model="bbsData.totalModificationPermissionYn"
            value="N"
            :disabled="!isQna"
          >
            No
          </sui-radio>
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_PAGE_ID')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            v-model="bbsData.bbsPageId"
            :readonly="true"
          />
        </div>
      </div>
      <div
        v-show="isQna"
        class="row"
      >
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_SEND_TMPLT_ID')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            v-model="bbsData.sendTemplateName"
            :disabled="true"
            :readonly="false"
          />
          <sui-button
            type="button"
            class="comm_btn_InputScr"
            @click="openTemplatePopup"
          />
        </div>
        <div class="col-xs-1 nodata" />
        <div class="col-xs-5 nodata" />
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_DESC')"
            :vertical="false"
          />
        </div>
        <div class="col-xs-11">
          <textarea
            v-model="bbsData.bbsCntn"
            maxlength="1000"
          />
        </div>
      </div>
      <div class="comm_btn_wrap">
        <sui-button
          v-permission:create="contextPageId"
          type="button"
          class="comm_btn_border"
          @click="onClickMenuRegist()"
        >
          {{ $t('MSG_BTN_MENU_RGST') }}
        </sui-button>
        <sui-button
          v-permission:create="contextPageId"
          type="button"
          class="comm_btn_border"
          @click="onClickNew()"
        >
          {{ $t('MSG_BTN_NEW') }}
        </sui-button>
        <sui-button
          v-permission:delete="contextPageId"
          type="button"
          class="comm_btn_border"
          @click="isLivePostsExist()"
        >
          {{ $t('MSG_BTN_DEL') }}
        </sui-button>
        <sui-button
          v-permission:update="contextPageId"
          type="button"
          class="comm_btn_solid"
          @click="onClickSave()"
        >
          {{ $t('MSG_BTN_SAVE') }}
        </sui-button>
      </div>
    </div>
  </div>
</template>

<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CLB_00008_T01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: '',
    },
    selectedGridRowData: {
      type: Object,
      required: false,
      default: null,
    },
    selectedPopupParam: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      bbsData: {
        answerUseYn: 'N',
        approveUseYn: 'N',
        totalModificationPermissionYn: 'N',
        sendTemplateId: '',
        sendTemplateName: '',
      },
      selectedUserMulti: {
        userName: '',
        userId: '',
      },
      isNew: true,
      isApproverExist: false,
      isCheckDuplication: false,
      bbsIdPostfix: '',
    };
  },
  computed: {
    isFaq() {
      return utils.isEqual(this.bbsData.bbsTypeCodeVldVal, 'F');
    },
    isQna() {
      return utils.isEqual(this.bbsData.bbsTypeCodeVldVal, 'Q');
    },
    isNotice() {
      return utils.isEqual(this.bbsData.bbsTypeCodeVldVal, 'N');
    },
  },
  watch: {
    selectedGridRowData(data) {
      if (!utils.isEmpty(data)) {
        this.loadData();
        this.isNew = false;
      } else {
        this.onClickNew();
        this.isNew = true; // 신규버튼 클릭 시 clearGridSelection 이벤트 발동 -> selectedGridRowData 바뀌기 때문에 추가
      }
    },
    selectedPopupParam() {
      this.setCategoryGroupDataByPopupParam();
    },
    isFaq(value) {
      if (value) {
        this.bbsData.answerUseYn = 'N';
        this.bbsData.approveUseYn = 'N';
        this.bbsData.totalModificationPermissionYn = 'N';
      }
    },
    isQna(value) {
      if (value) {
        this.bbsData.approveUseYn = 'N';
      }
    },
    isNotice(value) {
      if (value) {
        this.bbsData.answerUseYn = 'N';
        this.bbsData.totalModificationPermissionYn = 'N';
      }
    },
    bbsIdPostfix(data) {
      if (this.bbsData.bbsboardIdPostfix !== data) {
        this.isCheckDuplication = false;
      }
    },
  },
  created() {
    this.userInfoData = [];
    this.userInfoID = [];
  },
  mounted() {},

  methods: {
    loadData() {
      if (this.selectedGridRowData) {
        this.bbsData = utils.cloneDeep(this.selectedGridRowData);
        this.bbsIdPostfix = this.bbsData.bbsboardIdPostfix;
        this.getApproval(this.selectedGridRowData.bbsboardId);
      }
    },
    onClickNew() {
      if(!this.isNew){
        this.isNew = true;
        this.isApproverExist = false;
        this.isCheckDuplication = false;
        this.bbsIdPostfix = '';
        this.bbsData.bbsName = '';
        this.bbsData.bbsboardIdPostfix = '';
        this.$refs.codeSelectBbsType.reset();
        this.bbsData.bbsCatgGrpId = '';
        this.bbsData.bbsCatgGrpName = '';
        this.$refs.codeSelectBasicDisplayPeriod.reset();
        this.bbsData.approveUseYn = 'N';
        this.$refs.userSelect.setValue([]);
        this.$refs.codeSelectNewTagDisplayPeriod.reset();
        this.bbsData.answerUseYn = 'N';
        this.bbsData.tbabRestrictSize = '';
        this.bbsData.attachRestrictSize = '';
        this.bbsData.totalModificationPermissionYn = 'N';
        this.bbsData.bbsCntn = '';
        this.bbsData.bbsPageId = '';
        this.bbsData.bbsPageTitleMsgResoId = '';
        this.$refs.mlngEditor.reset();
        this.$emit('clearGridSelection');
        this.bbsData.sendTemplateId = '';
        this.bbsData.sendTemplateName = '';

      }
    },
    onClickCheckDuplication() {
      if (!this.bbsIdPostfix) {
        utils.messageBox('error', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_BBS_ID')));
      } else {
        const queryParams = {
          'bulletin-board-id': `BBS_${this.bbsIdPostfix}`,
        };
        http.request(this.contextPageId, 'DTS_CLB_00042', {
          query: queryParams,
        }).then(res => {
          if (res.data.resultCode === '1') {
            utils.messageBox('error', utils.strFormat(this.$t('MSG_ALT_DUPLICATE_EXISTS')));
          } else {
            utils.messageBox('success', utils.strFormat(this.$t('MSG_ALT_BE_RGST_OK'), this.$t('MSG_TXT_BBS_ID')));
            this.isCheckDuplication = true;
          }
        });
      }
    },
    getApproval(bbsId) {
      const pathParams = { 'bulletin-board-id': bbsId };
      http.request(this.contextPageId, 'DTS_CLB_00054', {
        path: pathParams,
      }).then(res => {
        if (res.data.users.length > 0) {
          this.isApproverExist = true;
        }
        this.onSelectedUserMulti(res.data.users);
        this.$refs.userSelect.setValue(res.data.users);
      });
    },
    saveApprovalUserData() {
      return new Promise((resolve, reject) => {
        if (!this.isApproverExist) {
          this.approvalUserNew();
          resolve();
        } else {
          this.approvalUserModify();
          reject();
        }
      });
    },
    approvalUserNew() {
      const bbsID = `BBS_${this.bbsIdPostfix}`;
      http.request(this.contextPageId, 'DTS_CLB_00055', {
        data: {
          bbsboardId: bbsID,
          users: this.userInfoID,
        },
      }).then(() => {});
    },
    approvalUserModify() {
      const bbsID = `BBS_${this.bbsData.bbsboardIdPostfix}`;
      const pathParams = { 'bulletin-board-id': bbsID };
      http.request(this.contextPageId, 'DTS_CLB_00056', {
        path: pathParams,
        data: {
          bbsboardId: bbsID,
          users: this.userInfoID,
        },
      }).then(() => {});
    },
    validateData() {
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.localTxtFld.value))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_LOCAL_LNG')),
          null, () => {
            this.$refs.mlngEditor.setFocusLocalTxtFld();
          });
        return false;
      }
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.globalTxtFld.value))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_GLOBAL_LNG')),
          null, () => {
            this.$refs.mlngEditor.setFocusGlobalTxtFld();
          });
        return false;
      }
      if (!this.bbsIdPostfix) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_BBS_ID')),
          null, () => {
            this.$refs.textFieldBbsIdPostfix.setFocus();
          });
        return false;
      }
      if (this.isFaq && !this.bbsData.bbsCatgGrpName) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_CATG_GRP')));
        return false;
      }
      if (this.isNew && !this.isCheckDuplication) {
        utils.messageBox('error', this.$t('MSG_ALT_CHK_DUP'), null);
        return false;
      }
      return true;
    },
    onClickSave() {
      if (!this.validateData()) return false;
      utils.messageBox('confirm', this.$t('MSG_ALT_IS_SAV_DATA'), null, this.callSaveApi);
    },
    callSaveApi() {
      const dataServiceId = this.isNew ? 'DTS_CLB_00043' : 'DTS_CLB_00045';
      const queryParams = {
        bbsboardId: `BBS_${this.bbsIdPostfix}`,
        bbsName: this.bbsData.bbsName,
        bbsTypeCode: this.bbsData.bbsTypeCodeVldVal,
        newMarkPrdCode: this.bbsData.newMarkPrdCode,
        bbBsicVldPrdCode: this.bbsData.bbBsicVldPrdCode,
        bbsCatgGrpId: this.bbsData.bbsCatgGrpId,
        approveUseYn: this.bbsData.approveUseYn,
        answerUseYn: this.bbsData.answerUseYn,
        totalModificationPermissionYn: this.bbsData.totalModificationPermissionYn,
        tbabRestrictSize: this.bbsData.tbabRestrictSize,
        attachRestrictSize: this.bbsData.attachRestrictSize,
        bbsCntn: this.bbsData.bbsCntn,
        bbsPageId: this.bbsData.bbsPageId,
        bbsPageTitleMsgResoId: `MSG_TIT_BBS_${this.bbsIdPostfix}`,
        multiLanguageList: this.$refs.mlngEditor.getMlngEditingInfoFillEmptyWithGlobal(),
        sendTemplateId: this.bbsData.sendTemplateId,
      };
      http.request(this.contextPageId, dataServiceId, {
        data: queryParams,
        path: {
          'bulletin-board-id': `BBS_${this.bbsData.bbsboardIdPostfix}`,
        },
      }).then(res => {
        if (res.data.resultCode === '1') {
          this.saveApprovalUserData();
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
            if(!this.selectedGridRowData){
              this.research();
            }else{
              this.$emit('updateInfo', `BBS_${this.bbsIdPostfix}`);
            }
          });           
        }
      });
    },
    onClickDelete() {
      this.isLivePostsExist();
    },
    isLivePostsExist() {
      const pathParams = { 'bulletin-board-id': `BBS_${this.bbsData.bbsboardIdPostfix}` };
      const queryParams = { bbsTypeCodeVldVal: this.bbsData.bbsTypeCodeVldVal };
      http.request(this.contextPageId, 'DTS_CLB_00060', {
        path: pathParams,
        query: queryParams,
      }).then(res => {
        if (res.data.resultCode === '1') {
          utils.messageBox('error', this.$t('MSG_ALT_REL_POSTING'), null);
        } else {
          utils.messageBox('confirm', this.$t('MSG_ALT_IS_DEL_DATA'), null, this.callDeleteApi);
        }
      });
    },
    callDeleteApi() {
      const pathParams = { 'bulletin-board-id': `BBS_${this.bbsData.bbsboardIdPostfix}` };
      http.request(this.contextPageId, 'DTS_CLB_00046', {
        path: pathParams,
      }).then(res => {
        if (res.data.resultCode === '1') {
          utils.messageBox('success', this.$t('MSG_TXT_REG_OK'));
          this.research();
        }
      });
    },
    onSelectedUserMulti(user) {
      this.userInfoID = [];
      utils.forEach(user, (value, key) => {
        this.userInfoID.push({
          userId: user[key].userId,
        });
      });
    },
    onKeyUpInput(value) {
      if (utils.isExistSpecialChar(value)) {
        utils.messageBox('warning', this.$t('MSG_ALT_CHK_SPECL_CHAR'), null, () => {
          this.bbsIdPostfix = this.bbsIdPostfix.replace(
            /[^A-Za-z0-9_.]/g, '',
          );
        });
      }
    },
    research() {
      this.onClickNew();
      this.$emit('research');
    },
    openPopup() {
      this.$emit('openPopup');
    },
    setCategoryGroupDataByPopupParam() {
      this.bbsData.bbsCatgGrpId = this.selectedPopupParam.categoryId;
      this.bbsData.bbsCatgGrpName = this.selectedPopupParam.categoryName;
    },
    onClickMenuRegist() {
      if (utils.isEmpty(this.selectedGridRowData)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_BBS')));
        return false;
      }
      this.$emit('openMenuPopup', this.selectedGridRowData.bbsPageId);
      return true;
    },
    openTemplatePopup() {
      utils.openLayerPopup('PGE_CMZ_00042', this.onPagePopupCloseSendTemplate, {
        size: 'lg',
      });
    },
    onPagePopupCloseSendTemplate(objSendTemplate) {
      if (objSendTemplate) {
        this.bbsData.sendTemplateId = objSendTemplate.sendTemplateId;
        this.bbsData.sendTemplateName = objSendTemplate.sendTemplateName;
      }
    },
  },
};
</script>
<style scoped>
</style>
