<template>
  <div>
    <div class="comm_popup_wrap_large">
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_CATG_GRP_NM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model="frame0.bbsCtgGrpName"
              placeholder
              maxlength="100"
              :disabled="false"
              :readonly="false"
              @keyup.enter="onSearchClick"
              @input="specialChar($event,'bbsCtgGrpName')"
            />
          </div>
          <div class="btn_wrap">
            <button
              type="button"
              class="comm_btn_Reset"
              @click="onResetClick"
            >
              {{ $t('MSG_BTN_RESET') }}
            </button>
            <button
              type="button"
              class="comm_btn_Scr"
              @click="onSearchClick"
            >
              {{ $t('MSG_BTN_SEARCH') }}
            </button>
          </div>
        </div>
      </div>
      <div class="mrB30" />
      <!-- <sui-grid
        :columns="gridColumns0"
        :dataset="'dataset12'"
        :initial-pagesize="10"
        :showDisplayCountControl="true"
        :rowMovable="true"
        :multiselect="false"
        :pageable="false"
        @rowselect="onSelectRow"
      /> -->
       <sui-s-grid
            :headers="gridColumns0"
            :data-source="dataset12"
            :options="options"
            :showRowsPerPageControl="true"
            :initialRowsPerPage="10"
            @grid:selected="onSelectRow"
           >
           </sui-s-grid> 
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onCancel"
      >
        {{ $t('MSG_BTN_CLOSE') }}
      </sui-button>
      <sui-button
        type="button"
        class="comm_btn_solid"
        @click="onSelectCategory"
      >
        {{ $t('MSG_BTN_SELT') }}
      </sui-button>
    </div>
  </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';
import {urDataSet} from 'uidev-component/index.js';

export default {
  name: 'PGE_CLB_00008_P01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    parentPageId: {
      type: String,
      default: '',
    },
    callByTab: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      frame0: {
        bbsCtgGrpName: '',
      },
      dataset12: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      selectedIndex: {},
    };
  },
  computed: {},
  watch: {},
  created() {
    this.localdata0 = [];
    this.gridColumns0 = [
      {
        text: this.$t('MSG_TXT_SN'),
        value: '',
        component: {
          props: ['row', 'value'],

          template: `
            <div style="margin: 8.2px;">
              {{ row.__idx + 1 }}
            </div>`,
        },
      },
      {
        text: this.$t('MSG_TXT_CATG_GRP_NM'),
        value: 'bullBoardCategoryGroupName',
      },
      {
        text: this.$t('MSG_TXT_CATG_GRP_ID'),
        value: 'bullBoardCategoryGroupID',
      },
      {
        text: this.$t('MSG_TXT_DESC'),
        value: 'bullBoardCategoryGroupContent',
      },
    ];
  },
  methods: {
    onSearchClick() {
      const queryParams = {
        categoryGroupName: this.frame0.bbsCtgGrpName || '',
      };
      http.request(this.contextPageId, 'DTS_CLB_00047', {
        query: queryParams,
      }).then(res => {
        this.dataset12.setData(res.data);
      });
    },
    onResetClick() {
      this.frame0.bbsCtgGrpName = '';
      // this.dataset12.setData([]);
    },
    onSelectRow(target) {
      this.selectedIndex = {
        categoryName: target.bullBoardCategoryGroupName,
        categoryId: target.bullBoardCategoryGroupID,
      };
    },
    onSelectCategory() {
      if (this.selectedIndex.categoryId) {
        if (this.callByTab) {
          this.$emit('popupParam', this.selectedIndex, 'selectedPopupParam');
          this.$emit('closePopup');
        } else {
          this.$emit('setCategoryData', this.selectedIndex);
        }
      } else {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_CATG_GRP_NM'));
        utils.messageBox('warning', msg, null);
      }
    },
    onCancel() {
      this.$emit('closePopup', true);
    },
    specialChar(event, name) {
      const searchFieldNewText = this.frame0[name];
      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_CHK_SPECL_CHAR'), null, () => {
          this.frame0[name] = this[name];
        });
      } else {
        this[name] = searchFieldNewText;
      }
    },
  },
};
</script>
<style scoped>
</style>
