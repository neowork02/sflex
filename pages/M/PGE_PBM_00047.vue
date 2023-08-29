<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
                <ur-form-item class="flex_wrap" label="조회일자" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-range-picker autoConfirm input-type="YYYY-MM-DD" init="day+30" />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="권종명" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-text-field value="" style="width: 100%; height: auto" />
                </ur-form-item>
            </ur-form-box>

            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>초기화</ur-button>
                    <ur-button>조회</ur-button>
                    <ur-button color="violet">엑셀다운로드</ur-button>
                </div>
            </div>

            <!-- S::만기일자별 리스트+권종상세 -->
            <div class="comm_shut_wrap mt30">
                <div class="inbox3">
                    <!-- S::만기일자별 리스트 -->
                    <div class="comm_title_wrap">
                        <h4>만기일자별 리스트</h4>
                        <!--S:: 타이틀 오른쪽 total info -->
                        <div class="right_box">
                            <div class="totalNo">
                                <div class="totalCt">Total<span>7</span>건</div>
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
                        :options="options"
                    />
                    <!-- E::만기일자별 리스트 -->
                </div>
                <div class="emptybox" />
                <div class="inbox7">
                    <!-- S::권종 상세 -->
                    <div class="comm_title_wrap">
                        <h4 class="pr10">권종 상세</h4>
                        <ur-button color="violet">엑셀다운로드</ur-button>
                        <!--S:: 타이틀 오른쪽 total info -->
                        <div class="right_box">
                            <div class="totalNo">
                                <div class="totalCt">Total<span>9</span>건</div>
                                <!-- info: Total *건 -->
                            </div>
                        </div>
                        <!--E:: 타이틀 오른쪽 total info -->
                        <!-- <div class="btn_wrap">
              <div class="right_box">
                <ur-button>엑셀다운로드</ur-button>
                <ur-button icon="download" icon-type="line">
                  엑셀 다운로드
                </ur-button>
              </div> 
            </div>-->
                    </div>
                    <ur-data-grid
                        ref="grid"
                        :headers="columns2"
                        :data-source="list2"
                        :data-set-options="{ id: 'id' }"
                        :options="options"
                        Height="300"
                    />
                    <!-- E::권종상세 -->
                </div>
            </div>
            <!-- E::만기일자별 리스트+권종상세 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00047',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            // XXXXX테이블
            options: {
                height: 500,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            //만기일자별 리스트
            columns: [
                { text: '만기일자', value: 'value1' },
                { text: '만기자수', value: 'value2' },
            ],
            list: [
                {
                    value1: '1/2',
                    value2: '100',
                },
            ],
            // 권종상세 리스트
            columns2: [
                { text: '만기일자', value: 'value1' },
                { text: '권종명', value: 'value2' },
                { text: '만기자수', value: 'value3' },
            ],
            list2: [
                {
                    value1: '1/4',
                    value2: '360스탠',
                    value3: '16',
                },
            ],
        };
    },
};
</script>
<style scoped></style>
