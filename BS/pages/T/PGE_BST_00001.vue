<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_JOIN_FG')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-dropdown v-model="searchParams.joinFg" :items="joinFgList" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_ITEM_KIND')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-dropdown v-model="searchParams.itemKind" :items="itemKindList" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap borTop"
                    :label="$t('MSG_TXT_TICKET_ITEM_NM')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field
                        v-model="searchParams.itemNm"
                        maxlength="30"
                        style="width: 100%; height: auto"
                        @keyup="specialChar"
                        @keyup.enter="search"
                    />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap borTop"
                    :label="$t('MSG_TXT_ITEM_CD')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field
                        v-model="searchParams.itemCd"
                        maxlength="10"
                        style="width: 100%; height: auto"
                        mask="##########"
                        @keyup.enter="search"
                    />
                </ur-form-item>
            </ur-form-box>

            <div class="btn_wrap mt10">
                <div class="right_box">
                    <!-- 초기화 -->
                    <ur-button type="button" @click="reset">{{ $t('MSG_BTN_RESET') }}</ur-button>
                    <!-- 조회 -->
                    <ur-button v-permission:read="this.$options.name" type="button" @click="search">{{
                        $t('MSG_TXT_SRCH')
                    }}</ur-button>
                    <!-- 저장 -->
                    <ur-button
                        v-permission:create="this.$options.name"
                        type="button"
                        @click="checkValidation"
                        >{{ $t('MSG_TXT_SAVE') }}</ur-button
                    >
                    <!-- 엑셀다운로드 -->
                    <ur-button v-permission:excel="this.$options.name" type="button" color="violet" @click="excelDown">{{
                        $t('MSG_TXT_EXCEL_DOWNLOAD')
                    }}</ur-button>
                </div>
            </div>

            <!-- S::컨텐츠1 -->
            <div class="comm_title_wrap mt25">
                <h4>{{ $t('MSG_TXT_ITEM_LIST') }}</h4>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <!-- info: Total * 건 -->
                        <div class="totalCt">
                            Total<span>{{ numberWithCommas(totalCnt) }}</span
                            >{{ $t('MSG_TXT_CNT') }}
                        </div>
                    </div>
                </div>
                <!--E::: 타이틀 오른쪽 total info -->
            </div>
            <real-grid
                ref="pgeBst00001Grid"
                grid-id="pgeBst00001Grid"
                grid-root="/lib"
                :gridFields="gridFields"
                :gridColumns="gridColumns"
                :gridRows="gridDataList"
                :gridCellClick="gridCellClick"
                :style="gridStyle"
            />
            <!-- E::컨텐츠1-->

            <!-- S::컨텐츠2:권종 기본정보 -->
            <div class="comm_title_wrap mt45">
                <h4 class="pr10">{{ $t('MSG_TXT_ITEM_BASIC_INFO') }}</h4>
                <div class="title_compo">
                    <span class="infoTxt">{{ $t('MSG_TXT_CHANGE_ITEM') }}</span>
                </div>
            </div>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_PARK_KIND')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field v-model="selectedGridRowData.parkKind" style="width: 100%; height: auto" disabled />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_TICKET_ITEM_NM')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field v-model="selectedGridRowData.itemNm" style="width: 100%; height: auto" disabled />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap borTop"
                    :label="$t('MSG_TXT_ITEM_CD')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field v-model="selectedGridRowData.itemCd" style="width: 100%; height: auto" disabled />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_CHAR2_DESC')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field v-model="selectedGridRowData.char2Desc" style="width: 100%; height: auto" disabled />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_JOIN_FG')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field v-model="selectedGridRowData.joinFg" style="width: 100%; height: auto" disabled />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_REGULAR_PRICE')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field v-model="selectedGridRowData.price" style="width: 100%; height: auto" disabled />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_CLS5_NAME')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field v-model="selectedGridRowData.cls5Name" style="width: 100%; height: auto" disabled />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_ITEM_COLOR')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        v-model="annuColorFg"
                        style="width: 100%; height: auto"
                        :class="color"
                        disabled
                    />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_APPLY_DTM')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <div style="width: 145px">
                        <ur-date-picker v-model="selectedGridRowData.validStartDate" disabled />
                    </div>
                    <span class="pickerSpace">~</span>
                    <div style="width: 145px">
                        <ur-date-picker v-model="selectedGridRowData.validEndDate" disabled />
                    </div>
                </ur-form-item>
            </ur-form-box>
            <!-- E::컨텐츠2:권종 기본정보 -->

            <!-- S::컨텐츠3:가입구분 -->
            <div class="comm_title_wrap mt45">
                <h4 class="pr10">{{ $t('MSG_TXT_JOIN_FG') }}</h4>
                <div class="title_compo">
                    <span class="infoTxt">{{ $t('MSG_TXT_REQ_SETTING') }}</span>
                </div>
            </div>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_ITEM_KIND')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                    required
                >
                    <ur-dropdown v-model="itemKindNm" :items="selItemKindList" @input="selectItemKind" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_AVAIL_DAY')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                    required
                >
                    <ur-text-field
                        ref="availDay"
                        v-model="availDay"
                        mask="#####"
                        maxlength="5"
                        style="width: 100%; height: auto"
                    />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_EXPI_DATE')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        v-model="expireExtendDay"
                        mask="#####"
                        maxlength="5"
                        style="width: 100%; height: auto"
                    />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap borTop"
                    :label="$t('MSG_TXT_REFUND_YN')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                    required
                >
                    <ur-dropdown v-model="refundYn" :items="refundYnList" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_PENALTY_PERIOD')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                    required
                >
                    <ur-text-field
                        v-model="refundPenaltyPeriod"
                        mask="###"
                        maxlength="3"
                        style="width: 100%; height: auto"
                        class="pr5"
                    />{{ $t('MSG_TXT_SUN') }}
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_TIME_SETTING')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                    required
                >
                    <ur-dropdown v-model="timeSetting" :items="timeSettingList" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SLE_YN')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                    required
                >
                    <ur-dropdown v-model="saleYn" :items="saleYnList" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_DAY_PERIOD')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                    required
                >
                    <ur-text-field
                        v-model="joinPeriodDay"
                        mask="####"
                        maxlength="4"
                        style="width: 100%; height: auto"
                        class="pr5"
                    />{{ $t('MSG_TXT_SUN') }}
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_ITEM_TICKET_TYPE')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                    required
                >
                    <ur-dropdown v-model="itemPreYn" :items="itemPreYnList" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SORT_ORDER')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field
                        v-model="sortOrderValue"
                        mask="####"
                        maxlength="4"
                        style="width: 100%; height: auto"
                    />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_POSSIBLE_STOP')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                    required
                >
                    <ur-dropdown v-model="stopPsbYn" :items="stopPsbYnList" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_DAY_DIVIDE')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                    required
                >
                    <ur-dropdown v-model="dayDivideYn" :items="dayDivideYnList" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_PERIOD_DIVIDE')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                    required
                >
                    <ur-dropdown v-model="dayDivideTypeCd" :items="dayDivideTypeCdList" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_ONE_PERIOD')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                    required
                >
                    <ur-text-field
                        v-model="selectedGridRowData.dayDivideDate"
                        mask="#####"
                        maxlength="5"
                        style="width: 31.8%; height: auto"
                        disabled
                    />
                </ur-form-item>
                <!-- 2023-04-27 가입구분 추가-->
            </ur-form-box>
            <!-- E::컨텐츠3:가입구분 -->

            <!-- S::컨텐츠4:시즌권 설정 -->
            <div class="comm_title_wrap mt45">
                <h4 class="pr10">{{ $t('MSG_TXT_SEASON_SETUP') }}</h4>
                <div class="title_compo">
                    <span class="infoTxt">{{ $t('MSG_TXT_SEASON_SETUP_SETTING') }}</span>
                </div>
            </div>
            <ur-form-box>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SALES_START_DATE')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                    required
                >
                    <ur-date-picker v-model="selectedGridRowData.salesStartDate" autoConfirm input-type="YYYY-MM-DD" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_SALES_END_DATE')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                    required
                >
                    <ur-date-picker v-model="selectedGridRowData.salesEndDate" autoConfirm input-type="YYYY-MM-DD" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_ISSUE_START_DATE')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                    required
                >
                    <ur-date-picker v-model="selectedGridRowData.issueStartDate" autoConfirm input-type="YYYY-MM-DD" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_ISSUE_END_DATE')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                    required
                >
                    <ur-date-picker v-model="selectedGridRowData.issueEndDate" autoConfirm input-type="YYYY-MM-DD" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_EXPIRE_TYPE')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                    required
                >
                    <ur-dropdown v-model="expireTypeCd" :items="expireTypeCdList" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_EXPR_DATE')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-date-picker
                        v-model="selectedGridRowData.expireDate"
                        autoConfirm
                        input-type="YYYY-MM-DD"
                        :disabled="disabled"
                    />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_INTERIM_JOIN')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                    required
                >
                    <ur-dropdown v-model="interimJoinYn" :items="interimJoinYnList" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_INTERIM_JOIN_TYPE')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                    required
                >
                    <ur-dropdown v-model="interimJoinTypeCd" :items="interimJoinTypeCdList" />
                </ur-form-item>
            </ur-form-box>
            <!-- E::컨텐츠4:시즌권 설정 -->

            <!-- S::컨텐츠5:다회권 설정 -->
            <div class="comm_title_wrap mt45">
                <h4 class="pr10">{{ $t('MSG_TXT_MULTI_TICKET_SET') }}</h4>
            </div>
            <ur-form-box>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_PERIOD_CNT')"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                >
                    <ur-text-field v-model="periodCnt" mask="#####" maxlength="5" style="width: 42.3%; height: auto" />
                </ur-form-item>
            </ur-form-box>
            <!-- E::컨텐츠5:다회권 설정 -->

            <ur-form-box class="mt20">
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_RGST_DT')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    {{ selectedGridRowData.fstRgstDtm | dateDayFormat }}
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_FST_RGST_USR')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    {{ selectedGridRowData.fstRgstUsrId }}
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_MDFC_DT')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                    input-type="YYYY-MM-DD HH:mm:ss"
                >
                    {{ selectedGridRowData.fnlMdfcDtm | dateDayFormat }}
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_MDFC_USR')"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    {{ selectedGridRowData.fnlMdfcUsrId }}
                </ur-form-item>
            </ur-form-box>

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
import _ from 'lodash';

export default {
    name: 'PGE_BST_00001',
    components: {}, // eslint-disable-line vue/name-property-casing
    filters: {
        dateDayFormat(date) {
            return date ? utils.toStringByFormat(date, 'YYYY-MM-DD HH:mm:ss') : '';
        },
    },
    data() {
        return {
            searchParams: {
                joinFg: '',
                itemKind: '',
                itemNm: '',
                itemCd: '',
            },
            today: utils.now('YYYY-MM-DD'),
            clickCheck: false,
            validStartDate: null,
            validEndDate: null,
            availDay: null,
            expireExtendDay: null,
            sortOrderValue: null,
            refundPenaltyPeriod: null,
            periodCnt: null,
            joinPeriodDay: null,
            annuColorFg: null,
            itemKindNm: '',
            refundYn: '',
            timeSetting: '',
            saleYn: '',
            itemPreYn: '',
            stopPsbYn: '',
            dayDivideYn: '',
            dayDivideTypeCd: '',
            expireTypeCd: '',
            interimJoinYn: '',
            interimJoinTypeCd: '',
            selectedGridRowData: {},
            joinFgList: [],
            itemKindList: [],
            selItemKindList: [],
            refundYnList: [],
            timeSettingList: [],
            saleYnList: [],
            itemPreYnList: [],
            stopPsbYnList: [],
            dayDivideYnList: [],
            dayDivideTypeCdList: [],
            expireTypeCdList: [],
            interimJoinYnList: [],
            interimJoinTypeCdList: [],
            gridDataList: [],
            gridStyle: { height: '250px' },
            // select box 전체
            allSelect: { value: '', text: this.$t('MSG_TXT_ALL') }, // 전체
            // select box 선택
            selAllSelect: { value: '', text: this.$t('MSG_TXT_SEL') }, // 선택
            totalCnt: 0,
        };
    },
    computed: {
        // 만료구분(고정형) >> 활성화, (변동형) >> 비활성화
        disabled() {
            if (this.expireTypeCd === 'ET02') {
                return false;
            } else {
                return true;
            }
        },
        // 앱 권종색상 text-field 색 변경
        color() {
            if (this.selectedGridRowData.annuColorFg === '00') {
                return 'grayColor';
            } else if (this.selectedGridRowData.annuColorFg === '01') {
                return 'greenColor';
            } else if (this.selectedGridRowData.annuColorFg === '02') {
                return 'orangeColor';
            } else if (this.selectedGridRowData.annuColorFg === '03') {
                return 'blueColor';
            } else if (this.selectedGridRowData.annuColorFg === '04') {
                return 'cyanColor';
            } else if (this.selectedGridRowData.annuColorFg === '05') {
                return 'goldColor';
            } else if (this.selectedGridRowData.annuColorFg === '06') {
                return 'purpleColor';
            } else if (this.selectedGridRowData.annuColorFg === '07') {
                return 'yellowColor';
            } else if (this.selectedGridRowData.annuColorFg === '08') {
                return 'lightBlueColor';
            } else if (this.selectedGridRowData.annuColorFg === '09') {
                return 'pinkColor';
            } else {
                return 'etcColor';
            }
        },
    },
    watch: {},
    created() {
        this.gridFields = [
            { fieldName: 'sortOrderValue', dataType: 'number' },
            { fieldName: 'itemCd', dataType: 'text' },
            { fieldName: 'itemNm', dataType: 'text' },
            { fieldName: 'parkKind', dataType: 'text' },
            { fieldName: 'itemKindNm', dataType: 'text' },
            { fieldName: 'itemKind', dataType: 'text' },
            { fieldName: 'cls5Name', dataType: 'text' },
            { fieldName: 'char2Desc', dataType: 'text' },
            { fieldName: 'validStartDate', dataType: 'text', datetimeFormat: 'yyyyMMdd' },
            { fieldName: 'validEndDate', dataType: 'text', datetimeFormat: 'yyyyMMdd' },
            { fieldName: 'useYn', dataType: 'text' },
            { fieldName: 'joinFg', dataType: 'text' },
            { fieldName: 'price', dataType: 'text' },
            { fieldName: 'conditionTypeCd', dataType: 'text' },
            { fieldName: 'availDay', dataType: 'number' },
            { fieldName: 'expireExtendDay', dataType: 'number' },
            { fieldName: 'refundYn', dataType: 'text' },
            { fieldName: 'refundPenaltyPeriod', dataType: 'text' },
            { fieldName: 'stopPsbYn', dataType: 'text' },
            { fieldName: 'dayDivideYn', dataType: 'text' },
            { fieldName: 'dayDivideTypeCd', dataType: 'text' },
            { fieldName: 'dayDivideTypeNm', dataType: 'text' },
            { fieldName: 'salesStartDate', dataType: 'text', datetimeFormat: 'yyyyMMdd' },
            { fieldName: 'salesEndDate', dataType: 'text', datetimeFormat: 'yyyyMMdd' },
            { fieldName: 'issueStartDate', dataType: 'text', datetimeFormat: 'yyyyMMdd' },
            { fieldName: 'issueEndDate', dataType: 'text', datetimeFormat: 'yyyyMMdd' },
            { fieldName: 'expireTypeCd', dataType: 'text' },
            { fieldName: 'expireTypeNm', dataType: 'text' },
            { fieldName: 'expireDate', dataType: 'text', datetimeFormat: 'yyyyMMdd' },
            { fieldName: 'interimJoinTypeCd', dataType: 'text' },
            { fieldName: 'interimJoinTypeNm', dataType: 'text' },
            { fieldName: 'dayDivideDate', dataType: 'text' },
            { fieldName: 'timeSetting', dataType: 'text' },
            { fieldName: 'saleYn', dataType: 'text' },
            { fieldName: 'joinPeriodDay', dataType: 'number' },
            { fieldName: 'itemPreYn', dataType: 'text' },
            { fieldName: 'periodCnt', dataType: 'number' },
        ];
        this.gridColumns = [
            {
                // 정렬순서
                name: 'sortOrderValueColumn',
                fieldName: 'sortOrderValue',
                width: 100,
                numberFormat: '#,##0',
                edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
                header: {
                    text: this.$t('MSG_TXT_SORT_ORDER'),
                },
            },
            {
                // 권종코드
                name: 'itemCdColumn',
                fieldName: 'itemCd',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_ITEM_CD'),
                },
            },
            {
                // 권종명
                name: 'itemNmColumn',
                fieldName: 'itemNm',
                width: 250,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_TICKET_ITEM_NM'),
                },
                renderer: {
                    showTooltip: true, // 툴팁여부
                },
            },
            {
                // 파크구분
                name: 'parkKindColumn',
                fieldName: 'parkKind',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_PARK_KIND'),
                },
            },
            {
                // 권종구분코드
                name: 'itemKindNmColumn',
                fieldName: 'itemKindNm',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_TICKET_CLASS_CODE'),
                },
            },
            {
                // 상세권종구분
                name: 'itemKindColumn',
                fieldName: 'itemKind',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_CLASS_DETAIL_TICKET'),
                },
            },
            {
                // 권종매출구분
                name: 'cls5NameColumn',
                fieldName: 'cls5Name',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_CLASS_TICKET_SALE'),
                },
            },
            {
                // 권종인원구분
                name: 'char2DescColumn',
                fieldName: 'char2Desc',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_CLASS_TICKET_TYPE'),
                },
            },
            {
                // 적용시작일
                name: 'validStartDateColumn',
                fieldName: 'validStartDate',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_APP_START_DATE'),
                },
                datetimeFormat: 'yyyy-MM-dd',
            },
            {
                // 적용종료일
                name: 'validEndDateColumn',
                fieldName: 'validEndDate',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_APP_END_DATE'),
                },
                datetimeFormat: 'yyyy-MM-dd',
            },
            {
                // 사용여부
                name: 'useYnColumn',
                fieldName: 'useYn',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_DTST_USE_YN'),
                },
            },
            {
                // 가입구분
                name: 'joinFgColumn',
                fieldName: 'joinFg',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_JOIN_FG'),
                },
            },
            {
                // 가격
                name: 'priceColumn',
                fieldName: 'price',
                width: 100,
                numberFormat: '#,##0',
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_PRICE'),
                },
            },
            {
                // COND 구분
                name: 'conditionTypeCdColumn',
                fieldName: 'conditionTypeCd',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_COND_CLASS'),
                },
            },
            {
                // 사용가용일
                name: 'availDayColumn',
                fieldName: 'availDay',
                width: 100,
                numberFormat: '#,##0',
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_AVAIL_DAY'),
                },
            },
            {
                // 만기연장일
                name: 'expireExtendDayColumn',
                fieldName: 'expireExtendDay',
                width: 100,
                numberFormat: '#,##0',
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_EXPI_DATE'),
                },
            },
            {
                // 환불여부
                name: 'refundYnColumn',
                fieldName: 'refundYn',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_REFUND_YN'),
                },
            },
            {
                // 위약금기준일
                name: 'refundPenaltyPeriodColumn',
                fieldName: 'refundPenaltyPeriod',
                width: 100,
                numberFormat: '#,##0',
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_REFUND_PENALTY'),
                },
            },
            {
                // 중지가능여부
                name: 'stopPsbYnColumn',
                fieldName: 'stopPsbYn',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_POSSIBLE_STOP'),
                },
            },
            {
                // 일분할여부
                name: 'dayDivideYnColumn',
                fieldName: 'dayDivideYn',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_DAY_DIVIDE'),
                },
            },
            {
                // 일분할 기간구분코드
                name: 'dayDivideTypeCdColumn',
                fieldName: 'dayDivideTypeCd',
                width: 100,
                edit: false,
                visible: false, // Grid 숨김처리
                header: {
                    text: this.$t('MSG_TXT_PERIOD_DIVIDE'),
                },
            },
            {
                // 일분할 기간구분명
                name: 'dayDivideTypeNmColumn',
                fieldName: 'dayDivideTypeNm',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_PERIOD_DIVIDE'),
                },
            },
            {
                // 판매시작일
                name: 'salesStartDateColumn',
                fieldName: 'salesStartDate',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_SALES_START_DATE'),
                },
                datetimeFormat: 'yyyy-MM-dd',
            },
            {
                // 판매종료일
                name: 'salesEndDateColumn',
                fieldName: 'salesEndDate',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_SALES_END_DATE'),
                },
                datetimeFormat: 'yyyy-MM-dd',
            },
            {
                // 발급시작일
                name: 'issueStartDateColumn',
                fieldName: 'issueStartDate',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_ISSUE_START_DATE'),
                },
                datetimeFormat: 'yyyy-MM-dd',
            },
            {
                // 발급종료일
                name: 'issueEndDateColumn',
                fieldName: 'issueEndDate',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_ISSUE_END_DATE'),
                },
                datetimeFormat: 'yyyy-MM-dd',
            },
            {
                // 만료구분코드
                name: 'expireTypeCdColumn',
                fieldName: 'expireTypeCd',
                width: 100,
                edit: false,
                visible: false,
                header: {
                    text: this.$t('MSG_TXT_EXPIRE_TYPE'),
                },
            },
            {
                // 만료구분명
                name: 'expireTypeNmColumn',
                fieldName: 'expireTypeNm',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_EXPIRE_TYPE'),
                },
            },
            {
                // 만료일
                name: 'expireDateColumn',
                fieldName: 'expireDate',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_EXPR_DATE'),
                },
                datetimeFormat: 'yyyy-MM-dd',
            },
            {
                // 중간가입시일분할처리구분코드
                name: 'interimJoinTypeCdColumn',
                fieldName: 'interimJoinTypeCd',
                width: 160,
                edit: false,
                visible: false,
                header: {
                    text: this.$t('MSG_TXT_INTERIM_JOIN_TYPE_CD'),
                },
            },
            {
                // 중간가입시일분할처리구분명
                name: 'interimJoinTypeNmColumn',
                fieldName: 'interimJoinTypeNm',
                width: 160,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_INTERIM_JOIN_TYPE_CD'),
                },
            },
            {
                // 일분할기간
                name: 'dayDivideDateColumn',
                fieldName: 'dayDivideDate',
                width: 100,
                numberFormat: '#,##0',
                edit: false,
                visible: false,
                header: {
                    text: this.$t('MSG_TXT_ONE_PERIOD'),
                },
            },
            {
                // 시간설정
                name: 'timeSettingColumn',
                fieldName: 'timeSetting',
                width: 100,
                edit: false,
                visible: false,
                header: {
                    text: this.$t('MSG_TXT_TIME_SETTING'),
                },
            },
            {
                // 판매여부
                name: 'saleYnColumn',
                fieldName: 'saleYn',
                width: 100,
                edit: false,
                visible: false,
                header: {
                    text: this.$t('MSG_TXT_SLE_YN'),
                },
            },
            {
                // 가입기간일수
                name: 'joinPeriodDayColumn',
                fieldName: 'joinPeriodDay',
                width: 100,
                numberFormat: '#,##0',
                edit: false,
                visible: false,
                header: {
                    text: this.$t('MSG_TXT_DAY_PERIOD'),
                },
            },
            {
                // 선가입여부
                name: 'itemPreYnColumn',
                fieldName: 'itemPreYn',
                width: 100,
                edit: false,
                visible: false,
                header: {
                    text: this.$t('MSG_TXT_ITEM_TICKET_TYPE'),
                },
            },
            {
                // 기간횟수
                name: 'periodCntColumn',
                fieldName: 'periodCnt',
                width: 100,
                numberFormat: '#,##0',
                edit: false,
                visible: false,
                header: {
                    text: this.$t('MSG_TXT_PERIOD_NUMBER'),
                },
            },
        ];
    },
    mounted() {
        this.searchParams.joinFg = '';
        this.searchParams.itemKind = '';
        this.searchParams.itemNm = '';
        this.searchParams.itemCd = '';
        this.selectedGridRowData = '';
        this.clickCheck = false;
        // this.allSelect >> (조회조건) 전체 포함 가입구분 공통코드 조회
        http.request(this.$options.name, 'DTS_BST_00008', {
            path: { 'code-id': 'COD_R1' },
        }).then((res) => {
            res.data.unshift(Object.assign({}, this.allSelect));
            this.joinFgList = res.data;
        });
        // this.allSelect >> (조회조건) 전체 포함 권종구분 공통코드 조회
        http.request(this.$options.name, 'DTS_BST_00008', {
            path: { 'code-id': 'COD_IT' },
        }).then((res) => {
            res.data.unshift(Object.assign({}, this.allSelect));
            this.itemKindList = res.data;
        });
        // 가입구분 >> 선택 포함 권종구분 공통코드 조회
        http.request(this.$options.name, 'DTS_BST_00008', {
            path: { 'code-id': 'COD_IT' },
        }).then((res) => {
            res.data.unshift(Object.assign({}, this.selAllSelect));
            this.selItemKindList = res.data;
        });
        // 선택 포함 환불여부 공통코드 조회
        http.request(this.$options.name, 'DTS_BST_00008', {
            path: { 'code-id': 'COD_R2' },
        }).then((res) => {
            res.data.unshift(Object.assign({}, this.selAllSelect));
            this.refundYnList = res.data;
        });
        // 선택 포함 시간설정 공통코드 조회
        http.request(this.$options.name, 'DTS_BST_00008', {
            path: { 'code-id': 'COD_TS' },
        }).then((res) => {
            res.data.unshift(Object.assign({}, this.selAllSelect));
            this.timeSettingList = res.data;
        });
        // 선택 포함 판매여부 공통코드 조회
        http.request(this.$options.name, 'DTS_BST_00008', {
            path: { 'code-id': 'COD_R3' },
        }).then((res) => {
            res.data.unshift(Object.assign({}, this.selAllSelect));
            this.saleYnList = res.data;
        });
        // 선택 포함 선가입 여부 공통코드 조회
        http.request(this.$options.name, 'DTS_BST_00008', {
            path: { 'code-id': 'COD_R4' },
        }).then((res) => {
            res.data.unshift(Object.assign({}, this.selAllSelect));
            this.itemPreYnList = res.data;
        });
        // 선택 포함 중지가능여부 공통코드 조회
        http.request(this.$options.name, 'DTS_BST_00008', {
            path: { 'code-id': 'COD_P1' },
        }).then((res) => {
            res.data.unshift(Object.assign({}, this.selAllSelect));
            this.stopPsbYnList = res.data;
        });
        // 선택 포함 일분할여부 공통코드 조회
        http.request(this.$options.name, 'DTS_BST_00008', {
            path: { 'code-id': 'COD_R5' },
        }).then((res) => {
            res.data.unshift(Object.assign({}, this.selAllSelect));
            this.dayDivideYnList = res.data;
        });
        // 선택 포함 일분할 기간구분 공통코드 조회
        http.request(this.$options.name, 'DTS_BST_00008', {
            path: { 'code-id': 'COD_DT' },
        }).then((res) => {
            res.data.unshift(Object.assign({}, this.selAllSelect));
            this.dayDivideTypeCdList = res.data;
        });
        // 선택 포함 만료구분 공통코드 조회
        http.request(this.$options.name, 'DTS_BST_00008', {
            path: { 'code-id': 'COD_ET' },
        }).then((res) => {
            res.data.unshift(Object.assign({}, this.selAllSelect));
            this.expireTypeCdList = res.data;
        });
        // 선택 포함 중도가입 공통코드 조회
        http.request(this.$options.name, 'DTS_BST_00008', {
            path: { 'code-id': 'COD_R6' },
        }).then((res) => {
            res.data.unshift(Object.assign({}, this.selAllSelect));
            this.interimJoinYnList = res.data;
        });
        // 선택 포함 중도가입 일분할 공통코드 조회
        http.request(this.$options.name, 'DTS_BST_00008', {
            path: { 'code-id': 'COD_JT' },
        }).then((res) => {
            res.data.unshift(Object.assign({}, this.selAllSelect));
            this.interimJoinTypeCdList = res.data;
        });
    },
    methods: {
        // 가입구분 >> 권종구분 변경시 클릭 이벤트
        selectItemKind() {
            // IT04 >> 가입구분(시즌권)
            if (this.itemKindNm === 'IT04') {
                this.selectedGridRowData.salesStartDate = null; // 판매시작일
                this.selectedGridRowData.salesEndDate = null; // 판매종료일
                this.selectedGridRowData.issueStartDate = null; // 발급시작일
                this.selectedGridRowData.issueEndDate = null; // 발급종료일
                this.interimJoinYn = 'Y'; // 중도가입
                this.interimJoinTypeCd = 'JT01'; // 중도가입 일분할(가입일누적)
                this.expireTypeCd = 'ET02'; // 만료구분(고정형)
            } else {
                this.selectedGridRowData.salesStartDate = this.today;
                this.selectedGridRowData.salesEndDate = '2999-12-31';
                this.selectedGridRowData.issueStartDate = this.today;
                this.selectedGridRowData.issueEndDate = '2999-12-31';
                this.expireTypeCd = 'ET01'; // 만료구분(변동형)
                this.interimJoinTypeCd = 'JT02'; // 중도가입 일분할(전체일분할)
            }
            this.interimJoinYn = 'Y'; // 중도가입
            this.availDay = '365'; // 사용가능일
            this.expireExtendDay = '0'; // 만기연장일
            this.refundYn = 'Y'; // 환불가능여부
            this.refundPenaltyPeriod = '14'; // 위약금적용기간
            this.dayDivideYn = 'Y'; // 일분할 여부
            if (this.itemKindNm === 'IT02') {
                // 가입구분(셀렉트)
                this.dayDivideTypeCd = 'DT02'; // 일분할적용유형코드(가용일분할)
            } else {
                this.dayDivideTypeCd = 'DT01'; // 일분할적용유형코드(사용일분할)
            }
        },
        // (조회조건) 초기화
        reset() {
            this.searchParams.joinFg = '';
            this.searchParams.itemKind = '';
            this.searchParams.itemNm = '';
            this.searchParams.itemCd = '';
        },
        // 조회 파라미터
        getSearchParam() {
            const params = {
                joinFg: this.searchParams.joinFg, // 가입구분
                itemKind: this.searchParams.itemKind, // 권종구분
                itemNm: utils.trim(this.searchParams.itemNm), // 권종명
                itemCd: utils.trim(this.searchParams.itemCd), // 권종코드
            };
            return params;
        },
        // 수정 파라미터
        getUpdateParam() {
            const params = {
                itemCd: utils.trim(this.selectedGridRowData.itemCd), // 권종코드
                parkKind: utils.trim(this.selectedGridRowData.parkKind), // 파크구분
                itemNm: encodeURI(this.selectedGridRowData.itemNm), // 권종명
                itemKind: utils.trim(this.itemKindNm), // 권종구분
                availDay: utils.trim(this.availDay), // 가용일
                expireExtendDay: utils.trim(this.expireExtendDay), // 연장일
                refundYn: utils.trim(this.refundYn), // 환불여부
                refundPenaltyPeriod: utils.trim(this.refundPenaltyPeriod), // 위약금 적용기간
                stopPsbYn: utils.trim(this.stopPsbYn), // 중지가능여부
                dayDivideYn: utils.trim(this.dayDivideYn), // 일분할여부
                dayDivideTypeCd: utils.trim(this.dayDivideTypeCd), // 일분할 기간구분
                joinPeriodDay: utils.trim(this.joinPeriodDay), // 가입기간일수
                itemPreYn: utils.trim(this.itemPreYn), // 선가입 여부
                salesStartDate: utils.toStringByFormat(this.selectedGridRowData.salesStartDate, 'YYYYMMDD'), // 판매시작일
                salesEndDate: utils.toStringByFormat(this.selectedGridRowData.salesEndDate, 'YYYYMMDD'), // 판매종료일
                issueStartDate: utils.toStringByFormat(this.selectedGridRowData.issueStartDate, 'YYYYMMDD'), // 발급시작일
                issueEndDate: utils.toStringByFormat(this.selectedGridRowData.issueEndDate, 'YYYYMMDD'), // 발급종료일
                expireTypeCd: utils.trim(this.expireTypeCd), // 만료구분
                expireDate: utils.toStringByFormat(this.selectedGridRowData.expireDate, 'YYYYMMDD'), // 발급종료일
                interimJoinYn: utils.trim(this.interimJoinYn), // 중도가입
                interimJoinTypeCd: utils.trim(this.interimJoinTypeCd), // 중도가입 일분할
                sortOrderValue: utils.trim(this.sortOrderValue), // 정렬순서
                saleYn: utils.trim(this.saleYn), // 판매여부
                timeSetting: utils.trim(this.timeSetting), // 시간설정
                periodCnt: utils.trim(this.periodCnt), // 기간횟수
            };
            return params;
        },
        // 저장버튼 클릭 시 Validation 체크
        checkValidation() {
            let salesStartDate = ''
            let salesEndDate = ''
            let issueStartDate = ''
            let issueEndDate = ''
            if (this.selectedGridRowData != null) {
                salesStartDate = utils.toStringByFormat(this.selectedGridRowData.salesStartDate, 'YYYYMMDD'); // 판매시작일
                salesEndDate = utils.toStringByFormat(this.selectedGridRowData.salesEndDate, 'YYYYMMDD'); // 판매종료일
                issueStartDate = utils.toStringByFormat(this.selectedGridRowData.issueStartDate, 'YYYYMMDD'); // 발급시작일
                issueEndDate = utils.toStringByFormat(this.selectedGridRowData.issueEndDate, 'YYYYMMDD'); // 발급종료일
            }
            if (!this.clickCheck) {
                // 수정할 행을 선택해주세요.
                utils.messageBox('alert', this.$t('MSG_ALT_EDIT_SELECT_ROW'));
                return;
            } else {
                if (this.selectedGridRowData === '' || this.selectedGridRowData === null) {
                    // 수정할 데이터가 없습니다.
                    utils.messageBox('alert', this.$t('MSG_ALT_EDIT_NO_DATA'));
                    return;
                }
                // 가입구분(셀렉트 || 다회권) 일 때, 사용가용일 ("" || null) >> 사용가용일 입력 알럿
                if (
                    (this.itemKindNm === 'IT02' || this.itemKindNm === 'IT06') &&
                    (this.availDay === null || utils.trim(this.availDay) === '')
                ) {
                    // 가용일을 입력하십시요.
                    utils.messageBox('alert', this.$t('MSG_ALT_ENTER_AVAIL_DATE'));
                    this.$refs.availDay.focus();
                    return;
                }
                if (_.isEmpty(this.itemKindNm)) {
                    // 권종구분 을(를) 입력하세요.
                    utils.messageBox(
                        'alert',
                        utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_ITEM_KIND'), null)
                    );
                    return;
                }
                if (_.isEmpty(this.availDay)) {
                    // 사용가능일 을(를) 입력하세요.
                    utils.messageBox(
                        'alert',
                        utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_AVAIL_DAY'), null)
                    );
                    return;
                }
                if (_.isEmpty(this.refundYn)) {
                    // 환불여부 을(를) 입력하세요.
                    utils.messageBox(
                        'alert',
                        utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_REFUND_YN'), null)
                    );
                    return;
                }
                if (_.isEmpty(this.refundPenaltyPeriod)) {
                    // 위약금 적용기간 을(를) 입력하세요.
                    utils.messageBox(
                        'alert',
                        utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PENALTY_PERIOD'), null)
                    );
                    return;
                }
                if (_.isEmpty(this.timeSetting)) {
                    // 시간설정 을(를) 입력하세요.
                    utils.messageBox(
                        'alert',
                        utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_TIME_SETTING'), null)
                    );
                    return;
                }
                if (_.isEmpty(this.saleYn)) {
                    // 판매여부 을(를) 입력하세요.
                    utils.messageBox(
                        'alert',
                        utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_SLE_YN'), null)
                    );
                    return;
                }
                if (_.isEmpty(this.joinPeriodDay)) {
                    // 가입기간일수 을(를) 입력하세요.
                    utils.messageBox(
                        'alert',
                        utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_DAY_PERIOD'), null)
                    );
                    return;
                }
                if (_.isEmpty(this.itemPreYn)) {
                    // 선가입여부 을(를) 입력하세요.
                    utils.messageBox(
                        'alert',
                        utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_ITEM_TICKET_TYPE'), null)
                    );
                    return;
                }
                if (_.isEmpty(this.stopPsbYn)) {
                    // 중지가능여부 을(를) 입력하세요.
                    utils.messageBox(
                        'alert',
                        utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_POSSIBLE_STOP'), null)
                    );
                    return;
                }
                if (_.isEmpty(this.dayDivideYn)) {
                    // 일분할여부 을(를) 입력하세요.
                    utils.messageBox(
                        'alert',
                        utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_DAY_DIVIDE'), null)
                    );
                    return;
                }
                if (_.isEmpty(this.dayDivideTypeCd)) {
                    // 일분할 기간구분 을(를) 입력하세요.
                    utils.messageBox(
                        'alert',
                        utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PERIOD_DIVIDE'), null)
                    );
                    return;
                }
                if (_.isEmpty(salesStartDate)) {
                    // 판매시작일 을(를) 입력하세요.
                    utils.messageBox(
                        'alert',
                        utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_SALES_START_DATE'), null)
                    );
                    return;
                }
                if (_.isEmpty(salesEndDate)) {
                    // 판매종료일 을(를) 입력하세요.
                    utils.messageBox(
                        'alert',
                        utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_SALES_END_DATE'), null)
                    );
                    return;
                }
                if (salesStartDate > salesEndDate) {
                    // 판매시작일을 판매종료일 이전으로 입력하십시요.
                    utils.messageBox('alert', this.$t('MSG_ALT_SALE_START_END_DATE'));
                    return;
                }
                if (_.isEmpty(issueStartDate)) {
                    // 발급시작일 을(를) 입력하세요.
                    utils.messageBox(
                        'alert',
                        utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_ISSUE_START_DATE'), null)
                    );
                    return;
                }
                if (_.isEmpty(issueEndDate)) {
                    // 발급종료일 을(를) 입력하세요.
                    utils.messageBox(
                        'alert',
                        utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_ISSUE_END_DATE'), null)
                    );
                    return;
                }
                if (issueStartDate > issueEndDate) {
                    // 발급시작일을 발급종료일 이전으로 입력하십시요.
                    utils.messageBox('alert', this.$t('MSG_ALT_ISSUE_START_END_DATE'));
                    return;
                }
                if (_.isEmpty(this.expireTypeCd)) {
                    // 만료구분 을(를) 입력하세요.
                    utils.messageBox(
                        'alert',
                        utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_EXPIRE_TYPE'), null)
                    );
                    return;
                }
                if (_.isEmpty(this.interimJoinYn)) {
                    // 중도가입 을(를) 입력하세요.
                    utils.messageBox(
                        'alert',
                        utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_INTERIM_JOIN'), null)
                    );
                    return;
                }
                if (_.isEmpty(this.interimJoinTypeCd)) {
                    // 중도가입 일분할 을(를) 입력하세요.
                    utils.messageBox(
                        'alert',
                        utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_INTERIM_JOIN_TYPE'), null)
                    );
                    return;
                }
            }
            this.save();
        },
        // 조회
        search() {
            const params = this.getSearchParam();
            http.request(this.$options.name, 'DTS_BST_00001', {
                query: params,
            })
                .then((res) => {
                    const resData = res.data;
                    this.totalCnt = res.data.length;
                    utils.map(resData, (data) => {
                        data.price = _.isNull(data.price) ? data.price : utils.numberWithCommas(data.price);
                    });
                    this.gridDataList = resData;
                    if (this.gridDataList.length == 0) {
                        // 데이터가 존재하지 않습니다.
                        utils.messageBox('alert', this.$t('MSG_ALT_NO_DATA'));
                        // Grid 초기화
                        this.gridDataList = [];
                        this.$refs.pgeBst00001Grid.setRows(this.gridDataList);
                        this.totalCnt = this.$refs.pgeBst00001Grid.getJsonRows().length;
                        return;
                    }
                    this.$refs.pgeBst00001Grid.setRows(this.gridDataList);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        // 리얼그리드 셀 클릭 이벤트
        gridCellClick(grid, data) {
            if (data.dataRow >= 0) {
                this.clickCheck = true;
                this.selectedGridRowData = this.gridDataList[data.dataRow];
                this.availDay = this.gridDataList[data.dataRow].availDay;
                this.expireExtendDay = this.gridDataList[data.dataRow].expireExtendDay;
                this.sortOrderValue = this.gridDataList[data.dataRow].sortOrderValue;
                this.refundPenaltyPeriod = this.gridDataList[data.dataRow].refundPenaltyPeriod;
                this.periodCnt = this.gridDataList[data.dataRow].periodCnt;
                this.joinPeriodDay = this.gridDataList[data.dataRow].joinPeriodDay;
                if (this.gridDataList[data.dataRow].itemKindNm === null) {
                    this.itemKindNm = '';
                } else {
                    this.itemKindNm = this.gridDataList[data.dataRow].itemKindNm;
                }
                if (this.gridDataList[data.dataRow].refundYn === null) {
                    this.refundYn = '';
                } else {
                    this.refundYn = this.gridDataList[data.dataRow].refundYn;
                }
                if (this.gridDataList[data.dataRow].timeSetting === null) {
                    this.timeSetting = '';
                } else {
                    this.timeSetting = this.gridDataList[data.dataRow].timeSetting;
                }
                if (this.gridDataList[data.dataRow].saleYn === null) {
                    this.saleYn = '';
                } else {
                    this.saleYn = this.gridDataList[data.dataRow].saleYn;
                }
                if (this.gridDataList[data.dataRow].itemPreYn === null) {
                    this.itemPreYn = '';
                } else {
                    this.itemPreYn = this.gridDataList[data.dataRow].itemPreYn;
                }
                if (this.gridDataList[data.dataRow].stopPsbYn === null) {
                    this.stopPsbYn = '';
                } else {
                    this.stopPsbYn = this.gridDataList[data.dataRow].stopPsbYn;
                }
                if (this.gridDataList[data.dataRow].dayDivideYn === null) {
                    this.dayDivideYn = '';
                } else {
                    this.dayDivideYn = this.gridDataList[data.dataRow].dayDivideYn;
                }
                if (this.gridDataList[data.dataRow].dayDivideTypeCd === null) {
                    this.dayDivideTypeCd = '';
                } else {
                    this.dayDivideTypeCd = this.gridDataList[data.dataRow].dayDivideTypeCd;
                }
                if (this.gridDataList[data.dataRow].expireTypeCd === null) {
                    this.expireTypeCd = '';
                } else {
                    this.expireTypeCd = this.gridDataList[data.dataRow].expireTypeCd;
                }
                if (this.gridDataList[data.dataRow].interimJoinYn === null) {
                    this.interimJoinYn = '';
                } else {
                    this.interimJoinYn = this.gridDataList[data.dataRow].interimJoinYn;
                }
                if (this.gridDataList[data.dataRow].interimJoinTypeCd === null) {
                    this.interimJoinTypeCd = '';
                } else {
                    this.interimJoinTypeCd = this.gridDataList[data.dataRow].interimJoinTypeCd;
                }
            } else {
                this.selectedGridRowData = {};
            }
        },
        // 저장
        save() {
            // 저장하시겠습니까?
            utils.messageBox(
                'confirm',
                this.$t('MSG_ALT_IS_SAV_DATA'),
                null,
                (/* ok */) => {
                    // updateParam 수정할 파라미터 값 설정
                    const params = this.getUpdateParam();
                    http.request(this.$options.name, 'DTS_BST_00002', {
                        query: params,
                    })
                        .then(() => {
                            // this.search >> 수정 후 새로고침 되지 않고 화면 그대로 유지
                            // 저장되었습니다.
                            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, this.search);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                },
                (/* cancel */) => {}
            );
        },
        // 특수문자 체크
        specialChar() {
            const searchNewText = utils.trim(this.searchParams.itemNm);
            if (utils.isExistSpecialChar(searchNewText)) {
                // `-_{}[];:<>/? 제외 특수문자는 입력할 수 없습니다.
                utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
                    this.searchParams.itemNm = '';
                });
            }
        },
        numberWithCommas(number) {
            if (number || number === 0) {
                number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
            return !number && number !== 0 ? '' : number;
        },
        // Data 조회된 그리드 데이터 엑셀 다운로드
        excelDown() {
            if (this.$refs.pgeBst00001Grid.getJsonRows().length == 0) {
                // 조회된 데이터가 없습니다.
                utils.messageBox('alert', this.$t('MSG_ALT_NO_SERACH_DATA'));
                return;
            }
            // Grid에서는 visible >>> false 인 데이터 엑셀다운로드 시 출력 (판매여부, 가입기간일수, 선가입여부, 다회권횟수)
            this.$refs.pgeBst00001Grid.excelDownload(this.$t('MSG_TIT_BS01_MNG'), 'PGE_BST_00001');
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
