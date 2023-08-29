<template>
    <sui-page class="custom_page">
        <div v-if="canViewPage">
            <sui-page-header2 :pageId="this.$options.name" />
            <sui-page-contents>
                <!-- S::컨텐츠1 -->
                <ur-form-box toggleable>
                    <ur-form-item
                        class="flex_wrap"
                        :label="$t('MSG_TXT_EOD_DATE')"
                        required
                        :labelAlign="'right'"
                        style="width: 50%; height: auto"
                    >
                        <!-- 정산일자 -->
                        <ur-date-picker v-model="srchObj.saleDate" autoConfirm input-type="YYYY-MM-DD" disabled />
                    </ur-form-item>
                </ur-form-box>
                <div class="btn_wrap mt10">
                    <!-- <div class="left_box">
            <ur-button>매출정산(자동배치)</ur-button>
            <ur-button>키오스크1정산</ur-button>
            <ur-button>키오스크2정산</ur-button>
            <ur-button>키오스크3정산</ur-button>
            <ur-button>키오스크4정산</ur-button>
          </div> -->
                    <div class="right_box">
                        <ur-button
                            v-if="hasSaveBtn"
                            :disabled="noneInput"
                            color="violet"
                            @click="clickSave"
                            v-permission:create="this.$options.name"
                            >{{ $t('MSG_BTN_EOD_PRCS')
                            }}<!-- 정산처리 --></ur-button
                        >
                    </div>
                </div>
                <!-- E::컨텐츠1-->
                <!-- S::컨텐츠2 -->
                <div class="comm_title_wrap mt25">
                    <h4 class="pr10">{{ $t('MSG_TXT_POS_INFO') }}</h4>
                    <!-- POS 정보 -->
                </div>
                <ur-form-box toggleable>
                    <ur-form-item
                        class="flex_wrap"
                        :label="$t('MSG_TXT_PARK_KIND')"
                        :labelAlign="'right'"
                        style="width: 50%; height: auto"
                        ><!-- 파크구분 -->
                        <ur-text-field :value="posInfo.parkFgNm" style="width: 100%" readonly />
                    </ur-form-item>
                    <ur-form-item
                        class="flex_wrap"
                        :label="'POS ID'"
                        :labelAlign="'right'"
                        style="width: 50%; height: auto"
                    >
                        <ur-text-field :value="posInfo.posId" style="width: 100%" readonly />
                    </ur-form-item>
                    <ur-form-item
                        class="flex_wrap"
                        :label="$t('MSG_TXT_POS_NM')"
                        :labelAlign="'right'"
                        style="width: 100%; height: auto"
                        ><!-- POS 명 -->
                        <ur-text-field
                            :value="`${posInfo.posNm} / ${posInfo.sodFgName} / ${posInfo.eodFgName}`"
                            style="width: 100%"
                            readonly
                        />
                    </ur-form-item>
                </ur-form-box>
                <!-- E::컨텐츠2-->

                <!-- S::컨텐츠3 -->
                <div class="comm_title_wrap mt40">
                    <h4 class="pr10">{{ $t('MSG_TXT_MONEY_STATUS') }}</h4>
                    <!-- 시재현항 -->
                </div>
                <div class="comm_shut_wrap">
                    <div class="inbox8">
                        <!-- S::board_list_type2 -->
                        <div class="board_list_type2">
                            <table>
                                <caption></caption>
                                <colgroup>
                                    <col width="*" />
                                    <col width="6.69%" />
                                    <col width="8.89%" />
                                    <col width="6.69%" />
                                    <col width="8.89%" />
                                    <col width="6.69%" />
                                    <col width="8.89%" />
                                    <col width="6.69%" />
                                    <col width="8.89%" />
                                    <col width="6.69%" />
                                    <col width="8.89%" />
                                    <col width="6.69%" />
                                    <col width="8.89%" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th rowspan="2">{{ $t('MSG_TXT_TICKET_ITEM') }}</th>
                                        <!-- 권종 -->
                                        <th colspan="2">{{ $t('MSG_TXT_PREPARE_MONEY') }}</th>
                                        <!-- 아침시재 -->
                                        <th colspan="2">{{ $t('MSG_TXT_PREPARE_ADD_MONEY') }}</th>
                                        <!-- 시재추가 -->
                                        <th colspan="2">{{ $t('MSG_TXT_TOT_PREPARE_MONEY') }}</th>
                                        <!-- 총준비시재 -->
                                        <th colspan="2">{{ $t('MSG_TXT_IWOL_MONEY') }}</th>
                                        <!-- 이월시재 -->
                                        <th colspan="2">{{ $t('MSG_TXT_DEMAND_MONEY') }}</th>
                                        <!-- 청구시재 -->
                                        <th colspan="2">{{ $t('MSG_TXT_SAVE_MONEY') }}</th>
                                        <!-- 보관시재 -->
                                    </tr>
                                    <tr>
                                        <th>{{ $t('MSG_TXT_TICKET_CNT') }}</th>
                                        <!-- 매수 -->
                                        <th>{{ $t('MSG_TXT_EOD_AMT') }}</th>
                                        <!-- 금액 -->
                                        <th>{{ $t('MSG_TXT_TICKET_CNT') }}</th>
                                        <th>{{ $t('MSG_TXT_EOD_AMT') }}</th>
                                        <th>{{ $t('MSG_TXT_TICKET_CNT') }}</th>
                                        <th>{{ $t('MSG_TXT_EOD_AMT') }}</th>
                                        <th>{{ $t('MSG_TXT_TICKET_CNT') }}</th>
                                        <th>{{ $t('MSG_TXT_EOD_AMT') }}</th>
                                        <th>{{ $t('MSG_TXT_TICKET_CNT') }}</th>
                                        <th>{{ $t('MSG_TXT_EOD_AMT') }}</th>
                                        <th>{{ $t('MSG_TXT_TICKET_CNT') }}</th>
                                        <th>{{ $t('MSG_TXT_EOD_AMT') }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{{ $t('MSG_TXT_WON_50K') }}</td>
                                        <!-- 5만원 -->
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInit50kCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInit50kAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInitAdd50kCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInitAdd50kAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.prepareInit50kCnt + calculateInfo.prepareInitAdd50kCnt
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.prepareInit50kAmt + calculateInfo.prepareInitAdd50kAmt
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="calculateInfo.iwolCashCnt50kCnt"
                                                @input="keyDown(calculateInfo, 'iwolCashCnt50kCnt')"
                                            />
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.iwolCashCnt50kCnt * 50000) }}
                                        </td>
                                        <td class="right_nar">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="calculateInfo.demandCashCnt50kCnt"
                                                @input="keyDown(calculateInfo, 'demandCashCnt50kCnt')"
                                            />
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.demandCashCnt50kCnt * 50000) }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    Number(calculateInfo.iwolCashCnt50kCnt) +
                                                        Number(calculateInfo.demandCashCnt50kCnt)
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.iwolCashCnt50kCnt * 50000 +
                                                        calculateInfo.demandCashCnt50kCnt * 50000
                                                )
                                            }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t('MSG_TXT_WON_10K') }}</td>
                                        <!-- 1만원 -->
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInit10kCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInit10kAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInitAdd10kCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInitAdd10kAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.prepareInit10kCnt + calculateInfo.prepareInitAdd10kCnt
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.prepareInit10kAmt + calculateInfo.prepareInitAdd10kAmt
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="calculateInfo.iwolCashCnt10kCnt"
                                                @input="keyDown(calculateInfo, 'iwolCashCnt10kCnt')"
                                            />
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.iwolCashCnt10kCnt * 10000) }}
                                        </td>
                                        <td class="right_nar">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="calculateInfo.demandCashCnt10kCnt"
                                                @input="keyDown(calculateInfo, 'demandCashCnt10kCnt')"
                                            />
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.demandCashCnt10kCnt * 10000) }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    Number(calculateInfo.iwolCashCnt10kCnt) +
                                                        Number(calculateInfo.demandCashCnt10kCnt)
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.iwolCashCnt10kCnt * 10000 +
                                                        calculateInfo.demandCashCnt10kCnt * 10000
                                                )
                                            }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t('MSG_TXT_WON_5K') }}</td>
                                        <!-- 5천원 -->
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInit5kCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInit5kAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInitAdd5kCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInitAdd5kAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.prepareInit5kCnt + calculateInfo.prepareInitAdd5kCnt
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.prepareInit5kAmt + calculateInfo.prepareInitAdd5kAmt
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="calculateInfo.iwolCashCnt5kCnt"
                                                @input="keyDown(calculateInfo, 'iwolCashCnt5kCnt')"
                                            />
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.iwolCashCnt5kCnt * 5000) }}
                                        </td>
                                        <td class="right_nar">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="calculateInfo.demandCashCnt5kCnt"
                                                @input="keyDown(calculateInfo, 'demandCashCnt5kCnt')"
                                            />
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.demandCashCnt5kCnt * 5000) }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    Number(calculateInfo.iwolCashCnt5kCnt) +
                                                        Number(calculateInfo.demandCashCnt5kCnt)
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.iwolCashCnt5kCnt * 5000 +
                                                        calculateInfo.demandCashCnt5kCnt * 5000
                                                )
                                            }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t('MSG_TXT_WON_1K') }}</td>
                                        <!-- 1천원 -->
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInit1kCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInit1kAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInitAdd1kCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInitAdd1kAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.prepareInit1kCnt + calculateInfo.prepareInitAdd1kCnt
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.prepareInit1kAmt + calculateInfo.prepareInitAdd1kAmt
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="calculateInfo.iwolCashCnt1kCnt"
                                                @input="keyDown(calculateInfo, 'iwolCashCnt1kCnt')"
                                            />
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.iwolCashCnt1kCnt * 1000) }}
                                        </td>
                                        <td class="right_nar">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="calculateInfo.demandCashCnt1kCnt"
                                                @input="keyDown(calculateInfo, 'demandCashCnt1kCnt')"
                                            />
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.demandCashCnt1kCnt * 1000) }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    Number(calculateInfo.iwolCashCnt1kCnt) +
                                                        Number(calculateInfo.demandCashCnt1kCnt)
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.iwolCashCnt1kCnt * 1000 +
                                                        calculateInfo.demandCashCnt1kCnt * 1000
                                                )
                                            }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t('MSG_TXT_WON_500') }}</td>
                                        <!-- 5백원 -->
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInit500Cnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInit500Amt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInitAdd500Cnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInitAdd500Amt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.prepareInit500Cnt + calculateInfo.prepareInitAdd500Cnt
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.prepareInit500Amt + calculateInfo.prepareInitAdd500Amt
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="calculateInfo.iwolCashCnt500Cnt"
                                                @input="keyDown(calculateInfo, 'iwolCashCnt500Cnt')"
                                            />
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.iwolCashCnt500Cnt * 500) }}
                                        </td>
                                        <td class="right_nar">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="calculateInfo.demandCashCnt500Cnt"
                                                @input="keyDown(calculateInfo, 'demandCashCnt500Cnt')"
                                            />
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.demandCashCnt500Cnt * 500) }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    Number(calculateInfo.iwolCashCnt500Cnt) +
                                                        Number(calculateInfo.demandCashCnt500Cnt)
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.iwolCashCnt500Cnt * 500 +
                                                        calculateInfo.demandCashCnt500Cnt * 500
                                                )
                                            }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t('MSG_TXT_WON_100') }}</td>
                                        <!-- 1백원 -->
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInit100Cnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInit100Amt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInitAdd100Cnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInitAdd100Amt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.prepareInit100Cnt + calculateInfo.prepareInitAdd100Cnt
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.prepareInit100Amt + calculateInfo.prepareInitAdd100Amt
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="calculateInfo.iwolCashCnt100Cnt"
                                                @input="keyDown(calculateInfo, 'iwolCashCnt100Cnt')"
                                            />
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.iwolCashCnt100Cnt * 100) }}
                                        </td>
                                        <td class="right_nar">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="calculateInfo.demandCashCnt100Cnt"
                                                @input="keyDown(calculateInfo, 'demandCashCnt100Cnt')"
                                            />
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.demandCashCnt100Cnt * 100) }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    Number(calculateInfo.iwolCashCnt100Cnt) +
                                                        Number(calculateInfo.demandCashCnt100Cnt)
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.iwolCashCnt100Cnt * 100 +
                                                        calculateInfo.demandCashCnt100Cnt * 100
                                                )
                                            }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t('MSG_TXT_WON_50') }}</td>
                                        <!-- 5십원 -->
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInit50Cnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInit50Amt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInitAdd50Cnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInitAdd50Amt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.prepareInit50Cnt + calculateInfo.prepareInitAdd50Cnt
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.prepareInit50Amt + calculateInfo.prepareInitAdd50Amt
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="calculateInfo.iwolCashCnt50Cnt"
                                                @input="keyDown(calculateInfo, 'iwolCashCnt50Cnt')"
                                            />
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.iwolCashCnt50Cnt * 50) }}
                                        </td>
                                        <td class="right_nar">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="calculateInfo.demandCashCnt50Cnt"
                                                @input="keyDown(calculateInfo, 'demandCashCnt50Cnt')"
                                            />
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.demandCashCnt50Cnt * 50) }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    Number(calculateInfo.iwolCashCnt50Cnt) +
                                                        Number(calculateInfo.demandCashCnt50Cnt)
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.iwolCashCnt50Cnt * 50 +
                                                        calculateInfo.demandCashCnt50Cnt * 50
                                                )
                                            }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t('MSG_TXT_WON_10') }}</td>
                                        <!-- 1십원 -->
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInit10Cnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInit10Amt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInitAdd10Cnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.prepareInitAdd10Amt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.prepareInit10Cnt + calculateInfo.prepareInitAdd10Cnt
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.prepareInit10Amt + calculateInfo.prepareInitAdd10Amt
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="calculateInfo.iwolCashCnt10Cnt"
                                                @input="keyDown(calculateInfo, 'iwolCashCnt10Cnt')"
                                            />
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.iwolCashCnt10Cnt * 10) }}
                                        </td>
                                        <td class="right_nar">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="calculateInfo.demandCashCnt10Cnt"
                                                @input="keyDown(calculateInfo, 'demandCashCnt10Cnt')"
                                            />
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfo.demandCashCnt10Cnt * 10) }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    Number(calculateInfo.iwolCashCnt10Cnt) +
                                                        Number(calculateInfo.demandCashCnt10Cnt)
                                                )
                                            }}
                                        </td>
                                        <td class="right_nar">
                                            {{
                                                numberWithCommas(
                                                    calculateInfo.iwolCashCnt10Cnt * 10 +
                                                        calculateInfo.demandCashCnt10Cnt * 10
                                                )
                                            }}
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>{{ $t('MSG_TXT_TOT_SUMMARY') }}</td>
                                        <!-- 소계 -->
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfoSummary.sumPrepareInitCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfoSummary.sumPrepareInitAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfoSummary.sumPrepareInitAddCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfoSummary.sumPrepareInitAddAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfoSummary.sumPrepareInitTotCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfoSummary.sumPrepareInitTotAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfoSummary.sumIwolCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfoSummary.sumIwolAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfoSummary.demandCashCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfoSummary.demandCashAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfoSummary.saveCashCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(calculateInfoSummary.saveCashAmt) }}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <!-- E::board_list_type2 -->
                    </div>
                    <div class="emptybox" />
                    <div class="inbox2">
                        <!-- S::board_list_type2 -->
                        <div class="board_list_type2">
                            <table>
                                <caption></caption>
                                <colgroup>
                                    <col width="*" />
                                    <col width="*" />
                                    <col width="*" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th colspan="3">{{ $t('MSG_TXT_PENALTY_TXT') }}</th>
                                        <!-- 위약금 내역 -->
                                    </tr>
                                    <tr>
                                        <th>{{ $t('MSG_TXT_PARTICULAR') }}</th>
                                        <!-- 내역 -->
                                        <th>{{ $t('MSG_TXT_COUNT') }}</th>
                                        <!-- 건수 -->
                                        <th>{{ $t('MSG_TXT_EOD_AMT') }}</th>
                                        <!-- 금액 -->
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="extend">
                                        <td>{{ $t('MSG_TXT_DEPOSIT_AMT2') }}</td>
                                        <!-- 예수금 -->
                                        <td class="right">
                                            {{ numberWithCommas(penaltyInfo.depositCnt) }}
                                        </td>
                                        <td class="right">
                                            {{ numberWithCommas(penaltyInfo.depositAmt) }}
                                        </td>
                                    </tr>
                                    <tr class="extend">
                                        <td>{{ $t('MSG_TXT_PENALTY') }}</td>
                                        <!-- 위약금 -->
                                        <td class="right">
                                            {{ numberWithCommas(penaltyInfo.penaltyCnt) }}
                                        </td>
                                        <td class="right">
                                            {{ numberWithCommas(penaltyInfo.penaltyAmt) }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- E::board_list_type2 -->
                    </div>
                </div>
                <!-- E::컨텐츠3 -->

                <!-- S::컨텐츠4 -->
                <div class="comm_title_wrap mt45">
                    <h4 class="pr10">{{ $t('MSG_TXT_DEPOSIT_TXT') }}</h4>
                    <!-- 입금내역 -->
                </div>
                <div class="comm_shut_wrap">
                    <div class="inbox">
                        <!-- S::board_list_type2 -->
                        <div class="board_list_type2">
                            <table>
                                <caption></caption>
                                <colgroup>
                                    <col width="*" />
                                    <col width="*" />
                                    <col width="*" />
                                    <col width="*" />
                                    <col width="*" />
                                    <col width="*" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th colspan="3">{{ $t('MSG_TXT_DEPOSIT_CASH') }}</th>
                                        <!-- 현금입금 -->
                                        <th colspan="3">{{ $t('MSG_TXT_DEPOSIT_CHECK') }}</th>
                                        <!-- 수표입금 -->
                                    </tr>
                                    <tr>
                                        <th>{{ $t('MSG_TXT_TICKET_ITEM') }}</th>
                                        <!-- 권종 -->
                                        <th>{{ $t('MSG_TXT_TICKET_CNT') }}</th>
                                        <!-- 매수 -->
                                        <th>{{ $t('MSG_TXT_EOD_AMT') }}</th>
                                        <!-- 금액 -->
                                        <th>{{ $t('MSG_TXT_TICKET_ITEM') }}</th>
                                        <th>{{ $t('MSG_TXT_TICKET_CNT') }}</th>
                                        <th>{{ $t('MSG_TXT_EOD_AMT') }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{{ $t('MSG_TXT_WON_50K') }}</td>
                                        <!-- 5만원 -->
                                        <td class="right">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="depositInfo.cashDeposit50kCnt"
                                                @input="keyDown(depositInfo, 'cashDeposit50kCnt')"
                                            />
                                        </td>
                                        <td class="right">
                                            {{ numberWithCommas(depositInfo.cashDeposit50kCnt * 50000) }}
                                        </td>
                                        <td>{{ $t('MSG_TXT_WON_1000K') }}</td>
                                        <!-- 100만원 -->
                                        <td class="right">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="depositInfo.checkDeposit1000kCnt"
                                                @input="keyDown(depositInfo, 'checkDeposit1000kCnt')"
                                            />
                                        </td>
                                        <td class="right">
                                            {{ numberWithCommas(depositInfo.checkDeposit1000kCnt * 1000000) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t('MSG_TXT_WON_10K') }}</td>
                                        <!-- 1만원 -->
                                        <td class="right">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="depositInfo.cashDeposit10kCnt"
                                                @input="keyDown(depositInfo, 'cashDeposit10kCnt')"
                                            />
                                        </td>
                                        <td class="right">
                                            {{ numberWithCommas(depositInfo.cashDeposit10kCnt * 10000) }}
                                        </td>
                                        <td>{{ $t('MSG_TXT_WON_500K') }}</td>
                                        <!-- 50만원 -->
                                        <td class="right">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="depositInfo.checkDeposit500kCnt"
                                                @input="keyDown(depositInfo, 'checkDeposit500kCnt')"
                                            />
                                        </td>
                                        <td class="right">
                                            {{ numberWithCommas(depositInfo.checkDeposit500kCnt * 500000) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t('MSG_TXT_WON_5K') }}</td>
                                        <!-- 5천원 -->
                                        <td class="right">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="depositInfo.cashDeposit5kCnt"
                                                @input="keyDown(depositInfo, 'cashDeposit5kCnt')"
                                            />
                                        </td>
                                        <td class="right">
                                            {{ numberWithCommas(depositInfo.cashDeposit5kCnt * 5000) }}
                                        </td>
                                        <td>{{ $t('MSG_TXT_WON_30K') }}</td>
                                        <!-- 30만원 -->
                                        <td class="right">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="depositInfo.checkDeposit300kCnt"
                                                @input="keyDown(depositInfo, 'checkDeposit300kCnt')"
                                            />
                                        </td>
                                        <td class="right">
                                            {{ numberWithCommas(depositInfo.checkDeposit300kCnt * 300000) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t('MSG_TXT_WON_1K') }}</td>
                                        <!-- 1천원 -->
                                        <td class="right">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="depositInfo.cashDeposit1kCnt"
                                                @input="keyDown(depositInfo, 'cashDeposit1kCnt')"
                                            />
                                        </td>
                                        <td class="right">
                                            {{ numberWithCommas(depositInfo.cashDeposit1kCnt * 1000) }}
                                        </td>
                                        <td>{{ $t('MSG_TXT_WON_100K') }}</td>
                                        <!-- 10만원 -->
                                        <td class="right">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="depositInfo.checkDeposit100kCnt"
                                                @input="keyDown(depositInfo, 'checkDeposit100kCnt')"
                                            />
                                        </td>
                                        <td class="right">
                                            {{ numberWithCommas(depositInfo.checkDeposit100kCnt * 100000) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t('MSG_TXT_WON_500') }}</td>
                                        <!-- 5백원 -->
                                        <td class="right">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="depositInfo.cashDeposit500Cnt"
                                                @input="keyDown(depositInfo, 'cashDeposit500Cnt')"
                                            />
                                        </td>
                                        <td class="right">
                                            {{ numberWithCommas(depositInfo.cashDeposit500Cnt * 500) }}
                                        </td>
                                        <td>{{ $t('MSG_TXT_ETC_CHECK') }}</td>
                                        <!-- 기타수표 -->
                                        <td class="right">
                                            {{ numberWithCommas(depositInfo.checkDepositEtcCnt) }}
                                        </td>
                                        <td class="right">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="depositInfo.checkDepositEtcAmt"
                                                @input="keyDown(depositInfo, 'checkDepositEtcAmt')"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t('MSG_TXT_WON_100') }}</td>
                                        <!-- 1백원 -->
                                        <td class="right">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="depositInfo.cashDeposit100Cnt"
                                                @input="keyDown(depositInfo, 'cashDeposit100Cnt')"
                                            />
                                        </td>
                                        <td class="right">
                                            {{ numberWithCommas(depositInfo.cashDeposit100Cnt * 100) }}
                                        </td>
                                        <th>{{ $t('MSG_TXT_SUM_CHECK') }}</th>
                                        <!-- 수표합계 -->
                                        <td class="right">
                                            {{ numberWithCommas(depositInfoSummary.checkDepositSummary.cnt) }}
                                        </td>
                                        <td class="right">
                                            {{ numberWithCommas(depositInfoSummary.checkDepositSummary.amt) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t('MSG_TXT_WON_50') }}</td>
                                        <!-- 5십원 -->
                                        <td class="right">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="depositInfo.cashDeposit50Cnt"
                                                @input="keyDown(depositInfo, 'cashDeposit50Cnt')"
                                            />
                                        </td>
                                        <td class="right">
                                            {{ numberWithCommas(depositInfo.cashDeposit50Cnt * 50) }}
                                        </td>
                                        <th colspan="3">
                                            {{ $t('MSG_TXT_GIFT_CARD') }} /
                                            {{ $t('MSG_TXT_DEPOSIT_TICKET') }}
                                        </th>
                                        <!-- 상품권 / 티켓입금 -->
                                    </tr>
                                    <tr>
                                        <td>{{ $t('MSG_TXT_WON_10') }}</td>
                                        <!-- 1십원 -->
                                        <td class="right">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="depositInfo.cashDeposit10Cnt"
                                                @input="keyDown(depositInfo, 'cashDeposit10Cnt')"
                                            />
                                        </td>
                                        <td class="right">
                                            {{ numberWithCommas(depositInfo.cashDeposit10Cnt * 10) }}
                                        </td>
                                        <td>
                                            <ur-button
                                                sm
                                                :disabled="noneInput"
                                                @click="giftDepositPop"
                                                v-permission:read="this.$options.name"
                                                >{{ $t('MSG_TXT_DEPOSIT_GIFTCARD') }}</ur-button
                                            >
                                        </td>
                                        <!-- 상품권입금 -->
                                        <td class="right">
                                            {{ numberWithCommas(giftColSummary.cnt.total) }}
                                        </td>
                                        <td class="right">
                                            {{ numberWithCommas(giftColSummary.amt.total) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td class="right"></td>
                                        <td class="right"></td>
                                        <td>{{ $t('MSG_TXT_DEPOSIT_TICKET') }}</td>
                                        <!-- 티켓입금 -->
                                        <td class="right">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="depositInfo.ticketDepositCnt"
                                                @input="keyDown(depositInfo, 'ticketDepositCnt')"
                                            />
                                        </td>
                                        <td class="right">
                                            <input
                                                type="text"
                                                class="ur-text-field__input input-text-sap00001"
                                                v-model="depositInfo.ticketDepositAmt"
                                                @input="keyDown(depositInfo, 'ticketDepositAmt')"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>{{ $t('MSG_TXT_SUM_CASH') }}</td>
                                        <!-- 현금합계 -->
                                        <td class="right">
                                            {{ numberWithCommas(depositInfoSummary.cashSummary.cnt) }}
                                        </td>
                                        <td class="right">
                                            {{ numberWithCommas(depositInfoSummary.cashSummary.amt) }}
                                        </td>
                                        <td>{{ $t('MSG_TXT_TOTAL_CNT') }}</td>
                                        <!-- 총계 -->
                                        <td class="right">
                                            {{ numberWithCommas(depositInfoSummary.totalSummary.cnt) }}
                                        </td>
                                        <td class="right">
                                            {{ numberWithCommas(depositInfoSummary.totalSummary.amt) }}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <!-- E::board_list_type2 -->
                    </div>
                    <div class="emptybox" />
                    <div class="inbox">
                        <!-- S::board_list_type2 -->
                        <div class="board_list_type2">
                            <table>
                                <caption></caption>
                                <colgroup>
                                    <col width="12.5%" />
                                    <col width="10.6%" />
                                    <col width="15%" />
                                    <col width="10.6%" />
                                    <col width="15%" />
                                    <col width="10.6%" />
                                    <col width="15%" />
                                    <col width="*" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th rowspan="2">{{ $t('MSG_TXT_PAY_METHOD2') }}</th>
                                        <!-- 지불수단 -->
                                        <th colspan="2">{{ $t('MSG_TXT_DEPOSIT_TXT') }}</th>
                                        <!-- 입금내역 -->
                                        <th colspan="2">{{ $t('MSG_TXT_SERVER_TXT') }}</th>
                                        <!-- 서버내역 -->
                                        <th colspan="2">{{ $t('MSG_TXT_POS_TXT') }}</th>
                                        <!-- POS내역 -->
                                        <th rowspan="2">{{ $t('MSG_TXT_SERVER_POS_SUBSTR') }}</th>
                                        <!-- 서버-POS 차이 -->
                                    </tr>
                                    <tr>
                                        <th>{{ $t('MSG_TXT_COUNT') }}</th>
                                        <!-- 건수 -->
                                        <th>{{ $t('MSG_TXT_EOD_AMT') }}</th>
                                        <!-- 금액 -->
                                        <th>{{ $t('MSG_TXT_COUNT') }}</th>
                                        <th>{{ $t('MSG_TXT_EOD_AMT') }}</th>
                                        <th>{{ $t('MSG_TXT_COUNT') }}</th>
                                        <th>{{ $t('MSG_TXT_EOD_AMT') }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="ltspacing">{{ $t('MSG_TXT_CASH') }}</td>
                                        <!-- 현금 -->
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.depCashCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.depCashAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrCashCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrCashAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.posCashCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.posCashAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrCashAmt - payInfo.posCashAmt) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="ltspacing">{{ $t('MSG_TXT_GIFT_CARD') }}</td>
                                        <!-- 상품권 -->
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.depGiftcardCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.depGiftcardAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrGiftcardCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrGiftcardAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.posGiftcardCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.posGiftcardAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrGiftcardAmt - payInfo.posGiftcardAmt) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="ltspacing">
                                            {{ $t('MSG_TXT_PRE_ISSUE_TICKET') }}
                                        </td>
                                        <!-- 선발행권 -->
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.depTicketCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.depTicketAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrTicketCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrTicketAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.posTicketCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.posTicketAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrTicketAmt - payInfo.posTicketAmt) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th class="ltspacing">{{ $t('MSG_TXT_CASH_SUMMARY') }}</th>
                                        <!-- 현금계 -->
                                        <th class="right_nar">
                                            {{ numberWithCommas(payInfoSummary.cashInfo.depCnt) }}
                                        </th>
                                        <th class="right_nar">
                                            {{ numberWithCommas(payInfoSummary.cashInfo.depAmt) }}
                                        </th>
                                        <th class="right_nar">
                                            {{ numberWithCommas(payInfoSummary.cashInfo.svrCnt) }}
                                        </th>
                                        <th class="right_nar">
                                            {{ numberWithCommas(payInfoSummary.cashInfo.svrAmt) }}
                                        </th>
                                        <th class="right_nar">
                                            {{ numberWithCommas(payInfoSummary.cashInfo.posCnt) }}
                                        </th>
                                        <th class="right_nar">
                                            {{ numberWithCommas(payInfoSummary.cashInfo.posAmt) }}
                                        </th>
                                        <th class="right_nar">
                                            {{ numberWithCommas(payInfoSummary.cashInfo.svrSubstractionPos) }}
                                        </th>
                                    </tr>
                                    <tr>
                                        <td class="ltspacing">{{ $t('MSG_TXT_CREDIT_CARD') }}</td>
                                        <!-- 신용카드 -->
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.depCardCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.depCardAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrCardCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrCardAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.posCardCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.posCardAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrCardAmt - payInfo.posCardAmt) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="ltspacing">{{ $t('MSG_TXT_CREDIT2') }}</td>
                                        <!-- 외상 -->
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.depCreditCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.depCreditAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrCreditCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrCreditAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.posCreditCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.posCreditAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrCreditAmt - payInfo.posCreditAmt) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="ltspacing">{{ $t('MSG_TXT_WEB') }}</td>
                                        <!-- 웹 -->
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.depWebCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.depWebAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrWebCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrWebAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.posWebCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.posWebAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrWebAmt - payInfo.posWebAmt) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="ltspacing">{{ $t('MSG_TXT_MEMSHP_POINT') }}</td>
                                        <!-- 멤버십포인트 -->
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.depDreampointCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.depDreampointAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrDreampointCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrDreampointAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.posDreampointCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.posDreampointAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrDreampointAmt - payInfo.posDreampointAmt) }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="ltspacing">{{ $t('MSG_TXT_GIFT_CARD_ENG') }}</td>
                                        <!-- 기프트카드 -->
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.depGiftCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.depGiftAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrGiftCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrGiftAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.posGiftCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.posGiftAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfo.svrGiftAmt - payInfo.posGiftAmt) }}
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td class="ltspacing">{{ $t('MSG_TXT_TOTAL_CNT') }}</td>
                                        <!-- 총계 -->
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfoSummary.totalInfo.depCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfoSummary.totalInfo.depAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfoSummary.totalInfo.svrCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfoSummary.totalInfo.svrAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfoSummary.totalInfo.posCnt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfoSummary.totalInfo.posAmt) }}
                                        </td>
                                        <td class="right_nar">
                                            {{ numberWithCommas(payInfoSummary.totalInfo.svrSubstractionPos) }}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <!-- E::board_list_type2 -->
                    </div>
                </div>
                <!-- E::컨텐츠4 -->
                <div class="btn_wrap mt10">
                    <div class="right_box">
                        <ur-button
                            @click="clickKiosk('C100V380116', $t('MSG_TXT_KIOSK_AUTO_BATCH'))"
                            v-permission:read="this.$options.name"
                            >{{ $t('MSG_TXT_KIOSK_AUTO_BATCH') }}</ur-button
                        ><!-- 매출정산(자동배치) -->
                        <ur-button @click="clickKiosk('C100V380117', kiosk1)" v-permission:read="this.$options.name">{{
                            kiosk1
                        }}</ur-button
                        ><!-- 키오스크1정산 -->
                        <ur-button @click="clickKiosk('C100V380118', kiosk2)" v-permission:read="this.$options.name">{{
                            kiosk2
                        }}</ur-button
                        ><!-- 키오스크2정산 -->
                        <ur-button @click="clickKiosk('C100V380119', kiosk3)" v-permission:read="this.$options.name">{{
                            kiosk3
                        }}</ur-button
                        ><!-- 키오스크3정산 -->
                        <ur-button @click="clickKiosk('C100V380120', kiosk4)" v-permission:read="this.$options.name">{{
                            kiosk4
                        }}</ur-button
                        ><!-- 키오스크4정산 -->
                    </div>
                </div>
                <sui-page-footer>
                    <div class="comm_btn_wrap" />
                </sui-page-footer>
            </sui-page-contents>
        </div>
        <div class="blankCover" v-else>
            <h1>{{ $t('MSG_TXT_PC_ACCOUNT_DIM') }}</h1>
            <!-- 정산 화면 접속 불가능합니다. 해당 포스의 개설 및 정산 상태를 확인하여 주십시요. -->
        </div>
    </sui-page>
</template>
<script>
import _ from 'lodash';
import moment from 'moment';
import sapMixin from './mixin/pcAccount.data.mixin';
import BxlPosUtils from '~common/js/PosPrint/bxlpos.js';
import BxlCommonUtils from '~common/js/PosPrint/bxlcommon.js';
export default {
    name: 'PGE_SAP_00001',
    components: {}, // eslint-disable-line vue/name-property-casing
    mixins: [sapMixin],
    data() {
        return {
            noneInput: true,
            hasSaveBtn: false,
            canViewPage: false,
        };
    },
    computed: {
        kiosk1() {
            return utils.strFormat(this.$t('MSG_TXT_KIOSK_EOD'), 1);
        },
        kiosk2() {
            return utils.strFormat(this.$t('MSG_TXT_KIOSK_EOD'), 2);
        },
        kiosk3() {
            return utils.strFormat(this.$t('MSG_TXT_KIOSK_EOD'), 3);
        },
        kiosk4() {
            return utils.strFormat(this.$t('MSG_TXT_KIOSK_EOD'), 4);
        },
    },
    created() {},
    async mounted() {
        const userInfo = this.$store.getters.userInfo;
        this.userInfo = userInfo;
        this.srchObj.saleDate = moment(userInfo.saleDate).format('YYYY-MM-DD');
        this.calculateInfo = this.dumpCalculInfo();
        this.penaltyInfo = this.dumpPenaltyInfo();
        this.depositInfo = this.dumpDepositInfo();
        this.payInfo = this.dumpPayInfo();

        if (!userInfo.posId) {
            return;
        }

        const param = { posId: userInfo.posId };
        const res = await http.request(this.$options.name, 'DTS_SAP_00001', {
            query: param,
        });
        const rtn = res.data.sodFg + res.data.eodFg;
        if (!res.data.posId || !(rtn == '0100' || rtn == '0101' || rtn == '0108' || rtn == '0109' || rtn == '0118')) {
            console.log();
            return;
        }

        this.canViewPage = true;
        this.search(userInfo.posId);
    },
    methods: {
        async search(posId, doReopenConfirm = true) {
            this.$nextTick(() => {
                this.noneInputeTextField(true);
            });
            this.srchObj.posId = posId;

            const params = this.params;
            const resPosInfo = await http.request(this.$options.name, 'DTS_SAP_00001', { query: params }); // pos 장비조회
            const eodFg = resPosInfo.data?.eodFg; // 정산구분
            if (!eodFg) {
                utils.messageBox('alert', this.$t('MSG_TXT_NOT_EXIST_POS')); // 해당 PC의 장비관리 정보가 없습니다. 확인하여 주세요.
                for (const key in this.posInfo) this.posInfo[key] = '';
                this.noneInput = true;
                this.hasSaveBtn = false;
                this.noneInputeTextField(true);
                return;
            }

            this.hasSaveBtn = true;

            // this.posInfo.parkKindName = resPosInfo.data.parkKindName
            this.posInfo.posId = resPosInfo.data.posId;
            this.posInfo.posNm = resPosInfo.data.posNm;
            this.posInfo.parkFgNm = resPosInfo.data.parkFgNm;
            this.posInfo.sodFgName = resPosInfo.data.sodFgName;
            this.posInfo.eodFgName = resPosInfo.data.eodFgName;

            await http.request(this.$options.name, 'DTS_SAP_00011', {
                data: this.calculateInfo,
            }); // 정산시작

            /* 조회 */
            this.getCalculateMoney(params);
            this.getPenaltyInfo(params);
            this.getDepositInfo(params);
            this.getPayInfo(params);
            this.getGiftDepositInfo(params);

            if (eodFg == '01' && doReopenConfirm) {
                // 정산이 완료되었습니다. 정산 재개설 하시겠습니까?
                utils.messageBox(
                    'confirm',
                    this.$t('MSG_ALT_EOD_REOPEN'),
                    null,
                    () => this.reopenEod(this.params),
                    () => {
                        this.noneInput = true;
                        this.noneInputeTextField(true);
                    }
                );
            } else if (eodFg == '00' || eodFg == '08' || eodFg == '09' || eodFg == '18') {
                this.noneInput = false;
                this.noneInputeTextField(false);
            } else {
                this.noneInput = true;
                this.noneInputeTextField(true);
            }
        },
        clickKiosk(posId, kioskNm) {
            // 키오스크0정산 데이터 조회를 진행하시겠습니까?
            utils.messageBox(
                'confirm',
                utils.strFormat(this.$t('MSG_ALT_EOD_SEARCH_CONFIRM'), kioskNm),
                null,
                () => this.search(posId),
                () => {}
            );
        },
        // 시재조회
        getCalculateMoney(params) {
            http.request(this.$options.name, 'DTS_SAP_00002', {
                query: params,
            })
                .then((res) => {
                    if (!res.data?.posId) {
                        res.data = this.dumpCalculInfo();
                    }
                    this.calculateInfo = res.data;
                })
                .catch((e) => {
                    this.calculateInfo = this.dumpCalculInfo();
                });
        },
        // 위약금 조회
        getPenaltyInfo(params) {
            http.request(this.$options.name, 'DTS_SAP_00003', {
                query: params,
            })
                .then((res) => {
                    if (!res.data?.posId) {
                        res.data = this.dumpPenaltyInfo();
                    }
                    this.penaltyInfo = res.data;
                })
                .catch((e) => {
                    this.penaltyInfo = this.dumpPenaltyInfo();
                });
        },
        // 입금내역 조회
        getDepositInfo(params) {
            http.request(this.$options.name, 'DTS_SAP_00004', {
                query: params,
            })
                .then((res) => {
                    if (!res.data?.posId) {
                        res.data = this.dumpDepositInfo();
                    }
                    this.depositInfo = res.data;
                })
                .catch((e) => {
                    this.depositInfo = this.dumpDepositInfo();
                });
        },
        // 지불수단
        getPayInfo(params) {
            http.request(this.$options.name, 'DTS_SAP_00005', {
                query: params,
            })
                .then((res) => {
                    this.payInfo = res.data;
                })
                .catch((e) => {
                    this.payInfo = this.dumpPayInfo();
                });
        },
        getGiftDepositInfo(params) {
            http.request(this.$options.name, 'DTS_SAP_00008', {
                query: params,
            })
                .then((res) => {
                    this.giftList = res.data;
                    this.orgGiftList = _.cloneDeep(res.data);
                })
                .catch((e) => {
                    this.giftList = [];
                    this.orgGiftList = [];
                });
        },
        // 상품권입금 조회팝업
        giftDepositPop() {
            utils.openLayerPopup('PGE_SAP_00002', (giftList) => giftList && (this.giftList = giftList), {
                pageInitialData: {
                    giftList: this.giftList,
                    orgGiftList: this.orgGiftList,
                },
                size: 'lg',
            });
        },
        // 정산 재개설
        reopenEod(params) {
            http.request(this.$options.name, 'DTS_SAP_00009', {
                data: params,
            }).then((res) => {
                this.noneInput = false;
                this.noneInputeTextField(false);
                this.posInfo.eodFgName = '재개설-POS';
                utils.messageBox('alert', this.$t('MSG_ALT_EOD_REOPEN_CMPLT')); // 재개설이 완료됐습니다.
            });
        },
        // 저장버튼
        async clickSave() {
            const res = await http.request(this.$options.name, 'DTS_SAP_00006', {
                query: this.params,
            });
            if (res.data?.canCal !== 'Y') {
                // 해당포스에 추가접수된 회원이 존재합니다. PC정산 화면 재시작 후 정산가능합니다.
                utils.messageBox('alert', this.$t('MSG_ALT_CANT_EOD_PRCS'));
                return;
            }

            if (this.isInvalid()) return;

            // 정산을 진행 하시겠습니까?
            utils.messageBox('confirm', this.$t('MSG_ALT_EOD_PRCS_CONFIRM'), null, () => this.saveEodProcess());
        },
        // 정산처리
        async saveEodProcess() {
            const params = {
                posId: this.params.posId,
                saleDate: this.params.saleDate,
                posCashRsvData: this.calculateInfo,
                depositData: this.depositInfo,
                giftData: this.saveGiftList(),
                payData: this.payInfo,
            };
            http.request(this.$options.name, 'DTS_SAP_00010', {
                data: params,
            }).then((res) => {
                this.noneInput = true;
                this.noneInputeTextField(true);

                this.amtInfo = res.data.amtInfo;
                this.cardList = res.data.cardList;
                this.empCreditInfo = res.data.empCreditInfo;
                this.saleCreditList = res.data.saleCreditList;
                this.ticketList = res.data.ticketList;
                this.esignInfo = res.data.esignInfo;

                // 정산이 완료되었습니다.
                utils.messageBox('alert', this.$t('MSG_ALT_EOD_PRCS_CMPLT'), null, () => {
                    this.printReceipt();
                    this.search(this.params.posId, false);
                });
            });
        },
        // 유효성체크
        isInvalid() {
            let isInvalid = false;
            if (this.calculateInfo.demandCashCnt50kCnt % 100 != 0) {
                // 5만원권은 100개 단위로 입력하세요.
                utils.messageBox(
                    'alert',
                    utils.strFormat(this.$t('MSG_TXT_UNIT_INPUT_PLZ'), this.$t('MSG_TXT_WON_UNIT_50K'), '100')
                );
                isInvalid = true;
            } else if (this.calculateInfo.demandCashCnt10kCnt % 100 != 0) {
                // 만원권은 100개 단위로 입력하세요.
                utils.messageBox(
                    'alert',
                    utils.strFormat(this.$t('MSG_TXT_UNIT_INPUT_PLZ'), this.$t('MSG_TXT_WON_UNIT_10K'), '100')
                );
                isInvalid = true;
            } else if (this.calculateInfo.demandCashCnt5kCnt % 100 != 0) {
                // 오천원권은 100개 단위로 입력하세요.
                utils.messageBox(
                    'alert',
                    utils.strFormat(this.$t('MSG_TXT_UNIT_INPUT_PLZ'), this.$t('MSG_TXT_WON_UNIT_5K'), '100')
                );
                isInvalid = true;
            } else if (this.calculateInfo.demandCashCnt1kCnt % 100 != 0) {
                // 천원권은 100개 단위로 입력하세요.
                utils.messageBox(
                    'alert',
                    utils.strFormat(this.$t('MSG_TXT_UNIT_INPUT_PLZ'), this.$t('MSG_TXT_WON_UNIT_1K'), '100')
                );
                isInvalid = true;
            } else if (this.calculateInfo.demandCashCnt500Cnt % 40 != 0) {
                // 오백원권은 40개 단위로 입력하세요.
                utils.messageBox(
                    'alert',
                    utils.strFormat(this.$t('MSG_TXT_UNIT_INPUT_PLZ'), this.$t('MSG_TXT_WON_UNIT_500'), '40')
                );
                isInvalid = true;
            } else if (this.calculateInfo.demandCashCnt100Cnt % 50 != 0) {
                // 백원권은 50개 단위로 입력하세요.
                utils.messageBox(
                    'alert',
                    utils.strFormat(this.$t('MSG_TXT_UNIT_INPUT_PLZ'), this.$t('MSG_TXT_WON_UNIT_100'), '50')
                );
                isInvalid = true;
            } else if (this.calculateInfo.demandCashCnt50Cnt % 50 != 0) {
                // 오십원권은 50개 단위로 입력하세요.
                utils.messageBox(
                    'alert',
                    utils.strFormat(this.$t('MSG_TXT_UNIT_INPUT_PLZ'), this.$t('MSG_TXT_WON_UNIT_50'), '50')
                );
                isInvalid = true;
            } else if (this.calculateInfo.demandCashCnt10Cnt % 50 != 0) {
                // 십원권은 50개 단위로 입력하세요.
                utils.messageBox(
                    'alert',
                    utils.strFormat(this.$t('MSG_TXT_UNIT_INPUT_PLZ'), this.$t('MSG_TXT_WON_UNIT_10'), '50')
                );
                isInvalid = true;
            } else if (this.depositInfo.ticketDepositCnt % 10 != 0) {
                // 선발행티켓은 10개 단위로 입력하세요.
                utils.messageBox(
                    'alert',
                    utils.strFormat(this.$t('MSG_TXT_UNIT_INPUT_PLZ'), this.$t('MSG_TXT_WON_UNIT_TICKET'), '10')
                );
                isInvalid = true;
            }

            return isInvalid;
        },

        // 정산 출력
        printReceipt() {
            let bxlPosUtils = new BxlPosUtils();

            // 시재확인표 출력 시작
            this.printSije(bxlPosUtils);
            bxlPosUtils.cutPaper(1);

            //권종별청구액 출력시작
            this.printItem(bxlPosUtils);
            bxlPosUtils.cutPaper(1);

            //캐셔리포트 출력시작
            this.printCasherReport(bxlPosUtils);
            bxlPosUtils.cutPaper(1);

            /* 외상집계표 출력 시작 */
            //제휴카드
            this.printWfCard(bxlPosUtils);

            //사원외상
            this.printEmpCredit(bxlPosUtils);

            //판촉사원
            this.printWfSaleCredit(bxlPosUtils);

            //티켓별 집계표 시작
            this.printTicket(bxlPosUtils);

            var strSubmit = bxlPosUtils.getPosData();
            console.log(strSubmit);
            BxlCommonUtils.requestPrint('Printer1', strSubmit, (result) => {});
        },
    },
};
</script>
<style scoped>
.input-text-sap00001 {
    width: 100%;
    min-width: 50px;
    height: 32px;
    text-align: right;
}
</style>
