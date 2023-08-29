<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
                <ur-form-item class="flex_wrap" label="가입구분" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-dropdown v-model="valueD1" :items="items1" />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="권종구분" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-dropdown v-model="valueD1" :items="items2" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap borTop"
                    label="권종명"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap borTop"
                    label="권종코드"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                </ur-form-item>
            </ur-form-box>

            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>초기화</ur-button>
                    <ur-button>조회</ur-button>
                    <ur-button>저장</ur-button>
                    <ur-button color="violet">엑셀다운로드</ur-button>
                    <!-- 엑셀다운로드 버튼 -->
                </div>
            </div>

<<<<<<< Updated upstream
            <div class="comm_title_wrap mt25">
                <h4>권종 리스트</h4>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">Total<span>5</span>건</div>
                    </div>
                </div>
                <!--E:: 타이틀 오른쪽 total info -->
            </div>
            <!-- S::컨텐츠1 -->
            <ur-data-grid
                ref="grid"
                :headers="columns"
                :data-source="list"
                :data-set-options="{ id: 'id' }"
                :options="options"
            />
            <!-- E::컨텐츠1-->
=======
      <div class="comm_title_wrap mt25">
        <h4>권종 리스트</h4>
        <!--S:: 타이틀 오른쪽 total info -->
        <div class="right_box">
          <div class="totalNo">
<<<<<<< Updated upstream
            <div class="totalCt">Total<span>5</span>건</div>
          </div>
        </div>
        <!--E:: 타이틀 오른쪽 total info -->
=======
            <div class="totalCt">Total<span>0</span>건</div>
            <!-- info: Total *건 -->
          </div>
        </div>
        <!--E::: 타이틀 오른쪽 total info -->
>>>>>>> Stashed changes
      </div>
      <!-- S::컨텐츠1 -->
      <ur-data-grid
        ref="grid"
        :headers="columns"
        :data-source="list"
        :data-set-options="{ id: 'id' }"
        :options="options"
      />
      <!-- E::컨텐츠1-->
>>>>>>> Stashed changes

            <!-- S::컨텐츠2:권종 기본정보 -->
            <div class="comm_title_wrap mt45">
                <h4 class="pr10">권종 기본정보</h4>
                <div class="title_compo">
                    <span class="infoTxt">* 변경 필요시 POPS, SRM에서 품목정보 변경</span>
                </div>
            </div>
            <ur-form-box toggleable>
                <ur-form-item class="flex_wrap" label="파크구분" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-text-field value="E/L" style="width: 100%; height: auto" disabled />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="권종명" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-text-field value="EL연간신규365스탠다드대인" style="width: 100%; height: auto" disabled />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap borTop"
                    label="권종코드"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field value="10065751" style="width: 100%; height: auto" disabled />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap borTop"
                    label="인원구분"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field value="대인" style="width: 100%; height: auto" disabled />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="가입구분" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-text-field value="신규" style="width: 100%; height: auto" disabled />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="정상가" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-text-field value="290,000" style="width: 100%; height: auto" disabled />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="매출구분" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-text-field value="개인회원" style="width: 100%; height: auto" disabled />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="앱 권종색상"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="적용일" :labelAlign="'right'" style="width: 50%; height: auto">
                    <!-- <ur-range-picker v-model="dateValue1" init="today" /> -->
                    <ur-range-picker autoConfirm input-type="YYYY-MM-DD" init="day+30" disabled />
                </ur-form-item>
            </ur-form-box>
            <!-- E::컨텐츠2:권종 기본정보 -->

            <!-- S::컨텐츠3:가입구분 -->
            <div class="comm_title_wrap mt45">
                <h4 class="pr10">가입구분</h4>
                <div class="title_compo">
                    <span class="infoTxt">* 셀렉트, 횟수권는 가용일 설정 필수</span>
                </div>
            </div>
            <ur-form-box toggleable>
                <ur-form-item class="flex_wrap" label="권종구분" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-dropdown v-model="valueD1" :items="items2" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="사용가용일"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                    <!-- <ur-date-picker autoConfirm input-type="YYYY-MM-DD" /> -->
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="만기연장일"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                    <!-- <ur-date-picker autoConfirm input-type="YYYY-MM-DD" /> -->
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap borTop"
                    label="환불여부"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-dropdown v-model="valueD1" :items="items7Info" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="위약금 적용기간"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" class="pr5" />일
                    <!-- <ur-dropdown v-model="valueD1" :items="items8Info" /> -->
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="시간설정" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-dropdown v-model="valueD1" :items="items12Info" />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="판매여부" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-dropdown v-model="valueD1" :items="items6Info" />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="가입기간" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-text-field value="" style="width: 100%; height: auto" />
                    <!-- <ur-dropdown v-model="valueD1" :items="items16Info" /> -->
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="가입기간일수"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" class="pr5" />일
                    <!-- <ur-dropdown v-model="valueD1" :items="items16Info" /> -->
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="선가입여부"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-dropdown v-model="valueD1" :items="items16Info" />
                </ur-form-item>
                <!-- <ur-form-item
          class="flex_wrap"
          label="동일권종 선가입 여부"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-dropdown v-model="valueD1" :items="items16Info" />
        </ur-form-item> -->
                <ur-form-item class="flex_wrap" label="정렬순서" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-text-field value="" style="width: 100%; height: auto" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="일분할여부"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-dropdown v-model="valueD1" :items="items10Info" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="일분할 기간구분"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-dropdown v-model="valueD1" :items="items11Info" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="일분할기간"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                </ur-form-item>
                <!-- <ur-form-item
          class="flex_wrap"
          label="연차적용"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-dropdown v-model="valueD1" :items="items3Info" />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="연차혜택"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-dropdown v-model="valueD1" :items="items4Info" />
        </ur-form-item> -->
                <!-- <ur-form-item
          class="flex_wrap"
          label="재가입혜택"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-dropdown v-model="valueD1" :items="items5Info" />
        </ur-form-item>
       <ur-form-item
          class="flex_wrap"
          label="권종상향여부"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-dropdown v-model="valueD1" :items="items9Info" />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="가입기간포함여부"
          :labelAlign="'right'"
          style="width: 25%; height: auto"
        >
          <ur-dropdown v-model="valueD1" :items="items16Info" />
        </ur-form-item> -->
            </ur-form-box>
            <!-- E::컨텐츠3:가입구분 -->

            <!-- S::컨텐츠4:시즌권 설정 -->
            <div class="comm_title_wrap mt45">
                <h4 class="pr10">시즌권 설정</h4>
            </div>
            <ur-form-box>
                <ur-form-item
                    class="flex_wrap"
                    label="판매시작일"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-date-picker autoConfirm input-type="YYYY-MM-DD" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="판매종료일"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-date-picker autoConfirm input-type="YYYY-MM-DD" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="발급시작일"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-date-picker autoConfirm input-type="YYYY-MM-DD" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="발급종료일"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-date-picker autoConfirm input-type="YYYY-MM-DD" />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="만료구분" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-dropdown v-model="valueD1" :items="items13Info" />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="만료일" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-date-picker autoConfirm input-type="YYYY-MM-DD" disabled />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="중도가입" :labelAlign="'right'" style="width: 25%; height: auto">
                    <ur-dropdown v-model="valueD1" :items="items14Info" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="중도가입 일분할"
                    :labelAlign="'right'"
                    style="width: 25%; height: auto"
                >
                    <ur-dropdown v-model="valueD1" :items="items15Info" />
                </ur-form-item>
            </ur-form-box>
            <!-- E::컨텐츠4:시즌권 설정 -->

            <!-- S::컨텐츠5:다회권 설정 -->
            <div class="comm_title_wrap mt45">
                <h4 class="pr10">다회권 설정</h4>
            </div>
            <ur-form-box>
                <ur-form-item class="flex_wrap" label="횟수" :labelAlign="'right'" style="width: 100%; height: auto">
                    <ur-text-field value="10" style="width: 100%; height: auto"
                /></ur-form-item>
            </ur-form-box>
            <!-- E::컨텐츠5:다회권 설정 -->

            <ur-form-box class="mt20">
                <ur-form-item class="flex_wrap" label="등록일" :labelAlign="'right'" style="width: 25%; height: auto"
                    >2022.02.09 13:12:25
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="등록자" :labelAlign="'right'" style="width: 25%; height: auto"
                    >B061196
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="수정일" :labelAlign="'right'" style="width: 25%; height: auto"
                    >2022.05.17 10:25:48
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="수정자" :labelAlign="'right'" style="width: 25%; height: auto"
                    >A079578
                </ur-form-item>
            </ur-form-box>

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00013',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            // 드롭다운
            valueD1: '1',
            value1: '1',
            value2: '1',
            value3: '1',
            value4: '1',
            value5: '1',
            value6: '1',
            valuePD1: '1',
            valuePD2: '1',
            valuePD3: '1',
            valuePD4: '1',

            // 테이블
            options: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 권종 리스트 테이블
            columns: [
                { text: '정렬순서', value: 'value1', width: '60px' },
                { text: '권종코드', value: 'value2' },
                { text: '권종명', value: 'value3', width: '200px' },
                { text: '파크구분', value: 'value4' },
                { text: '상세권종구분', value: 'value5' },
                { text: '권종매출구분', value: 'value6' },
                { text: '권종인원구분', value: 'value7' },
                { text: '적용시작일', value: 'value8' },
                { text: '적용종료일', value: 'value9' },
                { text: '사용여부', value: 'value10' },
                { text: '가입구분', value: 'value11' },
                { text: '가격', value: 'value12' },
                { text: 'COND구분', value: 'value13' },
                { text: '가용일', value: 'value14' },
                { text: '가용연장일', value: 'value15' },
                { text: '연차적용여부', value: 'value16' },
                { text: '연차혜택적용여부', value: 'value17' },
                { text: '재가입혜택여부', value: 'value18' },
                { text: '환불가능여부', value: 'value19' },
                { text: '위약금기준일', value: 'value20' },
                { text: '일분할여부', value: 'value21' },
                { text: '일분할구분', value: 'value22' },
                { text: '판매시작일', value: 'value23' },
                { text: '판매종료일', value: 'value24' },
                { text: '발급시작일', value: 'value25' },
                { text: '발급종료일', value: 'value26' },
                { text: '만료구분', value: 'value27' },
                { text: '만료일', value: 'value28' },
                { text: '중간가입시일분할처리구분', value: 'value29' },
            ],
            list: [
                {
                    value1: '1',
                    value2: '1002065751',
                    value3: 'EL연간신규365스탠다드대인',
                    value4: 'E/L',
                    value5: '개인회원',
                    value6: '대인',
                    value7: '10',
                    value8: '2022/02/27',
                    value9: '2023/05/05',
                    value10: 'Y',
                    value11: '신규',
                    value12: '290,000',
                    value13: '10L6',
                    value14: '365',
                    value15: '0',
                    value16: 'Y',
                    value17: 'Y',
                    value18: 'Y',
                    value19: '',
                    value20: '2023/05/25',
                    value21: '',
                    value22: '',
                    value23: '2023/01/01',
                    value24: '2023/11/28',
                    value25: '2023/02/01',
                    value26: '2023/12/29',
                    value27: '',
                    value28: '2023/12/30',
                    value29: '',
                },
            ],
        };
    },
    computed: {
        items1() {
            const rtn = [];
            rtn.push({ value: '1', text: '전체' });
            rtn.push({ value: '2', text: '가입구분' });
            return rtn;
        },
        items2() {
            const rtn = [];
            rtn.push({ value: '1', text: '레귤러' });
            rtn.push({ value: '2', text: '셀렉트' });
            rtn.push({ value: '3', text: '구독권' });
            rtn.push({ value: '4', text: '시즌권' });
            rtn.push({ value: '5', text: '기간권' });
            rtn.push({ value: '6', text: '횟수권' });
            return rtn;
        },
        items3Info() {
            const rtnitems3 = [];
            rtnitems3.push({ value: 'Y', text: 'Y' });
            rtnitems3.push({ value: 'N', text: 'N' });
            return rtnitems3;
        },
        items4Info() {
            const items4Info = [];
            items4Info.push({ value: 'Y', text: 'Y' });
            items4Info.push({ value: 'N', text: 'N' });
            return items4Info;
        },
        items5Info() {
            const items5Info = [];
            items5Info.push({ value: 'Y', text: 'Y' });
            items5Info.push({ value: 'N', text: 'N' });
            return items5Info;
        },
        items6Info() {
            const items6Info = [];
            items6Info.push({ value: 'Y', text: 'Y' });
            items6Info.push({ value: 'N', text: 'N' });
            return items6Info;
        },
        items7Info() {
            const items7Info = [];
            items7Info.push({ value: 'Y', text: 'Y' });
            items7Info.push({ value: 'N', text: 'N' });
            return items7Info;
        },
        items8InfoInfo() {
            const items8InfoInfo = [];
            items8InfoInfo.push({ value: 'Y', text: 'Y' });
            items8InfoInfo.push({ value: 'N', text: 'N' });
            return items8InfoInfo;
        },
        items9Info() {
            const items9Info = [];
            items9Info.push({ value: 'Y', text: 'Y' });
            items9Info.push({ value: 'N', text: 'N' });
            return items9Info;
        },
        items10Info() {
            const items10Info = [];
            items10Info.push({ value: 'Y', text: 'Y' });
            items10Info.push({ value: 'N', text: 'N' });
            return items10Info;
        },
        items11Info() {
            const items11Info = [];
            items11Info.push({ value: '1', text: '사용일분할' });
            items11Info.push({ value: '2', text: '가용일분할' });
            return items11Info;
        },
        items12Info() {
            const items12Info = [];
            items12Info.push({ value: '1', text: '종일권' });
            items12Info.push({ value: '2', text: '야간권' });
            return items12Info;
        },
        items13Info() {
            const items13Info = [];
            items13Info.push({ value: '1', text: '고정형' });
            items13Info.push({ value: '2', text: '변동형' });
            return items13Info;
        },
        items14Info() {
            const items14Info = [];
            items14Info.push({ value: '1', text: '전체' });
            items14Info.push({ value: '2', text: 'Y' });
            items14Info.push({ value: '3', text: 'N' });
            return items14Info;
        },
        items15Info() {
            const items15Info = [];
            items15Info.push({ value: '1', text: '가입일분할' });
            items15Info.push({ value: '2', text: '전체일분할' });
            return items15Info;
        },
        items16Info() {
            const items16Info = [];
            items16Info.push({ value: 'IT01', text: '레귤러' });
            items16Info.push({ value: 'IT02', text: '셀렉트' });
            items16Info.push({ value: 'IT03', text: '기간권' });
            items16Info.push({ value: 'IT04', text: '시즌권' });
            items16Info.push({ value: 'IT05', text: '구독권' });
            items16Info.push({ value: 'IT06', text: '다회원' });
            return items16Info;
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
