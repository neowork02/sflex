<template>
  <div>
    <div class="comm_popup_wrap_xlarge">
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_PORTL')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-custom-select
              ref="comboPortals"
              :selected="frame0.menuData.selPortal"
              :option-list="frame0.selectPortalList"
              :initialSelectedIndex="0"
              @selection-changed="onLoadPortalSelect"
              @list-clicked="onPortalSelectClick"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_APPLICATION')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-custom-select
              ref="comboApps"
              :selected="frame0.menuData.selApp"
              :option-list="frame0.selectAppList"
              :initialSelectedIndex="0"
              :defaultOption="'select'"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onResetMenuSearchClick"
          >
            {{ $t('MSG_BTN_RESET') }}
          </sui-button>
          <sui-button
            v-permission:read="contextPageId"
            type="button"
            class="comm_btn_Scr"
            @click="onMenuSearchClick"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <div class="comm_gridTop_wrap">
        <div
          class="btn_wrapL"
          style="height:24px;"
        >
          <div class="totalList">
            {{ totalCntMenu }}
          </div>
          <div class="comp_spacing2" />
          <sui-button
            type="button"
            class="comm_btn_sort_top"
            :disabled="btnStatus.node"
            @click="onMoveTree('top')"
          >
            Top
          </sui-button>
          <sui-button
            type="button"
            class="comm_btn_sort_up"
            :disabled="btnStatus.node"
            @click="onMoveTree('up')"
          >
            Up
          </sui-button>
          <sui-button
            type="button"
            class="comm_btn_sort_down"
            :disabled="btnStatus.node"
            @click="onMoveTree('down')"
          >
            Down
          </sui-button>
          <sui-button
            type="button"
            class="comm_btn_sort_bottom"
            :disabled="btnStatus.node"
            @click="onMoveTree('bottom')"
          >
            Bottom
          </sui-button>
          <div class="comp_spacing2" />
          <sui-button
            v-permission:delete="contextPageId"
            type="button"
            class="comm_btn_gridTop"
            :disabled="btnStatus.node"
            @click="onRemoveNodeClick"
          >
            {{ $t('MSG_BTN_DEL') }}
          </sui-button>
        </div>
        <div class="btn_wrapR">
          <sui-button
            v-permission:create="contextPageId"
            type="button"
            class="comm_btn_gridTop"
            :disabled="btnStatus.addFolder"
            @click="onNewFolderClick"
          >
            {{ $t('MSG_BTN_FLDR_NEW') }}
          </sui-button>
          <sui-button
            v-permission:update="contextPageId"
            type="button"
            class="comm_btn_gridTop"
            :disabled="btnStatus.rename"
            @click="onRenameClick"
          >
            {{ $t('MSG_BTN_RENAME') }}
          </sui-button>
        </div>
      </div>
      <div class="menutree">
        <sui-menu-tree
          ref="menuTree"
          :data="treedata"
          :draggable="!readonlyMenu"
          @item-click="itemClick"
          @item-drop-before="itemDropBefore"
          @item-drop="itemDrop"
        />
      </div>
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button
        v-permission:update="contextPageId"
        type="button"
        class="comm_btn_border"
        :disabled="btnStatus.node"
        @click="onClickMenuAdd"
      >
        {{ $t('MSG_BTN_MENU_ADD') }}
      </sui-button>
      <sui-button
        v-permission:delete="contextPageId"
        type="button"
        class="comm_btn_border"
        :disabled="btnStatus.cancel"
        @click="onCancelClick"
      >
        {{ $t('MSG_BTN_CANCEL') }}
      </sui-button>
      <sui-button
        v-permission:update="contextPageId"
        type="button"
        class="comm_btn_border"
        :disabled="btnStatus.save"
        @click="onSaveClick"
      >
        {{ $t('MSG_BTN_SAVE') }}
      </sui-button>
      <sui-button
        v-permission:update="contextPageId"
        type="button"
        class="comm_btn_solid"
        :disabled="btnStatus.apply"
        @click="onApplyClick"
      >
        {{ $t('MSG_BTN_APPLY') }}
      </sui-button>
    </div>
  </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CLB_00008_P02', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
  .pageselect {
    background-color: #e9ecf7;
  }
  .menutree {
    height: 440px;
    overflow: auto;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .table-fixed tbody {
    height: 400px;
    border-bottom: 1px solid #ccc;
  }
  .table-fixed tr:hover {
    cursor: default;
  }
  .dragitem {
    background-color: #e9ecf7;
    cursor: move !important;
  }
  .comm_title_wrap {margin-top:0 !important}
</style>
