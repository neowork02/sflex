<template>
  <div class="inbox3">
    <div class="comm_title_wrap">
      <h4 class="pr10">{{ $t('MSG_TXT_NOTE') }}</h4>
      <ur-button color="violet" @click="clickAddRow">{{ $t('MSG_BTN_ADD') }}</ur-button>
      <ur-button color="violet" @click="clickDelRow">{{ $t('MSG_BTN_DEL') }}</ur-button>
      <ur-button color="violet" @click="clickSave">{{ $t('MSG_BTN_SVE') }}</ur-button>
      <ur-button color="violet" @click="clickViewDetail">{{ $t('MSG_BTN_SEARCH_DETAIL') }}</ur-button>
    </div>
    <real-grid ref="grid" grid-id="PGE_JNR_0001_NOTE" grid-root="/lib"
        :gridFields="grdFields"
        :gridColumns="grdColumns" 
        :gridRows="grdDataList" 
        :gridInit=false
        :gridMounted="gridMounted"
        :gridCheckBar="{ visible: false }"        
        :gridEditRowChanged="gridEditRowChanged"
        :style="{ height: '250px' }" 
    />
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'PGE_JNR_00001_P01',
  props: {
    pageName: {
      type: String,
      default: '',
    },
    memshpUid: {
      type: String,
      default: '',
    },
    memberNm: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      //Grid 세팅
      nowDataRow: -1,
      nowColumn: '',
      gridView: null,
      dataProvider: null,
      grdFields: [],
      grdColumns: [],
      grdDataList: [],
      orgGridDataList: [],
      deleteDataList: [],
    };
  },
  created() {
     this.grdFields = [
      { fieldName: "seq", dataType: "number", }, // 순번
      { fieldName: "writeDate", dataType: 'datetime', datetimeFormat: "yyyyMMddhhmmss", }, // 작성일자
      { fieldName: "writeUserNm", dataType: "text", }, // 작성자
      { fieldName: "note", dataType: "text", } // 내용
    ];
    this.grdColumns = [
      {
        name: "writeDate",
        fieldName: "writeDate",
        header: { text: this.$t('MSG_TXT_DT') },
        datetimeFormat: 'yyyy-MM-dd',
        width: 90,
        editable: false, 
      },
      {
        name: "writeUserNm",
        fieldName: "writeUserNm",
        header: { text: this.$t('MSG_TXT_WRITER') },
        width: 60,
      },
      {
        name: "note",
        fieldName: "note",
        header: { text: this.$t('MSG_TXT_DESC') },
        width: 190,
        styleName: 'align-left',
      },
    ];
  },
  mounted() {},
  watch : {
    'memshpUid'(newVal, oldVal) {
      this.changeMemshpUid(newVal, oldVal);  
    },
  },
  methods: {
    /**
     * 비고 Grid Mounted 되면 호출
     */
    async gridMounted() {
      //grid 초기화
      await ({ "gridView": this.gridView, "dataProvider": this.dataProvider } = this.$refs.grid.initGrid());

      this.gridView.editOptions.commitWhenLeave;

      //Grid footer 안보이게 설정
      this.gridView.setFooters({ visible: false, });
      
      //check bar 보이게 설정
      this.gridView.setCheckBar({visible: true});

      //grid style set 
      this.$refs.grid.setFitStyle("even");

      //초기 조회
      this.changeMemshpUid(this.memshpUid, null);

      this.dataProvider.onRowInserted = this.gridRowInserted;   
    },
    /**
     * 추가 Click
     */
    clickAddRow() {
      this.gridView.commit();

      //맨 윗줄에 행추가
      this.nowDataRow = 0;
      this.nowColumn = 'note';
      this.dataProvider.insertRow(this.nowDataRow, {});
      this.gridView.setCurrent({ dataRow: this.nowDataRow });

      //초기 데이타 세팅
      this.dataProvider.setValue(this.nowDataRow, 'seq', -1);
      this.dataProvider.setValue(this.nowDataRow, 'writeUserNm', this.$store.getters.userInfo.userName);
      
      //focus 및 edit 모드 세팅
      setTimeout(this.gridFocusShowEditor(), 50);
      
    },
    /**
     * Grid Focus 및 Editor 활성화
     */
    gridFocusShowEditor(){
      this.gridView.setCurrent({dataRow :this.nowDataRow, column :this.nowColumn});
      this.gridView.setFocus();
      this.gridView.showEditor();
    },
    /**
     * 행삭제
     */
    clickDelRow() {
      this.gridView.commit();
      //체크된건 가져오기
      let checkedRows = this.gridView.getCheckedRows();
      
      //서버에서 삭제위해 Listup
      _.forEach(checkedRows, dataRow => {
        let state = this.dataProvider.getRowState(dataRow);
        //신규건인 경우만 걸리겠지만... 혹시모르니.. 나머지도 상태도 걸어 둠
        if (state == "created" || state == 'createAndDeleted' || state == "deleted") {
          return;
        }

        let jsonRow = this.dataProvider.getJsonRows(dataRow, dataRow)[0];
        jsonRow.delYn = 'Y';
        jsonRow.memshpUid = this.memshpUid;
        this.deleteDataList.push(jsonRow);
      });

      //실제 grid에서 삭제 처리
      this.$refs.grid.onDelRow(checkedRows);
    },
    /**
     * 상세조회
     */
    clickViewDetail() {
      this.gridView.commit();
      utils.openLayerPopup('PGE_CTM_00021', this.onDetailPopupCallback, {
        pageInitialData: {memshpUid:this.memshpUid, writeUserNm:this.memberNm},
        size: 'lg',
      });
    },
    /**
     * 저장 Click
     */
    clickSave() {
      this.gridView.commit();
      //validatil check
      let jsonRows = this.dataProvider.getJsonRows(0, -1, true);
      let findIdx = jsonRows.findIndex(jsonRow => {
        console.log(JSON.stringify(jsonRow));
        if(jsonRow.__rowState == "created" || jsonRow.__rowState == "updated") {
          if(!jsonRow.writeUserNm) {
            this.nowColumn = 'writeUserNm';
            utils.messageBox('alert', this.$t('MSG_ALT_NCELL_REQUIRED_ITEM').replace('{0}', this.$t('MSG_TXT_WRITER'))); // 작성자 필수
            return true
          } 
          if(!jsonRow.note) {
            this.nowColumn = 'note';
            utils.messageBox('alert', this.$t('MSG_ALT_NCELL_REQUIRED_ITEM').replace('{0}', this.$t('MSG_TXT_NOTE'))); // 내용 필수
            return true
          }
        }
      });

      if(findIdx > -1) {
        this.nowDataRow = findIdx;//focus 및 edit 모드 세팅
        setTimeout(this.gridFocusShowEditor(), 50);
        return
      }

      //created, update listup
      const changeIdxList = [
        ...this.$refs.grid.getAllStateRows().created
        ,...this.$refs.grid.getAllStateRows().updated
      ];

      let changeList = [];
      _.forEach(changeIdxList, (dataRow) => {
        let jsonRow = this.dataProvider.getJsonRows(dataRow,dataRow)[0];
        jsonRow.delYn = 'N';
        jsonRow.memshpUid = this.memshpUid;
        changeList.push(jsonRow);
      });

      //삭제와 합치기
      let paramList = [...changeList ,...this.deleteDataList]

      console.log(JSON.stringify(paramList));

      http.request(this.pageName, 'DTS_CTM_00014', {
        data: paramList
      }).then(res => {
        if (res) {
          this.search();
        }
      }).catch(e => console.log(e))
    },
    /**
     * 상세조회 Callback
     * @param { Array } data
     */
    onDetailPopupCallback(data) {
    },    
    /**
     * 현재 선택된 memshpUid가 변경되면 호출
     * @param { String } newVal
     * @param { String } oldVal
     */
    changeMemshpUid(newVal, oldVal) {
      if (newVal != oldVal) {
        this.setGridData([]);

        if (newVal) {
          this.search();
        }
      }
    },
    /**
     * 비고정보
     */
    search() {
      this.gridView.commit();
      const params = { memshpUid: this.memshpUid }
      http.request(this.pageName, 'DTS_CTM_00013', {
        query: params,
      }).then(res => {
        this.setGridData(res.data);
      }).catch(error => console.log(error));
    },
    /**
     * 비고 Grid Data Setting
     * @param { Array } dataList
     */
    setGridData(dataList) {
        this.grdDataList = dataList;
        this.orgGridDataList = Object.assign({}, dataList)
        this.dataProvider.fillJsonData(dataList, { fillMode: "set" });
        this.deleteDataList = []; //초기화
    },
    /**
     * 비고 Grid  row 변경 Event
     * @param { Object } grid
     * @param { Number } itemIndex
     * @param { Number } itemIndex
     * @param { String } field
     * @param { String } oldValue
     * @param { String } newValue
     */
     gridEditRowChanged(grid, itemIndex, dataRow, field, oldValue, newValue) {
      grid.commit();

      let state = this.dataProvider.getRowState(dataRow);
      if (state == 'createAndDeleted' || state == "created" || state == "deleted") {
        return;
      }

      //현재변경된 값 가져오기
      let jsonRow = this.dataProvider.getJsonRows(dataRow,dataRow)[0];

      //원래값 찾기(key값인 seq로...)
      let orgRow = null;
      _.some(this.orgGridDataList, (data, index) => {
        if (data.seq == jsonRow.seq) {
          orgRow = data;
          return;
        }
      });

      //변경된 값이 없으면 none으로 설정(변경되었다 원복된 경우 none으로 설정)
      if (jsonRow.writeUserNm == orgRow.writeUserNm &&  jsonRow.note == orgRow.note) {
        this.dataProvider.setRowState(dataRow, "none", true);
      }
    },
  },
};
</script>

<style scoped>
</style>
