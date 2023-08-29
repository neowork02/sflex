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
              v-model="queryData.searchCond"
              codeId="COD_BBS_SCR_CON"
              :defaultOption="'all'"
              class="width60"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="queryData.searchText"
              maxlength="100"
              :disabled="false"
              :readonly="false"
              @keyup.enter="onClickSearch"
              @keyup="onKeyUpInput"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_BBS_TYP')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="codeSelectBbsType"
              v-model="queryData.bbsType"
              codeId="COD_BBS_TYPE"
              :defaultOption="'all'"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_CATG_GRP_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model="bbsGroupName"
              :disabled="true"
              :readonly="false"
            />
            <sui-button
              type="button"
              class="comm_btn_InputScr"
              @click="categoryPopupOpenOrClose"
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
        ref="grdList"
        :headers="gridColumns0"
        :data-source="dataset0"
        :options="options"
        :showRowsPerPageControl="false"
        @grid:selected="onSelectGrid"
      />
      <div class="mrB30" />
      <sui-page-tab-box-type
        ref="tab"
        :tabItems="tabItems"
        :defaultTabIndex="defaultTabIndex"
        :setCurrentTabComponent="setCurrentTabComponent"
        @change-tab-idx="onChangeTabIdx"
      >
        <container
          :is="currentTabComponent"
          :pageId="contextPageId"
          :selectedPageId="selectedPageId"
          :selectedGridRowData="selectedGridRowData"
          :selectedPopupParam="selectedPopupParam"
          @openPopup="tabPopupOpenOrClose"
          @research="onClickSearch"
          @clearGridSelection="clearGridSelection"
          @openMenuPopup="setMenuPageId"
          @page-deactivate="handleChildDeactivated"
          @page-activate="handleChildActivated"
          @updateInfo="handleUpdated"
        />
      </sui-page-tab-box-type>
      <!-- 검색조건 팝업 -->
      <sui-popup
        v-model="isShownCategoryPopup"
        :title="$t('MSG_TIT_CATG_GRP_DTL_POPUP')"
      >
        <p01
          :parentPageId="contextPageId"
          :callByTab="false"
          @closePopup="categoryPopupOpenOrClose"
          @setCategoryData="onSelectCategoryGroup"
        />
      </sui-popup>
      <!-- 탭 팝업 -->
      <sui-popup
        v-model="isShownTabPopup"
        :title="$t('MSG_TIT_CATG_GRP_DTL_POPUP')"
      >
        <p01
          :parentPageId="contextPageId"
          :callByTab="true"
          @closePopup="tabPopupOpenOrClose"
          @popupParam="setPopupParam"
        />
      </sui-popup>
      <sui-popup
        v-model="isShownMenuPopup"
        :title="$t('MSG_TIT_MENU_RGST')"
      >
        <p02
          :parentPageId="contextPageId"
          :menuPageId="menuPageId"
          @closePopup="menuPopupOpenOrClose"
        />
      </sui-popup>
    </sui-page-contents>
  </sui-page>
</template>
<script>
// eslint-disable-next-line import/extensions
import { urDataSet } from 'uidev-component/index.js';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';
import tab01 from './components/PGE_CLB_00008_T01.vue';
import tab02 from '../../../CM/pages/U/components/PGE_CMU_00001_T07.vue';
import p01 from './components/PGE_CLB_00008_P01';
import p02 from './components/PGE_CLB_00008_P02';

export default {
  name: 'PGE_CLB_00008', // eslint-disable-line vue/name-property-casing
};
</script>
<style scoped>
</style>
