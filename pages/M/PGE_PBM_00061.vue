<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 담당자 정보 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="카드결제"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                    <ur-icon-button icon="search" icon-type="line" color="primary" @click="openModalP00061" />

                    <!-- ::S 공통 팝업 -->
                    <ur-modal ref="modalP00061" class="modal-b1c6" large dragable title="공통팝업" @closed="closed">
                        <template slot="title">
                            <div class="modal-title">카드결제</div>
                        </template>
                        <template>
                            <!-- <sui-page class="custom_page"> -->
                            <div class="modal-body">
                                <!-- ::S 콘텐츠1 -->
                                <!--S:: 타이틀 오른쪽 total info -->
                                <div class="comm_title_wrap">
                                    <div class="right_box">
                                        <div class="totalNo">
                                            <div class="totalCt">Total<span>0</span>건</div>
                                        </div>
                                    </div>
                                </div>
                                <!--E::: 타이틀 오른쪽 total info -->
                                <ur-data-grid
                                    ref="grid"
                                    :headers="columnsP1T1"
                                    :data-source="listP1T1"
                                    :options="options"
                                    :data-set-options="{ id: 'id' }"
                                    Height="300"
                                />
                                <!-- ::E 콘텐츠1 -->
                            </div>
                            <!-- </sui-page> -->
                        </template>
                        <template slot="action">
                            <ur-button color="violet">선택</ur-button>
                            <ur-button @click="closeModal">닫기</ur-button>
                        </template>
                    </ur-modal>
                    <!-- ::E 공통 팝업-->
                </ur-form-item>
                <!-- ::E 담당자 정보 -->
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>초기화</ur-button>
                    <ur-button color="violet"> 검색 </ur-button>
                </div>
            </div>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00061', // eslint-disable-line vue/name-property-casing
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

<<<<<<< Updated upstream
            // 카드결제팝업테이블
            columnsP1T1: [
                { text: '11', value: 'value1' },
                { text: '33', value: 'value2' },
                { text: '56', value: 'value3' },
                { text: '78', value: 'value4' },
                { text: '24', value: 'value5' },
            ],
            listP1T1: [
                {
                    value1: '2023/02/17',
                    value2: '9456152485',
                    value3: '111',
                    value4: '2023/11/24',
                    value5: '만료',
                },
                {
                    value1: '2023/02/18',
                    value2: '4915752484',
                    value3: '222',
                    value4: '2023/11/25',
                    value5: '만료',
                },
                {
                    value1: '2023/02/19',
                    value2: '123456789',
                    value3: '333',
                    value4: '2023/11/26',
                    value5: '만료',
                },
                {
                    value1: '2023/02/20',
                    value2: '8954159874',
                    value3: '444',
                    value4: '2023/11/27',
                    value5: '',
                },
                {
                    value1: '2023/02/21',
                    value2: '2369456869',
                    value3: '555',
                    value4: '2023/11/28',
                    value5: '-',
                },
            ],
        };
    },
    computed: {
        modalP00061() {
            return this.$refs.modalP00061;
=======
      // 카드결제팝업테이블
      columnsP1T1: [
        { text: "11", value: "value1" },
        { text: "33", value: "value2" },
        { text: "56", value: "value3" },
        { text: "78", value: "value4" },
        { text: "24", value: "value5" },
      ],
      list: [
        {
          value1: "954545**89547890",
          value2: "KB카드",
          value3: "2024/12/25",
          value4: "2023/02/17",
        },
        {
          value1: "2023/02/17",
          value2: "9456152485",
          value3: "111",
          value4: "2023/11/24",
          value5: "만료",
        },
        {
          value1: "2023/02/18",
          value2: "4915752484",
          value3: "222",
          value4: "2023/11/25",
          value5: "만료",
        },
      ],
      // 상품권결제내역 리스트
      columns2: [
        { text: "카드번호", value: "value1" },
        { text: "카드사", value: "value2" },
        { text: "유효년월", value: "value3" },
        { text: "승인일자", value: "value4" },
        { text: "승인시간", value: "value5" },
        { text: "승인번호", value: "value6" },
        { text: "승인금액", value: "value7" },
      ],
      list2: [
        {
          value1: "2023/02/19",
          value2: "123456789",
          value3: "333",
          value4: "2023/11/26",
          value5: "만료",
>>>>>>> Stashed changes
        },
    },
    methods: {
        openModalP00061() {
            this.modalP00061.open();
        },
        closeModal() {
            this.modalP00061.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
