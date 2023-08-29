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
              class="width60"
            />
            <div class="comp_spacing" />
            <sui-text-field
              ref="searchText"
              v-model="frame0.searchText"
              :disabled="false"
              :readonly="false"
              maxlength="50"
              @keyup.enter="onClickSearch"
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
              v-model="frame0.periodDT"
              :value="frame0.periodDT"
              sticky
              @toggle-floating="onChangedPeriodDT"
              one-input-mode
              :inputType=this.userDateFormat
              :modelType=this.userDateFormat                 
            />

          </div>
        </div>
        <div
          v-if="isCategoryGroupExist"
          class="row"
        >
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_CATG')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-select-box
              v-model="selectedCategoryItem"
              :value="selectedCategoryItem"
              :option-list="categoryOptions"
              placeholder="selectbox"
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
            :headers="gridColumns0"
            :data-source="dataset0"
            :options="options"
            :showRowsPerPageControl="true"
            :initialRowsPerPage="10"
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
            v-permission:read="contextPageId"
            type="button"
            class="comm_btn_border"
            @click="openTempListPopup"
          >
            {{ $t('MSG_BTN_TMP_SAVE') }}
          </sui-button>
        </div>
        <div class="btn_wrapR">
          <sui-button
            v-permission:create="contextPageId"
            type="button"
            class="comm_btn_border_Prime"
            @click="openRegisterPopup"
          >
            {{ $t('MSG_BTN_RGST') }}
          </sui-button>
        </div>
      </div>
      <sui-popup
        v-model="showPopup"
        :title="$t('MSG_TIT_TMP_LIST')"
      >
        <p01
          :pageId="contextPageId"
          :bbsId="bbsId"
          :bbsName="bbsName"
          :isCategoryGroupExist="isCategoryGroupExist"
          @close="closeTmpList"
        />
      </sui-popup>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import BasePage from '~cm/components/BasePage';
import p01 from './components/PGE_CLB_00003_P01';
import {urDataSet} from 'uidev-component/index.js';

const dateTypeFields = ['firstRegistrationDTM'];
export default {
  name: 'PGE_CLB_00003', // eslint-disable-line vue/name-property-casing
  components: {
    p01,
  },
  extends: BasePage,
  data() {
    return {};
  },
  computed: {},
  watch: {},
  
  created() 
  {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
</style>
