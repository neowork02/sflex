<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
     
      <sui-s-grid
            ref="gridScrap"
            :headers="columnScrap"
            :data-source="dsScrap"
            :options="options"
            :showRowsPerPageControl="true"
            :initialRowsPerPage="10"
           />


      <div class="comm_btn_wrap">
        <sui-button
          v-permission:delete="contextPageId"
          type="button"
          class="comm_btn_border"
          @click="onDeleteClick"
        >
          {{ $t('MSG_BTN_DEL') }}
        </sui-button>
      </div>
    </sui-page-contents>
  </sui-page>
</template>

<script>
import BasePage from '~cm/components/BasePage';
import {urDataSet} from 'uidev-component/index.js';

const dateTypeFields = ['firstRegistrationDTM', 'finalModificationDTM'];
/* eslint max-len: ["error", { "code" : 500 }] */
export default {
  name: 'PGE_CLB_00032', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  data() {
    return {};
  },
  computed: {},
  watch: {},
 
  created() {},
  mounted() {},

  methods: {},
};
</script>

<style scoped>
</style>
