<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S  정보 -->
            <ur-button @click="openModalP00062">상품권 결제 팝업</ur-button>

            <!-- ::S 공통 팝업 -->
            <ur-modal ref="modalP00062" class="modal-b1c6" large dragable title="공통팝업" @closed="closed">
                <template slot="title">
                    <div class="modal-title">상품권 결제</div>
                </template>
                <template>
                    <!-- <sui-page class="custom_page"> -->
                    <div class="modal-body">
                        <!-- ::S 콘텐츠1 -->
                        <ur-form-box toggleable>
                            <ur-form-item
                                class="flex_wrap"
                                label="총금액"
                                :labelAlign="'right'"
                                style="width: 50%; height: auto"
                            >
                                250,000원
                            </ur-form-item>
                            <ur-form-item
                                class="flex_wrap"
                                label="미결금액"
                                :labelAlign="'right'"
                                required
                                style="width: 50%; height: auto"
                            >
                                195,000원
                            </ur-form-item>
                        </ur-form-box>
                        <!-- <div class="btn_wrap mt10">
              <div class="left_box">
                <ur-button> 추가 </ur-button>
                <ur-button> 삭제 </ur-button>
              </div>
              <div class="right_box">
                <ur-button color="violet">결제방법</ur-button>
              </div>
            </div> -->
                        <!-- ::E 콘텐츠1 -->
                        <!-- ::S 콘텐츠2 -->
                        <div class="comm_title_wrap mt30">
                            <!-- <h4 class="pr10">임시타이틀 영역</h4> -->
                            <ur-button color="violet">결제방법</ur-button>
                            <ur-button color="violet"> 추가 </ur-button>
                            <ur-button color="violet"> 삭제 </ur-button>
                            <!--S:: 타이틀 오른쪽 total info -->
                            <div class="right_box">
                                <div class="totalNo">
                                    <div class="totalCt">Total<span>37</span>건</div>
                                </div>
                            </div>
                            <!--E:: 타이틀 오른쪽 total info -->
                        </div>
                        <ur-data-grid
                            ref="grid"
                            :headers="columnsP1T1"
                            :data-source="listP1T1"
                            :options="options"
                            :data-set-options="{ id: 'id' }"
                            Height="200"
                        />
                        <!-- ::E 콘텐츠2 -->
                        <!-- <div
              ref="viewerArea"
              class="img_box mt20"
              style="height: 200px"
            ></div> -->
                    </div>

                    <!-- </sui-page> -->
                </template>
                <template slot="action">
                    <ur-button>완료</ur-button>
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
    name: 'PGE_PBM_00062', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            // 드롭다운
            valueD1: '1',
            // 테이블 옵션
            options: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
            // 그리드 리스트
            columnsP1T1: [
                { text: '상품권발행사', value: 'value1' },
                { text: '상품권번호', value: 'value2' },
                { text: '액면금액', value: 'value3' },
                { text: '결제금액', value: 'value4' },
                { text: '잔여금액', value: 'value5' },
            ],
            listP1T1: [
                {
                    value1: '갤럭시아컴즈',
                    value2: '1564875687562254',
                    value3: '100,000',
                    value4: '29,000',
                    value5: '71,000',
                },
            ],
        };
    },
    computed: {
        modalP00062() {
            return this.$refs.modalP00062;
        },
    },
    methods: {
        openModalP00062() {
            this.modalP00062.open();
        },
        closeModal() {
            this.modalP00062.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
