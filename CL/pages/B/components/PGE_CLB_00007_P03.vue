<template>
  <div>
    <div class="comm_popup_wrap_large">
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_CATG_GRP_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-4">
            <div
              class="comm_label"
            >
              {{ biddingInformationParam && biddingInformationParam[0] ? biddingInformationParam[0].bullBoardCategoryGroupName : '' }}
            </div>
          </div>
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_CATG_GRP_ID')"
              :vertical="false"
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
            />
          </div>
          <div class="col-xs-10">
            <div
              class="comm_label"
            >
              {{ biddingInformationParam && biddingInformationParam[0] ? biddingInformationParam[0].bullBoardCategoryGroupContent : '' }}
            </div>
          </div>
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="grid"
        :headers="gridColumns0"
        :data-source="dataset0"
        :showRowsPerPageControl="false"
        :options="options"
      />
    </div>
    <div class="comm_btn_wrap mrB30 mrR30">
      <div class="btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onCancel"
        >
          {{ $t('MSG_BTN_CLOSE') }}
        </sui-button>
      </div>
    </div>
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component/index.js';

export default {
  name: 'PGE_CLB_00007_P03', // eslint-disable-line vue/name-property-casing
  props: {
    biddingInformationParam: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      COD_GNRZ_AREA: {
        label: '',
        key: '',
      },
      COD_BDD_PRGS_STT: {
        label: '',
        key: '',
      },
      categoryId: '',
      gridColumns0: [],
      dataset0: new urDataSet(),
      options: {
        msgTotal: false,
        multiselect: false,
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.localdata0 = [];
    this.gridColumns0 = [
      {
        text: this.$t('MSG_TXT_CATG_GRP_ITEM'),
        value: 'bullBoardCategoryItemName',
      },
      {
        text: this.$t('MSG_TXT_ARRAY_ORDER'),
        value: 'arraylOrder',
      },
      {
        text: this.$t('MSG_TXT_RGST_USR'),
        value: 'firstRegistrationUserId',
        component: {
          props: ['row', 'value'],
          template:
           `<cmp-user-name-link              
              :displayType="'1'"
              :userId="row.firstRegistrationUserId"
              :userName="row.userName"
              :userGlobalName="row.userGlobalName"
              :departmentName="row.departmentName"
              :departmentEnglishName="row.departmentEnglishName"
              :displayLanguageId="row.displayLanguageId"
              :loginId="row.loginId"
              :type="'link'"
            />`,
        },
      },
      {
        text: this.$t('MSG_TXT_RGST_DT'),
        value: 'firstRegistrationDTM',
        customValue(value) {
          return utils.dateformatToClient(value);
        },
      },
    ];
  },
  mounted() {
    this.dataset0.setData(this.biddingInformationParam);
    this.categoryId = this.biddingInformationParam[0].bullBoardCategoryGroupID.slice(
      4,
      this.biddingInformationParam[0].bullBoardCategoryGroupID.length,
    );
  },
  methods: {
    onCancel() {
      this.$emit('exit', true);
    },
  },
};
</script>
<style scoped>
</style>
