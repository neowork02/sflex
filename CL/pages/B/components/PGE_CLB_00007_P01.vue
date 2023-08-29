<template>
  <div>
    <div
      class="comm_popup_wrap_large"
      style="overflow-y: hidden;"
    >
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_CATG_GRP_NM')"
              :vertical="false"
              :required="true"
            />
          </div>
          <div class="col-xs-4">
            <sui-text-field
              v-model="categoryName"
              placeholder
              maxlength="50"
              :disabled="false"
              :readonly="false"
              @keyup="specialCharName"
            />
          </div>
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_CATG_GRP_ID')"
              :vertical="false"
              :required="true"
            />
          </div>
          <div class="col-xs-4">
            <div class="comm_label">
              BCG_
            </div>
            <div class="comp_spacing" />
            <sui-text-field
              v-model="categoryId"
              placeholder
              maxlength="26"
              :disabled="false"
              :readonly="false"
              @keyup="specialCharId(categoryId)"
            />
            <div class="comp_spacing" />
            <sui-button
              type="button"
              class="comm_btn_duplicate"
              @click="onClickDuplicate"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_DESC')"
              :vertical="false"
              :required="true"
            />
          </div>
          <div class="col-xs-10">
            <sui-text-field
              v-model="categoryContent"
              placeholder
              maxlength="1000"
              :disabled="false"
              :readonly="false"
            />
          </div>
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="gridN"
        :headers="gridColumns0"
        :data-source="dataset0"
        :showRowsPerPageControl="false"
        :showMoveControl="true"
        :options="options"
        @grid:selected="onSelectRow"
      >
        <template #center-info>
          <div class="comp_spacing" />
          <ur-button
            v-permission:create="contextPageId"
            type="button"
            class="comm_btn_gridTop"
            style="margin-left:4px;"
            small
            @click="onClickAddRow"
          >
            {{ $t('MSG_BTN_ROW_ADD') }}
          </ur-button>
          <ur-button
            v-permission:update="contextPageId"
            type="button"
            class="comm_btn_gridTop"
            style="margin-left:4px;"
            :disabled="deleteStatus"
            small
            @click="onClickModifyRow"
          >
            {{ $t('MSG_BTN_MDFC') }}
          </ur-button>
          <ur-button
            v-permission:create="contextPageId"
            type="button"
            class="comm_btn_gridTop"
            :disabled="deleteStatus"
            small
            @click="onClickDeleteRow"
          >
            {{ $t('MSG_BTN_ROW_DEL') }}
          </ur-button>
        </template>
      </sui-s-grid>
    </div>
    <div class="comm_btn_wrap mrB30 mrR30">
      <div class="btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onPopupCancelClicked"
        >
          {{ $t('MSG_BTN_CANCEL') }}
        </sui-button>
        <sui-button
          v-permission:create="contextPageId"
          type="button"
          class="comm_btn_solid"
          @click="applyRegistration"
        >
          {{ $t('MSG_BTN_SAVE') }}
        </sui-button>
      </div>
    </div>
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component/index.js';
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CLB_00007_P01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    biddingInformationParam: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
</style>
