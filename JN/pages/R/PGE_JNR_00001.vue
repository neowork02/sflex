<template>
  <sui-page class="custom_page">
    <sui-page-header2 :pageId="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_PARK_KIND')" :labelAlign="'right'" style="width: 100%; height: auto">
          <ur-text-field v-model="parkKind" style="width: 100%" clearable readonly />
        </ur-form-item>
        <ur-form-item class="flex_wrap borTop" :label="$t('MSG_TXT_POS_CHECK_MSG')" :labelAlign="'right'" style="width: 50%; height: auto">
          <ur-text-field v-model="posSodStatus.message" style="width: 100%" clearable readonly />
        </ur-form-item>
        <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_IC_READER_CHECK')" :labelAlign="'right'" style="width: 50%; height: auto">
          <ur-text-field v-model="icReaderStatusMessage" style="width: 100%" clearable readonly />
          <ur-button color="violet" @click="clickCheckIcReader">{{$t('MSG_BTN_CHK')}}</ur-button>
        </ur-form-item>
        <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_REGIST_INFO')" :labelAlign="'right'" style="width: 100%; height: auto">
          <div class="radioForm">
            <ur-radio v-model="searchGubn" @click="clickSearchGubn('name')" value="name" sm>{{$t('MSG_TXT_EMPL_NM')}}</ur-radio>
            <ur-radio v-model="searchGubn" @click="clickSearchGubn('mobile')" value="tel" sm>{{$t('MSG_TXT_CELL_PHONE')}}</ur-radio>
            <ur-radio v-model="searchGubn" @click="clickSearchGubn('ticket')" value="ticket" sm>{{$t('MSG_TXT_TICKET_NO')}}</ur-radio>
            <ur-radio v-model="searchGubn" @click="clickSearchGubn('rsv')" value="rsv" sm>{{$t('MSG_TXT_RESERVE_CONF_NUM')}}</ur-radio>
            <ur-radio v-model="searchGubn" @click="clickSearchGubn('qr')" value="qr" sm>{{$t('MSG_TXT_MEMBER_QR')}}</ur-radio>
          </div>
          <ur-text-field ref='searchText' v-model="searchText" :readonly='readonlyTextSearchText' @keyup.enter="clickSearchOrAdd" :mask="searchTextMask" maxlength="16" class="pl16"/>
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="clickSearchOrAdd">{{$t('MSG_BTN_SEARCH_ADD')}}</ur-button>
          <ur-button @click="clickInit">{{$t('MSG_BTN_INTL')}}</ur-button>
          <ur-button @click="clickDelSelect">{{$t('MSG_BTN_SEL_DEL')}}</ur-button>
          <ur-button @click="clickOpenModalMemberTemp" color="violet">{{$t('MSG_BTN_SEARCH_TEMP_SAVE')}}</ur-button>
        </div>
      </div>

      <!-- S::구매 정기권 정보 -->
      <div class="comm_title_wrap mt25">
        <h4 class="pr10">{{$t('MSG_TXT_PURCHASE_TICKET_INFO')}}</h4>
        <!--S:: 타이틀 오른쪽 total info -->
        <div class="right_box">
          <div class="totalNo">
            <div class="totalCt">Total<span>{{memTotoalCnt}}</span>{{$t('MSG_TXT_CNT')}}</div>
          </div>
        </div>
        <!--E::: 타이틀 오른쪽 total info -->
      </div>

      <!-- S::구매 정기권 정보 -->
      <real-grid ref="memGrid" grid-id="PGE_JNR_0001_MEMBER" grid-root="/lib"
        :gridFields="memGrdFields"
        :gridColumns="memGrdColumns" 
        :gridRows="[]" 
        :gridInit=false
        :gridMounted="memGridMounted"
        :gridCellClick="memGridCellClick"
        :gridCheckBar="{ visible: false }"
        :style="{ height: '250px' }" 
      />
      <!-- E::구매 정기권 정보 -->

      <!-- S::회원정보+비고 -->
      <div class="comm_shut_wrap mt45">
        <div class="inbox7">
          <div class="comm_title_wrap">
            <h4 class="pr10">{{$t('MSG_TXT_PROFILE')}}</h4>
            <!--<ur-button @click="clickOpenPopupFriend" color="violet">{{$t('MSG_BTN_SEARCH_FRIEND')}}</ur-button>-->
            <ur-button @click="clickOldTicketDetail" color="violet">{{$t('MSG_BTN_SEARCH_TICKET_DETAIL')}}</ur-button>
          </div>
          <!-- S::Inner -->
          <div class="inner">
            <div class="inbox3">
              <div ref="viewerArea" class="img_box" style="height: 250px">
                <div v-if="memberImgData" style="width:100%; height:100%;">
                  <img :src="memberImgData" style="width:100%; height:100%;"/>
                </div>
              </div>
            </div>
            <div class="emptybox" />
            <div class="inbox7">
              <ur-form-box toggleable>
                <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_EMPL_NM')" :labelAlign="'right'" style="width: 50%; height: auto; border: 0">
                  <ur-text-field v-model='selMember.name' style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_BTH_DATE')" :labelAlign="'right'" style="width: 50%; height: auto">
                  <ur-text-field v-model='selMember.birthDate' mask="####-##-##" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_CELL_PHONE')" :labelAlign="'right'" style="width: 50%; height: auto">
                  <ur-text-field v-model='selMember.mobileTel' mask="phone" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_GENDER')" :labelAlign="'right'" style="width: 50%; height: auto">
                  <ur-text-field v-model='selMember.sexKindNm' style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_CLASS_MEMBER')" :labelAlign="'right'" style="width: 50%; height: auto">
                  <ur-text-field v-model='selMember.memberKindNm' style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_JOIN_DCNT')" :labelAlign="'right'" style="width: 50%; height: auto" >
                  <ur-text-field v-model='selMember.joinDcnt' style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_TICKET_ITEM_NM')" :labelAlign="'right'" style="width:100%; height: auto">
                  <ur-text-field v-model='selMember.itemNm' style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_OLD_ISSUE_DATE')" :labelAlign="'right'" style="width: 50%; height: auto">
                  <ur-text-field v-model='selMember.oldIssueDate' mask="####-##-##" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_OLD_EXPIRE_DATE')" :labelAlign="'right'" style="width: 50%; height: auto">
                  <ur-text-field v-model='selMember.oldExpireDate' mask="####-##-##" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_OLD_ITEM_NAME')" :labelAlign="'right'" style="width: 50%; height: auto">
                  <ur-text-field v-model='selMember.oldItemNm' style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_OLD_ITEM_CD')" :labelAlign="'right'" style="width: 50%; height: auto">
                  <ur-text-field v-model='selMember.oldItemCd' style="width: 100%; height: auto" readonly />
                </ur-form-item>
              </ur-form-box>
            </div>
          </div>
          <!-- E::Inner -->
        </div>
        <div class="emptybox" />
        <p01
          :pageName="this.$options.name"
          :memshpUid="this.selMember.memshpUid"
          :memberNm="this.selMember.name"
        />
      </div>
      <!-- E::회원정보+비고 -->

      <!-- S::이용가능권종+제휴할인 -->
      <div class="comm_shut_wrap mt45">

        <!--S:: 이용가능권종 component -->
        <p02 
          ref='availableItem' 
          :pageName="this.$options.name"
          :selectItem="selectItem"
        />
        <!--E:: 이용가능권종 component -->

        <div class="emptybox" />

        <!--S:: 제휴할인 component -->
        <p03 
          v-show="isShowDiscount"
          ref='discount' 
          :pageName="this.$options.name"
          :getDiscountType="getDiscountType"
          :checkPreIssePayYn="checkPreIssePayYn"
          :setDiscountInfo="setDiscountInfo"
        />
        <!--S:: 제휴할인 component -->

        <!--S:: 임직원 저옵 component -->
        <p04 
            v-show="!isShowDiscount"
            ref='empInfo' 
            :pageName="this.$options.name"
            :setEmpInfo="setEmpInfo"
        />
        <!--S:: 임직원정보 component -->

      </div>
      <!-- E::이용가능권종+제휴할인 -->

      <!-- S::결제정보 -->
      <div class="comm_title_wrap mt45">
        <h4 class="pr10">{{$t('MSG_TXT_PAY_INFO')}}</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_TOT_AMT')" :labelAlign="'right'" style="width: 50%; height: auto">
          <ur-text-field v-model="totPrice" mask="number" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_DISCOUNT_AMT')" :labelAlign="'right'" style="width: 50%; height: auto">
          <ur-text-field v-model="totDcAmt" mask="number" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item class="flex_wrap" :label="$t('MSG_TXT_PAYMNT_AMT')" :labelAlign="'right'" style="width: 100%; height: auto">
          <ur-text-field v-model="totSaleAmt" mask="number" style="width: 42.3%; height: auto" readonly />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <!--<ur-button color="violet" @click="cardPuplish">카드퍼블버튼</ur-button> -->
          <ur-button @click='clickTempSave' v-show="showBtnTempSave">{{$t('MSG_BTN_SAVE_TEMP')}}</ur-button>
          <ur-button @click='clickFreeSave' v-show='showBtnFreeSave'>{{$t('MSG_BTN_JOIN_FREE')}}</ur-button>
          <ur-button @click='clickWebSave' v-show='showBtnWebSave' color="violet">{{$t('MSG_BTN_JOIN_WEB')}}</ur-button>
          <ur-button @click='clickProcPayament' v-show='showBtnPayMain' color="violet">{{$t('MSG_BTN_PROC_PAY')}}</ur-button>
        </div>
      </div>
      <!-- E::결제정보 -->

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import p01 from "./components/PGE_JNR_00001_P01";
import p02 from "./components/PGE_JNR_00001_P02";
import p03 from "./components/PGE_JNR_00001_P03";
import p04 from "./components/PGE_JNR_00001_P04";
import PosPrint from '~common/js/PosPrint/pos-print.js';
import CardPopupUtils from '~common/js/card-popup-utils.js';
import WebrtcDatachannel from '~common/js/webrtc-datachannel.js';
export default {
  name: "PGE_JNR_00001",
  components: { p01, p02, p03, p04}, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      isSaveEnd : false, //저장완료 여부
      isPos: false, // 접수 POS 여부
      posSodStatus: {}, // POS SOD 상태
      icReaderCheckResult : false, // IC Reader 상태 체크 결과
      icReaderStatusMessage : '', // IC Reader 상태 메세지
      priceKind: '', // 티켓 구분 항목 ( 1:신규, 2:베/시, 3:재가입, 4:스/프, 5:345, 6:무료, 7:PKG )
      freeKind: 'N', // 무료 여부 ( priceKind가 6인 경우 Y, 그 외에는 N )
      isShowDiscount: true, //제휴할인정보 보여주기 여부

      isElectReceiptIssueApply : true, //전자영수증 발행 여부 적용 여부

      parkKind: '', //파크구분
      parkPosKind: '', //파크구분(POS용)
      posId: '', // POS ID
      posNm: '', // POS Name
      icReaderUseYn: 'N', // IC Reader 사용여부
      icReaderPort : '', // IC Reader Port
      icReaderSpeed: '', // IC Reader Speed
      nowDate: '', //오늘일자(서버설정된 오늘 판매일자)

      totPrice: 0, //총액
      totDcAmt: 0, //할인액
      totSaleAmt: 0, //결제액
      
      payerMemshpUid: '', //결제자 멤버십 UID
      payerMemberName: '', //결제자 명
      payerMemberKind: '', //결제자 회원유형

      seasonJoinAvailDay: -1, //시즌권 최소 유효 가입 일수
      
      //Text readonly
      readonlyTextSearchText : true, //조회Text

      //조회조건
      searchGubn: '', //조회구분
      searchText: '', //조회Text

      //Grid 세팅
      memGridView: null,
      memDataProvider: null,
      memGrdFields: [],
      memGrdColumns: [],
      memCheckedDataRow: -1, //현재체크 Row

      //현재 선택된 멤버
      selMember : {memshpUid:'', 
                  name:'',
                  birthDate:'', 
                  mobileTel:'', 
                  sexKindNm: '', 
                  memberKindNm: '', 
                  joinDcnt: '', 
                  itemNm: '',
                  oldIssueDate:'',
                  oldExpireDate:'',
                  oldItemNm:'',
                 }, 
      selMemDataRow : -1, //현재 선택된 DataRow
      selItem : null, //현재 선택된 권종
      memberImgData: "", //고개 사진 이미지

      printData: null, //영수증 출력위해 서버에서 가져온 데이터

      //카드리더기 무결성 체크
      cardPopupUtils : null,
      webrtcDatachannel : null,
      cardPopupPage : "PGE_CTM_00020",
    };
  },
  created() {
    this.memGrdFields = [
      { fieldName: "seqNo", dataType: 'number', }, // 순번
      { fieldName: "payerCheck", dataType: 'text', }, // 결제자 체크
      { fieldName: "webYn", dataType: "text", }, // 웹 예약 여부
      { fieldName: "preJoinYn", dataType: "text", }, // 선가입 여부
      { fieldName: "rsvProofNo", dataType: 'text', }, // 예약확인증번호
      { fieldName: "rsvNo", dataType: 'text', }, // 예약번호
      { fieldName: "rsvSeqNo", dataType: 'text', }, // 예약번호 순번
      { fieldName: "memshpUid", dataType: 'text', }, // 멤버UID
      { fieldName: "memberKind", dataType: 'text', }, // 멤버구분
      { fieldName: "memberKindNm", dataType: 'text', }, // 멤버구분명
      { fieldName: "payerMemshpUid", dataType: 'text', }, // 결제자 멤버십 UID
      { fieldName: "payerMemberName", dataType: 'text', }, // 결제자명
      { fieldName: "payerMemberKind", dataType: 'text', }, // 결제자멤버구분
      { fieldName: "ticketKind", dataType: 'text', }, // 정기권 유형
      { fieldName: "ageTypeCd", dataType: 'text', }, // 가입(나이) 유형코드
      { fieldName: "yearKind", dataType: 'text', }, // 소인/대인 구분
      { fieldName: "issueDate", dataType: 'text' }, // 발행일자
      { fieldName: "expireDate", dataType: 'text' }, // 만료일자
      { fieldName: "issueKind", dataType: 'text', }, // 발행구분
      { fieldName: "issueKindNm", dataType: 'text', }, // 발행구분명
      { fieldName: "remarkDesc", dataType: 'text', }, // 비고
      { fieldName: "itemCd", dataType: 'text', }, // 권종코드
      { fieldName: "itemNm", dataType: 'text', }, // 권종명+할인유형명
      { fieldName: "orgItemCd", dataType: 'text', }, // 권종코드(스마트예약 경우 스마트예약에서 선택한 권종코드)
      { fieldName: "orgItemNm", dataType: 'text', }, // 권종명
      { fieldName: "itemKind", dataType: 'text', }, // 권종구분
      { fieldName: "issueStartDate", dataType: 'text', }, // 발급시작일자
      { fieldName: "issueEndDate", dataType: 'text', }, // 발급종료일자
      { fieldName: "expireTypeCd", dataType: 'text', }, // 만료구분코드 ET01(변동형), ET02(고정형)
      { fieldName: "limitExpireDate", dataType: 'text', }, // 만료제한일자
      { fieldName: "enableDay", dataType: 'text', }, // 사용가능일
      { fieldName: "expireExtendDay", dataType: 'text', }, // 만기연장일
      { fieldName: "itemCondTypeCd", dataType: 'text', }, // 컨디션유형코드(상품)
      { fieldName: "price", dataType: 'number', }, // 기준가격
      { fieldName: "joinKind", dataType: 'text', }, // 가입유형
      { fieldName: "planKind", dataType: 'text', }, // 계획구분
      { fieldName: "acKind", dataType: 'text', }, // 대인소인구분
      { fieldName: "ticketTypeKind", dataType: 'text', }, // 권종그룹코드
      { fieldName: "availDay", dataType: 'text', }, // 이용기간
      { fieldName: "periodCnt", dataType: 'text', }, // 기간횟수(다회권)
      { fieldName: "useCnt", dataType: 'text', }, // 사용횟수(다회권)
      { fieldName: "ilmoYn", dataType: 'text', }, // 일모대상 상품여부 
      { fieldName: "itemPreJoinYn", dataType: 'text', }, // 권종 선가입가능 여부
      { fieldName: "saleAmt", dataType: 'number', }, // 판매금액
      { fieldName: "dcAmt", dataType: 'number', }, // 할인금액
      { fieldName: "dcType", dataType: 'text', }, // 할인유형코드
      { fieldName: "dcNm", dataType: 'text', }, // 할인명
      { fieldName: "condTypeCd", dataType: 'text', }, // 컨디션유형코드
      { fieldName: "custKind", dataType: 'text', }, // 고객구분
      { fieldName: "custDcAmt", dataType: 'text', }, // 고객할인 금액
      { fieldName: "creditType", dataType: 'text', }, // 청구 유형
      { fieldName: "cradDcAmt", dataType: 'text', }, // 제휴할인 금액
      { fieldName: "creditAmt", dataType: 'text', }, // 청구금액
      { fieldName: "cardSvcCd", dataType: 'text', }, // 카드 서비스 코드
      { fieldName: "depositType", dataType: 'text', }, // 예수유형
      { fieldName: "depositAmt", dataType: 'text', }, // 예수금
      { fieldName: "subTypeCd", dataType: 'text', }, // 예수/외상유형코드
      { fieldName: "subAmt", dataType: 'text', }, // 예수/외상금액
      { fieldName: "cardCompCd", dataType: 'text', }, // 제휴사코드
      { fieldName: "fstJoinDate", dataType: 'text', }, // 첫가입일자
      { fieldName: "joinDcnt", dataType: 'text', }, // 가입일수
      { fieldName: "joinYcnt", dataType: 'text', }, // 가입연차
      { fieldName: "joinCnt", dataType: 'text', }, // 가입회수
      { fieldName: "distance", dataType: 'text', }, // 만료 후 가입간의 기간(현재일기준)
      { fieldName: "groupSeq", dataType: 'text', }, // 가입 임시정보 번호
      { fieldName: "dtlSeq", dataType: 'text', }, // 가입 임시정보 상세순번
      { fieldName: "benefitYn", dataType: 'text', }, // 다자녀/복지 할인
      { fieldName: "centerChkYn", dataType: 'text', }, // 센타방문
      { fieldName: "rsvDate", dataType: 'text', }, // 예약일자
      { fieldName: "rsvTime", dataType: 'text', }, // 예약시간
      { fieldName: "rsvName", dataType: 'text', }, // 예약자
      { fieldName: "oldTicketNo", dataType: 'text', }, // 이전 정기권번호
      { fieldName: "oldItemCd", dataType: 'text', }, // 이전 권종코드
      { fieldName: "oldItemNm", dataType: 'text', }, // 이전 권종명
      { fieldName: "oldIssueDate", dataType: 'text', }, // 이전가입일
      { fieldName: "oldExpireDate", dataType: 'text', }, // 이전만기일
      { fieldName: "oldTicketStatusValue", dataType: 'text', }, // 이전 티켓 상태
      { fieldName: "oldPayerMemshpUid", dataType: 'text', }, // 이전 결제자
      { fieldName: "oldTicketTypeKind", dataType: 'text', }, // 이전 권종그룹코드
      { fieldName: "memberDcFg", dataType: 'text', }, // 멤버십포인트적립대상 여부
      { fieldName: "webPayEndYn", dataType: 'text', }, // 웹 결제 완료 여부
      { fieldName: "name", dataType: 'text', }, // 고객명
      { fieldName: "mobileTel", dataType: 'text', }, // 휴대폰번호
      { fieldName: "birthDate", dataType: 'text', }, // 생년월일
      { fieldName: "foregnYn", dataType: 'text', }, // 외국인여부
      { fieldName: "sexKind", dataType: 'text', }, // 성별구분
      { fieldName: "sexKindNm", dataType: 'text', }, // 성별구분명
      { fieldName: "empCd", dataType: 'text', }, // 임직원코드
      { fieldName: "knoxId", dataType: 'text', }, // KNOXID
      { fieldName: "castEmployeeNo", dataType: 'text', }, // 캐스트사원번호
      { fieldName: "illeglUseYn", dataType: 'text', }, // 부정이용여부
      { fieldName: "illeglUseRsnCd", dataType: 'text', }, // 부정이용사유코드
      { fieldName: "preTicketCnt", dataType: 'text', }, // 선가입건수
      { fieldName: "preJoinDate", dataType: 'text', }, // 선가입가능일자   
      { fieldName: "detail", dataType: 'text', }, // 상세보기   
      { fieldName: "discountType", dataType: 'text', }, // 할인타입
      { fieldName: "preIssuePayYn", dataType: 'text', }, // 선발행티켓 사용여부
      { fieldName: "preIssueNo", dataType: 'text', }, // 선발행티켓 번호
      { fieldName: "preIssuePriceAmt", dataType: 'text', }, // 선발행티켓판가_액면금액
      { fieldName: "preIssueCnt", dataType: 'text', }, // 선발행티켓결제건수
      { fieldName: "preIssueAmt", dataType: 'text', }, // 선발행티켓결제금액
      { fieldName: "remainAmt", dataType: 'text', }, // 선발행티켓잔여금액
      { fieldName: "cond11laAmt", dataType: 'text', }, // 선발행티켓 할인가I
      { fieldName: "cond11l7Amt", dataType: 'text', }, // 선발행티켓 할인가II
      { fieldName: "amtMarkKind", dataType: 'text', }, // 선발행권 금액 구분
      { fieldName: "externalYn", dataType: 'text', }, // 선발행권 외부 여부
      { fieldName: "subTypeCard", dataType: 'text', }, // SUB_TYPE_CARD
      { fieldName: "subAmtCard", dataType: 'text', }, // SUB_AMT_CARD
      { fieldName: "approveCardAmt", dataType: 'text', }, // 카드 승인 대상 금액
      { fieldName: "ilmoCardCode", dataType: 'text', }, // 일모 카드/OTC 번호
      { fieldName: "ilmoCardNo", dataType: 'text', }, // 일모카드번호
      { fieldName: "ilmoAmt", dataType: 'text', }, // 일모 금액
      { fieldName: "ilmoUseAmt", dataType: 'text', }, // 일모 사용금액
      { fieldName: "empNo", dataType: 'text', }, // 임직원 사번
      { fieldName: "empType", dataType: 'text', }, // 임직원 유형
    ];
    this.memGrdColumns = [
      {
        name: "payerCheck",
        fieldName: "payerCheck",
        header: { text: this.$t('MSG_TXT_PAYER') },
        width: 50,
        editable: false, 
        renderer: {
          type: "check",
          trueValues: 'Y',
          falseValues: 'N',
        },
        styleCallback: function(grid, dataCell){
          let ret = {}
          let memberKindNm = grid.getValue(dataCell.index.itemIndex, "memberKindNm")
          let webPayEndYn = grid.getValue(dataCell.index.itemIndex, "webPayEndYn")

          if(memberKindNm != '정회원' ||  webPayEndYn == "Y"){
            ret.renderer = {type: "text"},
            ret.editable = false;
          }
          return ret;
        },
        displayCallback: function() {
          return '';
        }
      },
      {
        name: "memberKindNm",
        fieldName: "memberKindNm",
        header: { text: this.$t('MSG_TXT_CLASS_MEMBER') },
        width: 50,
        editable: false, 
      },
      {
        name: "name",
        fieldName: "name",
        header: { text: this.$t('MSG_TXT_EMPL_NM') },
        width: 70,
        editable: false,
      },
      {
        name: "birthDate",
        fieldName: "birthDate",
        header: { text: this.$t('MSG_TXT_BTH_DATE') },
        width: 70,
        editable: false,
        textFormat: "([0-9*]{4})([0-9*]{2})([0-9*]{2});$1-$2-$3",
      },
      {
        name: "mobileTel",
        fieldName: "mobileTel",
        header: { text: this.$t('MSG_TXT_CELL_PHONE') },
        width: 80,
        editable: false,
        textFormat: "([0-9*]{3})([0-9*]{4})([0-9*]{4});$1-$2-$3",
      },
      {
        name: "joinYcnt",
        fieldName: "joinYcnt",
        header: { text: this.$t('MSG_TXT_ANNUAL') },
        width: 40,
        editable: false,
        footer: {
          text: this.$t('MSG_TXT_TOTAL_PERSONS'),
        },
        renderer:{
            type:"button",
        },
      },
      {
        name: "itemNm",
        fieldName: "itemNm",
        header: { text: this.$t('MSG_TXT_TICKET_ITEM_NM') },
        width: 170,
        styleName: 'align-left',
        editable: false,
        footer: {
          valueCallback: function (grid, column, footerIndex, columnFooter, value){
            return grid.getJsonRows().length + "명";
          },
          styleName: 'align-left',
        },
      },
      {
        name: "dcNm",
        fieldName: "dcNm",
        header: { text: this.$t('MSG_TXT_DISCOUNT_NAME') },
        width: 80,
        styleName: 'align-left',
        editable: false,
        footer: {
          text: this.$t('MSG_TXT_PAY_AMT'),
        },
      },
      {
        name: "price",
        fieldName: "price",
        header: { text: this.$t('MSG_TXT_ITEM_PRICE') },
        width: 80,
        numberFormat: "#,##0",
        styleName: 'align-right',
        editable: false,
        footer: {
          text: "",
          expression: "sum",
          numberFormat: "#,##0",
        },
      },
      {
        name: "dcAmt",
        fieldName: "dcAmt",
        header: { text: this.$t('MSG_TXT_DISCOUNT_AMT') },
        width: 80,
        numberFormat: "#,##0",
        styleName: 'align-right',
        editable: false,
        footer: {
          text: "",
          expression: "sum",
          numberFormat: "#,##0",
        },
      },
      {
        name: "saleAmt",
        fieldName: "saleAmt",
        header: { text: this.$t('MSG_TXT_PAYMNT_AMT') },
        width: 80,
        numberFormat: "#,##0",
        styleName: 'align-right',
        editable: false,
        footer: {
          text: "",
          expression: "sum",
          numberFormat: "#,##0",
        },
      },
      {
        name: "issueDate",
        fieldName: "issueDate",
        header: { text: this.$t('MSG_TXT_DATE_ISSUE') },
        width: 70,
        editable: false,
        textFormat: "([0-9*]{4})([0-9*]{2})([0-9*]{2});$1-$2-$3",
      },
      {
        name: "expireDate",
        fieldName: "expireDate",
        header: { text: this.$t('MSG_TXT_DATE_EXPIRE') },
        width: 70,
        editable: false,
        textFormat: "([0-9*]{4})([0-9*]{2})([0-9*]{2});$1-$2-$3",
      },
      {
        name: "preJoinYn",
        fieldName: "preJoinYn",
        header: { text: this.$t('MSG_TXT_PRE_JOIN') },
        width: 50,
        editable: false,
      },
      {
        name: "memberDcFg",
        fieldName: "memberDcFg",
        header: { text: this.$t('MSG_TXT_SAVE_MEMBER_POINT') },
        width: 50,
        editable: false,
      },
      {
        name: "detail",
        fieldName: "detail",
        header: { text: this.$t('MSG_TXT_DETAIL') },
        width: 50,
        editable: false,
        renderer:{
            type:"button",
        },
      },
    ];
  },
  async mounted() {
    this.$store.commit('collapseLNB');

    this.icReaderStatusMessage = this.$t('MSG_ALT_IC_READER_CHECK_ING'); // IC Reader 상태 메세지
    
    //파크구분
    this.parkKind = this.$store.getters.userInfo.parkFg;
    this.parkPosKind = this.$store.getters.userInfo.parkPosFg;
    this.posId = this.$store.getters.userInfo.posId;
    this.posNm = this.$store.getters.userInfo.posNm;
    this.icReaderUseYn = this.$store.getters.userInfo.icReaderUseYn;
    this.icReaderPort = this.$store.getters.userInfo.icReaderPort;
    this.icReaderSpeed = this.$store.getters.userInfo.icReaderSpeed;
    
    //매출일자
    this.nowDate = this.$store.getters.userInfo.saleDate;

    //공통 코드 정보 로딩
    await http.getCodeList(this.$options.name, ['COD_C7'], '').then(res => {
      //인원유형
      utils.forEach(res['COD_C7'], (codeObj, key) => {
        if (codeObj.codeId == 'C701') {
          this.seasonJoinAvailDay = (utils.length(codeObj.codeName) == 0)? -1 : parseInt(codeObj.codeName);
        }
      });
      
    }).catch(err => {
      console.log(err);
    });
    
    //접수 POS인지 체크 
    this.isPos = utils.checkReceiptPos(this.parkPosKind, this.posId, this.icReaderPort, this.icReaderSpeed);
    if (!this.isPos) {
      this.posSodStatus = {};
      this.posSodStatus.message = this.$t(' MSG_ALT_PC_NOT_REG_POS');
      utils.messageBox('alert', this.posSodStatus.message);
    }

    //접수 POS인 경우만 무결성 체크 진행
    if (this.isPos && this.icReaderUseYn == 'Y') {
      //card popup 관련 초기화
      this.cardPopupUtils = new CardPopupUtils();
      this.webrtcDatachannel = new WebrtcDatachannel(
        this.$options.name, //thisPage
        this.$store.getters.userInfo.userIp, // ip 
      );

      await this.webrtcDatachannel.initSecure(); // webrtc 통신 암호화 위한 설정
      
      //POS SOD 상태 조회
      this.posSodStatus = await utils.checkPosSod(this.parkPosKind, this.posId);

      //카드 무결성 체크 창 열기
      this.cinformOpenPopupCard();
    }
  },
  destroyed() {
  },
  computed: {
    /**
     * 검색창 Mask
     */
    searchTextMask() {
      if (this.searchGubn == 'ticket') {
        return '##########';
      }
      else if (this.searchGubn == 'rsv') {
        return null;
      }
      else if (this.searchGubn == 'qr') {
        return 'N###############';
      }
    },
    /**
     * 구매정기권정보 건수
     */
    memTotoalCnt() {
      return this.getMemGridCnt();
    },
    /**
     * 임시저장 Btn show/hide 여부
     */
    showBtnTempSave() {
      return (this.isPos && this.getMemGridCnt() > 0)? true : false;
    },
    /**
     * 무료가입 Btn show/hide 여부
     */
    showBtnFreeSave() {
      return (this.isPos && this.checkPayGubn() == "free" && this.checkSaveAvailable())? true : false;
    },
    /**
     * Web발급 Btn show/hide 여부
     */
    showBtnWebSave() {
      return (this.isPos && this.checkPayGubn() == "web" && this.checkSaveAvailable())? true : false;
    },
    /**
     * 결제처리 Btn show/hide 여부
     */
    showBtnPayMain() {
      return (this.isPos && this.checkPayGubn() == "pay" && this.checkSaveAvailable())? true : false;
    },
  },
  watch: {},
  methods: {
    //임시 카드 퍼블화면 열기 
    async cardPuplish() {
      //접속 시간 서버시간으로 설정
		  let systemTime = await http.getSystemTime();
      this.cardPopupUtils.openPopup('PGE_PBM_00061', this.$options.name, systemTime.nowDateTime, 850, 1100);
    },
    /**
     * 결제 구분 체크
     */
    checkPayGubn(){
      if (this.getMemGridCnt() > 0) {
        //WEB 발급건
        if (this.memDataProvider.getValue(0, 'webPayEndYn') == 'Y') {
          return "web";
        }
        // 무료발급건
        else if (this.freeKind == 'Y') {
          return "free";
        }
        // 결제처리 필요건
        else {
          return "pay";
        }
      }
      else {
        return "";
      }
    },
    /**
     * 현재 저장 가능 여부 체크
     */
    checkSaveAvailable() {
      if (this.getMemGridCnt() > 0) {
        let memberList = this.memDataProvider.getJsonRows();
        let isNoItemCd = false;
        _.some(memberList, (mem) => {
          if (utils.length(mem.itemCd) == 0) {
            isNoItemCd = true;
            return;
          }
        });
        if (isNoItemCd) {
          return false;
        }
        else {
          return true;
        }
      }
      else {
        return false;
      }
    },
    /**
     * 구매정기권정보 Grid mounted 되면 호출
     */
    memGridMounted() {
      //grid 초기화
      ({ "gridView": this.memGridView, "dataProvider": this.memDataProvider } = this.$refs.memGrid.initGrid());
      
      //Grid footer 보이게 설정
      this.memGridView.setFooters({ visible: true, });
      
      //grid style set 
      this.$refs.memGrid.setFitStyle("even");

      this.memGridView.setOptions({ summaryMode: "aggregate" });

    },
    /**
     * 구매정기권정보 Grid 셀 Click시 호출
     * @param { Object } grid
     * @param { Object } clickData
     */
    memGridCellClick(grid, clickData) {
      if (clickData.itemIndex < 0) {
        return;
      }
      
      //결제자 선택
      if (clickData.column == "payerCheck") {
        this.memGridView.commit();
        console.log("memGridCellClick.clickData.itemIndex==>", clickData.itemIndex);

        let len = grid.getJsonRows().length;
        for(let i=0; i<len; i++){
          if (i == clickData.itemIndex) {
            this.memGridView.setValue(i, "payerCheck", "Y");
          }
          else {
            this.memGridView.setValue(i, "payerCheck", "N");
          }
          
        }
        this.memGridView.commit();
      }
      else {
        //현재 선택 Row 변경
        let dataRow = grid.getDataRow(clickData.itemIndex);
        this.selMember = this.memDataProvider.getJsonRows(dataRow, dataRow)[0];
        this.selMemDataRow = dataRow;
        console.log("memGridCellClick.this.selMember",this.selMember);
        console.log("memGridCellClick.this.selMemDataRow",this.selMemDataRow);
        this.changeMember(this.selMember);
        //보기 click
        if (clickData.column == "detail") {
          //정기권 상세보기 팝업 호출
          if (utils.length(this.selMember.memshpUid) == 10 && utils.length(this.selMember.oldTicketNo) == 10) {
            this.openPopupOldTicketDetail(this.selMember.memshpUid, this.selMember.oldTicketNo);
          }
        }
        else if (clickData.column == "joinYcnt") {
          let paramList = {
            memshpUid: this.selMember.memshpUid,
          };
          http.request(this.$options.name, 'DTS_JNR_00008', {
            query: paramList
          }).then(res => {
            if (res) {
              if (res.data.resultCode == 1) {
                let memberList = this.memDataProvider.getJsonRows();
                _.some(memberList, (mem) => {
                  if (mem.memshpUid == res.data.memshpUid) {
                    mem.joinYcnt = res.data.joinYcnt;
                    mem.joinDcnt = res.data.joinDcnt;
                    mem.joinCnt = res.data.joinCnt;
                    return;
                  }
                }); 
                this.memDataProvider.fillJsonData(memberList, { fillMode: "set" });
              }
              else {
                utils.messageBox('alert', res.data.msg);
              }
            }
          }).catch(e => console.log(e))
        }
      }
    },
    /**
     * Click 카드 리더기 체크
     */
    clickCheckIcReader() {
      this.openPopupCard();
    },
    /**
     * 카드 리더기 체크(무결성체크) 열지 확인
     */
    async cinformOpenPopupCard() {
      
      let chekResult = await utils.getIcReaderCheckResult(this.$options.name, this.$store.getters.userInfo.userIp, this.icReaderPort);
      this.icReaderStatusMessage = chekResult.icReaderStatusMessage;
      this.icReaderCheckResult = chekResult.icReaderCheckResult;

      //무결성 체크 결과가 없거나 실패한 경우
      if ( !this.icReaderCheckResult ) {
        this.openPopupCard();
      }
    },
    /**
     * 카드리더기 무결성 체크창 띄우기
     */
    async openPopupCard() {
      //카드리더기 미사용여부 체크
      if (this.icReaderUseYn == 'N') {
        utils.messageBox('alert', this.$t('MSG_ALT_NOT_USE_IC_READER'));
        return;
      }

      //카드리더기 무결성 체크창 열려있는지 체크
      if (this.isOpenCardPopup()) {
        return;
      }
      
      //접속 시간 서버시간으로 설정
		  let systemTime = await http.getSystemTime();
      
      //접속정보 설정
      this.webrtcDatachannel.setConnectPage(
        this.cardPopupPage,  //popupPage
        systemTime.nowDateTime, // accessDateTime
        this.receiveMessageFromCardPage, // receiveCallBack
        this.initCardPopup, //initCallback
        this.closeCardPopup, // closeCallback
      );

      //팝업 열기
      this.cardPopupUtils.openPopup(this.cardPopupPage, this.$options.name, systemTime.nowDateTime, 350, 650);
       
      //접속하기  
      this.webrtcDatachannel.connectToPopup();
    },
    /**
     * 카드리더기 무결성 체크창이 떠있는지 체크
     */
    isOpenCardPopup() {
      if (this.cardPopupUtils.cardWindow != null && this.webrtcDatachannel.isOpenState()) {
        utils.messageBox('alert', this.$t('MSG_ALT_ALREADY_OPEN_CHECK_PG_POPUP'), null,
            () => { this.webrtcDatachannel.sendMessage({type: "focus"}); }
            );
        return true;
      }
      else {
        return false;
      }
    },
    /**
     * 카드리더기 무결성 체크 창이 Open되고 데이터 통신이 연결되면 호출
     */
    initCardPopup() {
      console.log("initCardPopup");
      this.webrtcDatachannel.sendMessage({type : "init"});
    },
    /**
     * 카드리더기 무결성 체크 창이 닫히면 호출
     */
    closeCardPopup() {
      this.cardPopupUtils.cardWindow = null;
    },
    /**
     * 카드리더기 무결성 체크창에서 전송된 데이터 호출
     * @param { Object } param
     */
    async receiveMessageFromCardPage(param) {
      if (param.type == "fail" || param.type == "success") {
        let chekResult = await utils.getIcReaderCheckResult(this.$options.name, this.$store.getters.userInfo.userIp, this.icReaderPort);
        console.log("chekResult", chekResult);
        this.icReaderStatusMessage = chekResult.icReaderStatusMessage;
        this.icReaderCheckResult = chekResult.icReaderCheckResult;
      }
    },
    /**
     * 조회구분 클릭
     * @param { String } searchGubn
     */
    clickSearchGubn(searchGubn) {
      this.searchGubn = searchGubn;
      this.searchText = '';

      switch (this.searchGubn) {
        //성명, 휴대폰 클릭시 멤버십 가입자리스트 팝업 호출
        case "name":
        case "mobile":
          this.readonlyTextSearchText = true;
          this.openModalMembership();
          break;
        //정기권, 예약확인증번호, 멤버십QR 호출시 텍스트창 활성화
        case "ticket":
        case "rsv":
        case "qr":
          this.readonlyTextSearchText = false;
          this.$refs.searchText.focus();
          break;
      }
    },
    changeMember(selMember) {
      this.selMember = selMember;
      console.log("1.changeMember.selMember", this.selMember);
      console.log("1-1.changeMember.selMember.payerCheck", this.selMember.payerCheck);

      if (this.selMember == null || utils.length(this.selMember.memshpUid) == 0) {
        console.log("2-1.changeMember.구매정기권 선택 해제!");
        //=================================

        // TO-DO 1. 사진 초기화
        this.clearPhoto();

        // 2. 권종 정보 초기화
        this.$refs.availableItem.clearAvailableItem();

        // 3. 선택 권종 정보 초기화
        this.changeItem(null, false);
        //=================================
      }
      else {
        console.log("2-2.changeMember.구매정기권 선택!");
        console.log("2-2-1.changeMember",this.selMember);
        // TO-DO 1. 사진 인터페이스가 되면 사진 정보 조회 세팅 필요
        this.getPhoto();

        //스마트예약의 결제완료건은 제외
        if (this.checkPayGubn() != 'web') {

          // 2. 이용가능 권종 정보 조회
          this.$refs.availableItem.changeMember(
            this.selMember.memshpUid, 
            this.parkKind, 
            this.selMember.yearKind,
            this.selMember.joinYcnt, 
            this.selMember.oldItemCd);

          // 3.선택 권종 정보 있는 경우 세팅
          if (utils.length(this.selMember.itemCd) > 0) {
            console.log("2-2-2.changeMember",this.selMember);
            
            this.changeItem(this.getItemFromMember(this.selMember), false);
          }
          else {
            // 기본으로 할인정보 보여줌
            this.isShowDiscount = true;

            //할인정보 삭제
            this.$refs.discount.deleteDicount(this.selMember.memshpUid);

            // 제휴할인 Disabled
            this.$refs.discount.discountDisabled();
          }
        }
      }
    },
    /**
     * Member에서 Item정보 추출하기
     * @param { Object } selMember
     */
    getItemFromMember(selMember) {
      let selItem = {};
      selItem.itemCd = selMember.itemCd;
      selItem.itemNm = selMember.orgItemNm;
      selItem.itemKind = selMember.itemKind;
      selItem.issueStartDate = selMember.issueStartDate;
      selItem.issueEndDate = selMember.issueEndDate;
      selItem.expireTypeCd = selMember.expireTypeCd;
      selItem.limitExpireDate = selMember.limitExpireDate;
      selItem.enableDay = selMember.enableDay;
      selItem.expireExtendDay = selMember.expireExtendDay;
      selItem.condTypeCd = selMember.itemCondTypeCd;
      selItem.price = selMember.price;
      selItem.joinKind = selMember.joinKind;
      selItem.planKind = selMember.planKind;
      selItem.acKind = selMember.acKind;
      selItem.condTticketTypeKindypeCd = selMember.ticketTypeKind;
      selItem.availDay = selMember.availDay;
      selItem.periodCnt = selMember.periodCnt;
      selItem.useCnt = selMember.useCnt;
      selItem.ilmoYn = selMember.ilmoYn;
      selItem.itemPreJoinYn = selMember.itemPreJoinYn;
      selItem.memberDcFg = selMember.memberDcFg;
      return selItem;
    },
    /**
     * 현재 선택된 구매정기권 정보에 할인명 가져오기
     */
    getDiscountType() {
      return this.selMember.discountType;
    },
    /**
     * 현재선발행권 적용여부
     */
    checkPreIssePayYn() {
      let result = {};
      if (this.getMemGridCnt() == 0) {
        result.amtMarkKind0Yn = "N";
        result.amtMarkKind1Yn = "N";
      }
      else {
        result.amtMarkKind0Yn = (this.memDataProvider.searchDataRow({fields:['preIssuePayYn', 'amtMarkKind'], values: ['Y', '0']}) > -1 )? "Y" : "N";
        result.amtMarkKind1Yn = (this.memDataProvider.searchDataRow({fields:['preIssuePayYn', 'amtMarkKind'], values: ['Y', '0']}) > -1 )? "Y" : "N";
      }
      return result;
    },
    /**
     * 현재 설정된 제휴할인 정보 세팅
     * @param { String } memshpUid
     * @param { String } discountType
     * @param { Object } discountInfo
     */
    setDiscountInfo(memshpUid, discountType, discountInfo) {
      if (this.selMember.memshpUid == memshpUid) {
        switch (discountType) {
          case 'card':
          case 'cust':
            console.log("setDiscountInfo:["+ discountType +"]");
            console.log("setDiscountInfo.discountInfo:", discountInfo);
            this.selMember.discountType = discountType;
            this.selMember.preIssuePayYn = 'N';
            this.selMember.itemNm = discountInfo.itemNm;
            this.selMember.condTypeCd = discountInfo.condTypeCd;
            this.selMember.dcType = discountInfo.dcType;
            this.selMember.dcNm = discountInfo.dcNm;
            this.selMember.dcAmt = discountInfo.dcAmt;
            this.selMember.saleAmt = discountInfo.saleAmt;
            this.selMember.approveCardAmt = discountInfo.approveCardAmt;
            this.selMember.cardCompCd = discountInfo.cardCompCd;
            this.selMember.cardSvcCd = discountInfo.cardSvcCd;
            this.selMember.subType = discountInfo.subType;
            this.selMember.subAmt = discountInfo.subAmt;
            this.selMember.subAmtCard = discountInfo.subAmtCard;
            this.selMember.subTypeCard = discountInfo.subTypeCard;
            break;
          case 'preIssue':
            console.log("setDiscountInfo:["+ discountType +"]");
            console.log("setDiscountInfo.discountInfo:", discountInfo);
            this.selMember.discountType = discountType;
            this.selMember.preIssuePayYn = 'Y';
            this.selMember.preIssueNo = discountInfo.preIssueNo;
            this.selMember.preIssuePriceAmt = discountInfo.preIssuePriceAmt;
            this.selMember.preIssueCnt = discountInfo.preIssueCnt;
            this.selMember.preIssueAmt = discountInfo.preIssueAmt;
            this.selMember.cond11laAmt = discountInfo.cond11laAmt;
            this.selMember.cond11l7Amt = discountInfo.cond11l7Amt;
            this.selMember.amtMarkKind = discountInfo.amtMarkKind;
            this.selMember.condTypeCd = discountInfo.condTypeCd;
            this.selMember.dcType = discountInfo.dcType;
            this.selMember.price = discountInfo.price;
            this.selMember.dcAmt =  discountInfo.dcAmt;
            this.selMember.saleAmt = discountInfo.saleAmt;
            this.selMember.itemNm = discountInfo.itemNm;
            this.selMember.dcNm = discountInfo.dcNm;
            this.selMember.cardCompCd = discountInfo.cardCompCd;
            this.selMember.subTypeCard = discountInfo.subTypeCard;
            this.selMember.subAmtCard = discountInfo.subAmtCard;
            this.selMember.externalYn = discountInfo.externalYn;
            break;
          case 'ilmo':
            console.log("setDiscountInfo:["+ discountType +"]");
            console.log("setDiscountInfo.discountInfo:", discountInfo);
            this.selMember.discountType = discountType;
            this.selMember.preIssuePayYn = 'N';
            this.selMember.condTypeCd = discountInfo.condTypeCd;
            this.selMember.dcType = discountInfo.dcType;
            this.selMember.dcNm = discountInfo.dcNm;
            this.selMember.itemNm = discountInfo.itemNm;
            this.selMember.dcAmt = discountInfo.dcAmt;
            this.selMember.saleAmt = discountInfo.saleAmt;
            this.selMember.approveCardAmt = discountInfo.approveCardAmt;
            this.selMember.ilmoCardCode = discountInfo.ilmoCardCode;
            this.selMember.ilmoCardNo = discountInfo.ilmoCardNo;
            this.selMember.ilmoAmt = discountInfo.ilmoAmt;
            this.selMember.ilmoUseAmt = discountInfo.ilmoUseAmt;
            break;
          default:
            console.log("setDiscountInfo:["+ discountType +"]");
            console.log("setDiscountInfo.discountInfo:", discountInfo);
            this.selMember.discountType = '';
            this.selMember.preIssuePayYn = 'N';
            this.selMember.preIssueNo = '';
            this.selMember.preIssuePriceAmt = '';
            this.selMember.preIssueCnt = '';
            this.selMember.preIssueAmt = '';
            this.selMember.cond11laAmt = '';
            this.selMember.cond11l7Amt = '';
            this.selMember.amtMarkKind = '';
            this.selMember.condTypeCd = '';
            this.selMember.dcType = '';
            this.selMember.dcAmt = '';
            this.selMember.dcNm = '';
            this.selMember.cardCompCd = '';
            this.selMember.subType = '';
            this.selMember.subAmt = '';
            this.selMember.subAmtCard = '';
            this.selMember.subTypeCard = '';
            this.selMember.ilmoCardCode = '';
            this.selMember.ilmoCardNo = '';
            this.selMember.ilmoAmt = '';
            this.selMember.ilmoUseAmt = '';

            if (this.selItem != null) {
              console.log("setDiscountInfo call setItemToMember");
              this.setItemToMember(this.selItem, null, false);
            }
            else {
              this.selMember.price = '';
              this.selMember.saleAmt = '';
              this.selMember.itemNm = "";
            }
        }
        console.log("setDiscountInfo.this.selMemDataRow",this.selMemDataRow);
        console.log("setDiscountInfo.this.selMember",this.selMember);
        this.$refs.memGrid.updateRow(this.selMemDataRow, this.selMember);

        //합계 재계산        
        this.setPayInfo();
      }
    },
    /**
     * 현재 설정된 임직원 정보 세팅
     * @param { String } memshpUid
     * @param { String } itemCd
     * @param { String } empNo
     */
    setEmpInfo(memshpUid, itemCd, empNo, empType) {
      if (this.selMember.memshpUid == memshpUid && this.selMember.itemCd == itemCd) {
        this.selMember.empNo = empNo;
        this.selMember.empType = empType;

        console.log("setEmpInfo.this.selMember.empNo=>", this.selMember.empNo);
        console.log("setEmpInfo.this.selMember.empType=>", this.selMember.empType);
        this.$refs.memGrid.updateRow(this.selMemDataRow, this.selMember);
      }
    },
    /**
     * 권종선택
     * @param { Object } selItem
     * @param { boolean } isItemCheck
     */
    selectItem(selItem, isItemCheck) {
      console.log("1.selectItem", selItem);
      console.log("2.selectItem", isItemCheck);
      if (this.selMember != null && this.selMember.memshpUid != null) {
        this.$refs.discount.deleteDicount(this.selMember.memshpUid);
        this.changeItem(selItem, isItemCheck);
      }
      else {
        this.$refs.availableItem.clearAvailableItem();
      }      
    },
    /**
     * 권종 변경
     * @param { Object } selItem
     * @param { boolean } isItemCheck
     */
    changeItem(selItem, isItemCheck) {
      console.log("1.changeItem", selItem);
      console.log("2.changeItem", isItemCheck);
      // 스마트예약의 결제완료건은 제외
      if (this.checkPayGubn() != 'web') {
        this.selItem = selItem;

        if (this.selItem == null) {
          
          // 기본으로 할인정보 보여줌
          this.isShowDiscount = true;
          this.$refs.empInfo.clearEmpInfo();
          
          console.log("3-1.changeItem.권종 선택 해제!");
          // 1. 구매정기권 정보에 권종정보 초기화
          if (this.selMember != null && utils.length(this.selMember.memshpUid) > 0) {
            //권종정보 Clear
            if (utils.length(this.selMember.itemCd) > 0) {
              this.setClearItemInfoFromMember(this.selMember);
            }

            //할인정보 삭제
            this.$refs.discount.deleteDicount(this.selMember.memshpUid);
          }

          // 2. 제휴할인 Disabled
          this.$refs.discount.discountDisabled();
        }
        else {
          console.log("3-2.changeItem.권종 선택!");

          // 1. 구매정기권 정보에 권종정보 세팅
          console.log("changeItem call setItemToMember");
          if (!this.setItemToMember(this.selItem, null, isItemCheck)) {
            return;
          };

          console.log("changeItem.isItemCheck:", isItemCheck);

          if (isItemCheck) {
            //할인정보 삭제
            this.$refs.discount.deleteDicount(this.selMember.memshpUid);
            //구매정기권정보에 할인정보 Clear
            this.setDiscountInfo(this.selMember.memshpUid, 'X');
          }
          console.log("3-3.changeItem.권종 선택");
          console.log("3-3.changeItem.this.checkPayGubn()=>", this.checkPayGubn());
          
          //무료는 할인 선택 불가
          if (this.checkPayGubn() == 'free') {
            // 기본으로 할인정보 보여줌
            this.isShowDiscount = false;

            // 2-1. 제휴할인 Disabled
            this.$refs.discount.discountDisabled(); 
            
            // 2-1. 임직원 정보 세팅
            console.log("this.selMember.empNo:",this.selMember.empNo);
            this.$refs.empInfo.initEmpInfo(this.selMember.memshpUid, this.selMember.name, this.selItem.itemCd, this.selMember.empNo); 
          }
          else {
            // 기본으로 할인정보 보여줌
            this.isShowDiscount = true; 
            // 2-1. 제휴할인 Enabled
            this.$refs.discount.discountEnabled(this.selMember.memshpUid, this.selItem);
            // 2-2. 임직원 Clear
            this.$refs.empInfo.clearEmpInfo();
          }
        }
      }
    },
    /**
     * 멤버정보에 선택된 권종정보를 세팅한다.
     * @param { Object } selItem
     * @param { Object } selMember
     * @param { boolean } isItemCheck
     */
    setItemToMember(selItem, selMember, isItemCheck) {
      selMember = this.checkNullSelMember(selMember);
      
      isItemCheck == this.checkNullIsItemCheck(isItemCheck);
      console.log("1.setItemToMember", selItem);
      console.log("2.setItemToMember", selMember);
      console.log("3.setItemToMember", isItemCheck);
      if (selMember != null && selMember.memshpUid != null) {
        let discountType = selMember.discountType;

        // Item Check Step1
        if (!this.checkItemStep1ForSetItemToMember(selItem, selMember, isItemCheck)) {
          return false;
        }

        // Item Check Step2
        if (!this.checkItemStep2ForSetItemToMember(discountType, selItem, selMember, isItemCheck)) {
          return false;
        }
        
        //무료티켓 세팅
        this.setFreeTicket(selItem);

        selMember.empYn = this.freeKind;

        //Item정보 Member 세팅
        if (utils.length(selMember.rsvNo) > 0 ) {
          if (selMember.orgItemCd == selItem.itemCd) {
            selMember.webYn = "Y";
          }
          else {
            selMember.webYn = "N";
          }
        }
        selMember.itemCd = selItem.itemCd;
        selMember.itemNm = selItem.itemNm;
        selMember.orgItemNm = selItem.itemNm;   
        selMember.expireTypeCd = selItem.expireTypeCd;
        selMember.limitExpireDate = selItem.limitExpireDate;
        selMember.enableDay = selItem.enableDay;
        selMember.expireExtendDay = selItem.expireExtendDay;
        selMember.condTypeCd = selItem.condTypeCd;
        selMember.itemCondTypeCd = selItem.condTypeCd;
        selMember.price = selItem.price;  
        selMember.joinKind = selItem.joinKind; 
        selMember.planKind = selItem.planKind; 
        selMember.acKind = selItem.acKind;  
        selMember.ticketTypeKind = selItem.ticketTypeKind;  
        selMember.availDay = selItem.availDay;
        selMember.periodCnt = selItem.periodCnt;
        selMember.ilmoYn = selItem.ilmoYn;
        selMember.itemPreJoinYn = selItem.itemPreJoinYn;
        selMember.periodCnt = selItem.periodCnt;
        if (selMember.webPayEndYn != "Y") {
          selMember.dcAmt = 0;
          selMember.saleAmt = selItem.price;
        }
        selMember.memberDcFg = selItem.memberDcFg;

        //할인 정보가 있는 경우
        this.setDiscountInfoForSetItemToMember(discountType, selMember, selItem);
        
        //선발행권 사용 여부 Clear
        this.clearPreIssuePayYn(discountType, selMember);

        if (this.memDataProvider != null && this.selMemDataRow != null && this.selMemDataRow > -1 && selMember.memshpUid == this.selMember.memshpUid) {
          console.log("4.setItemToMember.memGrid.updateRow");
          console.log("this.selMemDataRow",this.selMemDataRow);
          console.log("selMember",selMember);
          this.selMember = selMember;
          this.$refs.memGrid.updateRow(this.selMemDataRow, selMember);
        }

        // 합계 재계산
        this.setPayInfo();

        return true;
      }
    },
    /**
     * selMember Null Check
     * @param { Object } selMember
     */
    checkNullSelMember(selMember) {
      if (selMember == null) {
        return this.selMember;
      }
      else {
        return selMember;
      }
    },
    /**
     * isItemCheck Null Check
     * @param { boolean } isItemCheck
     */
    checkNullIsItemCheck(isItemCheck) {
      if (isItemCheck == null) {
        return false;
      }
      else {
        return isItemCheck;
      }
    },
    /**
     * SetItemToMember 메소드의 Item Check(Step1)
     * @param { Object } selItem
     * @param { Object } selMember
     * @param { boolean } isItemCheck
     */
    checkItemStep1ForSetItemToMember(selItem, selMember, isItemCheck) {
      if (isItemCheck) {
        let itemKind = selItem.itemKind; // 권종구분 
        let issueStartDate = selItem.issueStartDate; // 발급시작일자
        let issueEndDate =  selItem.issueEndDate; // 발급종료일자
        
        let oldExpireDate = selMember.oldExpireDate;

        //발급일자, 만기일자 계산
        let returnVal = this.calIssueExpireDate(selItem, selMember.oldTicketStatusValue, selMember.oldExpireDate);
        //시즌권
        if (!this.checkSeasnTicket(itemKind, returnVal.issueDate, returnVal.expireDate, issueStartDate, issueEndDate, oldExpireDate)) { 
          return false;
        }        
        selMember.issueDate = returnVal.issueDate;
        selMember.expireDate = returnVal.expireDate;

        //선가입 제한 사항 체크
        if (!this.checkLimitPreTicket(selItem, selMember)) {
          return false;
        }

        selMember.preJoinYn = returnVal.preJoinYn;

        //발급일자가 오늘보다크면 선가입, ageTypeCd를 발급일(issueDate) 기준으로 변경.
        this.checkIssueDateOverNowDate (selMember);

        //무료티켓 혼용 제약
        if (!this.checkMixedFreeAndPaid(selItem)) {
          return false;
        }
      }

      return true;
    },
    /**
     * SetItemToMember 메소드의 Item Check(Step2)
     * @param { String } discountType
     * @param { Object } selItem
     * @param { Object } selMember
     * @param { boolean } isItemCheck
     */
    checkItemStep2ForSetItemToMember(discountType, selItem, selMember, isItemCheck) {
      if (isItemCheck) {
        let itemKind = selItem.itemKind; // 권종구분 
        let issueStartDate = selItem.issueStartDate; // 발급시작일자
        let issueEndDate =  selItem.issueEndDate; // 발급종료일자
        let ageTypeCd = selMember.ageTypeCd;
        let planKind = selItem.planKind;
        let acKind = selItem.acKind;

        //제휴 와 일반 카드 혼용 불가 및 1명 제약
        if (!this.checkMixedAffiliateCardAndOnlyOne(selItem, selMember)) {
          return false;
        }

        //인원유형 체크
        if (utils.length(ageTypeCd) == 0) {
          utils.messageBox('alert', this.$t('NOT_EXIST_AGE_TYPE_CD'));
          return false;
        }

        //티켓과 인원유형 체크
        if (!this.checkTicketWithAgeTypeCd(discountType, planKind, ageTypeCd, acKind, selMember)) {
          return false;
        }

        selMember.itemKind = itemKind;
        selMember.issueStartDate = issueStartDate;
        selMember.issueEndDate = issueEndDate;
      }
      return true;
    },
    /**
     * 선발행권 사용여부 Clear
     * @param { String } discountType
     * @param { Object } selMember
     */
    clearPreIssuePayYn(discountType, selMember) {
      if (utils.length(discountType) == 0) {
        selMember.preIssuePayYn = '';
      }
    },
    /**
     * 시즌권 체크
     * @param { String } itemKind
     * @param { String } issueDate
     * @param { String } expireDate
     * @param { String } issueStartDate
     * @param { String } issueEndDate
     * @param { String } oldExpireDate
     */
    checkSeasnTicket(itemKind, issueDate, expireDate, issueStartDate, issueEndDate, oldExpireDate) {
      //시즌권
      if (itemKind == 'IT04') { 
        //시즌권 발급 시작일이 이전만기일과 같거나 이전 일 때
        if (parseInt(issueDate) <= parseInt(oldExpireDate)) {  
          utils.messageBox('alert', this.$t('MSG_ALT_DUPLICATE_OLD_PERIOD'));
          return false;
        }
        //시즌권의 발급가능일자가 지났을 때
        else if (parseInt(issueEndDate) < parseInt(this.nowDate)) {
          utils.messageBox('alert', this.$t('MSG_ALT_EXPIRE_ISSUE_START_DATE'));
          return false;
        }
      }
      return true;
    },
    /**
     * 선가입 제한 사항 체크
     * @param { Object } selItem
     * @param { Object } selMember
     */
    checkLimitPreTicket(selItem, selMember) {
      //선가입 제한 사항 체크
      let returnVal = this.checkPreJoinLimit(selItem, selMember.oldExpireDate, selMember.oldTicketTypeKind);
      console.log("checkPreJoinLimit.returnVal", returnVal);
      if (utils.length(returnVal.rtnMsg) > 0) {
        utils.messageBox('alert', returnVal.rtnMsg);

        //가입 불가인 경우
        if (!returnVal.isJoinAvailable) {
          return false;
        }
      }
      return true;
    },
    /**
     * 무료권 체크 세팅
     * @param { Object } selItem
     */
    setFreeTicket(selItem) {
      let freeType = selItem.condTypeCd;
      let freePrice = selItem.price;

      console.log("freeType:",freeType);
      console.log("freePrice:",freePrice);

      if (freeType == "FREE" && parseInt(freePrice) == 0) {
        this.freeKind = "Y";
        this.priceKind = "6";
      }else{
        this.freeKind = "N";
        this.priceKind = "";
      }
    },
    /**
     * 발급일자가 오늘보다크면 선가입, ageTypeCd를 발급일(issueDate) 기준으로 변경.
     * @param { Object } selMember
     */
    checkIssueDateOverNowDate (selMember) {
      //발급일자가 오늘보다크면 선가입, ageTypeCd를 발급일(issueDate) 기준으로 변경.
      if (parseInt(selMember.issueDate) > parseInt(this.nowDate)) {
        selMember.preJoinYn = 'Y'; // 선가입
        this.getAgeTypeCd(selMember, selMember.issueDate); // 발급일(가입일) 기준으로 ageTypeCd 변경
      }
      else {
        selMember.preJoinYn = 'N'; // 선가입
      }
    },
    /**
     * 무료, 유료 티켓 혼용 불가 체크
     * @param { Object } selItem
     */
    checkMixedFreeAndPaid(selItem) {
      if (this.priceKind == '6') {
        let dataRow = this.memDataProvider.searchDataRow({fields:['empYn'], values: ['N']});
        if (dataRow > -1) {
          utils.messageBox('alert', this.$t('MSG_ALT_NOT_MIX_FREE_AND_PAY_TICKET'));
          return false;
        }
      }
      else {
        //무료가 아닌데 판매금액이 0인 경우
        if (selItem.ticketTypeKind != 'G605' && parseInt(selItem.price) == 0) {
          utils.messageBox('alert', this.$t('MSG_ALT_CONFIRM_SALE_AMT'));
          return false;
        }
        let dataRow = this.memDataProvider.searchDataRow({fields:['empYn'], values: ['Y']});
        if (dataRow > -1) {
          utils.messageBox('alert', this.$t('MSG_ALT_NOT_MIX_FREE_AND_PAY_TICKET'));
          return false;
        }
      }
      return true;
    },
    /**
     * 제휴 와 일반카드 혼용불가 및 1명 제약
     * @param { Object } selItem
     * @param { Object } selMember
     */
    checkMixedAffiliateCardAndOnlyOne(selItem, selMember) {
      if (selItem.condTypeCd == "15L1") {
        if (this.getMemGridCnt() > 1 ) {
          // 제휴티켓은 1명만 접수할 수 있습니다.
          utils.messageBox('alert', this.$t('MSG_ALT_JOIN_ONLY_ONE_AFFILIATE_TICKET'));
          return false;
        }
      } 
      else {
        if (this.getMemGridCnt() > 1) {
          let jsonRows = this.memDataProvider.getJsonRows();
          let findDataRow = -1;
          _.some(jsonRows, (row, idx)=>{
            if (row.condTypeCd == '15L1' && row.memshpUid != selMember.memshpUid) {
              findDataRow = idx;
              return;
            }
          }) 
          if (findDataRow > -1) {
            utils.messageBox('alert', this.$t(' MSG_ALT_NOT_MIX_AFFILIATE_AND_NORMAL_TICKET'));
            return false;
          }
        }
      }
      return true;
    },
    /**
     * 티켓과 인원유형 체크
     * @param { String } discountType
     * @param { String } planKind
     * @param { String } ageTypeCd
     * @param { String } acKind
     * @param { Object } selMember
     */
    checkTicketWithAgeTypeCd(discountType, planKind, ageTypeCd, acKind, selMember) {
      //선발행티켓이 아니면...
      if (discountType != 'preIssue') {
        // 시니어는 경로 유형에만 적용할 수 있습니다.
        if(planKind == "T750" && ageTypeCd != "C104") {	
          utils.messageBox('alert', this.$t('MSG_ALT_APPLY_SENIOR_TICKET_TO_OLD_AGE_TYPE'));
          this.setClearItemInfoFromMember(selMember);
          return false;
        }
        // 만36개월 미만인 가입자는 베이비 유형에만 적용할 수 있습니다.
        else if (planKind == "T760" && ageTypeCd != "C106") {
          utils.messageBox('alert', this.$t('MSG_ALT_APPLY_BABY_TICKET_TO_UNDER_36M'));	
          this.setClearItemInfoFromMember(selMember);
          return false;
        }
        //무료권종 아닌 경우...
        else if(this.priceKind != "6") {
          //티켓리스트에서 선택한 티켓이 대인  
          if(acKind == "T901" && (ageTypeCd == "C103" || ageTypeCd == "C105" || ageTypeCd == "C106") ) {  
            utils.messageBox('alert', this.$t('MSG_ALT_NOT_APPLY_ADULT_TICKET_TO_BABYS'));
            this.setClearItemInfoFromMember(selMember);
            return false;              
          } 
          //티켓리스트에서 선택한 티켓이 소인  
          else if (acKind == "T902" && (ageTypeCd == "C101" || ageTypeCd == "C104")) {  
            utils.messageBox('alert', this.$t('MSG_ALT_NOT_APPLY_CHILD_TICKET_TO_ADULT_OR_SENIOR'));
            this.setClearItemInfoFromMember(selMember);
            return false;
          } 
          //시니어가 경로권종을 선택하지 않은 경우 알림
          if (planKind != "T750" && ageTypeCd == "C104") {
            utils.messageBox('alert', this.$t('MSG_ALT_AVAILABLE_JOIN_SENIOR_AND_PLUS_TICKET'));
          }
          //베이비가 베이비권종을 선택하지 않은 경우 알림
          if (planKind != "T760" && ageTypeCd == "C106") {
            utils.messageBox('alert', this.$t('MSG_ALT_AVAILABLE_JOIN_BABY_TICKET'));
          }
        }
      }
      return true;
    },
    /**
     * Item 선택시 기존 할인정보 있으면 세팅
     * @param { String } discountType
     * @param { Object } selMember
     * @param { boolean } isItemCheck
     */
    setDiscountInfoForSetItemToMember(discountType, selMember, selItem) {
      //할인 정보가 있는 경우
      if (utils.length(discountType) > 0) {
        console.log("0.setDiscountInfoForSetItemToMember.discountType", discountType);
        let discountInfo = this.$refs.discount.getDiscountInfo(selMember.memshpUid);
        console.log("1.setDiscountInfoForSetItemToMember.discountType", discountInfo);
        if (discountInfo != null) {
          console.log("2-1.setDiscountInfoForSetItemToMember.discountInfo", discountInfo);
          this.setDiscountInfo(selMember.memshpUid, discountType, discountInfo);
        }
        else {
          console.log("2-2.setDiscountInfoForSetItemToMember.discountInfo", discountInfo);
        }
      }
    },
    /**
     * 멤버정보에서 권종 정보 Clear
     */
    setClearItemInfoFromMember(selMember) {
      console.log("setClearItemInfoFromMember.selMember.payerCheck=>",selMember.payerCheck);
      selMember.empYn = '';

      selMember.itemCd = '';
      selMember.itemNm = '';
      selMember.orgItemCd = '';
      selMember.orgItemNm = '';
      selMember.itemKind = '';
      selMember.issueStartDate = '';
      selMember.issueEndDate = ''; 
      selMember.expireTypeCd = '';
      selMember.limitExpireDate = '';
      selMember.enableDay = 0;
      selMember.expireExtendDay = 0;
      selMember.condTypeCd = '';
      selMember.itemCondTypeCd = '';
      selMember.price = '';  
      selMember.joinKind = ''; 
      selMember.planKind = ''; 
      selMember.acKind = '';  
      selMember.ticketTypeKind = '';
      selMember.availDay = 0;
      selMember.periodCnt = 0;
      selMember.ilmoYn = '';
      selMember.itemPreJoinYn = '';
      selMember.periodCnt = 0;
      selMember.memberDcFg = 'N';

      selMember.issueDate = '';
      selMember.expireDate = '';
      selMember.dcNm = '';
      selMember.dcAmt = '';
      selMember.saleAmt = '';
      selMember.approveCardAmt = 0;
      selMember.empNo = '';
      selMember.empType = '';

      if (this.selMember.memshpUid == selMember.memshpUid) {
        this.selItem = null;
        this.selMember = selMember;
        if (this.selMemDataRow > -1) {
          console.log("this.selMemDataRow",this.selMemDataRow);
          this.$refs.memGrid.updateRow(this.selMemDataRow, selMember);
        }

        //구매정기권정보에 할인정보 Clear
        this.setDiscountInfo(this.selMember.memshpUid, 'X');
        this.$refs.discount.discountDisabled();
      }
      
    },
    /**
     * 현재선택 Member 초기화
     */
    clearSelMember() {
      for (let key in this.selMember) {
        this.selMember[key] = ''; 
      }
      
      this.changeMember(this.selMember);
    },
    /**
     * 초기화
     */
    clickInit() {
      console.log("1.clickInit");
      //저장완료 여부 초기화
      this.isSaveEnd = false;

      this.payerMemshpUid = "";
      this.payerMemberKind = "";

      //조회 조건 초기화
      this.searchGubn = '';
      this.searchText = '';

      //Grid 초기화
      this.memGridView.commit();
      this.memDataProvider.fillJsonData([], { fillMode: "set" });

      //선택 초기화
      this.clearSelMember();
      this.selMemDataRow = -1;
      //this.changeItem(null, false);

      //할인정보 모두 삭제하기
      this.$refs.discount.deleteDicountAll();

      //합계 재계산
      this.setPayInfo();
    },
    /**
     * 선택삭제
     */
    clickDelSelect() {
      this.memGridView.commit();

      if (this.getMemGridCnt() == 0) {
        utils.messageBox('alert', this.$t('TRY_AGAIN_AFTER_SEARCH'));
        return;
      }
      if (this.checkPayGubn() == 'web') {
        utils.messageBox('alert', this.$t('MSG_ALT_NOT_DEL_WEB_RESERVE'));
        return;
      }

      if (this.selMemDataRow > -1 && this.selMember != null) {
        let memshpUid = this.selMember.memshpUid;
        
        //실제 grid에서 삭제 처리
        this.memDataProvider.removeRow(this.selMemDataRow);

        //현재 선택된 Row가 삭제되면 선택 해제
        this.$refs.discount.deleteDicount(memshpUid);
        this.clearSelMember();
        this.selMemDataRow = -1;
        this.changeItem(null, false);


        //합계 재계산
        this.setPayInfo();
      }
    },
    /**
     * 임시저장 조회 팝업 열기
     */
    clickOpenModalMemberTemp() {
      utils.openLayerPopup("PGE_CTM_00002", this.onMemberTempPopupCallback, {
        pageInitialData: {},
        width: "1024px",
        height: "auto",
      });
    },
    /**
     * 임시저장 조회 팝업 callback
     * @param { Array } data
     */
    onMemberTempPopupCallback(data) {
      if (data != null && data.length > 0) {
        this.clickInit();
        let benefitYn = 'N';
        let centerChkYn = 'N';
        
        _.forEach(data, (mem) => {
          if (utils.length(mem.discountType) > 0 ) {
             this.$refs.discount.setDiscountInfoFromMember(mem);
          }
          if (mem.payerMemshpUid == mem.memshpUid) {
            mem.payCheck = 'Y';
          }
          if (mem.benefitYn == 'Y') {
            benefitYn = 'Y';
          }
          if (mem.centerChkYn == 'Y') {
            centerChkYn = 'Y';
          }
          mem.detail = (mem.oldTicketNo != null && mem.oldTicketNo.trim().length == 10) ? "보기" : "";
        });

        this.memDataProvider.fillJsonData(data, { fillMode: "set" });

        //첫번째 구매정기권 정보 선택
        this.focusMemGridRow(0, "name");

        let noteMsg = '';
				if(benefitYn == "Y") {
					noteMsg = this.$t('MSG_ALT_SEL_MANY_CHILDREN_OR_DIABLED_DISCOUNT')+"\n";
				}
				if(centerChkYn == "Y") {
					noteMsg += this.$t('MSG_ALT_CHECK_DOCUMENT_BEFORE_PAY');
				}
        if (noteMsg.length != '') {
          utils.messageBox('alert', noteMsg);
        }
        
        //결제정보 새로 세팅
        this.setPayInfo();
      }
    },
    /**
     * 조회/추가 버튼 Click
     */
    clickSearchOrAdd() {
      if (utils.length(this.searchGubn) == 0) {
        utils.messageBox('alert', this.$t('MSG_ALT_PLZ_SEL_SEARCH_TYPE'));
        return true;
      }
      else if (this.searchGubn == 'name' || this.searchGubn == 'tel') {
        this.openModalMembership();
        return;
      }
      else if (this.searchGubn == 'ticket') {
        if (this.searchText == null || this.searchText.trim().length != 10) {
          utils.messageBox('alert', this.$t(' MSG_ALT_PLZ_INPUT_TICKET_NO'), null, () => { this.$refs.searchText.focus(); });
          return true;
        }
      }
      else if (this.searchGubn == 'rsv') {
        if (this.searchText == null || this.searchText.trim().length != 16) {
          utils.messageBox('alert', this.$t(' MSG_ALT_PLZ_INPUT_RSV_PROOF_NO'), null, () => { this.$refs.searchText.focus(); });
          return true;
        }
      }
      else if (this.searchGubn == 'qr') {
        if (this.searchText == null || this.searchText.trim().length == 0) {
          utils.messageBox('alert', this.$t('MSG_ALT_PLZ_INPUT_MEMBER_QR'), null, () => { this.$refs.searchText.focus(); });
          return true;
        }
      }
      this.searchText = this.searchText.trim();

      //구매정기권 정보 서버 조회하기
      const params = {
        parkKind: this.parkKind,
        searchGubn: this.searchGubn,
        searchText: this.searchText,
      }

      //스마트예약확인증번호 조회 인 경우 Grid Clear
      if (this.searchGubn == "rsv" ) {
        this.memDataProvider.fillJsonData([], { fillMode: "set" });
        this.clearSelMember();
        this.selMemDataRow = -1;
      }
      
      http.request(this.$options.name, 'DTS_JNR_00002', {
        query: params,
      }).then(res => {
        if (res.data != null && res.data.length > 0) {
          if (this.searchGubn == "rsv") {
            this.addMemberList( 'Y', res.data);
          } 
          else {
            this.addMemberList( 'N', res.data);
            this.searchText = "";
            this.$refs.searchText.focus();
          }
        }
      }).catch(error => console.log(error));
    },
    /**
     * 구매 정기권 정보에 추가
     * @param { String } webYn - Y/N
     * @param { Array } addList
     */
    addMemberList(webYn, addList) {
      if (webYn == "Y") {
        
				let benefitYn = "N";
				let centerChkYn = "N";
        let selMember = null;
        let isPayChek = false;
        let visitPlDt = "";
        let webPayEndYn = "N";
        _.forEach(addList, (mem, idx)=> {

          console.log("mem", mem);
          
          let returnVal = this.calIssueExpireDate(mem, mem.oldTicketStatusValue, mem.oldExpireDate);
          mem.issueDate = returnVal.issueDate;
          mem.expireDate = returnVal.expireDate;

          this.getAgeTypeCd(mem, mem.issueDate);

          mem.preJoinYn = (this.nowDate < mem.issueDate)? "Y" : "N";
          mem.detail = (mem.oldTicketNo != null && mem.oldTicketNo.trim().length == 10) ? "보기" : "";

          // 다자녀/복지 할인
					if (benefitYn == "N" && mem.benefitYn == "Y") {
						benefitYn = "Y";
					}
					// 센타방문
					if(centerChkYn == "N" && mem.centerChkYn == "Y") {
						centerChkYn = "Y";
					}

          if (mem.planKind == 'T750') {
            mem.ageTypeCd = 'C104';
          }
          else if (mem.planKind == 'T760') {
            mem.ageTypeCd = 'C106';
          }

          //권종정보를 예약정보 조회시 함께 조회함.
          console.log("addMemberList call setItemToMember");
          let rtn = this.setItemToMember(mem, mem, true);

          //결제자 지정
          if (mem.memshpUid == mem.payerMemshpUid) {
            mem.payCheck = 'Y';
            isPayChek = true;
          }
          
          //issueKind 설정
          returnVal = {};
          returnVal = this.getIssueKind(mem);
          mem.issueKind = returnVal.issueKind;
          mem.issueKindNm = returnVal.issueKindNm;
          mem.joinKind = returnVal.issueKind;


          //첫번째 Row
          if (idx == 0) {
            selMember = mem;
            visitPlDt = mem.visitPlDt;
            webPayEndYn = mem.webPayEndYn;
            this.payerMemshpUid = mem.payerMemshpUid;
            this.payerMemberKind = mem.payerMemberKind;
            this.payerMemberName = mem.payerMemberName;

            console.log("visitPlDt", visitPlDt);
            console.log("this.payerMemshpUid", this.payerMemshpUid);
            console.log("this.payerMemberKind", this.payerMemberKind);
            console.log("this.payerMemberName", this.payerMemberName);
          }
        });
        
        this.memDataProvider.fillJsonData(addList, { fillMode: "set" });

        //첫번째 구매정기권 정보 선택
        this.changeMember(selMember);
        this.selMemDataRow = 0;

        //결제정보 새로 세팅
        this.setPayInfo();

        let noteMsg = '';
				if(benefitYn == "Y") {
					noteMsg = $('MSG_ALT_SEL_MANY_CHILDREN_OR_DIABLED_DISCOUNT') + "\n";
				}
				if(centerChkYn == "Y") {
					noteMsg += this.$t('MSG_ALT_CHECK_DOCUMENT_BEFORE_PAY');
				}
        if (webPayEndYn == "Y" && visitPlDt == this.nowDate ) {
          utils.messageBox('alert', this.$t('MSG_ALT_RSV_SCHEDULED_TO_BE_AUTO_ISSUED_TODAY'), null, () => {
            if (noteMsg.length != '') {
              utils.messageBox('alert', noteMsg);
            }
          });
        }
        else {
          if (noteMsg.length != '') {
            utils.messageBox('alert', noteMsg);
          }
        }
      }
      else {
        let dataRow = -1;
        _.some(addList, (mem)=> {
          console.log('addList', mem);
          
          // 8명까지만 입력 가능
          if (this.getMemGridCnt() > 8) {
            utils.messageBox('alert', this.$t('MSG_ALT_AVAIL_INPUT_UNDER_8_PERSONS'));
            return;
          }
          // 구매정기권 중복 체크
          if ( this.memDataProvider.searchDataRow({fields:['memshpUid'], values: [mem.memshpUid]}) > -1 ) {
            //이미 존재하는 구매정기권(멤버십UID)
          }
          //중지인 경우 선가입 불가
          else if (utils.length(mem.oldTicketNo) == 10 && mem.ticketStatusValue == 'C008') {
            utils.messageBox('alert', this.$t('MSG_ALT_NOT_POSSIBLE_PRE_JOIN_AT_STOP_STATUS')+ '\n-'+ this.$t('MSG_TXT_OLD_TICKET_NO') +": "+ mem.oldTicketNo +'\n- '+ this.$t('MSG_TXT_EMPL_NM') +': '+ mem.name);
          }
          // 이미 선가입된 경우 다시 선가입 불가
          else if (utils.length(mem.oldTicketNo) == 10 && mem.oldTicketTypeKind != 'G605' && parseInt(mem.preTicketCnt) > 0) {
            utils.messageBox('alert', this.$t('MSG_ALT_ALREADY_PRE_JOIN_STATUS')+ '\n-'+ this.$t('MSG_TXT_OLD_TICKET_NO') +": "+ mem.oldTicketNo +'\n- '+ this.$t('MSG_TXT_EMPL_NM') +': '+ mem.name);
          }
          // 정기권이 정상이나 선가입 가능일자가 도래하지 않음.
          else if (utils.length(mem.oldTicketNo) == 10 && mem.oldTicketTypeKind != 'G605' && mem.oldTicketStatusValue =='C001' 
                    && parseInt(mem.preJoinDate) > parseInt(this.nowDate)) {
            utils.messageBox('alert', this.$t('MSG_TXT_AVAIL_PRE_JOIN_DATE') + '[' + utils.dateformatToClient(mem.preJoinDate) + ']'+ this.$t('MSG_ALT_HAS_NOT_ARRIVED') + '\n-'+ this.$t('MSG_TXT_OLD_TICKET_NO') +": "+ mem.oldTicketNo +'\n- '+ this.$t('MSG_TXT_EMPL_NM') +': '+ mem.name);
          }
          else {
            
            //issueKind 설정
            let returnVal = {};
            returnVal = this.getIssueKind(mem);
            mem.issueKind = returnVal.issueKind;
            mem.issueKindNm = returnVal.issueKindNm;
            mem.joinKind = returnVal.issueKind;


            if (utils.length(mem.oldTicketNo) == 10) {            
              mem.detail = "보기";
              //기존 정기권이 만기가 되지 않았으면 선가입
              if(mem.ticketStatusValue =="C001"){
                mem.preJoinYn = "Y";
              }
              //기존 정기권이 만기되었으면 정상 가입 
              else {
                mem.preJoinYn = "N";
              }
              
            } else {
              mem.preJoinYn = "N";
            }

            this.getAgeTypeCd(mem);

            dataRow = this.memDataProvider.addRow(mem);
            this.memGridView.setCurrent({ dataRow: dataRow });
            this.memDataProvider.setRowState(dataRow, "created", true);
          }
        });
        //방금 추가한 구매정기권 정보 선택
        if (dataRow > -1) {
          this.changeMember(this.memDataProvider.getJsonRows(dataRow,dataRow)[0]);
          this.selMemDataRow = dataRow;
        }
        
        //결제정보 새로 세팅
        this.setPayInfo();
      }
    },
    /**
     * 결제정보 세팅
     */
    setPayInfo() {
      if (this.memGridView != null) {
        this.totPrice = this.memGridView.getSummary('price', 'sum');
        this.totDcAmt = this.memGridView.getSummary('dcAmt', 'sum');
        this.totSaleAmt = this.memGridView.getSummary('saleAmt', 'sum');
      }
      else {
        this.totPrice = 0;
        this.totDcAmt = 0;
        this.totSaleAmt = 0;
      }
    },
    /**
     * 멤버십가입자리스트(가입) 팝업
     */
    openModalMembership() {
      utils.openLayerPopup("PGE_CTM_00001", this.onMembershipPopupCallback, {
        pageInitialData: {},
        width: "1024px",
        height: '890px',
      });
    },
    /**
     * 멤버십가입자리스트(가입) 조회 팝업 callback
     * @param { Object } data
     */
    onMembershipPopupCallback(data) {
      if (data != null && data.length > 0) {
        let addList = [];
        _.forEach(data, (mem)=> {
          let addObj = {};
          addObj.webYn = 'N';
          addObj.memshpUid = mem.memshpUid;
          addObj.memberKind = mem.memberKind;
          addObj.memberKindNm = mem.memberKindNm;
          addObj.payerMemshpUid = mem.payerMemshpUid;
          addObj.payerMemberKind = mem.payerMemberKind;
          addObj.fstJoinDate = mem.fstJoinDate;
          addObj.joinDcnt = (utils.length(mem.joinDcnt) == 0)? 0 : mem.joinDcnt;
          addObj.joinYcnt = (utils.length(mem.joinYcnt) == 0)? 0 : mem.joinYcnt;
          addObj.joinCnt = (utils.length(mem.joinCnt) == 0)? 0 : mem.joinCnt;
          addObj.distance = (utils.length(mem.distance) == 0)? 0 : mem.distance;
          addObj.preTicketCnt = mem.preTicketCnt;
          addObj.preJoinDate = mem.preJoinDate;
          addObj.oldTicketNo = (utils.length(mem.ticketNo) > 0)? mem.ticketNo : "";
          addObj.oldItemCd = (utils.length(mem.itemCd) > 0)? mem.itemCd : "";
          addObj.oldItemNm = (utils.length(mem.itemNm) > 0)? mem.itemNm : "";
          addObj.oldIssueDate = (utils.length(mem.issueDate) > 0)? mem.issueDate : "";
          addObj.oldExpireDate = (utils.length(mem.expireDate) > 0)? mem.expireDate : "";
          addObj.oldTicketStatusValue = (utils.length(mem.ticketStatusValue) > 0)? mem.ticketStatusValue : "";
          addObj.oldTicketKind = (utils.length(mem.ticketKind) > 0)? mem.ticketKind : "";
          addObj.oldTicketTypeKind = (utils.length(mem.ticketTypeKind) > 0)? mem.ticketTypeKind : "";
          addObj.oldPayerMemshpUid = (utils.length(mem.payerMemshpUid) > 0)? mem.payerMemshpUid : "";
          addObj.webPayEndYn = "N";
          addObj.name = mem.name;
          addObj.mobileTel = mem.mobileTel;
          addObj.birthDate = mem.birthDate;
          addObj.foregnYn = mem.foregnYn;
          addObj.sexKind = mem.sexKind;
          addObj.sexKindNm = mem.sexKindNm;
          addObj.empCd = mem.empCd;
          addObj.knoxId = mem.knoxId;
          addObj.castEmployeeNo = mem.castEmployeeNo;
          addObj.illeglUseYn = mem.illeglUseYn;
          addObj.illeglUseRsnCd = mem.illeglUseRsnCd;
          addList.push(addObj);
        });
        this.addMemberList("N", addList);
      }
    },
    /**
     * 친구조회 팝업 열기
     */
    clickOpenPopupFriend() {
      if (this.selMember != null && utils.length(this.selMember.memshpUid) > 0) {
        utils.openLayerPopup("PGE_CTM_00014", this.onPopupFriendCallback, {
          pageInitialData: {
            memshpUid: this.selMember.memshpUid,
            name: this.selMember.name,
            ticketNo: (utils.length(this.selMember.oldTicketNo) == 0)? "" : this.selMember.oldTicketNo,
          },
          size: "lg",
        });
      }
    },
    /**
     * 친구조회 팝업 callback
     * @param { Array } data
     */
    onPopupFriendCallback(data) {
    },
    /**
     * 정기권 상세 조회 Click
     */
    clickOldTicketDetail() {
      if (this.selMember != null 
          && utils.length(this.selMember.memshpUid) == 10 
          && utils.length(this.selMember.oldTicketNo) == 10) {
        this.openPopupOldTicketDetail(this.selMember.memshpUid, this.selMember.oldTicketNo);
      }
    },
    /**
     * 정기권 상세조회 팝업 열기
     * @param { String } memshpUid
     * @param { String } oldTicketNo
     */
    openPopupOldTicketDetail(memshpUid, oldTicketNo) {
        let pageId = 'PGE_TKD_00001';
        let query = {memshpUid : memshpUid, ticketNo : oldTicketNo};
        utils.openWindowPopup(pageId, query, null, { resizable: 'yes' });
    },
    /**
     * 임시저장
     */
    clickTempSave() {
      if (this.getMemGridCnt() == 0) {
        utils.messageBox('alert', this.$t('MSG_ALT_NOT_EXIST_TEMP_DATA_FOR_SAVE'));
        return;
      }

      let memberList = this.memDataProvider.getJsonRows();

      let payerMemshpUid = '';
      let payerMemberName = '';
      let payerMemberKind = '';
      let groupSeq = '';
      _.some(memberList, (mem, idx) => {
        //seqNo 세팅
        mem.seqNo = idx + 1;

        if (mem.payerCheck == 'Y') {
          payerMemshpUid = mem.memshpUid;
          payerMemberName = mem.name;
          payerMemberKind = mem.memberKind;
        }
        if (utils.length(mem.groupSeq) > 0) {
          groupSeq = mem.groupSeq;
        }
      });

      if (utils.length(payerMemshpUid) > 0) {
        this.payerMemshpUid = payerMemshpUid;
        this.payerMemberName = payerMemberName;
        this.payerMemberKind = payerMemberKind;
      }

      let tempSaveData = {
        parkKind : this.parkKind,
        payerMemshpUid : this.payerMemshpUid,
        payerMemberName : this.payerMemberName,
        payerMemberKind : this.payerMemberKind,
        groupSeq : groupSeq,
        memberList: memberList,
      }

      http.request(this.$options.name, 'DTS_JNR_00009', {
        data: tempSaveData
      }).then(res => {
        if (res && res.data && res.data.resultCode == '1') {
          this.memDataProvider.fillJsonData(res.data.memberList, { fillMode: "set" });
        }
        else {
          utils.messageBox('alert', (utils.length(res.data.msg) == 0)? this.$t('MSG_ALT_ERROR_OCCURRED_WHILE_SAVING') : res.data.msg);
          return;
        }
      }).catch(e => console.log(e));
    },
    /**
     * 결제 처리하기
     */
    async clickProcPayament() {
      // POS SOD 체크 및 처리 ::START
      this.posSodStatus = await utils.checkPosSod(this.parkPosKind, this.posId);
      let sodRtn = {};
      switch(this.posSodStatus.rtnCode) {
        case -1:
          utils.messageBox('alert', this.posSodStatus.message);
          return;
        case 1:
          sodRtn = await utils.procPosSod(this.parkPosKind, this.posId, false); // 신규개설
          break;
        case 2:
          sodRtn = await utils.procPosSod(this.parkPosKind, this.posId, true); // 재개설
          break;
        case 0:
          sodRtn = {sodProcYn: "Y"}; //이미 개설 완료
          break;
      }
          
      if(sodRtn.sodProcYn != 'Y') {
        utils.messageBox('alert', sodRtn.message);
        return;
      }
      else {
        if (this.posSodStatus.rtnCode != 0 ) {
          this.posSodStatus = await utils.checkPosSod(this.parkPosKind, this.posId);
        }
      }
      // POS SOD 체크 및 처리 ::END

      if (this.getMemGridCnt() == 0) {
        utils.messageBox('alert', this.$t('NO_TICKET_INFO_FOR_PAY'));
        return;
      }

      // 정기권 구매정보 Grid에 전체 데이터를 가져온다.
      let memberList = this.memDataProvider.getJsonRows();

      //issueKind 재설정
      this.setIssueKind(memberList);

      //일모 Error 체크
      let ilmoCheckError = false;
      _.some(memberList, (mem, idx) => {
        if (mem.dcType == 'A1' && mem.condTypeCd == '11L4' && (utils.length(mem.ilmoUseAmt) == 0 || parseInt(mem.ilmoUseAmt) == 0)) {
          utils.messageBox('alert', '[' + mem.name+']'+ this.$t('MSG_ALT_PLZ_SEARCH_ILMO_CARD_OR_OTC_AGAIN'));
          this.changeMember(mem);
          this.selMemDataRow = idx;
          ilmoCheckError = true;
          return;
        }
      });
      if (ilmoCheckError) {
        return;
      }

      let ilmoMap = {};
      _.some(memberList, (mem) => {
        //일모
        if (mem.dcType == 'A1' && mem.condTypeCd == '11L4') {
          //일모카드별 잔액, 사용금액합계 집계
          if (ilmoMap[mem.ilmoCardNo] == null || ilmoMap[mem.ilmoCardNo].length == 0) {
            ilmoMap[mem.ilmoCardNo] = {ilmoAmt: 0, ilmoUseSumAmt: 0};
          }
          if (parseInt(ilmoMap[mem.ilmoCardNo].ilmoAmt) < parseInt(mem.ilmoAmt)) {
            ilmoMap[mem.ilmoCardNo].ilmoAmt = mem.ilmoAmt;
          }
          ilmoMap[mem.ilmoCardNo].ilmoUseSumAmt += parseInt(mem.ilmoUseAmt);
        }
      });
      let message = '';
      for (let ilmoCardNo in ilmoMap) {
        if (parseInt(ilmoMap[ilmoCardNo].ilmoAmt) < parseInt(ilmoMap[ilmoCardNo].ilmoUseSumAmt)) {
          message += '\n- '+this.$t('MSG_TXT_CARD_NO')+':['+ ilmoCardNo +'], '+ $('MSG_TXT_ILMO_AMT') +':[' + utils.numberFormat(ilmoMap[ilmoCardNo].ilmoAmt, 0)+'], '+ this.$t('MSG_TXT_SUM_OF_USE_AMT') +':['+utils.numberFormat(ilmoMap[ilmoCardNo].ilmoUseSumAmt, 0)+']';
        }
      }

      if (utils.length(message) != 0) {
        utils.messageBox('alert', this.$t('MSG_ALT_OVER_USE_AMT_FROM_ILMO_AMT') + '${message}');
        return;
      }

      //권종 선택하지 않은 건 체크
      let isNoItemCd = false;
      let dataRow = -1;
      _.some(memberList, (mem, idx) => {
        if (utils.length(mem.itemCd) == 0) {
          isNoItemCd = true;
          dataRow = idx;
          return;
        }
      });

      if (isNoItemCd) {
        utils.messageBox('alert', this.$t('MSG_ALT_EXIST_SOME_THINGS_NO_SEL_ITEM'));
        this.focusMemGridRow(dataRow, 'itemNm');
        return;
      }

      //무료 권종 존재 여부
      let isFreeItem = false;
      dataRow = -1;
      _.some(memberList, (mem, idx) => {
        if (mem.empYn == 'Y') {
          isFreeItem = true;
          dataRow = idx;
          return;
        }
      });
      if (isFreeItem) {
        utils.messageBox('alert', this.$t('MSG_ALT_EXIST_FREE_ITEM_AND_CANT_PROCESS'));
        this.focusMemGridRow(dataRow, 'itemNm')
        return;
      }

      //제휴카드 할인 존재 여부 
      let isDiscountCard = false;
      dataRow = -1;
      _.some(memberList, (mem, idx) => {
        if (mem.condTypeCd == '15L1') {
          isFreeItem = true;
          dataRow = idx;
          return;
        }
      });
      if (isDiscountCard && this.getMemGridCnt() > 1) {
        utils.messageBox('alert', $('MSG_ALT_JOIN_ONLY_ONE_AFFILIATE_TICKET'));
        this.focusMemGridRow(dataRow, 'dcNm')
        return;
      }

      let isValid = true;
      _.some(memberList, (mem, idx) => {
        //발급일 체크
        if (utils.length(mem.issueDate) == 0) {
          utils.messageBox('alert', this.$t('MSG_ALT_ISSUE_DATE_NOT_SET') + ' '+ this.$t('MSG_ALT_PLZ_SEL_ITEM_AGAIN'));
          this.focusMemGridRow(idx, 'issueDate');
          isValid = false;
          return;
        }
        //만료일 체크
        if (utils.length(mem.expireDate) == 0) {
          utils.messageBox('alert', this.$t('MSG_ALT_EXPIRE_DATE_NOT_SET') + ' '+ this.$t('MSG_ALT_PLZ_SEL_ITEM_AGAIN'));
          this.focusMemGridRow(idx, 'expireDate');
          isValid = false;
          return;
        }

        if (mem.oldTicketTypeKind != 'G605') { // 무료 예외 처리
          //현재 선가입 상태 체크
          if (utils.length(mem.preTicketCnt) > 0 && parseInt(mem.preTicketCnt) > 0) {
            utils.messageBox('alert', this.$t('MSG_ALT_NOW_PRE_JOIN_STATUS_AND_NOT_POSSIBLE_JOIN_AGAIN'));
            this.focusMemGridRow(idx, 'name');
            isValid = false;
            return;
          }
        }
      });

      if (!isValid) {
        return;
      }


      //선발행할인 들어간 티켓이 있을 경우, 모두 선발행티켓 적용 되었는지 검증.
      let isPreIssue = false;
      dataRow = -1;
      _.some(memberList, (mem, idx) => {
        if (mem.preIssuePayYn == 'Y') {
          isPreIssue = true;
        }
        else {
          dataRow = idx;
        }
      });      
      if (isPreIssue && dataRow > -1) {
        utils.messageBox('alert', this.$t('MSG_ALT_EXIST_APPLY_NO_PRE_ISSUE_TICKET'));
        this.focusMemGridRow(dataRow, 'dcNm');
        return;
      }

      let payerMemshpUid = '';
      let payerMemberName = '';
      let payerMemberKind = '';
      _.some(memberList, (mem, idx) => {
        //seqNo 세팅
        mem.seqNo = idx + 1;

        if (mem.payerCheck == 'Y') {
          payerMemshpUid = mem.memshpUid;
          payerMemberName = mem.name;
          payerMemberKind = mem.memberKind;
        }
      });
      if (utils.length(payerMemshpUid) > 0) {
        this.payerMemshpUid = payerMemshpUid;
        this.payerMemberName = payerMemberName;
        this.payerMemberKind = payerMemberKind;
      }
      let checkData = {
        parkKind : this.parkKind,
        memberList: memberList,
      }
      console.log("checkData", checkData);

      http.request(this.$options.name, 'DTS_JNR_00013', {
        data: checkData
      }).then(res => {
        if (res && res.data && res.data.resultCode == 'OK') {
          this.openModalConfirmPayer();
        }
      }).catch(e => console.log(e));

    },
    /**
     * 결제 Main 창 Open
     */
    openModalPaymentMain() {
      let totSaleAmt = 0;
      let preIssuePay = 0;
      let ilmoPay = 0;
      let memberList = this.memDataProvider.getJsonRows();
      _.some(memberList, (mem) => {
        //일모
        if (mem.dcType == 'A1' && mem.condTypeCd == '11L4') {
          //일모 할인 금액 합계
          ilmoPay += parseInt(mem.ilmoUseAmt);
        }
        //선발행티켓 
        else if (mem.preIssuePayYn == 'Y') {
          preIssuePay += parseInt(mem.preIssueAmt);
        }
        totSaleAmt += mem.saleAmt;
      });
      
      let initParam = {};
      initParam.totSaleAmt = totSaleAmt;
      initParam.preIssuePay = preIssuePay;
      initParam.ilmoPay = ilmoPay;
      initParam.payerMemshpUid = this.payerMemshpUid;
      initParam.payerMemberName = this.payerMemberName;
      initParam.payerMemberKind = this.payerMemberKind;
      initParam.payMemberList = memberList;
      utils.openLayerPopup("PGE_JNR_00002", this.onPayMainPopupCallback, {
        pageInitialData: initParam,
        width: "1024px",
        height: "auto",
        removeCloseButton: true,
      });
    },
    /**
     * 결제 Main창 Callback
     * @param { Object } data
     */
    onPayMainPopupCallback(data) {
      if (data) {
        //완료
        if (data == "FINISH") {
          setTimeout(() => {
            this.clickInit();
          }, 50);
        }
        //권종 선택
        else if (data == "ING") {

        }
      }
    },
    /**
     * 결제자 확인 창 열기
     */
    openModalConfirmPayer() {
      let initParam = {};
      initParam.payerMemshpUid = this.payerMemshpUid;
      initParam.payerMemberName = this.payerMemberName;
      initParam.payerMemberKind = this.payerMemberKind;
      utils.openLayerPopup("PGE_JNR_00003", this.onConfirmPayerPopupCallBack, {
        pageInitialData: initParam,
        width: "500px",
        height: "auto",
      });
    },
    /**
     * 결제자 확인 Callback
     * @param { Object } data
     */
    onConfirmPayerPopupCallBack(data) {
      if (data && data.status == 'CONFIRM') {
        this.payerMemshpUid = data.payerMemshpUid;
        this.payerMemberName = data.payerMemberName;
        this.payerMemberKind = data.payerMemberKind;

        let memberList = this.memDataProvider.getJsonRows();
        _.some(memberList, (mem) => {
          if (mem.memshpUid == this.payerMemshpUid) {
            mem.payerCheck = "Y";
          }
          else {
            mem.payerCheck = "N";
          }
        });
        this.memDataProvider.fillJsonData(memberList, { fillMode: "set" });

        this.openModalPaymentMain();
      }
    },
    /**
     * 무료가입
     */
    clickFreeSave(){
      if (this.getMemGridCnt() == 0) {
        utils.messageBox('alert', this.$t('MSG_ALT_NO_TICKET_LIST_TO_SAVE'));
        return;
      }
      let memberList = this.memDataProvider.getJsonRows();

      //seqNo 설정 및 임직원사번 체크
      let empNoErrDataRow = -1;
      _.some(memberList, (mem, idx) => {
        if (mem.empNo == null || utils.length(mem.empNo) == 0 || mem.empType == null || utils.length(mem.empType) == 0) {
          empNoErrDataRow = idx;
          return;
        }
      });
      
      if (empNoErrDataRow > -1) {
        utils.messageBox('alert', this.$t('MSG_ALT_PLZ_INPUT_EMP_NO'), null, () => {
          this.focusMemGridRow(empNoErrDataRow, 'name');
        });
        return;
      }

      let checkData = {
        parkKind : this.parkKind,
        memberList: memberList,
      }
      console.log("checkData", checkData);

      http.request(this.$options.name, 'DTS_JNR_00013', {
        data: checkData
      }).then(res => {
        if (res && res.data && res.data.resultCode == 'OK') {
          this.saveFree();
        }
      }).catch(e => console.log(e));
    },
    /**
     * 무료가입(Save)
     */
    saveFree(){
      let memberList = this.memDataProvider.getJsonRows();

      //issueKind 재설정
      this.setIssueKind(memberList);

      //seqNo 설정
      _.some(memberList, (mem, idx) => {
        mem.seqNo = idx + 1;
      });
      

      let freeSaveData = {
        parkKind : this.parkKind,
        paymntDate : this.paymntDate,
        posId : this.posId,
        memberList: memberList,
      }

      window.utils.messageBox("confirm", this.$t('MSG_ALT_WOULD_YOU_LIKE_TO_JOIN_FOR_FREE'), null,
        (/* ok */) => {
          http.request(this.$options.name, 'DTS_JNR_00006', {
            data: freeSaveData
          }).then(res => {
            if (res && res.data && res.data.resultCode == '1') {
              this.isSaveEnd = true;
              this.printData = res.data;
              let receiptIssueYn = res.data.receiptIssueYn;

              if (receiptIssueYn == "Y") {
                window.utils.messageBox("confirm", this.$t('MSG_ALT_WOULD_YOU_LIKE_TO_PRINT_CUST_RECEIPT'), null,
                  (/* ok */) => {
                    this.endSaveFree(this.printData, "Y");
                  },
                  (/* cancel */) => {
                    this.endSaveFree(this.printData, "N");
                  }
                );
              }
              else {
                this.endSaveFree(this.printData, "N");
              }
            }
            else {
              utils.messageBox('alert', (utils.length(res.data.msg) == 0)? this.$t('MSG_ALT_ERROR_OCCURRED_WHILE_SAVING') : res.data.msg);
              return;
            }
          }).catch(e => console.log(e));
        },
        (/* cancel */) => {
          return;
        }
      );
    },
    /**
     * 무료가입 완료
     * @param { Object } saveEndData
     */
    endSaveFree(saveEndData) {
      //Print
      let payMainData = {
        parkKind : this.parkKind,
        paymntDate : this.paymntDate,
        posNm : this.posNm,
        receiptIssueYn: this.receiptIssueYn,
        payMemberList : saveEndData.payMemberList,
        programId : this.$options.name,
      }
      let posPrint = new PosPrint();
      posPrint.printAfterSaveFree(payMainData);
      saveEndData.freeJoinYn = 'Y';
      this.printData = null;
      this.openModalPayEnd(saveEndData);
    },
    /**
     * Web발급
     */
    clickWebSave() {
      if (this.getMemGridCnt() == 0) {
        utils.messageBox('alert', this.$t('MSG_ALT_NO_TICKET_LIST_TO_SAVE'));
        return;
      }

      let memberList = this.memDataProvider.getJsonRows();
      
      //웹 미결제건 있는지 체크
      let isWebPayEndN = false;
      let dataRow = -1;
      _.some(memberList, (mem, idx) => {
        mem.seqNo = idx + 1;
        if (mem.webPayEndYn != "Y") {
          isWebPayEndN = true;
          dataRow = idx;
          return;
        }
      });
      if (isWebPayEndN && dataRow > -1) {
        utils.messageBox('alert', this.$t('MSG_ALT_EXIST_THINGS_TO_NO_PAID_AT_SMART_RESERVATION'));
        this.focusMemGridRow(dataRow, 'name');
        return;
      }

      let checkData = {
        parkKind : this.parkKind,
        memberList: memberList,
      }
      console.log("checkData", checkData);

      http.request(this.$options.name, 'DTS_JNR_00013', {
        data: checkData
      }).then(res => {
        if (res && res.data && res.data.resultCode == 'OK') {
          this.saveWeb();
        }
      }).catch(e => console.log(e));
    },
    /**
     * Web발급(Save)
     */
    saveWeb() {

      //발급정보 가져오기
      let memberList = this.memDataProvider.getJsonRows();

      //issueKind 재설정
      this.setIssueKind(memberList);

      let webSaveData = {
        parkKind : this.parkKind,
        paymntDate : this.paymntDate,
        posId : this.posId,
        payerMemshpUid : this.payerMemshpUid,
        payerMemberKind : this.payerMemberKind,
        memberList: memberList,
      }
      console.log("webSaveData", webSaveData);

      window.utils.messageBox("confirm", this.$t('MSG_ALT_WOULD_LIKE_TO_PROCESS_WEB_ISSUANCE'), null,
        (/* ok */) => {
          http.request(this.$options.name, 'DTS_JNR_00007', {
            data: webSaveData
          }).then(res => {
            if (res && res.data && res.data.resultCode == '1') {
              this.isSaveEnd = true;
              this.printData = res.data;
              //POS설정이 고객영수증 프린트로 설정되어 있고, 고객의 전자영수증 = 'Y'가 아닌 경우
              console.log("this.printData.payerElecReceiptIssueYn", this.printData.payerElecReceiptIssueYn);
              let elecReceiptIssueYn = (this.isElectReceiptIssueApply)? this.printData.payerElecReceiptIssueYn : "N" ;
              console.log("elecReceiptIssueYn", elecReceiptIssueYn);
              if (this.receiptIssueYn == "Y" && elecReceiptIssueYn != 'Y') {
                window.utils.messageBox("confirm", this.$t('MSG_ALT_WOULD_YOU_LIKE_TO_PRINT_CUST_RECEIPT')+'('+ this.$t('MSG_TXT_ESSENTIAL_ISSUANCE_OF_CARD_INSTALLMENTS') +')', null,
                  (/* ok */) => {
                    this.endSaveWeb(this.printData, "Y");
                  },
                  (/* cancel */) => {
                    this.endSaveWeb(this.printData, "N");
                  }
                );
              }
              else {
                this.endSaveWeb(this.printData, "N");
              }
            }
            else {
              utils.messageBox('alert', (utils.length(res.data.msg) == 0)? this.$t('MSG_ALT_ERROR_OCCURRED_WHILE_SAVING') : res.data.msg);
              return;
            }
          }).catch(e => console.log(e));
        },
        (/* cancel */) => {
          return;
        }
      );
    },
    /**
     * WEB발급 완료
     * @param { Object } saveEndData
     */
    async endSaveWeb(saveEndData, receiptIssueYn) {
      //Print
      saveEndData.posNm = this.posNm;
      saveEndData.receiptIssueYn = receiptIssueYn;
      saveEndData.programId = this.$options.name;

      let posPrint = new PosPrint();
      await posPrint.printAfterSaveWeb(saveEndData);
      this.printData = null;
      this.openModalPayEnd(saveEndData);

    },
    /**
     * 결제 완료 창 띄우기
     * @param { Object } saveEndData
     */
    openModalPayEnd(saveEndData) {
      let pageInitialData = {
        freeJoinYn: (saveEndData.freeJoinYn)? saveEndData.freeJoinYn : 'N',
        receiptNo: saveEndData.receiptNo,
        totPay: saveEndData.saleAmt,
        payMemberList: saveEndData.payMemberList,
      };
      utils.openLayerPopup('PGE_CTM_00010', this.onPayEndPopupCallback, {
        pageInitialData: pageInitialData,
        width: "500px",
      });
    },
    /**
     * 결제 완료 창 Callback
     * @param { Object } saveEndData
     */
    onPayEndPopupCallback() {
      this.clickInit();
    },
    /**
     * 선가입 제한 체크하기
     * @param { Object } item (itemKind, issueStartDate, limitExpireDate, enableDay, expireExtendDay)
     * @param { String } oldTicketStatusValue - 직전 정기권 상태정보
     * @param { String } oldExpireDate - 직전 정기권 만기일
     */
    checkPreJoinLimit(item, oldExpireDate, oldTicketTypeKind) {
      let rtnVal = {};
      rtnVal.isJoinAvailable = true;
      rtnVal.preJoinYn  = "N";
      rtnVal.rtnMsg  = '';

      //선가입 대상
      if (parseInt(oldExpireDate) >= parseInt(this.nowDate)) {
        rtnVal.preJoinYn  = "Y";

        //해당 권종이 선가입 불가 권종인지 체크
        if (item.itemPreJoinYn == 'N') {
          rtnVal.isJoinAvailable = false;
          rtnVal.preJoinYn  = "N";
          rtnVal.rtnMsg  = this.$t('MSG_ALT_CANT_NOT_JOIN_PRE_WITH_THIS_ITEM');
          return rtnVal;
        }
        // 시즌권인 경우 선가입 가능 최소 유효가입일수 체크
        else if (item.itemKind == 'IT04') {
          if (this.seasonJoinAvailDay == -1) {
            rtnVal.isJoinAvailable = false;
            rtnVal.preJoinYn  = "N";
            rtnVal.rtnMsg  = this.$t('MSG_ALT_PLZ_REG_MIN_AVAIL_DAYS_FOR_PRE_JOIN_SEASO') + "[COD_C7, C701]";
            return rtnVal;
          }
          else if (utils.getDayOffset(oldExpireDate, item.issueDate) < this.seasonJoinAvailDay)  {
            rtnVal.isJoinAvailable = false;
            rtnVal.preJoinYn  = "N";
            rtnVal.rtnMsg  = this.$t('MSG_ALT_CANT_JOIN_BY_UNDER_MIN_AVAIL_DAYS_OF_SEASON_TICKET') + `[${this.seasonJoinAvailDay}]`;
            return rtnVal;
          }
          //기존가입권이 무료이면서 재가입권이 무료인 경우
          else if (oldTicketTypeKind == 'G605' && item.ticketTypeKind == 'G605') {
            rtnVal.isJoinAvailable = true;
            rtnVal.preJoinYn  = "N";
            rtnVal.rtnMsg  = this.$t('MSG_ALT_WILL_BE_JOINED_AFTER_EXPIRE_FREE_TICKET');
            return rtnVal;
          }
        }
      }
      return rtnVal;
    },
    /**
     * 정기권 발권일(시작일), 만기일 계산
     * @param { Object } item (itemKind, issueStartDate, limitExpireDate, enableDay, expireExtendDay)
     * @param { String } oldTicketStatusValue - 직전 정기권 상태정보
     * @param { String } oldExpireDate - 직전 정기권 만기일
     */
    calIssueExpireDate(item, oldTicketStatusValue, oldExpireDate) {
      let returnVal = {};
      let availDay = 0;

      //무료권인 경우이고 사용기간이 없는 경우
      if (item.ticketTypeKind == "G605" 
            && (utils.length(item.enableDay) == 0 || item.enableDay == 0) 
            && (utils.length(item.freeAvailDay) == 0 || item.freeAvailDay == 0)) {
        availDay = 365;
      }
      else if (item.itemKind != 'IT04') {
        availDay = parseInt(item.enableDay) + parseInt(item.expireExtendDay);
      }

      // 시즌권
      if (item.itemKind == 'IT04') {

        if (parseInt(this.nowDate) > parseInt(item.issueStartDate)) {
          returnVal.issueDate = this.nowDate;
        }
        else {
          returnVal.issueDate = item.issueStartDate;
        }
        returnVal.expireDate = item.limitExpireDate;
      }
      // 기간권
      else if (item.itemKind == 'IT03') {
        //선가입
        if (oldTicketStatusValue == "C001") { 
          returnVal.issueDate = utils.addDay(oldExpireDate, 1).substring(0,8);
          returnVal.expireDate = utils.addDay(returnVal.issueDate, availDay - 1).substring(0,8);
        }
        else { 
          returnVal.issueDate = this.nowDate;
          returnVal.expireDate = utils.addDay(returnVal.issueDate, availDay - 1).substring(0,8);
        }
      } 
      // 레귤러 , 셀렉트, 구독권 
      else {
        //선가입
        if (oldTicketStatusValue == "C001") { 
          returnVal.issueDate = utils.addDay(oldExpireDate, 1).substring(0,8);
          returnVal.expireDate = utils.addDay(returnVal.issueDate, availDay).substring(0,8);
        }
        else { 
          returnVal.issueDate = this.nowDate;
          returnVal.expireDate = utils.addDay(returnVal.issueDate, availDay).substring(0,8);
        }
      }
      return returnVal;
    },
    /**
     * 가입 나이 유형 코드
     * @param { Object } memObj
     * @param { String } stdDate - YYYYMMDD
     */
    getAgeTypeCd(memObj, stdDate) {
      if (stdDate == null) {
        if ((memObj.oldTicketStatusValue == "C001" || memObj.oldTicketStatusValue == "C008") && memObj.oldTicketKind != 'G605' && utils.length(memObj.oldExpireDate) == 8) {
          stdDate = utils.addDay(memObj.oldExpireDate, 1).substring(0,8);
        }
      }
      console.log("getAgeTypeCd.stdDate", stdDate);
      let age = this.calcAge(memObj.birthDate, stdDate);
      //베이비
      if (age < 3) { 
        memObj.ageTypeCd = 'C106';
        memObj.yearKind = '1';
      } 
      //소인
      else if(age >=3 && age < 13) { 
        memObj.ageTypeCd = 'C103';
        memObj.yearKind = '1';
      } 
      //경로 
      else if(age >= 60) { 
        memObj.ageTypeCd = 'C104';
        memObj.yearKind = '2';
      } 
      //대인
      else { 
        memObj.ageTypeCd = 'C101';
        memObj.yearKind = '2';
      }

      //스마트예약이 아닌경우
      if ( memObj.webYn == "N") {
        //소인
        if ( memObj.yearKind == '1') {
          memObj.acKind = 'T902';
        }
        //대인
        else {
          memObj.acKind = 'T901';
        }
      }
    },
    /**
     * 만 나이 계산
     * @param { String } birthDate
     * @param { String } stdDate
     */
    calcAge(birthDate, stdDate){  
      if (stdDate == null) {
        stdDate = this.nowDate;
      }

      console.log("stdDate:", stdDate);
      
      let year = stdDate.substring(0,4);
      let month = stdDate.substring(4,6);
      let day = stdDate.substring(6,8);
      let monthDay = month + day;

      let birthYear = birthDate.substring(0,4);
      let birthdaMonthDay = birthDate.substring(4,8);
      
      let age = 0;
    
      if (parseInt(monthDay) < parseInt(birthdaMonthDay)) {
        age = parseInt(year) - parseInt(birthYear) - 1;
      } else {
        age = parseInt(year) - parseInt(birthYear);
      }
      console.log("age:", age);
      return age;
    },
    /**
     * 고객 사진 조회
     */
    getPhoto() {
      if (utils.length(this.selMember.photo) > 0) {
         this.memberImgData = this.selMember.photo;
      }
      else {
        const params = {
          memshpUid: this.selMember.memshpUid,
          ticketNo: this.selMember.oldTicketNo/* '2023120451' */
        };
        
        http.request(this.$options.name, "DTS_CTM_00028", { query: params })
        .then(res => {
          if(res.data?.photo) {
            this.selMember.photo = res.data.photo;
            this.memberImgData = res.data.photo;
          } else {
            this.selMember.photo = null;
            this.memberImgData = null;
          }
        });
      }
    },
    /**
     * 고객 사진 Clear
     */
    clearPhoto() {
      this.memberImgData = null;
    },
    /**
     * 정기권 구매정보 Grid 건수
     */
    getMemGridCnt() {
      if (this.memDataProvider == null) {
        return 0;
      }
      else {
        return this.memDataProvider.getJsonRows().length;
      }
    },
    /**
     * issueKind 가져오기
     * @param { Object } member
     */
    getIssueKind(member){
      let oldTicketNo = member.oldTicketNo;
      let issueDate = (utils.length(member.issueDate) == 8)? member.issueDate : this.nowDate;
      let rtnValue = {};
      if (utils.length(oldTicketNo) == 10) {
        let distance = utils.getDayOffset(issueDate, member.oldExpireDate);
        console.log(`distance=>${distance}`);
        //만기 후 365일이 지난 경우 신규
        if (distance > 365 ) {
          rtnValue.issueKind = 'C201';
          rtnValue.issueKindNm = this.$t('MSG_TXT_NEW');
        }
        //재가입
        else {
          rtnValue.issueKind = 'C202';
          rtnValue.issueKindNm = this.$t('MSG_TXT_RE_JOIN');
        }
      }
      else {
        rtnValue.issueKind = 'C201';
        rtnValue.issueKindNm = this.$t('MSG_TXT_NEW');
      }
      return rtnValue;
    },
    /**
     * issueKind 설정
     * @param { ArrayList } memberList
     */
    setIssueKind(memberList){
      _.forEach(memberList, (mem) => {
        let rtnValue = this.getIssueKind(mem);
        mem.issueKind = rtnValue.issueKind;
        mem.issueKindNm = rtnValue.issueKindNm;
        mem.joinKind = rtnValue.issueKind;
      });
    },
    /**
     * 특정 Data Row에 Focus 이동하고 해당 정기권 구매정보가 선택되게 함.
     * @param { Number } dataRow
     * @param { String } columnNm
     */
    focusMemGridRow(dataRow, columnNm) {
      console.log("focusMemGridRow.dataRow", dataRow);
      this.memGridView.setCurrent({ dataRow: dataRow, column: columnNm });
      this.selMemDataRow = dataRow;
      this.changeMember(this.memDataProvider.getJsonRows(dataRow, dataRow)[0]);
      return;
    },
  },
};
</script>
<style scoped></style>