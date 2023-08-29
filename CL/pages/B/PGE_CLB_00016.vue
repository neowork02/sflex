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
            />
          </div>
          <div class="col-xs-11">
            <div class="comm_label">
              {{ noticeTitle }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_CATG_GRP_ITEM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-11">
            <div class="comm_label">
              {{ bbsCategoryItemNm }}
            </div>
          </div>
        </div>
      </div>
      <div class="mrB10" />
      <sui-web-editor
        ref="myEditor"
        :isViewer="true"
        :height="300"
        class="width100"
        @loaded="retrieveDetails"
      />
      <div class="mrB10" />
      <cmp-file-attacher
        v-if="attachDocumentUse"
        ref="fileAttacher"
        :pageId="this.$options.name"
        :showAddDeleteBtn="false"
        :showUpDownArrowBtn="false"
        :showDDRegion="false"
        :attachGroupId="'ATG_CLB_BBS_COMMON'"
        :attachDocumentId="attachDocumentId"
        :customAttachRestrictionSize="attachRestrictSize"
      />
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          v-if="isSameAuthorOrBBSADMIN(postUserId)"
          v-permission:delete="contextPageId"
          type="button"
          class="comm_btn_border"
          @click="deletion"
        >
          {{ $t('MSG_BTN_DEL') }}
        </sui-button>
        <sui-button
          v-if="isSameAuthorOrBBSADMIN(postUserId)"
          v-permission:update="contextPageId"
          type="button"
          class="comm_btn_solid"
          @click="modification"
        >
          {{ $t('MSG_BTN_MDFC') }}
        </sui-button>
        <!-- <sui-button
          v-permission:create="contextPageId"
          type="button"
          class="comm_btn_solid"
          @click="onScrapClick"
        >
          {{ $t("MSG_BTN_SCRAP") }}
        </sui-button>
        <sui-button
          v-permission:print="contextPageId"
          type="button"
          class="comm_btn_solid"
          @click="onPrintClick"
        >
          {{ $t("MSG_BTN_PRTG") }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onCancel"
        >
          {{ $t('MSG_BTN_CLOSE') }}
        </sui-button> -->
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CLB_00016', // eslint-disable-line vue/name-property-casing
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
};
</script>
<style scoped>
</style>