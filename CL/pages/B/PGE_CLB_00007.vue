<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
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
              v-model="categoryName"
              maxlength="100"
              :disabled="false"
              :readonly="false"
              @keyup="specialChar"
              @keyup.enter="onSearchClick"
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
              v-model="rangeDate1"
              oneInputMode
              init="today"
              :inputType=this.userDateFormat
              :modelType=this.userDateFormat
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onResetClick"
          >
            {{ $t('MSG_BTN_RESET') }}
          </sui-button>
          <sui-button
            v-permission:read="contextPageId"
            type="button"
            class="comm_btn_Scr"
            @click="onSearchClick"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="gridCategory"
        :headers="gridColumns0"
        :rowMovable="false"
        :multiselect="false"
        :pageable="false"
        :hideHeader="false"
        :data-source="dataset0"
        :showRowsPerPageControl="false"
        :initialRowsPerPage="10"
        @grid:selected="onSelectRow"
      />
      <div class="comm_btnBot_wrap">
        <div class="btn_wrapL" />
        <div class="btn_wrapR">
          <sui-button
            v-if="showBulletinAdmin"
            v-permission:update="contextPageId"
            type="button"
            class="comm_btn_border"
            :disabled="modifyDisabled"
            @click="onModifyClick"
          >
            {{ $t('MSG_BTN_MDFC') }}
          </sui-button>
          <sui-button
            v-if="showBulletinAdmin"
            v-permission:delete="contextPageId"
            type="button"
            class="comm_btn_border"
            :disabled="deleteDisabled"
            @click="onDeleteClick"
          >
            {{ $t('MSG_BTN_DEL') }}
          </sui-button>
          <sui-button
            v-if="showBulletinAdmin"
            v-permission:create="contextPageId"
            type="button"
            class="comm_btn_solid"
            :disabled="registerStatus"
            @click="onRegistClick"
          >
            {{ $t('MSG_BTN_RGST') }}
          </sui-button>
        </div>
      </div>
      <sui-popup
        v-model="showDetailPopup"
        :title="$t('MSG_TIT_CATG_GRP_DTL_POPUP')"
      >
        <p03
          :biddingInformationParam="biddingInformationParam"
          :parentPageId="contextPageId"
          @exit="onPopupCancelClicked('detail')"
        />
      </sui-popup>
      <sui-popup
        v-model="showModPopup"
        :title="$t('MSG_TIT_CATG_GRP_MDFC_POPUP')"
      >
        <p02
          :biddingInformationParam="biddingInformationParam"
          :parentPageId="contextPageId"
          @exit="onPopupCancelClicked"
        />
      </sui-popup>
      <sui-popup
        v-model="showRegisterPopup"
        :title="$t('MSG_TIT_CATG_GRP_RGST_POPUP')"
      >
        <p01
          :biddingInformationParam="biddingInformationParam"
          :parentPageId="contextPageId"
          @exit="onPopupCancelClicked"
        />
      </sui-popup>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index';
import BasePage from '~cm/components/BasePage';
import p03 from './components/PGE_CLB_00007_P03';
import p02 from './components/PGE_CLB_00007_P02';
import p01 from './components/PGE_CLB_00007_P01';

export default {
  name: 'PGE_CLB_00007', // eslint-disable-line vue/name-property-casing
  components: {
    p02,
    p03,
    p01,
  },
  extends: BasePage,
  data() {
    return {
      categoryName: '',
      modifyDisabled: true,
      registerStatus: false,
      deleteDisabled: true,
      showRegisterPopup: false,
      showModPopup: false,
      showDetailPopup: false,
      rangeDate1: [],
      userDateFormat: this.$store.getters.userInfo.dateFormat,
      showBulletinAdmin: false,
      dataset0: new urDataSet(),
    };
  },
  computed: {},
  watch: {},
  created() {
    this.localdata0 = [];
    const that = this;
    this.gridColumns0 = [
      {
        text: this.$t('MSG_TXT_CATG_GRP_ID'),
        value: 'bullBoardCategoryGroupID',
        component: {
          props: ['row', 'value'],
          template:
            `<ur-button
              :title="row.bullBoardCategoryGroupName"
              type="button"
              class="link"
              shape="hyperlink"
              prim
              @click="onClickGrid12(value, row)"
            >
              {{row.bullBoardCategoryGroupID}}
            </ur-button>`,
          methods: {
            onClickGrid12(btn, dataRow) {
              that.onClickGrid(btn, dataRow);
            },
          },
        },
      },
      {
        text: this.$t('MSG_TXT_CATG_GRP_NM'),
        value: 'bullBoardCategoryGroupName',
        component: {
          props: ['row', 'value'],
          template:
            `<ur-button
              :title="row.bullBoardCategoryGroupName"
              type="button"
              class="link"
              shape="hyperlink"
              prim
              @click ="onClickGrid12(value, row)"
            >
              {{row.bullBoardCategoryGroupName}}
            </ur-button>`,
          methods: {
            onClickGrid12(btn, dataRow) {
              that.onClickGrid(btn, dataRow);
            },
          },
        }, 
      },
      {
        text: this.$t('MSG_TXT_RGST_USR'),
        value: 'loginId',
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
      },
      {
        text: this.$t('MSG_TXT_RGST_DTM'),
        value: 'firstRegistrationDTM',
      },
    ];
    this.biddingInformationParam = [];
  },
  mounted() {
    this.getSession();
  },

  methods: {
    specialChar() {
      const searchNewText = this.categoryName;
      if (utils.isExistSpecialChar(searchNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.categoryName = this.searchOldText;
        });
      } else {
        this.searchOldText = searchNewText;
      }
    },
    onPopupCancelClicked(option) {
      switch (option) {
        case 'detail':
          this.showDetailPopup = false;
          break;
        case 'cancelRegister':
          this.showRegisterPopup = false;
          break;
        case 'register':
          this.showRegisterPopup = false;
          this.onSearchClick();
          break;
        case 'modify':
          this.showModPopup = false;
          this.onSearchClick();
          break;
        case 'cancelModify':
          this.showModPopup = false;
          break;
        default:
          break;
      }
    },
    getSession() {
      this.sessionInfo = this.$store.getters.userInfo;
      const roleListArray = this.sessionInfo.roleList;
      const ifRoleExist = roleListArray.some(
        el => el.roleNickName === 'BBS_ADMIN',
      );
      if (!ifRoleExist) {
        this.showBulletinAdmin = true;
      }
    },
    onRegistClick() {
      this.showRegisterPopup = true;
    },
    onModifyClick() {
      const selectedIndex = this.dataset0.getSelected();
      const categoryId =selectedIndex[0].bullBoardCategoryGroupID;
      this.biddingInformationParam = [];
      const pathParam = {
        'category-group-id': categoryId,
      };
      http.request(this.contextPageId, 'DTS_CLB_00037', {
        path: pathParam,
      }).then(res => {
        this.biddingInformationParam = res.data;
        this.showModPopup = true;
      });
    },
    onDeleteClick() {
      utils.messageBox('confirm', this.$t('MSG_ALT_IS_DEL_DATA'), null, this.deleteAction);
    },
    deleteAction() {
      const selectedIndex = this.dataset0.getSelected();
      const categoryGroupId = selectedIndex[0].bullBoardCategoryGroupID; 
      http.request(this.contextPageId, 'DTS_CLB_00057', {
        path: {
          'category-group-id': categoryGroupId,
        },
      }).then(res => {
        if (res.data.resultCode === '1') {
          utils.messageBox('error', this.$t('MSG_ALT_REL_CATG_POSTING'), null);
        } else {
          http.request(this.contextPageId, 'DTS_CLB_00039', {
            path: {
              'category-group-id': categoryGroupId,
            },
          }).then(res => {
            console.log(res.data);
            if (res.data.resultCode === '1') {
              utils.messageBox('success', this.$t('MSG_ALT_PRGS_OK'), null);
              this.onSearchClick();
            }
          });
        }
      });
    },
    onSelectRow(event) {
      // const selectedData = this.dataset0.getSelected();
      this.deleteDisabled = false;
      this.modifyDisabled = false;
    },
    onClickGrid(btn, dataRow) {
      const categoryId = dataRow.bullBoardCategoryGroupID;
      this.biddingInformationParam = [];
      const pathParam = {
        'category-group-id': categoryId,
      };
      http.request(this.contextPageId, 'DTS_CLB_00037', {
        path: pathParam,
      }).then(res => {
        this.biddingInformationParam = res.data;
        this.showDetailPopup = true;
      });
    },
    onSearchClick() {
      if (!this.validateDatePicker()) return false;
      this.dataset0.setData([]);
      this.modifyDisabled = true;
      this.deleteDisabled = true;
      const queryParams = {
        categoryGroupName: this.categoryName,
        startDate: utils.dateformatToServer(this.rangeDate1[0]),	
        endDate: utils.dateformatToServer(this.rangeDate1[1]).substr(0, 8).concat('235959'),
      };
      http.request(this.contextPageId, 'DTS_CLB_00033', {
        query: queryParams,
      }).then(res => {
        utils.dateformatToClientInArray(res.data, 'firstRegistrationDTM');
        this.dataset0.setData(res.data);
      });
      return true;
    },
    onResetClick() {
      this.categoryName = '';
      this.rangeDate1=[utils.dateformatToClient(utils.now()),utils.dateformatToClient(utils.now())];
      this.searchOldText = '';
    },
    validateDatePicker() {
      const a = utils.isEmpty(this.rangeDate1[0]);
      const b = utils.isEmpty(this.rangeDate1[1]);
      if ((a&&!b) || (!a&&b)) {
        utils.messageBox('warning', this.$t('MSG_ALT_CHK_DT'), null, null);
        return false;
      }
      return true;
    },
  },
};
</script>
<style scoped>
</style>
