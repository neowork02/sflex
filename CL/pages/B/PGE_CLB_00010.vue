<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <textarea
        v-model="rejectionReason"
        :label="$t('MSG_TIT_RJT_SCG_POPUP')"
        rows="10"
        :disabled="true"
      />
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onCancel"
        >
          {{ $t('MSG_BTN_CLOSE') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
export default {
  name: 'PGE_CLB_00010', // eslint-disable-line vue/name-property-casing
  props: {
    closePagePopup: {
      type: Function,
    },
    pageInitialData: {
      type: Object,
    },
  },
  data() {
    return {
      rejectionReason: '',
      // Codes
    };
  },
  computed: {},
  watch: {},
  datasets: [],
  mounted() {
    this.rejectView();
  },

  methods: {
    rejectView() {
      http
        .request('PGE_CLB_00010', 'DTS_CLB_00028', {
          path: {
            'post-id': this.pageInitialData.postIdParam,
          },
        })
        .then(res => {
          this.rejectionReason = res.data[0]['noticeObjectRejctContent'];
        })
        .catch(error => {
          console.log(error);
        });
    },
    onCancel() {
      this.closePagePopup(false);
    },
  },
};
</script>
<style scoped>
</style>
