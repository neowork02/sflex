<template>
    <sui-page class="custom_page">
        <sui-page-header2 :pageId="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="가입정보"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                >
                    <div class="radioForm">
                        <ur-radio v-model="v1" value="Radio 00030_01" sm>성명</ur-radio>
                        <ur-radio v-model="v1" value="Radio 00030_02" sm>정기권번호 </ur-radio>
                    </div>
                    <ur-text-field value="" class="pl16" />
                    <ur-icon-button icon="search" style="padding-top: 0px" />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>초기화</ur-button>
                    <ur-button>조회</ur-button>
                    <ur-button>저장</ur-button>
                    <ur-button color="violet">엑셀다운로드</ur-button>
                </div>
            </div>

            <!-- S::내역 -->
            <!-- <div class="comm_title_wrap mt45">
        <h4 class="pr10">타이틀</h4>
      </div> -->
            <div class="comm_title_wrap mt25">
                <h4>회원 정기권 목록</h4>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">Total<span>18</span>건</div>
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
                :labelAlign="'right'"
            />
            <!-- E::내역 -->
            <br />
            <!-- <real-grid
        ref="testGrid"
        grid-id="grid"
        grid-root="/lib"
        :gridFields="gridFields"
        :gridColumns="gridColumns0"
        :gridRows="gridDataList"
        @rendered="gridRendered"
      /> -->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00030',
    components: {}, // eslint-disable-line vue/name-property-casing
    data() {
        return {
            // 라디오 버튼
            v1: 'Radio 00030_01',

            value: null,
            // 테이블
            options: {
                height: 500,
                rowHeight: 41,
                noInfo: true,
                multiSelect: false,
                selectCheck: false,
            },

            // 회원정기권목록 테이블
            columns: [
                { text: '파크구분', value: 'value1', width: '150px' },
                { text: '정기권번호', value: 'value2', width: '120px' },
                { text: '성명', value: 'value3' },
                { text: '권종명', value: 'value4' },
                { text: '인원유형', value: 'value5' },
                { text: '상태', value: 'value6' },
                { text: '가입일', value: 'value7' },
                { text: '시작일', value: 'value8' },
                { text: '종료일', value: 'value9' },
            ],
            list: [
                {
                    value1: 'EL',
                    value2: '2022153937',
                    value3: '조길동',
                    value4: '연간신규레귤러대인',
                    value5: '대인',
                    value6: '정상/만기',
                    value7: '2020/07/10',
                    value8: '2021/07/11',
                    value9: '2022/06/30',
                },
            ],
        };
    },
    computed: {},
    watch: {},
    created() {
        this.portalList = [];
        const that = this;
        this.gridFields = [
            {
                fieldName: 'portalId',
                dataType: 'text',
            },
            {
                fieldName: 'portalNm',
                dataType: 'text',
            },
            {
                fieldName: 'persInfoProcPolicyVer',

                dataType: 'text',
            },
            {
                fieldName: 'policyDocumentTitle',
                dataType: 'text',
            },
            {
                fieldName: 'displayStartDT',
                dataType: 'text',
            },
            {
                fieldName: 'displayFinishDT',
                dataType: 'text',
            },
            {
                fieldName: 'finalModificationUserId',
                dataType: 'text',
            },
            {
                fieldName: 'finalModificationDTM',
                dataType: 'text',
            },
        ];
        this.gridColumns0 = [
            {
                name: 'portalIdColumn',
                fieldName: 'portalId',
                type: 'data',
                width: '100',
                header: {
                    text: this.$t('MSG_TXT_PORTL_ID'),
                },
            },
            {
                name: 'portalNmColumn',
                fieldName: 'portalNm',
                type: 'data',
                width: '100',
                header: {
                    text: this.$t('MSG_TXT_PORTL_NM'),
                },
            },
            {
                name: 'persInfoProcPolicyVerColumn',
                fieldName: 'persInfoProcPolicyVer',
                type: 'data',
                width: '100',
                header: {
                    text: this.$t('MSG_TXT_DOC_VER'),
                },
            },
            {
                name: 'policyDocumentTitleColumn',
                fieldName: 'policyDocumentTitle',
                type: 'data',
                width: '100',
                header: {
                    text: this.$t('MSG_TXT_DOC_TTL'),
                },
            },
            {
                name: 'displayStartDTColumn',
                fieldName: 'displayStartDT',
                type: 'data',
                width: '100',
                header: {
                    text: this.$t('MSG_TXT_START_DATE'),
                },
            },
            {
                name: 'displayFinishDTColumn',
                fieldName: 'displayFinishDT',
                type: 'data',
                width: '100',
                header: {
                    text: this.$t('MSG_TXT_END_DATE'),
                },
            },
            {
                name: 'finalModificationUserIdColumn',
                fieldName: 'finalModificationUserId',
                type: 'data',
                width: '100',
                header: {
                    text: this.$t('MSG_TXT_MDFC_USR'),
                },
            },
            {
                name: 'finalModificationDTMColumn',
                fieldName: 'finalModificationDTM',
                type: 'data',
                width: '100',
                header: {
                    text: this.$t('MSG_TXT_MDFC_DTM'),
                },
            },
        ];
    },
    mounted() {},
    methods: {},
};
</script>
<style scoped></style>
