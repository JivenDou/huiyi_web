<template>
  <div id="index">
    <!-- 头部 -->
    <header>
      <!-- 导航栏 -->
      <nav>
        <ul>
          <li @click="changeRealTime">实时数据</li>
          <li @click="changeHistory">历史数据查询</li>
        </ul>
      </nav>
      <!-- 标题 -->
      <div class="title">万泽丰海洋牧场监测系统</div>
      <!-- 时间 -->
      <div class="titleDateTime">
        <div class="date">{{date}}&nbsp;&nbsp;{{week}}</div>
        <div class="time">{{time}}</div>
      </div>
    </header>
    <!-- 内容 -->
    <!-- <realTime/> -->
    <!-- <historyInquire/> -->
    <router-view/>
  </div>
</template>

<script>
// import realTime from './components/realTime'
// import historyInquire from './components/historyInquire'

export default {
  name: 'index',
  // components:{realTime, historyInquire},
  data() {
    return {
      // 定时器
      time1: null,
      // 头部---------------------
      // 时间
      date: '',
      week: '',
      time: '',
    }
  },
  mounted(){
    // 更新时间
    this.time1 = setInterval(()=>{
      // 获取当前时间
      this.getNowDateTime();
    },1000)
  },
  beforeDestroy() {
    // 销毁定时器
    if(this.time1) {
      clearInterval(this.time1); //关闭
      this.time1 = null;
    }
  },
  methods: {
    // 跳转实时数据界面
    changeRealTime(){
      this.$router.push({
        name:'realTime'
      })
    },
    // 跳转历史数据界面
    changeHistory(){
      this.$router.push({
        name:'historyInquire'
      })
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
      
      this.date = year+'.'+this.addZero(month)+'.'+this.addZero(day)
      this.week = week
      this.time = this.addZero(hour)+':'+this.addZero(minute)+':'+this.addZero(second)
    },
  },
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
#index {
  width: 1920px;
  height: 1080px;
  background: url('./assets/img/background.png');
  color: white;
}
/* ----------------------------顶部---------------------------- */
header{
  width: 100%;
  height: 70px;
  background: url('./assets/img/title.png');

  position: relative;
  display: flex;
  justify-content: center;
}
/* 导航栏 */
header > nav{
  height: 59px;
  /* background: red; */
  position: absolute;
  left: 43px;
}
header > nav > ul{
  height: 100%;
  display: flex;
}
header > nav > ul > li{
  height: 100%;
  font-size: 16px;
  letter-spacing: 1px;
  cursor: pointer;

  display: flex;
  align-items: center;
  padding: 0px 17px;
  box-sizing: border-box;
}
header > nav > ul > li:hover{
  background: linear-gradient(rgba(75, 153, 210, 0) 20%,rgba(75, 154, 210, 0.507));
  color: rgba(36, 202, 255, 1);
  border-bottom: 2px solid #ddd;
  border-image: linear-gradient(to right,#66dffa00,#66dffa,#66dffa00) 5 5;
}
/* 标题 */
header > .title{
  height: 100%;
  display: flex;
  align-items: center;
  
  font-family: 'PangMenZhengDao';
  font-size: 32px;
  letter-spacing: 4px;
   /* 渐变色字体 */
  background-image: linear-gradient(rgba(255, 255, 255, 1) 40%,rgba(47, 152, 227, 1) 80%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;

}
/* 日期 */
header > .titleDateTime{
  height: 59px;
  /* background: red; */
  position: absolute;
  right: 28px;

  display: flex;
}
header > .titleDateTime > .date,header > .titleDateTime > .time{
  height: 100%;
  display: flex;
  align-items: center;
}
header > .titleDateTime > .date{
  margin-right: 10px;
  /* background: greenyellow; */

  font-size: 12px;
}
header > .titleDateTime > .time{
  width: 110px;
  font-family: 'PangMenZhengDao';
  font-size: 24px;
  /* background-color: #66dffa; */
}
</style>
