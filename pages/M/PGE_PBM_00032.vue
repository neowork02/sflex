<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 정보 -->
            <ur-button @click="openModalP00032">상품권입금 팝업</ur-button>

            <!-- ::S 공통 팝업 -->
            <ur-modal ref="modalP00032" class="modal-b1c6" large dragable title="공통팝업" @closed="closed">
                <template slot="title">
                    <div class="modal-title mb45">상품권입금</div>
                </template>
                <template>
                    <!-- <sui-page class="custom_page"> -->
                    <sui-page class="custom_page">
                        <div class="modal-body">
                            <!-- ::S 콘텐츠1 -->
                            <!-- <div class="comm_title_wrap">
                <h4>임시타이틀 영역_상품권입금</h4>
              </div> -->
                            <!--S:: 타이틀 오른쪽 total info -->
                            <div class="comm_title_wrap">
                                <div class="right_box">
                                    <div class="totalNo">
                                        <div class="totalCt">Total<span>0</span>건</div>
                                    </div>
                                </div>
                            </div>
                            <!--E::: 타이틀 오른쪽 total info -->
                            <!-- S::board_list_type2 -->
                            <div class="board_list_type2 fixHeight">
                                <table>
                                    <caption></caption>
                                    <colgroup>
                                        <col width="80px" />
                                        <col width="65px" />
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
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th rowspan="2">제휴사</th>
                                            <th rowspan="2">구분</th>
                                            <th colspan="10">권종</th>
                                            <th rowspan="2">합계</th>
                                        </tr>
                                        <tr>
                                            <th>1천원</th>
                                            <th>2천원</th>
                                            <th>5천원</th>
                                            <th>1만원</th>
                                            <th>3만원</th>
                                            <th>5만원</th>
                                            <th>7만원</th>
                                            <th>10만원</th>
                                            <th>30만원</th>
                                            <th>50만원</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td rowspan="2">합계</td>
                                            <td>수량</td>
                                            <td class="center_nar">
                                                <ur-text-field value="0" style="width: 100% !important" />
                                            </td>
                                            <td class="center_nar">
                                                <ur-text-field value="0" style="width: 100% !important" />
                                            </td>
                                            <td class="center_nar">
                                                <ur-text-field value="0" style="width: 100% !important" />
                                            </td>
                                            <td class="center_nar">
                                                <ur-text-field value="0" style="width: 100% !important" />
                                            </td>
                                            <td class="center_nar">
                                                <ur-text-field value="0" style="width: 100% !important" />
                                            </td>
                                            <td class="center_nar">
                                                <ur-text-field value="0" style="width: 100% !important" />
                                            </td>
                                            <td class="center_nar">
                                                <ur-text-field value="0" style="width: 100% !important" />
                                            </td>
                                            <td class="center_nar">
                                                <ur-text-field value="0" style="width: 100% !important" />
                                            </td>
                                            <td class="center_nar">
                                                <ur-text-field value="0" style="width: 100% !important" />
                                            </td>
                                            <td class="center_nar">
                                                <ur-text-field value="0" style="width: 100% !important" />
                                            </td>
                                            <td class="center_nar">
                                                <ur-text-field value="0" style="width: 100% !important" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>금액</td>
                                            <td class="right">0</td>
                                            <td class="right">0</td>
                                            <td class="right">0</td>
                                            <td class="right">0</td>
                                            <td class="right">0</td>
                                            <td class="right">0</td>
                                            <td class="right">0</td>
                                            <td class="right">0</td>
                                            <td class="right">0</td>
                                            <td class="right">0</td>
                                            <td class="right">0</td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2">홈플러스</td>
                                            <td>수량</td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                        </tr>
                                        <tr>
                                            <td>금액</td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2">문화</td>
                                            <td>수량</td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                        </tr>
                                        <tr>
                                            <td>금액</td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2">신세계</td>
                                            <td>수량</td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                        </tr>
                                        <tr>
                                            <td>금액</td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2">관광</td>
                                            <td>수량</td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                        </tr>
                                        <tr>
                                            <td>금액</td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2">호텔신라</td>
                                            <td>수량</td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                        </tr>
                                        <tr>
                                            <td>금액</td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2" style="letter-spacing: -1px">삼성플라자</td>
                                            <td>수량</td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                        </tr>
                                        <tr>
                                            <td>금액</td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2">AK</td>
                                            <td>수량</td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                        </tr>
                                        <tr>
                                            <td>금액</td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                        </tr>
                                        <tr>
                                            <td rowspan="2">애경</td>
                                            <td>수량</td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                        </tr>
                                        <tr>
                                            <td>금액</td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                            <td class="right"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- E::board_list_type2 -->
                            <!-- <ur-data-grid
                ref="grid"
                :headers="columnsP1T1"
                :data-source="listP1T1"
                :options="options"
                :data-set-options="{ id: 'id' }"
              /> -->

                            <!-- ::E 콘텐츠1 -->
                        </div>
                    </sui-page>
                    <!-- </sui-page> -->
                </template>
                <template slot="action">
                    <ur-button>초기화 </ur-button>
                    <ur-button>확인</ur-button>
                    <ur-button color="violet" @click="closeModal">닫기</ur-button>
                </template>
            </ur-modal>
            <!-- ::E 공통 팝업-->
            <!-- ::E  정보 -->
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00032', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            // 테이블 옵션
            options: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 상품권입금 팝업 테이블
            columnsP1T1: [
                { text: '제휴사', value: 'value1' },
                { text: '구분', value: 'value2' },
                { text: '권종', value: 'value3' },
                { text: '합계', value: 'value4' },
            ],

            listP1T1: [
                {
                    value1: '홈플러스',
                    value2: '지류',
                    value3: '1천원',
                    value4: '10,000',
                },
            ],
        };
    },
    computed: {
        // modalPopUp
        modalP00032() {
            return this.$refs.modalP00032;
        },
    },
    methods: {
        openModalP00032() {
            this.modalP00032.open();
        },
        closeModal() {
            this.modalP00032.close();
        },
        closed() {},
    },
};
</script>
<style scoped>
.ur-text-field {
    min-width: 95px;
}
</style>
