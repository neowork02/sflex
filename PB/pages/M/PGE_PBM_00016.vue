<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 정보 -->
            <ur-button @click="openModalP00016">결제Main 팝업</ur-button>
            <!-- <div class="comm_title_wrap mt45">
        <ur-button @click="openModalP00016">결제Main 팝업</ur-button>
      </div> -->
            <!-- ::S 팝업 -->
            <ur-modal ref="modalP00016" class="modal-b1c6" xlarge dragable title="공통팝업" @closed="closed">
                <!-- <div class="modalWrap" style="height: auto"> -->
                <template slot="title">
                    <div class="modal-title mb45">결제Main</div>
                </template>
                <template>
                    <!-- <sui-page class="custom_page"> -->
                    <div class="modal-body">
                        <!-- ::S 컨텐츠1 -->
                        <ur-form-box>
                            <ur-form-item
                                class="flex_wrap"
                                label="결제자"
                                :labelAlign="'right'"
                                style="width: 100%; height: auto"
                            >
                                홍길동</ur-form-item
                            >
                        </ur-form-box>
                        <!-- ::E 컨텐츠1 -->

                        <!-- S::컨텐츠2 -->
                        <div class="comm_title_wrap mt30">
                            <h4>정기권 정보</h4>
                            <!--S:: 타이틀 오른쪽 total info -->
                            <div class="right_box">
                                <div class="totalNo">
                                    <div class="totalCt">Total<span>2</span>건</div>
                                </div>
                            </div>
                            <!--E:: 타이틀 오른쪽 total info -->
                        </div>
                        <ur-data-grid
                            ref="grid"
                            :headers="columns"
                            :data-source="list"
                            :options="options"
                            :data-set-options="{ id: 'id' }"
                        />
                        <!-- ::E 컨텐츠2 -->
                        <!-- S::컨텐츠3 -->
                        <div class="comm_shut_wrap">
                            <div class="inbox3">
                                <div class="comm_title_wrap mt30">
                                    <h4 class="pr10">결제유형</h4>
                                </div>

                                <div class="board_list">
                                    <table>
                                        <caption></caption>
                                        <colgroup>
                                            <col width="40%" />
                                            <col width="auto" />
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <th class="center">총금액</th>
                                                <td class="right">230,000 원</td>
                                            </tr>

                                            <tr>
                                                <th class="center">미결제금액</th>
                                                <td class="right">210,000 원</td>
                                            </tr>
                                            <tr>
                                                <th class="center">
                                                    <ur-button sm>현금</ur-button>
                                                </th>
                                                <td class="right">0 원</td>
                                            </tr>
                                            <tr>
                                                <th class="center">
                                                    <ur-button sm>카드</ur-button>
                                                </th>
                                                <td class="right">0 원</td>
                                            </tr>
                                            <tr>
                                                <th class="center">
                                                    <ur-button sm>상품권</ur-button>
                                                </th>
                                                <td class="right">0 원</td>
                                            </tr>
                                            <tr>
                                                <th class="center">
                                                    <ur-button sm>기프트카드</ur-button>
                                                </th>
                                                <td class="right">0 원</td>
                                            </tr>
                                            <tr>
                                                <th class="center">
                                                    <ur-button sm>멤버십포인트</ur-button>
                                                </th>
                                                <td class="right">0 원</td>
                                            </tr>
                                            <tr>
                                                <th class="center">
                                                    <ur-button sm>외상</ur-button>
                                                </th>
                                                <td class="right">0 원</td>
                                            </tr>
                                            <tr>
                                                <th class="center">선발행티켓</th>
                                                <td class="right">0 원</td>
                                            </tr>
                                            <tr>
                                                <th class="center">티켓(수기)</th>
                                                <td class="right">0 원</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="btn_wrap mt10">
                                    <div class="right_box">
                                        <ur-button color="violet">수표조회</ur-button>
                                        <ur-button color="violet" class="emp">완료</ur-button>
                                    </div>
                                </div>
                            </div>
                            <div class="emptybox" />
                            <div class="inbox7">
                                <div class="comm_title_wrap mt30">
                                    <h4 class="pr10">카드결제내역</h4>
                                </div>
                                <ur-data-grid
                                    ref="grid"
                                    :headers="columns2"
                                    :data-source="list2"
                                    :data-set-options="{ id: 'id' }"
                                    :options="options2"
                                />
                                <div class="comm_title_wrap">
                                    <h4 class="pr10">상품권결제내역</h4>
                                </div>
                                <ur-data-grid
                                    ref="grid"
                                    :headers="columns3"
                                    :data-source="list3"
                                    :data-set-options="{ id: 'id' }"
                                    :options="options3"
                                />
                                <div class="btn_wrap mt10">
                                    <div class="right_box">
                                        <ur-button color="violet">권종선택</ur-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- ::E 컨텐츠3 -->
                    </div>
                    <!-- </sui-page> -->
                </template>
                <template slot="action">
                    <ur-button color="violet" @click="closeModal">닫기</ur-button>
                </template>
                <!-- </div> -->
            </ur-modal>
            <!-- ::E 팝업-->
            <!-- ::E 정보 -->
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00016', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            // 테이블 옵션
            options: {
                height: 200,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
            options2: {
                height: 150,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
            options3: {
                height: 180,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 정기권정보 리스트 테이블
            columns: [
                { text: '회원', value: 'value1', width: '120px' },
                { text: '권종명', value: 'value2' },
                { text: '인원유형', value: 'value3', width: '120px' },
                { text: '금액', value: 'value4', width: '180px' },
            ],
            list: [
                {
                    value1: '테스트',
                    value2: 'EL연간350스탠다드대인',
                    value3: '대인',
                    value4: '220,000',
                },
            ],
            // 카드결제내역 리스트 테이블
            columns2: [
                { text: '카드1번호', value: 'value1' },
                { text: '카드2사', value: 'value2' },
                { text: '승인3번호', value: 'value3' },
                { text: '승인4금액', value: 'value4' },
                { text: '처리5상태', value: 'value5' },
            ],
            list2: [
                {
                    value1: '9578*76515697978',
                    value2: '우리카드',
                    value3: '123456789',
                    value4: '220,000',
                    value5: '처리',
                },
            ],
            // 상품권결제내역 리스트 테이블
            columns3: [
                { text: '단가', value: 'value1' },
                { text: '금액', value: 'value2' },
                { text: '잔액', value: 'value3' },
                { text: '발행사', value: 'value4' },
                { text: '번호', value: 'value5' },
            ],
            list3: [
                {
                    value1: '200,000',
                    value2: '190,000',
                    value3: '10,000',
                    value4: '발행사명',
                    value5: '123456789',
                },
            ],
        };
    },
    computed: {
        modalP00016() {
            return this.$refs.modalP00016;
        },
    },
    methods: {
        openModalP00016() {
            this.modalP00016.open();
        },
        closeModal() {
            this.modalP00016.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
