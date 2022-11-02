<template>
  <div id="echartsCenter">
    <div class="title">{{Name}}变化曲线</div>
    <div ref="main" class="echart">
      
    </div>
  </div>
</template>

<script>

export default {
  name:'echartsCenter',
  props:['Name','Color','Time','Value','unit'],
  data() {
    return {
    }
  },
  watch:{
    Time(){
      // 绘制echarts
      this.drawChart();
    }
  },
  mounted() {
    // 绘制echarts
    this.drawChart();
  },
  methods: {
    // 绘制echarts
    drawChart(){
      let axisColor = "rgba(255, 255, 255, 0.5)"
      let lineColor = this.Color
      let xData = this.Time
      let yData = this.Value
      let myChart = this.$echarts.init(this.$refs.main);
      // 指定图表的配置项和数据
      let option = {
        grid: {
          //grid 组件离容器上下左右侧的距离
          left: "3%",
          right: "3%",
          top: "22%",
          bottom: "0%",
          containLabel: true,
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
          name:'('+this.unit+')',
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
            data: yData,
            type: 'line',
            symbol: "none",
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba("+lineColor+", 1)"
                },
                {
                  offset: 1,
                  color: "rgba("+lineColor+", 0)"
                }
              ]), 
              opacity: 0.2,
            },
            itemStyle: {
              color: "rgba("+lineColor+", 1)",
              borderColor: "rgba("+lineColor+", 1)",
            },
          }
        ]
      };

      myChart.setOption(option);
    }
  },
}
</script>

<style scoped>
#echartsCenter{
  width: 100%;
  height: 100%;
}
.title{
  width: 100%;
  height: 36px;
  font-size: 17px;
  letter-spacing: 1px;
  line-height: 36px;
  padding-left: 15px;
  box-sizing: border-box;
}
.echart{
  width: 100%;
  height: calc(100% - 20px - 36px);
  /* background-color: #0299cc; */
  overflow: hidden;
}
</style>