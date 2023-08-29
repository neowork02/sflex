<template>
  <sui-page class="custom_page">
    <sui-page-header2 :pageId="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="영수증번호"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-text-field value="" style="width: 100%" />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="결제일자"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-dropdown v-model="valueD1" :items="items1Info" />
          <ur-icon-button icon="search" />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="라벨명(임시)"
          :labelAlign="'right'"
          style="width: 100%; height: auto"
        >
          <div class="radioForm">
            <ur-radio v-model="v1" value="Radio 00034_01" sm>성명</ur-radio>
            <ur-radio v-model="v1" value="Radio 00034_02" sm>휴대폰 </ur-radio>
            <ur-radio v-model="v1" value="Radio 00034_03" sm
              >정기권번호</ur-radio
            >
          </div>
          <ur-text-field value="" class="pl16" />
          <ur-icon-button icon="search" />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button>초기화</ur-button>
          <ur-button color="violet">조회</ur-button>
        </div>
      </div>

      <!-- S::영수증번호+결제정보 -->
      <div class="comm_shut_wrap mt25">
        <div class="inbox3">
          <div class="comm_title_wrap">
            <h4 class="pr10">영수증번호</h4>
          </div>
          <ur-data-grid
            ref="grid"
            :headers="columns1"
            :data-source="list1"
            :data-set-options="{ id: 'id' }"
            :options="options1"
            :labelAlign="'right'"
          />
          <!-- <div ref="viewerArea" class="img_box" style="height: 500px">
            20221227C100V38010800001
          </div> -->
        </div>
        <div class="emptybox" />
        <div class="inbox7">
          <div class="comm_title_wrap">
            <h4 class="pr10">결제정보</h4>
          </div>
          <ur-form-box toggleable>
            <ur-form-item
              label="영수증번호"
              class="flex_wrap"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                value="20221227C100V38010800001"
                style="width: 50%; height: auto"
                readonly
              />
              <ur-text-field
                value="현금영수증승인 : N"
                style="width: 50%; height: auto"
                readonly
              />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="결제자 정보"
              :labelAlign="'right'"
              style="width: 50%; height: auto; border: 0"
            >
              <ur-text-field value="" />
              <ur-icon-button icon="search" style="padding-top: 0px" />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="POS ID"
              :labelAlign="'right'"
              style="width: 50%; height: auto; border: 0"
            >
              <ur-text-field
                value="C100V380108"
                style="width: 100%; height: auto"
                readonly
              />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="파크구분"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                value="EL"
                style="width: 100%; height: auto"
                readonly
              />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="POS 명"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                value="연간회원 매출-08이상현"
                style="width: 100%; height: auto"
                readonly
              />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="대인"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                value="1"
                style="width: 10%; height: auto"
                readonly
              />
              <ur-text-field
                value="420,000"
                style="width: 90%; height: auto"
                readonly
              />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="예약구분"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                value=""
                style="width: 100%; height: auto"
                readonly
              />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="판매일시"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                value="2022/12/27 08:34:34"
                style="width: 100%; height: auto"
                readonly
              />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="소인"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                value="0"
                style="width: 10%; height: auto"
                readonly
              />
              <ur-text-field
                value="0"
                style="width: 90%; height: auto"
                readonly
              />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="예약번호"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                value=""
                style="width: 100%; height: auto"
                readonly
              />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="판매구분"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                value="일반"
                style="width: 100%; height: auto"
                readonly
              />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="경로"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                value="0"
                style="width: 10%; height: auto"
                readonly
              />
              <ur-text-field
                value="0"
                style="width: 90%; height: auto"
                readonly
              />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="외상자명"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                value=""
                style="width: 100%; height: auto"
                readonly
              />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="판매액"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                value="420,000"
                style="width: 100%; height: auto"
                readonly
              />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="장애우"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                value="0"
                style="width: 10%; height: auto"
                readonly
              />
              <ur-text-field
                value="0"
                style="width: 90%; height: auto"
                readonly
              />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="사원번호"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                value="420,000"
                style="width: 100%; height: auto"
                readonly
              />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="부가세액"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                value="38,182"
                style="width: 100%; height: auto"
                readonly
              />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="순매출액"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                value="381,818"
                style="width: 100%; height: auto"
                readonly
              />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="예수금액"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                value="91,000"
                style="width: 100%; height: auto"
                readonly
              />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="총인원"
              :labelAlign="'right'"
              style="width: 50%; height: auto"
            >
              <ur-text-field
                value="1"
                style="width: 100%; height: auto"
                readonly
              />
            </ur-form-item>
            <ur-form-item
              class="flex_wrap"
              label="사유"
              :labelAlign="'right'"
              style="width: 100%; height: auto"
            >
              <textarea
                rows="2"
                maxlength="1000"
                style="width: 100%"
                readonly
              />
            </ur-form-item>
          </ur-form-box>
        </div>
      </div>
      <!-- E::영수증번호+결제정보 -->

      <!-- S::결제수단 -->
      <div class="comm_title_wrap mt20">
        <h4 class="pr10">결제수단</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="현금"
          :labelAlign="'right'"
          style="width: 33.3%; height: auto"
        >
          <ur-text-field value="0" style="width: 10%; height: auto" readonly />
          <ur-text-field value="0" style="width: 90%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          label="신용카드"
          class="flex_wrap"
          :labelAlign="'right'"
          style="width: 33.3%; height: auto"
        >
          <ur-text-field value="1" style="width: 10%; height: auto" readonly />
          <ur-text-field
            value="420,000"
            style="width: 90%; height: auto"
            readonly
          />
        </ur-form-item>
        <ur-form-item
          label="상품권"
          class="flex_wrap borNone"
          :labelAlign="'right'"
          style="width: 33.3%; height: auto"
        >
          <ur-text-field value="0" style="width: 10%; height: auto" readonly />
          <ur-text-field value="0" style="width: 90%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          label="멤버십포인트"
          class="flex_wrap"
          :labelAlign="'right'"
          style="width: 33.3%; height: auto"
        >
          <ur-text-field value="0" style="width: 10%; height: auto" readonly />
          <ur-text-field value="0" style="width: 90%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          label="티켓"
          class="flex_wrap"
          :labelAlign="'right'"
          style="width: 33.3%; height: auto"
        >
          <ur-text-field value="0" style="width: 10%; height: auto" readonly />
          <ur-text-field value="0" style="width: 90%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          label="웹"
          class="flex_wrap"
          :labelAlign="'right'"
          style="width: 33.3%; height: auto"
        >
          <ur-text-field value="0" style="width: 10%; height: auto" readonly />
          <ur-text-field value="0" style="width: 90%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          label="기프트카드"
          class="flex_wrap"
          :labelAlign="'right'"
          style="width: 33.3%; height: auto"
        >
          <ur-text-field value="0" style="width: 10%; height: auto" readonly />
          <ur-text-field value="0" style="width: 90%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          label="외상"
          class="flex_wrap"
          :labelAlign="'right'"
          style="width: 33.3%; height: auto"
        >
          <ur-text-field value="0" style="width: 10%; height: auto" readonly />
          <ur-text-field value="0" style="width: 90%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          label="총계"
          class="flex_wrap"
          :labelAlign="'right'"
          style="width: 33.3%; height: auto"
        >
          <ur-text-field
            value="420,000"
            style="width: 100%; height: auto"
            readonly
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E::결제수단 -->

      <!-- S::정기권 정보 -->
      <div class="comm_title_wrap mt40">
        <h4>정기권 정보</h4>
        <!--S:: 타이틀 오른쪽 total info -->
        <div class="right_box">
          <div class="totalNo">
            <div class="totalCt">Total<span>21</span>건</div>
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
      <!-- E::정기권 정보 -->

      <!-- S::tab -->
      <ur-tab-box class="mt45">
        <ur-tab-content :idx="1" label="권종">
          <template>
            <div class="comm_title_wrap mt10">
              <h4>권종</h4>
              <!--S:: 타이틀 오른쪽 total info -->
              <div class="right_box">
                <div class="totalNo">
                  <div class="totalCt">Total<span>0</span>건</div>
                </div>
              </div>
              <!--E:: 타이틀 오른쪽 total info -->
            </div>
            <ur-data-grid
              ref="grid"
              :headers="columns2"
              :data-source="list2"
              :data-set-options="{ id: 'id' }"
              :options="options"
            />
          </template>
        </ur-tab-content>
        <ur-tab-content :idx="2" label="신용카드">
          <template>
            <div class="comm_title_wrap mt10">
              <h4>신용카드</h4>
              <!--S:: 타이틀 오른쪽 total info -->
              <div class="right_box">
                <div class="totalNo">
                  <div class="totalCt">Total<span>1</span>건</div>
                </div>
              </div>
              <!--E:: 타이틀 오른쪽 total info -->
            </div>
            <ur-data-grid
              ref="grid"
              :headers="columns3"
              :data-source="list3"
              :data-set-options="{ id: 'id' }"
              :options="options"
            />
          </template>
        </ur-tab-content>
        <ur-tab-content :idx="3" label="현금영수증">
          <template>
            <div class="comm_title_wrap mt10">
              <h4>현금영수증</h4>
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
              :headers="columns4"
              :data-source="list4"
              :data-set-options="{ id: 'id' }"
              :options="options"
            />
          </template>
        </ur-tab-content>
        <ur-tab-content :idx="4" label="상품권">
          <template>
            <div class="comm_title_wrap mt10">
              <h4>상품권</h4>
              <!--S:: 타이틀 오른쪽 total info -->
              <div class="right_box">
                <div class="totalNo">
                  <div class="totalCt">Total<span>3</span>건</div>
                </div>
              </div>
              <!--E:: 타이틀 오른쪽 total info -->
            </div>
            <ur-data-grid
              ref="grid"
              :headers="columns5"
              :data-source="list5"
              :data-set-options="{ id: 'id' }"
              :options="options"
            />
          </template>
        </ur-tab-content>
        <ur-tab-content :idx="5" label="환불">
          <template>
            <div class="comm_title_wrap mt10">
              <h4>환불</h4>
              <!--S:: 타이틀 오른쪽 total info -->
              <div class="right_box">
                <div class="totalNo">
                  <div class="totalCt">Total<span>4</span>건</div>
                </div>
              </div>
              <!--E:: 타이틀 오른쪽 total info -->
            </div>
            <ur-data-grid
              ref="grid"
              :headers="columns9"
              :data-source="list9"
              :data-set-options="{ id: 'id' }"
              :options="options"
            />
          </template>
        </ur-tab-content>
        <ur-tab-content :idx="6" label="승인기록">
          <template>
            <div class="comm_title_wrap mt10">
              <h4>승인기록</h4>
              <!--S:: 타이틀 오른쪽 total info -->
              <div class="right_box">
                <div class="totalNo">
                  <div class="totalCt">Total<span>5</span>건</div>
                </div>
              </div>
              <!--E:: 타이틀 오른쪽 total info -->
            </div>
            <ur-data-grid
              ref="grid"
              :headers="columns6"
              :data-source="list6"
              :data-set-options="{ id: 'id' }"
              :options="options"
            />
          </template>
        </ur-tab-content>
        <ur-tab-content :idx="7" label="일모포인트">
          <template>
            <div class="comm_title_wrap mt10">
              <h4>일모포인트</h4>
              <!--S:: 타이틀 오른쪽 total info -->
              <div class="right_box">
                <div class="totalNo">
                  <div class="totalCt">Total<span>6</span>건</div>
                </div>
              </div>
              <!--E:: 타이틀 오른쪽 total info -->
            </div>
            <ur-data-grid
              ref="grid"
              :headers="columns7"
              :data-source="list7"
              :data-set-options="{ id: 'id' }"
              :options="options"
            />
          </template>
        </ur-tab-content>
        <ur-tab-content :idx="8" label="기프트카드">
          <template>
            <div class="comm_title_wrap mt10">
              <h4>기프트카드</h4>
              <!--S:: 타이틀 오른쪽 total info -->
              <div class="right_box">
                <div class="totalNo">
                  <div class="totalCt">Total<span>7</span>건</div>
                </div>
              </div>
              <!--E:: 타이틀 오른쪽 total info -->
            </div>
            <ur-data-grid
              ref="grid"
              :headers="columns8"
              :data-source="list8"
              :data-set-options="{ id: 'id' }"
              :options="options"
            />
          </template>
        </ur-tab-content>
      </ur-tab-box>
      <!-- E::tab -->

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_PBM_00034",
  components: {}, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      // 라디오 버튼
      value: null,
      v1: "Radio 00034_01",

      // 테이블
      options: {
        height: 200,
        rowHeight: 41,
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      options1: {
        height: 475,
        rowHeight: 41,
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      // 정기권 정보
      columns: [
        { text: "정기권번호", value: "value1" },
        { text: "결제자", value: "value2" },
        { text: "권종명", value: "value3" },
        { text: "할인유형", value: "value4", width: "100px" },
        { text: "인원유형", value: "value5", width: "100px" },
        { text: "가입일수", value: "value6", width: "100px" },
        { text: "가입일자", value: "value7", width: "100px" },
        { text: "만기일자", value: "value8", width: "100px" },
        { text: "발급일자", value: "value9", width: "100px" },
        { text: "발급구분", value: "value10", width: "100px" },
        { text: "상태", value: "value11", width: "100px" },
      ],
      list: [
        {
          value1: "2022153940",
          value2: "연길동",
          value3: "EL연간신규레귤러플러스대인",
          value4: "",
          value5: "대인",
          value6: "0",
          value7: "2022/12/20",
          value8: "2024/01/01",
          value9: "2023/01/01",
          value10: "신규",
          value11: "선가입",
        },
      ],
      // 영수증 번호
      columns1: [{ text: "영수증번호", value: "value1" }],
      list1: [
        {
          value1: "20221227C100V38010800001",
        },
      ],
      // 권종
      columns2: [
        { text: "권종명", value: "value1" },
        { text: "인원수", value: "value2" },
        { text: "결제총액", value: "value3" },
        { text: "대인수", value: "value4", width: "100px" },
        { text: "소인수", value: "value5", width: "100px" },
        { text: "경로수", value: "value6", width: "100px" },
        { text: "장애우수", value: "value7", width: "100px" },
        { text: "대인단가", value: "value8", width: "100px" },
        { text: "소인단가", value: "value9", width: "100px" },
        { text: "경로단가", value: "value10", width: "100px" },
        { text: "장애우단가", value: "value11", width: "100px" },
      ],
      list2: [
        {
          value1: "EL연간신규레귤러플러스대인",
          value2: "1",
          value3: "420,000",
          value4: "1",
          value5: "0",
          value6: "0",
          value7: "0",
          value8: "420,000",
          value9: "0",
          value10: "0",
          value11: "0",
        },
      ],

      // 신용카드
      columns3: [
        { text: "서명", value: "value1" },
        { text: "신용카드번호", value: "value2" },
        { text: "신용카드사", value: "value3" },
        { text: "승인일자", value: "value4" },
        { text: "승인시각", value: "value5" },
        { text: "승인번호", value: "value6" },
        { text: "VAN사", value: "value7" },
        { text: "유효기간", value: "value8" },
        { text: "할인", value: "value9" },
        { text: "승인금액", value: "value10" },
        { text: "카드서비스명", value: "value11" },
        { text: "취소일자", value: "value12" },
        { text: "취소시각", value: "value13" },
        { text: "취소승인번호", value: "value14" },
      ],

      list3: [
        {
          value1: "",
          value2: "7975**********791",
          value3: "현대카드",
          value4: "2022/12/27",
          value5: "08:34:21",
          value6: "99083421",
          value7: "KICC",
          value8: "**/**",
          value9: "0",
          value10: "420,000",
          value11: "",
          value12: "",
          value13: "",
          value14: "",
        },
      ],
      // 현금영수증
      columns4: [
        { text: "신용카드번호", value: "value1" },
        { text: "신용카드사", value: "value2" },
        { text: "승인일자", value: "value3" },
        { text: "승인시각", value: "value4" },
        { text: "승인번호", value: "value5" },
        { text: "VAN사", value: "value6" },
        { text: "유효기간", value: "value7" },
        { text: "할인", value: "value8" },
        { text: "승인금액", value: "value9" },
        { text: "카드서비스명", value: "value10" },
        { text: "취소일자", value: "value11" },
        { text: "취소시각", value: "value12" },
        { text: "취소승인번호", value: "value13" },
      ],
      list4: [
        {
          value1: "5450**********550",
          value2: "BC카드",
          value3: "2022/12/30",
          value4: "08:34:21",
          value5: "99083421",
          value6: "KICC",
          value7: "**/**",
          value8: "0",
          value9: "420,000",
          value10: "",
          value11: "",
          value12: "",
          value13: "",
        },
      ],
      // 상품권
      columns5: [
        { text: "상품권발행사", value: "value1" },
        { text: "상품권번호", value: "value2" },
        { text: "액면금액", value: "value3" },
        { text: "결제금금액", value: "value4" },
      ],
      list5: [
        {
          value1: "",
          value2: "78088756",
          value3: "120,000",
          value4: "375,000",
        },
      ],
      // 승인기록
      columns6: [
        { text: "승인일자", value: "value1" },
        { text: "승인시각", value: "value2" },
        { text: "신용카드번호", value: "value3" },
        { text: "카드사코드", value: "value4" },
        { text: "전문ID", value: "value5" },
        { text: "전문구분", value: "value6" },
        { text: "포스ID", value: "value7" },
        { text: "터미널ID구분", value: "value8" },
        { text: "신용카드/수표구분", value: "value9" },
        { text: "WCC", value: "value10" },
        { text: "카드DATA길이", value: "value11" },
        { text: "카드DATA", value: "value12" },
        { text: "할부개월", value: "value13" },
      ],
      list6: [
        {
          value1: "2022/12/25",
          value2: "08:34:21",
          value3: "2587**********3415",
          value4: "삼성카드",
          value5: "삼성,제휴(삼성,애니체크,애니승인)",
          value6: "1",
          value7: "C100V380108",
          value8: "기본",
          value9: "카드",
          value10: "1",
          value11: "38",
          value12: "54508900****550*",
          value13: "일시불",
        },
      ],
      // 일모포인트
      columns7: [
        { text: "일자", value: "value1" },
        { text: "포스번호", value: "value2" },
        { text: "영수증번호", value: "value3" },
        { text: "일련번호", value: "value4" },
        { text: "판매구분", value: "value5" },
        { text: "승인번호", value: "value6" },
        { text: "일모카드번호", value: "value7" },
        { text: "포인트", value: "value8" },
        { text: "처리후 포인트", value: "value9" },
        { text: "OTC번호", value: "value10" },
        { text: "소속", value: "value11" },
        { text: "성함", value: "value12" },
        { text: "사번", value: "value13" },
        { text: "일시", value: "value14" },
      ],
      list7: [
        {
          value1: "2022/12/28",
          value2: "100V380108",
          value3: "54505501",
          value4: "",
          value5: "",
          value6: "",
          value7: "C100V380108",
          value8: "",
          value9: "",
          value10: "",
          value11: "",
          value12: "",
          value13: "",
        },
      ],
      // 기프트카드
      columns8: [
        { text: "기프트카드 번호", value: "value1" },
        { text: "판매구분", value: "value2" },
        { text: "사용금액", value: "value3" },
        { text: "취소금액", value: "value4" },
        { text: "위약금", value: "value5" },
      ],
      list8: [
        {
          value1: "5450**********550",
          value2: "",
          value3: "200,000",
          value4: "150,000",
          value5: "10,000",
        },
      ],
      // 환불
      columns9: [
        { text: "카드번호", value: "value1" },
        { text: "정기권번호", value: "value2" },
        { text: "환불일자", value: "value3" },
        { text: "이용기간", value: "value4" },
        { text: "사용기간", value: "value5" },
        { text: "실사용기간", value: "value6" },
        { text: "잔여기간", value: "value7" },
        { text: "티켓명", value: "value8" },
        { text: "위약금", value: "value9" },
        { text: "이용금액", value: "value10" },
        { text: "이용횟수", value: "value11" },
        { text: "환불기준금액", value: "value12" },
        { text: "취소승인번호", value: "value13" },
      ],
      list9: [
        {
          value1: "4571**********725",
          value2: "217V380108",
          value3: "2022/11/19",
          value4: "10개월",
          value5: "10개월",
          value6: "9개월",
          value7: "3개월",
          value8: "",
          value9: "25,000",
          value10: "110,000",
          value11: "5",
          value12: "55,000",
          value13: "",
        },
      ],
    };
  },
  computed: {
    items1Info() {
      const items1Info = [];
      items1Info.push({ value: "1", text: "2022/12/29" });
      items1Info.push({ value: "2", text: "2022/12/15" });
      items1Info.push({ value: "3", text: "2022/11/12" });
      items1Info.push({ value: "4", text: "2022/09/25" });
      items1Info.push({ value: "5", text: "2022/09/08" });
      return items1Info;
    },
  },
};
</script>
<style scoped></style>
