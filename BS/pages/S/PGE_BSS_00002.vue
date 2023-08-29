<template>
  <sui-page class="custom_page">
    <sui-page-header2 :pageId="this.$options.name" />
    <sui-page-contents>
      <!-- S::컨텐츠1 -->
      <ur-form-box toggleable>
        <!-- 스케줄명 -->
        <ur-form-item
          :label="$t('MSG_TXT_SCHEDULE_NAME')"
          :label-align="'right'"
          style="width: 100%; height: auto"
          class="flex_wrap"
        >
          <ur-text-field
            ref="scheduleName"
            v-model="searchParams.scheduleName"
            style="width: 50%;"
            maxlength="150"
            @keyup="specialChar"
            @keyup.enter="onClickSearch"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <!-- 초기화 -->
          <ur-button @click="init">{{ $t("MSG_BTN_RESET") }}</ur-button>
          <!-- 조회 -->
          <ur-button
            color="violet"
            v-permission:read="this.$options.name"
            @click="onClickSearch"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </ur-button>
        </div>
      </div>
      <!-- E::컨텐츠1-->

      <!-- S::컨텐츠2 -->
      <div class="comm_title_wrap mt25">
        <!-- 배치작업리스트 -->
        <h4>{{ $t("MSG_TIT_BATCH_WORK_LIST") }}</h4>
        <!--S:: 타이틀 오른쪽 total info -->
        <div class="right_box">
          <div class="totalNo">
            <div class="totalCt">Total<span>{{ totalCnt }}</span>{{ $t("MSG_TXT_CNT") }}</div>
          </div>
        </div>
        <!--E:: 타이틀 오른쪽 total info -->
      </div>
      <real-grid
        ref="pgeBss00002Grid"
        grid-id="pgeBss00002Grid"
        grid-root="/lib"
        :gridFields="gridFields"
        :gridColumns="gridColumns"
        :gridCellClick="gridCellClick"
        :style="{ height: '580px' }"
        :gridCheckBar="{ visible: true }"
      />
      <div class="btn_wrap mt10">
        <div class="right_box">
          <!-- 삭제 -->
          <ur-button v-permission:delete="this.$options.name" @click="deleteSelected">{{ $t('MSG_TXT_DEL') }}</ur-button>
          <!-- 신규 -->
          <ur-button v-permission:create="this.$options.name" @click="createNew" color="violet">{{ $t('MSG_BTN_NEW') }}</ur-button>
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
  name: "PGE_BSS_00002",
  components: {}, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      searchParams: {
        scheduleName: '',
      },
      initSearchParam: {
        scheduleName: '',
      },
      gridDataList: [],      
      gridFields: [],
      gridColumns: [],
      totalCnt: 0,
      selectRow: 0,
    };
  },
  created() {
    const params = utils.getParameter(this, 'params')
    if (params) {
      this.searchParams = params
    }
    this.gridFields = [
      { fieldName: "scheduleName", dataType: "text" },         // 스케줄명
      { fieldName: "batchProgramId", dataType: "text" },       // 배치프로그램ID
      { fieldName: "cronExpressionValue", dataType: "text" },  // Cron Exp
      { fieldName: "useYn", dataType: "text" },                // 사용여부
      { fieldName: "descrtValue", dataType: "text" },          // 설명
      // 등록일시
      { fieldName: "fstRgstDtm",                               
        dataType: "datetime", 
        datetimeFormat: "yyyyMMddhhmmss" },           
      { fieldName: "fstRgstUsrId", dataType: "text" },         // 등록자
      // 수정일시
      { fieldName: "fnlMdfcDtm",                               
        dataType: "datetime", 
        datetimeFormat: "yyyyMMddhhmmss" },           
      { fieldName: "fnlMdfcUsrId", dataType: "text" },         // 수정자
    ];
    this.gridColumns = [
      {
        // 스케줄명
        name: "scheduleNameColumn",
        fieldName: "scheduleName",
        width: 200,
        styleName: 'popup_render align-left',
        renderer: { showTooltip: true },
        header: { text: this.$t("MSG_TXT_SCHEDULE_NAME") },
        styles: { textAlignment: "near" },
      },
      {
        // 배치프로그램ID
        name: "batchProgramIdColumn",
        fieldName: "batchProgramId",
        width: 100,
        header: { text: this.$t("MSG_TXT_BATCH_PROGRAM_ID") },
      },
      {
        // Cron Exp
        name: "cronExpressionValueColumn",
        fieldName: "cronExpressionValue",
        width: 100,
        header: { text: this.$t("MSG_TXT_CRON_EXP") },
      },
      {
        // 사용여부
        name: "useYnColumn",
        fieldName: "useYn",
        width: 100,
        header: { text: this.$t("MSG_TXT_DTST_USE_YN") },
      },
      {
        // 설명
        name: "descrtValueColumn",
        fieldName: "descrtValue",
        width: 100,
        styleName: 'align-left',
        renderer: {
          showTooltip: true,
        },
        header: { text: this.$t("MSG_TXT_DTST_COL_CNTN") },
      },
      {
        // 등록일시
        name: "fstRgstDtmColumn",
        fieldName: "fstRgstDtm",
        width: 120,
        header: { text: this.$t("MSG_TXT_FST_RGST_DTM") },
        datetimeFormat: 'yyyy-MM-dd HH:mm:ss',
      },
      {
        // 등록자
        name: "fstRgstUsrIdColumn",
        fieldName: "fstRgstUsrId",
        width: 100,
        header: { text: this.$t("MSG_TXT_FST_RGST_USR") },
        displayCallback: function(grid, index, value){
            // 양끝 제외 마스킹
            let tmp = value;
            if (!utils.isEmpty(tmp)) {
              if (tmp.length === 2) {
                tmp = tmp.substr(0,1) + '*';
              } else if (tmp.length > 2) {
                let targetNm = value.split('');
                targetNm.forEach(function(data, i) {
                  if (i === 0 || i === targetNm.length - 1) return;
                  targetNm[i] = '*';
                });
                tmp = targetNm.join();
                tmp = tmp.replace(/,/g, '');
              }
            }
            return tmp;
          }
      },
      {
        // 수정일시
        name: "fnlMdfcDtmColumn",
        fieldName: "fnlMdfcDtm",
        width: 120,
        header: { text: this.$t("MSG_TXT_MDFC_DTM") },
        datetimeFormat: 'yyyy-MM-dd HH:mm:ss',
      },
      {
        // 수정자
        name: "fnlMdfcUsrIdColumn",
        fieldName: "fnlMdfcUsrId",
        width: 100,
        header: { text: this.$t("MSG_TXT_MDFC_USR") },
        displayCallback: function(grid, index, value){
            // 양끝 제외 마스킹
            let tmp = value;
            if (!utils.isEmpty(tmp)) {
              if (tmp.length === 2) {
                tmp = tmp.substr(0,1) + '*';
              } else if (tmp.length > 2) {
                let targetNm = value.split('');
                targetNm.forEach(function(data, i) {
                  if (i === 0 || i === targetNm.length - 1) return;
                  targetNm[i] = '*';
                });
                tmp = targetNm.join();
                tmp = tmp.replace(/,/g, '');
              }
            }
            return tmp;
          }
      },
    ];
  },
  watch:{},
  mounted(){
    const params = utils.getParameter(this, 'params')
    if (params.fromProgramId) {
      delete params.fromProgramId
    }
    this.search()
  },
  methods: {
    // 특수문자 체크
    specialChar() {
      const searchNewText = utils.trim(this.searchParams.scheduleName);
      if (utils.isExistSpecialChar(searchNewText)) {
        // `-_{}[];:<>/? 제외 특수문자는 입력할 수 없습니다.
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.searchParams.scheduleName = ''
        });
      }
    },
    // 초기화 버튼 이벤트
    init() {
      this.searchParams = JSON.parse(JSON.stringify(this.initSearchParam));
      this.$refs.scheduleName.focus();
    },
    getSearchParam() {
      const params = {
        scheduleName: utils.trim(this.searchParams.scheduleName)
      }
      return params
    },
    // 조회버튼 클릭 이벤트
    onClickSearch() {
      this.search()
    },
    // 조회 처리
    search() {
      const squery = this.getSearchParam()
      // /api/v1/batch-mngs
      http.request(this.$options.name, 'DTS_BSS_00002', {
        query: squery,
      }).then(res => {
        if (res.data) {
          this.totalCnt = utils.numberWithCommas(res.data.length);
          this.gridDataList = res.data;
          this.$refs.pgeBss00002Grid.setRows(res.data);
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 삭제 처리
    deleteSelected() {
      const checkedIdxList = this.$refs.pgeBss00002Grid.gridView.getCheckedRows(true);
      console.log(checkedIdxList)

      if (checkedIdxList.length == 0) {
        // 삭제할 데이터를 선택하세요.
        utils.messageBox('alert', this.$t('MSG_ALT_DEL_NO_DATA')) 
        return
      }
      const pathData = []
      _.forEach(checkedIdxList, idx => {
        let {
                batchCd,
                ...data
              } = this.gridDataList[idx];
        pathData.push(batchCd)
      })

      // 삭제 하시겠습니까?
      // /api/v1/batch-mngs/{batch-cd}
      utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
        http.request(this.$options.name, 'DTS_BSS_00003', {
          path: {
            'batch-cd': pathData.join(','),
          },
        }).then(res => {
          if (res.data) {
            // 삭제 되었습니다.
            utils.messageBox('alert', this.$t('MSG_ALT_DELETED')) 
            this.onClickSearch()
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    // 리얼그리드 셀 클릭 이벤트
    gridCellClick(grid, data) {
      if (data.column === 'scheduleNameColumn') {
        // 스케줄명 클릭시
        const params = {
          ...this.searchParams,
          batchCd: this.gridDataList[data.dataRow].batchCd,
        }
        utils.goPage('PGE_BSS_00003', { params })
      }
    },
    // 신규등록 처리
    createNew() {
      this.searchParams.insertMode = true
      const params = {
        ...this.searchParams,
      }
      utils.goPage('PGE_BSS_00003', { params })
    },
  }
};
</script>
<style scoped></style>
