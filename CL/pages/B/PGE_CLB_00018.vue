<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_BBS_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-11">
            <div class="comm_label">
              {{ bbsName }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TITLE')"
              :vertical="false"
              required
            />
          </div>
          <div class="col-xs-11">
            <sui-text-field
              v-model="frame0.boardTitle"
              placeholder=""
              :disabled="false"
              max-length="100"
              :readonly="false"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_CATG_GRP_ITEM')"
              :vertical="false"
              required
            />
          </div>
          <div class="col-xs-11">
            <sui-select-box
              v-model="selectedCategory"
              :option-list="categoryOptions"
              placeholder="select"
              required
            />
          </div>
        </div>
      </div>
      <div class="mrB10" />
      <sui-web-editor
        ref="myEditor"
        :maxCharCount="tbabRestrictSize"
        :isViewer="false"
        class="width100"
        :height="300"
        @loaded="retrieveDetails"
      />
      <div class="mrB10" />
      <cmp-file-attacher
        v-if="attachDocumentUse"
        ref="fileAttacher"
        :pageId="this.$options.name"
        :attachDocumentId="attachDocumentId"
        :attachGroupId="'ATG_CLB_BBS_COMMON'"
        :customAttachRestrictionSize="attachRestrictSize"
      />
      <div class="comm_btn_wrap">
        <!-- <sui-button
          type="button"
          class="comm_btn_border"
          @click="onCancel"
        >
          {{ $t('MSG_BTN_CANCEL') }}
        </sui-button> -->
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="validateAnouncementData"
        >
          {{ $t('MSG_BTN_SAVE') }}
        </sui-button>
      </div>
    </sui-page-contents>
    <sui-page-footer />
  </sui-page>
</template>
<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CLB_00018', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    closePagePopup: {
      type: Function,
    },
    pageInitialData: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  datasets: [],
  beforeMount() {},
  mounted() {},

  methods: {
    getBBName() {},
    categoryItems() {},
    retrieveDetails() {},
    onPopupCancelClicked() {
      this.showRegPopup = false;
    },
    getFileListInfo() {
      if (this.attachDocumentUse) {
        this.fileList = this.$refs.fileAttacher.getAttachGroupItemListInfo();
        if (this.fileList && this.fileList[0].attachFileList.length < 1) {
          this.attachDocumentId = '';
        } else {
          this.attachDocumentId = this.pageInitialData.retrieveData[0].noticobjUid;
        }
      }
      this.register();
    },
    validateAnouncementData() {},
    updateLogs(postId, type) {},
    // Get the file info (List of Files)
    register() {},
    onCancel() {
      this.closePagePopup(false);
    },
    checkContentSize() {
      return this.tbabRestrictSize >= this.$refs.myEditor.getContentSize();
    },
  },
};
</script>
<style scoped>
</style>