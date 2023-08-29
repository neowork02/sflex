<template>
  <div>
    <div class="comm_popup_wrap_large">
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
              @keyup="specialChar"
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
            <div class="comm_label">
              {{ categoryId }}
            </div>
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
        :options="options0"
        :showRowsPerPageControl="false"
        :showMoveControl="true"
        @grid:selected="onSelectRow"
      >
        <template #center-info>
          <div class="btn_wrapL">
            <div class="comp_spacing" />
            <ur-button
              v-permission:update="contextPageId"
              type="button"
              class="comm_btn_border"
              small
              @click="onClickAddRow"
            >
              {{ $t('MSG_BTN_ROW_ADD') }}
            </ur-button>
            <ur-button
              v-permission:update="contextPageId"
              type="button"
              class="comm_btn_border"
              style="margin-left:8px;"
              :disabled="deleteStatus"
              small
              @click="onClickModifyRow"
            >
              {{ $t('MSG_BTN_MDFC') }}
            </ur-button>
            <ur-button
              v-permission:update="contextPageId"
              type="button"
              class="comm_btn_border"
              style="margin-left:8px;"
              :disabled="deleteStatus"
              small
              @click="onClickDeleteRow"
            >
              {{ $t('MSG_BTN_ROW_DEL') }}
            </ur-button>
          </div>
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
          v-permission:update="contextPageId"
          type="button"
          class="comm_btn_solid"
          @click="applyModification"
        >
          {{ $t('MSG_BTN_SAVE') }}
        </sui-button>
      </div>
    </div>
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component/index';
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CLB_00007_P02', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    biddingInformationParam: {
      type: Array,
      default() {
        return [];
      },
    },
  }, // eslint-disable-line vue/name-property-casing
  data() {
    return {};
  },
};
</script>
<style scoped>
</style>
