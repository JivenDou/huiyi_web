<template>
  <li id="allParameterLi" >
    <div  :class="cla+' li'">
      <div class="top">
        <div class="value">{{value}}</div>
        <div class="unit">{{unit}}</div>
      </div>
      <div class="bottom">{{name}}</div>
    </div>
  </li>
</template>

<script>
export default {
  name:'allParameterLi',
  props:['value','unit','name','cla'],
}
</script>

<style scoped>
#allParameterLi{
  width: 140px;
  height: 100%;
  /* background-color: aqua; */
  
}
.li{
  width: 132px;
  height: 100%;
  /* background-color: aquamarine; */
  border-right: 2px solid #ddd;
  border-image: linear-gradient(to top,#66dffa00,#66dffa77,#66dffa00) 5 5;
  
  padding: 0px 21px;
  box-sizing: border-box;
  overflow: hidden;
}
.endLi{
  border-right: 0px
}
.li > .top{
  width: 100%;
  display: flex;
  align-items: flex-end;
  color: rgba(36, 202, 255, 1);
}
.li > .top > .value{
  /* width: 63px; */
  font-size: 24px;
  font-family: 'DIN_REGULAR';
  letter-spacing: 1px;
  margin-right: 5px;
  /* background: red; */

}
.li > .top > .unit{
  font-size: 12px;
}
.li > .bottom{
  width: 100%;
  color: rgba(163, 200, 227, 1);
  font-size: 14px;
  margin-top: 5px;
}
</style>