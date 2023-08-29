<template>
  <div class="portlet_content">
    <div class="tb_notice">
      <table
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <colgroup>
          <col width="80px">
          <col width="*">
        </colgroup>

        <tr
          v-for="notice in notices"
          :key="notice.postUID"
        >
          <td class="date">
            {{ notice.startDT }}
          </td>
          <th @click="detailPopup(notice.postUID)">
            <span
              v-if="notice.newTag"
              class="new"
            />
            {{ notice.annNoticeObjTitle }}
          </th>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CLB_00013', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageItem: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      notices: [],
      paging: {
        pagePerCount: 5000,
        currentPage: 1,
        totalCount: 0,
        count: 0,
      },
    };
  },
  computed: {
    bbsId() {
      return utils.getParameter(this, 'bbsId');
    },
  },
  watch: {},
  datasets: [],
  mounted() {
    this.noticeLoad();
  },

  methods: {
    noticeLoad() {
      const searchData = {
        bbsId: this.bbsId,
        currentPage: this.paging.currentPage,
      };
      http.request(this.contextPageId, 'DTS_CLB_00001', {
        query: searchData,
      }).then(res => {
        this.notices = this.noticeDataFormat(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
    noticeDataFormat(list) {
      utils.forEach(list, data => {
        const startDT = utils.dateformatToClient(data.validStartDtm, 'S');
        utils.assign(data, {
          startDT,
          newTag: utils.getDayOffset(utils.now(), startDT) < 3,
        });
      });
      return list;
    },
    detailPopup(postUID) { // 게시물 ID 전달
      // 페이지 팝업 호출
      utils.openLayerPopup('PGE_CLB_00002', this.onRequestInfoCallback, {
        pageInitialData: { postIdParam: postUID },
        size: 'xlg',
      });
    },
    onRequestInfoCallback() {

    },
    onMoreView() {
      const pageId = 'PGE_CLB_00001';
      const queryString = `bbsId=${this.bbsId}`;
      // const url = `${window.location.origin}/#/${pageId}?${queryString}`;
      utils.openWindowPopup(pageId, queryString);
      // window.open(url);
    },
  },
};
</script>

<style scoped>
  .portlet_content {
    height:100%;
  }
  .tb_notice {
    margin-left:28px;
    margin-right:28px;
    position:absolute;
    overflow:auto;
    height:210px
  }
  .tb_notice th {
    font-size:12px;
    font-weight:normal;
    color:#333;
    line-height:28px;
    text-align:left;
    text-overflow:ellipsis;
    white-space:nowrap;
    word-wrap:normal;
    overflow:hidden;
    cursor:pointer
  }

  .tb_notice th span.new:before {
    display: inline-block;
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 20px;
    background-color: #ff5858;
    position: absolute;
    margin-top: 10px;
    left: 72px;
  }
  .tb_notice td.date {
    font-size:12px;
    color:#a5a5a5
  }
  .portlet_bottom {
    display:inline-flex;
    margin-top: auto;
    width:100%;
    line-height:40px;
  }
  .portlet_bottom .left{justify-content: flex-start;margin-left:28px;}
  .portlet_bottom .right {justify-content: flex-end;margin-left:auto;margin-right:28px}
  .btn_txt_GR_arrow  {
    font-size: 12px;
    color:#333;
    font-weight:normal;
    padding-right:10px;
    background:url('../../../../assets/images/ic_hyperling_blue_disable.png') no-repeat right 7px}
  .portlet_bottom .right .ico_todo {
    font-size:10px;
    color:#a5a5a5;
    padding-right:20px;
    width:16px;
    height:16px;
    background:url('../../../../assets/images/ic_todo_tag_off.png') no-repeat 98% 2px;
  }
  .portlet_bottom .right .ico_dashboard {
    font-size:10px;
    color:#a5a5a5;
    padding-right:20px;
    width:16px;
    height:16px;
    background:url('../../../../assets/images/ic_dashboard_tag_off.png') no-repeat 98% 2px;
  }
  .portlet_bottom .right .ico_notice {
    font-size:10px;
    color:#a5a5a5;
    padding-right:20px;
    width:16px;
    height:16px;
    background:url('../../../../assets/images/ic_notice_tag_off.png') no-repeat 98% 2px;
  }
</style>
