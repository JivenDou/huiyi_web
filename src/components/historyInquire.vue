<template>
  <div id="historyInquire">
    <!-- 头部 -->
    <div class="header">
      <!-- 标题 -->
      <div class="title">历史数据</div>
      <div class="right">
        <!-- 日期选择器 -->
        <div class="datepick">
          <el-date-picker
            v-model="datePick"
            type="daterange"
            :clearable="false"
            value-format="yyyy-MM-dd"
            :default-value="nowDate"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="selectDateSearch">
          </el-date-picker>
        </div>
        <!-- 按钮 -->
        <!-- <el-button icon="el-icon-printer">打印</el-button>
        <download-excel
          class="export-excel-wrapper"
          :data="tableData"
          :fields="json_fields"
          header="测试表格"
          name="需要导出的表格名字.xls">
          <el-button icon="el-icon-upload2">导出</el-button>
        </download-excel> -->
      </div>
    </div>
    <!-- 图表 -->
    <div class="echarts">
      <hisEcharts :nowEchartDate="nowDate" :startDate="startDate" :endDate="endDate" />
    </div>
    <!-- 表格 -->
    <div class="hisTable">
      <div id="Table">
        <div class="table">
            <el-table :data="
              tableData.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
              " style="width: 100%" :cell-style="cellStyle" height="410">
            <el-table-column prop="times" label="时间" width="200px">
            </el-table-column>
            <el-table-column prop="c1" label="温度">
              <template slot-scope="scope">
                <span>{{scope.row.c1}} ℃</span>
              </template>
            </el-table-column>
            <el-table-column prop="c2" label="盐度">
              <template slot-scope="scope">
                <span>{{scope.row.c2}} psu</span>
              </template>
            </el-table-column>
            <el-table-column prop="c3" label="水深">
              <template slot-scope="scope">
                <span>{{scope.row.c3}} m</span>
              </template>
            </el-table-column>
            <el-table-column prop="c4" label="浊度">
              <template slot-scope="scope">
                <span>{{scope.row.c4}} NTU</span>
              </template>
            </el-table-column>
            <el-table-column prop="c6" label="溶解氧">
              <template slot-scope="scope">
                <span>{{scope.row.c6}} mg/L</span>
              </template>
            </el-table-column>
            <el-table-column prop="c7" label="叶绿素">
              <template slot-scope="scope">
                <span>{{scope.row.c7}} μg/L</span>
              </template>
            </el-table-column>
            <el-table-column prop="c5" label="PH">
              <template slot-scope="scope">
                <span>{{scope.row.c5}}</span>
              </template>
            </el-table-column>
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
    </div>
  </div>
</template>

<script>
import hisEcharts from './historyValue/hisEcharts'

export default {
  name:'historyInquire',
  components:{hisEcharts},
  data() {
    return {
      // 定时器
      time1:null,
      // 头部------------------------
      // 日期选择器
      nowDate:'',
      datePick:[],
      startDate:'',
      endDate:'',
      // 导出
      // json_fields:{
      //   "序号":"id",
      //   "温度":"tem",
      //   "盐度":"sal",
      //   "深度":"deep",
      //   "浊度":"tur",
      //   "溶解氧":"do",
      //   "叶绿素":"chl",
      //   "PH值":"ph",
      // },
      // 表格------------------------
      // 数据
      tableData:[],
      // 分页
      currentPage:1,
      pageSize:11,
    }
  },
  mounted(){
    // 初始化
    this.initHistory();
    
    // 10s更新数据
    this.time1 = setInterval(()=>{
      this.getTableData(this.startDate,this.endDate)
    },10000)
  },
  beforeDestroy(){
    // 清除定时器
    if(this.time1) {
      clearInterval(this.time1); //关闭
      this.time1 = null;
    }
  },
  methods: {
    // 初始化
    initHistory(){
      // 获取当前时间
      this.getNowDate();
      // 日期选择器默认显示今天
      this.datePick = [this.nowDate,this.nowDate];
      this.startDate = this.nowDate
      this.endDate = this.nowDate
      // 获取表格数据
      this.getTableData(this.startDate,this.endDate);
    },
    // 获取表格数据
    getTableData(start,end){
      this.$axios({
        method: 'post',
        async: true,
        url: '/getHistoryTableData.php',
        // url: '/api/history/getHistoryTableData',
        // url: 'http://127.0.0.1:8000/history/getHistoryTableData',
        data: JSON.stringify({
          "Start" : start,
          "End"   : end
        }),
        // data: {
        //   "Start" : start,
        //   "End"   : end
        // },
        dataType: "json"
      }).then(res => { 
        // console.log(res.data)
        this.tableData = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    // 选择日期后搜索
    selectDateSearch(val){
      this.startDate = val[0]
      this.endDate = val[1]
      this.getTableData(this.startDate,this.endDate)
    },
    // 月日不足十位加0
    addZero(time){
      return time<10 ? '0'+time : time
    },
    // 获取当前时间
    getNowDate(){
      let datetime = new Date()
      let year = datetime.getFullYear()
      let month = datetime.getMonth()+1
      let day = datetime.getDate()
      this.nowDate = year+'-'+this.addZero(month)+'-'+this.addZero(day)
    },
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
    },
  },
}
</script>

<style scoped>
#historyInquire{
  width: 100%;
  height: calc(100% - 70px);

  padding: 44px 361px 30px 361px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content:space-between;
}
/* --------------------------头部-------------------------- */
#historyInquire > .header{
  width: 100%;
  height: 34px;

  display: flex;
  justify-content:space-between;
}
#historyInquire > .header > .title{
  height: 34px;
  line-height: 34px;
  letter-spacing: 1px;
  font-weight:bold;
  font-size: 18px;

   /* 渐变色字体 */
  background-image: linear-gradient(rgba(255, 255, 255, 1) 40%,rgba(47, 152, 227, 1) 80%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
#historyInquire > .header > .right{
  width: 337px;
  height: 34px;

  display: flex;
  justify-content: space-between;
}

/* 日期选择器 */
#historyInquire > .header > .right > .datepick{
  width: 337px; 
  height: 34px;
  /* background-color: aliceblue; */
}
.datepick>>>.el-date-editor {
  width: 337px;
  height: 34px;
  border-radius: 0;
  background-color: rgba(22, 59, 85, 1);
  border: 1px solid rgba(19, 70, 107, 1);
  color: rgba(137, 166, 183, 1);
  font-size: 14px;
}

.el-date-editor>>>.el-range__icon {
  font-size: 15px;
  color: #59788d;

}

/* 开始结束日期 */
.el-date-editor>>>.el-range-input {
  background-color: transparent;
  color: rgba(136, 168, 186, 0.5);
  font-size: 12px;
  letter-spacing: 1px;
}

.el-range-editor.el-input__inner {
  padding: 0px 10px;
}

.el-date-editor>>>.el-range-separator {
  color: white;
  font-size: 12px;
}


/* 按钮 */
.right >>> .el-button{
  width: 80px;
  height: 34px;
  line-height: 0px;
  background: transparent;
  border: 1px solid rgba(119, 142, 154, 0.4);
  color: white;
  border-radius: 0px;
  padding: 12px 10px;
}
.right >>> .el-button:hover{
  background: rgba(255, 255, 255, 0.13);
}
/* 按钮图标 */
.el-button >>> [class*=" el-icon-"], .el-button >>> [class^=el-icon-]{
  line-height: 0px;
}
/* --------------------------图表-------------------------- */
#historyInquire > .echarts{
  width: 100%;
  height: 340px;
  background: url('../assets/img/history/Group1072.png');
}
/* --------------------------表格-------------------------- */
#historyInquire > .hisTable{
  width: 100%;
  height: 535px;
  background: url('../assets/img/history/Group1073.png');
}
#historyInquire > .hisTable > #Table{
  width: 100%;
  height: 100%;
  padding: 34px 21px 20px 21px;
  box-sizing: border-box;

  position: relative;
}
#Table > .table{
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
#Table > .pagination{
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