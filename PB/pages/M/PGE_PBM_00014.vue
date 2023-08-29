d
<template>
    <sui-page class="custom_page">
        <sui-page-header2 :page-id="this.$options.name" />
        <sui-page-contents>
            <!-- ::S 담당자 정보 -->
            <ur-form-box toggleable>
                <ur-form-item
                    class="flex_wrap"
                    label="임시페이지"
                    :labelAlign="'right'"
                    required
                    style="width: 50%; height: auto"
                >
                    <ur-text-field value="" style="width: 100%; height: auto" />
                    <ur-icon-button icon="search" icon-type="line" color="primary" @click="openModalP00014" />

                    <!-- ::S 공통 팝업 -->
                    <ur-modal ref="modalP00014" class="modal-b1c6" large dragable title="공통팝업" @closed="closed">
                        <template slot="title">
                            <div class="modal-title mb45">공지사항(임시)</div>
                        </template>
                        <template>
                            <!-- <sui-page class="custom_page"> -->
                            <div class="modal-body">
                                <!-- ::S 콘텐츠1 -->

                                <ur-data-grid
                                    ref="grid"
                                    :headers="columnsP1T1"
                                    :data-source="listP1T1"
                                    :options="options"
                                    :data-set-options="{ id: 'id' }"
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
        </sui-page-contents>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00014', // eslint-disable-line vue/name-property-casing
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

            // 공지사항 팝업테이블
            columnsP1T1: [
                { text: 'No', value: 'value1' },
                { text: '공지구분', value: 'value2' },
                { text: '제목', value: 'value3' },
                { text: '게시일자', value: 'value4' },
                { text: '게시자', value: 'value5' },
            ],
            listP1T1: [
                {
                    value1: '1',
                    value2: '기본정보',
                    value3: '새로운 기본정보 추가되었습니다.',
                    value4: '2023/04/27',
                    value5: '추길동',
                },
            ],
        };
    },
    computed: {
        modalP00014() {
            return this.$refs.modalP00014;
        },
    },
    methods: {
        openModalP00014() {
            this.modalP00014.open();
        },
        closeModal() {
            this.modalP00014.close();
        },
        closed() {},
    },
};
</script>
<style scoped></style>
