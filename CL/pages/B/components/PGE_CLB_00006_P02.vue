<template>
  <div>
    <div class="comm_popup_wrap_large">
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TIT_RSN')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-11">
            <textarea
              v-model.trim="reason"
              name="name"
              rows="10"
              @input="textAreaMaxlength"
            />
          </div>
        </div>
      </div>
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
        v-permission:update="contextPageId"
        type="button"
        class="comm_btn_solid"
        @click="onSave"
      >
        {{ $t('MSG_BTN_SAVE') }}
      </sui-button>
    </div>
  </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CLB_00006_P02', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    rejectInformationParam: {
      type: Object,
      default() {
        return {};
      },
    },
    closePagePopup: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      reason: '',
    };
  },
  computed: {},
  watch: {},
  datasets: [],
  mounted() {},

  methods: {
    textAreaMaxlength() {
      const textValue = this.reason;
      this.oldTextValue = utils.isEmpty(this.oldTextValue) ? textValue : this.oldTextValue;
      if (textValue.length > 1000) {
        this.reason = this.oldTextValue;
      } else {
        this.oldTextValue = textValue;
      }
    },
    onSave() {
      if (this.reason.trim() === '') {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_INPUT_CELL'), this.$t('MSG_TXT_RSN')), null, null);
        return false;
      }
      http.request(this.contextPageId, 'DTS_CLB_00031', {
        query: {
          'post-id': this.rejectInformationParam.postId,
          noticeObjectRejctContent: this.reason,
          'appr-user-id': this.$store.getters.userInfo.epid,
        },
      }).then(res => {
        if (res.data.resultCode === '1') {
          utils.messageBox('success', this.$t('MSG_ALT_PRGS_OK'), null);
          this.$emit('exit', true);
        }
      });
    },
    onCancel(type) {
      this.$emit('exit', false);
    },
  },
};
</script>
<style scoped>
</style>
