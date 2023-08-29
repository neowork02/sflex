<template>
    <sui-page class="custom_page">
        <sui-page-header :pageId="this.$options.name" />
        <sui-page-contents>
            <!-- S::컨텐츠1 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap noticeTit"
                    :label="$t('MSG_TXT_URGENT_NOTICE')"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                >
                    <ur-text-field v-model="urgentNotice" style="width: 100%" maxlength="115" readonly />
                </ur-form-item>
            </ur-form-box>

            <!-- E::컨텐츠1 -->
            <!-- S::컨텐츠2-->
            <div class="comm_title_wrap mt30">
                <h4>{{ $t('MSG_TXT_ANNOUNCEMENT') }}</h4>
            </div>
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_WRITE_USR')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field v-model="fstRgstUsrId" style="width: 100%" maxlength="10" @keyup.enter="search(0)" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_TTL')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field v-model="title" style="width: 100%" maxlength="30" @keyup.enter="search(0)" />
                </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
                <div class="right_box">
                    <ur-button @click="reset">{{ $t('MSG_BTN_RESET') }}</ur-button>
                    <ur-button v-permission:read="this.$options.name" color="violet" @click="search(0)">{{ $t('MSG_TXT_SRCH') }}</ur-button>
                </div>
            </div>
            <!-- E::컨텐츠2 -->
            <!-- S::컨텐츠3 -->
            <div class="comm_title_wrap mt25">
                <h4 class="pr10">{{ $t('MSG_TXT_ANNOUNCEMENT') }}</h4>
                <ur-button v-permission:read="this.$options.name" color="violet" @click="search(0)">{{ $t('MSG_TXT_ALL') }}</ur-button>
                <ur-button v-permission:read="this.$options.name" color="violet" @click="search(1)">{{ $t('MSG_TXT_BASIC_INFO') }}</ur-button>
                <ur-button v-permission:read="this.$options.name" color="violet" @click="search(2)">{{ $t('MSG_TXT_SMART_RESERVE') }}</ur-button>
                <ur-button v-permission:read="this.$options.name" color="violet" @click="search(3)">{{ $t('MSG_TXT_SUB_REG') }}</ur-button>
                <ur-button v-permission:read="this.$options.name" color="violet" @click="search(4)">{{ $t('MSG_TXT_RETURN') }}</ur-button>
                <ur-button v-permission:read="this.$options.name" color="violet" @click="search(5)">{{ $t('MSG_TXT_STOP') }}</ur-button>
                <ur-button v-permission:read="this.$options.name" color="violet" @click="search(6)">{{ $t('MSG_TXT_ASSIGNMENT') }}</ur-button>
                <ur-button v-permission:read="this.$options.name" color="violet" @click="search(7)">{{ $t('MSG_TXT_REWARD_BENEFIT') }}</ur-button>
                <ur-button v-permission:read="this.$options.name" color="violet" @click="search(9)">{{ $t('MSG_TXT_ETC') }}</ur-button>
                <!--S:: 타이틀 오른쪽 total info -->
                <div class="right_box">
                    <div class="totalNo">
                        <div class="totalCt">
                            Total<span>{{ numberWithCommas(totalCnt) }}</span
                            >{{ $t('MSG_TXT_CNT') }}
                        </div>
                    </div>
                </div>
                <!--E::: 타이틀 오른쪽 total info -->
            </div>
            <real-grid
                ref="pgeNtm00001Grid"
                grid-id="pgeNtm00001Grid"
                grid-root="/lib"
                :gridFields="gridFields"
                :gridColumns="gridColumns"
                :gridRows="gridDataList"
                :gridCellClick="gridCellClick"
                :style="gridStyle"
            />
            <!-- E::컨텐츠3 -->
            <!-- S::컨텐츠4 -->
            <ur-form-box toggleable class="mt20">
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_CLASS_NOTICE')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-dropdown v-model="selectNotiKind" :items="items1" :disabled="true" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_TTL')"
                    :labelAlign="'right'"
                    style="width: 50%; height: auto"
                >
                    <ur-text-field v-model="selectTitle" style="width: 100%" :disabled="true" />
                </ur-form-item>
                <ur-form-item
                    class="flex_wrap"
                    :label="$t('MSG_TXT_CNTN')"
                    :labelAlign="'right'"
                    style="width: 100%; height: auto"
                >
                    <sui-web-editor
                        ref="tuiEditor"
                        class="width100"
                        v-model="selectContent"
                        :initialValue="content"
                        :height="750"
                        :isViewer="true"
                    />
                </ur-form-item>
            </ur-form-box>
            <!-- E::컨텐츠4 -->
            <sui-page-footer>
                <div class="comm_btn_wrap" />
            </sui-page-footer>
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_NTM_00001',
    components: {},
    data() {
        return {
            fstRgstUsrId: null,
            title: null,
            notiKind: null,
            content: null,
            selectNotiKind: null,
            selectTitle: null,
            selectContent: null,
            gridDataList: [],
            selectedGridRowData: {},
            gridStyle: { height: '282px' },
            totalCnt: 0,
        };
    },
    created() {
        this.gridFields = [
            { fieldName: 'notiKindNm', dataType: 'text' },
            { fieldName: 'title', dataType: 'text' },
            { fieldName: 'noticeStartDate', dataType: 'text' },
            { fieldName: 'fstRgstUsrId', dataType: 'text' },
        ];
        this.gridColumns = [
            {
                // 공지구분
                name: 'notiKindNmColumn',
                fieldName: 'notiKindNm',
                width: 100,
                edit: false, // 셀 Edit 수정불가. default는 Edit 수정 가능
                header: {
                    text: this.$t('MSG_TXT_CLASS_NOTICE'),
                },
            },
            {
                // 제목
                name: 'titleColumn',
                fieldName: 'title',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_TTL'),
                },
            },
            {
                // 게시일자
                name: 'noticeStartDateColumn',
                fieldName: 'noticeStartDate',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_POST_DATE'),
                },
            },
            {
                // 게시자
                name: 'fstRgstUsrIdColumn',
                fieldName: 'fstRgstUsrId',
                width: 100,
                edit: false,
                header: {
                    text: this.$t('MSG_TXT_WRITE_USR'),
                },
            },
        ];
    },
    computed: {
        items1() {
            let rtn = [];
            rtn.push({ value: 'ALL', text: '전체' });
            rtn.push({ value: '1', text: '기본정보' });
            rtn.push({ value: '2', text: '스마트예약' });
            rtn.push({ value: '3', text: '접수/가입' });
            rtn.push({ value: '4', text: '환불' });
            rtn.push({ value: '5', text: '중지' });
            rtn.push({ value: '6', text: '양도' });
            rtn.push({ value: '7', text: '리워즈혜택' });
            rtn.push({ value: '9', text: '기타' });
            return rtn;
        },
    },
    watch: {},
    mounted() {
        this.fstRgstUsrId = null;
        this.title = null;
        this.selectNotiKind = 'ALL';
        (this.selectTitle = null), (this.selectContent = null), this.resetGridRowData();
        this.search();
        // setInterval(() => this.urgentNoticeSearch(), 10000);
    },
    methods: {
        reset() {
            this.fstRgstUsrId = null;
            this.title = null;
            this.selectedGridRowData = null;
        },
        resetGridRowData() {
            this.selectedGridRowData = null;
            this.content = null;
            this.$refs.tuiEditor.setContent(this.content);
        },
        resetFormData() {
            this.selectNotiKind = 'ALL';
            this.selectTitle = null;
            this.selectContent = null;
        },
        search(flag) {
            this.resetFormData();
            let notiKind = null;
            if (flag) {
                notiKind = flag;
            }
            const params = {
                fstRgstUsrId: utils.trim(this.fstRgstUsrId),
                title: utils.trim(this.title),
                notiKind: notiKind || null || '',
            };
            http.request(this.$options.name, 'DTS_NTM_00001', {
                query: params,
            })
                .then((res) => {
                    if (res.data) {
                        this.$refs.tuiEditor.setHtml(res.data.content);
                        const resData = res.data;
                        this.totalCnt = res.data.length;
                        utils.map(resData, (data) => {
                            data.noticeStartDate = _.isNull(data.noticeStartDate)
                                ? data.noticeStartDate
                                : utils.toStringByFormat(utils.toDate(data.noticeStartDate), 'YYYY-MM-DD');
                        });
                        this.gridDataList = resData;
                        this.$refs.pgeNtm00001Grid.setRows(this.gridDataList);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        // 리얼그리드 셀 클릭 이벤트
        gridCellClick(grid, data) {
            if (data) {
                this.selectNotiKind = this.gridDataList[data.dataRow].notiKind;
                this.selectTitle = this.gridDataList[data.dataRow].title;
                this.selectContent = this.gridDataList[data.dataRow].content;
                this.selectedGridRowData = this.gridDataList[data.dataRow];
                var editorContent = this.gridDataList[data.dataRow].content;
                this.selectedGridRowData.content = editorContent;
                this.$refs.tuiEditor.setHtml(this.selectedGridRowData.content);
            } else {
                this.selectedGridRowData = {};
            }
        },
        numberWithCommas(number) {
            if (number || number === 0) {
                number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
            return !number && number !== 0 ? '' : number;
        },
    },
};
</script>
<style scoped></style>
