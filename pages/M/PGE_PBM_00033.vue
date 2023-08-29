<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="조회일자"
                    required
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-range-picker v-model="dateValue133" init="today" />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="POS ID" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-dropdown v-model="value33" :items="items33" />
                </ur-form-item>
            </ur-form-box>

            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>초기화</ur-button>
                    <ur-button>조회</ur-button>
                    <ur-button color="violet">엑셀다운로드</ur-button>
                </div>
            </div>

            <div class="comm_title_wrap mt25">
                <h4>판매상세 조회</h4>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">Total<span>20</span>건</div>
                    </div>
                </div>
                <!--E:: 타이틀 오른쪽 total info -->
            </div>
            <!-- S::컨텐츠1 -->
            <ur-data-grid
                ref="grid"
                :headers="columns"
                :data-source="list"
                :data-set-options="{ id: 'id' }"
                :options="options33"
            />
            <!-- E::컨텐츠1-->

            <!-- S::board_list_type2 -->
            <!-- 리얼그리드 칼럼의 width 값에 맞추어 col width 설정후 가로 스크롤 필요할 경우  -->
            <!-- <div class="board_list_type2" style="overflow-x: scroll">
        <table>
          <caption></caption>
          <colgroup>
            <col width="60px" />
            <col width="100px" />
            <col width="100px" />
            <col width="120px" />
            <col width="120px" />
            <col width="100px" />
            <col width="100px" />
            <col width="100px" />
            <col width="100px" />
            <col width="100px" />
            <col width="100px" />
            <col width="100px" />
            <col width="100px" />
            <col width="100px" />
            <col width="100px" />
            <col width="100px" />
            <col width="*" />
          </colgroup> -->
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
                    <tfoot>
                        <tr>
                            <td rowspan="3"></td>
                            <td rowspan="3"></td>
                            <td rowspan="3"></td>
                            <td rowspan="3"></td>
                            <td rowspan="3"></td>
                            <td rowspan="3"></td>
                            <td>판매</td>
                            <td class="right">0</td>
                            <td class="right">1</td>
                            <td class="right">2</td>
                            <td class="right">3</td>
                            <td class="right" rowspan="3">4</td>
                            <td class="right">5</td>
                            <td class="right">6</td>
                            <td class="right" rowspan="3">7</td>
                            <td class="right" rowspan="3">8</td>
                        </tr>
                        <tr>
                            <td>환불</td>
                            <td class="right">11</td>
                            <td class="right">12</td>
                            <td class="right">13</td>
                            <td class="right">14</td>
                            <td class="right">15</td>
                            <td class="right">16</td>
                        </tr>
                        <tr>
                            <td>매출</td>
                            <td class="right">92</td>
                            <td class="right">82</td>
                            <td class="right">72</td>
                            <td class="right">62</td>
                            <td class="right">52</td>
                            <td class="right">42</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <!-- E::board_list_type2 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00033',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            // 드롭다운
            value33: '1',
            dateValue133: ['', ''],

            // 테이블
            options33: {
                height: 500,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 판매상세 조회 테이블
            columns: [
                { text: 'No', value: 'value1', width: '60px' },
                { text: '결제일자', value: 'value2', width: '100px' },
                { text: '결제시간', value: 'value3', width: '100px' },
                { text: '영수증번호(약식)', value: 'value4', width: '120px' },
                { text: '정기권번호', value: 'value5', width: '120px' },
                { text: '결제자', value: 'value6', width: '100px' },
                { text: '판매구분', value: 'value7', width: '100px' },
                { text: '인원', value: 'value8', width: '100px' },
                { text: '결제총액', value: 'value9', width: '100px' },
                { text: '판매총액', value: 'value10', width: '100px' },
                { text: '위약금', value: 'value11', width: '100px' },
                { text: '결제수단', value: 'value12', width: '100px' },
                { text: '결제건수', value: 'value13', width: '100px' },
                { text: '결제금액', value: 'value14', width: '100px' },
                { text: '결제자명', value: 'value15', width: '100px' },
                { text: '원거래번호', value: 'value16' },
            ],
            list: [
                {
                    value1: '1',
                    value2: '2022/02/27',
                    value3: '10:15:28',
                    value4: '12345678',
                    value5: '987654321',
                    value6: '주길동',
                    value7: '대인',
                    value8: '2',
                    value9: '255,000',
                    value10: '550,000',
                    value11: '15,000',
                    value12: '신용카드',
                    value13: '1',
                    value14: '500,000',
                    value15: '계길동',
                    value16: '2352029716',
                },
            ],
        };
    },
    computed: {
        items33() {
            const rtn = [];
            rtn.push({ value: '1', text: '전체' });
            rtn.push({ value: '2', text: '연간회원매출-01' });
            rtn.push({ value: '3', text: '연간회원매출-02' });
            rtn.push({ value: '4', text: '연간회원매출-03' });
            rtn.push({ value: '5', text: '연간회원매출-04' });
            rtn.push({ value: '6', text: '연간회원매출-05' });
            return rtn;
        },
    },
};
</script>
<style scoped></style>
