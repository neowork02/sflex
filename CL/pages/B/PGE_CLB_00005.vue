<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SEARCH_COND')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="codeSelectSearchCond"
              v-model="queryData.postSearchCond"
              :defaultOption="'all'"
              codeId="COD_BBS_SCH_COND_PSTNG"
              class="width60"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="queryData.searchText"
              :disabled="false"
              :readonly="false"
              @keyup.enter="onClickSearch"
              @keyup="onKeyUpInput()"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_RGST_DT')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <ur-range-picker
              ref="datePicker"
              v-model="rangeDate"
              :value="rangeDate"
              one-input-mode
              :inputType=this.userDateFormat
              :modelType=this.userDateFormat
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_STT')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="codeSelectStatus"
              v-model="queryData.status"
              :defaultOption="'all'"
              :initialSelectedIndex="2"
              codeId="COD_NOTICOBJ_APPR_STT"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onClickReset"
          >
            {{ $t('MSG_BTN_RESET') }}
          </sui-button>
          <sui-button
            v-permission:read="contextPageId"
            type="button"
            class="comm_btn_Scr"
            @click="onClickSearch"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="grid"
        :headers="gridColumns0"
        :data-source="dataset0"
        :initialRowsPerPage="10"
        :showDisplayCountControl="true"
        @grid:selected="onSelectGrid"
      />
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_sbtn_solid"
          :disabled="rejectPermission"
          @click="onClickCancel()"
        >
          {{ $t('MSG_BTN_CANCEL') }}
        </sui-button>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index';
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CLB_00005', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  data() {
    return {};
  },
};
</script>
<style scoped>
</style>
