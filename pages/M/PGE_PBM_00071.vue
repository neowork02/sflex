<template>
    <sui-page class="custom_page">
        <div class="modalWrap" style="height: auto">
            <template slot="title">
                <div class="modal-title mb45">사용자상세</div>
            </template>
            <template>
                <!-- <sui-page class="custom_page"> -->
                <div class="modal-body">
                    <!-- ::S 콘텐츠1 -->
                    <ur-form-box toggleable>
                        <ur-form-item label="사용자" :labelAlign="'right'" style="width: 50%; height: auto">
                            admin.base
                        </ur-form-item>
                        <ur-form-item label="사용자명" :labelAlign="'right'" style="width: 50%; height: auto">
                            Admin
                        </ur-form-item>
                        <ur-form-item label="회사명" :labelAlign="'right'" style="width: 50%; height: auto">
                            SAMSUNG SDS India
                        </ur-form-item>
                        <ur-form-item
                            label="부서명"
                            :labelAlign="'right'"
                            style="width: 50%; height: auto"
                            class="flex_wrap"
                        >
                            Dept 11
                        </ur-form-item>
                        <ur-form-item
                            label="Email"
                            :labelAlign="'right'"
                            style="width: 50%; height: auto"
                            class="flex_wrap"
                        >
                            legoent@samsung.com
                        </ur-form-item>
                        <ur-form-item
                            label="전화번호"
                            :labelAlign="'right'"
                            style="width: 50%; height: auto"
                            class="flex_wrap"
                        >
                            010-1234-5678
                        </ur-form-item>
                    </ur-form-box>
                    <!-- ::E 콘텐츠1 -->
                </div>
                <div class="btn_wrap bottom">
                    <div class="right_box">
                        <ur-button> 닫기 </ur-button>
                    </div>
                </div>
                <!-- </sui-page> -->
            </template>
        </div>
    </sui-page>
</template>
<script>
export default {
    name: 'PGE_CTM_00071',
    components: {},
    props: {},
    data() {
        return {
            name: null,
            mobile_tel: null,
            ssps_no: null,
            selectedData: {},
            v1: null,
        };
    },
};
</script>
<style scoped></style>
