<template>
  <div id="hisTable">
    <!-- 表格 -->
    <div class="table">
        <el-table :data="
          tableData.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
          " style="width: 100%" :cell-style="cellStyle">
        <el-table-column prop="id" label="序号" width="100px"></el-table-column>
        <el-table-column prop="tem" label="温度" width="160px"></el-table-column>
        <el-table-column prop="sal" label="盐度" width="160px"></el-table-column>
        <el-table-column prop="deep" label="水深" width="160px"></el-table-column>
        <el-table-column prop="tur" label="浊度" width="160px"></el-table-column>
        <el-table-column prop="do" label="溶解氧" width="160px"></el-table-column>
        <el-table-column prop="chr" label="叶绿素" width="160px"></el-table-column>
        <el-table-column prop="ph" label="PH"></el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="tableData.length" :page-size="pageSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name:"hisTable",
  data() {
    return {
      // 表格
      tableData:[
        {
          id:1,
          tem:'23.65 ℃',
          sal:'23.65 psu',
          deep:'23.65 m',
          tur:'23.65 NTU',
          do:'23.65 mg/L',
          chr:'23.65 μg/L',
          ph:'23.65'
        },
        {
          id:2,
          tem:'23.65 ℃',
          sal:'23.65 psu',
          deep:'23.65 m',
          tur:'23.65 NTU',
          do:'23.65 mg/L',
          chr:'23.65 μg/L',
          ph:'23.65'
        },
        {
          id:3,
          tem:'23.65 ℃',
          sal:'23.65 psu',
          deep:'23.65 m',
          tur:'23.65 NTU',
          do:'23.65 mg/L',
          chr:'23.65 μg/L',
          ph:'23.65'
        },
        {
          id:4,
          tem:'23.65 ℃',
          sal:'23.65 psu',
          deep:'23.65 m',
          tur:'23.65 NTU',
          do:'23.65 mg/L',
          chr:'23.65 μg/L',
          ph:'23.65'
        },
        {
          id:5,
          tem:'23.65 ℃',
          sal:'23.65 psu',
          deep:'23.65 m',
          tur:'23.65 NTU',
          do:'23.65 mg/L',
          chr:'23.65 μg/L',
          ph:'23.65'
        },
        {
          id:6,
          tem:'23.65 ℃',
          sal:'23.65 psu',
          deep:'23.65 m',
          tur:'23.65 NTU',
          do:'23.65 mg/L',
          chr:'23.65 μg/L',
          ph:'23.65'
        },
        {
          id:7,
          tem:'23.65 ℃',
          sal:'23.65 psu',
          deep:'23.65 m',
          tur:'23.65 NTU',
          do:'23.65 mg/L',
          chr:'23.65 μg/L',
          ph:'23.65'
        },
        {
          id:8,
          tem:'23.65 ℃',
          sal:'23.65 psu',
          deep:'23.65 m',
          tur:'23.65 NTU',
          do:'23.65 mg/L',
          chr:'23.65 μg/L',
          ph:'23.65'
        },
        {
          id:9,
          tem:'23.65 ℃',
          sal:'23.65 psu',
          deep:'23.65 m',
          tur:'23.65 NTU',
          do:'23.65 mg/L',
          chr:'23.65 μg/L',
          ph:'23.65'
        },
        {
          id:10,
          tem:'23.65 ℃',
          sal:'23.65 psu',
          deep:'23.65 m',
          tur:'23.65 NTU',
          do:'23.65 mg/L',
          chr:'23.65 μg/L',
          ph:'23.65'
        },
        {
          id:11,
          tem:'23.65 ℃',
          sal:'23.65 psu',
          deep:'23.65 m',
          tur:'23.65 NTU',
          do:'23.65 mg/L',
          chr:'23.65 μg/L',
          ph:'23.65'
        },
        {
          id:11,
          tem:'23.65 ℃',
          sal:'23.65 psu',
          deep:'23.65 m',
          tur:'23.65 NTU',
          do:'23.65 mg/L',
          chr:'23.65 μg/L',
          ph:'23.65'
        },
        {
          id:11,
          tem:'23.65 ℃',
          sal:'23.65 psu',
          deep:'23.65 m',
          tur:'23.65 NTU',
          do:'23.65 mg/L',
          chr:'23.65 μg/L',
          ph:'23.65'
        },
        
      ],
      // 分页
      currentPage:1,
      pageSize:11,
    }
  },
  mounted() {
    
  },
  methods: {
    // 行颜色
    cellStyle({ row, column, rowIndex, columnIndex }){
      if (rowIndex%2 == 0) {
        return "background-color: rgba(104, 119, 142, 0.1);"
      }
    },
    // 获取当前页有几条数据
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val
      
    },
    // 获取当前页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    }

  },
}
</script>

<style scoped>
#hisTable{
  width: 100%;
  height: 100%;
  padding: 34px 21px 20px 21px;
  box-sizing: border-box;

  position: relative;
}
/* ------------------表格------------------ */
#hisTable > .table{
  width: 100%;
  height: 431px;
  /* background-color: #0299cc; */
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
  height: 34px;
  color: #0299cc;
  background-color: rgba(24, 97, 150, 0.3);
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

/* ------------------分页------------------ */
#hisTable > .pagination{
  height: 34px;
  /* background-color: #0299cc; */

  position: absolute;
  right: 20px;
  bottom: 18px;
}
.el-pagination{
  color: rgba(255, 255, 255, 0.7);
}
/* 字体颜色 */
.el-pagination >>> .el-pagination__total,.el-pagination >>> .el-pagination__jump{
  color: rgba(255, 255, 255, 0.7);
  height: 34px;
  line-height: 34px;
}
/* 禁用按钮颜色 */
.el-pagination >>> button:disabled{
  color: rgba(255, 255, 255, 0.7);
  background-color: transparent;
  cursor: not-allowed;
  height: 34px;
  line-height: 34px;
}
.el-pagination >>> button:disabled:hover{
  color: rgba(255, 255, 255, 0.7);
}
/* 启用按钮的颜色 */
.el-pagination >>> .btn-next, .el-pagination >>> .btn-prev{
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  height: 34px;
  line-height: 34px;
}
.el-pagination >>> .btn-next:hover, .el-pagination >>> .btn-prev:hover{
  color: #409EFF;
}
/* 页码颜色 */
.el-pagination >>> .el-dialog,.el-pagination >>> .el-pager li{
  background: transparent;
  height: 34px;
  line-height: 34px;
}
/* 跳转页框 */
.el-pagination >>> .el-input__inner{
  width: 45px;
  height: 34px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  border-radius: 0px;
}
</style>