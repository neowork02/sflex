<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
      레고 테스트
      </div>
    </sui-page-contents>
    <sui-page-footer />
  </sui-page>
</template>
<script>
export default {
    name: 'PGE_PBM_00010', // eslint-disable-line vue/name-property-casing
    data() {
        return {
            count: 0,
        };
    },
    mounted() {
      this.getTest();
    },
    methods: {
      getTest() {

        const queryParams = {
          roleCategoryCode: 'ALL',
          searchCond: 'ALL',
          searchWord: '',
        };

        http.request('PGE_PBM_00010', 'DTS_PBM_00001', {
          query: queryParams,
        }).then(res => {
          if (res.data) {
              if (res.data.length > 0) {
                  console.log(res.data)                    
              }
          }
        }).catch(error => {
          console.log(error);
        });
      }
    }
};
</script>
<style scoped>
</style>
