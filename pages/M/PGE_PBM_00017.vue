<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S  정보 -->
            <ur-button @click="openModalP00017">결제자 확인 팝업(결제자 선택한 경우)</ur-button>
            <ur-button @click="openModalP00018">결제자 확인 팝업(결제자를 선택하지 않는 경우)</ur-button>

            <!-- ::S 결제자 확인 팝업 Case1 : 결제자 선택한 경우 -->
            <ur-modal ref="modalP00017" class="modal-b1c6" small dragable title="팝업" @closed="closed">
                <template slot="title">
                    <div class="modal-title mb45">결제자 확인</div>
                </template>
                <template>
                    <!-- <sui-page class="custom_page"> -->
                    <div class="modal-body">
                        <!-- ::S 콘텐츠1 -->
                        <div class="msgWrap">
                            <strong class="accountTit">홍길동</strong>
                        </div>
                        <!-- <div class="btn_wrap mt20">
              <div class="center_box">
                <ur-button>확인</ur-button>
                <ur-button color="violet">취소</ur-button>
              </div>
            </div> -->
                        <!--::S InfoText -->
                        <div class="guideWrap guideList mt20">
                            <ul class="listDot acc">
                                <li>결제자의 멤버십포인트가 사용됩니다.</li>
                                <li>결제자에게 멤버십포인트가 적립됩니다.</li>
                                <li>결제자에게 쿠폰이 지급됩니다.</li>
                            </ul>
                        </div>
                        <!--::E InfoText -->
                        <!-- ::E 콘텐츠1 -->
                    </div>

                    <!-- </sui-page> -->
                </template>
                <template slot="action">
                    <ur-button>확인</ur-button>
                    <ur-button color="violet" @click="closeModal">취소</ur-button>
                </template>
            </ur-modal>
            <!-- ::E 결제자 확인 팝업 Case1 : 결제자 선택한 경우 -->
            <!-- ::S 결제자 확인 팝업 Case2 : 결제자를 선택하지 않는 경우 -->
            <ur-modal ref="modalP00018" class="modal-b1c6" small dragable title="팝업" @closed="closed">
                <template slot="title">
                    <div class="modal-title mb45">결제자 확인</div>
                </template>
                <template>
                    <!-- <sui-page class="custom_page"> -->
                    <div class="modal-body">
                        <!-- ::S 콘텐츠1 -->
                        <div class="msgWrap">
                            <span class="accountTitChoice"> 결제자를 선택해주세요! </span>
                            <ur-icon-button icon="search" />
                        </div>
                        <!-- <div class="btn_wrap mt20">
              <div class="center_box">
                <ur-button>확인</ur-button>
                <ur-button color="violet">취소</ur-button>
              </div>
            </div> -->
                        <!--::S InfoText -->
                        <div class="guideWrap guideList mt20">
                            <ul class="listDot acc">
                                <li>결제자의 멤버십포인트가 사용됩니다.</li>
                                <li>결제자에게 멤버십포인트가 적립됩니다.</li>
                                <li>결제자에게 쿠폰이 지급됩니다.</li>
                            </ul>
                        </div>
                        <!--::E InfoText -->
                        <!-- ::E 콘텐츠1 -->
                    </div>
                    <!-- </sui-page> -->
                </template>
                <template slot="action">
                    <ur-button>확인</ur-button>
                    <ur-button color="violet" @click="closeModal">취소</ur-button>
                </template>
            </ur-modal>
            <!-- ::E 결제자 확인 팝업 Case2 : 결제자를 선택하지 않는 경우 -->
            <!-- ::E 정보 -->
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00017', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            // 드롭다운
            valueD1: '1',

            options: {
                height: 250,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
        };
    },
    computed: {
        // 계산된 속성, date pickproperty로 사용가능

        // 드랍다운

        // modalPopUp
        modalP00017() {
            return this.$refs.modalP00017;
        },
        modalP00018() {
            return this.$refs.modalP00018;
        },
    },
    watch: {
        // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
    },
    methods: {
        openModalP00017() {
            this.modalP00017.open();
        },
        openModalP00018() {
            this.modalP00018.open();
        },
        closeModal() {
            this.modalP00017.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
