<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="조회년도"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                    required
                >
                    <!-- <ur-date-picker autoConfirm input-type="YYYY-MM-DD" /> -->
                    <ur-year-picker autoConfirm />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>초기화</ur-button>
                    <ur-button color="violet">조회</ur-button>
                </div>
            </div>

            <!-- S::가용일계획+가용일관리+가용일 권종정보 관리 -->
            <div class="comm_shut_wrap mt30">
                <div class="inbox7">
                    <!-- S::Inner -->
                    <div class="inner">
                        <div class="inbox">
                            <!-- S::가용일계획 -->
                            <div class="comm_title_wrap">
                                <h4 class="pr10">가용일 계획</h4>
                                <ur-button color="violet">신규</ur-button>
                                <ur-button color="violet">저장</ur-button>
                                <ur-button color="violet">삭제</ur-button>
                            </div>
                            <ur-data-grid
                                ref="grid"
                                :headers="columns"
                                :data-source="list"
                                :data-set-options="{ id: 'id' }"
                                :options="options"
                            />
                            <!-- E::가용일계획 -->
                            <!-- S::가용일 계획관리 -->
                            <!-- <div class="comm_title_wrap mt20">
                <h4 class="pr10">가용일 계획관리</h4>
                <ur-button color="violet">신규</ur-button>
                <ur-button color="violet">저장</ur-button>
                <ur-button color="violet">삭제</ur-button>
              </div>
              <div class="board_list mt35">
                <table>
                  <caption></caption>
                  <colgroup>
                    <col width="20%" />
                    <col width="30%" />
                    <col width="20%" />
                    <col width="30%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>관리번호</th>
                      <td>
                        <ur-text-field
                          value=""
                          style="width: 100%; height: auto"
                          disabled
                        />
                      </td>
                      <th>적용년도</th>
                      <td>
                        <ur-text-field
                          value=""
                          style="width: 100%; height: auto"
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>가용계획명</th>
                      <td colspan="3">
                        <ur-text-field
                          value=""
                          style="width: 100%; height: auto"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>가용계획명</th>
                      <td colspan="3">
                        <textarea
                          rows="4"
                          maxlength="1000"
                          style="width: 100%"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div> -->
                            <!-- <div class="comm_title_wrap mt30">
                <h4 class="pr10">가용일 계획관리</h4>
                <ur-button color="violet">신규</ur-button>
                <ur-button color="violet">저장</ur-button>
                <ur-button color="violet">삭제</ur-button>
              </div> 
              <div class="comm_view_wrap mt10">
                <div class="row">
                  <div class="col-xs-2">관리번호</div>
                  <div class="col-xs-4">
                    <ur-text-field
                      value=""
                      style="width: 100%; height: auto"
                      readonly
                    />
                  </div>
                  <div class="col-xs-2">적용년도</div>
                  <div class="col-xs-4">
                    <ur-text-field
                      value=""
                      style="width: 100%; height: auto"
                      readonly
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-2 required-icon">가용계획명</div>
                  <div class="col-xs-10">
                    <ur-text-field value="" style="width: 100%; height: auto" />
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-2 required-icon">상세설명</div>
                  <div class="col-xs-10">
                    <textarea rows="4" maxlength="1000" style="width: 100%" />
                  </div>
                </div>
              </div>-->

                            <!-- E::가용일 계획관리 -->
                        </div>

                        <div class="emptybox" />
                        <div class="inbox">
                            <!-- S::가용일관리 -->
                            <div class="comm_title_wrap">
                                <h4 class="pr10">가용일 관리</h4>
                                <ur-button color="violet">저장</ur-button>
                                <!--S:: dropdown 오른쪽 -->
                                <div class="right_box">
                                    <ur-dropdown v-model="month" :items="items1" style="width: 200px" />
                                </div>
                                <!--E:: dropdown오른쪽 -->
                            </div>
                            <!-- <ur-form-box toggleable>
                <ur-form-item
                  class="flex_wrap"
                  label="라벨명(임시)"
                  :labelAlign="'right'"
                  style="width: 100%; height: auto; border: 0"
                >
                  <ur-dropdown v-model="modalP00050" :items="items1" />
                </ur-form-item>
              </ur-form-box> -->
                            <ur-data-grid
                                ref="grid"
                                :headers="columns2"
                                :data-source="list2"
                                :data-set-options="{ id: 'id' }"
                                :options="options1"
                                class="mt10"
                            />
                            <!-- <ur-data-grid
                ref="grid"
                :headers="columns3"
                :data-source="list3"
                :data-set-options="{ id: 'id' }"
                :options="options2"
                class="mt20"
              /> -->
                            <!-- [2023-04-06] 수정 -->

                            <!-- E::가용일관리 -->
                        </div>
                    </div>
                    <!-- E::Inner -->
                </div>
                <div class="emptybox" />
                <div class="inbox3">
                    <!-- S::가용일 권종정보 관리 -->
                    <div class="comm_title_wrap">
                        <h4 class="pr10">가용일 권종정보 관리</h4>
                        <ur-button color="violet">권종추가</ur-button>
                        <ur-button color="violet">행삭제</ur-button>
                        <ur-button color="violet">저장</ur-button>
                    </div>
                    <ur-data-grid
                        ref="grid"
                        :headers="columns4"
                        :data-source="list4"
                        :data-set-options="{ id: 'id' }"
                        :options="options3"
                    />
                    <!-- E::가용일 권종정보 관리 -->
                    <!-- S::board_list_type2 -->
                    <div class="board_list_type2 mt20">
                        <table>
                            <caption></caption>
                            <colgroup>
                                <col width="*" />
                                <col width="*" />
                                <col width="*" />
                                <col width="*" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>요일구분</th>
                                    <th>구분</th>
                                    <th>가용일</th>
                                    <th>비가용일</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td rowspan="2">평일</td>
                                    <!-- 왼쪽/오른쪽 정렬일 경우 td에 클래스 추가(기본설정 중앙정렬) : class="left"/class="right"/ -->
                                    <td>EL</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>CB</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td rowspan="2">일요일</td>
                                    <td>EL</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>CB</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td rowspan="2">공휴일</td>
                                    <td>EL</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>CB</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td rowspan="2">계</td>
                                    <td>EL</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>CB</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <!-- E::board_list_type2 -->
                    <!-- //[2023-04-06] 수정 -->
                </div>
            </div>
            <!-- E::가용일계획+가용일관리+가용일 권종정보 관리 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00051',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            // 드롭다운
            valueD1: '1',

            // 테이블
            options: {
                height: 629,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
            options1: {
                height: 629,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
            options2: {
                height: 270,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
            options3: {
                height: 238,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
            dateValue1: ['', ''],
            dateValue2: [''],

            // 가용일계획
            columns: [
                { text: '연도', value: 'value1', width: '120px' },
                { text: '가용계획명', value: 'value2' },
                { text: '상세설명', value: 'value3' },
            ],
            list: [
                {
                    value1: '2023',
                    value2: '가용계획 셀렉트',
                    value3: '',
                },
            ],
            // 가용일 관리 1
            columns2: [
                { text: '일자', value: 'value1', width: '150px' },
                { text: '요일구분', value: 'value2' },
                { text: 'E/L', value: 'value3' },
                { text: 'C/B', value: 'value4' },
            ],
            list2: [
                {
                    value1: '2022/01/01',
                    value2: '휴일',
                    value3: '',
                    value4: '',
                },
            ],
            // 가용일 관리 2
            columns3: [
                { text: '요일구분', value: 'value1' },
                { text: '가용일', value: 'value2' },
                { text: '비가용일', value: 'value3' },
            ],
            list3: [
                {
                    value1: '휴일',
                    value2: '20',
                    value3: '5',
                },
            ],

            //가용일 권종정보 관리
            columns4: [
                { text: '구분', value: 'value1' },
                { text: '권종코드', value: 'value2' },
                { text: '파크', value: 'value3' },
                { text: '시간', value: 'value4' },
                { text: '권종명', value: 'value5' },
            ],
            list4: [
                {
                    value1: '기간권',
                    value2: '1002065569',
                    value3: 'EL',
                    value4: '종일',
                    value5: 'EL 연간 평일권 소인',
                },
            ],
        };
    },
    computed: {
        items1() {
            const rtn = [];
            rtn.push({ value: '1', text: '전체' });
            return rtn;
        },
    },
};
</script>
<style scoped></style>
