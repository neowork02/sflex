<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <!-- S::컨텐츠1 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="일자"
                    required
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-range-picker autoConfirm input-type="YYYY-MM-DD" init="day+30" />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="공지구분" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-dropdown v-model="valueD1" :items="items1" />
                </ur-form-item>
                <ur-form-item class="flex_wrap" label="제목" :labelAlign="'right'" style="width: 100%; height: auto">
                    <ur-text-field value="" style="width: 100%" />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>초기화</ur-button>
                    <ur-button color="violet">조회</ur-button>
                </div>
            </div>
            <!-- E::컨텐츠1 -->

            <!-- S::컨텐츠2:입력정보 -->
            <div class="comm_title_wrap mt30">
                <h4 class="pr10">공지사항관리</h4>
                <ur-button color="violet">신규</ur-button>
                <ur-button color="violet">삭제</ur-button>
                <ur-button color="violet">저장</ur-button>
                <ur-button color="violet">엑셀다운로드</ur-button>
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
                :headers="columns"
                :data-source="list"
                :options="options60"
                :data-set-options="{ id: 'id' }"
            >
            </ur-data-grid>

            <ur-form-box toggleable class="mt20">
                <ur-form-item
                    class="flex_wrap"
                    label="제목"
                    required
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%" readonly />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="공지구분"
                    required
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-dropdown v-model="valueD1" :items="items1" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="게시일자"
                    required
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-date-picker autoConfirm input-type="YYYY-MM-DD" disabled />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="게시종료일자"
                    required
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-date-picker autoConfirm input-type="YYYY-MM-DD" disabled />
                </ur-form-item>

                <ur-form-item class="flex_wrap" label="내용" :labelAlign="'right'" style="width: 100%; height: auto">
                    <textarea rows="8" maxlength="1000" readonly />
                </ur-form-item>
                <!-- <ur-form-item
          class="compo_col_wrap"
          label="이미지"
          :labelAlign="'right'"
          style="width: 100%; height: auto"
          ><div class="col_item_txt pb4">
            <ur-text-field value="" style="width: 50%; height: auto" />
            <ur-button color="violet"> 업로드 </ur-button>
            <ur-button color="violet"> 삭제 </ur-button>
          </div>
          <div class="col_item_txt pb4">
            <div
              ref="viewerArea"
              class="img_box"
              style="width: auto; height: 256px; margin-right: 10px"
            >
              <img
                style="width: 340px; height: 240px"
                src="https://code.sdsdev.co.kr/pages/UI-DEV/uidev-component/sample/img/nimitz_16x10.29f8b415.jpg"
              />
            </div>
            <div
              ref="viewerArea"
              class="img_box pr10"
              style="width: auto; height: 256px; margin-right: 10px"
            >
              <img
                style="width: 340px; height: 240px"
                src="https://code.sdsdev.co.kr/pages/UI-DEV/uidev-component/sample/img/nimitz_16x10.29f8b415.jpg"
              />
            </div>
            <div
              ref="viewerArea"
              class="img_box pr10"
              style="width: auto; height: 256px"
            >
              <img
                style="width: 340px; height: 240px"
                src="https://code.sdsdev.co.kr/pages/UI-DEV/uidev-component/sample/img/nimitz_16x10.29f8b415.jpg"
              />
            </div>
          </div>
        </ur-form-item> -->
            </ur-form-box>
            <!-- E::컨텐츠2:입력정보 -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00060', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            //드롭다운
            valueD1: '1',

            // 라디오 버튼
            v1: 'Radio 01',
            v2: 'Radio 01',
            v3: 'Radio 01',
            v4: 'Radio 01',
            v5: 'Radio 01',
            v6: 'Radio 01',
            v7: 'Radio 01',
            value: null,

            // 테이블
            options60: {
                height: 200,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
            // 공지사항 관리 리스트
            columns: [
                { text: 'No', value: 'value1', width: '100px' },
                { text: '게시일자', value: 'value2' },
                { text: '공지구분', value: 'value3' },
                { text: '제목', value: 'value4' },
            ],
            list: [
                {
                    value1: '22',
                    value2: '2123/04/01',
                    value3: '기본정보1',
                    value4: '1111',
                },
                {
                    value1: '11',
                    value2: '2123/12/01',
                    value3: '2222',
                    value4: '33333',
                },
            ],
        };
    },
    created() {},
    computed: {
        itemsD1() {
            const rtnSample = [];
            rtnSample.push({ value: '1', text: '2222' });
            return rtnSample;
        },
        items1() {
            let rtnSample = [];
            rtnSample.push({ value: '11', text: '111' });
            rtnSample.push({ value: '22', text: '222' });
            rtnSample.push({ value: '33', text: '333' });
            rtnSample.push({ value: '44', text: '444' });
            rtnSample.push({ value: '55', text: '555' });
            rtnSample.push({ value: '66', text: '666' });
            rtnSample.push({ value: '77', text: '777' });
            rtnSample.push({ value: '88', text: '888' });
            rtnSample.push({ value: '99', text: '999' });
            return rtnSample;
        },
    },
};
</script>
<style scoped></style>
