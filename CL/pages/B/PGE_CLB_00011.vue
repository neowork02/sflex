<template>
  <sui-page>
    <sui-page-header :title="$t('MSG_TIT_ANNM_RGST_MAIN')" />
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
              max-length="4000"
              :readonly="false"
            />
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
            <sui-checkbox v-model="frame0.emergency">
              {{ $t('MSG_TXT_UGRN') }}
            </sui-checkbox>
            <div class="comp_spacing" />
            <sui-checkbox v-model="frame0.notice">
              {{ $t('MSG_TXT_ANNM') }}
            </sui-checkbox>
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_VALID_PERIOD')"
              :vertical="false"
              required
            />
          </div>
          <div
            class="col-xs-5"
            :required="true"
          >
            <ur-range-picker
              ref="rangeDate"
              v-model="frame0.periodDTR"
              oneInputMode
              init="today"
              :inputType=this.userDateFormat
              :modelType=this.userDateFormat              
            />
          </div>
        </div>
      </div>
      <div class="mrB10" />
      <sui-web-editor
        v-if="isWebEdtrInitialized"
        ref="tuiEditor"
        :maxCharCount="tbabRestrictSize"
        class="width100"
        height="220px"
      />
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          v-permission:create="this.$options.name"
          type="button"
          class="comm_btn_solid"
          :disabled="isBoardFound"
          @click="validateAnouncementData('register')"
        >
          {{ $t('MSG_BTN_SAVE') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
export default {
  name: 'PGE_CLB_00011', // eslint-disable-line vue/name-property-casing
  props: {},
  data() {
    return {};
  },
};
</script>
<style scoped>
</style>
