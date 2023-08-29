<template>
  <sui-page class="custom_page">
    <!-- <div class="blankCover">
      <h1>message area</h1> -->
    <!-- <sui-page-header :pageId="this.$options.name" class="blind" />
    <sui-page-contents class="blind"> -->
    <sui-page-header2 :pageId="this.$options.name" />
    <sui-page-contents>
      <!-- S::컨텐츠1:-->
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="정산일자"
          required
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-date-picker autoConfirm input-type="YYYY-MM-DD" disabled />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <!-- <div class="left_box">
          <ur-button>매출정산(자동배치)</ur-button>
          <ur-button>키오스크1정산</ur-button>
          <ur-button>키오스크2정산</ur-button>
          <ur-button>키오스크3정산</ur-button>
          <ur-button>키오스크4정산</ur-button>
        </div> -->
        <div class="right_box">
          <ur-button color="violet">정산처리</ur-button>
        </div>
      </div>
      <!-- E::컨텐츠1-->
      <!-- S::컨텐츠2 -->
      <div class="comm_title_wrap mt25">
        <h4 class="pr10">POS 정보</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          label="파크구분"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-text-field value="EL" style="width: 100%" />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="POS ID"
          :labelAlign="'right'"
          style="width: 50%; height: auto"
        >
          <ur-text-field value="C100V380108" style="width: 100%" />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="POS 명"
          :labelAlign="'right'"
          style="width: 100%; height: auto"
        >
          <ur-text-field
            value="연간회원 매출-08_국상현/전체/개설/미정산/"
            style="width: 100%"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E::컨텐츠2-->

      <!-- S::컨텐츠3 -->
      <div class="comm_title_wrap mt40">
        <h4 class="pr10">시재현황</h4>
      </div>
      <div class="comm_shut_wrap">
        <div class="inbox8">
          <!-- S::board_list_type2 -->
          <div class="board_list_type2">
            <table>
              <caption></caption>
              <colgroup>
                <col width="*" />
                <col width="6.69%" />
                <col width="8.89%" />
                <col width="6.69%" />
                <col width="8.89%" />
                <col width="6.69%" />
                <col width="8.89%" />
                <col width="6.69%" />
                <col width="8.89%" />
                <col width="6.69%" />
                <col width="8.89%" />
                <col width="6.69%" />
                <col width="8.89%" />
              </colgroup>
              <thead>
                <tr>
                  <th rowspan="2">권종</th>
                  <th colspan="2">아침시재</th>
                  <th colspan="2">시재추가</th>
                  <th colspan="2">총준비시재</th>
                  <th colspan="2">이월시재</th>
                  <th colspan="2">청구시재</th>
                  <th colspan="2">보관시재</th>
                </tr>
                <tr>
                  <th>매수</th>
                  <th>금액</th>
                  <th>매수</th>
                  <th>금액</th>
                  <th>매수</th>
                  <th>금액</th>
                  <th>매수</th>
                  <th>금액</th>
                  <th>매수</th>
                  <th>금액</th>
                  <th>매수</th>
                  <th>금액</th>
                </tr>
              </thead>
              <tbody>
                <!-- <tr>
                  <td>10만원</td>
                  <td class="right">0</td>
                  <td class="right">1</td>
                  <td class="right">10,000</td>
                  <td class="right">2</td>
                  <td class="right">15,000</td>
                  <td class="right">3</td>
                  <td class="right">20,000</td>
                  <td class="right">4</td>
                  <td class="right">25,000</td>
                  <td class="right">5</td>
                  <td class="right">30,000</td>
                  <td class="right">6</td>
                </tr> -->
                <tr>
                  <td>5만원</td>
                  <td class="right_nar">1</td>
                  <td class="right_nar">1,000</td>
                  <td class="right_nar">7</td>
                  <td class="right_nar">34,000</td>
                  <td class="right_nar">8</td>
                  <td class="right_nar">40,000</td>
                  <td class="right_nar">
                    <input
                      type="text"
                      class="ur-text-field__input input-text-sap00001"
                      value="33333"
                    />
                  </td>
                  <td class="right_nar">45,000</td>
                  <td class="right_nar">
                    <input
                      type="text"
                      class="ur-text-field__input input-text-sap00001"
                      value="33333"
                    />
                  </td>
                  <td class="right_nar">1,666,650,000</td>
                  <td class="right_nar">55,555</td>
                  <td class="right_nar">1,277,750,000</td>
                </tr>
                <tr>
                  <td>1만원</td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                </tr>
                <tr>
                  <td>5천원</td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                </tr>
                <tr>
                  <td>1천원</td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                </tr>
                <tr>
                  <td>5백원</td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                </tr>
                <tr>
                  <td>1백원</td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                </tr>
                <tr>
                  <td>5십원</td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                </tr>
                <tr>
                  <td>1십원</td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>소계</td>
                  <td class="right_nar">1</td>
                  <td class="right_nar">11,000</td>
                  <td class="right_nar">10</td>
                  <td class="right_nar">44,000</td>
                  <td class="right_nar">12</td>
                  <td class="right_nar">55,000</td>
                  <td class="right_nar">14</td>
                  <td class="right_nar">1,666,650,000</td>
                  <td class="right_nar">130</td>
                  <td class="right_nar">2,777,750,000</td>
                  <td class="right_nar">88,888</td>
                  <td class="right_nar">5,555,750,000</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <!-- E::board_list_type2 -->
        </div>
        <div class="emptybox" />
        <div class="inbox2">
          <!-- S::board_list_type2 -->
          <div class="board_list_type2">
            <table>
              <caption></caption>
              <colgroup>
                <col width="*" />
                <col width="*" />
                <col width="*" />
              </colgroup>
              <thead>
                <tr>
                  <th colspan="3">위약금 내역</th>
                </tr>
                <tr>
                  <th>내역</th>
                  <th>건수</th>
                  <th>금액</th>
                </tr>
              </thead>
              <tbody>
                <tr class="extend">
                  <td>예수금</td>
                  <td class="right">1</td>
                  <td class="right">2</td>
                </tr>
                <tr class="extend">
                  <td>위약금</td>
                  <td class="right">55,000</td>
                  <td class="right">110,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- E::board_list_type2 -->
        </div>
      </div>
      <!-- E::컨텐츠3 -->

      <!-- S::컨텐츠4 -->
      <div class="comm_title_wrap mt45">
        <h4 class="pr10">입금내역</h4>
      </div>
      <div class="comm_shut_wrap">
        <div class="inbox">
          <!-- S::board_list_type2 -->
          <div class="board_list_type2">
            <table>
              <caption></caption>
              <colgroup>
                <col width="*" />
                <col width="*" />
                <col width="*" />
                <col width="*" />
                <col width="*" />
                <col width="*" />
              </colgroup>
              <thead>
                <tr>
                  <th colspan="3">현금입금</th>
                  <th colspan="3">수표입금</th>
                </tr>
                <tr>
                  <th>권종</th>
                  <th>매수</th>
                  <th>금액</th>
                  <th>권종</th>
                  <th>매수</th>
                  <th>금액</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1만원</td>
                  <td class="right">1</td>
                  <td class="right">1,666,650,000</td>
                  <td>100만원</td>
                  <td class="right">2</td>
                  <td class="right">33,333,000,000</td>
                </tr>
                <tr>
                  <td>1만원</td>
                  <td class="right">2</td>
                  <td class="right">52,000</td>
                  <td>50만원</td>
                  <td class="right">4</td>
                  <td class="right">5</td>
                </tr>
                <tr>
                  <td>5천원</td>
                  <td class="right">3</td>
                  <td class="right">53,000</td>
                  <td>30만원</td>
                  <td class="right">6</td>
                  <td class="right">7</td>
                </tr>
                <tr>
                  <td>1천원</td>
                  <td class="right">4</td>
                  <td class="right">54,000</td>
                  <td>10만원</td>
                  <td class="right">8</td>
                  <td class="right">9</td>
                </tr>
                <tr>
                  <td>5백원</td>
                  <td class="right">5</td>
                  <td class="right">55,000</td>
                  <td>기타수표</td>
                  <td class="right">10</td>
                  <td class="right">11</td>
                </tr>
                <tr>
                  <td>1백원</td>
                  <td class="right">6</td>
                  <td class="right">56,000</td>
                  <th>수표합계</th>
                  <th class="right">33,333</th>
                  <th class="right">33,333,000,000</th>
                </tr>
                <tr>
                  <td>5십원</td>
                  <td class="right">7</td>
                  <td class="right">57,000</td>
                  <th colspan="3">상품권 / 티켓입금</th>
                </tr>
                <tr>
                  <td>1십원</td>
                  <td class="right">8</td>
                  <td class="right">58,000</td>
                  <td><ur-button sm>상품권입금</ur-button></td>
                  <td class="right">14</td>
                  <td class="right">15</td>
                </tr>
                <tr>
                  <td></td>
                  <td class="right"></td>
                  <td class="right"></td>
                  <td>티켓입금</td>
                  <td class="right">16</td>
                  <td class="right">17</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>현금합계</td>
                  <td class="right">33,333</td>
                  <td class="right">1,666,650,000</td>
                  <td></td>
                  <td class="right">66,666</td>
                  <td class="right">34,999,650,000</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <!-- E::board_list_type2 -->
        </div>
        <div class="emptybox" />
        <div class="inbox">
          <!-- S::board_list_type2 -->
          <div class="board_list_type2">
            <table>
              <caption></caption>
              <colgroup>
                <col width="12.5%" />
                <col width="10.6%" />
                <col width="15%" />
                <col width="10.6%" />
                <col width="15%" />
                <col width="10.6%" />
                <col width="15%" />
                <col width="*" />
              </colgroup>
              <thead>
                <tr>
                  <th rowspan="2">지불수단</th>
                  <th colspan="2">입금내역</th>
                  <th colspan="2">서버내역</th>
                  <th colspan="2">POS 내역</th>
                  <th rowspan="2">서버-POS 차이</th>
                </tr>
                <tr>
                  <th>건수</th>
                  <th>금액</th>
                  <th>건수</th>
                  <th>금액</th>
                  <th>건수</th>
                  <th>금액</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="ltspacing">현금</td>
                  <td class="right_nar">776,666</td>
                  <td class="right_nar">34,999,650,000</td>
                  <td class="right_nar">2</td>
                  <td class="right_nar">13,000</td>
                  <td class="right_nar">3</td>
                  <td class="right_nar">14,000</td>
                  <td class="right_nar">91</td>
                </tr>
                <tr>
                  <td class="ltspacing">상품권</td>
                  <td class="right_nar">21</td>
                  <td class="right_nar">22,000</td>
                  <td class="right_nar">22</td>
                  <td class="right_nar">13,000</td>
                  <td class="right_nar">23</td>
                  <td class="right_nar">24,000</td>
                  <td class="right_nar">92</td>
                </tr>
                <tr>
                  <td class="ltspacing">선발행권</td>
                  <td class="right_nar">31</td>
                  <td class="right_nar">32,000</td>
                  <td class="right_nar">32</td>
                  <td class="right_nar">33,000</td>
                  <td class="right_nar">33</td>
                  <td class="right_nar">34,000</td>
                  <td class="right_nar">93</td>
                </tr>
                <tr>
                  <th class="ltspacing">현금계</th>
                  <td class="right_nar">66,666</td>
                  <td class="right_nar">34,999,650,000</td>
                  <td class="right_nar">42</td>
                  <td class="right_nar">43,000</td>
                  <td class="right_nar">43</td>
                  <td class="right_nar">44,000</td>
                  <th class="right_nar">94</th>
                </tr>
                <tr>
                  <td class="ltspacing">신용카드</td>
                  <td class="right_nar">51</td>
                  <td class="right_nar">52,000</td>
                  <td class="right_nar">52</td>
                  <td class="right_nar">53,000</td>
                  <td class="right_nar">53</td>
                  <td class="right_nar">54,000</td>
                  <td class="right_nar">95</td>
                </tr>
                <tr>
                  <td class="ltspacing">외상</td>
                  <td class="right_nar">61</td>
                  <td class="right_nar">62,000</td>
                  <td class="right_nar">62</td>
                  <td class="right_nar">63,000</td>
                  <td class="right_nar">63</td>
                  <td class="right_nar">64,000</td>
                  <td class="right_nar">96</td>
                </tr>
                <tr>
                  <td class="ltspacing">웹</td>
                  <td class="right_nar">71</td>
                  <td class="right_nar">72,000</td>
                  <td class="right_nar">72</td>
                  <td class="right_nar">73,000</td>
                  <td class="right_nar">73</td>
                  <td class="right_nar">74,000</td>
                  <td class="right_nar">97</td>
                </tr>
                <tr>
                  <td class="ltspacing">멤버십포인트</td>
                  <td class="right_nar">81</td>
                  <td class="right_nar">82,000</td>
                  <td class="right_nar">82</td>
                  <td class="right_nar">83,000</td>
                  <td class="right_nar">83</td>
                  <td class="right_nar">84,000</td>
                  <td class="right_nar">98</td>
                </tr>
                <tr>
                  <td class="ltspacing">기프트카드</td>
                  <td class="right_nar">91</td>
                  <td class="right_nar">92,000</td>
                  <td class="right_nar">92</td>
                  <td class="right_nar">93,000</td>
                  <td class="right_nar">93</td>
                  <td class="right_nar">94,000</td>
                  <td class="right_nar">99</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td class="ltspacing">총계</td>
                  <td class="right_nar">66,666</td>
                  <td class="right_nar">34,999,650,000</td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar"></td>
                  <td class="right_nar">297</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <!-- E::board_list_type2 -->
        </div>
      </div>
      <!-- E::컨텐츠4 -->
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button>매출정산(자동배치)</ur-button>
          <ur-button>키오스크1정산</ur-button>
          <ur-button>키오스크2정산</ur-button>
          <ur-button>키오스크3정산</ur-button>
          <ur-button>키오스크4정산</ur-button>
        </div>
      </div>
      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
    <!-- </div> -->
  </sui-page>
</template>
<script>
export default {
  name: "PGE_PBM_00031",
  components: {}, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      value: null,
      // 테이블
      options: {
        height: 250,
        rowHeight: 41,
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
    };
  },
  computed: {
    items() {
      let rtnT = [];
      rtnT.push({ value: "name", text: "성명" });
      rtnT.push({ value: "mobile", text: "휴대폰" });
      rtnT.push({ value: "num", text: "정기권번호" });
      return rtnT;
    },
  },
};
</script>
<style scoped>
.input-text-sap00001 {
  width: 100%;
  min-width: 50px;
  height: 32px;
  text-align: right;
}
</style>
