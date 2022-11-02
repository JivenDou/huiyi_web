<template>
  <div id="realTime">
    <!-- 左侧 -->
      <div class="secLeft">
        <!-- 首页表格 -->
        <div class="parameterTable">
          <index-table/>
        </div>
        <!-- 浊度变化曲线 -->
        <div class="echartTur">
          <div class="changeDateBtn">
            <ul>
              <li @click="changeDate(0,'Tur')" :class="isChangeTur==0 ? 'pitchOn' : ''">24h</li>
              <li @click="changeDate(1,'Tur')" :class="isChangeTur==1 ? 'pitchOn' : ''">7天</li>
              <li @click="changeDate(2,'Tur')" :class="isChangeTur==2 ? 'pitchOn' : ''">30天</li>
            </ul>
          </div>
          <echarts Name="浊度" Color="211, 197, 70" :Time="echartsData.Tur['time']" :Value="echartsData.Tur['value']" unit="NTU" />
        </div>
        <!-- 深度变化曲线 -->
        <div class="echartDeep">
          <div class="changeDateBtn">
            <ul>
              <li @click="changeDate(0,'Deep')" :class="isChangeDeep==0 ? 'pitchOn' : ''">24h</li>
              <li @click="changeDate(1,'Deep')" :class="isChangeDeep==1 ? 'pitchOn' : ''">7天</li>
              <li @click="changeDate(2,'Deep')" :class="isChangeDeep==2 ? 'pitchOn' : ''">30天</li>
            </ul>
          </div>
          <echarts Name="深度" Color="48, 208, 143" :Time="echartsData.Deep['time']" :Value="echartsData.Deep['value']" unit="m"  />
        </div>
      </div>
      <!-- 中间 -->
      <div class="secCenter">
        <!-- 实时数据 -->
        <div class="allParameter">
          <ul>
            <all-parameter-li :value="realTimeData['c1']" unit="℃" name="温度" />
            <all-parameter-li :value="realTimeData['c2']" unit="psu" name="盐度" />
            <all-parameter-li :value="realTimeData['c3']" unit="m" name="水深" />
            <all-parameter-li :value="realTimeData['c4']" unit="NTU" name="浊度" />
            <all-parameter-li :value="realTimeData['c6']" unit="mg/L" name="溶解氧" />
            <all-parameter-li :value="realTimeData['c7']" unit="μg/L" name="叶绿素" />
            <all-parameter-li :value="realTimeData['c5']" unit="" name="PH" cla="endLi" />
          </ul>
        </div>
        <!-- 地图 -->
        <div class="map">
          <!-- 地图 -->
          <gaoDeMap/>
          <!-- 透明层 -->
          <div class="transparentLayer"></div>
          <!-- 标志 -->
          <div class="tag"></div>
          <!-- 信息框 -->
          <div class="info"></div>
          <!-- 信息框2 -->
          <div class="info2">
            <div class="title">万泽丰海洋牧场</div>
            <div class="content">
              <div class="left">
                <span>当前位置</span> 
                <span>监测时间</span>
              </div>
              <div class="right">
                <!--  119.523711,35.172984 -->
                <span>北纬35°10'23"、东经119°31'25"</span> 
                <span>{{nowDate}}&nbsp;{{nowTime}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 温度盐度变化曲线 -->
        <div class="echartTemAndSal">
          <div class="changeBtn">
            <ul>
              <li @click="changeTemSal(0)" :class="isChange ? 'pitchOn' : ''">温度</li>
              <li @click="changeTemSal(1)" :class="!isChange ? 'pitchOn' : ''">盐度</li>
            </ul>
          </div>
          <div class="changeDateBtn">
            <ul>
              <li @click="changeDate(0,isChange ? 'Tem' : 'Sal')" :class="isChangeTemSal==0 ? 'pitchOn' : ''">24h</li>
              <li @click="changeDate(1,isChange ? 'Tem' : 'Sal')" :class="isChangeTemSal==1 ? 'pitchOn' : ''">7天</li>
              <li @click="changeDate(2,isChange ? 'Tem' : 'Sal')" :class="isChangeTemSal==2 ? 'pitchOn' : ''">30天</li>
            </ul>
          </div>
          <echartsCenter :Name="TemOrSalName" Color="54, 204, 254" :Time="TemOrSalTime" :Value="TemOrSalValue" :unit="TemOrSalUnit" />
        </div>
      </div>
      <!-- 右侧 -->
      <div class="secRight">
        <!-- 溶解氧变化曲线 -->
        <div class="echartDo">
          <div class="changeDateBtn">
            <ul>
              <li @click="changeDate(0,'Do')" :class="isChangeDo==0 ? 'pitchOn' : ''">24h</li>
              <li @click="changeDate(1,'Do')" :class="isChangeDo==1 ? 'pitchOn' : ''">7天</li>
              <li @click="changeDate(2,'Do')" :class="isChangeDo==2 ? 'pitchOn' : ''">30天</li>
            </ul>
          </div>
          <echarts Name="溶解氧" Color="54, 204, 254" :Time="echartsData.Do['time']" :Value="echartsData.Do['value']" unit="mg/L" />
        </div>
        <!-- 叶绿素变化曲线 -->
        <div class="echartChl">
          <div class="changeDateBtn">
            <ul>
              <li @click="changeDate(0,'Chl')" :class="isChangeChl==0 ? 'pitchOn' : ''">24h</li>
              <li @click="changeDate(1,'Chl')" :class="isChangeChl==1 ? 'pitchOn' : ''">7天</li>
              <li @click="changeDate(2,'Chl')" :class="isChangeChl==2 ? 'pitchOn' : ''">30天</li>
            </ul>
          </div>
          <echarts Name="叶绿素" Color="48, 208, 143" :Time="echartsData.Chl['time']" :Value="echartsData.Chl['value']" unit="μg/L" />
        </div>
        <!-- ph变化曲线 -->
        <div class="echartPh">
          <div class="changeDateBtn">
            <ul>
              <li @click="changeDate(0,'Ph')" :class="isChangePh==0 ? 'pitchOn' : ''">24h</li>
              <li @click="changeDate(1,'Ph')" :class="isChangePh==1 ? 'pitchOn' : ''">7天</li>
              <li @click="changeDate(2,'Ph')" :class="isChangePh==2 ? 'pitchOn' : ''">30天</li>
            </ul>
          </div>
          <echarts Name="PH" Color="54, 204, 254" :Time="echartsData.Ph['time']" :Value="echartsData.Ph['value']" unit="ph" />
        </div>
      </div>
  </div>
</template>

<script>
import echarts from './realTimeValue/echarts'
import echartsCenter from './realTimeValue/echartsCenter'
import indexTable from './realTimeValue/indexTable'
import allParameterLi from './realTimeValue/allParameterLi'
import gaoDeMap from './realTimeValue/gaoDeMap'

export default {
  name:'realTime',
  components:{ echarts, echartsCenter, indexTable, allParameterLi, gaoDeMap },
  data() {
    return {
      // 定时器-------------------
      time1:null,
      time2:null,
      // 内容---------------------
      // 实时数据
      realTimeData: {},
      // 地图时间
      nowDate:'',
      nowTime:'',
      // 温度盐度切换
      isChange:true,
      TemOrSalName:[],
      TemOrSalTime:[],
      TemOrSalValue:[],
      TemOrSalUnit:[],
      // echarts------------------------
      // 切换时间
      isChangeTur:0,
      isChangeDeep:0,
      isChangeTemSal:0,
      isChangeDo:0,
      isChangeChl:0,
      isChangePh:0,
      // echarts数据
      echartsData:{
        Tur:{//浊度
          time:[],
          value:[]
        },
        Deep:{//深度
          time:[],
          value:[]
        },
        Sal:{//盐度
          name:'盐度',
          time:[],
          value:[ ],
          unit:'psu'
        },
        Tem:{//温度
          name:'温度',
          time:[],
          value:[],
          unit:'℃'
        },
        Do:{//溶解氧
          time:[],
          value:[]
        },
        Chl:{//叶绿素
          time:[],
          value:[]
        },
        Ph:{//PH
          time:[],
          value:[]
        },
      }
    }
  },
  watch:{
    // 温度的值变化就传入值刷新图表,并一开始刷新一次
    'echartsData.Tem':{
      deep: true,
      immediate: true,
      handler(){
        this.TemOrSalName = this.echartsData.Tem['name'];
        this.TemOrSalTime = this.echartsData.Tem['time'];
        this.TemOrSalValue = this.echartsData.Tem['value'];
        this.TemOrSalUnit = this.echartsData.Tem['unit'];

        this.isChange = true;
      }
    },
    // 盐度的值变化就传入值刷新图表
    'echartsData.Sal':{
      deep: true,
      handler(){
        this.TemOrSalName = this.echartsData.Sal['name'];
        this.TemOrSalTime = this.echartsData.Sal['time'];
        this.TemOrSalValue = this.echartsData.Sal['value'];
        this.TemOrSalUnit = this.echartsData.Sal['unit'];

        this.isChange = false;
      }
    },
  },
  mounted(){
    // 初始化
    this.initValue();

    // 1s更新时间
    this.time1 = setInterval(()=>{
      // 获取当前时间
      this.getNowDateTime();
    },1000)

    // 10s更新数据
    this.time2 = setInterval(()=>{
      // 获取最新实时数据
      this.getRealTimeNewData();
      // 获取echart表数据
      for(const key in this.echartsData){
        // 更新当前参数的数据
        this.updateEchartData(key);
      }
    },10000)

  },
  beforeDestroy(){
    // 清除定时器
    if(this.time1) {
      clearInterval(this.time1); //关闭
      this.time1 = null;
    }
    if(this.time2) {
      clearInterval(this.time2); //关闭
      this.time2 = null;
    }
  },
  methods: {
    // 初始化
    initValue(){
      // 获取最新实时数据
      this.getRealTimeNewData();
      // 获取echart表数据
      for(const key in this.echartsData){
        // 默认24小时内
        this.getEchartsDatas('hour',key);
      }
    },
    // 月日不足十位加0
    addZero(time){
      return time<10 ? '0'+time : time
    },
    // 获取当前时间
    getNowDateTime(){
      let datetime = new Date()
      let weekArr = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"]

      let year = datetime.getFullYear()
      let month = datetime.getMonth()+1
      let day = datetime.getDate()
      let week = weekArr[datetime.getDay()]
      let hour = datetime.getHours()
      let minute = datetime.getMinutes()
      let second = datetime.getSeconds()
      
      this.nowDate = year+'.'+this.addZero(month)+'.'+this.addZero(day)
      this.nowTime = this.addZero(hour)+':'+this.addZero(minute)+':'+this.addZero(second)
    },
    // 切换温度和盐度&获取数据
    changeTemSal(val){
        // 获取请求的时间段
        let dateType = ''
        if(this.isChangeTemSal == 0) dateType = 'hour'
        else if(this.isChangeTemSal == 1) dateType = 'week'
        else if(this.isChangeTemSal == 2) dateType = 'month'

      if(val == 1){
        // 获取盐度时间曲线数据
        this.getEchartsDatas(dateType,'Sal');
      }else{
        // 获取温度时间曲线数据
        this.getEchartsDatas(dateType,'Tem');
      }
    },
    // 切换时间&获取数据
    changeDate(val,name){
      // 更改选中的按钮
      if(name=="Tur") this.isChangeTur = val
      else if(name=="Deep") this.isChangeDeep = val
      else if(name=="Tem") this.isChangeTemSal = val
      else if(name=="Sal") this.isChangeTemSal = val
      else if(name=="Do") this.isChangeDo = val
      else if(name=="Chl") this.isChangeChl = val
      else if(name=="Ph") this.isChangePh = val

      // 获取请求的时间段
      let dateType = ''
      if(val == 0) dateType = 'hour'
      else if(val == 1) dateType = 'week'
      else if(val == 2) dateType = 'month'

      // 获取参数时间曲线数据
      this.getEchartsDatas(dateType,name);

    },
    // 获取最新实时数据
    getRealTimeNewData(){
      this.$axios({
        method: "post",
        async: true,
        url: '/getRealTimeNewData.php',
        // url: '/api/realTime/getRealTimeNewData',
        // url: 'http://127.0.0.1:8000/realTime/getRealTimeNewData',
      }).then(res => {
        for(const key in res.data[0]){
          if(res.data[0][key] == null){
            res.data[0][key] = 0
          }
        }
        this.realTimeData = res.data[0]
      }).catch(err => {
        console.log(err)
      })
    },  
    // 获取参数echart数据
    getEchartsDatas(dateType,dataName){
      // console.log(dateType)
      // console.log(dataName)
      this.$axios({
        method: "post",
        async: true,
        url: '/getRealTimeEchartsDatas.php',
        // url: '/api/realTime/getEchartsDatas',
        // url: 'http://127.0.0.1:8000/realTime/getEchartsDatas',
        data:JSON.stringify({
          "dateType": dateType,
          "dataName": dataName
        }),
        // data:{
        //   "dateType": dateType,
        //   "dataName": dataName
        // },
        dataType: "json"
      }).then(res => {
        // console.log(res)
        this.echartsData[dataName]['time'] = res.data['time']
        this.echartsData[dataName]['value'] = res.data['value']

      }).catch(err => {
        console.log(err)
      })
    },
    // 刷新当前echarts表数据
    updateEchartData(key){
      let dateType = ''
      if(key == 'Tur'){
        if(this.isChangeTur == 0) dateType = 'hour'
        else if(this.isChangeTur == 1) dateType = 'week'
        else if(this.isChangeTur == 2) dateType = 'month'
        this.getEchartsDatas(dateType,key);
      }else if(key == 'Deep'){
        if(this.isChangeDeep == 0) dateType = 'hour'
        else if(this.isChangeDeep == 1) dateType = 'week'
        else if(this.isChangeDeep == 2) dateType = 'month'
        this.getEchartsDatas(dateType,key);
      }else if(key == 'Tem' && this.isChange == true){
        if(this.isChangeTemSal == 0) dateType = 'hour'
        else if(this.isChangeTemSal == 1) dateType = 'week'
        else if(this.isChangeTemSal == 2) dateType = 'month'
        this.getEchartsDatas(dateType,key);
      }else if(key == 'Sal' && this.isChange == false){
        if(this.isChangeTemSal == 0) dateType = 'hour'
        else if(this.isChangeTemSal == 1) dateType = 'week'
        else if(this.isChangeTemSal == 2) dateType = 'month'
        this.getEchartsDatas(dateType,key);
      }else if(key == 'Do'){
        if(this.isChangeDo == 0) dateType = 'hour'
        else if(this.isChangeDo == 1) dateType = 'week'
        else if(this.isChangeDo == 2) dateType = 'month'
        this.getEchartsDatas(dateType,key);
      }else if(key == 'Chl'){
        if(this.isChangeChl == 0) dateType = 'hour'
        else if(this.isChangeChl == 1) dateType = 'week'
        else if(this.isChangeChl == 2) dateType = 'month'
        this.getEchartsDatas(dateType,key);
      }else if(key == 'Ph'){
        if(this.isChangePh == 0) dateType = 'hour'
        else if(this.isChangePh == 1) dateType = 'week'
        else if(this.isChangePh == 2) dateType = 'month'
        this.getEchartsDatas(dateType,key);
      }
    }
  },
}
</script>

<style scoped>

/* ----------------------------主体---------------------------- */
#realTime{
  width: 100%;
  height: calc(100% - 70px);
  /* background-color: rgb(255, 156, 27); */
  padding: 44px 30px 30px 30px;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
}
/* 三列 */
#realTime > .secLeft,#realTime > .secRight,#realTime > .secCenter{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#realTime > .secLeft,#realTime > .secRight{
  width: 450px;
}
#realTime > .secCenter{
  width: 923px;
}
/* 左侧 */
#realTime > .secLeft > .parameterTable{
  width: 100%;
  height: 336px;
  background: url('../assets/img/realtime/Group740.png');
}
#realTime > .secLeft > .echartTur,#realTime > .secLeft > .echartDeep{
  width: 100%;
  height: 287px;
  background: url('../assets/img/realtime/Group741.png');
  position: relative;
}


/* ----------------所有echarts切换日期按钮样式---------------- */
#realTime > .secLeft > .echartTur > .changeDateBtn,
#realTime > .secLeft > .echartDeep > .changeDateBtn,
#realTime > .secCenter > .echartTemAndSal > .changeDateBtn,
#realTime > .secRight > .echartDo > .changeDateBtn,
#realTime > .secRight > .echartChl > .changeDateBtn,
#realTime > .secRight > .echartPh > .changeDateBtn
{
  width: 110px;
  height: 36px;
  
  position: absolute;
  top: 0px;
  right: 20px;
}
#realTime > .secLeft > .echartTur > .changeDateBtn > ul,
#realTime > .secLeft > .echartDeep > .changeDateBtn > ul,
#realTime > .secCenter > .echartTemAndSal > .changeDateBtn > ul,
#realTime > .secRight > .echartDo > .changeDateBtn > ul, 
#realTime > .secRight > .echartChl > .changeDateBtn > ul, 
#realTime > .secRight > .echartPh > .changeDateBtn > ul
{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
#realTime > .secLeft > .echartTur > .changeDateBtn > ul > li,
#realTime > .secLeft > .echartDeep > .changeDateBtn > ul > li,
#realTime > .secCenter > .echartTemAndSal > .changeDateBtn > ul > li,
#realTime > .secRight > .echartDo > .changeDateBtn > ul > li,
#realTime > .secRight > .echartChl > .changeDateBtn > ul > li,
#realTime > .secRight > .echartPh > .changeDateBtn > ul > li
{
  width: 40%;
  height: 60%;
  color: rgba(255, 255, 255, 0.5);

  display: flex;
  justify-content: center;
  cursor: pointer;
}
#realTime > .secLeft > .echartTur > .changeDateBtn > ul > li:hover,
#realTime > .secLeft > .echartDeep > .changeDateBtn > ul > li:hover,
#realTime > .secCenter > .echartTemAndSal > .changeDateBtn > ul > li:hover,
#realTime > .secRight > .echartDo > .changeDateBtn > ul > li:hover,
#realTime > .secRight > .echartChl > .changeDateBtn > ul > li:hover,
#realTime > .secRight > .echartPh > .changeDateBtn > ul > li:hover
{
  border-bottom: 2px solid #ddd;
  border-image: linear-gradient(to right,#66dffa00,#66dffa,#66dffa00) 1 1;
  color: white;
}
.pitchOn{
  border-bottom: 2px solid #ddd;
  border-image: linear-gradient(to right,#66dffa00,#66dffa,#66dffa00) 1 1;
  color: white !important;
}
/* ----------------所有echarts切换日期按钮样式结束---------------- */


/* 中间 */
#realTime > .secCenter > .allParameter{
  width: 100%;
  height: 100px;
  background: url('../assets/img/realtime/Vector9.png');
}
#realTime > .secCenter > .allParameter > ul{
  width: 100%;
  height: 100%;
  display: flex;

  padding: 20px 0px 20px 15px;
  box-sizing: border-box;
  overflow: hidden;
}

#realTime > .secCenter > .map{
  width: 100%;
  height: 523px;
  background: url('../assets/img/realtime/Group743.png');

  padding: 10px;
  box-sizing: border-box;
  position: relative;
}
#realTime > .secCenter > .map > .transparentLayer{
  width: 100%;
  height: 100%;
  /* background-color: #66dffa; */
  
  position: absolute;
  top:0px;
  left: 0px;
}
#realTime > .secCenter > .map > .tag{
  width: 190px;
  height: 190px;
  background: url('../assets/img/realtime/Group729.png');

  position: absolute;
  top: 201px;
  left: 324px;
}
#realTime > .secCenter > .map > .info{
  width: 310px;
  height: 164px;
  background-color: rgba(42, 66, 89, 0.5);
  border-top: 2px solid #ddd;
  border-image: linear-gradient(to right,rgba(129, 183, 214, 0),rgba(188, 231, 255, 0.8)) 5 5;

  position: absolute;
  top: 129px;
  left: 420px;
}
#realTime > .secCenter > .map > .info2{
  width: 310px;
  height: 164px;
  border-bottom: 2px solid #ddd;
  border-image: linear-gradient(to left,rgba(129, 183, 214, 0),rgba(188, 231, 255, 0.8)) 5 5;

  padding: 35px 23px 0px 23px;
  box-sizing: border-box;
  position: absolute;
  top: 129px;
  left: 420px;
}
#realTime > .secCenter > .map > .info2 > .title{
  width: 100%;
  /* background-color: #66dffa; */
  padding-bottom: 18px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(129, 183, 214, 0.2);
  
  font-size: 20px;
  letter-spacing: 1px;
}
#realTime > .secCenter > .map > .info2 > .content{
  width: 100%;
  height: 57px;
  /* background-color: #66dffa; */
  padding-top: 18px;
  box-sizing: border-box;
  display: flex;

  font-size: 12px;
}
#realTime > .secCenter > .map > .info2 > .content > .left{
  width: 65px;
  height: 100%;
  /* background: red; */
  color: rgba(163, 200, 227, 1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
#realTime > .secCenter > .map > .info2 > .content > .right{
  width: calc(100% - 65px);
  height: 100%;
  /* background: rgb(189, 40, 40); */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}

#realTime > .secCenter > .echartTemAndSal{
  width: 100%;
  height: 287px;
  background: url('../assets/img/realtime/Group742.png');
  background-size: 100% 100%;

  position: relative;
}
#realTime > .secCenter > .echartTemAndSal > .changeBtn{
  width: 110px;
  height: 36px;
  
  position: absolute;
  top: 0px;
  right: 120px;
}
#realTime > .secCenter > .echartTemAndSal > .changeBtn > ul{
  width: 100%;
  height: 100%;
  /* background-color: #66dffa; */
  display: flex;
  align-items: center;
}
#realTime > .secCenter > .echartTemAndSal > .changeBtn > ul > li{
  width: 40%;
  height: 60%;
  /* background-color: #00b828; */
  color: rgba(255, 255, 255, 0.5);

  display: flex;
  justify-content: center;
  cursor: pointer;
}
#realTime > .secCenter > .echartTemAndSal > .changeBtn > ul > li:hover{
  border-bottom: 2px solid #ddd;
  border-image: linear-gradient(to right,#66dffa00,#66dffa,#66dffa00) 1 1;
  color: white;
}
/* 选中样式 */


/* 右侧 */
#realTime > .secRight > .echartDo{
  width: 100%;
  height: 336px;
  background: url('../assets/img/realtime/Group740.png');
  position: relative;
}
#realTime > .secRight > .echartChl,#realTime > .secRight > .echartPh{
  width: 100%;
  height: 287px;
  background: url('../assets/img/realtime/Group741.png');
  position: relative;
}
</style>