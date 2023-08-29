<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_STAT_OCCUR_DT')"
              :vertical="false"
              required
            />
          </div>
           <div class="col-xs-5">
            <ur-range-picker
              ref="rangeDate"
              v-model="periodDT"
              init="today"
              oneInputMode
              :inputType=this.userDateFormat
              :modelType=this.userDateFormat
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
              ref="boardTypeOptions"
              :defaultOption="'all'"
              :selected="frame0.selectData.COD_BBS_TYP_CD"
              codeId="COD_BBS_TYP_CD"
            />
          </div>
        </div>
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
              :defaultOption="'all'"
              :selected="frame0.selectData.COD_BBS_SCR_CON"
              codeId="COD_BBS_SCR_CON"
              class="width60"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="frame0.searchCondText"
              placeholder=""
              maxlength="100"
              :disabled="false"
              :readonly="false"
              @input="specialChar($event,'searchCondText')"
              @keyup.enter="searchBoardStatistics"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="resetFunction"
          >
            {{ $t('MSG_BTN_RESET') }}
          </sui-button>
          <sui-button
            type="button"
            class="comm_btn_Scr"
            @click="searchBoardStatistics"
          >
            {{ $t('MSG_BTN_SRCH') }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="grdList"
        :headers="gridColumns0"
        :rowMovable="false"
        :multiselect="false"
        :pageable="false"
        :hideHeader="false"
        :data-source="dataset0"
        :showRowsPerPageControl="false"
        :initialRowsPerPage="10"
    >
     <template #right-info>
                <sui-button
                  class="comm_btn_gridTop comm_ico_excel"
                  @click="downloadExcel"
                >
                  {{ $t("MSG_BTN_EXCEL_DOWN") }}
                </sui-button>
              </template>
            </sui-s-grid>  
    </sui-page-contents>
  </sui-page>
</template>
<script>
import BasePage from '~cm/components/BasePage';
import { urDataSet } from 'uidev-component/index.js';

const dateTypeFields = ['firstRegistrationDTM'];
export default {
  name: 'PGE_CLB_00009', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  data() {
    return {
      dataset0: new urDataSet(),
      // Codes
      frame0: {
        selectData: {
          COD_BBS_TYP_CD: { key: '', label: '' },
          COD_BBS_SCR_CON: { key: '', label: '' },
        },
        searchCondText: '',
      },
      startDate: '',
      endDate: '',
      periodDT: [],
      searchCondText: '',
      localdata0: [],
      userDateFormat: this.$store.getters.userInfo.dateFormat,
      gridColumns0: [{
        text: this.$t('MSG_TXT_SN'),
        value: '',
        width: 60,
        component: {
          props: ['row', 'value'],

          template: `
            <div style="margin: 8.2px;">
              {{ row.__idx + 1 }}
            </div>`,
        },
      }, {
        text: this.$t('MSG_TXT_STAT_OCCUR_DT'),
        value: 'firstRegistrationDTM',
        component: {
          props: ['row', 'value'],
          template:
            `<cmp-cell-date
              :formatOption="'S'"
              :value="row.firstRegistrationDTM"
            />`,
        },
        // createwidget: (r, c, v, h) => utils.getGridCellFactory().createCellDateLabel(r, c, v, h, { formatOption: 'S' }, this.dataset0, this.$refs.grdList),
        // initwidget: (r, c, v, h) => utils.getGridCellFactory().refreshCell(r, c, v, h),
        width: 130,
      }, {
        text: this.$t('MSG_TXT_BBS_ID'),
        value: 'bbsBoardName',
        width: 120,
      }, {
        text: this.$t('MSG_TXT_BBS_NM'),
        value: 'bbsId',
      }, {
        text: this.$t('MSG_TXT_BBS_TYP'),
        value: 'bbsBoard',
        width: 120,
      }, {
        text: this.$t('MSG_TXT_USR'),
        value: 'userNm',
        component: {
          props: ['row', 'value'],
          template:
            `<cmp-user-name-link
              :displayType="'1'"
              :loginId="row.loginId"
              :knoxId="row.knoxId"
              :userName="row.userName"
              :userGlobalName="row.userGlobalName"
              :departmentName="row.departmentName"
              :departmentEnglishName="row.departmentEnglishName"
              :type="'link'"
            />`,
        },
      }, {
        text: this.$t('MSG_TXT_DEPT'),
        value: 'division',
        width: 180,
      }, {
        text: this.$t('MSG_TXT_CRE_CNT'),
        value: 'createLogCount',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_SRCH_CNT'),
        value: 'searchLogCount',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_MOD_CNT'),
        value: 'modifiedLogCount',
        width: 100,
      }, {
        text: this.$t('MSG_TXT_DEL_CNT'),
        value: 'deleteLogCount',
        width: 100,
      }
      // , {
      //   text: this.$t('MSG_TXT_ANS_CNT'),
      //   datafield: 'answeredLogCount',
      // }
      ],
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    resetFunction() {
      this.$refs.boardTypeOptions.reset();
      this.$refs.searchTypeOptions.reset();
      this.frame0.searchCondText = '';
      this.periodDT=[utils.dateformatToClient(utils.now()),utils.dateformatToClient(utils.now())];
    },
    searchBoardStatistics() {
      this.startDate = utils.dateformatToServer(this.periodDT[0]);
      this.endDate = utils.dateformatToServer(this.periodDT[1]).substr(0 , 8) + '235959';
      this.dataset0.setData([]);
      if ((this.periodDT[1].length === 0 && this.periodDT[0].length !== 0)
      || (this.periodDT[1].length !== 0 && this.periodDT[0].length === 0)) {
        utils.messageBox('warning', this.$t('MSG_ALT_CHK_DT'), null, null);
        return false;
      }
      if (!this.startDate && !this.endDate && !this.$refs.searchTypeOptions.currentSelected.codeId) {
        utils.messageBox('warning', this.$t('MSG_ALT_REQ_DT_SRCH_COND'), null, null);
        this.dataset0.setRawData('');
      } else {
        if (this.$refs.searchTypeOptions.currentSelected.codeId) {
         // let initialdate = utils.toStringByFormat(this.startDate, 'YYYY-MM-DD');
          //this.periodDT.from = utils.toStringByFormat(utils.addMonth(initialdate, 3), 'YYYY-MM-DD');
          if (utils.getDayOffset(this.periodDT[1], this.periodDT[0]) > -1) {
            utils.messageBox('warning', this.$t('MSG_ALT_SRCH_NOT_OVER_3M'));
          } else {
            this.searchBoardStatisticsApi();
          }
        } else if (!this.$refs.searchTypeOptions.currentSelected.codeId) {
          //this.periodDT.from = utils.toStringByFormat(this.startDate, 'YYYY-MM-DD');
          if (utils.getDayOffset(this.periodDT[1], this.periodDT[0]) > 7) {
            utils.messageBox('warning', this.$t('MSG_ALT_SRCH_NOT_OVER_1W'));
          } else {
            this.searchBoardStatisticsApi();
          }
        }
      }
    },
    searchBoardStatisticsApi() {
      const queryParams = {
        statsCreatedStartDateTime: this.startDate || '',
        statsCreatedFinishDateTime: this.endDate || '',
        bulletinBoardType: this.$refs.boardTypeOptions.currentSelected.codeId || '',
        bullBoardSearchCond: this.$refs.searchTypeOptions.currentSelected.codeId || '',
        bullBoardSearchCondValue: this.searchCondText || '',
      };
      http.request('PGE_CLB_00009', 'DTS_CLB_00048', {
        query: queryParams,
      }).then(res => {
        utils.dateformatToClientInArray(res.data, dateTypeFields);
        this.dataset0.setData(res.data);
      });
    },
    downloadExcel() {
      const sPageId = this.contextPageId;
      const objGridColumns = this.gridColumns0;
      const objGridDataset = this.dataset0;
      const sToday = utils.now('YYYYMMDDHHmmss');
      const sExcelName = `excel_${sToday}.xlsx`;
      utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {});
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
