<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 담당자 정보 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="샘플페이지"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                    <ur-icon-button icon="search" icon-type="line" color="primary" @click="openModalP00026" />

                    <!-- ::S 공통 팝업 -->
                    <ur-modal ref="modalP00026" class="modal-b1c6" large dragable title="공통팝업" @closed="closed">
                        <template slot="title">
                            <div class="modal-title mb45">지급쿠폰 조회</div>
                        </template>
                        <template>
                            <!-- <sui-page class="custom_page"> -->
                            <div class="modal-body">
                                <!-- ::S 콘텐츠1 -->

<<<<<<< Updated upstream
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
=======
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
            </div>
          </div>

          <!-- 일별 시설 운영 정보 Table-->
          <table class="date_table mb45">
            <!-- ********** 테이블 구조 파악 : tr 태그를 기준으로 접어서 구조 파악하기 권장 드립니다. **********-->

            <!-- S :: 일별 시설 운영 정보 테이블 헤더 영역-->
            <thead>
              <!-- 테이블 제목 1행 (요일,날짜)-->
              <tr>
                <th rowspan="3">시설명</th>
                <th>
                  <span class="day">일</span> <span class="date">11.20</span>
                </th>
                <th>
                  <span class="day">월</span> <span class="date">11.21</span>
                </th>
                <th>
                  <span class="day">화</span> <span class="date">11.22</span>
                </th>
                <th>
                  <span class="day">수</span> <span class="date">11.23</span>
                </th>
                <th>
                  <span class="day">목</span> <span class="date">11.24</span>
                </th>
                <th>
                  <span class="day">금</span> <span class="date">11.25</span>
                </th>
                <th>
                  <span class="day">토</span> <span class="date">11.26</span>
                </th>
              </tr>

              <!-- 테이블 제목 2행 (실내 시간)-->
              <tr>
                <th>
                  실내 <span class="start">10 : 00</span> ~
                  <span class="end">21 : 00</span>
                </th>
                <th>
                  실내 <span class="start">10 : 00</span> ~
                  <span class="end">21 : 00</span>
                </th>
                <th>
                  실내 <span class="start">10 : 00</span> ~
                  <span class="end">21 : 00</span>
                </th>
                <th>
                  실내 <span class="start">10 : 00</span> ~
                  <span class="end">21 : 00</span>
                </th>
                <th>
                  실내 <span class="start">10 : 00</span> ~
                  <span class="end">21 : 00</span>
                </th>
                <th>
                  실내 <span class="start">10 : 00</span> ~
                  <span class="end">21 : 00</span>
                </th>
                <th>
                  실내 <span class="start">10 : 00</span> ~
                  <span class="end">21 : 00</span>
                </th>
              </tr>

              <!-- 테이블 제목 3행 (실외 시간)-->
              <tr>
                <th>
                  실외 <span class="start">10 : 00</span> ~
                  <span class="end">21 : 00</span>
                </th>
                <th>
                  실외 <span class="start">10 : 00</span> ~
                  <span class="end">21 : 00</span>
                </th>
                <th>실외 휴장</th>
                <th>실외 휴장</th>
                <th>실외 휴장</th>
                <th>실외 휴장</th>
                <th>실외 휴장</th>
              </tr>
            </thead>
            <!-- E :: 일별 시설 운영 정보 테이블 헤더 영역-->

            <tbody>
              <!-- 실외 파도풀 -->
              <tr>
                <th>실외 파도풀</th>
                <!-- 실외 파도풀 1,2,3,4,5,6,7번째 셀 영역 ([운휴])-->
                <td colspan="7">
                  <div class="bg-purple">
                    <div>[운휴]</div>
                  </div>
                </td>
              </tr>

              <!-- 실외 다이빙풀 -->
              <tr>
                <th>실외 다이빙풀</th>
                <!-- 실외 다이빙풀 1,2,3,4,5,6,7번째 셀 영역 ([운휴])-->
                <td colspan="7">
                  <div class="bg-purple">
                    <div>[운휴]</div>
                  </div>
                </td>
              </tr>

              <!-- 메가스톰 -->
              <tr>
                <th>메가스톰</th>
                <td />
                <td />
                <td />
                <!-- 메가스톰 4,5,6,7번째 셀 영역 ([운휴])-->
                <td colspan="4">
                  <div class="bg-purple">
                    <div>[PM 점검]</div>
                  </div>
                </td>
              </tr>

              <!-- 튜브 라이드 -->
              <tr>
                <th>튜브 라이드</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>

              <!-- 워터 봅슬레이 -->
              <tr>
                <th>워터 봅슬레이</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <!-- 워터 봅슬레이 7번째 셀 영역 ([오전 점검] 13:00 ~)-->
                <td>
                  <div class="bg-purple">
                    <div>[오전 점검] 13:00 ~</div>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody>
              <!-- 실외 유수풀 -->
              <tr>
                <th>실외 유수풀</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>

              <!-- 어드벤처풀 -->
              <tr>
                <th>어드벤처풀</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>

              <!-- 미라클 스파 -->
              <tr>
                <th>미라클 스파</th>
                <td />
                <td />
                <td />
                <td />
                <!-- 미라클 스파 5번째 셀 영역 ([오전 점검] 13:00 ~)-->
                <td>
                  <div class="bg-primary-01">
                    <div>[오전 점검] 13:00 ~</div>
                  </div>
                </td>
                <td />
                <td />
              </tr>

              <!-- 서핑라이드 -->
              <tr>
                <th>서핑라이드</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <!-- 서핑라이드 6번째 셀 영역 ([오전 점검] 13:00 ~)-->
                <td>
                  <div class="bg-primary-01">
                    <div>[오전 점검] 13:00 ~</div>
                  </div>
                </td>
                <td />
              </tr>
            </tbody>
            <tbody>
              <!-- 와일드 리버 풀 -->
              <tr>
                <th>와일드 리버 풀</th>
                <td />
                <td />
                <td />
                <td />
                <!-- 와일드 리버 풀 5번째 셀 영역 ([오전 점검] 13:00 ~)-->
                <td>
                  <div class="bg-warning">
                    <div>[오전 점검] 13:00 ~</div>
                  </div>
                </td>
                <td />
                <td />
              </tr>

              <!-- 실외 키디풀 -->
              <tr>
                <th>실외 키디풀</th>
                <!-- 실외 키디풀 1,2,3,4,5,6,7번째 셀 영역 ([내용 없음]) -->
                <td colspan="7">
                  <div class="bg-warning">
                    <div>[내용 없음]</div>
                  </div>
                </td>
              </tr>

              <!-- 타워 부메랑고 -->
              <tr>
                <th>타워 부메랑고</th>
                <td />
                <td />
                <td />
                <!-- 타워 부메랑고 4번째 셀 영역 ([오전 점검] 13:00) -->
                <td>
                  <div class="bg-warning">
                    <div>[오전 점검] 13:00 ~</div>
                  </div>
                </td>
                <td />
                <td />
                <td />
              </tr>

              <!-- 타워 래프트 -->
              <tr>
                <th>타워 래프트</th>
                <!-- 타워 래프트 1,2,3,4,5,6,7번째 셀 영역 ([B조 오픈] 12:00 ~ 17:00) -->
                <td colspan="7">
                  <div class="bg-warning">
                    <div>[B조 오픈] 12:00 ~ 17:00</div>
                  </div>
                </td>
              </tr>

              <!-- 아쿠아 루프 -->
              <tr>
                <th>아쿠아 루프</th>
                <!-- 아쿠아 루프 2,3,4번째 셀 영역 ([일부 변경] 10:00 ~ 22:00) -->
                <td />
                <td colspan="3">
                  <div class="bg-warning">
                    <div>[일부 변경] 10:00 ~ 22:00</div>
                  </div>
                </td>
                <td />
                <td />
                <td />
              </tr>

              <!-- 와일드 블라스터 -->
              <tr>
                <th>와일드 블라스터</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>
            </tbody>
            <tbody>
              <!-- 바데풀 (실외) -->
              <tr>
                <th>바데풀 (실외)</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>

              <!-- 실내 유수풀 -->
              <tr>
                <th>실내 유수풀</th>
                <td />
                <td />
                <td />
                <td />
                <!-- 실내 유수풀 5,6,7번째 셀 영역 ([일부 변경] 10:00 ~ 22:00) -->
                <td colspan="3">
                  <div class="bg-danger">
                    <div>[일부 변경] 10:00 ~ 20:00</div>
                  </div>
                </td>
              </tr>

              <!-- 샌디풀 -->
              <tr>
                <th>샌디풀</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>

              <!-- 실내 어드벤처풀 -->
              <tr>
                <th>실내 어드벤처풀</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>

              <!-- 실내 다이빙풀 -->
              <tr>
                <th>실내 다이빙풀</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <!-- 실내 다이빙풀 7번째 셀 영역 ([오전 점검] 13:00 ~) -->
                <td>
                  <div class="bg-danger">
                    <div>[오전 점검] 13:00 ~</div>
                  </div>
                </td>
              </tr>

              <!-- 실내 파도풀 -->
              <tr>
                <th>실내 파도풀</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>

              <!-- 유아풀 -->
              <tr>
                <th>유아풀</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <!-- 유아풀 6번째 셀 영역 ([오전 점검] 13:00 ~) -->
                <td>
                  <div class="bg-danger">
                    <div>[오전 점검] 13:00 ~</div>
                  </div>
                </td>
                <td />
              </tr>

              <!-- 실내 카디풀 -->
              <tr>
                <th>실내 카디풀</th>
                <td />
                <td />
                <td />
                <!-- 실내 카디풀 4번째 셀 영역 ([오전 점검] 13:00 ~) -->
                <td>
                  <div class="bg-danger">
                    <div>[오전 점검] 13:00~</div>
                  </div>
                </td>
                <td />
                <td />
                <td />
              </tr>

              <!-- 스파 -->
              <tr>
                <th>스파</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>

              <!-- 사우나 -->
              <tr>
                <th>사우나</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>

              <!-- 풀사이드 슬라이드 -->
              <tr>
                <th>풀사이드 슬라이드</th>
                <!-- 풀사이드 슬라이드 1,2,3,4.5,6,7번째 셀 영역 ([일부 변경] 10:00 ~ 18:00) -->
                <td colspan="7">
                  <div class="bg-danger">
                    <div>[일부 변경] 10:00 ~ 18:00</div>
                  </div>
                </td>
              </tr>

              <!-- 퀵 라이드 -->
              <tr>
                <th>퀵 라이드</th>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>
            </tbody>
          </table>
        </ur-tab-content>
      </ur-tab-box>
    </sui-page-contents>
  </sui-page>
>>>>>>> Stashed changes
</template>
<script>
export default {
<<<<<<< Updated upstream
    name: 'PGE_PBM_00026', // eslint-disable-line vue/name-property-casing
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
            // 그리드 리스트
            columnsP1T1: [
                { text: '지급일자1', value: 'value1' },
                { text: '쿠폰코드4', value: 'value2' },
                { text: '쿠폰명2', value: 'value3' },
                { text: '유효기간5', value: 'value4' },
                { text: '상태3', value: 'value5' },
            ],
            listP1T1: [
                {
                    value1: '2023/02/17',
                    value2: '3921152485',
                    value3: '연간회원 할인(상품)',
                    value4: '2023/11/28',
                    value5: '만료',
                },
            ],
        };
=======
  name: "PGE_PBM_00026", // eslint-disable-line vue/name-property-casing
  components: {},
  data() {
    return {
      // 일별 시설 운영 통계 테이블 옵션
      opts1: {
        height: 233,
        pagination: true,
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
        styleBordered: true,
      },
      // 그리드 리스트
      columnsP1T1: [
        { text: "지급일자1", value: "value1" },
        { text: "쿠폰코드4", value: "value2" },
        { text: "쿠폰명2", value: "value3" },
        { text: "유효기간5", value: "value4" },
        { text: "상태3", value: "value5" },
      ],

      // 일별 시설 운영 통계 DATA
      list01: [
        {
          value1: "PM 점검",
          value2: "0",
          value3: "0",
          value4: "0",
          value5: "2",
          value6: "2",
          value7: "2",
          value8: "2",
        },
        {
          value1: "동계/공사/대관 운휴",
          value2: "1",
          value3: "1",
          value4: "1",
          value5: "1",
          value6: "1",
          value7: "1",
          value8: "1",
        },
        {
          value1: "2023/02/17",
          value2: "3921152485",
          value3: "연간회원 할인(상품)",
          value4: "2023/11/28",
          value5: "만료",
        },
      ],
    };
  },
  computed: {
    modalP00026() {
      return this.$refs.modalP00026;
>>>>>>> Stashed changes
    },
    computed: {
        modalP00026() {
            return this.$refs.modalP00026;
        },
    },
    methods: {
        openModalP00026() {
            this.modalP00026.open();
        },
        closeModal() {
            this.modalP00026.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
