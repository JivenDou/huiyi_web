<template>
  <div id="indexTable">
    <div class="title">当日参数分析</div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle">
        <el-table-column prop="valueName" label="参数名称" width="150px"></el-table-column>
        <el-table-column prop="avgVal" label="平均值"></el-table-column>
        <el-table-column prop="maxVal" label="最大值"></el-table-column>
        <el-table-column prop="minVal" label="最小值"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'indexTable',
  data() {
    return {
      tableData: [
        {
          valueName: '温度（℃）',
          avgVal: '',
          maxVal: '',
          minVal: '',
        },
        {
          valueName: '盐度（psu）',
          avgVal: '',
          maxVal: '',
          minVal: '',
        },
        {
          valueName: '水深（m）',
          avgVal: '',
          maxVal: '',
          minVal: '',
        },
        {
          valueName: '浊度（NTU）',
          avgVal: '',
          maxVal: '',
          minVal: '',
        },
        {
          valueName: '溶解氧（mg/L）',
          avgVal: '',
          maxVal: '',
          minVal: '',
        },
        {
          valueName: '叶绿素（μg/L）',
          avgVal: '',
          maxVal: '',
          minVal: '',
        },
        {
          valueName: 'PH',
          avgVal: '',
          maxVal: '',
          minVal: '',
        },
      ]
    }
  },
  mounted() {
    // 获取表格数据
    this.GetTableData();
  },
  methods: {
    // 行颜色
    cellStyle({ row, column, rowIndex, columnIndex }){
      if (rowIndex%2 == 0) {
        return "background-color: rgba(104, 119, 142, 0.1);"
      }
    },
    // 获取表格数据
    GetTableData(){
      this.$axios({
        method: "post",
        async: true,
        url: '/getNameMaxMinAvgData.php',
        // url: '/api/realTime/getNameMaxMinAvgData',
        // url: 'http://127.0.0.1:8000/realTime/getNameMaxMinAvgData',
      }).then(res => {
        // console.log(res.data)
        // 循环遍历匹配数据
        this.tableData.forEach(item => {
          for(let i=0;i<this.tableData.length;i++){
            if (item['valueName'] == '温度（℃）' && res.data[i]['name'] == 'c1'){
              item['avgVal'] = res.data[i]['avgVal']
              item['maxVal'] = res.data[i]['maxVal']
              item['minVal'] = res.data[i]['minVal']
              break;
            }else if(item['valueName'] == '盐度（psu）' && res.data[i]['name'] == 'c2'){
              item['avgVal'] = res.data[i]['avgVal']
              item['maxVal'] = res.data[i]['maxVal']
              item['minVal'] = res.data[i]['minVal']
              break;
            }else if(item['valueName'] == '水深（m）' && res.data[i]['name'] == 'c3'){
              item['avgVal'] = res.data[i]['avgVal']
              item['maxVal'] = res.data[i]['maxVal']
              item['minVal'] = res.data[i]['minVal']
              break;
            }else if(item['valueName'] == '浊度（NTU）' && res.data[i]['name'] == 'c4'){
              item['avgVal'] = res.data[i]['avgVal']
              item['maxVal'] = res.data[i]['maxVal']
              item['minVal'] = res.data[i]['minVal']
              break;
            }else if(item['valueName'] == '溶解氧（mg/L）' && res.data[i]['name'] == 'c6'){
              item['avgVal'] = res.data[i]['avgVal']
              item['maxVal'] = res.data[i]['maxVal']
              item['minVal'] = res.data[i]['minVal']
              break;
            }else if(item['valueName'] == 'PH' && res.data[i]['name'] == 'c5'){
              item['avgVal'] = res.data[i]['avgVal']
              item['maxVal'] = res.data[i]['maxVal']
              item['minVal'] = res.data[i]['minVal']
              break;
            }else if(item['valueName'] == '叶绿素（μg/L）' && res.data[i]['name'] == 'c7'){
              item['avgVal'] = res.data[i]['avgVal']
              item['maxVal'] = res.data[i]['maxVal']
              item['minVal'] = res.data[i]['minVal']
              break;
            }
          }
        });
      }).catch(err => {
        console.log(err)
      })
    }
  },
  
}
</script>

<style scoped>
#indexTable {
  width: 100%;
  height: 100%;
  
}

.title {
  width: 100%;
  height: 36px;
  font-size: 17px;
  letter-spacing: 1px;
  line-height: 36px;
  padding-left: 15px;
  box-sizing: border-box;
}


/* ------------------表格------------------ */
.table {
  width: 100%;
  height: calc(100% - 20px - 36px);
  /* background-color: #0299cc; */
  overflow: hidden;
}
.el-table,
.el-table>>>td,
.el-table>>>th,
.el-table>>>tr,
.el-table::before {
  background-color: transparent;
  padding: 0px 0px;
  letter-spacing: 1px;
  font-size: 13px;
  /* text-align: center; */
}

/* 表格高度设置 */
/* 表头 */
.el-table>>>th {
  height: 40px;
  color: #0299cc
}

/* 表单元格 */
.el-table>>>td {
  height: 34px;
  color: white;
}

/* 左缩进 */
.el-table>>>td,
.el-table>>>th.is-leaf {
  padding-left: 20px;
}

.el-table>>>td,
.el-table>>>th.is-leaf {
  border-bottom: 0px;
}

/* 鼠标悬停颜色 */
.el-table>>>tr:hover>td {
  background-color: rgba(104, 119, 142, 0.1) !important;
}
</style>