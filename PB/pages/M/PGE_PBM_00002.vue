<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 담당자 정보 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="멤버십가입자리스트(가입)"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                    <ur-icon-button icon="search" icon-type="line" color="primary" @click="openModalP00002" />

                    <!-- ::S 공통 팝업 -->
                    <ur-modal ref="modalP00002" class="modal-b1c6" xlarge dragable title="공통팝업" @closed="closed">
                        <template slot="title">
                            <div class="modal-title">멤버십가입자리스트(가입)</div>
                        </template>
                        <template>
                            <!-- <sui-page class="custom_page"> -->
                            <div class="modal-body">
                                <!-- ::S 콘텐츠1 -->
                                <ur-form-box toggleable>
                                    <ur-form-item
                                        class="flex_wrap"
                                        label="성명"
                                        :labelAlign="'right'"
                                        style="width: 50%; height: auto"
                                    >
                                        <ur-text-field value="" style="width: 100%; height: auto" />
                                    </ur-form-item>
                                    <ur-form-item
                                        class="flex_wrap"
                                        label="생년월일"
                                        :labelAlign="'right'"
                                        style="width: 50%; height: auto"
                                    >
                                        <ur-text-field value="" style="width: 100%; height: auto" />
                                    </ur-form-item>
                                    <ur-form-item
                                        class="flex_wrap"
                                        label="휴대폰"
                                        :labelAlign="'right'"
                                        style="width: 50%; height: auto"
                                    >
                                        <ur-text-field value="" style="width: 100%; height: auto" />
                                    </ur-form-item>
                                    <ur-form-item
                                        class="flex_wrap"
                                        label="정기권번호"
                                        :labelAlign="'right'"
                                        style="width: 50%; height: auto"
                                    >
                                        <ur-text-field value="" style="width: 100%; height: auto" />
                                    </ur-form-item>
                                    <ur-form-item
                                        label="카드번호"
                                        class="flex_wrap"
                                        :labelAlign="'right'"
                                        style="width: 100%; height: auto"
                                    >
                                        <ur-button color="violet">멤버십QR</ur-button>
                                        <ur-text-field value="" style="width: 28.6%; height: auto" readonly />
                                    </ur-form-item>
                                </ur-form-box>
                                <div class="btn_wrap mt10">
                                    <!--::S InfoText -->
                                    <div class="guideList">
                                        <ul class="listDot">
                                            <li>성명, 생년월일은 2가지 이상 조합 조회만 가능합니다.</li>
                                            <li>
                                                조회 결과는 100건으로 제한됩니다. 100건 조회시에 원하는 결과가 없는 경우
                                                조회 조건을 추가하여 조회 바랍니다.
                                            </li>
                                        </ul>
                                    </div>
                                    <!--::E InfoText -->
                                    <div class="right_box">
                                        <ur-button>초기화</ur-button>
                                        <ur-button color="violet">조회</ur-button>
                                    </div>
                                </div>
                                <!-- <div class="comm_title_wrap mt10">
                  <h4 class="pr10">임시타이틀 영역</h4>
                </div> -->
                                <!--S:: 타이틀 오른쪽 total info -->
                                <div class="comm_title_wrap">
                                    <div class="right_box">
                                        <div class="totalNo">
                                            <div class="totalCt">Total<span>0</span>건</div>
                                        </div>
                                    </div>
                                </div>
                                <!--E::: 타이틀 오른쪽 total info -->
                                <ur-data-grid
                                    ref="grid"
                                    :headers="columnsP1T1"
                                    :data-source="listP1T1"
                                    :options="options"
                                    :data-set-options="{ id: 'id' }"
                                />
                                <!-- ::E 콘텐츠1 -->
                                <!-- ::S 콘텐츠2 -->
                                <div class="comm_title_wrap mt40">
                                    <h4 class="pr10">친구정보</h4>
                                    <ur-button color="violet">전체선택</ur-button>
                                    <!--S:: 타이틀 오른쪽 total info -->
                                    <div class="right_box mt12">
                                        <div class="totalNo">
                                            <div class="totalCt">Total<span>3</span>건</div>
                                        </div>
                                    </div>
                                    <!--E:: 타이틀 오른쪽 total info -->
                                </div>
                                <ur-data-grid
                                    ref="grid"
                                    :headers="columnsP1T2"
                                    :data-source="listP1T2"
                                    :options="options1"
                                    :data-set-options="{ id: 'id' }"
                                />
                                <!-- ::E 콘텐츠2 -->
                                <!-- ::S 콘텐츠3 -->
                                <div class="comm_title_wrap mt40">
                                    <h4 class="pr10">대상자</h4>
                                    <ur-button color="violet">대상자삭제</ur-button>
                                    <!--S:: 타이틀 오른쪽 total info -->
                                    <div class="right_box mt12">
                                        <div class="totalNo">
                                            <div class="totalCt">Total<span>2</span>건</div>
                                        </div>
                                    </div>
                                    <!--E:: 타이틀 오른쪽 total info -->
                                </div>
                                <ur-data-grid
                                    ref="grid"
                                    :headers="columnsP1T3"
                                    :data-source="listP1T3"
                                    :options="options2"
                                    :data-set-options="{ id: 'id' }"
                                />
                                <!-- ::E 콘텐츠3 -->
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
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00002', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            // 라디오 버튼
            v1: null,
            // 드롭다운

            // 테이블 옵션
            options: {
                height: 200,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },
            options1: {
                noInfo: true,
                height: 130,
                selectCheck: false,
                rowHeight: 41,
                multiSelect: false,
            },
            options2: {
                noInfo: true,
                rowHeight: 41,
                height: 130,
                selectCheck: false,
                multiSelect: false,
            },

            // 멤버십가입자리스트팝업테이블
            columnsP1T1: [
                { text: '성명', value: '홍길동', width: '80px' },
                { text: '회원구분', value: '정회원', width: '100px' },
                { text: '정기권번호', value: '1234567890' },
                { text: '생년월일', value: '1999/03/01' },
                { text: '휴대폰', value: '01023415678' },
            ],

            listP1T1: [
                {
                    value1: '이상일',
                    value2: '준회원',
                    value3: '2020552485',
                    value4: '1980/12/12',
                    value5: '010-5123-1391',
                },
            ],
            // 친구정보팝업테이블
            columnsP1T2: [
                { text: '1성명', value: 'value1', width: '80px' },
                { text: '2회원구분', value: 'value2', width: '100px' },
                { text: '3정기권번호', value: 'value3' },
                { text: '4생년월일', value: 'value4' },
                { text: '5휴대폰', value: 'value5' },
                { text: '6등급', value: 'value6' },
            ],

            listP1T2: [
                {
                    value1: '구상현',
                    value2: '정회원',
                    value3: '1871732475',
                    value4: '1987/08/22',
                    value5: '010-9887-1260',
                    value6: '',
                },
            ],
            // 대상자팝업테이블
            columnsP1T3: [
                { text: '성명', value: 'value1', width: '80px' },
                { text: '회원구분', value: 'value2', width: '100px' },
                { text: '정기권번호', value: 'value3' },
                { text: '생년월일', value: 'value4' },
                { text: '인원유형', value: 'value5' },
                { text: '만기일', value: 'value6' },
                { text: '총가입일수', value: 'value7' },
                { text: '휴대폰', value: 'value8' },
                { text: '상태', value: 'value9', width: '100px' },
                { text: '등급', value: 'value10', width: '100px' },
            ],

            listP1T3: [
                {
                    value1: '정상현',
                    value2: '정회원',
                    value3: '2021152485',
                    value4: '1990/10/17',
                    value5: '대인',
                    value6: '2023/03/15',
                    value7: '1년 171일(총536일)',
                    value8: '010-8578-1985',
                    value9: '',
                    value10: '정회원',
                },
            ],
        };
    },
    computed: {
        // 드랍다운
        itemsD1() {
            const itemsD1Rtn = [];
            itemsD1Rtn.push({ value: '1', text: '전체' });
            itemsD1Rtn.push({ value: '2', text: '어트렉션' });
            itemsD1Rtn.push({ value: '3', text: '엔터테인먼트' });
            itemsD1Rtn.push({ value: '4', text: '플랜토피아' });
            itemsD1Rtn.push({ value: '5', text: '쥬토피아' });
            itemsD1Rtn.push({ value: '6', text: '레스토랑' });
            itemsD1Rtn.push({ value: '7', text: '선물숍' });
            itemsD1Rtn.push({ value: '8', text: '편의시설' });
            return itemsD1Rtn;
        },

        // modalPopUp
        modalP00002() {
            return this.$refs.modalP00002;
        },
    },
    methods: {
        openModalP00002() {
            this.modalP00002.open();
        },
        closeModal() {
            this.modalP00002.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
