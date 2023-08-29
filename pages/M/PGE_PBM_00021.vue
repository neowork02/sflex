<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 정보 -->
            <ur-button @click="openModalP00020">개인별입장확인서발행내역 팝업</ur-button>

            <!-- ::S 공통 팝업 -->
            <ur-modal ref="modalP00020" class="modal-b1c6" large dragable title="공통팝업" @closed="closed">
                <template slot="title">
                    <div class="modal-title mb45">개인별입장확인서발행내역</div>
                </template>
                <template>
                    <!-- <sui-page class="custom_page"> -->
                    <div class="modal-body">
                        <!-- ::S 콘텐츠1 -->
                        <!-- <div class="comm_title_wrap">
              <h4>임시타이틀 영역_개인별입장확인서발행내역</h4>
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
                        <ur-data-grid
                            ref="grid"
                            :headers="columnsP1T1"
                            :data-source="listP1T1"
                            :options="options"
                            :data-set-options="{ id: 'id' }"
                        />
                        <!-- ::E 콘텐츠1 -->
                    </div>
                    <!-- </sui-page> -->
                </template>
                <template slot="action">
                    <ur-button color="violet" @click="closeModal">닫기</ur-button>
                </template>
            </ur-modal>
            <!-- ::E 공통 팝업-->
            <!-- ::E 정보 -->
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00021', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            // 테이블 옵션
            options: {
                height: 280,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            columnsP1T1: [
                { text: '발급일', value: 'value1', width: '120px' },
                { text: '발급시간', value: 'value2', width: '120px' },
                { text: '성명', value: 'value3', width: '100px' },
                { text: '정기권번호', value: 'value4', width: '150px' },
                { text: '권종명', value: 'value5' },
                { text: '발급사유', value: 'value6' },
            ],
            listP1T1: [
                {
                    value1: '2023/03/13',
                    value2: '10:54:41',
                    value3: '홍길동',
                    value4: '1732173400',
                    value5: 'EL연간신규350스탠다드대인',
                    value6: '스마트폰 분실',
                },
            ],
        };
    },
    computed: {
        modalP00020() {
            return this.$refs.modalP00020;
        },
    },
    methods: {
        openModalP00020() {
            this.modalP00020.open();
        },
        closeModal() {
            this.modalP00020.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
