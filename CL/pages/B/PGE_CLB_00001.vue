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
              ref="searchTypeOptions"
              :selected="frame0.selectData.COD_NOTICOBJ_SRCH_DIV"
              codeId="COD_NOTICOBJ_SRCH_DIV"
              :defaultOption="'all'"
              class="width60"
            />
            <div class="comp_spacing" />
            <sui-text-field
              ref="searchText"
              v-model="frame0.searchText"
              :disabled="false"
              :readonly="false"
              maxlength="50"
              @keyup="onKeyUpInput($event,'searchText')"
              @keyup.enter="searchAnnouncements"
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
              ref="dp"
              v-model="frame0.rangeDate"
              :value="frame0.rangeDate"
              oneInputMode
              :inputType=this.userDateFormat
              :modelType=this.userDateFormat               
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            v-permission:read="contextPageId"
            type="button"
            class="comm_btn_Reset"
            @click="reset"
          >
            {{ $t('MSG_BTN_RESET') }}
          </sui-button>
          <sui-button
            v-permission:read="contextPageId"
            type="button"
            class="comm_btn_Scr"
            @click="searchAnnouncements"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="grdList"
        :showRowsPerPageControl="true"
        :initialRowsPerPage="10"
        :headers="gridColumns0"
        :data-source="dataset0"
        :options="options"
        @grid:scroll-bottom="onClickMore"
      />
      <div
        class="btn_moreView"        
      >
        <p>
          {{ showMoreCount }}
        </p>
      </div>
      <div class="comm_btn_wrap">
        <sui-button
          v-permission:create="contextPageId"
          type="button"
          class="comm_btn_solid"
          @click="registerPopup"
        >
          {{ $t('MSG_BTN_RGST') }}
        </sui-button>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import BasePage from '~cm/components/BasePage';
import { urDataSet } from 'uidev-component/index.js';

const dateTypeFields = ['firstRegistrationDTM'];
export default {
  name: 'PGE_CLB_00001', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  data() {
    return {};
  },
};
</script>
<style scoped>
</style>
