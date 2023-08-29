<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <ur-form-box toggleable>
                <ur-form-item class="flex_wrap" label="조회기간" :labelAlign="'right'" style="width: 50%; height: auto">
                    <ur-range-picker v-model="dateValue1" init="today" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="조회시스템"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-dropdown v-model="valueD71" :items="items71" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="인터페이스 URL"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="트랙잭션 ID"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    label="처리결과"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                >
                    <ur-dropdown v-model="valueD72" :items="items72" style="width: 42.3%" />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button>초기화</ur-button>
                    <ur-button color="violet">조회</ur-button>
                </div>
            </div>

            <!-- S::컨텐츠2 -->
            <div class="comm_title_wrap mt25">
                <h4 class="pr10">IF 로그 목록</h4>
                <ur-button color="violet">엑셀다운로드</ur-button>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">Total<span>3637</span>건</div>
                    </div>
                </div>
                <!--E:: 타이틀 오른쪽 total info -->
            </div>
            <real-grid
                ref="ifLogGrid"
                grid-id="ifLogGrid"
                grid-root="/lib"
                :gridFields="ifLogFields"
                :gridColumns="ifLogColumns"
                :style="{ height: '450px' }"
            />
            <!-- <ur-data-grid
        ref="grid"
        :headers="columnsT1"
        :data-source="listT1"
        :data-set-options="{ id: 'id' }"
        :options="opts"
      /> -->
            <!-- E::컨텐츠2-->

            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00077', // eslint-disable-line vue/name-property-casing
    components: {},
    data() {
        return {
            //드롭다운
            valueD71: '1',
            valueD72: '1',

            ifLogFields: [
                { fieldName: 'requestTime', dataType: 'text' },
                { fieldName: 'responseTime', dataType: 'text' },
                { fieldName: 'systemView', dataType: 'text' },
                { fieldName: 'interface', dataType: 'text' },
                { fieldName: 'responseCode', dataType: 'text' },
                { fieldName: 'responseMsg', dataType: 'text' },
                { fieldName: 'requestContent', dataType: 'text' },
                { fieldName: 'responseContent', dataType: 'text' },
                { fieldName: 'transactionId', dataType: 'text' },
            ],
            ifLogColumns: [
                {
                    name: 'requestTime',
                    fieldName: 'requestTime',
                    header: { text: '요청시간' },
                    edit: false,
                },
                {
                    name: 'responseTime',
                    fieldName: 'responseTime',
                    header: { text: '응답시간' },
                    edit: false,
                    displayCallback: function (grid, index, value) {
                        return utils.maskName(value);
                    },
                },
                {
                    name: 'systemView',
                    fieldName: 'systemView',
                    header: { text: '조회시스템' },
                    edit: false,
                    displayCallback: function (grid, index, value) {
                        return utils.maskBirthDate(value);
                    },
                },
                {
                    name: 'interface',
                    fieldName: 'interface',
                    header: { text: '인터페이스 URL' },
                    edit: false,
                    displayCallback: function (grid, index, value) {
                        return utils.maskTel(value);
                    },
                },
                {
                    name: 'responseCode',
                    fieldName: 'responseCode',
                    header: { text: '응답상태코드' },
                    edit: false,
                },
                {
                    name: 'requestContent',
                    fieldName: 'requestContent',
                    header: { text: '요청전문내용' },
                    edit: false,
                },
                {
                    name: 'responseContent',
                    fieldName: 'responseContent',
                    header: { text: '응답전문내용' },
                    edit: false,
                },
                {
                    name: 'transactionId',
                    fieldName: 'transactionId',
                    header: { text: '트랙잭션 ID' },
                    edit: false,
                },
            ],
        };
    },
    computed: {
        // 계산된 속성, date pickproperty로 사용가능
        items71() {
            const rtn = [];
            rtn.push({ value: '1', text: '전체' });
            return rtn;
        },
        items72() {
            const rtn = [];
            rtn.push({ value: '1', text: '전체' });
            return rtn;
        },
    },
    watch: {
        // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
    },
    created() {},
    mounted() {},
    methods: {},
};
</script>
<style scoped></style>
