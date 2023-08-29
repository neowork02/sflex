<template>
  <sui-page class="custom_page">
    <sui-page-header2 :pageId="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_SEARCH_JOIN_INFO')"
          :labelAlign="'right'"
          required
          style="width: 100%; height: auto"
        ><!-- 가입정보 -->
          <!-- <div style="padding:0.5em"> -->
          <div class="radioForm">
            <ur-radio
              v-model="srchFg"
              name="incondi"
              value="name"
              sm
              @click="clickRadio('name')"
              >{{$t('MSG_TXT_EMPL_NM')}}</ur-radio><!-- 성명 -->
            <ur-radio
              v-model="srchFg"
              name="incondi"
              value="mobileTel"
              sm
              @click="clickRadio('mobileTel')"
              >{{$t('MSG_TXT_CELL_PHONE')}}</ur-radio><!-- 휴대폰 --> 
            <ur-radio
              v-model="srchFg"
              name="incondi"
              value="ticketNo"
              sm
              @click="clickRadio('ticketNo')"
              >{{$t('MSG_TXT_SEASON_NO')}}</ur-radio><!-- 정기권번호 -->
            <ur-radio
              v-model="srchFg"
              name="incondi"
              value="memshpQr"
              sm
              @click="clickRadio('memshpQr')"
              >{{$t('MSG_TXT_MEMBER_QR')}}</ur-radio
            ><!-- 멤버십QR -->
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
          <ur-icon-button
            icon="search"
            style="padding-top: 0px"
            @click="openSearchFgPopup(true)"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button 
            @click="reset">{{$t('MSG_BTN_RESET')}}</ur-button><!-- 초기화 -->
          <ur-button 
            color="violet" 
            @click="search"
            v-permission:read="this.$options.name">{{$t('MSG_TXT_SRCH')}}</ur-button><!-- 조회 -->
        </div>
      </div>
      <!-- S::상세정보+비고 -->
      <div class="comm_shut_wrap mt25">
        <div class="inbox7">
          <!-- S::Inner -->
          <div class="inner">
            <div class="inbox3">
              <div class="comm_title_wrap">
                <h4 class="pr10">{{$t('MSG_TXT_PICTURE')}}</h4><!-- 사진 -->
                <ur-button 
                  color="violet" 
                  @click="clickOpenPopupFriend"
                  v-permission:read="this.$options.name">{{$t('MSG_BTN_SEARCH_FRIEND')}}</ur-button><!-- 친구조회 -->
              </div>
              <div ref="viewerArea" class="img_box" style="height:250px;">
                <div v-if="memberDetail.imgUrl" style="width:100%; height:100%;">
                  <img :src="memberDetail.imgUrl" style="height:100%;width:100%"/>
                </div>
              </div>
            </div>
            <div class="emptybox" />
            <div class="inbox7">
              <div class="comm_title_wrap">
                <h4 class="pr10">{{$t('MSG_TXT_DTL_INFO')}}</h4><!-- 상세정보 -->
                <ur-button 
                  color="violet" 
                  @click="onDreamPointPopClick"
                  v-permission:read="this.$options.name">{{$t('MSG_TXT_DREAMPOINT')}}</ur-button><!-- 드림포인트 -->
              </div>
              <ur-form-box toggleable>
                <ur-form-item
                  class="flex_wrap"
                  :label="$t('MSG_TXT_MEMBER_ID')"
                  :labelAlign="'right'"
                  style="width: 100%; height: auto"><!-- 멤버십ID -->
                  <ur-text-field
                    style="width: 100%"
                    v-model="memberDetail.memshpUid"
                    readonly
                  />
                </ur-form-item>
                <ur-form-item
                  class="flex_wrap borTop"
                  :label="$t('MSG_TXT_EMPL_NM')"
                  :labelAlign="'right'"
                  style="width: 100%; height: auto"><!-- 성명 -->
                  <ur-text-field
                    style="width: 100%"
                    v-model="memberDetail.name"
                    readonly />
                </ur-form-item>
                <ur-form-item
                  class="flex_wrap"
                  :label="$t('MSG_TXT_BTH_DATE')"
                  :labelAlign="'right'"
                  style="width: 100%; height: auto"><!-- 생년월일 -->
                  <ur-text-field
                    style="width: 100%"
                    v-model="memberDetail.birthDate"
                    readonly
                  />
                </ur-form-item>
                <ur-form-item
                  class="flex_wrap"
                  :label="$t('MSG_TXT_TEL')"
                  :labelAlign="'right'"
                  style="width: 100%; height: auto"><!-- 전화번호 -->
                  <ur-text-field
                    style="width: 100%"
                    v-model="memberDetail.mobileTel"
                    readonly
                  />
                </ur-form-item>
                <ur-form-item
                  class="flex_wrap"
                  :label="$t('MSG_TXT_CLASS_MEMBER')"
                  :labelAlign="'right'"
                  style="width: 100%; height: auto"
                ><!-- 회원구분 -->
                  <ur-text-field
                    style="width: 100%"
                    v-model="memberDetail.memberKindNm"
                    readonly
                  />
                </ur-form-item>
                <ur-form-item
                  class="flex_wrap"
                  :label="''"
                  :labelAlign="'right'"
                  style="width: 100%; height: auto"> <!-- 총가입일수 -->
                  <!-- <ur-text-field
                    style="width: 100%"
                    v-model="memberDetail.joinDesc"
                    disabled
                  /> -->
                </ur-form-item>
              </ur-form-box>
            </div>
          </div>
          <!-- E::Inner -->
        </div>
        <div class="emptybox" />
        <div class="inbox3">
          <div class="comm_title_wrap">
            <h4 class="pr10">{{$t('MSG_TXT_NOTE')}}</h4><!-- 비고 -->
            <ur-button 
              color="violet" 
              @click="onNoteMgtPopClick"
              v-permission:read="this.$options.name">{{$t('MSG_TIT_JN12_MNG')}}</ur-button><!-- 상세조회 -->
            <!--S:: 타이틀 오른쪽 total info -->
            <div class="right_box">
              <div class="totalNo">
                <div class="totalCt">Total<span>{{ this.noteGridDataList.length }}</span>{{$t('MSG_TXT_CNT')}}</div>
              </div>
            </div>
            <!--E::: 타이틀 오른쪽 total info -->
            <!-- 비고관리조회-->
          </div>
          <!-- 비고그리드-->
          <real-grid
            ref="noteGrid"
            grid-id="pgeTkd00001NoteGrid"
            grid-root="/lib"
            :gridFields="noteGridFields"
            :gridColumns="noteGridColumns"
            :gridRows="noteGridDataList"
            :gridCheckBar="{ visible:false }"
            :style="{ height: '250px' }"
          />
        </div>
      </div>
      <!-- E::회원정보+비고 -->

      <div class="comm_title_wrap mt45">
        <h4 class="pr10">{{$t('MSG_TXT_TICKET_INFO')}}</h4><!-- 정기권정보 -->
        <ur-button 
          color="violet" 
          @click="callCalculateYcnt"
          v-permission:create="this.$options.name">{{$t('MSG_TXT_YEAR_SAVE')}}</ur-button><!-- 연차적용 -->
        <!--S:: 타이틀 오른쪽 total info -->
        <div class="right_box">
          <div class="totalNo">
            <div class="totalCt">Total<span>{{ this.ticketGridDataList.length }}</span>{{$t('MSG_TXT_CNT')}}</div>
          </div>
        </div>
        <!--E::: 타이틀 오른쪽 total info -->
      </div>
      <!-- S::컨텐츠3 -->
      <!-- 정기권정보그리드 -->
      <real-grid
        ref="ticketGrid"
        grid-id="pgeTkd00001TicketGrid"
        grid-root="/lib"
        :gridFields="ticketGridFields"
        :gridColumns="ticketGridColumns"
        :gridImgRendererId="'renderer_imgbtn'"
        :gridImgRendererEventObj="rendererEventObj"
        :gridRows="ticketGridDataList"
        :gridCellClick="onCellClick"
        :style="{ height: '250px' }"
      />
      <!-- E::컨텐츠3-->

      <!-- S::컨텐츠2 -->
      <div class="comm_title_wrap mt45">
        <h4 class="pr10">{{$t('MSG_TXT_PAY_INFO')}}</h4><!-- 결제정보 -->
        <ur-button 
          color="violet" 
          @click="onClickPayInfoDtl"
          v-permission:read="this.$options.name">{{$t('MSG_TXT_PAY_INFO_DTL')}}</ur-button><!-- 결제정보상세 -->
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_DTM')"
          :labelAlign="'right'"
          style="width: 50%; height: auto"><!-- 일시 -->
          <ur-date-time-picker v-model="saleInfo.ymdhms" disabled />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="POS ID"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field
            style="width: 100%"
            :value="saleInfo.posId"
            disabled
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_RECEIPT_NO')"
          :labelAlign="'right'"
          style="width: 25%; height: auto"><!-- 영수증번호 -->
          <ur-text-field
            style="width: 100%"
            :value="saleInfo.receiptNo"
            disabled
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_PAY_TOT')"
          :labelAlign="'right'"
          style="width: 25%; height: auto"><!-- 결제총액 -->
          <ur-text-field
            style="width: 100%"
            :value="saleInfo.saleAmt"
            disabled
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_PAYER')"
          :labelAlign="'right'"
          style="width: 25%; height: auto"><!-- 결제자 -->
          <ur-text-field
            style="width: 100%"
            :value="saleInfo.payerName"
            disabled
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="가입회원"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-text-field
            style="width: 100%"
            :value="saleInfo.memberCnt"
            disabled
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E::컨텐츠2 -->

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import moment from 'moment'
export default {
  name: "PGE_TKD_00001",
  components: {}, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      srchFg: "name",
      srchObj: {
        receiptNo: "",
        saleYmd: "",
        name: "",
        ticketNo: "",
        memshpUid: ""
      },
      srchVal: "",
      isSrchValDisabled: true,
      //멤버상세정보
      memberDetail: {
        memshpUid: '',
        birthDate: '',
        name: '',
        memberKindNm: '',
        imgUrl: ''
      },
      // 결제정보
      saleInfo: {
        payerName: '',
        ymdhms: '',
        receiptNo: '',
        posId: '',
        saleAmt: '',
        payerMemshpUid: '',
        memberCnt: ''
      },
      noteGridFields: [
        { fieldName: "fnlMdfcDtm",dataType: "datetime",datetimeFormat: "yyyyMMddHHmmss" }, // 일자
        { fieldName: "writeUserNm", dataType: "text" }, // 작성자
        { fieldName: "note", dataType: "text" }, // 내용
      ],

      noteGridColumns: [
        { name: "fnlMdfcDtmColumn",fieldName: "fnlMdfcDtm",width: 100,header: {text: this.$t("MSG_TXT_DT")},datetimeFormat: "yyyy/MM/dd",edit: false},// 일자
        {name: "writeUserNmColumn",fieldName: "writeUserNm",width: 100,header: {text: this.$t("MSG_TXT_WRITER")},edit: false}, // 작성자
        {name: "noteColumn",fieldName: "note",width: 130,header: {text: this.$t("MSG_TXT_CNTN")},edit: false,}/* 내용 */
      ],
      noteGridDataList: [],

      ticketGridFields: [
        { fieldName: "parkKindNm", dataType: 'text' },
        { fieldName: "ticketNo", dataType: 'text' },
        { fieldName: "itemNm ", dataType: 'text' },
        { fieldName: "joinYmd", dataType: 'text', dataType: "datetime", datetimeFormat: "yyyymmdd" },
        { fieldName: "issueDate", dataType: 'text', dataType: "datetime", datetimeFormat: "yyyymmdd" },
        { fieldName: "expireDate", dataType: 'text', dataType: "datetime", datetimeFormat: "yyyymmdd" },
        { fieldName: "refundDate", dataType: 'text', dataType: "datetime", datetimeFormat: "yyyymmdd" },
        { fieldName: "ticketStatusValueNm", dataType: 'text' },
        { fieldName: "joinDcnt", dataType: 'number' },
        { fieldName: "totalDays", dataType: 'text' },
        /* { fieldName: "joinYcnt", dataType: 'number' }, */
        { fieldName: "memshpUid", dataType: 'text' },
        { fieldName: "receiptNo", dataType: 'text' },
        { fieldName: "refundReceiptNo", dataType: 'text' },
        { fieldName: "ticketStatusValue", dataType: 'text' }
      ],

      ticketGridColumns: [
        {name: 'parkKindNmColumn', fieldName: 'parkKindNm', width: 70, header: {text: this.$t('MSG_TXT_PARK_KIND')}, edit: false }, // 파크구분
        {name: 'ticketNoColumn', fieldName: 'ticketNo', width: 100, header: {text: this.$t('MSG_TXT_SEASON_NO')}, edit: false }, // 티켓명
        {name: 'itemNmColumn', fieldName: 'itemNm', width: 200, header: {text: this.$t('MSG_TXT_TICKET_NM')}, edit: false , renderer: {showTooltip: true}}, // 티켓명
        {name: 'joinYmdColumn', fieldName: 'joinYmd', width: 100, header: {text: this.$t('MSG_TXT_JOIN_DAY')}, edit: false, datetimeFormat: "yyyy/mm/dd" }, // 가입일
        {name: 'issueDateColumn', fieldName: 'issueDate', width: 100, header: {text: this.$t('MSG_TXT_START_DATE')}, edit: false, datetimeFormat: "yyyy/mm/dd" }, // 시작일
        {name: 'expireDateColumn', fieldName: 'expireDate', width: 100, header: {text: this.$t('MSG_TXT_END_DATE')}, edit: false, datetimeFormat: "yyyy/mm/dd" }, // 종료일
        {name: 'refundDateColumn', fieldName: 'refundDate', width: 100, header: {text: this.$t('MSG_TXT_REFUND_DATE')}, edit: false, datetimeFormat: "yyyy/mm/dd" }, // 환불일자
        {name: 'ticketStatusValueNmColumn', fieldName: 'ticketStatusValueNm', width: 50, header: {text: this.$t('MSG_TXT_STATUS')}, edit: false }, // 상태
        {name: 'joinDcntColumn', fieldName: 'joinDcnt', width: 70, header: {text: this.$t('MSG_TXT_JOIN_PRIOD_DAYS')}, edit: false, numberFormat: "#,##0", renderer: {showTooltip: true} }, // 가입기간일수
        {name: 'totalDaysColumn', fieldName: 'totalDays', width: 100, header: {text: this.$t('총가입일수')}, edit: false, renderer: {showTooltip: true} }, // 총가입일수
        /* {name: 'joinYcntColumn', fieldName: 'joinYcnt', width: 70, header: {text: this.$t('MSG_TXT_ANNUAL')}, edit: false, numberFormat: "#,##0" }, // 연차 */
        {name: 'receiptNoColumn', fieldName: 'receiptNo', width: 70, header: {text: this.$t('이용조회')}, edit: false, renderer: "renderer_imgbtn" }, // 이용조회
        {name: 'memshpUidColumn', fieldName: 'memshpUid', width: 70, header: {text: this.$t('쿠폰지급내역')}, edit: false, renderer: "renderer_imgbtn" } // 쿠폰지급내역
      ],
      ticketGridDataList: [],
      rendererEventObj: {
        initContent: parent => {
          var div = document.createElement("div");
          div.className = "rg-btn-search";
          parent.appendChild(div);
        },
        canClick: () => true,
        render: (grid, model, width, height, info)  => { this.model = model },
        click: event => {
          const row = this.$refs.ticketGrid.getJsonRows()[this.model._index._itemIndex]
          const ticketNo = row.ticketNo
          const memshpUid = row.memshpUid
          let popupId = ''
          if (this.model.dataColumn.index === 10) { 
            popupId = 'PGE_CTM_00013'
          } else { //쿠폰지급내역
            popupId = 'PGE_CTM_00012'
          } 
          
          utils.openLayerPopup(popupId, () => {}, {
            pageInitialData: { ticketNo: ticketNo, memshpUid: memshpUid },
            size: "lg",
          })
        }
      },
    };
  },
  computed: {
    inputMask() {
      if (this.srchFg === 'ticketNo') {
        // 숫자만 입력
        return 'N#########';
      } else if (this.srchFg === 'memshpQr') {
        // 앞 영대문자 뒤 숫자만 입력
        return 'N###############';
      }
    }
  },
  watch: {},
  mounted() {
  	 if (utils.length(this.$route.query.ticketNo) == 10 && utils.length(this.$route.query.memshpUid) == 10) {
       this.clickRadio('ticketNo');
       this.srchFg = 'ticketNo';
       this.srchVal = this.srchObj.ticketNo; 
       this.srchObj.ticketNo = this.$route.query.ticketNo;
       this.srchObj.memshpUid = this.$route.query.memshpUid;
       this.search();
    }
  },
  methods: {
    numberWithCommas(number) {
      return (number || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    //조회조건입력
    textFieldKeyup(event) {
      if (event.keyCode === 13) {
        this.openSearchFgPopup(true)
      }
    },
    //드림포인트조회팝업
    onDreamPointPopClick() {
      utils.openLayerPopup("PGE_CTM_00019", null, {
        pageInitialData: {
          memberId: this.memberDetail.memshpUid,
          name: this.memberDetail.name
        },
        size: "lg",
      });
    },
    //비고상세클릭(상세조회버튼)
    onNoteMgtPopClick() {
      utils.openLayerPopup(
        "PGE_CTM_00021",
        () => {
          this.searchNoteData({ memshpUid: this.memberDetail.memshpUid });
        },
        {
          pageInitialData: {
            memshpUid: this.memberDetail.memshpUid, //멤버십UID
            writeUserNm: this.memberDetail.name,
            ticketNo: this.srchObj.ticketNo
          },
          size: "lg",
        }
      )
    },
    reset() {
      this.srchVal = "";
      this.srchObj.memshpUid = ''
      this.srchObj.ticketNo = ''
    },
    saleInfoReset() {
      this.saleInfo = {
         ymdhms: ''
        ,receiptNo: ''
        ,posId: ''
        ,saleAmt: ''
        ,payerMemshpUid: ''
        ,memberCnt: ''
      }
    },
    //멤버십가입리스트팝업(성명)
    clickRadio(srchFg) {
      srchFg = srchFg || this.srchFg;
      this.reset()
      switch (srchFg) {
        case "memshpQr":
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

    //돋보기
    openSearchFgPopup(isClick) {
      if (isClick && this.srchFg == 'ticketNo' && !this.srchVal) {
        utils.messageBox("alert", utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_TICKET_NO'))); // 정기권 번호를 입력해 주세요.
        return
      }

      utils.openLayerPopup("PGE_CTM_00016", (result) => {
          if (result) {
            this.srchObj.memshpUid = result.memshpUid
            this.srchObj.ticketNo = result.ticketNo
            this.search()
          }
        },
        {
          pageInitialData: {
            [this.srchFg] : this.srchVal,
          },
          size: "lg",
        });
    },
    //조회
    search() {
      if(!this.srchObj.memshpUid) {
        utils.messageBox("alert", this.$t('MSG_ALT_SEL_SUB_INFO'))// 가입정보를 선택하여 주세요.
        return
      }

      const params = {
        memshpUid: this.srchObj.memshpUid,
        ticketNo: this.srchObj.ticketNo/* '2023120451' */
      };
      this.getMemshpInfo(this.srchObj.memshpUid).then(data => {
        const mobileTel = data.mobileTel || data.lglrepresTel || ''
        this.memberDetail.mobileTel = mobileTel
        this.memberDetail.memshpUid = data.memshpUid
        this.memberDetail.name = data.name
        this.memberDetail.birthDate = data.birthDate
        this.memberDetail.memberKindNm = data.memberKind == '2' ? '정회원' : '준회원'

        if (this.srchFg == 'ticketNo') {
          this.srchVal = this.srchObj.ticketNo
        } else if (this.srchFg == 'memshpQr') {
          // this.srchVal = this.srchFg.memshpUid 
        } else {
          this.srchVal = data[this.srchFg]
        }
      })
      this.searchPhoto(params)
      this.searchNoteData(params)
      this.searchTicketList()
    },

    //데이터 조회
    searchData(params) {
      http
        .request("PGE_TKD_00001", "DTS_TKD_00001", {
          query: params,
        })
        .then((res) => {
          if(!(res.data?.length > 0)) {
            // utils.messageBox("alert", utils.strFormat(this.$t('MSG_ALT_IT_NOT_EXIST'), this.$t('MSG_TXT_PAY_INFO'))); // 존재하지않는 결제정보입니다.
            this.saleInfoReset()
            return 
          }

          const detailData = res.data[0]
          this.saleInfo.ymdhms = moment(detailData.ymdhms, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm')
          this.saleInfo.receiptNo = detailData.receiptNo
          this.saleInfo.posId = detailData.posId
          this.saleInfo.saleAmt = this.numberWithCommas(detailData.saleAmt)
          this.saleInfo.payerMemshpUid = detailData.payerMemshpUid
          this.saleInfo.memberCnt = detailData.memberCnt

          if (this.saleInfo.payerMemshpUid) {
            this.getMemshpInfo(this.saleInfo.payerMemshpUid).then(data => {
              if (data?.memshpUid) {
                this.saleInfo.payerName = data.name
              }
            })
          }
        })
        .catch((error) => console.log(error));
    },

    // 비고관리 그리드 조회
    searchNoteData(params) {
      http
        .request("PGE_TKD_00001", "DTS_CTM_00013", {
          query: params,
        })
        .then((res) => {
          // if (res?.data?.length <= 0) {
          //   res.data = []
          // }
          if (res && res.data) {
            if (res.data.length >= 0) {
              this.noteGridDataList = res.data; //비고
            } else {
              res.data = []
            }
          }
        }).catch((error) => {
          this.noteGridDataList = []
        }).finally(() => {
          this.$refs.noteGrid.setRows(this.noteGridDataList)
        });
    },

    onClickPayInfoDtl() {
      if (!this.saleInfo.receiptNo) {
        utils.messageBox("alert", this.$t("MSG_ALT_TRY_AGAIN_AFTER_SEARCH")) // 조회 후 다시 시도하세요.
        return
      }

      const queryString = `receiptNo=${this.saleInfo.receiptNo}`
      utils.openWindowPopup('PGE_SAA_00001', queryString)
    },

    // numberWithCommas(number) {
    //   return (number || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // },

    //정기권목록 조회
    searchTicketList() {
      const param = { memshpUid: this.srchObj.memshpUid }
      http
        .request("PGE_TKD_00001", "DTS_TKD_00005", {
          query: param,
        })
        .then((res) => {
          if(!(res.data?.length > 0)) {
            res.data = []
          }
          this.ticketGridDataList = res.data
        }).catch((error) => {
          this.ticketGridDataList = []
        }).finally(() => {
          this.$refs.ticketGrid.setRows(this.ticketGridDataList)
          if (this.ticketGridDataList[0]?.receiptNo) {
            const data = this.ticketGridDataList[0]
            const receiptNo = data.ticketStatusValue === 'C006' ? data.refundReceiptNo : data.receiptNo
            this.$refs.ticketGrid.gridView.setCurrent({ itemIndex: 0 })
            this.searchData({ receiptNo: receiptNo })
          } else {
            utils.messageBox("alert", utils.strFormat(this.$t('MSG_ALT_IT_NOT_EXIST'), this.$t('MSG_TXT_PAY_INFO'))); // 존재하지않는 결제정보입니다.
            this.saleInfoReset()
          }
        })
    },

    // 사진조회
    searchPhoto(params) {
      http.request(this.$options.name, "DTS_CTM_00028", { query: params })
      .then(res => {
        if(res.data?.photo) {
          // this.isShowImg = true;
          this.memberDetail.imgUrl = res.data.photo;
        } else {
          // this.isShowImg = false;
          this.memberDetail.imgUrl = null;
        }
      })
    },

    getMemshpInfo(memshpUid) {
      return new Promise((resolve) => {
        http
          .request(this.$options.name, "DTS_CTM_00010", {
            query: {
              memshpUid: memshpUid,
            },
          }, true)
          .then((res) => {
            resolve(res.data);
          })
      });
    },

    //가입일수적용
    callCalculateYcnt() {
      if (!this.memberDetail.memshpUid) {
        utils.messageBox("alert", utils.strFormat(this.$t('MSG_ALT_IT_NOT_EXIST'), this.$t('MSG_TXT_MEMSHP_INFO'))); // 존재하지않는 멤버십정보입니다.
        return
      }
      
      const params = { memshpUid: this.memberDetail.memshpUid }
      http.request("PGE_TKD_00001", "DTS_TKD_00007", {
        query: params,
      }).then((res) => {
        utils.messageBox("alert", utils.strFormat(this.$t('MSG_ALT_HAS_BEEN_COMPLETED'), this.$t('MSG_TXT_YEAR_SAVE')), null, this.searchTicketList); // 연차적용이 완료되었습니다.
      })
    },

    onCellClick(grid, data) {
      const row = grid.getJsonRows()[data.dataRow]
      if (data.fieldIndex < 10) {
        const receiptNo = row.ticketStatusValue === 'C006' ? row.refundReceiptNo : row.receiptNo
        if (receiptNo) {
          this.searchData({ receiptNo: receiptNo })
        } else {
          // utils.messageBox("alert", utils.strFormat(this.$t('MSG_ALT_IT_NOT_EXIST'), this.$t('MSG_TXT_PAY_INFO'))); // 존재하지않는 결제정보입니다.
          this.saleInfoReset()
        }
      }
    },
    clickOpenPopupFriend() {
      if (!this.memberDetail.memshpUid) {
        utils.messageBox("alert", this.$t("MSG_ALT_TRY_AGAIN_AFTER_SEARCH")) // 조회 후 다시 시도하세요.
        return
      }
      
      utils.openLayerPopup("PGE_CTM_00014", () => {}, {
        pageInitialData: {
          memshpUid: this.memberDetail.memshpUid,
          name: this.memberDetail.name,
          ticketNo: this.srchObj.ticketNo
        },
        size: "lg",
      });
    },
  },
};
</script>
<style scoped></style>
