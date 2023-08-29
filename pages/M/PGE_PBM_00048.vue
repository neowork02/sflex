<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="조회일자"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                >
                    <ur-range-picker autoConfirm input-type="YYYY-MM-DD" init="day+30" />
                </ur-form-item>
            </ur-form-box>

            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>초기화</ur-button>
                    <ur-button>조회</ur-button>
                    <ur-button color="violet">엑셀다운로드</ur-button>
                </div>
            </div>

            <!-- S::일자별 리스트+상세정보 -->
            <div class="comm_shut_wrap mt30">
                <div class="inbox3">
                    <!-- S::일자별 리스트 -->
                    <div class="comm_title_wrap">
                        <h4>기간별 중지 처리자 현황</h4>
                        <!--S:: 타이틀 오른쪽 total info -->
                        <div class="right_box">
                            <div class="totalNo">
                                <div class="totalCt">Total<span>10</span>건</div>
                                <!-- info: Total *건 -->
                            </div>
                        </div>
                        <!--E:: 타이틀 오른쪽 total info -->
                    </div>
                    <ur-data-grid
                        ref="grid"
                        :headers="columns"
                        :data-source="list"
                        :data-set-options="{ id: 'id' }"
                        :options="options48"
                    />
                    <!-- E::일자별 리스트 -->
                </div>
                <div class="emptybox" />
                <div class="inbox7">
                    <!-- S::상세정보 -->
                    <div class="comm_title_wrap">
                        <h4 class="pr10">상세정보</h4>
                        <ur-button color="violet">엑셀다운로드</ur-button>
                        <!--S:: 타이틀 오른쪽 total info -->
                        <div class="right_box">
                            <div class="totalNo">
                                <div class="totalCt">Total<span>11</span>건</div>
                                <!-- info: Total *건 -->
                            </div>
                        </div>
                        <!--E:: 타이틀 오른쪽 total info -->
                        <!-- <div class="btn_wrap">
              <div class="right_box">
                <ur-button>엑셀다운로드</ur-button>
              </div>
            </div> -->
                    </div>
                    <ur-data-grid
                        ref="grid"
                        :headers="columns2"
                        :data-source="list2"
                        :data-set-options="{ id: 'id' }"
                        :options="options48"
                    />
                    <!-- E::상세정보 -->
                </div>
            </div>
            <!-- E::만기일자별 리스트+상세정보 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00048',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            // 테이블
            options48: {
                height: 500,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 기간별중지처리자현황 리스트
            columns: [
                { text: '일자', value: 'value1' },
                { text: '중지정기권수', value: 'value2' },
            ],
            list: [
                {
                    value1: '2023-03-07',
                    value2: '26',
                },
            ],
            // 상세정보 리스트
            columns2: [
                { text: '일자', value: 'value1' },
                { text: '정기권번호', value: 'value2' },
                { text: '중지일수', value: 'value3' },
                { text: '중지기간', value: 'value4' },
            ],
            list2: [
                {
                    value1: '2023-02-14',
                    value2: '9876542',
                    value3: '3',
                    value4: '5',
                },
            ],
        };
    },
};
</script>
<style scoped></style>
