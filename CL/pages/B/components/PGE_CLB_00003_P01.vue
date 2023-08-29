<template>
  <div>
    <div class="comm_popup_wrap_xlarge">
      <sui-s-grid
        ref="grdList"
        :headers="gridColumns0"
        :data-source="dataset0"
      />
      <div class="comm_btn_wrap mrB30">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onClickClose"
        >
          {{ $t('MSG_BTN_CLOSE') }}
        </sui-button>
      </div>
    </div>
  </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';
import { urDataSet } from 'uidev-component/index.js';

export default {
  name: 'PGE_CLB_00003_P01',
  components: {},
  extends: BasePage,
  props: {
    bbsId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dataset0: new urDataSet(),
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.$nextTick(() => {
      this.onLoad();
    });
  },
  created() {
    const that = this;
    this.localdata0 = [];
    this.gridColumns0 = [
      {
        text: this.$t('MSG_TXT_SN'),
        value: 'rowNumber',
        width: '80px',
      },
      {
        text: this.$t('MSG_TXT_TITLE'),
        value: 'qnaNoticeObjTextTitle',
        component: {
          props: ['row', 'value'],
          template:
              `<ur-button
                :title="row.qnaNoticeObjTextTitle"
                type="button"
                class="link"
                shape="hyperlink"
                prim
                @click.stop="onDetailClick(value, row)"
              >
              {{row.qnaNoticeObjTextTitle}}
              </ur-button>`,
          methods: {
            onDetailClick(btn, selectedRawData) {
              that.onClickRow(btn, selectedRawData);
            },
          },
        },
      },
    ];
  },
  methods: {
    onLoad() {
      this.dataset0.setData([]);
      http.request(this.contextPageId, 'DTS_CLB_00069', {
        query: {
          bbsId: this.bbsId,
        },
      }).then(res => {
        this.dataset0.setData(res.data);
      });
    },
    onClickRow(btn, selectedRow) {
      if (selectedRow) {
        utils.openLayerPopup('PGE_CLB_00022', this.popUpClosedCallback, {
          size: 'xlg',
          pageInitialData: {
            postIdParam: selectedRow.postUID,
            bbsId: this.bbsId,
            bbsName: this.bbsName,
            isCategoryGroupExist: this.isCategoryGroupExist,
          },
        });
      }
    },
    onClickClose() {
      this.$emit('close');
    },
    popUpClosedCallback() {
      this.onLoad();
    },
  },
};
</script>
<style scoped>
</style>
