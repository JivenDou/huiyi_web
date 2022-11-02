<template>
  <div id="gaoDeMap">
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
// 设置安全密钥
window._AMapSecurityConfig = {
    securityJsCode: '21976d00a772e772e77be68beca0a810',
}

export default {
  name:'gaoDeMap',
  data() {
    return {
      map:null
    } 
  },
  mounted() {
    this.initMap();
  },
  methods:{
    initMap(){
      AMapLoader.load({
          key:"41f8971809d15f30f4e5b05606648775",
          version:"1.4.15",
          plugins:[''],// 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap)=>{
          this.map = new AMap.Map("gaoDeMap",{  //设置地图容器id
              viewMode:"3D",    //是否为3D地图模式
              zoom:11.1,           //初始化地图级别
              center:[119.504435,35.190879], //初始化地图中心点位置
              
          });
          this.map.setMapStyle("amap://styles/e84942a5044ee12dd119a94870339ab9")
      }).catch(e=>{
          console.log(e);
      })
    },
  },
}
</script>

<style scoped>
#gaoDeMap{
  width: 100%;
  height: 100%;
  /* background-color: red; */
}
#gaoDeMap >>>.amap-logo {
  display: none;
  opacity: 0 !important;
}
#gaoDeMap >>>.amap-copyright {
  opacity: 0;
}
</style>