<template>
  <sui-page class="custom_page">
    <sui-page-header2 :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <!-- 스케줄러 정보 -->
        <h4>{{ $t('MSG_TXT_SCHEDULER_INFO') }}</h4>
      </div>
      <ur-form-box toggleable>
        <!-- 스케줄명 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_SCHEDULE_NAME')"
          :label-align="'right'"
          :required="insertMode"
          
          style="width: 50%; height: auto"
        >
          <ur-text-field
              v-model="detail.scheduleName"
              style="width: 100%;"
              maxlength="50"
              :placeholder="$t('MSG_TXT_SCHEDULE_NAME')"
              :disabled="!insertMode"/>
        </ur-form-item>
        <!-- 설명 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_DTST_COL_CNTN')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto"
        >
          <ur-text-field
            v-model="detail.descrtValue"
            style="width: 100%;"
            maxlength="50"
            :placeholder="$t('MSG_TXT_DTST_COL_CNTN_PLACE_HOLDER')"
            :disabled="!insertMode"
          />
        </ur-form-item>
        <!-- Cron EXP -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_CRON_EXP')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto"
        >
          <ur-text-field
            v-model="detail.cronExpressionValue"
            style="width: 100%;"
            maxlength="120"
            :placeholder="$t('MSG_TXT_CRON_EXP_PLACE_HOLDER')"
          />
        </ur-form-item>
        <!-- 사용 여부 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_DTST_USE_YN')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto"
        >
          <ur-radio-wrapper
            v-model="detail.useYn"
            :items="useItems"
            sm
          />
        </ur-form-item>
        <!-- Trigger Name -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_TRIGGER_NAME')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto"
        >
          <ur-text-field
            v-model="detail.triggerName"
            style="width: 100%;"
            maxlength="100"
            :disabled="!insertMode"
            :placeholder="$t('MSG_TXT_TRIGGER_NAME_PLACE_HOLDER')"
          />
        </ur-form-item>
        <!-- Trigger Group -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_TRIGGER_GROUP_NAME')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto"
        >
          <ur-text-field
            v-model="detail.triggerGrpValue"
            style="width: 100%;"
            maxlength="100"
            :disabled="!insertMode"
            :placeholder="$t('MSG_TXT_TRIGGER_GROUP_NAME_PLACE_HOLDER')"
          />
        </ur-form-item>
        <!-- Job Name -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_JOB_NAME')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto"
        >
          <ur-text-field
            v-model="detail.jobName"
            style="width: 100%;"
            maxlength="100"
            :disabled="!insertMode"
            :placeholder="$t('MSG_TXT_JOB_NAME_PLACE_HOLDER')"
          />
        </ur-form-item>
        <!-- Job Group -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_JOB_GROUP_NAME')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto"
        >
          <ur-text-field
            v-model="detail.jobGrpValue"
            style="width: 100%;"
            maxlength="100"
            :disabled="!insertMode"
            :placeholder="$t('MSG_TXT_JOB_GROUP_NAME_PLACE_HOLDER')"
          />
        </ur-form-item>
        <!-- Class명 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_CLASS_NAME')"
          :label-align="'right'"
          required
          style="width: 50%; height: auto"
        >
          <ur-text-field
            v-model="detail.className"
            style="width: 100%;"
            maxlength="150"
            :disabled="!insertMode"
            :placeholder="$t('MSG_TXT_CLASS_NAME_PLACE_HOLDER')"
          />
        </ur-form-item>
        <!-- 배치프로그램ID -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_BATCH_PROGRAM_ID')"
          :label-align="'right'"
          :disabled="!insertMode"
          required
          style="width: 50%; height: auto"
        >
          <ur-text-field
            v-model="detail.batchProgramId"
            style="width: 100%;"
            maxlength="20"
            :disabled="!insertMode"
            :placeholder="$t('MSG_TXT_BATCH_PROGRAM_ID')"
          />
        </ur-form-item>
      </ur-form-box>

      <!-- S::컨텐츠2 -->
      <template v-if="!insertMode">
        <div class="comm_title_wrap mt25">
          <!-- 스케줄러 실행 이력 -->
          <h4>{{$t('MSG_TXT_SCHEDULER_RUN_HISTORY')}}</h4>
          <!--S:: 타이틀 오른쪽 total info -->
          <div class="right_box">
            <div class="totalNo">
              <div class="totalCt">Total<span>{{ totalCnt }}</span>{{ $t("MSG_TXT_CNT") }}</div>
            </div>
          </div>
          <!--E:: 타이틀 오른쪽 total info -->
        </div>
        <real-grid
          ref="pgeBss00003Grid"
          grid-id="pgeBss00003Grid"
          grid-root="/lib"
          :gridFields="gridFields"
          :gridColumns="gridColumns"
          :style="{ height: '400px' }"
        />
      </template>

      <div class="btn_wrap mt10">
        <div class="right_box">
          <!-- 목록 -->
          <ur-button @click="goToList"> {{ $t('MSG_BTN_LIST') }} </ur-button>
          <!-- 수동실행 -->
          <ur-button v-if="!insertMode" @click="manualProcess"> {{ $t('MSG_TXT_MANUAL_PROCESS') }} </ur-button>
          <!-- 새로고침 -->
          <ur-button v-if="!insertMode" v-permission:read="this.$options.name" @click="search"> {{ $t('MSG_TXT_REFRESH') }} </ur-button> 
          <!-- 저장 -->
          <ur-button v-permission:create="this.$options.name" color="violet" @click="save"> {{ $t('MSG_BTN_SAVE') }} </ur-button>
        </div>
      </div>
      <!-- E::컨텐츠2-->

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_BSS_00003", // eslint-disable-line vue/name-property-casing
  components: {},
  data() {
    return {
      searchParams: {
        scheduleName: '',
      },
      CODE_KEYS: ['COD_A1'],
      codes: {
        COD_A1: [],
      },
      insertMode: false,
      detail: {
        scheduleName: '',
        descrtValue: '',
        cronExpressionValue: '',
        useYn: '',
        triggerName: '',
        triggerGrpValue: '',
        jobName: '',
        jobGrpValue: '',
        className: '',
        batchProgramId: '',
        executeHistory: [],
      },
      newdetail: {
        scheduleName: '',
        descrtValue: '',
        cronExpressionValue: '',
        useYn: '',
        triggerName: '',
        triggerGrpValue: '',
        jobName: '',
        jobGrpValue: '',
        className: '',
        batchProgramId: '',
        executeHistory: [],
      },
      gridDataList: [],      
      gridFields: [],
      gridColumns: [],
      totalCnt : 0,
      TTT: '123123',
    };
  },
  computed: {
    useItems() {
      const rtn = [];
      rtn.push({ value: "Y", text: "사용" });
      rtn.push({ value: "N", text: "미사용" });
      return rtn;
    },
  },
  watch: {},
  created() {
    this.selectCode();
    const params = utils.getParameter(this, 'params')
    if (params.batchCd) {
      this.batchCd = params.batchCd
      this.selectDetail()
    } else if (params.insertMode) {
      this.insertMode = params.insertMode
      this.detail = JSON.parse(JSON.stringify(this.newdetail))
    } else if (window.location.href.indexOf('PGE_BSS_00003') > 0) {
      this.insertMode = true
      this.detail = JSON.parse(JSON.stringify(this.newdetail))
    } else {
      utils.goPage('PGE_BSS_00002')
    }
    // if (!params) {
    //   this.goToList()
    // } else if (params.batchCd) {
    //   this.batchCd = params.batchCd
    //   this.selectDetail()
    // } else {
    //   this.insertMode = true
    //   this.detail = JSON.parse(JSON.stringify(this.newdetail))
    // }

    this.gridFields = [
      { fieldName: "startDtm", dataType: "datetime", datetimeFormat: "yyyyMMddhhmmss" }, // 시작시간
      { fieldName: "endDtm", dataType: "datetime", datetimeFormat: "yyyyMMddhhmmss" },   // 종료시간
      { fieldName: "runTime", dataType: "text" },                                        // 수행시간
      { fieldName: "statusCd", dataType: "text" },                                       // 성공여부
    ];
    this.gridColumns = [
      {
        // 시작시간
        name: "startDtmColumn",
        fieldName: "startDtm",
        width: 100,
        header: { text: this.$t("MSG_TXT_START_TIME") },
        datetimeFormat: 'yyyy-MM-dd HH:mm:ss',
      },
      {
        // 종료시간
        name: "endDtmColumn",
        fieldName: "endDtm",
        width: 100,
        header: { text: this.$t("MSG_TXT_END_TIME") },
        datetimeFormat: 'yyyy-MM-dd HH:mm:ss',
      },
      {
        // 수행시간
        name: "runTimeColumn",
        fieldName: "runTime",
        width: 100,
        header: { text: this.$t("MSG_TXT_RUN_TIME") },
      },
      {
        // 성공여부
        name: "statusCdColumn",
        fieldName: "statusCd",
        width: 100,
        header: { text: this.$t("MSG_TXT_SUCCESS_YN") },
      },
    ];
  },
  mounted() {},
  methods: {
    // 공통코드 가져오기
    async selectCode() {
      await http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)
    },
    // 목록화면으로 페이지 이동
    goToList() {
      const params = utils.getParameter(this, 'params')
      if (params.batchCd) {
        delete params.batchCd
      }
      //params.fromProgramId = 'PGE_BSS_00003'
      utils.goPage('PGE_BSS_00002', { params })
    },
    // 배치작업정보 상세 조회
    selectDetail() {
      // /api/v1/batch-mngs/{batch-cd}
      http.request(this.$options.name, 'DTS_BSS_00004', {
        path: {
          'batch-cd': this.batchCd,
        },
      }).then(res => {
        if (res.data) {
          this.detail.batchCd = res.data.batchCd
          this.detail.scheduleName = res.data.scheduleName
          this.detail.descrtValue = res.data.descrtValue
          this.detail.cronExpressionValue = res.data.cronExpressionValue
          this.detail.useYn = res.data.useYn
          this.detail.triggerName = res.data.triggerName
          this.detail.triggerGrpValue = res.data.triggerGrpValue
          this.detail.jobName = res.data.jobName
          this.detail.jobGrpValue = res.data.jobGrpValue
          this.detail.className = res.data.className
          this.detail.batchProgramId = res.data.batchProgramId
        }
      }).catch(error => {
        console.log(error)
      })
      this.search()
    },
    // 저장처리
    save() {
      if (!this.validate()) {
        return
      }
      const param = {
        scheduleName: this.detail.scheduleName,
        descrtValue: this.detail.descrtValue,
        cronExpressionValue: this.detail.cronExpressionValue,
        useYn: this.detail.useYn,
        triggerName: this.detail.triggerName,
        triggerGrpValue: this.detail.triggerGrpValue,
        jobName: this.detail.jobName,
        jobGrpValue: this.detail.jobGrpValue,
        className: this.detail.className,
        batchProgramId: this.detail.batchProgramId,
      }
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => { // 저장하시겠습니까?
        if (this.batchCd) {
          param.batchCd = this.batchCd
          this.update(param)
        } else {
          this.insert(param)
        }
      })
    },
    // 필수값 체크
    validate() {
      if (_.isEmpty(this.detail.scheduleName)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_SCHEDULE_NAME')))
        return false
      }
      if (_.isEmpty(this.detail.descrtValue)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_DTST_COL_CNTN')))
        return false
      }
      if (_.isEmpty(this.detail.cronExpressionValue)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_CRON_EXP')))
        return false
      }
      if (_.isEmpty(this.detail.useYn)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_USE_YN')))
        return false
      }
      if (_.isEmpty(this.detail.triggerName)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_TRIGGER_NAME')))
        return false
      }
      if (_.isEmpty(this.detail.triggerGrpValue)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_TRIGGER_GROUP_NAME')))
        return false
      }
      if (_.isEmpty(this.detail.jobName)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_JOB_NAME')))
        return false
      }
      if (_.isEmpty(this.detail.jobGrpValue)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_JOB_GROUP_NAME')))
        return false
      }
      if (_.isEmpty(this.detail.className)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_CLASS_NAME')))
        return false
      }
      if (_.isEmpty(this.detail.batchProgramId)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_BATCH_PROGRAM_ID')))
        return false
      }
      return true
    },
    // 등록 처리
    insert(param) {
      // /api/v1/batch-mngs
      http.request(this.$options.name, 'DTS_BSS_00005', {
        data: param,
      }).then(res => {
        if (res.data) {
          if (res.data === 1) {
            // 저장되었습니다.
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
            this.goToList()
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 수정처리
    update(param) {
      // /api/v1/batch-mngs
      http.request(this.$options.name, 'DTS_BSS_00006', {
        data: param,
      }).then(res => {
        if (res.data) {
          if (res.data === 1) {
            // 저장되었습니다.
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
            this.goToList()
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 배치작업 실행이력 조회
    search() {
      // /api/v1/batch-mngs/{batch-cd}/history
      http.request(this.$options.name, 'DTS_BSS_00007', {
        path: {
          'batch-cd': this.batchCd,
        },
        query: {},
      }).then(res => {
        if (res.data) {
          this.totalCnt = utils.numberWithCommas(res.data.length);
          this.gridDataList = res.data;
          this.$refs.pgeBss00003Grid.setRows(res.data);
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 배치 수동실행
    manualProcess() {
      // 배치 수동 실해 팝업 호출
      utils.openLayerPopup("PGE_BSS_00004", this.onPopupCallback, {
        size: "lg",
      });
    },
    // 팝업 콜백
    onPopupCallback(data) {
      // 수동으로 실행하시겠습니까? 수행시간은 최대 5분 예정입니다.
      utils.messageBox(
        "confirm",
        this.$t("MSG_TXT_CONFIRM_PROCESS"),
        null,
        (/* ok */) => {
          const params = {
            batchProgramId: this.detail.batchProgramId,
            paramInfo : data
          }
          // /api/v1/batch-mngs/manual-run
          http.request(this.$options.name, 'DTS_BSS_00008', {
            data: params,
          }).then(res => {
          }).catch(error => {
            console.log(error)
          })
        },
        (/* cancel */) => {}
      );
    },
  },
};
</script>
<style scoped></style>
