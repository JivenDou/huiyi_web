<template>
  <div ref="main" class="hisEcharts"></div>
</template>

<script>
export default {
  name:'hisEcharts',
  props:['nowEchartDate','startDate','endDate'],
  data() {
    return {
      // echarts
      myChart:'',
      nowName:'',
      YData:{
        tem: [],
        sal: [],
        deep:[],
        tur: [],
        do:  [],
        chl: [],
        ph:  [],
      },
      dateData:[],
    }
  },
  watch:{
    YData:{
      deep:true, //开启深度（多层）监视
      handler(){
        // 绘制echarts
        this.drawChart();
      }
    },
    // nowName(newValue){
    //   this.nowName = newValue
    //   console.log(this.nowName)
    //   console.log(this.startDate)
    //   console.log(this.endDate)
    //   // 获取echarts数据
    //   // this.getEchartData(this.nowName,this.startDate,this.endDate)
    // },
    nowEchartDate(newValue){
      this.nowEchartDate = newValue
      this.nowName = '温度'
      // 获取echarts数据
      this.getEchartData(this.nowName,this.nowEchartDate,this.nowEchartDate)
    },
    startDate(newValue){
      this.startDate = newValue
      // 获取echarts数据
      this.getEchartData(this.nowName,this.startDate,this.endDate)
    },
    endDate(newValue){
      this.endDate = newValue
    },
  },
  mounted(){
    // 绘制echarts
    this.drawChart();

    // 10s更新数据
    this.time1 = setInterval(()=>{
      this.getEchartData(this.nowName,this.startDate,this.endDate)
    },30000)
  },
  beforeDestroy(){
    // 清除定时器
    if(this.time1) {
      clearInterval(this.time1); //关闭
      this.time1 = null;
    }
  },
  methods: {
    // 获取echarts数据
    getEchartData(name,start,end){
      this.nowName = name
      
      this.$axios({
        method: 'post',
        async: true,
        url: '/getHistoryEchartsDatas.php',
        // url: '/api/history/getEchartsDatas',
        // url: 'http://127.0.0.1:8000/history/getEchartsDatas',
        data: JSON.stringify({
          'Name'  : name,
          "Start" : start,
          "End"   : end
        }),
        // data: {
        //   'Name'  : name,
        //   "Start" : start,
        //   "End"   : end
        // },
        dataType: "json"
      }).then(res => { 
        this.dateData = res.data['time']
        if(name == '温度'){
          this.YData.tem = res.data['value']
        }else if(name == '盐度'){
          this.YData.sal = res.data['value']
        }else if(name == '水深'){
          this.YData.deep = res.data['value']
        }else if(name == '浊度'){
          this.YData.tur = res.data['value']
        }else if(name == '溶解氧'){
          this.YData.do = res.data['value']
        }else if(name == '叶绿素'){
          this.YData.chl = res.data['value']
        }else if(name == 'PH值'){
          this.YData.ph = res.data['value']
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 绘制echarts
    drawChart(){
      if(!this.myChart){// 创建图表
        
        this.myChart = this.$echarts.init(this.$refs.main);

        let axisColor = "rgba(255, 255, 255, 0.3)"
        let temLineColor = "255, 75, 75"
        let salLineColor = "122, 135, 255"
        let deepLineColor = "67, 217, 251"
        let turLineColor = "39, 157, 255"
        let doLineColor = "229, 188, 41"
        let chlLineColor = "1, 230, 148"
        let phLineColor = "250, 100, 51"
        let temYData = this.YData.tem
        let salYData = this.YData.sal
        let deepYData = this.YData.deep
        let turYData = this.YData.tur
        let doYData = this.YData.do
        let chlYData = this.YData.chl
        let phYData = this.YData.ph
        let xData = this.dateData

        // 指定图表的配置项和数据
        let option = {
          grid: {
            //grid 组件离容器上下左右侧的距离
            left: "2%",
            right: "2%",
            top: "20%",
            bottom: "0%",
            containLabel: true,
          },
          legend: {
            icon: "rect",
            itemHeight: 10, // 图例icon高度
            itemWidth: 10, // 图例icon宽度
            top: 30,
            right: 20,
            itemGap: 20,
            textStyle: {
              color: "white", // 图例文字颜色
              fontSize: 14
            },
            data: ['温度', '盐度', '水深','浊度','溶解氧','叶绿素','PH值'],
            selected: { //在这里设置就ok了
              '温度': true,
              '盐度': false,
              '水深': false,
              '浊度':false,
              '溶解氧':false,
              '叶绿素':false,
              'PH值':false,
            },
            selectedMode: "single", // 单选
          },
          tooltip: {
            //跟随框设置
            trigger: "axis",
            axisPointer: {
              type: "line",
              lineStyle: {
                type: "solid",
              },
            },
          },
          xAxis: {
            type: 'category',
            data: xData,
            // gridIndex: 1,
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: axisColor,
              },
            },
          },
          yAxis: {
            name:'(℃)',
            nameLocation: "end",
            nameTextStyle: {
              align:'right',
            },
            type: 'value',
            // 刻度线
            splitLine: {
              show: true,
              lineStyle: {
              type: 'dotted',
              color: 'rgba(255, 255, 255,0.1)'
              }
            },
            // 小刻度线
            axisTick: {
              show: false,
            },
            // 轴线
            axisLine: {
              show: false,
              lineStyle: {
                color: axisColor,
              },
            },
          },
          series: [
            {
              name: '温度',
              type: 'line',
              data: temYData,
              symbol: "none",
              // stack: 'Total',
              emphasis: {
                focus: 'series'
              },
              emphasis: {
                focus: 'series'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba("+temLineColor+", 1)"
                  },
                  {
                    offset: 1,
                    color: "rgba("+temLineColor+", 0)"
                  }
                ]), 
                opacity: 0.2,
              },
              itemStyle: {
                color: "rgba("+temLineColor+", 1)",
              },
            },
            {
              name: '盐度',
              type: 'line',
              data: salYData,
              symbol: "none",
              // stack: 'Total',
              emphasis: {
                focus: 'series'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba("+salLineColor+", 1)"
                  },
                  {
                    offset: 1,
                    color: "rgba("+salLineColor+", 0)"
                  }
                ]), 
                opacity: 0.2,
              },
              itemStyle: {
                color: "rgba("+salLineColor+", 1)",
              },
            },
            {
              name: '水深',
              type: 'line',
              data: deepYData,
              symbol: "none",
              // stack: 'Total',
              emphasis: {
                focus: 'series'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba("+deepLineColor+", 1)"
                  },
                  {
                    offset: 1,
                    color: "rgba("+deepLineColor+", 0)"
                  }
                ]), 
                opacity: 0.2,
              },
              itemStyle: {
                color: "rgba("+deepLineColor+", 1)",
              },
            },
            {
              name: '浊度',
              type: 'line',
              data: turYData,
              symbol: "none",
              // stack: 'Total',
              emphasis: {
                focus: 'series'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba("+turLineColor+", 1)"
                  },
                  {
                    offset: 1,
                    color: "rgba("+turLineColor+", 0)"
                  }
                ]), 
                opacity: 0.2,
              },
              itemStyle: {
                color: "rgba("+turLineColor+", 1)",
              },
            },
            {
              name: '溶解氧',
              type: 'line',
              data: doYData,
              symbol: "none",
              // stack: 'Total',
              emphasis: {
                focus: 'series'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba("+doLineColor+", 1)"
                  },
                  {
                    offset: 1,
                    color: "rgba("+doLineColor+", 0)"
                  }
                ]), 
                opacity: 0.2,
              },
              itemStyle: {
                color: "rgba("+doLineColor+", 1)",
              },
            },
            {
              name: '叶绿素',
              type: 'line',
              data: chlYData,
              symbol: "none",
              // stack: 'Total',
              emphasis: {
                focus: 'series'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba("+chlLineColor+", 1)"
                  },
                  {
                    offset: 1,
                    color: "rgba("+chlLineColor+", 0)"
                  }
                ]), 
                opacity: 0.2,
              },
              itemStyle: {
                color: "rgba("+chlLineColor+", 1)",
              },
            },
            {
              name: 'PH值',
              type: 'line',
              data: phYData,
              symbol: "none",
              // stack: 'Total',
              emphasis: {
                focus: 'series'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba("+phLineColor+", 1)"
                  },
                  {
                    offset: 1,
                    color: "rgba("+phLineColor+", 0)"
                  }
                ]), 
                opacity: 0.2,
              },
              itemStyle: {
                color: "rgba("+phLineColor+", 1)",
              },
            },
            
          ]
        };
        // 切换legend要更改显示的单位
        this.myChart.on("legendselectchanged", obj => {
          let options = this.myChart.getOption();
          if(obj['name']=='温度'){
            options.yAxis[0]['name'] = '(℃)'
          }else if(obj['name']=='盐度'){
            options.yAxis[0]['name'] = '(psu)'
          }else if(obj['name']=='水深'){
            options.yAxis[0]['name'] = '(m)'
          }else if(obj['name']=='浊度'){
            options.yAxis[0]['name'] = '(NTU)'
          }else if(obj['name']=='溶解氧'){
            options.yAxis[0]['name'] = '(mg/L)'
          }else if(obj['name']=='叶绿素'){
            options.yAxis[0]['name'] = '(μg/L)'
          }else if(obj['name']=='PH值'){
            options.yAxis[0]['name'] = '(ph)'
          }
          // 获取选中的参数
          this.nowName = obj['name']
          // 获取数据
          this.getEchartData(this.nowName, this.startDate==''?this.nowEchartDate:this.startDate, this.endDate==''?this.nowEchartDate:this.endDate)

          this.myChart.setOption(options, true);
          
        });

        option && this.myChart.setOption(option);
      }else{// 更新图表
        let xData = this.dateData
        let yDataArr = [this.YData.tem,this.YData.sal,this.YData.deep,this.YData.tur,this.YData.do,this.YData.chl,this.YData.ph]

        let options = this.myChart.getOption();
        // 更新y轴数据
        for(let i=0;i<yDataArr.length;i++){
          options.series[i]['data'] = yDataArr[i]
        }
        // 更新x轴数据
        options.xAxis[0]['data'] = xData
        this.myChart.setOption(options, true);
      }
    },
  },
}
</script>

<style scoped>
.hisEcharts{
  width: 100%;
  height: calc(100% - 20px);
}
</style>