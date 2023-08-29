<template>
<<<<<<< Updated upstream
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 콘텐츠1 -->
            <div class="comm_title_wrap">
                <h4>미전환 드림포인트 회원</h4>
            </div>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="가입정보"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="v1" value="Radio 000291_01" sm>성명</ur-radio>
                        <ur-radio v-model="v1" value="Radio 000291_02" sm>휴대폰 </ur-radio>
                        <ur-radio v-model="v1" value="Radio 000291_03" sm>정기권번호</ur-radio>
                    </div>
                    <ur-text-field value="" class="pl16" />
                    <ur-icon-button icon="search" style="padding-top: 0px" />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>초기화</ur-button>
                    <ur-button color="violet">조회</ur-button>
                </div>
            </div>

            <div class="comm_title_wrap mt25">
                <h4>정기권 정보</h4>
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
                :headers="columns"
                :data-source="list"
                :options="options"
                :data-set-options="{ id: 'id' }"
            >
            </ur-data-grid>
            <!-- ::E 콘텐츠1 -->
=======
  <sui-page class="custom_page">
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <!-- ::S 콘텐츠1 -->
      <!-- <div class="comm_title_wrap">
        <h4>미전환 드림포인트 회원</h4>
      </div> -->
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="가입정보"
          :labelAlign="'right'"
          style="width: 100%; height: auto"
        >
          <div class="radioForm">
            <ur-radio v-model="v1" value="Radio 000291_01" sm>성명</ur-radio>
            <ur-radio v-model="v1" value="Radio 000291_02" sm>휴대폰 </ur-radio>
            <ur-radio v-model="v1" value="Radio 000291_03" sm
              >정기권번호</ur-radio
            >
          </div>
          <ur-text-field value="" class="pl16" />
          <ur-icon-button icon="search" style="padding-top: 0px" />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button>초기화</ur-button>
          <ur-button>조회</ur-button>
          <ur-button color="violet">멤버십포인트 전환</ur-button>
        </div>
      </div>

      <div class="comm_title_wrap mt25">
        <h4>정기권 정보</h4>
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
        :headers="columns"
        :data-source="list"
        :options="options"
        :data-set-options="{ id: 'id' }"
      >
      </ur-data-grid>
      <!-- ::E 콘텐츠1 -->

      <!-- ::S 콘텐츠2 -->
      <!-- <div class="comm_title_wrap mt40">
        <h4>멤버십포인트 전환 대상자</h4>
      </div> -->
      <ur-form-box toggleable class="mt40">
        <ur-form-item
          class="flex_wrap"
          label="가입정보"
          :labelAlign="'right'"
          style="width: 100%; height: auto"
        >
          <div class="radioForm">
            <ur-radio v-model="v2" value="Radio 000292_01" sm>성명</ur-radio>
            <ur-radio v-model="v2" value="Radio 000292_02" sm>휴대폰 </ur-radio>
            <ur-radio v-model="v2" value="Radio 000292_03" sm
              >정기권번호</ur-radio
            >
            <ur-radio v-model="v2" value="Radio 000292_04" sm
              >멤버십QR</ur-radio
            >
          </div>
          <ur-text-field value="" class="pl16" />
          <ur-icon-button icon="search" style="padding-top: 0px" />
        </ur-form-item>
      </ur-form-box>
      <!-- <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button>초기화</ur-button>
          <ur-button>조회</ur-button>
          <ur-button color="violet">멤버십포인트 전환</ur-button>
        </div>
      </div> -->
      <!-- ::E 콘텐츠2 -->
      <!-- ::S 콘텐츠3 -->
      <div class="comm_title_wrap mt25">
        <h4>회원 정보</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="멤버십 ID"
          :labelAlign="'right'"
          style="width: 33.3%; height: auto"
        >
          <ur-text-field value="" style="width: 89%; height: auto" readonly />
          <ur-icon-button icon="search" style="padding-top: 0px" />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="성명"
          :labelAlign="'right'"
          style="width: 33.3%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="생년월일"
          :labelAlign="'right'"
          style="width: 33.3%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap borTop"
          label="휴대폰"
          :labelAlign="'right'"
          style="width: 33.3%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="주소"
          :labelAlign="'right'"
          style="width: 33.3%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="회원구분"
          :labelAlign="'right'"
          style="width: 33.3%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
      </ur-form-box>
      <!-- ::E 콘텐츠3 -->
      <!-- ::S 콘텐츠4 -->
      <div class="comm_title_wrap mt40">
        <h4>멤버십 포인트 정보</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="잔여포인트"
          :labelAlign="'right'"
          style="width: 33.3%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="적립예정포인트"
          :labelAlign="'right'"
          style="width: 33.3%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="가용포인트"
          :labelAlign="'right'"
          style="width: 33.3%; height: auto"
        >
          <ur-text-field value="" style="width: 100%; height: auto" readonly />
        </ur-form-item>
      </ur-form-box>
      <!-- ::E 콘텐츠4 -->
      <!-- ::S 콘텐츠5 -->
      <div class="comm_title_wrap mt40">
        <h4>정기권 정보</h4>
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
        :headers="columns2"
        :data-source="list2"
        :data-set-options="{ id: 'id' }"
        :options="options"
        :labelAlign="'right'"
      />
      <!-- ::E 콘텐츠5 -->
>>>>>>> Stashed changes

            <!-- ::S 콘텐츠2 -->
            <div class="comm_title_wrap mt40">
                <h4>멤버십포인트 전환 대상자</h4>
            </div>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="가입정보"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="v2" value="Radio 000292_01" sm>성명</ur-radio>
                        <ur-radio v-model="v2" value="Radio 000292_02" sm>휴대폰 </ur-radio>
                        <ur-radio v-model="v2" value="Radio 000292_03" sm>정기권번호</ur-radio>
                        <ur-radio v-model="v2" value="Radio 000292_04" sm>멤버십QR</ur-radio>
                    </div>
                    <ur-text-field value="" class="pl16" />
                    <ur-icon-button icon="search" style="padding-top: 0px" />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>초기화</ur-button>
                    <ur-button>조회</ur-button>
                    <ur-button color="violet">멤버십포인트 전환</ur-button>
                </div>
            </div>
            <!-- ::E 콘텐츠2 -->
            <!-- ::S 콘텐츠3 -->
            <div class="comm_title_wrap mt25">
                <h4>회원 정보</h4>
            </div>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="멤버십 ID"
                    :labelAlign="'right'"
                    style="width: 33.3%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="성명" :labelAlign="'right'" style="width: 33.3%; height: auto">
                    <ur-text-field value="" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="생년월일"
                    :labelAlign="'right'"
                    style="width: 33.3%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap borTop"
                    label="휴대폰"
                    :labelAlign="'right'"
                    style="width: 33.3%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="주소" :labelAlign="'right'" style="width: 33.3%; height: auto">
                    <ur-text-field value="" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="회원구분"
                    :labelAlign="'right'"
                    style="width: 33.3%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" readonly />
                </ur-form-item>
            </ur-form-box>
            <!-- ::E 콘텐츠3 -->
            <!-- ::S 콘텐츠4 -->
            <div class="comm_title_wrap mt40">
                <h4>멤버십 포인트 정보</h4>
            </div>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="잔여포인트"
                    :labelAlign="'right'"
                    style="width: 33.3%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="적립예정포인트"
                    :labelAlign="'right'"
                    style="width: 33.3%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="가용포인트"
                    :labelAlign="'right'"
                    style="width: 33.3%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" readonly />
                </ur-form-item>
            </ur-form-box>
            <!-- ::E 콘텐츠4 -->
            <!-- ::S 콘텐츠5 -->
            <div class="comm_title_wrap mt40">
                <h4>정기권 정보</h4>
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
                :headers="columns2"
                :data-source="list2"
                :data-set-options="{ id: 'id' }"
                :options="options"
                :labelAlign="'right'"
            />
            <!-- ::E 콘텐츠5 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00029', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            //드롭다운
            valueD1: '1',

            // 라디오 버튼
            v1: 'Radio 000291_01',
            v2: 'Radio 000292_01',

            value: null,

            // 테이블
            options: {
                height: 250,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 미전환드림포인트회원 정기권정보
            columns: [
                { text: '정기권번호', value: 'value1' },
                { text: '성명', value: 'value2' },
                { text: '생년월일', value: 'value3' },
                { text: '휴대폰', value: 'value4' },
                { text: '미전환 드림포인트', value: 'value5' },
            ],
            list: [
                {
                    value1: '4172153932',
                    value2: '홍길동',
                    value3: '1988-11-16',
                    value4: '010-9234-5671',
                    value5: '20,000',
                },
            ],
            // 멤버십포인트전환대상자 정기권정보
            columns2: [
                { text: '정기권번호', value: 'value1' },
                { text: '티켓명', value: 'value2' },
                { text: '가입일', value: 'value3' },
                { text: '시작일', value: 'value4' },
                { text: '종료일', value: 'value5' },
                { text: '상태', value: 'value6' },
            ],
            list2: [
                {
                    value1: '99164559',
                    value2: 'EL연간신규350스탠다드대인',
                    value3: '2022-12-16',
                    value4: '2023-01-01',
                    value5: '2023-12-31',
                    value6: '-',
                },
            ],
        };
    },
    computed: {
        itemsD1() {
            const rtn = [];
            rtn.push({ value: '1', text: '전체' });
            return rtn;
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
