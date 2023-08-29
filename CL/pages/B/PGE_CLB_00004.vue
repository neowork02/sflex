<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TITLE')"
              maxlength="100"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model="titleSearch"
              :vertical="false"
              @keyup.enter="onClickSearch"
              @input="specialChar(titleSearch)"
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
              ref="rangeDate"
              v-model="rangeDate"
              :value="rangeDate"
              oneInputMode
              :inputType=this.userDateFormat
              :modelType=this.userDateFormat                
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_CATG_GRP_ITEM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-select-box
              v-model="selectedCategoryItem"
              :value="selectedCategoryItem"
              :option-list="categoryItemOptions"
              @list-click="itemSelected"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
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
            @click="onClickSearch"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="grdList"
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
        <div class="btn_wrapR">
          <sui-button
            v-permission:create="contextPageId"
            type="button"
            class="comm_btn_solid"
            @click="registerPopup"
          >
            {{ $t('MSG_BTN_RGST') }}
          </sui-button>
        </div>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import BasePage from '~cm/components/BasePage';
import { urDataSet } from 'uidev-component/index.js';

const dateTypeFields = ['firstRegistrationDTM'];
export default {
  name: 'PGE_CLB_00004', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  data() {
    return {};
  },
};
</script>
<style scoped>
</style>
