<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="예약일자"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <ur-range-picker v-model="dateValue1" init="today" />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="처리상태" :labelAlign="'right'" style="width: 50%; height: auto">
                    <div class="radioForm">
                        <ur-radio v-model="v1" value="Radio 000241_01" sm>전체</ur-radio>
                        <ur-radio v-model="v1" value="Radio 000241_02" sm>정상 </ur-radio>
                        <ur-radio v-model="v1" value="Radio 000241_03" sm>기타</ur-radio>
                    </div>
                    <!-- <ur-text-field value="" class="pl16" />
          <ur-icon-button icon="search" /> -->
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="예약 정보"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="v2" value="Radio 000242_01" sm>예약자명</ur-radio>
                        <ur-radio v-model="v2" value="Radio 000242_02" sm>예약자전화번호</ur-radio>
                        <ur-radio v-model="v2" value="Radio 00024_03" sm>예약확인증번호 </ur-radio>
                    </div>
                    <ur-text-field value="" class="pl16" style="width: 28%" />
                    <ur-icon-button icon="search" />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="예약상태" :labelAlign="'right'" style="width: 50%; height: auto">
                    <div class="radioForm">
                        <ur-radio v-model="v3" value="Radio 000243_01" sm>전체</ur-radio>
                        <ur-radio v-model="v3" value="Radio 000243_02" sm>예약신청</ur-radio>
                        <ur-radio v-model="v3" value="Radio 000243_03" sm>예약취소</ur-radio>
                        <ur-radio v-model="v3" value="Radio 000243_04" sm>발급완료</ur-radio>
                        <ur-radio v-model="v3" value="Radio 000243_05" sm>예약일</ur-radio>
                    </div>
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>초기화</ur-button>
                    <ur-button>조회</ur-button>
                    <ur-button color="violet">엑셀다운로드</ur-button>
                </div>
            </div>

            <!-- S::tab -->
            <ur-tab-box class="mt35">
                <ur-tab-content :idx="1" label="웹예약">
                    <template>
                        <div class="comm_title_wrap mt10">
                            <h4>웹예약 리스트</h4>
                            <!--S:: 타이틀 오른쪽 total info -->
                            <div class="right_box">
                                <div class="totalNo">
                                    <div class="totalCt">Total<span>11</span>건</div>
                                </div>
                            </div>
                            <!--E:: 타이틀 오른쪽 total info -->
                        </div>
                        <ur-data-grid
                            ref="grid"
                            :headers="columns"
                            :data-source="list"
                            :data-set-options="{ id: 'id' }"
                            :options="options"
                        />

                        <!-- <div class="comm_title_wrap mt45">
            <h4>타이틀 영역</h4>
          </div> -->
                        <!-- S::board_list -->
                        <div class="board_list mt40">
                            <table>
                                <caption></caption>
                                <colgroup>
                                    <col width="*" />
                                    <col width="*" />
                                    <col width="*" />
                                    <col width="*" />
                                    <col width="*" />
                                    <col width="*" />
                                    <col width="*" />
                                    <col width="*" />
                                    <col width="*" />
                                    <col width="*" />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th rowspan="2">총건수</th>
                                        <td rowspan="2" class="right">9</td>
                                        <th>총인원</th>
                                        <td class="right">9</td>
                                        <th rowspan="2">예약신청</th>
                                        <td class="right">5</td>
                                        <th rowspan="2">예약취소</th>
                                        <td class="right">0</td>
                                        <th rowspan="2">발급완료</th>
                                        <td class="right">4</td>
                                    </tr>
                                    <tr>
                                        <th>총금액</th>
                                        <td class="right">450,000</td>
                                        <td class="right">260,000</td>
                                        <td class="right">0</td>
                                        <td class="right">180,000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- E::board_list -->
                    </template>
                </ur-tab-content>
                <ur-tab-content :idx="2" label="상세조회">
                    <h4>상세조회</h4>
                </ur-tab-content>
            </ur-tab-box>
            <!-- E::tab -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00024',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            value1: '111',
            value2: '112',
            value3: '113',
            value4: '114',
            value5: '115',
            value6: '116',
            valuePD1: '117',
            valuePD2: '118',
            valuePD3: '119',
            valuePD4: '210',

            // 라디오 버튼
            v1: 'Radio 000241_01',
            v2: 'Radio 000242_01',
            v3: 'Radio 000243_01',
            value: null,

            dateValue1: ['', ''],

<<<<<<< Updated upstream
            // 테이블
            options: {
                rowHeight: 41,
                height: 250,
                styleBordered: false,
                resizableColumn: false,
                headerHeight: 36,
                multiSelect: false,
                selectCheck: false,
                resizeFullWidth: true,

                noInfo: true,
            },
=======
      // 테이블
      options: {
        rowHeight: 41,
        height: 250,
        styleBordered: false,
        resizableColumn: false,
        multiSelect: false,
        noInfo: true,
      },
>>>>>>> Stashed changes

            // 웹예약 리스트 테이블
            columns: [
                { text: '이름', value: 'value1', width: '100px' },
                { text: '예약일자', value: 'value2', width: '150px' },
                { text: '예약시간', value: 'value3', width: '100px' },
                { text: '예약번호', value: 'value4', width: '120px' },
                { text: '예약확인증번호', value: 'value5', width: '200px' },
                { text: '인원', value: 'value6', width: '80px' },
                { text: '결제금액', value: 'value7' },
                { text: '취소일', value: 'value8' },
                { text: '완료일', value: 'value9' },
                { text: '처리상태', value: 'value10' },
                { text: '예약상태', value: 'value11' },
                { text: '거래 KEY', value: 'value12' },
            ],
            list: [
                {
                    value1: '현길동',
                    value2: '2022/12/15',
                    value3: '10:22:35',
                    value4: '2204053128',
                    value5: 'EL1001HLKUXI6EU1',
                    value6: '1',
                    value7: '355,000',
                    value8: '2023/01/28',
                    value9: '2023/01/29',
                    value10: '결제전',
                    value11: '예약신청',
                    value12: '1234567890',
                },
            ],
        };
    },
    computed: {},
};
</script>
<style scoped></style>
