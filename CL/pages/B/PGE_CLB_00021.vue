<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TITLE')"
              :vertical="false"
              required
            />
          </div>
          <div class="col-xs-7">
            <sui-text-field
              v-model="frame0.boardTitle"
              placeholder
              :disabled="false"
              max-length="100"
              :readonly="false"
            />
          </div>
          <div
            v-if="isCategoryGroupExist"
            class="col-xs-1"
          >
            <sui-input-label
              :label="$t('MSG_TXT_CATG')"
              :vertical="false"
            />
          </div>
          <div
            v-if="isCategoryGroupExist"
            class="col-xs-3"
          >
            <sui-select-box
              v-model="frame0.selectData"
              :option-list="categoryOptions"
              placeholder="select"
            />
          </div>
        </div>
      </div>
      <div class="mrB10" />
      <sui-web-editor
        ref="tuiEditor"
        v-model="frame0.editorContent"
      />
      <div class="mrB10" />
      <cmp-file-attacher
        ref="fileAttacher"
        :pageId="this.$options.name"
        :attachDocumentId="attachDocumentId"
        :attachGroupId="'ATG_CLB_BBS_COMMON'"
        :customAttachRestrictionSize="attachRestrictSize"
      />
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onCancel()"
        >
          {{ $t('MSG_BTN_CANCEL') }}
        </sui-button>
        <sui-button
          v-permission:create="contextPageId"
          type="button"
          class="comm_btn_border"
          @click="validateSaveData('tempRegister')"
        >
          {{ $t('MSG_BTN_TMP_SAVE') }}
        </sui-button>
        <sui-button
          v-permission:create="contextPageId"
          type="button"
          class="comm_btn_solid"
          @click="validateSaveData('register')"
        >
          {{ $t('MSG_BTN_RGST') }}
        </sui-button>
      </div>
    </sui-page-contents>
    <sui-page-footer />
  </sui-page>
</template>

<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CLB_00021', // eslint-disable-line vue/name-property-casing
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
  watch: {
    frame0(val) {
      this.frame0 = val;
    },
  },
  datasets: [],
  beforeMount() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
</style>
