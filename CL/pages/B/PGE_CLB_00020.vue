<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TITLE')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-11">
            <div class="comm_label">
              {{ frame0.boardTitle }}
            </div>
          </div>
        </div>
        <div class="row">
          <div
            v-if="isCategoryGroupExist"
            class="col-xs-1"
          >
            <sui-input-label
              :label="$t('MSG_TXT_CATG')"
              :vertical="false"
            />
          </div>
          <div
            v-if="isCategoryGroupExist"
            class="col-xs-5"
          >
            <div class="comm_label">
              {{ frame0.bbsCategoryItemNm }}
            </div>
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_RGST_USR')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              <cmp-user-name-link
                :pageId="this.$options.name"
                :displayType="'1'"
                :displayLanguageId="displayLanguageId"
                :knoxId="knoxId"
                :loginId="loginId"
                :userName="userName"
                :userGlobalName="userGlobalName"
                :departmentName="departmentName"
                :departmentEnglishName="departmentEnglishName"
                :type="'link'"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_RGST_DTM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ frame0.firstRegistrationDTM }}
            </div>
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_VIEW_CNT')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ frame0.qnaNoticeObjSearchedContent }}
            </div>
          </div>
        </div>
      </div>
      <div class="mrB10" />
      <sui-web-editor
        ref="myEditor"
        :isViewer="true"
        @loaded="getQNAInfoByPostId"
      />
      <div class="mrB10" />
      <cmp-file-attacher
        ref="fileAttacher"
        :pageId="this.$options.name"
        :showAddDeleteBtn="false"
        :showUpDownArrowBtn="false"
        :showDDRegion="false"
        :attachGroupId="'ATG_CLB_BBS_COMMON'"
        :attachDocumentId="attachDocumentId"
        :customAttachRestrictionSize="attachRestrictSize"
      />
      <div class="mrB15" />
      <div
        v-if="answerUseYn === 'Y'"
        class="comment_wrap"
      >
        <ul class="comment_list">
          <li
            v-for="answer in postAnswers"
            :key="answer.answerId"
          >
            <ur-drop-holder
              v-if="answer.parentAnswerId==='' && isSameAuthorOrBBSADMIN(answer.knoxId) && answer.answerId!==''
                && !answer.editable && answer.deleteYn === 'N'"
              class="fl_r"
              :items="[
                { text: $t('MSG_BTN_MDFC'), value: `MOD_${answer.answerId}` },
                { text: $t('MSG_BTN_DEL'), value: `DEL_${answer.answerId}` },
              ]"
              @input="onClickTooltip"
            >
              <ur-icon
                icon="more"
                anchor
                small
                icon-type="line"
                style="cursor: pointer;"
              />
            </ur-drop-holder>
            <a
              v-if="answer.parentAnswerId===''"
              class="comment_nick"
            >
              <cmp-user-name-link
                :pageId="contextPageId"
                :displayType="'1'"
                :displayLanguageId="answer.displayLanguageId"
                :userId="answer.firstRegistrationUserId"
                :loginId="answer.firstRegistrationLoginId"
                :userName="answer.userName"
                :userGlobalName="answer.userGlobalName"
                :departmentName="answer.departmentName"
                :departmentEnglishName="answer.departmentEnglishName"
                :type="'link'"
              />
            </a>
            <!-- 신규 등록 -->
            <div
              v-if="answer.answerId===''"
              class="mrT10"
            />
            <textarea
              v-if="answer.parentAnswerId==='' && (answer.answerId==='' || answer.editable)"
              v-model="answer.answerContent"
            />
            <!-- 기존 조회 -->
            <div
              v-if="answer.answerId!=='' && answer.parentAnswerId==='' && !answer.editable"
              class="comm_label"
            >
              {{ answer.answerContent }}
            </div>
            <div
              v-if="answer.answerId!=='' && answer.parentAnswerId===''"
              class="comment_date"
            >
              {{ answer.firstRegistrationDTM }}
            </div>
            <div v-if="answer.parentAnswerId===''" class="comment_wrapR">
              <sui-button
                v-if="answer.answerId!=='' && !answer.editable && answer.deleteYn==='N'"
                type="button"
                class="btn_innerTbl_border"
                @click="onClickReply(answer.answerId, answer.addReplyFlag)"
              >
                {{ answer.addReplyFlag ? $t('MSG_BTN_CANCEL_COMMENT') : $t('MSG_BTN_COMMENT') }}
              </sui-button>
              <!-- 신규 등록 -->
              <sui-button
                v-if="answer.answerId===''"
                type="button"
                class="btn_innerTbl_border"
                @click="registReply(answer.answerContent, '')"
              >
                {{ $t('MSG_BTN_RGST') }}
              </sui-button>
              <!-- 수정 -->
              <sui-button
                v-if="answer.answerId!=='' && answer.editable"
                type="button"
                class="btn_innerTbl_border"
                @click="onClickModifyCancelReply(answer.answerId)"
              >
                {{ $t('MSG_BTN_CANCEL') }}
              </sui-button>
              <sui-button
                v-if="answer.answerId!=='' && answer.editable"
                type="button"
                class="btn_innerTbl_border"
                @click="modifyReply(answer.answerId, answer.answerContent)"
              >
                {{ $t('MSG_BTN_RGST') }}
              </sui-button>
            </div>
            <!-- 댓글 클릭 시 -->
            <div
              v-if="answer.addReplyFlag && answer.parentAnswerId===''"
              class="mrB10"
            />
            <span
              v-if="answer.addReplyFlag && answer.parentAnswerId===''"
              class="ico_reply"
            />
            <div
              v-if="answer.addReplyFlag && answer.parentAnswerId===''"
              class="comment_write reply"
            >
              <cmp-user-name-link
                :pageId="contextPageId"
                :displayType="'1'"
                :displayLanguageId="sessionInfo.displayLangId"
                :userId="sessionInfo.userId"
                :loginId="sessionInfo.loginId"
                :userName="sessionInfo.userName"
                :userGlobalName="sessionInfo.userGlobalName"
                :departmentName="sessionInfo.departmentName"
                :departmentEnglishName="sessionInfo.departmentEnglishName"
                :type="'link'"
              />
              <div class="mrT10" />
              <textarea v-model="answer.childAnswerContent" />
              <div class="comment_wrapR">
                <sui-button
                  type="button"
                  class="btn_innerTbl_border"
                  @click="registReply(answer.childAnswerContent, answer.answerId)"
                >
                  {{ $t('MSG_BTN_RGST') }}
                </sui-button>
              </div>
            </div>
            <!-- 대댓글 형식 -->
            <span v-if="answer.parentAnswerId!==''" class="ico_reply" />
            <div v-if="answer.parentAnswerId!==''" class="comment_reply">
              <ur-drop-holder
                v-if="isSameAuthorOrBBSADMIN(answer.knoxId) && answer.answerId!==''
                  && !answer.editable && answer.deleteYn === 'N'"
                :items="[
                  { text: $t('MSG_BTN_MDFC'), value: `MOD_${answer.answerId}` },
                  { text: $t('MSG_BTN_DEL'), value: `DEL_${answer.answerId}` },
                ]"
                class="fl_r"
                @input="onClickTooltip"
              >
                <ur-icon
                  icon="more"
                  anchor
                  small
                  icon-type="line"
                  style="cursor: pointer;"
                />
              </ur-drop-holder>
              <a class="comment_nick">
                <cmp-user-name-link
                  :pageId="contextPageId"
                  :displayType="'1'"
                  :displayLanguageId="answer.displayLanguageId"
                  :userId="answer.firstRegistrationUserId"
                  :loginId="answer.firstRegistrationLoginId"
                  :userName="answer.userName"
                  :userGlobalName="answer.userGlobalName"
                  :departmentName="answer.departmentName"
                  :departmentEnglishName="answer.departmentEnglishName"
                  :type="'link'"
                />
              </a>
              <!-- 기존 조회 -->
              <textarea
                v-if="answer.editable"
                v-model="answer.answerContent"
              />
              <div
                v-if="answer.answerId!=='' && !answer.editable"
                class="comm_label"
              >
                <span v-if="answer.parentAnswerId!==''" class="author"><strong>RE:</strong> {{ answer.parentRegistrationUserName }}</span>
                {{ answer.answerContent }}
              </div>
              <div
                v-if="answer.answerId!==''"
                class="comment_date"
              >
                {{ answer.firstRegistrationDTM }}
              </div>
              <div class="comment_wrapR">
                <sui-button
                  v-if="answer.answerId!=='' && !answer.editable && answer.deleteYn==='N'"
                  type="button"
                  class="btn_innerTbl_border"
                  @click="onClickReply(answer.answerId, answer.addReplyFlag)"
                >
                  {{ answer.addReplyFlag ? $t('MSG_BTN_CANCEL_COMMENT') : $t('MSG_BTN_COMMENT') }}
                </sui-button>
                <!-- 수정 -->
                <sui-button
                  v-if="answer.answerId!=='' && answer.editable"
                  type="button"
                  class="btn_innerTbl_border"
                  @click="onClickModifyCancelReply(answer.answerId)"
                >
                  {{ $t('MSG_BTN_CANCEL') }}
                </sui-button>
                <sui-button
                  v-if="answer.answerId!=='' && answer.editable"
                  type="button"
                  class="btn_innerTbl_border"
                  @click="modifyReply(answer.answerId, answer.answerContent)"
                >
                  {{ $t('MSG_BTN_RGST') }}
                </sui-button>
              </div>
              <!-- 댓글 클릭 시 -->
              <div
                v-if="answer.addReplyFlag"
                class="mrB10"
              />
              <span
                v-if="answer.addReplyFlag"
                class="ico_reply"
              />
              <div
                v-if="answer.addReplyFlag"
                class="comment_write reply"
              >
                <cmp-user-name-link
                  :pageId="contextPageId"
                  :displayType="'1'"
                  :displayLanguageId="sessionInfo.displayLangId"
                  :userId="sessionInfo.userId"
                  :loginId="sessionInfo.loginId"
                  :userName="sessionInfo.userName"
                  :userGlobalName="sessionInfo.userGlobalName"
                  :departmentName="sessionInfo.departmentName"
                  :departmentEnglishName="sessionInfo.departmentEnglishName"
                  :type="'link'"
                />
                <div class="mrT10" />
                <textarea v-model="answer.childAnswerContent" />
                <div class="comment_wrapR">
                  <sui-button
                    type="button"
                    class="btn_innerTbl_border"
                    @click="registReply(answer.childAnswerContent, answer.answerId)"
                  >
                    {{ $t('MSG_BTN_RGST') }}
                  </sui-button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="mrB15" />
      <div class="comm_btn_wrap">
        <sui-button
          v-if="isSameAuthorOrBBSADMIN(postUserId)"
          type="button"
          class="comm_btn_border"
          @click="onClickDelete()"
        >
          {{ $t('MSG_BTN_DEL') }}
        </sui-button>
        <sui-button
          v-if="totalModificationPermissionYn === 'Y' || isSameAuthorOrBBSADMIN(postUserId)"
          type="button"
          class="comm_btn_solid"
          @click="onClickModify();"
        >
          {{ $t('MSG_BTN_MDFC') }}
        </sui-button>
        <sui-button
          v-permission:create="contextPageId"
          type="button"
          class="comm_btn_solid"
          @click="onScrapClick"
        >
          {{ $t("MSG_BTN_SCRAP") }}
        </sui-button>
        <sui-button
          v-permission:print="contextPageId"
          type="button"
          class="comm_btn_solid"
          @click="onPrintClick"
        >
          {{ $t("MSG_BTN_PRTG") }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onClickCancel()"
        >
          {{ $t('MSG_BTN_CANCEL') }}
        </sui-button>
      </div>
    </sui-page-contents>
    <sui-page-footer />
  </sui-page>
</template>
<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CLB_00020', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  data() {
    return {};
  },
  props: {
    pageInitialData: {
      type: Object,
    },
    closePagePopup: {
      type: Function,
    },
  },
  computed: {},
  watch: {},
  datasets: [],
  beforeMount() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
</style>
