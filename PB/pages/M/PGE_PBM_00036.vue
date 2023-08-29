<template>
  <sui-page class="custom_page">
    <sui-page-header2 :pageId="this.$options.name" />
    <sui-page-contents>
      <!-- S::컨텐츠1 -->
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="승인일자"
          required
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-date-picker autoConfirm input-type="YYYY-MM-DD" />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="카드번호"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap borTop"
          label="승인번호"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap borTop"
          label="승인구분"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <div class="radioForm">
            <ur-radio v-model="v1" value="Radio 00036_01" sm>전체</ur-radio>
            <ur-radio v-model="v1" value="Radio 00036_02" sm>승인</ur-radio>
            <ur-radio v-model="v1" value="Radio 00036_03" sm>승인취소</ur-radio>
          </div>
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button>초기화</ur-button>
          <ur-button color="violet">조회</ur-button>
        </div>
      </div>
      <!-- E::컨텐츠1-->

      <!-- S::컨텐츠2 -->
      <div class="comm_title_wrap mt35">
<<<<<<< Updated upstream
        <h4>신용카드 조회</h4>
        <!--S:: 타이틀 오른쪽 total info -->
        <div class="right_box">
          <div class="totalNo">
            <div class="totalCt">Total<span>22</span>건</div>
          </div>
        </div>
        <!--E:: 타이틀 오른쪽 total info -->
=======
        <h4>정기권정보</h4>
>>>>>>> Stashed changes
      </div>
      <ur-data-grid
        ref="grid"
        :headers="columns"
        :data-source="list"
        :options="options1"
        :data-set-options="{ id: 'id' }"
      >
      </ur-data-grid>
      <!-- E::컨텐츠2-->

      <!-- S::컨텐츠3:승인기록 -->
      <div class="comm_title_wrap mt40">
        <h4>승인기록</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="승인일자"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-date-picker autoConfirm input-type="YYYY-MM-DD" disabled />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="승인시간"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-time-picker v-model="value3" mode="text" disabled />
          <!-- ur-time-picker: dropdown 일 경우 -->
          <!-- <ur-time-picker
            v-model="valuetime1"
            one-input-mode
            mode="dropdown"
            term="60"
            disabled
          /> -->
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="카드번호"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="카드사코드"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="전문ID"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="전문구분"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="POS ID"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="터미널ID구분"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="승인구분"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="WCC"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="카드Data길이"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="승인금액"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="할부개월"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="봉사료"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="부가세"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="승인번호"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="비밀번호"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="수신전문구분"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="응답코드"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="승인응답메세지"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="승인VAN사구분"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="승인IP"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="승인담당자명"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="수신전문POS ID"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="본인사용여부"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="동반인수"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="전자서명여부"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="전자사인데이터"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-button color="violet">확인</ur-button>
        </ur-form-item>
      </ur-form-box>
      <!-- E::컨텐츠3:승인기록 -->

      <!-- S::컨텐츠4:취소기록 -->
      <div class="comm_title_wrap mt40">
        <h4>취소기록</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="취소일자"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-date-picker autoConfirm input-type="YYYY-MM-DD" disabled />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="취소시간"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-time-picker
            v-model="value3"
            mode="text"
            disabled
          /><!-- ur-time-picker: dropdown 일 경우 -->
          <!-- <ur-time-picker
            v-model="valuetime1"
            one-input-mode
            mode="dropdown"
            term="60"
            disabled
          /> -->
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="카드번호"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="카드사코드"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="송신전문ID"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="송신전문구분"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="송신POS ID"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="송신터미널ID구분"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="송신승인구분"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="송신WCC"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="송신Data길이"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="송신취소금액"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="할부개월"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="봉사료"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="부가세"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="승인번호"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="송신비밀번호"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="수신전문구분"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="수신응답코드"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="승인응답메세지"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="송신VAN사구분"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="취소IP"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="취소담당자명"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="수신승인번호"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="원거래승인일자"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-date-picker autoConfirm input-type="YYYY-MM-DD" disabled />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="원거래승인시간"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-time-picker
            v-model="value3"
            mode="text"
            disabled
          /><!-- ur-time-picker: dropdown 일 경우 -->
          <!-- <ur-time-picker
            v-model="valuetime1"
            one-input-mode
            mode="dropdown"
            term="60"
            disabled
          /> -->
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="수신시도횟수"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="송신시도횟수"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
      </ur-form-box>
      <!-- E::컨텐츠4:취소기록 -->

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: "PGE_PBM_00036", // eslint-disable-line vue/name-property-casing
  components: {},
  data() {
    return {
      //Time Picker
      value3: "11:10",
      //드롭다운
      valueD1: "1",

      // 라디오 버튼
      v1: "Radio 00036_01",

      value: null,

      // 테이블
      options1: {
        height: 200,
        rowHeight: 41,
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      // 신용카드 조회
      columns: [
        { text: "승인일자", value: "value1", width: "150px" },
        { text: "승인시간", value: "value2", width: "120px" },
        { text: "취소일자", value: "value3" },
        { text: "취소시간", value: "value4" },
        { text: "승인구분", value: "value5" },
        { text: "승인번호", value: "value6" },
        { text: "결제금액", value: "value7" },
        { text: "카드번호", value: "value8" },
        { text: "영수증번호", value: "value9" },
        { text: "POS ID", value: "value10" },
        { text: "담당자명", value: "value11" },
      ],
      list: [
        {
          value1: "2023/04/09",
          value2: "13:20:37",
          value3: "2023/04/11",
          value4: "10:39:12",
          value5: "",
          value6: "98756521",
          value7: "198,000",
          value8: "9578-**50-45**-9876",
          value9: "5667895313",
          value10: "admin",
          value11: "정구길동",
        },
      ],
    };
  },
  created() {},
  computed: {
    itemsD1() {
      const itemsD1 = [];
      itemsD1.push({ value: "1", text: "전체" });
      return itemsD1;
    },
  },
};
</script>
<style scoped>
.custom_page .ur-form-item:nth-child(2) + .ur-form-item,
.custom_page .ur-form-item:nth-child(3) + .ur-form-item {
  border-top: none;
}
</style>
