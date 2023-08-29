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
              :label="$t('MSG_TXT_CATG')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ bbsCatgGrpItemName }}
            </div>
          </div>
        </div>
        <div class="row">
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
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_RGST_USR')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <cmp-user-name-link
              :pageId="contextPageId"
              :displayType="'1'"
              :displayLanguageId="isDisplayLanguageId"
              :knoxId="isKnoxId"
              :userId="isUserId"
              :loginId="isLoginId"
              :userName="isUserName"
              :userGlobalName="isUserGlobalName"
              :departmentName="isDepartmentName"
              :departmentEnglishName="isDepartmentEnglishName"
              :type="'link'"
            />
          </div>
        </div>
      </div>
      <div class="mrB10" />
      <div
        v-if="bbsTypeCode === 'N'"
        ref="viewerArea"
        class="scr_box"
        style="height:250px"
      />
      <sui-web-editor
        v-if="bbsTypeCode !== 'N'"
        ref="myEditor"
        :isViewer="true"
        @loaded="retrieveDetails"
      />
      <div class="mrB10" />
      <cmp-file-attacher
        ref="fileAttacher"
        :pageId="contextPageId"
        :showAddDeleteBtn="false"
        :showUpDownArrowBtn="false"
        :showDDRegion="false"
        :attachGroupId="'ATG_CLB_BBS_COMMON'"
        :attachDocumentId="attachDocumentId"
      />
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onClose"
        >
          {{ $t('MSG_BTN_CLOSE') }}
        </sui-button>
        <sui-button
          v-permission:delete="contextPageId"
          type="button"
          class="comm_btn_solid"
          @click="onDeleteClick"
        >
          {{ $t('MSG_BTN_DEL') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CLB_00033', // eslint-disable-line vue/name-property-casing
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
    return {};
  },
  computed: {},
  watch: {},
  datasets: [],
  beforeMount() {},
  mounted() {},

  methods: {},
};
</script>
<style scoped>
</style>
