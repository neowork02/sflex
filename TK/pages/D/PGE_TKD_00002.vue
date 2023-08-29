<template>
  <sui-page class="custom_page">
    <sui-page-header2 :pageId="this.$options.name" />
    <sui-page-contents>
      <!-- S::컨텐츠1 -->
      <ur-form-box toggleable>
        <!-- 검색구분 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_SEARCH_CONDITION')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <div class="radioForm">
            <ur-radio
              v-model="srchFg"
              name="incondi"
              value="name"
              sm
              @click="clickRadio('name')">{{ $t('MSG_TXT_EMPL_NM') }} <!-- 성명 -->
            </ur-radio>
            <ur-radio
              v-model="srchFg"
              name="incondi"
              value="mobileTel"
              sm
              @click="clickRadio('mobileTel')"
              >{{ $t('MSG_TXT_CELL_PHONE') }} <!-- 휴대폰 -->
            </ur-radio>
            <ur-radio
              v-model="srchFg"
              name="incondi"
              value="ticketNo"
              sm
              @click="clickRadio('ticketNo')">{{ $t('MSG_TXT_TICKET_NO') }} <!-- 정기권번호 -->
             </ur-radio>
          </div>
          <ur-text-field
            ref="refSrchVal"
            v-model="srchVal"
            :disabled="isSrchValDisabled"
            :trim="true"
            @keyup="textFieldKeyup"
            class="pl16"
            :mask="inputMask"
          />
          <ur-icon-button icon="search" @click="searchMember" />
        </ur-form-item>
        <!-- 사번 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_EPNO')"
          :labelAlign="'right'"
          style="width: 50%; height: auto">
          <ur-text-field
            v-model="srchObj.empNo" 
            style="width: 100%; height: auto"
            mask="NNNNNNNNNN"
            @keyup="textFieldKeyup" />
        </ur-form-item>
        <!-- 예약방문증번호 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_RESV_VISIT_NO')"
          :labelAlign="'right'"
          style="width: 50%; height: auto">
          <ur-text-field 
            v-model="srchObj.rsvProofNo" 
            style="width: 100%; height: auto"
            mask="NNNNNNNNNNNNNNNN"
            @keyup="textFieldKeyup" />
        </ur-form-item>
        <!-- 구분 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_EMP_DIV')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-dropdown v-model="srchObj.employeeKind" :items="empKindList" />
        </ur-form-item>
        <!-- 인사확인 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_PERSONAL_CONFIRM')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-dropdown v-model="srchObj.insaEmpYn" :items="empSrchList" />
        </ur-form-item>
        <!-- 처리상태 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_PROC_STATUS')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-dropdown v-model="srchObj.prcState" :items="prcStateList" />
        </ur-form-item>
        <!-- 사유 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_ISSUE_DATE')"
          :labelAlign="'right'"
          style="width: 100%; height: auto">
          <ur-range-picker v-model="srchObj.srchDt" init="today" autoConfirm />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button 
            @click="initSrchField">{{ $t('MSG_BTN_RESET') }}</ur-button><!-- 초기화 -->
          <ur-button 
            @click="searchList"
            v-permission:read="this.$options.name">{{ $t('MSG_TXT_SRCH') }}</ur-button><!-- 조회 -->
          <ur-button 
            @click="excelFormatDownload"
            v-permission:excel="this.$options.name">{{ $t('MSG_TXT_EXCEL_FORMAT_DOWNLOAD') }}</ur-button><!-- 엑셀양식다운로드 -->
          <ur-button 
            @click="excelDownload"
            v-permission:excel="this.$options.name">{{ $t('MSG_TXT_EXCEL_DOWNLOAD') }}</ur-button><!-- 엑셀다운로드 -->
          <ur-button 
            @click="excelUpload"
            v-permission:create="this.$options.name">{{ $t('MSG_BTN_UPLOAD') }} </ur-button><!-- 업로드 -->
          <ur-button 
            @click="onSave" 
            v-permission:create="this.$options.name">{{ $t('MSG_TXT_SAVE') }}</ur-button><!-- 저장 -->
          <ur-button 
            @click="onDel" 
            color="violet"
            v-permission:create="this.$options.name">{{ $t('MSG_BTN_RMV') }}</ur-button><!-- 삭제 -->
          <input type="file" id="excelUpload" name="excelUpload" style="display:none;"/>
          <a href="/excel/임직원권업로드양식.xlsx" id="excelFormatDownload" download style="display:none;"/>
        </div>
      </div>
      <!-- E::컨텐츠1 -->
      <!-- S::컨텐츠2 -->
      <div class="comm_title_wrap mt25">
        <h4>{{ $t('MSG_TIT_TK03_MNG') }}</h4> <!-- 임직원권 조회 -->
        <!--S:: 타이틀 오른쪽 total info -->
        <div class="right_box">
          <div class="totalNo">
            <div class="totalCt">Total<span>{{ numberWithCommas(gridList.length) }}</span>{{ $t('MSG_TXT_CNT') }}</div><!-- 건 -->
          </div>
        </div>
        <!--E:: 타이틀 오른쪽 total info -->
      </div>
      <real-grid
        ref="empSrchGrid"
        grid-id="pgeTkd00002"
        grid-root="/lib"
        :gridFields="gridFields"
        :gridColumns="gridColumns"
        :gridRows="gridList"
        :style="{ height: '500px' }"
        :gridCheckBar="{ visible: true }"
        :gridImgRendererId="'renderer_imgbtn'"
        :gridImgRendererEventObj="rendererEventObj"
      />
      <!-- E::컨텐츠2 -->

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

const CODES = {
  COD_EK: { mapNm: 'empKindCdMap', listNm: 'empKindList' }, 
  COD_ES: { mapNm: 'prcStateCdMap', listNm: 'prcStateList' }, 
  COD_PARK_KIND: { mapNm: 'parkKindCdMap' }
}

export default {
  name: "PGE_TKD_00002", // eslint-disable-line vue/name-property-casing
  components: {},
  data() {
    return {
      srchVal: '',
      srchFg: 'name',
      srchObj: {
        employeeKind: '',
        prcState: '',
        insaEmpYn: '',
        empNo: '',
        rsvProofNo: '',
        memshpUid: '',
        srchDt: ['', '']
      },
      isSrchValDisabled: true,
      canSave: false,
      empKindList: [],
      prcStateList: [],
      empKindCdMap: {},
      prcStateCdMap: {},
      parkKindCdMap: {},
      empSrchList: [
        {value: '', text: this.$t('MSG_TXT_ALL')}, // 전체
        {value: 'Y', text: 'O'},
        {value: 'N', text: 'X'}
      ],
      //select box 전체
      allSelect: {value: '', text: this.$t('MSG_TXT_ALL')}, // 전체

      // 신용카드 리스트
      gridFields: [
        { fieldName: "employeeKindNm", dataType: 'text' },
        { fieldName: "empNo", dataType: 'text' },
        { fieldName: "memshpUid", dataType: 'text' },
        { fieldName: "insaEmpYn", dataType: 'text' },
        { fieldName: "remarkDesc", dataType: 'text' },
        { fieldName: "procStatusNm", dataType: 'text' },
        { fieldName: "procDate", dataType: 'text', dataType: 'datetime', datetimeFormat: "yyyyMMdd" },
        { fieldName: "rsvProofNo", dataType: 'text' },
        { fieldName: "parkKindNm", dataType: 'text' },
        { fieldName: "ticketNo", dataType: 'text' },
        { fieldName: "issueDate", dataType: 'text', dataType: 'datetime', datetimeFormat: "yyyyMMdd" },
        { fieldName: "expireDate", dataType: 'text', dataType: 'datetime', datetimeFormat: "yyyyMMdd" },
        { fieldName: "ticketStatusNm", dataType: 'text' },
        { fieldName: "fstRgstDtm", dataType: 'text', dataType: 'datetime', datetimeFormat: "yyyyMMddHHmmss" },
        { fieldName: "fstRgstUsrId", dataType: 'text' },
        { fieldName: "fnlMdfcDtm", dataType: 'text', dataType: 'datetime', datetimeFormat: "yyyyMMddHHmmss" },
        { fieldName: "fnlMdfcUsrId", dataType: 'text' },
        { fieldName: "recvTime", dataType: 'text', datetimeFormat: "yyyyMMddHHmmss" },
        { fieldName: "employeeKind", dataType: 'text' },
        { fieldName: "procStatus", dataType: 'text' },
        { fieldName: "parkKind", dataType: 'text' },
        { fieldName: "name", dataType: 'text' },
        { fieldName: "mobileTel", dataType: 'text' },
        { fieldName: "birthDate", dataType: 'text' },
      ],
      gridColumns: [
        {name: 'employeeKindNmColumn', fieldName: 'employeeKindNm', width: 100, header: {text: this.$t('MSG_TXT_DIV')}, edit: false }, // 구분
        {name: 'empNoColumn', fieldName: 'empNo', width: 100, header: {text: this.$t('MSG_TXT_EPNO')}, edit: false }, // 사번
        {name: 'memshpUidColumn', fieldName: 'memshpUid', width: 100, header: {text: this.$t('MSG_TXT_MEMSHP_INFO')}, edit: false, renderer: "renderer_imgbtn" }, // 멤버십정보
        {name: 'insaEmpYnColumn', fieldName: 'insaEmpYn', width: 100, header: {text: this.$t('MSG_TXT_PERSONAL_CONFIRM')}, edit: false }, // 인사확인
        {name: 'remarkDescColumn', fieldName: 'remarkDesc', width: 150, header: {text: this.$t('MSG_TXT_NOTE')}, edit: false, renderer: {showTooltip: true} }, // 비고
        {name: 'procStatusNmColumn', fieldName: 'procStatusNm', width: 100, header: {text: this.$t('MSG_TXT_PROC_STATUS')}, edit: false }, // 처리상태
        {name: 'procDateColumn', fieldName: 'procDate', width: 100, header: {text: this.$t('MSG_TXT_PROC_DATE')}, edit: false, datetimeFormat: 'yyyy/MM/dd' }, // 처리일자
        {name: 'rsvProofNoColumn', fieldName: 'rsvProofNo', width: 150, header: {text: this.$t('MSG_TXT_RESV_VISIT_NO')}, edit: false, renderer: {showTooltip: true} }, // 예약방문증번호
        {name: 'parkKindNmColumn', fieldName: 'parkKindNm', width: 100, header: {text: this.$t('MSG_TXT_PARK_KIND')}, edit: false }, // 파크구분
        {name: 'ticketNoColumn', fieldName: 'ticketNo', width: 100, header: {text: this.$t('MSG_TXT_TICKET_NO')}, edit: false }, // 정기권번호
        {name: 'issueDateColumn', fieldName: 'issueDate', width: 100, header: {text: this.$t('MSG_TXT_ISSUE_DATE')}, edit: false, datetimeFormat: 'yyyy/MM/dd' }, // 발급일
        {name: 'expireDateColumn', fieldName: 'expireDate', width: 100, header: {text: this.$t('MSG_TXT_EXPIRE_DATE')}, edit: false, datetimeFormat: 'yyyy/MM/dd' }, // 만기일자
        {name: 'ticketStatusNmColumn', fieldName: 'ticketStatusNm', width: 100, header: {text: this.$t('MSG_TXT_TICKET_STATUS')}, edit: false }, // 정기권상태
        {name: 'fstRgstDtmColumn', fieldName: 'fstRgstDtm', width: 150, header: {text: this.$t('MSG_TXT_RGST_DTM')}, edit: false, datetimeFormat: 'yyyy/MM/dd HH:mm:ss' }, //등록일시
        {name: 'fstRgstUsrIdColumn', fieldName: 'fstRgstUsrId', width: 100, header: {text: this.$t('MSG_TXT_RGST_USR')}, edit: false }, // 등록자
        {name: 'fnlMdfcDtmColumn', fieldName: 'fnlMdfcDtm', width: 150, header: {text: this.$t('MSG_TXT_MDFC_DTM')}, edit: false, datetimeFormat: 'yyyy/MM/dd HH:mm:ss' }, // 수정일시
        {name: 'fnlMdfcUsrIdColumn', fieldName: 'fnlMdfcUsrId', width: 100, header: {text: this.$t('MSG_TXT_EDT_PRSN')}, edit: false }, // 수정자
        {name: 'recvTime', fieldName: 'recvTime	', width: 150, header: {text: this.$t('MSG_TXT_APP_RCV_DTM')}, edit: false, datetimeFormat: 'yyyy/MM/dd HH:mm:ss' }, // APP수신일시
      ],
      gridList: [],
      rendererEventObj: {
        initContent: parent => {
          var div = document.createElement("div");
          div.className = "rg-btn-search";
          parent.appendChild(div);
        },
        canClick: () => true,
        render: (grid, model, width, height, info)  => { this._modelData = model },
        click: async event => {
          const data = this.$refs.empSrchGrid.getJsonRows()[this._modelData._index._itemIndex]

          let needCnt = 0
          if(data.birthDate) needCnt += 1
          if(data.mobileTel) needCnt += 1
          if(data.name) needCnt += 1

          if(needCnt >= 2 && !data.memshpUid) {
            await http.request(this.$options.name, "DTS_CTM_00001", {
              query: {
                name: data.name,
                mobileTel: data.mobileTel,
                birthDate: data.birthDate
              }
            }).then(res => res?.data?.length && (data.memshpUid = res.data[0].memshpUid))
          }

          if (!data?.memshpUid) {
            // 존재하지않는 멤버십정보 입니다.
            utils.messageBox("alert", utils.strFormat(this.$t('MSG_ALT_IT_NOT_EXIST'), this.$t('MSG_TXT_MEMSHP_INFO')))
            return
          }

          utils.openLayerPopup("PGE_CTM_00018", () => {}, {
            pageInitialData: {
              memshpUid: data.memshpUid
            },
            size: "lg",
          })
        },
      },
    };
  },
  created() {},
  computed: {
    // Input Mask (숫자만 입력)
    inputMask() {
      if (this.srchFg === 'ticketNo') {
        return 'N#########';
      }
    },
  },
  async mounted() {
    this.$nextTick(() => this.initSrchField()) 
    document.getElementById('excelUpload').addEventListener('change', this.handleXlsFile)
    http.getCodeList(this.$options.name, Object.keys(CODES), '').then(res => {
      for (const key in res) {
        if (CODES[key].mapNm) {
          res[key].forEach(v => this[CODES[key].mapNm][v.codeId] = v.codeName)
        }
        if (CODES[key].listNm) {
          this[CODES[key].listNm] = res[key].map(v => ({'value': v.codeId, 'text': v.codeName}))
          this[CODES[key].listNm].unshift(Object.assign({}, this.allSelect))
        }
      }
    })
  },
  methods: {
    initSrchField() {
      const currentDate = moment().format('YYYY-MM-DD')
      const lastYrDate = moment().subtract(1, 'years').format('YYYY-MM-DD')

      document.getElementById('excelUpload').value = ""
      this.isSrchValDisabled = true
      this.srchVal =  '',
      this.srchFg = 'name'
      for(let key in this.srchObj) {
        if(key != 'srchDt') this.srchObj[key] = ''
      }
      this.srchObj.srchDt = [lastYrDate, currentDate];
    },
    initDataField() {
      this.gridList = []
      this.$refs.empSrchGrid.setRows(this.gridList)
    },
    // 조회버튼 click
    clickRadio(srchFg) {
      srchFg = srchFg || this.srchFg;
      this.srchVal = "";
      this.srchObj.memshpUid = "";
      switch (srchFg) {
        case "ticketNo":
          this.isSrchValDisabled = false;
          this.$nextTick(() => this.$refs.refSrchVal.focus());
          break;
        case "mobileTel":
        case "name":
          this.isSrchValDisabled = true;
          this.srchObj[this.srchFg] = this.srchVal;
          this.openSearchFgPopup();
          break;
        default:
      }
    },
    // 멤버십팝업조회
    searchMember() {
      if (this.srchFg === "ticketNo") {
        if (!this.srchVal) {
          /* 정기권번호를 입력해주세요. */
          utils.messageBox("alert", utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_TICKET_NO')));
          this.$nextTick(() => this.$refs.refSrchVal.focus());
          return;
        }
        this.srchObj["ticketNo"] = this.srchVal;
      }
      this.openSearchFgPopup();
    },
    // 회원검색 팝업 오픈
    openSearchFgPopup() {
      utils.openLayerPopup(
        "PGE_CTM_00011",
        (result) => {
          if (result) {
            this.srchObj[this.srchFg] = result[this.srchFg];
            this.srchObj.memshpUid = result.memshpUid
            this.srchVal = result[this.srchFg];
          }
        },
        {
          pageInitialData: {
            ticketNo: this.srchFg === 'ticketNo' ? this.srchVal : ''
          },
          size: "lg",
        }
      );
    },
    textFieldKeyup(event) {
      if (event.keyCode === 13) {
        this.searchMember();
      }
    },
    inputTextRsvNo() {
      this.srchObj.rsvProofNo = this.srchObj.rsvProofNo.replace(/[^0-9]/g, '')
    },
    inputTextEmpNo() {
      this.srchObj.empNo = this.srchObj.empNo.replace(/[^A-Za-z0-9]/g, '')
    },
    //조회
    searchList() {
      const params = {
        startDt: this.srchObj.srchDt[0].replace(/-/g, ''), 
        endDt: this.srchObj.srchDt[1].replace(/-/g, ''), 
        ...this.srchObj
      }
      http.request('PGE_TKD_00002', 'DTS_TKD_00003', {
        data: params
      }).then(res => {
        this.gridList = []
        if(res.data.length > 0) {
          this.gridList = res.data;
        }
        this.$refs.empSrchGrid.setRows(this.gridList)
        this.canSave = false
      }).catch(error => console.log(error));
    },

    excelUpload() {
      document.getElementById('excelUpload').click()
    },

    excelFormatDownload(url, filename) {
      document.getElementById('excelFormatDownload').click()
    },

    excelDownload() {
      if (this.$refs.empSrchGrid.getJsonRows().length == 0) {
        // 조회된 데이터가 없습니다.
        utils.messageBox("alert", this.$t("MSG_ALT_NO_SERACH_DATA"));
        return;
      }
      this.$refs.empSrchGrid.getExcelDownload(this.$t('MSG_TIT_TK03_MNG'), "PGE_TKD_00002"); // 임직원권 조회
    },

    async onSave() {
      if (!this.canSave) {
        utils.messageBox("alert", this.$t('MSG_ALT_ATTH_FILE_NOT_UPLOAD')) // 업로드 후에 시도해주세요.
        return
      }
      const regexMobile = /^\d{9,11}$/
      const regexBirthDate = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/
      let promiseList = []
      const invalidMsgArr = []
      this.gridList.forEach((v, i) => {
        if (!this.empKindCdMap[v.employeeKind]) {
          utils.strFormat(this.$t('MSG_ALT_ROW_WRONG_FORMAT2'), i + 1, this.$t('MSG_TXT_EMP_KIND')) // 행의 사원구분이 올바르지 않습니다.
        }
        if (!this.parkKindCdMap[v.parkKind]) {
          utils.strFormat(this.$t('MSG_ALT_ROW_WRONG_FORMAT2'), i + 1, this.$t('MSG_TXT_PARK_KIND')) // 행의 파크구분이 올바르지 않습니다.
        }
        if (!v.empNo) {
          utils.strFormat(this.$t('MSG_ALT_ROW_INPUT'), i + 1, this.$t('MSG_TXT_EMP_NO')) // 행의 사번을(를) 입력하세요.
        }
        if (!v.name) {
          utils.strFormat(this.$t('MSG_ALT_ROW_INPUT'), i + 1, this.$t('MSG_TXT_NAME')) // 행의 이름을(를) 입력하세요.
        }
        if (!v.mobileTel) {
          utils.strFormat(this.$t('MSG_ALT_ROW_INPUT'), i + 1, this.$t('MSG_TXT_CELLPHONE_NO')) // 행의 휴대폰번호을(를) 입력하세요.
        } else if(!regexMobile.test(v.mobileTel)) {
          utils.strFormat(this.$t('MSG_ALT_ROW_WRONG_FORMAT2'), i + 1, this.$t('MSG_TXT_CELLPHONE_NO')) // 행의 휴대폰형식이 올바르지 않습니다.
        }
        if (!v.birthDate) {
          utils.strFormat(this.$t('MSG_ALT_ROW_INPUT'), i + 1, this.$t('MSG_TXT_BTH_DATE')) // 행의 생년월일을(를) 입력하세요.
        } else if(!regexBirthDate.test(v.birthDate)) {
          utils.strFormat(this.$t('MSG_ALT_ROW_WRONG_FORMAT2'), i + 1, this.$t('MSG_TXT_BTH_DATE')) // 행의 생년월일이 올바르지 않습니다.
        }
        
        promiseList.push(this.getMemshpInfo)
      })
      
      const resultPromises = await Promise.all(promiseList.map(async (r, i) => await r(this.gridList[i], i + 1)))
      resultPromises.reduce((acc, v) => {
        v.error && acc.push(v.error)
        return acc
      }, invalidMsgArr) 

      if (invalidMsgArr.length > 0) {
        utils.messageBox("alert",invalidMsgArr.join('\n'), null, null, null, null, true)
        return
      }

      http.request(this.$options.name, "DTS_TKD_00004", {
          data: this.gridList
      }).then(res => {
        if(res?.data?.length > 0) {
          utils.messageBox("alert", this.$t('MSG_ALT_EXEL_UP_CMPLT'), null, this.searchList) // 엑셀 업로드가 완료되었습니다.
        } else {
          utils.messageBox("alert", this.$t('MSG_ALT_EXEL_UP_FAIL'), null, this.searchList) // 엑셀 업로드를 실패하였습니다.
        }
      })
    },

    async getMemshpInfo(row, idx) {
      return new Promise((resolve, reject) => {
        http
          .request(this.$options.name, "DTS_CTM_00030", {
            query: {
              name: row.name,
              mobileTel: row.mobileTel,
              birthDate: row.birthDate
            },
          }, true)
          .then((res) => {
            if (res.data?.length <= 0) {
              row.error = utils.strFormat(this.$t('MSG_ALT_ROW_CANT_MATCH_MEMSHP'), idx) // 행 정보와 일치하는 회원이 없습니다.
            } else if (res.data.length > 1) {
              row.error = utils.strFormat(this.$t('MSG_ALT_ROW_MULTI_MATCH_MEMSHP'), idx) // 행 멤버십정보로 조회시 다건 조회됩니다.
            } else {
              row.memshpUid = res.data[0].memshpUid
            }
            resolve(row);
          }).catch(e => {
            row.error = utils.strFormat(this.$t('MSG_ALT_ROW_INVD_MEMSHP'), idx) // 행 잘못된 회원정보입니다.
            resolve(row) // promiseAll 강제로직 수행
          })
      });
    },
    onDel() {
      const checkIdx = this.$refs.empSrchGrid.getCheckedItems()
      if (checkIdx.length <= 0) {
        utils.messageBox("alert", this.$t('MSG_ALT_NOT_SEL_ITEM')) // 선택된 항목이 없습니다.
        return
      }
      
      const checkItems = this.gridList.filter((v, i) => checkIdx.includes(i))
      if(checkItems.findIndex(v => v.procStatus != 'ES01') > -1) {
        utils.messageBox("alert", this.$t('MSG_ALT_EMP_DEL_VLD_MSG')) // 진행중인건만 삭제 가능합니다.
        return
      }

      // 삭제하시겠습니까?
      if (!this.canSave) {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_DEL'), null, 
        () => {
          http.request('PGE_TKD_00002', 'DTS_TKD_00010', {
            data: checkItems
          }).then(res => {
            this.searchList()
          }).catch(error => console.log(error))
        },
        () => {})
      } else {
        this.$refs.empSrchGrid.onDelRow(checkIdx)
        this.gridList = this.$refs.empSrchGrid.getJsonRows()
      }
    },
    handleXlsFile(e) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      http.request(this.$options.name, "DTS_TKD_00009", {
        data: formData
      }).then(res => {
        this.gridList = []
        res.data.forEach(v => {
          this.gridList.push({
             procStatus : 'ES01'
            ,procStatusNm : this.prcStateCdMap['ES01']
            ,employeeKind : (v.empKind || '').trim()
            ,employeeKindNm : this.empKindCdMap[(v.empKind || '').trim()]
            ,empNo : (v.empId || '').trim()
            ,parkKind: (v.parkKind || '').trim()
            ,parkKindNm: this.parkKindCdMap[(v.parkKind || '').trim()]
            ,name: (v.name || '').trim()
            ,mobileTel: (v.mobile || '').trim()
            ,birthDate: (v.birthday || '').toString().trim()
          })
        })
        this.$refs.empSrchGrid.setRows(this.gridList)
        document.getElementById('excelUpload').value = ""
        this.canSave = true
      })
    },
    // ******* ExcelUpload End *******
    numberWithCommas(number) {
      if (number || number === 0) {
        number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return (!number && number !== 0) ? '' : number
    },
  }
};
</script>
<style scoped>
.tkd2-field { 
  width: 100%;
  min-width:50px; 
  height:32px;
}</style>
