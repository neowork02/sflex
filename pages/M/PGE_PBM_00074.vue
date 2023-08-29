<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 담당자 정보 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="권종선택"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                    <ur-icon-button icon="search" icon-type="line" color="primary" @click="openModalP00074" />

                    <!-- ::S 공통 팝업 -->
                    <ur-modal ref="modalP00074" class="modal-b1c6" large dragable title="공통팝업" @closed="closed">
                        <template slot="title">
                            <div class="modal-title">권종선택</div>
                        </template>
                        <template>
                            <!-- <sui-page class="custom_page"> -->
                            <div class="modal-body">
                                <!-- ::S 콘텐츠1 -->
                                <ur-form-box toggleable>
                                    <ur-form-item
                                        class="flex_wrap"
                                        label="파크구분"
                                        :labelAlign="'right'"
                                        style="width: 50%; height: auto"
                                    >
                                        <ur-dropdown v-model="valueD1" :items="items168" />
                                    </ur-form-item>
                                    <ur-form-item
                                        class="flex_wrap"
                                        label="시간구분"
                                        :labelAlign="'right'"
                                        style="width: 50%; height: auto"
                                    >
                                        <ur-dropdown v-model="valueD1" :items="items3" />
                                    </ur-form-item>
                                    <ur-form-item
                                        class="flex_wrap"
                                        label="권종구분"
                                        :labelAlign="'right'"
                                        style="width: 50%; height: auto; border: 0"
                                    >
                                        <ur-dropdown v-model="valueD1" :items="items2" />
                                    </ur-form-item>
                                    <ur-form-item
                                        class="flex_wrap"
                                        label="권종코드"
                                        :labelAlign="'right'"
                                        style="width: 50%; height: auto"
                                    >
                                        <ur-text-field value="" style="width: 100%; height: auto" />
                                    </ur-form-item>
                                    <ur-form-item
                                        class="flex_wrap"
                                        label="권종명"
                                        :labelAlign="'right'"
                                        style="width: 100%; height: auto"
                                    >
                                        <ur-text-field value="" style="width: 100%; height: auto" />
                                    </ur-form-item>
                                </ur-form-box>
                                <div class="btn_wrap mt10">
                                    <div class="right_box">
                                        <ur-button>초기화</ur-button>
                                        <ur-button color="violet">조회</ur-button>
                                    </div>
                                </div>
                                <div class="comm_title_wrap mt10">
                                    <h4>권종 리스트</h4>
                                    <!--S:: 타이틀 오른쪽 total info -->
                                    <div class="right_box">
                                        <div class="totalNo">
                                            <div class="totalCt">Total<span>0</span>건</div>
                                            <!-- info: Total *건 -->
                                        </div>
                                    </div>
                                    <!--E:: 타이틀 오른쪽 total info -->
                                </div>
                                <ur-data-grid
                                    ref="grid"
                                    :headers="columnsP1T1"
                                    :data-source="listP1T174"
                                    :options="options"
                                    :data-set-options="{ id: 'id' }"
                                />
                                <!-- ::E 콘텐츠1 -->
                            </div>
                            <!-- </sui-page> -->
                        </template>
                        <template slot="action">
                            <ur-button>선택</ur-button>
                            <ur-button color="violet" @click="closeModal">닫기</ur-button>
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
<<<<<<< Updated upstream
            </div>
        </sui-page-contents>
    </sui-page>
=======
                <ur-data-grid
                  ref="grid"
                  :headers="columnsP1T1"
                  :data-source="listP1T174"
                  :options="options"
                  :data-set-options="{ id: 'id' }"
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
>>>>>>> Stashed changes
</template>
<script>
export default {
    name: 'PGE_PBM_00003', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            // 드롭다운
            valueD1: '1',
            valueD2: '1',
            valueD3: '1',

            options: {
                height: 280,
                rowHeight: 41,
                pagination: false,
                noInfo: true,
                multiSelect: true,
                selectCheck: true,
            },

            // 권종 리스트
            columnsP1T1: [
                { text: '코1드', value: 'value1' },
                { text: '권종명', value: 'value2' },
                { text: '기준단가', value: 'value3' },
            ],
            listP1T174: [
                {
                    value1: '3412065751',
                    value2: 'EL1연간신규362스탠다드대인',
                    value3: '290,000',
                },
            ],
        };
    },
    computed: {
        items168() {
            const items168Rtn = [];
            items168Rtn.push({ value: '1', text: '전체' });
            items168Rtn.push({ value: '2', text: 'E/L' });
            return items168Rtn;
        },
        items2() {
            const items2Rtn = [];
            items2Rtn.push({ value: '1', text: '레귤러' });
            items2Rtn.push({ value: '2', text: '셀렉트' });
            items2Rtn.push({ value: '3', text: '구독권' });
            items2Rtn.push({ value: '4', text: '시즌권' });
            items2Rtn.push({ value: '5', text: '기간권' });
            items2Rtn.push({ value: '6', text: '다회권' });
            return items2Rtn;
        },
        //modalPopUp
        modalP00074() {
            return this.$refs.modalP00074;
        },
    },
    methods: {
        openModalP00074() {
            this.modalP00074.open();
        },
        closeModal() {
            this.modalP00074.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
