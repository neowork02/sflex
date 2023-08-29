<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <!-- S::컨텐츠1 -->
            <!-- 승인일자 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_APPR_DATE')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-range-picker v-model="srchObj.srchDt" init="today" autoConfirm />
                </ur-form-item>
                <!-- 승인구분 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_APPR_KIND')"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="srchObj.srchKind" value="A" sm>{{ $t('MSG_TXT_ALL') }}</ur-radio
                        ><!-- 전체 -->
                        <ur-radio v-model="srchObj.srchKind" value="B" sm>{{ $t('MSG_TXT_APPR') }}</ur-radio
                        ><!-- 승인 -->
                        <ur-radio v-model="srchObj.srchKind" value="C" sm>{{ $t('MSG_TXT_CANCEL') }}</ur-radio
                        ><!-- 취소 -->
                    </div>
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button @click="initSrchField">{{
                        $t('MSG_BTN_INITIALIZE')
                    }}</ur-button
                    ><!-- 초기화 -->
                    <ur-button color="violet" @click="searchList" v-permission:read="this.$options.name">{{
                        $t('MSG_TXT_SRCH')
                    }}</ur-button
                    ><!-- 조회 -->
                </div>
            </div>
            <!-- E::컨텐츠1-->

            <!-- S::컨텐츠2 -->
            <div class="comm_title_wrap mt35">
                <h4>{{ $t('MSG_TIT_SA07_MNG') }}</h4>
                <!-- 현금영수증 조회 -->
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">
                            Total<span>{{ numberWithCommas(gridList.length) }}</span
                            >{{ $t('MSG_TXT_CNT') }}
                        </div>
                    </div>
                </div>
                <!--E:: 타이틀 오른쪽 total info -->
            </div>
            <real-grid
                ref="cashReceiptGrid"
                grid-id="pgeSar00001"
                grid-root="/lib"
                :gridFields="gridFields"
                :gridColumns="gridColumns"
                :gridRows="gridList"
                :selectionStyle="'rows'"
                :style="{ height: '160px' }"
                :gridCheckBar="{ visible: false }"
            />
            <!-- E::컨텐츠2-->

            <!-- S::컨텐츠3:승인기록 -->
            <div class="comm_title_wrap mt40">
                <h4>{{ $t('MSG_TXT_APPR_LOG') }}</h4>
                <!-- 승인기록 -->
            </div>
            <ur-form-box toggleable>
                <!-- 승인일자 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_APPR_DATE')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        :value="dateWithDash(apprLogInfo.rapproveDay)"
                        style="width: 100%; height: auto"
                        readonly
                    />
                </ur-form-item>
                <!-- 승인시간 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_APPR_TIME')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        :value="timeWithColone(apprLogInfo.rapproveTime)"
                        style="width: 100%; height: auto"
                        readonly
                    />
                </ur-form-item>
                <!-- 식별번호 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_DSTG_NO')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="apprLogInfo.cardNo" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 인증수단 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_AUTH_METHOD')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="apprLogInfo.cardNoFgNm" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 전문ID -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_FULL_TXT_ID')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="apprLogInfo.txlId" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 전문구분 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_FULL_TXT_KIND')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="apprLogInfo.tlxFg" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="POS ID" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-text-field :value="apprLogInfo.posId" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 터미널ID구분 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_TERMINAL_ID_KIND')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="apprLogInfo.terminalFg" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 승인구분 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_APPR_KIND')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        :value="apprLogInfo.cardCheckBillFgName"
                        style="width: 100%; height: auto"
                        readonly
                    />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="WCC" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-text-field :value="apprLogInfo.wcc" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 카드Data길이 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_CARD_DATA_LENGTH')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="apprLogInfo.cardDataLenth" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 승인금액 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_APPR_AMT')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        :value="numberWithCommas(apprLogInfo.approveCardAmt)"
                        style="width: 100%; height: auto"
                        readonly
                    />
                </ur-form-item>
                <!-- 식별구분 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_DISC_KIND')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="apprLogInfo.instNm" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 봉사료 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SVC_CHARGE')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        :value="numberWithCommas(apprLogInfo.serviceFee)"
                        style="width: 100%; height: auto"
                        readonly
                    />
                </ur-form-item>
                <!-- 부가세 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_VAT_FEE')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        :value="numberWithCommas(apprLogInfo.vat)"
                        style="width: 100%; height: auto"
                        readonly
                    />
                </ur-form-item>
                <!-- 승인번호 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_APPR_NO')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="apprLogInfo.rapproveNo" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 비밀번호 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_PW')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="apprLogInfo.passwd" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 수신전문구분 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_RCV_PRTC_KIND')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="apprLogInfo.rtxlId" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 응답코드 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_RESP_CODE')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="apprLogInfo.rresponseCd" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 승인응답메세지 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_APPR_RESP_MSG')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        :value="(apprLogInfo.rcardResponseMsg || '').trim()"
                        style="width: 100%; height: auto"
                        readonly
                    />
                </ur-form-item>
                <!-- 승인VAN사구분 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_APPR_VAN_KIND')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="apprLogInfo.rapproveVanFgName" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 승인IP -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_APPR_IP')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="apprLogInfo.accountIp" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 승인담당자명 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_APPR_PIC_NM')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="apprLogInfo.accountName" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 수신전문POS ID -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_RCV_PRTC_POS_ID')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="apprLogInfo.rsalePosId" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 본인사용여부 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_PIC_USE_YN')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field :value="apprLogInfo.ruseSelfFg" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 동반인수 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_CO_ACC_CNT')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field
                        :value="numberWithCommas(apprLogInfo.rfellowMaxCnt)"
                        style="width: 100%; height: auto"
                        readonly
                    />
                </ur-form-item>
            </ur-form-box>
            <!-- E::컨텐츠3:승인기록 -->

            <!-- S::컨텐츠4:취소기록 -->
            <div class="comm_title_wrap mt40">
                <h4>취소기록</h4>
            </div>
            <ur-form-box toggleable>
                <!-- 취소일자 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_CANCEL_DATE')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        :value="dateWithDash(cancelLogInfo.cymd)"
                        style="width: 100%; height: auto"
                        readonly
                    />
                </ur-form-item>
                <!-- 취소시간 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_CANCEL_TIME')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        :value="timeWithColone(cancelLogInfo.chms)"
                        style="width: 100%; height: auto"
                        readonly
                    /><!-- ur-time-picker: dropdown 일 경우 -->
                </ur-form-item>
                <!-- 식별번호 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_DSTG_NO')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="cancelLogInfo.cardNo" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 인증수단 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_AUTH_METHOD')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="cancelLogInfo.cardNoFgNm" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 송신전문ID -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SND_PRTC_ID')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="cancelLogInfo.ctxlId" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 승인전문구분 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_APPR_PRTC_KIND')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="cancelLogInfo.ctlxFg" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 송신POS ID -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SND_POS_ID')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="cancelLogInfo.cposId" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 송신터미널ID구분 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SND_TERMINAL_ID_KIND')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="cancelLogInfo.cterminalFg" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 송신승인구분 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SND_APPR_KIND')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        :value="cancelLogInfo.ccardCheckBillFgName"
                        style="width: 100%; height: auto"
                        readonly
                    />
                </ur-form-item>
                <!-- 송신WCC -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SND_WCC')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="cancelLogInfo.cwcc" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 송신Data길이 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SND_DATA_LENGTH')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="cancelLogInfo.ccardDataLenth" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 송신취소금액 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SND_CANCEL_AMT')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        :value="numberWithCommas(cancelLogInfo.capproveCardAmt)"
                        style="width: 100%; height: auto"
                        readonly
                    />
                </ur-form-item>
                <!-- 송신식별구분 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SND_DISC_KIND')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="cancelLogInfo.cinstNm" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 봉사료 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SVC_CHARGE')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        :value="numberWithCommas(cancelLogInfo.cserviceFee)"
                        style="width: 100%; height: auto"
                        readonly
                    />
                </ur-form-item>
                <!-- 부가세 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_VAT_FEE')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        :value="numberWithCommas(cancelLogInfo.cvat)"
                        style="width: 100%; height: auto"
                        readonly
                    />
                </ur-form-item>
                <!-- 송신승인번호 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SND_APPR_NO')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="cancelLogInfo.capproveNo" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 송신비밀번호 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SND_PASSWORD')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="cancelLogInfo.cpasswd" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 수신전문ID -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_RCV_PRTC_ID')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="cancelLogInfo.crTxlId" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 수신응답코드 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_RCV_RESP_CODE')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="cancelLogInfo.crInquiryResCd" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 수신응답메세지 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_RCV_RESP_MSG')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="cancelLogInfo.crInquiryResMsg" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 송신VAN사구분 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SND_VAN_KIND')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        :value="cancelLogInfo.capproveVanFgName"
                        style="width: 100%; height: auto"
                        readonly
                    />
                </ur-form-item>
                <!-- 취소IP -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_CANCEL_IP')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="cancelLogInfo.cancelIp" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 취소담당자명 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_CANCEL_PIC_NM')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="cancelLogInfo.cancelName" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 수신승인번호 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_RCV_APPR_NO')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field :value="cancelLogInfo.crApproveNo" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <!-- 원거래승인일자 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_ORG_DEAL_APPR_DATE')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        :value="dateWithDash(cancelLogInfo.corgApproveDay)"
                        style="width: 100%; height: auto"
                        readonly
                    />
                </ur-form-item>
                <!-- 원거래승인시간 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_ORG_DEAL_APPR_TIME')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        :value="timeWithColone(cancelLogInfo.corgApproveTime)"
                        style="width: 100%; height: auto"
                        readonly
                    /><!-- ur-time-picker: dropdown 일 경우 -->
                </ur-form-item>
                <!-- 수신시도횟수 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_RCV_TRY_CNT')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        :value="numberWithCommas(cancelLogInfo.crRecvCnt)"
                        style="width: 100%; height: auto"
                        readonly
                    />
                </ur-form-item>
                <!-- 송신시도횟수 -->
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SND_TRY_CNT')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        :value="numberWithCommas(cancelLogInfo.csendCnt)"
                        style="width: 100%; height: auto"
                        readonly
                    />
                </ur-form-item>
            </ur-form-box>
            <!-- E::컨텐츠4:취소기록 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_SAR_00001', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            srchObj: {
                srchDt: ['', ''],
                srchKind: 'A',
            },
            // 신용카드 리스트
            gridFields: [
                {
                    fieldName: 'rapproveDay',
                    dataType: 'datetime',
                    datetimeFormat: 'yyyyMMdd',
                },
                {
                    fieldName: 'rapproveTime',
                    dataType: 'datetime',
                    datetimeFormat: 'HHmmss',
                },
                {
                    fieldName: 'crYmd',
                    dataType: 'datetime',
                    datetimeFormat: 'yyyyMMdd',
                },
                { fieldName: 'crHms', dataType: 'datetime', datetimeFormat: 'HHmmss' },
                { fieldName: 'billFgNm', dataType: 'text' },
                { fieldName: 'instNm', dataType: 'text' },
                { fieldName: 'cardNoFgNm', dataType: 'text' },
                { fieldName: 'cardData', dataType: 'text' },
                { fieldName: 'approveCardAmt', dataType: 'number' },
                { fieldName: 'receiptNo', dataType: 'text' },
                { fieldName: 'posId', dataType: 'text' },
                { fieldName: 'accountName', dataType: 'text' },
                { fieldName: 'orgCardNo', dataType: 'text' },
            ],
            gridColumns: [
                {
                    name: 'rapproveDayColumn',
                    fieldName: 'rapproveDay',
                    width: 80,
                    header: { text: this.$t('MSG_TXT_APPR_DATE') }, // 승인일자
                    edit: false,
                    datetimeFormat: 'yyyy-MM-dd',
                },
                {
                    name: 'rapproveTimeColumn',
                    fieldName: 'rapproveTime',
                    width: 80,
                    header: { text: this.$t('MSG_TXT_APPR_TIME') }, // 승인시간
                    edit: false,
                    datetimeFormat: 'HH:mm:ss',
                },
                {
                    name: 'crYmdColumn',
                    fieldName: 'crYmd',
                    width: 80,
                    header: { text: this.$t('MSG_TXT_CANCEL_DATE') }, // 취소일자
                    edit: false,
                    datetimeFormat: 'yyyy-MM-dd',
                },
                {
                    name: 'crHmsColumn',
                    fieldName: 'crHms',
                    width: 80,
                    header: { text: this.$t('MSG_TXT_CANCEL_TIME') }, // 취소시간
                    edit: false,
                    datetimeFormat: 'HH:mm:ss',
                },
                {
                    name: 'billFgNmColumn',
                    fieldName: 'billFgNm',
                    width: 130,
                    header: { text: this.$t('MSG_TXT_APPR_KIND') }, // 승인구분
                    edit: false,
                },
                {
                    name: 'instNmColumn',
                    fieldName: 'instNm',
                    width: 100,
                    header: { text: this.$t('MSG_TXT_DISC_KIND') }, // 식별구분
                    edit: false,
                },
                {
                    name: 'cardNoFgNmColumn',
                    fieldName: 'cardNoFgNm',
                    width: 100,
                    header: { text: this.$t('MSG_TXT_AUTH_METHOD') }, // 인증수단
                    edit: false,
                },
                {
                    name: 'cardDataColumn',
                    fieldName: 'cardData',
                    width: 100,
                    header: { text: this.$t('MSG_TXT_DISC_INFO') }, // 식별정보
                    edit: false,
                },
                {
                    name: 'approveCardAmtColumn',
                    fieldName: 'approveCardAmt',
                    width: 100,
                    header: { text: this.$t('MSG_TXT_PAY_AMT') }, // 결제금액
                    edit: false,
                    numberFormat: '#,##0',
                },
                {
                    name: 'receiptNoColumn',
                    fieldName: 'receiptNo',
                    width: 120,
                    header: { text: this.$t('MSG_TXT_RECEIPT_NO') }, // 영수증번호
                    edit: false,
                },
                {
                    name: 'posIdColumn',
                    fieldName: 'posId',
                    width: 100,
                    header: { text: 'POS ID' },
                    edit: false,
                },
                {
                    name: 'accountNameColumn',
                    fieldName: 'accountName',
                    width: 70,
                    header: { text: this.$t('MSG_TXT_PIC_NM') }, // 담당자명
                    edit: false,
                },
            ],
            gridList: [],
            apprLogInfo: {
                ymd: '',
                hms: '',
                cardNo: '',
                txlId: '',
                tlxFg: '',
                posId: '',
                terminalFg: '',
                cardCheckBillFgName: '',
                wcc: '',
                cardDataLenth: '',
                instNm: '',
                serviceFee: '',
                vat: '',
                approveCardAmt: '',
                passwd: '',
                rtxlId: '',
                rresponseCd: '',
                rapproveNo: '',
                rapproveVanFgName: '',
                ruseSelfFg: '',
                rfellowMaxCnt: '',
                rcardResponseMsg: '',
                rapproveDay: '',
                rapproveTime: '',
                rsalePosId: '',
                accountName: '',
                accountIp: '',
            },
            cancelLogInfo: {
                cymd: '',
                chms: '',
                cardNo: '',
                cinstNm: '',
                csendCnt: '',
                ctxlId: '',
                ctlxFg: '',
                cposId: '',
                cterminalFg: '',
                ccardCheckBillFgName: '',
                cwcc: '',
                ccardDataLenth: '',
                cserviceFee: '',
                cvat: '',
                capproveCardAmt: '',
                cpasswd: '',
                capproveVanFgName: '',
                capproveNo: '',
                corgApproveDay: '',
                corgApproveTime: '',
                crRecvCnt: '',
                crTxlId: '',
                crInquiryResCd: '',
                crApproveNo: '',
                crInquiryResMsg: '',
                cancelUser: '',
                cancelName: '',
                cancelIp: '',
            },
        };
    },
    created() {},
    computed: {},
    watch: {},
    mounted() {
        this.srchObj.srchDt[0] = moment(new Date()).format('YYYY-MM-DD');
        this.srchObj.srchDt[1] = moment(new Date()).format('YYYY-MM-DD');
        this.$refs.cashReceiptGrid.gridView.onCellClicked = (grid, clickData) => {
            if (clickData.cellType !== 'gridEmpty' && clickData.cellType !== 'header') {
                const cellData = this.gridList[clickData.dataRow];
                const params = {
                    apprDay: cellData.rapproveDay,
                    apprTime: cellData.rapproveTime,
                    cardNo: cellData.cardNo,
                };
                this.searchLog(params);
            }
        };
    },
    methods: {
        initSrchField() {
            const currentDate = moment(new Date()).format('YYYY-MM-DD');
            for (let key in this.srchObj) this.srchObj[key] = '';
            this.srchObj.srchDt = [currentDate, currentDate];
            this.srchObj.srchKind = 'A';
        },
        // 신용카드 목록 조회
        searchList() {
            if (this.invalidDate(this.srchObj.srchDt)) {
                return;
            }

            const params = {
                srchKind: this.srchObj.srchKind,
                startDay: this.srchObj.srchDt[0].replace(/-/g, ''),
                endDay: this.srchObj.srchDt[1].replace(/-/g, ''),
            };
            http.request('PGE_SAR_00001', 'DTS_SAR_00001', {
                query: params,
            })
                .then((res) => {
                    if (res.data.length <= 0) {
                        utils.messageBox('alert', this.$t('MSG_ALT_NO_DATA')); /* 데이터가 존재하지 않습니다. */
                        for (let key in this.apprLogInfo) this.apprLogInfo[key] = '';
                        for (let key in this.cancelLogInfo) this.cancelLogInfo[key] = '';
                    }

                    this.gridList = res.data;
                    this.$refs.cashReceiptGrid.setRows(this.gridList);
                    this.$refs.cashReceiptGrid.gridView.setCurrent({ itemIndex: 0 });

                    if (res.data.length > 0) {
                        const params = {
                            apprDay: this.gridList[0].rapproveDay,
                            apprTime: this.gridList[0].rapproveTime,
                            cardNo: this.gridList[0].cardNo,
                        };
                        this.searchLog(params);
                    }
                })
                .catch((error) => console.log(error));
        },
        // 신용카드 승인/취소 조회
        searchLog(params) {
            http.request('PGE_SAR_00001', 'DTS_SAR_00002', {
                query: params,
            })
                .then((res) => {
                    for (let key in this.apprLogInfo) this.apprLogInfo[key] = '';
                    for (let key in this.cancelLogInfo) this.cancelLogInfo[key] = '';
                    if (res.data.apprList.length > 0) this.apprLogInfo = res.data.apprList[0];
                    if (res.data.cancelList.length > 0) this.cancelLogInfo = res.data.cancelList[0];
                })
                .catch((error) => console.log(error));
        },

        numberWithCommas(number) {
            if (number || number === 0) {
                number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
            return !number && number !== 0 ? '' : number;
        },

        dateWithDash(date) {
            if (date) {
                date = date.toString().replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');
            }
            return date || '';
        },

        timeWithColone(time) {
            if (time) {
                time = time.toString().replace(/^(\d{2})(\d{2})(\d{2})$/, '$1:$2:$3');
            }
            return time || '';
        },
        invalidDate(date) {
            const _DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
            if (!_DATE_REGEX.test(date[0])) {
                utils.messageBox(
                    'alert',
                    utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_START_DATE'))
                ); // 시작일자는 필수
                return true;
            }

            if (!_DATE_REGEX.test(date[1])) {
                utils.messageBox(
                    'alert',
                    utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_END_DATE'))
                ); // 종료일자는 필수
                return true;
            }

            const toDate = moment(date[1], 'YYYY-MM-DD');
            const fromDate = moment(date[0], 'YYYY-MM-DD').add(1, 'month');

            if (!toDate.isBefore(fromDate)) {
                utils.messageBox('alert', '기간은 1개월을 초과할 수 없습니다.');
                return true;
            }

            return false;
        },
    },
};
</script>
<style scoped>
.custom_page .ur-form-item:nth-child(2) + .ur-form-item,
.custom_page .ur-form-item:nth-child(3) + .ur-form-item {
    border-top: none;
}
</style>
